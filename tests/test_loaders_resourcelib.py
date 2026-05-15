"""Resourcelib YAML adapter."""

from __future__ import annotations

from pathlib import Path

from papermap.loaders import load_corpus

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


def test_resourcelib_propagates_url_to_item(tmp_path):
    """url on a resourcelib item must reach the Item dataclass.

    The Browse view turns the url into a clickable card; without this
    plumbing every card would be a dead element.
    """
    raw = """
title: "URL test"
vocab: {kinds: [{id: paper, label: Paper}]}
items:
  - {id: with-url, kind: paper, label: A, url: "https://example.org/a"}
  - {id: no-url, kind: paper, label: B}
"""
    p = tmp_path / "url.yaml"
    p.write_text(raw)
    corpus = load_corpus(p)
    by_id = {i.id: i for i in corpus.items}
    assert by_id["with-url"].url == "https://example.org/a"
    assert by_id["no-url"].url == ""
