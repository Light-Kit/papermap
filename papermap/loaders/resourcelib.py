"""Resourcelib YAML loader → papermap Corpus adapter.

Maps the resourcelib schema to papermap's existing Corpus dataclass. When
``papermap_categories`` is absent the map portion is empty — Browse, Table,
Topics, Timeline still work on resourcelib items.
"""

from __future__ import annotations

from pathlib import Path

from ..schema import Category, Corpus, Edge, Item, LayoutConfig, Paper, Relation


_DEFAULT_CATEGORY_COLORS = [
    "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
]


def _category_from_raw(raw_cat, idx: int) -> Category:
    """Accept either a dict ({id,label,color}) or a bare string (id only).

    Resourcelib corpora often list categories as a flat string list because
    the per-item `papermap_category` is the only thing the resourcelib
    schema cares about; colors get filled in here so the map can still
    render.
    """
    if isinstance(raw_cat, str):
        return Category(
            id=raw_cat,
            label=raw_cat,
            color=_DEFAULT_CATEGORY_COLORS[idx % len(_DEFAULT_CATEGORY_COLORS)],
        )
    return Category(
        id=str(raw_cat["id"]),
        label=str(raw_cat.get("label", raw_cat["id"])),
        color=str(raw_cat.get("color",
            _DEFAULT_CATEGORY_COLORS[idx % len(_DEFAULT_CATEGORY_COLORS)])),
    )


_QA_KEYS = ("did", "purpose", "method", "result")


def _normalize_qa(raw: object) -> dict | None:
    """Return a {did, purpose, method, result} dict from raw YAML, or None.

    Missing keys are dropped; any non-string value is coerced via str().
    If no recognized keys are present the result is None so callers can
    fall back to ``description``.
    """
    if not isinstance(raw, dict):
        return None
    out = {k: str(raw[k]).strip() for k in _QA_KEYS if k in raw and raw[k]}
    return out or None


def load_resourcelib(raw: dict, source: Path | None = None) -> Corpus:
    categories = [
        _category_from_raw(c, idx)
        for idx, c in enumerate(raw.get("papermap_categories", []))
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

    # When most items lack an explicit `papermap_category` we fall back to
    # `topics[0]` so the Map view doesn't drop them. New categories get
    # appended to the existing list with an auto-cycling color so the
    # original narrative-arc categories (reckoning, scfm, …) still anchor
    # the layout — topic-derived ones just expand the cluster set.
    raw_items = raw.get("items", [])
    category_index = {c.id: c for c in categories}

    def resolve_category(it: dict) -> str | None:
        if "papermap_category" in it:
            return str(it["papermap_category"])
        topics = it.get("topics") or []
        if topics:
            return str(topics[0])
        return None

    papers: list[Paper] = []
    for it in raw_items:
        if not isinstance(it, dict):
            continue
        cat_id = resolve_category(it)
        if not cat_id:
            continue
        if cat_id not in category_index:
            new_cat = Category(
                id=cat_id,
                label=cat_id,
                color=_DEFAULT_CATEGORY_COLORS[len(categories) % len(_DEFAULT_CATEGORY_COLORS)],
            )
            categories.append(new_cat)
            category_index[cat_id] = new_cat
        papers.append(Paper(
            id=str(it["id"]),
            category=cat_id,
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

    items: list[Item] = []
    for it in raw_items:
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
            category=resolve_category(it),
            title=str(it.get("title", "")),
            meta=str(it.get("meta", "")),
            why=str(it.get("why", "")),
            weight=int(it.get("weight", 1)),
            people=tuple(it.get("people", []) or []),
            url=str(it.get("url", "")),
            description=str(it.get("description", "")),
            starred=bool(it.get("starred", False)),
            qa=_normalize_qa(it.get("qa")),
        ))

    corpus = Corpus(
        title=str(raw.get("title", "Resourcelib corpus")),
        subtitle=str(raw.get("subtitle", "")),
        categories=categories,
        relations=relations,
        papers=papers,
        edges=edges,
        layout=layout,
    )
    corpus.items = items
    return corpus
