"use strict";

// Language toggle — flips the reading language between English ("en")
// and Simplified Chinese ("zh"). Persists per-browser in localStorage.
// Blogs carry their Chinese translation inline (title_zh/summary_zh/
// body_html_zh from the loader); blogs.js reads getLang() to pick which
// text to render. Toggling re-renders the active view.

const KEY = "papermap:lang";

let _lang = "en";
try { _lang = localStorage.getItem(KEY) === "zh" ? "zh" : "en"; } catch (_) { /* ignore */ }

export function getLang() { return _lang; }

function apply() {
  document.body.classList.toggle("lang-zh", _lang === "zh");
  const btn = document.getElementById("lang-toggle");
  if (btn) {
    // Button shows the language you'd switch TO.
    btn.textContent = _lang === "zh" ? "EN" : "中";
    btn.classList.toggle("on", _lang === "zh");
    btn.title = _lang === "zh" ? "Switch to English" : "切换为中文";
  }
}

function setLang(lang) {
  _lang = lang === "zh" ? "zh" : "en";
  try { localStorage.setItem(KEY, _lang); } catch (_) { /* ignore */ }
  apply();
  document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
}

function init() {
  apply();
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.addEventListener("click", () => setLang(_lang === "zh" ? "en" : "zh"));
}

init();
