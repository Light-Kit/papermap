---
title: 'Prototypes, not copies: the virtual cell as the cell that could be'
date: '2026-05-29'
topics:
- foundation-model
- virtual-cell
- generative
- interpretability
- optimal-transport
- prototype
summary: 'Biology has quietly run on prototype theory for decades — every cell-type annotation is a "is this new cell close enough to the centroid" judgment in disguise. A virtual cell is the latest and richest evolution of that idea: not a copy of any specific real cell, but the cell that could be, made sampleable and intervenable. Five faces of the prototype across the vault — centroid, latent, generative, mechanistic, counterfactual — and why optimal transport is the right bridge between a prototype-distribution and the messy real cells in your dish.'
starred: true
---

> *Related: [v5 five-questions essay](one-hundred-concepts-five-questions-v5.md), [diffusion and flow matching for virtual cells](diffusion-and-flow-matching-for-virtual-cells.md) (the generative face), [D-SPIN](d-spin-spin-models-for-the-cell.md) (the mechanistic face), [causal models, FMs and VCs](causal-models-fm-and-vc.md) (the counterfactual face), [why linear baselines win](why-linear-baselines-win.md) (the reckoning), [cell-state reachability as viability theory](cell-state-reachability-as-viability-theory.md) (where prototypes break).*

A question you can ask any cell biologist and watch them not quite know how to answer it: *what, exactly, is a cell type?* The textbook answer is something like "a stable phenotypic state with characteristic markers and function," which is fine until you try to *use* it. The working answer — the one the field actually uses, the one every annotation pipeline runs on — is much sneakier: a cell type is a **prototype**, and a new cell is of that type if it is close enough to the prototype.

That move — from "necessary and sufficient features" to "similar enough to an exemplar" — is exactly the move Eleanor Rosch made in cognitive psychology in the 1970s, when she dismantled Aristotle's categories. A robin is more bird-like than a penguin, even though they're equally birds, because robins sit closer to the prototype. There is no list of features that defines bird-ness; there is only similarity to the prototype, and graded membership around it. Biology has been doing exactly this with cells the entire time, without crediting Rosch. The interesting move now — the move that this vault is about — is that we have started building prototypes not just of *cell types*, but of **individual cells**. That is what "virtual cell" really means. And once you see it that way, the whole vault rearranges.

## The prototype theory biology was already using

Look at how cell annotation is actually done. Marker genes are family-resemblance features, not necessary-and-sufficient ones — a T cell missing CD3 is still a T cell if it sits close enough to the centroid in enough other dimensions. `SingleR`, `Azimuth`, `scmap` are literal centroid matching against a reference panel. KNN-on-a-reference is the unsung workhorse of every QC pipeline. CELLxGENE and the Human Cell Atlas are, structurally, **prototype libraries**: millions of cells curated into reference centroids you compare new cells against.

Geneformer, scGPT, UCE, scFoundation, Nicheformer, CellPLM take this one level deeper. The prototype is no longer a mean expression vector — it's a *latent vector* in a learned embedding space. But the logic is identical: you embed a query cell, you find its nearest prototype, you call it that. The math gets richer; the epistemology stays the same. Cells are categorized by *similarity to exemplars*, never by necessary-and-sufficient features.

The generative models — CFGen, scDiffusion, CellFlow, scDiffEq — push the idea further still. The prototype is no longer even a point in an embedding space. It's a **distribution** you can sample from. "The cell that could be" stops being a metaphor and becomes a literal operation: `model.sample()`.

## Five faces of the prototype

The vault collects increasingly rich answers to a single question — *what kind of mathematical object is a cell prototype?* Five faces, in roughly the order the field discovered them:

1. **Centroid prototype (descriptive).** The mean expression vector + a notion of distance. The simplest, most legible, most brittle. Anchors: marker genes, `SingleR`/`Azimuth`/`scmap`, CELLxGENE/HLCA reference atlases. The prototype is a point; you measure cosine or Mahalanobis distance to it.

2. **Latent prototype (representational).** A vector in a learned latent space that an FM has induced from millions of cells. The prototype is still a point, but in a vastly richer geometry. Anchors: Geneformer, scGPT, UCE, scFoundation, Nicheformer, CellPLM, TranscriptFormer. The hope was that the embedding's geometry would capture biology the marker centroid couldn't — sometimes true, sometimes not (see "where prototypes break" below).

3. **Generative prototype (distributional).** A probability distribution over cell states that you can sample from. The prototype stops being a point and becomes a *cloud with structure*. Anchors: CFGen, scDiffusion, CellFlow, scDiffEq, the latent-diffusion / classifier-free-guidance / DiT machinery they import from CV/ML (see [diffusion and flow matching](diffusion-and-flow-matching-for-virtual-cells.md) for the genealogy). This is the first face where the prototype can *generate*, not just be compared against.

4. **Mechanistic prototype (structural).** A *machine* — a regulatory network, an energy landscape — whose stationary distribution is the prototype. The cloud now has gears. Anchors: [D-SPIN](d-spin-spin-models-for-the-cell.md) (energy landscape over gene programs), CellOracle (ATAC-derived GRN + in-silico KO), the [survival-field math](the-math-of-the-survival-field-v2.md). You can sample the prototype, and you can also *open it up*: inspect the couplings, do an in-silico knockout, read off a regulatory hypothesis. The prototype has become explanatory, not just predictive.

