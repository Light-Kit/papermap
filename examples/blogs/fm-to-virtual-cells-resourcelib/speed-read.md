---
title: 90-Minute Speed Read
date: '2026-05-18'
topics:
- virtual-cell
- foundation-model
summary: A self-contained 90-minute path through the corpus — each item carries its own TL;DR inline so you can absorb the finding here. Links demote to deep-dive only if you want more.
source: speed-read.md
starred: true
---

A self-contained 90-minute read through the highest-value content of the cancer-AI corpus. Each item carries the finding **inline** so you can absorb it on this page; the link is a "go deeper" cue, not the only payload. Stop markers at **10 / 35 / 60 / 75 / 85 / 90** minutes let you bail with most of what matters.

This page is the **front door** for someone who has 90 minutes and wants the highest-value cross-section. Comprehensive coverage lives in the conference vaults and the per-tool / per-trial dossiers linked from each item.

---

## 0:00 — orient yourself (5 min)

### [Conference-vaults home](https://liudengzhang.github.io/conference-vaults/) — 2 min

The conference-vaults site indexes 37 meetings across 2025-2026 — oncology (AACR, ASCO and its sub-meetings, ESMO, ESH, SGO, SITC, SABCS), AI/ML-for-biology (ICLR, ICML, NeurIPS, CVPR, ECCV, KDD), imaging (ISBI, MICCAI, RSNA), single-cell / spatial (scverse, GBCC, Single Cell Genomics, ASCB), genomics (AGBT, ASHG, ESHG, ACMG), and bioinformatics tooling (EuroBioC, RECOMB, ECCB, ISMB). Each conference is either a **full vault** (built post-meeting from session transcripts and abstracts) or a **scaffold** (placeholder for upcoming dates). The home page is the fastest way to see which 2026 meetings already have substantive coverage versus which are still being tracked.

### [2026 Timeline](https://liudengzhang.github.io/conference-vaults/timeline/) — 3 min

A year-at-a-glance Gantt that scores all 36 conferences on four criteria — practice-changing potential, methodological novelty, field-shaping influence, and tracking effort. **The scoring rubric is the load-bearing thing**; the Gantt is the convenience layer on top. Use it to decide which 2026 meetings deserve calendar time before the rest of this speed-read narrows you onto specific items.

## 0:05 — the cancer-research anchor (5 min)

### [AACR 2026 — Overview](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/) — 5 min

AACR Annual is the anchor meeting that organizes the rest of the corpus along five axes: **agentic AI for biology, single-cell + spatial methods, virtual cells, bioinformatics / AI methodology, clinical trials**. The 2026 program (Apr 24-29, Chicago) leaned hard into multimodal foundation models — Charlotte Bunne's ED03 plenary on virtual patients, the Mahmood-stack pathology FM keynote, and 18 posters built on the UNI / Virchow / CHIEF pathology family. Those five axes recur in every later section of this speed-read, so this is the page that pays back the fastest. Notably, the program contained **zero posters with scGPT / Geneformer / UCE in the title** — the 2025 linear-baselines reckoning fully landed in the AACR program before it landed in the rest of the field.

> 🟢 **Stop at 0:10** — you now know the corpus shape.

---

## 0:10 — what changed in cancer treatment this year (25 min)

Three readouts at three GU/GI/gyn meetings that shifted standards of care in 2026.

### ASCO GI (Jan 8-10, San Francisco) — 9 min

#### [HERIZON-GEA-01](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/herizon-gea-01/) — 3 min

Phase 3 of **zanidatamab + chemo** vs trastuzumab + chemo as first-line for HER2-positive gastric / GEJ adenocarcinoma. Zani+chemo improved OS across the full population, and the benefit **concentrated in patients with PD-L1 CPS ≥1** — the IO-benefit threshold the field already uses for checkpoint-inhibitor selection. The practice change: zani displaces trastuzumab as the 1L HER2+ G/GEJ backbone, and CPS≥1 becomes the operational biomarker for who benefits most.

#### [BREAKWATER cohort 3](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/breakwater-cohort3/) — 3 min

