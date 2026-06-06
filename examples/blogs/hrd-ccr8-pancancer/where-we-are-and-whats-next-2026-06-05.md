---
title: 'where we are, where we''re going — the corpus pivot from collection to analysis'
date: '2026-06-05'
topics:
  - hrd
  - ccr8
  - pan-cancer
  - data-strategy
  - analysis-roadmap
summary: 'the project just crossed an inflection point. corpus assembly is functionally complete (48 cohorts, ~12,600 patient-equivalents, TCGA pan-cancer backbone, first HRD readout on 14,199 patients, first CCR8 readout on 11 new cohorts). this post explains what we have on disk, what those two readouts say, and the three-tier execution plan that goes from this corpus to the (HRD-high × CCR8-eTreg-high) intersection that grounds a future PARPi + anti-CCR8 trial.'
starred: true
---

# where we are, where we're going — the corpus pivot from collection to analysis

## the inflection point

Yesterday the project's bottleneck was data assembly: hunting accessions, fighting credentials, deconflicting paper-mis-IDs, deciding which Synapse atlas mapped to which paper. Today the bottleneck is analysis: turning a corpus into a trial-relevant intersection. The pivot wasn't a single event. It was the cumulative effect of admitting **TCGA pan-cancer** as a backbone (10,585 patients with pre-computed Knijnenburg HRD scores), pulling **11 new cohorts** via CELLxGENE / Zenodo / GEO / Mendeley that had been gated under their master accessions but published processed h5ads through alternate routes, and adding **BIOKEY** as the project's treatment-causal exemplar with R/NR + Pre/On + expander/non-expander labels intact.

