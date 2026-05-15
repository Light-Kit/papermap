"use strict";

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view timeline";
  el.appendChild(div);

  const items = applyFilter(state.items, filters);
  const withYear = items.filter(i => i.year != null);
  const noYear = items.length - withYear.length;

  const header = document.createElement("header");
  header.innerHTML = `<h2>Timeline
    <small>(${withYear.length} dated · ${noYear} missing year)</small></h2>`;
  div.appendChild(header);

  if (!withYear.length) {
    const p = document.createElement("p");
    p.className = "placeholder";
    p.textContent = "No items carry `year:`. Add a 4-digit `year:` to items to populate the timeline.";
    div.appendChild(p);
    return;
  }

  const colourByKind = new Map();
  for (const c of state.categories) colourByKind.set(c.id, c.color);
  const palette = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f"];

  const byKind = new Map();
  for (const it of withYear) {
    if (!byKind.has(it.kind)) byKind.set(it.kind, []);
    byKind.get(it.kind).push(it);
  }

  const kinds = [...byKind.keys()];
  const traces = kinds.map((k, idx) => {
    const pts = byKind.get(k);
    return {
      type: "scatter",
      mode: "markers",
      name: k || "(no kind)",
      x: pts.map(p => p.year),
      y: pts.map(() => Math.random() * 0.8 + idx),
      text: pts.map(p => `${p.label}<br><i>${p.title || ""}</i>`),
      hoverinfo: "text",
      marker: {
        size: 10,
        color: colourByKind.get(k) || palette[idx % palette.length],
        line: { color: "#fff", width: 1 },
      },
    };
  });

  const minY = Math.min(...withYear.map(i => i.year));
  const maxY = Math.max(...withYear.map(i => i.year));
  const layout = {
    xaxis: { title: "year", range: [minY - 0.5, maxY + 0.5], dtick: 1 },
    yaxis: { visible: false, range: [-0.5, kinds.length + 0.5] },
    showlegend: true,
    legend: { orientation: "h", y: -0.15 },
    margin: { l: 30, r: 30, t: 20, b: 60 },
    height: 460,
  };

  const figDiv = document.createElement("div");
  div.appendChild(figDiv);
  // eslint-disable-next-line no-undef
  Plotly.newPlot(figDiv, traces, layout, { responsive: true, displaylogo: false });
}