5. **Counterfactual prototype (functional).** A *function* `f: (cell, perturbation) → cell`. The prototype stops being a state and becomes a *response*. Anchors: CPA, chemCPA, GEARS, PerturbNet, STATE, CINEMA-OT. This is the rung [causal-models-fm-and-vc.md](causal-models-fm-and-vc.md) and the v5 essay are climbing toward. The prototype here is whatever your model says *would happen if you intervened*, which is a much larger object than any single cell or distribution.

Each face is a richer reading of the same word, and each one comes with its own way of being wrong.

## The OT bridge — making "distance from prototype" honest

Here is the question that gets sharper the further up the five faces you climb: how do you connect a generative or mechanistic prototype — a distribution over possible cells — back to the messy real cells you actually have on a plate? No real cell *is* the prototype. The prototype is a thing in latent space, or a sampleable distribution, or an energy landscape. The cells are noisy snapshots from some shifted version of it. What's the bridge?

**This is the exact problem optimal transport solves.** Two distributions, P (your prototype) and Q (your observed cells). OT asks: what is the cheapest way to move mass from one to the other? The minimum cost is the **Wasserstein distance** — a principled "distance from archetype." The actual mass-movement plan is a **transport map** — a principled bridge between every region of the prototype and the real cells closest to it. No real cell is the prototype; every real cell has a measurable, well-defined relationship to it.

This is why OT shows up everywhere in the vault as the lingua franca of virtual-cell methods that have to relate models to data:

- **Waddington-OT** transports across time points to recover developmental trajectories from snapshots — connecting the prototype distribution at day 0 to the one at day 7, when you never tracked the same cell.
- **CellOT** learns a neural transport map from unperturbed to perturbed distributions. The prototype of "what this drug does" *is* the transport map.
- **moscot** packages OT for multi-modal, multi-time problems — the toolkit version of the same idea.
- **CINEMA-OT** uses unbalanced OT to handle the unavoidable biological fact that cell numbers and cell types differ between conditions. Not every prototype cell has a real counterpart, and unbalanced OT makes that a feature rather than a bug.
- The math itself — Chizat's unbalanced OT (2018), Wasserstein-Fisher-Rao geometry (2015), NUBOT, TIGON — pre-dates single-cell by years. It slots in cleanly because the problem shape was always right: distributions on a manifold, with the metric coming from the cost of moving probability mass around.

The conceptual move worth keeping: **the prototype is a distribution, the real cells are samples from a noisy possibly-shifted version of that distribution, and OT gives you both a metric (Wasserstein) and a map (transport plan) between the two.** That is the bridge your intuition was pointing at. It's the formal reason a virtual cell that doesn't match any specific real cell can still be tightly connected to the population of real cells in a way that's quantifiable and falsifiable.

## Where prototypes break

Every face of the prototype has a way to be too narrow. The honest summary of the 2025–26 reckoning the vault catalogues is that today's virtual-cell methods fail at the *prototype-width* problem:

- **Centroid prototypes** fail on novel types. The query cell isn't close to anything in the reference, and the model either refuses or, worse, confidently mislabels.
- **Latent prototypes** can hallucinate. The [Ahlmann-Eltze/Huber/Anders reckoning](why-linear-baselines-win.md) showed that FM embeddings often perform no better than a linear baseline predicting the *mean* — meaning the FM's prototype isn't actually richer than the marginal distribution it was fit on, just more expensively parameterized.
- **Generative prototypes** drift off-manifold. Sampling pushes you into states no real cell has ever visited — the [reachability / viability-theory](cell-state-reachability-as-viability-theory.md) problem. The prototype has support outside biology.
- **Mechanistic prototypes** extrapolate only as far as the conditions they were fit on. D-SPIN can fit a beautiful energy landscape, but predicting a new drug is only safe if the new drug's field vector is interpolating between fields you've already measured.
- **Counterfactual prototypes** are only as good as the benchmark says, and 2025's benchmarks said: not very, yet. PertEval-scFM, PerturBench, the Kernfeld et al. analyses — they're all asking, in different ways, how wide your counterfactual prototype really is.

Said differently: the Virtual Cell Challenge is operationally a **prototype-width test**. Train your model on context (cell line, perturbation); be scored on whether your sampled distribution covers the held-out real cells. That *is* the question "is your prototype wide enough to contain real cells you've never seen?"

## Why this matters

Read the [v5 five-questions essay](one-hundred-concepts-five-questions-v5.md) under this lens and it organizes cleanly. DESCRIBE builds **centroid** prototypes. CORRELATE and RECKON judge them. INTERVENE supplies the data for **counterfactual** prototypes. PREDICT builds **generative** ones. COUNTERFACTUAL closes the loop by asking whether the prototype really supports the intervention it claims to. Each rung is a face. The ladder isn't a sequence of unrelated questions; it's a sequence of prototype refinements.

The deeper claim: the field isn't trying to build a copy of any specific cell. It's trying to build a prototype rich enough that real cells you've never seen still have a clear, well-measured relationship to it. That's what "the cell that could be" means in practice — not an average, not a mock-up, but a generative, intervenable, OT-connectable archetype. The same move Rosch made for birds, biology is now making for cells. Marker genes were the centroid version. Atlases scaled it. FMs gave it richer geometry. Generative models gave it sampling. Mechanistic models gave it gears. Counterfactual models gave it a verb. OT is the bridge that keeps it honest.

That is the bet the vault is collecting evidence for. None of the prototypes are the answer yet. But the *shape* of the answer is what every paper here is trying to draw.
