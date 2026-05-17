"use strict";

// Browse view — grid of item cards (default) or a single item-detail
// page (when an item is "opened"). Clicking a card opens its detail;
// the source URL stays accessible via a small "↗ source" badge that
// stops propagation so it doesn't also open the detail.

import { applyFilter } from "../filters.js";
import { isStarred, toggleStar, userStateOf, getActiveCorpus } from "../stars-state.js";

let _activeId = null;

export function setActiveItem(id) {
  _activeId = id || null;
}

export function render(state, filters, el) {
  const div = document.createElement("div");
  div.className = "view browse";

  if (_activeId) {
    const it = state.items.find(i => i.id === _activeId);
    if (it) {
      div.appendChild(detailView(it, state, filters, el));
      el.appendChild(div);
      return;
    }
    _activeId = null;
  }

  const corpus = getActiveCorpus();
  let items = applyFilter(state.items, filters);
  const starOnly = filters._starOnly === true;
  const isItemStarred = i => isStarred(corpus, "items", i.id, !!i.starred);
  if (starOnly) items = items.filter(isItemStarred);
  const starredCount = state.items.filter(isItemStarred).length;
  const header = document.createElement("header");
  header.innerHTML = `<h2>${state.items.length} items
    <small>(${items.length} shown${starOnly ? ` · ★ only` : ""})</small>
    <a href="#" class="star-filter ${starOnly ? "on" : ""}">${starOnly ? "★" : "☆"} starred (${starredCount})</a></h2>`;
  div.appendChild(header);
  header.querySelector(".star-filter").addEventListener("click", ev => {
    ev.preventDefault();
    filters._starOnly = !starOnly;
    el.innerHTML = "";
    render(state, filters, el);
  });

  const grid = document.createElement("div");
  grid.className = "card-grid";
  for (const it of sortItems(items)) {
    grid.appendChild(card(it, state, filters, el));
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

function card(it, state, filters, el) {
  const corpus = getActiveCorpus();
  const c = document.createElement("article");
  c.className = "card card-item";
  const sourceBadge = it.url
    ? `<a class="card-source" href="${escape(it.url)}" target="_blank" rel="noopener noreferrer" title="Open source">↗ source</a>`
    : "";
  c.innerHTML = `
    <div class="card-head">
      <div class="card-head-left">
        ${it.kind ? `<span class="chip kind">${escape(it.kind)}</span>` : ""}
        ${starButton(corpus, "items", it.id, !!it.starred)}
      </div>
      ${sourceBadge}
    </div>
    <h4>${escape(it.label || it.id)}</h4>
    ${it.title ? `<p class="title">${escape(it.title)}</p>` : ""}
    ${it.meta  ? `<p class="meta">${escape(it.meta)}</p>` : ""}
    ${it.why   ? `<p class="why"><em>${escape(it.why)}</em></p>` : ""}
    ${(it.topics || []).map(t =>
      `<span class="chip topic">${escape(t)}</span>`).join("")}
    ${it.description ? `<p class="card-cta">Read full description →</p>` : ""}
  `;
  // Source badge stops propagation so the body click still opens detail.
  const badge = c.querySelector(".card-source");
  if (badge) badge.addEventListener("click", ev => ev.stopPropagation());
  attachStarHandler(c, corpus, "items", it.id, !!it.starred, state, filters, el);
  c.addEventListener("click", () => {
    _activeId = it.id;
    el.innerHTML = "";
    render(state, filters, el);
  });
  return c;
}

// Star button + click handler shared across views.
export function starButton(corpus, kind, id, editorial) {
  const on = isStarred(corpus, kind, id, editorial);
  const state = userStateOf(corpus, kind, id, editorial);
  const title = state === "editorial" ? "Editorial pick — click to unstar"
    : state === "added" ? "You starred this — click to unstar"
    : state === "removed" ? "Editorial pick (you unstarred) — click to restore"
    : "Click to star";
  return `<button class="star-btn ${on ? "on" : ""}" data-star-id="${escape(id)}" data-star-kind="${kind}" data-star-editorial="${editorial ? "1" : "0"}" title="${escape(title)}">${on ? "★" : "☆"}</button>`;
}

export function attachStarHandler(root, corpus, kind, id, editorial) {
  const btn = root.querySelector(`.star-btn[data-star-id="${cssEscape(id)}"][data-star-kind="${kind}"]`);
  if (!btn) return;
  btn.addEventListener("click", ev => {
    ev.preventDefault();
    ev.stopPropagation();
    toggleStar(corpus, kind, id, editorial);
    // Let app.js re-render the active view — direct render() here would
    // re-render Browse from cross-view callers (Topics, Blogs).
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  });
}

function cssEscape(s) {
  return String(s).replace(/(["\\])/g, "\\$1");
}

function detailView(it, state, filters, el) {
  const corpus = getActiveCorpus();
  const wrap = document.createElement("article");
  wrap.className = "item-detail";
  const facetRow = (label, value) => value
    ? `<div class="facet"><span class="facet-label">${label}</span><span class="facet-value">${escape(value)}</span></div>`
    : "";
  const sourceLink = it.url
    ? `<a class="item-source" href="${escape(it.url)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>`
    : "";
  const topics = (it.topics || []).map(t =>
    `<span class="chip topic">${escape(t)}</span>`).join(" ");
  const people = (it.people || []).map(p =>
    `<span class="chip">${escape(p)}</span>`).join(" ");
  const description = it.description
    ? `<div class="item-description">${it.description.split(/\n\n+/).map(p =>
        `<p>${escape(p)}</p>`).join("")}</div>`
    : `<p class="item-no-desc">No long-form description yet — only the <code>why:</code> line above. Use <code>scripts/expand_descriptions.py</code> to generate one.</p>`;
  wrap.innerHTML = `
    <p class="item-back"><a href="#" class="item-back-link">← All items</a></p>
    <div class="item-head">
      ${it.kind ? `<span class="chip kind">${escape(it.kind)}</span>` : ""}
      ${starButton(corpus, "items", it.id, !!it.starred)}
      <h1>${escape(it.label || it.id)}</h1>
      ${it.year ? `<span class="item-year">${it.year}</span>` : ""}
    </div>
    ${it.title ? `<p class="item-title">${escape(it.title)}</p>` : ""}
    ${it.meta ? `<p class="item-meta">${escape(it.meta)}</p>` : ""}
    ${it.why ? `<p class="item-why"><em>${escape(it.why)}</em></p>` : ""}
    ${description}
    <div class="item-facets">
      ${facetRow("status", it.status)}
      ${facetRow("org type", it.org_type)}
      ${facetRow("region", it.region)}
      ${facetRow("weight", it.weight ? String(it.weight) : "")}
    </div>
    ${topics ? `<div class="item-section"><h3>Topics</h3>${topics}</div>` : ""}
    ${people ? `<div class="item-section"><h3>People</h3>${people}</div>` : ""}
    <p class="item-footer">${sourceLink}</p>
  `;
  wrap.querySelector(".item-back-link").addEventListener("click", ev => {
    ev.preventDefault();
    _activeId = null;
    el.innerHTML = "";
    render(state, filters, el);
  });
  attachStarHandler(wrap, corpus, "items", it.id, !!it.starred, state, filters, el);
  return wrap;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
