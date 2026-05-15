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
