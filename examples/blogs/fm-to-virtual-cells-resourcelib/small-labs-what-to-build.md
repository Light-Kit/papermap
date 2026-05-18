---
title: What can a small lab actually build in the VC / FM era?
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
- people
summary: An honest taxonomy for ML-leaning postdocs and junior PIs — the moats you can't cross, plus six wedge shapes that small teams actually shipped in 2025-2026, each anchored to one exemplar.
starred: false
---

> *Audience: an ML-leaning postdoc or junior PI with 1-5 people, no $1B compute budget, no 800-hospital data partnership, and a real desire to **ship something** in the virtual-cell / foundation-model space rather than write yet another critique paper. Companion to the [foundation-models state-of-play](foundation-models-state-of-play.md) (what's been built) and [how to make a biological FM](how-to-build-a-biological-fm.md) (how big-FM teams build).*

The headline story of 2025-2026 — Lilly + NVIDIA's $1B Vera Rubin deal, Owkin's 800-hospital network shipping into Claude for Healthcare, Genentech's atlas-scale efforts — looks like the field belongs to a handful of well-capitalized teams. That's true at the *checkpoint* layer. It's not true at the *artifact* layer, where 1-5 person teams shipped real things in 2026. This essay maps the moats you can't cross, then taxonomizes the six wedge shapes where small teams actually shipped — each with one exemplar from the corpus and a one-line "what skills you need" tag.

## The moats — what you can't compete on

Three things a small lab cannot build in 2026:

1. **A new from-scratch general-purpose sc-FM.** The data harmonization alone (100M+ cells, hundreds of donors, gene-symbol unification across platforms and species) is a multi-year engineering project before you write a line of model code. Compute then adds another $5-50M.
2. **A new general-purpose pathology FM.** The Mahmood lab's UNI corpus is >100M H&E tiles from multi-institution partnerships; Owkin trains across 800 hospitals. You will not assemble a comparable training corpus on a postdoc salary.
3. **A consumer-distribution position.** When Anthropic embeds an FM into Claude for Healthcare, that's a distribution moat no model alone can beat.

Accepting all three frees you to pick a wedge that doesn't fight them.

## Wedge 1 — Inductive-bias modules

**Build:** A new architectural component that's specifically right for biology — not a transformer ported from NLP. **Exemplar:** [xVERSE](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/) (Jiang & Xie, bioRxiv 2026.04) — a transcriptomics-native non-LM architecture that beats every major sc-FM by **11-34%** on representation, batch correction, and spatial imputation. Also see [TxPert](https://doi.org/10.1038/s41587-026-03113-4) (Wenkel et al.), which gives transcriptomic perturbation prediction a multi-knowledge-graph prior. The wedge: the big-FM labs are stuck in BERT-clone path-dependence; you aren't. **Skills:** ML modelling + serious biology fluency (you have to *know* what inductive bias is the right one).

## Wedge 2 — Small adapters on a frozen backbone

**Build:** A LoRA / adapter / specialized head (<1-5% of backbone params) that fixes one specific task the pretrained FM can't do. **Exemplar:** the [sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) — a <1% drug-conditional adapter on a frozen sc-FM backbone that beats the linear-additive baseline on zero-shot perturbation prediction. The wedge: when the backbone's pretraining objective doesn't match the downstream task (which is true for almost every sc-FM on perturbation), a small specialized head can rescue it. The compute is a single GPU-week. **Skills:** PyTorch fluency + one specific downstream task you understand better than anyone else.

## Wedge 3 — Domain-specific continual pretraining

**Build:** Take an existing open-weight FM and continue pretraining on a tightly-curated domain corpus, then ship the new checkpoint. **Exemplar:** **Geneformer V2-104M_CLcancer** — the general Geneformer continually pretrained on 14M curated cancer cells. The cancer-domain checkpoint matches or beats the 316M general model on most cancer downstream tasks, despite being **3× smaller**. The wedge: the big-FM labs train for breadth; you train for one disease, one cell type, one tissue and win on depth. **Skills:** data engineering (the corpus curation is most of the work) + enough HuggingFace fluency to continue pretraining cleanly.

## Wedge 4 — Permissive-license alternative

**Build:** An openly-licensed (Apache-2.0 / MIT) model in a category where the SOTA is gated, AGPL, or commercial-only. **Exemplar:** **Hibou** (HistAI, *not* Owkin) — currently the only Apache-2.0 top-tier pathology FM in a category otherwise dominated by gated weights (Virchow2 / UNI2-h require licence requests; CHIEF is AGPL-3.0). Hibou is shipped by a tiny team and gets adopted because licence friction is a real adoption tax in academic and commercial settings alike. The wedge: a slightly-behind-SOTA model with a clean licence often wins on integration into other people's pipelines. **Skills:** a working model recipe (you don't need to be SOTA) + a serious commitment to release engineering (weights + code + docs that actually work).

