"use strict";

import { loadState, getState } from "./state.js";
import { loadBlogs } from "./blogs-state.js";
import { loadPresentations } from "./presentations-state.js";
import { loadTopicAbstracts } from "./topics-state.js";
import { setActiveCorpus } from "./stars-state.js";
import { mount as mountFilterBar } from "./filterbar.js";
import * as browse        from "./views/browse.js";
import * as mapView       from "./views/map.js";
import * as topics        from "./views/topics.js";
import * as blogs         from "./views/blogs.js";
import * as presentations from "./views/presentations.js";
import * as timeline      from "./views/timeline.js";
import * as compare       from "./views/compare.js";

const sidebar  = document.getElementById("corpora");
const tabsBar  = document.getElementById("viewtabs");
const filterBar = document.getElementById("filterbar");
const main     = document.getElementById("main");

const views = { browse, map: mapView, topics, blogs, presentations, timeline, compare };

// Filters are mutated in place by filterbar.js (Phase 7).
const filters = {
  kinds: new Set(), topics: new Set(), statuses: new Set(),
  org_types: new Set(), regions: new Set(), modalities: new Set(), q: "",
};
const filterableViews = new Set(["browse", "map", "compare"]);

let activeCorpus = null;
let activeView = "browse";

async function init() {
  for (const btn of tabsBar.querySelectorAll("button")) {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  }
  window.addEventListener("hashchange", routeFromHash);

  // Lets the Topics view (or any future view) ask app.js to apply a
  // facet filter and switch views in one gesture, without exposing
  // setView / filterBar internals to the views themselves.
  document.addEventListener("papermap:filter-and-show", (ev) => {
    const { view, topic } = ev.detail || {};
    if (view === "blogs") {
      // Blogs filters live in the view module, not on the global filterbar
      // (blogs aren't corpus items so the facet vocab doesn't apply 1:1).
      blogs.setTopicFilter(topic || null);
      blogs.setActiveSlug(null);
      setView("blogs");
      return;
    }
    if (topic) {
      filters.topics.clear();
      filters.topics.add(topic);
      mountFilterBar(filterBar, getState(), filters, () => setView(activeView));
    }
    if (view) setView(view);
  });

  document.addEventListener("papermap:rerender-active-view", () => {
    setView(activeView);
  });

  // Compare view asks app.js to switch to Browse after setting the active
  // item (so the detail page opens for the clicked model).
  document.addEventListener("papermap:show-view", (ev) => {
    const { view } = ev.detail || {};
    if (view) setView(view);
  });

  if (sidebar.parentElement.hidden) {
    // Static-export mode: state.js will pick up the sibling state.json.
    try {
      await loadState("__static__");
    } catch (exc) {
      main.innerHTML = `<div class="error">${exc.message}</div>`;
      return;
    }
    await loadBlogs("__static__");
    await loadPresentations("__static__");
    setActiveCorpus("__static__");
    activeCorpus = "__static__";
    tabsBar.hidden = false;
    resetFilters();
    mountFilterBar(filterBar, getState(), filters, () => setView(activeView));
    setView(activeView);
    return;
  }

  const resp = await fetch("/api/corpora");
  const items = await resp.json();
  for (const it of items) {
    const li = document.createElement("li");
    li.textContent = it.title || it.name;
    li.dataset.name = it.name;
    if (!it.valid) { li.classList.add("invalid"); li.title = it.error || "invalid"; }
    li.addEventListener("click", () => pickCorpus(li, it));
    sidebar.appendChild(li);
  }
  routeFromHash();
}

async function pickCorpus(li, item) {
  if (!item.valid) {
    main.innerHTML = `<div class="error">${item.name}: ${item.error}</div>`;
    tabsBar.hidden = true;
    filterBar.hidden = true;
    return;
  }
  document.querySelectorAll("#corpora li.active").forEach(el => el.classList.remove("active"));
  li.classList.add("active");
  main.innerHTML = '<p class="placeholder">Loading…</p>';
  try {
    await loadState(item.name);
  } catch (exc) {
    main.innerHTML = `<div class="error">${exc.message}</div>`;
    return;
  }
  await loadBlogs(item.name);
  await loadPresentations(item.name);
  await loadTopicAbstracts(item.name);
  setActiveCorpus(item.name);
  activeCorpus = item.name;
  tabsBar.hidden = false;
  resetFilters();
  mountFilterBar(filterBar, getState(), filters, () => setView(activeView));
  setView(activeView);
  writeHash();
}

function resetFilters() {
  filters.kinds.clear();
  filters.topics.clear();
  filters.statuses.clear();
  filters.org_types.clear();
  filters.regions.clear();
  filters.modalities.clear();
  filters.q = "";
}

function setView(name) {
  if (!views[name]) return;
  activeView = name;
  for (const btn of tabsBar.querySelectorAll("button")) {
    btn.classList.toggle("active", btn.dataset.view === name);
  }
  const state = getState();
  if (!state) return;
  const mapBtn = tabsBar.querySelector('button[data-view="map"]');
  mapBtn.hidden = !state.map.traces.length;
  if (mapBtn.hidden && name === "map") return setView("browse");
  filterBar.hidden = !filterableViews.has(name);
  main.innerHTML = "";
  views[name].render(state, filters, main);
  writeHash();
}

function writeHash() {
  if (!activeCorpus) return;
  const h = `#/corpus/${encodeURIComponent(activeCorpus)}?view=${activeView}`;
  if (location.hash !== h) history.replaceState(null, "", h);
}

function routeFromHash() {
  const m = /^#\/corpus\/([^?]+)\?view=([a-z]+)/.exec(location.hash);
  if (!m) return;
  const [_, name, view] = m;
  activeView = view;
  if (sidebar.parentElement.hidden) return;
  const li = sidebar.querySelector(`li[data-name="${decodeURIComponent(name)}"]`);
  if (li && !li.classList.contains("active")) li.click();
}

init();
