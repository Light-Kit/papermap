"use strict";

const GROUPS = [
  { key: "kinds",     label: "Kind",     facet: "kinds" },
  { key: "topics",    label: "Topic",    facet: "topics" },
  { key: "statuses",  label: "Status",   facet: "statuses" },
  { key: "org_types", label: "Org",      facet: "org_types" },
  { key: "regions",   label: "Region",   facet: "regions" },
];

export function mount(barEl, state, filters, onChange) {
  barEl.innerHTML = "";
  for (const g of GROUPS) {
    const values = state.facets[g.facet] || [];
    if (!values.length) continue;
    const group = document.createElement("div");
    group.className = "group";
    group.innerHTML = `<b>${g.label}</b>`;
    for (const v of values) {
      const chip = document.createElement("span");
      chip.className = "chip" + (filters[g.key].has(v) ? " on" : "");
      chip.textContent = v;
      chip.addEventListener("click", () => {
        if (filters[g.key].has(v)) filters[g.key].delete(v);
        else filters[g.key].add(v);
        chip.classList.toggle("on");
        onChange();
      });
      group.appendChild(chip);
    }
    barEl.appendChild(group);
  }
  const search = document.createElement("input");
  search.type = "search";
  search.placeholder = "Search label / title / why";
  search.value = filters.q || "";
  search.addEventListener("input", () => {
    filters.q = search.value;
    onChange();
  });
  barEl.appendChild(search);
}