**Encorafenib + cetuximab + FOLFIRI** as 1L for BRAF V600E-mutant metastatic colorectal cancer. Median OS hit **~30 months vs ~15 months** on previous chemo SOC — a doubling, which is rare in colorectal. The result establishes the triplet as the new 1L standard for BRAF-mutant mCRC and ends the long debate about whether to layer targeted therapy up-front or after chemo failure.

#### [Daraxonrasib + zoldonrasib PDAC](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/daraxonrasib-zoldonrasib-pdac/) — 3 min

First clinical data for **pan-RAS(ON) inhibitors in pancreatic cancer** — daraxonrasib (RMC-6236) ± zoldonrasib (G12D-specific). Response rates and PFS in heavily-pretreated PDAC are the cleanest pan-RAS signal to date in this disease. The more important contribution is methodological: ctDNA dynamics in the trial are proposed as an **early-readout biomarker**, giving the next wave of pan-RAS trials a way to adapt mid-study instead of waiting for radiographic endpoints.

### ASCO GU (Feb 26-28, San Francisco) — 9 min

#### [KEYNOTE-B15 / EV-304](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/keynote-b15-ev304/) — 3 min

**Enfortumab vedotin + pembrolizumab** vs cisplatin-gemcitabine as perioperative therapy for muscle-invasive bladder cancer. EV+pembro produced an **EFS hazard ratio of 0.53** — recurrence risk roughly halved. Cisplatin had been the default for 30+ years; this is the first regimen to displace it in MIBC, and it moves the conversation from "platinum or not?" to "ADC+IO or not?"

#### [LITESPARK-022](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/litespark-022/) — 3 min

**Belzutifan (HIF-2α inhibitor) added to adjuvant pembrolizumab** for high-risk resected clear-cell RCC. The headline DFS isn't the point — the point is that this is the first adjuvant ccRCC trial to layer a mechanism on top of an already-active pembro backbone, **raising the bar for what counts as "additive benefit"** in a setting where pembro alone is already SOC. Future RCC adjuvant trials will be measured against this combination, not against placebo.

#### [PEACE-3](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/peace-3/) — 3 min

**Radium-223 + enzalutamide** vs enza alone in metastatic castration-resistant prostate cancer. Ra-223 was previously seen as a niche bone-only agent; PEACE-3 showed a clean rPFS and OS benefit for the combination, with a **mid-trial protocol amendment adding bone protection** (denosumab / zoledronic acid) that fixed an early fracture signal. The retrofit is the pivot — it shows the combination is durable once the fracture liability is mechanically controlled.

### SGO (Apr 10-13, San Juan) — 7 min

#### [ROSELLA](https://liudengzhang.github.io/conference-vaults/conferences/sgo-2026/trials/rosella/) — 4 min

**Relacorilant (selective glucocorticoid-receptor antagonist) + nab-paclitaxel** vs nab-paclitaxel alone in platinum-resistant ovarian cancer. The combination beat the chemo arm on PFS and OS — the **first positive Phase 3 of a GR antagonist in any solid tumor**. Glucocorticoid signalling has been implicated in chemo resistance for years but never targeted clinically; ROSELLA validates the mechanism and opens a category.

#### [RUBY 4-yr OS](https://liudengzhang.github.io/conference-vaults/conferences/sgo-2026/trials/ruby-4yr-os/) — 3 min

Long-term follow-up of **dostarlimab + chemo** in advanced/recurrent endometrial cancer. dMMR subgroup hit a **73% 4-year OS rate** — a plateau pattern more often seen in melanoma than in gyn-onc. The data cement IO+chemo as the dMMR-endometrial standard and reset expectations for what "long-term" looks like outside of immunotherapy's home territory.

> 🟢 **Stop at 0:35** — you have the 2026 cancer-clinical pulse.

---

## 0:35 — bioinformatics tools (25 min)

Two community meetings that defined the year's tooling conversation.

### EuroBioC 2025 (Sep, Barcelona) — 14 min

#### [Themes & takeaways](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/themes/) — 4 min

The two big patterns of EuroBioC 2025 were **(1) spatial-omics convergence** — every other talk involved some form of spatial transcriptomics, Visium HD or Stereo-seq becoming default substrates — and **(2) cross-language interop** — the long Python/R divide is collapsing as Bioconductor classes get Python wrappers and `scverse` objects get R views. The "joint" framing (with GBCC the same year) is the operational consequence: a single tool released into both ecosystems is now table stakes.

