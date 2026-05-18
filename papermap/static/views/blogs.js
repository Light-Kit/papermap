"use strict";

// Blogs view — two modes:
//   index   : grid of blog cards (one per post)
//   reader  : full rendered post, with a back link to the index
// Clicking a card flips to reader mode; the "← All blogs" link flips
// back. Both modes accept a topic filter (set by Topics-card chips via
// the papermap:filter-and-show CustomEvent).

import { getBlogs } from "../blogs-state.js";
import { isStarred, toggleStar, getActiveCorpus } from "../stars-state.js";
import { starButton, attachStarHandler } from "./browse.js";
import { layoutMarginComments } from "../margin-comments.js";

let _topicFilter = null;
let _activeSlug = null;
let _starOnly = false;

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
  let visible = _topicFilter
    ? blogs.filter(b => (b.topics || []).includes(_topicFilter))
    : blogs;
  if (_starOnly) visible = visible.filter(isBlogStarred);
  const starredCount = blogs.filter(isBlogStarred).length;

  const header = document.createElement("header");
  const headline = _topicFilter
    ? `${visible.length} blogs tagged <em>${escape(_topicFilter)}</em>`
    : `${visible.length} blogs${_starOnly ? " · ★ only" : ""}`;
  const clearChip = _topicFilter
    ? ` <a href="#" class="blog-clear-filter">clear ×</a>`
    : "";
  header.innerHTML = `<h2>${headline}${clearChip}
    <small>long-form essays from the FM-to-virtual-cells corpus</small>
    <a href="#" class="star-filter ${_starOnly ? "on" : ""}">${_starOnly ? "★" : "☆"} starred (${starredCount})</a></h2>`;
  div.appendChild(header);
  header.querySelector(".star-filter").addEventListener("click", ev => {
    ev.preventDefault();
    _starOnly = !_starOnly;
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
  const c = document.createElement("article");
  c.className = "card card-blog";
  const topics = (post.topics || []).map(t =>
    `<span class="chip">${escape(t)}</span>`).join("");
  const date = post.date ? `<span class="meta">${escape(post.date)}</span>` : "";
  c.innerHTML = `
    <header class="blog-head">
      <h4>${starButton(corpus, "blogs", post.slug, !!post.starred)} ${escape(post.title)}</h4>
      ${date}
    </header>
    <p class="blog-summary">${escape(post.summary)}</p>
    <footer class="blog-foot">${topics}</footer>
  `;
  attachStarHandler(c, corpus, "blogs", post.slug, !!post.starred, state, filters, el);
  c.addEventListener("click", () => {
    _activeSlug = post.slug;
    el.innerHTML = "";
    render(state, filters, el);
  });
  return c;
}

function renderReader(post) {
  const wrap = document.createElement("article");
  wrap.className = "blog-post";
  wrap.setAttribute("data-slug", post.slug);
  const topics = (post.topics || []).map(t =>
    `<span class="chip">${escape(t)}</span>`).join(" ");
  const date = post.date ? `<span class="meta">${escape(post.date)}</span>` : "";
  wrap.innerHTML = `
    <div class="blog-grid">
      <p class="blog-back"><a href="#" class="blog-index-link">← All blogs</a></p>
      <h1>${escape(post.title)}</h1>
      <p class="blog-post-meta">${date} ${topics}</p>
      <div class="blog-body">${post.body_html}</div>
      <div class="blog-margin" aria-label="Comments"></div>
    </div>
  `;
  wrap.querySelector(".blog-index-link").addEventListener("click", ev => {
    ev.preventDefault();
    _activeSlug = null;
    document.dispatchEvent(new CustomEvent("papermap:rerender-active-view"));
  });

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

function escape(s) {
  return String(s ?? "").replace(/[<>&"]/g,
    c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
}
