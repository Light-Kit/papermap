---
title: 'Organelle-aware cell foundation models — who is already building this, and what is left'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- organelle
- spatial-proteomics
- multimodal
summary: "A prior-art map of organelle-aware cell FMs in 2024-2026. The image side has been shipped (SubCell, on HPA, with a 35-class subcellular loss). The scRNA side has exactly one precedent (scGenePT) and it is text-only. The joint cell — paired Cell-Painting + Perturb-seq at FM scale — is publicly empty. Bunne flagged the gap eighteen months ago; the transcriptome half is still open."
starred: false
---

> *Sibling to [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md), the [101 tour of closed-loop virtual cells](closed-loop-virtual-cells-101.md), and the [adjacent project shapes essay](adjacent-project-shapes-and-n-of-1.md). v2 said architectural novelty in closed-loop VC is gone; the adjacent-shapes essay said the multicellularity and cross-cancer-anti-PD1 shapes are also crowded or data-blocked; this essay asks the same honest question of one more adjacent shape — **organelle-aware cell FMs**. Companion reading: [spatial omics + multimodal](spatial-omics-and-multimodal.md) for the closest neighbour topic; [small labs v3](small-labs-what-to-build-v3.md) for the substrate-as-moat wedge taxonomy; [causal models, FMs and VCs](causal-models-fm-and-vc.md) for the rung-2 framing.*

## The question

Today's cell FMs — scGPT, Geneformer, scFoundation, UCE, TranscriptFormer, STATE — treat each cell as a bag of gene tokens. None of them know that PINK1 lives in mitochondria, that CALR lives in the ER, that the same gene-expression delta can mean two different things depending on where the protein ends up. **Organelle-aware** means a cell FM that conditions on or jointly trains against organelle-compartment information — protein localization labels (Human Protein Atlas), endogenous-tag imaging (OpenCell), or per-organelle morphology channels (Cell Painting). Does such a thing already exist? Who is building it? What is left?

After two rounds of search across the 2024-2026 literature, the honest map looks like this: the *image* side has been shipped; the *scRNA* side is almost untouched; the *joint* cell is publicly empty.

## The image side — SubCell already exists

