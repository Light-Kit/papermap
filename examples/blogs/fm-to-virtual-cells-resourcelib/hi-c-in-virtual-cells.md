---
title: 'Hi-C and the 3D genome in virtual cells — who''s tried, what''s missing'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- hi-c
- 3d-genome
- chromatin
- multimodal
summary: "A prior-art map of Hi-C in 2020-2026. Sequence→Hi-C is mature (Akita, Orca, C.Origami, AlphaGenome). scHi-C atlases and Hi-C-native FMs exist (Higashi, HiCFoundation, Hi-Cformer). Trimodal single-cell — scHiCAR Feb 2026 — gives RNA + ATAC + 3D contacts per cell. But the joint cell is still empty: no transcriptome-pretrained VC FM (scGPT, Geneformer, UCE, scFoundation, CellPLM, TranscriptFormer, rBio) ingests Hi-C as a side channel. Reads as a fifth unfilled wedge for the organelle-aware sibling."
starred: false
---

> *Sibling to [organelle-aware cell FMs](organelle-aware-cell-fms.md) — that essay flagged five unfilled wedges for cell-FMs that condition on spatial / compartment information; this one fleshes out a sixth: 3D-genome contact maps as a conditioning channel. Companion reading: [closed-loop virtual cells 101](closed-loop-virtual-cells-101.md) for the field arc, [small labs v3](small-labs-what-to-build-v3.md) for substrate-as-moat, [the translatability dual-latent essay](translatability-dual-latent-vc-fm.md) for how to evaluate a Hi-C-aware VC FM against cell-line → patient transfer.*

## The question

Today's virtual-cell FMs treat each cell as a bag of gene tokens. The 3D genome — TADs, loops, A/B compartments, CTCF/cohesin scaffolding — is the regulatory substrate those tokens emerge from. Two genes can be at the same expression level in two cells and yet be in totally different chromatin contexts: one bursting from an active super-enhancer hub, the other inside a Polycomb-repressed compartment that will silence it in an hour. The transcriptome-only FM cannot tell these apart. Does any virtual cell ingest the 3D genome?

After surveying the 2020–2026 literature: the *image* side of organelle-awareness has been shipped (SubCell). The *sequence-to-3D* side has been shipped (Akita, Orca, AlphaGenome). The *single-cell-Hi-C* embedding side has been shipped (Higashi, HiCFoundation). The joint cell — a transcriptome-pretrained VC FM that conditions on contact maps — is publicly empty.

## Sequence → Hi-C: the mature line

Predict bulk contact maps from DNA sequence (± cell-type tracks). Five named systems are the field.

