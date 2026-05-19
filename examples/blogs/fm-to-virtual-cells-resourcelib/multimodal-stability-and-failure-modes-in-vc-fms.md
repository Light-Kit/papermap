---
title: 'Stability is a multimodal property — failure-mode decomposition across RNA, ATAC, Hi-C, proteomic, imaging, and spatial views'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- multimodal
- stability
- failure-modes
- interpretability
- hi-c
- atac
summary: "A prior-art map of multimodal cell-state stability — the claim that the transcriptome is a lagging indicator of failure and that the honest stability score lives across modalities. Six failure modes mapped to native readouts (DNA damage → Hi-C; metabolic collapse → imaging; lineage incompatibility → ATAC; proteostasis collapse → proteomic; niche decoupling → spatial; genetic incompatibility → DNA-seq) and three implementation paths ranked by data demand. The four-head decomposition from the stability sibling becomes a matrix indexed by modality. The blocker is not architecture — it is joint substrate scale. The fifth essay in the epistemic-honesty arc, closing a loop the quartet leaves open."
starred: false
---

> *Fifth essay in the arc. The four siblings — [surprise](surprise-and-uncertainty-in-cell-fms.md), [reachability](reachability-and-forbidden-states-in-cell-fms.md), [translatability](translatability-dual-latent-vc-fm.md), and [stability](cell-stability-and-niche-dependence-in-vc-fms.md) — all asked their question of a transcriptome FM. This one asks why that framing was incomplete. Cross-cuts to [the Hi-C sibling](hi-c-in-virtual-cells.md) on the 3D-genome substrate, [the organelle-aware sixth wedge](organelle-aware-cell-fms.md) on imaging and metabolic state, and [the closed-loop 101](closed-loop-virtual-cells-101.md) on what a downstream agent does with a per-modality failure verdict.*

## The question

A cell with γ-H2AX foci on every chromosome can have a transcriptome that looks normal until the damage response kicks in, and by then the cell has already chosen apoptosis or senescence. A cell on the verge of metabolic collapse can spend hours with a stable RNA profile while the mitochondrial network depolarizes underneath. A cell whose chromatin has closed the wrong lineage program will produce a few more transcripts of the program it has just been forbidden to maintain before the mRNA decays. The transcriptome is a lagging indicator. A stability score that lives in RNA-only space — including everything proposed in the [stability sibling shipped today](cell-stability-and-niche-dependence-in-vc-fms.md) — is therefore a regression on a downstream proxy of the actual failure. The honest move is to put the score where the failure lives, and the failure lives across modalities. This essay argues that multimodality is not a refinement of the stability question. It is the correct cutting point.

## Failure modes mapped to modalities

Six rejection criteria, each with a native readout that the transcriptome cannot reproduce.

