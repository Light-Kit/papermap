"use strict";

// Cohort-flowchart Progress view — renders the per-cohort plain-text DAG
// blocks emitted by `progress/per_cohort_flow_<date>.txt` (one ASCII block
// per (cohort × modality) with the `axes:` line at top, the DAG body, the
// inline `◄ NOW` markers at active/stuck nodes, and a `NEXT BRANCH` line.
//
// Companion TSV mirror `per_cohort_state_<date>.tsv` provides typed rows
// for the filter sidebar (tumor type, bucket, NOW-state, next-branch
// keyword). The view re-fetches whenever a new dated file lands — no UI
// rebuild required.
//
// Pattern matches progress.js: ES module, Plotly-free (we render <pre>),
// applyFilter for sidebar wiring. Files live at /static/progress/.

import { applyFilter } from "../filters.js";

// Date selector — extend this array when a new dated pair lands.
const AVAILABLE_DATES = ["2026-06-09"];
const DEFAULT_DATE = AVAILABLE_DATES[AVAILABLE_DATES.length - 1];

// Block separator the producer scripts use (60 ═ chars).
const BLOCK_SEP = "═".repeat(70);

// Glyph legend rendered in the sidebar header.
const GLYPH_LEGEND = [
  ["[+]", "done / present"],
  ["[~]", "partial / proxy"],
  ["[ ]", "not started / absent"],
  ["[?]", "pending (agent / DL in flight)"],
  ["[!]", "blocked (reason inline)"],
  ["[.]", "n/a to this row"],
];

// ───────────────────────────────────────────────────────────── data fetch ──

async function fetchPair(date) {
  const base = `/static/progress/per_cohort_flow_${date}`;
  const stateUrl = `/static/progress/per_cohort_state_${date}.tsv`;
  const flowUrl  = `${base}.txt`;

  const [stateText, flowText] = await Promise.all([
    fetch(stateUrl).then((r) => {
      if (!r.ok) throw new Error(`state.tsv ${r.status}: ${stateUrl}`);
      return r.text();
    }),
    fetch(flowUrl).then((r) => {
      if (!r.ok) throw new Error(`flow.txt ${r.status}: ${flowUrl}`);
      return r.text();
    }),
  ]);

  return { state: parseTsv(stateText), blocks: splitFlowBlocks(flowText) };
}

function parseTsv(text) {
  const lines = text.split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split("\t");
  return lines.slice(1).map((line) => {
    const cells = line.split("\t");
    const row = {};
    header.forEach((h, i) => { row[h] = cells[i] ?? ""; });
    return row;
  });
}

function splitFlowBlocks(text) {
  // The producer separates blocks with BLOCK_SEP. First/last token may be
  // blank — drop blanks. Each retained block is the full ASCII chunk
  // (axes + DAG + NOW + NEXT BRANCH).
  return text.split(BLOCK_SEP).map((b) => b.trim()).filter((b) => b.length > 0);
}

// Match a block to its cohort_id by scanning the second line (the producer
// puts cohort_id at the start of the title row after the leading separator).
function indexBlocksByCohort(blocks) {
  const out = new Map();
  for (const block of blocks) {
    const firstLine = block.split("\n").find((l) => l.trim().length > 0);
    if (!firstLine) continue;
    // Title line shape: "  <cohort_id>          <CANCER>   n=<N> pt   bucket <X>"
    const m = firstLine.match(/^\s*([a-z0-9_-]+)\s+/);
    if (m) {
      const cid = m[1];
      // Multi-row cohorts (Luo has WGS + scRNA) — keep array of blocks.
      if (!out.has(cid)) out.set(cid, []);
      out.get(cid).push(block);
    }
  }
  return out;
}

// ──────────────────────────────────────────────────────────── filter side ──

function deriveFilterOptions(rows) {
  const tumors = new Set();
  const buckets = new Set();
  const nowKeywords = new Set();
  for (const r of rows) {
    if (r.cancer) tumors.add(r.cancer);
    if (r.bucket) buckets.add(r.bucket);
    if (r.now_position) {
      // Pull a token from the NOW phrase (first 3 words).
      const tok = r.now_position.split(/\s+/).slice(0, 3).join(" ");
      if (tok) nowKeywords.add(tok);
    }
  }
  return {
    tumors: [...tumors].sort(),
    buckets: [...buckets].sort(),
    nowKeywords: [...nowKeywords].sort(),
  };
}

function rowMatches(row, filters) {
  if (filters.tumor && row.cancer !== filters.tumor) return false;
  if (filters.bucket && row.bucket !== filters.bucket) return false;
  if (filters.search) {
    const hay = `${row.cohort_id} ${row.now_position} ${row.next_branch}`.toLowerCase();
    if (!hay.includes(filters.search.toLowerCase())) return false;
  }
  return true;
}

