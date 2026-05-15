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