**DNA damage and nuclear-architecture collapse — Hi-C.** Compartment scrambling, TAD dissolution, loop loss, γ-H2AX foci by imaging. scHi-C and the trimodal scHiCAR ([Nat Biotechnol Feb 2026](https://www.nature.com/articles/s41587-026-03116-1)) carry the contact-map substrate per cell. HiCFoundation ([Noble lab, bioRxiv Dec 2024](https://www.biorxiv.org/content/10.1101/2024.12.16.628824v1)) and Hi-Cformer ([bioRxiv Aug 2025](https://www.biorxiv.org/content/10.1101/2025.08.19.671213v1)) provide the FM-side reader. A predicted cell state whose Hi-C compartment is wrong for the lineage is forbidden even if the RNA looks plausible.

**Metabolic and organelle collapse — imaging and metabolomics.** Cell Painting ([Bray et al., *Nat Protoc* 2016](https://www.nature.com/articles/nprot.2016.105)) at JUMP-CP scale, organelle-FM substrates ([CellProfiler 4, Stirling 2021](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04344-9)). Mitochondrial mass, membrane potential, ER stress morphology, lysosomal load — these are imaging signals, not RNA. The organelle-aware sixth-wedge sibling names the prior; here it operates as a stability rejection channel.

**Lineage / chromatin incompatibility — scATAC.** Open-chromatin state is the lineage commitment substrate. SHARE-seq ([Ma et al., *Cell* 2020](https://www.cell.com/cell/fulltext/S0092-8674(20)31253-8)) and 10x Multiome give joint RNA + ATAC; SCENIC+ ([Bravo González-Blas, *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)) reads regulons. A predicted transcriptome that requires a chromatin state the cell has just closed is forbidden.

**Proteostasis collapse — proteomic.** Mass-spec single-cell proteomics (SCoPE-MS, plexDIA), antibody-based proteomics (CyTOF, CITE-seq), OpenCell ([Cho et al., *Science* 2022](https://www.science.org/doi/10.1126/science.abi6983)). Unfolded-protein-response activation, aggregation markers, proteasome stress — visible at the protein level long before the RNA-side stress response fires.

**Niche decoupling — spatial.** Visium, Stereo-seq, MERFISH, CODEX. A cell whose nearest neighbors are wrong cannot maintain a niche-dependent state. The λ head from the stability sibling becomes measurable at the population level only with spatial coordinates.

**Genetic incompatibility — DNA-seq.** A predicted transcriptome that violates the cell's germline or somatic variants — expressing a transcript the locus cannot produce — is forbidden by sequence. The simplest rejection criterion and the least often enforced.

Six rejection criteria, six native readouts, six FMs already trained on each substrate. The cell side has not stitched them.

## The single-cell FM picture — RNA-only

scGPT, Geneformer, scFoundation, UCE, CellPLM, TranscriptFormer, STATE — all transcriptome-pretrained. None ingests ATAC, Hi-C, proteomic, imaging, or spatial as a side channel during pretraining, and none publishes a multimodal stability head. The reckoning literature ([Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8); the Virtual Cell Challenge in *Cell* 2025) operates entirely on RNA. The 2026 assay-level benchmark — AssayBench ([De Brouwer et al., arXiv 2605.10876](https://arxiv.org/abs/2605.10876)) — extends to phenotype but does not push back to mechanism in other modalities. The Pedrocchi sparse-autoencoder probes on scGPT and scFoundation ([Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2), accepted ICLR 2026) crack the transcriptome embedding but do not yet operate across modalities.

The honest reading is that the transcriptome FM stack has been built by a community for which transcriptome data is what existed at scale. That is not a knock — it is a substrate observation. The reckoning gave us evidence that the framing has run out of headroom; multimodality is where the next ceiling lives. The current FMs are not wrong about RNA. They are wrong to claim RNA is enough.

## The adjacent multimodal FMs

The multimodal cell-FM landscape is sparse but exists. BABEL ([Wu et al., *PNAS* 2021](https://www.pnas.org/doi/10.1073/pnas.2023070118)) cross-modally translates RNA ↔ ATAC. SAINT (multimodal single-cell foundation, 2023) and scMoFormer pretrain on paired data. CITE-seq + RNA models exist for protein-aware cell typing. Multiome-trained models like scBasset ([Yuan & Kelley, *Nat Methods* 2022](https://www.nature.com/articles/s41592-022-01562-8)) read ATAC sequence directly. On the imaging side, JUMP-CP ([Chandrasekaran et al., 2024](https://www.nature.com/articles/s41592-024-02241-6)) provides the substrate for Cell-Painting × transcriptome alignment, with Recursion's MolPhenix and the Lacoste 2024 image-RNA fusion FMs operating in that space. scHiCAR Feb 2026 ([Liu et al., *Nat Biotechnol*](https://www.nature.com/articles/s41587-026-03116-1)) gives the first per-cell trimodal RNA + ATAC + 3D substrate at workable scale.

None of these is positioned as a stability framework. They are translators, joint embedders, or specialized predictors. The wedge is to read them as failure-mode channels rather than as cross-modal completion tasks.

## The algorithm — multimodal four-head decomposition

The [stability sibling](cell-stability-and-niche-dependence-in-vc-fms.md) gave a per-cell vector [U, λ, τ, π]. The multimodal upgrade promotes that vector to a *matrix* indexed by modality m ∈ {RNA, ATAC, Hi-C, proteomic, imaging, spatial, DNA}. Per-modality basin depth U_m, niche dependence λ_m, lifespan signal τ_m, frequency π_m. Joint stability S(c) is an aggregator across the matrix — weakest-link min, learned product, or downstream-task-supervised composition.

The interpretability output becomes a per-modality verdict. "S = 0.2 because S_RNA = 0.7 supports the state, but S_HiC = 0.1 reflects compartment loss in chr8 for the lineage program the RNA call depends on, and S_imaging = 0.3 flags mitochondrial mass below the lineage-specific threshold." Three named failure channels, each with a measurement, in one sentence.

Three implementation paths, ranked by data demand.

**(C) Cross-modal adapters on a frozen transcriptome FM.** Smallest data ask. Lightweight adapters predict ATAC / Hi-C / proteomic state from the RNA embedding ([BABEL-style cross-modal translation](https://www.pnas.org/doi/10.1073/pnas.2023070118)), and penalize when the predicted alt-modality state violates modality-specific priors. No new joint-cell data needed beyond the existing multiome and scHiCAR references. Multimodal stability without multimodal pretraining. Months of engineering, weeks of pilot.

**(A) Frozen-FM gated fusion.** Frozen scGPT + frozen ATAC FM + frozen Hi-Cformer + frozen imaging FM, gated fusion at the embedding level, per-modality stability heads + a joint head. Trained on scHiCAR + 10x Multiome + JUMP-CP joint-cells where available. Quarter-scale. The honest blocker is data: scHiCAR is ~10k cells; the cell side does not yet have an HCA-scale joint substrate.

**(B) Pretrain a multimodal FM from scratch.** Right architecture, wrong decade. Bottlenecked on substrate.

## Verdict + open wedges

Three concrete experiments. (a) Run an existing scGPT-predicted Perturb-seq response through a BABEL-style RNA→ATAC translator; flag predictions whose implied ATAC state is incompatible with the predicted lineage. The fraction of flags is a calibrated rate of RNA-only hallucination. (b) Score scHiCAR cells against an HCA-scale RNA stability head and a scHiCAR-scale Hi-C stability head separately; quantify disagreement as the value-add of the Hi-C view. (c) For tumor cells where BH3 priming has been measured wet-lab ([Letai lab](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)), check whether multimodal τ recovers priming rank order that RNA-only τ cannot.

Names to follow. **Charlotte Bunne** (EPFL/Stanford) for OT-on-cells extended to multimodal couplings. **Jian Ma** (CMU) for Hi-C + RNA joint substrate. **Anshul Kundaje** (Stanford) for chromatin-grounded FMs. **Anne Carpenter** (Broad) for the Cell Painting substrate and JUMP-CP. **Aviv Regev** for the atlas-scale density needed under π_m. The same v2/v3 pattern: the components are published, the moat is the joint substrate, and the field is at the edge of having to build that substrate before the next architecture move pays off.

A virtual cell that cannot tell you which modality says it should not exist is not a virtual cell. It is one slice of one cell, and slices do not refute each other.