#### [DESpace](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/despace/) — 4 min

A spatially-variable-gene / domain-specific-pattern detection method that **reframes SVG as a familiar negative-binomial GLM problem on cluster covariates**. Practically: it lets users do spatial differential expression with the same regression machinery they already use for bulk RNA-seq, instead of learning a new Gaussian-process framework. The conceptual move is the contribution — it lowers the activation energy for any wet-lab analyst with bulk-RNA experience to do spatial DE properly.

#### [SpatialData](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/spatialdata/) — 3 min

A **Zarr / OME-NGFF cross-language data framework** that holds raster images, segmentation masks, and tabular omics in a single addressable object readable from both Python (`spatialdata-py`) and R (`SpatialData` Bioconductor port). It's the substrate every modern spatial-omics tool now targets, and the bridge between Python scverse and the R Bioconductor world. If you're picking one piece of infrastructure to understand from the 2025 spatial wave, it's this.

#### [iSEE](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/isee/) — 3 min

The canonical interactive visualization citizen of Bioconductor — a Shiny app where users compose panels (UMAP, heatmap, sample-table, marker-genes) and every panel is reactively linked. The 2025 update added **S4 panel-graph composition + code extraction** so a session of clicking can be exported as reproducible R. iSEE is the model for what "interactive but reproducible" looks like in a scientific computing stack.

### GBCC 2025 (Jun, Cold Spring Harbor) — 11 min

#### [Themes & takeaways](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/themes/) — 4 min

GBCC was the first joint Galaxy + Bioconductor conference, and the meta-story is the rationale itself: as analysis pipelines get longer and more multi-language, the bench analyst increasingly wants a **GUI workflow runner (Galaxy) that wraps the Bioconductor tools they trust**. The other thread was **agentic-AI-augmented analysis** — LLM copilots that read a notebook context and propose the next step, several demos showed this working for routine differential-expression flows.

#### [plyxp](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/plyxp/) — 4 min

Mike Love's package that gives `SummarizedExperiment` objects **dplyr-style verbs** — `filter()`, `mutate()`, `summarise()` operating on rowData/colData as if they were tibbles. The bridge matters because S4 is the right object model for omics (typed, validated, multi-assay) but tidyverse is the right interaction model for the modal R user. plyxp is the example of how the two coexist without anyone having to give up their conventions.

#### [bioc-to-galaxy](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/bioc-to-galaxy/) — 3 min

An **LLM-assisted translator from Bioconductor package DESCRIPTION files to Galaxy XML tool wrappers**. Why it matters: wrapping a Bioconductor tool for Galaxy used to take a domain expert a day; this brings it down to minutes. The meta-story it carries is that LLM-assisted package translation is now a real interop primitive — the same pattern will recur for Python ↔ R, CWL ↔ Nextflow, and so on.

> 🟢 **Stop at 1:00** — you know the 2025 bioinformatics-tools landscape.

---

## 1:00 — AI / ML inflections in biology (15 min)

Two conferences where the methodological frontier moved in 2026.

### ICLR 2026 (Apr 23-27, Rio) — 9 min

#### [MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/) — 3 min

A **72k-task sandboxed code-execution gym** for medical / clinical-reasoning agents, paired with Med-Copilot-7B, a smaller model trained inside the gym. The contribution is the gym, not the model — it gives agentic-biology research a standardized evaluation surface analogous to what SWE-bench did for software-engineering agents. This is the primary agentic-AI anchor for AACR 2026's biology-agent track.

#### [Proteina Complexa](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/proteina-complexa/) — 3 min

**Atomistic protein-binder design** via flow matching over all-atom protein complexes. Headline numbers: **63.5% experimental hit rate against PDGFR** (the highest reported for any de novo binder generator), and the **first de novo carbohydrate binders** ever reported. The result reframes the binder-design field: atomistic + flow-matching is now beating both AlphaFold-Multimer-guided design and earlier diffusion-based generators.

#### [sc-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) — 3 min

