---
title: 'Will this cell still be here tomorrow? Stability, niche dependence, and lifespan in virtual cell foundation models'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- stability
- niche-dependence
- lifespan
- interpretability
summary: "A prior-art map of cell-state stability — decomposing the word into four interpretable axes (basin depth U, niche dependence λ, lifespan τ, population frequency π) — and an honest verdict on which axes have landed inside single-cell FMs. The named handles (PRESCIENT potentials, CellRank absorption probabilities, scVelo/dynamo Jacobians, NicheNet ligand-receptor coupling, LARRY lineage-trace lifespans, apoptosis priming, SenMayo senescence signatures) are mature in dynamical-systems and trajectory ML. None of them ship as a stability head on scGPT, Geneformer, scFoundation, UCE, STATE, or CellPLM. The fourth honesty layer after surprise, translatability, and reachability — and the one that closes the quartet."
starred: false
---

> *Fourth sibling in the epistemic-honesty quartet. The earlier three asked whether the model knows it does not know ([surprise / uncertainty](surprise-and-uncertainty-in-cell-fms.md)), whether a state is reachable at all ([reachability and forbidden states](reachability-and-forbidden-states-in-cell-fms.md)), and whether a prediction in one cell context survives transfer to another ([dual-latent translatability](translatability-dual-latent-vc-fm.md)). This essay asks the fourth: once the model has placed a cell at a state, does that state stay, for how long, and on what extrinsic signals does it depend? Cross-cuts to [the organelle-aware sixth wedge](organelle-aware-cell-fms.md) on metabolic substrate and to [the closed-loop 101](closed-loop-virtual-cells-101.md) on what a downstream agent does with the answer.*

## The question

A cell is not a point on a manifold. It is a point with a half-life and a list of dependencies. A naive T cell needs tonic IL-7 signaling or it dies within days. A regulatory T cell needs TGFβ or it loses Foxp3 and converts. A senescent cell is "stable" only in the sense that it refuses to either die or divide — a stuckness, not a steady state. A tumor cell that addicts to a TME ligand survives in vivo and disintegrates the moment you put it on tissue culture plastic. None of these distinctions live inside a transcriptome FM's decoder. The FM proposes a state and the loss function rewards token-level accuracy; persistence is somebody else's problem. The question of this essay is what shape a stability prior takes when "stable" is decomposed into four axes that can be measured, attributed, and audited one at a time.

## Decomposing the word

Four named heads, each with a published handle in the dynamical-systems or single-cell-genomics literature.

