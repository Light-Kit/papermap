---
title: 'Small labs in the FM / VC era — substrate is the moat (v3)'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- people
- clinical
summary: A v3 reframe of the small-labs wedge taxonomy after three follow-up audits — the v2 agent-loop verdict, the 101 tour, and the adjacent-project-shapes-and-n-of-1 essay. The architectural-novelty surface for the obvious shapes is gone (TranscriptFormer + COMPASS + Closing-the-loop + VCHarness + CellForge + BioLab cover most of it); the agent-wrapper wedge has been commodified; what's left for small teams is whatever gives you a substrate moat — biological intuition, a specific clinical reference atlas, a privileged corpus, a clean permissive port, or a community-position interop role.
starred: false
---

> *This is v3 of [v1: What can a small lab actually build?](small-labs-what-to-build.md) and [v2: the ML + infrastructure narrowing](small-labs-what-to-build-v2.md). v1 mapped six wedge shapes and three moats; v2 narrowed to wedges 1, 2, and 6 for ML+SWE labs. v3 reorganizes the whole map around a single insight from the last three audits — **substrate is the moat in 2026** — and as a consequence retires the agent-wrapper wedge, splits a new patient-anchored projection wedge out of v2's wedge 2, and reframes every remaining wedge by which substrate the small lab is actually defending.*
>
> *Companion reading: [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md) for the project-level verdict that drove this reframe; [101 tour of closed-loop virtual cells](closed-loop-virtual-cells-101.md) for the field-level mental model; [adjacent project shapes + n=1](adjacent-project-shapes-and-n-of-1.md) for the three-question audit that named the substrate-as-moat pattern; [why linear baselines win](why-linear-baselines-win.md) for the empirical reckoning; [causal models, FMs and virtual cells](causal-models-fm-and-vc.md) for the rung-1/rung-2 framing.*

## Why v3 exists

Three audits shipped between 2026-05-15 and 2026-05-18 changed what counts as a defensible small-team move:

- The **v2 agent-loop verdict** named four already-published closed-loop VC FM systems ("Closing the loop", VCHarness, CellForge, BioLab) and concluded that the loop architecture is no longer novel — what's left is *application + discipline*.
- The **101 tour** of closed-loop virtual cells made the field-level mental model explicit: the substrate (rung-1 atlases, rung-2 perturbation data, longitudinal patient panels) is what every interesting question now hinges on.
- The **adjacent-shapes-and-n=1 essay** ran the same audit on three follow-up project shapes (multicellularity FM, anti-PD1 cross-cancer, n=1 personalization) and found the same pattern three more times: the loop / model is published or commodified, and the only defensible novelty lives in *upstream* substrate decisions — wet-lab atlas generation, evaluation discipline, longitudinal sampling design.

The v2 small-labs essay's three-wedge narrowing (architecture, adapters, interop) is still correct as far as it goes — but it doesn't say which substrate each wedge defends, and it leaves the agent-wrapper wedge from v1 standing even though the closed-loop literature has by now commodified it. v3 fixes both.

## The reframe — substrate is the moat

In 2026 the loop is commodity, the backbone is commodity, the architecture is mostly commodity, and the wrapper is increasingly commodity. The big-FM labs and the well-capitalized agent shops can match or beat any of these. What they *cannot* match is a substrate — a specific atlas, a privileged cohort, a clinical reference panel, a community-governed format, a biological intuition that nobody else has thought to encode. Every honest small-lab wedge below is defined by *which substrate it defends*, not which technique it uses. A LoRA adapter is not a moat; *a LoRA adapter trained on a downstream task you understand better than anyone else* is.

This reframe is why the v2 agent-loop essay landed on "application + discipline, not methods" and why the adjacent-shapes audit concluded that **the moat in each adjacent shape lives upstream of the model**. The rest of this essay is the six-wedge consequence.

## Resource floor by wedge

The six wedges below are not peer-comparable at the resource level. Two are genuinely one-engineer-one-GPU moves; two are institutional moves wearing small-lab framing; one needs a clinical collaborator more than it needs a GPU. The table below names the resource gate per wedge *before* any of the substrate / skills detail in the per-wedge sections — read it first, then read the sections against it.

