# Papermap Multi-View Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `papermap` v0.3 with a six-view local web app (Stats, Browse, Map, Table, Topics & People, Timeline), filters across Browse/Map/Table, silent auto-detect of resourcelib YAML, a `papermap export` static-site emitter, and a deploy-agent prompt.

**Architecture:** Flask exposes one new route `/api/state/<name>` that returns the full corpus as JSON. The browser fetches it once per corpus and renders all six views from that single in-memory state. Filters are pure DOM transforms. Map traces are precomputed server-side and masked client-side. The static export is the same payload, dumped to disk alongside the JS bundle.

**Tech Stack:** Python 3.10+, Flask 3, plotly, pyyaml, pytest. Frontend: vanilla ES modules, Plotly CDN, no build step.

---

## Phase 1 — Papermap-side bridge

Build the resourcelib loader and the format-detection dispatch. After this phase, `load_corpus("any-resourcelib.yaml")` returns a `Corpus`. Resourcelib corpora without `papermap_categories` produce a `Corpus` with empty `categories`/`relations`/`papers` (the existing map renderer rejects them — that's fine; the new viewer will handle this gracefully in Phase 8).

### Task 1: Create the `loaders/` package with detection

**Files:**
- Create: `papermap/loaders/__init__.py`
- Create: `papermap/loaders/detect.py`
- Test: `tests/test_loaders_detect.py`

- [ ] **Step 1: Write the failing test**

```python
# tests/test_loaders_detect.py
import pytest

from papermap.loaders.detect import Format, detect_format


def test_detects_native_papermap():
    raw = {"categories": [], "relations": [], "papers": [], "edges": []}
    assert detect_format(raw) == Format.PAPERMAP


def test_detects_resourcelib():
    raw = {"vocab": {}, "items": []}
    assert detect_format(raw) == Format.RESOURCELIB


def test_resourcelib_wins_when_both_present():
    raw = {"vocab": {}, "items": [], "categories": [], "papers": []}
    assert detect_format(raw) == Format.RESOURCELIB


def test_rejects_unknown_shape():
    with pytest.raises(ValueError, match="cannot detect format"):
        detect_format({"foo": "bar"})
```

- [ ] **Step 2: Run test to verify it fails**

```
pytest tests/test_loaders_detect.py -v
```
Expected: ModuleNotFoundError.

- [ ] **Step 3: Implement `detect_format`**

```python
# papermap/loaders/__init__.py
"""Format-aware corpus loading."""
from __future__ import annotations

from pathlib import Path

import yaml

from ..schema import Corpus, CorpusError
from .detect import Format, detect_format
from .native import load_native
from .resourcelib import load_resourcelib


def load_corpus(path: str | Path) -> Corpus:
    """Load a corpus from disk, auto-detecting native papermap or resourcelib format."""
    path = Path(path)
    if not path.exists():
        raise CorpusError(f"corpus file not found: {path}")
    raw = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise CorpusError(f"{path}: top level must be a mapping")
    fmt = detect_format(raw)
    if fmt is Format.RESOURCELIB:
        return load_resourcelib(raw, source=path)
    return load_native(raw, source=path)


__all__ = ["Format", "detect_format", "load_corpus", "load_native", "load_resourcelib"]
```

```python
# papermap/loaders/detect.py
"""Pick a parser based on the YAML's top-level shape."""
from __future__ import annotations

from enum import Enum


class Format(str, Enum):
    PAPERMAP = "papermap"
    RESOURCELIB = "resourcelib"


def detect_format(raw: dict) -> Format:
    """Return the matching format, or raise ValueError if neither fits.

    Resourcelib wins ties because its `vocab:` + `items:` keys are more
    distinctive than papermap's `categories:` + `papers:`, and any document
    carrying both is almost certainly a resourcelib corpus that also wants
    papermap views.
    """
    has_resourcelib = "vocab" in raw and "items" in raw
    has_papermap = "categories" in raw and "papers" in raw
    if has_resourcelib:
        return Format.RESOURCELIB
    if has_papermap:
        return Format.PAPERMAP
    raise ValueError(
        "cannot detect format: expected either `vocab:`+`items:` (resourcelib) "
        "or `categories:`+`papers:` (papermap)"
    )
```

- [ ] **Step 4: Native and resourcelib loader stubs**

```python
# papermap/loaders/native.py — at this point just delegates to the existing parser
"""Native papermap YAML loader (today's parser lives in ../schema.py for now)."""
from __future__ import annotations

from pathlib import Path

from ..schema import Corpus, _parse_raw_papermap


def load_native(raw: dict, source: Path | None = None) -> Corpus:
    """Parse a native papermap YAML mapping into a Corpus."""
    return _parse_raw_papermap(raw)
```

```python
# papermap/loaders/resourcelib.py — stub; filled in by Task 2
"""Resourcelib YAML loader → papermap Corpus adapter."""
from __future__ import annotations

from pathlib import Path

from ..schema import Corpus, CorpusError


def load_resourcelib(raw: dict, source: Path | None = None) -> Corpus:
    raise CorpusError("resourcelib loader not yet implemented (Task 2)")
```

The `_parse_raw_papermap` helper does not exist yet — Task 1.5 splits it out of the current `load_corpus`. Do that first.

- [ ] **Step 5: Refactor `papermap/schema.py` — split `load_corpus` into `_parse_raw_papermap`**

Find the existing `load_corpus` in `papermap/schema.py`. Rename it to `_parse_raw_papermap` and change its signature to take the already-parsed `raw: dict` (no path/IO). Keep all parsing/validation logic intact.

```python
# papermap/schema.py — replace the existing load_corpus with this two-step:

def load_corpus(path: str | Path) -> Corpus:
    """Deprecated: import from papermap.loaders. Kept for back-compat."""
    from .loaders import load_corpus as _load
    return _load(path)


def _parse_raw_papermap(raw: dict) -> Corpus:
    """Parse a native papermap YAML mapping into a Corpus (no IO)."""
    # ... existing parsing/validation logic from old load_corpus,
    # but starting from `raw` instead of reading from `path`.
```

- [ ] **Step 6: Run tests**

```
pytest tests/test_loaders_detect.py tests/test_papermap.py -v
```
Expected: all pass.

- [ ] **Step 7: Commit**

```
git add papermap/loaders/ papermap/schema.py tests/test_loaders_detect.py
git commit -m "Split corpus loading by format with auto-detection"
```

---

### Task 2: Implement the resourcelib → Corpus adapter

**Files:**
- Modify: `papermap/loaders/resourcelib.py`
- Create: `tests/fixtures/resourcelib_minimal.yaml`
- Test: `tests/test_loaders_resourcelib.py`

- [ ] **Step 1: Create the fixture**

```yaml
# tests/fixtures/resourcelib_minimal.yaml
title: "Minimal resourcelib fixture"
vocab:
  kinds:
    - {id: critique, label: Critique}
    - {id: model,    label: Model}
  topics:
    - {id: benchmarks,     label: Benchmarks}
    - {id: generalization, label: Generalization}
  statuses:
    - {id: published, label: Published}
  org_types:
    - {id: academic, label: Academic}
  regions:
    - {id: EU, label: Europe}
papermap_categories:
  - {id: reckoning, label: "The reckoning", color: "#d62728"}
  - {id: scfm,      label: "Model papers",  color: "#1f77b4"}
papermap_relations:
  - {id: evaluates, label: "evaluates / critiques", color: "#e8888a", dash: dash}
papermap_edges:
  - [ahlmann, scgpt, evaluates]
papermap_layout:
  hub_category: reckoning
  hub_node: ahlmann
items:
  - id: ahlmann
    kind: critique
    topics: [benchmarks, generalization]
    status: published
    org_type: academic
    region: EU
    year: 2025
    people: [Ahlmann-Eltze, Huber]
    papermap_category: reckoning
    label: "Ahlmann-Eltze 2025"
    title: "Deep-learning predictions don't generalize"
    meta: "Nature Methods · 2025"
    why: "THE canonical critique."
    weight: 3
  - id: scgpt
    kind: model
    topics: [generalization]
    status: published
    org_type: academic
    region: EU
    year: 2024
    people: [Cui]
    papermap_category: scfm
    label: "scGPT"
    title: "scGPT foundation model"
    meta: "Nature Methods · 2024"
    why: "Representative target of critique."
```

- [ ] **Step 2: Write the failing test**

```python
# tests/test_loaders_resourcelib.py
from pathlib import Path

import pytest

from papermap.loaders import load_corpus
from papermap.schema import CorpusError

FIX = Path(__file__).parent / "fixtures"


def test_loads_minimal_resourcelib_corpus():
    corpus = load_corpus(FIX / "resourcelib_minimal.yaml")
    assert corpus.title == "Minimal resourcelib fixture"
    assert [c.id for c in corpus.categories] == ["reckoning", "scfm"]
    assert [r.id for r in corpus.relations] == ["evaluates"]
    assert [p.id for p in corpus.papers] == ["ahlmann", "scgpt"]
    assert corpus.papers_by_id["ahlmann"].weight == 3
    assert corpus.layout.hub_category == "reckoning"
    assert corpus.layout.hub_node == "ahlmann"


def test_resourcelib_without_papermap_section_has_empty_map_data(tmp_path):
    raw = """
title: "No map"
vocab: {kinds: [{id: x, label: X}]}
items:
  - {id: a, kind: x, label: "A"}
"""
    p = tmp_path / "no-map.yaml"
    p.write_text(raw)
    corpus = load_corpus(p)
    assert corpus.categories == []
    assert corpus.relations == []
    assert corpus.papers == []
```

- [ ] **Step 3: Run test to verify it fails**

```
pytest tests/test_loaders_resourcelib.py -v
```
Expected: FAIL with "resourcelib loader not yet implemented".

- [ ] **Step 4: Implement the adapter**

```python
# papermap/loaders/resourcelib.py
"""Resourcelib YAML loader → papermap Corpus adapter.

Maps the resourcelib schema to papermap's existing Corpus dataclass.
When `papermap_categories` is absent the map portion is empty — Browse,
Table, Topics, Timeline still work on resourcelib items.
"""
from __future__ import annotations

from pathlib import Path

from ..schema import Category, Corpus, Edge, LayoutConfig, Paper, Relation


def load_resourcelib(raw: dict, source: Path | None = None) -> Corpus:
    categories = [
        Category(id=str(c["id"]), label=str(c.get("label", c["id"])), color=str(c["color"]))
        for c in raw.get("papermap_categories", [])
    ]
    relations = [
        Relation(
            id=str(r["id"]),
            label=str(r.get("label", r["id"])),
            color=str(r["color"]),
            dash=str(r.get("dash", "solid")),
        )
        for r in raw.get("papermap_relations", [])
    ]

    papers: list[Paper] = []
    if categories:
        for it in raw.get("items", []):
            if "papermap_category" not in it:
                continue
            papers.append(Paper(
                id=str(it["id"]),
                category=str(it["papermap_category"]),
                label=str(it.get("label", it["id"])),
                title=str(it.get("title", "")),
                meta=str(it.get("meta", "")),
                why=str(it.get("why", "")),
                weight=int(it.get("weight", 1)),
            ))

    edges = [
        Edge(str(e[0]), str(e[1]), str(e[2]))
        for e in raw.get("papermap_edges", [])
        if isinstance(e, (list, tuple)) and len(e) == 3
    ]

    layout_raw = raw.get("papermap_layout") or {}
    layout = LayoutConfig(
        hub_category=layout_raw.get("hub_category"),
        hub_node=layout_raw.get("hub_node"),
        ring_radius=float(layout_raw.get("ring_radius", 12.0)),
        hub_ring_radius=float(layout_raw.get("hub_ring_radius", 3.8)),
        cluster_radius_scale=float(layout_raw.get("cluster_radius_scale", 0.34)),
        cluster_radius_min=float(layout_raw.get("cluster_radius_min", 0.95)),
        cluster_radius_max=float(layout_raw.get("cluster_radius_max", 3.0)),
    )

    return Corpus(
        title=str(raw.get("title", "Resourcelib corpus")),
        subtitle=str(raw.get("subtitle", "")),
        categories=categories,
        relations=relations,
        papers=papers,
        edges=edges,
        layout=layout,
    )
```

- [ ] **Step 5: Run tests**

```
pytest tests/test_loaders_resourcelib.py -v
```
Expected: both pass.

- [ ] **Step 6: Commit**

```
git add papermap/loaders/resourcelib.py tests/test_loaders_resourcelib.py tests/fixtures/resourcelib_minimal.yaml
git commit -m "Add resourcelib YAML adapter"
```

---

## Phase 2 — Schema unification

Add an `Item` dataclass that both formats produce. This is what the viewer consumes.

### Task 3: Add the `Item` dataclass and `Corpus.items`

**Files:**
- Modify: `papermap/schema.py` — add Item; add `items: list[Item]` to Corpus.
- Modify: `papermap/loaders/native.py` — populate `items` from `papers`.
- Modify: `papermap/loaders/resourcelib.py` — populate `items` from resourcelib `items:`.
- Test: `tests/test_items.py`

- [ ] **Step 1: Write the failing test**

```python
# tests/test_items.py
from pathlib import Path

from papermap.loaders import load_corpus

FIX = Path(__file__).parent / "fixtures"


def test_native_papermap_produces_items():
    corpus = load_corpus("examples/fm-to-virtual-cells.yaml")
    assert len(corpus.items) == len(corpus.papers)
    for item, paper in zip(corpus.items, corpus.papers):
        assert item.id == paper.id
        assert item.label == paper.label
        assert item.kind == paper.category
        assert item.category == paper.category


def test_resourcelib_produces_items_with_kind_and_topics():
    corpus = load_corpus(FIX / "resourcelib_minimal.yaml")
    by_id = {it.id: it for it in corpus.items}
    assert by_id["ahlmann"].kind == "critique"
    assert by_id["ahlmann"].topics == ("benchmarks", "generalization")
    assert by_id["ahlmann"].year == 2025
    assert by_id["ahlmann"].people == ("Ahlmann-Eltze", "Huber")
    assert by_id["ahlmann"].status == "published"
```

- [ ] **Step 2: Run test to verify it fails**

```
pytest tests/test_items.py -v
```
Expected: AttributeError on `corpus.items`.

- [ ] **Step 3: Add the `Item` dataclass**

In `papermap/schema.py`, after `Edge`:

```python
@dataclass(frozen=True)
class Item:
    """Unified record consumed by views. Built from native Paper or resourcelib item.

    Map-related fields (category, weight, title, meta, why) come from native
    Paper or from `papermap_category`/`label`/etc on a resourcelib item.
    Browse/Table/Timeline/Topics fields (kind, topics, year, ...) are
    resourcelib-first; native papermap may carry them as optional fields.
    """
    id: str
    label: str
    kind: str | None = None
    topics: tuple[str, ...] = ()
    year: int | None = None
    status: str | None = None
    org_type: str | None = None
    region: str | None = None
    category: str | None = None
    title: str = ""
    meta: str = ""
    why: str = ""
    weight: int = 1
    people: tuple[str, ...] = ()
```

Add `items: list[Item] = field(default_factory=list)` to the `Corpus` dataclass.

- [ ] **Step 4: Populate `items` in the native loader**

Update `papermap/loaders/native.py` to fill `Corpus.items` from the parsed papers, picking up optional `year`, `topics`, `people` from the YAML if present:

```python
# papermap/loaders/native.py
from __future__ import annotations

from pathlib import Path

from ..schema import Corpus, Item, _parse_raw_papermap


def load_native(raw: dict, source: Path | None = None) -> Corpus:
    corpus = _parse_raw_papermap(raw)
    raw_by_id = {p["id"]: p for p in raw.get("papers", []) if isinstance(p, dict) and "id" in p}
    items: list[Item] = []
    for paper in corpus.papers:
        rawp = raw_by_id.get(paper.id, {})
        items.append(Item(
            id=paper.id,
            label=paper.label,
            kind=paper.category,
            topics=tuple(rawp.get("topics", []) or []),
            year=int(rawp["year"]) if "year" in rawp else None,
            status=rawp.get("status"),
            org_type=rawp.get("org_type"),
            region=rawp.get("region"),
            category=paper.category,
            title=paper.title,
            meta=paper.meta,
            why=paper.why,
            weight=paper.weight,
            people=tuple(rawp.get("people", []) or []),
        ))
    corpus.items = items
    return corpus
```

(Items will mutate `corpus.items`; that means `Corpus` cannot be frozen. Confirm it isn't — current schema uses `@dataclass` not `@dataclass(frozen=True)`.)

- [ ] **Step 5: Populate `items` in the resourcelib loader**

In `papermap/loaders/resourcelib.py`, before the final `return Corpus(...)`:

```python
items: list[Item] = []
for it in raw.get("items", []):
    if not isinstance(it, dict) or "id" not in it:
        continue
    items.append(Item(
        id=str(it["id"]),
        label=str(it.get("label", it["id"])),
        kind=str(it["kind"]) if "kind" in it else None,
        topics=tuple(it.get("topics", []) or []),
        year=int(it["year"]) if "year" in it else None,
        status=it.get("status"),
        org_type=it.get("org_type"),
        region=it.get("region"),
        category=it.get("papermap_category"),
        title=str(it.get("title", "")),
        meta=str(it.get("meta", "")),
        why=str(it.get("why", "")),
        weight=int(it.get("weight", 1)),
        people=tuple(it.get("people", []) or []),
    ))
```

Then set `corpus.items = items` after constructing the Corpus.

You'll also need `from ..schema import Item` at the top of the file.

- [ ] **Step 6: Export Item from `papermap/__init__.py`**

```python
# papermap/__init__.py — add to imports + __all__
from .schema import (..., Item, ...)
__all__ = [..., "Item", ...]
```

- [ ] **Step 7: Run tests**

```
pytest tests/test_items.py -v
pytest -v
```
Expected: all pass.

- [ ] **Step 8: Commit**

```
git add papermap/schema.py papermap/loaders/native.py papermap/loaders/resourcelib.py papermap/__init__.py tests/test_items.py
git commit -m "Add unified Item dataclass populated by both loaders"
```

---

## Phase 3 — State endpoint + healthz

### Task 4: Build the `state` module — pure function corpus → JSON payload

**Files:**
- Create: `papermap/state.py`
- Test: `tests/test_state.py`

- [ ] **Step 1: Write the failing test**

```python
# tests/test_state.py
from pathlib import Path

from papermap.loaders import load_corpus
from papermap.state import build_state

FIX = Path(__file__).parent / "fixtures"


def test_state_payload_for_resourcelib():
    corpus = load_corpus(FIX / "resourcelib_minimal.yaml")
    state = build_state(corpus, name="resourcelib_minimal", format_label="resourcelib")
    assert state["name"] == "resourcelib_minimal"
    assert state["format"] == "resourcelib"
    assert state["title"] == "Minimal resourcelib fixture"
    assert {it["id"] for it in state["items"]} == {"ahlmann", "scgpt"}
    f = state["facets"]
    assert "critique" in f["kinds"]
    assert "benchmarks" in f["topics"]
    assert 2024 in f["years"] and 2025 in f["years"]
    assert "Ahlmann-Eltze" in {p for it in state["items"] for p in it["people"]}
    assert state["map"]["traces"]  # non-empty


def test_state_payload_native_papermap():
    corpus = load_corpus("examples/fm-to-virtual-cells.yaml")
    state = build_state(corpus, name="fm", format_label="papermap")
    assert state["format"] == "papermap"
    assert state["map"]["traces"]


def test_state_omits_map_when_no_categories(tmp_path):
    p = tmp_path / "no-map.yaml"
    p.write_text("""
title: "No map"
vocab: {kinds: [{id: x, label: X}]}
items:
  - {id: a, kind: x, label: "A"}
""")
    corpus = load_corpus(p)
    state = build_state(corpus, name="no-map", format_label="resourcelib")
    assert state["map"]["traces"] == []
    assert state["map"]["layout"] == {}
```

- [ ] **Step 2: Run test to verify it fails**

```
pytest tests/test_state.py -v
```
Expected: ModuleNotFoundError.

- [ ] **Step 3: Implement `build_state`**

```python
# papermap/state.py
"""Pure function: Corpus → JSON-serialisable state payload for the frontend."""
from __future__ import annotations

from dataclasses import asdict
from typing import Any

from .render import build_figure
from .schema import Corpus, lint_corpus


def build_state(corpus: Corpus, *, name: str, format_label: str) -> dict[str, Any]:
    """Build the JSON state payload the browser consumes.

    `name` is the corpus's URL-safe identifier (typically the filename stem).
    `format_label` is "papermap" or "resourcelib".
    """
    items = [_item_to_dict(i) for i in corpus.items]
    facets = {
        "kinds":     _unique([i["kind"] for i in items if i.get("kind")]),
        "topics":    _unique([t for i in items for t in i.get("topics", [])]),
        "statuses":  _unique([i["status"] for i in items if i.get("status")]),
        "org_types": _unique([i["org_type"] for i in items if i.get("org_type")]),
        "regions":   _unique([i["region"] for i in items if i.get("region")]),
        "years":     sorted({int(i["year"]) for i in items if i.get("year") is not None}),
    }

    if corpus.categories and corpus.papers:
        fig = build_figure(corpus)
        fd = fig.to_dict()
        map_payload = {
            "traces": [_trace_with_ids(t, corpus) for t in fd["data"]],
            "layout": fd["layout"],
        }
    else:
        map_payload = {"traces": [], "layout": {}}

    return {
        "name": name,
        "format": format_label,
        "title": corpus.title,
        "items": items,
        "categories": [{"id": c.id, "label": c.label, "color": c.color}
                       for c in corpus.categories],
        "relations": [{"id": r.id, "label": r.label, "color": r.color, "dash": r.dash}
                      for r in corpus.relations],
        "edges": [[e.source, e.target, e.relation] for e in corpus.edges],
        "map": map_payload,
        "facets": facets,
        "warnings": lint_corpus(corpus),
    }


def _item_to_dict(item) -> dict:
    d = asdict(item)
    d["topics"] = list(d["topics"])
    d["people"] = list(d["people"])
    return d


def _unique(values: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for v in values:
        if v not in seen:
            seen.add(v)
            out.append(v)
    return out


def _trace_with_ids(trace: dict, corpus: Corpus) -> dict:
    """Attach an `ids` array to node traces so the client can mask by item id.

    Edge traces (mode='lines') and node traces (mode containing 'markers')
    are emitted by render.py in a fixed order: relations first, then one
    trace per category. For node traces, the per-point ids are the papers
    in that category that were placed in the layout.
    """
    mode = trace.get("mode", "")
    if "markers" not in mode:
        return trace
    name = trace.get("name", "")
    cat = next((c for c in corpus.categories if c.label == name), None)
    if cat is None:
        return trace
    from .layout import compute_layout
    pos, _ = compute_layout(corpus)
    ids = [p.id for p in corpus.papers_in(cat.id) if p.id in pos]
    out = dict(trace)
    out["ids"] = ids
    return out
```

- [ ] **Step 4: Run tests**

```
pytest tests/test_state.py -v
```
Expected: all pass.

- [ ] **Step 5: Commit**

```
git add papermap/state.py tests/test_state.py
git commit -m "Add build_state — pure Corpus → JSON state payload"
```

---

### Task 5: Wire up `/api/state/<name>` and `/healthz`

**Files:**
- Modify: `papermap/server.py`
- Modify: `tests/test_server.py`

- [ ] **Step 1: Write the failing test**

Add to `tests/test_server.py`:

```python
def test_api_state_returns_payload(client):
    resp = client.get("/api/state/good")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["name"] == "good"
    assert data["format"] == "papermap"
    assert data["title"] == "t"
    assert {it["id"] for it in data["items"]} == {"p1", "p2"}
    assert data["facets"]["kinds"] == ["a"]


def test_api_state_404_for_unknown(client):
    resp = client.get("/api/state/nope")
    assert resp.status_code == 404


def test_healthz(client):
    resp = client.get("/healthz")
    assert resp.status_code == 200
    assert resp.data == b"ok"
```

- [ ] **Step 2: Run test to verify it fails**

```
pytest tests/test_server.py -v
```
Expected: 404 (route doesn't exist).

- [ ] **Step 3: Implement the routes**

In `papermap/server.py`, replace the existing `/api/map/<name>` block with `/api/state/<name>`, and add `/healthz`:

```python
from .loaders import Format, detect_format, load_corpus
from .state import build_state
import yaml

# ... inside create_app ...

@app.get("/api/state/<path:name>")
def state_for(name: str):
    path = _resolve(app.config["CORPUS_DIR"], name)
    try:
        corpus = load_corpus(path)
    except CorpusError as exc:
        return jsonify({"error": str(exc)}), 422
    raw = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    fmt = "resourcelib" if detect_format(raw) is Format.RESOURCELIB else "papermap"
    return jsonify(build_state(corpus, name=path.stem, format_label=fmt))

@app.get("/healthz")
def healthz():
    return ("ok", 200, {"Content-Type": "text/plain"})
```

Remove the old `/api/map/<path:name>` route. Keep `/download/<path:name>` unchanged.

- [ ] **Step 4: Run tests**

```
pytest tests/test_server.py -v
```
Expected: all pass.

- [ ] **Step 5: Commit**

```
git add papermap/server.py tests/test_server.py
git commit -m "Add /api/state/<name> and /healthz; remove /api/map"
```

---

## Phase 4 — Frontend shell + view router

### Task 6: Replace `templates/index.html` with the multi-view shell

**Files:**
- Modify: `papermap/templates/index.html`
- Modify: `papermap/static/app.css`

- [ ] **Step 1: New shell**

Overwrite `papermap/templates/index.html` with:

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
  <section id="content">
    <nav id="viewtabs" hidden>
      <button data-view="stats">Stats</button>
      <button data-view="browse">Browse</button>
      <button data-view="map">Map</button>
      <button data-view="table">Table</button>
      <button data-view="ranked">Topics &amp; People</button>
      <button data-view="timeline">Timeline</button>
    </nav>
    <div id="filterbar" hidden></div>
    <main id="main">
      <p class="placeholder">Pick a corpus from the sidebar.</p>
    </main>
  </section>
  <script type="module" src="{{ url_for('static', filename='app.js') }}"></script>
</body>
</html>
```

- [ ] **Step 2: Add styles for tabs + filter bar**

Append to `papermap/static/app.css`:

```css
body { grid-template-columns: 260px 1fr; }

#content {
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
  height: 100vh;
}

#viewtabs {
  display: flex;
  gap: 4px;
  padding: 10px 22px 0;
  border-bottom: 1px solid #e5e5e3;
}

#viewtabs button {
  border: 0;
  background: transparent;
  padding: 8px 14px;
  font: inherit;
  color: #444;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

#viewtabs button:hover { color: #1f77b4; }
#viewtabs button.active {
  color: #1f77b4;
  border-bottom-color: #1f77b4;
}

