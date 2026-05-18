---
title: 'Interpretability, mechanistic modeling, and causal inference — the scientific-method tail'
date: '2026-05-18'
topics:
- interpretability
- mech-modeling
- causal
- foundation-model
summary: A landscape of the smallest but most-important corner of the FM field — the work that asks not "does the model perform?" but "do we understand why, and would the explanation survive intervention?". Interpretability, mechanistic modeling, and causal inference in 2025-2026.
starred: false
---

> *Closely related: [why linear baselines win](why-linear-baselines-win.md) (the empirical reckoning that made this corner urgent), [stage 4 — pretraining objective](stage-4-pretraining-objective.md) (where correlational/causal mismatch is born), [reading an FM paper critically](reading-an-fm-paper-critically.md).*

This is the smallest topic in the corpus by item count (~24 items combined across interpretability, mech-modeling, and causal) and the most-important one for the field's long-term maturity. Performance benchmarks tell you whether a model is right; this corner of the field asks whether it's right **for the right reasons** — a different question, with different methods, and ultimately the only question that matters once a model is making clinical or experimental decisions. This essay maps what 2025-2026 work in interpretability, mechanistic modeling, and causal inference looks like for biological FMs.

## Why this corner suddenly matters

For most of 2021-2024 the field treated interpretability as a nice-to-have — useful for papers, optional for product. Three things changed that in 2025:

1. **The linear-baselines reckoning.** Ten independent evaluation papers ([catalog](evaluation-papers-catalog.md)) showed sc-FMs failing on perturbation; the only way to understand *why* is to look inside the model. Black-box benchmarking can tell you the model is wrong; only interpretability can tell you what to fix.
2. **Clinical deployment.** FDA review for clinical FMs increasingly expects mechanistic justifications. A black-box pathology FM that's correct 92% of the time is harder to clear than a 90%-accurate model with traceable reasoning.
3. **Scientific publication norms.** Top-tier biology journals (Nature, Cell, Science) now reject FM papers that don't engage with what the model has actually learned. The 2025-2026 wave of "what did this FM learn?" papers reflects this norm shift.

## Three sub-fields, three methods

### Interpretability — what is the model doing internally

The mechanistic-interpretability literature (largely imported from LLM interpretability — Anthropic SAE work, OpenAI probing, etc.) is now being applied to biological FMs. Key 2025-2026 approaches:

- **Sparse autoencoders (SAEs)** trained on intermediate activations to discover monosemantic "features" that the model uses internally. Early results on scGPT and Geneformer show features that correspond to pathway activations, cell-cycle phases, and batch effects.
- **Probing studies** that ask whether a given biological property is linearly decodable from the model's representations. Used heavily on ESM-2 (does the model encode secondary structure? contact maps? function?) — many of the strongest "ESM-2 learns biology" claims come from probing.
- **Attribution methods** (integrated gradients, attention rollout, SHAP) that trace a model's prediction back to input tokens. Useful for clinical settings where a physician needs to know "which slide region drove this prediction."

The pattern: **interpretability for biological FMs is currently 2-3 years behind LLM interpretability** but catching up quickly as the LLM toolkit gets ported over.

### Mechanistic modeling — biology that respects causal structure

The mech-modeling subfield in biology is older than FMs (dates back to systems biology, pathway modeling, ODE models of signaling networks) and operates from a different premise: instead of learning correlations from data, **encode known causal structure into the model directly**. Examples in 2025-2026:

- **Pathway-aware sc-FMs** that constrain attention to gene sets defined by KEGG / Reactome / MSigDB pathways. Reduce parameter count and improve interpretability simultaneously.
- **Mechanistic-biophysical priors** in protein FMs — ESM-3's SE(3)-invariant structure tokens are a form of mechanistic prior (the architecture respects rotational symmetry because biology does).
- **Causal-graph-augmented prediction** — TxPert (covered in [small labs](small-labs-what-to-build.md)) uses multi-knowledge-graph priors to inject causal structure into perturbation prediction.

