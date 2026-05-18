"use strict";

// Word-style margin comments. Each <aside class="qa"> / <aside class="qa-reply">
// that the server inserted inline after a paragraph is:
//   1. wrapped: the anchored sentence inside the paragraph gets a
//      <mark class="qa-anchor" data-q="N"> so the reader can see which
//      sentence the comment is about even when the body is hidden.
//   2. moved: into the .blog-margin column, absolute-positioned at the
//      anchor paragraph's top, with overlap stacking.
//
// View modes:
//   - wide          : margin visible, asides positioned next to anchor
//   - narrow (<900) : margin hidden, asides reflow inline under anchor
//   - zen           : asides hidden, anchor underline strengthens — like
//                     Word's "No Markup" review view
//
// On window resize / zen toggle we re-run the layout pass.

const NARROW_BREAKPOINT = 900;
const STACK_GAP = 10;
const _registry = new WeakMap(); // wrap → { pairs, highlighted }

export function layoutMarginComments(wrap) {
  if (!wrap || !wrap.querySelector) return;
  const grid = wrap.querySelector(".blog-grid");
  const body = wrap.querySelector(".blog-body");
  const margin = wrap.querySelector(".blog-margin");
  if (!grid || !body || !margin) return;

  let entry = _registry.get(wrap);
  if (!entry) {
    // First pass: take a snapshot of (aside, anchor-paragraph) BEFORE moving,
    // because once moved the aside's previousElementSibling is gone.
    const pairs = [];
    body.querySelectorAll("aside.qa, aside.qa-reply").forEach(a => {
      const anchor = a.previousElementSibling;
      if (anchor) pairs.push({ aside: a, anchor });
    });
    entry = { pairs, highlighted: false };
    _registry.set(wrap, entry);
    // Listen once per wrap; the wrap is removed when the user navigates away,
    // so the listener leaks per visited post — cheap, but clean it up anyway
    // by checking isConnected on each pass.
    if (!window.__margin_resize_bound) {
      window.__margin_resize_bound = true;
      let raf = 0;
      window.addEventListener("resize", () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          document.querySelectorAll(".blog-post").forEach(layoutMarginComments);
        });
      });
    }
    if (!document.__margin_zen_bound) {
      document.__margin_zen_bound = true;
      // body.zen toggling is observable via class change; MutationObserver is
      // simpler than coupling into zen.js.
      const obs = new MutationObserver(() => {
        document.querySelectorAll(".blog-post").forEach(layoutMarginComments);
      });
      obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }
  }

  if (!wrap.isConnected) {
    _registry.delete(wrap);
    return;
  }

  // Wrap each anchor sentence with <mark class="qa-anchor"> exactly once so
  // the reader knows where comments attach even when the body is hidden.
  if (!entry.highlighted) {
    for (const { aside, anchor } of entry.pairs) highlightAnchor(aside, anchor);
    entry.highlighted = true;
  }

  const zen = document.body.classList.contains("zen");
  const narrow = window.innerWidth < NARROW_BREAKPOINT;
  const hasComments = entry.pairs.length > 0;

  grid.classList.toggle("has-margin-comments", hasComments && !narrow);

  if (zen) {
    // Word "No Markup" view: keep asides in their last container; CSS
    // hides them. Clear any prior absolute positions so toggling back
    // doesn't leave stale top values.
    for (const { aside } of entry.pairs) {
      aside.style.top = "";
      aside.style.position = "";
    }
    return;
  }

  if (narrow) {
    // Reflow asides inline under the anchor so they remain visible on mobile.
    for (const { aside, anchor } of entry.pairs) {
      if (aside.parentElement !== body && anchor.parentElement === body) {
        anchor.insertAdjacentElement("afterend", aside);
      }
      aside.style.top = "";
      aside.style.position = "";
    }
    return;
  }

  // Wide layout: move every aside into the margin column.
  for (const { aside } of entry.pairs) {
    if (aside.parentElement !== margin) margin.appendChild(aside);
  }
  // Two-pass: layout y-positions after asides are at margin width.
  // Read offsetTop relative to the grid (a shared positioned ancestor) so
  // anchor y and margin y are in the same coordinate space.
  const gridRect = grid.getBoundingClientRect();
  let prevBottom = -Infinity;
  for (const { aside, anchor } of entry.pairs) {
    if (!anchor.isConnected) continue;
    const anchorTop = anchor.getBoundingClientRect().top - gridRect.top;
    const top = Math.max(anchorTop, prevBottom + STACK_GAP);
    aside.style.position = "absolute";
    aside.style.top = `${top}px`;
    prevBottom = top + aside.offsetHeight;
  }
}

function highlightAnchor(aside, paragraph) {
  // Extract the snippet that the server quoted inside <b>Q on "...":</b>.
  // For replies, skip — the anchor mark is already on the parent question.
  if (aside.classList.contains("qa-reply")) return;
  const qid = aside.getAttribute("data-q") || "";
  if (qid && paragraph.querySelector(`mark.qa-anchor[data-q="${cssEsc(qid)}"]`)) return;
  const bold = aside.querySelector("b");
  if (!bold) return;
  const m = bold.textContent.match(/^Q on\s+"([^"]+?)["…]/);
  if (!m) return;
  let snippet = m[1].trim();
  if (snippet.endsWith("…")) snippet = snippet.slice(0, -1).trim();
  if (snippet.length < 6) return;

  // Walk text nodes inside the paragraph, recording the running offset of
  // each so we can map a substring index back to (node, offset).
  const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let full = "";
  let cur;
  while ((cur = walker.nextNode())) {
    // Skip text inside nested asides (shouldn't happen but defensive).
    if (cur.parentElement && cur.parentElement.closest("aside")) continue;
    nodes.push({ node: cur, start: full.length });
    full += cur.nodeValue;
  }
  const idx = full.indexOf(snippet);
  if (idx < 0) return;
  const endIdx = idx + snippet.length;
  const startNode = nodeAt(nodes, idx);
  const endNode = nodeAt(nodes, endIdx - 1);
  if (!startNode || !endNode) return;

  const range = document.createRange();
  range.setStart(startNode.node, idx - startNode.start);
  range.setEnd(endNode.node, endIdx - endNode.start);

  const mark = document.createElement("mark");
  mark.className = "qa-anchor";
  if (qid) mark.setAttribute("data-q", qid);
  try {
    range.surroundContents(mark);
  } catch (_) {
    // The range crosses element boundaries (e.g. <strong> inside the
    // anchor) so surroundContents throws. Fall back to extract + insert.
    const frag = range.extractContents();
    mark.appendChild(frag);
    range.insertNode(mark);
  }
}

function nodeAt(nodes, pos) {
  for (const n of nodes) {
    if (pos >= n.start && pos < n.start + n.node.nodeValue.length) return n;
  }
  return null;
}

function cssEsc(s) {
  return (window.CSS && CSS.escape) ? CSS.escape(s) : s.replace(/"/g, '\\"');
}

// Public hook so comments.js can request a re-layout after a new comment is
// saved (the blog body is re-rendered from server HTML, so the registry's
// snapshot becomes stale — that's handled by the fresh renderReader pass).
export function refreshMarginComments() {
  document.querySelectorAll(".blog-post").forEach(p => {
    _registry.delete(p);
    layoutMarginComments(p);
  });
}
