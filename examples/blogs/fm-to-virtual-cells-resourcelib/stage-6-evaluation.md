---
title: 'Stage 6 — Evaluation: proxy benchmarks vs. clinical signal'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
- evaluation
summary: How biological FMs actually get scored — sc-Arena, the Campanella 2025 pathology clinical benchmark, GUE+ for genomics, AlphaGenome's 25/26 win, and why proxy benchmarks oversold for years before the 2025 reckoning forced the field to face downstream signal honestly.
starred: false
---

> *Expansion of stage 6 from [how a biological FM is built](how-to-build-a-biological-fm.md). Sibling stages: [data corpus](stage-1-data-corpus.md) · [tokenization](stage-2-tokenization.md) · [architecture](stage-3-architecture.md) · [pretraining objective](stage-4-pretraining-objective.md) · [adaptation](stage-5-adaptation.md). See also: [evaluation papers catalog](evaluation-papers-catalog.md), [why linear baselines win](why-linear-baselines-win.md), [reading an FM paper critically](reading-an-fm-paper-critically.md).*

If pretraining objective is the most consequential design choice ([stage 4](stage-4-pretraining-objective.md)), evaluation is the most consequential **diagnostic** choice — what you measure determines what the field believes. The biological FM field spent 2021-2024 measuring the wrong things, declared victory, and then spent 2025-2026 painfully discovering that the proxy benchmarks didn't predict downstream utility. This essay walks through how each family actually evaluates its FMs, what the current scorecards look like, and how the 2025 reckoning permanently changed the standard.

## Why proxy benchmarks failed

A proxy benchmark is one chosen because it's **easy to measure**, not because it predicts the downstream task the model would actually be deployed for. In single-cell, the prototypical proxy was **cell-type classification accuracy** on a small held-out dataset: easy to compute, headline-friendly, but not predictive of perturbation prediction, intervention design, or any of the tasks anyone would actually fund. scGPT, Geneformer, scFoundation, and UCE all reported strong cell-type classification numbers and weak perturbation numbers; the field treated the first as evidence of FM quality and ignored the second.

The 2025 reckoning ([catalog](evaluation-papers-catalog.md)) was the field finally facing this honestly. Ten independent papers showed that on the tasks anyone wanted to use sc-FMs for — perturbation prediction, perturbation generalization, cross-tissue transfer — sc-FMs **did not beat simple baselines**. A `latent-additive + scGPT-embeddings` linear baseline matched or beat every published sc-FM on perturbation. The interpretation isn't that sc-FMs are useless; it's that **the benchmarks the community had been using were measuring the wrong thing**.

## The 2026 scorecards by family

### Single-cell: sc-Arena and PerturBench

The post-reckoning standard. [sc-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) is a community scorecard that evaluates sc-FMs (and their baselines) across **representation, batch correction, perturbation prediction, cross-tissue transfer, and cell-type annotation** with a strong-baseline-first design — every benchmark requires the linear baseline to be reported alongside the FM, so the reader can see the actual delta. PerturBench is the dedicated perturbation-only scorecard. Both shipped as **software**, not just papers, which is part of why they got traction.

What "winning" looks like in 2026: beat the linear-additive baseline on perturbation prediction by a meaningful margin. As of mid-2026, this is rarely cleanly demonstrated; the [sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) is one of the few cases.

### Pathology: Campanella et al. 2025 + HEST-1k + BACH

Pathology evaluation has a cleaner downstream signal than single-cell because **clinical labels are real**. The **Campanella et al. 2025 clinical benchmark** evaluates pathology FMs (UNI, Virchow2, CHIEF, Hibou, etc.) on tasks where the ground truth is a **biopsy-level diagnosis or treatment-response prediction** verified by clinical follow-up. HEST-1k adds spatial-omics-paired-with-histology evaluations; BACH is the established breast-cancer histology benchmark; CRC polyp is the standard colorectal benchmark.

