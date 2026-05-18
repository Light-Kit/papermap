---
title: 'Genomic + protein FMs: the families with the cleanest downstream signal'
date: '2026-05-18'
topics:
- foundation-model
- genomic
- protein
summary: A combined landscape of the two FM families where downstream evaluation actually correlates with deployment value — Enformer → AlphaGenome 25/26 sweep on the genomic side, ESM-2/3 + AlphaFold 1/2/3 + RFdiffusion / Chroma on the protein side — plus what they share, where they diverge, and what to read first.
starred: true
---

> *Companion landscape blog to the [foundation models state-of-play](foundation-models-state-of-play.md). Sibling landscape: [pathology FMs](pathology-fm-landscape.md). For build mechanics see [how to build a biological FM](how-to-build-a-biological-fm.md); for the long-context architecture story see [stage 3 — architecture](stage-3-architecture.md).*

Genomic FMs and protein FMs get bundled together here because they share something neither single-cell nor pathology has: **a downstream signal that's clean enough to actually trust**. A protein FM's binder-design success rate is wet-lab-measurable. A genomic FM's variant-effect prediction can be checked against eQTL data and Mendelian-disease cohorts. By contrast, single-cell FMs spent four years arguing about whether proxy benchmarks meant anything. This essay maps the two lineages, what they share, and what makes them succeed where other families struggle.

## Why bundle them together

Three shared properties:

1. **Public substrate.** UniProt (~250M sequences) and the human genome + 1000 Genomes are open. No DUA, no institutional moat — anyone can train.
2. **Cheap, abundant labels.** Structural ground truth from PDB; eQTL/GWAS for variants; CASP/CAMEO for protein structure; experimentally-validated binders for design.
3. **Clear deployment artifact.** A designed protein. A predicted structure. A variant score. These ship to wet labs and clinics without weeks of biological interpretation.

The pathology family ships into clinical product first ([landscape](pathology-fm-landscape.md)); the genomic + protein family produces the cleanest *science*.

## Genomic FM lineage

The genomic family converged in stages from 2021 to 2026.

**Generation 1 — Enformer (DeepMind, 2021).** Transformer with very-long-context attention; predicts ~5,300 epigenomic tracks from ~200kb sequence input. Set the field's standard architecture and remained the regulatory-prediction reference for years.

**Generation 2 — Nucleotide Transformer family (InstaDeep / NVIDIA, 2023-2024).** BERT-style transformers at 50M-2.5B parameters trained on 1000 Genomes + Multispecies. Demonstrated that scaling laws transfer to DNA; established the GUE / GUE+ benchmark suite that the field now uses.

**Generation 3 — DNABERT-2 (Northwestern, 2023).** k-mer-tokenized BERT-style genomic FM; the standard k-mer-route comparison point.

**Generation 4 — HyenaDNA (Stanford, 2024).** State-space-model architecture that pushes context to 1M bases on a single GPU. Proved that attention is not the only way to do genomic FMs.

**Generation 5 — Evo / Evo 2 (Arc Institute, 2024-2026).** ~9.3T-token pan-genomic pretraining; autoregressive generation over genome-scale contexts. The first genomic FM that can *generate* coherent regulatory and protein-coding sequences at scale.

**Generation 6 — AlphaGenome (DeepMind, 2025-2026).** Combined attention + state-space architecture; integrated regulatory-track conditioning. **Won 25 of 26 variant-effect prediction tracks** on the 2026 evaluation, decisively re-establishing DeepMind's leadership in the family. The current 2026 SOTA.

## Protein FM lineage

The protein family has two parallel lineages — representation/folding and generative design — that started separate and are now converging.

### Folding + representation lineage