// ───────────────────────────────────────────────────────────────── render ──

function renderLegend(container) {
  const dl = document.createElement("dl");
  dl.className = "flowchart-legend";
  for (const [glyph, meaning] of GLYPH_LEGEND) {
    const dt = document.createElement("dt"); dt.textContent = glyph;
    const dd = document.createElement("dd"); dd.textContent = meaning;
    dl.appendChild(dt); dl.appendChild(dd);
  }
  container.appendChild(dl);
}

function renderSidebar(container, options, filters, onChange) {
  container.innerHTML = "";
  const heading = document.createElement("h3"); heading.textContent = "Filter";
  container.appendChild(heading);

  // Tumor-type dropdown.
  const tumorSelect = makeSelect("Tumor type", ["", ...options.tumors], filters.tumor);
  tumorSelect.addEventListener("change", () => { filters.tumor = tumorSelect.value; onChange(); });
  container.appendChild(tumorSelect);

  // Bucket dropdown.
  const bucketSelect = makeSelect("Bucket", ["", ...options.buckets], filters.bucket);
  bucketSelect.addEventListener("change", () => { filters.bucket = bucketSelect.value; onChange(); });
  container.appendChild(bucketSelect);

  // Free-text search.
  const searchLabel = document.createElement("label"); searchLabel.textContent = "Search";
  const searchInput = document.createElement("input");
  searchInput.type = "search"; searchInput.value = filters.search ?? "";
  searchInput.placeholder = "cohort id / NOW phrase / next-branch keyword";
  searchInput.addEventListener("input", () => { filters.search = searchInput.value; onChange(); });
  searchLabel.appendChild(searchInput);
  container.appendChild(searchLabel);

  // Glyph legend at the bottom.
  renderLegend(container);
}

function makeSelect(labelText, values, current) {
  const label = document.createElement("label"); label.textContent = labelText;
  const sel = document.createElement("select");
  for (const v of values) {
    const opt = document.createElement("option");
    opt.value = v; opt.textContent = v || "(all)";
    if (v === current) opt.selected = true;
    sel.appendChild(opt);
  }
  label.appendChild(sel);
  return label;
}

function renderBody(container, rows, blocksByCohort, filters, asOfDate) {
  container.innerHTML = "";

  const stamp = document.createElement("div");
  stamp.className = "flowchart-asof";
  stamp.textContent = `as of ${asOfDate} (CT)`;
  container.appendChild(stamp);

  const matching = rows.filter((r) => rowMatches(r, filters));
  const countLine = document.createElement("p");
  countLine.className = "flowchart-count";
  countLine.textContent = `${matching.length} of ${rows.length} cohorts shown`;
  container.appendChild(countLine);

  for (const r of matching) {
    const blocks = blocksByCohort.get(r.cohort_id) ?? [];
    if (blocks.length === 0) continue;
    for (const block of blocks) {
      const pre = document.createElement("pre");
      pre.className = "flowchart-block";
      pre.textContent = block;
      container.appendChild(pre);
    }
  }

  if (matching.length === 0) {
    const empty = document.createElement("p");
    empty.className = "flowchart-empty";
    empty.textContent = "No cohorts match the current filters.";
    container.appendChild(empty);
  }
}

// ───────────────────────────────────────────────────────── public render ──

// Contract matches the other views: app.js calls `views[name].render(state,
// filters, el)`. This view manages its own internal data fetch + filter
// state, so it ignores the first two args (note the leading underscores —
// the local `filters` object below would otherwise collide) and only uses
// the mount element (third arg).
export async function render(_state, _filters, root) {
  const date = DEFAULT_DATE;

  // Layout: sidebar (left, 280px) | body (right, scrollable).
  root.innerHTML = "";
  root.className = "flowchart-root";

  const sidebar = document.createElement("aside"); sidebar.className = "flowchart-sidebar";
  const body    = document.createElement("section"); body.className = "flowchart-body";
  root.appendChild(sidebar);
  root.appendChild(body);

  let data;
  try {
    data = await fetchPair(date);
  } catch (err) {
    body.textContent = `Failed to load progress flowchart: ${err.message}`;
    return;
  }

  const blocksByCohort = indexBlocksByCohort(data.blocks);
  const options = deriveFilterOptions(data.state);
  const filters = { tumor: "", bucket: "", search: "" };

  const rerender = () => {
    renderSidebar(sidebar, options, filters, rerender);
    renderBody(body, data.state, blocksByCohort, filters, date);
  };
  rerender();
}
