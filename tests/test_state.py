"""build_state — pure Corpus → JSON payload."""

from __future__ import annotations

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
    people_seen = {p for it in state["items"] for p in it["people"]}
    assert "Ahlmann-Eltze" in people_seen
    assert state["map"]["traces"]


def test_state_payload_native_papermap():
    corpus = load_corpus("examples/fm-to-virtual-cells.yaml")
    state = build_state(corpus, name="fm", format_label="papermap")
    assert state["format"] == "papermap"
    assert state["map"]["traces"]


def test_state_omits_map_when_no_categories(tmp_path):
    p = tmp_path / "no-map.yaml"
    p.write_text(
        """
title: "No map"
vocab: {kinds: [{id: x, label: X}]}
items:
  - {id: a, kind: x, label: "A"}
"""
    )
    corpus = load_corpus(p)
    state = build_state(corpus, name="no-map", format_label="resourcelib")
    assert state["map"]["traces"] == []
    assert state["map"]["layout"] == {}
