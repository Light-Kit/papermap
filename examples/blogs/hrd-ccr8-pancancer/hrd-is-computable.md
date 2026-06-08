---
title: 'HRD is computable, but which HRD?'
date: '2026-06-03 14:57 CT'
topics:
  - hrd
  - pan-cancer
  - label-imputation
  - scorer-disagreement
  - model-design
summary: 'a short note — HRD doesn''t need an annotation, you can compute it from the raw genome. but every computed call inherits the scorer you trained against, so the concordance vector beats picking one.'
starred: true
---

# HRD is computable, but which HRD?

A small clarification that came up in conversation, worth saving as its own note. It tightens [[outcome-first]] and explains why the genomic encoder in [[one-model-many-archetypes]] takes a four-scorer concordance vector instead of a single HRD call.

## the easy half

You don't need an "is this HRD?" annotation to work with HRD. The label is computable from the raw data — for the modalities that carry the signal:

| modality | HRD call works? | what reads it |
| --- | --- | --- |
| WGS | yes, well | HRDetect, CHORD, CSI-HRD, scarHRD all run end-to-end from a tumor-normal WGS pair. They read SBS3 (deletion-microhomology), large-rearrangement patterns, and genome-wide LOH structure. |
| WES | partial | scarHRD-style scores still work, but you lose most of SBS3. Weaker call. |
| panel DNA | gene-level only | You catch BRCA1/2/PALB2/RAD51/ATM mutation status. You miss most BRCAness — functional HRD without a recognized HR-gene mutation. You also keep reversion-mutant tumors that look HR-mutant on paper but aren't functionally HRD anymore. |
| bulk RNA | trainable imputation | BRCAness signatures exist (Severson, Peng, etc.) but are noisier than genomic calls and biased toward the training cohort. |
| sc-RNA | weak | No clean HRD signal at single-cell level. Pseudobulk imputation is possible but lossy. |
| spatial | essentially none | Spot/pixel-level data carries no direct HRD signal. |

So for the discovery cohorts that matter — TCGA, HMF, PCAWG, CPTAC — HRD is *already* present, whether or not anyone called it. We compute it.

## the catch

"Computing HRD" is not the same as "knowing HRD." It is **computing one scorer's definition of HRD**. HRDetect's HRD ≠ CHORD's HRD ≠ "has a BRCA1/2 mutation." The four scorers were trained against different anchors (BRCA1/2-mutant tumors, BRCAness phenotypes, functional assays) on different cohorts (HRDetect breast-heavy, CHORD pan-cancer, etc.). They disagree on concrete tumors — and the disagreement is not noise, it is genuine difference in what the scorers are measuring.

So if you train a single imputer "predict whether this tumor is HRD" against scorer X, you have not predicted HRD. You have predicted scorer X's HRD. The same tumor would get a different answer under scorer Y.

## why this matters for the project

This is exactly why the genomic encoder in [[one-model-many-archetypes]] takes a **concordance vector** — all four scorer outputs as separate inputs — rather than collapsing to one call. And it is why [[outcome-first]] makes HRD a feature, not a filter. If even the label is contested:

1. Train the model to *predict response*, not to *predict HRD*. Response is the only ground truth that doesn't inherit a scorer choice.
2. When the scores are computable (WGS, WES), feed all four. The model sees the disagreement.
3. When they are not (panel-only, RNA-only, spatial-only), let the model impute — but as four separate imputations, one per scorer, and treat their disagreement as signal.

## short answer

Yes, HRD is computable from the data, especially WGS — you don't need pre-existing annotation. No, there is no "HRD ground truth" you are computing; you are computing one scorer's call, and the four scorers disagree on real tumors. The model should never see a single HRD label. It should see four, and learn what their disagreement means.

That is the whole reason for the concordance vector.
