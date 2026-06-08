---
title: 'from corpus to intersection — today, the project crossed its first analytical readout'
date: '2026-06-05 02:11 UTC'
topics:
  - hrd
  - ccr8
  - pan-cancer
  - intersection-analysis
  - corpus-state
  - analysis-roadmap
summary: 'today the project landed its first cross-axis (hrd-high x ccr8-treg-high) joint-prevalence readout across 15 cohorts. luo hgsoc 13.29%, caushi nsclc 10.07%, puram hnscc 6.91%, biokey 4.33%. the corpus underwent a major admit (tcga pan-cancer backbone + 11 newly-fetched cohorts + biokey processed tier + 12 gb htan-hta12 imaging + real goveia replacing mis-id). qc is split: 30 cohorts standardized, 11 admits need tier-2 scanpy pipeline. tier 1 result is publishable today; tier 2 + 3 unlock the cell-level integration in 1-2 weeks.'
starred: true
---

# from corpus to intersection — today, the project crossed its first analytical readout

Three threads converged today. The v6 corpus snapshot finished accounting for the admits. The "where we are, where we're going" essay laid out the three-tier execution plan. And the Tier-1 intersection analysis returned its first numbers. This post folds those three into one. The headline is the table at the top — for the first time in this project, both axes have been measured against the same cohort spine, and the (HRD-high × CCR8-Treg-high) intersection has a real, if provisional, prevalence band.

## the tier-1 forest

The result first. Per-cohort joint-high prevalence under the cohort-level multiplicative estimate — CCR8+ in FOXP3+ Tregs (or the closest published Treg call) measured on the actual h5ad / .rds, multiplied by the cancer-type HRD-high prevalence from the Knijnenburg-2018 TCGA pan-cancer backbone — for the 15 cohorts where both axes can be estimated:

| cohort | cancer | joint-high % | Wilson 95% | n_patients |
|---|---|---|---|---|
| luo-2024-nant-ovarian | HGSOC | **13.29** | 5.58–28.45 | 30 |
| caushi-2021-nsclc | NSCLC anti-PD-1 | **10.07** | 2.47–33.13 | 16 |
| puram-2017-hnscc | HNSCC | **6.91** | 1.58–25.56 | 18 |
| bassez-2021-biokey | breast anti-PD-1 | **4.33** | 1.10–15.56 | 40 |
| luoma-2022-hnscc | HNSCC anti-PD-1 | 3.83 | 0.54–22.64 | 29 |
| jerby-arnon-2018-mel | melanoma | 1.53 | 0.16–13.29 | 33 |
| sade-feldman-2018-mel | melanoma anti-PD-1 | 1.30 | 0.13–11.63 | 48 |

Method, in one paragraph. `joint_high = (CCR8+ in FOXP3+ Tregs %) × (cancer-type HRD-high prevalence, Knijnenburg 2018 TCGA backbone)`. Independence between axes is assumed at the cohort level — no patient in any of these cohorts has been scored on both axes individually, so this is a multiplicative point estimate, not a per-patient pairing. Wilson 95% CIs are computed against cohort n_patients. Master TSV is at `logs/intersection_tier1_20260605/_master_intersection.tsv`; forest plot at `_forest_plot.png`.

BIOKEY's 4.33% is the cohort that anchors the trial design. Among the 15 rows it is the cleanest treatment-causal exemplar: 40 anti-PD-1 breast cancer patients with R/NR labels and BRCA1/2 status intact from Bassez 2021 MOESM3. It is the cohort a prospective phase-2 niraparib + anti-CCR8 trial would be powered against. Luo HGSOC tops the table because OV carries TCGA's highest HRD-high prevalence (55.6%); Caushi NSCLC and Puram HNSCC follow because their raw CCR8 fractions (41% and 68%) carry through even at moderate HRD-floor cancer types. SKCM-anchored melanoma cohorts cluster at 1.3–1.5% because the SKCM HRD floor (3.4%) compresses everything, regardless of how high the CCR8 reads.

## how we got here today

The Tier-1 readout sits on top of a corpus that, as of this morning, had functionally closed its admit phase. The day's events, in narrative order:

**TCGA pan-cancer backbone admitted.** 1.28 GB at `D/tcga-pancancer-bulk-2026/`. 10,585 patients with pre-computed Knijnenburg-2018 HRD scores. This is the corpus's HRD-axis baseline — every Tier-1 multiplicative estimate above traces its HRD% back to a row here.

