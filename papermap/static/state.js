"use strict";

// One in-memory state per corpus. Views read; never write.
let _state = null;

export async function loadState(name) {
  // Static-export fallback: a sibling state.json wins if present.
  try {
    const local = await fetch("./state.json", { method: "GET" });
    if (local.ok) {
      _state = await local.json();
      return _state;
    }
  } catch (_) { /* ignore — fall through */ }

  const resp = await fetch(`/api/state/${encodeURIComponent(name)}`);
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || `${resp.status} ${resp.statusText}`);
  }
  _state = await resp.json();
  return _state;
}

export function getState() { return _state; }
