---
title: 'Small labs in the FM / VC era — the ML + infrastructure path (v2, superseded)'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
- people
summary: A v2 narrowing of the six-wedge small-labs taxonomy down to the three wedges that fit an ML-leaning lab with software-engineering chops but no industry-scale data deals — inductive-bias modules, frozen-backbone adapters, interop infrastructure — example-first.
starred: false
---

> *⚠ **Superseded by [v3](small-labs-what-to-build-v3.md).** After three follow-up audits (the [v2 agent-loop verdict](agent-loop-for-drug-response-v2.md), the [101 tour](closed-loop-virtual-cells-101.md), and the [adjacent-project-shapes + n=1 essay](adjacent-project-shapes-and-n-of-1.md)), the wedge taxonomy needed a substrate-as-moat reframe, a retired wedge (agent wrappers, now commodified by CellForge / VCHarness / BioLab / "Closing the loop"), and a new wedge (patient-anchored projection via scArches). v3 keeps this v2 three-wedge narrowing as one valid traversal of the wider taxonomy. Read v3 first; this v2 stays here for the record.*
>
> *This is v2 of [What can a small lab actually build in the VC / FM era?](small-labs-what-to-build.md). v1 maps all six wedge shapes (architecture, adapters, continual pretraining, permissive-licence alternatives, agentic wrappers, interop) and the three moats you can't cross. This v2 keeps only the three wedges that fit an **ML + software-engineering profile** — no privileged hospital corpus, no $10M continual-pretraining budget, no FDA submission machinery, no LLM-agent orchestration shop. The v1 framing is intact; this page just leans into the worked examples for wedges 1, 2, and 6. If v1 felt too rationale-heavy, treat this as the catalog version.*

## Why these three wedges fit together

The three wedges I keep here all assume the same starting position: you can write PyTorch, you can ship a library, and you have one piece of biological intuition you're willing to be deeply opinionated about. They explicitly *don't* assume you can negotiate a multi-hospital data deal (rules out Wedge 4 in the strong form), maintain a 1B-token continual-pretraining loop (rules out Wedge 3 at scale), or run an FDA-track product line (rules out the clinical-deployment wedge that lives in the [clinical / agentic blog](clinical-and-agentic-clinical.md)).

What you can do — and what the 2025-2026 record shows actually shipped from 1-5-person teams — is invent a biology-shaped inductive bias, layer a tiny adapter on someone else's frozen checkpoint, or build the glue that everyone else's tools depend on.

## Wedge 1 — Inductive-bias modules

**The shape:** a new architectural component or full backbone that is *specifically right for biology* — not a transformer that happened to be repurposed. The competition isn't the big-FM labs' scale; it's their BERT path-dependence.

### Exemplars

