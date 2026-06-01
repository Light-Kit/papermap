---
title: 'The six aims, walked through — what the analysis actually does'
date: '2026-05-28'
topics:
- hrd
- ccr8
- pan-cancer
- multi-omics
- proteomics
- single-cell
- immunotherapy
summary: 'A linear walk through Aims 1–6. Aim 1 nails down which HRD definition we''re using and why we run all of them in parallel. Aim 2 maps the eTreg/IFN program against HRD pan-cancer. Aim 3 is the decisive step — confounder control proving the enrichment is specific to HRD/IFN, not a byproduct of "HRD tumors have more immune cells." Aim 4 defines the 2D and 3D stratifiers. Aim 5 cross-validates at proteomic and single-cell resolution. Aim 6 tests the translational signal against public ICI cohorts. The point throughout: stratifier, not story.'
---

The literature review across [Thread 1](thread-1-hrd-parpi-and-the-immune-shadow.md), [Thread 2](thread-2-the-ifn-bridge.md), and [Thread 3](thread-3-ccr8-and-the-treg-target.md) maps the biology. This essay walks the analysis that converts the biology into a stratifier.

## Aim 1 — Multi-definition HRD with sensitivity analysis

The first move is to refuse to use a single HRD definition. Four definitions in parallel:

- **Genomic scar** — Knijnenburg 2018 HRDsum (LOH + LST + TAI), already pre-processed for 9,125 TCGA samples via GerkeLab/TCGAhrd. Used as the primary, with tumor-type-specific cutpoints — the npj Precision Oncology 2022 paper's per-cancer optimal thresholds are the prior, with sensitivity analysis on ±5 around each.
- **HRR gene status** — biallelic vs monoallelic inactivation of BRCA1, BRCA2, and the broader HR pathway. BRCA1-mutant vs BRCA2-mutant vs BRCA1-promoter-methylated are analyzed separately. Monoallelic carriers are treated as a third category, expected to behave intermediate.
- **Mutational signature SBS3** — orthogonal to HRDsum because it derives from SNV patterns rather than copy-number scars. Used to test cross-definition concordance.
- **expHRD** — transcriptome-based, cohort-independent. Critical for ICI cohorts where SNP/WES is unavailable.

Output: a four-dimensional HRD label per sample, plus the cross-definition agreement structure. Disagreement between HRDsum and SBS3 in cancer type X is itself a result, and the project reports it rather than averaging it out.

## Aim 2 — Pan-cancer mapping of the eTreg/IFN program vs HRD

eTreg quantification uses the **Cell 2024 terminal eTreg signature** (CCR8 + LAG3 + TNFRSF18 + accompanying markers from Luo 2024), scored via ssGSEA on TCGA bulk RNA. Cross-checked against immune deconvolution (CIBERSORTx) and against direct CCR8 expression.

IFN program uses the Hallmark INTERFERON_ALPHA_RESPONSE signature scored the same way. Where single-cell data are available (Zheng 2021, GSE222556), the tumor-cell MHC-II^hi state is estimated directly.

Statistics: associations tested within each cancer type and in a pan-cancer mixed model with cancer type as a random effect. Effect sizes are reported with confidence intervals, not just p-values. The output is a per-cancer heatmap of HRD-eTreg-IFN correlation strengths.

## Aim 3 — Confounder control and the specificity claim

This is the load-bearing step. The Sci Rep 2023 and Human Cell 2021 papers already establish a broad HRD-immune correlation; the project's contribution starts where their analyses stop.

Three confounders are mandatory:

- **Total immune infiltrate** — HRD tumors have more T cells. The question is whether the CCR8⁺ eTreg fraction is disproportionately enriched, not whether the absolute count is. Total CD3⁺ infiltrate is included as a covariate.
- **Tumor mutational burden (TMB)** — HRD tumors are often high-TMB; high-TMB tumors are immunogenic for reasons independent of HRD-driven IFN conditioning. TMB is included as a covariate.
- **MSI status** — MSI-high tumors are also highly IFN-stimulated, by an adaptive-IFN-γ-dominated mechanism distinct from HRD's tonic type-I-IFN. MSI-high tumors are treated as a **separate comparison group**, not a covariate to subtract out. The discriminating prediction: HRD-high tumors should show CCR8⁺ eTreg enrichment **even relative to MSI-high tumors with comparable total immune infiltrate**.

Mediation analysis: tests whether the IFN program **mediates** the HRD → CCR8⁺ eTreg association. Removing the IFN axis from the model should attenuate the association; that is the structural-equation claim from Thread 2.

