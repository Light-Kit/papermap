"use strict";

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view map";
  el.appendChild(div);

  if (!state.map.traces.length) {
    div.innerHTML = `<p class="placeholder">This corpus has no map data.</p>`;
    return;
  }

  const allowed = new Set(applyFilter(state.items, filters).map(i => i.id));
  const traces = state.map.traces.map(t => maskTrace(t, allowed));

  const figDiv = document.createElement("div");
  figDiv.style.height = "calc(100vh - 160px)";
  div.appendChild(figDiv);

  // eslint-disable-next-line no-undef
  Plotly.newPlot(figDiv, traces, state.map.layout,
    { responsive: true, displaylogo: false });
}

function maskTrace(trace, allowed) {
  // Edge traces (mode='lines') have no `ids` — return as-is.
  if (!Array.isArray(trace.ids)) return trace;
  const keep = trace.ids.map(id => allowed.has(id));
  const pick = arr => arr.filter((_, i) => keep[i]);
  const out = { ...trace };
  out.ids = trace.ids.filter(id => allowed.has(id));
  for (const key of ["x", "y", "text", "textposition", "customdata"]) {
    if (Array.isArray(trace[key])) out[key] = pick(trace[key]);
  }
  if (trace.marker && Array.isArray(trace.marker.size)) {
    out.marker = { ...trace.marker, size: pick(trace.marker.size) };
  }
  return out;
}
