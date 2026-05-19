---
title: 'Closed-loop virtual cells — a 101 tour of how the field got here (2022-2026)'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
- agentic
- perturbation-prediction
summary: A beginner's tour of the narrow domain the agent-loop-for-drug-response project sits in — "closed-loop in silico perturbation" plus "agentic virtual cell modeling." Five eras from scBERT (2022) to VCHarness (2026), the mental model that organizes the whole space (rung 1 vs rung 2; why pretraining on atlases doesn't transfer to predicting interventions), the eight core concepts, the six papers to actually read in order, and three open questions worth tracking.
starred: false
---

> *Sibling to [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md) — that essay says "the architecture you proposed is already published several times"; this one explains *what was already built and why* so the v2 conclusion makes sense. Companion reading: [causal models, FMs and virtual cells](causal-models-fm-and-vc.md) for the formal rung-1/rung-2 framing; [why linear baselines win](why-linear-baselines-win.md) for the 2025 empirical pressure; [small labs v3](small-labs-what-to-build-v3.md) for the Wedge-2 adapter pattern that the field landed on.*

## TL;DR

Single-cell biology built giant atlases of how cells look in nature, then trained giant transformers on them, then discovered those transformers couldn't answer the question everyone actually wanted: *what would the cell look like if I knocked out this gene or gave it this drug?* **Closed-loop virtual cells** is the 2024-2026 paradigm that tries to fix the gap — combine atlas-pretrained foundation models with iteratively-acquired perturbation data, often orchestrated by an LLM agent that picks the next experiment. This page tells you the five-era story of how the field got here and what to read to actually understand it.

## The mental model that organizes everything

Judea Pearl's ladder of causation is the cleanest frame:

- **Rung 1 (association):** "When I see gene X high, gene Y is also high." Observational; what tends to co-occur.
- **Rung 2 (intervention):** "If I *knock out* gene X, what happens to gene Y?" What happens when you reach in and change something.
- **Rung 3 (counterfactual):** "Given that gene Y was high after I observed X high, what *would* Y have been if X had been low?" Harder; needs structural assumptions.

Every single-cell atlas the field has ever built is rung-1: cells observed in their natural state, no one intervened. Every foundation model pretrained on those atlases is therefore a *correlational* model — it learns the joint distribution of gene expression as it happens to occur.

But a **virtual cell** — the thing the field actually wants — is a *rung-2* ask. "Give me a model I can run a thought-experiment on" *literally* is "give me a model that handles `do(intervention)`." That gap between *what we pretrain on* (rung 1) and *what we want* (rung 2) is the entire reason this narrow domain exists. Every named system in the closed-loop / agentic-VC literature is a response to that one gap.

## The five-era story (2022-2026)

### Era 1 — The atlas substrate (pre-2022)

The Human Cell Atlas, Tabula Sapiens, and a dozen tissue-specific atlases ship millions of single-cell profiles. Tooling congeals around AnnData, Scanpy, and scvi-tools (Theis-lab ecosystem). The first deep generative model that matters in production is **scVI** (Lopez et al., 2018) — a VAE over cells. The dominant pipeline is *count matrix → normalization → embedding → clustering → differential-expression analysis*. There is no "foundation model" yet; there is no "virtual cell" yet. The substrate exists; nothing transformer-shaped sits on it.

### Era 2 — The FM wave (2022-2023)

**scBERT** (2022) is the proof of concept that a transformer can be pretrained on cell-by-gene matrices. **Geneformer** (Theodoris et al., *Nature* 2023) uses masked-gene-modeling and a 30M-cell pretraining corpus. **scGPT** (Wang et al., *Nat Methods* 2024, preprint 2023) scales to 33M cells with a generative objective and lands the "GPT for cells" framing in the public discussion. The field's mood is *transformers + atlas substrate = the answer*. Many groups are confident the virtual cell is two scaling steps away.

### Era 3 — The virtual-cell ambition gets named (2024)

