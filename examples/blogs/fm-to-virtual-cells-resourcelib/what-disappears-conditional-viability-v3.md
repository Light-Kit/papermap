---
title: 'What disappears, and why (v3): the model — a conditional survival field on Tahoe-100M, with reliability engineering as the engine and Waddington-OT / moscot as baselines'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- perturbation
- viability
- optimal-transport
- survival-analysis
- causal-inference
summary: "Where v2 proved the survival field pi(x|drug,dose) is novel as a combination rather than a primitive, v3 builds the combination as one trainable model. The object is an integrated-hazard surviving fraction in a frozen Tahoe-x1 latent space, with the drug entering through a frozen MoLFormer chemical embedding and the dose entering through reliability engineering's acceleration form — the inverse-power-law / Arrhenius stress model that radiobiology's linear-quadratic curve is the scalar special case of. That parameterization is the whole point: dose-as-stress makes pi monotone and extrapolatable to unseen dose, which is exactly the generalization an accelerated-life-test is designed to give. Training is an entropic unbalanced-OT objective whose marginal-relaxation (death) component IS the survival field and whose transport component IS the state transition, fit across Tahoe-100M's 1,100 drugs x 50 lines x dose grid with whole molecules and whole dose levels held out. Waddington-OT and moscot are not the engine — they are the in-distribution baselines pi must match on seen conditions and then beat out-of-distribution, where their per-condition couplings cannot predict at all. The honest caveats stay first-class: compositional counts identify pi only up to a per-condition constant (the occupancy / Elkan-Noto constant), so an absolute-count anchor or a low-dose calibration prior is load-bearing. Falsified by held-out wells, unseen-molecule prediction, ALT-style dose extrapolation, and BH3-profiling correlation."
starred: false
---

> *Version 3 of the depletion essay — v1 asked "what model should we build," v2 asked "what model class is it, and who already solved it," and this one builds the model. Still the drug-conditional, empirically-fittable instance of the [reachability / viability program](cell-state-reachability-as-viability-theory.md), built on the [diffusion / density backbone](diffusion-and-flow-matching-for-virtual-cells.md), the τ→0 face of [stability and lifespan](cell-stability-and-niche-dependence-in-vc-fms.md), a [causal](causal-models-fm-and-vc.md) object at heart, and the natural acquisition target for the [agent + FM + machine closed loop](agent-fm-machine-closed-loop.md). Prioritization rides the [surprise / uncertainty signal](surprise-and-uncertainty-in-cell-fms.md).*

## From "novel as a combination" to the combination

The second version ended on a verdict: the survival field π(*x*|*g*,*d*) — the probability a cell at state *x* persists under drug *g* at dose *d* — is not new mathematics. It is a translation of three mature ideas into single-cell space — reliability engineering's dose→hazard extrapolation, ecology's occupancy/presence-only likelihood, and unbalanced optimal transport's death field — that biology has never assembled, and the one method that does model cell death (Waddington-OT) cannot generalize to an unseen drug. That is a precise, falsifiable claim. This version takes it at its word and writes the combination down as one trainable model: what the object is, what the loss is, what we import versus invent, and what would prove it wrong.

The design rule the user set, and the one this follows: **build the new model by transferring a non-biology model onto the biological question, and treat the closest single-cell methods — Waddington-OT and moscot — as baselines to beat, not engines to reuse.** Learn from their machinery; do not inherit their limits.

## The object, made concrete

