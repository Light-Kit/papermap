---
title: 'Squidiff and the distributional-generation school: why a survival field is a different bet'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- perturbation
- viability
- generative
- diffusion
- flow-matching
- optimal-transport
summary: "A read of the generative-perturbation cluster in the resource library — Squidiff, CellFlow, scDiffusion, X-Cell — and what it means for the survival-field model. These methods form what the library calls the distributional-generation school: instead of predicting a mean shift, they generate the full post-perturbation cell distribution with a diffusion or flow-matching backbone (often the torchcfm library), which captures the genuine heterogeneity of perturbation responses. They sit against the disentanglement school (CPA, chemCPA) and the GRN-simulation school (CellOracle). The school shares two cracks the library's own notes flag: combinatorial / held-out perturbations break the inductive bias (CellFlow struggles; X-Cell's gains are contested on compositional splits), and — the deeper reckoning — these models have not convincingly beaten well-tuned linear baselines under the right metrics (Squidiff's authors say so themselves). Underneath both is one structural fact: they model the expression of survivors, mass-conserving, with no death-versus-transition split and no survival probability. That is precisely the object the survival field adds. The move is not to out-generate them but to change the question: borrow their engine (diffusion/flow) but make it unbalanced and death-aware so a growth head emits survival; borrow CausCell's causal-counterfactual framing; and above all borrow the discipline — linear baselines, combinatorial held-out splits, and distributional metrics from day one — because that discipline, as much as the object, is the moat. The school asks what survivors look like; the survival field asks who survived, predictably for a drug never run."
starred: false
---

> *A sibling to the [survival-field model essay](what-disappears-conditional-viability-v3.md) and its [engineering breakdown](the-math-of-the-survival-field-v2.md), reading the generative-perturbation cluster in the resource library against our design. Builds on the [diffusion / flow backbone](diffusion-and-flow-matching-for-virtual-cells.md), takes the [linear-baseline reckoning](why-linear-baselines-win.md) seriously, and treats the object as [causal](causal-models-fm-and-vc.md) and as part of the [reachability / viability program](cell-state-reachability-as-viability-theory.md).*

## The school, named