## Wedge 5 — Agent / tool-use wrapper

**Build:** An LLM-driven agent that orchestrates the existing FMs rather than competing with them — composes scGPT + Geneformer + UNI + AlphaGenome into a workflow no single FM can do. **Exemplars:** **X-Cell** (Bo Wang lab) — an agentic wrapper around the sc-FM stack that orchestrates analysis end-to-end. [MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/) provides the evaluation surface (72k tasks, sandboxed code execution) that this category needs. The wedge: the next gain in many biology tasks comes from *composition* of existing FMs, not from building a better one. Anthropic's MCP makes the wrapping tractable. **Skills:** LLM orchestration (agents, tool-use protocols, evaluation harnesses) + biology workflow knowledge.

## Wedge 6 — Interop infrastructure

**Build:** Software that *other people's* tools depend on — a data format, a workflow wrapper, a cross-language bridge. **Exemplars:** **SpatialData** (the Zarr / OME-NGFF cross-language framework every modern spatial-omics tool now targets), **plyxp** (dplyr verbs on SummarizedExperiment — Mike Love's bridge), **bioc-to-galaxy** (LLM-assisted Bioconductor → Galaxy XML translator). The wedge: the FMs need substrate, glue, and pipes, and the people building the FMs aren't going to build the pipes well. Infrastructure compounds — a year-old format gets adopted, a five-year-old format becomes inevitability. **Skills:** software-engineering discipline + community / governance work (this is the wedge where being a good open-source citizen pays off most).

## What to skip

Three tempting but unfertile patterns for small teams in 2026:

- **"Yet another sc-FM"** trained on the same CELLxGENE Census with one new architectural twist. The reckoning literature suggests the gain from a new backbone is modest at best, and ten copies of scGPT-with-a-tweak have not produced any practice change.
- **"Yet another linear-baselines critique paper."** The reckoning is already won; the next paper has diminishing returns. The user asked specifically for build-shaped wedges, and this category is analysis-shaped.
- **"Standalone benchmark"** released as a paper, not as software. sc-Arena and PerturBench got traction because they shipped as reusable infrastructure. A benchmark that exists only inside a PDF is a publication, not an artifact.

## Picking your wedge

Three decision questions, in order:

1. **What artifact am I willing to maintain for 3+ years?** Wedges 4 and 6 (Hibou-style models, interop infra) compound with time but require sustained engineering. Wedges 1 and 2 (architecture, adapters) can ship as a one-shot paper-plus-code and stop.
2. **What's my data access?** If you have a privileged corpus (one rare disease, one institution's spatial-omics archive), Wedge 3 (continual pretraining) is the highest-leverage move. If you have only the public corpora, lean toward Wedges 1, 2, 5.
3. **Am I architecturally creative, software-creative, or composition-creative?** Wedge 1 wants new ML, Wedge 6 wants new infra, Wedge 5 wants new orchestration. They reward different muscles.

The honest summary: every small-team success in 2025-2026 either (a) did something specifically right for biology that the big-FM labs were too BERT-pilled to try, or (b) shipped infrastructure / adapters / agents that *use* the big-FM checkpoints rather than competing with them. Both wedges are wide open in 2026.