- **[xVERSE (Jiang & Xie, bioRxiv 2026.04)](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/)** — transcriptomics-native non-LM architecture. Gene-gene co-variation attention rather than gene-gene sequence attention, batch-aware normalization fused into the model rather than upstream of it, sparsity-aware compute. **Result:** 11-34% gains over scGPT / Geneformer / scFoundation / UCE on representation, batch correction, spatial imputation. The cleanest 2026 datapoint that *architectural choice is empirically load-bearing*. See also the [architecture stage blog](stage-3-architecture.md) for the breakdown.
- **[TxPert (Wenkel et al., Nat Biotech 2026)](https://doi.org/10.1038/s41587-026-03113-4)** — injects a multi-knowledge-graph prior directly into the transformer for transcriptomic perturbation prediction. Notable for *who* wrote it: Wenkel co-authored the 2025 `latent-additive` reckoning critique. The critic's own next move was not "abandon FMs" but "give the FM the knowledge-graph prior the vanilla transformer lacks." This is exactly the Wedge-1 move — the bias has a name and a paper.
- **scFoundation's read-depth-aware attention** — the closest existing big-corpus sc-FM to architecture/biology co-design. Most of *that* design space is unexplored, and that's precisely where a small team's biology fluency cashes out as a defensible paper.
- **ESM-3's SE(3)-invariant structure tokens** ([ESM-3, Science 2025](https://www.science.org/doi/10.1126/science.ads0018)) — bakes rotational/translational symmetry into the architecture because biology has those symmetries. The pattern (*pick one symmetry the data has and the vanilla transformer ignores; encode it*) generalizes far beyond protein.
- **AlphaGenome's track-prediction objective** (Nature 2026; 25/26 variant-effect wins) — a genomic FM whose architectural decision is to predict *experimental tracks* rather than nucleotides. The objective is the inductive bias. This works for genomic data because the supervisory signal (ENCODE/GTEx tracks) is rich; the structural lesson — "let the supervision shape the architecture" — ports.
- **State-space and long-context backbones (Hyena / Mamba / Evo2)** — for genomic substrates whose context length blows up the transformer, switching to state-space is itself the inductive-bias move. Most small-team wins here have come from being first to apply a known SSM trick to a specific biology corpus, not from inventing new SSM math.

### What it takes

PyTorch / JAX fluency, an opinionated read on one biological substrate, and a willingness to publish a small-but-pointed paper rather than fight for a SOTA banner. Compute requirements are modest — many of the above (xVERSE included) trained on single-digit GPU-weeks because the architecture, not the scale, was doing the work.

## Wedge 2 — Small adapters on a frozen backbone

**The shape:** a LoRA / Houlsby adapter / specialized head, typically 0.1-5% of backbone parameter count, that fixes one specific task the pretrained FM can't do. Full coverage of the adaptation patterns is in [stage 5 — adaptation](stage-5-adaptation.md); this is the catalog of who actually shipped.

### Exemplars

- **[sc-FM Perturbation Adapter (ICLR 2026 tools)](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/)** — a <1% drug-conditional adapter layered on a frozen sc-FM backbone that **beats the linear-additive baseline** which had previously beaten every full-fine-tuned sc-FM on perturbation prediction. The single most-cited 2026 datapoint that the bottleneck is the pretraining objective, not capacity — see [why linear baselines win](why-linear-baselines-win.md). One GPU-week of compute; the rest is iteration discipline.
- **Drug-conditional adapters for perturbation tasks (generalized)** — the Perturbation Adapter template extends naturally: knockout-conditional, dose-conditional, time-conditional. Each is a single small project, each addresses one specific failure mode of the underlying sc-FM. The frontier is *which conditioning signal you choose to inject*, not *how big you can make the head*.
- **Cell-type-specific heads** — for fine-grained classification (e.g., T-cell subtype resolution) beyond what the backbone's pretraining supports. The pattern: freeze a general sc-FM, train a small classifier head on the cell type you actually care about, ship it as a HuggingFace model with a 30-line inference snippet.
- **Cross-modality adapters** that map sc-FM embeddings into a shared space with imaging or spatial-omics models. Stegle-group work on SpatialData-aware adapters is the 2026 reference point; the wedge is wide open because almost no one has bridged the sc-FM and spatial-FM stacks yet.
- **ESM-2 function probes (linear / shallow heads)** — most of the strongest "ESM-2 learns biology" claims come from probing studies that train a small head on top of frozen embeddings and ask whether secondary structure / contacts / function is decodable. Each of these probes is essentially a shippable adapter that any small team can replicate on a new protein FM (ESM-3, ProtBERT successors) the week it releases.
- **Attention-MIL aggregators for pathology FMs** — the differentiation in pathology has *moved off the backbone* (ViTs are converged) and *onto the aggregator*: how do tile-level embeddings get pooled into slide-level predictions? CONCH and TITAN (Mahmood lab) use attention-MIL; CHIEF uses a hierarchical variant. A new aggregator design that handles a specific pathology question better — e.g., spatial-context-aware aggregation for tumor margin prediction — is an honest small-team paper.

### What it takes

PyTorch fluency, one downstream task you understand better than anyone else, and the patience to iterate on small variations until something beats the linear baseline. The compute is genuinely 1-10 GPU-days per experiment; the differentiator is task knowledge, not horsepower.

## Wedge 6 — Interop infrastructure

**The shape:** software that *other people's* tools depend on — a data format, a workflow wrapper, a cross-language bridge, a Galaxy/Bioconductor adapter. The compounding asset class: a year-old format gets adopted, a five-year-old format becomes inevitability.

### Exemplars

- **[SpatialData](https://spatialdata.scverse.org/)** (Stegle group + the wider OME-NGFF community) — cross-language, Zarr-backed container for aligned spatial-omics + imaging + annotation. The de facto 2026 standard for spatial tools: scverse adopted it; Mahmood lab's HEST-1k uses it; the major commercial platforms (10x Visium HD, Xenium, MERSCOPE, NanoString CosMx) all ship export adapters. See the [spatial / multimodal blog](spatial-omics-and-multimodal.md) for the substrate story.
- **plyxp** (Mike Love) — dplyr-style verbs on Bioconductor `SummarizedExperiment`. Small, scoped, surgical. The pattern: pick one cross-ecosystem friction point (R-tidyverse users who hate the Bioconductor S4 API), build the smallest bridge that smooths it, maintain it for a decade.
- **bioc-to-galaxy** — LLM-assisted Bioconductor → Galaxy XML translator. Each Bioconductor tool that gets a Galaxy wrapper becomes accessible to a different community (Galaxy users have a workflow-builder, not an R console). This is a *force-multiplier* wedge — it makes hundreds of other people's tools work for thousands of new users without ever writing a new analysis method.
- **scverse + scvi-tools + AnnData / MuData** — the broader ecosystem SpatialData lives in. Most of the foundational work was done by small teams who staked out one position (single-cell containers; deep-generative-model implementations; multi-modal extensions) and held it. Joining a scverse-adjacent maintainer team is itself a Wedge-6 path if you're early-career and don't want to ship a new format from scratch.
- **HuggingFace ports of biological FMs** — the unglamorous task of taking a published checkpoint and shipping it as a clean `AutoModel` with proper config, tokenizer, and an inference example. Most biology FMs have *technically* been HF-ported by their authors, but the actual experience of `from_pretrained` on a fresh environment is often broken. Whoever maintains the canonical port has structural power over how that FM gets used.
- **OME-NGFF / Zarr extensions for new modalities** — the Zarr-based format-extension surface (new dimension semantics, new metadata schemas) is where the substrate evolves. A single accepted OME-NGFF extension can become load-bearing for an entire downstream tool category.

### What it takes

Software-engineering discipline (this is the wedge where untested code shows up fastest), and a serious commitment to community / governance work — being a good open-source citizen, responding to GitHub issues, attending the scverse or OME meetings, writing the docs that make the format actually adoptable. The reward is not citation count; it is structural position in a stack you can hold for a decade.

## Stacking the three wedges

The honest small-lab strategy in 2025-2026 is not "pick one wedge." It is **stack two of these three** over a 2-3 year window:

- **Wedge 1 + Wedge 2** — invent the right inductive-bias module *and* the matching adapter on top, so you have a coherent story (architectural insight + frozen-backbone deployment path) for one specific downstream task. xVERSE plus a SpatialData-aware Perturbation Adapter on top would be a credible 2026 sequence.
- **Wedge 1 + Wedge 6** — publish a small backbone, *and* maintain the interop substrate it depends on. This is how scverse-adjacent groups (Stegle, Theis) build durable position.
- **Wedge 2 + Wedge 6** — ship adapters on existing FMs *and* maintain the HuggingFace / Bioconductor port that distributes them. Lower-glamour but the most-defensible wedge stack if you have only one engineer.

What the stacking buys you: each wedge alone is a 1-2-year paper; two stacked wedges are a 5-year research program with both methodological novelty (Wedge 1 or 2) and durable infrastructure (Wedge 6). The big-FM labs don't usually pick up Wedge 6, because their incentives are around checkpoint releases, not format maintenance.

## Where to go next

- **[v1: What can a small lab actually build?](small-labs-what-to-build.md)** — the full six-wedge taxonomy, plus the three moats and the three "what to skip" patterns. Read v1 if you want the rationale for excluding wedges 3, 4, 5.
- **[Foundation models — state of play](foundation-models-state-of-play.md)** — the cross-family landscape your wedge has to fit into.
- **[Why linear baselines win](why-linear-baselines-win.md)** — the empirical reckoning that makes Wedge 2 the highest-leverage move in 2026.
- **[Stage 5 — adaptation](stage-5-adaptation.md)** — the technical inventory of LoRA / adapter / specialized-head patterns used by Wedge 2.
- **[Stage 3 — architecture](stage-3-architecture.md)** — the architectural taxonomy Wedge 1 escapes from.
- **[Spatial omics and multimodal](spatial-omics-and-multimodal.md)** — where Wedge 6 (SpatialData, scverse) actually lives.

---

*Last updated 2026-05-18.*