**U(c) — basin depth.** The Waddington-landscape quantity. Deep basin means the state relaxes back after small perturbations; shallow means a nudge tips it elsewhere. PRESCIENT ([Yeo et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)) learns a scalar potential U(x) from snapshot lineage data, with Langevin sampling respecting the barriers. CellRank 2 ([Weiler et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02303-9)) computes absorption probabilities into terminal macrostates — operationally, the kinetic flavor of U. scVelo ([Bergen et al., *Nat Biotechnol* 2020](https://www.nature.com/articles/s41587-020-0591-3)) and dynamo ([Qiu et al., *Cell* 2022](https://www.cell.com/cell/fulltext/S0092-8674(21)01577-7)) fit drift+diffusion vector fields; Jacobian eigenvalues at fixed points give linear stability directly.

**λ(c) — niche dependence.** A cell is "stable" only conditional on the extrinsic signals that prop it up. The mathematical handle is the gradient ∂U/∂(niche-driven program): if you ablate the IL-7 response program in silico and the basin collapses, the cell is IL-7-dependent. NicheNet ([Browaeys et al., *Nat Methods* 2020](https://www.nature.com/articles/s41592-019-0667-5)) and CellChat ([Jin et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-21246-9)) predict which ligand-receptor channels each cell consumes. Spatial-omics ([Visium, MERFISH](https://www.nature.com/articles/s41592-021-01358-2)) gives the actual neighborhood from which those ligands arrive. **This head is what makes "what environment" answerable as a per-cell vector** of named ligand dependencies rather than a vague "context."

**τ(c) — lifespan.** Kinetic stability. Neutrophils last ~5 days, memory T cells decades. Lineage-tracing experiments measure τ directly. LARRY ([Weinreb et al., *Science* 2020](https://www.science.org/doi/10.1126/science.aaw3381)) is the canonical scalable scRNA-seq lineage-trace substrate; GESTALT and watermarking systems extend the idea. Senescence signatures like SenMayo ([Saul et al., *Nat Commun* 2022](https://www.nature.com/articles/s41467-022-32552-1)) flag a different mode — long-lived but proliferation-arrested. Apoptosis priming ([Sarosiek et al., *Cancer Cell* 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)) measures how close a cell sits to the mitochondrial-apoptosis threshold, the wet-lab gold standard τ has to match.

**π(c) — population probability.** Frequency under the empirical atlas distribution. High π means the state is commonly observed; combined with low U it means common-but-pathological (exhausted T cells in tumors, senescent fibroblasts in aging tissue). Bayesian density estimation on the FM embedding — the same flow that supplies U with a different normalization — gives this for free.

The product of the four is not a single scalar. It is a four-vector per cell that decomposes WHY the cell is stable or unstable.

## The single-cell FM picture — empty

scGPT ([Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)), Geneformer ([Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)), scFoundation, UCE ([Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)), CellPLM, TranscriptFormer, and STATE ([Arc Institute 2025](https://arcinstitute.org/news/virtual-cell-model-state)) ship none of U, λ, τ, π as published heads. The masked-token pretraining objective is stability-blind: a token sequence that violates lifespan biology — say, high cyclin co-expressed with terminal apoptosis priming — incurs no extra loss as long as the marginal token probabilities line up. The 2025 reckoning ([Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)) measures *which mean* the model regresses to, not how durable the predicted state is.

scVI's ELBO ([Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)) is the closest existing handle in the substrate, but it captures density rather than basin depth, and it has no niche-dependence or lifespan layer. STATE's adapter API offers no published calibration on persistence after a predicted perturbation transition. Sparse-autoencoder interpretability on scGPT and scFoundation ([Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2), accepted ICLR 2026) is a precondition for stability attribution but not the score itself — it exposes the features the heads would read.

There is no scGPT basin-depth head. No Geneformer niche-dependence gradient. No STATE lifespan regression. The four-vector is uncomputed.

## The adjacent FMs that ship something stability-shaped

The structural-biology FMs gesture at it. AlphaFold-Multimer ([Evans et al., 2021](https://www.biorxiv.org/content/10.1101/2021.10.04.463034v2)) ships interface PAE as a per-residue-pair confidence on relative position — a confidence-on-persistence proxy at the binding-interface scale. ESM-2 perplexity ([Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)) calibrates variant-effect prediction at the protein level — "how *stable* is this substitution" is exactly its idiom. Genomic FMs (Enformer, AlphaGenome) emit tracks but not transition probabilities between cell states; they are not in this ontology.

The closest adjacent measurement on the cell side is BH3 profiling ([Letai lab](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)) — a wet-lab measurement of how primed a cell is for apoptosis. It is the gold-standard τ-anchor any in-silico stability score has to match. No transcriptome FM has yet matched it head-to-head on a published benchmark.

## The algorithm

A frozen-FM fine-tuning recipe. Four heads on top of a fixed scGPT or Geneformer embedding; none require a new pretraining run.

**U head.** A normalizing flow over the FM embedding, trained on the HCA / CELLxGENE pretraining cells. Log-density of a held-out cell under the flow is the potential. Calibration anchor: PRESCIENT-style Langevin samples should reproduce the empirical density at convergence.

**λ head.** For each cell, identify candidate niche-ligand channels via NicheNet ligand-program signatures ([Browaeys 2020](https://www.nature.com/articles/s41592-019-0667-5)). Perturb each ligand-driven gene program in the input (zero out the responder set, or mask its expression to the population median). Recompute U. The gradient ∂U/∂(ligand-program) is the per-cell, per-ligand dependence score. Output: a sparse vector over named ligands. A T cell with λ dominant on IL-7 versus a Treg with λ dominant on TGFβ are then directly comparable.

**τ head.** Supervised regression with three sources of signal: (i) LARRY-trace lifespan estimates where available, (ii) RNA-velocity-derived turnover from the same FM embedding, and (iii) handcrafted scoring against SenMayo senescence ([Saul 2022](https://www.nature.com/articles/s41467-022-32552-1)) and apoptosis-priming gene signatures ([Sarosiek 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)). SCENIC+ TF-regulon scores ([Bravo González-Blas et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)) feed in as auxiliary features. Output: a per-cell expected lifespan in hours-to-years units.

**π head.** Atlas marginal density. Same normalizing flow as U with a different normalization layer; the ratio U/π separates "deep and common" (memory T) from "deep but rare" (long-lived hematopoietic stem cell) from "shallow but common" (cycling progenitor) from "shallow and rare" (the model's hallucinations).

**S composite.** A learnable linear combination S = w · [U, λ, τ, π] supervised by downstream task: "predict which states survive cytokine withdrawal," "predict which exhausted T cells respond to checkpoint blockade," "predict whether this tumor cell collapses on tissue-culture plastic."

**Interpretability layer.** Three stacks. (i) Per-head SAE features ([Pedrocchi 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)) map U-contribution to monosemantic gene programs. (ii) Per-ligand λ ranking gives the named-environment answer. (iii) SenMayo / BH3-signature breakdowns make τ inspectable. Output sentence template: "S(c) = 0.3, with U high (deep basin), but λ dominant on IL-7 — IL-7 ablation predicted to collapse U by 40%."

## Verdict + open wedges

Three concrete validation experiments. (a) Tregs from a TGFβ-knockout mouse → λ should flag TGFβ dependence as dominant before knockout; U should collapse after. (b) Neutrophils in healthy peripheral blood → τ short despite high π. (c) Exhausted CD8 T cells → low U, high π in tumors, low π in healthy tissue; the four-vector distinguishes "common-but-pathological" from "common-and-stable" — a distinction the field has been making by eye for fifteen years.

Names to follow. **Charlotte Bunne** (EPFL → Stanford) for the OT framing of niche transitions and the cleanest existing perturbation-stability work. **Manolis Kellis** (MIT) for the regulon-and-senescence axis. **Aviv Regev** for atlas-scale density and the empirical π. **Anthony Letai** (Dana-Farber) for BH3 priming as the wet-lab τ anchor. **Marius Lange** (Theis lab) for the CellRank-2 absorption-probability machinery the U head can borrow wholesale.

Same v2/v3 pattern as the three earlier siblings: the components exist, the cell-FM community has been racing for scale and benchmarks, and the moat is in the loss design and the joint substrate. A virtual cell that cannot tell you what keeps it alive is not a virtual cell. It is a snapshot, and snapshots do not have futures.
