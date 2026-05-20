---
title: 'The math behind the survival field: hazards, density ratios, and unbalanced optimal transport, from scratch'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- perturbation
- viability
- optimal-transport
- survival-analysis
- causal-inference
summary: "A teaching companion to the v3 model essay. It builds the five mathematical objects the conditional survival field is made of, from first principles and for intuition rather than citation. (1) Survival and hazard: why the surviving fraction is exp(minus the cumulative hazard), why a single snapshot is enough, and how competing risks split death from state-change. (2) The acceleration law: why a parametric dose-as-stress hazard extrapolates to unseen dose where a lookup table cannot, with radiobiology's linear-quadratic curve as the worked special case. (3) Density ratios: why pi is the treated/control ratio, and the classifier trick that estimates a ratio without ever estimating either density. (4) Optimal transport: Monge vs Kantorovich, the Wasserstein distance as cheapest earth-moving, Brenier's theorem (the optimal map is the gradient of a convex function, which is why we use input-convex nets), and the entropic/Sinkhorn blur that makes it differentiable. (5) Unbalanced OT: the one that matters, where relaxing the mass-conservation constraint with a KL penalty lets cells die — and the Wasserstein-Fisher-Rao split of any evolution into a transport velocity (the state transition) and a growth rate (the survival field). It closes with the identifiability lesson (compositional data fixes pi only up to a constant), reads the full training objective symbol by symbol, gives a one-screen cheat sheet, and points to the textbooks."
starred: false
---

> *A math primer for the [v3 model essay](what-disappears-conditional-viability-v3.md) — read that for what we are building and why; read this for the machinery underneath. Part of the [reachability / viability program](cell-state-reachability-as-viability-theory.md), built on the [diffusion / density backbone](diffusion-and-flow-matching-for-virtual-cells.md), the τ→0 face of [stability and lifespan](cell-stability-and-niche-dependence-in-vc-fms.md), and a [causal](causal-models-fm-and-vc.md) object at heart.*

## The one picture to hold

Everything below is in service of a single image. You have a cloud of control cells, a probability density p₀(*x*) over cell-state space. You add a drug and get a second cloud, p₁(*x*\|*g*,*d*). Two things happened between them: **some cells were destroyed** (the cloud lost mass) and **the survivors moved** (the cloud changed shape). The whole modeling problem is to explain the difference between the two clouds as exactly that — *destruction plus movement* — and to learn the destruction part as a function π(*x*\|*g*,*d*), the survival field. Five mathematical tools do this. Take them one at a time.

## Tool 1 — Survival and hazard: where exp(−·) comes from

Start with one cell and one question: what is the chance it is still alive after time *t*? Define the **hazard** λ(*t*) as the instantaneous death rate — the probability of dying in the next tiny instant *given* you have survived until now, divided by the length of that instant:

> λ(*t*) = limₕ→₀ ℙ(die in [*t*, *t*+*h*) \| alive at *t*) / *h*.

The **survival function** S(*t*) = ℙ(alive at *t*) follows from λ by a one-line differential argument: the fractional loss of survivors in each instant is the hazard, dS/S = −λ d*t*, which integrates to

> S(*t*) = exp( −∫₀ᵗ λ(*u*) d*u* ) = exp( −*H*(*t*) ),

where *H* is the **cumulative hazard**. That exponential is not an assumption — it is the only function whose proportional rate of decline equals the hazard. This single identity is why the model writes π = exp(−τ·λ): the survival field is just S evaluated at the snapshot time τ, with the integral collapsed because we read one timepoint, not a curve. **A single snapshot suffices** precisely because S already packs the entire history into one number, the cumulative hazard.

