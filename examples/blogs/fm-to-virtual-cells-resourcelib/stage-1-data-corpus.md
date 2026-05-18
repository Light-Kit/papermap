---
title: 'Stage 1 — Data corpus: where biological FMs actually come from'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
summary: How the training corpus is assembled across single-cell, pathology, protein, and genomic FMs — harmonization is the unglamorous majority of the work, and curated-and-small often beats raw-and-huge.
starred: true
---

> *Expansion of stage 1 from [how a biological FM is built](how-to-build-a-biological-fm.md). Sibling stages: [tokenization](stage-2-tokenization.md) · [architecture](stage-3-architecture.md) · [pretraining objective](stage-4-pretraining-objective.md) · [adaptation](stage-5-adaptation.md) · [evaluation](stage-6-evaluation.md).*

The training corpus is the single most expensive, most undervalued, and most under-described stage of building a biological foundation model. Method sections give it one paragraph; the engineering reality is months of harmonization work that determines everything downstream — what the model can represent, what artifacts it inherits, and which downstream tasks it will silently fail on. This essay walks through what "data corpus" actually means across the four FM families, and why **curation often beats scale** in 2026.

## The single-cell case: CELLxGENE Census as a substrate

scGPT's 33M-cell corpus, Geneformer's 30M-cell corpus, scFoundation's ~50M, and UCE's ~100M all draw from the same wellspring: the **CZI CELLxGENE Census**, the field's de facto single-source-of-truth for harmonized scRNA-seq. CZI's contribution wasn't the cells themselves — those came from thousands of individual studies — but the **harmonization layer**: per-dataset normalization, gene-symbol unification across platforms (Ensembl vs. HGNC vs. organism-specific aliases), ontology mapping (Cell Ontology, Uberon, MONDO), and quality flags. Before CELLxGENE, every sc-FM author had to redo this work. After CELLxGENE, the corpus assembly stage went from a six-month project to a six-week project.

What's still wrong with the substrate: **donor representation is brutally skewed** toward healthy adult human, with peripheral blood and lung over-represented; pediatric and rare-disease cells are sparse. Whatever batch effects survive harmonization become a permanent property of the pretrained model — the [linear-baselines reckoning](why-linear-baselines-win.md) traced one common failure mode to exactly this: sc-FM "representation gains" are sometimes batch-correction artifacts that don't generalize off the Census distribution.

## Quality > quantity: the Geneformer V2 cancer result

The most-cited 2026 result on corpus design isn't a bigger corpus — it's a **smaller, more curated one**. The team that maintains Geneformer V2 released two checkpoints from the same training recipe: the general 316M-parameter model trained on the full ~95M-cell corpus, and a 104M-parameter cancer-specific model (`Geneformer V2-104M_CLcancer`) trained on a curated ~14M-cell cancer subset. The cancer model **matches or beats the general model on most cancer downstream tasks** despite being 3× smaller and trained on 7× less data. The takeaway, validated independently by xVERSE, scFoundation read-depth experiments, and the sc-FM Perturbation Adapter team: **for any defined downstream domain, a tightly curated in-domain corpus outperforms a 10× larger pan-domain corpus**. This is the empirical foundation for [Wedge 3 in the small-labs essay](small-labs-what-to-build.md) — domain-specific continual pretraining.

## Pathology: institutional access as the rate limit

Pathology FMs train on whole-slide images (WSIs) tiled into patches, typically 256×256 pixels at 20× magnification. The numbers: UNI (Mahmood lab, MGH) trained on **>100M tiles from >100k WSIs**; Virchow2 (Paige) on **3.1M WSIs**; Owkin's H-Optimus and the Hibou family on multi-institutional cohorts ranging from **~500k to ~1M WSIs**. The expensive constraint is not compute — it's **data access**. Each institution-pair partnership requires a DUA (data use agreement), an IRB review, and often a custom de-identification pipeline. Owkin's competitive advantage is largely its **800-hospital network**, which no postdoc-budget lab can replicate. The corpus assembly is years of legal + engineering work before any GPU spins up.

## Protein: UniProt as the universal substrate

Protein FMs sit on the easiest data substrate of any family: **UniProt**, ~250M sequences, public, no DUA, deduplicated and clustered at multiple identity thresholds by the EBI. ESM-2 trained on **UniRef50** (~65M sequences clustered at 50% identity); ESM-3 added **AlphaFold-predicted structures + GO function annotations** as parallel modalities, expanding the corpus to ~3.15B tokens of joint sequence/structure/function data. Because the substrate is public and pre-clustered, protein-FM teams compete on **modality enrichment** (structure, function, MSA, taxonomy) rather than on corpus assembly itself. This is why ESM-3's main innovation is generative *joint* modeling — the data was the easy part.

## Genomic: long contexts, sparse labels

Genomic FMs face the opposite problem: the **substrate is small** (the human genome is one diploid sequence; 1000 Genomes adds another ~2,500), but each example is **enormous** (a single chromosome is hundreds of millions of bases). Enformer (2021) trained on **1000 Genomes + ENCODE regulatory tracks**; HyenaDNA pushed context to ~1M bases; Evo2 (2026) trains on **~9.3T tokens** of pan-genomic data spanning bacterial, viral, archaeal, and eukaryotic genomes. AlphaGenome's 2026 win on 25/26 variant-effect tracks rested largely on a **carefully assembled cross-species evaluation corpus** plus tight integration with regulatory annotation tracks. The lesson for genomic corpora: token count matters less than **regulatory-track diversity**.

## What gets dropped in harmonization (and silently bites later)

Every harmonization step is a lossy compression. Per-dataset normalization removes batch effects but also removes legitimate biological variation between studies. Gene-symbol unification collapses paralogs and resolves outdated names but loses ambiguity flags. Doublet filtering removes mostly-real doublets but also removes legitimate megakaryocytes and hepatocytes (which look like doublets to scrublet). Cell-type ontology mapping forces every fibroblast to one of ~20 ontology IDs, collapsing tissue-specific subtypes. **These choices become invisible properties of every model trained on the resulting corpus** — you cannot recover the dropped information at adaptation time. This is why we recommend, in [reading an FM paper critically](reading-an-fm-paper-critically.md), spending more time on Section 2.1 of an FM paper than on Section 4.

## What a small team can build at this stage

Three viable wedges at the corpus layer:

1. **A privileged in-domain corpus.** One rare disease, one tissue, one institution's spatial-omics archive — train a continual-pretraining checkpoint per [Wedge 3](small-labs-what-to-build.md).
2. **A better harmonization layer for one modality.** SpatialData (Stegle group) is the canonical example: it became the field's standard cross-language container for spatial omics by being the best harmonization layer, not by training a model on top.
3. **A negative-result audit.** Quantify how much of any FM's "performance gain" is corpus-distribution leakage. The reckoning literature is built on exactly this style of audit.

The corpus is where models are actually born; it deserves more of your attention than it usually gets.
