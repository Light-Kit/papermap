---
title: Beyond AACR — what the other 2026 conferences added to the virtual-cell story
date: '2026-05-15'
topics:
- conferences
- virtual-cell
- foundation-model
- jpm-2026
- iclr-2026
- agbt-2026
summary: 2026 didn't deliver virtual cells through AACR alone. JPM set the money signal, AGBT set the substrate, ICLR set the methods, ISBI/ASCO set the clinic. A round-up of the seven conferences that mattered most.
starred: true
---

> *Companion to the [AACR 2026 digest](aacr-2026-digest.md) and the [people-and-institutes blog](people-and-institutes.md). The AACR digest covered what AACR did. This page covers everywhere else: what JPM, AGBT, ICLR, ISBI, scverse, single-cell-genomics, and the post-AACR ASCO cluster added that AACR did not.*

## The seven 2026 conferences that mattered for virtual cells

Each conference plays a different structural role. The cleanest way to read 2026 is to track all seven in parallel rather than treating any single one as authoritative.

| # | Conference | Date | What it set | Key headline |
|---|---|---|---|---|
| 1 | **JPM 2026** | Jan 12–15, SF | The money signal | Lilly + NVIDIA $1B; AstraZeneca acquires Modella AI |
| 2 | **AGBT 2026** | Feb 22–25, Marco Island | The data substrate | 10x Atera, Roche Axelios, Element Vitari, Ultima UG200 |
| 3 | **ICLR 2026** | Apr 23–27, Rio | The methods | LMRL + MLGenX + Gen² + GEM workshops; AlphaGenome, Evo 2, Generative VC paper |
| 4 | **ISBI 2026** | Apr 8–11, Athens | The imaging substrate | Pathology + spatial FM benchmarks |
| 5 | **scverse 2025** | Aug 25–28, Heidelberg | The ecosystem | Pertpy, scvi-tools v2, AnnData v0.11 |
| 6 | **Single Cell Genomics 2026** | May 10–15 GRC + Jun 10–12 Wellcome | The community | First-look CZI VCC results; CELLxGENE v3 |
| 7 | **ASCO GI / GU 2026** | Jan 8–10 / Feb 26–28 | The clinical signal | First FM-derived biomarkers in trial readouts |

The pattern: AACR was the **stage** for virtual cells in 2026, but the **substrate** (AGBT), the **methods** (ICLR), the **money** (JPM), and the **clinical proof points** (ASCO) all flowed through other venues. Treating AACR as the whole story misses the upstream pipeline that feeds it and the downstream funnel that judges it.

---

## 1. JPM 2026 — virtual cells became a pharma capital allocation question

