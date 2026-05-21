---
title: 'What do people actually build on? How follow-on research reuses cell foundation models — and which ones'
date: '2026-05-20'
topics:
- foundation-model
- virtual-cell
- single-cell
- adoption
- perturbation
- ecosystem
summary: "A grounded answer to a question every newcomer asks: which virtual-cell / single-cell foundation models do researchers actually reuse, and how? The short version confirms the intuition with two caveats. Yes — scGPT and Geneformer dominate follow-on work by a wide margin (most-cited, best-tooled, the default benchmark targets), and Nicheformer is the spatial entrant most likely to become the spatial default; UCE, scFoundation, and CellPLM are cited far more than they are built upon. But two corrections matter. First, citation is not reuse: most production single-cell analysis still runs scanpy / Seurat with scVI / Harmony, and the FMs, when used at all, are mostly frozen embedders or benchmark targets rather than the analysis pipeline. Second, 'Tahoe' is not a model — Tahoe-100M is a dataset (Vevo/Tahoe Therapeutics + Arc; 100M cells, 1,100 drugs, 50 lines); the model trained on it is Tahoe-x1 (3B params, open weights, Oct 2025), alongside Arc's STATE. The newer, bigger models have not yet displaced the early movers in reuse — partly inertia and tooling, partly the 2025 linear-baseline reckoning that cast doubt on whether scale helps at all (with a live contrarian counter-bet that it does, once data reaches Tahoe scale). The essay lays out the six modes of follow-on work (frozen embedding + head, fine-tuning/adapters, benchmarking, FM-as-baseline, interpretability probing, re-pretraining), names representative papers for each, and closes on what the adoption pattern implies for a small lab: the frozen-embedder mode is the proven, cheap path, which is exactly where our survival-field bet sits — Tahoe-x1 and MoLFormer frozen, a new head, Tahoe-100M as substrate."
starred: false
---

> *A field-orientation companion to the [state-of-play hub](foundation-models-state-of-play.md) and the [model glossary](model-glossary.md). Reads the adoption landscape the [reckoning essay](why-linear-baselines-win.md) explains the cause of, and grounds the design choices in the [fifty-concepts bet](fifty-concepts-one-bet-v2.md) and the [survival-field model](what-disappears-conditional-viability-v3.md): we reuse FMs the same way most people successfully do, just pointed at a different question.*

## The question has two traps in it

"Most researchers seem to use scGPT, Geneformer, Nicheformer — is that true, and what about newer ones like Tahoe?" The instinct is right, but the question hides two traps that are worth disarming before answering.

The first trap is **citation versus reuse**. Being the most-cited model is not the same as being the most *built-upon* model, and neither is the same as being the model people actually run on their own data. These three populations overlap but are not identical, and conflating them produces a distorted map.

The second trap is **model versus dataset**. "Tahoe" is the one that bites newcomers: Tahoe-100M is not a model you can fine-tune — it is a *dataset*. The model is something else (Tahoe-x1), and the distinction changes the whole answer to "is Tahoe being adopted." Hold both traps in mind; the rest of this essay is mostly about navigating them.

## Who actually gets reused

