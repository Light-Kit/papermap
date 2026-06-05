"use strict";

// Cohort-coverage Progress view — two stacked Plotly heatmaps sharing a
// y-axis (cohort_id, busiest bucket first) and x-axis (modality token).
// Top pane = "what we expect to have" (planned per the manifest);
// bottom pane = "what we actually have on disk" (per-cohort MANIFEST +
// status.tsv). Cell encoding for the bottom pane is categorical:
// 0 = missing, 1 = blocked, 2 = partial, 3 = downloaded. Top pane is
// binary (0/1) rendered with the same blue gradient timeline.js uses.
//
// Data is baked in below as a COHORTS constant so the view stays
// self-contained — no fetch, no infra change. Future iteration can swap
// this for a sibling JSON.

import { applyFilter } from "../filters.js";

// Modality columns in display order. Drop unused columns at render time.
const MODALITIES = [
  "WGS", "WES", "panel", "bulk-RNA",
  "scRNA", "snRNA", "SmartSeq2",
  "Visium", "VisiumHD", "Xenium", "ST",
  "MERFISH", "CosMx",
  "IMC", "CODEX", "MIBI", "t-CyCIF", "mIF",
  "DVP-proteomics", "scTCR", "clinical",
];

// State integer codes for the bottom pane.
const ST_MISSING = 0;
const ST_BLOCKED = 1;
const ST_PARTIAL = 2;
const ST_DOWNLOADED = 3;

