---
title: 'The data we have to work with — every public PARPi-treated single-cell dataset, beyond the anchor'
date: '2026-06-02'
topics:
- dataset
- parpi
- hrd
- single-cell
- ovarian-cancer
- breast-cancer
- pancreatic-cancer
- resources
summary: 'An earlier draft of the [pan-cancer bet](the-pan-cancer-bet.md) called GSE222556 "essentially the only" public single-cell dataset from PARPi-treated patients. That is too tight. The honest map is: a bulk-multi-omics layer (TCGA + CPTAC + TCPA + GerkeLab/TCGAhrd) the project will live in; a small but non-trivial human PARPi-treated single-cell layer (the Luo HGSOC anchor + two sister GEO IDs from the same trial, plus spatial olaparib-maintenance HGSOC, plus two paired-timepoint clinical proteomics resources from TOPACIO and AMTEC); a real preclinical scRNA layer across TNBC, ovarian, PDAC, and SCLC including paired sensitive/resistant models and chronic-PARPi persister states; and pan-cancer single-cell validators (Zheng T-atlas, Cheng myeloid atlas). The pivotal trials whose PARPi-arm single-cell data would have changed the picture — PRIMA, SOLO, NOVA, POLO, MEDIOLA, NEOTALA, TALAPRO — are bulk-only in public space. The project remains HGSOC-anchored on the human treated side but has real cross-tumor scRNA leverage on the preclinical side.'
starred: true
---

When a reader works through the [pan-cancer bet](the-pan-cancer-bet.md) and the [chain blog](the-chain-from-broken-dna-to-broken-t-cells.md), the practical question that follows is: **what data is actually on the table right now?** This blog is the inventory.

Five layers, smallest to largest.

## Layer 1 — The bulk multi-omics arena (where Aims 1–4 live)

Three public resources do almost all the work:

- **TCGA pan-cancer** — 33 cancer types with matched RNA-seq, SNP array, and WES. The arena for HRD calls, signature scoring, and per-cancer cohort sizes that let the project move from per-tumor associations to pan-cancer mixed models. Accessed via the GDC.
- **CPTAC pan-cancer proteogenomics (2024 harmonized release)** — 10 cancer types, 1,043 patients, matched genomics + transcriptomics + proteomics + phosphoproteomics. The protein-level cross-validation layer for any transcript-level CCR8 / IFN / LAG3 finding.
- **TCPA** — RPPA companion to CPTAC; smaller panel, larger sample size; second proteomic readout for the same targets.

Two utilities save weeks:

- **GerkeLab/TCGAhrd** — pre-processed Knijnenburg HRDsum / LOH / LST / NtAI scores for 33 cancer types, 9,125 samples. Used directly in Aim 1.
- **expHRD** — RNA-seq-only HRD predictor that lets the project add HRD calls to ICI cohorts where SNP/WES is absent.

This layer is uncontroversial and almost off-the-shelf. The project will not break here.

## Layer 2 — Human PARPi-treated single-cell

Sparser than the bulk layer, but not as sparse as the earlier draft implied.

### The anchor and its sister deposits

The Luo et al. *Cell* 2024 cohort (NCT04507841 neoadjuvant niraparib HGSOC) deposits three companion accessions:

- **GSE222556** — the main 10x scRNA-seq cohort. The primary substrate for defining the eTreg / IFN signature before rolling it out pan-cancer.
- **GSE269793** — Singleron scRNA-seq from additional patients in the same trial. Platform-independence test for the signature.
- **GSE222555** — paired Singleron scTCR-seq. The substrate for testing whether terminal eTregs and terminally exhausted CD8 share TCR-defined microniches, not just frequency.

Together these three are the densest human PARPi-treated single-cell + clonotype resource in the public record.

### Other paired-timepoint human PARPi biopsies — but single-cell *protein*, not RNA

Two multi-patient resources offer paired pre-PARPi vs on-PARPi biopsies, both single-cell, but at the **protein** rather than transcript level. They are not interchangeable with scRNA-seq:

- **Färkkilä et al. *Nat Commun* 2020 (TOPACIO; NCT02657889)** — recurrent ovarian, niraparib + pembrolizumab, 62 patients with t-CyCIF highly-multiplexed immunofluorescence. The IFN-response signature and the Treg fraction co-rise under treatment — the pre-Luo foreshadow of the Cell 2024 mechanism. Data on GitHub `farkkilab/pubs`; *no scRNA-seq deposit*.
- **Mitri et al. *medRxiv* 2024 (AMTEC)** — BRCA-WT metastatic TNBC, olaparib mono → olaparib + durvalumab, ~10 patients with serial biopsies. Spatial single-cell proteomics (CyCIF/mIHC) + bulk RNA + WES. Hosted in HTAN-OHSU. Worth running as the **negative control** for the pan-cancer claim: BRCA-WT mTNBC is HRD-low, so if the IFN→CCR8 chain still fires there, the claim is more genomic-scar-independent than the Luo HGSOC story alone implies; if it doesn't fire, the chain depends on HRD-deep tumors.

### Spatial transcriptomics under PARPi maintenance

- **GSE288483** — Visium-class spatial transcriptomics, olaparib-maintenance HGSOC. Deposited September 2025; no anchor publication as of this writing — re-verify when the paper lands. The closest public spatial complement to the Luo dissociated scRNA: useful for asking whether CCR8⁺ eTregs and exhausted CD8 are *physically* co-located, which dissociated scRNA cannot answer.

So the honest claim is: **GSE222556 + sisters is the only large, paired-timepoint, multi-platform human PARPi scRNA+TCR resource, and it is HGSOC-only.** The other human resources are smaller, protein-level, or HRD-WT.

## Layer 3 — Preclinical PARPi scRNA (the actual cross-tumor leverage)

This is where the search materially changed the picture. Public preclinical scRNA under PARPi covers TNBC, ovarian, PDAC, and SCLC — across HRD-high and HRD-low tumors, sensitive and resistant models, acute and chronic dosing.

- **Liang et al. *Nat Commun* 2024 (TAM_C3 / C5aR1 axis)** — paired PARPi-sensitive (LPA1-T22) vs PARPi-resistant (LPA1-T127) syngeneic TNBC plus the KPCA syngeneic ovarian model. Olaparib + AZD5305 (PARP1-selective) on a 4 / 8 / 20-day timecourse with >30,000 cells in the main experiment. The cleanest public dataset for *"what does the TME look like when a PARPi-naive sensitive tumor becomes resistant"* — directly relevant to the project's question of whether CCR8⁺ eTregs load or unload at resistance.
- **GSE276238 — Wang et al. *Mol Cancer Ther* 2025 (PDAC)** — mouse syngeneic PDAC (KPC-derived) with a full 4-arm design (vehicle / olaparib / radiotherapy / olaparib + RT) plus anti-PD-L1 combination. The only public PDAC PARPi scRNA dataset found. Tests the IFN→CD8 chain in a tumor type that is mostly HRD-low — a specificity test for the project's chain.
- **del Pino Herrera et al. bioRxiv 2025 (OVCAR3 persister)** — OVCAR3 (BRCA1-mut HGSOC line) under 2-month chronic olaparib, scRNA + RNA velocity comparing naive vs persister states. Tumor-cell-intrinsic only, no microenvironment. The cleanest map of the PARPi-persister cell state, complementing Liang's microenvironment-resolved resistance map.
- **Wang et al. *Nat Commun* 2025 (SCLC)** — mouse syngeneic SCLC + PDX, olaparib + RT + anti-PD-L1, scRNA + cGAS-STING readout. The only SCLC PARPi single-cell study found. SCLC has high baseline cytosolic DNA from replication stress but is largely HRD-low by genomic-scar — so the chain firing here would *separate* HRD-driven from cytosolic-DNA-driven IFN in the project's mechanistic argument.
- **Khan et al. *Nat Immunol* 2026 (host T-cell PARPi)** — mouse TIL scRNA across olaparib, niraparib, talazoparib showing PARPi expands the CD8 central-memory compartment via *host* DNA-damage signaling. The important caveat the project has to address: PARPi effects seen in TCGA bulk RNA could be host-immune-cell-intrinsic rather than tumor-IFN-driven.