**Bunne et al., "How to Build a Virtual Cell with AI"** (*Cell*, Dec 2024) is the moment the field stops talking about "better single-cell embeddings" and starts talking about *virtual cells* as the explicit target. The Bunne perspective frames virtual cells in rung-2 terms even when it doesn't use Pearl's vocabulary: a computational object you can run perturbation thought-experiments on. CZI launches the **Virtual Cell Challenge** with a held-out evaluation. Perturb-seq corpora grow (Replogle's K562 essential dataset; Tahoe-100M is announced). The ambition is named and the substrate is in motion.

### Era 4 — The reckoning (mid-2024 → mid-2025)

The painful year. **Ahlmann-Eltze & Huber** ship "Deep-learning-based predictions of gene perturbation effects do not yet outperform simple linear baselines" (preprint 2024 → *Nat Methods* 2025). The headline result is exactly what the title says: a linear model that predicts the *mean of training perturbations* matches or beats scGPT, Geneformer, scFoundation, and UCE on Replogle-style perturbation prediction. The follow-up wave (Wenkel et al.'s `latent-additive` critique; the [why-linear-baselines-win literature](why-linear-baselines-win.md)) confirms the result is structural, not a one-off. The field realizes: *pretraining on observational atlases doesn't automatically give you interventional prediction capability*. The mood flips from "two scaling steps away" to "the objective is wrong."

### Era 5 — The three responses (mid-2025 → mid-2026)

The current era. Three response patterns coexist:

- **Better data.** Acquire interventional substrate at scale. **Tahoe-100M** (Vevo + Arc, Feb 2025) is 100M cells × 1,100 drugs × 50 cancer lines. **STATE** (Arc Institute) is a perturbation-specialist FM pretrained on ~170M unperturbed and ~100M perturbed cells across 70 species. The bet: enough interventional data, observationally-pretrained backbones can be finetuned across the gap.
- **Better architecture.** Don't retrain the backbone; add a small module that *explicitly* conditions on the perturbation. **sc-FM Perturbation Adapter / scDCA** (ICLR 2026): <1% drug-conditional adapter on a frozen sc-FM, beats the linear-additive baseline. **PertAdapt** (Nov 2025): condition-sensitive adapter with gene-level structure baked in. The bet: the bottleneck was the head, not the backbone.
- **Better orchestration.** Build a loop around the FM that acquires data, finetunes, evaluates, repeats — and let an LLM agent run the loop. **"Closing the loop: Teaching single-cell FMs to learn from perturbations"** (July 2025) is the first published end-to-end closed-loop ISP on Geneformer; 3× PPV improvement on T-cell activation. **VCHarness** (April 2026), **CellForge** (Aug 2025), and **BioLab** (Sept 2025) wrap that with multi-agent architectures that pick datasets, design neural architectures, and orchestrate wet-lab feedback. The bet: structure-of-the-loop matters more than any one model.

The three are not mutually exclusive — most 2026 systems combine all three. The agent-loop-for-drug-response project sits squarely in response #3.

## The eight core concepts (the vocabulary)

1. **Foundation model.** Pretrained on a big corpus with self-supervision (masked-token, next-token, contrastive), then adapted to many downstream tasks. High pretraining cost; cheap adaptation.
2. **Atlas.** Millions of cells from many tissues/donors/conditions, profiled under *observational* conditions — no experimental intervention.
3. **Perturb-seq.** Single-cell RNA-seq combined with CRISPR knockouts (or activations). Each cell carries a known perturbation; the transcriptomic response is the readout.
4. **In silico perturbation (ISP).** Using a model to predict what cells *would* look like under a perturbation that wasn't measured in vitro.
5. **Open-loop vs closed-loop ISP.** Open-loop: train once, predict, done. Closed-loop: predict, run experiments to verify, use the new data to update the model, repeat.
6. **Adapter.** A small (often <1%) trainable module on top of a frozen FM that specializes it for a task without retraining the backbone.
7. **LLM agent.** A program that uses an LLM to make decisions inside a loop — which dataset to load, which experiment to run, which hyperparameter to try. The agent is the orchestrator; the FM is the analyst.
8. **Virtual cell.** The aspirational artifact: a computational object you can run thought-experiments on (knockout, drug, environment) and get back wet-lab-replicable predictions. The whole field is converging on this target.

## The six papers to actually read (in order, ~20 hours total)

1. **Bunne et al., "How to Build a Virtual Cell with AI"** (*Cell*, Dec 2024). The north star. Read first; everything else is either a step toward this or a critique of it.
2. **scGPT** (*Nat Methods* 2024) **or Geneformer** (*Nature* 2023). Pick one. The canonical sc-FM. You need to understand what the substrate looks like before you can understand what's wrong with it.
3. **Ahlmann-Eltze & Huber**, "Deep-learning-based predictions of gene perturbation effects do not yet outperform simple linear baselines" (*Nat Methods* 2025). The reckoning. The result that forced the field into Era 5.
4. **"Closing the loop: Teaching single-cell foundation models to learn from perturbations"** (bioRxiv July 2025). The first published closed-loop ISP system. Three-fold PPV improvement on T-cell activation prediction; the existence proof that response #3 works.
5. **VCHarness** ("Harnessing AI to Build Virtual Cells", bioRxiv April 2026). Agent + biological FMs that beats *expert-designed* architectures. The frontier of agentic VC.
6. **LLM4Cell** (arXiv 2510.07793) **or LLMs Meet Virtual Cell** (arXiv 2510.07706). Pick one survey. Both are October 2025 and both map the broader space — read after the five above so the survey is review, not introduction.

That's the curriculum. Twenty hours of reading and you have the field's mental model.

## Three open questions worth tracking

1. **Can closed-loop ISP cross from gene perturbation to drug response?** Everything published in response #3 operates on CRISPRi/a Perturb-seq — gene knockouts in cell lines. Drug response on patient cohorts is materially different (small molecules + dose + time; clinical endpoint, not transcriptomic delta; oncologist-selected, not randomly assigned). The bridge has not been crossed.
2. **Can agent + VC FM beat human-designed pipelines on clinical-cohort outcomes (not held-out cell lines)?** Untested. Every closed-loop and agentic system evaluates on held-out *perturbations* or held-out *cell lines*. Patient cohorts with outcomes are the next discipline gap.
3. **Is the data ceiling closer than the compute ceiling?** Tahoe-100M is the largest perturbation corpus today; STATE is the largest specialist FM. Whether the next 10× of either gives proportional improvement, or whether the rung-1 → rung-2 gap requires *qualitatively* different data (transportability frameworks, structural-causal-model priors), is the live debate.

## What this means for someone reading this

If you came here from [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md): the v2 essay's conclusion was *"the architectural composition isn't novel; what's left is application + discipline."* This 101 tour exists to show you *why* that conclusion holds — by walking the five-era story that produced the eight already-published systems v2 cites. The defensible-novelty surface of the agent-loop-for-drug-response project (clinical drug response + patient cohort + cancer subgroup) is exactly the surface that **the three open questions above describe** — i.e. the parts of this narrow domain the literature has not yet covered. Read v2 for the project verdict; read this for the context that makes that verdict legible.

That's the field.

---

*Last updated 2026-05-18.*
