"use strict";

// Topics view — one card per topic. Each card carries:
//   1. count chip + 3-line TL;DR from items' `why:` lines
//   2. an expandable "abstract" (~150 words, authored prose) when an
//      abstract markdown file exists for the topic
//   3. footers linking to Browse (filtered) and Blogs (filtered)
// Clicking the card body still routes to Browse pre-filtered to the
// topic; the abstract toggle + blog chip stop propagation.

import { blogsByTopic } from "../blogs-state.js";
import { getTopicAbstract } from "../topics-state.js";

const _open = new Set();  // expanded abstracts persist across re-renders
let _starOnly = false;

export function render(state, _filters, el) {
  const div = document.createElement("div");
  div.className = "view topics";

  const byTopic = groupByTopic(state.items);
  let sorted = [...byTopic.entries()].sort((a, b) =>
    b[1].length - a[1].length || a[0].localeCompare(b[0]));
  if (_starOnly) sorted = sorted.filter(([t]) => {
    const a = getTopicAbstract(t);
    return a && a.starred;
  });
  const starredCount = sorted.filter
    ? [...byTopic.keys()].filter(t => {
        const a = getTopicAbstract(t);
        return a && a.starred;
      }).length
    : 0;

  const header = document.createElement("header");
  header.innerHTML = `<h2>${sorted.length} topics${_starOnly ? " · ★ only" : ` across ${state.items.length} items`}
    <small>auto-derived TL;DRs + an authored abstract per topic</small>
    <a href="#" class="star-filter ${_starOnly ? "on" : ""}">${_starOnly ? "★" : "☆"} starred (${starredCount})</a></h2>`;
  div.appendChild(header);
  header.querySelector(".star-filter").addEventListener("click", ev => {
    ev.preventDefault();
    _starOnly = !_starOnly;
    el.innerHTML = "";
    render(state, _filters, el);
  });

  const blogs = blogsByTopic();
  const grid = document.createElement("div");
  grid.className = "card-grid topic-grid";
  for (const [topic, items] of sorted) {
    grid.appendChild(topicCard(topic, items, blogs.get(topic) || []));
  }
  if (!sorted.length) {
    grid.innerHTML = `<p class="placeholder">No topics match the current filter.</p>`;
  }
  div.appendChild(grid);
  el.appendChild(div);
}

function groupByTopic(items) {
  const m = new Map();
  for (const it of items) {
    for (const t of it.topics || []) {
      if (!m.has(t)) m.set(t, []);
      m.get(t).push(it);
    }
  }
  return m;
}

function pickHighlights(items, n = 3) {
  return [...items]
    .filter(i => i.why)
    .sort((a, b) => (b.year || 0) - (a.year || 0)
      || (a.label || "").localeCompare(b.label || ""))
    .slice(0, n);
}

function topicCard(topic, items, blogs) {
  const c = document.createElement("article");
  c.className = "card card-topic";
  c.dataset.topic = topic;

  const top = pickHighlights(items);
  const tldr = top.length
    ? `<ul class="topic-tldr">${top.map(i => {
        const year = i.year ? ` <span class="muted">(${i.year})</span>` : "";
        return `<li><strong>${escape(i.label || i.id)}</strong>${year} — ${escape(i.why)}</li>`;
      }).join("")}</ul>`
    : `<p class="muted">No <code>why:</code> lines yet for items in this topic.</p>`;

  const abstract = getTopicAbstract(topic);
  const isOpen = _open.has(topic);
  const abstractBlock = abstract
    ? `<div class="topic-abstract ${isOpen ? "open" : ""}">
         <a href="#" class="topic-abstract-toggle">${isOpen ? "▾ Hide abstract" : "▸ Read abstract"}</a>
         ${isOpen ? `<div class="topic-abstract-body">${abstract.body_html}</div>` : ""}
       </div>`
    : "";

  const blogChip = blogs.length
    ? `<a href="#" class="topic-blog-chip" data-topic="${escape(topic)}">📖 ${blogs.length} blog${blogs.length > 1 ? "s" : ""} →</a>`
    : "";

  const star = abstract && abstract.starred ? `<span class="star" title="Editorial pick">★</span> ` : "";
  c.innerHTML = `
    <header class="topic-head">
      <h4>${star}${escape(topic)}</h4>
      <span class="chip count">${items.length}</span>
    </header>
    ${tldr}
    ${abstractBlock}
    <footer class="topic-cta">
      <span>See all ${items.length} in Browse →</span>
      ${blogChip}
    </footer>
  `;

  // Abstract toggle: prevents card click; flips local open-state.
  const toggle = c.querySelector(".topic-abstract-toggle");
  if (toggle) {
    toggle.addEventListener("click", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      if (_open.has(topic)) _open.delete(topic);
      else _open.add(topic);
      // Replace just this card in place to avoid re-rendering the whole grid.
      c.replaceWith(topicCard(topic, items, blogs));
    });
  }
  // Blog chip stops propagation so the card-body filter still works.
  const chip = c.querySelector(".topic-blog-chip");
  if (chip) {
    chip.addEventListener("click", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      document.dispatchEvent(new CustomEvent("papermap:filter-and-show", {
        detail: { view: "blogs", topic },
      }));
    });
  }
  // Card body click → Browse filtered. Ignore clicks on the expanded
  // abstract body so users can select / click links inside it.
  c.addEventListener("click", ev => {
    if (ev.target.closest(".topic-abstract-body")) return;
    document.dispatchEvent(new CustomEvent("papermap:filter-and-show", {
      detail: { view: "browse", topic },
    }));
  });
  return c;
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
