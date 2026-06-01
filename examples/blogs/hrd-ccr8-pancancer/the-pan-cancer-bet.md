---
title: 'The pan-cancer bet — HRD × IFN/eTreg as a stratifier, not a story'
date: '2026-06-01'
topics:
- hrd
- ccr8
- parpi
- pan-cancer
- immunotherapy
- tumor-microenvironment
summary: 'Luo et al. (Cell 2024) closed the mechanism loop in HGSOC — HRD drives an IFN-conditioned CCR8⁺ effector-Treg program, PARPi + anti-CCR8 cuts tumor burden in CCR8-humanized mice. The pan-cancer question they left open is the one this project answers: does the program generalize, and which patients (not which diagnoses) carry it? The contribution is a stratifier, not a re-discovery — HRD-high × IFN/eTreg-high, with confounder controls strong enough to survive the obvious objection that HRD tumors just have more immune cells. The output is the population that would justify the PARPi + anti-CCR8 combination nobody has tried yet.'
starred: true
---

The 2024 Luo et al. paper in *Cell* did something most mechanism papers don't: it closed the loop. Single-cell transcriptomes and TCR repertoire from neoadjuvant-niraparib HGSOC patients (phase II NCT04507841) traced the circuit — HRD elevates IFN signaling, tumor cells turn on MHC-II and co-inhibitory ligands, CCR8⁺ terminal effector Tregs accumulate alongside terminally exhausted CD8 — and then they tested it in CCR8-humanized mice with PARPi + anti-CCR8 and the tumors got smaller.

That is the mechanism. It is also, structurally, a one-tumor-type story. The question the paper leaves open — the question worth a multi-year project — is whether this is a program that **generalizes**: across cancer types, across HRD definitions, across the patients within each cancer type who actually carry it. And whether the answer is concrete enough to motivate a combination — **PARPi + anti-CCR8** — that no clinical program has tried.

That is what this vault is for. Not to re-prove the mechanism. To **stratify** for it.

## What's already done, and what isn't

Three things are well-established and don't need redoing:

- The **pan-cancer genomic landscape of HRD** (Knijnenburg 2018; npj Precision Oncology 2022). HRDsum scores, BRCA1/2 calls, SBS3 — all standardized for 33 TCGA cancer types and available pre-processed via GerkeLab/TCGAhrd.
- **HRD → immune activation → anti-PD-1 response** as a broad pattern (Sci Rep 2023; Human Cell 2021). The signal exists; it is too coarse to act on.
- **CCR8 as a Treg-specific, IO-relevant target**. Clinical anti-CCR8 antibodies — CHS-114/tagmokitug (Coherus), LM-108 (LaNova/Merck), GS-1811 (Gilead), FG-3165 (FogPharma) — are all combined with **anti-PD-1**, and the CHS-114 phase I has reported CCR8⁺Treg ↓74% and CD8/CCR8⁺Treg ratio ↑12× in HNSCC. Selective intratumoral Treg depletion without systemic irAEs is no longer hypothetical.

What's missing is the **pan-cancer × patient-level stratifier** that would say: "this is the subgroup PARPi + anti-CCR8 is for." That is the contribution.

## The hypothesis the project will defend

Three claims, in order of how hard they are to prove:

1. **H1 (the easy one).** Across cancer types, HRD status correlates with a CCR8⁺ eTreg / IFN program. This is the warmup — the literature already suggests it. The job is to do it carefully across multiple HRD definitions, in every TCGA cancer type, and report tumor-type-specific patterns rather than averages.

2. **H2 (the load-bearing one).** This enrichment is **not** a byproduct of "HRD tumors have more immune cells." It survives covariate adjustment for total immune infiltrate, TMB, and MSI. It is mediated by the IFN program. This is the claim that distinguishes a stratifier from a co-occurrence. Without it the project is just a re-statement of the Sci Rep 2023 result.

3. **H3 (the actionable one).** **HRD-high × IFN/eTreg-high** — optionally plus Tex co-occurrence — defines a cross-cancer subgroup that should be where PARPi + anti-CCR8 has its therapeutic window. The 2D (or 3D) stratifier is the deliverable. The subgroup size and tumor-type composition are the result — let the data answer; do not presume.

## What this project deliberately does not try to do

The project is **associative and landscape-shaped**. Causal direction (HRD → IFN → eTreg) has already been established by Luo 2024 in mice. Re-litigating it in TCGA bulk RNA would be busywork.

It is **not a treatment trial**. Public PARPi-treated cohorts with outcomes are scarce — GSE222556 (the HGSOC niraparib data behind Luo 2024) is essentially the only one with paired transcriptomes. The combination benefit has to be argued via **stratification plus signal concordance**, positioned as **hypothesis-generating**. The point is to define the population a future trial should enroll.

It is **not a single HRD definition**. HRDsum, BRCA1/2 biallelic vs monoallelic, SBS3, and expHRD are all run in parallel, with sensitivity analysis on tumor-type-specific cutpoints. The agreement and disagreement across definitions is itself a finding.

## Where the project will most plausibly break

The honest list, named before reviewers do:

- **Single HRD cutpoint pan-cancer**. HRDsum ≥42 is calibrated for ovarian. Applied globally it will misclassify; the project's primary precaution is per-tumor-type cutpoint sensitivity analysis, with the npj Precision Oncology 2022 paper as the explicit prior.
- **BRCA1 vs BRCA2 vs BRCA1-promoter-methylated have different TMEs**. Averaging them is the easy mistake. They get separate analyses.
- **Bulk deconvolution limits**. CCR8 is fairly Treg-specific but the inference has to be cross-checked at single-cell resolution. Zheng 2021 (pan-cancer T atlas, ~390k cells, 21 cancer types) and Cheng 2021 (myeloid atlas) are the validators; GSE222556 is the positive control.
- **MSI is the obvious confounder.** MSI-high tumors are also highly immunogenic and IFN-high, by a mechanism distinct from HRD. The project treats MSI-high as a separate comparison group rather than a covariate to subtract out — the goal is to show HRD-driven CCR8 enrichment is **disproportionate** even relative to MSI-high.
- **No outcome data for the combination.** The Aim 6 deliverable is signal concordance and a population definition, not a survival curve. The clinical translation has to be argued, not measured.

## What the vault hosts

The corpus is project-shaped: the **anchor** (Luo 2024), the **literature anchors** for the three threads (HRD/PARPi, IFN-cGAS-STING, CCR8-eTreg), the **datasets** the analysis depends on (TCGA, CPTAC, GSE222556, the NGDC T-atlas, GerkeLab/TCGAhrd, TCPA), the **signatures and methods** the inference rests on (HRDsum, SBS3, the Cell 2024 eTreg signature, ISG/IFN signatures, ssGSEA, CIBERSORTx, expHRD), the **antibody pipeline** (CHS-114, LM-108, GS-1811, FG-3165 — Compare them on the Compare tab), and the **trials** that ground it (NCT04507841, NCT05635643).

Three thread essays accompany this one: a tour of HRD/PARPi and its immune consequences, a tour of the IFN/cGAS-STING bridge, and a tour of CCR8⁺ eTreg biology and the antibody race. Together they sketch the rationale the analysis plan operationalizes.

The bet is that **the population that should get PARPi + anti-CCR8 is more legible than the cancer-type-level conversation currently allows**, and that the public multi-omics record already contains the evidence to define it. The vault is the working list.