**11 newly-fetched cohorts via alternate routes.** erickson-2022-prostate-visium (Mendeley `svw96g68dv`), pei-min-2025-pdac-autopsy (GEO `GSE274557` + `GSE277782`), htan-hta1-htapp (CELLxGENE `a96133de`), htan-hta4-chop-pediatric (three CELLxGENE collections), htan-hta8-msk-metastasis (`62e8f058` + `efd94500`), htan-hta11-vanderbilt-crc (`a48f5033`), krishna-2021-adapter-ccrcc-io (`3f50314f`), vazquez-garcia-2022-mskspectrum (`4796c91c` + GEO `GSE180661`). Total ~78.6 GB pulled. The shared pattern: master accessions gated, processed-tier h5ads quietly re-deposited at CELLxGENE or Mendeley.

**BIOKEY admitted via Figshare.** 727 MB Seurat .rds + 16 MB Nat Med supps. The CELLxGENE probe was the day's surprise — BIOKEY's processed tier was open all along on a community-deposited Figshare record while the EGA master was still gated. 40 anti-PD-1 breast cancer patients with R/NR + BRCA status: the project's treatment-causal exemplar.

**HTA12 imaging tier.** 12.26 GB DICOM via `s5cmd` against `s3://idc-open-data/`. One correction worth flagging: 21 PAAD patients, not the 295 the earlier blog claimed — 295 was the full multi-modal atlas; the imaging-only subset is much smaller.

**bi-2021-ccrcc.** User manual upload via scp from Broad SCP1288 (Google login, no DAR needed). 1 GB on disk.

**Real Goveia 2020 NSCLC-EC.** Pulled `E-MTAB-6308` to replace the fetal-lung mis-id. The fetal-lung-dev dataset that was previously labeled "goveia" is preserved separately at `A/fetal-lung-dev-dual-smad/` as its own row.

**Synapse PAT acquired and used.** Unlocked 2 of 9 intended cohorts (Launonen-2022-farkkila + hms-sorger-ovarian, ~8.13 GB combined). 6 HTAN sub-atlases still require HTAN Network team membership; TOPACIO is DUC-gated. The PAT alone turned out to be less powerful than expected — most Synapse-deposited HTAN cohorts also require an Atlas-side ACL grant.

**5 manifest mis-IDs resolved.** magen-2023-hcc PMID corrected to `37322116` (Magen Nat Med 2023); wang-2025-sclc-parpi dropped as hallucinated; goveia mis-id resolved (above); htapp-klughammer = HTA1-HTAPP dedupe; vazquez-garcia gets a dual-bucket A/D tag.

Manifest state, end of day:

| state | count |
|---|---|
| downloaded | 44 |
| partial | 6 |
| in-progress | 0 |
| blocked-confirmed | 15 |
| unsearched | 10 |
| **total manifest rows** | **75** |

## qc progress

QC is honestly split three ways. No glossing over it:

**30 cohorts standardized.** Phase 1–4 admits with full `qc_card.md` artifacts: cell counts, mitochondrial%, doublet flags, cluster labels. These are the rows that can already go into cross-cohort integration without further processing.

**11 admits need the Tier-2 scanpy pipeline.** BIOKEY, bi-2021, krishna, HTA1/4/8/11, vazquez-garcia, pei-min, erickson, HMS-Sorger. They have CCR8 quantification cards (which is what fed the Tier-1 table) but not the standard sc QC artifacts — MT% filtering, scrublet doublet calling, log-norm + HVG, CellTypist-harmonized labels. The Tier-2 subagent is running as of this post, writing to `logs/sc_qc_tier2_20260605/`.

**~20 cohorts with minimal or no QC.** Mostly the gated rows (HTA3/5/6/7/9/10, TOPACIO, Magness-Enfield) and the freshly-admitted format-specific stragglers. Some can't be QC'd because there's no data on disk; others (HMS-Sorger CycIF cell tables, HTA12 DICOM) are non-sc formats that need their own format-specific pipelines.

The important point: **for the Tier-1 result, QC heterogeneity doesn't break the analysis.** We're working at cohort-summary level — CCR8% from each cohort's existing card, HRD% from the TCGA backbone. Tier-2 standardization is what unblocks Tier-3 (cell-level scVI integration), not what Tier-1 needs.

