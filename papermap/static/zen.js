"use strict";

// Zen mode — hides sidebar + viewtabs + filterbar to maximise reading
// space. Persists per-browser in localStorage; Esc exits.

const KEY = "papermap:zen";

function apply(on) {
  document.body.classList.toggle("zen", on);
  const btn = document.getElementById("zen-toggle");
  if (btn) {
    btn.classList.toggle("on", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  }
}

function setZen(on) {
  apply(on);
  try { localStorage.setItem(KEY, on ? "1" : "0"); } catch (_) { /* ignore */ }
}

function init() {
  let initial = false;
  try { initial = localStorage.getItem(KEY) === "1"; } catch (_) { /* ignore */ }
  apply(initial);
  const btn = document.getElementById("zen-toggle");
  if (btn) btn.addEventListener("click", () => setZen(!document.body.classList.contains("zen")));
  document.addEventListener("keydown", ev => {
    if (ev.key === "Escape" && document.body.classList.contains("zen")) {
      setZen(false);
    }
  });
}

init();