Two more pieces from classical survival analysis carry over. **Proportional hazards** ([Cox, 1972](https://doi.org/10.1111/j.2517-6161.1972.tb00899.x)) writes λ(*t*\|covariates) = λ₀(*t*)·exp(βᵀ*z*) — a shared baseline shape times a covariate multiplier — which is exactly the shape the model borrows, with the cell/drug embedding as the covariates. And **competing risks** is how we separate killing from movement: a cell faces two cause-specific hazards, λ_death and λ_transition, and the total hazard is their sum. We only ever want the first one; the second is the survivors changing state.

## Tool 2 — The acceleration law: why dose-as-stress extrapolates

Now make the hazard depend on dose. The naive route is a lookup table: fit a separate death rate for every dose you measured. It interpolates and **cannot extrapolate** — ask it about a dose you never ran and it has nothing to say. Reliability engineering solved this decades ago with **accelerated life testing**: you stress a component, model time-to-failure as a hazard *accelerated by the stress through a parametric law*, and the law's whole purpose is to let you predict the unstressed lifetime from stressed experiments. The classic forms are the **inverse-power-law** (hazard ∝ stressᵏ) and **Arrhenius** (hazard ∝ exp(−E/kT)). Map dose to stress and you get the model's law:

> log λ(*z*,*g*,*d*) = log λ₀(*z*) + *s*(*z*,*c_g*)·log *d* + *b*(*z*,*c_g*).

The lesson is *why a parametric law buys extrapolation*: a function with a small number of physically-motivated parameters, fit on the doses you have, defines a value at doses you don't — and because it is monotone in log *d* by construction, no drug can be predicted to get safer at higher concentration. Radiobiology already uses the scalar version of exactly this: the **linear-quadratic** survival curve writes the surviving fraction of an irradiated population as

> SF(*D*) = exp( −α*D* − β*D*² ),

which is our π with the cell state *z* and drug *g* integrated out — a cumulative hazard *H*(*D*) = α*D* + β*D*² that is quadratic in dose. The model just restores the per-state, per-drug resolution that the population-average curve throws away.

## Tool 3 — Density ratios: estimating π without estimating any density

Why is the survival field a *ratio*? Picture the survivors-only version of the experiment: kill each control cell with probability 1−π and leave the rest where they are. The treated density at a point is then the control density times the survival probability there, p₁(*x*) ∝ π(*x*)·p₀(*x*), so

> π(*x*) ∝ p₁(*x*) / p₀(*x*).

The survival field is the **treated-to-control density ratio**. This same quantity has four names across four fields, and recognizing them is half the insight: it is the **importance weight** that reweights one distribution to look like another, the **inverse-propensity weight** of causal inference, and ecology's **MaxEnt presence-only** model. It is also what [MELD and Milo estimate descriptively](what-disappears-conditional-viability-v3.md) when they score perturbation-enriched neighborhoods.

The practical magic is that **you never have to estimate p₀ or p₁ themselves** — estimating a density in high dimensions is hard; estimating their ratio is easy. Train a probabilistic classifier to tell control cells (label 0) from treated cells (label 1) with balanced classes. Its output odds *are* the ratio:

> p₁(*x*)/p₀(*x*) = ℙ(treated \| *x*) / ℙ(control \| *x*).

That is the classifier-based density-ratio trick (the same idea behind [RuLSIF](https://arxiv.org/abs/1106.4729) and the [density-ratio literature](https://doi.org/10.1017/CBO9781139035613)). A discriminator gives you the survival field for free — *if* mass were conserved. It is not, which is why we need transport.

## Tool 4 — Optimal transport: moving one cloud onto another

The survivors also *move*, so we need a principled notion of "the cheapest way to turn cloud p₀ into cloud p₁." That is optimal transport. **Monge's** original problem: find a map *T* that sends each point *x* to *T*(*x*) so that the pushed-forward p₀ equals p₁, minimizing the total moving cost ∫ ‖*x* − *T*(*x*)‖² dp₀. The map can fail to exist (you cannot split a point), so **Kantorovich** relaxed it to a *coupling* γ — a joint distribution over (source, target) pairs with the right marginals — minimizing ∫ ‖*x*−*y*‖² dγ ([Kantorovich, 1958](https://doi.org/10.1287/mnsc.5.1.1)). The minimum cost is the squared **Wasserstein distance**, the literal "earth-mover's distance."

Two facts make this computable and learnable. **Brenier's theorem** ([1991](https://doi.org/10.1002/cpa.3160440402)) says the optimal Monge map for squared-Euclidean cost is the *gradient of a convex potential*, *T* = ∇φ with φ convex — which is precisely why the model parameterizes *T* with an **input-convex neural network** ([Makkuva et al.](https://arxiv.org/abs/1908.10962)): you learn φ, take its gradient, and you are guaranteed a valid OT map. And **entropic regularization** adds a small ε·(entropy of γ) penalty, which blurs the coupling, makes the problem strictly convex and *differentiable*, and yields the fast **Sinkhorn** iteration ([Cuturi, 2013](https://arxiv.org/abs/1306.0895)) — the workhorse that lets OT sit inside a gradient-descent training loop. (For the full theory, [Villani, 2009](https://doi.org/10.1007/978-3-540-71050-9); for the computational side, [Peyré & Cuturi, 2019](https://arxiv.org/abs/1803.00567).)

## Tool 5 — Unbalanced OT: the one that lets cells die

Here is the catch that breaks plain OT for our problem: **standard OT conserves mass.** Every gram of earth in p₀ must arrive somewhere in p₁. But cells *die* — mass disappears — so the marginals do not match, and forcing them to match would mislabel killing as movement. The fix is **unbalanced optimal transport**: replace the hard marginal constraints with soft penalties. Instead of demanding the coupling's marginals equal p₀ and p₁ exactly, you allow them to differ and pay a KL price for the difference:

> min over couplings γ:  ∫ ‖*x*−*y*‖² dγ  +  ρ·KL(γ's source marginal ‖ p₀)  +  ρ·KL(γ's target marginal ‖ p₁).

Now γ need not preserve mass — it can create or destroy it — and **the amount of marginal violation at each point is exactly the local growth/death rate.** That is the death field. Geometrically this is the **Wasserstein–Fisher–Rao** (a.k.a. Hellinger–Kantorovich) distance ([Chizat et al.](https://arxiv.org/abs/1508.05216); [Liero, Mielke & Savaré, 2018](https://doi.org/10.1007/s00222-017-0759-8)), and its defining feature is the cleanest statement of the entire model:

> any evolution of a density splits into a **transport velocity** (Wasserstein — where mass moves) plus a **growth rate** (Fisher–Rao — how much mass appears or vanishes).

Read that split through the biology and the model writes itself: **the Fisher–Rao growth rate (when negative) is the survival field π; the Wasserstein velocity is the state transition.** Death and movement are separated by the geometry itself, not by a heuristic. This is the same separation competing-risks survival makes with its two cause-specific hazards — two languages, one decomposition. It is also the part [Waddington-OT and moscot](what-disappears-conditional-viability-v3.md) already compute per condition; the model's only move is to make π a learned function of (*g*,*d*) instead of a per-well fit.

## The identifiability lesson you cannot skip

One subtlety governs what you are allowed to claim. Single-cell counts are **compositional** — you measure proportions, not absolute numbers, because the dead cells are gone before sequencing and the total is normalized away. So the survival field is recoverable only **up to a multiplicative constant per condition**: you can tell that state A survives twice as well as state B, but not the absolute kill fraction, because doubling every survival and halving the total population look identical in proportions. This is not sloppiness — it is a named, universal fact: the same constant appears as PU learning's [Elkan–Noto](https://dl.acm.org/doi/10.1145/1401890.1401920) labeling constant, ecology's occupancy/detection constant, and econometrics' selection correction. To pin it you need outside information: an absolute cell count (spike-ins) or a calibration assumption (near-zero dose ⇒ survival ≈ 1). **Without that anchor, only relative survival is identified** — still enough to rank vulnerable states and run the death/transport split, not enough to print an absolute number.

## Reading the objective symbol by symbol

Now the full training objective is just the five tools in one line:

> min over θ (the hazard) and *T* (the map):  𝒲_ub( *T*#( π_θ · p₀ ) , p₁ ).

Left to right: take the control cloud **p₀**; reweight it by the survival field **π_θ** (Tool 1's hazard, Tool 3's ratio, with Tool 2's dose law inside it) — this thins out the cells the drug kills; push the survivors through the transport map **T** (Tool 4, an ICNN) — this moves them to their post-drug states; and compare the result to the observed treated cloud **p₁** under the **unbalanced-OT** divergence 𝒲_ub (Tool 5), whose mass-relaxation term *is* the death accounting and whose transport term *is* the movement. Minimizing it fits a survival field and a transition map at once. The compositional constant (the identifiability lesson) is the one thing the objective cannot recover on its own.

## One-screen cheat sheet

| Object | Intuition in one line | Key equation | Role in the model |
|---|---|---|---|
| Hazard / survival | survival = e^(−accumulated death rate) | S = exp(−*H*), *H*=∫λ | defines π = exp(−τλ) |
| Acceleration law | parametric dose-as-stress extrapolates | log λ = log λ₀ + *s*·log *d* + *b* | predicts unseen dose |
| Density ratio | survival = treated/control reweighting | π ∝ p₁/p₀ = classifier odds | what π *is* |
| Optimal transport | cheapest reshaping of one cloud to another | *T* = ∇φ, φ convex | the state transition |
| Unbalanced OT | OT that lets mass die | transport velocity + growth rate | splits death from movement |

## Where to go deeper

For survival analysis, start with [Cox (1972)](https://doi.org/10.1111/j.2517-6161.1972.tb00899.x) and any competing-risks text. For optimal transport, [Villani (2009)](https://doi.org/10.1007/978-3-540-71050-9) is the theory bible and [Peyré & Cuturi (2019)](https://arxiv.org/abs/1803.00567) the computational companion; [Brenier (1991)](https://doi.org/10.1002/cpa.3160440402) is the map-is-a-gradient result and [Liero–Mielke–Savaré (2018)](https://doi.org/10.1007/s00222-017-0759-8) the unbalanced/Hellinger–Kantorovich foundation. For density-ratio estimation, [Sugiyama, Suzuki & Kanamori (2012)](https://doi.org/10.1017/CBO9781139035613). None of it is biology — which is the whole point of the [v3 essay](what-disappears-conditional-viability-v3.md): the math is mature and borrowed; what is new is aiming it at *who survived*.
