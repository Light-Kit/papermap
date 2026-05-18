---
title: 'Spatial omics + multimodal biology: where the modalities finally meet'
date: '2026-05-18'
topics:
- spatial
- multimodal
- foundation-model
summary: A landscape of spatial omics and multimodal biology in 2026 — the SpatialData / OME-NGFF substrate, HEX's virtual spatial proteomics from H&E, the Stegle and Mahmood-lab integrations, BioMedCLIP / PathChat-2 / LLaVA-Med on the multimodal side, and what small teams build at the interfaces between modalities.
starred: true
---

> *Companion landscape blog: [pathology FMs](pathology-fm-landscape.md), [genomic + protein FMs](genomic-and-protein-fm-landscape.md), [clinical AI](clinical-and-agentic-clinical.md). For build mechanics see [how to build a biological FM](how-to-build-a-biological-fm.md).*

The single largest 2026 trend across all FM families is **modality fusion**. Pathology meets spatial-omics (HEX). Single-cell meets imaging (Virtual Cell Challenge entries). Sequence meets structure meets function (ESM-3). Histology meets language (PathChat-2). This essay maps the spatial-omics and multimodal-biology landscape — what's actually being built, where the substrate work is happening, what the headline models do, and where small teams should look for wedges.

## The substrate: SpatialData, OME-NGFF, Zarr

You can't run a multimodal model without a shared container. The 2024-2026 winner for spatial biology is **SpatialData** (Stegle group + the broader OME-NGFF community), a cross-language, Zarr-backed data format that holds aligned spatial-omics + imaging + annotation data in one structure. SpatialData has become the de facto standard for spatial-omics tools — scverse adopted it, the Mahmood lab uses it for HEST-1k, and the major commercial platforms (10x Visium HD, Xenium, MERSCOPE, NanoString CosMx) all have export adapters.

The reason this matters for FMs: **without a substrate format, every multimodal FM team rebuilds the data layer from scratch**. SpatialData solved that. Adjacent infrastructure: **plyxp** (dplyr verbs on SummarizedExperiment, Mike Love), **bioc-to-galaxy** (Bioconductor → Galaxy interop), the broader scverse ecosystem. These are unglamorous but indispensable — see [small labs](small-labs-what-to-build.md) Wedge 6.

## The spatial-omics landscape in 2026

### Commercial platforms

- **10x Genomics Xenium + Visium HD** — high-resolution spatial transcriptomics; ~5,000-gene panels at single-cell resolution (Xenium) or near-cellular resolution at unbiased transcriptome (Visium HD).
- **NanoString CosMx + GeoMx** — competing high-plex platforms; CosMx for single-cell-resolution spatial; GeoMx for region-of-interest profiling.
- **Vizgen MERSCOPE** — MERFISH-based spatial; very high gene plex.
- **Akoya CODEX / PhenoCycler** — spatial proteomics by iterative immunofluorescence.

### Headline 2026 paper: HEX

**HEX (virtual spatial proteomics from histopathology, AACR 2026, starred)** is the year's most-discussed spatial paper. Trained on paired H&E + spatial-proteomics data, HEX predicts spatial-proteomics maps directly from a standard H&E slide — turning the most-available imaging modality (every clinical lab has H&E) into a substrate for spatial-protein quantification. The deployment implication is large: spatial-protein assays are expensive and slow; if a model can approximate them from H&E, the assay becomes accessible at clinical scale.

### Other 2025-2026 spatial FMs

- **HEST-1k** (Mahmood lab) — paired histology + spatial-omics dataset that's become the field's standard evaluation corpus for spatial-pathology multimodal models.
- **Tools that bridge spatial and sc-FMs** — adapters that map sc-FM embeddings onto spatial coordinates; emerging in 2026 conference work (scverse 2026, ICLR 2026 sessions).
- **xVERSE spatial extension** — xVERSE includes spatial-aware modules that contribute to its 11-34% gain over sc-FM baselines.

