"use strict";

// In-browser Q/A comment widget.
//
// User selects text inside an open blog post → a floating "💬 comment"
// button appears near the cursor → click opens a small inline popup
// with a textarea → submit POSTs to /api/comments/<corpus>/<slug>,
// which writes a <aside class="qa"> block into the markdown source on
// the server. We then re-fetch /api/blogs/<corpus> and re-render the
// active view so the new yellow callout shows immediately.
//
// Persistence note: writes hit the server's filesystem, which is
// ephemeral on Fly without a volume. A comment added in-browser will
// survive page reloads on the same machine but is wiped by the next
// deploy. To persist permanently, the comment lives in the markdown
// source — the user can pull the diff or commit it via the normal git
// flow.

import { loadBlogs, getBlogs, updateBlogBody } from "./blogs-state.js";
import { getActiveCorpus } from "./stars-state.js";
import { refreshMarginComments } from "./margin-comments.js";

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

async function submit() {
  if (!_pending) return;
  const input = _popup.querySelector(".qa-popup-input");
  const status = _popup.querySelector(".qa-popup-status");
  const question = input.value.trim();
  if (!question) { status.textContent = "Question is empty."; return; }
  const corpus = getActiveCorpus();
  if (!corpus) { status.textContent = "No active corpus."; return; }
  status.textContent = "Saving…";
  try {
    const resp = await fetch(
      `/api/comments/${encodeURIComponent(corpus)}/${encodeURIComponent(_pending.slug)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anchor: _pending.anchor, question }),
      },
    );
    if (!resp.ok) {
      const msg = await resp.text();
      status.textContent = `Save failed (${resp.status}): ${msg.slice(0, 120)}`;
      return;
    }
    const data = await resp.json().catch(() => ({}));
    const qId = data.q_id;
    // Capture everything we need off _pending before closePopup nulls it.
    const slug = _pending.slug;
    const anchorPara = _pending.anchorPara;
    const anchorText = _pending.anchor;
    closePopup();
    // Optimistic insert: drop the aside into the live DOM next to the
    // anchor paragraph and re-run the margin layout. No refetch, no
    // rerender, so scroll position + iframes + selection are preserved
    // and the user can keep commenting.
    if (qId && anchorPara && anchorPara.isConnected) {
      const aside = document.createElement("aside");
      aside.className = "qa";
      aside.setAttribute("data-q", String(qId));
      // Mirror the server's snippet rule (anchor[:120]) so the rendered
      // <b>Q on "…":</b> matches what disk would render on next reload.
      const snippet = escapeHtml(anchorText.slice(0, 120));
      aside.innerHTML = `<b>Q on "${snippet}":</b> ${escapeHtml(question)}`;
      anchorPara.insertAdjacentElement("afterend", aside);
      // Sync the in-memory cache so navigating away and back shows the
      // new aside without a refetch round-trip.
      const body = document.querySelector(`.blog-post[data-slug="${cssEsc(slug)}"] .blog-body`);
      if (body) updateBlogBody(slug, body.innerHTML);
      refreshMarginComments();
    } else {
      // Fall back to the old full-rerender path if we lost the anchor
      // (rare — covers cases where the anchor paragraph was detached
      // mid-flight, e.g. by a navigation).
      await loadBlogs(corpus);
      document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
    }
  } catch (err) {
    status.textContent = `Save failed: ${err.message || err}`;
  }
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}

function cssEsc(s) {
  return (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/"/g, '\\"');
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
