---
title: 'D-SPIN: spin models of the cell, and how it connects to everything else here'
date: '2026-05-28'
topics:
- mech-modeling
- interpretability
- perturbation-prediction
- perturb-seq
- generative
summary: 'What D-SPIN actually is — a maximum-entropy "spin" model (an Ising-style Markov random field) that infers one shared gene-program regulatory network plus a per-perturbation field vector from multiplexed Perturb-seq — and how it threads through the rest of this vault: the linear-baselines reckoning, TxPert''s graph priors, generative cell-state models, the energy-landscape math, and the interpretability/mech-modeling corner.'
starred: true
---

> *Closely related: [interpretability, mechanistic modeling, and causal inference](interpretability-mech-causal.md) (the corner D-SPIN belongs to), [why linear baselines win](why-linear-baselines-win.md) (the reckoning it answers), [the math of the survival field](the-math-of-the-survival-field-v2.md) (the energy-landscape view it shares), [diffusion and flow matching for virtual cells](diffusion-and-flow-matching-for-virtual-cells.md) (the other way to be generative).*

**D-SPIN** (Jialong Jiang & Sisi Chen, senior author Matt Thomson, Caltech; *Cell*, May 2026, [fulltext](https://www.cell.com/cell/fulltext/S0092-8674(26)00463-0); first posted as a [2023 bioRxiv preprint](https://doi.org/10.1101/2023.04.19.537364); code at [github.com/JialongJiang/DSPIN](https://github.com/JialongJiang/DSPIN)) is one of the most quietly important papers in this vault, and the reason it's starred. It is not a foundation model. It is the clearest 2026 demonstration that you can get a *generative, mechanistically interpretable* model of how cells respond to perturbation **without** a transformer, by borrowing a 40-year-old idea from statistical physics. That makes it the sharpest available foil to the entire sc-FM program — and, simultaneously, a method that could become a *component* of the next generation of virtual-cell models. Both readings are why it matters here.

## The one-sentence version

D-SPIN takes a big pile of perturbation single-cell RNA-seq — many conditions at once — and fits a single **spin model**: a network of pairwise couplings between gene programs that is *shared* across all conditions, plus one **field vector per perturbation** that says how that drug or knockdown pushes on the network. Read the couplings and you have an interpretable regulatory network; read the fields and you have a quantitative fingerprint of every perturbation; sample the model and you have a generative simulator of cell-state distributions.

## What D-SPIN actually does

Walk the pipeline, because the structure is the whole point:

1. **Input — multiplexed perturbation scRNA-seq.** D-SPIN is built for exactly the data this vault keeps cataloguing: genome-wide Perturb-seq, drug panels, signaling treatments — *many* conditions pooled together. It is not a single-dataset method; the multi-condition design is load-bearing.
2. **Compress genes into programs.** Thousands of genes are reduced to a few dozen **gene programs** via orthogonal NMF (oNMF). The model lives in program-space, not gene-space — which is both why it scales to millions of cells and why its output is legible.
3. **Fit a maximum-entropy spin model.** Each program is a "spin." D-SPIN fits **pairwise couplings `J`** — the least-structured (maximum-entropy) network consistent with the observed program co-variation — shared across every condition. This `J` *is* the inferred regulatory network.
4. **Fit a field `h` per condition.** Every perturbation gets its own **field vector** `h`, encoding how it biases the spins. The couplings are the wiring; the fields are the inputs applied to that wiring.
5. **Generate.** Because it's a proper probability model (a Markov random field with an energy function), you can sample it — predicting the *distribution* of cell states a perturbation produces, not just a mean.

The paper frames the whole object by analogy to a **Hopfield associative-memory network**: stable cell states are attractors of an energy landscape, and perturbations are fields that tilt which attractor the population falls into.

## The physics: why "spin model"

This is the connection the vault should make loudest. A maximum-entropy pairwise model over binary-ish units, with couplings `J` and fields `h` and an energy function `E = -½ sᵀJs - hᵀs`, *is the Ising model* — the foundational object of statistical mechanics, and the same maximum-entropy machinery Schneidman, Bialek and others used in the 2000s to model populations of neurons firing together. D-SPIN ports that lineage from neurons to gene programs. So the right mental model isn't "another deep net" — it's **an energy landscape over cell states**, exactly the framing developed in [the math of the survival field](the-math-of-the-survival-field-v2.md) and [distributional generation vs. survival field](distributional-generation-vs-survival-field.md). Where a diffusion model learns to *sample* a distribution with a black-box score network, D-SPIN writes the energy down in interpretable parameters and lets you *read* it.

## What it showed

Two headline results, both about *organizing principles of perturbation response*:

- **Genome-wide K562 Perturb-seq:** D-SPIN's couplings recovered known erythroid/myeloid fate regulators (GATA1, KLF1, NFE2, GFI1B, SPI1) as network hubs — i.e., the inferred network is biology, not artifact.
- **~1.5M primary human immune cells across immunomodulatory drugs:** drug *combinations* produced novel macrophage states by **additively recruiting** gene programs — the field vectors roughly sum. That's a genuine organizing principle, and the kind of compositional statement a black-box predictor can match in accuracy but cannot *state*.

The paper's explicit pitch against deep learning: black-box models "lack interpretability due to the large number of parameters and feedforward architectures that do not naturally map onto biochemical pathways." (It argues the point against black-box DL in general; it doesn't single out scGPT or Geneformer by name.)

## The resource footprint

This is where the FM contrast gets concrete — D-SPIN is almost free to fit.

- **Model size.** Genes are compressed to **30 programs**, so the entire model is **465 shared coupling parameters** (the `J` network, 30×31/2) plus **30 field parameters per condition** (`h`). For the ~1,200-condition immune dataset that's roughly **37k parameters total** — three to four orders of magnitude smaller than scGPT/Geneformer's tens-to-hundreds of millions.
- **Compute.** **2 CPU cores, ~6 hours for 256,000 cells** — no GPU. The paper notes competing GRN methods "could not finish within a week" on the same data; inference is parallelized pseudo-likelihood / gradient-based maximum-likelihood.
- **Data — the one real cost.** D-SPIN is multiplexed by construction, so it needs many pooled conditions: **9,867 knockdowns / ~2M cells** for genome-wide K562, **1.5M cells / >1,200 conditions** for the immune-drug panel. But that's the *labeled output of a screen you already ran*, not a vast unlabeled pretraining corpus. The resource the FMs spend — GPU-weeks plus a scraped corpus — D-SPIN skips; the resource it spends is a well-designed Perturb-seq screen.

## Where it sits in this vault — the connections

This is the part worth lingering on.

- **The data it eats → the perturbation corpus.** D-SPIN is downstream of every Perturb-seq / sci-Plex / drug-panel resource here. It's the analysis layer those atlases were built to feed. If you've read the perturbation-data items wondering "what do you *do* with a million-condition screen," D-SPIN is one crisp answer.
- **The reckoning → its strongest answer-from-the-other-direction.** [Why linear baselines win](why-linear-baselines-win.md) and the [evaluation catalog](evaluation-papers-catalog.md) showed sc-FMs failing to beat simple baselines on perturbation. There are two ways to respond. **TxPert** (also starred) keeps the FM backbone and bolts on knowledge-graph priors. D-SPIN takes the opposite bet: **drop the transformer entirely** and use a physics prior. Same diagnosis — "the model needs biological structure it isn't getting" — opposite prescription. Reading TxPert and D-SPIN back-to-back is the cleanest way to see the post-reckoning fork in the road.
- **Versus the black-box sc-FMs.** Geneformer, scGPT, scFoundation learn representations from massive unlabeled corpora and are hard to interrogate. D-SPIN learns *few, named* parameters from *labeled* perturbation data. It's the interpretability/data-efficiency end of the trade-off the [foundation-models state of play](foundation-models-state-of-play.md) lays out — and a concrete instance of the mech-modeling pole in [interpretability, mech-modeling, and causal inference](interpretability-mech-causal.md).
- **Versus the generative cell-state models.** CFGen, scDiffusion, CellFlow and friends (see [diffusion and flow matching for virtual cells](diffusion-and-flow-matching-for-virtual-cells.md)) are *also* generative models of cell-state distributions — but via learned score/velocity fields. D-SPIN is generative via an explicit, readable energy function. The split is "interpretable energy you can read" vs. "expressive sampler you can't." Whether the field ends up wanting both — an interpretable energy *prior* inside a more expressive generator — is one of the live questions.
- **Versus the perturbation-response cousins.** CPA, chemCPA, GEARS predict perturbation responses too, but as supervised regressors with various structural tricks. D-SPIN reframes the same task as **inferring a network + applying fields**, which is why it can *explain* a combination (additive recruitment) rather than only predict it.
- **The interpretability bridge.** D-SPIN's gene programs play the role that monosemantic features play in mechanistic-interpretability work on sc-FMs (SAEs, probing): a small, named basis you can reason about. The difference is D-SPIN *builds* in that basis rather than *recovering* it post-hoc from a trained black box. That contrast is the heart of the [interpretability of cell FMs](interpretability-state-of-cell-fms.md) discussion.
- **The lineage upstream.** Maximum-entropy models of neural population activity (Schneidman/Bialek), Ising/spin-glass models, Hopfield networks, and NMF gene-program decomposition. D-SPIN is a synthesis of all four, pointed at single-cell biology.

## Similar and sibling work

If you want to read D-SPIN against its closest relatives, three are worth pulling up directly:

- **CellBox** (Yuan et al., Sander lab, *Cell Systems* 2021) is the nearest sibling: it also learns a small, interpretable **interaction matrix** from perturbation data, takes perturbations as inputs, and predicts unseen drug *combinations* — D-SPIN's "few named parameters + perturbation-as-input + compositional prediction" pitch, arrived at independently. The difference is dynamics: CellBox is a deterministic ODE system, where D-SPIN is a stochastic energy model that returns a *distribution* of states. A 2024 paper recasting CellBox as a causal structural-equation model makes the comparison even sharper against this vault's causal framing.
- **Lezon et al.** (*PNAS* 2006), "entropy maximization to infer genetic interaction networks from expression," is the literal method precursor — the same maximum-entropy pairwise idea, before single-cell, perturbations, or gene programs. D-SPIN is that idea scaled up (the Schneidman/Bialek neural max-ent models are its cousins one field over).
- **CellOracle** (Morris lab, *Nature* 2023) is the closest neighbour *already in this vault*: infer a regulatory network (from ATAC), then simulate an in-silico knockout. It shares D-SPIN's mechanism-grounded, not-a-learned-embedding stance, but predicts via GRN propagation rather than an energy landscape.

The honest summary: D-SPIN is the only one of these that is *both* an interpretable network *and* a generative energy model. CellBox shares the interpretable-network half, CellOracle the mechanism half, and the diffusion/flow crowd ([CFGen, scDiffusion, CellFlow](diffusion-and-flow-matching-for-virtual-cells.md)) the generative half — none of them combine all three.

## On the causal ladder

In the [five-questions / causal-ladder](causal-models-fm-and-vc.md) framing this vault uses, D-SPIN lands squarely in the **RECKON → INTERVENE** band. It doesn't merely *describe* a cell-state manifold (rung 1) or *correlate* genes (rung 2); it fits an explicit interventional object — "apply field `h`, watch the attractor move" — and the K562 hub recovery is a reckoning result (the network is checkable against known biology). What it does *not* claim is true counterfactual transport between arbitrary states; the field-additivity finding is the closest it gets, and it's empirical rather than guaranteed.

## Limitations and open questions

- **Programs, not genes.** The oNMF compression that makes D-SPIN legible and scalable also means it reasons at program resolution; gene-level mechanism lives below its grain.
- **Pairwise by construction.** Maximum-entropy *pairwise* models capture two-body couplings; higher-order regulatory logic (true combinatorial AND/OR gates) is only approximated.
- **Field additivity is a finding, not a law.** The additive-recruitment result is beautiful but empirical — it will hold for some drug combinations and break for others, and knowing which is exactly the open science.
- **Static.** D-SPIN models the stationary distribution of states, not the trajectory between them — which is where the RNA-velocity / dynamics thread in this vault picks up.

## Why it's starred, and what to watch

D-SPIN is here because it's the **existence proof** that interpretable, generative, physics-grounded models of perturbation response are not a nostalgia act — they can be competitive on real genome-scale data *today*, and they say things black boxes can't. The thing to watch is the obvious synthesis the field hasn't built yet: a model that uses an FM's representational reach for the gene→program map and a D-SPIN-style energy for the program→state dynamics. If a 2026–27 paper bolts those together convincingly, it'll cite both TxPert and D-SPIN — and this corner of the vault is where you'll have seen it coming.