A separate piece of progress worth noting under QC: the HRD scoring pipeline that produced the per-cancer baseline. 14,199 patients scored across TCGA + METABRIC + Jackson. OV at 56% → PRAD at 1% recapitulates Knijnenburg 2018 Fig 1 exactly. The R-scorer install (CHORD / HRDetect / scarHRD) is in flight in the user's terminal — when it lands it unlocks Tier-2.5 refinement, swapping the HR-gene-mutation strict proxy for a rigorous Birkbak-style score on METABRIC.

## plan forward

Three tiers, executing in parallel where possible:

**Tier 1 — done today.** Cohort-level joint-high prevalence. The table at the top of this post. Publishable as a single-figure result alongside a clear caveats section. Master at `logs/intersection_tier1_20260605/_master_intersection.tsv`; forest plot at `_forest_plot.png`; per-cohort `_status_updates.log` appended to `_index/status.tsv`. Tier-1 doesn't block on anything else.

**Tier 2 — running now, ~3–5 days wall-clock.** Standardize sc QC on the 11 newly-admitted cohorts plus pal-2021 and lambrechts-2018. Per-cohort scanpy pipeline (MT filter, scrublet, log-norm + HVG), CellTypist-harmonized cell-type labels so the Treg call is not author-label-dependent, unified patient-metadata schema (cancer / treatment / response / BRCA / HRD score) across cohorts. Output to `logs/sc_qc_tier2_20260605/_unified_patient_metadata.tsv`. The subagent is in flight.

**Tier 3 — week 2.** scVI or Harmony cross-cohort integration of the Tier-2-standardized cohorts. Per-cell CCR8+ Treg score × per-patient HRD score → individual-level (not cohort-level) (HRD-high × CCR8-eTreg-high) intersection. This is the paper's headline figure. Pre-requisites: Tier-2 standardization complete, R-scorer layer installed for rigorous Birkbak HRD on METABRIC.

Strategic asynchronous items, off the critical path:

- **TOPACIO DUC application drafted** at `_secrets/applications_2026-06-05/topacio_duc_draft.md`. Submission decision still pending. TOPACIO is niraparib + pembro in HGSOC — the project's single most trial-relevant external cohort.
- **HTAN Network team membership drafted** at `_secrets/applications_2026-06-05/htan_network_membership_draft.md`. Would unlock 1,302 patients across 6 HTAN sub-atlases.
- **5 EGA-gated cohorts** (liu-2022, maynard, kim-2020, stewart, couturier) are still blocked under the 2026-06-04 public-only pivot. Could pursue dbGaP/EGA DARs individually if the strategic gain justifies the bureaucratic cost; under current pivot they stay blocked.

## caveats

Five things any reviewer of the Tier-1 table should know up front:

1. **Cohort-level multiplicative estimate under independence.** No patient in any of these 15 cohorts has both axes measured individually — Tier-3 is what produces genuine per-patient pairing. Joint-high% here is the patient-equivalent expected fraction if HRD status and CCR8-Treg density are independent. Real concordance could be enriched (if HRD tumors recruit CCR8 Tregs) or depleted.
2. **Cancer-type proxy ≠ within-cohort HRD distribution.** Wu's TNBC-oversampled cohort, Pelka's MMRd/MMRp split, Luo's NACT-selected cohort may all diverge from the TCGA pan-cancer baseline for their cancer type. The Tier-1 number for those rows inherits the TCGA prior, not the cohort prior.
3. **CCR8 is chemistry-confounded.** 10x 3' under-reports vs SmartSeq2 by roughly 2×. Vazquez-García's 0.00% is almost certainly an inventory artifact — CCR8 was filtered from the column space of the CELLxGENE deposit — not biological zero. CosMx 1,000-plex panels omit CCR8 entirely, so any spatial-proteomic cohort using a CosMx 1k panel reads zero by construction.
4. **Wide Wilson CIs on small cohorts** (n=6–65 per row). Rankings between cohorts are interpretable; absolute joint-high percentages have a lot of room.
5. **Krishna ccRCC is unmappable** to the project's 12-cancer Knijnenburg subset. KIRC sits in the TCGA full backbone but not in the working subset used today; that row is deferred to the full Knijnenburg n=448 KIRC slice in a future run.

These are the project's first cross-axis numbers. They're noisy and provisional. They're also the first real data point telling us the (HRD × CCR8) intersection isn't vapor — it's at 4–13% in the cohorts where we can measure it, which is exactly the prevalence range a phase-2 stratifier trial would need to be powered for.
