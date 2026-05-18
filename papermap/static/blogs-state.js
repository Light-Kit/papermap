"use strict";

// Blogs are loaded once per corpus and cached for any view that needs
// them (Blogs tab + Topics-card "N blogs on this topic" chip).

let _blogs = [];

export async function loadBlogs(name) {
  try {
    const resp = await fetch(`/api/blogs/${encodeURIComponent(name)}`);
    if (!resp.ok) {
      _blogs = [];
      return _blogs;
    }
    _blogs = await resp.json();
  } catch (_) {
    // Static-export mode has no /api/blogs route — empty list keeps the
    // Blogs tab valid (it shows its own empty state) without erroring.
    _blogs = [];
  }
  return _blogs;
}

export function getBlogs() { return _blogs; }

export function updateBlogBody(slug, bodyHtml) {
  // Keep the in-memory cache in sync with an optimistic client-side edit
  // (e.g. a freshly-saved comment) so navigating away and back inside the
  // session doesn't show the pre-edit state.
  const b = _blogs.find(b => b.slug === slug);
  if (b) b.body_html = bodyHtml;
}

export function blogsByTopic() {
  const m = new Map();
  for (const b of _blogs) {
    for (const t of b.topics || []) {
      if (!m.has(t)) m.set(t, []);
      m.get(t).push(b);
    }
  }
  return m;
}
