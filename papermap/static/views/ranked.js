"use strict";

export function render(state, _filters, el) {
  const div = document.createElement("div");
  div.className = "view ranked";
  el.appendChild(div);

  const cols = document.createElement("div");
  cols.className = "ranked-cols";

  cols.appendChild(rankedColumn("Topics",
    countList(state.items.flatMap(i => i.topics || []))));

  const people = countList(state.items.flatMap(i => i.people || []));
  cols.appendChild(rankedColumn("People",
    people.length ? people :
      [["No `people:` field on items — add it to a resourcelib corpus.", 0]]));

  div.appendChild(cols);
}

function countList(values) {
  const counts = new Map();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function rankedColumn(title, rows) {
  const max = Math.max(1, ...rows.map(r => r[1] || 0));
  const wrap = document.createElement("section");
  wrap.className = "ranked-col";
  wrap.innerHTML = `<h3>${title}</h3>`;
  const ul = document.createElement("ul");
  for (const [name, count] of rows) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="lbl">${escape(name)}</span>
      <span class="bar" style="width:${(count / max) * 100}%"></span>
      <span class="n">${count || ""}</span>`;
    ul.appendChild(li);
  }
  wrap.appendChild(ul);
  return wrap;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
