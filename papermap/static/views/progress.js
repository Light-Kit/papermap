"use strict";

// Cohort-coverage Progress view — two stacked Plotly heatmaps sharing a
// y-axis (cohort_id, busiest bucket first) and x-axis (modality token).
// Top pane = "what we expect to have" (planned per the manifest);
// bottom pane = "what we actually have on disk" (per-cohort MANIFEST +
// status.tsv). Cell encoding for the bottom pane is categorical
// (5 states, updated 2026-06-05 after the blank-fill probe round):
//   0 = unsearched (grey)    — paper/accession unverified, not yet probed
//   1 = blocked    (red)     — probed, gated, no public mirror anywhere
//   2 = partial    (amber)   — on disk, modality coverage incomplete
//   3 = in-progress (blue)   — public mirror confirmed, queueable today
//   4 = downloaded (green)   — on disk, complete
// Top pane is binary (0/1) rendered with the same blue gradient timeline.js uses.
//
// Data is baked in below as a COHORTS constant so the view stays
// self-contained — no fetch, no infra change. Future iteration can swap
// this for a sibling JSON.

import { applyFilter } from "../filters.js";

// Modality columns in display order. Drop unused columns at render time.
const MODALITIES = [
  "WGS", "WES", "panel", "bulk-RNA",
  "scRNA", "snRNA", "SmartSeq2",
  "scATAC", "snATAC", "CITE-seq", "Patch-seq",
  "Visium", "VisiumHD", "Xenium", "ST",
  "MERFISH", "CosMx", "GeoMx-DSP",
  "IMC", "CODEX", "MIBI", "t-CyCIF", "mIF", "MALDI",
  "DVP-proteomics", "scTCR", "clinical",
];

// State integer codes for the bottom pane (5-state taxonomy).
const ST_UNSEARCHED = 0;
const ST_BLOCKED = 1;
const ST_PARTIAL = 2;
const ST_IN_PROGRESS = 3;
const ST_DOWNLOADED = 4;

