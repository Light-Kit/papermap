---
title: 'What disappears, and why: modeling drug-induced depletion as conditional viability in virtual cells'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- perturbation
- viability
- optimal-transport
- drug-response
summary: "A 400-word quick read on the model worth building. When a drug kills cells they drop out of the sequencer, so the signal is the hole — not the death trajectory but the absence. Define a survival field π(x | drug, dose), the probability a cell at state x persists; it is the control-vs-treated density ratio that MELD and Milo estimate descriptively, made foundational by learning it as a function of a chemical embedding so it predicts depletion for unseen drugs and unseen states. Tahoe-100M (1,100 drugs, 50 lines, dose-resolved) is the substrate; unbalanced optimal transport separates died from transitioned; a Dirichlet-multinomial likelihood plus the 50-line Mosaic reference handles compositionality. The novelty: existing models predict the expression of survivors, none model survival itself as a first-class, generalizing, decomposable object — which is the empirical, drug-conditional instance of the reachability/viability program. The persistent set is the conditional viable manifold; the depleted set is the measured forbidden-under-drug stratum. Falsifiable by held-out wells, unseen-molecule prediction, and BH3-profiling validation."
starred: false
---

> *The drug-conditional, empirically-fittable instance of the [reachability / viability program](cell-state-reachability-as-viability-theory.md): instead of asserting which states are forbidden, it measures them. Built on the [diffusion / density backbone](diffusion-and-flow-matching-for-virtual-cells.md), it is the τ→0 face of [stability and lifespan](cell-stability-and-niche-dependence-in-vc-fms.md), and the natural acquisition target for the [agent + FM + machine closed loop](agent-fm-machine-closed-loop.md). Prioritization rides the [surprise / uncertainty signal](surprise-and-uncertainty-in-cell-fms.md).*

**The signal is the hole.** Treat cells with a drug and the vulnerable ones die and drop out of the sequencer. Don't model the death *path* — model the *absence*. Each state *x* has a survival probability under drug *g* at dose *d*; the treated population is the control population reweighted by it. Formally the survival field π(*x*|*g*,*d*) ≈ p_treated / p_control — a density ratio, exactly what [MELD](https://www.nature.com/articles/s41587-020-00803-5) and [Milo](https://www.nature.com/articles/s41587-021-01033-z) estimate descriptively. The foundational move is to *learn* π as a function of a chemical embedding of *g*, so it predicts depletion for **unseen drugs and unseen states** — not just the wells you ran.

**The substrate exists.** [Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398v3.full) — 100M cells, 1,100 drugs, 50 lines, dose-resolved — is the training grid; [Tahoe-x1](https://www.biorxiv.org/content/10.1101/2025.10.23.683759.full.pdf) gives the cell-state embedding to build on. A single 24h snapshot suffices: you only need treated-vs-control densities, and dose supplies a per-state depletion curve.

**Gone versus moved.** A state vanishes two ways — its cells died, or transitioned elsewhere. [Unbalanced optimal transport](https://www.cell.com/cell/fulltext/S0092-8674(19)30039-X) is the exact object: it splits a control→treated coupling into *transport* (movement) and *mass destruction* (death), and has been [validated predicting drug-induced death](https://arxiv.org/html/2501.03501). Destroyed mass is the kill signal; transported mass is state change.

**Compositionality, handled.** scRNA-seq gives relative not absolute counts, so one state dying inflates the rest. A Dirichlet-multinomial likelihood ([sccomp](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10438834/)) plus Tahoe's 50-line Mosaic-per-well as an internal competition reference recovers fitness without spike-ins.

**Why it's new.** Tahoe-x1, CPA, and CellFlow all predict the *expression of survivors* — what the cells that remain look like. None model survival itself as a first-class, generalizing, decomposable object. That is the empirical, drug-conditional instance of the [viability program](cell-state-reachability-as-viability-theory.md): the persistent set π≈1 is the conditional viable manifold; π≈0 is the **measured forbidden-under-drug stratum**. You carve the boundary from data instead of asserting it — and the depletion readout sidesteps the deep problem that the death decision is post-translational and invisible to RNA. You never ask *how* it died, only *that it's gone*.

**Falsifiable.** Hold out drug×line wells and predict their depletion. Predict for a molecule absent from Tahoe via its chemical embedding, then run it. Validate the death field against [BH3 profiling](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9) — orthogonal, non-transcriptomic. Honest limits: absolute survival needs total counts (the Mosaic reference is load-bearing); death-vs-transition is identifiable only under transport regularity; one snapshot means the coupling is inferred, not watched.
