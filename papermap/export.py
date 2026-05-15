"""Static-site exporter — pre-render a corpus into a self-contained folder.

The folder contains the shell HTML, the JS bundle, the CSS, and a single
``state.json`` sibling. The shell's ``state.js`` detects ``state.json`` and
uses it directly, no server required.
"""

from __future__ import annotations

import json
import shutil
from pathlib import Path

import yaml

from .loaders import Format, detect_format, load_corpus
from .state import build_state

ROOT = Path(__file__).resolve().parent


def export_static(corpus_path: str | Path, out_dir: str | Path) -> Path:
    corpus_path = Path(corpus_path)
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    corpus = load_corpus(corpus_path)
    raw = yaml.safe_load(corpus_path.read_text(encoding="utf-8")) or {}
    try:
        fmt = "resourcelib" if detect_format(raw) is Format.RESOURCELIB else "papermap"
    except ValueError:
        fmt = "papermap"
    state = build_state(corpus, name=corpus_path.stem, format_label=fmt)
    (out / "state.json").write_text(json.dumps(state, ensure_ascii=False))

    # Strip Jinja {{ url_for(...) }} so the shell works as a static file,
    # and hide the corpus picker — there's only one corpus in a static export.
    shell = (ROOT / "templates" / "index.html").read_text(encoding="utf-8")
    shell = shell.replace(
        "{{ url_for('static', filename='app.css') }}", "app.css"
    ).replace(
        "{{ url_for('static', filename='app.js') }}", "app.js"
    ).replace(
        '<aside id="sidebar">', '<aside id="sidebar" hidden>'
    )
    (out / "index.html").write_text(shell, encoding="utf-8")

    static_src = ROOT / "static"
    for f in ["app.js", "app.css", "state.js", "filters.js", "filterbar.js"]:
        shutil.copy(static_src / f, out / f)
    views_out = out / "views"
    views_out.mkdir(exist_ok=True)
    for f in (static_src / "views").iterdir():
        if f.suffix == ".js":
            shutil.copy(f, views_out / f.name)

    return out