| Wedge | Compute floor | Data | Other resource gate | Resource verdict |
|---|---|---|---|---|
| 1 — architectural inductive bias | ~$5–20K cloud + 1 A100/A6000 node | CELLxGENE Census + sc-Arena / PerturBench benchmarks (public) | 6–12 mo engineer-time | **Borderline.** Pre-print attainable; SOTA banner is not — iteration cycles to converge on a non-BERT architecture realistically need ~10× the headline compute. |
| 2 — frozen-backbone adapters | $0–2K, one GPU-week on local hardware | Replogle, Tahoe-100M, GDSC, PRISM, CCLE — all public | one engineer × 6 mo | **Cleanest fit.** The only wedge whose headline number ("1–10 GPU-days") is honest. |
| 3 — patient-anchored projection | ~1 GPU-day, trivial | Sade-Feldman / Jerby-Arnon / Bassez / Bi atlases are public; the within-patient validation sample is not | **IRB + clinical collaborator + biopsies + DUA, often a hospital affiliation** | Compute is small; **the clinical-collaborator slot is the entire moat**. Without it, this wedge is closed. |
| 4 — privileged-corpus continual pretraining | $20–100K (Geneformer-CLcancer-scale) | **By definition exclusive** | Curation infrastructure + institutional affiliation | **Institutional, not small-lab.** "Privileged corpus" is institutional access by another name. |
| 5 — permissive-license reimplementation | $5–20K (xVERSE-class) up to $50–200K (Hibou / TranscriptFormer / COMPASS-class) | Public, but harmonization is expensive | Release engineering + sustained maintenance | **Partial fit.** Only viable at the small-model end — most gated targets are gated because they're expensive to reproduce. |
| 6 — interop infrastructure | ~$0, runs on a laptop | Often none needed | Multi-year sustained engineer-time + community / governance work | **Cleanest fit alongside W2.** The bottleneck is years, not money. |

Read against this table, only **Wedge 2 and Wedge 6** are unambiguous small-lab fits at the resource level. **Wedge 1** clears the bar with one GPU node and a modest cloud budget. **Wedge 3** needs a clinical collaborator more than it needs compute — the v3 framing as a small-lab wedge is honest only conditional on that slot being filled. **Wedges 4 and 5** are institutional moves wearing small-lab framing, even though the per-wedge prose below makes them look peer-comparable to Wedges 1, 2, and 6. The substrate-as-moat reframe is what *names* this — the moats are upstream of the model, and most of the upstream resources (data, clinical access, sustained engineering) are not what a small lab buys with one GPU and a year.

## Wedge 1 — Architectural inductive bias

**Substrate: your biological intuition.**

A new architectural component or full backbone that's specifically right for biology — not a transformer re-purposed from NLP. The big-FM labs are stuck in BERT path-dependence; your defense is one piece of biology you're willing to encode at the architecture level.

**Exemplars** (mostly unchanged from v2): **xVERSE** (Jiang & Xie, bioRxiv 2026.04) — transcriptomics-native non-LM architecture, 11–34% gains over scGPT / Geneformer / scFoundation / UCE; **TxPert** (Wenkel et al., *Nat Biotech* 2026) — multi-knowledge-graph prior injected into the perturbation transformer; **ESM-3's SE(3)-invariant tokens**; **AlphaGenome's track-prediction objective**; state-space backbones (Hyena / Mamba / Evo2) for genomic substrates.

**The substrate test:** ask which symmetry, prior, or biological structure your architecture encodes that a vanilla transformer doesn't. If you can name it in one sentence, this is a real wedge. If you can't, you're shipping yet another BERT.

**Skills:** PyTorch/JAX + opinionated biology. Compute is genuinely modest (single-digit GPU-weeks).

## Wedge 2 — Frozen-backbone adapters

**Substrate: a downstream task you understand better than anyone else.**

A LoRA / Houlsby adapter / specialized head (0.1–5% of backbone params) that fixes one specific failure mode of the pretrained FM. The 2025 linear-baselines reckoning made this the highest-leverage move in the space.

**Exemplars:** **sc-FM Perturbation Adapter** (ICLR 2026) — <1% drug-conditional adapter that beats the linear-additive baseline; **PertAdapt** (bioRxiv 2025) — condition-sensitive adapter with gene-level structure; **scDCA** (ICLR 2026) — drug-conditional adapter on frozen sc-FMs; cell-type-specific classification heads; cross-modality adapters between sc-FM and spatial-FM embedding spaces; attention-MIL aggregators for pathology FMs (CONCH, TITAN, CHIEF).

