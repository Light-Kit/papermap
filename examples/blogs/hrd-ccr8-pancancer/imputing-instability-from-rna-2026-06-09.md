---
title: 'imputing HRD and MSI from the transcriptome — folding scRNA-only cohorts into the map'
date: '2026-06-09 16:05 CT'
topics:
  - hrd
  - msi
  - pan-cancer
  - single-cell
  - genomic-instability
  - dataset-strategy
summary: 'paired scRNA + genomics is scarce (~200–400 HRD patients globally); bulk RNA + genomics is abundant. A model that reads HRD/MSI from expression lets scRNA-only cohorts carry an instability label into the pan-cancer analysis. The prior art (MSIsensor-RNA, IdentifiHR, expHRD), the design decisions (rank features, three-compartment views, leave-one-cancer-type-out validation), the cohorts, and the honest limits.'
starred: true
---

# imputing HRD and MSI from the transcriptome

[[beyond-hrd-instability-taxonomy-2026-06-09]] ends on a promise: if an instability state can be read from RNA, every scRNA-only cohort becomes assignable to a stratum on the map. This blog is whether that promise is keepable, and how to build it so the answer is trustworthy rather than merely plausible.

## the asymmetry that makes this worth doing

The binding constraint is the one [[paired-data-pan-cancer]] and [[matched-multi-omic-tumor-table]] keep running into: **same-patient paired data is rare**. Across every public source, the cohorts with single-cell RNA *and* genomic ground truth for HRD number only **~200–400 patients globally** — Luo 2024, MSK SPECTRUM, Pal 2021, a handful of HTAN sub-atlases, and little else.

Meanwhile, **bulk RNA + genomics is abundant**: TCGA (~11k, with derived HRD and MSI labels), HMF (~5k metastatic WGS+RNA), POG570, MET500, PCAWG. The asymmetry is the entire opportunity. If a model trained where labels are plentiful (bulk) can score where they are absent (scRNA-only cohorts), then the ~hundreds of single-cell atlases that will *never* have matched genomics can each be **imputed** an instability label and folded into the analysis. The scarcity is not a reason to give up on single-cell; it is the reason to build the bridge.

## it has been done — piecewise

This is not speculative. Three published predictors already cover the components:

| predictor | target | method | reported performance |
| --- | --- | --- | --- |
| **MSIsensor-RNA** (Jia 2024) | MSI | SVM on ~109 genes, TCGA-trained | bulk AUC ~0.997; **single-cell AUC ~0.96 on 23,902 cells** |
| **IdentifiHR** (Weir 2026) | HRD (HGSC) | penalized logistic, GIS ≥ 42 label | **AUC ~0.92 on pseudobulked scRNA** |
| **expHRD** (Lee 2024) | HRD (scarHRD score) | regression | **PCC ~0.86** vs genomic scar |

The two strongest pieces of prior art — MSIsensor-RNA and IdentifiHR — already do the exact move this project needs (**train on bulk, score single cells**), and both do it via **whole-sample / averaged pseudobulk**. That makes "match the training domain with whole-sample pseudobulk" the empirically-supported default, not a guess.

Two honest framings to carry from the start:

- **MSI is the easy target; HRD is the hard one.** MMR loss leaves a clean expression footprint (*MLH1* silencing) plus a strong immune-infiltration signal — RNA classifiers hit AUC ~0.90–0.98 (Li 2020, PreMSIm; Jia 2024). HRD's genomic scar is a *historical record*; expression captures current "BRCAness" / HR-pathway state, so expect lower, lineage-dependent performance — Tempus's RNA HRD model reported F1 ranging **0.62 (NSCLC) to 0.88 (prostate)** (Hsu 2022).
- **We predict a transcriptional *correlate*, not the scar.** Stated plainly so it cannot be quietly forgotten downstream.

## design decision 1 — what label to train against

HRD can be defined as a continuous genomic-scar score (scarHRD), a binary call (GIS ≥ 42, the Myriad operating point), the SBS3 signature, or BRCA1/2 biallelic loss. MSI as a continuous MSIsensor score or binary MSI-H.

**Recommendation: regress the continuous score, threshold afterward.** expHRD does exactly this. Training regression preserves information and — critically — lets you set the operating threshold *after* the bulk→single-cell transfer, when the score distribution has shifted domains. Binarizing up front throws away the gradient you most need when re-calibrating in the new domain. You still report the binary call clinicians act on; you just decouple "model" from "operating point."