Point at [Squidiff](https://doi.org/10.1038/s41592-025-02877-y) and a cluster comes with it. The resource library files them under one heading — the **distributional-generation school** of perturbation modelling — and the taxonomy is worth keeping, because it sits against two siblings: the **disentanglement school** ([CPA](https://doi.org/10.15252/msb.202211517), [chemCPA](https://arxiv.org/abs/2204.13545)), which adds covariate vectors in a latent space, and the **GRN-simulation school** ([CellOracle](https://doi.org/10.1038/s41586-022-05688-9)), which propagates perturbations through a gene-regulatory network. The generation school is defined by a single bet: **don't predict a mean shift — generate the whole post-perturbation distribution.**

The members:
- **[Squidiff](https://doi.org/10.1038/s41592-025-02877-y)** (2026, *Nat. Methods*): a diffusion model sampling the full conditional distribution of perturbed cell states; large reported gains over GEARS.
- **[CellFlow](https://doi.org/10.1101/2025.04.11.648220)** (Theis lab): conditional flow matching transporting control to treated populations; beats [GEARS](https://doi.org/10.1038/s41587-023-01905-6) on energy distance.
- **[scDiffusion](https://arxiv.org/abs/2401.03968)**: diffusion for single-cell expression generation, the test case for whether diffusion is even the right bias for sparse, discrete counts.
- **[X-Cell](https://doi.org/10.64898/2026.03.18.712807)** (Bo Wang group, 2026): a diffusion *language* model for perturbation, pitched against Arc's State and scGPT-perturb, with a causal-invariance angle.

Around them sit the adjacents: [CausCell](https://www.nature.com/articles/s41467-025-62008-1) (structural causal model + diffusion for counterfactual generation), [UNAGI](https://www.nature.com/articles/s41551-025-01423-7) (a time-series generative *virtual-disease* simulator that scores interventions by trajectory reversal), and the infrastructure that made the wave possible — the [torchcfm](https://github.com/atong01/conditional-flow-matching) conditional-flow-matching library and the [Awesome Flow Matching Meets Biology](https://github.com/Violet24K/Awesome-Flow-Matching-Meets-Biology) list.

## What the school gets right

The bet is sound. Perturbation responses are genuinely heterogeneous across cells, so a mean-shift prediction throws away the part of the signal that matters; generating the full distribution keeps it. And because the engine (diffusion, or flow matching via torchcfm) is shared infrastructure, the school iterates fast — each paper is a conditioning recipe on a common backbone rather than a from-scratch model. If the question is *"what does the treated population look like?"*, this is the right machinery, and it is the machinery our own transport branch should use.

## The two cracks the school shares

The library's own notes, read across the cluster, surface the same two failures everywhere:

**1. Combinatorial and held-out perturbations break it.** CellFlow "struggles with combinatorial perturbations — the case the community most wants to solve." X-Cell's gains are explicitly "contested on the held-out compositional splits the Hetzel-style benchmarks expose." The distributional inductive bias interpolates inside the training perturbation space and does not extrapolate out of it.

**2. They have not convincingly beaten linear baselines.** This is the harder one. Squidiff's own entry flags that it "has not yet faced the linear-baseline comparisons or metric critiques" of the 2025–26 reckoning — the same reckoning that [why linear baselines win](why-linear-baselines-win.md) catalogs, in which heralded perturbation predictors repeatedly lose to a tuned ridge regression once the metric is chosen honestly. A method that generates beautiful distributions but does not beat a linear baseline on the decision you actually care about has not yet earned its complexity.

Underneath both cracks is one **structural** fact, and it is the important one: every model in this school predicts the **expression of survivors**. The generator is mass-conserving — it transports a control population onto a treated population of the same total mass — so it has **no death-versus-transition split and emits no survival probability**. It models what the remaining cells look like, never who remained. That is not a bug in any one paper; it is the definition of the school.

## Why this is the opening, not the competition

The survival field is not a better entry in this race. It changes the question. The generation school asks *what do the survivors look like?* — a crowded axis currently losing to linear baselines. The survival field asks *who survived, and can you predict it for a drug you have never run?* — and to answer it the model must emit an object none of these produce: a **decomposable** (death vs. transition), **identifiable** (up to the compositional constant), **extrapolatable** (dose-as-stress) survival probability. A linear baseline cannot compete on that axis because it does not produce the object; neither can a mass-conserving generator. The crowdedness of the generation school is the evidence that the *other* axis is open.

## What we borrow, and what we change

The right relationship to this school is not avoidance — it is selective theft.

- **Borrow the engine, change the conservation law.** Use Squidiff's diffusion or CellFlow's flow as the transport branch — but make it **unbalanced / death-aware**, so the generator may destroy mass and a growth head reports how much. In that framing **Squidiff is the mass-conserving special case of our movement branch**, and the unbalanced Schrödinger-bridge / [growth-aware flow](https://arxiv.org/abs/2505.13413) work (and the [drug-death UDSB](https://arxiv.org/abs/2306.09099)) is the version that emits the survival head Squidiff lacks.
- **Borrow CausCell's causal framing.** Its structural-causal-model-plus-diffusion construction is the closest in the cluster to treating the perturbation as an intervention rather than a label — exactly our [causal](causal-models-fm-and-vc.md) reading of the survival field.
- **Borrow UNAGI's instinct, drop its requirement.** Scoring an intervention by *trajectory direction* is morally our hazard; but UNAGI needs a longitudinal timecourse, while the survival field reads the integrated hazard off a single snapshot.
- **Steal the discipline above all.** Adopt, from day one, the evaluation the school got caught without: a tuned **linear baseline**, **combinatorial / held-out-molecule splits**, and honest **distributional metrics** (energy distance, plus our depletion-specific scores). The discipline is as much the moat as the object — without it, a survival head on a generator inherits the same reckoning.

## The cluster on one axis

| School | Models | Models death? | Splits death/transition? | Generalizes to unseen drug? | Beaten by linear baseline (per library)? |
|---|---|---|---|---|---|
| Disentanglement | CPA, chemCPA | no | no | partial (compositional) | often, at scale |
| GRN-simulation | CellOracle | indirect | no | mechanistic, not learned | n/a (different task) |
| Distributional-generation | Squidiff, CellFlow, scDiffusion, X-Cell | **no (mass-conserving)** | **no** | interpolates, fails combinatorial | **not yet shown to beat it** |
| Causal-counterfactual | CausCell | no | no | counterfactual, not dose | unevaluated |
| **Survival field (ours)** | — | **yes** | **yes (WFR split)** | **yes (dose-as-stress)** | **must beat it by design** |

## The honest risk to ourselves

The cautionary tale runs both ways. If we bolt a survival head onto a generator and then evaluate it the way the school did — in-distribution, against GEARS, on a favorable metric — we will reproduce their result and their fate. The survival field's claim to be different is only as good as the evaluation that backs it: held-out molecules, held-out doses, a linear baseline that produces *some* survival proxy, and a mechanistic anchor (BH3 profiling) the generators never invoke. The object is the thesis; the reckoning-grade evaluation is the proof.

## The thesis, in one line

The distributional-generation school — Squidiff, CellFlow, scDiffusion, X-Cell — answers *what do the survivors look like?* with the right engine and the wrong conservation law, and is still waiting to beat a linear baseline. The survival field answers *who survived, predictably for a drug never run?* — so the move is to take their diffusion/flow engine, make it unbalanced so a growth head becomes survival, borrow CausCell's causal framing, and hold ourselves to the linear-baseline reckoning from the first experiment.
