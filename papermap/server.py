"""Local web server — read-only browser UI for a directory of corpora."""

from __future__ import annotations

import io
import os
from pathlib import Path

from flask import Flask, Response, abort, jsonify, render_template, request, send_file
from flask_compress import Compress

from .blogs import list_blogs
from .loaders import Format, load_corpus, load_corpus_with_format
from .render import build_figure
from .schema import CorpusError, lint_corpus
from .state import build_state

# Parsing a corpus is the dominant cost of a request — the jobs vault alone is
# ~2 MB of YAML. Cache the parsed result per file and invalidate on mtime, so
# editing a YAML still shows up on the next refresh without a restart.
_corpus_cache: dict[Path, tuple[float, object]] = {}


def _load_cached(path: Path):
    """Return (corpus, format) for path, reusing the parse until the file changes.

    Load failures are cached too, so a broken corpus doesn't get re-parsed on
    every scan just to fail the same way.
    """
    mtime = path.stat().st_mtime
    hit = _corpus_cache.get(path)
    if hit is not None and hit[0] == mtime:
        result = hit[1]
    else:
        try:
            result = load_corpus_with_format(path)
        except CorpusError as exc:
            result = exc
        _corpus_cache[path] = (mtime, result)
    if isinstance(result, CorpusError):
        raise result
    return result


# build_state re-derives the whole layout (positions, traces, facets) from the
# corpus. It's a pure function of the parsed corpus, so cache it alongside.
_state_cache: dict[Path, tuple[float, dict]] = {}


def _state_cached(path: Path) -> dict:
    mtime = path.stat().st_mtime
    hit = _state_cache.get(path)
    if hit is not None and hit[0] == mtime:
        return hit[1]
    corpus, fmt = _load_cached(path)
    label = "resourcelib" if fmt is Format.RESOURCELIB else "papermap"
    state = build_state(corpus, name=path.stem, format_label=label)
    _state_cache[path] = (mtime, state)
    return state


# Rendering a blog dir means running every .md file through markdown — the FM
# vault is ~1.7 MB of it. Cache the rendered payload per directory, keyed on the
# set of files and their mtimes, so an edited post still appears on refresh.
_blogs_cache: dict[tuple, list[dict]] = {}


def _dir_fingerprint(directory: Path) -> tuple:
    if not directory.is_dir():
        return ()
    return tuple(sorted(
        (p.name, p.stat().st_mtime) for p in directory.iterdir() if p.is_file()
    ))


def _blogs_cached(directory: Path, **kwargs) -> list[dict]:
    key = (directory, _dir_fingerprint(directory), tuple(sorted(kwargs.items())))
    hit = _blogs_cache.get(key)
    if hit is None:
        hit = [b.to_dict() for b in list_blogs(directory, **kwargs)]
        _blogs_cache[key] = hit
    return hit


def _check_basic_auth(expected_password: str) -> bool:
    auth = request.authorization
    if auth is None or auth.type != "basic":
        return False
    return auth.password == expected_password


