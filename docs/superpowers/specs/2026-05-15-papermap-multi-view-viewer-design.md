# papermap multi-view viewer — design

**Status:** approved 2026-05-15
**Repos touched:** Light-Kit/papermap (primary), Light-Kit/resourcelib (schema additions per bridge spec)
**Depends on:** [2026-05-15-resourcelib-papermap-bridge-design.md](2026-05-15-resourcelib-papermap-bridge-design.md) — the bridge is a prerequisite and is built first.

## 1. Problem

Today `papermap serve` shows one view per corpus: the clustered-ring map. A real reading-list workflow needs more than one angle on the same data — a card grid to browse, a table to scan, a topic ranking to find clusters, a timeline to see the field's arc. The user lands on the corpus, picks the view, and filters.

At the same time, the resourcelib corpus is the canonical data format across the Light-Kit ecosystem. The viewer must read both papermap-native and resourcelib YAML transparently, so the user keeps a single source of truth.

## 2. Goals & non-goals

**Goals (v1)**
- One local web app, `papermap serve`, with six switchable views over a single corpus: **Stats · Browse · Map · Table · Topics & People · Timeline**.
- Reads both **native papermap YAML** and **resourcelib YAML** with silent auto-detect. The bridge spec defines the adapter; this spec consumes it.
- Filters — kind/category, topic, status, org_type, region, free-text — live on Browse, Map, Table.
- `papermap export <corpus> --out site/` static export (secondary; spec includes it but the plan may ship it after the live server).
- A written deploy-agent prompt as a deliverable file, so another agent can host the result.

**Non-goals**
- No auth, no multi-user, no write API, no comments — read-only viewer.
- No live collaboration, no DB, no server-side caching beyond the in-process app.
- Timeline does not parse years out of `meta:` strings. Items either declare `year:` or get hidden from the Timeline view with a counter.
- Minimal URL-hash routing only: view + filters serialise to `#/corpus/<name>?view=...&kind=...` so a refresh keeps state. No per-filter back-button entries; no path-based routing.
- No new view types beyond the six listed. Resourcelib-views' ranked-dossier output is its own deliverable; this viewer's Topics & People tab is a different (live, in-browser) thing.

## 3. Architecture

```
+-------------------- Flask app (papermap/server.py) ------------------+
| GET /                      → shell page (renders templates/index.html)|
| GET /api/corpora           → directory listing (existing)             |
| GET /api/state/<name>      → parsed Corpus + items as JSON   (NEW)    |
| GET /download/<name>       → single self-contained map HTML (existing)|
| GET /healthz               → 200 OK (NEW — for the deploy agent)      |
+-----------------------------------------------------------------------+
              |
              v
+----------------- papermap/loaders/ (NEW package) --------------------+
|  detect.py    → returns loader based on top-level keys                |
|  native.py    → today's parser, moved here unchanged                  |
|  resourcelib.py → parses resourcelib YAML, adapts to Corpus           |
+-----------------------------------------------------------------------+
              |
              v
+--- papermap/state.py — pure fn: Corpus -> JSON state payload --------+
              |
              v
+------- Client (papermap/static/) ------------------------------------+
|  app.js       → boot, corpus picker, view-tab router                  |
|  state.js     → fetches /api/state/<name>; stores the one JSON object |
|  filters.js   → chip groups + free-text; produces a Filter object     |
|  views/       → stats.js · browse.js · map.js · table.js              |
|                 · ranked.js · timeline.js                             |
|                Each view: render(state, filters, mountEl)             |
+-----------------------------------------------------------------------+
```

Server loads once. The browser does the rest. Switching views is a DOM swap; switching filters is a recompute over the same in-memory state.

### 3.1 Rendering approach

One-shot JSON + client-side rendering. The single source of truth is the `state` object returned by `/api/state/<name>`. Each of the six views is a pure function `render(state, filters, mountEl) → void` that reads from that object and writes into its mount element. Filter changes call `render` again. View switches call a different `render`.

The Map view, which today is server-rendered via plotly, moves to client-rendered via `Plotly.newPlot(div, traces, layout)`. The traces and layout are precomputed *full-corpus* on the server: `papermap.state.build_state` calls the existing `build_figure(corpus)` and extracts `fig.to_dict()["data"]` and `["layout"]` into `state.map.traces` / `state.map.layout`. `layout.py` and `render.py` themselves stay unchanged. Client-side filtering drops or dims traces by item id — it does not recompute the geometry.

## 4. File layout

### Backend (`papermap/`)

