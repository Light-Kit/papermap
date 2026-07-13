"""Tests for papermap — schema validation and layout invariants."""

from __future__ import annotations

import math
import subprocess
import sys
from pathlib import Path

import pytest

from papermap import build_figure, compute_layout, lint_corpus, load_corpus
from papermap.schema import CorpusError

EXAMPLE = Path(__file__).parent / "fixtures" / "native_papermap.yaml"


# ── the worked example loads, lays out, and renders ──────────────────────────

def test_example_corpus_loads():
    corpus = load_corpus(EXAMPLE)
    assert len(corpus.papers) == 51
    assert len(corpus.edges) == 76
    assert corpus.layout.hub_category == "reckoning"
    assert corpus.layout.hub_node == "ahlmann"


def test_layout_places_every_paper():
    corpus = load_corpus(EXAMPLE)
    pos, textpos = compute_layout(corpus)
    assert set(pos) == {p.id for p in corpus.papers}
    assert set(textpos) == {p.id for p in corpus.papers}


def test_hub_node_is_centred():
    corpus = load_corpus(EXAMPLE)
    pos, _ = compute_layout(corpus)
    assert pos["ahlmann"] == pytest.approx((0.0, 0.0))


def test_hub_cluster_sits_inside_the_ring():
    # Every reckoning paper should be closer to the origin than any ring cluster.
    corpus = load_corpus(EXAMPLE)
    pos, _ = compute_layout(corpus)
    hub_max = max(
        math.hypot(*pos[p.id]) for p in corpus.papers_in("reckoning")
    )
    assert hub_max < corpus.layout.ring_radius


def test_build_figure_has_a_trace_per_category_and_relation():
    corpus = load_corpus(EXAMPLE)
    fig = build_figure(corpus)
    # one line trace per relation + one marker trace per category
    assert len(fig.data) == len(corpus.relations) + len(corpus.categories)


def test_write_html(tmp_path):
    from papermap import write_html

    corpus = load_corpus(EXAMPLE)
    out = tmp_path / "map.html"
    write_html(build_figure(corpus), str(out))
    assert out.exists()
    assert "plotly" in out.read_text(encoding="utf-8").lower()


# ── validation rejects malformed corpora ─────────────────────────────────────

def _write(tmp_path, body: str) -> Path:
    p = tmp_path / "corpus.yaml"
    p.write_text(body, encoding="utf-8")
    return p


MINIMAL = """
title: t
categories:
  - {id: a, label: A, color: "#111"}
relations:
  - {id: r, label: R, color: "#222"}
papers:
  - {id: p1, category: a, label: P1}
  - {id: p2, category: a, label: P2}
edges:
  - [p1, p2, r]
"""


def test_minimal_corpus_is_valid(tmp_path):
    corpus = load_corpus(_write(tmp_path, MINIMAL))
    assert len(corpus.papers) == 2


def test_edge_to_unknown_paper_is_rejected(tmp_path):
    bad = MINIMAL.replace("[p1, p2, r]", "[p1, nope, r]")
    with pytest.raises(CorpusError, match="unknown target paper"):
        load_corpus(_write(tmp_path, bad))


def test_paper_with_unknown_category_is_rejected(tmp_path):
    bad = MINIMAL.replace("category: a, label: P2", "category: zzz, label: P2")
    with pytest.raises(CorpusError, match="unknown category"):
        load_corpus(_write(tmp_path, bad))


def test_edge_with_unknown_relation_is_rejected(tmp_path):
    bad = MINIMAL.replace("[p1, p2, r]", "[p1, p2, zzz]")
    with pytest.raises(CorpusError, match="unknown relation"):
        load_corpus(_write(tmp_path, bad))


def test_duplicate_paper_id_is_rejected(tmp_path):
    bad = MINIMAL.replace("{id: p2, category: a, label: P2}",
                          "{id: p1, category: a, label: P2}")
    with pytest.raises(CorpusError, match="duplicate paper id"):
        load_corpus(_write(tmp_path, bad))


def test_missing_file_is_rejected(tmp_path):
    with pytest.raises(CorpusError, match="not found"):
        load_corpus(tmp_path / "does-not-exist.yaml")


# ── malformed structure is rejected with a clear CorpusError ─────────────────

