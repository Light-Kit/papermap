"use strict";

// Compare view — a sortable table of model cards (kind: "model") only.
// Respects the global filter bar (modality, topics, search, …) via
// applyFilter, then narrows to models. Clicking a row label opens that
// model's detail page in the Browse view.

import { applyFilter } from "../filters.js";
import { setActiveItem } from "./browse.js";

// Column definitions: [header, accessor, css-class]. The accessor returns
// the cell's display string; sorting is lexicographic on that string,
// except `year` which sorts numerically.
const COLUMNS = [
  ["Model",        it => it.label || it.id,        "col-name"],
  ["Modality",     it => it.modality || "",        "col-modality"],
  ["Params",       it => it.params || "",           "col-params"],
  ["Architecture", it => it.architecture || "",     "col-arch"],
  ["Objective",    it => it.objective || "",         "col-obj"],
  ["Pretrain data",it => it.pretrain_data || "",     "col-data"],
  ["License",      it => it.license || it.access || "", "col-lic"],
  ["Year",         it => it.year != null ? String(it.year) : "", "col-year"],
  ["Key benchmark",it => (Array.isArray(it.benchmarks) && it.benchmarks[0])
                          ? `${it.benchmarks[0].name || ""}: ${it.benchmarks[0].score || ""}`
                          : "", "col-bench"],
];

let _sortCol = 0;       // index into COLUMNS
let _sortAsc = true;

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view compare";

  const models = applyFilter(state.items, filters).filter(i => i.kind === "model");

  const header = document.createElement("header");
  header.innerHTML = `<h2>${models.length} models
    <small>(sortable — click a column header)</small></h2>`;
  div.appendChild(header);

  if (!models.length) {
    const p = document.createElement("p");
    p.className = "placeholder";
    p.textContent = "No models match the current filters.";
    div.appendChild(p);
    el.appendChild(div);
    return;
  }

  const sorted = sortRows(models);

  const table = document.createElement("table");
  table.className = "compare-table data-table";
  const thead = document.createElement("thead");
  const htr = document.createElement("tr");
  COLUMNS.forEach(([label,, cls], idx) => {
    const th = document.createElement("th");
    th.className = cls;
    const arrow = idx === _sortCol ? (_sortAsc ? " ▲" : " ▼") : "";
    th.textContent = label + arrow;
    th.addEventListener("click", () => {
      if (_sortCol === idx) { _sortAsc = !_sortAsc; }
      else { _sortCol = idx; _sortAsc = true; }
      el.innerHTML = "";
      render(state, filters, el);
    });
    htr.appendChild(th);
  });
  thead.appendChild(htr);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  for (const it of sorted) {
    const tr = document.createElement("tr");
    COLUMNS.forEach(([, accessor, cls], idx) => {
      const td = document.createElement("td");
      td.className = cls;
      const val = accessor(it);
      if (idx === 0) {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = val;
        a.addEventListener("click", ev => {
          ev.preventDefault();
          setActiveItem(it.id);
          document.dispatchEvent(new CustomEvent("papermap:show-view",
            { detail: { view: "browse" } }));
        });
        td.appendChild(a);
      } else {
        td.textContent = val;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  div.appendChild(table);
  el.appendChild(div);
}

function sortRows(rows) {
  const [, accessor] = COLUMNS[_sortCol];
  const isYear = COLUMNS[_sortCol][0] === "Year";
  const out = [...rows].sort((a, b) => {
    if (isYear) {
      const na = parseInt(accessor(a) || "0", 10);
      const nb = parseInt(accessor(b) || "0", 10);
      return na - nb;
    }
    return accessor(a).localeCompare(accessor(b));
  });
  return _sortAsc ? out : out.reverse();
}
