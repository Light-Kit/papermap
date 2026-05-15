# papermap web view Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `papermap serve` local web server with a browser UI that lets you browse a directory of YAML corpora and view their interactive maps, plus Docker + Makefile packaging so the tool runs with one command.

**Architecture:** A small Flask app (`papermap/server.py`) sits on top of the existing `load_corpus` / `build_figure` / `lint_corpus` API — the render pipeline (`schema.py` / `layout.py` / `render.py`) is **not modified**. The server returns Plotly figure *fragments* (no full HTML, no iframe); a vanilla-JS frontend fetches fragments and swaps them into the page. Ships with a `Dockerfile`, `docker-compose.yml`, and a `Makefile`.

**Tech Stack:** Python 3.10+, Flask 3, Plotly (existing), vanilla JS, Docker, GNU Make.

**Spec:** `docs/superpowers/specs/2026-05-14-papermap-web-view-design.md`

**Working directory for all commands:** `/Users/lzhang34/Desktop/Exploratory_Playground/Github_Contributor/papermap_fresh`

---

## File Structure

**New files (under `papermap/`):**
- `papermap/server.py` — Flask app factory + 4 routes
- `papermap/templates/index.html` — shell page (sidebar + main pane)
- `papermap/static/app.js` — vanilla-JS frontend (fetch corpora, render fragment)
- `papermap/static/app.css` — minimal two-pane styling

**New files (repo root):**
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `Makefile`

**New test file:**
- `tests/test_server.py` — Flask test-client coverage of all four routes

**Modified files:**
- `papermap/cli.py` — add `serve` subcommand
- `pyproject.toml` — add `flask` dep, package-data, version bump
- `README.md` — Serve / Docker / Makefile sections

---

## Task 1: Add Flask dependency and package data

**Files:**
- Modify: `pyproject.toml`

- [ ] **Step 1: Update pyproject.toml**

Replace the file's contents with:

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "papermap"
version = "0.2.0"
description = "Interactive relationship maps for a body of literature — a clustered-ring node-link diagram from a simple YAML corpus."
readme = "README.md"
requires-python = ">=3.10"
license = { text = "MIT" }
authors = [{ name = "Liudeng Zhang" }]
keywords = ["literature", "network", "visualization", "plotly", "citation-graph", "reading-list"]
classifiers = [
    "Development Status :: 4 - Beta",
    "Intended Audience :: Science/Research",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Topic :: Scientific/Engineering :: Visualization",
]
dependencies = [
    "plotly>=5.0",
    "pyyaml>=6.0",
    "flask>=3.0",
]

[project.optional-dependencies]
dev = ["pytest>=7.0"]

[project.scripts]
papermap = "papermap.cli:main"

[project.urls]
Homepage = "https://github.com/Light-Kit/papermap"
Issues = "https://github.com/Light-Kit/papermap/issues"

[tool.setuptools]
packages = ["papermap"]

[tool.setuptools.package-data]
papermap = ["templates/*.html", "static/*.js", "static/*.css"]
```

- [ ] **Step 2: Install the new dep into the dev environment**

Run:
```bash
pip install -e ".[dev]"
```

Expected: completes successfully; `pip show flask` reports a version ≥ 3.0.

- [ ] **Step 3: Run existing tests to confirm nothing broke**

Run:
```bash
pytest -q
```

Expected: 24 passed.

- [ ] **Step 4: Commit**

```bash
git add pyproject.toml
git commit -m "Add flask dependency and bump to 0.2.0"
```

---

## Task 2: Server scaffold and shell page

**Files:**
- Create: `papermap/server.py`
- Create: `papermap/templates/index.html`
- Create: `tests/test_server.py`

- [ ] **Step 1: Write the failing test**

Create `tests/test_server.py`:

```python
"""Tests for the local Flask server."""

from __future__ import annotations

from pathlib import Path

import pytest

from papermap.server import create_app

EXAMPLE_DIR = Path(__file__).parent.parent / "examples"
MINIMAL = """
title: t
categories:
  - {id: a, label: A, color: "#111"}
relations:
  - {id: r, label: R, color: "#222"}
papers:
  - {id: p1, category: a, label: P1}
  - {id: p2, category: a, label: P2}
edges:
  - [p1, p2, r]
"""