**The substrate test:** name the downstream task and explain *why your task knowledge beats the next team's hyperparameter sweep*. If the answer is "I just tuned the head better," it's a paper, not a moat.

**Skills:** PyTorch + deep task knowledge. Compute is 1–10 GPU-days per experiment.

## Wedge 3 — Patient-anchored projection (NEW)

**Substrate: one specific clinical reference atlas + longitudinal sampling discipline.**

This wedge did not exist in v1 or v2. It was named explicitly by the n=1 finetuning audit in the [adjacent-shapes essay](adjacent-project-shapes-and-n-of-1.md) and it's a genuinely small-team move: take a published responder atlas (Sade-Feldman melanoma, Jerby-Arnon, Bassez breast, Bi RCC), use **scArches** ([Lotfollahi et al., *Nat Biotech* 2021](https://www.nature.com/articles/s41587-021-01001-7)) to project new patient data into it, attach a frozen-FM feature extractor + cohort-trained logistic / GBM head, and ship the result as a HuggingFace Space or a clinical-research tool.

What makes this a wedge: every closed-loop VC paper assumes you can finetune a backbone, and every n=1 personalization claim runs into the catastrophic-forgetting wall. scArches-style projection sidesteps both — frozen backbone, frozen FM, cohort-trained head, *per-patient inference*. The "model" is unchanged across patients; what changes is the projection trajectory each patient traces through the atlas. This is the only honest n=1 move in the 2026 literature, and almost no one has built it as a *productized* small-team artifact.

**Exemplars:** **scArches** itself + descendants; the **Tempus IPS** and **PurIST pancreatic** patterns (cohort-trained head queried per patient); patient-specific **Virchow2** + attention-MIL aggregator on H&E for ICI response, under leave-one-cancer-out evaluation (the defensible niche named in the [adjacent-shapes essay](adjacent-project-shapes-and-n-of-1.md)).

**The substrate test:** name the reference atlas + the held-out evaluation cohort *before* writing code. If they don't exist or aren't accessible, this wedge isn't open to you.

**Skills:** scArches/scvi-tools fluency + a clinical collaborator who can supply a within-patient longitudinal sample for validation. Compute is one GPU-day per projection.

## Wedge 4 — Privileged-corpus continual pretraining

**Substrate: data you have access to that nobody else does.**

Take an open-weight FM, continue pretraining on a tightly-curated domain corpus only you can assemble, then ship the new checkpoint. Was wedge 3 in v1.

**Exemplar:** **Geneformer V2-104M_CLcancer** — the general Geneformer continually pretrained on 14M curated cancer cells; matches or beats the 316M general model on most cancer downstream tasks despite being 3× smaller.

**The substrate test, hardened:** what makes your corpus *exclusive*? If the answer is "we pulled it from CELLxGENE Census," this wedge isn't yours — the big-FM labs already pretrained on Census. The wedge is only open if you have a privileged corpus (one institution's rare-disease cohort, one tissue-specific archive, a clinical trial collection no one else can touch).

**Skills:** data engineering (corpus curation is most of the work) + enough HuggingFace fluency to continue pretrain cleanly. Compute is 10–100 GPU-days depending on corpus size.

## Wedge 5 — Permissive-license reimplementation

**Substrate: release engineering + license clarity that the gated incumbents can't match.**

An openly-licensed (Apache-2.0 / MIT) model in a category where the SOTA is gated, AGPL, or commercial-only. The 2026 surface here grew substantially: TranscriptFormer, COMPASS, STATE, Closing-the-loop are all gated or non-permissive in some form, opening permissive-port opportunities across multiple categories — not just pathology where Hibou sat alone.

**Exemplars:** **Hibou** (HistAI, Apache-2.0 pathology FM in a Virchow2 / UNI2-h / CHIEF gated landscape); permissive ports of COMPASS-style cross-cancer ICI predictors; clean Apache-2.0 reimplementations of closed-loop ISP frameworks; HuggingFace-canonical releases of TranscriptFormer-class cross-species FMs.

**The substrate test:** what is your release-engineering story? Weights + code + docs + a `from_pretrained` line that actually works on a fresh environment is the *minimum*. The wedge compounds when downstream teams adopt your port as the de facto checkpoint.

