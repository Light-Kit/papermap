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


def test_resourcelib_accepts_flat_string_categories(tmp_path):
    """`papermap_categories` may be a bare string list — auto-color it.

    The fm-to-virtual-cells resourcelib corpus uses the bare-string form,
    so the loader must tolerate it instead of KeyErroring on `c["id"]`.
    """
    raw = """
title: "Flat cats"
vocab: {kinds: [{id: paper, label: Paper}]}
papermap_categories:
  - scfm
  - reckoning
items:
  - {id: a, kind: paper, label: A, papermap_category: scfm}
  - {id: b, kind: paper, label: B, papermap_category: reckoning}
"""
    p = tmp_path / "flat.yaml"
    p.write_text(raw)
    corpus = load_corpus(p)
    assert [c.id for c in corpus.categories] == ["scfm", "reckoning"]
    # Both categories got a non-empty color so the map can render.
    assert all(c.color for c in corpus.categories)


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


def test_resourcelib_propagates_model_card_fields(tmp_path):
    """kind: model items carry the structured comparison fields + benchmarks."""
    raw = """
title: "Model card test"
vocab: {kinds: [{id: model, label: Model}]}
items:
  - id: esm2
    kind: model
    label: ESM-2
    modality: protein
    params: "15B"
    architecture: "transformer (encoder)"
    objective: "masked-residue"
    pretrain_data: "~65M sequences (UniRef)"
    context: "1024 aa"
    weights: "https://github.com/facebookresearch/esm"
    released: "2022-08"
    benchmarks:
      - {name: "CASP14", score: "see ESMFold"}
      - {name: "CAMEO", score: "0.83"}
"""
    p = tmp_path / "model.yaml"
    p.write_text(raw)
    corpus = load_corpus(p)
    it = {i.id: i for i in corpus.items}["esm2"]
    assert it.params == "15B"
    assert it.architecture == "transformer (encoder)"
    assert it.objective == "masked-residue"
    assert it.pretrain_data == "~65M sequences (UniRef)"
    assert it.context == "1024 aa"
    assert it.weights == "https://github.com/facebookresearch/esm"
    assert it.released == "2022-08"
    assert len(it.benchmarks) == 2
    assert it.benchmarks[0] == {"name": "CASP14", "score": "see ESMFold"}