@pytest.fixture
def client(tmp_path):
    (tmp_path / "good.yaml").write_text(MINIMAL, encoding="utf-8")
    app = create_app(tmp_path)
    app.config["TESTING"] = True
    return app.test_client()


def test_index_returns_shell_page(client):
    resp = client.get("/")
    assert resp.status_code == 200
    body = resp.get_data(as_text=True)
    assert "papermap" in body.lower()
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
pytest tests/test_server.py::test_index_returns_shell_page -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'papermap.server'`.

- [ ] **Step 3: Create the minimal template**

Create `papermap/templates/index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>papermap</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='app.css') }}">
  <script src="https://cdn.plot.ly/plotly-2.35.2.min.js" charset="utf-8"></script>
</head>
<body>
  <aside id="sidebar">
    <h1>papermap</h1>
    <ul id="corpora"></ul>
  </aside>
  <main id="main">
    <p class="placeholder">Pick a corpus from the sidebar.</p>
  </main>
  <script src="{{ url_for('static', filename='app.js') }}"></script>
</body>
</html>
```

- [ ] **Step 4: Create papermap/server.py with create_app and the index route**

Create `papermap/server.py`:

```python
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
```

- [ ] **Step 5: Create the static directory and a stub app.css so url_for resolves at test time**

Create `papermap/static/app.css`:

```css
/* placeholder — populated in Task 7 */
```

Create `papermap/static/app.js`:

```javascript
// placeholder — populated in Task 7
```

- [ ] **Step 6: Run test to verify it passes**

Run:
```bash
pytest tests/test_server.py::test_index_returns_shell_page -v
```

Expected: PASS.

- [ ] **Step 7: Confirm the existing suite still passes**

Run:
```bash
pytest -q
```

Expected: 25 passed.

- [ ] **Step 8: Commit**

```bash
git add papermap/server.py papermap/templates/index.html papermap/static/app.css papermap/static/app.js tests/test_server.py
git commit -m "Add Flask server scaffold and shell page"
```

---

## Task 3: GET /api/corpora — list scanned corpora

**Files:**
- Modify: `papermap/server.py`
- Modify: `tests/test_server.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/test_server.py`:

```python
BROKEN = """
title: t
categories:
  - {id: a, label: A, color: "#111"}
relations:
  - {id: r, label: R, color: "#222"}
papers:
  - {id: p1, category: zzz, label: P1}
edges: []
"""


@pytest.fixture
def mixed_client(tmp_path):
    (tmp_path / "good.yaml").write_text(MINIMAL, encoding="utf-8")
    (tmp_path / "broken.yaml").write_text(BROKEN, encoding="utf-8")
    (tmp_path / "notes.txt").write_text("ignore me", encoding="utf-8")
    app = create_app(tmp_path)
    app.config["TESTING"] = True
    return app.test_client()


def test_api_corpora_lists_valid_and_invalid(mixed_client):
    resp = mixed_client.get("/api/corpora")
    assert resp.status_code == 200
    items = resp.get_json()
    names = {item["name"]: item for item in items}

    assert "notes.txt" not in names
    assert names["good.yaml"]["valid"] is True
    assert names["good.yaml"]["title"] == "t"
    assert names["good.yaml"]["error"] is None

    assert names["broken.yaml"]["valid"] is False
    assert "unknown category" in names["broken.yaml"]["error"]
```

- [ ] **Step 2: Run the tests to verify the new ones fail**

Run:
```bash
pytest tests/test_server.py -v
```

Expected: `test_api_corpora_lists_valid_and_invalid` FAILs with 404.

- [ ] **Step 3: Add the route and the scan helper**

In `papermap/server.py`, add a `_scan` helper after `create_app` and a new route inside `create_app` (before the closing `return app`):

```python
    @app.get("/api/corpora")
    def list_corpora():
        return jsonify(_scan(app.config["CORPUS_DIR"]))
