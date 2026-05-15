"""Format-aware corpus loading.

Auto-detects native papermap vs resourcelib YAML and dispatches to the
matching parser. ``load_corpus`` is the canonical entry point — both
``papermap.schema.load_corpus`` and the CLI delegate here.
"""

from __future__ import annotations

from pathlib import Path

import yaml

from ..schema import Corpus, CorpusError
from .detect import Format, detect_format
from .native import load_native
from .resourcelib import load_resourcelib


def load_corpus(path: str | Path) -> Corpus:
    """Load a corpus from disk, auto-detecting the format."""
    path = Path(path)
    if not path.exists():
        raise CorpusError(f"corpus file not found: {path}")
    raw = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise CorpusError(f"{path}: top level must be a mapping")
    try:
        fmt = detect_format(raw)
    except ValueError as exc:
        raise CorpusError(f"{path}: {exc}") from None
    if fmt is Format.RESOURCELIB:
        return load_resourcelib(raw, source=path)
    return load_native(raw, source=path)


__all__ = ["Format", "detect_format", "load_corpus", "load_native", "load_resourcelib"]
