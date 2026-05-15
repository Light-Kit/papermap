"""papermap — interactive relationship maps for a body of literature.

Give it a corpus of papers, the categories they fall into, and the typed
relationships between them; get back a self-contained interactive HTML
network with a clustered-ring layout.
"""

from __future__ import annotations

from .layout import compute_layout
from .render import RenderConfig, build_figure, write_html
from .schema import (
    Category,
    Corpus,
    CorpusError,
    Edge,
    Item,
    LayoutConfig,
    Paper,
    Relation,
    lint_corpus,
    load_corpus,
)

__version__ = "0.3.0"

__all__ = [
    "Category",
    "Corpus",
    "CorpusError",
    "Edge",
    "Item",
    "LayoutConfig",
    "Paper",
    "Relation",
    "RenderConfig",
    "build_figure",
    "compute_layout",
    "lint_corpus",
    "load_corpus",
    "write_html",
]