```

At module level (after `create_app`):

```python
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
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
pytest tests/test_server.py -v
```

Expected: all server tests PASS.

- [ ] **Step 5: Commit**

```bash
git add papermap/server.py tests/test_server.py
git commit -m "Add /api/corpora endpoint"
```

---

## Task 4: GET /api/map/<name> — render one corpus

**Files:**
- Modify: `papermap/server.py`
- Modify: `tests/test_server.py`

- [ ] **Step 1: Write the failing tests**

Append to `tests/test_server.py`:

```python
def test_api_map_returns_fragment_and_metadata(mixed_client):
    resp = mixed_client.get("/api/map/good.yaml")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["title"] == "t"
    assert "<div" in data["fragment"]
    assert "plotly" in data["fragment"].lower()
    assert data["stats"] == {
        "papers": 2,
        "edges": 1,
        "categories": 1,
        "relations": 1,
    }
    assert data["warnings"] == []
    assert "categories:" in data["yaml"]


def test_api_map_unknown_name_is_404(mixed_client):
    resp = mixed_client.get("/api/map/nope.yaml")
    assert resp.status_code == 404


def test_api_map_invalid_corpus_is_422(mixed_client):
    resp = mixed_client.get("/api/map/broken.yaml")
    assert resp.status_code == 422
    assert "unknown category" in resp.get_json()["error"]


def test_api_map_rejects_path_traversal(mixed_client):
    resp = mixed_client.get("/api/map/..%2Fetc%2Fpasswd")
    assert resp.status_code == 404
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:
```bash
pytest tests/test_server.py -v
```

