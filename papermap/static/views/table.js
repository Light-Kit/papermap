"use strict";

import { applyFilter } from "../filters.js";

const COLUMNS = [
  { key: "kind",    label: "Kind" },
  { key: "label",   label: "Label" },
  { key: "title",   label: "Title" },
  { key: "topics",  label: "Topics", get: it => (it.topics || []).join(", ") },
  { key: "year",    label: "Year" },
  { key: "status",  label: "Status" },
  { key: "region",  label: "Region" },
];

let sortKey = "kind";
let sortDir = 1;

export function render(state, filters, el) {
  el.innerHTML = "";
  const div = document.createElement("div");
  div.className = "view table";
  el.appendChild(div);

  const items = applyFilter(state.items, filters);
  div.innerHTML = `<header><h2>${items.length} items</h2></header>`;

  const t = document.createElement("table");
  t.className = "data-table";
  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  for (const col of COLUMNS) {
    const th = document.createElement("th");
    th.textContent = col.label;
    th.classList.toggle("sorted-asc",  sortKey === col.key && sortDir === 1);
    th.classList.toggle("sorted-desc", sortKey === col.key && sortDir === -1);
    th.addEventListener("click", () => {
      if (sortKey === col.key) sortDir = -sortDir;
      else { sortKey = col.key; sortDir = 1; }
      render(state, filters, el);
    });
    trh.appendChild(th);
  }
  thead.appendChild(trh);
  t.appendChild(thead);

  const col = COLUMNS.find(c => c.key === sortKey);
  const sorted = [...items].sort((a, b) => {
    const va = col.get ? col.get(a) : a[sortKey];
    const vb = col.get ? col.get(b) : b[sortKey];
    return cmp(va, vb) * sortDir;
  });

  const tbody = document.createElement("tbody");
  for (const it of sorted) {
    const tr = document.createElement("tr");
    for (const c of COLUMNS) {
      const td = document.createElement("td");
      const v = c.get ? c.get(it) : it[c.key];
      td.textContent = v == null ? "" : String(v);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  t.appendChild(tbody);
  div.appendChild(t);
}

function cmp(a, b) {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b));
}
