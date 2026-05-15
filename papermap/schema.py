"""Corpus file format — load and validate a papermap YAML corpus.

A corpus has four sections: ``categories`` (node colours), ``relations``
(edge styles), ``papers`` (the nodes), and ``edges`` (the links). The
``layout`` section is optional and tunes placement. See README.md for the
full format and ``examples/fm-to-virtual-cells.yaml`` for a worked corpus.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import yaml


class CorpusError(ValueError):
    """Raised when a corpus file is malformed or internally inconsistent."""


@dataclass(frozen=True)
class Category:
    id: str
    label: str
    color: str


@dataclass(frozen=True)
class Relation:
    id: str
    label: str
    color: str
    dash: str = "solid"


@dataclass(frozen=True)
class Paper:
    id: str
    category: str
    label: str
    title: str = ""
    meta: str = ""
    why: str = ""
    weight: int = 1


@dataclass(frozen=True)
class Edge:
    source: str
    target: str
    relation: str


@dataclass(frozen=True)
class Item:
    """Unified record consumed by views.

    Built from a native ``Paper`` or a resourcelib item. Map-related fields
    (``category``, ``weight``, ``title``, ``meta``, ``why``) come from native
    Paper or from ``papermap_category``/``label``/etc on a resourcelib item.
    Browse/Table/Timeline/Topics fields (``kind``, ``topics``, ``year``, ...)
    are resourcelib-first; native papermap may carry them as optional fields.
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
    url: str = ""


@dataclass
class LayoutConfig:
    hub_category: str | None = None
    hub_node: str | None = None
    ring_radius: float = 12.0
    hub_ring_radius: float = 3.8
    cluster_radius_scale: float = 0.34
    cluster_radius_min: float = 0.95
    cluster_radius_max: float = 3.0


@dataclass
class Corpus:
    title: str
    subtitle: str
    categories: list[Category]
    relations: list[Relation]
    papers: list[Paper]
    edges: list[Edge]
    layout: LayoutConfig = field(default_factory=LayoutConfig)
    items: list[Item] = field(default_factory=list)

    @property
    def categories_by_id(self) -> dict[str, Category]:
        return {c.id: c for c in self.categories}

    @property
    def relations_by_id(self) -> dict[str, Relation]:
        return {r.id: r for r in self.relations}

    @property
    def papers_by_id(self) -> dict[str, Paper]:
        return {p.id: p for p in self.papers}

    def papers_in(self, category_id: str) -> list[Paper]:
        return [p for p in self.papers if p.category == category_id]


def _require(mapping: dict, key: str, where: str) -> object:
    if key not in mapping:
        raise CorpusError(f"{where}: missing required key '{key}'")
    return mapping[key]


def _as_list(raw: dict, key: str) -> list:
    """Return ``raw[key]`` as a list, or raise CorpusError if it isn't one."""
    value = raw.get(key, [])
    if not isinstance(value, list):
        raise CorpusError(f"'{key}' must be a list, got {type(value).__name__}")
    return value


def _as_mapping(item: object, where: str) -> dict:
    """Return ``item`` as a mapping, or raise CorpusError if it isn't one."""
    if not isinstance(item, dict):
        raise CorpusError(f"{where}: expected a mapping, got {type(item).__name__}")
    return item


def _as_number(value: object, where: str, key: str) -> float:
    """Coerce ``value`` to float, or raise CorpusError with a clear message."""
    try:
        return float(value)
    except (TypeError, ValueError):
        raise CorpusError(f"{where}: '{key}' must be a number, got {value!r}") from None


def _as_int(value: object, where: str, key: str) -> int:
    """Coerce ``value`` to int, or raise CorpusError with a clear message."""
    try:
        return int(value)
    except (TypeError, ValueError):
        raise CorpusError(f"{where}: '{key}' must be an integer, got {value!r}") from None


def load_corpus(path: str | Path) -> Corpus:
    """Read, parse, and validate a corpus YAML file.

    Auto-detects native papermap vs resourcelib via the loaders package.
    """
    from .loaders import load_corpus as _load
    return _load(path)


