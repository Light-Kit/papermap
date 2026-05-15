"use strict";

export function render(state, _filters, el) {
  const div = document.createElement("div");
  div.className = "view stats";

  const header = document.createElement("header");
  header.innerHTML = `<h2>${escape(state.title)}</h2>
    <span class="stats">${state.items.length} items ·
      ${state.categories.length} categories ·
      ${state.relations.length} relations ·
      ${state.edges.length} edges ·
      <code>${state.format}</code></span>`;
  div.appendChild(header);

  if (state.warnings && state.warnings.length) {
    const w = document.createElement("div");
    w.className = "warnings";
    w.innerHTML = "<strong>Lint warnings</strong>";
    const ul = document.createElement("ul");
    for (const msg of state.warnings) {
      const li = document.createElement("li");
      li.textContent = msg;
      ul.appendChild(li);
    }
    w.appendChild(ul);
    div.appendChild(w);
  }

  div.appendChild(barChart("By kind", countBy(state.items, "kind")));
  div.appendChild(barChart("Top topics",
    topN(countByTopic(state.items), 15)));

  el.appendChild(div);
}

function countBy(items, key) {
  const counts = new Map();
  for (const it of items) {
    const v = it[key];
    if (v == null) continue;
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function countByTopic(items) {
  const counts = new Map();
  for (const it of items) {
    for (const t of it.topics || []) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function topN(pairs, n) { return pairs.slice(0, n); }

function barChart(title, rows) {
  const max = Math.max(1, ...rows.map(r => r[1]));
  const wrap = document.createElement("section");
  wrap.className = "bar-chart";
  wrap.innerHTML = `<h3>${escape(title)}</h3>`;
  const list = document.createElement("ul");
  for (const [label, count] of rows) {
    const li = document.createElement("li");
    const lbl = document.createElement("span");
    lbl.className = "lbl";
    lbl.textContent = label;
    const bar = document.createElement("span");
    bar.className = "bar";
    bar.style.width = `${(count / max) * 100}%`;
    const n = document.createElement("span");
    n.className = "n";
    n.textContent = count;
    li.appendChild(lbl);
    li.appendChild(bar);
    li.appendChild(n);
    list.appendChild(li);
  }
  if (!rows.length) {
    list.innerHTML = `<li class="placeholder">No data for this axis.</li>`;
  }
  wrap.appendChild(list);
  return wrap;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
