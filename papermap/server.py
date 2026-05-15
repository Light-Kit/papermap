"""Local web server — read-only browser UI for a directory of corpora."""

from __future__ import annotations

import io
import os
from pathlib import Path

from flask import Flask, Response, abort, jsonify, render_template, request, send_file

import yaml

from .loaders import Format, detect_format, load_corpus
from .render import build_figure
from .schema import CorpusError, lint_corpus
from .state import build_state


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
    app.config["CORPUS_DIR"] = Path(corpus_dir).resolve()
    app.config["PAPERMAP_PASSWORD"] = os.environ.get("PAPERMAP_PASSWORD")

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
            corpus = load_corpus(path)
        except CorpusError as exc:
            return jsonify({"error": str(exc)}), 422
        raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        try:
            fmt = "resourcelib" if detect_format(raw) is Format.RESOURCELIB else "papermap"
        except ValueError:
            fmt = "papermap"
        return jsonify(build_state(corpus, name=path.stem, format_label=fmt))

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
            entry["title"] = load_corpus(path).title
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