// Cohort matrix. `planned` lists modalities promised by the manifest;
// `actual` maps modality -> state integer (5-state taxonomy above).
// Empty actual {} means unsearched everywhere (state == 0).
// Optional `note` carries hover-text annotation (probe date, dedupe flag).
const COHORTS = [
  // --- bucket A: sc/snRNA + paired genomics ---
  { id: "luo-2024-nant-ovarian", bucket: "A", cancer: "HGSOC", n: 30,
    planned: ["WGS", "scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "scTCR": ST_DOWNLOADED, "WGS": ST_BLOCKED,
              "bulk-RNA": ST_IN_PROGRESS },
    accession: "GEO GSE222556",
    note: "Set 4 2026-06-06: bulk-TCR (GSE222554) + Singleron scTCR (GSE222555) + scRNA validation (GSE269793) fetch queued via SuperSeries GSE222557; tracked under bulk-RNA cell pending fetch" },
  { id: "vazquez-garcia-2022-mskspectrum", bucket: "A", cancer: "HGSOC", n: 42,
    planned: ["WGS", "scRNA", "bulk-RNA", "IMC"],
    actual: { "scRNA": ST_DOWNLOADED, "bulk-RNA": ST_DOWNLOADED,
              "WGS": ST_BLOCKED, "IMC": ST_BLOCKED },
    accession: "CELLxGENE 4796c91c + GEO GSE180661 (Synapse syn25569736 gated)",
    note: "probed 2026-06-05; dual-listed with D-row (dedupe candidate)" },
  { id: "olbrecht-2021-hgsoc", bucket: "A", cancer: "HGSOC", n: 7,
    planned: ["scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED },
    accession: "ArrayExpress E-MTAB-8107",
    note: "Set 3 2026-06-06: WES companion probed empty (E-MTAB-8107 stand-alone scRNA; germline-BRCA flag is clinical metadata not WES deposit)" },
  { id: "pal-2021-brca1-breast", bucket: "A", cancer: "breast-BRCA1", n: 21,
    planned: ["WGS", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "WGS": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE161529",
    note: "Set 2 + Set 3 2026-06-06: WGS out-of-bucket probe empty; bulk-RNA companion empty (GSE161529 stand-alone scRNA atlas)" },
  { id: "bassez-2021-biokey", bucket: "A", cancer: "breast-IO", n: 40,
    planned: ["WES", "panel", "scRNA", "scTCR"],
    actual: { "WES": ST_BLOCKED, "panel": ST_BLOCKED,
              "scRNA": ST_PARTIAL, "scTCR": ST_BLOCKED,
              "bulk-RNA": ST_BLOCKED },
    accession: "Figshare 24867018 (processed Seurat 725MB) + Nat Med MOESM 16MB; raw at EGA EGAS00001004809",
    note: "v5-followup 2026-06-05: processed tier landed via Figshare + Nat Med supps; raw FASTQ/WES/CITE stay EGA-controlled; scTCR not in processed deposit; Set 3 2026-06-06 bulk-RNA companion empty (figshare + Nat Med are scRNA-Seurat only)" },
  { id: "yost-2019-bcc", bucket: "A", cancer: "BCC-IO", n: 14,
    planned: ["scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "scTCR": ST_DOWNLOADED,
              "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE123813",
    note: "Set 3 2026-06-06: bulk-RNA companion empty (GSE123813 not in any SuperSeries)" },
  { id: "caushi-2021-nsclc", bucket: "A", cancer: "NSCLC-IO", n: 16,
    planned: ["WES", "panel", "scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "scTCR": ST_DOWNLOADED,
              "WES": ST_BLOCKED, "panel": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE176021",
    note: "Set 2 + Set 3 2026-06-06: WES/panel out-of-bucket empty; bulk-RNA companion empty (GSE176021 stand-alone; raw at EGA EGAS00001005343 controlled)" },
  { id: "luoma-2022-hnscc", bucket: "A", cancer: "HNSCC-IO", n: 29,
    planned: ["panel", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "panel": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE200996",
    note: "Set 2 + Set 3 2026-06-06: panel out-of-bucket empty; bulk-RNA companion empty (GSE200996 stand-alone)" },
  { id: "sade-feldman-2018-mel", bucket: "A", cancer: "melanoma-IO", n: 48,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE120575",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; bulk-RNA companion empty (GSE120575 stand-alone; raw at dbGaP phs001680 controlled)" },
  { id: "bi-2021-ccrcc", bucket: "A", cancer: "ccRCC-IO", n: 8,
    planned: ["WES", "scRNA"],
    actual: { "WES": ST_BLOCKED, "scRNA": ST_PARTIAL },
    accession: "Broad SCP1288 (processed scRNA 1.0GB, user manual upload); raw WGS at dbGaP phs002252",
    note: "v5-followup 2026-06-05: user manually fetched SCP1288 via Google login; processed scRNA (matrix+counts+metadata+cluster) on disk; raw WGS at dbGaP stays blocked" },
  { id: "liu-2022-nsclc", bucket: "A", cancer: "NSCLC-IO", n: 35,
    planned: ["WES", "scRNA"], actual: {},
    accession: "EGA EGAS00001005003 (manifest PMID 35020028 wrong paper)",
    note: "accession-unverified; manifest PMID points to wrong paper, real paper PMID unresolved" },
  { id: "magen-2023-hcc", bucket: "A", cancer: "HCC-IO", n: 33,
    planned: ["WES", "scRNA", "scTCR"], actual: {},
    accession: "not located",
    note: "accession-unverified; no scRNA paper at named PMID, possibly preprint or retracted" },
  { id: "wang-2025-sclc-parpi", bucket: "A", cancer: "SCLC-PARPi", n: null,
    planned: ["panel", "scRNA"], actual: {}, accession: "unverified",
    note: "accession-unverified; only 2025 SCLC PARPi match is Zhang meta-analysis, Wang attribution wrong" },
  { id: "pelka-2021-crc", bucket: "A", cancer: "CRC-MMR", n: 62,
    planned: ["WES", "scRNA", "MERFISH"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED,
              "MERFISH": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE178341",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; MERFISH companion sits in D-tier Chen Cell 2021 atlas (tracked separately); bulk-RNA companion empty (raw at dbGaP phs002407 controlled)" },
  { id: "lee-2020-crc-korea", bucket: "A", cancer: "CRC", n: 29,
    planned: ["WES", "bulk-RNA", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE132465",
    note: "Set 2 + Set 3 2026-06-06: WES + bulk-RNA out-of-bucket / companion empty (GSE132465 stand-alone scRNA)" },
  { id: "maynard-2020-nsclc-longitudinal", bucket: "A", cancer: "NSCLC-TKI", n: 30,
    planned: ["WES", "panel", "scRNA"],
    actual: { "WES": ST_BLOCKED, "panel": ST_BLOCKED, "scRNA": ST_BLOCKED },
    accession: "EGA unverified",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "neftel-2019-gbm", bucket: "A", cancer: "GBM", n: 28,
    planned: ["WES", "scRNA", "SmartSeq2"],
    actual: { "scRNA": ST_DOWNLOADED, "SmartSeq2": ST_DOWNLOADED,
              "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "SCP393 + GEO GSE131928",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; bulk-RNA companion empty (GSE131928 raw at dbGaP controlled)" },
  { id: "karaayvaz-2018-tnbc", bucket: "A", cancer: "TNBC", n: 6,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_PARTIAL, "WES": ST_PARTIAL },
    accession: "GEO GSE118390" },
  { id: "puram-2017-hnscc", bucket: "A", cancer: "HNSCC", n: 18,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE103322",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; bulk-RNA companion empty (GSE103322 stand-alone; raw deferred)" },
  { id: "kim-2020-nsclc-mets", bucket: "A", cancer: "NSCLC-mets", n: 44,
    planned: ["WES", "scRNA"],
    actual: { "WES": ST_BLOCKED, "scRNA": ST_BLOCKED },
    accession: "EGA EGAS00001004001",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "tirosh-2016-melanoma", bucket: "A", cancer: "mel", n: 19,
    planned: ["WES", "SmartSeq2"],
    actual: { "SmartSeq2": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE72056",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; bulk-RNA companion empty (GSE72056 stand-alone; raw at dbGaP controlled)" },
  { id: "jerby-arnon-2018-mel", bucket: "A", cancer: "mel-IO", n: 33,
    planned: ["WES", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE115978",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; bulk-RNA companion empty (GSE115978 scRNA atlas; raw at dbGaP controlled)" },
  { id: "stewart-2020-sclc-cdx", bucket: "A", cancer: "SCLC", n: 12,
    planned: ["WGS", "WES", "scRNA"],
    actual: { "WGS": ST_PARTIAL, "WES": ST_PARTIAL, "scRNA": ST_BLOCKED },
    accession: "EGA EGAS00001004025",
    note: "Set 1 2026-06-06: alt-genomic via cBioPortal sclc_ucologne_2015 + sclc_jhu + sclc_clcgp + sclc_cancercell_gardner_2017 — WGS mutation-table, SBS3-derivable (n=120+80+29+20); scRNA still blocked" },
  { id: "wang-2021-gastric-peritoneal", bucket: "A", cancer: "gastric", n: 6,
    planned: ["scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE163558",
    note: "Set 3 2026-06-06: bulk-RNA companion empty (GSE163558 stand-alone scRNA)" },
  { id: "zhang-2022-gastric-tcell", bucket: "A", cancer: "gastric", n: 29,
    planned: ["WES", "scRNA", "scTCR"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE183904",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty; bulk-RNA companion empty (GSE183904 stand-alone scRNA; misnamed Kumar-Tan 2022 per status notes)" },
  { id: "couturier-2020-gbm", bucket: "A", cancer: "GBM", n: 14,
    planned: ["WES", "scRNA"],
    actual: { "WES": ST_BLOCKED, "scRNA": ST_BLOCKED },
    accession: "EGA EGAS00001004422",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "lambrechts-2018-nsclc", bucket: "A", cancer: "NSCLC", n: 5,
    planned: ["WES", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED },
    accession: "ArrayExpress E-MTAB-6149",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket / companion empty (E-MTAB-6149 stand-alone scRNA; WES not in BioStudies inventory)" },
  { id: "goveia-2020-nsclc-ec", bucket: "A", cancer: "NSCLC-EC", n: 8,
    planned: ["WES", "scRNA"],
    actual: { "scRNA": ST_DOWNLOADED, "WES": ST_BLOCKED },
    accession: "ArrayExpress E-MTAB-6308 (real Goveia 2020 NSCLC-EC, 618 MB)",
    note: "v5-followup 2026-06-05: prior E-MTAB-8221 was paper-level mis-id (fetal lung dev, preserved separately as fetal-lung-dev-dual-smad); real Goveia 2020 NSCLC tumor endothelial pulled; Set 2 2026-06-06 WES out-of-bucket empty (E-MTAB-6308 stand-alone scRNA)" },
  { id: "sun-2021-hcc-early-relapse", bucket: "A", cancer: "HCC", n: 18,
    planned: ["WES", "scRNA", "scTCR"], actual: {},
    accession: "BGI/CNGB (registration required) — GSE149614 misattribution dropped",
    note: "paper-only; deposit at BGI/CNGB not probed (user-side registration)" },
  { id: "kim-2018-tnbc-chemoresist", bucket: "A", cancer: "TNBC", n: 20,
    planned: ["WES", "scRNA", "SmartSeq2"],
    actual: { "WES": ST_PARTIAL, "SmartSeq2": ST_PARTIAL },
    accession: "SRA SRP114962" },
  { id: "hwang-lin-2022-pdac-chemo", bucket: "A", cancer: "PDAC", n: 43,
    planned: ["WES", "snRNA", "DVP-proteomics"],
    actual: { "snRNA": ST_DOWNLOADED, "WES": ST_BLOCKED,
              "DVP-proteomics": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE199102",
    note: "Set 2 + Set 3 2026-06-06: WES + DVP-proteomics out-of-bucket empty (DVP at EGA EGAD00010002388 controlled, no PRIDE record); bulk-RNA companion empty (raw at dbGaP phs002789 controlled)" },
  { id: "htan-hta3-bu-lung-precancer", bucket: "A", cancer: "lung-precancer", n: 484,
    planned: ["WES", "scRNA", "mIF"],
    actual: { "WES": ST_BLOCKED, "scRNA": ST_BLOCKED, "mIF": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA3",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "su-2025-hcc-snrna", bucket: "A", cancer: "HCC", n: 12,
    planned: ["WES", "snRNA"],
    actual: { "snRNA": ST_DOWNLOADED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE282701",
    note: "Set 2 + Set 3 2026-06-06: WES out-of-bucket empty (wes-chord-via-integration; planned as TCGA-LIHC integration); bulk-RNA companion empty (GSE282701 stand-alone snRNA)" },

  // --- bucket B: spatial transcriptomics + paired genomics ---
  { id: "stur-2022-hgsoc-visium", bucket: "B", cancer: "HGSOC", n: 12,
    planned: ["Visium"],
    actual: { "Visium": ST_DOWNLOADED, "scRNA": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE189843",
    note: "Set 3 2026-06-06: scRNA + bulk-RNA companions empty (GSE189843 stand-alone Visium-only)" },
  { id: "erickson-2022-prostate-visium", bucket: "B", cancer: "prostate", n: 11,
    planned: ["WGS", "Visium", "bulk-RNA"],
    actual: { "Visium": ST_DOWNLOADED, "WGS": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "Mendeley svw96g68dv v3 (Visium) + EGA EGAS00001006124 (WGS gated)",
    note: "probed 2026-06-05; Visium open at Mendeley, WGS keep-blocked; Set 2 2026-06-06 bulk-RNA out-of-bucket empty" },
  { id: "khaliq-sun-2024-pdac", bucket: "B", cancer: "PDAC", n: 30,
    planned: ["Visium"], actual: { "Visium": ST_DOWNLOADED },
    accession: "GEO GSE272362" },
  { id: "pei-min-2025-pdac-autopsy", bucket: "B", cancer: "PDAC", n: 13,
    planned: ["WGS", "WES", "Visium", "CosMx"],
    actual: { "Visium": ST_DOWNLOADED, "CosMx": ST_DOWNLOADED,
              "WGS": ST_BLOCKED, "WES": ST_BLOCKED },
    accession: "GEO GSE274557 (Visium) + GSE277782 (CosMx); WGS/WES not in data availability",
    note: "probed 2026-06-05; 57 Visium FF+FFPE + 7 CosMx 1000-plex open at GEO; Set 2 2026-06-06 WGS/WES out-of-bucket empty (no accession in Nature 2025 642:212 data availability)" },
  { id: "wu-2025-hgsoc-visium-hd", bucket: "B", cancer: "HGSOC", n: 30,
    planned: ["WES", "VisiumHD"], actual: {},
    accession: "bioRxiv 2025.11.24.690313v1 (embargoed pre-acceptance)",
    note: "paper-only; preprint embargoed, no deposit yet" },
  { id: "ji-2020-cscc-st", bucket: "B", cancer: "cSCC", n: 10,
    planned: ["WES", "ST"],
    actual: { "ST": ST_DOWNLOADED, "WES": ST_BLOCKED, "scRNA": ST_IN_PROGRESS },
    accession: "GEO GSE144239",
    note: "Set 2 2026-06-06 WES out-of-bucket empty per out-of-bucket probe; Set 4 2026-06-06 scRNA companion fetch queued (GSE144236 in SuperSeries GSE144240)" },
  { id: "xenium-5k-demo-10x", bucket: "B", cancer: "5-tumor-demo", n: null,
    planned: ["WGS", "Xenium", "VisiumHD"],
    actual: { "Xenium": ST_DOWNLOADED, "VisiumHD": ST_DOWNLOADED, "WGS": ST_BLOCKED },
    accession: "10x portal",
    note: "Set 2 2026-06-06: WGS out-of-bucket empty (demo dataset, no companion germline)" },
  { id: "cervilla-2025-st-platforms-comparison", bucket: "B", cancer: "6-cancer-benchmark", n: null,
    planned: ["Visium", "VisiumHD", "Xenium"],
    actual: { "Visium": ST_DOWNLOADED, "VisiumHD": ST_DOWNLOADED, "Xenium": ST_DOWNLOADED },
    accession: "Zenodo 18000256+17999961" },

  // --- bucket C: spatial proteomics + paired genomics ---
  { id: "launonen-2022-farkkila-mif-hgsoc", bucket: "C", cancer: "HGSOC-HRD", n: 44,
    planned: ["WGS", "panel", "t-CyCIF", "mIF"],
    actual: { "t-CyCIF": ST_BLOCKED, "mIF": ST_BLOCKED, "WGS": ST_BLOCKED, "panel": ST_BLOCKED },
    accession: "Synapse syn26230540",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "farkkila-2020-topacio", bucket: "C", cancer: "HGSOC-TNBC-endo", n: 62,
    planned: ["WGS", "t-CyCIF"],
    actual: { "t-CyCIF": ST_BLOCKED, "WGS": ST_BLOCKED },
    accession: "Synapse syn22177117",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "mitri-2024-amtec-parpi-mtnbc", bucket: "C", cancer: "mTNBC-PARPi", n: 12,
    planned: ["WES", "t-CyCIF"], actual: {},
    accession: "medRxiv 2024.08.29.24312245 (not PubMed-indexed)",
    note: "paper-only; HTAN OHSU level-3/4 open subset needs manual portal walk — deferred" },
  { id: "risom-2022-dcis-mibi", bucket: "C", cancer: "breast-DCIS", n: 122,
    planned: ["panel", "bulk-RNA", "MIBI"],
    actual: { "MIBI": ST_DOWNLOADED, "panel": ST_BLOCKED,
              "bulk-RNA": ST_BLOCKED, "scRNA": ST_BLOCKED },
    accession: "Mendeley d87vg86zd8",
    note: "Set 2 + Set 3 2026-06-06: panel + bulk-RNA out-of-bucket empty; scRNA companion empty (Risom DCIS MIBI-TOF paper does not produce paired scRNA)" },
  { id: "jackson-2020-breast-imc", bucket: "C", cancer: "breast", n: 281,
    planned: ["WES", "IMC"],
    actual: { "IMC": ST_DOWNLOADED, "scRNA": ST_BLOCKED },
    accession: "Zenodo 4607374",
    note: "Set 3 2026-06-06: scRNA companion empty (Jackson IMC METABRIC-linked; no paired scRNA in Zenodo 4607374). Set 2 WES open-mirror hit at cBioPortal brca_metabric not auto-applied — needs manual review." },
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
    actual: { "IMC": ST_DOWNLOADED, "WES": ST_PARTIAL, "scRNA": ST_BLOCKED },
    accession: "Zenodo 6036188",
    note: "Set 3 2026-06-06: scRNA companion empty (METABRIC source is bulk WES + bulk RNA per cBioPortal, not sc). Set 2 panel open-mirror hit at cBioPortal brca_metabric not auto-applied — needs manual review." },
  { id: "magness-enfield-2024-tracerx-imc", bucket: "C", cancer: "NSCLC-TRACERx", n: 81,
    planned: ["WES", "bulk-RNA", "IMC"],
    actual: { "IMC": ST_BLOCKED, "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "Zenodo 12587543",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "makhmut-coscia-2025-stic-dvp", bucket: "C", cancer: "HGSOC-STIC", n: 25,
    planned: ["panel", "DVP-proteomics"],
    actual: { "panel": ST_BLOCKED },
    accession: "PRIDE",
    note: "Set 2 2026-06-06: panel out-of-bucket empty (DVP-proteomics on PRIDE PXD069630 confirmed primary; targeted HRD panel NOT in PRIDE/Zenodo/Mendeley)" },

  // --- bucket D: multi-spatial / full-tuple ---
  { id: "htan-hta1-htapp", bucket: "D", cancer: "mBC+NBL+LUAD+GBM", n: 205,
    planned: ["WES", "panel", "scRNA", "snRNA", "Visium", "MERFISH", "CODEX", "MIBI"],
    actual: { "scRNA": ST_DOWNLOADED, "Visium": ST_DOWNLOADED,
              "WES": ST_PARTIAL, "CODEX": ST_UNSEARCHED },
    accession: "CELLxGENE a96133de + Zenodo 4479018 (Synapse syn20446927 HTA1 gated)",
    note: "probed 2026-06-05; scRNA/Visium open via CELLxGENE+Zenodo; Set 1 2026-06-06 WES flipped BLOCKED→PARTIAL via cBioPortal nbl_target_2018_pub + nbl_msk_2023 + es_dfarber_broad_2014 (NBL mutation+CNA + Ewing mutation); Set 3 CITE-seq companion empty (no MODALITIES column, not rendered)" },
  { id: "htan-hta4-chop-pediatric", bucket: "D", cancer: "pediatric", n: 69,
    planned: ["WGS", "WES", "scRNA", "snRNA", "CODEX", "Visium"],
    actual: { "scRNA": ST_DOWNLOADED, "snRNA": ST_DOWNLOADED,
              "WGS": ST_PARTIAL, "WES": ST_PARTIAL },
    accession: "CELLxGENE cee845e3 (NBL) + 9ceda3d2 (pHGG) + 10ec9198 (AML/B-ALL)",
    note: "probed 2026-06-05; scRNA/snRNA open via CELLxGENE; Set 1 2026-06-06 WGS/WES flipped BLOCKED→PARTIAL via cBioPortal nbl_target_2018_pub + aml_target_2018_pub + aml_stjude_2024 + all_phase2_target_2018_pub + brain_cptac_2020 + es_dfarber_broad_2014 (mutation-tables + selected CNA across 5 unmapped pediatric cancers)" },
  { id: "htan-hta5-dfci-resistance", bucket: "D", cancer: "NSCLC-breast-mel", n: 156,
    planned: ["WES", "t-CyCIF", "scRNA"],
    actual: { "WES": ST_BLOCKED, "t-CyCIF": ST_BLOCKED, "scRNA": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA5",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "htan-hta6-duke-stanford-dcis", bucket: "D", cancer: "breast-DCIS", n: 828,
    planned: ["WGS", "MIBI", "scRNA", "bulk-RNA"],
    actual: { "WGS": ST_BLOCKED, "MIBI": ST_BLOCKED,
              "scRNA": ST_BLOCKED, "bulk-RNA": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA6",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "htan-hta7-hms-patch-sorger", bucket: "D", cancer: "mel+heme", n: 245,
    planned: ["panel", "bulk-RNA", "t-CyCIF"],
    actual: { "panel": ST_BLOCKED, "bulk-RNA": ST_BLOCKED, "t-CyCIF": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA7",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "htan-hta8-msk-metastasis", bucket: "D", cancer: "metastasis", n: 202,
    planned: ["panel", "WGS", "scRNA", "MIBI", "IMC", "Visium"],
    actual: { "scRNA": ST_DOWNLOADED, "WGS": ST_BLOCKED,
              "IMC": ST_UNSEARCHED, "Visium": ST_UNSEARCHED },
    accession: "CELLxGENE 62e8f058 (Chan SCLC) + efd94500 (Treg); Synapse syn20446927 HTA8 gated",
    note: "probed 2026-06-05; scRNA open via CELLxGENE, WGS keep-blocked, IMC/Visium not in public deposit" },
  { id: "htan-hta9-ohsu-smmart-mbc", bucket: "D", cancer: "mBC", n: 33,
    planned: ["WGS", "scRNA", "t-CyCIF"],
    actual: { "WGS": ST_BLOCKED, "scRNA": ST_BLOCKED, "t-CyCIF": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA9",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "htan-hta10-stanford-fap", bucket: "D", cancer: "FAP-CRC", n: 40,
    planned: ["WGS", "scRNA", "Xenium", "CODEX"],
    actual: { "WGS": ST_BLOCKED, "scRNA": ST_BLOCKED,
              "Xenium": ST_BLOCKED, "CODEX": ST_BLOCKED },
    accession: "Synapse syn20446927 HTA10",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "htan-hta11-vanderbilt-crc", bucket: "D", cancer: "CRC", n: 195,
    planned: ["WES", "WGS", "scRNA", "snRNA", "Visium"],
    actual: { "scRNA": ST_DOWNLOADED, "snRNA": ST_DOWNLOADED,
              "WGS": ST_BLOCKED },
    accession: "CELLxGENE a48f5033 (Chen Cell 2021 HTAN VUMC); Synapse syn20446927 HTA11 gated",
    note: "probed 2026-06-05; scRNA/snRNA open via CELLxGENE, WGS/MxIF keep-blocked, Visium not in public deposit" },
  { id: "htan-hta12-wustl-pancancer", bucket: "D", cancer: "pan-cancer (PAAD open tier)", n: 21,
    planned: ["WGS", "WES", "scRNA", "snRNA", "Visium", "CODEX", "IMC", "Xenium"],
    actual: { "WGS": ST_BLOCKED, "WES": ST_BLOCKED },
    accession: "NCI IDC (s3://idc-open-data via Zenodo 12689994 manifests; 228 series, 2813 DICOM, 12 GB); Synapse syn20446927 HTA12 gated",
    note: "v5-followup 2026-06-05: n=21 PAAD pathology slide microscopy (not Visium spatial) landed via s5cmd against IDC public bucket; earlier n=295 blog claim referred to full multi-cancer atlas across all modalities; scRNA/Visium/CODEX/WGS keep-blocked at Synapse PAT" },
  { id: "mskspectrum-cfdna-parpi-2025", bucket: "D", cancer: "HGSOC-PARPi", n: 24,
    planned: ["WGS", "scRNA"], actual: {},
    accession: "dbGaP phs002857 (no PubMed hit; likely unpublished/in-prep)",
    note: "drafted-future; no PubMed match for MSK SPECTRUM cfDNA PARPi" },
  { id: "hms-sorger-ovarian-renamed", bucket: "D", cancer: "HGSOC", n: 25,
    planned: ["WGS", "t-CyCIF"],
    actual: { "WGS": ST_BLOCKED, "t-CyCIF": ST_BLOCKED },
    accession: "Synapse Sorger",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "owkin-mosaic-window-bladder", bucket: "D", cancer: "bladder-MIBC", n: 15,
    planned: ["WES", "bulk-RNA", "Visium", "snRNA"],
    actual: { "WES": ST_BLOCKED, "bulk-RNA": ST_BLOCKED,
              "Visium": ST_BLOCKED, "snRNA": ST_BLOCKED },
    accession: "EGA EGAD50000001251",
    note: "blocked-confirmed, probed 2026-06-05" },
  { id: "htapp-klughammer-2024-mbc", bucket: "D", cancer: "mBC", n: 30,
    planned: ["WES", "snRNA", "CODEX", "MERFISH"],
    actual: { "snRNA": ST_DOWNLOADED, "MERFISH": ST_DOWNLOADED,
              "WES": ST_BLOCKED },
    accession: "CELLxGENE a96133de + Zenodo 4479018; dbGaP phs002371 gated for WGS",
    note: "probed 2026-06-05; dedupe candidate with HTA1-HTAPP (same Klughammer Nat Med 2024 paper, same CELLxGENE deposit)" },
  { id: "htan-hta8-sclc-chan-2021", bucket: "D", cancer: "SCLC", n: 21,
    planned: ["panel", "WGS", "scRNA", "MIBI"],
    actual: { "scRNA": ST_DOWNLOADED, "WGS": ST_PARTIAL },
    accession: "CELLxGENE 62e8f058 + Zenodo 14057537 (Single Cell HTAN SCLC)",
    note: "probed 2026-06-05; subsumed by HTA8 — dedupe candidate; IMC not in public deposit; Set 1 2026-06-06 WGS flipped BLOCKED→PARTIAL via cBioPortal sclc_ucologne_2015 (n=120) WGS mutation-table" },
  { id: "hwang-2022-pdac-neoadj", bucket: "D", cancer: "PDAC", n: 43,
    planned: ["WES", "snRNA", "DVP-proteomics"],
    actual: { "snRNA": ST_DOWNLOADED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE202051",
    note: "Set 3 2026-06-06: bulk-RNA companion empty (GSE202051 covers Hwang-Lin 2022 snRNA reference; no bulk-RNA arm)" },
  { id: "hwang-2025-pdac-neural", bucket: "D", cancer: "PDAC", n: 25,
    planned: ["panel", "Visium", "snRNA"], actual: {},
    accession: "rename candidate: hwang-2022-nat-genet-pdac-neoadj (PMID 35902743)",
    note: "accession-unverified; cohort likely misattributed, may overlap hwang-lin-2022-pdac-chemo" },
  { id: "sun-2024-hcc-primary-met", bucket: "D", cancer: "HCC", n: 182,
    planned: ["WES", "bulk-RNA", "Visium", "scRNA"], actual: {},
    accession: "not located (zero PubMed hits)",
    note: "accession-unverified; cohort may be misnamed or non-existent" },
  { id: "liu-2024-pediatric-hgg-filbin", bucket: "D", cancer: "pHGG", n: 16,
    planned: ["WGS", "snRNA", "CODEX"],
    actual: { "snRNA": ST_DOWNLOADED, "WGS": ST_PARTIAL, "bulk-RNA": ST_IN_PROGRESS },
    accession: "GEO GSE231860",
    note: "Set 1 2026-06-06: WGS PARTIAL via cBioPortal brain_cptac_2020 WES mutation-table + CNA (n=218 pHGG/DMG); Set 4 2026-06-06 bulk-RNA fetch queued (GSE231858 in SuperSeries GSE231860); scATAC companion empty (no MODALITIES column)" },
  { id: "ravi-2022-gbm-multiomics", bucket: "D", cancer: "GBM", n: 28,
    planned: ["WES", "Visium", "IMC", "scRNA"],
    actual: { "Visium": ST_DOWNLOADED, "scRNA": ST_DOWNLOADED, "bulk-RNA": ST_BLOCKED },
    accession: "GEO GSE194329",
    note: "Set 3 2026-06-06: bulk-RNA companion empty (deposits at dbGaP phs002251 controlled; MALDI companion also empty but no MODALITIES column)" },
  { id: "greenwald-2024-gbm-suva-tirosh", bucket: "D", cancer: "GBM", n: 100,
    planned: ["WES", "Visium", "MIBI", "scRNA"],
    actual: { "Visium": ST_DOWNLOADED, "scRNA": ST_DOWNLOADED, "MIBI": ST_DOWNLOADED },
    accession: "GEO GSE237183 + Zenodo 8105466",
    note: "Set 3 2026-06-06: scATAC + Patch-seq companions probed empty but neither has a MODALITIES column — no rendered cell flipped" },
  { id: "denisenko-2024-hgsoc-visium-cosmx", bucket: "D", cancer: "HGSOC", n: 10,
    planned: ["WES", "Visium", "CosMx", "scRNA"],
    actual: { "Visium": ST_DOWNLOADED, "CosMx": ST_DOWNLOADED,
              "scRNA": ST_DOWNLOADED, "IMC": ST_BLOCKED },
    accession: "EGA EGAS00001006816 + Zenodo 10048057",
    note: "Set 3 2026-06-06: IMC companion empty (no IMC/CODEX/bulk-RNA companion at GEO or Zenodo 10048057)" },
  { id: "krishna-2021-adapter-ccrcc-io", bucket: "D", cancer: "ccRCC-IO", n: 6,
    planned: ["WES", "WGS", "scRNA", "scTCR", "mIF"],
    actual: { "scRNA": ST_DOWNLOADED,
              "WES": ST_BLOCKED, "WGS": ST_BLOCKED },
    accession: "CELLxGENE 3f50314f (Krishna Cancer Cell 2021); EGA EGAS00001005188 gated for WGS/WES",
    note: "probed 2026-06-05; scRNA open via CELLxGENE, WGS/WES keep-blocked (EGA + PRJNA705464)" },
  { id: "wu-2021-breast-visium", bucket: "D", cancer: "breast", n: 26,
    planned: ["WES", "scRNA", "Visium"],
    actual: { "scRNA": ST_DOWNLOADED, "Visium": ST_DOWNLOADED, "bulk-RNA": ST_IN_PROGRESS },
    accession: "GEO GSE176078",
    note: "Set 4 2026-06-06: bulk-RNA fetch queued (GSE176078 suppl file ships open bulk-RNA-seq raw counts for 24 matched samples)" },
];

// Discrete colorscale for the bottom pane: 5 categories.
// 0 grey (unsearched), 1 red (blocked), 2 amber (partial),
// 3 blue (in-progress), 4 green (downloaded).
// Plotly heatmap interprets colorscale by normalised z; with zmin=0 zmax=4
// the band edges are 0, 0.25, 0.50, 0.75, 1.0.
const ACTUAL_COLORSCALE = [
  [0.00, "#bfbfbf"], [0.20, "#bfbfbf"],  // 0 unsearched
  [0.20, "#c73e3e"], [0.40, "#c73e3e"],  // 1 blocked
  [0.40, "#e0a93b"], [0.60, "#e0a93b"],  // 2 partial
  [0.60, "#4a90e2"], [0.80, "#4a90e2"],  // 3 in-progress
  [0.80, "#2c8a3e"], [1.00, "#2c8a3e"],  // 4 downloaded
];

// Blue gradient for the top pane (matches timeline.js palette).
const PLANNED_COLORSCALE = [
  [0, "#f3f6fb"], [0.5, "#a8c5e7"], [1.0, "#1a4480"],
];

const STATE_LABEL = {
  0: "unsearched", 1: "blocked", 2: "partial",
  3: "in-progress", 4: "downloaded",
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
      const isPlanned = plannedSet.has(m);
      const inActual = c.actual && c.actual[m] != null;
      // Not in cohort plan AND no actual state → blank cell in both panes
      // (Plotly renders null as transparent), so each pane only paints
      // modalities relevant to that cohort.
      const planned = isPlanned ? 1 : null;
      const actual = inActual ? c.actual[m] : (isPlanned ? ST_UNSEARCHED : null);
      zpRow.push(planned);
      zaRow.push(actual);
      const nText = c.n != null ? `${c.n} pts` : "N pts pending";
      const bucketTag = `bucket ${c.bucket}`;
      const noteText = c.note ? `<br>note: ${c.note}` : "";
      if (!isPlanned && !inActual) {
        const naMsg =
          `<b>${c.id}</b><br>${bucketTag} · ${c.cancer} · ${nText}` +
          `<br>modality: ${m}<br>n/a (not in cohort plan)`;
        hpRow.push(naMsg);
        haRow.push(naMsg);
      } else {
        hpRow.push(
          `<b>${c.id}</b><br>${bucketTag} · ${c.cancer} · ${nText}` +
          `<br>modality: ${m}<br>planned: ${isPlanned ? "yes" : "no"}` +
          `<br>accession: ${c.accession}`,
        );
        haRow.push(
          `<b>${c.id}</b><br>${bucketTag} · ${c.cancer} · ${nText}` +
          `<br>modality: ${m}<br>state: ${STATE_LABEL[actual]}` +
          `<br>accession: ${c.accession}${noteText}`,
        );
      }
    }
    zPlanned.push(zpRow);
    zActual.push(zaRow);
    hPlanned.push(hpRow);
    hActual.push(haRow);
  }

  // Tally per bucket for the header blurb. Classification priority
  // (highest wins): downloaded > in-progress > partial > blocked > unsearched.
  const tally = {};
  const total = { d: 0, i: 0, p: 0, b: 0, u: 0 };
  for (const c of COHORTS) {
    const t = (tally[c.bucket] = tally[c.bucket] || { d: 0, i: 0, p: 0, b: 0, u: 0 });
    const states = new Set(Object.values(c.actual || {}));
    let key;
    if (states.has(ST_DOWNLOADED)) key = "d";
    else if (states.has(ST_IN_PROGRESS)) key = "i";
    else if (states.has(ST_PARTIAL)) key = "p";
    else if (states.has(ST_BLOCKED)) key = "b";
    else key = "u";
    t[key] += 1;
    total[key] += 1;
  }
  const tallyBits = ["A", "B", "C", "D"].map(k => {
    const t = tally[k] || { d: 0, i: 0, p: 0, b: 0, u: 0 };
    return `${k}: ${t.d}d/${t.p}p/${t.i}i/${t.b}b/${t.u}u`;
  }).join(" · ");
  const totalLine =
    `${total.d} downloaded · ${total.p} partial · ${total.i} in-progress · ` +
    `${total.b} blocked · ${total.u} unsearched ` +
    `= ${total.d + total.p + total.i + total.b + total.u}`;

  const header = document.createElement("header");
  header.innerHTML = `<h2>Cohort coverage progress
    <small>${cohortsOrdered.length} cohorts × ${modalities.length} modalities · 5-state taxonomy · two-pane heatmap</small></h2>
    <p class="view-blurb">Top pane = planned per the manifest (binary, blue gradient).
    Bottom pane = actual state on disk (5 categories: grey unsearched · red blocked · amber partial · blue in-progress · green downloaded).
    Hover any cell for cohort, modality, state, N pts, accession, and probe note.
    Totals — ${totalLine}. Bucket tally — ${tallyBits} (d/p/i/b/u).</p>`;
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
    zmin: 0, zmax: 4,
    showscale: true,
    xgap: 1, ygap: 1,
    colorbar: {
      title: "state",
      thickness: 10, len: 0.35, y: 0.22,
      // Tick midpoints for 5 discrete bins on zmin=0 zmax=4:
      // bin centers at 0.4, 1.2, 2.0, 2.8, 3.6.
      tickvals: [0.4, 1.2, 2.0, 2.8, 3.6],
      ticktext: ["unsearched", "blocked", "partial", "in-progress", "downloaded"],
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
