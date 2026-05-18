"use strict";

// Word-style margin comments. Each <aside class="qa"> / <aside class="qa-reply">
// that the server inserted inline after a paragraph gets moved into the
// .blog-margin column, vertically aligned to the top of that paragraph,
// with overlapping asides pushed down so they stack cleanly.
//
// We bail out (leave asides inline) when:
//   - the viewport is too narrow for a margin column
//   - zen mode is active (CSS hides the column; we still skip JS work)
//
// On window resize / zen toggle we re-run the layout pass.

const NARROW_BREAKPOINT = 900;
const STACK_GAP = 10;
const _registry = new WeakMap(); // wrap → { pairs: [{aside, anchor}], scheduled }

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
    entry = { pairs, scheduled: false, narrow: null };
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

  const narrow = window.innerWidth < NARROW_BREAKPOINT
    || document.body.classList.contains("zen");

  // Toggle the grid class so CSS reserves margin width only when we're going
  // to use it. Also flips asides between inline (in body) and floating (in margin).
  grid.classList.toggle("has-margin-comments", !narrow && entry.pairs.length > 0);

  if (narrow) {
    // Move asides back inline (right after their anchor paragraph) so the
    // reader still sees comments when the margin is hidden.
    for (const { aside, anchor } of entry.pairs) {
      if (!aside.isConnected || aside.parentElement !== body) {
        if (anchor.parentElement === body) {
          anchor.insertAdjacentElement("afterend", aside);
        }
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

// Public hook so comments.js can request a re-layout after a new comment is
// saved (the blog body is re-rendered from server HTML, so the registry's
// snapshot becomes stale — that's handled by the fresh renderReader pass).
export function refreshMarginComments() {
  document.querySelectorAll(".blog-post").forEach(p => {
    _registry.delete(p);
    layoutMarginComments(p);
  });
}
