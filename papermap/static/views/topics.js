"use strict";

// Topics view — one card per topic, auto-derived TL;DR from the topic's
// top items' `why:` lines. Click a card to jump into Browse pre-filtered
// to that topic (filter mutation + view switch are handled by app.js's
// `papermap:filter-and-show` listener so this view stays UI-only).

import { blogsByTopic } from "../blogs-state.js";

export function render(state, _filters, el) {
  const div = document.createElement("div");
  div.className = "view topics";

  const byTopic = groupByTopic(state.items);
  const sorted = [...byTopic.entries()].sort((a, b) =>
    b[1].length - a[1].length || a[0].localeCompare(b[0]));

  const header = document.createElement("header");
  header.innerHTML = `<h2>${byTopic.size} topics across ${state.items.length} items
    <small>auto-derived TL;DRs from each topic's most recent items</small></h2>`;
  div.appendChild(header);

  const blogs = blogsByTopic();
  const grid = document.createElement("div");
  grid.className = "card-grid topic-grid";
  for (const [topic, items] of sorted) {
    grid.appendChild(topicCard(topic, items, blogs.get(topic) || []));
  }
  if (!sorted.length) {
    grid.innerHTML = `<p class="placeholder">No items carry a topic.</p>`;
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
  // Prefer items with a `why:`; within those, most recent first, then label.
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

  const blogChip = blogs.length
    ? `<a href="#" class="topic-blog-chip" data-topic="${escape(topic)}">📖 ${blogs.length} blog${blogs.length > 1 ? "s" : ""} →</a>`
    : "";

  c.innerHTML = `
    <header class="topic-head">
      <h4>${escape(topic)}</h4>
      <span class="chip count">${items.length}</span>
    </header>
    ${tldr}
    <footer class="topic-cta">
      <span>See all ${items.length} in Browse →</span>
      ${blogChip}
    </footer>
  `;

  // The blog chip dispatches its own event and stops propagation so the
  // card's Browse handler doesn't also fire.
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

  c.addEventListener("click", () => {
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
