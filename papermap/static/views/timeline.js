"use strict";

// Topic-emergence timeline — heatmap with topics on the y-axis (sorted
// by total count, busiest at top) and year on the x-axis. Cell colour
// intensity = item count for that topic in that year; cell hover shows
// the actual item labels. Designed to answer "when did each topic
// emerge, peak, or fade?" rather than just "papers per year".

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view timeline";
  el.appendChild(div);

  const items = applyFilter(state.items, filters).filter(i => i.year != null);
  if (!items.length) {
    div.innerHTML = `<header><h2>Topic emergence</h2></header>
      <p class="placeholder">No items carry both <code>year:</code> and <code>topics:</code>.</p>`;
    return;
  }

  // (topic, year) → list of items; topic totals decide row order.
  const byTopicYear = new Map();
  const topicTotals = new Map();
  let minYear = Infinity, maxYear = -Infinity;
  for (const it of items) {
    if (it.year < minYear) minYear = it.year;
    if (it.year > maxYear) maxYear = it.year;
    for (const t of it.topics || []) {
      const key = `${t}|${it.year}`;
      if (!byTopicYear.has(key)) byTopicYear.set(key, []);
      byTopicYear.get(key).push(it);
      topicTotals.set(t, (topicTotals.get(t) || 0) + 1);
    }
  }
  if (!topicTotals.size) {
    div.innerHTML = `<header><h2>Topic emergence</h2></header>
      <p class="placeholder">No items carry both <code>year:</code> and <code>topics:</code>.</p>`;
    return;
  }

  // Topics sorted by total descending; top first so they sit at the
  // chart's top edge (Plotly's y-axis runs bottom-up).
  const topics = [...topicTotals.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t);
  const years = [];
  for (let y = minYear; y <= maxYear; y++) years.push(y);

  const z = [], hover = [];
  // Plotly heatmaps render row 0 at the bottom, so build rows in
  // reverse so the most-active topic ends up at the top.
  for (const t of [...topics].reverse()) {
    const zRow = [], hRow = [];
    for (const y of years) {
      const cell = byTopicYear.get(`${t}|${y}`) || [];
      zRow.push(cell.length || null);
      if (cell.length) {
        const sample = cell.slice(0, 5).map(i => i.label || i.id).join("<br>");
        const more = cell.length > 5 ? `<br>… +${cell.length - 5} more` : "";
        hRow.push(`<b>${t}</b> · ${y}<br>${cell.length} item${cell.length > 1 ? "s" : ""}<br>${sample}${more}`);
      } else {
        hRow.push(`${t} · ${y} — no items`);
      }
    }
    z.push(zRow);
    hover.push(hRow);
  }

  const header = document.createElement("header");
  header.innerHTML = `<h2>Topic emergence
    <small>${topics.length} topics × ${years.length} years · cell shade = item count</small></h2>
    <p class="view-blurb">Rows = topics (busiest at top); columns = year. Hover any cell to see the items that landed in that bucket.</p>`;
  div.appendChild(header);

  const figDiv = document.createElement("div");
  div.appendChild(figDiv);

  const trace = {
    type: "heatmap",
    x: years,
    y: [...topics].reverse(),
    z,
    text: hover,
    hoverinfo: "text",
    colorscale: [
      [0, "#f3f6fb"], [0.05, "#dde7f4"], [0.25, "#a8c5e7"],
      [0.5, "#6494c8"], [0.75, "#2c64a3"], [1.0, "#1a4480"],
    ],
    showscale: true,
    xgap: 1,
    ygap: 1,
    colorbar: { title: "items", thickness: 12, len: 0.6 },
  };

  const layout = {
    xaxis: { title: "year", dtick: 1, tickangle: -45 },
    yaxis: { automargin: true, ticksuffix: "  " },
    margin: { l: 10, r: 30, t: 10, b: 60 },
    height: Math.max(360, topics.length * 22 + 100),
  };

  // eslint-disable-next-line no-undef
  Plotly.newPlot(figDiv, [trace], layout, { responsive: true, displaylogo: false });
}
