---
title: 'After one-hot: what a virtual cell adapter that cannot memorize would have to look like'
date: '2026-05-30'
topics:
- foundation-model
- virtual-cell
- causal
- perturbation
- prototype
- identifiability
- interpretability
summary: 'The 2026 reckoning — replacing scFM embeddings with one-hot perturbation identity barely changes performance — is usually read as "FMs are useless." Read it sideways: it says the benchmark measures something one-hot can also do. The interesting question is what evaluation one-hot structurally cannot pass, and what an adapter that has to pass it would have to look like — frozen backbone, identifiable causal layer, Replogle/Norman as the wet-lab substitute. The architecture that has a chance of beating one-hot is also the architecture that operationalizes the prototype-width test.'
starred: true
---

> *Related: [the reckoning](why-linear-baselines-win.md), [prototypes, not copies](prototypes-not-copies-the-virtual-cell.md) (the frame this operationalizes), [causal models, FMs and VCs](causal-models-fm-and-vc.md) (the rung), [v5 five-questions](one-hundred-concepts-five-questions-v5.md) (the ladder), [diffusion and flow matching](diffusion-and-flow-matching-for-virtual-cells.md) (what an adapter sits on top of), [cell-state reachability](cell-state-reachability-as-viability-theory.md) (where prototypes break).*

The 2026.02 result that landed hardest was the linear-baseline one. Take any scFM, replace its embedding with a **one-hot vector of perturbation identity**, hand it to a downstream MLP that predicts the perturbed state, and the MLP barely loses any performance. Across more than six hundred trained models. The natural reading was the harsh one: foundation models aren't doing anything an indicator variable couldn't.

That reading is half right. The other half is more interesting. What the result *strictly* shows is that **the benchmark cannot tell the difference** between a learned representation and a lookup table. That's a statement about the evaluation as much as it is a statement about the models. If you can win by memorizing "this is perturbation #173," then the metric was never measuring what you wanted it to measure — it was measuring something one-hot could also do.

So the real question isn't "are FMs useless." It is: **what evaluation can one-hot structurally not pass?** And what would an architecture that has to pass it have to look like?

That question has a clean answer. The evaluation is one where shuffling a perturbation's identity *while keeping its causal signature* must break the prediction — which means the model has to be reading causal structure, not identity. And the architecture is one where the model cannot get from perturbation to prediction without passing through a structural bottleneck that *forces* it to read causal structure.

This is a piece about what that architecture looks like, what it isn't, and where it most plausibly breaks.

## The property no current adapter has

The trick is to stop treating the one-hot ablation as a number to beat. Treat it as a **property**.

The property: shuffle the causal input to your model — the part that's supposed to carry the perturbation's mechanism — and performance must drop. If it doesn't drop, your model isn't reading the causal input; it's reading the identity input. If it drops, you have shown that the prediction *required* the causal information.

Notice that no current adapter on a frozen FM has this property by construction. PertAdapt, scDCA, the various SAE-steering pipelines — they all let the perturbation signal reach the prediction head through multiple routes, and one of those routes is always something one-hot-shaped (an embedding lookup, a perturbation token, a context vector). So even when these adapters improve the leaderboard, they don't necessarily improve it through causal structure. They might just be slightly cleverer one-hots.

A model with the property has a very specific shape. Every signal from "which perturbation" to "what the cell becomes" has to pass through a **single bottleneck**: a layer whose inputs are interpretable causal concepts, whose outputs propagate through a *learned directed graph between concepts*, and which carries no identity information that isn't already encoded in the concepts themselves.

If the bottleneck is narrow enough, you can't smuggle perturbation identity through it. Shuffle the concept inputs and the rest of the model has nothing to predict from. Performance collapses. The model passes the ablation — *because it had no choice.*

That is what "structurally cannot memorize" actually means. It isn't a property of having more parameters, a better loss, or a fancier benchmark. It is a property of how information is *allowed* to flow from perturbation to prediction. Get the flow right and the ablation falls out for free.

## What such an adapter would look like

The pieces to build it already exist. None of them are new individually. The novelty is the combination, and the demand that the combination satisfy the property.

**Backbone, frozen.** Start with a SOTA scFM — State's SE→ST stack, Tahoe-X1, scFoundation. Use it only for forward inference. The expensive part (training the foundation model) is out of budget on principle. You're not in the business of building a better representation; you're in the business of asking what *uses* of a representation could pass the ablation.

**Causal layer on the latent.** Borrow the structural-causal-model layer from GraCE-VAE: an explicit SCM layer in the decoder, handling the case where the *intervened variables are latent and unknown* — exactly the regime single-cell genomics lives in. Each perturbation is mapped to a small set of causal-concept shifts. The decoder then propagates those shifts through a learned directed graph between concepts before reconstructing the cell state.

**Identifiability conditions.** This is the load-bearing piece. Recent results on linear causal representation learning under nonlinear mixing — non-paired, single-node interventions, with enough diversity — give identifiability up to label permutation. For CRISPRi/CRISPRa data this fits: each perturbation hits a single gene, and Replogle's genome-wide panel supplies the diversity. Combined with PDAE's extrapolation guarantee — "unseen perturbations whose causal signature is in the linear span of seen ones extrapolate provably" — you have a theory that tells you *which* unseen perturbations you should be able to predict, and which you shouldn't.

**Replogle and Norman as the wet-lab substitute.** This is the move that lets the whole thing live on a pure-computational budget. After you train the adapter, you take the causal edges it inferred — "concept A drives concept B" — and ask whether *independent* interventional data (CRISPRi of A, different cell line, different lab) reproduces the predicted downstream signature on B. You don't need new experiments. The experiments are sitting in the public archive, and they reproduce or they don't.

