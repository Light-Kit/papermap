"""Unified Item record produced by both loaders."""

from __future__ import annotations

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