Mech modeling is where biology FMs meet classical systems biology. The two communities mostly don't talk to each other yet — and that gap is one of the field's quieter losses.

### Causal inference — does intervention X cause outcome Y

Causal inference is the formal framework for the correlational/causal mismatch that the linear-baselines reckoning surfaced. The relevant 2025-2026 directions:

- **Counterfactual prediction** — train a model on perturbation data (Perturb-seq, CRISPRi screens) with an explicit counterfactual objective. The sc-FM Perturbation Adapter ([stage 5](stage-5-adaptation.md)) is a small-team example.
- **Do-calculus over learned representations** — treat the FM's embeddings as variables in a causal graph and apply do-operator semantics. Mostly theoretical in 2026 but a growing thread.
- **Active learning over interventions** — design the next perturbation experiment to maximally reduce uncertainty in a causal model. This is the frontier of FM-guided experimental design.

The starred 2026 paper here: **"Virtual Cells Need Context, Not Just Scale"** (causal-aware framing of virtual cells; argues that scaling without causal structure won't reach the virtual-cell goal).

## How to read a 2026 interpretability paper

Four diagnostics for whether an interpretability claim is real:

1. **Does the claim survive a control task?** If the same probing method "finds" structure in random features, the structure isn't really learned by the model. Hewitt-style control tasks are now expected.
2. **Is the feature monosemantic or polysemantic?** A "pathway activation feature" that also fires on unrelated inputs is suspect.
3. **Does intervention on the feature change the output predictably?** The strongest interpretability claims combine *discovery* (find a feature) with *intervention* (perturb it; observe the predicted effect).
4. **Is the interpretability evaluated in the deployment domain?** A pathway feature discovered in healthy tissue may not exist in cancer tissue.

The [reading an FM paper critically](reading-an-fm-paper-critically.md) blog covers the general critique framework; this is the interpretability-specific version.

## The classical-vs-FM cultural divide

The interpretability/mech-modeling/causal corner is where the **classical systems-biology community** (often older, deeply expert, mech-modeling-trained) meets the **FM-native ML community** (younger, scaling-trained, often agnostic about causality). The two communities have largely talked past each other since 2021, and the resulting cultural gap has cost the field years of progress on virtual cells. Two patterns the gap produces:

- **FM teams ignore decades of pathway and network knowledge** because it's "not in the corpus."
- **Mech-modeling teams ignore FM advances** because the architectures don't respect causal structure.

The 2026 work that lands best (TxPert, xVERSE, the Theis-group compositional-FM position) actively bridges these two communities — and is the most-promising direction for resolving the linear-baselines reckoning.

## Small-team angle

Three high-leverage 2026 wedges in this corner:

- **An interpretability audit of one popular sc-FM** — train SAEs, probe for biological features, publish the findings. Cheap to run, high citation value, sets the agenda.
- **A causal-counterfactual head for a specific perturbation domain** — drug response, knockout phenotype, dose-response curves. The Perturbation Adapter template generalizes.
- **A mech-modeling + FM bridge for one pathway** — for example, encode the MAPK signaling pathway as a structural prior in an sc-FM head and demonstrate improved interpretability + predictive accuracy.

What *not* to ship as a small team: a generic "interpretability framework" paper. The field has too many of those already; specific audits and specific causal heads land far better.

## What to watch in 2026-2027

- **The first interpretability paper on a major sc-FM that produces actionable design recommendations** — not "we found features" but "we found features that suggest fix X to the next-generation model."
- **A clinical-FM that ships with formal mechanistic justification** as part of its regulatory submission.
- **A virtual-cell paper that integrates mech-modeling with FM scale** — the field's quiet biggest open question.

Interpretability, mech-modeling, and causal inference are not the largest topic by item count, but they're the topic the field will keep returning to as biology FMs face the actual test of *being useful in the real world*. Watch this corner.
