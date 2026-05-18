---
title: 'Stage 3 — Architecture: from BERT clones to post-transformer biology'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
summary: A tour of biological-FM architectures across families — why almost everyone shipped a BERT clone in 2023-2024, why the most interesting 2026 work is moving past it (xVERSE, state-space models, ESM-3), and what each architectural choice trades.
starred: true
---

> *Expansion of stage 3 from [how a biological FM is built](how-to-build-a-biological-fm.md). Sibling stages: [data corpus](stage-1-data-corpus.md) · [tokenization](stage-2-tokenization.md) · [pretraining objective](stage-4-pretraining-objective.md) · [adaptation](stage-5-adaptation.md) · [evaluation](stage-6-evaluation.md).*

Walk a biological-FM author through their architecture diagram in 2024 and they would draw a transformer encoder, twelve layers, bidirectional attention, a `[CLS]` token, residual streams, layer norm, MLP blocks. It would look exactly like BERT-base from 2018, with the input embedding swapped for genes-or-patches-or-amino-acids. In 2026 that template is showing real cracks. This essay walks through the architectures actually shipping across the four FM families, and the three directions in which 2026 work is breaking the BERT-clone template.

## The 2023-2024 default: encoder-only transformer, BERT-base scale

scGPT (~50M params, 12 layers), Geneformer (~110M params, 12-layer or 30-layer variants), scFoundation (~100M params), UCE (650M params), CellPLM (~84M params): **all encoder-only transformers**, all with bidirectional attention, all with masked-token pretraining (covered in [stage 4](stage-4-pretraining-objective.md)). UNI (~300M params) and Virchow2 (~600M params) on the pathology side: encoder-only ViTs. ESM-2 (8M-15B params across the scale family): encoder-only transformer. Enformer (genomic, 2021): encoder-only transformer with very-long-context attention.

The reason this template won 2023-2024 is mostly **inertia + tooling**: BERT-shaped models have a mature training stack (HuggingFace, FairSeq, Megatron-LM), a well-understood scaling-law literature, predictable failure modes, and an army of researchers who already know how to debug them. The cost: BERT was designed for *language*, an inherently sequential, ordered, finite-vocabulary modality. Most biological substrates have none of those properties. The BERT-clone era spent ~$200M of public-grant compute training models that match an inductive bias mostly wrong for their data.

## Three escape routes 2026 is taking

### Route 1 — Domain-native non-LM architectures (xVERSE)

**xVERSE** (Jiang & Xie, bioRxiv 2026.04) is the headline example. It abandons the encoder-only LM framing entirely and uses a **transcriptomics-native architecture** with attention modules explicitly designed for the right inductive bias: gene-gene co-variation rather than gene-gene sequence, batch-aware normalization built into the model rather than upstream of it, and sparsity-aware compute. Result: **11-34% gains over every major sc-FM** on representation, batch correction, and spatial imputation. The lesson: the gain isn't from more parameters or more data — it's from the architecture matching the problem.

[TxPert](https://doi.org/10.1038/s41587-026-03113-4) (Wenkel et al., Nat Biotech 2026) is a parallel example for perturbation prediction: it injects a multi-knowledge-graph prior directly into the architecture rather than relying on a generic transformer to learn the prior from data.

### Route 2 — State-space models for long contexts (Hyena, Mamba, Evo2)

The transformer's attention mechanism is O(N²) in context length. For single-cell (~20k genes), that's fine. For pathology slides (millions of patches), it's manageable with hierarchical aggregation. For **genomic sequences** (chromosomes are ~10⁸ bases), attention has to be approximated, hashed, or replaced. The 2025-2026 winner is **state-space models** — Hyena (Stanford, 2023), HyenaDNA (2024), Mamba (Albert Gu et al., 2024), and **Evo2** (Arc Institute, 2026) all use sub-quadratic sequence mixers that scale to **1M+ token contexts on a single GPU**. AlphaGenome 2026 uses a hybrid attention/state-space stack to span megabase regulatory windows.

The cost: state-space models have less mature tooling, less-understood scaling behavior, and a smaller community to debug them. But for genomic biology, the alternative is "give up on long-range regulation," which is unacceptable.

### Route 3 — Generative joint-modality transformers (ESM-3)

**ESM-3** is the architectural surprise of 2024 that became 2025-2026's template for protein FMs. It's still a transformer, but it's **generative** (decoder-style mask-prediction) and **joint-modality** (sequence + structure + function all flow through the same backbone with shared attention). This unlocks **protein design** as a first-class capability rather than something bolted on as a downstream head. The architecture is SE(3)-invariant where appropriate (structure tokens preserve rotational/translational symmetry) and standard transformer elsewhere (sequence and function tokens). This pattern — *generative + joint-modality + selective symmetry* — is starting to appear in 2026 multimodal biology work (BioMedCLIP, PathChat-2) and is likely to spread.

## Pathology: ViTs are stable, the action is in the aggregator

Pathology FM architectures have **converged on ViT** (vision transformer), and the more interesting design space is at the **aggregator** — the model that turns tile-level embeddings into a slide-level representation. CONCH and TITAN (Mahmood lab) use attention-MIL (multiple-instance learning) aggregators; CHIEF uses a hierarchical aggregator; some 2026 models are experimenting with transformer-over-tiles. The FM itself is increasingly a commodity ViT; the differentiation has moved to the [adaptation stage](stage-5-adaptation.md).

## Single-cell: stuck on BERT, slowly moving

Single-cell is the family with the most BERT inertia and the slowest escape velocity. scGPT-v2, Geneformer-v2, and scFoundation 2025 updates all kept the encoder-only BERT shape and grew parameter counts (Geneformer reached 316M; scFoundation reached ~250M; UCE pushed past 650M). None of them dramatically rewrote the architecture. The community is starting to fragment between (a) "scale the BERT clone further" (UCE direction), (b) "domain-curate the BERT clone" (Geneformer V2-CLcancer direction; see [stage 1](stage-1-data-corpus.md)), and (c) "rewrite the architecture for biology" (xVERSE direction). Path (c) is producing the biggest deltas, but path (a) and (b) have more institutional momentum.

## Architecture choices that propagate downstream

Three architecture choices that quietly determine downstream behavior:

1. **Bidirectional vs. autoregressive attention.** Bidirectional (BERT, ESM-2) gives better *representation*; autoregressive (Evo2, ESM-3) gives *generation*. Pick based on what you want to do, not on what's fashionable.
2. **Parameter sharing across modalities.** ESM-3's shared backbone across sequence/structure/function is the design choice that enables joint generation. If you keep separate towers per modality (CLIP-style), you can do retrieval but not joint generation.
3. **Symmetry preservation.** For structure-aware models (proteins, molecules, spatial omics), SE(3)-equivariant or rotation-equivariant layers can radically reduce data requirements. For sequence-only models, symmetry is irrelevant.

Architecture is the stage where the field's NLP path-dependence is strongest and where the biggest 2026 deltas are now coming from people willing to walk away from BERT. The most-interesting question for 2027: which family escapes the BERT template *next*?
