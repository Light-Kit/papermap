---
title: AACR 2026 — what it told us about virtual cells
date: '2026-05-12'
topics:
- aacr-2026
- virtual-cell
- foundation-model
- agentic-ai
summary: AACR 2026 ran two dedicated AI plenaries (ED03 on FMs, AT02 on agentic AI) plus a 48-poster virtual-cells corpus. The headline is a widening stage-to-poster gap on evaluation and reliability.
starred: true
---

> *Companion to the [people-and-institutes blog](people-and-institutes.md) and the [other-conferences-2026 blog](aacr-and-other-conferences-2026-virtual-cells.md). This page is the AACR-specific cut: what was new on stage, what was new in the poster hall, and where the gap between the two is widening.*

## What AACR 2026 actually was (for this corpus)

AACR is the largest annual oncology meeting in the world (~22,000 attendees in 2026, San Diego), and for the past three years its AI footprint has been growing twice as fast as the rest of the program. AACR 2026 was the year that footprint **stopped being a side track** and started running as dedicated headline sessions.

The two load-bearing AI plenaries this year:

- **ED03 — Foundation Models and Multimodal AI for Cancer Research** (Fri 4/17 PM, ~11,700 words on transcript) — Bunne / Yeung-Levy / Moor. The field's first AACR-stage session on virtual cells as a category, rather than as a flavour of "applied ML in oncology."
- **AT02 — Agentic AI as the Cancer Researcher: Autonomous Discovery in Oncology** (Tue 4/21 PM, ~12,800 words) — Bitterman / Foersch / Zitnik. The first AACR-stage session on agentic AI specifically, framed as "what comes after the foundation model."