A **knowledge-augmented virtual-cell benchmark** that scores sc-FMs on cell-type classification, perturbation prediction, and cross-tissue transfer with a `latent-additive` baseline as the floor. Because all the major sc-FMs (scGPT, Geneformer, scFoundation, UCE) underperform that floor, sc-Arena now operates as a **scorecard rather than a contestant** — it's the page every new sc-FM claim must clear. The right way to read it: "this is how you actually score a virtual cell."

### ISBI 2026 (Apr 8-11, London) — 6 min

#### [Mahmood pathology FM keynote](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/mahmood-pathology-fm-keynote/) — 3 min

Faisal Mahmood's keynote laid out the **three-tier pathology FM stack** the Mahmood lab has been shipping: a DINOv2-trained tile encoder (UNI / UNI2-h) on >100M H&E tiles, an attention-MIL aggregator over tiles into slide-level representations (CONCH / TITAN), and disease-specific task heads (PathChat for clinical reasoning, PathChat-DX for the FDA-Breakthrough-Designated diagnostic tool). The stack is the operational template for every pathology-FM pipeline now in serious use; if you build a pathology model in 2026 you build on this scaffolding.

#### [Segmentation FMs synthesis](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/segmentation-foundation-models-isbi/) — 3 min

A cross-paper synthesis of the **SAM-3 / MedSAM / SegVol line** — promptable medical segmentation FMs with native 3D extensions. The 2026 inflection is that these models now segment competently from a single point or box prompt across CT, MRI, and microscopy with task-specific fine-tuning measured in hours, not weeks. The implication: the segmentation-as-a-research-problem framing is largely over; the new question is how to wrap these models in clinical UIs that radiologists / pathologists will actually use.

> 🟢 **Stop at 1:15** — you have the 2026 AI/ML-in-biology map.

---

## 1:15 — brain cancer deep cut (10 min)

One meeting (AACR Brain Tumors 2026, Mar 23-25, Philadelphia) that produced the year's most coherent CNS-cancer story.

### [Monje GD2 CAR-T DIPG](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/monje-gd2-cart-dipg/) — 3 min

Michelle Monje's update on **GD2-targeted CAR-T for H3K27M-mutant diffuse midline glioma / DIPG**. The signal is the strongest pediatric CNS CAR-T result to date — durable radiographic responses in a disease whose median OS has hovered at <12 months for decades. The mechanistic story: H3K27M locks DMG cells into an OPC-like state that uniformly expresses GD2 on the surface, which is what makes the antigen targetable in a way it isn't in adult gliomas.

### [Suva glioma cell states](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/suva-glioma-cell-states/) — 4 min

Mario Suva's **four-state framework** for adult glioblastoma cellular hierarchy: astrocyte-like (AC), mesenchymal (MES), oligo-precursor-like (OPC), neural-precursor-like (NPC). The framework dictates **CAR-T antigen-escape geography** — which state escapes which antigen tells you the resistance trajectory before the trial reads out. It's the conceptual scaffold that the rest of the brain-tumor CAR-T field now uses to interpret response patterns.

### [Neuroscience of gliomas + TAM (synthesis)](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/neuroscience-of-gliomas-tam/) — 3 min

The cross-talk synthesis: glioma cells form **functional AMPAR-mediated synapses with neighbouring neurons** (Monje & others), and the tumour-associated macrophage compartment converges on a **TREM2 / SPP1 axis** that suppresses anti-tumour immunity. The two stories meet in the same tumour and explain why historic CNS immunotherapy has underperformed — both the neural circuit and the myeloid circuit have to be addressed at once. The year's most coherent mechanistic CNS-cancer story.

> 🟢 **Stop at 1:25** — you've gone deep on one disease.

---

## 1:25 — sequencing platforms (5 min)

### [Roche Axelios 1](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/roche-axelios-1/) — 5 min

Roche's **$150 / 30× duplex genome anchor**, launched at AGBT 2026 (Feb 22-25, Marco Island). The platform uses sequencing-by-expansion (SBX) — Roche's nanopore-based comeback after they exited high-throughput sequencing in 2016 — and the headline number resets the cost-per-genome conversation that had been a multi-year stalemate at $200-$600. The strategic implication: Illumina now has two credible price-point competitors (Roche at the high end of throughput, Element/Ultima at the cost floor), and the population-genomic-sequencing economics start to pencil out for projects that were marginal at the prior price.

