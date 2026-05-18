---
title: 'Stage 4 — Pretraining objective: the most consequential choice you make'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
- evaluation
summary: Masked vs. autoregressive vs. self-distillation vs. generative joint modeling — the pretraining objective dictates downstream behavior more than any other design choice, and it's the choice the linear-baselines reckoning indicts.
starred: false
---

> *Expansion of stage 4 from [how a biological FM is built](how-to-build-a-biological-fm.md). Sibling stages: [data corpus](stage-1-data-corpus.md) · [tokenization](stage-2-tokenization.md) · [architecture](stage-3-architecture.md) · [adaptation](stage-5-adaptation.md) · [evaluation](stage-6-evaluation.md). Closely related: [why linear baselines win](why-linear-baselines-win.md).*

If you only get to pick one stage carefully, pick this one. The pretraining objective determines **what the model actually learns**, which determines **which downstream tasks transfer and which silently fail**. Tokenization and architecture get the diagrams; the pretraining objective decides whether the model can be useful at all. This essay is a tour of the four objective families used across biological FMs, the load-bearing failure mode they share, and the alternatives 2026 is exploring.

## The four objective families

### Family A — Masked-token prediction (BERT-style)

Mask 15-25% of input tokens at training time; ask the model to predict them from the unmasked context. Used by **scGPT** (masked `(gene, bin)` token prediction), **Geneformer** (masked gene-rank prediction), **scFoundation** (masked count prediction with read-depth conditioning), **UNI** (the loss is more DINO-style but with masking inside), and **ESM-2** (canonical masked amino acid prediction).

What this objective teaches: **co-occurrence statistics**. Given that genes A and B are unmasked, what's the most likely identity of masked gene C? This is *correlational* — it captures which genes go together but not what depends on what.

### Family B — Autoregressive next-token (GPT-style)

Predict each token from the *preceding* tokens only; sample to generate new sequences. Used by **HyenaDNA**, **Evo2** (genomic next-nucleotide prediction over up to 1M+ contexts), and parts of **ESM-3**. The objective makes *generation* a first-class capability — you can sample a new functional genome or a new protein the same way you sample text from GPT.

What this objective teaches: **conditional density** — what comes next given everything before. Stronger generation, slightly weaker representation than bidirectional masking.

### Family C — Self-distillation (DINO-style)

No labels and no masking; instead, a student network is trained to match a teacher network's representation under different augmentations of the same input. Used by **UNI** (DINOv2 over H&E tiles), **Virchow2** (DINOv2 variant), and most modern pathology FMs.

What this objective teaches: **augmentation-invariant representation**. The model learns "two crops of the same slide should embed similarly" without ever needing to predict pixels. This is the cleanest fit for pathology because the underlying biology is genuinely augmentation-invariant (cancer is cancer under flips, color jitter, and crops).

### Family D — Generative joint modeling

Multiple modalities, masked or autoregressively modeled jointly through a shared backbone. **ESM-3** is the exemplar: it learns to jointly fill in sequence, structure tokens, and function annotations from any subset of the others. The downstream capability is *unified generation and design* — fix sequence and structure, generate function; fix function and structure, generate sequence.

## The load-bearing failure mode: correlational vs. causal

The single most important thing to internalize about Family A (and to a lesser extent Families B and D): **the objective is correlational, the downstream tasks you want are often causal.**

scGPT's masked-gene objective teaches "when gene A and gene B are unmasked, gene C is likely to take value X." It does **not** teach "if you knock out gene C, gene B will change to Y." The first is correlational; the second is causal. These are different problems, and a correlational model has no reason to solve the causal one.

This is why the [2025 linear-baselines reckoning](why-linear-baselines-win.md) hit the field so hard: a **simple latent-additive baseline** that takes the average post-perturbation expression in the training set and scales by a few latent factors beats every published sc-FM on most perturbation benchmarks. The linear baseline isn't doing anything sophisticated — it's just not actively *misled* by a correlational pretraining objective.

Ten independent evaluation papers ([catalog](evaluation-papers-catalog.md)) replicated this finding through 2025. The pretraining objective is the prime suspect.

## What the alternatives look like

Three 2026 directions for objectives that better match the downstream:

### Causal objectives

Train on **perturbation-grounded data** (Perturb-seq, CRISPRi screens) with an objective that explicitly contrasts "with perturbation" vs. "without perturbation" rather than predicting masked tokens within a single condition. xVERSE is partway here; TxPert is fully here. The challenge: perturbation data is ~1000× smaller than transcriptomic data, so you can't pretrain at the same scale.

### Self-distillation for omics

If DINOv2 works so well for pathology, why not for omics? The challenge is **what counts as an augmentation** for transcriptomes. Two cells from the same tissue? Two technical replicates of the same sample? Two pseudo-bulk profiles? The community hasn't settled on a clean answer, but there are 2026 preprints exploring contrastive omics objectives.

### Hybrid objectives + counterfactual heads

Pretrain with masking, then *add a counterfactual loss* during continual pretraining: the model is asked to predict not just the masked tokens but also "what would the expression be if gene X were perturbed?" using paired Perturb-seq data. The sc-FM Perturbation Adapter (see [adaptation](stage-5-adaptation.md)) is the small-team version of this — it doesn't change the backbone objective but injects a causal-ish head on top.

## What this means for picking your objective

Five concrete principles for someone choosing an objective in 2026:

1. **Audit the downstream first.** If the downstream task is causal (perturbation, design, intervention), a purely correlational objective will fail. Don't be surprised when it does.
2. **Self-distillation > masking for representation-only goals.** UNI and Virchow2 vs. scGPT and Geneformer is, in part, a self-distillation-vs-masking comparison; the pathology representation quality is meaningfully higher.
3. **Autoregressive > masked for generation goals.** ESM-3 and Evo2 give you generation; ESM-2 and Enformer don't.
4. **Joint-modality objectives unlock design.** ESM-3-style joint sequence/structure/function objectives are the only known route to *unified* biological design.
5. **Pretraining objective is hardest to change later.** Tokenization can be modified at the adaptation layer; architecture can be ablated; the pretraining objective is baked into every weight. Pick deliberately and document the choice loudly.

The single biggest open question in biological FMs is: **what is the right pretraining objective for a virtual cell?** The honest 2026 answer is *we don't know yet, and the BERT-clone default is probably wrong.*