#filterbar {
  padding: 8px 22px;
  border-bottom: 1px solid #f0f0ee;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  font-size: 12px;
}

#filterbar .group {
  display: flex;
  align-items: center;
  gap: 6px;
}

#filterbar .group b {
  color: #666;
  margin-right: 2px;
}

#filterbar .chip {
  border: 1px solid #d0d0cc;
  border-radius: 12px;
  padding: 2px 8px;
  cursor: pointer;
  background: #fff;
}

#filterbar .chip.on {
  background: #1f77b4;
  color: white;
  border-color: #1f77b4;
}

#filterbar input[type="search"] {
  flex: 1 1 220px;
  min-width: 140px;
  padding: 4px 8px;
  border: 1px solid #d0d0cc;
  border-radius: 4px;
  font: inherit;
}
```

- [ ] **Step 3: Commit**

```
git add papermap/templates/index.html papermap/static/app.css
git commit -m "Add multi-view shell — tabs and filter bar"
```

---

### Task 7: Rewrite `static/app.js` as a view router

**Files:**
- Modify: `papermap/static/app.js`
- Create: `papermap/static/state.js`
- Create: `papermap/static/views/stats.js` (stub)
- Create: `papermap/static/views/browse.js` (stub)
- Create: `papermap/static/views/map.js` (stub)
- Create: `papermap/static/views/table.js` (stub)
- Create: `papermap/static/views/ranked.js` (stub)
- Create: `papermap/static/views/timeline.js` (stub)
- Modify: `pyproject.toml` — add `static/views/*.js` to package-data

- [ ] **Step 1: Update package-data to include the new files**

In `pyproject.toml` replace the `package-data` block with:

```toml
[tool.setuptools.package-data]
papermap = [
    "templates/*.html",
    "static/*.js",
    "static/*.css",
    "static/views/*.js",
]
```

- [ ] **Step 2: Create the per-view stubs**

For each of `stats.js`, `browse.js`, `map.js`, `table.js`, `ranked.js`, `timeline.js`:

```javascript
// papermap/static/views/<name>.js
export function render(state, filters, el) {
  el.innerHTML = `<p class="placeholder">[<name> view — not implemented yet]</p>`;
}
```

(Replace `<name>` literally in each file.)

- [ ] **Step 3: Create `state.js`**

```javascript
// papermap/static/state.js
"use strict";

// One in-memory state per corpus. Views read; never write.
let _state = null;

export async function loadState(name) {
  // Static-export fallback: a sibling state.json wins if present.
  try {
    const local = await fetch("./state.json", { method: "GET" });
    if (local.ok) {
      _state = await local.json();
      return _state;
    }
  } catch (_) { /* ignore — fall through */ }

  const resp = await fetch(`/api/state/${encodeURIComponent(name)}`);
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || `${resp.status} ${resp.statusText}`);
  }
  _state = await resp.json();
  return _state;
}

