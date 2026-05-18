---
title: 'Stage 2 — Tokenization: the most family-specific design choice'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
summary: How each biological FM family converts its raw substrate into discrete tokens — and why tokenization is the stage where single-cell, pathology, protein, and genomic FMs diverge most, with the largest downstream consequences.
starred: false
---

> *Expansion of stage 2 from [how a biological FM is built](how-to-build-a-biological-fm.md). Sibling stages: [data corpus](stage-1-data-corpus.md) · [architecture](stage-3-architecture.md) · [pretraining objective](stage-4-pretraining-objective.md) · [adaptation](stage-5-adaptation.md) · [evaluation](stage-6-evaluation.md).*

If you read four FM method sections side by side — scGPT, UNI, ESM-2, AlphaGenome — the architectures look more similar than different. The corpora look more similar than different. The *tokenization*, on the other hand, looks like four different inventions for four different problems. Tokenization is where each family commits to **what counts as a unit of biology**, and once committed, the choice propagates through every downstream stage. This essay walks through the four families' tokenization choices, what each one preserves, what each one quietly throws away, and which 2026 work is starting to break the templates.

## Single-cell: from continuous counts to discrete tokens

A single cell's transcriptome is a **sparse, unordered vector** of ~20,000 integer counts. Two ways to turn that into something a transformer can ingest:

- **scGPT-style binning.** Each cell's expression values get binned by quantile into 51 bins (other variants use 7-101 bins). Each non-zero gene becomes a token `(gene_id, bin_id)`; the cell is the sequence of these tokens. Vocabulary size ≈ 20k × 51 ≈ 1M; in practice scGPT factorizes gene-id and bin-id embeddings.
- **Geneformer-style ranking.** Within each cell, rank genes by expression and tokenize the *rank position*. The vocabulary is just ~20k (one token per gene), and the "expression" information lives entirely in token order.

Both choices encode the field's load-bearing inductive bias — *which genes are most-expressed relative to baseline in this cell* — at the cost of two things: **absolute magnitude** (1000 UMI vs. 10 UMI of a given gene look identical after rank or coarse binning) and **gene-gene order** (genes have no canonical sequence; positional embeddings are essentially noise). UCE and CellPLM add cross-species condition tokens; scFoundation adds read-depth-aware tokens; **xVERSE** (Jiang & Xie, bioRxiv 2026.04) abandons the language-model framing entirely and uses transcriptomics-native non-LM tokens, which is part of why it beats every sc-FM by 11-34% on representation tasks.

## Pathology: ViT patches as the de facto standard

Pathology FMs reuse a tokenization recipe directly from computer vision: a whole-slide image (WSI) is tiled into **256×256-pixel patches** (sometimes 224×224, occasionally 512×512) at a fixed magnification (usually 20×, sometimes 40×). Each patch is fed to a **Vision Transformer (ViT)** which internally splits the patch into 14×14 or 16×16 sub-patches, each linearly projected to a token embedding. Vocabulary is unbounded (every patch is its own embedding, no discrete codebook); position is encoded by 2D learned positional embeddings within the patch and by the patch's slide-coordinate at the aggregation stage.

What this throws away: **scale invariance** (the model sees patches at one magnification only — to query at multiple magnifications you need multi-scale pyramids), **inter-patch context** (each patch is independent at the FM stage; spatial context only arrives at the aggregation/attention-MIL stage in [adaptation](stage-5-adaptation.md)), and **color calibration** (stain normalization is upstream of the FM; if it's bad, the FM doesn't compensate). The Mahmood lab's UNI, Paige's Virchow2, and HistAI's Hibou all use essentially the same ViT-patch recipe; the differences are in pretraining objective and corpus, not tokenization.

## Protein: the alphabet is fixed for you

Proteins enjoy a tokenization simplicity no other family has: **biology already supplied a 20-token vocabulary** (the 20 standard amino acids), plus special tokens for selenocysteine, pyrrolysine, gaps, unknowns. ESM-2 and most protein FMs use this raw 20+special alphabet directly. ESM-3 generalizes by adding **structure tokens** (a discrete VQ-VAE codebook over local 3D environments) and **function tokens** (GO terms, InterPro domains) as parallel modalities, all sharing the same transformer. Modern protein-design models (RFdiffusion, Chroma) use the amino-acid alphabet but on a continuous geometric backbone rather than a discrete sequence.

The one tokenization choice that *matters* for protein FMs is whether to **share parameters across the alphabet** or treat each amino acid as fully independent. ESM-2's tied embeddings + rotary positional encoding turn out to capture surprising amounts of evolutionary signal — which is part of why ESM-2 representations transfer further than any single-cell embedding has yet managed to do.

## Genomic: the tokenization war isn't over

Genomic FMs are the family where tokenization is **still actively contested in 2026**. Four routes are alive:

- **k-mer tokens** (DNABERT-2, NT-V2): merge 3-6 nucleotides into a single token. Vocabulary stays small (4³=64 to 4⁶=4096); context length stays manageable. The cost: k-mer boundaries are arbitrary and disrupt motif alignment.
- **Single-nucleotide tokens with massive context** (HyenaDNA up to 1M bases, Evo2 up to 1M+ bases): every nucleotide is its own token; the burden moves to the architecture (state-space models replace attention; see [stage 3](stage-3-architecture.md)).
- **BPE over nucleotides** (Caduceus, some Evo variants): learn a tokenizer the way GPT-2 does over text. Gives variable-length tokens that adapt to motif frequency; cost is that you can't trivially align variants back to single-base coordinates.
- **Regulatory-track-aware tokens** (AlphaGenome 2026): the sequence is tokenized into nucleotide chunks but augmented with parallel input channels for chromatin accessibility, CpG methylation, and conservation. This is the choice that won 25/26 variant-effect tracks in 2026.

The genomic-FM field hasn't converged because the right tokenization depends on the downstream task: variant-effect prediction wants single-nucleotide resolution; regulatory-element prediction can tolerate k-mers; long-range gene-regulation prediction benefits from BPE.

## The escape route: xVERSE and the post-tokenization era

The most-interesting 2026 work on tokenization, in our view, is **stopping tokenizing altogether** — at least in the LM sense. xVERSE's non-LM transcriptomics-native architecture (see [conference vaults](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/)) doesn't pretend a cell is a sentence. It operates on the continuous count matrix directly with attention modules designed for the right inductive bias (gene-gene co-variation, batch effects, sparsity). The 11-34% gain over sc-FM baselines is partly an architecture story (covered in [stage 3](stage-3-architecture.md)) and partly a *tokenization* story — the BERT-clone sc-FMs all paid a cost at the tokenization stage that xVERSE simply doesn't pay. We expect this pattern to repeat: as the field digests the linear-baselines reckoning, more families will revisit the "discrete-token LM" framing they inherited from NLP.

Tokenization is where you commit to a worldview about your data. Pick carefully — you cannot fix it at adaptation time.
