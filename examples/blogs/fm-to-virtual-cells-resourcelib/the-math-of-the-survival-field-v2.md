---
title: 'The math behind the survival field (v2): a task breakdown with a tool for every part — classical math, modern ML, and how they connect'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- perturbation
- viability
- optimal-transport
- survival-analysis
- causal-inference
summary: "A v2 of the survival-field methods primer, answering the fair critique that v1 was just old math. The fix is not to swap math for ML but to break the model into modules and pick the right tool per module — classical math where it supplies an inductive bias (a constraint, an identifiability statement, an extrapolation guarantee), modern ML where it supplies flexible function approximation. Eight modules: (M0) frozen encoders Tahoe-x1 + MoLFormer, optionally made viability-aware with adapters; (M1) amortized conditioning on (drug,dose) via FiLM or hypernetworks, the single shared backbone that drives every other head; (M2) the death branch, an accelerated-life-testing hazard whose dose-monotonicity is guaranteed by a monotonic neural network (UMNN / constrained monotonic nets) rather than hoped for; (M3) the movement branch, modern neural transport — flow matching, Schrödinger bridges, and crucially the unbalanced / growth-aware variants (UDSB, shown on drug-induced death; CytoBridge; Joint Velocity-Growth Flow Matching) whose growth rate IS the death field, unifying M2 and M3 through the Wasserstein-Fisher-Rao split; (M4) a negative-binomial count likelihood plus the compositional identifiability clause math must own; (M5) one differentiable composite objective on Tahoe-100M with whole molecules and doses held out; (M6) calibrated uncertainty (deep ensembles, conformal) feeding the closed loop; (M7) evaluation against WOT, moscot, CellOT, chemCPA, CellFlow, State. The thesis: old math is the skeleton (constraints, identifiability, extrapolation), modern ML is the muscle (flow matching, amortized conditioning, monotone neural hazards), and the model is the join. Going pure black-box would discard the death/transport split and collapse back into predicting expression-of-survivors — the exact hole the program set out to escape. Every method named is verified to a real paper."
starred: false
---

> *Version 2 of the [survival-field math primer](what-disappears-conditional-viability-v3.md) — v1 taught the classical objects from scratch; the fair reply was "that is just old math, where is the ML?" This version answers it properly, by breaking the model into modules and choosing a tool for each. Read the [v3 model essay](what-disappears-conditional-viability-v3.md) for the why; this is the engineering. Part of the [reachability / viability program](cell-state-reachability-as-viability-theory.md), built on the [diffusion / density backbone](diffusion-and-flow-matching-for-virtual-cells.md), a [causal](causal-models-fm-and-vc.md) object, with uncertainty feeding the [agent + FM + machine closed loop](agent-fm-machine-closed-loop.md) via the [surprise / uncertainty signal](surprise-and-uncertainty-in-cell-fms.md).*

## The wrong question and the right one

"It's just old math — should we add ML?" is the wrong question, because it treats math and ML as substitutes. They are not. **Classical math supplies inductive bias** — a constraint, an identifiability statement, an extrapolation guarantee — and **modern ML supplies function approximation** — flexible, high-dimensional fits learned from data. A good model uses each for what it is good at, and the engineering is the *seam* between them. So the right question is: break the task into modules, and for each, ask whether the load-bearing part is a *constraint* (reach for math) or an *approximation* (reach for ML), then make the interfaces line up. That is this essay.

## The givens and the target