def _parse_raw_papermap(raw: dict) -> Corpus:
    """Parse a native papermap YAML mapping into a Corpus (no IO)."""
    categories = []
    for c in _as_list(raw, "categories"):
        c = _as_mapping(c, "category")
        categories.append(Category(
            id=str(_require(c, "id", "category")),
            label=str(_require(c, "label", "category")),
            color=str(_require(c, "color", "category")),
        ))
    relations = []
    for r in _as_list(raw, "relations"):
        r = _as_mapping(r, "relation")
        relations.append(Relation(
            id=str(_require(r, "id", "relation")),
            label=str(_require(r, "label", "relation")),
            color=str(_require(r, "color", "relation")),
            dash=str(r.get("dash", "solid")),
        ))
    papers = []
    for p in _as_list(raw, "papers"):
        p = _as_mapping(p, "paper")
        pid = str(_require(p, "id", "paper"))
        papers.append(Paper(
            id=pid,
            category=str(_require(p, "category", "paper")),
            label=str(_require(p, "label", "paper")),
            title=str(p.get("title", "")),
            meta=str(p.get("meta", "")),
            why=str(p.get("why", "")),
            weight=_as_int(p.get("weight", 1), f"paper '{pid}'", "weight"),
        ))
    edges = []
    for e in _as_list(raw, "edges"):
        if isinstance(e, (list, tuple)):
            if len(e) != 3:
                raise CorpusError(f"edge {e!r}: expected [source, target, relation]")
            edges.append(Edge(str(e[0]), str(e[1]), str(e[2])))
        elif isinstance(e, dict):
            edges.append(Edge(
                str(_require(e, "source", "edge")),
                str(_require(e, "target", "edge")),
                str(_require(e, "relation", "edge")),
            ))
        else:
            raise CorpusError(f"edge {e!r}: expected a list or mapping")

    layout_raw = _as_mapping(raw.get("layout") or {}, "layout")
    layout = LayoutConfig(
        hub_category=layout_raw.get("hub_category"),
        hub_node=layout_raw.get("hub_node"),
        ring_radius=_as_number(layout_raw.get("ring_radius", 12.0), "layout", "ring_radius"),
        hub_ring_radius=_as_number(layout_raw.get("hub_ring_radius", 3.8), "layout", "hub_ring_radius"),
        cluster_radius_scale=_as_number(
            layout_raw.get("cluster_radius_scale", 0.34), "layout", "cluster_radius_scale"
        ),
        cluster_radius_min=_as_number(
            layout_raw.get("cluster_radius_min", 0.95), "layout", "cluster_radius_min"
        ),
        cluster_radius_max=_as_number(
            layout_raw.get("cluster_radius_max", 3.0), "layout", "cluster_radius_max"
        ),
    )

    corpus = Corpus(
        title=str(raw.get("title", "Paper map")),
        subtitle=str(raw.get("subtitle", "")),
        categories=categories,
        relations=relations,
        papers=papers,
        edges=edges,
        layout=layout,
    )
    _validate(corpus)
    return corpus


def _validate(corpus: Corpus) -> None:
    if not corpus.categories:
        raise CorpusError("corpus has no categories")
    if not corpus.relations:
        raise CorpusError("corpus has no relations")
    if not corpus.papers:
        raise CorpusError("corpus has no papers")

    _check_unique([c.id for c in corpus.categories], "category id")
    _check_unique([r.id for r in corpus.relations], "relation id")
    _check_unique([p.id for p in corpus.papers], "paper id")

    cat_ids = corpus.categories_by_id
    rel_ids = corpus.relations_by_id
    paper_ids = corpus.papers_by_id

    for p in corpus.papers:
        if p.category not in cat_ids:
            raise CorpusError(f"paper '{p.id}': unknown category '{p.category}'")
        if p.weight < 1:
            raise CorpusError(f"paper '{p.id}': weight must be >= 1")

    for e in corpus.edges:
        if e.source not in paper_ids:
            raise CorpusError(f"edge {e}: unknown source paper '{e.source}'")
        if e.target not in paper_ids:
            raise CorpusError(f"edge {e}: unknown target paper '{e.target}'")
        if e.relation not in rel_ids:
            raise CorpusError(f"edge {e}: unknown relation '{e.relation}'")

    layout = corpus.layout
    if layout.hub_category and layout.hub_category not in cat_ids:
        raise CorpusError(f"layout.hub_category: unknown category '{layout.hub_category}'")
    if layout.hub_node:
        if not layout.hub_category:
            raise CorpusError(
                "layout.hub_node requires layout.hub_category to be set "
                "(a hub node is only meaningful inside the hub cluster)"
            )
        if layout.hub_node not in paper_ids:
            raise CorpusError(f"layout.hub_node: unknown paper '{layout.hub_node}'")
        if layout.hub_category and paper_ids[layout.hub_node].category != layout.hub_category:
            raise CorpusError(
                f"layout.hub_node '{layout.hub_node}' is not in hub_category "
                f"'{layout.hub_category}'"
            )


def _check_unique(values: list[str], what: str) -> None:
    seen: set[str] = set()
    for v in values:
        if v in seen:
            raise CorpusError(f"duplicate {what}: '{v}'")
        seen.add(v)


def lint_corpus(corpus: Corpus) -> list[str]:
    """Return non-fatal advisory warnings about an otherwise-valid corpus.

    Unlike validation, these don't make a corpus unusable — they flag things
    that are usually mistakes: papers nothing links to, and relations or
    categories that are declared but never used.
    """
    warnings: list[str] = []

    linked = {e.source for e in corpus.edges} | {e.target for e in corpus.edges}
    for p in corpus.papers:
        if p.id not in linked:
            warnings.append(f"paper '{p.id}' has no edges — it will float unconnected")

    used_relations = {e.relation for e in corpus.edges}
    for r in corpus.relations:
        if r.id not in used_relations:
            warnings.append(f"relation '{r.id}' is declared but never used")

    used_categories = {p.category for p in corpus.papers}
    for c in corpus.categories:
        if c.id not in used_categories:
            warnings.append(f"category '{c.id}' has no papers")

    return warnings