```
papermap/
  server.py            (extend: /api/state, /healthz; keep existing routes)
  loaders/
    __init__.py        (load_corpus public entry; auto-detect)
    detect.py          (`vocab`+`items` → resourcelib; `categories`+`papers` → native)
    native.py          (existing parser moved here, unchanged)
    resourcelib.py     (NEW — adapts resourcelib YAML to papermap Corpus)
  schema.py            (Corpus dataclass; add `items: list[Item]` for the unified record)
  state.py             (NEW — pure fn building the JSON state payload)
  export.py            (NEW — `papermap export` writes a static site folder)
  cli.py               (extend serve flags; add `export` subcmd)
  layout.py            (unchanged)
  render.py            (unchanged)
```

`papermap/schema.py` grows an `Item` dataclass; the `Corpus.papers` list and a new `Corpus.items` list co-exist. Native corpora have a paper-shaped `Item` for every paper. Resourcelib corpora have one `Item` per resourcelib item, with map-related fields (`category`, `weight`, `why`) filled when `papermap_categories` is present and omitted otherwise.

### Frontend (`papermap/static/` + `papermap/templates/`)

```
templates/
  index.html           (shell — sidebar + view tabs + main pane)
static/
  app.css              (shell + view-local styles)
  app.js               (boot + view-tab router + corpus picker glue)
  filters.js           (chip groups + free-text; pure transform of state)
  state.js             (fetch/keep the single JSON state)
  views/
    stats.js
    browse.js
    map.js
    table.js
    ranked.js
    timeline.js
```

Plotly stays on the CDN (already in use). No build step; ES modules with `<script type="module">`.

Each `views/*.js` exports one function: `render(state, filters, mountEl)`. Pure: same inputs produce the same DOM. Easy to test in isolation.

## 5. The `/api/state/<name>` payload

One shape covers both source formats:

```json
{
  "name": "fm-to-virtual-cells",
  "format": "resourcelib | papermap",
  "title": "FM to virtual cells",
  "items": [
    {
      "id": "ahlmann",
      "label": "Ahlmann-Eltze 2025",
      "kind": "critique",
      "topics": ["benchmarks", "generalization"],
      "status": "published",
      "org_type": "academic",
      "region": "EU",
      "year": 2025,
      "category": "reckoning",
      "title": "Deep-learning predictions don't generalize",
      "meta": "Nature Methods · 2025",
      "why": "THE canonical critique paper — start here.",
      "weight": 3,
      "people": ["Ahlmann-Eltze", "Huber"]
    }
  ],
  "categories": [{"id": "...", "label": "...", "color": "#..."}],
  "relations": [{"id": "...", "label": "...", "color": "#...", "dash": "solid"}],
  "edges":     [["source-id", "target-id", "relation-id"]],
  "map": {
    "traces": [ /* plotly traces, full corpus, item-id tagged per point */ ],
    "layout": { /* plotly layout */ }
  },
  "facets": {
    "kinds":     ["critique", "model", "benchmark"],
    "topics":    ["benchmarks", "generalization"],
    "statuses":  ["published"],
    "org_types": ["academic"],
    "regions":   ["EU", "US"],
    "years":     [2020, 2021, 2022, 2023, 2024, 2025]
  },
  "warnings": ["lint output line 1", "lint output line 2"]
}
```

Map traces carry an `ids` array parallel to `x`/`y`, so the client can mask points by item id without recomputing geometry.

Fields a source format doesn't have are simply absent on the item. Views handle absence:
- Browse: omits empty chips.
- Map: items without `category` are skipped from the map view (and a warning surfaces).
- Table: blank cells.
- Topics & People: missing `people:` collapses that pane to an empty-state nudge.
- Timeline: items missing `year:` are hidden with a counter.

## 6. View specifications

**Stats** — Landing tab. Shows total counts (items, categories, relations, edges), a `format:` badge (papermap vs resourcelib), a horizontal bar chart for items-by-kind, and a top-15 bar chart for items-by-topic. Reads from `state.facets` and a simple aggregate over `state.items`. No filters.

**Browse** — Card grid. One card per filtered item: kind chip, label (large), title (medium), meta (small), why-blurb (italic), topic chips. Sorted by kind then label. Honors filters. For resourcelib corpora this is the "data vault" view; for native papermap, the same cards rendered from `papers`.

**Map** — Clustered-ring relationship graph. `Plotly.newPlot` on `state.map.traces` + `state.map.layout`. Filters mask points (set marker opacity to 0.1 on non-matches) and hide edges whose source or target is masked. No geometry recompute. The hub-category and ring layout come precomputed from the server.