This is the step that converts "stratifier" from a marketing word into a methodological commitment.

## Aim 4 — Defining the stratifier and the subgroup

Two stratifier variants:

- **2D: HRD-high × IFN/eTreg-high.** The minimal version. Quantiles within each cancer type are reported; the cross-cancer prevalence and the per-cancer-type distribution are the deliverables. Subgroup size is **let the data answer** — the project does not presume it is large.
- **3D: + Tex co-occurrence.** Adds terminally exhausted CD8 as a third axis, because combination benefit requires a CD8 population the PARPi + anti-CCR8 combination can rescue. If there's no exhausted CD8 to release, removing the suppressor doesn't help.

Output: a pan-cancer map showing where the program lives. Expected: ovarian and breast as the primary HRD anchors, with possibly-large signals in prostate (BRCA-related) and pancreatic (also BRCA-related). Possibly-surprising positives elsewhere are reported with the same rigor as the expected ones. The map is the contribution.

## Aim 5 — Multi-omics and single-cell cross-validation

**Proteomic layer (CPTAC pan-cancer 2024).** 10 cancer types, 1,043 patients, matched genomic / transcriptomic / proteomic / phosphoproteomic. The project asks: do CCR8, LAG3, TNFRSF18, and IFN-pathway components show concordant elevation at the **protein and phosphosite level** in HRD tumors? Transcript-level association is suggestive; protein-level concordance is what makes the story not a regulatory artifact. TCPA RPPA supplies a secondary check.

**Single-cell layer.**

- **Zheng 2021 pan-cancer T atlas** (21 cancer types, 316 patients, ~390k T cells; NGDC). Confirms CCR8 marks intratumoral eTregs across cancers, compares eTreg fractions by HRD surrogate where matched genomic data exist.
- **Cheng 2021 pan-cancer myeloid atlas.** Adds DC–Treg interaction context — IFN-conditioned DCs are part of the Treg-conditioning story.
- **GSE222556** (the Luo 2024 HGSOC data). The positive control: the project's signature scoring should recover the original Luo 2024 results when applied to the same data.

The validation step is what distinguishes the project's claim from a bulk-deconvolution artifact.

## Aim 6 — Clinical relevance with honest caveats

This is where the project is most constrained. Public PARPi-treated cohorts with outcomes are scarce — GSE222556 is essentially the only one with paired scRNA. The combination-benefit case is therefore **hypothesis-generating**, not survival-validated.

What can be tested with public data:

- **Public ICI transcriptomic cohorts** — many cancers, many studies. Add HRD calls via expHRD where genomic data is missing. Test whether the 2D / 3D stratifier predicts ICI outcomes (it should not be the strongest predictor — anti-PD-1 isn't anti-CCR8 — but the IFN axis should at least track outcome).
- **Signal concordance with mouse PARPi + anti-CCR8** — the Luo 2024 in-vivo results are the mechanistic ground truth. The project's TCGA-inferred (HRD-high × IFN/eTreg-high) population should align with the HGSOC HRD-high population that responded in the Luo 2024 mouse model.

What cannot be tested: actual PARPi + anti-CCR8 combination outcomes. The honest position is that the project defines **who the trial should enroll**, not what the trial would show.

## What the project is not

Worth being explicit, since this kind of work attracts a particular type of misreading:

- **Not a mechanism re-discovery.** Luo 2024 closed the mechanism loop in mice. Re-litigating causal direction in TCGA bulk RNA would be busywork.
- **Not a single-cancer story.** HGSOC is the proof-of-concept. The pan-cancer subgroup map is the contribution.
- **Not a trial.** No outcomes for the combination yet exist in public data; the project's translational claim is hypothesis-shaped.
- **Not a re-statement of "HRD predicts IO response."** The Aim 3 specificity step distinguishes HRD/IFN-conditioned eTreg enrichment from general HRD immunogenicity. Without Aim 3 the project is redundant with prior work; with it, the contribution is the stratifier.

## What the deliverable looks like

One stratifier (HRD-high × IFN/eTreg-high), validated across 10–20 TCGA cancer types with confounder control, cross-validated at the proteomic level on 10 CPTAC cancer types and at single-cell resolution on Zheng 2021 + Cheng 2021 + GSE222556, with a pan-cancer subgroup map and a per-cancer prevalence estimate. One conclusion: **this is the population a PARPi + anti-CCR8 trial should enroll**. One actionable downstream consequence: the antibody developers ([CHS-114](.), [LM-108](.), [GS-1811](.), [FG-3165](.)) have a published target population to design against.

The vault collects the evidence. The aims operate on it. The stratifier is the bet.
