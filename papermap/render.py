"""Render a corpus as an interactive Plotly node-link figure.

Edges are drawn first (one trace per relation type, so each gets a legend
entry), then nodes (one trace per category). The result is a self-contained
HTML file: pan, zoom, and hover for each paper's "why to read it".
"""

from __future__ import annotations

from dataclasses import dataclass

import plotly.graph_objects as go

from .layout import compute_layout
from .schema import Corpus

PLOTLY_CONFIG = {"responsive": True, "displaylogo": False}


@dataclass
class RenderConfig:
    height: int = 780
    font_size: int = 7
    node_size_base: int = 11
    node_size_per_weight: int = 4
    axis_range: float = 18.0


def build_figure(corpus: Corpus, render: RenderConfig | None = None) -> go.Figure:
    """Build the Plotly figure for a corpus."""
    render = render or RenderConfig()
    pos, textpos = compute_layout(corpus)
    fig = go.Figure()

    # Edges — one trace per relation type, drawn below the nodes.
    for i, rel in enumerate(corpus.relations):
        xs: list[float | None] = []
        ys: list[float | None] = []
        for e in corpus.edges:
            if e.relation != rel.id:
                continue
            if e.source not in pos or e.target not in pos:
                continue
            xs += [pos[e.source][0], pos[e.target][0], None]
            ys += [pos[e.source][1], pos[e.target][1], None]
        fig.add_trace(go.Scatter(
            x=xs, y=ys, mode="lines",
            line=dict(color=rel.color, width=1.4, dash=rel.dash),
            hoverinfo="skip", name=rel.label,
            legendgroup="relation",
            legendgrouptitle_text="Relationship" if i == 0 else None,
        ))

    # Nodes — one trace per category.
    for i, cat in enumerate(corpus.categories):
        sub = [p for p in corpus.papers_in(cat.id) if p.id in pos]
        if not sub:
            continue
        fig.add_trace(go.Scatter(
            x=[pos[p.id][0] for p in sub],
            y=[pos[p.id][1] for p in sub],
            mode="markers+text",
            text=[p.label for p in sub],
            textposition=[textpos[p.id] for p in sub],
            textfont=dict(size=render.font_size, color="#333"),
            marker=dict(
                size=[render.node_size_base + render.node_size_per_weight * p.weight
                      for p in sub],
                color=cat.color, opacity=0.92,
                line=dict(color="#ffffff", width=1.2),
            ),
            name=cat.label,
            legendgroup="category",
            legendgrouptitle_text="Paper category" if i == 0 else None,
            customdata=[[p.title, p.meta, p.why] for p in sub],
            hovertemplate=(
                "<b>%{customdata[0]}</b><br>%{customdata[1]}<br>"
                "<i>%{customdata[2]}</i><extra></extra>"
            ),
        ))

    title_text = corpus.title
    if corpus.subtitle:
        title_text += f"<br><sub>{corpus.subtitle}</sub>"
    rng = render.axis_range
    fig.update_layout(
        title=dict(text=title_text, font=dict(size=15)),
        showlegend=True,
        legend=dict(
            orientation="h", bgcolor="rgba(255,255,255,0.95)",
            bordercolor="#bbb", borderwidth=1, font=dict(size=10),
            x=0.5, xanchor="center", y=-0.02, yanchor="top",
            grouptitlefont=dict(size=11),
        ),
        xaxis=dict(visible=False, range=[-rng, rng]),
        yaxis=dict(visible=False, range=[-rng, rng], scaleanchor="x"),
        plot_bgcolor="#fafafa",
        paper_bgcolor="white",
        margin=dict(l=30, r=30, t=80, b=110),
        height=render.height,
        hovermode="closest",
    )
    return fig


def write_html(fig: go.Figure, out_path: str) -> None:
    """Write a self-contained HTML file (plotly.js loaded from CDN)."""
    fig.write_html(
        out_path,
        include_plotlyjs="cdn",
        full_html=True,
        config=PLOTLY_CONFIG,
    )
