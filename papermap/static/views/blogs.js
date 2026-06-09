"use strict";

// Blogs view — two modes:
//   index   : grid of blog cards (one per post)
//   reader  : full rendered post, with a back link to the index
// Clicking a card flips to reader mode; the "← All blogs" link flips
// back. Both modes accept a topic filter (set by Topics-card chips via
// the papermap:filter-and-show CustomEvent).

import { getBlogs } from "../blogs-state.js";
import { isStarred, toggleStar, getActiveCorpus } from "../stars-state.js";
import { isArchived, toggleArchive, archivedCount } from "../archive-state.js";
import { getComments, commentCount, makeAsideEl, exportMarkdown, removeComment } from "../comments-state.js";
import { starButton, attachStarHandler } from "./browse.js";
import { layoutMarginComments } from "../margin-comments.js";
import { getLang } from "../lang.js";

// Pick the Chinese field when the language toggle is on and a translation
// exists; otherwise fall back to the English field.
function L(post, field) {
  if (getLang() === "zh") {
    const zh = post[field + "_zh"];
    if (zh) return zh;
  }
  return post[field];
}

let _topicFilter = null;
let _activeSlug = null;
let _starOnly = false;
let _archivedOnly = false;

export function setTopicFilter(topic) {
  _topicFilter = topic || null;
  _activeSlug = null;
}

export function setActiveSlug(slug) {
  _activeSlug = slug || null;
}

export function render(_state, _filters, el) {
  const blogs = getBlogs();
  const div = document.createElement("div");
  div.className = "view blogs";

  if (_activeSlug) {
    const post = blogs.find(b => b.slug === _activeSlug);
    if (post) {
      div.appendChild(renderReader(post));
      el.appendChild(div);
      return;
    }
    _activeSlug = null;
  }

  const corpus = getActiveCorpus();
  const isBlogStarred = b => isStarred(corpus, "blogs", b.slug, !!b.starred);
  const isBlogArchived = b => isArchived(corpus, b.slug);
  let visible = _topicFilter
    ? blogs.filter(b => (b.topics || []).includes(_topicFilter))
    : blogs;
  // Archive toggle is exclusive: off → hide archived (default), on → show
  // ONLY archived. Star filter stacks on top of either subset.
  visible = _archivedOnly
    ? visible.filter(isBlogArchived)
    : visible.filter(b => !isBlogArchived(b));
  if (_starOnly) visible = visible.filter(isBlogStarred);
  const starredCount = blogs.filter(isBlogStarred).length;
  const archCount = archivedCount(corpus);

  const header = document.createElement("header");
  const tags = [];
  if (_starOnly) tags.push("★ only");
  if (_archivedOnly) tags.push("archived only");
  const tagSuffix = tags.length ? ` · ${tags.join(" · ")}` : "";
  const headline = _topicFilter
    ? `${visible.length} blogs tagged <em>${escape(_topicFilter)}</em>${tagSuffix}`
    : `${visible.length} blogs${tagSuffix}`;
  const clearChip = _topicFilter
    ? ` <a href="#" class="blog-clear-filter">clear ×</a>`
    : "";
  const corpusTitle = (_state && _state.title) ? _state.title : "this corpus";
  header.innerHTML = `<h2>${headline}${clearChip}
    <small>long-form essays from ${escape(corpusTitle)}</small>
    <a href="#" class="star-filter ${_starOnly ? "on" : ""}">${_starOnly ? "★" : "☆"} starred (${starredCount})</a>
    <a href="#" class="archive-filter ${_archivedOnly ? "on" : ""}" title="${_archivedOnly ? "Showing only archived blogs — click to show live blogs again" : "Show only archived blogs"}">🗄 archived (${archCount})</a></h2>`;
  div.appendChild(header);
  header.querySelector(".star-filter").addEventListener("click", ev => {
    ev.preventDefault();
    _starOnly = !_starOnly;
    el.innerHTML = "";
    render(_state, _filters, el);
  });
  header.querySelector(".archive-filter").addEventListener("click", ev => {
    ev.preventDefault();
    _archivedOnly = !_archivedOnly;
    el.innerHTML = "";
    render(_state, _filters, el);
  });

  const clearLink = header.querySelector(".blog-clear-filter");
  if (clearLink) {
    clearLink.addEventListener("click", ev => {
      ev.preventDefault();
      _topicFilter = null;
      el.innerHTML = "";
      render(_state, _filters, el);
    });
  }

  const grid = document.createElement("div");
  grid.className = "card-grid blog-grid";
  if (!visible.length) {
    grid.innerHTML = `<p class="placeholder">No blogs yet${_topicFilter ? ` for <em>${escape(_topicFilter)}</em>` : ""}.</p>`;
  }
  for (const post of visible) {
    grid.appendChild(blogCard(post, el, _state, _filters));
  }
  div.appendChild(grid);
  el.appendChild(div);
}

