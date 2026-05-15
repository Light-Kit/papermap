"""Resourcelib YAML loader → papermap Corpus adapter (stub).

Implementation lands in Task 2.
"""

from __future__ import annotations

from pathlib import Path

from ..schema import Corpus, CorpusError


def load_resourcelib(raw: dict, source: Path | None = None) -> Corpus:
    raise CorpusError("resourcelib loader not yet implemented (Task 2)")
