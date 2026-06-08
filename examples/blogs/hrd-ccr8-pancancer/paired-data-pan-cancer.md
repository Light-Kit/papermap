---
title: 'paired-data — searching pan-cancer public corpora for tumor genomics × TME'
date: '2026-06-03 14:57 CT'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - paired-data
  - dataset-strategy
summary: 'a five-tier map of what paired multi-modal public data exists for genomic-event × TME studies, why "paired" is the whole game, and where the bridge between high-N bulk and low-N spatial actually lives.'
starred: true
---

# paired-data — pan-cancer search for tumor genomics × TME

A note about how to search public pan-cancer data when the real question is **how genomic events interact with the tumor microenvironment** — HRD, LOH, BRCA loss, HLA loss, IFN/STING loss, oncogene amplification, on one side; CD8 exhaustion, suppressive macrophages, stromal exclusion, IFN-driven inflammation, on the other.

The structural difficulty is not "what data exists." It is **what data exists *on the same patient*** across the modalities you need. That constraint collapses the public landscape by orders of magnitude.

This blog maps that collapsed landscape and proposes a search strategy. It sits next to [[the-five-layer-dataset-plan]] (which is HRD-genomics-first) and supports [[outcome-first]] (which needs paired multi-modal data on PARPi-treated patients to work at all).

## the ideal stack

The eight modalities that together answer the genomics × TME question:

| modality | what it tells you |
| --- | --- |
| WES / WGS / SNP / CNV array | mutations, copy-number, LOH, HRD score, HLA loss, neoantigen load — *what happened to the tumor genome* |
| bulk RNA-seq | immune signatures, pathway scores, IFN response, antigen presentation — averaged over tumor + TME cells |
| scRNA-seq | cell-type-resolved programs — tumor vs T vs macrophage vs CAF vs endothelial — *which cells respond* |
| scDNA-seq / inferCNV from scRNA | links genomic alterations to specific malignant clones — *this clone, this TME state* |
| multiome / scATAC | chromatin accessibility, TF circuits driving immune evasion / IFN response / stromal remodeling |
| spatial transcriptomics (Visium, Slide-seq) | tumor–immune–stromal physical organization at niche scale |
| spatial proteomics (IMC, CODEX, MIBI, mIF) | protein-level immune phenotype in space — PD-1, PD-L1, CD8, FOXP3, HLA, STING |
| H&E / histology | morphology, architecture, necrosis, stromal barriers, vessel patterns — *and* the substrate for multimodal histology × molecular models |

The compact framing: **genomics says what happened, sc says which cells respond, spatial says whether they physically interact.**

## the paired-data constraint

Most public corpora are *modality-deep but patient-shallow* — a beautiful sc atlas with no matched WGS, or a 10k-patient WGS resource with no spatial. The moment you require the *same patient* (and ideally the same tissue piece) to be profiled across multiple modalities, you go from "the public landscape" to a handful of cohorts.

This is not a complaint. It is the project's central data-strategy problem.

## the five-tier map

| tier | modality tuple on same patient | who has it |
| --- | --- | --- |
| 1 — workhorses (high-N, low resolution) | WES/WGS + bulk RNA + clinical | TCGA (~11k pan-cancer), PCAWG (~2.8k WGS+RNA), HMF (~5k metastatic WGS+RNA+treatment), CPTAC (~1k +proteomics), POG570 (BC Cancer metastatic). MSK-CHORD adds outcome at panel level (~25k). |
| 2 — sc paired with genomics | WGS/WES + scRNA on same patient | Vázquez-García 2022 (HGSOC, ~42 matched), Bassez 2021 BIOKEY (breast IO, pre/post), Wu/Swarbrick 2021 (breast), Olbrecht 2021 (HGSOC subset), Pal 2021 (BRCA1 carriers), Hwang 2022 (PDAC). All cancer-type-specific. |
| 3 — spatial paired with genomics | WGS + spatial on same patient | Stur 2022 (HGSOC Visium + WGS subset), Launonen 2022 (mIF + HRD), 10x public, scattered Visium+WGS papers. Very few. |
| 4 — full tuple | genomic + sc + spatial all on same patient | **HTAN** (Human Tumor Atlas Network) is the only thing built for this purpose — BRCA, CRC, OVARIAN, PDAC, BRAIN, PRE-CANCER, PEDIATRIC atlases, plus Hwang 2022 PDAC. Total N across all public sources here is probably <500 patients globally. |
| 5 — treatment-exposed multi-modal | tier 2 or 4 + clinical response | BIOKEY (pre/post anti-PD-1 breast), NEONIPI CRC, neoadjuvant breast cohorts. The only place "genomic event → TME state → response" can be directly tested. |

