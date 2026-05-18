---
title: 'Stage 5 — Adaptation: how a pretrained FM actually meets a downstream task'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
summary: The four standard adaptation patterns (zero-shot, full fine-tune, LoRA/adapter, prompt-tuning) plus the family-specific twists — attention-MIL for pathology, function heads for protein, variant-effect probes for genomic — and why small adapters now often outperform full fine-tunes.
starred: true
---

> *Expansion of stage 5 from [how a biological FM is built](how-to-build-a-biological-fm.md). Sibling stages: [data corpus](stage-1-data-corpus.md) · [tokenization](stage-2-tokenization.md) · [architecture](stage-3-architecture.md) · [pretraining objective](stage-4-pretraining-objective.md) · [evaluation](stage-6-evaluation.md). Related: [what small labs build](small-labs-what-to-build.md), [agentic methods meets FMs](agentic-meets-foundation.md).*

Pretraining is the expensive part. Adaptation is where the model finally meets the task you actually care about — and where almost every practical decision about deployment gets made. This essay walks through the four standard adaptation patterns, the family-specific aggregator layers, and the 2026 small-team result that's quietly reshaping the field: **<1% adapters on a frozen backbone now routinely outperform full fine-tunes**.

## The four standard patterns

### Pattern A — Zero-shot embedding + linear probe / k-NN

Pull the `[CLS]` embedding (or mean-pool the token embeddings) and use it as a fixed feature vector. Train a logistic regression or run a k-NN classifier on top. **Cost:** seconds, no GPU. **When it works:** when the pretrained representation already separates the classes you care about. **When it fails:** any task downstream of the pretraining objective in causal depth — perturbation prediction, intervention design, counterfactual modeling.

This is the default starting point for any new sc-FM evaluation, and the one the [linear-baselines reckoning](why-linear-baselines-win.md) most cleanly indicts: a `latent-additive + scGPT-embeddings` baseline beats every fancier zero-shot scGPT setup on perturbation, which means the embedding *itself* isn't doing useful work for that task.

### Pattern B — Full fine-tuning

Update all backbone weights on the downstream task. **Cost:** the original pretraining infrastructure (multi-GPU, often several days). **When it works:** when you have lots of in-task data and the pretraining-to-downstream gap is moderate. **When it fails:** when in-task data is small (you overfit), when the gap is too large (you forget useful pretraining), or when you need many task-specific deployments (you can't afford one full backbone per task).

Full fine-tuning was the 2023 default; it has lost ground every year since to the next two patterns.

### Pattern C — LoRA / adapter / specialized head

Freeze the backbone. Train **~0.1-5% of the parameter count** as a low-rank update (LoRA), an inserted bottleneck (Houlsby/Pfeiffer adapter), or a small task-specific head on top. **Cost:** a single GPU for hours, sometimes a single GPU for a day. **When it works:** when the backbone representation is roughly right but needs a task-specific projection. **When it fails:** when the backbone representation is *fundamentally* wrong for the task — no amount of adapter rescues a representation that doesn't encode the right information.

This is now the dominant pattern across all four families. The dramatic 2026 result: **the [sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/)** — a <1% drug-conditional adapter layered on a frozen sc-FM backbone — beats the linear-additive baseline that previously beat every full-fine-tuned sc-FM. The adapter is the smallest possible intervention, and it works precisely because the backbone's pretraining objective ([stage 4](stage-4-pretraining-objective.md)) was the bottleneck, not the backbone's capacity.

### Pattern D — Prompt-tuning / soft prompts

Learn a small continuous prompt vector that's prepended to the input; freeze everything else. **Cost:** trivial. **When it works:** for LLM-style backbones where the prompt acts as task identifier (most relevant for PathChat and other multimodal biology agents). **When it fails:** for non-LLM biological FMs, where the "prompt" abstraction doesn't map cleanly.

## Family-specific aggregator and head patterns

Each family has a canonical "second half" of adaptation that's necessary to make the FM produce the artifact people actually want:

### Pathology — Attention-MIL aggregators (CONCH, TITAN)

A pathology FM emits a tile-level embedding. The artifact people actually want is **a slide-level prediction** (cancer type, treatment response, survival score, biomarker positivity). The bridge is **multiple-instance learning (MIL)** with attention: an aggregator network learns which tiles in a slide are diagnostic and pools their embeddings into a single slide vector. CONCH and TITAN (both Mahmood lab) are the canonical 2025-2026 examples. The MIL aggregator is often trained from scratch on each task; the FM provides the tile features.

### Protein — Function-prediction heads and design heads

ESM-2 representations get adapted to function via small MLP heads for tasks like **secondary structure prediction, contact prediction, function annotation**. ESM-3 generalizes this by replacing the head with **generative sampling** over its joint sequence/structure/function tokens, enabling design (give me a protein that binds X) rather than just prediction (annotate this protein). RFdiffusion-style design models are increasingly used as a "head" downstream of ESM embeddings.

### Genomic — Variant-effect prediction heads

Genomic FMs feed their per-position embeddings into **variant-effect heads** that score whether a given SNV is likely to affect a phenotype. AlphaGenome 2026 wins 25/26 variant-effect tracks largely because of careful variant-effect head design layered on a strong genomic backbone — not because the backbone itself is dramatically better than Enformer.

### Single-cell — Adapters everywhere

Single-cell adaptation is where the most experimentation is happening because the pretraining-to-downstream gap is widest. Patterns we see in 2026:

- **Drug-conditional adapters** (sc-FM Perturbation Adapter) for perturbation tasks.
- **Cell-type-specific heads** for fine-grained classification beyond what the backbone supports.
- **Cross-modality adapters** that map sc-FM embeddings into a shared space with imaging or spatial-omics models.

## Why small adapters now beat full fine-tunes

Three reasons, all related:

1. **Downstream data is small.** Perturb-seq experiments produce ~100k-1M cells; spatial-omics atlases are smaller; rare-disease cohorts are tiny. Full fine-tuning on small data destroys pretrained knowledge (catastrophic forgetting). Adapters preserve it.
2. **The bottleneck is often the objective, not the capacity.** When the pretraining objective is correlational and the downstream is causal ([stage 4](stage-4-pretraining-objective.md)), a small task-specific head can inject the missing causal structure without re-learning everything.
3. **Deployment economics.** A 1B-parameter backbone with 100 task-specific adapters is much cheaper to serve than 100 separately-fine-tuned 1B models. This matters once you actually want to ship a tool people use.

## The agent-wrapper adaptation pattern

A fifth adaptation pattern that's gaining traction in 2026: don't adapt the model — **wrap it in an LLM agent that orchestrates the FM as a tool**. X-Cell (Bo Wang lab) does this for the sc-FM stack; PathChat does it for pathology; [MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/) evaluates the agent-wrapper category at scale (72k tasks). The pattern is: the FM produces structured outputs (embeddings, predictions, scores), and an LLM orchestrator composes them into a task-specific workflow. This is the [agentic-meets-foundation](agentic-meets-foundation.md) story. The adaptation here is at the **interface** layer, not at the weight layer.

## What to build at the adaptation stage

For a small team in 2026, adapters are the highest-leverage place to ship: low compute, fast iteration, deployment-ready, and (as the sc-FM Perturbation Adapter shows) capable of beating much larger full-fine-tune baselines when the pretraining objective is the actual bottleneck. The decision tree: **is the backbone representation roughly right?** If yes, build an adapter. If no, go back to [stage 1](stage-1-data-corpus.md) — you need a better corpus or a different pretraining recipe, not a better head.
