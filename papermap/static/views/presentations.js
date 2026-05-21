"use strict";

// Presentations view — two modes:
//   index : grid of deck cards (one per .md deck)
//   stage : the chosen deck rendered slide-by-slide, with a presenter
//           notes rail. Step with ← / → (or Space), F = fullscreen the
//           slide, "← All presentations" returns to the index.
// Decks reuse the blog payload; each slide is a <section class="slide"
// data-notes="…"> block in the deck body (split client-side here).

import { getPresentations } from "../presentations-state.js";
import { getLang } from "../lang.js";

function L(post, field) {
  if (getLang() === "zh") {
    const zh = post[field + "_zh"];
    if (zh) return zh;
  }
  return post[field];
}

let _activeSlug = null;
let _idx = 0;
let _keyHandler = null;

export function setActiveSlug(slug) { _activeSlug = slug || null; _idx = 0; }

export function render(_state, _filters, el) {
  const decks = getPresentations();
  detachKeys();                       // leaving any prior stage
  const div = document.createElement("div");
  div.className = "view presentations";

  if (_activeSlug) {
    const deck = decks.find(d => d.slug === _activeSlug);
    if (deck) {
      div.appendChild(renderStage(deck, el, _state, _filters));
      el.appendChild(div);
      return;
    }
    _activeSlug = null;
  }

  const header = document.createElement("header");
  header.innerHTML = `<h2>${decks.length} presentation${decks.length === 1 ? "" : "s"}
    <small>slide decks from the FM-to-virtual-cells corpus — open one and use ← / →</small></h2>`;
  div.appendChild(header);

  const grid = document.createElement("div");
  grid.className = "card-grid blog-grid";
  if (!decks.length) {
    grid.innerHTML = `<p class="placeholder">No presentations yet.</p>`;
  }
  for (const deck of decks) grid.appendChild(deckCard(deck, el, _state, _filters));
  div.appendChild(grid);
  el.appendChild(div);
}

function deckCard(deck, el, state, filters) {
  const c = document.createElement("article");
  c.className = "card card-blog card-deck";
  const date = deck.date ? `<span class="meta">${escape(deck.date)}</span>` : "";
  const n = parseSlides(L(deck, "body_html") || "").length;
  c.innerHTML = `
    <header class="blog-head"><h4>▶ ${escape(L(deck, "title"))}</h4>${date}</header>
    <p class="blog-summary">${escape(L(deck, "summary"))}</p>
    <footer class="blog-foot"><span class="chip">${n} slide${n === 1 ? "" : "s"}</span></footer>
  `;
  c.addEventListener("click", () => {
    _activeSlug = deck.slug; _idx = 0;
    el.innerHTML = "";
    render(state, filters, el);
  });
  return c;
}

// Split a rendered deck body into slides by top-level <section class="slide">.
// Falls back to the whole body as a single slide.
function parseSlides(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  const secs = [...tmp.querySelectorAll("section.slide")];
  if (secs.length) {
    return secs.map(s => ({ html: s.innerHTML, notes: s.getAttribute("data-notes") || "" }));
  }
  return [{ html: html || "", notes: "" }];
}

function renderStage(deck, el, state, filters) {
  const slides = parseSlides(L(deck, "body_html") || "");
  _idx = Math.max(0, Math.min(_idx, slides.length - 1));

  const wrap = document.createElement("div");
  wrap.className = "deck-stage";
  wrap.innerHTML = `
    <div class="deck-bar">
      <a href="#" class="deck-back">← All presentations</a>
      <span class="deck-title">${escape(L(deck, "title"))}</span>
      <span class="deck-nav">
        <button class="deck-prev" title="Previous (←)" aria-label="Previous slide">‹</button>
        <span class="deck-count"></span>
        <button class="deck-next" title="Next (→)" aria-label="Next slide">›</button>
        <button class="deck-full" title="Fullscreen the slide (F)" aria-label="Fullscreen">⛶</button>
      </span>
    </div>
    <div class="deck-screen"><div class="deck-slide"></div></div>
    <div class="deck-notes"><h4>Presenter notes</h4><p class="deck-notes-body"></p></div>
  `;
  const screen = wrap.querySelector(".deck-slide");
  const notesBody = wrap.querySelector(".deck-notes-body");
  const count = wrap.querySelector(".deck-count");

  function show() {
    _idx = Math.max(0, Math.min(_idx, slides.length - 1));
    screen.innerHTML = slides[_idx].html;
    notesBody.textContent = slides[_idx].notes || "—";
    count.textContent = `${_idx + 1} / ${slides.length}`;
    wrap.querySelector(".deck-prev").disabled = _idx === 0;
    wrap.querySelector(".deck-next").disabled = _idx === slides.length - 1;
  }
  const fs = () => { const s = wrap.querySelector(".deck-screen"); if (s.requestFullscreen) s.requestFullscreen(); };

  wrap.querySelector(".deck-prev").addEventListener("click", () => { _idx--; show(); });
  wrap.querySelector(".deck-next").addEventListener("click", () => { _idx++; show(); });
  wrap.querySelector(".deck-full").addEventListener("click", fs);
  wrap.querySelector(".deck-back").addEventListener("click", ev => {
    ev.preventDefault();
    _activeSlug = null;
    detachKeys();
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  });

  detachKeys();
  _keyHandler = ev => {
    // Self-detach if the stage left the DOM (tab switch / back) so arrow
    // keys don't keep flipping slides off-screen.
    if (!document.body.contains(wrap)) { detachKeys(); return; }
    if (ev.key === "ArrowLeft") { _idx--; show(); }
    else if (ev.key === "ArrowRight" || ev.key === " ") { ev.preventDefault(); _idx++; show(); }
    else if (ev.key === "f" || ev.key === "F") { fs(); }
  };
  document.addEventListener("keydown", _keyHandler);

  show();
  return wrap;
}

function detachKeys() {
  if (_keyHandler) { document.removeEventListener("keydown", _keyHandler); _keyHandler = null; }
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));
}