export function getState() { return _state; }
```

- [ ] **Step 4: Rewrite `app.js`**

Replace `papermap/static/app.js` with:

```javascript
// papermap/static/app.js
"use strict";

import { loadState, getState } from "./state.js";
import * as stats    from "./views/stats.js";
import * as browse   from "./views/browse.js";
import * as mapView  from "./views/map.js";
import * as table    from "./views/table.js";
import * as ranked   from "./views/ranked.js";
import * as timeline from "./views/timeline.js";

const sidebar  = document.getElementById("corpora");
const tabsBar  = document.getElementById("viewtabs");
const main     = document.getElementById("main");

const views = { stats, browse, map: mapView, table, ranked, timeline };
const filters = {  // mutable; populated by filters.js in Phase 7
  kinds: new Set(), topics: new Set(), statuses: new Set(),
  org_types: new Set(), regions: new Set(), q: "",
};

let activeCorpus = null;
let activeView = "stats";

async function init() {
  const resp = await fetch("/api/corpora");
  const items = await resp.json();
  for (const it of items) {
    const li = document.createElement("li");
    li.textContent = it.title || it.name;
    li.dataset.name = it.name;
    if (!it.valid) { li.classList.add("invalid"); li.title = it.error || "invalid"; }
    li.addEventListener("click", () => pickCorpus(li, it));
    sidebar.appendChild(li);
  }
  for (const btn of tabsBar.querySelectorAll("button")) {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  }
  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
}

