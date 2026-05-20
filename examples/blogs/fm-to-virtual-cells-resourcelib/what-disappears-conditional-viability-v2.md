---
title: 'What disappears, and why (v2): the math/CS home of conditional viability, and who already solved it'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- perturbation
- viability
- optimal-transport
- survival-analysis
- causal-inference
summary: "A v2 deepening of the depletion essay, from a math/CS standpoint: what model class is the survival field pi(x|drug,dose), and has it been solved elsewhere? The answer is that one task wears five hats — density-ratio estimation, unbalanced optimal transport, competing-risks survival, continuous-dose causal inference, and selection/PU learning — tied together by three identities. The survival weight IS a density ratio IS inverse-propensity weighting IS MaxEnt presence-only. The gone-versus-moved split IS the unbalanced-OT reaction/transport decomposition IS competing-risks cause-specific hazards IS a population-balance sink term. The dropout confound IS PU learning's Elkan-Noto constant IS Heckman selection IS ecology's occupancy IS astronomy's Malmquist bias — meaning pi is identifiable only up to a constant without absolute counts. Biology has the descriptive half (Milo, MELD, scCODA) and the expression-of-survivors half (CPA, CellFlow, CellOT, Tahoe-x1) but never the survival-field union; Waddington-OT/moscot come closest yet need a timecourse and cannot generalize. Reliability engineering (accelerated life testing) and ecology (occupancy / presence-only) already solved the structural and selection problems. The verdict: novel as a combination, not a primitive — and the trick to borrow is the occupancy-style joint likelihood paired with a population-balance death/transport split."
starred: false
---

> *Version 2 of the depletion essay — where v1 asked "what model should we build," this asks "what model class is it, mathematically, and who already solved it." Still the drug-conditional, empirically-fittable instance of the [reachability / viability program](cell-state-reachability-as-viability-theory.md), built on the [diffusion / density backbone](diffusion-and-flow-matching-for-virtual-cells.md), the τ→0 face of [stability and lifespan](cell-stability-and-niche-dependence-in-vc-fms.md), and the natural acquisition target for the [agent + FM + machine closed loop](agent-fm-machine-closed-loop.md). Prioritization rides the [surprise / uncertainty signal](surprise-and-uncertainty-in-cell-fms.md).*

## From "what to build" to "what is this, formally"

The first version proposed modeling drug-induced depletion as a learned survival field π(*x*|*g*,*d*) — the probability a cell at state *x* persists under drug *g* at dose *d* — fit on Tahoe-100M with density-ratio + unbalanced optimal transport + a compositional likelihood. The natural next question is a math/CS one: *what type of model is that, and has anyone already solved it?* The honest answer reframes the whole project. The task is not one model; it is a single object wearing five different hats, and the field that owns each hat is mostly not biology.

## One object, five hats

Write the task abstractly: given a control density p₀(x) and a treated density p₁(x|g,d), learn a per-point function explaining the **mass change**, **splitting destruction from transport**, and **generalizing to unseen g,d** — under relative/compositional counts and informative dropout. Every one of the following is a complete, mature framing of exactly that:

