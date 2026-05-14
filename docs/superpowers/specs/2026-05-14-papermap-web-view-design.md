# papermap web view — design

**Date:** 2026-05-14
**Status:** approved (design), pending spec review

## Goal

Make papermap feel like a standard local tool: keep the existing `build` / `check`
CLI, but add a **local web server with a browser UI** for browsing a directory of
corpora, and ship **Docker + Makefile packaging** so it runs with one command for
both end users and developers.

The web view is **read-only** — it renders maps, it does not edit corpora.

## Non-goals (YAGNI)

- No in-browser editing of corpora.
- No authentication, accounts, or multi-user state.
- No websocket / hot-reload; the directory is simply rescanned per request.
- No database.
- No static-site / gallery generator (possible later, not in this spec).

## Architecture

papermap stays a single Python package. The render pipeline
(`schema.py` → `layout.py` → `render.py`) is **unchanged** — the server is a thin
layer on top of the existing `load_corpus` / `build_figure` / `lint_corpus` API.

```
papermap serve [DIR]
        │
        ▼
papermap/server.py   ── Flask app
   GET  /                 shell page (sidebar + empty main pane)
   GET  /api/corpora      JSON: yaml files in DIR, each valid|invalid
   GET  /api/map/<name>   JSON: figure fragment + metadata for one corpus
   GET  /download/<name>  the standalone build() HTML, as a file download
        │
        ▼
templates/index.html + static/app.js + static/app.css   ── vanilla JS frontend
```

### Rendering approach

The server returns a **figure fragment**, not a full HTML page. For a selected
corpus the server calls `build_figure(corpus)` and then
`fig.to_html(full_html=False, include_plotlyjs=False)`, which yields a bare
`<div>`. The shell page loads `plotly.js` from CDN once; switching corpora
`fetch`es a new fragment and swaps it into the main pane. No `<iframe>`, no SPA
framework, ~30 lines of JS.

(Alternatives considered: full-HTML-per-corpus in an iframe — rejected, the
iframe can't share state with the sidebar; figure-as-JSON rendered client-side —
rejected, more JS for no gain since `render.py` already builds the figure.)

## Components

### `papermap/server.py` (new)

A small Flask app created by a `create_app(corpus_dir: Path) -> Flask` factory
(factory form so the test client can construct it against a temp dir).

Routes:

- `GET /` — renders `index.html` (the shell: sidebar + empty main pane).
- `GET /api/corpora` — scans `corpus_dir` for `*.yaml` / `*.yml` files
  (non-recursive), attempts `load_corpus` on each, returns
  `[{name, title, valid, error}]`. Invalid files are included with
  `valid: false` and their `CorpusError` message — they show greyed-out in the
  sidebar, not hidden.
- `GET /api/map/<name>` — loads the named corpus and returns
  `{title, fragment, stats, warnings, yaml}` where:
  - `fragment` — the bare Plotly `<div>` from `fig.to_html(full_html=False, include_plotlyjs=False)`,
  - `stats` — `{papers, edges, categories, relations}`,
  - `warnings` — `lint_corpus(corpus)` output,
  - `yaml` — the raw source text of the file.
  Returns `404` for an unknown name, `422` with the error message for a corpus
  that fails to load.
- `GET /download/<name>` — renders the corpus with the existing full-HTML path
  (`build_figure` + `write_html` to a temp file, or `fig.to_html(full_html=True)`)
  and returns it as a file download (`Content-Disposition: attachment`).

`<name>` is validated against the scanned file list — no path traversal; a name
not in the current scan is a `404`.

The directory is rescanned on every `/api/corpora` request, so dropping a new
YAML into the folder just appears on the next refresh.

### `papermap/cli.py` (modified)

Add a third subcommand alongside `build` and `check`:

```
papermap serve [DIR] [--host HOST] [--port PORT] [--no-browser]
```

- `DIR` — directory to scan, default `.` (cwd).
- `--host` — default `127.0.0.1`.
- `--port` — default `8000`.
- `--no-browser` — suppress the auto-open (used by the Docker `CMD`).

`_serve` builds the app via `create_app`, opens the browser (unless suppressed)
with `webbrowser.open` after a short delay, and calls `app.run`. The existing
`_build` / `_check` handlers and their argument wiring are untouched.