async function pickCorpus(li, item) {
  if (!item.valid) {
    main.innerHTML = `<div class="error">${item.name}: ${item.error}</div>`;
    tabsBar.hidden = true;
    return;
  }
  document.querySelectorAll("#corpora li.active").forEach(el => el.classList.remove("active"));
  li.classList.add("active");
  main.innerHTML = '<p class="placeholder">Loading…</p>';
  try {
    await loadState(item.name);
  } catch (exc) {
    main.innerHTML = `<div class="error">${exc.message}</div>`;
    return;
  }
  activeCorpus = item.name;
  tabsBar.hidden = false;
  setView(activeView);
  writeHash();
}

function setView(name) {
  if (!views[name]) return;
  activeView = name;
  for (const btn of tabsBar.querySelectorAll("button")) {
    btn.classList.toggle("active", btn.dataset.view === name);
  }
  const state = getState();
  if (!state) return;
  // Hide the Map tab when the corpus has no map data.
  const mapBtn = tabsBar.querySelector('button[data-view="map"]');
  mapBtn.hidden = !state.map.traces.length;
  if (mapBtn.hidden && name === "map") return setView("browse");
  main.innerHTML = "";
  views[name].render(state, filters, main);
  writeHash();
}

function writeHash() {
  if (!activeCorpus) return;
  const h = `#/corpus/${encodeURIComponent(activeCorpus)}?view=${activeView}`;
  if (location.hash !== h) history.replaceState(null, "", h);
}

function routeFromHash() {
  const m = /^#\/corpus\/([^?]+)\?view=([a-z]+)/.exec(location.hash);
  if (!m) return;
  const [_, name, view] = m;
  activeView = view;
  // The corpus picker is already populated; click the matching li.
  const li = sidebar.querySelector(`li[data-name="${decodeURIComponent(name)}"]`);
  if (li && !li.classList.contains("active")) li.click();
}

