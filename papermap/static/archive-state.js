"use strict";

// User-driven archive layer for blogs. Unlike stars-state.js there is no
// editorial side — archiving is purely an in-browser preference, so the
// storage is just a sorted set of slugs per corpus.
//
// LocalStorage shape (per browser, per corpus):
//
//   {
//     "<corpus_name>": { blogs: [slug, ...] }
//   }

const KEY = "papermap:archive:v1";

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

function _set(corpus) {
  const all = _read();
  const corp = all[corpus] || {};
  return new Set(corp.blogs || []);
}

function _save(corpus, set) {
  const all = _read();
  if (!all[corpus]) all[corpus] = {};
  if (set.size) {
    all[corpus].blogs = [...set].sort();
  } else {
    delete all[corpus].blogs;
    if (!Object.keys(all[corpus]).length) delete all[corpus];
  }
  _write(all);
}

export function isArchived(corpus, slug) {
  return _set(corpus).has(slug);
}

export function toggleArchive(corpus, slug) {
  const set = _set(corpus);
  const wasOn = set.has(slug);
  if (wasOn) set.delete(slug);
  else set.add(slug);
  _save(corpus, set);
  return !wasOn;  // new state
}

export function archivedCount(corpus) {
  return _set(corpus).size;
}
