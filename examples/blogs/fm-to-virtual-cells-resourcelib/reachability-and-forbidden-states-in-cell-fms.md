---
title: 'What states can a virtual cell visit? Reachability, barriers, and forbidden co-expression in cell foundation models'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- reachability
- waddington-landscape
- optimal-transport
- manifold-learning
summary: "A prior-art map of cell-state reachability — the question of which transcriptional states a cell can occupy under physical, regulatory, and energetic constraints — and an honest verdict on which methods have landed inside single-cell FMs. The named handles (Waddington landscape, optimal transport, energy-based potentials, neural SDEs, Markov-chain fate maps, lineage exclusivity) are mature in dynamical-systems and trajectory ML. None of them ship inside scGPT, Geneformer, scFoundation, UCE, STATE, or CellPLM. The result is FMs that will decode biologically forbidden states — Oct4 + GATA6 co-high, mutually exclusive lineage programs co-active — without flinching. The third honesty layer after surprise and translatability."
starred: false
---

> *Sibling to [the surprise / uncertainty essay](surprise-and-uncertainty-in-cell-fms.md) (same epistemic-honesty beam, viewed from a different angle), [the dual-latent translatability essay](translatability-dual-latent-vc-fm.md) (reachability *between* distributions is what τ_g measures), [the organelle-aware sixth wedge](organelle-aware-cell-fms.md), and [the 101 tour of closed-loop VCs](closed-loop-virtual-cells-101.md). This essay asks the third honest question: when the FM proposes a new cell state, does it know whether biology will let that state exist?*

## The question

Not every transcriptional state a model can write down is a state a cell can occupy. Lineage commitment closes doors; energetic cost makes some attractors deep and others shallow; mutually exclusive transcription-factor programs hold each other off by direct repression. The cell sits on a low-dimensional manifold with **barriers** — what Waddington sketched in 1957 as ridges in an epigenetic landscape, what modern dynamical-systems biology calls a quasi-potential surface, and what a single Perturb-seq panel reveals as the empirical fact that most points in expression space are simply never observed. Current VC FMs do not encode any of this. They treat the cell as a point in a learned embedding, decode through an MLP, and will happily produce co-expression patterns that biology forbids. The question of this essay is what shape the missing prior takes.

## The named handles

The dynamical-systems and trajectory-inference literature has been building reachability machinery for a decade. Six families worth recognizing.