init();
```

- [ ] **Step 5: Smoke test the server**

```
pytest tests/test_server.py -v
```
Expected: all pass (no view code is hit yet).

- [ ] **Step 6: Commit**

```
git add papermap/static papermap/templates pyproject.toml
git commit -m "Add static module bundle — router + per-view stubs"
```

---

## Phase 5 — Stats view

### Task 8: Implement the Stats view

**Files:**
- Modify: `papermap/static/views/stats.js`

- [ ] **Step 1: Write the implementation**

```javascript
// papermap/static/views/stats.js
"use strict";

export function render(state, _filters, el) {
  const div = document.createElement("div");
  div.className = "view stats";

  const header = document.createElement("header");
  header.innerHTML = `<h2>${escape(state.title)}</h2>
    <span class="stats">${state.items.length} items ·
      ${state.categories.length} categories ·
      ${state.relations.length} relations ·
      ${state.edges.length} edges ·
      <code>${state.format}</code></span>`;
  div.appendChild(header);

  if (state.warnings && state.warnings.length) {
    const w = document.createElement("div");
    w.className = "warnings";
    w.innerHTML = "<strong>Lint warnings</strong>";
    const ul = document.createElement("ul");
    for (const msg of state.warnings) {
      const li = document.createElement("li");
      li.textContent = msg;
      ul.appendChild(li);
    }
    w.appendChild(ul);
    div.appendChild(w);
  }

  div.appendChild(barChart("By kind", countBy(state.items, "kind")));
  div.appendChild(barChart("Top topics",
    topN(countByTopic(state.items), 15)));

  el.appendChild(div);
}