function blogCard(post, el, state, filters) {
  const corpus = getActiveCorpus();
  const archived = isArchived(corpus, post.slug);
  const c = document.createElement("article");
  c.className = "card card-blog" + (archived ? " archived" : "");
  const topics = (post.topics || []).map(t =>
    `<span class="chip">${escape(t)}</span>`).join("");
  const date = post.date ? `<span class="meta">${escape(post.date)}</span>` : "";
  c.innerHTML = `
    <header class="blog-head">
      <h4>${starButton(corpus, "blogs", post.slug, !!post.starred)} ${escape(L(post, "title"))} ${archiveButton(post.slug, archived)}</h4>
      ${date}
    </header>
    <p class="blog-summary">${escape(L(post, "summary"))}</p>
    <footer class="blog-foot">${topics}</footer>
  `;
  attachStarHandler(c, corpus, "blogs", post.slug, !!post.starred, state, filters, el);
  attachArchiveHandler(c, corpus, post.slug);
  c.addEventListener("click", ev => {
    // Clicks on the archive button (or any in-card button) must not
    // open the reader.
    if (ev.target.closest(".archive-btn, .star-btn")) return;
    _activeSlug = post.slug;
    el.innerHTML = "";
    render(state, filters, el);
  });
  return c;
}

function archiveButton(slug, on) {
  const title = on
    ? "Archived — click to restore"
    : "Archive (hide from default view)";
  return `<button class="archive-btn ${on ? "on" : ""}" data-archive-slug="${escape(slug)}" title="${escape(title)}" aria-pressed="${on ? "true" : "false"}">🗄</button>`;
}

function attachArchiveHandler(root, corpus, slug) {
  const btn = root.querySelector(`.archive-btn[data-archive-slug="${cssEscape(slug)}"]`);
  if (!btn) return;
  btn.addEventListener("click", ev => {
    ev.preventDefault();
    ev.stopPropagation();
    toggleArchive(corpus, slug);
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  });
}

