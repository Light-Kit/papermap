---
title: 'who else is doing this — a positioning map'
date: '2026-06-03 19:57 UTC'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - positioning
  - similar-work
  - foundation-models
summary: 'a five-bucket map of who else is asking the genomics × TME × treatment-response question pan-cancer — MOSAIC (Owkin), Bagaev BostonGene MFP, Bruand BRCA1-STING, Qiu HRD-vs-HRP, PORPOISE, DragonNet, PRECISE/TRANSACT. what each is, what they did, where we differentiate.'
starred: true
---

# who else is doing this

[[paired-data-pan-cancer]] and [[more-paired-data-cohorts]] answer "what data exists." They don't answer "who else is doing what we're doing." This blog is that map.

It matters because "novelty" is the question every reviewer and every grant officer asks, and "we've never seen anyone publish this" is a bad answer when the truth is "we haven't looked." A second search round turned up five distinct kinds of work to position against — competitors, mechanistic anchors, architectural precedents, methodological foundations, and adjacent industry efforts. The honest read is that none of them solve the project's exact problem, but several of them solve clearly-related problems, and we owe ourselves a clear statement of where we differ.

## five buckets

Roughly:

1. **Industry pan-cancer multi-modal cohorts.** Companies / consortia building patient-level paired-modality data at scale. The closest cohort to what we describe in Tier 4.
2. **Academic multimodal pathology + omics + outcome FMs.** Mahmood lab and adjacent groups; pan-cancer multimodal models that predict survival.
3. **Pan-cancer immune / TME classifiers.** Methods that stratify patients on TME state pan-cancer — direct competitors for the "stratifier" output.
4. **HRD-specific TME / immune work.** Mechanistic studies and direct HRD-eTreg observations — the closest substantive priors.
5. **Causal / CATE methods for treatment response.** The methodological foundation under the response head.

## bucket 1 — industry cohorts

The one to know is **MOSAIC** (Owkin + Gustave Roussy + Pitt + CHUV + Erlangen + Charité + NanoString). $50M. 7-cancer (NSCLC, TNBC, DLBCL, OV, GBM, mesothelioma, bladder). Visium + Chromium Flex snRNA + bulk RNA + WES + H&E on the same patient. Target 7,000; ~2,500 collected; 60 in MOSAIC-Window (on EGA, controlled access). It's not WGS — that limits HRD-signature resolution — but it's the largest paired pan-cancer multi-modal cohort outside the HTAN federation.

Around MOSAIC there are several others: **Tempus** (xT 648-gene + xR whole-transcriptome + xH WGS launched 2026 heme), **Caris POA** (DNA + WTS + 23k-gene protein + outcomes on 740k+ patients), **Tahoe-100M** (perturbation atlas — different shape, useful for the drug-response branch), and a long tail of company claims (Owkin's "MOTRY"/"RlearnCT" product names don't return peer-reviewed papers — flag as claim, not citation).

What this means for us: we can't rebuild MOSAIC. But the project shape — "use HTAN at full-tuple, use TCGA/HMF for power, bridge with Tier 2–3" — is the answer to *not having* MOSAIC. Position MOSAIC as a comparator cohort we don't have access to, and lean on the bridging logic.

## bucket 2 — academic multimodal FMs

**PORPOISE** (Chen 2022, Cancer Cell — Mahmood lab) is the closest published architectural precedent. Pan-cancer, 14 TCGA types, fuses WSI + bulk RNA + mutation + CNV through attention MIL, predicts survival, attribution at the patch level. The Mahmood ecosystem around it — UNI, CONCH, TANGLE, MUSK, MADELEINE, PathChat, KEEP — gives you a complete pathology-encoder stack you can plug in instead of training from scratch. **MCAT** (Chen 2021, ICCV) is the origin of cross-modal attention for path × omics. **SurvPath** (Jaume 2024, CVPR) tokenizes pathways and runs WSI patches × pathway tokens — useful as an ablation for our MoE experts. **HEALNet** (Hemker 2024, NeurIPS) is the realistic answer to ragged real-world cohorts where not every patient has every modality.

Where we differ: PORPOISE is *prognostic* (survival), not *predictive* (treatment effect). It uses bulk genomics, not WGS scars or spatial. And there's no MoE — it's a single fused embedding. The combination of (WGS scar features + spatial + DragonNet CATE head + MoE archetypes) is the gap.

## bucket 3 — pan-cancer immune / TME classifiers

This is where the direct competition lives. **BostonGene MFP** (Bagaev 2021, Cancer Cell) is the canonical pan-cancer TME stratifier — a 29-gene ssGSEA signature collapses 20+ cancer types into 4 conserved subtypes (IE / IE-F / F / D) that predict ICI response. **EcoTyper** (Newman/Steen/Luca 2021, Cell) decomposes bulk + scRNA into cell states and recurring "ecotypes." **Thorsson 2018** (TCGA Pan-Immune Working Group) gave the field its first 6-subtype pan-cancer immune classification on 10k TCGA tumors and is the immune sibling of `knijnenburg-2018` (which is in our vault for DDR). **Charoentong TCIA** packages an Immunophenoscore for ICI prediction pan-cancer.