Work entirely in a frozen embedding space so the model never has to relearn what a cell is. A cell state *x* is the [Tahoe-x1](https://www.biorxiv.org/content/10.1101/2025.10.23.683759.full.pdf) latent vector *z* ∈ ℝᵏ. A drug *g* is the frozen [MoLFormer](https://arxiv.org/abs/2106.09553) embedding *c_g* of its structure — the move that lets π predict for molecules never trained on. The dose *d* is a scalar (log-molar).

The survival field is an **integrated hazard collapsed to the snapshot**. Each cell carries a death hazard λ(*z*,*g*,*d*); over the fixed 24 h Tahoe window τ the surviving fraction is

> π(*z*\|*g*,*d*) = exp( −τ · λ(*z*,*g*,*d*) ).

A single snapshot is enough precisely because we never integrate a trajectory — we read the surviving fraction off the cumulative hazard, the same identity radiobiology uses when it writes surviving fraction = exp(−*αD*−*βD*²).

## The engine we import: reliability engineering, made operational

This is the transferred non-biology model, and it is where the design earns its keep. In [accelerated life testing](https://onlinelibrary.wiley.com/doi/book/10.1002/9780470316795) you stress a part and model time-to-failure as a hazard *accelerated* by the stress, with a parametric acceleration law chosen so the fitted hazard **extrapolates to stress levels you never tested**. Map dose to stress and the law writes itself:

> log λ(*z*,*g*,*d*) = log λ₀(*z*) + *s*(*z*, *c_g*) · log *d* + *b*(*z*, *c_g*).

λ₀(*z*) is a state-dependent baseline fragility; *s* and *b* are small MLP heads on the (cell, drug) embedding pair giving an **inverse-power-law acceleration** in dose. Two properties fall out for free, and both are the reason to borrow rather than fit a black box: the hazard is **monotone in dose** by construction (no drug becomes safer at higher concentration), and it **extrapolates** — the whole purpose of an accelerated-life model is to predict the high-stress regime from low-stress data. Radiobiology's linear-quadratic curve is exactly this object with *z* and *g* integrated out; we are restoring the per-state, per-drug resolution it throws away. (An Arrhenius-style or Cox-proportional `exp(s(z,c_g,d))` form is a drop-in alternative; the inverse-power-law is the cleanest dose-as-stress analog.)

## The loss: unbalanced OT, where the death term *is* the survival field

We never observe a death. We observe two compositional densities per well: control p₀(*z*) and treated p₁(*z*\|*g*,*d*). The generative story is that the treated sample is the control population **thinned by survival and then transported**: kill each control cell with probability 1−π, then let the survivors drift to a new state. That is, verbatim, the [unbalanced-OT](https://arxiv.org/abs/1508.05216) decomposition of a coupling into a *reaction (growth–death)* term and a *transport* term — so the training objective is a single unbalanced-OT divergence:

> min over θ (the hazard) and T (a transport map):  𝒲_ub( T#( π_θ · p₀ ) , p₁ ) + ℛ.

𝒲_ub is an [entropic / Sinkhorn](https://arxiv.org/abs/1306.0895) unbalanced OT with KL marginal-relaxation; **the marginal-relaxation (mass-destruction) component IS π_θ**, and the **transport component IS the state transition**, T a neural Monge map ([ICNN](https://arxiv.org/abs/1908.10962), regularized by the [Monge gap](https://arxiv.org/abs/2302.04953)) acting only on survivors. The competing-risks reading is the same split under a different name: death is one cause-specific hazard, state-change is the other. We are not inventing the death/transport separation — moscot already computes it per condition; we are making it a *learned function of (g, d)* instead of a per-well fit.

## The clause that keeps it honest: identifiability up to a constant

v2 sharpened v1's loose caveat into a precise one, and the model has to respect it. Because p₁ is **compositional** — relative counts, dead cells already gone — the total surviving mass per condition is unknown, so π is identified only **up to a multiplicative constant per (g, d)**. This is not a nuisance to paper over; it is ecology's occupancy constant, PU learning's [Elkan–Noto](https://dl.acm.org/doi/10.1145/1401890.1401920) labeling constant, and Heckman selection, all at once. Two ways to pin it, in preference order: (1) an **absolute-count anchor** — spike-ins or per-well cell counts — fixes the constant directly; (2) failing that, an **occupancy-style joint likelihood** that ties near-zero doses to a survival≈1 prior, calibrating the constant the way presence-only models calibrate detection. Stated plainly so a reviewer can hold us to it: **without an absolute anchor, only relative survival across states and doses is identified** — which is still enough to rank vulnerable states and to run the death/transport decomposition, just not to claim an absolute kill fraction.

## Waddington-OT and moscot: baselines, not engine

| | Waddington-OT / moscot | Our π_θ |
|---|---|---|
| Death/transport split | yes (unbalanced coupling) | yes (same split, **learned**) |
| Conditioned on drug structure | no | yes (MoLFormer *c_g*) |
| Predicts unseen drug | **no** | yes (held-out molecule) |
| Predicts unseen dose | no | yes (ALT extrapolation) |
| Needs a timecourse | effectively yes | no (single snapshot) |

[Waddington-OT](https://www.cell.com/cell/fulltext/S0092-8674(19)30039-X) and unbalanced [moscot](https://www.nature.com/articles/s41586-024-08453-2) are the right baselines because they are the *only* single-cell methods that already attach per-cell growth/death and split killed from transported mass. We use them two ways. **In-distribution agreement:** run them per (*g*,*d*) well and check our learned π recovers their death-rate estimates — if it cannot match the specialist on seen conditions, the functional form is wrong. **Out-of-distribution gap:** they have no covariate functional form, so on a held-out molecule or an unseen dose they cannot produce an estimate at all; that gap is the entire contribution. We borrow their reaction/transport decomposition and their entropic solver, and we discard the assumption that every condition gets its own fitted coupling.

## Training on Tahoe-100M

[Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398v3.full) is the substrate that makes the covariate functional form learnable: 100M cells, ~1,100 drugs, 50 lines, dose-resolved, one 24 h snapshot. Freeze Tahoe-x1 (cell encoder) and MoLFormer (drug encoder); train only λ₀, the acceleration heads *s*,*b*, and the transport map T. Each minibatch is a set of wells; per well, compute the entropic-UOT loss between the π-reweighted-transported control density and the observed treated density, and backprop. **Hold out whole molecules and whole dose levels** — not random cells — so the generalization tests below are honest. Cell line enters as a context vector so a line-specific baseline fragility λ₀ is allowed.

## How it is falsified

The same four tests v1 promised, now tied to specific model parts:

- **Held-out wells (interpolation).** Predicted vs. observed depletion per state-bin on conditions inside the training grid.
- **Unseen molecule (the load-bearing test).** Predict the depletion pattern for a drug never trained on, from *c_g* alone — the claim WOT/moscot structurally cannot make.
- **Unseen dose (ALT extrapolation).** Train on low/mid doses, predict the high-dose surviving fraction; success here is a direct test of the inverse-power-law acceleration, not of the data.
- **Mechanistic anchor.** Predicted per-state death hazard should correlate with BH3-profiling apoptotic priming — an orthogonal assay, so agreement is not circular.

## What could break it

Stated up front, because the failure modes are the interesting science: the **compositional constant** (above) is unidentified without an anchor; **death can be confounded with non-lethal dropout** (cell-cycle arrest, doublet loss), which the competing-risks death-vs-transition split is meant to absorb but only if T is expressive enough to claim the arrested cells as *moved* rather than *killed*; the **single 24 h snapshot** conflates fast and slow killing into one integrated hazard, so τ is an assumption, not a measurement; and the whole thing inherits whatever viability-relevant axes **Tahoe-x1's latent space** happens to drop.

## The thesis, in one line

v2 said the survival field is novel as a combination, not a primitive. v3 is the combination as one trainable model: **a reliability-engineering hazard that makes dose behave like stress — monotone and extrapolatable — whose death-versus-transport split is an unbalanced-OT coupling, fit across Tahoe-100M with Waddington-OT and moscot as the in-distribution baselines it must first match and then beat where they go silent.** The mathematics is borrowed on purpose; what is new is pointing all of it at the one cell-biology object — who survived — that the field has been modeling around instead of modeling.