> 🟢 **Stop at 1:30** — full speed-read complete.

---

## If you have more time (stretch picks, 30 min)

Six items that deepen specific axes if you have a follow-on session.

### [JPM 2026 themes](https://liudengzhang.github.io/conference-vaults/conferences/jpm-2026/themes/) — 5 min

The year's financial / strategic frame. The big JPM announcement was the **Lilly + NVIDIA $1B Vera Rubin compute deal** for in-house BioNeMo foundation-model training, which is the cleanest signal that pharma is moving from model-as-a-service consumption to in-house FM build. The other thread was AI-CRO consolidation (Owkin's Pathology Explorer in Claude for Healthcare, Tempus AI deals) — the AI-clinical-data play is now a category, not a one-off.

### [Element VITARI](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/element-vitari/) + [Ultima UG200](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/ultima-ug200/) — 5 min

The **$100 genome floor**. Element's VITARI (avidity sequencing scaled out) and Ultima's UG200 (mostly-throughput refresh) both target the sub-$200 / 30× regime, complementing Roche from the cost-floor side. Together they make the $100 genome a real 2026 product, not a 2030 projection — which changes what gets sequenced at population scale and what stays at exome-or-panel resolution.

### [ACMG Presidential Plenary — NBS expansion](https://liudengzhang.github.io/conference-vaults/conferences/acmg-2026/talks/presidential-plenary-nbs-expansion/) — 5 min

Newborn-screening expansion to **population-scale genomic sequencing**. The plenary made the case for adding ~100 actionable genes to NBS as sequencing cost falls — with concrete operational designs for return-of-results, parental consent, and downstream-care pathways. This is the policy interface for the $100-genome story above.

### [PSMAaddition](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/psmaaddition/) — 5 min

**Lu-PSMA-617 moves three lines earlier**, into 1L metastatic hormone-sensitive prostate cancer. The radioligand was previously a 3L+ option; PSMAaddition shows the OS / rPFS benefit when layered into the initial treatment combination. Practice implication: PSMA-PET screening at diagnosis becomes operationally necessary, not just nice-to-have.

### [sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) — 5 min

A **<1% drug-conditional adapter** layered on a frozen sc-FM backbone that gives zero-shot perturbation prediction better than the linear-additive baseline. The architectural lesson: the sc-FM backbone's representation is useful, but the perturbation task needs a small drug-conditioning head that the original pretraining never gave it. This is the "small-team build pattern" of 2026 — keep the FM, add a thin specialized head.

### [DeeDeeExperiment](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/deedeeexperiment/) + [Tidyomics](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/tidyomics/) — 5 min

The **data-class evolution for Bioconductor**: DeeDeeExperiment generalizes SummarizedExperiment for differential-expression workflows, and tidyomics gives tidyverse verbs to the major omics classes. Together they're the answer to "what does Bioconductor look like in 2030?" — typed S4 underneath, tidyverse fluency on top.

---

## Or pivot to a scaffolded vault

If you want to follow an upcoming meeting:

- **May 26-29**: [RECOMB 2026](https://liudengzhang.github.io/conference-vaults/conferences/recomb-2026/) — methods / algorithms
- **May 29-Jun 2**: [ASCO 2026](https://liudengzhang.github.io/conference-vaults/conferences/asco-2026/) — biggest oncology readout of the year
- **Jun 11-14**: [EHA 2026](https://liudengzhang.github.io/conference-vaults/conferences/eha-2026/) — European hematology
- **Jun 13-16**: [ESHG 2026](https://liudengzhang.github.io/conference-vaults/conferences/eshg-2026/) — European human genetics (same week as EHA)

---

## How this was curated

The speed-read picks favour (1) **practice-changing or class-defining results**, (2) **tools likely to recur across multiple 2026 vaults**, and (3) **the cross-vault stories** (cancer-clinical pulse, bioinformatics-tools evolution, AI/ML-in-biology inflection). Each section is sized to land at a natural stopping point so you can quit early without losing the through-line. The rewrite into inline-TL;DR form (May 2026) is meant to make this a page you actually finish, not a table of contents you bounce off of.

Comprehensive coverage lives in the conference vaults themselves — this page is the optimized path for the 90-minute reader.
