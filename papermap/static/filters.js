"use strict";

export function applyFilter(items, filters) {
  let out = items;
  if (filters.kinds && filters.kinds.size) {
    out = out.filter(it => filters.kinds.has(it.kind));
  }
  if (filters.topics && filters.topics.size) {
    out = out.filter(it => (it.topics || []).some(t => filters.topics.has(t)));
  }
  if (filters.statuses && filters.statuses.size) {
    out = out.filter(it => filters.statuses.has(it.status));
  }
  if (filters.org_types && filters.org_types.size) {
    out = out.filter(it => filters.org_types.has(it.org_type));
  }
  if (filters.regions && filters.regions.size) {
    out = out.filter(it => filters.regions.has(it.region));
  }
  if (filters.modalities && filters.modalities.size) {
    out = out.filter(it => filters.modalities.has(it.modality));
  }
  if (filters.q && filters.q.trim()) {
    const q = filters.q.trim().toLowerCase();
    out = out.filter(it => [it.label, it.title, it.why, it.meta]
      .some(s => (s || "").toLowerCase().includes(q)));
  }
  return out;
}