| Framing | π(x\|g,d) is… | Splits death/transition? | Generalizes to g,d? | Field of origin |
|---|---|---|---|---|
| Density-ratio estimation | the ratio p₁/p₀ | no | no | ML/stats ([RuLSIF](https://arxiv.org/abs/1106.4729)) |
| Unbalanced optimal transport | the Fisher–Rao **source/death field** | **yes** | via conditional neural OT | applied math ([Hellinger–Kantorovich](https://link.springer.com/article/10.1007/s00222-017-0759-8)) |
| Competing-risks survival | a **cause-specific hazard** | **yes** | yes (covariate hazard) | biostatistics ([Fine–Gray](https://www.tandfonline.com/doi/abs/10.1080/01621459.1999.10474144)) |
| Continuous-dose causal | a treatment effect; **IPW = a density ratio** | no | yes ([dose GPS](https://onlinelibrary.wiley.com/doi/10.1002/0470090456.ch7)) | econometrics |
| Selection / PU learning | a **survival/detection propensity** | partial | partial | ML ([Elkan–Noto](https://dl.acm.org/doi/10.1145/1401890.1401920)) |

None is a stranger to the others. They are the same problem, which becomes obvious once you line up the identities.

## The three identities

This is the real payoff of asking the math question. Three equalities collapse the apparent zoo:

**1. The survival weight is a density ratio.** π ∝ p₁/p₀ is simultaneously the importance weight of covariate-shift adaptation, the inverse-propensity weight of causal inference ([Rosenbaum & Rubin, 1983](https://academic.oup.com/biomet/article/70/1/41/240879)), and — in ecology — the MaxEnt presence-only model ([Phillips et al., 2006](https://www.sciencedirect.com/science/article/abs/pii/S0304380005002796)), which is a Gibbs density-ratio fit against a background. Four fields, one quantity.

**2. "Gone vs moved" is one canonical decomposition.** The unbalanced-OT split of a coupling into a *reaction (growth–death)* term and a *transport* term ([Chizat et al.](https://arxiv.org/abs/1508.05216)) is the same split as competing-risks cause-specific hazards (death = one cause, transition = another), which is the same split as the *sink* term versus the *transport* term in a population-balance equation ([Ramkrishna, 2000](https://www.elsevier.com/books/population-balances/ramkrishna/978-0-12-576970-9)). Destruction and movement are separated the identical way in applied math, biostatistics, and chemical engineering.

**3. The dropout confound is one identifiability problem.** Dead cells are unobserved, so π is recoverable only up to a constant — and that exact statement is PU learning's Elkan–Noto labeling constant ([Elkan & Noto, 2008](https://dl.acm.org/doi/10.1145/1401890.1401920)), Heckman's sample-selection correction ([Heckman, 1979](https://www.jstor.org/stable/1912352)), ecology's occupancy/detection split of true-absence from non-detection ([MacKenzie et al., 2002](https://esajournals.onlinelibrary.wiley.com/doi/10.1890/0012-9658%282002%29083%5B2248%3AESORWD%5D2.0.CO%3B2)), and astronomy's Malmquist/selection-function bias. This sharpens v1's loose caveat ("absolute abundance is load-bearing") into a precise one: **without total counts, π is identified only up to a multiplicative constant**, and every selection-aware field already knows it.

## What biology has — and the hole

The single-cell literature splits cleanly into two halves, neither of which is the survival field. The **descriptive** half — Milo, MELD, scCODA, sccomp — detects depletion well but cannot predict for an unseen drug and does not separate killing from movement. The **expression-of-survivors** half — CPA/chemCPA, CellFlow, PerturbNet, scGen, [CellOT](https://www.nature.com/articles/s41592-023-01969-x), and the [Tahoe-x1](https://www.biorxiv.org/content/10.1101/2025.10.23.683759.full.pdf) foundation model — generalizes across drugs but assumes **conserved mass** and never emits a survival probability; it models what the remaining cells look like, not who remained. The closest existing object is **Waddington-OT** ([Schiebinger et al., 2019](https://www.cell.com/cell/fulltext/S0092-8674(19)30039-X)) and unbalanced **moscot** ([Klein et al., 2025](https://www.nature.com/articles/s41586-024-08453-2)), which uniquely attach per-cell growth/death rates and split killed from transported mass — but they are *descriptive over an observed timecourse* and have no mechanism to generalize to unseen drugs or doses. The survival-field union does not exist in cell biology.

## Where it's already solved: reliability and ecology

Two non-biology fields have solved the hard parts outright. **Reliability engineering** is the tightest structural match: accelerated life testing ([Nelson, 1990](https://onlinelibrary.wiley.com/doi/book/10.1002/9780470316795)) models failure-time as a function of applied stress and extrapolates the hazard to *unseen stress levels* — which is precisely π(x|g,d) as a covariate-conditioned hazard with **dose as stress**, the generalization requirement built into the method's purpose. **Ecology** owns the confound: occupancy–detection models are the definitive true-absence-vs-non-detection disentangler, and MaxEnt already fits density-ratio survival on single-snapshot, absence-free data. And **population-balance equations** are the only framework that *mechanistically* separates a death sink from a state-transport flux. The radiobiology linear-quadratic curve ([McMahon, 2019](https://iopscience.iop.org/article/10.1088/1361-6560/aaf26a)) is even the literal "dose → surviving fraction" object, just without per-state resolution.

## Verdict: novel as a combination, not a primitive

Every component is mature in isolation — unbalanced OT, competing-risks survival, chemical-embedding covariates, PU/selection correction. The contribution is the **integration applied to single-cell snapshots with drug-embedding generalization**, which biology has not assembled: it has the descriptive half and the expression half but never the survival-field union, and the one method that models cell death (Waddington-OT) cannot generalize. The honest one-liner: we would be importing accelerated-life-testing's dose→hazard extrapolation, ecology's occupancy/presence-only likelihood, and unbalanced-OT's death field into one conditional survival model on cells. The single most transferable trick we are currently missing is the **occupancy-style joint likelihood** — explicitly factoring an abundance/state process from a survival/detection propensity π — paired with the **population-balance sink-vs-transport** decomposition, because only that construction simultaneously decouples death from transition *and* corrects the compositional/selection bias that pure density-ratio methods leave latent. The model is not new mathematics. It is a translation, and naming the source fields is what makes it falsifiable rather than ad hoc.