The intuition is correct: **scGPT** ([Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)) and **Geneformer** ([Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)) are the two anchors of follow-on single-cell-FM work. They were early, they shipped usable code and weights ([scGPT on GitHub](https://github.com/bowang-lab/scGPT) with ~1.6k stars; [Geneformer on Hugging Face](https://huggingface.co/ctheodoris/Geneformer) with a family of checkpoints), and — the self-reinforcing part — they became the *default things every new paper benchmarks against*, which keeps them cited whether or not they win. **Nicheformer** ([Schaar et al., *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02814-z); [code](https://github.com/theislab/nicheformer)) is the spatial-omics entrant from the Theis lab; it is newer and smaller in adoption, but it is the one most likely to become the *spatial* default the way scGPT became the dissociated default.

Behind those three sit models that are cited far more than they are built upon. **UCE** ([Rosen et al., bioRxiv 2023](https://www.biorxiv.org/content/10.1101/2023.11.28.568918); [code](https://github.com/snap-stanford/UCE)) is used almost exclusively as a *frozen, zero-shot embedder* — by design it has no fine-tuning path. **scFoundation** ([Hao et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02305-7); [code](https://github.com/biomap-research/scFoundation)) shows up most often paired with GEARS for perturbation. **CellPLM** ([Wen et al., ICLR 2024](https://openreview.net/forum?id=BKXvPDekud)) appears in benchmarks more than as a foundation other people build on.

| Model | Role | Reuse signal | Dominant follow-on mode |
|---|---|---|---|
| **scGPT** | dissociated scRNA FM | most-reused; ~1.6k GitHub stars; default benchmark target | frozen/zero-shot embedder, sometimes fine-tuned |
| **Geneformer** | dissociated scRNA FM | the other default; multi-checkpoint HF family | fine-tuned for classification + in-silico perturbation |
| **Nicheformer** | spatial + dissociated FM | spatial entrant, adoption still early | linear-probe / fine-tune for spatial tasks |
| **UCE** | universal embedder | moderate; embedder-only | frozen zero-shot embedding |
| **scFoundation** | read-depth-aware FM | moderate; perturbation-leaning | embeddings + GEARS for drug/perturbation |
| **CellPLM** | cell-as-token FM | mostly a benchmark entry | cited more than built upon |

## How people reuse them — six modes

Strip away the model names and follow-on work falls into six modes, ordered roughly by how common they are:

1. **Frozen embedding + a lightweight head.** Run the FM as a fixed encoder, train a linear or small-MLP head for cell-type annotation or label transfer. This is the most common mode by a wide margin, and the cheapest — it is where UCE and zero-shot scGPT live, and it is the mode a small lab can run on a laptop-plus-one-GPU.
2. **Fine-tuning / adapters.** Specialize the backbone for a task — perturbation, disease state, spatial niche — usually via LoRA/FiLM-style adapters rather than full retraining. Geneformer is the canonical fine-tune target; scFoundation+GEARS is the perturbation pattern.
3. **Benchmarking studies.** Papers whose product *is* the comparison — FMs against each other and against linear / HVG / scVI baselines. [Kedzierska et al., *Genome Biology* 2025](https://link.springer.com/article/10.1186/s13059-025-03574-x) and [Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02772-6) are the reference points.
4. **FM-as-baseline.** Every new model (STATE, Tahoe-x1, xVERSE, TxPert) benchmarks against scGPT/Geneformer/UCE — so the early movers earn citations as the bar to clear.
5. **Interpretability / probing.** Sparse autoencoders and attention probes on the FM residual stream ([SAE work, bioRxiv 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631)) — the [interpretability essay](interpretability-state-of-cell-fms.md) covers the regulatory-logic gap this exposes.
6. **Re-pretraining / continual pretraining.** Rare, and mostly done by the original labs (scGPT-spatial, Geneformer V2) because it needs the compute and the substrate the rest of us do not have.

Modes 1–2 are "building on top." Modes 3–5 are "building around" — and after 2025, a striking share of the field's energy moved into mode 3.

## The honest gap: citation is not the pipeline

Here is the correction the headline numbers hide. scGPT and Geneformer dominate the *literature*, but they do not dominate the *bench*. Most day-to-day single-cell analysis still runs the classic stack — scanpy / Seurat for the workflow, **scVI** ([Lopez et al., *Nat Methods* 2018](https://doi.org/10.1038/s41592-018-0229-2)) / scANVI / Harmony for integration — and the scverse "best practices" still recommend those, not an FM, as the default path. When FMs do appear in a real analysis, it is overwhelmingly in mode 1 (a frozen embedder) or mode 4 (a benchmark target), not as the production pipeline.

And the 2025 reckoning measurably bent follow-on work toward auditing rather than building. After [Ahlmann-Eltze & Huber](https://www.nature.com/articles/s41592-025-02772-6) showed no sc-FM beat a tuned linear baseline on perturbation prediction, and [Kedzierska et al.](https://link.springer.com/article/10.1186/s13059-025-03574-x) showed zero-shot scGPT/Geneformer underperform HVG/scVI/Harmony, "does this FM clear the linear bar" became a standard reviewer question — see [why linear baselines win](why-linear-baselines-win.md) for the full anatomy. A lot of 2026 follow-on work is now critical benchmarking, not uncritical extension.

## The newer ones — and the Tahoe confusion

Now the second trap. **Tahoe-100M** ([Vevo/Tahoe Therapeutics + Arc, 2025](https://www.biorxiv.org/content/10.1101/2025.02.20.639398)) is a **dataset** — ~100M single-cell transcriptomes across 1,100 small-molecule drugs and 50 cancer lines, the inaugural Arc Virtual Cell Atlas drop, with 250k+ downloads. You do not fine-tune Tahoe-100M; you train *on* it. Its adoption is already **substantial** — but as a *substrate and benchmark*, the role atlases play, not as a model.

The models trained on or alongside it are newer. **Tahoe-x1** ([Tahoe Bio, Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.23.683759); [weights on HF](https://huggingface.co/tahoebio/Tahoe-x1)) is a single-cell FM scaled to 3B parameters with open weights — weeks-to-months old as of mid-2026, so external follow-on is still thin. **STATE** ([Arc Institute, 2025](https://www.biorxiv.org/content/10.1101/2025.06.26.661135)) is Arc's perturbation-specialist FM, framed as a *queryable product* (versioned, supported) rather than a one-shot benchmark — an institutional bet that uptime and support, not just accuracy, drive adoption.

So: have the newer/bigger models displaced scGPT and Geneformer in reuse? **Not yet.** Three reasons. Inertia and tooling — the early movers have years of tutorials, wrappers, and StackOverflow answers. Recency — Tahoe-x1 and STATE are too new to have accumulated downstream papers. And the reckoning itself — when the headline finding is "bigger has not beaten a linear baseline," the incentive to switch to a 3B-parameter model is blunted. The live counter-bet is worth flagging for honesty: a [2026 contrarian preprint](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1) ("Foundation Models Improve Perturbation Response Prediction") argues FMs *do* improve perturbation prediction once data reaches Tahoe scale — so the "newer ones don't help" verdict is an open empirical question, not a settled one, heading into 2027.

## What this means for a small lab like us

The adoption pattern is, quietly, a recipe. The mode that works — that most people succeed with, that costs the least — is mode 1: a **frozen FM as an encoder plus a new, small trainable head**. That is not a fallback; it is the proven path, and it is exactly where our own bet sits. The [survival-field model](what-disappears-conditional-viability-v3.md) freezes Tahoe-x1 as the cell encoder and MoLFormer as the drug encoder, trains only a small hazard-and-transport head, and uses Tahoe-100M as the substrate — the same reuse pattern the field already validates, pointed at a question (who survives a drug you have never run) that the crowded models do not answer. We treat the bigger models the way the data says to: Tahoe-x1 and MoLFormer as *frozen encoders*, Waddington-OT and moscot as *baselines*, Tahoe-100M as *substrate*, and the [linear baseline as the bar](why-linear-baselines-win.md) we hold ourselves to from day one. The lesson of the adoption landscape is not "wait for the model that wins" — it is that the cheapest, most-reused mode is enough, if the question is new. (The [small-lab essay](small-labs-what-to-build-v3.md) makes the economics explicit.)

## The thesis, in one line

Yes — scGPT and Geneformer are what people actually build on, with Nicheformer the spatial heir; but citation is not the pipeline (scanpy + scVI still is), "Tahoe" is a dataset whose model (Tahoe-x1) is real but too new to have displaced anyone, and the reckoning has turned much follow-on work into auditing — so the durable move for a small lab is the most ordinary one: a frozen encoder, a new head, a public substrate, and an honest baseline.
