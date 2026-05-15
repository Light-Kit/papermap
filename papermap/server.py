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

    return app