function countBy(items, key) {
  const counts = new Map();
  for (const it of items) {
    const v = it[key];
    if (v == null) continue;
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function countByTopic(items) {
  const counts = new Map();
  for (const it of items) {
    for (const t of it.topics || []) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function topN(pairs, n) { return pairs.slice(0, n); }

function barChart(title, rows) {
  const max = Math.max(1, ...rows.map(r => r[1]));
  const wrap = document.createElement("section");
  wrap.className = "bar-chart";
  wrap.innerHTML = `<h3>${escape(title)}</h3>`;
  const list = document.createElement("ul");
  for (const [label, count] of rows) {
    const li = document.createElement("li");
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label;
    const bar = document.createElement("span");
    bar.className = "bar";
    bar.style.width = `${(count / max) * 100}%`;
    const n = document.createElement("span");
    n.className = "n";
    n.textContent = count;
    li.appendChild(lbl);
    li.appendChild(bar);
    li.appendChild(n);
    list.appendChild(li);
  }
  wrap.appendChild(list);
  return wrap;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
```

- [ ] **Step 2: Add bar-chart styles**

Append to `papermap/static/app.css`:

```css
.view { padding: 18px 22px; overflow-y: auto; height: 100%; }
.view header { display: flex; align-items: baseline; gap: 18px; }
.view h2 { margin: 0; font-size: 18px; }
.view .stats { color: #666; font-size: 12px; }

.bar-chart { margin: 20px 0; }
.bar-chart h3 { margin: 0 0 8px; font-size: 13px; color: #555; }
.bar-chart ul { list-style: none; margin: 0; padding: 0; }
.bar-chart li {
  display: grid;
  grid-template-columns: 140px 1fr 36px;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  font-size: 12px;
}
.bar-chart .lbl { color: #444; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bar-chart .bar { background: #1f77b4; height: 10px; border-radius: 2px; }
.bar-chart .n { color: #666; text-align: right; }
```

- [ ] **Step 3: Smoke test in browser**

(Manual.) `make serve`, click a corpus. Stats tab should show counts and two bar charts.

- [ ] **Step 4: Commit**

```
git add papermap/static/views/stats.js papermap/static/app.css
git commit -m "Implement Stats view — counts + by-kind + top-topics bar charts"
```

---

## Phase 6 — Browse view

### Task 9: Implement the Browse card grid

**Files:**
- Modify: `papermap/static/views/browse.js`
- Modify: `papermap/static/app.css`

- [ ] **Step 1: Implementation**

```javascript
// papermap/static/views/browse.js
"use strict";

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view browse";
  const items = applyFilter(state.items, filters);

  const header = document.createElement("header");
  header.innerHTML = `<h2>${state.items.length} items
    <small>(${items.length} shown)</small></h2>`;
  div.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "card-grid";
  for (const it of sortItems(items)) {
    grid.appendChild(card(it));
  }
  if (!items.length) {
    grid.innerHTML = `<p class="placeholder">No items match the current filters.</p>`;
  }
  div.appendChild(grid);
  el.appendChild(div);
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    const k = (a.kind || "").localeCompare(b.kind || "");
    return k !== 0 ? k : (a.label || "").localeCompare(b.label || "");
  });
}

function card(it) {
  const c = document.createElement("article");
  c.className = "card";
  c.innerHTML = `
    ${it.kind ? `<span class="chip kind">${escape(it.kind)}</span>` : ""}
    <h4>${escape(it.label || it.id)}</h4>
    ${it.title ? `<p class="title">${escape(it.title)}</p>` : ""}
    ${it.meta  ? `<p class="meta">${escape(it.meta)}</p>` : ""}
    ${it.why   ? `<p class="why"><em>${escape(it.why)}</em></p>` : ""}
    ${(it.topics || []).map(t =>
      `<span class="chip topic">${escape(t)}</span>`).join("")}
  `;
  return c;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
```

- [ ] **Step 2: Add card styles**

Append to `papermap/static/app.css`:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
  margin-top: 14px;
}
.card {
  background: #fff;
  border: 1px solid #e5e5e3;
  border-radius: 6px;
  padding: 12px;
  font-size: 12px;
}
.card h4 { margin: 4px 0 6px; font-size: 13px; }
.card .title { margin: 0 0 4px; color: #333; }
.card .meta  { margin: 0 0 6px; color: #777; font-size: 11px; }
.card .why   { margin: 0 0 8px; color: #555; }
.chip {
  display: inline-block;
  background: #f2f2f1;
  color: #555;
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 10.5px;
  margin: 1px 2px 1px 0;
}
.chip.kind { background: #e7f0fa; color: #1f77b4; }
```

- [ ] **Step 3: Create the filters module (stub for now — applyFilter no-op)**

```javascript
// papermap/static/filters.js
"use strict";

export function applyFilter(items, filters) {
  let out = items;
  if (filters.kinds && filters.kinds.size) {
    out = out.filter(it => filters.kinds.has(it.kind));
  }
  if (filters.topics && filters.topics.size) {
    out = out.filter(it => (it.topics || []).some(t => filters.topics.has(t)));
  }
  if (filters.statuses && filters.statuses.size) {
    out = out.filter(it => filters.statuses.has(it.status));
  }
  if (filters.org_types && filters.org_types.size) {
    out = out.filter(it => filters.org_types.has(it.org_type));
  }
  if (filters.regions && filters.regions.size) {
    out = out.filter(it => filters.regions.has(it.region));
  }
  if (filters.q && filters.q.trim()) {
    const q = filters.q.trim().toLowerCase();
    out = out.filter(it => [it.label, it.title, it.why, it.meta]
      .some(s => (s || "").toLowerCase().includes(q)));
  }
  return out;
}
```

- [ ] **Step 4: Package-data update**

Update `[tool.setuptools.package-data]` in `pyproject.toml` to include `static/*.js` (already covered by the existing `static/*.js` glob). No change needed.

- [ ] **Step 5: Smoke test in browser**

`make serve`, click Browse tab. Cards should render, no filters yet.

- [ ] **Step 6: Commit**

```
git add papermap/static/views/browse.js papermap/static/filters.js papermap/static/app.css
git commit -m "Implement Browse view + filter primitive"
```

---

## Phase 7 — Filter widget

### Task 10: Implement the filter bar

**Files:**
- Create: `papermap/static/filterbar.js`
- Modify: `papermap/static/app.js` — wire up the filter bar, re-render on filter change
- Modify: `pyproject.toml` — include `filterbar.js`

- [ ] **Step 1: Create filterbar.js**

```javascript
// papermap/static/filterbar.js
"use strict";

const GROUPS = [
  { key: "kinds",     label: "Kind",     facet: "kinds" },
  { key: "topics",    label: "Topic",    facet: "topics" },
  { key: "statuses",  label: "Status",   facet: "statuses" },
  { key: "org_types", label: "Org",      facet: "org_types" },
  { key: "regions",   label: "Region",   facet: "regions" },
];

export function mount(barEl, state, filters, onChange) {
  barEl.innerHTML = "";
  for (const g of GROUPS) {
    const values = state.facets[g.facet] || [];
    if (!values.length) continue;
    const group = document.createElement("div");
    group.className = "group";
    group.innerHTML = `<b>${g.label}</b>`;
    for (const v of values) {
      const chip = document.createElement("span");
      chip.className = "chip" + (filters[g.key].has(v) ? " on" : "");
      chip.textContent = v;
      chip.addEventListener("click", () => {
        if (filters[g.key].has(v)) filters[g.key].delete(v);
        else filters[g.key].add(v);
        chip.classList.toggle("on");
        onChange();
      });
      group.appendChild(chip);
    }
    barEl.appendChild(group);
  }
  const search = document.createElement("input");
  search.type = "search";
  search.placeholder = "Search label / title / why";
  search.value = filters.q || "";
  search.addEventListener("input", () => {
    filters.q = search.value;
    onChange();
  });
  barEl.appendChild(search);
}
```

- [ ] **Step 2: Wire up in app.js**

In `papermap/static/app.js`, after the `views` and `filters` definitions, add:

```javascript
import { mount as mountFilterBar } from "./filterbar.js";
const filterBar = document.getElementById("filterbar");
```

Inside `pickCorpus`, after `await loadState(item.name);`, before `setView(activeView);`:

```javascript
// Reset filters on corpus change
filters.kinds.clear(); filters.topics.clear(); filters.statuses.clear();
filters.org_types.clear(); filters.regions.clear(); filters.q = "";
filterBar.hidden = false;
mountFilterBar(filterBar, getState(), filters, () => setView(activeView));
```

Also: hide `filterBar` on views that don't use filters. In `setView`:

```javascript
const filterableViews = new Set(["browse", "map", "table"]);
filterBar.hidden = !filterableViews.has(name);
```

- [ ] **Step 3: Update pyproject.toml**

```toml
[tool.setuptools.package-data]
papermap = [
    "templates/*.html",
    "static/*.js",
    "static/*.css",
    "static/views/*.js",
]
```

(Already correct from Task 7. No change.)

- [ ] **Step 4: Smoke test**

`make serve`, pick a resourcelib corpus. Chips appear; clicking a chip filters the Browse cards.

- [ ] **Step 5: Commit**

```
git add papermap/static/filterbar.js papermap/static/app.js
git commit -m "Implement filter bar — chip groups + free-text search"
```

---

## Phase 8 — Map view

### Task 11: Implement the Map view (Plotly.newPlot, mask by id)

**Files:**
- Modify: `papermap/static/views/map.js`

- [ ] **Step 1: Implementation**

```javascript
// papermap/static/views/map.js
"use strict";

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view map";
  el.appendChild(div);

  if (!state.map.traces.length) {
    div.innerHTML = `<p class="placeholder">This corpus has no map data.</p>`;
    return;
  }

  const allowed = new Set(applyFilter(state.items, filters).map(i => i.id));
  const traces = state.map.traces.map(t => maskTrace(t, allowed));

  const figDiv = document.createElement("div");
  figDiv.style.height = "calc(100vh - 160px)";
  div.appendChild(figDiv);

  // eslint-disable-next-line no-undef
  Plotly.newPlot(figDiv, traces, state.map.layout,
    { responsive: true, displaylogo: false });
}

function maskTrace(trace, allowed) {
  // Edge traces (mode='lines') have no `ids` — return as-is.
  if (!Array.isArray(trace.ids)) return trace;
  const keep = trace.ids.map(id => allowed.has(id));
  const pick = arr => arr.filter((_, i) => keep[i]);
  const out = { ...trace };
  out.ids = trace.ids.filter(id => allowed.has(id));
  for (const key of ["x", "y", "text", "textposition", "customdata"]) {
    if (Array.isArray(trace[key])) out[key] = pick(trace[key]);
  }
  if (trace.marker && Array.isArray(trace.marker.size)) {
    out.marker = { ...trace.marker, size: pick(trace.marker.size) };
  }
  return out;
}
```

- [ ] **Step 2: Smoke test**

`make serve`, click the Map tab on `fm-to-virtual-cells`. Map renders. Apply a kind filter — non-matching nodes disappear.

- [ ] **Step 3: Commit**

```
git add papermap/static/views/map.js
git commit -m "Implement Map view — client-side Plotly with filter masking"
```

---

## Phase 9 — Table view

### Task 12: Implement the Table view

**Files:**
- Modify: `papermap/static/views/table.js`
- Modify: `papermap/static/app.css`

- [ ] **Step 1: Implementation**

```javascript
// papermap/static/views/table.js
"use strict";

import { applyFilter } from "../filters.js";

const COLUMNS = [
  { key: "kind",    label: "Kind" },
  { key: "label",   label: "Label" },
  { key: "title",   label: "Title" },
  { key: "topics",  label: "Topics", get: it => (it.topics || []).join(", ") },
  { key: "year",    label: "Year" },
  { key: "status",  label: "Status" },
  { key: "region",  label: "Region" },
];

let sortKey = "kind";
let sortDir = 1;

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view table";
  el.appendChild(div);

  const items = applyFilter(state.items, filters);
  div.innerHTML = `<header><h2>${items.length} items</h2></header>`;

  const t = document.createElement("table");
  t.className = "data-table";
  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  for (const col of COLUMNS) {
    const th = document.createElement("th");
    th.textContent = col.label;
    th.classList.toggle("sorted-asc",  sortKey === col.key && sortDir === 1);
    th.classList.toggle("sorted-desc", sortKey === col.key && sortDir === -1);
    th.addEventListener("click", () => {
      if (sortKey === col.key) sortDir = -sortDir;
      else { sortKey = col.key; sortDir = 1; }
      render(state, filters, el.replaceChildren(div) || el);
    });
    trh.appendChild(th);
  }
  thead.appendChild(trh);
  t.appendChild(thead);

  const sorted = [...items].sort((a, b) => {
    const va = COLUMNS.find(c => c.key === sortKey).get?.(a) ?? a[sortKey];
    const vb = COLUMNS.find(c => c.key === sortKey).get?.(b) ?? b[sortKey];
    return cmp(va, vb) * sortDir;
  });

  const tbody = document.createElement("tbody");
  for (const it of sorted) {
    const tr = document.createElement("tr");
    for (const col of COLUMNS) {
      const td = document.createElement("td");
      const v = col.get ? col.get(it) : it[col.key];
      td.textContent = v == null ? "" : String(v);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  t.appendChild(tbody);
  div.appendChild(t);
}

function cmp(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}
```

(The `el.replaceChildren(div) || el` trick: `replaceChildren` returns undefined, so the `||` keeps `el` for the next render. A cleaner pattern would be exposing a `rerender` callback — fine for v1.)

- [ ] **Step 2: Add table styles**

Append to `papermap/static/app.css`:

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-top: 12px;
}
.data-table th, .data-table td {
  text-align: left;
  padding: 5px 8px;
  border-bottom: 1px solid #ebebe9;
}
.data-table th {
  cursor: pointer;
  background: #f7f7f5;
  user-select: none;
}
.data-table th.sorted-asc::after  { content: " ▲"; color: #1f77b4; }
.data-table th.sorted-desc::after { content: " ▼"; color: #1f77b4; }
.data-table tbody tr:hover { background: #fafafa; }
```

- [ ] **Step 3: Commit**

```
git add papermap/static/views/table.js papermap/static/app.css
git commit -m "Implement Table view — sortable, filter-aware"
```

---

## Phase 10 — Topics & People

### Task 13: Implement the ranked view

**Files:**
- Modify: `papermap/static/views/ranked.js`

- [ ] **Step 1: Implementation**

```javascript
// papermap/static/views/ranked.js
"use strict";

export function render(state, _filters, el) {
  const div = document.createElement("div");
  div.className = "view ranked";
  el.appendChild(div);

  const cols = document.createElement("div");
  cols.className = "ranked-cols";

  cols.appendChild(rankedColumn("Topics",
    countList(state.items.flatMap(i => i.topics || []))));

  const people = countList(state.items.flatMap(i => i.people || []));
  cols.appendChild(rankedColumn("People",
    people.length ? people :
      [["No `people:` field on items — add it to a resourcelib corpus.", 0]]));

  div.appendChild(cols);
}

function countList(values) {
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function rankedColumn(title, rows) {
  const max = Math.max(1, ...rows.map(r => r[1] || 0));
  const wrap = document.createElement("section");
  wrap.className = "ranked-col";
  wrap.innerHTML = `<h3>${title}</h3>`;
  const ul = document.createElement("ul");
  for (const [name, count] of rows) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="lbl">${escape(name)}</span>
      <span class="bar" style="width:${(count / max) * 100}%"></span>
      <span class="n">${count || ""}</span>`;
    ul.appendChild(li);
  }
  wrap.appendChild(ul);
  return wrap;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
```

- [ ] **Step 2: Styles**

Append to `papermap/static/app.css`:

```css
.ranked-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 14px;
}
.ranked-col h3 { margin: 0 0 8px; font-size: 13px; color: #555; }
.ranked-col ul { list-style: none; margin: 0; padding: 0; }
.ranked-col li {
  display: grid;
  grid-template-columns: 180px 1fr 36px;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  font-size: 12px;
}
.ranked-col .lbl { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #444; }
.ranked-col .bar { background: #d62728; height: 10px; border-radius: 2px; }
.ranked-col .n   { color: #666; text-align: right; }
```

- [ ] **Step 3: Commit**

```
git add papermap/static/views/ranked.js papermap/static/app.css
git commit -m "Implement Topics & People ranked view"
```

---

## Phase 11 — Timeline

### Task 14: Implement the Timeline view

**Files:**
- Modify: `papermap/static/views/timeline.js`

- [ ] **Step 1: Implementation**

```javascript
// papermap/static/views/timeline.js
"use strict";

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view timeline";
  el.appendChild(div);

  const items = applyFilter(state.items, filters);
  const withYear = items.filter(i => i.year != null);
  const noYear = items.length - withYear.length;

  const header = document.createElement("header");
  header.innerHTML = `<h2>Timeline
    <small>(${withYear.length} dated · ${noYear} missing year)</small></h2>`;
  div.appendChild(header);

  if (!withYear.length) {
    const p = document.createElement("p");
    p.className = "placeholder";
    p.textContent = "No items carry `year:`. Add a 4-digit `year:` to items to populate the timeline.";
    div.appendChild(p);
    return;
  }

  const colourByKind = new Map();
  for (const c of state.categories) colourByKind.set(c.id, c.color);
  // Fallback palette for resourcelib kinds without papermap_categories:
  const palette = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f"];

  const byKind = new Map();
  for (const it of withYear) {
    if (!byKind.has(it.kind)) byKind.set(it.kind, []);
    byKind.get(it.kind).push(it);
  }

  const kinds = [...byKind.keys()];
  const traces = kinds.map((k, idx) => {
    const pts = byKind.get(k);
    return {
      type: "scatter",
      mode: "markers",
      name: k || "(no kind)",
      x: pts.map(p => p.year),
      y: pts.map(() => Math.random() * 0.8 + idx),
      text: pts.map(p => `${p.label}<br><i>${p.title || ""}</i>`),
      hoverinfo: "text",
      marker: {
        size: 10,
        color: colourByKind.get(k) || palette[idx % palette.length],
        line: { color: "#fff", width: 1 },
      },
    };
  });

  const minY = Math.min(...withYear.map(i => i.year));
  const maxY = Math.max(...withYear.map(i => i.year));
  const layout = {
    xaxis: { title: "year", range: [minY - 0.5, maxY + 0.5], dtick: 1 },
    yaxis: { visible: false, range: [-0.5, kinds.length + 0.5] },
    showlegend: true,
    legend: { orientation: "h", y: -0.15 },
    margin: { l: 30, r: 30, t: 20, b: 60 },
    height: 460,
  };

  const figDiv = document.createElement("div");
  div.appendChild(figDiv);
  // eslint-disable-next-line no-undef
  Plotly.newPlot(figDiv, traces, layout, { responsive: true, displaylogo: false });
}
```

- [ ] **Step 2: Commit**

```
git add papermap/static/views/timeline.js
git commit -m "Implement Timeline view — dots by year, coloured by kind"
```

---

## Phase 12 — Static export

### Task 15: Implement `papermap export`

**Files:**
- Create: `papermap/export.py`
- Modify: `papermap/cli.py` — add `export` subcommand
- Modify: `papermap/server.py` — add `state.json` fallback documentation in a code comment (no behaviour change; `state.js` already supports it)
- Test: `tests/test_export.py`

- [ ] **Step 1: Write the failing test**

```python
# tests/test_export.py
import json
from pathlib import Path

from papermap.export import export_static

EXAMPLE = Path("examples/fm-to-virtual-cells.yaml")


def test_export_produces_state_and_bundle(tmp_path):
    out = tmp_path / "site"
    export_static(EXAMPLE, out)
    assert (out / "index.html").exists()
    assert (out / "app.js").exists()
    assert (out / "app.css").exists()
    assert (out / "state.json").exists()
    state = json.loads((out / "state.json").read_text())
    assert state["title"]
    assert state["items"]
```

- [ ] **Step 2: Implement the exporter**

```python
# papermap/export.py
"""Static-site exporter — pre-render a corpus into a self-contained folder.

The folder contains the shell HTML, the JS bundle, the CSS, and a single
state.json sibling. The shell's state.js detects state.json and uses it
directly, no server required.
"""
from __future__ import annotations

import json
import shutil
from pathlib import Path

from .loaders import Format, detect_format, load_corpus
from .state import build_state

import yaml

ROOT = Path(__file__).resolve().parent


def export_static(corpus_path: str | Path, out_dir: str | Path) -> Path:
    corpus_path = Path(corpus_path)
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)

    corpus = load_corpus(corpus_path)
    raw = yaml.safe_load(corpus_path.read_text(encoding="utf-8")) or {}
    fmt = "resourcelib" if detect_format(raw) is Format.RESOURCELIB else "papermap"
    state = build_state(corpus, name=corpus_path.stem, format_label=fmt)
    (out / "state.json").write_text(json.dumps(state, ensure_ascii=False))

    # Strip the Jinja {{ url_for(...) }} from index.html so it works as a static file.
    shell = (ROOT / "templates" / "index.html").read_text(encoding="utf-8")
    shell = shell.replace(
        "{{ url_for('static', filename='app.css') }}", "app.css"
    ).replace(
        "{{ url_for('static', filename='app.js') }}", "app.js"
    )
    # Hide the corpus picker in static mode — there's only one corpus.
    shell = shell.replace('<aside id="sidebar">', '<aside id="sidebar" hidden>')
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
```

- [ ] **Step 3: Add the CLI subcommand**

In `papermap/cli.py`, add at the top:

```python
from .export import export_static
```

Add `_export` function:

```python
def _export(args: argparse.Namespace) -> int:
    try:
        out = export_static(args.corpus, args.output)
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    print(f"exported static site to {out}")
    return 0
```

In `main`, add the subparser:

```python
p_export = sub.add_parser("export", help="export a corpus as a static site")
p_export.add_argument("corpus", help="path to the corpus YAML file")
p_export.add_argument("-o", "--output", default="site",
                      help="output directory (default: ./site)")
p_export.set_defaults(func=_export)
```

- [ ] **Step 4: Make app.js tolerant of the missing sidebar**

The static export hides the `#sidebar` (via the `hidden` attribute on the
`<aside>`). When that happens, `app.js` must skip the `/api/corpora` fetch
and load `state.json` directly. Replace the top of `init()` in
`papermap/static/app.js` with:

```javascript
async function init() {
  // Tab listeners always wire up — they work in both modes.
  for (const btn of tabsBar.querySelectorAll("button")) {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  }
  window.addEventListener("hashchange", routeFromHash);

  if (sidebar.hidden) {
    // Static-export mode: state.js will pick up the sibling state.json.
    try {
      await loadState("__static__");
    } catch (exc) {
      main.innerHTML = `<div class="error">${exc.message}</div>`;
      return;
    }
    activeCorpus = "__static__";
    tabsBar.hidden = false;
    filterBar.hidden = false;
    mountFilterBar(filterBar, getState(), filters, () => setView(activeView));
    setView(activeView);
    return;
  }

  // Server mode: the sidebar drives corpus selection.
  const resp = await fetch("/api/corpora");
  const items = await resp.json();
  for (const it of items) {
    const li = document.createElement("li");
    li.textContent = it.title || it.name;
    li.dataset.name = it.name;
    if (!it.valid) { li.classList.add("invalid"); li.title = it.error || "invalid"; }
    li.addEventListener("click", () => pickCorpus(li, it));
    sidebar.appendChild(li);
  }
  routeFromHash();
}
```

Then guard the `routeFromHash` lookup so it doesn't crash when the sidebar
is hidden (it can't be reached from there anyway, but defensive):

```javascript
function routeFromHash() {
  const m = /^#\/corpus\/([^?]+)\?view=([a-z]+)/.exec(location.hash);
  if (!m) return;
  const [_, name, view] = m;
  activeView = view;
  if (sidebar.hidden) return;
  const li = sidebar.querySelector(`li[data-name="${decodeURIComponent(name)}"]`);
  if (li && !li.classList.contains("active")) li.click();
}
```

- [ ] **Step 5: Run the test**

```
pytest tests/test_export.py -v
```
Expected: pass.

- [ ] **Step 6: Smoke test the export**

```
papermap export examples/fm-to-virtual-cells.yaml -o /tmp/papermap-site
cd /tmp/papermap-site && python -m http.server 9001 &
open http://127.0.0.1:9001
```

- [ ] **Step 7: Commit**

```
git add papermap/export.py papermap/cli.py papermap/static/app.js tests/test_export.py
git commit -m "Implement papermap export — static-site emitter"
```

---

## Phase 13 — Deploy-agent prompt

### Task 16: Write the deployment hand-off

**Files:**
- Create: `docs/deploy/agent-prompt.md`

- [ ] **Step 1: Write the file**

```markdown
# Deploying papermap

You are deploying the Light-Kit/papermap server, a small Flask app that serves
a browser UI over a directory of YAML corpora.

## Repo

- URL: https://github.com/Light-Kit/papermap
- Default branch: main
- Container build is the only supported deployment path. Do not run setuptools
  install on the host.

## What the container exposes

- TCP port `8000`
- Endpoint `GET /healthz` → 200 OK, body `ok`. Use this as the platform health probe.
- Endpoint `GET /` → the multi-view UI shell.
- The container expects a directory of YAML corpora mounted at `/corpora`
  (read-only). The shipped `docker-compose.yml` mounts `./examples` there.

## Image build

```bash
docker build -t papermap:latest .
```

The Dockerfile is `python:3.12-slim` based; final image ~150 MB.

## Runtime

```bash
docker run --rm -p 8000:8000 -v /path/to/corpora:/corpora:ro papermap:latest
```

Or via compose:

```bash
docker compose up -d --build
```

## Recommended hosting

In order of preference for a first deploy:

1. **Fly.io** — free TLS, deploy from Dockerfile, persistent volume for corpora.
2. **Railway** — easiest Dockerfile auto-detect; ~$5/mo.
3. **Render** — same as Railway, slightly cheaper at the entry tier.
4. **Cloudflare Containers** — pair with R2 if you want the corpora directory in object storage.

Use Fly.io unless the user has another preference. Fly.io setup:

```bash
flyctl launch --dockerfile Dockerfile --name lightkit-papermap
flyctl volumes create papermap_corpora --size 1
flyctl deploy
```

Mount the volume at `/corpora` in `fly.toml`. The corpora files come from the
user — coordinate to upload them via `flyctl ssh sftp shell` or commit them
into a small data branch.

## Optional environment

| Variable          | Default       | Effect                                  |
|-------------------|---------------|-----------------------------------------|
| `PAPERMAP_TITLE`  | `papermap`    | Sets the `<title>` of the page          |

Set via your platform's env-var UI; the app reads them via `os.environ`.

## Domain

If a domain is available under the Light-Kit project, attach it:

- Preferred: `papermap.lightkit.dev`
- Fallback: the platform's auto-issued `*.fly.dev` / `*.up.railway.app` URL.

## Verification (you must do this before reporting success)

After deployment, verify:

```bash
curl -fsS https://<live-url>/healthz
# expected: ok

curl -fsS https://<live-url>/ | head -c 200
# expected: HTML with <title>papermap</title>

curl -fsS https://<live-url>/api/corpora
# expected: JSON array; at least one corpus
```

Report the live URL and the three curl outputs back to the user.

## Constraints

- Read-only viewer. Do not expose any write endpoint, do not run as root, do
  not configure auth (none is needed; there is no mutable state).
- Do not bundle the corpora directory into the image. It is always a mount.
- Logs are stdout; let the platform aggregate them. No log files on disk.

## If something goes wrong

- If `/healthz` returns 500: the app failed to start. Inspect logs for
  ImportError on `flask` / `plotly` / `pyyaml`. Rebuild the image.
- If `/api/corpora` returns `[]`: the mount is empty or the path is wrong.
  `flyctl ssh console` and `ls /corpora` to verify.
- If a corpus shows `invalid:` in the sidebar: that's data, not infra — leave
  it for the user, don't try to fix the YAML yourself.
```

- [ ] **Step 2: Commit**

```
git add docs/deploy/agent-prompt.md
git commit -m "Add deploy-agent prompt for hosting papermap"
```

---

## Phase 14 — Documentation + version bump

### Task 17: Update README and bump version

**Files:**
- Modify: `README.md`
- Create: `CHANGELOG.md`
- Modify: `pyproject.toml`
- Modify: `papermap/__init__.py`

- [ ] **Step 1: README — replace the "Serve" section**

Replace the existing `## Serve (local web view)` section with:

```markdown
## Views (local web app)

```bash
papermap serve examples            # scan a directory of corpora
papermap serve --port 9000
```

The browser opens with a six-tab view of every corpus in the directory:

- **Stats** — counts + by-kind + top-topics bars.
- **Browse** — filterable card grid.
- **Map** — the clustered-ring relationship graph.
- **Table** — sortable spreadsheet view.
- **Topics & People** — ranked lists.
- **Timeline** — items by year (requires `year:` on items).

Filters (kind, topic, status, org_type, region, free-text) apply to Browse,
Map, and Table. Resourcelib YAML corpora (`vocab:` + `items:`) are read
directly; the Map tab is hidden for corpora that don't declare
`papermap_categories`/`papermap_edges`.

## Static export

```bash
papermap export examples/fm-to-virtual-cells.yaml -o site/
python -m http.server -d site/ 9001
```

Produces a folder with `index.html` + `state.json` + the JS bundle. Drop it
into any static host (GitHub Pages, Cloudflare Pages, Netlify, S3).

For hosted deployment of the live server see
[`docs/deploy/agent-prompt.md`](docs/deploy/agent-prompt.md).
```

- [ ] **Step 2: Create CHANGELOG.md**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.3.0] — 2026-05-15

### Added
- Six-view local web app: Stats, Browse, Map, Table, Topics & People, Timeline.
- Filters (kind, topic, status, org_type, region, free-text) on Browse, Map, Table.
- `/api/state/<name>` endpoint — returns the parsed corpus as JSON.
- `/healthz` endpoint for hosting health probes.
- Silent auto-detection of resourcelib YAML (`vocab:` + `items:`).
- `papermap.loaders.load_corpus` as the canonical loader entry point.
- `Item` dataclass — unified record consumed by all views.
- `papermap export` subcommand — static-site emitter.
- `docs/deploy/agent-prompt.md` — deployment handoff for downstream agents.

### Changed
- `/api/map/<name>` removed; viewers use `/api/state/<name>` instead.
- `papermap.schema.load_corpus` still works but now delegates to the loaders package.

### Notes
- Resourcelib v0.2 (with the full `papermap_*` schema + `aggregate.py`) is a
  separate release. Today's adapter reads whichever fields a resourcelib
  corpus already carries.

## [0.2.0] — 2026-05-14

### Added
- `papermap serve` local web server with a sidebar corpus picker.
- Dockerfile + docker-compose.yml + Makefile.

## [0.1.0] — initial release
- `papermap build` and `papermap check` CLI.
- Clustered-ring layout, plotly node-link rendering.
```

- [ ] **Step 3: Bump version**

In `pyproject.toml`:

```toml
version = "0.3.0"
```

In `papermap/__init__.py`:

```python
__version__ = "0.3.0"
```

- [ ] **Step 4: Run the full test suite**

```
pytest -v
```
Expected: all pass.

- [ ] **Step 5: Commit**

```
git add README.md CHANGELOG.md pyproject.toml papermap/__init__.py
git commit -m "Bump to 0.3.0; document views, export, and deploy"
```

---

## Done

After Task 17, the multi-view viewer is shipped. `papermap serve` opens with six tabs, both YAML formats auto-detect, the static export works, and the deploy-agent prompt sits in `docs/deploy/agent-prompt.md`.

To complete the development branch and offer merge/PR/keep/discard, the executing-plans skill hands off to `superpowers:finishing-a-development-branch`.
