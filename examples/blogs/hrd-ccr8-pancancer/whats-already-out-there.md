---
title: "what's already out there — the pan-cancer HRD work we stand on, and the seam where this project sits"
date: '2026-06-03 14:57 CT'
topics:
- hrd
- pan-cancer
- review
- positioning
- single-cell
- immune-archetypes
summary: 'Before committing more time to the five-layer plan, this is a stocktake of the neighbors — the pan-cancer HRD papers that are already done, the ones in preprint, and what they leave on the table. The closest neighbor is Hjazi et al. (bioRxiv, Oct 2025), which trained a pan-cancer HRD classifier (CSI-HRD) on >10,000 TCGA tumors and split HRD into two immune archetypes: dHpC (HRD-hot / HRP-cold) in breast/ovarian/endometrial, and dCpH (HRD-cold / HRP-hot) in lung/H&N/melanoma, where LOH at 3p/5q/9p knocks out IFN-α/β, STING, and JAK2. They explicitly flag what they did not do — single-cell, spatial, perturbation-linked, trial-outcome-linked — which is exactly the five-layer plan. The Luo-aligned IFN/CCR8/eTreg framing is also already in print, as a narrative review (Hu et al. 2025, Biomarker Research). The differentiator is no longer the hypothesis; it is the patient-record atlas plus a perturbation-to-functional-to-trial validation chain that nobody has assembled.'
starred: true
---

The five-layer plan ([the-five-layer-dataset-plan.md](the-five-layer-dataset-plan.md)) sets the architecture. Before turning the architecture into compute, the honest move is to read the neighborhood — what is already published, what is in preprint, where the seam is. This essay does that.

Three things were true a year ago: pan-cancer HRD had been mapped at the genomic level (Knijnenburg 2018; Nguyen 2020), the HRD → immune-activation pattern had been observed (Wang 2023; Hu 2024), and CCR8 had matured as a Treg-specific clinical target. The seam we were aiming at — HRD-stratified, IFN/eTreg-mediated, pan-cancer, validated at single-cell + spatial + perturbation + trial-outcome resolution — was open.

Three things have happened since. They narrow the seam without closing it.

## the closest neighbor: Hjazi 2025 (CSI-HRD)

