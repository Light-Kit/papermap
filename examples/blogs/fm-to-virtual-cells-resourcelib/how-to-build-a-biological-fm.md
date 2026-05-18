---
title: How is a biological foundation model actually built?
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
summary: A worked end-to-end walkthrough using scGPT as the spine across six stages — data, tokenization, architecture, pretraining objective, adaptation, evaluation — with callouts showing how pathology, protein, and genomic FMs diverge at each step.
starred: true
---

> *Companion to the [foundation-models state-of-play](foundation-models-state-of-play.md). Same FMs, different cut: this one asks "how is the thing actually built?" rather than "which one wins?". Reading order: this first if you want the conceptual + technical scaffolding; that one if you want the 2026 leaderboards.*

This essay walks through the standard six-stage pipeline for building a biological foundation model, using **scGPT** as the worked example because (1) it's the most thoroughly documented single-cell FM, (2) it's also the most thoroughly criticized — which makes the failure modes pedagogically useful — and (3) the other major sc-FMs (Geneformer, scFoundation, UCE, CellPLM) cleanly contrast against it at every stage. After each stage, a one-line callout shows how pathology, protein, and genomic FMs diverge from the omics template.

## Stage 1 — Data corpus

scGPT was pretrained on **33 million cells** harmonized from CELLxGENE Census, spanning 51 organs and hundreds of donors. The work was less in the model than in the **harmonization**: per-dataset normalization, gene-symbol unification across platforms, doublet filtering, and metadata reconciliation. By 2024 the corpus had grown to ~50M cells; UCE pushed it to ~100M, but the *quality* of the harmonization mattered more than the raw count — the cancer-domain Geneformer V2 checkpoint (trained on a curated 14M cancer cells) matches or beats the larger general model on most downstream tasks.

> **Across families:** pathology FMs train on **>100M H&E tiles** (UNI on >100M, Virchow2 on 3.1M whole-slide images); protein FMs on **~250M UniProt sequences** (ESM-2/3); genomic FMs on **whole-genome corpora** (1000 Genomes + ENCODE for Enformer; ~9.3T tokens for Evo2). The omics families differ ~3 orders of magnitude in raw token count.

## Stage 2 — Tokenization

A single cell's transcriptome is a sparse, **unordered** vector of ~20,000 gene-expression counts. scGPT's choice: **bin** each cell's expression values into 51 bins by quantile, then represent the cell as a sequence of `(gene_id, bin_id)` tokens. This makes the input look like language — discrete tokens, finite vocabulary — but throws away order (genes have no canonical sequence). Geneformer takes a related route: rank-order the genes by expression and encode the *rank*, not the count. Both choices encode the field's most-important inductive bias — **"which genes are highly expressed relative to baseline?"** — at the cost of losing absolute magnitude.

> **Across families:** pathology FMs use **ViT patches** (the standard 16×16 or 14×14 pixel grid); protein FMs use the **20-amino-acid vocabulary** (or BPE-extended for ESM-3); genomic FMs split between **k-mer tokens** (DNABERT-2) and **single-nucleotide** tokens with very long contexts (HyenaDNA, AlphaGenome). Tokenization is the stage where the families diverge most.

## Stage 3 — Architecture

scGPT is a **12-layer transformer encoder, ~50M parameters**, with cell-aware masked attention. The architecture is BERT-shaped — bidirectional, encoder-only, with a special `[CLS]` token whose final embedding is the cell representation. UCE adds cross-species condition tokens; scFoundation adds read-depth-aware attention; xVERSE breaks the template entirely and uses a non-LM transcriptomics-native architecture (and beats the LM-shaped sc-FMs on representation, batch correction, and spatial imputation by 11-34%). The pattern: **everyone in 2023-2024 used a BERT clone; the most interesting 2026 work is moving away from BERT clones.**

