"use strict";

// In-browser Q/A comment widget.
//
// User selects text inside an open blog post → a floating "💬 comment"
// button appears near the cursor → click opens a small inline popup
// with a textarea → submit saves the comment to localStorage and drops
// the <aside class="qa"> callout into the live DOM next to the anchor.
//
// Persistence note: comments live in the browser (localStorage, via
// comments-state.js), so they survive page reloads AND deploys — the
// old version POSTed to the server's ephemeral filesystem, which every
// Fly deploy silently wiped. To persist a comment permanently / share
// it, use "Export Q&A" in the reader to copy the <aside> markup and
// commit it into the .md source via the normal git flow.

import { getActiveCorpus } from "./stars-state.js";
import { refreshMarginComments } from "./margin-comments.js";
import { addComment, makeAsideEl } from "./comments-state.js";

const MIN_LEN = 8;
const MAX_PREVIEW = 90;

let _btn = null;
let _popup = null;
let _pending = null;  // {anchor, slug}

function ensureChrome() {
  if (_btn) return;
  _btn = document.createElement("button");
  _btn.id = "qa-trigger";
  _btn.type = "button";
  _btn.textContent = "💬 Comment";
  _btn.hidden = true;
  _btn.addEventListener("mousedown", ev => ev.preventDefault());  // keep selection
  _btn.addEventListener("click", openPopup);
  document.body.appendChild(_btn);

  _popup = document.createElement("div");
  _popup.id = "qa-popup";
  _popup.hidden = true;
  _popup.innerHTML = `
    <div class="qa-popup-anchor"></div>
    <textarea class="qa-popup-input" rows="4" maxlength="800"
      placeholder="Your question. Claude will reply in ~70 words on the next pass."></textarea>
    <div class="qa-popup-row">
      <button type="button" class="qa-popup-cancel">Cancel</button>
      <button type="button" class="qa-popup-save">Save</button>
    </div>
    <div class="qa-popup-status"></div>
  `;
  document.body.appendChild(_popup);
  _popup.querySelector(".qa-popup-cancel").addEventListener("click", closePopup);
  _popup.querySelector(".qa-popup-save").addEventListener("click", submit);
  _popup.addEventListener("mousedown", ev => ev.stopPropagation());
}

function findActiveSlug() {
  // The blogs view writes the active post's body into .blog-post .blog-body.
  // We attach data-slug to .blog-post in blogs.js (see patch in blogs.js).
  const post = document.querySelector(".blog-post[data-slug]");
  return post ? post.getAttribute("data-slug") : null;
}

function onSelection() {
  if (!_btn) return;
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return hideButton();
  const text = sel.toString().trim();
  if (text.length < MIN_LEN) return hideButton();
  // Selection must live entirely inside an open blog body.
  const range = sel.getRangeAt(0);
  const body = document.querySelector(".blog-post .blog-body");
  if (!body || !body.contains(range.commonAncestorContainer)) return hideButton();
  // Don't trigger on selections inside an existing qa/qa-reply block.
  if (range.commonAncestorContainer.parentElement &&
      range.commonAncestorContainer.parentElement.closest("aside.qa, aside.qa-reply")) {
    return hideButton();
  }
  const slug = findActiveSlug();
  if (!slug) return hideButton();
  // Capture the anchor paragraph now so we can insert the aside next to
  // it on save without re-rendering the whole post.
  const startEl = range.startContainer.nodeType === 3
    ? range.startContainer.parentElement
    : range.startContainer;
  const anchorPara = startEl?.closest("p, li, blockquote, h1, h2, h3, h4, h5, h6");
  _pending = { anchor: text, slug, anchorPara };
  const rect = range.getBoundingClientRect();
  _btn.style.top = `${window.scrollY + rect.bottom + 6}px`;
  _btn.style.left = `${window.scrollX + Math.max(8, rect.left)}px`;
  _btn.hidden = false;
}

function hideButton() {
  if (_btn) _btn.hidden = true;
}

function openPopup() {
  if (!_pending) return;
  const preview = _pending.anchor.length > MAX_PREVIEW
    ? _pending.anchor.slice(0, MAX_PREVIEW) + "…"
    : _pending.anchor;
  _popup.querySelector(".qa-popup-anchor").textContent = `Q on "${preview}"`;
  _popup.querySelector(".qa-popup-input").value = "";
  _popup.querySelector(".qa-popup-status").textContent = "";
  // Position popup below the trigger.
  const btnRect = _btn.getBoundingClientRect();
  _popup.style.top = `${window.scrollY + btnRect.bottom + 6}px`;
  _popup.style.left = `${window.scrollX + btnRect.left}px`;
  _popup.hidden = false;
  hideButton();
  _popup.querySelector(".qa-popup-input").focus();
}

function closePopup() {
  if (_popup) _popup.hidden = true;
  _pending = null;
}

function submit() {
  if (!_pending) return;
  const input = _popup.querySelector(".qa-popup-input");
  const status = _popup.querySelector(".qa-popup-status");
  const question = input.value.trim();
  if (!question) { status.textContent = "Question is empty."; return; }
  const corpus = getActiveCorpus();
  if (!corpus) { status.textContent = "No active corpus."; return; }
  // Capture everything we need off _pending before closePopup nulls it.
  const slug = _pending.slug;
  const anchorPara = _pending.anchorPara;
  const anchorText = _pending.anchor;
  // Persist to localStorage (durable across deploys, unlike the old POST).
  const entry = addComment(corpus, slug, anchorText, question);
  // Snapshot scrollTop of every scrollable ancestor BEFORE mutating —
  // defensive guard against any code path that resets scroll. The fresh
  // .blog-post is wrapped by .view.blogs, which has its own overflow, so
  // window.scrollY alone misses it.
  const scrollSnaps = [];
  for (let el = anchorPara; el; el = el.parentElement) {
    if (el.scrollHeight > el.clientHeight + 1) {
      scrollSnaps.push({ el, top: el.scrollTop });
    }
  }
  closePopup();
  // Optimistic insert: drop the aside into the live DOM next to the anchor
  // paragraph and re-run the margin layout. No rerender, so scroll position
  // + iframes + selection are preserved and the user can keep commenting.
  // (On the next reader render, blogs.js re-injects from localStorage, so
  // this transient DOM node and the persisted entry stay in sync.)
  if (anchorPara && anchorPara.isConnected) {
    anchorPara.insertAdjacentElement("afterend", makeAsideEl(entry));
    refreshMarginComments();
  } else {
    // Lost the anchor (rare — e.g. detached mid-flight by a navigation).
    // A full rerender re-injects every stored comment from localStorage.
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  }
  restoreScroll(scrollSnaps);
  requestAnimationFrame(() => restoreScroll(scrollSnaps));
}

function restoreScroll(snaps) {
  for (const { el, top } of snaps) {
    if (el.isConnected && el.scrollTop !== top) el.scrollTop = top;
  }
}

function init() {
  ensureChrome();
  document.addEventListener("selectionchange", onSelection);
  // Hide trigger if user clicks elsewhere.
  document.addEventListener("mousedown", ev => {
    if (_btn && !_btn.hidden && ev.target !== _btn) hideButton();
    if (_popup && !_popup.hidden && !_popup.contains(ev.target)) closePopup();
  });
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape") { hideButton(); closePopup(); }
  });
}

init();