**Notice what this leaves out.** No new representation, no bigger model, no benchmark tuning. The adapter trains in single-digit GPU-hours per run. The whole compute envelope fits on two H100s; the only step that ever needs the backbone in memory is a one-time embedding extraction. The work is in the design of the bottleneck and the choice of identifiability conditions — not in scale.

## What this isn't

The neighborhood is crowded enough that it's worth being explicit about which neighbor is which.

**SCCVAE** is the closest in spirit. A learned regulatory network, perturbations modeled as shift interventions that propagate, and it does beat SOTA on unseen single-gene extrapolation. But it never touches a foundation model (explicitly listed as future direction), only does genetic perturbations, and its causal graph is an upper-triangular mask with no sparsity penalty. The three weaknesses are the three openings. Build the same idea on top of State's frozen latent, extend to Tahoe's drug perturbations (with the caveat in the next section), put a real sparsity prior on the graph — and you have a different paper.

**SENA-discrepancy-VAE** does interpretability work cleanly, but the claim it proves is "no performance loss" — interpretability without a price. The harder claim — *improvement* through interpretability — is what the structural-property argument forces.

**CellCap** decomposes the perturbation *response* into sparse interpretable programs. Beautiful work. But it decomposes; it doesn't attribute. The diagnose-and-correct loop — locate which causal concept's predicted shift is wrong, use that to guide a correction — is an action CellCap can't take, because programs and errors live in different spaces.

**PertAdapt and scDCA** established the adapter-on-frozen-scFM pattern that the whole genre depends on. They are not the rival, they are the substrate. The novelty isn't "we built an adapter." It's what's inside the adapter: an identifiable causal graph, plus an error-attribution loop, plus a structural commitment that makes the one-hot ablation a self-test instead of a problem.

The synthesis matters more than any single piece. None of the above is dead; each one is one third of the answer.

## Where this would break

The architecture is clean and the theory has teeth. It also has at least four ways to fail that should be named out loud before they get named by reviewers.

**Drug perturbations violate the single-node assumption.** Identifiability under nonlinear mixing assumes interventions hit one latent at a time. CRISPRi/CRISPRa on a single gene fits. A drug — like the ones in Tahoe-100M — hits ten things simultaneously, at different doses. Single-node identifiability does not hold there. The honest move is to *say so*: the identifiability guarantee covers single-gene genetic perturbations; drug results are predictive without the guarantee. Hiding this is worse than owning it.

**The bottleneck has to actually be narrow.** "Structurally cannot memorize" is not free. It depends on the bottleneck carrying fewer bits than perturbation-identity needs. A wide bottleneck — a 1024-dim concept layer for a 500-perturbation panel — is just a more expensive one-hot. Narrowness has to be tested empirically: vary the bottleneck width, measure the one-hot-ablation drop, find the point at which the drop disappears. That point is the actual memorization threshold, and the model needs to live below it.

**Error attribution needs a real method.** Saying "project the error into concept space" is hand-waving. The defensible options are gradient-based attribution (integrated gradients of the loss with respect to each concept's shift), counterfactual-perturbation-of-concept (force a concept to its predicted value and measure the change in prediction), or — best — a closed-form decomposition that uses the linearity of the causal layer. Pick one, justify it, and don't gesture vaguely at attention weights.

**The held-out split has to be honest.** Unseen perturbation is not the same as unseen cell. Held-out cells from seen perturbations is a re-statement of the in-distribution problem and predicts almost nothing about extrapolation. The PDAE guarantee splits unseen perturbations into two: those whose causal signature is in the linear span of seen ones (extrapolation guaranteed) and those whose signature lies outside it (no guarantee). Reporting both, separately, with the PDAE criterion stated, is what makes the claim falsifiable.

**The window is closing.** SCCVAE's authors have written that FM extension is their next direction. Theorem-papers on intervention identifiability landed at NeurIPS 2025. The one-hot reckoning is six months old. Anyone serious is in the same race. Methodological discipline doesn't change because the field is moving fast; the schedule does.

## The prototype-width test, made operational

Step back. Why does any of this matter beyond one paper?

In the [prototypes essay](prototypes-not-copies-the-virtual-cell.md) the frame was that a virtual cell is a prototype — a generative, intervenable, OT-connectable archetype that real cells have a measurable relationship to. The current crisis of the field is a **prototype-width** problem: today's virtual cells are narrow archetypes that look good on cells close to the training distribution and lose all their structure outside it.

What the structural-property argument does is *operationalize* the width test. A model that passes the one-hot ablation — that genuinely propagates from perturbation to prediction through identifiable causal concepts — has, by construction, a *mechanism* connecting its prototype to perturbations it has never seen. The mechanism gives you a principled "is this perturbation in the prototype's reach" criterion (PDAE's linear-span test) and a principled "and here is why the prototype thinks the answer is X" decomposition (the causal graph). Both are width-properties. The prototype gets wider in a sense that is *measurable*, because the mechanism extends past the training support.

This is also where the causal adapter and the [OT bridge](prototypes-not-copies-the-virtual-cell.md) do complementary work. OT gives you a *distance* between the prototype distribution and the observed cells, and a *transport map* between them. Causal layers give you a *mechanism* for what the prototype would *become* under intervention. Distance and mechanism, side by side. The first answers "how close is this real cell to the archetype"; the second answers "what would the archetype do if you perturbed it." A field that has both has the makings of a real predictive theory of the cell.

None of this is settled. The bottleneck might turn out to be too wide to enforce the property. The identifiability conditions might fail in the heterogeneous-cell regime. The Replogle reproduction rate might come back too low to claim mechanism. But the *shape* of the answer — frozen backbone, narrow identifiable bottleneck, propagation through a learned causal graph, validation against independent interventional data — is the shape the post-reckoning field needs. If it isn't this, it will be something with the same skeleton.
