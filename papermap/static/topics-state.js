"use strict";

// Per-topic abstracts (markdown blobs served as rendered HTML). One
// fetch per corpus load; views read from the in-memory cache.

let _byTopic = new Map();

export async function loadTopicAbstracts(name) {
  try {
    const resp = await fetch(`/api/topics/${encodeURIComponent(name)}`);
    _byTopic = new Map();
    if (!resp.ok) return _byTopic;
    const list = await resp.json();
    for (const post of list) {
      // Slugs look like `topic-<name>` (lowercased by the sync script);
      // index by both the raw key and the lowercased one so the Topics
      // view can resolve uppercase topic names (e.g. "RL") too.
      const key = post.slug.replace(/^topic-/, "");
      _byTopic.set(key, post);
      _byTopic.set(key.toLowerCase(), post);
    }
  } catch (_) {
    _byTopic = new Map();
  }
  return _byTopic;
}

export function getTopicAbstract(topic) {
  return _byTopic.get(topic) || _byTopic.get(String(topic).toLowerCase()) || null;
}
