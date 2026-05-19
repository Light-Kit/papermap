---
title: 'Two latent spaces of one virtual cell — comparing cell-line and patient drug response with a custom adapter'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- drug-response
- domain-adaptation
- translatability
summary: "A prior-art map of cell-line ↔ patient drug-response transfer in 2019-2026 — PRECISE, TRANSACT, CODE-AE, scDEAL, MOLI, TUGDA, scAdaDrug, PERCEPTION, CRISP, scDrugMap, UniCure. The architectural composition (dual-latent decomposition) is published; the FM-backbone version has one live competitor (UniCure, six months old); the per-gene translatability score τ_g is genuinely unoccupied. Defensible move — fine-tune a frozen VC FM twice, align the bottlenecks with CKA/OT, ship a learned τ_g as the load-bearing output, falsify against Sade-Feldman anti-PD1 where τ must be ≈ 0."
starred: false
---

> *Sibling to [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md), the [101 tour](closed-loop-virtual-cells-101.md), the [adjacent project shapes](adjacent-project-shapes-and-n-of-1.md), and the [organelle-aware cell FMs](organelle-aware-cell-fms.md) sibling. v2 said closed-loop architecture is published. The adjacent-shapes essay said multicellularity and cross-cancer-anti-PD1 are crowded. The organelle-aware sibling said the image-side is shipped, the scRNA side open. This essay applies the same honest lens to one more shape — **dual-latent comparison of cell-line vs patient drug response with a custom adapter on top of a frozen VC FM**. Companion reading: [small labs v3](small-labs-what-to-build-v3.md) for the substrate-as-moat framing; [why linear baselines win](why-linear-baselines-win.md) for the empirical reckoning; [causal models, FMs and VCs](causal-models-fm-and-vc.md) for the rung-2 framing that makes "translatability" a well-defined object.*

## The question

Take one virtual-cell FM. Fine-tune it twice on the same backbone — once on **cell-line drug response** (GDSC + Tahoe-100M), once on **patient drug response** (TCGA-paired cohorts, BeatAML, PharmacoDB). You get two latent spaces. Compare them — not just predictively, but mechanistically — to understand which axes of drug response are preserved across systems and which collapse. That last bit is the prize: a model that explains *why translation fails*, not one that just predicts response. And build the adapter yourself — designed for the *comparison*, not for the response head.

## A seven-year crowded prior art

The cell-line → patient drug-response transfer problem is older and more populated than the framing suggests. The small-encoder era runs 2019-2024:

- **PRECISE** (Mourragui, *Bioinformatics* 2019, [doi:10.1093/bioinformatics/btz372](https://doi.org/10.1093/bioinformatics/btz372)) — linear consensus subspace via contrastive PCA. The lineage starter.
- **MOLI** (Sharifi-Noghabi, *Bioinformatics* 2019) — late-integration triplet-margin embedding.
- **AITL** (Sharifi-Noghabi 2020) — adversarial input + output domain adaptation.
- **TRANSACT** (Mourragui, *PNAS* 2021, [doi:10.1073/pnas.2106682118](https://doi.org/10.1073/pnas.2106682118)) — kernel-PCA non-linear extension; surfaces shared transcriptional components.
- **TUGDA** (Peres da Silva, *Bioinformatics* 2021) — task-uncertainty-guided DA; reduces negative transfer by 94%.
- **CODE-AE** (He/Xie, *Nat Mach Intell* 2022, [doi:10.1038/s42256-022-00541-0](https://doi.org/10.1038/s42256-022-00541-0)) — autoencoder with explicit orthogonal `shared + system-specific` latent decomposition. **The direct architectural ancestor of the user's idea.**
- **scDEAL** (Chen, *Nat Commun* 2022) — bulk-to-sc domain adaptation via DaNN + MMD.
- **scAdaDrug** ([arXiv:2403.05260](https://arxiv.org/abs/2403.05260), 2024) — importance-aware multi-source DA with per-latent-feature weight generator.
- **PERCEPTION** (Sinha/Ruppin, *Nat Cancer* 2024, [doi:10.1038/s43018-024-00756-7](https://doi.org/10.1038/s43018-024-00756-7)) — the strongest clinical-trial-validation footprint. **Critical: it is not a VC FM** — DNN on matched bulk + sc.

Then the FM era opens, 2024-2026:

- **CRISP** (*Nat Comput Sci* 2025) — first sc-FM-backbone transfer; cell-type → cell-type, not cell-line ↔ patient.
- **scDrugMap** (*Nat Commun* 2025) — benchmark of 8 sc-FMs on response classification; scFoundation strongest pooled, UCE best after fine-tune.
- **UniCure** ([bioRxiv 2025.06.14.658531](https://www.biorxiv.org/content/10.1101/2025.06.14.658531v1)) — **the single closest live competitor**. Real FM backbone (UCE + Uni-Mol), pretrained on 1.8M perturbation profiles, fine-tuned on patient-derived tumor-like clusters. But it does *one* patient fine-tune, no paired cell-line fine-tune, and no explicit Δ-latent analysis.
- **TRANSPIRE-DRP** (*J Transl Med* 2025) — PDX → patient AE + adversarial DA.

**None does "VC FM + paired dual fine-tune + Δ-latent comparison + per-gene τ output" as one system.** UniCure is six months old and misses on the paired fine-tune step. CODE-AE is the architectural ancestor at small-encoder scale. Everything else either omits the FM backbone, omits the dual fine-tune, or omits the gene-level readout.

## The per-gene τ_g gap

Set aside dual-latent decomposition for a moment and look at *what the model outputs*. After surveying the cell-line→patient transfer literature, the per-gene domain-adaptation literature, the pharmacology translatability rubrics, and 2024-2026 FM-era work, **no paper outputs a learned scalar τ_g ∈ [0,1] per gene saying "the cell-line response of gene g transfers to patient response with confidence τ".**

The closest existing artifacts each miss in a different way:

- **scAdaDrug** — per-latent-feature, per-sample weights with no stable biological identity (you can't read off "EGFR transfers, KRAS doesn't").
- **TUGDA** — per-task (per-drug) uncertainty, not per-gene.
- **CODE-AE** — per-sample alignment in latent space, no gene-resolved readout.
- **TRANSACT** — factor/component-level loadings, not per-gene.
- **PDXGEM** (*BMC Med Genomics* 2020) — binary concordance filter, not a learned continuous τ.
- **Sakellaropoulos** (*Front Genet* 2023) — KS-test filter + ranked panel. Discrete, not learned end-to-end.
- **Wendler & Wehling Translatability Score** (*J Transl Med* 2017, [PMC5670516](https://pmc.ncbi.nlm.nih.gov/articles/PMC5670516/)) — manual scoring rubric at drug-program level. Same word, totally different object.
- **pRRophetic / oncoPredict** — imputed patient IC50 from a multi-gene ridge model. The coefficients are sample-prediction weights, not transfer-confidence scores.

The τ_g framing is genuinely open. Three reviewer objections are foreseeable, with honest replies:

1. *"pRRophetic does this in spirit."* No. pRRophetic outputs sample predictions; coefficients are not learned per-gene transfer confidences and biomarker discovery is post-hoc via IDWAS.
2. *"Per-sample importance-weighted DA does the same thing functionally."* No. Per-sample weights confound *"this patient is unusual"* with *"this gene is untranslatable."* A τ_g head explicitly marginalizes over samples and is identifiable on the gene axis — a different statistical object.
3. *"Translatability is drug-specific, not gene-specific."* Partly fair. The honest factorization is τ_{g,d}. But the cell-line→tumor failure modes (microenvironment-driven genes, immune genes absent in cell lines, cell-cycle pathway inflation in cell lines) are largely *gene-intrinsic* and recur across drug classes — see Yu et al., *Sci Adv* 2020, [PMC7458440](https://pmc.ncbi.nlm.nih.gov/articles/PMC7458440/). A marginal τ_g is still well-defined and informative.

## The custom adapter — loss-first, architecture-light

Twelve adapter shapes are already published on VC FMs: scDCA (FiLM-on-bias modulated by drug embedding), [PertAdapt](https://www.biorxiv.org/content/10.1101/2025.11.21.689655) (gene-similarity-masked attention + adaptive perturb-sensitive-gene loss), scPEFT (LoRA / Adapter / Prefix), FUSED (multi-head cross-attention between scGPT and MolFormer), scGPT-DRP-GNN, XTransferCDR, scGenePT (text injection at gene token), Bio-DTA (dynamic token rewriting), PertDiT (diffusion-transformer cross-attention), STATE end-to-end, plus the agentic generators CellForge and VCHarness. **Pure architectural novelty is mostly closed.** A new flavor of FiLM reads as an iterate.

What is *not* tried on a frozen VC FM:

1. **Dual-head shared-trunk adapter** with **CKA / OT / Procrustes alignment loss** on the bottleneck. Cell-line head and patient head share a trunk; the bottleneck similarity tells you which axes survive translation.
2. **Per-gene τ_g head** as a DR-learner or EP-learner on the FM features.
3. **Domain-conditional FiLM** with a `{cell-line, PDX, patient}` token driving per-layer γ/β.
4. **Auxiliary translatability scalar** predicting line→patient transferability per drug.
5. **Contrastive matched-pair (line, tumor)** loss on a VC FM backbone.

**"Build your own adapter" in 2026 means loss-first, architecture-light.** The novelty has to live in the *objective* and the *comparison machinery*, not in the bottleneck arithmetic. The strongest stack hits four empty cells at once: **frozen STATE backbone + shared-trunk dual-head adapter (cell-line head + patient head) + CKA/OT alignment loss on the bottleneck + per-gene τ_g DR-learner head + auxiliary translatability scalar per drug.** The bottleneck itself can be plain LoRA or scDCA-style FiLM-on-bias — the bottleneck arithmetic is not where you compete.

## Data path

The substrate exists, but the *paired* substrate is narrower than the marketing suggests:

- **GDSC2 × TCGA** — the workhorse; ~30-60 drugs with usable overlap (cisplatin, paclitaxel, gemcitabine, 5-FU, sorafenib, erlotinib, tamoxifen, temozolomide are the well-populated ones).
- **CCLE / PRISM × TCGA** — 4,518 compounds × 578 lines on the cell-line side.
- **BeatAML 2.0** (*Cancer Cell* 2022) — 805 AML patients with ex vivo response on 145 inhibitors + RNA-seq. **The cleanest single-indication test bed**: 367 paired samples for venetoclax, pair with CCLE-AML (~40 lines on GDSC).
- **NIBR-PDXE** (Gao, *Nat Med* 2015) — ~1,000 PDX × 60 treatments. **The third-domain bridge** for the cell-line → PDX → patient extension.
- **Sade-Feldman melanoma anti-PD1** (*Cell* 2018) — 48 patients. **The negative-control falsifier**: anti-PD1 has no cell-line response because cell lines have no immune system. τ_g must be ≈ 0 on the anti-PD1 axis. If your head returns τ > 0 on these genes, it is overfitting and the project is dead. This is a sharp single test.
- **Tahoe-100M** (Vevo + Arc, 2025) — 100M cells × 1,100 drugs × 50 lines, overdetermined for the cell-line side.

## No-gos + names to watch

Same v2 pattern. The honest no-gos are:

1. **If your "VC FM + custom adapter" doesn't beat CODE-AE on a sealed patient cohort, the FM was decoration.** CODE-AE is the architectural ancestor at small-encoder scale. Run it as a *control condition*, not just a citation. If it ties or wins, the FM backbone isn't earning its compute.
2. **If τ_g doesn't falsify on Sade-Feldman anti-PD1, the head is overfitting.** Commit to this test before training. It is the cheapest single falsification setup the literature offers.
3. **If UniCure or a CRISP variant ported to the dual-domain setting matches your bespoke system on a sealed cohort, your method contribution is zero.** UniCure is six months old and on a similar trajectory; treat it as the live bar.

Three names to watch: **Lodewyk Wessels** (NKI) and **Soufiane Mourragui** (Sanger) — the PRECISE → TRANSACT lineage and the 2026 sample-efficient-adaptation work; **Eytan Ruppin** (NCI) and **Sanju Sinha** (Sanford Burnham) — PERCEPTION and the strongest clinical-trial-validation footprint; **Lei Xie** (Hunter / CUNY) — CODE-AE and direct ancestor of dual-latent decomposition. Honorable mentions: the **UniCure team** (live competition; talk to them before you start), Hossein Sharifi-Noghabi (Roche), Qin Ma (OSU; scDEAL / scDrugMap), and the **NIBR-PDXE** team if the three-way extension is on the table.

Verdict: same v2/v3 pattern one level over. The dual-latent decomposition is published. The FM backbone version has one live competitor. **The per-gene τ_g head is the genuinely unoccupied slot** — commit to that as the load-bearing claim, design the adapter and the loss around making τ_g identifiable, and falsify it on Sade-Feldman before anything else. Architectural composition isn't your moat; the comparison machinery is.
