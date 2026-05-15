"""Pick a parser based on the YAML's top-level shape."""

from __future__ import annotations

from enum import Enum


class Format(str, Enum):
    PAPERMAP = "papermap"
    RESOURCELIB = "resourcelib"


def detect_format(raw: dict) -> Format:
    """Return the matching format, or raise ValueError if neither fits.

    Resourcelib wins ties: any document carrying both ``vocab:``+``items:``
    and ``categories:``+``papers:`` is almost certainly a resourcelib corpus
    that also wants papermap views.
    """
    has_resourcelib = "vocab" in raw and "items" in raw
    has_papermap = "categories" in raw and "papers" in raw
    if has_resourcelib:
        return Format.RESOURCELIB
    if has_papermap:
        return Format.PAPERMAP
    raise ValueError(
        "cannot detect format: expected either `vocab:`+`items:` (resourcelib) "
        "or `categories:`+`papers:` (papermap)"
    )