Plus overlapping sessions on AI in biomarker discovery (Sat 4/18), AI revolution in cancer research (Mon 4/20, including **Bo Wang's cell-FM talk**), AI + spatial transcriptomics (Mon 4/20 PM), and 3D tissue imaging (Sat 4/18 PM).

Around that stage activity, a **48-poster virtual-cells corpus** (filtered by `"virtual cell"`, `"foundation model"`, `scGPT`, `Geneformer`, `"digital twin"`, `"in silico perturbation"`, and adjacent keywords) and a **57-poster agentic-AI corpus**. That gives this digest a stage-versus-poster comparison the field rarely has at AACR.

---

## The five things AACR 2026 added that weren't in the May-2025 literature

### 1. Spatial-proteomics foundation models as a category

Charlotte Bunne's ED03 framing argued that **histopathology FMs translate; spatial-proteomics FMs require new architectures** — because spatial proteomics is not RGB, it is panel-varying multiplexed protein quantification where one study measures 40-plex with protein set A and the next measures 80-plex with set B. Her group's solution uses a protein-language-model-backed encoder to tokenize whichever proteins are present.

The corpus analogue: **poster #4163** (Andrew Song, "A general-purpose AI foundation model for spatial proteomics") is the direct match — the only spatial-proteomics FM in the entire 48 — and it independently argues that conventional cell-segmentation-then-threshold pipelines are inadequate for FM-scale spatial proteomics.

This is the cleanest case in AACR 2026 of a stage thesis matched 1:1 by a poster, and it's the *new* sub-category that wasn't in any 2025 review article. The rest of the pathology-FM literature (UNI, Virchow2, Prov-GigaPath, CONCH, PathChat) is still RGB-vision-transformer.

### 2. Flow matching as the perturbation-modelling primitive

Serena Yeung-Levy spent her ED03 talk arguing that **flow matching is the right primitive for distribution-to-distribution perturbation modelling**, with CellFlux V2 scaling from 300k to 11.6M cell images as the worked example.

Corpus verdict: **zero posters in the 48 use flow matching**. The closest perturbation generators (GEM-1, CELLama-Perturb, Turbine Virtual Lab) all use autoregressive / representation-learning / mechanistic-simulation architectures instead. This is the most striking stage-vs-poster timing gap on the page: Yeung-Levy is making a specific methodological bet that the AACR-submitting community has not yet picked up. Most likely a publication-cycle artefact — CellFlux V2 was *too recent* for AACR-2026 poster submission — but worth tracking whether AACR 2027 ships any flow-matching posters as the methodology diffuses.

### 3. Active / sequential acquisition on top of multimodal FMs

Bunne's third ED03 thesis was **"EchoK"** — a reinforcement-learning system where the FM knows what it knows and asks for more whenever needed, framed as *"a minimum assay that is good enough for any downstream task."* This is a closed-loop research-design capability, not just a representation-learning one.

Corpus verdict: **zero posters in the 48 implement active sequential acquisition on a multimodal FM**. The closest is poster #1467 (Schadt, GRPO-based mechanism-aware therapy planning), which uses RL but for therapy planning, not assay design. This is a real blind spot — but also a reasonable one, because sequential-acquisition RL is hard to publish as a single poster (you need a prospective assay-design loop, not a static benchmark).

### 4. Verifiable reasoning as the agentic-AI bottleneck

Michael Moor and Danielle Bitterman, from different stages (ED03 and AT02 respectively), converged on the same diagnosis: **the bottleneck for medical AI agents is not capability, it is verifiability**. Moor's framing was process reward models (a "policing" LM that verifies each reasoning step at inference time); Bitterman's framing was stepwise auditable evaluation rather than multi-choice QA benchmarks.

Corpus verdict across both poster corpora: **zero posters implement stepwise reasoning verification, process reward models, or auditable agentic benchmarks**. The 57-poster agentic-AI corpus has 2 evaluation posters (#2739 trial matching, #3 GENIE BPC chatbot), both reporting task-level accuracy on end outputs. The 48-poster virtual-cells corpus has 1 benchmark poster (#5478) on cross-platform FM transfer, not researcher-level reasoning.

This is the largest stage-to-poster gap at AACR 2026: **the two AI plenaries collectively spent ~40% of stage time on evaluation, benchmarking, and verification, and the poster hall shipped essentially nothing on that axis.** Almost certainly a venue effect (MicroVQA, MYRIAD, and process-reward agents publish at NeurIPS/ICML/ACL not AACR), but the substantive consequence is that the field's average submission is ~18 months behind its frontier on reliability.

### 5. Pathology-FM agents as a productisation pattern

Sebastian Foersch's AT02 talk introduced a **modular pathology orchestrator** — a diagnostic agent that calls an IHC agent that calls a reporting agent — as a worked example of how pathology FMs are starting to compose into clinical workflows rather than ship as standalone diagnostic tools. The AT02 transcript also surfaces Marinka Zitnik's **Tool Universe / MedEA** framing: open AI co-scientists with a 2,000-tool environment for prospective EHR-based hypothesis generation.

Corpus verdict: the pathology-orchestrator pattern has 3-5 plausible analogues in the virtual-cells + agentic-AI posters combined (HONeYBEE multimodal #1251, Path2Prot pipeline #87, the cancer-scale WSI→ST FM #2778). The Tool Universe pattern has fewer direct matches; closest is #4 (Velazquez-Villarreal, multi-agent CRC precision-oncology ecosystem). Both stage demos are 2026-recent and have not yet fully diffused to the AACR submission base, but the conceptual templates were *new on this AACR stage* in a way they weren't at JPM 2026 or ICLR 2026.

---

## Where the corpus is strong — what the posters did ship

If the previous section read as "stage is ahead of posters," that's partially true but partially unfair. Three places where the 48-poster virtual-cells corpus is genuinely strong:

### Multimodal fusion (8 direct posters, the densest cohort)

Yeung-Levy's "joint imaging + transcriptomics" thesis is the **best-supported stage claim of ED03**. Direct supports include:

- **#2754** (VGL — vision-gene-language LLM combining histopathology + gene expression)
- **#71** (histopathology ↔ spatial transcriptomics bridging for TME profiling)
- **#1457** (gene expression and pathway activity from H&E WSIs in NSCLC)
- **#87** (Path2Prot — proteomic biomarkers from pathology)
- **#2778** (cancer-scale FM predicting spatial transcriptomics from WSI)
- **#1438** (generative AI for breast genomic subtype from histology)
- **#2752** (CancerSTFormer — multi-scale spot-resolution spatial transcriptomics)
- **#1251** (HONeYBEE multimodal FM for GBM / NSCLC / PDAC)

Plus adjacent broader-fusion posters (#4184 multimodal prostate DL, #5505 cross-platform spatial-omics framework). This is the strongest stage-to-poster alignment on the entire ED03 page.

### In-silico perturbation as substrate for biomarker discovery

Bunne's "real payoff is in-silico perturbation + new biomarkers" thesis is **partially supported with a shift of substrate**: posters use transcriptomic / mutational / morphological features (CELLama-Perturb #1464, Turbine Virtual Lab #4181, GRPO therapy planning #1467, multiscale pathway crosstalk #LB438) rather than her spatial-proteomics substrate, but they do execute the same in-silico-screen-over-learned-representations pattern. The field wants her payoff and is taking a different route to it, because spatial-proteomics data is much rarer than scRNA-seq.

### Bo Wang's cell-FM talk + the scGPT lineage

The "AI Revolution in Cancer Research" session (Mon 4/20 AM) included **Bo Wang's cell-FM talk**, which is the most-discussed scGPT-lineage talk of AACR 2026. The interesting pivot was Wang's framing toward **agentic wrappers around the sc-FM stack** rather than scaling scGPT itself further — directly tracking the broader pattern Theis describes in his 2026 Cell Systems perspective.

This is the *insider concession* that matters: when scGPT's author is publicly framing the next move as "wrap it in agents, don't scale it further," that signals where the second half of 2026 is heading.

---

## The agentic-AI side, briefly

The 57-poster agentic-AI corpus splits cleanly into three buckets:

- **Adverse-event extraction and trial workflows** (15+ posters, e.g. #32 immune AEs, #2755 LLM AE extraction, #29 trial eligibility, #2739 trial matching, #4 multi-agent CRC ecosystem). This is **strongly supported** as Bitterman's "real-world multi-step workflow" thesis — the densest poster cohort.
- **Pathology orchestrators** (~5 posters, e.g. #LB450 AI-assisted pathology-report abstraction, #2738 CIDER clinical-data extraction, #20 cancer diagnosis + staging curation). Partial match to Foersch's modular-pathology framing.
- **Hypothesis generation / co-scientist** (very thin — closest is #4 Velazquez-Villarreal multi-agent precision-oncology). Zitnik's Tool Universe / MedEA framing is essentially **not addressed** in the AACR poster corpus.

The same pattern as the virtual-cells side: **the operational, multi-step-workflow half is well-covered; the evaluation, verification, and benchmarking half is essentially absent.**

---

## What this means for the rest of 2026

Three concrete implications for anyone planning 2026 follow-on work in this space:

1. **If you want to ship something new at AACR 2027**, the cleanest empty slot is a benchmark or evaluation poster — process-reward agents, stepwise audit, MicroVQA-style researcher-level reasoning, drift monitoring. The plenary speakers are explicitly asking for it; the venue is asking for it; the corpus has it almost zero.
2. **If you want to take the most-likely-to-translate stage thesis to a lab project this summer**, multimodal H&E + spatial proteomics with in-silico perturbation is the densest combination — Bunne's framing, Song's #4163 architecture, and the 8-poster multimodal-fusion cohort all point at the same target.
3. **If you want to know where Bo Wang and the broader sc-FM camp are heading**, watch for **agentic wrappers** rather than larger checkpoints. X-Cell is the lead indicator, but [BioMap's VCHarness](https://www.biorxiv.org/content/10.64898/2026.04.11.717183v1) and Owkin's Claude integration sit in the same conceptual neighbourhood.

The pivotal question for AACR 2027: does the venue's poster base catch up on the evaluation axis, or does the gap with the plenary speakers widen further? On current trajectory the latter is more likely — because the venues where evaluation work publishes (NeurIPS, ICML, ACL, ICLR) are not the venues an AACR-targeting oncology lab submits to. The most realistic fix is for the AACR program committee to explicitly solicit a benchmark / evaluation track. Whether that happens is the single highest-signal AACR 2027 indicator to watch.

---

## What to read next (within this corpus)

- **[ED03 vs corpus synthesis](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/virtual-cells/synthesis-ed03-vs-corpus/)** (in conference-vaults) — full thesis-by-thesis breakdown with verbatim quotes and all 48 poster citations.
- **[AT02 vs corpus synthesis](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/agentic-ai/synthesis-at02-vs-corpus/)** — same treatment for agentic AI.
- **[Foundation models state of play](foundation-models-state-of-play.md)** — the 27 FM dossiers that AACR 2026 talks either build on or evaluate.
- **[Why linear baselines win](why-linear-baselines-win.md)** — the methodological background for why the AACR-2026 evaluation-gap matters as much as it does.
- **[Evaluation papers catalog](evaluation-papers-catalog.md)** — the 11 evaluation papers + 1 contrarian that constitute the "reckoning canon" the AACR plenary speakers are reacting to.
