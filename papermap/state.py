"""Pure function: Corpus → JSON-serialisable state payload for the frontend."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

from .layout import compute_layout
from .render import build_figure
from .schema import Corpus, Item, lint_corpus


def build_state(corpus: Corpus, *, name: str, format_label: str) -> dict[str, Any]:
    """Build the JSON state payload the browser consumes.

    ``name`` is the corpus's URL-safe identifier (typically the filename stem).
    ``format_label`` is ``"papermap"`` or ``"resourcelib"``.
    """
    items = [_item_to_dict(i) for i in corpus.items]
    facets = {
        "kinds":     _unique([i["kind"] for i in items if i.get("kind")]),
        "topics":    _unique([t for i in items for t in i.get("topics", [])]),
        "statuses":  _unique([i["status"] for i in items if i.get("status")]),
        "org_types": _unique([i["org_type"] for i in items if i.get("org_type")]),
        "regions":   _unique([i["region"] for i in items if i.get("region")]),
        "modalities": _unique([i["modality"] for i in items if i.get("modality")]),
        "years":     sorted({int(i["year"]) for i in items if i.get("year") is not None}),
    }

    if corpus.categories and corpus.papers:
        fig = build_figure(corpus)
        fd = fig.to_dict()
        pos, _ = compute_layout(corpus)
        traces = [_with_ids(t, corpus, pos) for t in fd["data"]]
        map_payload: dict[str, Any] = {"traces": traces, "layout": fd["layout"]}
    else:
        map_payload = {"traces": [], "layout": {}}

    return {
        "name": name,
        "format": format_label,
        "title": corpus.title,
        "items": items,
        "categories": [
            {"id": c.id, "label": c.label, "color": c.color}
            for c in corpus.categories
        ],
        "relations": [
            {"id": r.id, "label": r.label, "color": r.color, "dash": r.dash}
            for r in corpus.relations
        ],
        "edges": [[e.source, e.target, e.relation] for e in corpus.edges],
        "map": map_payload,
        "facets": facets,
        "warnings": lint_corpus(corpus),
    }


def _item_to_dict(item: Item) -> dict[str, Any]:
    d = asdict(item)
    d["topics"] = list(d["topics"])
    d["people"] = list(d["people"])
    d["benchmarks"] = [dict(b) for b in d["benchmarks"]]
    return d


def _unique(values: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for v in values:
        if v not in seen:
            seen.add(v)
            out.append(v)
    return out


def _with_ids(trace: dict, corpus: Corpus, pos: dict) -> dict:
    """Attach an ``ids`` array to node traces so the client can mask by item id.

    ``render.build_figure`` emits one trace per relation (mode='lines') then
    one per category (mode='markers+text'). The category trace's ``name``
    matches the category label; we use that to reconstruct the per-point
    ids in placement order.
    """
    mode = trace.get("mode", "")
    if "markers" not in mode:
        return trace
    name = trace.get("name", "")
    cat = next((c for c in corpus.categories if c.label == name), None)
    if cat is None:
        return trace
    ids = [p.id for p in corpus.papers_in(cat.id) if p.id in pos]
    out = dict(trace)
    out["ids"] = ids
    return out