- **Akita** ([Fudenberg, Kelley, Pollard, *Nat Methods* 2020](https://www.nature.com/articles/s41592-020-0958-x)) — CNN, ~1 Mb window, Hi-C/Micro-C targets. The original; everything since cites it.
- **Orca** ([Zhou, *Nat Genet* 2022](https://www.nature.com/articles/s41588-022-01065-4)) — hierarchical encoder/decoder, kb-to-chromosome scale, compartments + TADs + loops in one stack.
- **C.Origami** ([Tan, Xu, Yue, *Nat Biotechnol* 2023](https://www.nature.com/articles/s41587-022-01612-8)) — DNA + CTCF ChIP-seq + ATAC → 2 Mb Hi-C at 8,192 bp bins. First credible "in silico genetic screen on chromatin folding" framing.
- **Epiphany** ([Yang et al., *Genome Biol* 2023](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-023-02934-9)) — 1D epigenome → Hi-C, GAN.
- **HiCGen** (Wei et al., *Adv Sci* 2025) — hierarchical multi-scale; CTCF + ATAC inputs; Polycomb-aware loops.

The strongest 2025 entry is **AlphaGenome** ([Avsec et al., DeepMind bioRxiv 2025.06.25.661532](https://www.biorxiv.org/content/10.1101/2025.06.25.661532v1)). Unified transformer; emits Hi-C contact tracks alongside RNA-seq, ATAC, and histone marks as a first-class output head; reports Pearson R higher than Orca on 1 Mb intervals. This is the first time a generalist DNA FM has treated Hi-C as a peer modality rather than a stretch goal.

Gap shared by all five: they predict **bulk** contact maps from DNA. None ingests single-cell RNA or ATAC state and emits a single-cell contact map.

## scHi-C atlases + native FMs

The single-cell side has its own decade-long arc.

- **Nagano et al.** ([*Nature* 2013](https://www.nature.com/articles/nature12593)) — first scHi-C.
- **Stevens et al.** ([*Nature* 2017](https://www.nature.com/articles/nature21429)) — haploid mESC, G1-sorted, full 3D structure recovery.
- **Higashi** ([Zhang, Zhou, Ma, *Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-01034-y)) — hypergraph autoencoder, impute + embed scHi-C. The reference scHi-C embedding model.
- **Fast-Higashi** ([Zhang & Ma, *Cell Syst* 2023](https://www.cell.com/cell-systems/fulltext/S2405-4712(23)00006-7)) — tensor decomposition, 50–100× faster, used to initialize Higashi.
- **sn-m3C-seq** ([Lee et al., *Nat Methods* 2019](https://www.nature.com/articles/s41592-019-0547-z)) — joint methylation + 3D contacts per nucleus.
- **Mouse-brain m3C atlas** ([Liu et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06805-y)) — 301K methylomes + 176K joint m3C profiles, 4,673 cell groups, 33 billion contacts.
- **Human-brain m3C atlas** ([Tian et al., *Science* 2023](https://www.science.org/doi/10.1126/science.adf5357)) — 145K m3C nuclei across 17 brain regions.
- **4DN Phase 2** ([Dekker et al.](https://www.4dnucleome.org/)) — consortium portal, >1,800 experiment sets, 140K+ loops per cell type; phase ran 2020–2025.

Two Hi-C-native FMs are now public.

- **HiCFoundation** ([Wang & Noble, bioRxiv 2024.12.16.628821](https://www.biorxiv.org/content/10.1101/2024.12.16.628821v1)) — 118M contact submatrices, 81 human cell lines/tissues, encoder-decoder + patch-wise contrastive loss. The first Hi-C-native foundation model.
- **Hi-Cformer** ([bioRxiv 2025.08.04.668453](https://www.biorxiv.org/content/10.1101/2025.08.04.668453v2)) — transformer for *single-cell* Hi-C; chromosome-aware hierarchical attention; positions itself as scHi-C-specific.

Both are Hi-C-only. Neither bridges to transcriptome FMs.

## Joint trimodal at single-cell resolution

The most interesting frontier — and substrate-blocked, not method-blocked.

- **sci-Hi-C** ([Ramani et al., *Nat Methods* 2017](https://www.nature.com/articles/nmeth.4155)) — combinatorial-index scHi-C, no transcriptome.
- **HiRES** ([Liu et al., *Science* 2023](https://www.science.org/doi/10.1126/science.adg3797)) — single-cell Hi-C **+ RNA-seq** in one cell. The proof of concept.
- **GAGE-seq** ([Zhou et al., *Nat Genet* 2024](https://www.nature.com/articles/s41588-024-01855-y)) — concurrent 3D genome + transcriptome at the cell level, combinatorial indexing, tens of thousands of cells per run.
- **scHiCAR** ([Yu, Crawford et al., *Nat Biotechnol* Feb 2026](https://www.nature.com/articles/s41587-026-03013-7)) — confirmed **trimodal**: RNA + ATAC + 3D contacts per cell. 1.62M mouse-brain cells; 5 kb enhancer–promoter loops across 22 cell types. The current state of the art for the joint single-cell substrate.
- A **four-omics single-cell paper** appeared in Nature in early 2026 (s41586-026-10322-z) adding a fourth modality. The substrate race is on.

The hard fact: **no transcriptome-pretrained virtual-cell FM ingests Hi-C as a side channel.** I verified this directly across scGPT, Geneformer, UCE, scFoundation, CellPLM, TranscriptFormer, rBio, and GREmLN. The closest move is ChromFound ([arXiv 2505.12638](https://arxiv.org/abs/2505.12638)), a scATAC FM that *uses Hi-C-derived enhancer-promoter ranges as an architectural prior* — it does not ingest contact maps as input. The wedge is real.

## Why the joint cell matters

Three reasons the chromatin axis is not a luxury.

**Burst-frequency control is loop-mediated.** Mediator and BRD4 work ([*Sci Adv* 2024, adl4893](https://www.science.org/doi/10.1126/sciadv.adl4893)) shows that 3D contacts directly modulate transcription bursting. A virtual cell with no contact information has to re-learn this implicitly from co-expression, which is exactly the kind of high-dimensional inverse problem where data efficiency collapses.

**Perturbation-tracing exists.** [Liu et al, *Nature* 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12074983/) — pooled CRISPR + multi-scale chromatin imaging, 137 genes / 420 sgRNAs, 26 novel 3D regulators. The closest thing to "Perturb-seq + Hi-C" at scale, and proof that joint perturbation × chromatin data can be collected.

**Drug responses are chromatin-divergent.** HDAC and BRD4 inhibitor screens (Lung-cancer landscape, [bioRxiv 2024.05.23.592075](https://www.biorxiv.org/content/10.1101/2024.05.23.592075v1)) show cell-line-divergent chromatin responses that bulk Hi-C blurs. TADs, loops, A/B compartments are exactly the regulatory primitives the RNA-only FM has to *re-learn* from co-expression. Giving it the contact map directly is a substantial inductive-bias gift.

## The unfilled wedge

Three options, ranked by defensibility.

**(a) Adapter on a frozen sc-FM with Hi-C side-input** — easiest, most defensible right now. Take scGPT or UCE, freeze the backbone, learn a cross-attention adapter that ingests per-cell contact embeddings from Higashi or HiCFoundation; supervise on held-out Perturb-seq + chromatin-perturbation pairs (the Engreitz/Hansen datasets are the obvious targets). Compute: small-lab feasible — frozen-backbone adapter regime — same recipe scDCA used on drugs. The risk is data coverage outside brain tissue, since the joint scHi-C+RNA atlases are still mostly mouse and brain.

**(b) Joint pretraining on scHiCAR + GAGE-seq + m3C corpora.** True multi-modal substrate. Millions of joint cells now exist, but tokenization of single-cell contact maps is unsolved — Hi-Cformer is the only serious attempt, and it works on Hi-C alone. The blocker is *not* compute and *not* (anymore) data volume; it is the representation question of how a contact matrix becomes a sequence-of-tokens that lives next to gene tokens in the same attention stack.

**(c) Causal 3D-aware perturbation predictor.** Predict scRNA response to a perturbation conditional on the cell's contact map. Nobody has tried this end-to-end. The clean test of whether the chromatin axis carries causal information about perturbation outcome that the transcriptome alone misses.

Blockers, in order: (i) **tokenization of single-cell contact maps** is the genuine architectural gap; (ii) **joint data outside brain tissue** remains thin; (iii) **compute is not binding** at adapter scale, which is why (a) is the right first cut.

## Names + verdict

Three to follow. **Jian Ma** (CMU) for the Higashi → Fast-Higashi → GAGE-seq → scHi-C-FM trajectory; the lab most likely to take the next step. **Geoffrey Fudenberg + Katie Pollard** (Gladstone, UCSF) for the sequence→3D theoretical line; Akita's lineage is theirs. **Jesse Engreitz** (Stanford) and **Anders Sejr Hansen** (MIT) for the perturbation × 3D causal datasets a Hi-C-aware VC FM would actually need.

Honorable: **Bing Ren** (UCSD) for sn-m3C-seq brain atlases; **William Noble** (UW) for HiCFoundation; **Feng Yue** (Northwestern) for C.Origami.

Same v2/v3 pattern from the sibling essays. The architectural composition is published — adapter regime on frozen sc-FMs (scDCA), trimodal substrate (scHiCAR), Hi-C-native FMs (HiCFoundation, Hi-Cformer). The defensible novelty surface lives in the *unfilled junction*: a transcriptome-pretrained VC FM with a Hi-C side-input head, trained on the scHiCAR/GAGE-seq pairs that only just became available. The moat, as in the organelle-aware essay, is upstream of the model — joint paired data outside brain, plus a contact-map tokenization scheme nobody has agreed on yet. The transcriptome half of the virtual cell has the data; the chromatin half is the new wedge.
