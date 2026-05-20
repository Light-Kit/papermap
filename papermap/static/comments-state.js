"use strict";

// Per-browser Q/A comments for blogs. Durable across deploys because they
// live in localStorage — unlike the old widget, which POSTed to the server
// and wrote into the markdown on Fly's *ephemeral* filesystem, so every
// deploy silently wiped them. Comments are now per-reader/per-browser; the
// ones worth keeping are committed to git via the "Export Q&A" action, which
// emits the same <aside class="qa"> markup the source files already use.
//
// LocalStorage shape (per browser):
//
//   {
//     "<corpus_name>": {
//       "<slug>": [ { id, anchor, question, ts }, ... ]
//     }
//   }

const KEY = "papermap:comments:v1";

function _read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch (_) {
    return {};
  }
}

function _write(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch (_) { /* quota / private mode — silently drop */ }
}

export function getComments(corpus, slug) {
  const all = _read();
  return ((all[corpus] || {})[slug] || []).slice();
}

export function commentCount(corpus, slug) {
  return getComments(corpus, slug).length;
}

export function addComment(corpus, slug, anchor, question) {
  const all = _read();
  if (!all[corpus]) all[corpus] = {};
  const list = all[corpus][slug] || (all[corpus][slug] = []);
  const id = list.reduce((m, c) => Math.max(m, c.id || 0), 0) + 1;
  const entry = { id, anchor, question, ts: Date.now() };
  list.push(entry);
  _write(all);
  return entry;
}

export function removeComment(corpus, slug, id) {
  const all = _read();
  const list = (all[corpus] || {})[slug];
  if (!list) return;
  const i = list.findIndex(c => c.id === id);
  if (i < 0) return;
  list.splice(i, 1);
  if (!list.length) delete all[corpus][slug];
  if (all[corpus] && !Object.keys(all[corpus]).length) delete all[corpus];
  _write(all);
}

// Mirror the server's old snippet rule (anchor[:120]) and escaping so the
// rendered DOM, the optimistic insert, and the export all match byte-for-byte
// what a committed source aside renders to.
function escapeAttr(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;")
    .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeText(s) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function asideHtml(entry) {
  const snippet = escapeAttr(String(entry.anchor).slice(0, 120));
  // The delete button lives only in the rendered DOM, not in exportMarkdown()
  // (which builds its own clean string), so committed source asides stay tidy.
  return `<aside class="qa" data-q="local-${entry.id}"><b>Q on `
    + `"${snippet}":</b> ${escapeText(entry.question)}`
    + `<button type="button" class="qa-del" data-q="local-${entry.id}" `
    + `title="Delete this comment" aria-label="Delete comment">×</button></aside>`;
}

export function makeAsideEl(entry) {
  const tmp = document.createElement("div");
  tmp.innerHTML = asideHtml(entry);
  return tmp.firstElementChild;
}

// Commit-ready markdown: the <aside> blocks without the data-q="local-N"
// attribute (source asides are unnumbered; the loader/JS assign ids). Each is
// preceded by a blank line so it sits as its own block in the .md source.
export function exportMarkdown(corpus, slug) {
  return getComments(corpus, slug).map(e => {
    const snippet = escapeAttr(String(e.anchor).slice(0, 120));
    return `<aside class="qa"><b>Q on "${snippet}":</b> ${escapeText(e.question)}</aside>`;
  }).join("\n\n");
}
