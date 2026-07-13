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

try:  # libyaml parses ~10x faster than the pure-Python loader
    from yaml import CSafeLoader as _Loader
except ImportError:  # pragma: no cover - depends on the libyaml build
    from yaml import SafeLoader as _Loader


def parse_yaml(text: str):
    """Parse YAML with the fastest safe loader available."""
    return yaml.load(text, Loader=_Loader)


def load_corpus_with_format(path: str | Path) -> tuple[Corpus, Format]:
    """Load a corpus and report the format it was detected as.

    Callers that need the format (the server, to label the payload) use this
    so a single parse serves both purposes.
    """
    path = Path(path)
    if not path.exists():
        raise CorpusError(f"corpus file not found: {path}")
    raw = parse_yaml(path.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        raise CorpusError(f"{path}: top level must be a mapping")
    try:
        fmt = detect_format(raw)
    except ValueError as exc:
        raise CorpusError(f"{path}: {exc}") from None
    if fmt is Format.RESOURCELIB:
        return load_resourcelib(raw, source=path), fmt
    return load_native(raw, source=path), fmt


def load_corpus(path: str | Path) -> Corpus:
    """Load a corpus from disk, auto-detecting the format."""
    return load_corpus_with_format(path)[0]


__all__ = [
    "Format",
    "detect_format",
    "load_corpus",
    "load_corpus_with_format",
    "load_native",
    "load_resourcelib",
    "parse_yaml",
]