What "winning" looks like in 2026: top-tier pathology FMs (UNI2-h, Virchow2, H-Optimus) are now **within a few percentage points of each other** on most clinical benchmarks; the differentiation has moved from "is the FM good?" (all are) to "what's the license, what's the deployment surface, what's the agent wrapper?" (which is why Hibou's Apache-2.0 license is a moat — see [small labs](small-labs-what-to-build.md)).

### Protein: long-context folding + experimental binder rates

Protein FMs evaluate on two surfaces: **computational benchmarks** (CASP-style structure prediction accuracy, contact-prediction AUC, function-annotation accuracy) and **wet-lab benchmarks** (experimental binder hit rates from de novo design campaigns, thermostability, expression yield). The wet-lab benchmarks are the ones that actually matter for value, and they're the ones that distinguish ESM-3 + RFdiffusion-style stacks from earlier protein FMs. AlphaFold3 reset the structure-prediction baseline in 2024; protein FMs that don't compete with AF3 on structure now report against it as a baseline rather than competing.

### Genomic: GUE/GUE+ and the AlphaGenome 2026 sweep

The Genomic Understanding Evaluation (GUE) benchmark and its extended GUE+ are the standard scorecards for genomic FMs across 18+ tasks (epigenetic mark prediction, splicing prediction, promoter detection, variant-effect prediction). The 2026 headline result: **AlphaGenome won 25 of 26 variant-effect prediction tracks** on the major variant-effect benchmark, decisively re-establishing genomic-FM leadership at DeepMind (with Enformer's lineage as the predecessor). The remaining track went to a tightly task-specialized model, illustrating that even the strongest general FM doesn't sweep everything.

## What separates good evaluations from bad ones

Five characteristics of an evaluation worth trusting in 2026:

1. **A strong non-FM baseline is reported** (linear, k-NN, or task-specific classical method). If the paper doesn't show this, the FM might just be beating other FMs, not actually solving the task.
2. **The held-out set is genuinely held out** — no donor leakage, no tissue leakage, no augmentation leakage. The single most common silent failure in 2023-2024 sc-FM evaluations was donor leakage between train and test.
3. **The metric matches the use case** — accuracy is the wrong metric for perturbation prediction; per-gene correlation is the wrong metric for clinical decision-making.
4. **Compute and time costs are reported** alongside accuracy. A model that's 0.5% better but 10× slower at inference is not better in deployment.
5. **The evaluation code is published** and the data is accessible. Otherwise the result is not reproducible, which means it's not yet science.

## How to read a 2026 FM paper's evaluation section

A practical checklist (covered in more depth in [reading an FM paper critically](reading-an-fm-paper-critically.md)):

1. **Find the linear baseline.** If there isn't one, distrust the headline number.
2. **Find the train/test split description.** If it's vague, donor or tissue leakage is likely.
3. **Find the downstream task that maps to actual deployment value.** Skip the celebratory cell-type-classification table; look for perturbation, clinical, or design benchmarks.
4. **Find the compute cost.** A 10B-parameter FM that needs an A100 to embed a single cell is not deployable in any small lab or hospital.
5. **Find the licence on weights and code.** No licence = no real artifact; AGPL = limited reach; Apache-2.0 / MIT = wide reach.

## What changed permanently after the reckoning

Three permanent changes to how the biological-FM field evaluates in 2026:

- **Strong-baseline-first** is now table stakes. A paper that omits the linear baseline gets called out in review and on social media.
- **Software-as-benchmark** is the new standard. sc-Arena, PerturBench, GUE+, MedAgentGym all ship as runnable harnesses, not just CSVs.
- **Clinical / wet-lab signal trumps proxy accuracy.** A pathology FM is judged on Campanella-2025 clinical performance, not on patch-classification accuracy. A protein FM is judged on experimental binder rates, not on contact-prediction AUC alone.

The honest summary: **2025 was the year the field grew up about evaluation**. The 2026 work that's ageing well — xVERSE, AlphaGenome, the Perturbation Adapter, Hibou — all reports honest comparisons against strong baselines on benchmarks that matter. The 2026 work that won't age well still doesn't. Look at the evaluation section first.
