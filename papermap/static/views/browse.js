"use strict";

import { applyFilter } from "../filters.js";

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view browse";
  const items = applyFilter(state.items, filters);

  const header = document.createElement("header");
  header.innerHTML = `<h2>${state.items.length} items
    <small>(${items.length} shown)</small></h2>`;
  div.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "card-grid";
  for (const it of sortItems(items)) {
    grid.appendChild(card(it));
  }
  if (!items.length) {
    grid.innerHTML = `<p class="placeholder">No items match the current filters.</p>`;
  }
  div.appendChild(grid);
  el.appendChild(div);
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    const k = (a.kind || "").localeCompare(b.kind || "");
    return k !== 0 ? k : (a.label || "").localeCompare(b.label || "");
  });
}

function card(it) {
  const c = document.createElement("article");
  c.className = "card";
  c.innerHTML = `
    ${it.kind ? `<span class="chip kind">${escape(it.kind)}</span>` : ""}
    <h4>${escape(it.label || it.id)}</h4>
    ${it.title ? `<p class="title">${escape(it.title)}</p>` : ""}
    ${it.meta  ? `<p class="meta">${escape(it.meta)}</p>` : ""}
    ${it.why   ? `<p class="why"><em>${escape(it.why)}</em></p>` : ""}
    ${(it.topics || []).map(t =>
      `<span class="chip topic">${escape(t)}</span>`).join("")}
  `;
  return c;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