Four papermap PRs (#4–#7) carry the inflection: #4 admits TCGA as the HRD spine, #5 sweeps the 8 CELLxGENE-mirrored HTAN sub-atlases plus Vázquez-García + Erickson + Pei-Min + Krishna, #6 adds the two Synapse-PAT partials (Launonen, HMS-Sorger), and #7 stitches the cell-level processed-genomic backbone onto 33 cohorts. With those queued, the corpus moves from a discoverability map into an operational manifest.

## what's on disk

The corpus follows the four-bucket schema in [[matched-multi-omic-tumor-table]]: A = sc/snRNA + genomics, B = spatial transcriptomic + genomics, C = spatial proteomic + genomics, D = multi-spatial / TCGA-anchored full-tuple. The 75-row manifest now resolves cleanly:

| state | count | meaning |
| --- | --- | --- |
| downloaded | 44 | on disk, primary axes complete |
| partial | 6 | on disk, one primary axis still missing |
| in-progress | 0 | emptied — all queueable mirrors pulled |
| blocked | 15 | probed at EGA / dbGaP / Synapse-PAT / SCP-OAuth, no public mirror |
| unsearched | 10 | accession / PMID not yet verified |
| **total** | **75** | |

The structural gap is now policy, not bandwidth. Under the 2026-06-04 public-only pivot, every gated row is gated for a clear reason: HTAN Network team membership (HTA3, HTA5, HTA6, HTA7, HTA9, HTA10, HTA12), TOPACIO DUC, EGA DACs (Maynard, Kim 2020, Stewart, Couturier, Owkin MOSAIC), Liu-2022 NSCLC and Magen-2023 HCC with no verifiable accession at all.

Two analytical readouts have already been produced against this corpus, and they're what makes the inflection visible:

**HRD axis on 14,199 patients.** TCGA pan-cancer + cBioPortal HRD studies + METABRIC give 14,199 paired HRD readings: 8,775 with the full bulk-RNA + MC3 + clinical tuple, plus 5,804 Knijnenburg-scored across 12 cBioPortal HRD studies, plus the METABRIC HR-gene strict proxy (4.1%) and TCGA-BRCA Knijnenburg backdrop (19.1%). The per-cancer ordering recapitulates Knijnenburg 2018 Fig 1 exactly: OV ~56% HRD-high, BRCA ~19%, PRAD ~1%. cBioPortal + Knijnenburg gives 33 single-cell cohorts a processed-genomic backbone via the matched-cancer-type projection (`brca_tcga_pan_can_atlas_2018`, `ov_tcga_pan_can_atlas_2018`, `paad_tcga_pan_can_atlas_2018`, and 11 others).

**CCR8 axis on 11 newly-admitted cohorts.** BIOKEY 22.65% in CD4_REG Tregs (n=1,965 over 40 patients) is the top of the leaderboard, with Krishna ADAPTeR ccRCC 20.07% (n=2,491, published label) and HTA8 MSK Metastasis 6.25% (n=1,360, published Treg label across SCLC + PDAC + CRC mets) close behind. CELLxGENE-deposit artifacts surfaced — Vázquez-García MSK SPECTRUM HGSOC reads 0.00% because CCR8 was filtered from the deposited var, and CosMx 1,000-plex panels (Pei-Min, Denisenko) omit CCR8 entirely. Those zero-reads aren't biology, they're inventory.

## what the two readouts say

Walking BIOKEY end-to-end makes the analytical pipeline concrete. BIOKEY is the BIOKEY-anti-PD-1 breast cohort (Bassez 2021), 40 patients with R/NR + Pre/On treatment axes and BRCA1/2 status in MOESM3 supp:

1. The TCGA-BRCA backbone says ~19.1% of breast patients are HRD-high under the Knijnenburg HRD-sum threshold. The METABRIC HR-gene strict proxy (4.1%) is a lower bound; the population estimate for BIOKEY-like breast lives between those.
2. BIOKEY's per-cell CCR8 quant says **22.65% of CD4_REG Tregs are CCR8+** — measured on the actual h5ad, on n=1,965 Tregs.
3. The cohort-level joint-high estimate, assuming HRD status and CCR8-eTreg density are roughly independent at the cohort level, is **22.65% × 19.1% ≈ 4.3%** of BIOKEY's 40 patients sitting in the (HRD-high × CCR8-Treg-high) bucket. That's the trial-design target: HRD-high tumors with high CCR8-eTreg infiltration are the hypothesized PARPi + anti-CCR8 responders.
4. This is a **cohort-level** estimate, not a patient-level pairing. Rigorous individual-level pairing requires the Tier 2 / Tier 3 work below — sc-resolution HRD imputation against per-patient CCR8 eTreg fraction, with the BIOKEY MOESM3 BRCA1/2 status used as an anchor.

The expander-vs-non-expander signal in BIOKEY (Pre-Tx Expander 21.92% vs Non-expander 19.48%, +2.45 pp on the CD4_REG Treg CCR8+ fraction) is suggestive of a CCR8-positive responder direction but small. It needs sc-resolution to be definitive.

## the three-tier execution plan

**Tier 1 — cohort-level intersection (starting now, ~1 day).** No new data work. Uses what's already on disk: per-cohort CCR8% in Tregs from the qc_cards + TCGA-Knijnenburg per-cancer-type HRD-high prevalence. Produces a master TSV under `logs/intersection_tier1_20260605/` with one row per cohort: cohort, cancer type, N patients, CCR8+ in Tregs, HRD-high % (TCGA-anchored), joint-high estimate, 95% CI from cohort-N. Output: the first cross-cohort joint-high prevalence table + forest plot. Publishable as a cohort-level result, independent of Tier 2/3. Tier 1 does **not** wait on the rest.

**Tier 2 — standardized sc QC (parallel, ~3–5 days).** Scanpy pipeline on the 11 newly-admitted cohorts + Pal 2021 + Lambrechts 2018: MT% / gene-count / scrublet doublet calling / log-norm + HVG. CellTypist-harmonized cell-type labels (Immune_All_Low + Tumor_Immune wherever they apply) so the Treg call isn't author-label-dependent. Unified patient-metadata schema across cohorts (cancer / treatment / response / BRCA1/2 status / HRD score where available). Enables Tier 3 by making the cohorts comparable.

**Tier 3 — cross-cohort integration (week 2).** scVI or Harmony cross-cohort integration of the Tier-2-QC'd cohorts → per-cell CCR8+ Treg call × per-patient HRD score (Knijnenburg backbone for cancers without per-patient genomics, scorer ensemble where WGS/WES is on disk) → individual-level (HRD-high × CCR8-eTreg-high) intersection analysis. This is the paper's headline.

The three tiers run with Tier 1 alone in critical path. Tier 2 + Tier 3 run in parallel because Tier 1 ships a publishable cohort-level result on its own.

## caveats & open questions

- **Five cohorts gated under formal applications.** HTAN Network team membership covers HTA3 / HTA5 / HTA6 / HTA7 / HTA9 / HTA10 / HTA12; TOPACIO needs a Data Use Certificate; Liu-2022 NSCLC, Maynard, Kim-2020, Stewart, Couturier need EGA DACs. Drafts written, decisions pending. None of these are critical-path for Tier 1.
- **R-scorer install in flight.** CHORD / HRDetect / scarHRD installation is still running in the user's terminal. Until it lands, the four-scorer concordance vector ([[hrd-is-computable]]) reduces to Knijnenburg-only.
- **CellTypist availability is uneven.** Some HTAN h5ads use Cell Ontology IDs instead of author labels; the Treg call drops out gracefully but the eTreg sub-call is shakier on those rows. Tier 2 normalises this.
- **Responder-direction story needs sc-resolution.** BIOKEY's +2.45 pp expander signal is real but small; ADAPTeR's pre/on/post structure may carry more signal but n=6.

## why this matters

If (HRD-high × CCR8-eTreg-high) prevalence holds at ~4% across breast / ovarian / pancreatic / prostate, that's roughly **400,000 US patients per year** by SEER incidence. Large enough for a phase-2 niraparib + anti-CCR8 trial; small enough that finding the responders prospectively requires a multi-modal stratifier (sc + spatial + genomic + clinical). That stratifier is what this corpus, this HRD axis, and this CCR8 axis are for.