### Frontend — `templates/index.html`, `static/app.js`, `static/app.css` (new)

- `index.html` — Jinja template: a two-pane layout, sidebar on the left, main
  pane on the right, `plotly.js` CDN `<script>` in the head.
- `app.js` — on load, `fetch('/api/corpora')` and populate the sidebar. On click,
  `fetch('/api/map/<name>')` and render into the main pane:
  - corpus title + stats line (paper / edge / category / relation counts),
  - lint warnings block (only if non-empty),
  - a **Download HTML** button linking to `/download/<name>`,
  - a collapsible **raw YAML** panel (read-only),
  - the Plotly figure fragment, activated with `Plotly` after injection.
  Invalid corpora in the sidebar are greyed-out and show their error on click.
- `app.css` — minimal styling for the two-pane layout; no CSS framework.

Static assets ship inside the package (`papermap/templates/`,
`papermap/static/`) and are declared as package data in `pyproject.toml`.

### Packaging (new files at repo root)

- **`Dockerfile`** — `python:3.12-slim` base, copies the project, `pip install .`,
  `EXPOSE 8000`, `CMD ["papermap", "serve", "/corpora", "--host", "0.0.0.0", "--no-browser"]`.
  Users mount their corpora at `/corpora`.
- **`docker-compose.yml`** — one `papermap` service: builds the Dockerfile,
  volume-mounts `./examples` → `/corpora:ro`, maps `8000:8000`. `docker compose up`
  serves the bundled example immediately.
- **`Makefile`** — targets: `install` (`pip install .`), `dev`
  (`pip install -e ".[dev]"`), `test` (`pytest`), `serve`
  (`papermap serve examples`), `docker-build`, `docker-up` (`docker compose up`).
- **`.dockerignore`** — excludes `.git`, `.venv`, `__pycache__`, `.pytest_cache`,
  build artifacts.

## Dependency changes

`pyproject.toml`:
- Add `flask>=3.0` to `[project] dependencies` (hard dependency — `serve` is a
  first-class subcommand).
- Add `[tool.setuptools.package-data]` with `papermap = ["templates/*", "static/*"]`
  so the templates and static assets ship in the wheel. The `packages = ["papermap"]`
  line stays as-is — `templates/` and `static/` are data directories inside the
  existing package, not new packages.

## Data flow

1. `papermap serve examples` → `create_app(Path("examples"))` → `app.run`,
   browser opens `http://127.0.0.1:8000/`.
2. Page loads → `GET /api/corpora` → sidebar lists `fm-to-virtual-cells.yaml`
   (valid) and any others.
3. User clicks a corpus → `GET /api/map/fm-to-virtual-cells.yaml` →
   `load_corpus` → `build_figure` → fragment + stats + warnings + yaml → main
   pane renders.
4. User clicks **Download HTML** → `GET /download/fm-to-virtual-cells.yaml` →
   full standalone HTML file downloads (identical to `papermap build` output).

## Error handling

- Invalid corpus in the scanned dir → listed in `/api/corpora` with
  `valid: false` + error message; greyed-out in the sidebar; clicking shows the
  error instead of a map.
- `/api/map/<name>` for an unknown name → `404`; for a name that fails to load
  → `422` with the `CorpusError` message; the frontend shows the message in the
  main pane.
- Unknown route → Flask default `404`.
- Port already in use → Flask/Werkzeug raises on `app.run`; the CLI lets the
  error surface with a clear message.

## Testing

`tests/test_server.py` (new), using the Flask test client against a temp
directory:

- `GET /` returns `200` and the shell HTML.
- `GET /api/corpora` lists a valid corpus and a deliberately-broken one, with
  correct `valid` flags.
- `GET /api/map/<name>` for the valid corpus returns `200` with a non-empty
  `fragment`, correct `stats`, and a `yaml` field.
- `GET /api/map/<name>` for the broken corpus returns `422`; for an unknown
  name returns `404`.
- `GET /download/<name>` returns `200` with `text/html` and `plotly` in the
  body.

The existing 24 tests stay green — `schema.py`, `layout.py`, `render.py` are not
modified.

## Documentation

Update `README.md`:
- new **Serve** section documenting `papermap serve`,
- a **Docker** section (`docker compose up`),
- mention the `Makefile` targets under **Development**.