Expected: the four new tests FAIL with 404 (route doesn't exist yet).

- [ ] **Step 3: Add the route and a _resolve helper**

In `papermap/server.py`, add the route inside `create_app` (after `list_corpora`):

```python
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
```

And at module level, add the `_resolve` helper next to `_scan`:

```python
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
```

Note: `<path:name>` (rather than `<name>`) is used so a name like `good.yaml` is captured intact — Flask's default converter does accept dots, but `<path:>` future-proofs in case names ever contain other characters. The `_resolve` parent check still rejects any name containing `/`.

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
pytest tests/test_server.py -v
```

Expected: all server tests PASS.

- [ ] **Step 5: Commit**

```bash
git add papermap/server.py tests/test_server.py
git commit -m "Add /api/map/<name> endpoint"
```

---

## Task 5: GET /download/<name> — full HTML download

**Files:**
- Modify: `papermap/server.py`
- Modify: `tests/test_server.py`

- [ ] **Step 1: Write the failing test**

Append to `tests/test_server.py`:

```python
def test_download_returns_full_html(mixed_client):
    resp = mixed_client.get("/download/good.yaml")
    assert resp.status_code == 200
    assert resp.mimetype == "text/html"
    disposition = resp.headers.get("Content-Disposition", "")
    assert "attachment" in disposition
    assert "good.html" in disposition
    body = resp.get_data(as_text=True)
    assert "<html" in body.lower()
    assert "plotly" in body.lower()


def test_download_invalid_corpus_is_422(mixed_client):
    resp = mixed_client.get("/download/broken.yaml")
    assert resp.status_code == 422
```

- [ ] **Step 2: Run to verify they fail**

Run:
```bash
pytest tests/test_server.py -v
```

Expected: the two new tests FAIL with 404.

- [ ] **Step 3: Add the route**

In `papermap/server.py`, add inside `create_app` (after `map_for`):

```python
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run:
```bash
pytest tests/test_server.py -v
```

Expected: all server tests PASS.

- [ ] **Step 5: Run the whole suite to confirm nothing else regressed**

Run:
```bash
pytest -q
```

Expected: all tests PASS (24 original + the new server tests).

- [ ] **Step 6: Commit**

```bash
git add papermap/server.py tests/test_server.py
git commit -m "Add /download/<name> endpoint"
```

---

## Task 6: CLI `serve` subcommand

**Files:**
- Modify: `papermap/cli.py`
- Modify: `tests/test_papermap.py`

- [ ] **Step 1: Write the failing test**

Open `tests/test_papermap.py` and append at the bottom:

```python
# ── papermap serve --help advertises the subcommand ──────────────────────────

def test_serve_appears_in_help():
    result = subprocess.run(
        [sys.executable, "-m", "papermap", "--help"],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0
    assert "serve" in result.stdout
```

- [ ] **Step 2: Run to verify it fails**

Run:
```bash
pytest tests/test_papermap.py::test_serve_appears_in_help -v
```

Expected: FAIL — "serve" is not in `--help` output.

- [ ] **Step 3: Add the serve subcommand to cli.py**

In `papermap/cli.py`, after the `_check` function add:

```python
def _serve(args: argparse.Namespace) -> int:
    from .server import create_app

    corpus_dir = Path(args.directory).resolve()
    if not corpus_dir.is_dir():
        print(f"error: {corpus_dir} is not a directory", file=sys.stderr)
        return 1

    app = create_app(corpus_dir)
    url = f"http://{args.host}:{args.port}/"
    print(f"papermap serving {corpus_dir} at {url}")

    if not args.no_browser:
        import threading
        import webbrowser

        threading.Timer(0.8, lambda: webbrowser.open(url)).start()

    app.run(host=args.host, port=args.port, debug=False)
    return 0
```

And in `main()`, after `p_check.set_defaults(func=_check)`, insert:

```python
    p_serve = sub.add_parser("serve", help="run a local web server for a directory of corpora")
    p_serve.add_argument("directory", nargs="?", default=".", help="directory to scan for *.yaml corpora (default: cwd)")
    p_serve.add_argument("--host", default="127.0.0.1", help="bind host (default: 127.0.0.1)")
    p_serve.add_argument("--port", type=int, default=8000, help="bind port (default: 8000)")
    p_serve.add_argument("--no-browser", action="store_true", help="don't auto-open the browser")
    p_serve.set_defaults(func=_serve)
```

- [ ] **Step 4: Run the test to verify it passes**

Run:
```bash
pytest tests/test_papermap.py::test_serve_appears_in_help -v
```

Expected: PASS.

- [ ] **Step 5: Smoke test serve manually**

Run (in one terminal):
```bash
papermap serve examples --no-browser --port 8765 &
SERVER_PID=$!
sleep 2
curl -s http://127.0.0.1:8765/api/corpora | head -c 300
echo
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/
kill $SERVER_PID
wait $SERVER_PID 2>/dev/null
```

Expected: the curl returns JSON listing `fm-to-virtual-cells.yaml` with `"valid": true`; the final status code is `200`.

- [ ] **Step 6: Run the full suite**

Run:
```bash
pytest -q
```

Expected: all tests PASS.

- [ ] **Step 7: Commit**

```bash
git add papermap/cli.py tests/test_papermap.py
git commit -m "Add papermap serve subcommand"
```

---

## Task 7: Frontend (app.js + app.css + filled index.html)

**Files:**
- Modify: `papermap/static/app.js`
- Modify: `papermap/static/app.css`

The shell template from Task 2 already references both files; here we replace the placeholders with real content.

- [ ] **Step 1: Replace `papermap/static/app.css` with the styling**

Overwrite `papermap/static/app.css`:

```css
* { box-sizing: border-box; }

html, body {
  margin: 0;
  height: 100%;
  font: 14px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  color: #222;
  background: #fafafa;
}

body {
  display: grid;
  grid-template-columns: 260px 1fr;
  height: 100vh;
}

#sidebar {
  background: #f1f1f0;
  border-right: 1px solid #d8d8d6;
  padding: 18px 14px;
  overflow-y: auto;
}

#sidebar h1 {
  margin: 0 0 14px;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: #444;
}

#corpora {
  list-style: none;
  margin: 0;
  padding: 0;
}

#corpora li {
  padding: 7px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #333;
}

#corpora li:hover { background: #e6e6e4; }
#corpora li.active { background: #d62728; color: white; }
#corpora li.invalid { color: #999; cursor: help; }

#main {
  padding: 18px 22px;
  overflow-y: auto;
}

#main .placeholder { color: #999; }

#main header {
  display: flex;
  align-items: baseline;
  gap: 18px;
  margin-bottom: 4px;
}

#main h2 { margin: 0; font-size: 18px; }
#main .stats { color: #666; font-size: 12px; }

#main .warnings {
  background: #fff8e1;
  border-left: 3px solid #f1c40f;
  padding: 8px 12px;
  margin: 10px 0;
  font-size: 12px;
}

#main .warnings ul { margin: 4px 0 0 18px; padding: 0; }

#main .download {
  display: inline-block;
  margin: 6px 0 12px;
  padding: 5px 10px;
  background: #1f77b4;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-size: 12px;
}

#main details {
  margin: 10px 0;
  font-size: 12px;
}

#main details pre {
  background: #f6f6f4;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  max-height: 320px;
}

#main .error {
  color: #b00020;
  background: #fdecea;
  padding: 10px 14px;
  border-radius: 4px;
}
```

- [ ] **Step 2: Replace `papermap/static/app.js` with the frontend logic**

Overwrite `papermap/static/app.js`:

```javascript
"use strict";

const sidebar = document.getElementById("corpora");
const main = document.getElementById("main");

async function loadCorpora() {
  const resp = await fetch("/api/corpora");
  const items = await resp.json();
  sidebar.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item.title || item.name;
    li.dataset.name = item.name;
    if (!item.valid) {
      li.classList.add("invalid");
      li.title = item.error || "invalid corpus";
    }
    li.addEventListener("click", () => selectCorpus(li, item));
    sidebar.appendChild(li);
  }
}

async function selectCorpus(li, item) {
  document.querySelectorAll("#corpora li.active").forEach(el => el.classList.remove("active"));
  li.classList.add("active");

  if (!item.valid) {
    main.innerHTML = "";
    const err = document.createElement("div");
    err.className = "error";
    err.textContent = `${item.name}: ${item.error}`;
    main.appendChild(err);
    return;
  }

  main.innerHTML = '<p class="placeholder">Loading…</p>';
  const resp = await fetch(`/api/map/${encodeURIComponent(item.name)}`);
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    main.innerHTML = "";
    const err = document.createElement("div");
    err.className = "error";
    err.textContent = data.error || `${resp.status} ${resp.statusText}`;
    main.appendChild(err);
    return;
  }
  const data = await resp.json();
  renderMap(item, data);
}

function renderMap(item, data) {
  main.innerHTML = "";

  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  h2.textContent = data.title;
  const stats = document.createElement("span");
  stats.className = "stats";
  stats.textContent =
    `${data.stats.papers} papers · ${data.stats.edges} edges · ` +
    `${data.stats.categories} categories · ${data.stats.relations} relations`;
  header.appendChild(h2);
  header.appendChild(stats);
  main.appendChild(header);

  const dl = document.createElement("a");
  dl.className = "download";
  dl.href = `/download/${encodeURIComponent(item.name)}`;
  dl.textContent = "Download HTML";
  main.appendChild(dl);

  if (data.warnings && data.warnings.length) {
    const wrap = document.createElement("div");
    wrap.className = "warnings";
    wrap.innerHTML = "<strong>Lint warnings</strong>";
    const ul = document.createElement("ul");
    for (const w of data.warnings) {
      const liw = document.createElement("li");
      liw.textContent = w;
      ul.appendChild(liw);
    }
    wrap.appendChild(ul);
    main.appendChild(wrap);
  }

  const det = document.createElement("details");
  const sum = document.createElement("summary");
  sum.textContent = "Raw YAML";
  const pre = document.createElement("pre");
  pre.textContent = data.yaml;
  det.appendChild(sum);
  det.appendChild(pre);
  main.appendChild(det);

  // Inject the figure fragment and let Plotly bind to the <div> inside it.
  const figWrap = document.createElement("div");
  figWrap.innerHTML = data.fragment;
  main.appendChild(figWrap);

  // Re-execute the scripts the fragment contains so Plotly.newPlot runs.
  figWrap.querySelectorAll("script").forEach(orig => {
    const s = document.createElement("script");
    if (orig.src) s.src = orig.src;
    else s.textContent = orig.textContent;
    document.body.appendChild(s);
    document.body.removeChild(s);
  });
}

loadCorpora();
```

- [ ] **Step 3: Smoke test the UI manually**

Run:
```bash
papermap serve examples --no-browser --port 8765 &
SERVER_PID=$!
sleep 2
curl -s -o /dev/null -w "css=%{http_code}\n" http://127.0.0.1:8765/static/app.css
curl -s -o /dev/null -w " js=%{http_code}\n" http://127.0.0.1:8765/static/app.js
curl -s http://127.0.0.1:8765/api/map/fm-to-virtual-cells.yaml | python -c "import json,sys; d=json.load(sys.stdin); print('fragment_len=', len(d['fragment']), 'warnings=', d['warnings'])"
kill $SERVER_PID
wait $SERVER_PID 2>/dev/null
```

Expected: both static files return `200`; the fragment length is several thousand chars; warnings is a list (possibly empty).

Then open `http://127.0.0.1:8765/` in a browser (start the server again without `&` for a clean session), click `fm-to-virtual-cells.yaml`, and confirm:
- Title and stats appear at the top.
- "Download HTML" button is visible and downloads a valid file when clicked.
- Raw YAML collapsible panel works.
- The map renders.

- [ ] **Step 4: Run all tests**

Run:
```bash
pytest -q
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add papermap/static/app.css papermap/static/app.js
git commit -m "Add frontend for the local web view"
```

---

## Task 8: Dockerfile and .dockerignore

**Files:**
- Create: `Dockerfile`
- Create: `.dockerignore`

- [ ] **Step 1: Create the Dockerfile**

Create `Dockerfile`:

```dockerfile
# papermap — local web view
FROM python:3.12-slim

WORKDIR /app

# Install package + deps in one layer; uses pyproject + setuptools.
COPY pyproject.toml README.md LICENSE ./
COPY papermap ./papermap
RUN pip install --no-cache-dir .

# Default mount point for user corpora.
VOLUME ["/corpora"]
EXPOSE 8000

CMD ["papermap", "serve", "/corpora", "--host", "0.0.0.0", "--port", "8000", "--no-browser"]
```

- [ ] **Step 2: Create .dockerignore**

Create `.dockerignore`:

```
.git
.gitignore
.venv
venv
__pycache__
*.py[cod]
*.egg-info
build
dist
.pytest_cache
.ruff_cache
.mypy_cache
.idea
.vscode
.DS_Store
docs
tests
examples/*.html
docker-compose.yml
Dockerfile
.dockerignore
Makefile
```

- [ ] **Step 3: Build and smoke-test the image**

Run:
```bash
docker build -t papermap:dev .
```

Expected: build succeeds; image tagged `papermap:dev`.

Then:
```bash
docker run -d --rm --name papermap-smoke -p 8765:8000 \
  -v "$(pwd)/examples":/corpora:ro papermap:dev
sleep 2
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/
curl -s http://127.0.0.1:8765/api/corpora | head -c 200
docker stop papermap-smoke
```

Expected: `200`, JSON listing the example corpus.

- [ ] **Step 4: Commit**

```bash
git add Dockerfile .dockerignore
git commit -m "Add Dockerfile for one-command serve"
```

---

## Task 9: docker-compose.yml

**Files:**
- Create: `docker-compose.yml`

- [ ] **Step 1: Create the compose file**

Create `docker-compose.yml`:

```yaml
services:
  papermap:
    build: .
    image: papermap:dev
    ports:
      - "8000:8000"
    volumes:
      - ./examples:/corpora:ro
    restart: unless-stopped
```

- [ ] **Step 2: Smoke test**

Run:
```bash
docker compose up -d --build
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/
curl -s http://127.0.0.1:8000/api/corpora | head -c 200
docker compose down
```

Expected: `200`; corpus list JSON.

- [ ] **Step 3: Commit**

```bash
git add docker-compose.yml
git commit -m "Add docker-compose service"
```

---

## Task 10: Makefile

**Files:**
- Create: `Makefile`

- [ ] **Step 1: Create the Makefile**

Create `Makefile`:

```makefile
# papermap — common developer tasks
.PHONY: help install dev test serve docker-build docker-up docker-down clean

help:
	@echo "Targets:"
	@echo "  install      pip install ."
	@echo "  dev          pip install -e .[dev]"
	@echo "  test         pytest"
	@echo "  serve        papermap serve examples"
	@echo "  docker-build docker build -t papermap:dev ."
	@echo "  docker-up    docker compose up -d --build"
	@echo "  docker-down  docker compose down"
	@echo "  clean        remove build / cache artifacts"

install:
	pip install .

dev:
	pip install -e ".[dev]"

test:
	pytest -q

serve:
	papermap serve examples

docker-build:
	docker build -t papermap:dev .

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down

clean:
	rm -rf build dist *.egg-info .pytest_cache .ruff_cache .mypy_cache
	find . -type d -name __pycache__ -exec rm -rf {} +
```

- [ ] **Step 2: Smoke test a couple of targets**

Run:
```bash
make help
make test
```

Expected: `help` prints the target list; `test` passes.

- [ ] **Step 3: Commit**

```bash
git add Makefile
git commit -m "Add Makefile for common dev tasks"
```

---

## Task 11: README updates

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add the Serve / Docker / Make sections**

In `README.md`, **after** the existing `## Use` section and **before** `## The corpus format`, insert this block:

```markdown
## Serve (local web view)

```bash
papermap serve examples              # scan the examples directory
papermap serve .                     # scan the current directory
papermap serve corpora --port 9000   # custom port
papermap serve corpora --no-browser  # don't auto-open
```

The server scans the directory for `*.yaml` / `*.yml` files, lists them in a
sidebar, and renders each interactive map in the browser. Invalid corpora show
greyed-out with their error. Each map view also offers a **Download HTML**
button — the same self-contained artifact `papermap build` produces.

## Docker

The shipped `Dockerfile` and `docker-compose.yml` give you a one-command run.

```bash
docker compose up -d --build
# open http://127.0.0.1:8000
docker compose down
```

By default the compose file mounts `./examples` into `/corpora` (read-only).
Point it at your own corpora directory by editing the `volumes:` line.

Or with plain Docker:

```bash
docker build -t papermap .
docker run --rm -p 8000:8000 -v "$(pwd)/my-corpora":/corpora:ro papermap
```
```

- [ ] **Step 2: Update the Development section**

Replace the existing `## Development` section with:

```markdown
## Development

```bash
make dev      # editable install with dev deps
make test     # run pytest
make serve    # papermap serve examples
make docker-build
make docker-up
```

The render pipeline (`schema.py` → `layout.py` → `render.py`) is independent
of the server (`server.py`). Tests live in `tests/`.
```

- [ ] **Step 3: Smoke check**

Run:
```bash
grep -n "papermap serve" README.md
grep -n "docker compose" README.md
```

Expected: each pattern appears at least once.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "Document serve, Docker, and Makefile workflows"
```

---

## Task 12: Final integration smoke test and push

**Files:** none.

- [ ] **Step 1: Run the full suite**

Run:
```bash
pytest -q
```

Expected: all tests PASS (24 original + ~8 new server tests + 1 serve-help test ≈ 33 passed). The exact count depends on Task 3/4/5/6 test additions; what matters is **all pass and no skips**.

- [ ] **Step 2: End-to-end CLI smoke**

Run:
```bash
papermap build examples/fm-to-virtual-cells.yaml -o /tmp/papermap-smoke.html
test -s /tmp/papermap-smoke.html && echo "build ok"
papermap check examples/fm-to-virtual-cells.yaml
papermap serve examples --no-browser --port 8765 &
SERVER_PID=$!
sleep 2
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8765/
curl -s http://127.0.0.1:8765/api/corpora | head -c 200
kill $SERVER_PID
wait $SERVER_PID 2>/dev/null
rm /tmp/papermap-smoke.html
```

Expected: `build ok`, `ok:` line from `check`, `200` from the server, JSON listing the example.

- [ ] **Step 3: Push**

Run:
```bash
git log --oneline -15
git push origin main
```

Expected: all commits from Tasks 1–11 pushed to `Light-Kit/papermap`.

---

## Spec coverage check

- `papermap serve [DIR] [--host] [--port] [--no-browser]` — Task 6 ✓
- `create_app(corpus_dir)` factory — Task 2 ✓
- `GET /` shell page — Task 2 ✓
- `GET /api/corpora` (valid + invalid listed) — Task 3 ✓
- `GET /api/map/<name>` returning fragment + stats + warnings + yaml — Task 4 ✓
- `GET /download/<name>` returning full HTML attachment — Task 5 ✓
- Page shows lint warnings + stats + download button + raw YAML — Task 7 ✓
- `render.py` / `schema.py` / `layout.py` unmodified — verified by inspection (no tasks touch them) ✓
- Flask hard dep + package-data — Task 1 ✓
- Dockerfile — Task 8 ✓
- docker-compose.yml — Task 9 ✓
- Makefile — Task 10 ✓
- README updates — Task 11 ✓
- `tests/test_server.py` covering each route — Tasks 2–5 ✓
- Existing 24 tests stay green — verified at end of every code task ✓
