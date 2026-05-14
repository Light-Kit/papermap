"""Clustered-ring layout — the placement algorithm behind a paper map.

The layout is deliberate, not force-directed. One category (the *hub*) is
placed at the centre; the rest ring it in the order they appear in the
corpus. Within each cluster, papers sit evenly on a circle whose radius
scales with the cluster's size. If a ``hub_node`` is given, it is centred
inside the hub cluster with the rest of that category ringed around it.

This makes the structural argument legible: in the worked example, every
critique, response, and theory points at the central reckoning cluster.
"""

from __future__ import annotations

import math

from .schema import Corpus

# Eight label anchor positions, indexed by octant of the node's angle.
_OCTANT = [
    "middle right", "top right", "top center", "top left",
    "middle left", "bottom left", "bottom center", "bottom right",
]


def _textpos(angle: float) -> str:
    """Pick a label anchor so text fans outward from the cluster centre."""
    a = angle % (2 * math.pi)
    return _OCTANT[int((a + math.pi / 8) / (math.pi / 4)) % 8]


def compute_layout(corpus: Corpus) -> tuple[dict[str, tuple[float, float]], dict[str, str]]:
    """Return ``(positions, label_anchors)`` keyed by paper id."""
    cfg = corpus.layout
    cat_ids = [c.id for c in corpus.categories]

    hub = cfg.hub_category if cfg.hub_category in cat_ids else None
    ring = [c for c in cat_ids if c != hub]

    centres: dict[str, tuple[float, float]] = {}
    if hub:
        centres[hub] = (0.0, 0.0)
    for i, c in enumerate(ring):
        ang = 2 * math.pi * i / max(len(ring), 1) + math.pi / 2
        centres[c] = (math.cos(ang) * cfg.ring_radius,
                      math.sin(ang) * cfg.ring_radius)

    pos: dict[str, tuple[float, float]] = {}
    textpos: dict[str, str] = {}

    for cat in cat_ids:
        nodes = [p.id for p in corpus.papers_in(cat)]
        if not nodes:
            continue
        cx, cy = centres[cat]

        if cat == hub and cfg.hub_node in nodes:
            # Centre the hub node, ring the rest of its category around it.
            pos[cfg.hub_node] = (cx, cy)
            textpos[cfg.hub_node] = "bottom center"
            rest = [n for n in nodes if n != cfg.hub_node]
            for j, nid in enumerate(rest):
                ang = 2 * math.pi * j / max(len(rest), 1) - math.pi / 2
                pos[nid] = (cx + math.cos(ang) * cfg.hub_ring_radius,
                            cy + math.sin(ang) * cfg.hub_ring_radius)
                textpos[nid] = _textpos(ang)
        else:
            r = min(cfg.cluster_radius_max,
                    max(cfg.cluster_radius_min,
                        cfg.cluster_radius_scale * len(nodes)))
            for j, nid in enumerate(nodes):
                ang = 2 * math.pi * j / len(nodes) - math.pi / 2
                pos[nid] = (cx + math.cos(ang) * r, cy + math.sin(ang) * r)
                textpos[nid] = _textpos(ang)

    return pos, textpos