The single most consequential JPM 2026 announcement for virtual cells was the **[Lilly + NVIDIA $1B AI Co-Innovation Lab](https://investor.lilly.com/news-releases/news-release-details/nvidia-and-lilly-announce-co-innovation-ai-lab-reinvent-drug)** (Day 1, Mon Jan 12) — explicitly framed as the largest pharma–AI infrastructure commitment ever announced at JPM, with **NVIDIA BioNeMo + Vera Rubin compute** as the substrate. The signal is less about the headline dollar number than about *where the spend goes*: dedicated GPU capacity for in-house FM development inside a top-three pharma, rather than continued reliance on academic releases or model-as-a-service vendors.

The second-most-consequential was **AstraZeneca's acquisition of Modella AI** (Day 2, Tue Jan 13) — described in trade press as the first big-pharma acquisition of an AI firm targeting multi-modal foundation models for oncology. The Day-2 framing was that AI is no longer something pharma *partners* on; it is something pharma *owns*.

Three structural changes this implies for the virtual-cell programme:

- **The "FM-shipping institute" tier is now competing with pharma in-house teams.** Arc, CZ Biohub, EvolutionaryScale, BioMap — each of them now has to argue why their open-weight release is better than what Lilly can build internally on the BioNeMo + Vera Rubin stack.
- **Pathology vertical is consolidating.** Modella → AstraZeneca, plus the [PathChat-DX FDA Breakthrough Device](https://paige.ai/) designation earlier in 2025, means independent pathology-FM startups now face an explicit M&A reference price.
- **Compliance and ROI are the live conversations.** Alex Hogan's STATus Report and Hogan Lovells on AI compliance + BIOSECURE all converged on the same framing: AI is "table stakes" and the conversation has shifted from *will you do AI* to *show us the ROI and the compliance story*.

The counter-signal worth noting: **Regeneron's George Yancopoulos** publicly questioned current AI applications in medicine on Day 4 — the conference's most prominent scientific voice pushing back on AI maximalism. Pair Yancopoulos's caution with the Ahlmann-Eltze critique line: the field's two most articulate sceptics are now inside, respectively, the largest US biotech and DeepMind's commercial spinout. The reckoning has institutional backing as well as paper backing.

For the virtual-cell agenda specifically: JPM 2026 *did not* deliver a single virtual-cell-labeled deal. There was no Cellarity acquisition, no Recursion megadeal, no Insitro IPO. The implication is that the field is not yet at the deal stage — it is still in the *infrastructure* and *acquisition-of-talent* stage. JPM 2027 is the cycle to watch for the first virtual-cell-anchored M&A or licensing event.

---

## 2. AGBT 2026 — the substrate refresh that everything else runs on

AGBT (Marco Island, Feb 22–25) is the sequencing-platform and spatial-genomics showcase, and 2026 was an unusually heavy launch year. The platforms that ship downstream of AGBT directly determine what data the virtual-cell community gets to model.

The 2026 launches that matter most for virtual cells:

- **10x Genomics Atera** — 18k-gene whole-transcriptome amplification + stackable 1k-gene panels on a single platform; instrument $495k, reagent ~$2,200/sample. Roadmap preview at AGBT; *formal launch at AACR April 2026*. This is the first 10x platform to combine the Visium-HD-style WTA breadth with the Xenium-style targeted-panel resolution in one workflow — and it directly enables the kind of multimodal H&E + spatial-transcriptomics data the Bunne / Yeung-Levy ED03 talks at AACR were arguing the field needs.
- **Roche Axelios 1** — $150 30× human genome (duplex), instrument $750k, formal launch summer 2026. The cost-per-genome floor that Element and Complete Genomics have been pushing finally reached the level where atlas-scale resequencing of perturbation experiments becomes routine.
- **Element Biosciences VITARI** — $100 genome, 10B reads/run, 3 TB output, $689k list. The price point that makes single-lab atlas-building economically possible.
- **Ultima Genomics UG200 / UG200 Ultra** — Q60 ppmSeq duplex; 162 Tb/wk on the Ultra at $1.25M. The throughput tier that hyperscaler-style atlas operations need.
- **Singular G4X Spatial Sequencer** — 500-plex RNA + 18-plex protein + H&E equivalent, ~$100s/sample. The platform that operationalises Bunne's spatial-proteomics-as-FM-substrate thesis at a price point the academic community can actually afford.
- **Bruker CellScape (spatial proteomics) + PaintScape (3D) + CosMx mouse WT** — direct competitive response in the spatial-proteomics tier; CosMx mouse whole-transcriptome + 64 proteins is the first instrument that lets the mouse-perturbation community build at-scale spatial-multimodal datasets.
- **Stellaromics Pyxa** — first 3D spatial imager; AGBT debut. The new dimension the next generation of virtual-cell substrates will need to model.

What this means for virtual cells: **the substrate is no longer the bottleneck**. The data the field told itself it needed in 2024 (cell-atlas-scale multimodal spatial, paired imaging + transcriptomics, perturbation-scale resequencing) is shipping on commercial platforms in 2026 at price points that academic labs can afford. The bottleneck moves from "do we have the data" to "do we have models that can actually exploit it" — which is exactly the framing the AACR ED03 plenary set.

---

## 3. ICLR 2026 — where the methods actually live

ICLR (Rio, Apr 23–27) is the methods venue that the AACR poster hall is downstream of. ICLR 2026 had a denser bio footprint than ICML 2026 — four explicit bio workshops plus a fifth science-FM workshop with a substantial bio subset:

- **LMRL** (Learning Meaningful Representations of Life) — foundation models for genomics, single-cell, spatial; virtual cells as the headline framing. Recurring at ICLR and NeurIPS.
- **MLGenX** (3rd edition) — "From Reasoning to Experimentation: Closing the Loop Between AI Agents and the Biological Lab" — target ID, perturbation reasoning, BRChallenge agent benchmark.
- **Gen² / Gen2** — directed evolution in protein science; engineering cellular and tissue states. First edition.
- **GEM** — proteins, ligands, nucleic acids, cells; bridging computational and experimental biology.
- **FM4Science** — problem-driven FMs for climate, materials, biology; bio subset in scope.

The three load-bearing virtual-cell results from ICLR 2026:

### AlphaGenome (Nature 2026, presented at ICLR + LMRL)

Isomorphic / DeepMind's genomic FM with **25/26 variant-effect wins** on the standard benchmark slate. The headline framing in the LMRL room was that AlphaGenome's track-prediction win effectively ends the "is in-context learning still viable for genomic FMs" debate that Evo 2 had reopened — at least until the next Evo release. Pair with the Calico Borzoi work for the full 2026 genomic-FM picture.

### Evo 2 (Arc Institute, ICLR + multiple workshops)

The Arc Institute's 7B+-parameter genomic FM, training compute on the order of 6×10²³ FLOPs, open-weight. The most credible non-DeepMind genomic FM and the one that the post-AlphaGenome literature is going to be compared against. The interesting ICLR-room debate was whether the open-weight posture survives if Isomorphic ships AlphaGenome-as-a-service at meaningfully lower cost per query.

### Generative Virtual Cells (Lewis & Zueco, Gen² workshop)

A position-and-proof-of-concept paper proposing a **co-evolutionary framework** where a virtual-cell world model and a perturbation planner jointly adapt on inner and outer timescales, with validation-gated architecture search. Differentiator vs Arc's STATE (the closest production-scale analogue) is *joint adaptation under validation gating* rather than offline training on a frozen Tahoe-100M snapshot.

The Lewis & Zueco framing — "world model + planner, jointly adapted under validation gating" — is the architecture pattern that the AACR-2027 virtual-cell vault should expect to start emerging from Cradle, Recursion, and Insitro within 6–12 months. This is the most explicit current map of where the next-generation virtual-cell systems are going.

Plus a long tail of bio-FM workshop papers across MLGenX, GEM, and LMRL — for the **multimodal foundation models** for spatial / single-cell / pathology subset specifically, NeurIPS 2025 LMRL was richer; ICLR 2026 was stronger on the **agentic-loop and generative-virtual-cell** axis.

---

## 4. ISBI 2026 — the imaging substrate for pathology FMs

ISBI (Athens, Apr 8–11) is the imaging-methods venue that anchors the pathology-FM subfield. ISBI 2026 contributed:

- Tool-track papers on **Virchow2 / Virchow2G** (now at 1.85B params; the current pathology-FM ceiling) and **UNI2-h** as the open-weight benchmark contender.
- Direct evaluations of pathology FMs on rare-disease and pediatric pathology datasets — the slice of the field that the big-cohort academic FMs systematically underperform on.
- The annual MICCAI-adjacent benchmark refresh — what every pathology-FM paper for the rest of 2026 is going to be evaluated against.

ISBI is the second-most-important conference for pathology FMs specifically (after the Mahmood lab's own Nature publications). For the virtual-cell agenda, ISBI matters because **the multimodal H&E + spatial proteomics direction that Bunne is pushing** depends on the pathology-FM stack being mature enough to act as a backbone — and ISBI is the venue that judges that maturity.

---

## 5. scverse 2025 — the ecosystem layer

scverse (Heidelberg, late August 2025; **the 2025 edition was the one that anchored the 2026 substrate story**) is the community conference for the Scanpy / AnnData / squidpy / scvi-tools ecosystem. The 2025 cohort of releases — including **pertpy** moving from useful library to Nature-Methods-published standard, **scvi-tools v2**, and **AnnData v0.11** — became the substrate that every 2026 single-cell-FM paper is evaluated through.

The interesting scverse 2025 narrative for virtual cells was the explicit framing — repeated across multiple keynotes — that **the next phase is not bigger FMs, it is better integration of FMs into the existing scverse pipeline**. This is the operational version of the Theis 2026 Cell Systems argument: instead of replacing scvi-tools with a monolithic sc-FM, treat the FM as one component the rest of the pipeline can use.

The 2026 scverse conference (Aug 25–28, location TBC) is where the first wave of "FM-as-a-component" integration tooling will land. Worth a calendar mark.

---

## 6. Single Cell Genomics 2026 — the first VCC results in the wild

The single-cell community has two parallel "Single Cell Genomics" meetings in 2026: the **GRC** (May 10–15) and the **Wellcome / Sanger** edition (Jun 10–12). Both run as relatively closed, talk-heavy meetings without poster bulk-publication, which means the substrate for this digest is later trade-press writeups rather than primary records.

Three things to watch for:

- **First-look Virtual Cell Challenge (VCC) results** from the CZI competition — leaderboard entries beyond the initial Cell-paper announcement. The VCC was framed at launch as the field's first benchmark with held-out evaluation; the GRC and Wellcome events are where the first wave of contenders will compare notes.
- **CELLxGENE v3** updates and HCA atlas releases — the substrate refresh that the next generation of sc-FMs gets trained against.
- **Bo Wang's X-Cell** and BioMap's **VCHarness** in head-to-head comparison — the two leading agentic-wrapper-around-sc-FM systems, both of which were teased at AACR 2026 but neither of which has a full head-to-head paper yet. The SCG meetings are the most likely venue for the first comparison.

---

## 7. ASCO GI / GU 2026 — the clinical-signal funnel

The two early-year ASCO sub-conferences — **ASCO GI** (Jan 8–10) and **ASCO GU** (Feb 26–28) — are the venues where AI-derived biomarker work has to go from "nice multimodal model" to "differentiated trial readout." Both 2026 editions had a noticeably increased footprint of *FM-derived biomarker* posters — not headline-grabbing, but consistent with the trajectory of pathology-FM-derived stratification scores starting to appear as exploratory endpoints in trial cohorts.

The specific pattern to watch: trials where a **pathology FM** (UNI, Virchow2, CHIEF) was used to stratify a retrospective cohort, with the AI-derived score reported alongside the primary endpoint. ASCO GI 2026 had 2-3 such readouts; ASCO GU 2026 had 4-5. ASCO 2026 main (May 29–Jun 2) is expected to have substantially more.

The broader signal: AI biomarkers are becoming a *standard exploratory analysis* in oncology trials, not just a methods story. That diffusion took ~4 years from the first PathChat / UNI publications, which is the same diffusion timeline that AlphaFold-derived target classes took to appear in clinical-pipeline disclosures. Plan for the same diffusion lag on the cell-FM side: 2030-ish for the first cell-FM-derived stratification scores in registrational trials.

---

## What ties the seven together — the virtual-cell maturity curve in 2026

A reading of all seven 2026 venues in parallel suggests the field is at a specific point on its maturity curve:

- **Substrate is solved.** AGBT 2026 shipped the platforms; the data-availability bottleneck is mostly over for everything except spatial proteomics (which AGBT also addressed at the platform tier).
- **Methods are diversifying.** ICLR 2026 hosted four bio workshops; the post-AACR-reckoning literature has moved from "scale sc-FMs" to a portfolio of approaches — flow matching, agentic wrappers, co-evolutionary loops, modular composition, mechanism-aware components.
- **Money is consolidating.** JPM 2026 marked the shift from partnership to acquisition; the pharma-AI capability is moving in-house at the largest companies.
- **Community is still pre-benchmark-convergence.** scverse and SCG 2026 reveal that the field has multiple competing benchmarks (VCC, SC-Arena, scPerturBench, Open Problems v2, PertEval-scFM) and no consensus on which is canonical.
- **Clinical readouts are early but starting.** ASCO GI / GU 2026 had the first wave of exploratory FM-derived biomarker reports; ASCO 2026 main and ESMO 2026 will be the larger-cohort tests.
- **Stage-vs-poster gap on evaluation is the open problem.** AACR's plenary speakers spent ~40% of stage time on evaluation; the AACR poster hall shipped almost nothing on it. The same pattern at SCG / scverse — the operational community is shipping capabilities; the academic community is shipping critiques; the integration of the two is the work of 2027.

The honest summary is that 2026 was the year the **virtual-cell programme stopped being a single research community** and became a **multi-venue, multi-substrate, multi-stakeholder programme** that you can no longer track by reading one journal or attending one conference. Hence this paper map.

---

## What to read next (within this corpus)

- **[AACR 2026 digest](aacr-2026-digest.md)** — the AACR-specific cut of the same story.
- **[People and institutes to follow](people-and-institutes.md)** — the field map of who is shipping at each of these venues.
- **[Foundation models state of play](foundation-models-state-of-play.md)** — the 27 FM dossiers that the 2026 venues either built on or evaluated.
- **[Why linear baselines win](why-linear-baselines-win.md)** — the reckoning-canon methodological backdrop.
- **[Evaluation papers catalog](evaluation-papers-catalog.md)** — the 11+1 evaluation papers feeding the stage-vs-poster gap.