// Cohort matrix. `planned` lists modalities promised by the manifest;
// `actual` maps modality -> state integer (downloaded/partial/blocked).
// Empty actual {} means nothing on disk (state == 0 everywhere).
const COHORTS = [
  // --- bucket A: sc/snRNA + paired genomics ---
  { id: "luo-2024-nant-ovarian", bucket: "A", cancer: "HGSOC", n: 30,
    planned: ["WGS", "scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "scTCR": ST_DOWNLOADED, "WGS": ST_BLOCKED },
    accession: "GEO GSE222556" },
  { id: "vazquez-garcia-2022-mskspectrum", bucket: "A", cancer: "HGSOC", n: 42,
    planned: ["WGS", "scRNA"], actual: {}, accession: "Synapse syn25569736" },
  { id: "olbrecht-2021-hgsoc", bucket: "A", cancer: "HGSOC", n: 7,
    planned: ["scRNA"], actual: { "scRNA": ST_DOWNLOADED },
    accession: "ArrayExpress E-MTAB-8107" },
  { id: "pal-2021-brca1-breast", bucket: "A", cancer: "breast-BRCA1", n: 21,
    planned: ["WGS", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED }, accession: "GEO GSE161529" },
  { id: "bassez-2021-biokey", bucket: "A", cancer: "breast-IO", n: 40,
    planned: ["WES", "panel", "scRNA", "scTCR"], actual: {},
    accession: "EGA EGAS00001004809" },
  { id: "yost-2019-bcc", bucket: "A", cancer: "BCC-IO", n: 14,
    planned: ["scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "scTCR": ST_DOWNLOADED },
    accession: "GEO GSE123813" },
  { id: "caushi-2021-nsclc", bucket: "A", cancer: "NSCLC-IO", n: 16,
    planned: ["WES", "panel", "scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "scTCR": ST_DOWNLOADED },
    accession: "GEO GSE176021" },
  { id: "luoma-2022-hnscc", bucket: "A", cancer: "HNSCC-IO", n: 29,
    planned: ["panel", "scRNA"], actual: { "scRNA": ST_DOWNLOADED },
    accession: "GEO GSE200996" },
  { id: "sade-feldman-2018-mel", bucket: "A", cancer: "melanoma-IO", n: 48,
    planned: ["WES", "SmartSeq2"], actual: { "SmartSeq2": ST_DOWNLOADED },
    accession: "GEO GSE120575" },
  { id: "bi-2021-ccrcc", bucket: "A", cancer: "ccRCC-IO", n: 8,
    planned: ["WES", "scRNA"], actual: {},
    accession: "SCP1288 + dbGaP phs002252" },
  { id: "liu-2022-nsclc", bucket: "A", cancer: "NSCLC-IO", n: 35,
    planned: ["WES", "scRNA"], actual: {}, accession: "EGA EGAS00001005003" },
  { id: "magen-2023-hcc", bucket: "A", cancer: "HCC-IO", n: 33,
    planned: ["WES", "scRNA", "scTCR"], actual: {},
    accession: "not located" },
  { id: "wang-2025-sclc-parpi", bucket: "A", cancer: "SCLC-PARPi", n: null,
    planned: ["panel", "scRNA"], actual: {}, accession: "unverified" },
  { id: "pelka-2021-crc", bucket: "A", cancer: "CRC-MMR", n: 62,
    planned: ["WES", "scRNA", "MERFISH"],
    actual: { "scRNA": ST_DOWNLOADED }, accession: "GEO GSE178341" },
  { id: "lee-2020-crc-korea", bucket: "A", cancer: "CRC", n: 29,
    planned: ["WES", "bulk-RNA", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED }, accession: "GEO GSE132465" },
  { id: "maynard-2020-nsclc-longitudinal", bucket: "A", cancer: "NSCLC-TKI", n: 30,
    planned: ["WES", "panel", "scRNA"], actual: {},
    accession: "EGA unverified" },
  { id: "neftel-2019-gbm", bucket: "A", cancer: "GBM", n: 28,
    planned: ["WES", "scRNA", "SmartSeq2"],
    actual: { "scRNA": ST_DOWNLOADED, "SmartSeq2": ST_DOWNLOADED },
    accession: "SCP393 + GEO GSE131928" },
  { id: "karaayvaz-2018-tnbc", bucket: "A", cancer: "TNBC", n: 6,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_PARTIAL, "WES": ST_PARTIAL },
    accession: "GEO GSE118390" },
  { id: "puram-2017-hnscc", bucket: "A", cancer: "HNSCC", n: 18,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_DOWNLOADED }, accession: "GEO GSE103322" },
  { id: "kim-2020-nsclc-mets", bucket: "A", cancer: "NSCLC-mets", n: 44,
    planned: ["WES", "scRNA"], actual: {}, accession: "EGA EGAS00001004001" },
  { id: "tirosh-2016-melanoma", bucket: "A", cancer: "mel", n: 19,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_DOWNLOADED }, accession: "GEO GSE72056" },
  { id: "jerby-arnon-2018-mel", bucket: "A", cancer: "mel-IO", n: 33,
    planned: ["WES", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED }, accession: "GEO GSE115978" },
  { id: "stewart-2020-sclc-cdx", bucket: "A", cancer: "SCLC", n: 12,
    planned: ["WGS", "WES", "scRNA"], actual: {},
    accession: "EGA EGAS00001004025" },
  { id: "wang-2021-gastric-peritoneal", bucket: "A", cancer: "gastric", n: 6,
    planned: ["scRNA"], actual: { "scRNA": ST_DOWNLOADED },
    accession: "GEO GSE163558" },
  { id: "zhang-2022-gastric-tcell", bucket: "A", cancer: "gastric", n: 29,
    planned: ["WES", "scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED }, accession: "GEO GSE183904" },
  { id: "couturier-2020-gbm", bucket: "A", cancer: "GBM", n: 14,
    planned: ["WES", "scRNA"], actual: {}, accession: "EGA EGAS00001004422" },
  { id: "lambrechts-2018-nsclc", bucket: "A", cancer: "NSCLC", n: 5,
    planned: ["WES", "scRNA"], actual: { "scRNA": ST_DOWNLOADED },
    accession: "ArrayExpress E-MTAB-6149" },
  { id: "goveia-2020-nsclc-ec", bucket: "A", cancer: "NSCLC-EC", n: 8,
    planned: ["WES", "scRNA"], actual: { "scRNA": ST_DOWNLOADED },
    accession: "ArrayExpress E-MTAB-8221" },
  { id: "sun-2021-hcc-early-relapse", bucket: "A", cancer: "HCC", n: 18,
    planned: ["WES", "scRNA", "scTCR"], actual: {},
    accession: "not located" },
  { id: "kim-2018-tnbc-chemoresist", bucket: "A", cancer: "TNBC", n: 20,
    planned: ["WES", "scRNA", "SmartSeq2"],
    actual: { "WES": ST_PARTIAL, "SmartSeq2": ST_PARTIAL },
    accession: "SRA SRP114962" },
  { id: "hwang-lin-2022-pdac-chemo", bucket: "A", cancer: "PDAC", n: 43,
    planned: ["WES", "snRNA", "DVP-proteomics"],
    actual: { "snRNA": ST_DOWNLOADED }, accession: "GEO GSE199102" },
  { id: "htan-hta3-bu-lung-precancer", bucket: "A", cancer: "lung-precancer", n: 484,
    planned: ["WES", "scRNA", "mIF"],
    actual: { "WES": ST_BLOCKED, "scRNA": ST_BLOCKED, "mIF": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA3" },
  { id: "su-2025-hcc-snrna", bucket: "A", cancer: "HCC", n: 12,
    planned: ["WES", "snRNA"], actual: { "snRNA": ST_DOWNLOADED },
    accession: "GEO GSE282701" },

  // --- bucket B: spatial transcriptomics + paired genomics ---
  { id: "stur-2022-hgsoc-visium", bucket: "B", cancer: "HGSOC", n: 12,
    planned: ["Visium"], actual: { "Visium": ST_DOWNLOADED },
    accession: "GEO GSE189843" },
  { id: "erickson-2022-prostate-visium", bucket: "B", cancer: "prostate", n: 11,
    planned: ["WGS", "Visium"], actual: {},
    accession: "EGA EGAS00001006124" },
  { id: "khaliq-sun-2024-pdac", bucket: "B", cancer: "PDAC", n: 30,
    planned: ["Visium"], actual: { "Visium": ST_DOWNLOADED },
    accession: "GEO GSE272362" },
  { id: "pei-min-2025-pdac-autopsy", bucket: "B", cancer: "PDAC", n: 13,
    planned: ["WGS", "WES", "Visium"], actual: {}, accession: "unverified" },
  { id: "wu-2025-hgsoc-visium-hd", bucket: "B", cancer: "HGSOC", n: 30,
    planned: ["WES", "VisiumHD"], actual: {}, accession: "unverified" },
  { id: "ji-2020-cscc-st", bucket: "B", cancer: "cSCC", n: 10,
    planned: ["WES", "ST"], actual: { "ST": ST_DOWNLOADED },
    accession: "GEO GSE144239" },
  { id: "xenium-5k-demo-10x", bucket: "B", cancer: "5-tumor-demo", n: null,
    planned: ["WGS", "Xenium", "VisiumHD"],
    actual: { "Xenium": ST_DOWNLOADED, "VisiumHD": ST_DOWNLOADED },
    accession: "10x portal" },
  { id: "cervilla-2025-st-platforms-comparison", bucket: "B", cancer: "6-cancer-benchmark", n: null,
    planned: ["Visium", "VisiumHD", "Xenium"],
    actual: { "Visium": ST_DOWNLOADED, "VisiumHD": ST_DOWNLOADED, "Xenium": ST_DOWNLOADED },
    accession: "Zenodo 18000256+17999961" },

  // --- bucket C: spatial proteomics + paired genomics ---
  { id: "launonen-2022-farkkila-mif-hgsoc", bucket: "C", cancer: "HGSOC-HRD", n: 44,
    planned: ["WGS", "panel", "t-CyCIF", "mIF"],
    actual: { "t-CyCIF": ST_BLOCKED, "mIF": ST_BLOCKED, "WGS": ST_BLOCKED },
    accession: "Synapse syn26230540" },
  { id: "farkkila-2020-topacio", bucket: "C", cancer: "HGSOC-TNBC-endo", n: 62,
    planned: ["WGS", "t-CyCIF"],
    actual: { "t-CyCIF": ST_BLOCKED, "WGS": ST_BLOCKED },
    accession: "Synapse syn22177117" },
  { id: "mitri-2024-amtec-parpi-mtnbc", bucket: "C", cancer: "mTNBC-PARPi", n: 12,
    planned: ["WES", "t-CyCIF"], actual: {},
    accession: "dbGaP phs002371.v1.p1" },
  { id: "risom-2022-dcis-mibi", bucket: "C", cancer: "breast-DCIS", n: 122,
    planned: ["panel", "bulk-RNA", "MIBI"],
    actual: { "MIBI": ST_DOWNLOADED }, accession: "Mendeley d87vg86zd8" },
  { id: "jackson-2020-breast-imc", bucket: "C", cancer: "breast", n: 281,
    planned: ["WES", "IMC"],
    actual: { "IMC": ST_DOWNLOADED }, accession: "Zenodo 4607374" },
  { id: "tietscher-2023-breast-imc", bucket: "C", cancer: "breast-HER2-TNBC", n: 14,
    planned: ["IMC"],
    actual: { "IMC": ST_BLOCKED },
    accession: "superseded (see bodenmiller row)" },
  { id: "tietscher-2023-breast-imc-bodenmiller", bucket: "C", cancer: "breast-HER2-TNBC", n: 14,
    planned: ["IMC", "scRNA"],
    actual: { "IMC": ST_DOWNLOADED, "scRNA": ST_DOWNLOADED },
    accession: "Zenodo 4911135 + AE E-MTAB-10607" },
  { id: "ali-danenberg-2020-metabric-imc", bucket: "C", cancer: "breast-METABRIC", n: 693,
    planned: ["WES", "panel", "IMC"],
    actual: { "IMC": ST_DOWNLOADED, "WES": ST_PARTIAL },
    accession: "Zenodo 6036188" },
  { id: "magness-enfield-2024-tracerx-imc", bucket: "C", cancer: "NSCLC-TRACERx", n: 81,
    planned: ["WES", "bulk-RNA", "IMC"],
    actual: { "IMC": ST_BLOCKED }, accession: "Zenodo 12587543" },
  { id: "makhmut-coscia-2025-stic-dvp", bucket: "C", cancer: "HGSOC-STIC", n: 25,
    planned: ["panel", "DVP-proteomics"], actual: {},
    accession: "PRIDE" },

  // --- bucket D: multi-spatial / full-tuple ---
  { id: "htan-hta1-htapp", bucket: "D", cancer: "mBC+NBL+LUAD+GBM", n: 205,
    planned: ["WES", "panel", "scRNA", "snRNA", "Visium", "MERFISH", "CODEX", "MIBI"],
    actual: {}, accession: "Synapse syn20446927 HTA1" },
  { id: "htan-hta4-chop-pediatric", bucket: "D", cancer: "pediatric", n: 69,
    planned: ["WGS", "WES", "scRNA", "CODEX"], actual: {},
    accession: "Synapse syn20446927 HTA4" },
  { id: "htan-hta5-dfci-resistance", bucket: "D", cancer: "NSCLC-breast-mel", n: 156,
    planned: ["WES", "t-CyCIF", "scRNA"], actual: {},
    accession: "Synapse syn20446927 HTA5" },
  { id: "htan-hta6-duke-stanford-dcis", bucket: "D", cancer: "breast-DCIS", n: 828,
    planned: ["WGS", "MIBI", "scRNA", "bulk-RNA"], actual: {},
    accession: "Synapse syn20446927 HTA6" },
  { id: "htan-hta7-hms-patch-sorger", bucket: "D", cancer: "mel+heme", n: 245,
    planned: ["panel", "bulk-RNA", "t-CyCIF"], actual: {},
    accession: "Synapse syn20446927 HTA7" },
  { id: "htan-hta8-msk-metastasis", bucket: "D", cancer: "metastasis", n: 202,
    planned: ["panel", "WGS", "scRNA", "MIBI"], actual: {},
    accession: "Synapse syn20446927 HTA8" },
  { id: "htan-hta9-ohsu-smmart-mbc", bucket: "D", cancer: "mBC", n: 33,
    planned: ["WGS", "scRNA", "t-CyCIF"], actual: {},
    accession: "Synapse syn20446927 HTA9" },
  { id: "htan-hta10-stanford-fap", bucket: "D", cancer: "FAP-CRC", n: 40,
    planned: ["WGS", "scRNA", "Xenium", "CODEX"], actual: {},
    accession: "Synapse syn20446927 HTA10" },
  { id: "htan-hta11-vanderbilt-crc", bucket: "D", cancer: "CRC", n: 195,
    planned: ["WES", "WGS", "scRNA", "Visium"], actual: {},
    accession: "Synapse syn20446927 HTA11" },
  { id: "htan-hta12-wustl-pancancer", bucket: "D", cancer: "pan-cancer", n: 295,
    planned: ["WGS", "WES", "scRNA", "snRNA", "Visium", "CODEX", "IMC", "Xenium"],
    actual: {}, accession: "Synapse syn20446927 HTA12" },
  { id: "mskspectrum-cfdna-parpi-2025", bucket: "D", cancer: "HGSOC-PARPi", n: 24,
    planned: ["WGS", "scRNA"], actual: {}, accession: "dbGaP phs002857" },
  { id: "hms-sorger-ovarian-renamed", bucket: "D", cancer: "HGSOC", n: 25,
    planned: ["WGS", "t-CyCIF"], actual: {}, accession: "Synapse Sorger" },
  { id: "owkin-mosaic-window-bladder", bucket: "D", cancer: "bladder-MIBC", n: 15,
    planned: ["WES", "bulk-RNA", "Visium", "snRNA"], actual: {},
    accession: "EGA EGAD50000001251" },
  { id: "htapp-klughammer-2024-mbc", bucket: "D", cancer: "mBC", n: 30,
    planned: ["WES", "snRNA", "CODEX", "MERFISH"],
    actual: { "snRNA": ST_BLOCKED, "CODEX": ST_BLOCKED },
    accession: "dbGaP phs002371 + SCP2702" },
  { id: "htan-hta8-sclc-chan-2021", bucket: "D", cancer: "SCLC", n: 21,
    planned: ["panel", "WGS", "scRNA", "MIBI"], actual: {},
    accession: "dbGaP phs002371" },
  { id: "hwang-2022-pdac-neoadj", bucket: "D", cancer: "PDAC", n: 43,
    planned: ["WES", "snRNA", "DVP-proteomics"],
    actual: { "snRNA": ST_DOWNLOADED }, accession: "GEO GSE202051" },
  { id: "hwang-2025-pdac-neural", bucket: "D", cancer: "PDAC", n: 25,
    planned: ["panel", "Visium", "snRNA"], actual: {}, accession: "unverified" },
  { id: "sun-2024-hcc-primary-met", bucket: "D", cancer: "HCC", n: 182,
    planned: ["WES", "bulk-RNA", "Visium", "scRNA"], actual: {},
    accession: "not located" },
  { id: "liu-2024-pediatric-hgg-filbin", bucket: "D", cancer: "pHGG", n: 16,
    planned: ["WGS", "snRNA", "CODEX"],
    actual: { "snRNA": ST_DOWNLOADED }, accession: "GEO GSE231860" },
  { id: "ravi-2022-gbm-multiomics", bucket: "D", cancer: "GBM", n: 28,
    planned: ["WES", "Visium", "IMC", "scRNA"],
    actual: { "Visium": ST_DOWNLOADED, "scRNA": ST_DOWNLOADED },
    accession: "GEO GSE194329" },
  { id: "greenwald-2024-gbm-suva-tirosh", bucket: "D", cancer: "GBM", n: 100,
    planned: ["WES", "Visium", "MIBI", "scRNA"],
    actual: { "Visium": ST_DOWNLOADED, "scRNA": ST_DOWNLOADED, "MIBI": ST_DOWNLOADED },
    accession: "GEO GSE237183 + Zenodo 8105466" },
  { id: "denisenko-2024-hgsoc-visium-cosmx", bucket: "D", cancer: "HGSOC", n: 10,
    planned: ["WES", "Visium", "CosMx", "scRNA"],
    actual: { "Visium": ST_DOWNLOADED, "CosMx": ST_DOWNLOADED, "scRNA": ST_DOWNLOADED },
    accession: "EGA EGAS00001006816 + Zenodo 10048057" },
  { id: "krishna-2021-adapter-ccrcc-io", bucket: "D", cancer: "ccRCC-IO", n: 6,
    planned: ["WES", "scRNA", "scTCR", "mIF"], actual: {},
    accession: "EGA EGAS00001005188" },
  { id: "wu-2021-breast-visium", bucket: "D", cancer: "breast", n: 26,
    planned: ["WES", "scRNA", "Visium"],
    actual: { "scRNA": ST_DOWNLOADED, "Visium": ST_DOWNLOADED },
    accession: "GEO GSE176078" },
];

// Discrete colorscale for the bottom pane: 0 grey, 1 red, 2 amber, 3 green.
// Plotly heatmap interprets colorscale by normalised z; with zmin=0 zmax=3
// the band edges are 0, 1/3, 2/3, 1.
const ACTUAL_COLORSCALE = [
  [0.000, "#e9ecef"], [0.166, "#e9ecef"],
  [0.167, "#c0392b"], [0.499, "#c0392b"],
  [0.500, "#e0a13a"], [0.832, "#e0a13a"],
  [0.833, "#2c8c4a"], [1.000, "#2c8c4a"],
];

// Blue gradient for the top pane (matches timeline.js palette).
const PLANNED_COLORSCALE = [
  [0, "#f3f6fb"], [0.5, "#a8c5e7"], [1.0, "#1a4480"],
];

const STATE_LABEL = {
  0: "missing", 1: "blocked", 2: "partial", 3: "downloaded",
};

export function render(state, filters, el) {
  // applyFilter is called for consistency with other views even though
  // the Progress view sources its matrix from the baked-in COHORTS
  // constant rather than from state.items. This keeps the door open for
  // future filtering (e.g. by topic-derived cohort tags).
  const _itemsForFilter = applyFilter(state.items || [], filters);
  void _itemsForFilter;

  const div = document.createElement("div");
  div.className = "view progress";
  el.appendChild(div);

  // Drop any modality column not referenced by any planned or actual cell.
  const usedModalities = new Set();
  for (const c of COHORTS) {
    for (const m of c.planned) usedModalities.add(m);
    for (const m of Object.keys(c.actual || {})) usedModalities.add(m);
  }
  const modalities = MODALITIES.filter(m => usedModalities.has(m));

  // Y-axis order: bucket A→D, preserving the input order within each bucket.
  // Plotly's y-axis renders index 0 at the bottom, so reverse for display.
  const cohortsOrdered = [...COHORTS].sort((a, b) => {
    if (a.bucket !== b.bucket) return a.bucket.localeCompare(b.bucket);
    return 0;
  });
  const yLabels = cohortsOrdered.map(c => c.id);
  const yReversed = [...yLabels].reverse();

  // Build the two z-matrices + hover-text matrices (rows reversed to
  // match Plotly's bottom-up y).
  const zPlanned = [], zActual = [], hPlanned = [], hActual = [];
  for (const c of [...cohortsOrdered].reverse()) {
    const zpRow = [], zaRow = [], hpRow = [], haRow = [];
    const plannedSet = new Set(c.planned);
    for (const m of modalities) {
      const planned = plannedSet.has(m) ? 1 : 0;
      const actual = (c.actual && c.actual[m] != null) ? c.actual[m] : ST_MISSING;
      zpRow.push(planned);
      zaRow.push(actual);
      const nText = c.n != null ? `${c.n} pts` : "N pts pending";
      const bucketTag = `bucket ${c.bucket}`;
      hpRow.push(
        `<b>${c.id}</b><br>${bucketTag} · ${c.cancer} · ${nText}` +
        `<br>modality: ${m}<br>planned: ${planned ? "yes" : "no"}` +
        `<br>accession: ${c.accession}`,
      );
      haRow.push(
        `<b>${c.id}</b><br>${bucketTag} · ${c.cancer} · ${nText}` +
        `<br>modality: ${m}<br>state: ${STATE_LABEL[actual]}` +
        `<br>accession: ${c.accession}`,
      );
    }
    zPlanned.push(zpRow);
    zActual.push(zaRow);
    hPlanned.push(hpRow);
    hActual.push(haRow);
  }

  // Tally per bucket for the header blurb.
  const tally = {};
  for (const c of COHORTS) {
    const b = (tally[c.bucket] = tally[c.bucket] || { d: 0, p: 0, b: 0, m: 0 });
    const states = new Set(Object.values(c.actual || {}));
    if (states.has(ST_DOWNLOADED)) b.d += 1;
    else if (states.has(ST_PARTIAL)) b.p += 1;
    else if (states.has(ST_BLOCKED)) b.b += 1;
    else b.m += 1;
  }
  const tallyBits = ["A", "B", "C", "D"].map(k => {
    const t = tally[k] || { d: 0, p: 0, b: 0, m: 0 };
    return `${k}: ${t.d}d/${t.p}p/${t.b}b/${t.m}planned`;
  }).join(" · ");

  const header = document.createElement("header");
  header.innerHTML = `<h2>Cohort coverage progress
    <small>${cohortsOrdered.length} cohorts × ${modalities.length} modalities · two-pane heatmap</small></h2>
    <p class="view-blurb">Top pane = planned per the manifest (binary, blue gradient).
    Bottom pane = actual state on disk (categorical: grey missing · red blocked · amber partial · green downloaded).
    Hover any cell for cohort, modality, state, N pts, and accession. Bucket tally — ${tallyBits}.</p>`;
  div.appendChild(header);

  const figDiv = document.createElement("div");
  div.appendChild(figDiv);

  const tracePlanned = {
    type: "heatmap",
    x: modalities,
    y: yReversed,
    z: zPlanned,
    text: hPlanned,
    hoverinfo: "text",
    colorscale: PLANNED_COLORSCALE,
    zmin: 0, zmax: 1,
    showscale: true,
    xgap: 1, ygap: 1,
    colorbar: { title: "planned", thickness: 10, len: 0.35, y: 0.82 },
    xaxis: "x", yaxis: "y2",
  };

  const traceActual = {
    type: "heatmap",
    x: modalities,
    y: yReversed,
    z: zActual,
    text: hActual,
    hoverinfo: "text",
    colorscale: ACTUAL_COLORSCALE,
    zmin: 0, zmax: 3,
    showscale: true,
    xgap: 1, ygap: 1,
    colorbar: {
      title: "state",
      thickness: 10, len: 0.35, y: 0.22,
      tickvals: [0.375, 1.125, 1.875, 2.625],
      ticktext: ["missing", "blocked", "partial", "downloaded"],
    },
    xaxis: "x", yaxis: "y",
  };

  const rowHeight = Math.max(360, cohortsOrdered.length * 18 + 80);
  const layout = {
    grid: { rows: 2, columns: 1, pattern: "independent", roworder: "top to bottom" },
    xaxis:  { title: "modality", tickangle: -45, anchor: "y" },
    yaxis:  { title: "actual",  domain: [0.0, 0.48], automargin: true, ticksuffix: "  " },
    yaxis2: { title: "planned", domain: [0.52, 1.0], automargin: true, ticksuffix: "  " },
    margin: { l: 10, r: 40, t: 10, b: 80 },
    height: rowHeight * 2,
  };

  // eslint-disable-next-line no-undef
  Plotly.newPlot(figDiv, [tracePlanned, traceActual], layout,
    { responsive: true, displaylogo: false });
}