## design decision 2 — the compartment tension (the crux)

The genomic event is **tumor-cell-intrinsic**. But the strongest predictive signal for MSI — immune infiltration — lives in the **microenvironment**. So which cells do you score?

- **(a) whole-sample pseudobulk** — mimics the bulk training domain; retains the immune context the model was trained to exploit. *This is what both scRNA-validated predictors did.* Con: confounded by composition — an immune-hot-for-other-reasons tumor can read as MSI.
- **(b) malignant-cells-only pseudobulk** — most faithful to the *biology* of the lesion; removes composition confounding. Con: discards the immune signal that powers MSI prediction, and creates a domain the bulk model never saw.
- **(c) two-component** — separate tumor-intrinsic (malignant-cell) and TME-context (immune/stromal) feature blocks; lets you state *which compartment drove each call*.

**Recommendation: default-score on whole-sample pseudobulk (matches the validated predictors), but always also compute the malignant-only and TME-only views, and use a two-component model for MSI.** Concordance across the three views builds trust; divergence localizes the confound — e.g., a high TME-only score with a low malignant-only score is the signature of an MSS-but-inflamed tumor being mislabeled. There is, notably, **no published systematic comparison of these three views for HRD/MSI transfer** — so this is a deliberate, novel piece of the design, flagged as such.

## design decision 3 — surviving the bulk→single-cell domain shift

scRNA differs from bulk in dropout, 3′ capture bias, composition, and platform. The corrections, strongest first:

1. **Pathway / gene-set scores as features, not single genes.** Aggregating dozens of genes averages out per-gene dropout. Highest-leverage single choice.
2. **Rank-based scoring** — singscore (Foroutan 2018), AUCell (Aibar 2017), UCell (Andreatta 2021), ssGSEA (Barbie 2009). These depend only on within-cell expression *ranks*, which is precisely what survives depth and 3′-bias differences. The rank-based 24-gene-pair HRD signature (Zhuang 2021) is built on this principle for exactly this reason.
3. **Common rank / quantile reference** so the bulk-trained model sees inputs on the distribution it expects.
4. **Noise-augmented training** — downsample counts and inject dropout on bulk, then re-pseudobulk, so the model trains on inputs that already look like noisy pseudobulk. (Synthesized design; no paper validates this exact augmentation for HRD/MSI transfer.)

## design decision 4 — the trust test (event, not tissue)

This is the one that separates a real predictor from a tissue detector. HRD and MSI prevalence are **steeply lineage-skewed** (HRD → ovarian/breast/pancreatic; MSI → endometrial/colorectal/gastric). A pan-cancer model can post a high pooled AUC by learning *cancer type as a proxy for prevalence* while learning nothing about the event. Kang 2022 makes this concrete — per-cancer-type AUROC ranged **0.53–0.99**.

**The decisive test is leave-one-cancer-type-out (LOCTO) validation, scored *within* each held-out lineage.** Hold an entire lineage out of training; if the model still separates HRD/MSI *inside* that held-out type, it reads the event. If AUC collapses, it was reading tissue. Pooled AUC can be inflated purely by between-lineage prevalence — so report per-lineage, never just pooled. Keep lineage as an explicit, ablatable covariate.

## design decision 5 — validating against a tiny paired set

Large labeled **bulk**, but only a handful of paired **scRNA + genomic** cohorts. Design for that asymmetry:

- **nested CV on bulk** for honest model selection;
- **external validation on the paired scRNA cohorts** — the *only* trustworthy estimate of the deployed bridge;
- **metrics matched to label**: for binary, AUC **plus calibration** (reliability curve, Brier) because thresholds drift across domains; for continuous, Spearman/Pearson against the genomic score;
- **three negative controls**: label-permutation (AUC → 0.5, guards leakage), lineage-only baseline (model must beat it, guards the tissue confound), random-gene-set (real signatures must outperform);
- **honest uncertainty**: bootstrap CIs, per-cohort reporting, and no point-estimate triumphalism at n ≈ 40.

The candidate validation cohorts (cross-checked against [[matched-multi-omic-tumor-table]]):

