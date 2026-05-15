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