- **AlphaFold (DeepMind, 2018-2020)** — solved single-domain protein structure prediction; CASP14 win was the moment the field changed.
- **AlphaFold 2 (DeepMind, 2021)** — production-quality folding; built the proteome-wide AlphaFold DB.
- **AlphaFold 3 (DeepMind, 2024)** — generalized to **complexes** (protein-protein, protein-ligand, protein-nucleic-acid). Reset the structure-prediction baseline; everything else now benchmarks against AF3.
- **ESM-1 / ESM-2 (Meta FAIR, 2019-2022)** — masked-language-model transformers over UniProt sequences. ESM-2 at 15B parameters demonstrated that structure can emerge from sequence-only pretraining without MSA.

### Generative design lineage

- **RFdiffusion (Baker lab, 2023)** — diffusion-based protein backbone design. The first model that could reliably design novel binders that worked in the wet lab.
- **Chroma (Generate Biomedicines, 2023)** — generative protein design with conditioning on user-specified constraints.
- **BindCraft and related 2024-2026 tools** — refinements that improved wet-lab hit rates and reduced design iteration cycles.
- **ESM-3 (EvolutionaryScale, 2024)** — the **convergence event**. ESM-3 jointly models sequence, structure tokens, and function annotations in one generative transformer, enabling design tasks (give me a protein with property X) inside the same framework that does representation. The architectural template for 2025-2026 protein FMs.

## What the two families share

Three converging design choices visible in 2026:

1. **Sub-quadratic sequence mixers.** Both AlphaGenome and Evo2 use hybrid attention/state-space architectures; protein FMs increasingly use linear-attention variants. The Transformer's O(N²) bottleneck stops being a hard constraint.
2. **Generative joint-modality objectives.** ESM-3's joint sequence/structure/function objective is mirrored by Evo2's autoregressive joint coding/regulatory generation. The 2026 template: **one backbone, multiple modalities, generative everywhere**.
3. **Wet-lab validation as the only metric that matters.** No genomic-FM or protein-FM paper in 2026 can ship without either a wet-lab validation (protein design) or a clinical-cohort validation (variant prediction). Proxy benchmarks alone aren't credible anymore.

## Where they diverge

- **Tokenization** ([stage 2](stage-2-tokenization.md)). Proteins have a fixed 20-letter alphabet; genomics is still fighting between k-mer, single-nucleotide, BPE, and regulatory-track-augmented variants.
- **Generative coherence.** Protein FMs generate single proteins; genomic FMs are starting to generate entire functional genomic elements, which is a much harder coherence problem.
- **Commercial structure.** Protein-FM commercial activity is centered on biotech (Generate, EvolutionaryScale, Profluent, Iambic); genomic-FM commercial activity is split between DeepMind (research-first), Arc Institute (academic), and emerging variant-effect prediction startups (TWIST-adjacent).

## Reading order

If you have a weekend to internalize this corner of the field:

1. **AlphaFold 3** (Nature 2024) — read this first; it's the single most-shifted-the-field protein paper of the modern era.
2. **ESM-3** (EvolutionaryScale, 2024) — the joint-modality template.
3. **AlphaGenome** (DeepMind, 2025) — the 25/26 variant-effect sweep + architecture lessons.
4. **Evo 2** (Arc Institute, 2026) — what genome-scale autoregressive generation looks like.
5. **RFdiffusion** (Baker lab, 2023) — the diffusion-based design paper; still the most-cited generative-design recipe.

## Small-team angle

The protein and genomic FM landscape is unusually friendly to small teams for two reasons: (a) **the substrate is public**, so corpus assembly is not a moat, and (b) **wet-lab validation creates a clear win condition** — a designed binder that works is undeniable. The most realistic 2026 wedges:

- A **specialized design head** layered on top of ESM-3 or AlphaFold 3 for one target class (kinases, GPCRs, ion channels).
- A **variant-effect specialization** layered on AlphaGenome embeddings for one disease cohort (Alzheimer's, T2D, IBD).
- A **regulatory-element design tool** built on top of Evo 2 for synthetic biology applications.

These are the families where the BERT-clone path-dependence that hobbled single-cell didn't take hold — both moved through diffusion, state-space, and joint-modality transformers without the same lost years. Watch them as a model for how the rest of biological FMs should evolve.