The single most important paper to read alongside this project is Hjazi et al., *"Tissue specificity and chromosomal alterations shape divergent immune programs in HRD tumors"* — bioRxiv, October 2025, [PMC12633024](https://pmc.ncbi.nlm.nih.gov/articles/PMC12633024/).

They built **CSI-HRD**, a gradient-boosted classifier combining SigMA Sig3, the genomic instability score, and counts of ≥5 bp microhomology-mediated deletions. Trained pan-cancer and per-tumor-type, validated against HRDetect on WGS at 91.5% concordance. They applied it to >10,000 TCGA tumors across 33 cancer types, paired the HRD calls with bulk RNA-seq inflammation scores, CIBERSORTx deconvolution, and CD8⁺ TIL counts by immunofluorescence on an independent ovarian cohort.

The result, in their own framing, is two archetypes:

- **dHpC** — *deficient-Hot / proficient-Cold*. ER+ breast, ovarian, endometrial. HRD tumors light up — type-I IFN, NF-κB, chemokine-driven T-cell recruitment, cytotoxic and exhausted CD8, Tregs. This is the Luo-shaped half of the world. Cluster 1 in their hierarchy: HAVCR2⁺ CD8 exhaustion, Tregs, the lot.
- **dCpH** — *deficient-Cold / proficient-Hot*. Lung, head-and-neck, melanoma. HRD tumors are immunologically silenced. LOH at chromosomes 3p, 5q, 9p — which carry IFNA/IFNB, STING, JAK2 — explains a measurable share of the suppression. The inverse correlation between baseline HRP inflammation and HRD-induced inflammation is r = −0.63 across tissues.

Then the punchline: *"stratifying patients by HRD and immune context may help identify candidates most likely to benefit from ICB plus PARPi or triple combinations including anti-angiogenic agents."* That is the framing of our project, articulated as a pan-cancer bulk-level claim.

What they explicitly did **not** do, and flagged as future work, in their own words:

> "Single-cell, spatial, and clinical trial-linked analyses to validate these immune programs as predictive biomarkers."

That sentence is, structurally, the description of our Layers 1 through 5. They closed the bulk-level pan-cancer landscape question. They opened the single-cell + spatial + perturbation + trial-outcome question and left it for whoever comes next.

## the IFN/CCR8/eTreg framing is also already in print

Hu et al., *"The distinct landscape of tumor immune microenvironment in homologous recombination deficient cancers"* — *Biomarker Research*, 2025, [PMC12366292](https://pmc.ncbi.nlm.nih.gov/articles/PMC12366292/).

A narrative review across HGSOC, TNBC, PDAC, prostate. It names CCR8 as the eTreg marker. It describes the IFN signaling dual role — activation followed by Treg-mediated suppression — in the same arc Luo 2024 traced. It does not generate data, and it confines the discussion to four cancers. But it means the Luo-aligned framing has now been written down as a review.

The implication is uncomfortable but worth stating: **the hypothesis is no longer the differentiator.** Two papers from late 2024 to mid 2025 — one bulk-level pan-cancer (Hjazi), one narrative-level synthesis of the IFN/CCR8 chain (Hu) — between them cover the "is this real, and could it be a target" half of the project's framing.

What is left is everything those two papers either could not or did not do.

## the rest of the neighborhood

| paper | what it covers | closest layer to ours | what is missing relative to us |
|---|---|---|---|
| Wang 2023, *Sci Rep* — *Genomic and molecular landscape of HRD across cancer types* ([s41598-023-35092-w](https://www.nature.com/articles/s41598-023-35092-w)) | 10,619 TCGA / 33 types; HRDsum + DNA-methylation + bulk + a small sc layer; reports 60% vs 6% exhausted CD8 in HRD vs HRP | Layer 1, early Layer 2 | sc data is N=4 BRCA1 breasts + ccRCC TILs — proof of concept, not atlas; no perturbation, no PDO, no trials |
| Nguyen 2020, *Nat Comm* — *Pan-cancer landscape of HRD* ([s41467-020-19406-4](https://www.nature.com/articles/s41467-020-19406-4)) | HMF metastatic pan-cancer WGS; CHORD classifier; defined the baseline pan-cancer HRD rate | Layer 1 baseline | genomics-only; no transcriptome, no immune, no validation chain |
| Yang 2025 — Asian pan-cancer HRD ([PMC12107993](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12107993/)) | 9,262 patients, 17 solid tumor types, biallelic HRR + tumor-suppressor calls | Layer 1, ancestry validation | panel DNA only; HRP comparator is structural, not phenotypic |
| Wang 2024, *Cancers* — HRD/HRP **ovarian** sc-RNA + TCR ([PMC11481286](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11481286/)) | 5 HRD vs 3 HRP HGSOC samples at single-cell + TCR resolution; reports M1/M2, CAF subtypes, tumor-reactive T-cell differences | Layer 2 prototype, single tissue | N=8, ovarian only — first single-cell HRD/HRP comparison, but not an atlas |
| Patkar 2024, *Cancer Res Comm* — HRD in cell lines ([PMC11621922](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11621922/)) | DepMap/CCLE pan-cancer HRD calls, drug-response cross-reference | Layer 4 input | model side, not patient side |
| Vanderwerff 2026, *Life Sci Alliance* — *Regulators of HRD via multi-omics ML* ([e202503531](https://www.life-science-alliance.org/content/9/2/e202503531)) | 8,000 patients, multi-omics ML to identify HRD regulators (genes that drive HRD onset) | cross-cutting | different question — *what drives HRD* rather than *what HRD does to the niche* |
| Macedo 2025, *NAR* — DirectHRD ([gkaf313](https://academic.oup.com/nar/article/53/8/gkaf313/8117946)) | new sensitive scar-based HRD classifier, AUC 0.99 at 5% tumor fraction | Layer 1 method | methods paper, no patient cohort |
| Kim 2024 — expHRD ([PMC11241885](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11241885/)) | transcriptome-based HRD predictor, individual-level scoring | Layer 1 method | methods paper |

Six of those eight (everything but Wang 2024 *Cancers* and Wang 2023 *Sci Rep*) operate at bulk or genomic resolution. The two single-cell entries are either a methods proof (Wang 2024 *Sci Rep* with N=8 small comparison cells) or single-tissue (Wang 2024 *Cancers* ovarian, N=8). No paper in this neighborhood has assembled a pan-cancer single-cell HRD atlas.

## the seam — what no one has assembled

Reading the neighborhood end to end, the open white space is a short list:

1. **Pan-cancer single-cell + spatial HRD atlas with paired HRP.** Hjazi proved at bulk scale that the immune consequence of HRD is tissue-dependent. The single-cell question — does dHpC break down further into subtype-specific axes (the Luo IFN → CCR8 axis being only one), and does dCpH break down into rescuable vs irreversibly LOH-silenced subgroups — is open.
2. **A patient-record atlas.** One row per patient: HRD call (multiple scorers), transcriptomic axis scores, spatial features, treatment history, outcome. Everyone in the neighborhood works at the tumor-population level or the cell-population level. No one has built the rows.
3. **Axis emergence with genetic perturbation as the bridge to a cell-autonomous interpretation.** Replogle 2022 Perturb-seq, DepMap, and LINCS L1000 contain the cell-autonomous signature of acute HR-gene loss. No published HRD work has used that as the "HRD/HRP mimic" reference to disentangle cell-autonomous from microenvironment-mediated effects.
4. **PDO/PDX PARPi-response as functional validation of axis stratification.** Kopper, Tiriac, Hill, Driehuis, Bruna are all out there. They have not been collectively used as the functional ground-truth layer for an HRD stratifier.
5. **Trial outcome as held-out test for any stratifier proposed at Layers 1–4.** PROfound, MAGNITUDE, OlympiAD, ARIEL3 give a per-patient PARPi-response endpoint. Hjazi explicitly noted they had no trial-linked outcomes; we can add them.

That is the project. None of it is a new mechanism. All of it is the validation architecture that the bulk-level pan-cancer paper and the narrative-level review both leave undone.

## what this changes in the five-layer plan

Three concrete updates fall out of the lit review:

- **CSI-HRD becomes an HRD-call method in Layer 1.** Not the only one — HRDetect and CHORD remain the WGS-based calls — but CSI-HRD is the right tool when the input is panel + Sig3 (which is most of TCGA's recallable surface). The Hjazi `dHpC` vs `dCpH` archetype split also becomes a competing-hypothesis null model for Layer 2: does our axis emergence agree with their archetypes, refine them, or contradict them at single-cell resolution?
- **The IFN/CCR8/eTreg framing moves from hypothesis to one of several candidate axes.** Hu 2025 has now written this framing down as a review. We do not pre-commit Layer 2 to it. We let unsupervised analysis surface whichever axes separate HRD+ patients, and IFN/CCR8 becomes one candidate output to compare against the Luo-anchored prior. (This matches the scope correction already in the project memory.)
- **Layer 3 (genetic) and Layer 4 (functional) move forward in priority.** What distinguishes this project from Hjazi 2025 is not better discovery — they have us beat on TCGA scale. It is the validation chain. Perturb-seq + PDO/PDX + trial outcome is where the seam is.

## items the corpus should now carry

Four new entries should go into `examples/hrd-ccr8-pancancer.yaml` so they sit alongside the items they replace or complement:

- `hjazi-2025-csi-hrd` — `hrd-genomics` category; anchor paper for pan-cancer HRD classifier + dHpC/dCpH archetypes. The most important neighbor.
- `hu-2025-hrd-tme-review` — `ifn-bridge` or `ccr8-etreg`; published narrative review that pre-states the IFN/CCR8 framing.
- `wang-2024-hrd-hrp-ov-sc` — `atlas-singlecell`; the first published HRD/HRP single-cell + TCR comparison (ovarian, N=8). Single-tissue precedent for our Layer 2.
- `vanderwerff-2026-hrd-regulators-ml` — `hrd-genomics` adjacency; multi-omics ML for HRD regulators. Different question, but methodologically adjacent.

Optional, lower priority:

- `macedo-2025-directhrd` — Layer 1 method, useful when input is low tumor-fraction liquid or panel.
- `kim-2024-exphrd` — Layer 1 method, transcriptome-only fallback for cohorts without WGS.

## what to read first, if you only read one

[Hjazi 2025 — PMC12633024](https://pmc.ncbi.nlm.nih.gov/articles/PMC12633024/). It is the paper this project will be compared against. Read it before writing the next analysis blog. Their `dHpC` / `dCpH` two-archetype frame is now the public baseline against which any single-cell axis emergence has to be compared.

The summary of the position, in one paragraph: pan-cancer HRD at bulk resolution is now done. The IFN/CCR8/eTreg chain at narrative-review resolution is now written down. The validation chain — single-cell + spatial + perturbation + functional + trial outcome, run as one architecture — is what nobody has assembled. That is the contribution.
