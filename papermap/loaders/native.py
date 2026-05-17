"""Native papermap YAML loader.

Today's parser lives in ``papermap.schema`` as ``_parse_raw_papermap``;
this module wraps it and populates ``Corpus.items`` from the parsed papers
(picking up the optional ``year``/``topics``/``people`` fields if present).
"""

from __future__ import annotations

from pathlib import Path

from ..schema import Corpus, Item, _parse_raw_papermap


def load_native(raw: dict, source: Path | None = None) -> Corpus:
    """Parse a native papermap YAML mapping into a Corpus."""
    corpus = _parse_raw_papermap(raw)
    raw_by_id = {
        p["id"]: p
        for p in raw.get("papers", [])
        if isinstance(p, dict) and "id" in p
    }
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
            url=str(rawp.get("url", "")),
            description=str(rawp.get("description", "")),
        ))
    corpus.items = items
    return corpus