| cohort | cancer | ground truth | n | accession | why |
| --- | --- | --- | --- | --- | --- |
| **MSK SPECTRUM** (Vázquez-García 2022) | HGSOC | single-cell WGS (DLP+) HRD subtype **+** scRNA, same patients | 42 | syn25569736 | the single best validation set — genomic label *and* transcriptome at single-cell resolution |
| **Luo 2024** (project anchor) | HGSOC | WGS + HRD, neoadjuvant PARPi, + scRNA/scTCR | 30 | GSE222556 | validation-grade and treatment-exposed |
| **Pelka 2021** | CRC (MMRd/MMRp) | MMR / MSI status + WES + scRNA | 62 | GSE178341 / phs002407 | the MSI/dMMR validation analog |
| **Pal 2021** | breast, BRCA1 carriers | germline BRCA1 + scRNA | 21 | GSE161529 | HR-deficient genotype at single-cell resolution |

## design decision 6 — an orthogonal cross-check

Tools that infer copy-number from scRNA — **CopyKAT** (Gao 2021), **Numbat** (Gao 2023), the now-deprecated inferCNV — give an *independent*, single-cell-native readout of genomic instability (CNA burden) that does not depend on the bulk-trained model at all. Use them twice: to define the malignant-cell set, and as a cross-check — a high expression-predicted HRD score should co-occur with high inferred CNA burden in the malignant cells. Disagreement flags a likely false call. (Caveat: CNA burden is a proxy for *chromosomal* instability — overlapping but not identical to HRD, so treat concordance as corroborating, discordance as flag-for-review, not as a second ground truth. Benchmark: Brief Bioinform 2025, Numbat best with allele data, CopyKAT best expression-only.)

## the recommended pipeline, in eight bullets

1. **Train:** TCGA bulk (HRD labels from Knijnenburg 2018 / scarHRD; MSI from Bonneville 2017), extended with HMF, POG570, MET500, PCAWG.
2. **Label:** regress the continuous score (scarHRD / MSIsensor); threshold *after* transfer.
3. **Features:** rank-based pathway/program scores — the cheapest, most effective dropout fix.
4. **Compartments:** three views (whole / malignant-only / TME-only); two-component model for MSI.
5. **Model:** elastic net as the defensible default (the method behind expHRD / IdentifiHR / Kang 2022); gradient boosting as a capacity upgrade only if nested CV justifies it.
6. **Bridge:** noise-augment bulk training; normalize bulk and scRNA-pseudobulk to a common rank reference; score via whole-sample pseudobulk, reporting all three views.
7. **Validate:** nested CV → LOCTO (within-lineage AUC) → external paired scRNA cohorts with bootstrap CIs and calibration → three negative controls.
8. **Cross-check:** CopyKAT / Numbat CNA burden in malignant cells; concordance corroborates, discordance flags.

## a note on foundation models

The project's own FM vault (scGPT, Geneformer, scFoundation) is the tempting alternative feature source — embed the cells, predict the label off the embedding. Worth an experimental arm, but with eyes open: multiple benchmarks find **zero-shot FM embeddings can underperform a plain PCA / HVG baseline** without task fine-tuning (Kedzierska 2025; Cui 2024). So FM embeddings are an arm that must *beat* the elastic-net baseline to earn inclusion — not the default. And there is, as of this writing, **no published method that predicts HRD/SBS3 from FM embeddings** — a genuine gap, and a possible contribution.

## the honest limits

- **The ceiling is real.** ~200–400 HRD-paired single-cell patients globally bounds how precisely the *bridge* (not the bulk predictor) can ever be validated. Report it as a bound, not a point estimate.
- **No published end-to-end bridge exists.** MSIsensor-RNA and IdentifiHR validate the *components*; the full pipeline here (bulk-train → noise-augment → three-view score → LOCTO → CNA cross-check) is assembled from validated parts, not a replication of one workflow. That is the novelty and the risk in the same breath.
- **HRD ≠ the scar.** Every imputed HRD label is a transcriptional correlate. It is good enough to *stratify* scRNA-only cohorts onto the [[beyond-hrd-instability-taxonomy-2026-06-09]] map; it is not a substitute for genomic HRD testing.

## close

- The scarcity of paired data is the **argument for** imputation, not against single-cell.
- The move (train bulk → score scRNA) is **already demonstrated piecewise** — MSI cleanly, HRD partially.
- The design's whole job is to make the label **trustworthy**: rank features for the domain shift, three compartment views for the confound, **LOCTO** to prove event-not-tissue, CNA burden as an orthogonal check, and honest CIs at small n.
- The payoff: every scRNA-only cohort gets an instability label and **enters the taxonomy** — turning a few hundred paired patients into a pan-cancer map.