The single strongest existing player is **SubCell** (Lundberg lab, KTH/Stanford/CZI, [bioRxiv 2024.12.06.627299](https://www.biorxiv.org/content/10.1101/2024.12.06.627299v2)). SubCell is a proteome-aware ViT trained on the full Human Protein Atlas Subcellular collection: **1.13M single cells × 13,141 proteins × 37 cell lines**, with a multitask loss that includes protein identification plus a **35-class subcellular localization head**. The model is public on the CZI Virtual Cells Platform. Its embeddings transfer to mode-of-action prediction, cell-cycle phase, drug response, and cross-species localization. It is, by any honest reading, the published "organelle-aware FM" on the image side.

The constellation around SubCell is dense. **MorphGen** ([arXiv 2510.01298](https://arxiv.org/abs/2510.01298), ICML-W 2025) is a diffusion generator that models all six Cell-Painting channels jointly and explicitly bills itself "organelle-aware" in the title — generative rather than encoder-style. **EMCellFound** ([bioRxiv 2025.12.09.693109](https://www.biorxiv.org/content/10.64898/2025.12.09.693109)) is the electron-microscopy counterpart: a 4M-image MAE with 8-class organelle classification at ~96%. **scDINO / Cell-DINO** (Doron et al., PLOS CB 2025) gives a strong DINOv2 baseline on HPA. **OpenPhenom-S/16** ([Recursion, Nov 2024](https://huggingface.co/recursionpharma/OpenPhenom)) is the public Cell-Painting MAE on RxRx3 + JUMP-CP — explicitly *not* organelle-aware (bag-of-channels). **CytoSelf** (CZ Biohub, Nat Methods 2022) is the only pre-FM-era model that was organelle-aware by construction (OpenCell 1,310 tags) but was never scaled.

**Verdict on the image side:** done. Anyone announcing "I will build an organelle-aware vision FM on HPA" will land on SubCell in their first hour. The defensible novelty surface here is narrow — and Lundberg is also where the next image-side step is most likely to come from.

## The scRNA side — one precedent, and it is text-only

Almost nobody. Of the canonical cell FMs (scGPT, Geneformer, scFoundation, UCE, TranscriptFormer, STATE, CellPLM, Nicheformer, scGPT-spatial), **none** ingest HPA, OpenCell, or GO-Cellular-Component labels as a conditioning channel or auxiliary head. The single real precedent is **scGenePT** (Istrate et al., [bioRxiv 2024.10.23.619972](https://www.biorxiv.org/content/10.1101/2024.10.23.619972), Oct 2024), which augments scGPT with NCBI / UniProt / GO text annotations. GO-CC is one of the auxiliary text channels, and the paper's headline finding is that GO-CC annotations help most for *single-gene perturbation prediction*.

The critical caveat: scGenePT's "organelle-aware" signal is at the granularity of GO-CC strings fused via a language encoder — not the HPA 35-class image-derived hierarchy, not OpenCell's proximity-MS-derived organelle assignments, and not Cell Painting's morphology channels. The model never sees an image of an organelle. It sees text *about* one.

A separate spectral-geometry probing paper finds that scGPT has *emergently* learned a subcellular axis in its intermediate layers without ever being supervised against one — secreted vs cytosolic vs ER/mito separations appear in the spectral geometry. The signal is latent in the substrate; it has just never been used as a training target.

**The empty cell on the scRNA side:** no published cell FM uses HPA-image-derived localization vectors, OpenCell endogenous-tag clusters, or Cell-Painting per-organelle features as a conditioning channel into a sequence-based scRNA FM. The closest thing is scGenePT, and the gap between "GO-CC text" and "HPA image embedding" is substantial.

## The joint side — the empty cell

The most interesting wedge — *and the most substrate-blocked*. **No public FM jointly pretrains organelle-channel-resolved morphology with single-cell expression**. The closest neighbours all miss in different ways:

- **PAST** ([arXiv 2507.06418](https://arxiv.org/abs/2507.06418), Jul 2025) — joint H&E + scRNA at single-cell resolution, 20M paired tiles. Wrong modality (H&E, not Cell Painting); no organelle channels.
- **STORM** (Recursion, 2025-26) — joint H&E + spatial transcriptomics, 1.2M spots, tissue level not cell level.
- **CellCLIP** (NeurIPS 2025) — Cell Painting + perturbation-text, channel-wise alignment; second modality is text.
- **Perturb-Multimodal** (Feldman lab, Cell 2025) — paired imaging + sequencing via pooled CRISPR in tissue; one experiment, not framed as a foundation model.

The hard fact: **paired Cell-Painting + Perturb-seq at FM scale does not exist publicly.** JUMP-CP (Chandrasekaran et al., Nat Methods 2024) is image-only — 116K compounds × 1.5B U2OS cells, no scRNA. [Tahoe-Arc-Biohub](https://arcinstitute.org/news/tahoe-arc-biohub) (Jan 2026, 120M cells, 225K perturbations) is Perturb-seq only — no Cell Painting. Recursion has both substrates internally (~50 PB) and has *not* released a joint paired-modality FM, which is itself informative: even with the data, the architecture and training-objective design appear non-trivial.

This is exactly the Bunne et al. tell. *How to Build a Virtual Cell with AI* (Cell, Dec 2024) explicitly flagged this gap: "...it is crucial to also model cellular organelles and membraneless compartments... fluorescence microscopy of the human proteome is the natural substrate, while current FMs initially rely on transcriptomics measurements, whereas imaging modalities will be key for continued modeling of cellular spatial organization." SubCell answered the image half. The transcriptome half is still open eighteen months later.

## Five concrete unfilled wedges

1. **HPA-conditioned cell FM.** Concatenate per-gene HPA-Subcellular image embeddings into the gene-token embedding of scGPT/UCE/Geneformer. Auxiliary loss: predict the 35-class HPA label from the cell-context embedding. Cheapest clean wedge — nobody has done it because SubCell stops at image embeddings and scGenePT only used GO-CC text.
2. **OpenCell-conditioned cell FM.** Use Leonetti's 1,310 endogenously tagged proteins plus the proximity-MS organelle-profiling atlas (Cell 2025) as supervised side-channels. Smaller than HPA but graph-rich because the interactome ties proteins to organelles by co-localization.
3. **Organelle-token transformer.** One token per organelle per cell, cross-attending with gene tokens. Lets the model express "mitochondrial mass increased; ribosomal protein expression dropped" as a single internal event. No published model does this.
4. **mtDNA-aware cell FM.** The 37 mtDNA-encoded genes are usually filtered or used only for QC. Treat them as a separate compartment-token stream alongside the ~1,500 nuclear-encoded mito-localized proteins; opportunity to predict heteroplasmy and nuclear-mitochondrial coupling. mitoSplitter / MitoSort exist as analysis tools, not FMs.
5. **AlphaGenome ↔ scGPT bridge.** [AlphaGenome](https://www.biorxiv.org/content/10.1101/2025.06.25.661532) (DeepMind, Jun 2025) predicts thousands of nuclear tracks per gene. Use those tracks as gene-embedding priors in a transcriptome FM — turning the nucleus FM into a structural prior for the cell FM. Conceptually clean, untested.

## Verdict + names to watch

Same v2/v3 pattern. The architectural composition is published where it has been done (SubCell on the image side, scGenePT lightly on the scRNA side). The defensible novelty surface lives in the *unfilled scRNA conditioning axis* and the *joint pretraining axis*, both of which are substrate-blocked rather than method-blocked. The moat is upstream of the model: HPA-image-vector pipelines, OpenCell proximity-MS labels, and — most importantly — paired Cell-Painting + Perturb-seq at FM scale, which only Recursion currently has internally and which CZI/NVIDIA appear to be funding.

Three names to follow: **Emma Lundberg** (HPA, SubCell; the next image-side step), **Manuel Leonetti** (OpenCell + Organelle Profiling; the proximity-MS ground truth), **Theofanis Karaletsos** (CZI's compositional virtual-cell stack; SubCell co-author). Bonus: Recursion's phenomics team for the next OpenPhenom drop, Janelia's CellMap for an EM-side FM.

Honest no-go: if "frozen scGPT + HPA-image-vector side-channel" doesn't beat vanilla scGPT on an organelle-tropic drug class (BH3 mimetics, ER stressors, mTOR inhibitors), the project evaporates. And the wedge has to be paired-data-driven sooner or later — a dry retrofit on public HPA labels is testable in six months, but the durable version needs the joint substrate. The same v2 verdict, one level deeper into the cell.