**Optimal transport on single-cell snapshots.** Waddington-OT ([Schiebinger et al., *Cell* 2019](https://www.cell.com/cell/fulltext/S0092-8674(19)30039-X)) is the founding move — given two snapshots of a developing population, find the coupling that minimizes a transport cost interpretable as energetic distance. TrajectoryNet ([Tong et al., ICML 2020](https://arxiv.org/abs/2002.04461)) replaces the static coupling with a learned continuous-time flow. CellOT ([Bunne et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01969-x)) and its 2024 perturbation extension ([Bunne et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02233-6)) push the framework into drug-response prediction: the OT cost between an unperturbed and perturbed population *is* the barrier height for that perturbation. This is the strongest existing prior on reachability.

**Energy-based potentials.** PRESCIENT ([Yeo et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)) learns a scalar potential U(x) over the cell-state embedding from lineage-traced snapshots. Sampling via Langevin dynamics under U respects barriers by construction — high-U regions are simply rarely visited. This is the most literal Waddington-landscape implementation in the ML literature, and it remains underused.

**Neural SDEs and ODE-based dynamics.** A growing family ([Tong 2020](https://arxiv.org/abs/2002.04461); [Sha et al., 2024](https://www.nature.com/articles/s41592-024-02184-y); [Bunne 2023](https://www.nature.com/articles/s41592-023-01969-x)) fits drift + diffusion vector fields where regions of low velocity / high divergence operate as barriers. MIOFlow ([Huguet et al., NeurIPS 2022](https://arxiv.org/abs/2206.14928)) constrains the flow to the data manifold so trajectories cannot tunnel through low-density regions.

**Markov-chain fate maps.** CellRank ([Lange et al., *Nat Methods* 2022](https://www.nature.com/articles/s41592-021-01346-6)) and CellRank 2 ([Weiler et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02303-9)) build a transition matrix on the single-cell graph and read off absorption probabilities to terminal states — operational reachability. Modality-agnostic, scales to 10⁶ cells, and the absorption probability is exactly the object a VC FM ought to expose.

**Lineage-exclusivity constraints.** The cheapest data-side prior. Mutual-exclusivity between transcription-factor programs is documented at the level of *pairs of master regulators* — Oct4/GATA6 in early embryo, PAX6/MyoD in neuroectoderm vs muscle, GATA1/PU.1 in erythroid vs myeloid. A few hundred such pairs from MSigDB and lineage atlases is enough to write a margin loss that any FM can be fine-tuned against.

## The single-cell FM picture — empty

scGPT ([Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)), Geneformer ([Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)), scFoundation, UCE ([Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)), CellPLM, and TranscriptFormer ship no manifold-distance head, no OT-cost regularizer, no potential-energy supervision, no exclusivity constraint. The token-prediction pretraining objective is reachability-blind: a sample that violates lineage exclusivity is no worse under cross-entropy than a sample that respects it, as long as the marginal token probabilities match. STATE ([Arc Institute, 2025](https://arcinstitute.org/news/virtual-cell-model-state)) inherits this and adds no public reachability layer.

The empirical consequence is direct. Pedrocchi et al's sparse-autoencoder probes of scGPT and scFoundation ([Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2), accepted ICLR 2026) show that many learned features have no clean biological interpretation, and an independent SAE comparative atlas across Geneformer-V2 and scGPT ([Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)) finds that only ~6–10% of transcription factors show regulatory-target-specific feature responses — the embedding contains *more states than biology supports*. The reckoning literature ([Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)) shows that the point estimates regress toward the training mean, which is reachability-blindness expressed as cowardice: when the FM has no prior on barriers, the safest answer to "what will this perturbation do" is the global average. Linear baselines win because they are honestly low-information; FMs lose because their high-capacity decoder is hallucinating reachable mass everywhere.

There is no scGPT Waddington head. No Geneformer OT prior. No STATE potential surface. The substrate is reachability-naive.

## The adjacent FMs that do encode constraints

AlphaFold ([Jumper et al., *Nature* 2021](https://www.nature.com/articles/s41586-021-03819-2)) is the existence proof in adjacent biology. The architecture is constrained at multiple levels: equivariant attention respects 3D structure, the structure-module recycling step is implicitly an iterative refinement under physical priors, and the final relaxation step uses an Amber force field to remove steric clashes ([Eastman et al., *J Chem Theory Comput* 2017](https://pubs.acs.org/doi/10.1021/acs.jctc.7b00529)). The model cannot output a structure with atoms occupying the same space. ESM-2 ([Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)) does not include an explicit physics constraint, but the masked-LM objective on evolutionarily related sequences implicitly encodes co-variation: forbidden residue pairs at contact positions are penalized by the data. Both are constraint-aware FMs in different ways.

The cell side has no equivalent. There is no Amber relaxation step on a generated transcriptome. There is no evolutionary co-variation prior on co-expressed gene pairs. The model can produce any vector in latent space, and the decoder will execute.

## Fine-tuning paths

Ranked by tractability. None of these require a new pretraining run.

**(1) Manifold-regularization fine-tuning.** Add an auxiliary loss equal to the distance of each generated embedding to its k-NN in the training set, penalized above a per-cell-type threshold. This is OOD detection from the [surprise sibling](surprise-and-uncertainty-in-cell-fms.md) repurposed as a reachability prior. Mahalanobis-distance variants are the cleanest; a small calibration head on top of a frozen scGPT can be trained in days on existing atlas data.

**(2) Lineage-exclusivity hard constraints.** Curate 200–500 mutually-exclusive marker-pair rules from MSigDB and Tabula Sapiens lineage trees. Add a hinge loss penalizing co-expression above a margin. No architectural change. Pilots possible in a week. The honest limitation is coverage — exclusivity rules are well-curated for hematopoiesis and neural lineages, sparse elsewhere.

**(3) OT-cost auxiliary head (Bunne pattern).** Frozen FM plus a Sinkhorn or W₂ loss between predicted and source state, conditioned on the perturbation. The CellOT pretraining substrate makes this immediately tractable; the new contribution is wiring it into a transcriptome FM as a side-channel rather than as a competing architecture.

**(4) PRESCIENT-style potential head.** Co-train a scalar U(x) on the FM's embedding using snapshot lineage data; replace the decoder with Langevin sampling under U. This is the principled version — *generative* reachability rather than rejection — and the hardest. It is also the one that would let the FM refuse to sample a forbidden state rather than sampling it and being penalized after the fact.

## Verdict + open wedges

The architectural composition is, again, published. The defensible novelty surface is the integration: bolting reachability machinery from the trajectory-inference / dynamical-systems literature onto a transcriptome-pretrained FM. Three concrete experiments worth running.

**(a)** Ablate the lineage-exclusivity hinge loss on a scGPT-derived Perturb-seq predictor against the Replogle ([Replogle et al., *Cell* 2022](https://www.cell.com/cell/fulltext/S0092-8674(22)00746-8)) benchmark. Measure the fraction of predictions that violate at least one curated exclusivity rule before and after. The null hypothesis is that the FM is already implicitly capturing the rules from data; the prior here is that it is not.

**(b)** Train a PRESCIENT head on top of frozen Geneformer features and compare Langevin samples to scVI samples for forbidden co-expression rate.

**(c)** Use CellRank absorption probabilities as a calibration target: any VC FM that proposes a transition from state A to state B should report an absorption probability that correlates with CellRank's on held-out lineage data.

Names to follow. **Charlotte Bunne** (EPFL → Stanford) for OT-on-cells, the most active line. **Smita Krishnaswamy** (Yale) for manifold-respecting flows. **Fabian Theis** (HMGU) for trajectory inference and the scVI-family substrate. **Jesse Engreitz** (Stanford) and **Aviv Regev** lineage at the perturbation × fate intersection a reachability-aware FM would need. Same v2/v3 pattern as the surprise and Hi-C siblings: the components exist, the cell-FM community has been racing for scale and benchmarks, and the moat is in the loss design.

A virtual cell that does not refuse forbidden states is not a virtual cell. It is a regression with imaginative side effects.