function cssEscape(s) {
  return String(s).replace(/(["\\])/g, "\\$1");
}

function renderReader(post) {
  const corpus = getActiveCorpus();
  const archived = isArchived(corpus, post.slug);
  const wrap = document.createElement("article");
  wrap.className = "blog-post" + (archived ? " archived" : "");
  wrap.setAttribute("data-slug", post.slug);
  const topics = (post.topics || []).map(t =>
    `<span class="chip">${escape(t)}</span>`).join(" ");
  const date = post.date ? `<span class="meta">${escape(post.date)}</span>` : "";
  const nComments = commentCount(corpus, post.slug);
  const exportLink = nComments
    ? ` <a href="#" class="blog-export-qa" title="Copy your ${nComments} comment(s) as &lt;aside class=&quot;qa&quot;&gt; markdown to commit into the source">⤓ Export Q&amp;A (${nComments})</a>`
    : "";
  wrap.innerHTML = `
    <div class="blog-grid">
      <p class="blog-back"><a href="#" class="blog-index-link">← All blogs</a> ${archiveButton(post.slug, archived)}${exportLink}</p>
      <h1>${escape(L(post, "title"))}</h1>
      <p class="blog-post-meta">${date} ${topics}</p>
      <div class="blog-body">${L(post, "body_html")}</div>
      <div class="blog-margin" aria-label="Comments"></div>
    </div>
  `;
  wrap.querySelector(".blog-index-link").addEventListener("click", ev => {
    ev.preventDefault();
    _activeSlug = null;
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  });
  attachArchiveHandler(wrap, corpus, post.slug);
  const exportEl = wrap.querySelector(".blog-export-qa");
  if (exportEl) {
    exportEl.addEventListener("click", ev => {
      ev.preventDefault();
      copyToClipboard(exportMarkdown(corpus, post.slug), exportEl);
    });
  }
  // Delegated delete: the × on a localStorage comment removes it and re-renders
  // (which re-injects the survivors and refreshes the export count). Bubbles up
  // even after the aside is moved into the margin column.
  wrap.addEventListener("click", ev => {
    const del = ev.target.closest(".qa-del");
    if (!del) return;
    ev.preventDefault();
    ev.stopPropagation();
    const id = parseInt((del.getAttribute("data-q") || "").replace("local-", ""), 10);
    if (!Number.isFinite(id)) return;
    removeComment(corpus, post.slug, id);
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  });
  // Re-inject this reader's localStorage comments into the body so they
  // render identically to source-baked asides. Done before the margin pass.
  injectStoredComments(wrap, corpus, post.slug);

  // Intercept intra-corpus blog links (rewritten server-side to
  // `papermap-blog:<slug>`) so they open inline; mark external mkdocs
  // links so users know they leave papermap.
  wrap.querySelectorAll(".blog-body a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("papermap-blog:")) {
      const slug = href.slice("papermap-blog:".length).split("#")[0];
      a.href = "#";
      a.classList.add("blog-internal-link");
      a.addEventListener("click", ev => {
        ev.preventDefault();
        _activeSlug = slug;
        document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
      });
    } else if (/^https?:/i.test(href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.classList.add("blog-external-link");
    }
  });
  // Margin-comments pass runs after the post lands in the DOM and the
  // browser has done a layout pass, so getBoundingClientRect is accurate.
  requestAnimationFrame(() => layoutMarginComments(wrap));
  return wrap;
}

// Drop each stored comment's <aside class="qa"> back into the body right
// after the paragraph it anchors to, matching by the rendered anchor text
// (sel.toString() vs. element.textContent — both whitespace-collapsed).
// Idempotent per render: skips an aside already present by its data-q.
function injectStoredComments(wrap, corpus, slug) {
  const list = getComments(corpus, slug);
  if (!list.length) return;
  const body = wrap.querySelector(".blog-body");
  if (!body) return;
  const blocks = [...body.querySelectorAll("p, li, blockquote, h1, h2, h3, h4, h5, h6")]
    .filter(el => !el.closest("aside"));
  const norm = s => String(s || "").replace(/\s+/g, " ").trim();
  const lastForPara = new Map();  // keep multiple comments on one para in order
  for (const entry of list) {
    if (body.querySelector(`aside.qa[data-q="local-${entry.id}"]`)) continue;
    const needle = norm(entry.anchor);
    if (!needle) continue;
    const para = blocks.find(el => norm(el.textContent).includes(needle));
    if (!para) continue;
    const after = lastForPara.get(para) || para;
    const aside = makeAsideEl(entry);
    after.insertAdjacentElement("afterend", aside);
    lastForPara.set(para, aside);
  }
}

function copyToClipboard(text, linkEl) {
  const flash = ok => {
    if (!linkEl) return;
    const orig = linkEl.textContent;
    linkEl.textContent = ok ? "✓ Copied — paste into the .md & commit" : "⤓ Export Q&A";
    setTimeout(() => { linkEl.textContent = orig; }, 2600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => flash(true))
      .catch(() => window.prompt("Copy the Q&A markdown:", text));
  } else {
    window.prompt("Copy the Q&A markdown:", text);
  }
}

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