**Skills:** a working model recipe (you don't need to be SOTA) + serious release engineering. Compute is whatever the original recipe needs; the moat is the polish.

## Wedge 6 — Interop infrastructure

**Substrate: community position in a stack you can hold for a decade.**

Software that *other people's* tools depend on — a data format, a workflow wrapper, a cross-language bridge. Unchanged from v2.

**Exemplars:** **SpatialData** (Stegle group + scverse) — the de facto 2026 standard for spatial-omics + imaging containers; **plyxp** (Mike Love) — dplyr verbs on `SummarizedExperiment`; **bioc-to-galaxy** — LLM-assisted Bioconductor → Galaxy XML translator; **scverse + scvi-tools + AnnData / MuData**; **HuggingFace ports of biological FMs**; **OME-NGFF / Zarr extensions** for new modalities.

**The substrate test:** are you doing the community / governance work — responding to GitHub issues, attending scverse / OME meetings, writing the docs that make adoption actually viable? Without that, you have library code, not infrastructure.

**Skills:** software-engineering discipline + sustained community work. The reward is structural position, not citation count.

## Retired — Agent / tool-use wrappers

**Substrate gone.**

v1 listed this as Wedge 5 with X-Cell and MedAgentGym as exemplars. Six months later, **CellForge** (multi-agent neural-architecture search for sc perturbation), **VCHarness** (agent + biological FM beating expert-designed approaches), **BioLab** (multi-agent autonomous life-sciences with closed-loop RAG memory), and **"Closing the loop"** (iterative Geneformer finetune on Perturb-seq) cover the agent-wrapper-over-VC-FM space end-to-end. **Biomni** covers the general biomedical-agent surface; **Google AI co-scientist** covers the hypothesis-tournament surface; **TxGemma + Agentic-Tx** covers the therapeutic-FM-as-tool surface. The compositional wins v1 expected from agent wrappers are now produced by these systems by default.

A small team can still ship a *specific* agent wrapper that anchors on a substrate the big systems can't reach — e.g., an agentic wrapper around your privileged cohort, or around your pathology-FM cross-cancer ICI loop. But the *general* "agent over FMs" wedge is closed.

## Stacking and substrate compounding

The v2 stacking patterns (1+2, 1+6, 2+6) still hold, and the substrate-as-moat reframe adds a new useful question: **does the stack compound on substrate, or only on technique?** A 1+2 stack (architecture + adapter on the same task) compounds on biological-intuition substrate. A 3+5 stack (patient-projection + permissive-license port) compounds on clinical-reference-atlas substrate. A 4+6 stack (privileged-corpus pretrain + interop format) compounds on data-access substrate. These are the durable 5-year programs.

The stack that *doesn't* compound is anything anchored on technique alone — a LoRA + a different LoRA + a third LoRA gets you three papers and no moat.

## Reconciling with v2

v2's three-wedge narrowing (1, 2, 6 for ML+SWE labs) is intact and correct *as a sub-selection of v3 for the specific lab profile v2 described*. v3 is the wider taxonomy; v2 is one specific traversal. If your lab matches the v2 profile (ML + SWE, no privileged data, no FDA / clinical pipeline), the v2 narrowing is still the practical reading. If your lab has clinical-collaborator access or institutional-cohort access, wedges 3, 4, and 5 in v3 open up.

## Where to go next

- **[v1: full six-wedge taxonomy](small-labs-what-to-build.md)** — for the rationale-heavy version with all six wedges spelled out and the three moats discussed.
- **[v2: ML+SWE narrowing](small-labs-what-to-build-v2.md)** — for the catalog-version of wedges 1, 2, 6.
- **[Agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md)** — the project-level verdict that named the substrate-as-moat pattern.
- **[101 tour of closed-loop virtual cells](closed-loop-virtual-cells-101.md)** — the field 101 + the eight-concept vocabulary.
- **[Adjacent project shapes + n=1](adjacent-project-shapes-and-n-of-1.md)** — the audit that retired the agent-wrapper wedge and introduced the patient-anchored projection wedge.
- **[Why linear baselines win](why-linear-baselines-win.md)** — the empirical reckoning that makes Wedge 2 load-bearing.
- **[Causal models, FMs and virtual cells](causal-models-fm-and-vc.md)** — the rung-1/rung-2 framing under which every substrate decision is really an interventional-data decision in disguise.
- **[Clinical and agentic clinical](clinical-and-agentic-clinical.md)** — adjacent clinical-agent work; where Wedge 3 (patient-anchored projection) lives operationally.

---

*Last updated 2026-05-19.*