**Givens.** [Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398v3.full): control and drug-treated single-cell populations across ~1,100 drugs × 50 lines × a dose grid, as compositional counts, one 24 h snapshot. A frozen cell-state encoder, [Tahoe-x1](https://doi.org/10.1101/2025.10.23.683759), giving *z* ∈ ℝᵏ. A frozen drug-structure encoder, [MoLFormer](https://arxiv.org/abs/2106.09553), giving *c_g*. A scalar dose *d*.

**Target.** A survival field π(*z*\|*g*,*d*) and a survivor transport that together (a) **split death from state-transition**, (b) **generalize to unseen drug and dose**, (c) respect **compositional identifiability**, and (d) emit **calibrated uncertainty** for the experiment-selection loop.

## The task graph

> encoders (M0) → conditioning (M1) → { death branch (M2) ‖ movement branch (M3) } → count likelihood + identifiability (M4) → one objective (M5) → uncertainty/acquisition (M6) → evaluation vs baselines (M7).

The two branches M2 and M3 are the heart, and — this is the punchline of the whole design — modern unbalanced transport lets them be **two outputs of one network**, because the geometry that separates death from movement is the same geometry flow matching estimates. Module by module:

## M0 — Encoders: state and structure

**Job.** *z* = cell state, *c_g* = drug, plus a dose representation.
**Classical math.** PCA or a linear latent; ECFP molecular fingerprints; a spline/basis expansion of log-dose.
**Modern ML.** Frozen [Tahoe-x1](https://doi.org/10.1101/2025.10.23.683759) and [MoLFormer](https://arxiv.org/abs/2106.09553); if the frozen latent drops viability-relevant axes (a real risk), insert small [adapters](https://arxiv.org/abs/1902.00751) and fine-tune only those.
**Pick.** Frozen FMs + optional adapters — keeps the modular, cheap front end while letting the latent become viability-aware if evaluation demands it.
**Seam.** Emits (*z*, *c_g*, *d*) into M1.

## M1 — Conditioning: the shared amortization backbone

**Job.** Turn (*c_g*, *d*) into a modulation signal that specializes every downstream head, so the model generalizes to *unseen* drugs and doses instead of memorizing seen wells.
**Classical math.** Concatenate covariates; basis features.
**Modern ML.** [FiLM](https://arxiv.org/abs/1709.07871) feature-wise (γ, β) modulation; [hypernetworks](https://arxiv.org/abs/1609.09106) that generate weights from the conditioning vector; cross-attention/adapters.
**Pick.** FiLM by default (cheap, proven), hypernetwork if a drug needs strong specialization.
**Seam — the most important one.** Compute a *single* conditioning vector **h = f(c_g, d)** and use it to drive **both** the death branch (M2) and the movement branch (M3). One backbone, two heads: that shared **h** is what makes the model coherent rather than two stapled-together sub-models.

## M2 — The death branch (hazard / survival)

**Job.** π(*z*\|*g*,*d*) = exp(−τ·λ), monotone in dose.
**Classical math.** Cox proportional hazards, competing risks, and reliability engineering's **accelerated life testing** — dose-as-stress with an inverse-power-law/Arrhenius acceleration that *extrapolates*; radiobiology's linear-quadratic curve is the scalar special case.
**Modern ML.** Deep hazard models — [DeepSurv](https://arxiv.org/abs/1606.00931), [DeepHit](https://ojs.aaai.org/index.php/AAAI/article/view/11842) (competing risks, no PH assumption), [SODEN](https://arxiv.org/abs/2008.08637) (neural-ODE hazard), [Deep Survival Machines](https://arxiv.org/abs/2003.01176) — and the key trick: **enforce dose-monotonicity by architecture** with a [UMNN](https://arxiv.org/abs/1908.05164), a [constrained monotonic net](https://arxiv.org/abs/2205.11775), or a [deep lattice network](https://arxiv.org/abs/1709.06680).
**Pick — a math/ML fusion.** Keep the ALT functional form, learn its parts with nets, and make dose-monotonicity *guaranteed*:

> log λ(*z*,*g*,*d*) = log λ₀(*z*) + monotone_net( log *d* ; **h** ),

where λ₀ is an MLP on *z* and `monotone_net` is a UMNN whose output is monotone in dose by construction. Classical skeleton (ALT, exp(−H)), neural muscle (flexible heads), hard constraint (no drug gets safer at higher dose) — none of which a black box gives you for free.
**Seam.** π reweights the control sample before transport — the Fisher–Rao/reaction side of the next module.

## M3 — The movement branch (transport)

**Job.** Move the survivors from control states to treated states.
**Classical math.** Optimal transport — Monge/Kantorovich, Brenier's "map = gradient of a convex potential," entropic [Sinkhorn](https://arxiv.org/abs/1306.0895), and **unbalanced OT** ([Wasserstein–Fisher–Rao / Hellinger–Kantorovich](https://arxiv.org/abs/1506.06430)) which permits mass creation/destruction.
**Modern ML.** This is where the toolbox has moved fastest. Static neural OT: [ICNN Monge maps](https://arxiv.org/abs/1908.10962), the [Monge gap](https://arxiv.org/abs/2302.04953) regularizer, differentiable [Sinkhorn divergences](https://arxiv.org/abs/1706.00292). Dynamic, generative transport: [flow matching](https://arxiv.org/abs/2210.02747), [OT-CFM](https://arxiv.org/abs/2302.00482), and [Schrödinger bridges](https://arxiv.org/abs/2106.01357) ([DSBM](https://arxiv.org/abs/2303.16852), [[SF]²M](https://arxiv.org/abs/2307.03672)) — a Schrödinger bridge is just *dynamic entropic OT*, so it is the same object v1 taught, made into a learnable SDE. And — directly on our problem — the **unbalanced / growth-aware** family: [Unbalanced Diffusion Schrödinger Bridge](https://arxiv.org/abs/2306.09099) (with killing/birth terms, demonstrated on *drug-induced cell death*), [CytoBridge / unbalanced mean-field SB](https://arxiv.org/abs/2505.11197), and [Joint Velocity–Growth Flow Matching](https://arxiv.org/abs/2505.13413), which learns a displacement field *and* a per-cell growth/death rate together via semi-relaxed OT. [Metric flow matching](https://arxiv.org/abs/2405.14780) keeps transported survivors on the data manifold.
**Pick — and the unification.** Use a **growth-aware flow / unbalanced Schrödinger bridge**. Its defining feature is the v1 punchline made operational: any evolution splits into a **transport velocity** (where mass moves) plus a **growth rate** (how much mass appears or vanishes). So the network emits *both* — and the **growth rate output *is* the death field π**, while the velocity *is* the state transition. M2 and M3 stop being two modules and become two heads of one growth-aware flow, conditioned on the same **h**.
**Seam.** This is the central seam of the entire model: the WFR geometry *defines* the death/transport split the biology needs, and flow matching is merely its scalable estimator. The classical math says *what* the decomposition is; the ML says *how* to fit it at 100M-cell scale.

## M4 — Count likelihood and identifiability

**Job.** Compare the predicted treated distribution to observed compositional counts, and confront the constant.
**Classical math.** A Dirichlet-multinomial/compositional likelihood; the **identifiability clause** — compositional counts pin π only up to a per-condition multiplicative constant (the occupancy / Elkan–Noto / Heckman constant). This is a *constraint*, and no amount of ML dissolves it.
**Modern ML.** A negative-binomial / ZINB decoder à la [scVI](https://doi.org/10.1038/s41592-018-0229-2) or [ZINB-WaVE](https://doi.org/10.1038/s41467-017-02554-5) for the count process; [scCODA](https://doi.org/10.1038/s41467-021-27150-6) / [sccomp](https://doi.org/10.1073/pnas.2203828120) for evaluating population-shift, not as the core.
**Pick — math leads.** An NB likelihood for the counts, plus a low-dose calibration prior (survival ≈ 1 near zero dose) or a spike-in/absolute-count anchor to pin the constant. State the honest limit: without an anchor, only *relative* survival across states and doses is identified.
**Seam.** Supplies the data-fit term of the objective.

## M5 — One differentiable objective

**Job.** Fit all of it end-to-end.
**Composite loss** = a growth-aware flow-matching/Schrödinger-bridge transport term + an unbalanced mass-relaxation (death) term + the NB compositional likelihood + a Monge-gap/entropic regularizer (dose-monotonicity is *free*, baked into M2's architecture). Trained by minibatch SGD over wells on Tahoe-100M, with **whole molecules and whole dose levels held out** so generalization is tested honestly. Differentiable [Sinkhorn](https://arxiv.org/abs/1706.00292) and simulation-free [flow-matching](https://arxiv.org/abs/2210.02747) losses keep it all one backward pass.
**Seam.** One graph, one shared **h** backbone, one optimizer.

## M6 — Uncertainty and acquisition

**Job.** Calibrated uncertainty over unseen (*g*,*d*) → choose the next experiments.
**Classical math.** Gaussian processes; [conformal prediction](https://arxiv.org/abs/2107.07511) for distribution-free, finite-sample guarantees.
**Modern ML.** [Deep ensembles](https://arxiv.org/abs/1612.01474), [MC-dropout](https://arxiv.org/abs/1506.02142), [evidential deep learning](https://arxiv.org/abs/1806.01768).
**Pick.** Deep ensemble for the predictive uncertainty + conformal to gate queries — the acquisition signal that feeds the [closed loop](agent-fm-machine-closed-loop.md).

## M7 — Evaluation and baselines

Held-out wells (interpolation), unseen molecule (the load-bearing test), unseen dose (the ALT-extrapolation test), and BH3-profiling correlation (an orthogonal mechanistic anchor). Baselines, by what they cover: [Waddington-OT](https://doi.org/10.1016/j.cell.2019.01.006) and [moscot](https://doi.org/10.1038/s41586-024-08453-2) (death rates, but per-condition, no generalization); [CellOT](https://doi.org/10.1038/s41592-023-01969-x) (neural OT response, mass-conserving); [chemCPA](https://arxiv.org/abs/2204.13545) and [CellFlow](https://doi.org/10.1101/2025.04.11.648220) (drug-conditioned generalization, but expression-of-survivors, not survival); the Arc [State](https://doi.org/10.1101/2025.06.26.661135) model (strong amortized comparator).

## The whole model in one table

| Module | Job | Classical-math tool | Modern-ML tool | Our pick |
|---|---|---|---|---|
| M0 Encoders | state, drug, dose → vectors | PCA, fingerprints, splines | Tahoe-x1 + MoLFormer, adapters | frozen FMs + optional adapters |
| M1 Conditioning | amortize over (g,d) | covariate concat | FiLM, hypernet, adapters | FiLM → shared **h** |
| M2 Death | π = exp(−τλ), dose-monotone | Cox / competing-risks / ALT | DeepHit, SODEN, UMNN | ALT form + monotone net |
| M3 Movement | transport survivors | OT / unbalanced OT (WFR) | flow matching, SB, **growth-aware FM/UDSB** | growth-aware flow (death = its growth head) |
| M4 Likelihood | fit counts + pin constant | Dirichlet-multinomial, identifiability | scVI NB/ZINB | NB + calibration anchor |
| M5 Objective | end-to-end fit | entropic UOT divergence | Sinkhorn/flow-matching losses | composite differentiable loss |
| M6 Uncertainty | calibrate, acquire | GP, conformal | deep ensembles, evidential | ensemble + conformal |
| M7 Eval | falsify, compare | held-out design | WOT/moscot/CellOT/chemCPA/CellFlow/State | the four held-out tests + BH3 |

## How it connects — the smooth seam, restated

Read top to bottom it is a single differentiable graph: **frozen encoders** produce (*z*, *c_g*, *d*); **one conditioning vector h(c_g,d)** modulates **one growth-aware flow network** that emits a **velocity** (the survivor transport) and a **growth rate** (which becomes the survival field π, with the ALT/monotone structure of M2 wired into that head); the (π-thinned, transported) control sample is compared to observed treated counts under an **NB likelihood**; the whole thing is fit with a **composite UOT + likelihood loss** and **ensembled** for uncertainty. The connections are clean for one reason: **the classical math and the ML are describing the same objects at different resolutions.** Survival = exp(−H), the WFR death/transport split, dose-monotonicity, and compositional identifiability are the *constraints*; deep encoders, FiLM conditioning, monotone neural hazards, and flow matching are the *approximators*; and unbalanced transport is exactly where the two meet — the geometry names the decomposition, the network estimates it.

## Where pure ML would lose the plot

The tempting shortcut is to drop all the structure and train one big conditional generator of treated cells. It would work — and it would reproduce the field's existing hole: you would predict the *expression of survivors* (what CPA, [scGen](https://doi.org/10.1038/s41592-019-0494-8), CellFlow already do well) while silently discarding the death/transport split, the dose-monotonicity, and the identifiability clause. Those three are not decoration; they are the entire reason this is a *survival* model and not another perturbation predictor. So the discipline is fixed: **modern ML for the maps and the conditioning; classical math for the constraints and the identifiability** — and the unbalanced-transport seam is what lets the two be one model rather than two.

## The thesis, in one line

Old math is the skeleton — the constraints, the identifiability, the extrapolation guarantee. Modern ML is the muscle — flow matching, amortized conditioning, monotone neural hazards. The model is the **join**, and the joint is the Wasserstein–Fisher–Rao split, where a growth-aware flow's growth head *is* the survival field and its velocity head *is* the state transition: one network, conditioned once, trained once, that finally models *who survived* with the full modern toolbox pointed at it.
