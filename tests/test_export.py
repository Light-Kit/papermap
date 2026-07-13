"""Static-site exporter."""

from __future__ import annotations

import json
from pathlib import Path

from papermap.export import export_static

EXAMPLE = Path(__file__).parent / "fixtures" / "native_papermap.yaml"


def test_export_produces_state_and_bundle(tmp_path):
    out = tmp_path / "site"
    export_static(EXAMPLE, out)
    assert (out / "index.html").exists()
    assert (out / "app.js").exists()
    assert (out / "app.css").exists()
    assert (out / "state.json").exists()
    state = json.loads((out / "state.json").read_text())
    assert state["title"]
    assert state["items"]
