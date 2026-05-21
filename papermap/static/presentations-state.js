"use strict";

// Presentations (slide decks) are loaded once per corpus and cached for
// the Presentations tab. They reuse the blog payload shape (title, date,
// summary, body_html, …); the body is one or more <section class="slide">
// blocks the stage view steps through.

let _decks = [];

export async function loadPresentations(name) {
  try {
    const resp = await fetch(`/api/presentations/${encodeURIComponent(name)}`);
    if (!resp.ok) {
      _decks = [];
      return _decks;
    }
    _decks = await resp.json();
  } catch (_) {
    // Static-export mode has no /api/presentations route — an empty list
    // keeps the tab valid (it shows its own empty state) without erroring.
    _decks = [];
  }
  return _decks;
}

export function getPresentations() { return _decks; }