Two foundational predecessors are worth keeping in the corpus even though they're not scRNA-seq:

- **Pantelidou et al. *Cancer Discov* 2019** — KB1P (K14cre-Brca1fl/fl-Trp53fl/fl) GEMM, olaparib activates STING in vivo in BRCA1-null TNBC. The mechanistic precedent every PARPi-IO paper cites.
- **Zhang et al. *Theranostics* 2021** — scRNA atlas of BRCA1-KO mouse mammary tumors across four molecular subtypes with subtype-resolved olaparib sensitivity. Useful as the "PARPi-responder TME" reference, though resistance trajectories are not the focus.

## Layer 4 — Pan-cancer single-cell validators

These are not PARPi-treated but they are how the project will check that bulk-deconvolved signals correspond to real cells:

- **Zheng et al. *Science* 2021** — pan-cancer T-cell atlas, 21 cancer types, 316 patients, ~390k T cells with paired TCR. The single-cell substrate for confirming CCR8 marks intratumoral eTregs across tumor types and for supplying per-cancer eTreg fractions.
- **Cheng et al. *Cell* 2021** — pan-cancer myeloid atlas. The DC and macrophage reference for asking how the DC–Treg conversation looks in HRD vs HRP samples.

## Layer 5 — What is *not* public, and what the project therefore cannot do

Honest list of holes:

- **No public scRNA from PRIMA, SOLO-1/2, NOVA** (pivotal ovarian PARPi-maintenance trials). All bulk + outcome.
- **No public scRNA from POLO** (olaparib BRCA pancreas maintenance). Bulk biomarker only.
- **No public scRNA from MEDIOLA** (olaparib + durvalumab BRCA breast). Multiplex IF only in published outputs.
- **No public scRNA from NEOTALA** (talazoparib gBRCA TNBC neoadjuvant). Bulk + WES.
- **No public scRNA from TALAPRO-1/2** (talazoparib mCRPC). Bulk + WES.
- **No public PARPi-arm scRNA from any ATR / WEE1 / CHK1 combination trial** (e.g., OLAPCO ceralasertib + olaparib).
- **No PARPi compound in the sci-Plex original (GSE139944).** sci-Plex screens 188 compounds in A549/K562/MCF7 — olaparib was not among them. So no public sci-Plex PARPi dose-response single-cell data exists.

What this means concretely: the project cannot run a **PARPi-treated × outcome-paired** scRNA analysis at any scale beyond the Luo cohort. The pan-cancer claim has to be made by **stratification plus signal concordance**, framed as hypothesis-generating for a future trial — exactly as the [pan-cancer bet](the-pan-cancer-bet.md) already states.

## What this changes for the project

Three updates to the analysis plan:

1. **Aim 1 (HRD landscape) is unchanged.** Bulk-RNA + GerkeLab/TCGAhrd was always the spine.
2. **Aim 2 (CCR8/IFN deconvolution) gains genuine cross-tumor preclinical scRNA validators**. GSE276238 (PDAC) and Wang 2025 (SCLC) test whether the chain fires in HRD-low tumors. Liang 2024 (TNBC + ovarian) tests whether the chain modulates at resistance. The bulk-RNA claim no longer has to lean entirely on cross-tumor inference.
3. **Aim 6 (translational hypothesis) gains an important caveat surface**. Khan 2026 means the project has to argue why a TCGA-bulk-RNA CCR8 signal is tumor-intrinsic mechanism rather than peripheral-T-cell-trafficking artifact — and the AMTEC paired biopsies are the obvious negative control. Both belong in the discussion.

The headline: the project is still HGSOC-anchored on the *human treated* side, but it now has real preclinical scRNA leverage across TNBC, PDAC, SCLC, plus persister states — which is the level of cross-tumor data the chain needs to be stress-tested against before the [pan-cancer bet](the-pan-cancer-bet.md) makes sense as a stratifier rather than a generalization.