Among these, Bagaev MFP is the one we have to benchmark against. It's bulk-only (no genomic axis, no spatial, no causal head), but it's published, validated, and adopted enough that "we beat MFP at predicting response" is a clean claim. The differentiation is concrete: MFP has *no genomic input*. Our genomic encoder takes a four-scorer HRD concordance vector ([[hrd-is-computable]]) plus copy-number signatures plus HR-gene state. That's the axis MFP can't see.

## bucket 4 — HRD-specific TME / immune work

Two findings here matter more than the others.

**Bruand 2021** (Konstantinopoulos lab, Cell Reports) shows that BRCA1-deficient ovarian tumors have **cell-autonomous STING-driven inflammation** that also upregulates VEGF-A and drives immune resistance; STING knockout restores response to dual ICB. This is the mechanistic anchor for the HRD → STING → IFN → immune-resistance bridge that [[outcome-first]] hand-waves. It belongs cited up front, not in a corner.

**Qiu 2024** (Adv Sci) is awkwardly close. They did scRNA + scTCR on 5 HRD vs 3 HRP HGSOC and found exactly what we expect: HRD tumors are enriched for FGFR1+PDGFRβ+ myCAFs, M1 macrophages, and **tumor-reactive CD4+ Tregs**. That last category is precisely the CCR8 eTreg story. The N is 8 patients. The disease is ovarian only. The framing is descriptive. The closest competitive read is that Qiu independently confirmed the CCR8-eTreg-in-HRD pattern at the cell-state level, and we are the pan-cancer + treatment-causal extension. We should cite this, not pretend it didn't exist.

Also in this bucket: **Drews 2022 CIN signatures** (Markowetz, Nature) — 17 copy-number signatures across 7,880 tumors and 33 types, predicting drug response. Direct pan-cancer extension of Macintyre 2018. This is a natural input feature for the genomic encoder alongside SBS3.

## bucket 5 — causal / CATE methods

Architectural foundations the project already implicitly uses. **DragonNet** (Shi 2019, NeurIPS) is the namesake of the CATE head — propensity + outcome heads + targeted regularization for treatment effect from observational data. **X-learner** (Künzel 2019, PNAS) is the standard baseline for imbalanced treated/control (which PARPi cohorts are, by selection). **PRECISE** (Mourragui 2021) and its non-linear successor **TRANSACT** are the cell-line-to-patient drug-response transfer methods that make the project's "use PRISM/GDSC PARPi sensitivities to anchor the response head" plausible. **DeepCDR** is the multi-omic drug-response baseline. **TARNet**, **Causal Forests**, **DeepIV** belong in the related-work paragraph.

These are not competitors. They are foundations. The framing should be "we extend DragonNet to multimodal cancer-genomics inputs with MoE routing." Cite, don't differentiate.

## the top 5 to read

If the user only reads five papers from this round:

1. **Bagaev 2021 MFP** — direct competitor; benchmark against.
2. **Bruand 2021 BRCA1-STING** — mechanistic anchor; cite up front.
3. **Qiu 2024 HRD-vs-HRP TME** — independent confirmation of the CCR8-eTreg-in-HRD pattern.
4. **Chen 2022 PORPOISE** — closest architectural precedent.
5. **MOSAIC (Owkin)** — the comparator cohort we don't have access to.

## differentiation in one line each

- **vs Bagaev MFP**: bulk-only, 29-gene ssGSEA, no genomic axis. We add WGS scars × scRNA cell states × spatial × DragonNet CATE.
- **vs Bruand**: mechanistic mouse + small human cohort. We're the population-scale, pan-cancer, treatment-causal extension.
- **vs Qiu**: 8 patients, ovarian, descriptive. We're pan-cancer, N in the thousands, with a treatment-effect head.
- **vs PORPOISE**: path + omics → survival (prognostic). We're path + WGS + RNA + sc + spatial → PARPi CATE (predictive), with MoE for archetypes.
- **vs MOSAIC**: their advantage is paired-cohort scale. Ours is HRD genomic axis + treatment-causality on what's already public. We're not competing on cohort size; we're competing on question shape.

## what we are not

Worth saying explicitly:

- We are **not** a pathology foundation model. UNI / CONCH / Virchow exist; we use them.
- We are **not** a pan-cancer immune-state classifier. MFP / EcoTyper / Thorsson exist; we benchmark against them.
- We are **not** a mechanistic HRD-immunology paper. Bruand / Qiu / Färkkilä do that; we cite them.
- We are **not** a single-cell atlas. HTAN / HCA / CellxGene do that; we consume them.

We **are**: pan-cancer, paired multi-modal (WGS + RNA + sc + spatial + clinical), HRD-as-feature ([[hrd-is-computable]]), treatment-causal ([[outcome-first]]), bridging tiers ([[paired-data-pan-cancer]]), MoE routing over archetypes ([[one-model-many-archetypes]]). The combination is the contribution, not any single piece.

## what changes for the project

Three concrete actions fall out of this map:

1. **Add the top five to the vault and cite them up front.** Bagaev, Bruand, Qiu, PORPOISE, MOSAIC — these are the names the positioning section of any future write-up should start with.
2. **Plan an MFP benchmark.** Overlay Bagaev's 4-cluster labels on whatever pan-cancer cohort we run on first, and report the comparison. "Does HRD × IFN/eTreg add resolution beyond IE/IE-F/F/D?" is the falsification test.
3. **Cite DragonNet / PRECISE / TRANSACT in the methods paragraph.** Not differentiation — foundation. Skipping the citation would look like we hadn't read them.
