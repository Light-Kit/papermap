"use strict";

// User-editable stars layered on top of editorial (YAML-baked) stars.
// LocalStorage shape (per browser, per corpus):
//
//   {
//     "<corpus_name>": {
//       items:  { added: [id, ...], removed: [id, ...] },
//       topics: { added: [name, ...], removed: [name, ...] },
//       blogs:  { added: [slug, ...], removed: [slug, ...] },
//     }
//   }
//
// "added" is the set of things the user starred that weren't editorial;
// "removed" is the set of editorial stars the user toggled off. Both
// are stored as sorted JSON arrays so the storage payload diffs cleanly
// between writes. Effective state = editorial XOR override.

const KEY = "papermap:stars:v1";
const KINDS = ["items", "topics", "blogs"];

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

function _slot(corpus, kind) {
  const all = _read();
  const corp = all[corpus] || {};
  const slot = corp[kind] || {};
  return {
    added: new Set(slot.added || []),
    removed: new Set(slot.removed || []),
  };
}

function _save(corpus, kind, slot) {
  const all = _read();
  if (!all[corpus]) all[corpus] = {};
  all[corpus][kind] = {
    added: [...slot.added].sort(),
    removed: [...slot.removed].sort(),
  };
  // Trim empty containers so storage doesn't grow with each toggle.
  if (!all[corpus][kind].added.length && !all[corpus][kind].removed.length) {
    delete all[corpus][kind];
  }
  if (KINDS.every(k => !all[corpus][k])) delete all[corpus];
  _write(all);
}

export function isStarred(corpus, kind, id, editorialStarred) {
  const slot = _slot(corpus, kind);
  if (editorialStarred) return !slot.removed.has(id);
  return slot.added.has(id);
}

export function toggleStar(corpus, kind, id, editorialStarred) {
  const slot = _slot(corpus, kind);
  const wasOn = editorialStarred
    ? !slot.removed.has(id)
    : slot.added.has(id);
  if (wasOn) {
    if (editorialStarred) slot.removed.add(id);
    else slot.added.delete(id);
  } else {
    if (editorialStarred) slot.removed.delete(id);
    else slot.added.add(id);
  }
  _save(corpus, kind, slot);
  return !wasOn;  // new state
}

export function userStateOf(corpus, kind, id, editorialStarred) {
  const slot = _slot(corpus, kind);
  if (editorialStarred && slot.removed.has(id)) return "removed";
  if (!editorialStarred && slot.added.has(id)) return "added";
  return editorialStarred ? "editorial" : "none";
}

export function getActiveCorpus() { return _activeCorpus; }
export function setActiveCorpus(name) { _activeCorpus = name || ""; }
let _activeCorpus = "";