> **Across families:** pathology uses **DINOv2-trained ViTs** with self-distillation; protein uses BERT-shape transformers (ESM-2) or generative SE(3)-invariant transformers with structure tokens (ESM-3); genomic FMs are migrating to **state-space models** (HyenaDNA, Evo2) to handle the kilobase-to-megabase contexts that attention can't fit.

## Stage 4 — Pretraining objective

scGPT optimizes **masked gene prediction** (mask 15-25% of `(gene, bin)` tokens, predict them from the unmasked context) plus a next-cell-prediction objective in some variants. The crucial observation — load-bearing for the 2025 reckoning — is that this objective is **correlational**, not causal. It teaches the model "which genes co-vary with which other genes." That's a different task from "what would expression be if I knocked out gene X?", which is the perturbation-prediction task the field actually wants. This mismatch is why a linear regression on average post-perturbation expression beats every sc-FM on perturbation benchmarks ([see "why linear baselines win"](why-linear-baselines-win.md)).

> **Across families:** pathology uses **DINOv2 self-distillation** (student-teacher consistency, no labels); ESM-2 uses **masked language modeling**, ESM-3 generalizes to **generative joint sequence/structure/function modeling**; genomic FMs use **next-nucleotide prediction** (autoregressive) or masked-nucleotide (BERT-style). The objective dictates downstream behaviour more than any other choice.

## Stage 5 — Adaptation

Four standard adaptation patterns: **(a) zero-shot embedding** — pull `[CLS]` and use a linear probe / k-NN, **(b) full fine-tune** — update all weights on a downstream task, **(c) LoRA / adapter** — train ~1% of the weights as a small bottleneck, **(d) prompt-tuning** — learn a soft prompt vector. The most-interesting 2026 small-team result is the [sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) — a **<1% drug-conditional adapter** layered on a frozen sc-FM backbone that beats the linear-additive baseline on zero-shot perturbation prediction. The lesson: when the pretrained backbone is mediocre at your task, a small specialized head can rescue it without retraining.

> **Across families:** pathology adds **attention-MIL aggregators** over tile embeddings into slide-level representations (CONCH, TITAN), plus prompt-tuned LLM heads (PathChat); protein adds **task-specific function-prediction heads** or generative-design heads (RFdiffusion-style); genomic adds **variant-effect prediction heads** over the encoder embeddings.

## Stage 6 — Evaluation

The omics evaluation surface has settled on: **cell-type classification, batch correction, perturbation prediction, cross-tissue transfer**. The 2025-2026 reckoning narrowed this to two questions: (1) does the FM beat a `latent-additive + scGPT-embeddings` baseline on perturbation? (2) does it beat scVI or scANVI on representation? Ten independent evaluation papers say **no** for almost every published sc-FM on (1); the answer is more mixed on (2). [sc-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) is the scorecard the field uses now.

> **Across families:** pathology evaluates on the **Campanella et al. 2025 clinical benchmark, BACH, HEST-1k, CRC polyp**; protein on **long-context folding accuracy + experimental binder hit rates**; genomic on **GUE / GUE+ / NT-18-task and the variant-effect benchmarks where AlphaGenome 2026 won 25/26 tracks**. The pathology and genomic families have cleaner downstream signal than single-cell because the proxy benchmarks correlate better with clinical/biological utility.

## What's universal, what diverges

**Universal across families:** transformer attention (still dominant, though state-space models are eroding it for long contexts), masked / next-token pretraining objectives, the four-pattern adaptation toolkit, and the same load-bearing failure mode — proxy benchmarks oversell, downstream tasks underdeliver, and small specialized adapters often outperform full fine-tunes.

**Where families diverge:** the **tokenization** stage (each family invented its own); the **data corpus** (size, quality, and access constraints differ by 3+ orders of magnitude); and the **adaptation pattern** that actually ships in production (attention-MIL for pathology, function heads for protein, variant-effect probes for genomic, adapters for single-cell). The architecture itself — once thought to be the differentiator — is converging on transformer-or-Hyena across all four families.