def create_app(corpus_dir: Path) -> Flask:
    """Build the Flask app rooted at corpus_dir.

    The directory is rescanned per request, so dropping a new YAML file
    into it just appears on the next refresh.

    If ``PAPERMAP_PASSWORD`` is set in the environment, every route
    except ``/healthz`` requires HTTP basic auth whose password matches
    that value. The username is ignored.
    """
    app = Flask(__name__)
    # The state/blog payloads are large JSON; gzip cuts them several-fold.
    Compress(app)
    app.config["CORPUS_DIR"] = Path(corpus_dir).resolve()
    app.config["PAPERMAP_PASSWORD"] = os.environ.get("PAPERMAP_PASSWORD")
    # Blogs may reference sibling mkdocs pages (e.g. supplementary)
    # that don't have a blog equivalent. If this env var is set, those
    # links are rewritten to land on the live talk site instead of
    # 404ing inside papermap.
    app.config["EXTERNAL_DOCS_BASE_URL"] = os.environ.get(
        "PAPERMAP_EXTERNAL_DOCS_BASE_URL",
        "https://liudengzhang.github.io/fm-to-virtual-cells",
    )

    @app.before_request
    def _require_auth():
        expected = app.config.get("PAPERMAP_PASSWORD")
        if not expected:
            return None
        if request.path == "/healthz":
            return None
        if _check_basic_auth(expected):
            return None
        return Response(
            "Authentication required.\n",
            status=401,
            headers={"WWW-Authenticate": 'Basic realm="papermap"'},
            mimetype="text/plain",
        )

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/api/corpora")
    def list_corpora():
        return jsonify(_scan(app.config["CORPUS_DIR"]))

    @app.get("/api/state/<path:name>")
    def state_for(name: str):
        path = _resolve(app.config["CORPUS_DIR"], name)
        try:
            return jsonify(_state_cached(path))
        except CorpusError as exc:
            return jsonify({"error": str(exc)}), 422

    @app.get("/api/blogs/<path:name>")
    def blogs_for(name: str):
        path = _resolve(app.config["CORPUS_DIR"], name)
        blogs_dir = app.config["CORPUS_DIR"] / "blogs" / path.stem
        asset_prefix = f"/api/blogs/{name}/assets/"
        return jsonify(_blogs_cached(
            blogs_dir,
            asset_url_prefix=asset_prefix,
            external_docs_base=app.config.get("EXTERNAL_DOCS_BASE_URL", ""),
            source_subpath=_blog_source_subpath(path.stem),
        ))

    @app.get("/api/topics/<path:name>")
    def topics_for(name: str):
        # Topic abstracts share the blog markdown loader but live in a
        # separate dir so they don't leak into the Blogs index.
        path = _resolve(app.config["CORPUS_DIR"], name)
        topics_dir = app.config["CORPUS_DIR"] / "topics" / path.stem
        return jsonify(_blogs_cached(
            topics_dir,
            external_docs_base=app.config.get("EXTERNAL_DOCS_BASE_URL", ""),
        ))

    @app.get("/api/presentations/<path:name>")
    def presentations_for(name: str):
        # Slide decks reuse the blog markdown loader (frontmatter + raw
        # HTML/SVG passthrough) but live in their own dir so they don't
        # leak into the Blogs index. Each deck's body is one or more
        # ``<section class="slide" data-notes="…">`` blocks.
        path = _resolve(app.config["CORPUS_DIR"], name)
        pres_dir = app.config["CORPUS_DIR"] / "presentations" / path.stem
        return jsonify(_blogs_cached(
            pres_dir,
            external_docs_base=app.config.get("EXTERNAL_DOCS_BASE_URL", ""),
        ))

    @app.get("/api/blogs/<path:name>/assets/<asset>")
    def blog_asset(name: str, asset: str):
        # `_resolve` validates the corpus path; assets live under
        # `<corpus_dir>/blogs/<stem>/assets/` and we refuse traversal by
        # comparing the resolved file's parent to that exact directory.
        path = _resolve(app.config["CORPUS_DIR"], name)
        assets_dir = (app.config["CORPUS_DIR"] / "blogs" / path.stem / "assets").resolve()
        candidate = (assets_dir / asset).resolve()
        if candidate.parent != assets_dir or not candidate.is_file():
            abort(404)
        return send_file(candidate)

    @app.get("/healthz")
    def healthz():
        return ("ok", 200, {"Content-Type": "text/plain"})

    @app.get("/download/<path:name>")
    def download(name: str):
        path = _resolve(app.config["CORPUS_DIR"], name)
        try:
            corpus = load_corpus(path)
        except CorpusError as exc:
            return jsonify({"error": str(exc)}), 422
        fig = build_figure(corpus)
        html = fig.to_html(
            full_html=True,
            include_plotlyjs="cdn",
            config={"responsive": True, "displaylogo": False},
        )
        buf = io.BytesIO(html.encode("utf-8"))
        return send_file(
            buf,
            mimetype="text/html",
            as_attachment=True,
            download_name=path.with_suffix(".html").name,
        )

    return app


def _blog_source_subpath(stem: str) -> str:
    """Where this corpus's blog markdown was authored to live on the MkDocs site.

    The resourcelib blogs in this repo are copies of pages under
    ``docs/talks/<stem>/`` in fm-to-virtual-cells, so ``../foo.md`` in
    a blog body refers to ``docs/talks/foo.md``. We surface that source
    location to the link rewriter so relative refs resolve to the right
    MkDocs URL instead of being naively stripped of `../`.
    """
    if stem.endswith("-resourcelib"):
        return f"talks/{stem.removesuffix('-resourcelib')}"
    return ""


def _scan(root: Path) -> list[dict]:
    """Return one entry per *.yaml/*.yml file in root, sorted by name.

    Each entry is ``{name, title, valid, error}``. Invalid corpora are
    included with ``valid=False`` and the CorpusError message so the UI
    can show them greyed-out rather than hiding them.
    """
    out: list[dict] = []
    for path in sorted(root.iterdir()):
        if not path.is_file():
            continue
        if path.suffix.lower() not in (".yaml", ".yml"):
            continue
        entry = {"name": path.name, "title": path.stem, "valid": True, "error": None}
        try:
            entry["title"] = _load_cached(path)[0].title
        except CorpusError as exc:
            entry["valid"] = False
            entry["error"] = str(exc)
        out.append(entry)
    return out


def _resolve(root: Path, name: str) -> Path:
    """Resolve a corpus name against root, refusing path traversal.

    The candidate must live directly under ``root`` and be an existing
    ``.yaml`` / ``.yml`` file; anything else aborts with 404.
    """
    candidate = (root / name).resolve()
    if candidate.parent != root:
        abort(404)
    if not candidate.is_file():
        abort(404)
    if candidate.suffix.lower() not in (".yaml", ".yml"):
        abort(404)
    return candidate
