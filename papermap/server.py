"""Local web server — read-only browser UI for a directory of corpora."""

from __future__ import annotations

import io
from pathlib import Path

from flask import Flask, abort, jsonify, render_template, send_file

from .render import build_figure
from .schema import CorpusError, lint_corpus, load_corpus


def create_app(corpus_dir: Path) -> Flask:
    """Build the Flask app rooted at corpus_dir.

    The directory is rescanned per request, so dropping a new YAML file
    into it just appears on the next refresh.
    """
    app = Flask(__name__)
    app.config["CORPUS_DIR"] = Path(corpus_dir).resolve()

    @app.get("/")
    def index():
        return render_template("index.html")

    @app.get("/api/corpora")
    def list_corpora():
        return jsonify(_scan(app.config["CORPUS_DIR"]))

    @app.get("/api/map/<path:name>")
    def map_for(name: str):
        path = _resolve(app.config["CORPUS_DIR"], name)
        try:
            corpus = load_corpus(path)
        except CorpusError as exc:
            return jsonify({"error": str(exc)}), 422
        fig = build_figure(corpus)
        return jsonify({
            "title": corpus.title,
            "fragment": fig.to_html(full_html=False, include_plotlyjs=False),
            "stats": {
                "papers": len(corpus.papers),
                "edges": len(corpus.edges),
                "categories": len(corpus.categories),
                "relations": len(corpus.relations),
            },
            "warnings": lint_corpus(corpus),
            "yaml": path.read_text(encoding="utf-8"),
        })

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