**Table** — Sortable HTML table. Columns: kind · label · title · topics · year · status · region. Click column to sort ascending/descending. Honors filters. Pagination at 50 rows; "show all" toggle for small corpora.

**Topics & People (ranked)** — Two columns. Left: top topics by item count, with a horizontal bar and a `(N items)` count. Right: top people by substring-frequency over `items[*].people` (resourcelib already has this concept; native papermap currently doesn't, so the right column becomes an empty-state for native corpora). No filters in v1 — this view is the ranking.

**Timeline** — Horizontal axis = year (min..max from `facets.years`). Each item is a dot at its year, jittered vertically and coloured by kind. Hover shows label + title. Honors filters. Items missing `year:` are hidden with a counter at the top: "23 items have no year — add `year:` to include them."

## 7. Filters

One filter widget, used by Browse, Map, Table.

Each facet becomes a chip group:
- **Kind** (papermap category id or resourcelib kind id): exclusive or multi-select; default all on.
- **Topic** (multi-select; OR within the group, AND across groups).
- **Status / org_type / region** (multi-select).
- **Free-text** (text input; substring-matches `label`, `title`, `why`, `meta`).

Empty facets are hidden (no point showing an empty Region group on a corpus that has no regions).

Filters live in the URL hash so a refresh keeps state:
```
#/corpus/<name>?view=map&kind=critique,model&topic=benchmarks&q=ahlmann
```

The hash-routing is intentionally minimal: just enough that a refresh doesn't blow away filter state. No back-button per filter change.

## 8. Schema additions

### 8.1 resourcelib — add `year:` to items

```yaml
items:
  - id: ahlmann
    kind: critique
    topics: [benchmarks]
    year: 2025          # NEW — optional, 4-digit integer
    people: [Ahlmann-Eltze, Huber]
    title: "..."
```

Optional. Validator accepts items without `year:`. Used by the Timeline view.

### 8.2 papermap-native — accept `year:` and `topics:` on papers

```yaml
papers:
  - id: ahlmann
    category: reckoning
    label: "Ahlmann-Eltze 2025"
    title: "..."
    year: 2025          # NEW — optional
    topics: [benchmarks, generalization]  # NEW — optional
    people: [Ahlmann-Eltze, Huber]        # NEW — optional
```

All three are optional and additive — existing corpora keep parsing. The unified `Item` constructed from a native paper picks `year`/`topics`/`people` up when present.

### 8.3 unified `Item` dataclass

```python
@dataclass(frozen=True)
class Item:
    id: str
    label: str
    kind: str | None        # = category for native papermap
    topics: tuple[str, ...] = ()
    year: int | None = None
    status: str | None = None
    org_type: str | None = None
    region: str | None = None
    category: str | None = None
    title: str | None = None
    meta: str | None = None
    why: str | None = None
    weight: int = 1
    people: tuple[str, ...] = ()
```

This is the record every view consumes. Loaders normalise into it.

## 9. `papermap export` (secondary)

```bash
papermap export examples/fm-to-virtual-cells.yaml --out site/
```

Produces a folder layout:

```
site/
  index.html           (the shell; identical to live server's templates/index.html, with corpus name baked in)
  state.json           (the same payload /api/state would return)
  app.css
  app.js
  filters.js
  state.js
  views/*.js
```

The shell's `state.js` first checks for a sibling `state.json` and uses it if present; otherwise it falls back to fetching `/api/state/<name>`. That one tweak lets the same frontend serve both modes.

Static-host deployment of the export folder is whatever the deploy agent decides — `python -m http.server`, GitHub Pages, Cloudflare Pages, Netlify, S3 + CloudFront, all work.

This is v1.1 scope: the live server is shipped first; export is added once the live server is solid. The plan can sequence accordingly.

## 10. Deploy-agent prompt (a deliverable file)

`docs/deploy/agent-prompt.md` ships with the repo. It tells a downstream agent everything it needs:

- Repo URL: `https://github.com/Light-Kit/papermap`
- Build: `docker build -t papermap .`
- Port: `8000`
- Health probe: `GET /healthz` returns `200 OK` with body `ok`
- Mount: corpora directory mounted at `/corpora` (read-only)
- CLI: container runs `papermap serve /corpora --host 0.0.0.0 --port 8000 --no-browser`
- Env: none required; optional `PAPERMAP_TITLE=...` for the page `<title>`
- Hosting options (in increasing order of cost/permanence): Fly.io free tier, Railway, Render, Cloudflare Containers, AWS ECS Fargate
- Recommended hosting choice: Fly.io free tier (single small instance, free TLS, deploy from Dockerfile)
- Domain: optional — agent picks `papermap.lightkit.dev` if one is available, otherwise the platform-supplied URL is fine
- Output expected: the live URL + a one-line healthcheck result

This file is the deliverable handed off to the next agent. Writing it is part of v1.

## 11. Testing

**Loaders.** One round-trip test per format: load a fixture, assert the produced `Corpus.items` matches the expected list. Native parser keeps its existing tests untouched (it moves; tests follow).

**State payload.** Unit test on `papermap.state.build_state(corpus) → dict` — assert keys, facets, map traces include `ids` array, items have the expected unified shape.

**HTTP routes.** Existing `tests/test_server.py` grows three cases: `GET /api/state/<name>` for both formats; `GET /healthz`; `GET /api/state/<bad-name>` → 404.

**Views (no JS framework).** Each `views/*.js` is pure; we test by spawning a tiny headless harness with `jsdom` (`pytest` + `playwright` is overkill for v1). Concretely: a `tests/js/` folder runs `node --test` against the modules with hand-crafted `state` fixtures. Verifies the rendered DOM has the expected node counts and aria labels.

**Filters.** Pure function: `applyFilter(state.items, filters) → items`. Unit-test the function with several filter combinations.

**Export.** `papermap export fixture.yaml --out tmp/`, then assert tmp has the expected files and `tmp/state.json` parses.

## 12. Sequencing (informs the plan)

This spec consumes the bridge spec but does not redo it. Implementation order:

1. **Bridge** — per the bridge spec, implemented first. Ships resourcelib v0.2 and papermap v0.3-pre with the loader auto-detect. End-state: today's single map view works on resourcelib corpora.
2. **Schema unification** — add `year:`, `topics:`, `people:` to native papermap; add `Item` dataclass; native and resourcelib loaders both produce `items`. End-state: `Corpus.items` populated for both formats.
3. **State endpoint** — `/api/state/<name>` and `/healthz`. End-state: server returns the JSON payload; one curl test.
4. **Shell + router** — `index.html` shell with sidebar (corpus picker stays) and view tabs; `app.js` routes hash → view; old map fragment removed.
5. **Stats view** — smallest; reads facets only. End-state: corpus picked → Stats tab renders.
6. **Browse view** — card grid; no filters yet.
7. **Filters** — chip groups + free-text; URL hash. Browse becomes filterable.
8. **Map view** — `Plotly.newPlot` from `state.map`; filter masks.
9. **Table view** — sortable table with the same filters.
10. **Topics & People** — two ranked columns; no filters.
11. **Timeline** — year axis, jittered dots; honors filters.
12. **`papermap export`** — static-site emitter; smoke test.
13. **Deploy-agent prompt** — write `docs/deploy/agent-prompt.md`; verify it stands alone (a human reading it without project context should be able to deploy).

Steps 1–4 are the structural backbone. Steps 5–11 are independent views; they can ship in any order or in parallel. 12 and 13 close the loop.

## 13. Documentation updates

- `README.md` — replace the single "Serve" paragraph with a short "Views" section listing the six tabs, a screenshot of the shell, and a pointer to `docs/deploy/agent-prompt.md`.
- `docs/deploy/agent-prompt.md` — the deliverable per §10.
- `CHANGELOG.md` (new) — start one at v0.3.0 with the multi-view ship.
- Resourcelib README (separate PR) — note the optional `year:` addition (small footprint).

## 14. Risks

- **Frontend scope.** Six views and a filter widget without a build step is a lot of vanilla JS. Mitigation: each view module is small (target <120 LOC) and tested in isolation; ES modules keep the file boundaries honest. If the JS grows past ~800 LOC total, revisit and consider Lit or Preact (no build, CDN).
- **Plotly traces shipped in JSON.** The full-corpus traces can be large (a 250-item map = ~30 KB of JSON). Acceptable for v1; gzip helps. If a future corpus is 1000+ items, switch to server-side filter recomputation for the Map view only.
- **Resourcelib corpora without `papermap_categories`.** The Map view has nothing to render. Surface as a warning, hide the Map tab. (Browse/Table/Topics/Timeline still work.)
- **`year:` on legacy resourcelib items.** Adding it is optional, so existing corpora keep working. Timeline is just sparse until items get years.
