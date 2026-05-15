"""Format auto-detection for the loaders package."""

from __future__ import annotations

import pytest

from papermap.loaders.detect import Format, detect_format


def test_detects_native_papermap():
    raw = {"categories": [], "relations": [], "papers": [], "edges": []}
    assert detect_format(raw) == Format.PAPERMAP


def test_detects_resourcelib():
    raw = {"vocab": {}, "items": []}
    assert detect_format(raw) == Format.RESOURCELIB


def test_resourcelib_wins_when_both_present():
    raw = {"vocab": {}, "items": [], "categories": [], "papers": []}
    assert detect_format(raw) == Format.RESOURCELIB


def test_rejects_unknown_shape():
    with pytest.raises(ValueError, match="cannot detect format"):
        detect_format({"foo": "bar"})