## what each tier is actually for

- **Tier 1** is where genomic events get statistical power. "Does HRD shift the bulk-RNA IFN signature pan-cancer?" — that's a TCGA × HMF question, N in the thousands, answer in days.
- **Tier 2** is where you localize the signal to cell types. "Among HRD+ tumors, is the IFN signal coming from malignant cells, macrophages, or CD8?" needs Vázquez-García-style matched WGS + scRNA, and the answer is cancer-type-specific.
- **Tier 3** is where you ask about organization. "Are HRD-positive malignant niches closer to CD8 infiltrate or to immune-excluded CAF zones?" needs Visium + WGS, and the answer requires per-niche genomic calls.
- **Tier 4** is the grounding layer. HTAN's atlases are the only place all three resolutions live on the same patient. Small N, but this is where mechanism gets grounded.
- **Tier 5** is the causality test. Without paired pre/post treatment data, you can describe correlations but you cannot separate "TME state that causes response" from "TME state that coincides with the genomic event."

## why HTAN is the backbone for this question

HTAN is the only public resource explicitly designed for paired pan-cancer multi-modal collection. WGS + scRNA + spatial *on the same patient* across multiple cancer types, by construction. For a project that takes "genomics × TME on the same patient" as its primary unit of analysis, HTAN is the structural backbone — TCGA / HMF are the high-N flanks.

This inverts the usual instinct ("start with TCGA"). For genomics-only questions, TCGA is the right starting point. For genomics × TME questions, HTAN is.

## search strategy — modality-tuple-first

Two practical axes worth indexing on, beyond cancer type:

1. **Search by modality tuple, not by cancer type.** The question is *which genomic events drive which TME states*, which is cancer-type-secondary. Tuple-first scoping ("which cohorts have ≥30 patients with paired WGS + scRNA + spatial?") answers "is this question even tractable" before you commit to a tissue.
2. **Search by treatment exposure.** Untreated → treated paired cohorts (especially IO and PARPi) are where the genomic-event → TME-state → response chain can be tested. Most untreated atlases describe correlations and can't distinguish causation. BIOKEY-style designs are the ones that matter most for the [[outcome-first]] reframe.

## the bridge — what the project shape actually is

The honest constraint: tier 4 (full paired tuple) is globally <500 patients across all public sources. For most genomic events of interest, you will have *either* high-N bulk pan-cancer (TCGA, HMF) *or* low-N sc + spatial (HTAN, single-cancer-type cohorts). You will not have both.

The project shape, then, is **bridging tiers**, not picking one:

- Tier 1 detects the signal — does HRD / HLA-loss / IFN-loss change bulk TME-related signatures, where, and by how much?
- Tier 2–3 localizes it — at what cell-type or niche level does the signal live?
- Tier 4 mechanizes it — when all three resolutions are stacked on the same patient, what is the actual co-variation?
- Tier 5 tests causality — do these genomic-event-driven TME shifts predict treatment response when paired pre/post data exists?

This is also what [[one-model-many-archetypes]] is structured for. Cross-modal attention with masked-modality training assumes paired-data scarcity from the start — it is built to learn from tier 1 at scale, tier 2–3 in cancer-type-specific cohorts, and tier 4 as the joint grounding layer.

## close

The shortest version of the search strategy:

- index public corpora by **modality tuple on the same patient**, not by cancer type
- treat HTAN as the structural backbone for genomics × TME, and TCGA / HMF as the high-N flanks
- prioritize **treatment-exposed paired cohorts** (BIOKEY, NEONIPI, neoadjuvant) because that is where causality lives
- accept that bridging tiers is the project shape — no single dataset will answer the question
