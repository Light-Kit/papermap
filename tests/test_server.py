"""Tests for the local Flask server."""

from __future__ import annotations

from pathlib import Path

import pytest

from papermap.server import create_app

EXAMPLE_DIR = Path(__file__).parent.parent / "examples"
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


@pytest.fixture
def client(tmp_path):
    (tmp_path / "good.yaml").write_text(MINIMAL, encoding="utf-8")
    app = create_app(tmp_path)
    app.config["TESTING"] = True
    return app.test_client()


def test_index_returns_shell_page(client):
    resp = client.get("/")
    assert resp.status_code == 200
    body = resp.get_data(as_text=True)
    assert "papermap" in body.lower()


BROKEN = """
title: t
categories:
  - {id: a, label: A, color: "#111"}
relations:
  - {id: r, label: R, color: "#222"}
papers:
  - {id: p1, category: zzz, label: P1}
edges: []
"""


@pytest.fixture
def mixed_client(tmp_path):
    (tmp_path / "good.yaml").write_text(MINIMAL, encoding="utf-8")
    (tmp_path / "broken.yaml").write_text(BROKEN, encoding="utf-8")
    (tmp_path / "notes.txt").write_text("ignore me", encoding="utf-8")
    app = create_app(tmp_path)
    app.config["TESTING"] = True
    return app.test_client()


def test_api_corpora_lists_valid_and_invalid(mixed_client):
    resp = mixed_client.get("/api/corpora")
    assert resp.status_code == 200
    items = resp.get_json()
    names = {item["name"]: item for item in items}

    assert "notes.txt" not in names
    assert names["good.yaml"]["valid"] is True
    assert names["good.yaml"]["title"] == "t"
    assert names["good.yaml"]["error"] is None

    assert names["broken.yaml"]["valid"] is False
    assert "unknown category" in names["broken.yaml"]["error"]


def test_api_map_returns_fragment_and_metadata(mixed_client):
    resp = mixed_client.get("/api/map/good.yaml")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["title"] == "t"
    assert "<div" in data["fragment"]
    assert "plotly" in data["fragment"].lower()
    assert data["stats"] == {
        "papers": 2,
        "edges": 1,
        "categories": 1,
        "relations": 1,
    }
    assert data["warnings"] == []
    assert "categories:" in data["yaml"]


def test_api_map_unknown_name_is_404(mixed_client):
    resp = mixed_client.get("/api/map/nope.yaml")
    assert resp.status_code == 404


def test_api_map_invalid_corpus_is_422(mixed_client):
    resp = mixed_client.get("/api/map/broken.yaml")
    assert resp.status_code == 422
    assert "unknown category" in resp.get_json()["error"]


def test_api_map_rejects_path_traversal(mixed_client):
    resp = mixed_client.get("/api/map/..%2Fetc%2Fpasswd")
    assert resp.status_code == 404