## Multimodal biology FMs in 2026

The two main multimodal templates in 2026:

### Template A — contrastive multimodal (CLIP-style)

Train two encoders (e.g. histology + text, or omics + imaging) with a contrastive loss to land in a shared embedding space. Strong for **retrieval** (find slides with description X), **zero-shot classification** (use text labels as queries), and **cross-modal search**.

- **BioMedCLIP** — biomedical-image-text contrastive model; the reference multimodal biomedical model.
- **CONCH** (Mahmood lab) — pathology-image-text contrastive; the pathology-CLIP equivalent.
- **PMC-CLIP** and related variants — trained on the PubMed Central image-caption corpus.

### Template B — joint generative multimodal

Single backbone, multiple modalities, generative everywhere. Allows **multimodal generation** (describe a slide; generate a caption; design an experiment given a phenotype).

- **PathChat-2 (Mahmood lab, 2025)** — multimodal pathology conversational agent; built on a UNI-family backbone plus an LLM head.
- **LLaVA-Med** — biomedical-instruction-tuned multimodal LLM; the academic open-source reference.
- **MUSK (Mahmood lab)** — multimodal pathology backbone designed for downstream tasks beyond conversation.
- **ESM-3** — the protein-FM example of this template (sequence + structure + function); see [genomic + protein landscape](genomic-and-protein-fm-landscape.md).

### Aging clocks as a multimodal flagship

The starred **multimodal clocks of human aging** paper integrates EHR + omics + imaging + functional measures into one estimate of biological age. This is multimodal biology at the clinical-deployment frontier; see [clinical and agentic clinical](clinical-and-agentic-clinical.md).

## Why "multimodal" is a moving target

Three reasons multimodal biology benchmarks shift fast:

1. **New modalities keep arriving.** Single-cell ATAC, spatial proteomics, lipidomics, metabolomics, mass-spec imaging — every year adds a modality with a fresh question of how to integrate it.
2. **The right loss function isn't settled.** Contrastive (CLIP-style), joint-generative (ESM-3-style), late-fusion classifier heads, early-fusion shared embeddings — all have trade-offs that depend on the downstream task.
3. **Evaluation is hardest here.** A multimodal model that's slightly worse on each individual modality but better at *integration* tasks is genuinely useful, but proxy benchmarks rarely capture this. The 2026 evaluations are still maturing.

## Small-team angle

The interfaces between modalities are where small teams ship best, for a simple reason: **the big labs each own one modality**. Mahmood owns pathology; Stegle owns spatial omics; the sc-FM labs own single-cell; Meta / DeepMind own protein / genomic. The *bridges between modalities* are under-occupied. Realistic 2026 wedges:

- **A spatial→sc-FM adapter** that lets a sc-FM trained on dissociated single cells consume spatial-omics inputs.
- **A pathology→omics translator** in the HEX direction — predict an omics readout from H&E for a specific tissue or disease.
- **A clinical-multimodal head** that fuses a pathology FM embedding with structured EHR features for a single use case (treatment response, recurrence risk).
- **Better SpatialData / scverse infrastructure** — see Wedge 6 in [small labs](small-labs-what-to-build.md). Boring but compounding.

## What to watch in 2026-2027

Three directions worth tracking through the year:

- **Virtual spatial proteomics expansion** — HEX is the first; expect a wave of "predict modality Y from modality X" papers for clinically valuable Y where Y is expensive.
- **Multimodal aging and longevity** — the digital-twin framing has serious capital behind it; expect more multimodal-aging-clock variants and at least one productized clinical surface.
- **Joint-generative biology agents** — wrappers that compose a multimodal FM with tool-use (image, sequence, structure, clinical lookups) — the [agentic-meets-foundation](agentic-meets-foundation.md) story extended into multimodal substrates.

Multimodal is where the field's last decade of single-modality work finally pays off. Watch the interfaces — the bridges, not the islands.
