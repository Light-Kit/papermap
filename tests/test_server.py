"""Tests for the local Flask server."""

from __future__ import annotations

import base64
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


def test_api_state_returns_payload(client):
    resp = client.get("/api/state/good.yaml")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["name"] == "good"
    assert data["format"] == "papermap"
    assert data["title"] == "t"
    assert {it["id"] for it in data["items"]} == {"p1", "p2"}
    assert data["facets"]["kinds"] == ["a"]
    assert data["map"]["traces"]


def test_api_state_unknown_name_is_404(mixed_client):
    resp = mixed_client.get("/api/state/nope.yaml")
    assert resp.status_code == 404


def test_api_state_invalid_corpus_is_422(mixed_client):
    resp = mixed_client.get("/api/state/broken.yaml")
    assert resp.status_code == 422
    assert "unknown category" in resp.get_json()["error"]


def test_api_state_rejects_path_traversal(mixed_client):
    resp = mixed_client.get("/api/state/..%2Fetc%2Fpasswd")
    assert resp.status_code == 404


def test_healthz(client):
    resp = client.get("/healthz")
    assert resp.status_code == 200
    assert resp.data == b"ok"


def test_download_returns_full_html(mixed_client):
    resp = mixed_client.get("/download/good.yaml")
    assert resp.status_code == 200
    assert resp.mimetype == "text/html"
    disposition = resp.headers.get("Content-Disposition", "")
    assert "attachment" in disposition
    assert "good.html" in disposition
    body = resp.get_data(as_text=True)
    assert "<html" in body.lower()
    assert "plotly" in body.lower()


def test_download_invalid_corpus_is_422(mixed_client):
    resp = mixed_client.get("/download/broken.yaml")
    assert resp.status_code == 422


@pytest.fixture
def auth_client(tmp_path, monkeypatch):
    monkeypatch.setenv("PAPERMAP_PASSWORD", "s3cret")
    (tmp_path / "good.yaml").write_text(MINIMAL, encoding="utf-8")
    app = create_app(tmp_path)
    app.config["TESTING"] = True
    return app.test_client()


def _basic_auth_header(password: str) -> dict:
    token = base64.b64encode(f"x:{password}".encode("utf-8")).decode("ascii")
    return {"Authorization": f"Basic {token}"}


def test_auth_required_when_password_set(auth_client):
    resp = auth_client.get("/")
    assert resp.status_code == 401
    assert "Basic" in resp.headers.get("WWW-Authenticate", "")


def test_auth_passes_with_correct_password(auth_client):
    resp = auth_client.get("/", headers=_basic_auth_header("s3cret"))
    assert resp.status_code == 200


def test_auth_rejects_wrong_password(auth_client):
    resp = auth_client.get("/", headers=_basic_auth_header("nope"))
    assert resp.status_code == 401


def test_auth_does_not_gate_healthz(auth_client):
    resp = auth_client.get("/healthz")
    assert resp.status_code == 200
    assert resp.data == b"ok"


def test_no_auth_when_password_unset(client):
    resp = client.get("/")
    assert resp.status_code == 200
