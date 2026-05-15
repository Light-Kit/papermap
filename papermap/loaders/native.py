"""Native papermap YAML loader.

Today's parser lives in ``papermap.schema`` as ``_parse_raw_papermap`` so
that the YAML-reading and validation stay in one place; this module is a
thin shim that lets the loaders package present a uniform interface.
"""

from __future__ import annotations

from pathlib import Path

from ..schema import Corpus, _parse_raw_papermap


def load_native(raw: dict, source: Path | None = None) -> Corpus:
    """Parse a native papermap YAML mapping into a Corpus."""
    return _parse_raw_papermap(raw)