def test_section_that_is_not_a_list_is_rejected(tmp_path):
    bad = MINIMAL.replace(
        "categories:\n  - {id: a, label: A, color: \"#111\"}",
        "categories: not-a-list",
    )
    with pytest.raises(CorpusError, match="'categories' must be a list"):
        load_corpus(_write(tmp_path, bad))


def test_category_entry_that_is_not_a_mapping_is_rejected(tmp_path):
    bad = MINIMAL.replace('{id: a, label: A, color: "#111"}', '"just a string"')
    with pytest.raises(CorpusError, match="category: expected a mapping"):
        load_corpus(_write(tmp_path, bad))


def test_non_integer_weight_is_rejected(tmp_path):
    bad = MINIMAL.replace(
        "{id: p1, category: a, label: P1}",
        "{id: p1, category: a, label: P1, weight: heavy}",
    )
    with pytest.raises(CorpusError, match="weight.*must be an integer"):
        load_corpus(_write(tmp_path, bad))


def test_non_numeric_layout_value_is_rejected(tmp_path):
    bad = MINIMAL + "layout:\n  ring_radius: wide\n"
    with pytest.raises(CorpusError, match="ring_radius.*must be a number"):
        load_corpus(_write(tmp_path, bad))


# ── layout.hub_node requires layout.hub_category ─────────────────────────────

def test_hub_node_without_hub_category_is_rejected(tmp_path):
    # hub_node is only meaningful inside the hub cluster, so it needs
    # hub_category. Without it, compute_layout silently ignores hub_node --
    # reject it at load time instead.
    bad = MINIMAL + "layout:\n  hub_node: p1\n"
    with pytest.raises(CorpusError, match="hub_node requires .*hub_category"):
        load_corpus(_write(tmp_path, bad))


def test_hub_node_with_hub_category_is_valid(tmp_path):
    good = MINIMAL + "layout:\n  hub_category: a\n  hub_node: p1\n"
    corpus = load_corpus(_write(tmp_path, good))
    assert corpus.layout.hub_node == "p1"


# ── the package is runnable as `python -m papermap` ──────────────────────────

def test_python_m_papermap_check_runs():
    result = subprocess.run(
        [sys.executable, "-m", "papermap", "check", str(EXAMPLE)],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0
    assert "ok:" in result.stdout


def test_python_m_papermap_reports_a_bad_corpus(tmp_path):
    bad = _write(tmp_path, "title: t\n")  # no categories/relations/papers
    result = subprocess.run(
        [sys.executable, "-m", "papermap", "check", str(bad)],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 1
    assert "invalid:" in result.stderr


# ── lint reports non-fatal advisories ────────────────────────────────────────

def test_clean_corpus_has_no_lint_warnings(tmp_path):
    corpus = load_corpus(_write(tmp_path, MINIMAL))
    assert lint_corpus(corpus) == []


def test_lint_flags_orphan_paper(tmp_path):
    body = MINIMAL.replace(
        "  - {id: p2, category: a, label: P2}",
        "  - {id: p2, category: a, label: P2}\n  - {id: p3, category: a, label: P3}",
    )
    warnings = lint_corpus(load_corpus(_write(tmp_path, body)))
    assert any("p3" in w and "no edges" in w for w in warnings)


def test_lint_flags_unused_relation(tmp_path):
    body = MINIMAL.replace(
        '  - {id: r, label: R, color: "#222"}',
        '  - {id: r, label: R, color: "#222"}\n  - {id: unused, label: U, color: "#333"}',
    )
    warnings = lint_corpus(load_corpus(_write(tmp_path, body)))
    assert any("unused" in w and "never used" in w for w in warnings)


def test_lint_flags_empty_category(tmp_path):
    body = MINIMAL.replace(
        '  - {id: a, label: A, color: "#111"}',
        '  - {id: a, label: A, color: "#111"}\n  - {id: empty, label: E, color: "#444"}',
    )
    warnings = lint_corpus(load_corpus(_write(tmp_path, body)))
    assert any("empty" in w and "no papers" in w for w in warnings)


# ── papermap serve --help advertises the subcommand ──────────────────────────

def test_serve_appears_in_help():
    result = subprocess.run(
        [sys.executable, "-m", "papermap", "--help"],
        capture_output=True,
        text=True,
    )
    assert result.returncode == 0
    assert "serve" in result.stdout
