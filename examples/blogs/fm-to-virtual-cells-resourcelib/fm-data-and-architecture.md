---
title: 'Cell foundation models: training data + architecture at a glance'
date: '2026-05-21'
topics:
- foundation-model
- virtual-cell
- primer
- reference
summary: "A companion reference table to the scaling scatter (Presentations → 'Foundation models: size vs. training scale'): for every single-cell foundation model, what corpus it was trained on and the key model structure / algorithm — the architecture class, how it encodes a cell, and the pretraining objective. Read down the table and the field's two design axes pop out: rank-ordering vs. expression-value encoding, and masked-token vs. autoregressive/LLM objectives — with scVI (a VAE), C2S-Scale (a repurposed LLM), and xVERSE (a non-transformer, VAE-like model) as the instructive outliers."
starred: false
---

> *A companion to the [timeline & lineage map](five-questions-timeline-and-lineage.md) and the scaling scatter (Presentations tab → "Foundation models: size vs. training scale"). That scatter shows how big each model is and how much data it saw; this table says **what** data and **how** it's built. Sizes and the survey live in the [hundred-concepts essay](one-hundred-concepts-five-questions-v5.md).*

The cell-foundation-model field looks like a long list of names, but under the hood it's a small number of design choices recombined. This table lays each model's **training corpus** next to its **key architecture and pretraining algorithm**, so the recurring patterns are visible at a glance.

| Model (first online) | Training data | Key architecture / algorithm |
|---|---|---|
| **scVI** (2018) | No fixed corpus — fit per-dataset on raw scRNA-seq UMI counts. (Reference checkpoints on CELLxGENE Census exist, but the original is not a pretrain-once model.) | Variational autoencoder (VAE): encoder → latent, decoder parameterizing a (zero-inflated) negative-binomial count likelihood with explicit library-size and batch terms; trained on the ELBO. Not a transformer. |
| **scBERT** (2021) | PanglaoDB — ~1.1M human scRNA-seq cells across 74 tissues from many public studies. | BERT-style transformer using Performer linear attention (to reach ~16k genes); gene2vec gene-identity embedding + binned-expression embedding; self-supervised masked-gene prediction. |
| **Geneformer** (2023) | Genecorpus-30M — ~30M human single-cell transcriptomes from public data. | BERT-style transformer; encodes a cell as a rank-value ordering of its genes (ranked relative to corpus-wide expression, which deprioritizes housekeeping genes); masked-token prediction. |
| **scGPT** (2023) | >33M human cells from CELLxGENE, multi-tissue scRNA-seq (plus multi-omic variants). | Generative (GPT-style) transformer over gene tokens + binned expression-value tokens + condition tokens; specialized attention masking unifies gene- and cell-prompt generation; predicts masked expression values. |
| **scFoundation / xTrimoGene** (2023) | >50M human single-cell transcriptomes across 100+ tissues (normal, tumor, disease); ~20k genes. | xTrimoGene asymmetric encoder–decoder transformer (encoder runs only on expressed genes for efficiency); continuous scalar expression values; read-depth-aware objective (predict a higher-depth profile from a lower-depth view). |
| **CellPLM** (2023) | >10M cells combining scRNA-seq with spatially-resolved transcriptomics. | Transformer that treats cells as tokens and tissues as "sentences," with inter-cell (cell–cell) attention; Gaussian-mixture latent prior; pretrained by cell-level masked modeling (mask whole cells and reconstruct them). |
| **UCE** (2023) | ~36M cells across human + 8 species, 1000+ datasets (largely CELLxGENE Census); fully self-supervised, no labels. | 33-layer transformer producing a universal cell embedding; genes represented by frozen ESM-2 protein-language-model embeddings (so it transfers to new species); key property is zero-shot embedding of unseen datasets. |
| **Nicheformer** (2024) | SpatialCorpus-110M — ~110M human + mouse cells across 73 tissues (~57M dissociated scRNA-seq + ~53M spatial). | ~12-layer transformer encoder; rank-based gene tokenization plus species / modality / assay tokens; masked-token pretraining over the joint dissociated + spatial corpus. |
| **TranscriptFormer** (2025) | ~112M cells across 12 species spanning ~1.5B years of evolution (TF-Metazoa); human-only (57M) and 5-organism variants too. | Generative autoregressive transformer modeling gene identities and transcript counts jointly, per cell; frozen ESM-2 gene embeddings + an assay token; expression-aware attention, causal masking, and a count likelihood. |
| **C2S-Scale** (2025) | >50M cells plus paired text / metadata, via the Cell2Sentence framework. | A general LLM (Gemma-2 family, up to 27B params) trained on "cell sentences" — each cell rewritten as a sequence of its top genes ranked as words; standard next-token / causal language-model training, unifying transcriptomic and text tasks. |
| **STATE** (2025) | ~170M observational cells (embedding model) + perturbation data on >100M cells across 70 human cell lines and thousands of perturbations (transition model). | Two coupled transformers. State Embedding (SE) makes robust per-cell embeddings; State Transition (ST) is a set transformer that takes a set of control cells and predicts how the population's embeddings shift under a perturbation — modeling the set-level distributional change, not one cell at a time. |
| **Tahoe-x1** (2025) | ~266M single-cell transcriptomes, including the in-house Tahoe-100M drug-perturbation atlas (~100M cells, ~1,200 drugs × ~50 cancer lines) plus public data. | Transformer encoder up to 3B params; masked-expression reconstruction — gene identity + discretized expression + mask status are co-encoded, and the model regresses the masked expression values ("perturbation-trained" via Tahoe-100M, but the core objective is masked-expression modeling). |
| **xVERSE** (2026) | ~89M cells — ~70M single-cell (64 tissues) + ~19M spatial (13 tissues). | Transcriptomics-native (explicitly not a language-model transformer): a Gene2Cell encoder into a batch-invariant latent + a dual-stream decoder that separates biological signal from technical artifacts; VAE-like probabilistic generation. (Exact backbone primitive not fully specified in the preprint.) |

## Patterns worth noticing

- **Two ways to encode a cell.** Some models throw away exact counts and use a *rank-ordering* of genes (Geneformer, Nicheformer); others keep the *expression values* — binned (scBERT, scGPT) or continuous (scFoundation). Rank-encoding is robust to depth; value-encoding keeps quantitative information.
- **Two pretraining objectives.** The default is *masked-token* (BERT-style: scBERT, Geneformer, Nicheformer, Tahoe-x1, CellPLM). A growing camp is *autoregressive / generative* (scGPT, TranscriptFormer, and the full LLM, C2S-Scale).
- **The gene-embedding trick.** Representing genes by their *protein* (ESM-2) embeddings rather than learned IDs (UCE, TranscriptFormer) is what buys cross-species and unseen-gene transfer.
- **The instructive outliers.** scVI is a VAE, not a transformer, and predates the wave. C2S-Scale is a repurposed text LLM. xVERSE is a deliberate non-transformer, VAE-like model — early evidence the transformer shape isn't load-bearing.
- **The data story.** Corpora grew from ~1M cells (scBERT, 2021) to 100M+ (Nicheformer, Tahoe-x1), and from dissociated scRNA-seq only to a mix of spatial, perturbation, and cross-species data — which is the same scaling-on-both-axes story the scatter (Presentations → "Foundation models: size vs. training scale") makes visual.
