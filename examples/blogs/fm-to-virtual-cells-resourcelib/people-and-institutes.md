---
title: Who is actually building the virtual cell — people and institutes to follow in 2026
date: '2026-05-17'
topics:
- people
- institutes
- virtual-cell
- foundation-model
summary: A field map of the labs, institutes, and companies whose 2025–2026 output sets the agenda for virtual cells — organised by what each one actually ships, not by reputation.
starred: true
---

> *Companion to the [foundation-models state-of-play](foundation-models-state-of-play.md) and the [evaluation-papers catalog](evaluation-papers-catalog.md). Same corpus, different cut: this is "who" rather than "what." Read this first if you want to know which Twitter accounts, lab pages, and substacks to follow; read the others if you want the method-level synthesis.*

## How this list is organised

Three buckets, by what the group *ships* — not what it advertises.

1. **Academic anchors** — labs whose papers and benchmarks structure the field's conversation. You read them to know what the next benchmark, critique, or category is.
2. **FM-shipping institutes** — non-academic-publication groups whose primary artefact is a model checkpoint, a dataset, or a competition. You read them to know what the next default substrate is.
3. **Industry players** — companies whose primary artefact is a commercial product, a regulatory filing, or a strategic move. You read them to know what is going to be defensible in 2027.

Each entry leads with one line on *what makes them load-bearing in May 2026* — not a CV summary. Items link to per-entity dossiers in the resourcelib where one exists.

---

## Academic anchors

### Charlotte Bunne — EPFL → Lausanne / Geneva University Hospital partnership

Bunne is the field's clearest current voice on **virtual patients** as the operational target — not virtual cells in the abstract. Her [Cell 2024 perspective with a large multi-institution group](https://www.cell.com/cell/fulltext/S0092-8674(24)01044-X) is the most-cited north-star definition of an AI virtual cell, and the AACR 2026 ED03 plenary (covered in [the AACR-2026-digest blog](aacr-2026-digest.md)) was effectively her current research programme presented live: multimodal H&E + spatial-proteomics foundation model, in-silico perturbation on the Swiss supercomputer, active-acquisition ("EchoK") on top. Read her group when you want to know what the *integrated* virtual-cell stack is supposed to look like end-to-end.

### Aviv Regev's group — Genentech (formerly Broad)

The Regev-side framing is reference-mapping rather than from-scratch simulation: build atlases dense enough that any new query cell or perturbation can be located against them ([Rood, Regev et al. 2024](https://www.cell.com/cell/fulltext/S0092-8674%2824%2901143-2)). Regev is also operationally important because she sits inside Genentech with budget — her group's bets shape how pharma actually operationalises atlas-style thinking, which is more constrained than the public preprint posture suggests. Pair with Bunne to see the two canonical thesis statements of 2024 that the rest of the field is still arguing with.

### Fabian Theis — Helmholtz Munich + TUM

Theis is the most interesting "inside the tent" voice because his 2026 Cell Systems perspective ([Theis et al. 2026](https://www.cell.com/cell-systems/abstract/S2405-4712%2826%2900042-X)) is an explicit pivot away from scaling monolithic sc-FMs and toward **modular, mechanism-aware components**. He was an early sc-FM proponent (scVI, scANVI, scArches all came out of or alongside his ecosystem), which makes the concession to the reckoning literature land harder. The Theis lab page is one of the highest-signal subscriptions if you want to know which way the European sc-FM consensus is moving.

### Mahmood Lab — Harvard / BWH / MGB

Faisal Mahmood's group is the centre of gravity for **pathology foundation models**: UNI, UNI2-h, CONCH, TITAN, PathChat, PathChat-DX (FDA Breakthrough Device, Jan 2025). The lab's distinctive feature is range — model releases, clinical-benchmark papers, and regulatory work all from the same team, with a steady cadence of Nature-family outputs. Follow them for the pathology vertical specifically; their work is the closest thing to a "complete FM-to-clinic pipeline" in the academic literature.

### Bo Wang Lab — Vector Institute / University of Toronto

Wang's group defined the sc-FM category with scGPT and has been the central reference point ever since. The interesting 2026 move is X-Cell, an agentic wrapper around the sc-FM stack — a bet that the next gain comes from tool-using agents orchestrating analysis end-to-end rather than scaling scGPT further. Watch this group to see whether the "agentic-after-FM" pattern actually delivers on tasks where bare sc-FMs underperformed in the 2025 reckoning.

### Constantin Ahlmann-Eltze + Wolfgang Huber — formerly EMBL Heidelberg

The authors of the **single most consequential evaluation paper in the field's recent history** — the 2025 result showing that simple linear baselines match or beat scGPT and Geneformer on perturbation prediction. Ahlmann-Eltze has since moved to **Isomorphic Labs**, which is itself a load-bearing signal: the field's sharpest sc-FM critic is now inside DeepMind's commercial drug-discovery arm. Follow what they publish next, because it tells you which benchmarks the post-reckoning literature is going to converge on.

### Serena Yeung-Levy — Stanford Biomedical Data Science

Yeung-Levy's group is currently the most interesting bet on **flow matching as the primitive** for distribution-to-distribution perturbation modelling (CellFlux, CellFlux V2 at 11.6M images). She is also the principal voice for **VLM-based scientific reasoning benchmarks** in biology (MicroVQA, BioMedICA), which is a different bottleneck from the FM-training bottleneck and one that the rest of the field is mostly ignoring. Two distinct research programmes, both load-bearing.

### Michael Moor — ETH Zurich

Moor's lab is the cleanest **agentic-AI-for-medicine** voice in the academic landscape, anchored by MYRIAD (6M-entry structured medical QA atlas) and process reward models that verify each reasoning step. His framing — that medical agents fail for two distinct reasons, unstructured grounding *and* unverified reasoning — is the most explicit decomposition of the agentic-AI problem in current circulation. Follow when the LLM-agent wave hits diagnostics.

### Leskovec + Quake — Stanford / SNAP

Jure Leskovec and Steve Quake's joint output is the highest-output graph-and-physics-aware single-cell programme in academia. Their relevance to the virtual-cell agenda is the structural-prior side: where Bunne and Yeung-Levy push representation-learning scale, this group pushes mechanistic priors and graph structure into the substrate. The combination of Quake's wet-lab and instrumentation perspective with Leskovec's graph-ML side gives them a distinct angle.

---

## FM-shipping institutes

### CZI / CZ Biohub / Virtual Biology Initiative

The Chan Zuckerberg infrastructure — CZI as the funder, the [CZ Biohub Network](https://chanzuckerberg.com/science/programs-resources/virtual-cells-initiative/) as the wet-and-comp arm, the [Virtual Cells Initiative](https://chanzuckerberg.com/science/programs-resources/virtual-cells-initiative/) as the umbrella — is the **single most important non-academic organisation in the field**, because it controls the substrate. CELLxGENE is the default cell-atlas data layer; the Virtual Cell Challenge ([VCC 2025 launch](https://virtualcellchallenge.org/), Cell paper) is the field's first community benchmark with held-out evaluation. Biohub also ships its own models (TranscriptFormer, rBio), which means the same organisation runs the benchmark, the substrate, and an in-house entrant — a dual role worth tracking. Key people to follow: Priscilla Chan (CZI), Theofanis Karaletsos, Steve Quake, Angela Pisco (Biohub).

### Arc Institute

Arc is the largest non-DeepMind academic-style compute platform in biology FMs — roughly 2,048 H100s — and ships open-weight models that university groups simply cannot match: **STATE** (perturbation), **Evo / Evo 2** (genomic FM, 7B+ params, ~6×10²³ FLOPs), and the **Tahoe-100M** dataset in collaboration with Tahoe Therapeutics and CZ Biohub. Patrick Hsu and Hani Goodarzi are the names to know. Arc has restructured the field by being the only credible group operating at hyperscaler compute scale outside the for-profit AI labs while shipping open-weight in a way the hyperscalers do not.

### EvolutionaryScale

The Meta-protein-language-model spinout that ships **ESM-3** (Science 2025, 98B params, ~10²⁴ FLOPs disclosed). The transparency on compute is rare — DeepMind, Recursion, and most pathology vendors do not disclose training cost — which makes ESM-3 the calibration point against which other protein-FM compute claims can be sanity-checked. Open-weight side of the field's open-versus-closed split.

### Isomorphic Labs

The DeepMind drug-discovery spinout inheriting AlphaFold / AlphaProteo / AlphaMissense and the new **AlphaGenome** (Nature 2026, 25/26 variant-effect wins). Closed-weight, hosted-API posture — the structural opposite of Arc. The recent hire of Ahlmann-Eltze (see above) signals that Isomorphic intends to build internal evaluation capacity at the level of the field's sharpest critic.

### Calico

Calico's Borzoi is the genomic-FM contribution that is most-cited in the post-Enformer literature, and the group continues to ship at a steady cadence even as the headlines have moved to AlphaGenome and Evo 2. Calico-the-organisation also matters as one of the few labs explicitly chartered for aging/longevity, which is a long-horizon downstream consumer of virtual-cell methods rather than a methods contributor — useful to track for that reason.

### CellxGene / Human Cell Atlas

Two overlapping consortia worth following as one: the **Human Cell Atlas** (Sarah Teichmann, Aviv Regev, John Marioni, others) supplies the multi-tissue reference data; **CELLxGENE** (CZI) is the substrate that operationalises it. The HCA produces the canonical atlases; CZI runs the engineering. Every Tahoe-100M, every SC-Arena, every Virtual Cell Challenge run depends on data that flows through one or both.

### Microsoft Research + Providence (Prov-GigaPath)

The Microsoft-Providence partnership produces Prov-GigaPath (Nature, July 2024) — the largest publicly-disclosed pathology-FM training set as of mid-2024, with the unusual feature of being a direct hospital-health-system partnership rather than a vendor / academic combo. Useful as the template for how a hyperscaler-plus-payer collaboration ships clinical-FM work.

### BioMap Research + MBZUAI

The Chinese/UAE-axis player most worth tracking for virtual cells: **xVERSE** is a transcriptomics-native sc-FM with serious compute behind it, and **VCHarness** (the autonomous virtual-cell builder) is one of the more ambitious agentic-bio entries published in 2025-2026. BioMap is also one of the few non-Western groups shipping at this scale; follow for a non-CZI / non-Arc perspective.

---

## Industry players

### Paige.AI + MSK (Thomas Fuchs)

Paige received the **first FDA 510(k) clearance for a general-purpose pathology foundation model** in January 2025, with the Virchow model family as the technical backbone. The clearance crossed the regulatory boundary before any academic FM group did — even Mahmood's PathChat-DX is still at Breakthrough Device status. Watch how the 510(k) precedent shapes treatment of subsequent pathology FMs (does each new model need its own clearance?).

### Owkin

Owkin's distinctive 2026 move is **shipping a pathology-foundation-model-backed agent inside Anthropic Claude** — the Owkin Pathology Explorer integration. This is the cleanest current example of the federated-data side of pathology AI productising into an LLM-tool layer, and it gives Owkin a different distribution surface than Paige or Mahmood. Paris/NYC dual-HQ; one of the most senior European pathology-AI teams.

### Recursion Pharmaceuticals

The largest AI-native biotech by perturbation-imaging dataset size. **BioHive-2** cluster + NVIDIA partnership give Recursion among the better-compute-resourced industrial players. The data moat is the imaging side, not the model side. Watch as the post-merger phenomics platform (Recursion + Exscientia merged in 2024) starts shipping integrated readouts.

### Insitro

Daphne Koller's company. The cleanest example of a virtual-cell-adjacent biotech run by a senior ML academic, with a model-shipping cadence that has been more conservative than Recursion's but with deeper integration into pharma partnership pipelines. Watch for clinical-stage candidates rather than headline model releases.

### Cellarity

The Flagship-incubated company that bets specifically on **cell-state representations as the drug-discovery substrate**. Less compute than Recursion, less academic visibility than Insitro, but the conceptual framing — model cell states, find compounds that move states in desirable directions — is the cleanest fit to the virtual-cell agenda among the venture-backed biotechs.

### Latent Labs

UK biotech founded by DeepMind alumni, building virtual-cell FMs. Early; public detail thin. Worth watching as one of the first identifiable spinouts taking the DeepMind protein-FM playbook and applying it at cell scale, with a startup commercialisation vector that Arc (non-profit) and Isomorphic (drug-focused) do not have.

### Tahoe Therapeutics + Vevo

The two Arc-adjacent / Arc-funded startups that ship the wet-lab side of the Arc-CZ Biohub virtual-cell alliance. Tahoe is the operator behind the Tahoe-100M perturbation dataset; Vevo is the second-step "what do we do with the substrate" play. Follow Arc's GitHub to see what these two ship in tandem.

### Roche Tissue Diagnostics / NavigatorAI

The incumbent in-house pharma pathology-AI play, included here as the counter-example: where Paige, Owkin, and Mahmood are venture- or grant-funded, Roche has a deployed clinical-pathology footprint and a diagnostics business model. As the pathology vertical consolidates (Modella → AstraZeneca, PathChat-Dx → FDA Breakthrough), Roche in-house is the benchmark for what a fully integrated pharma-owned pathology-AI capability looks like.

### NVIDIA BioNeMo

Not a model-shipping organisation in the usual sense, but the **infrastructure layer** that an increasing fraction of bio-FM training runs through — including the [JPM 2026 Lilly–NVIDIA $1B AI Co-Innovation Lab](aacr-and-other-conferences-2026-virtual-cells.md). Track BioNeMo updates to know what the default training stack is going to look like in 18 months.

---

## Ecosystem and meta-orgs worth a separate mention

- **scverse** (Fabian Theis et al.) — Scanpy / AnnData / squidpy / scvi-tools. The classical-tooling substrate against which any new sc-FM has to justify itself. Even after the FM wave, the scverse-grounded baselines are the ones beating sc-FMs in evaluation papers.
- **Mostly AI / Open Problems community** (Daniel Burkhardt, Smita Krishnaswamy, et al.) — the Open Problems for Single Cell consortium runs the most-respected community benchmarks alongside SC-Arena. The "Open Problems v2" framing has become a default citation in evaluation papers.
- **Pertpy maintainers** (Lukas Heumos, Theis group) — the perturbation-analysis Python framework that has become the default substrate for perturbation-prediction evaluation tooling. Nature Methods 2025 publication moved it from "useful library" to "standard reference."
- **awesome-virtual-cell** (Liudeng Zhang, this corpus's source author) — the community-maintained virtual-cell paper / tool index. Useful as a tracking source, especially around AACR / JPM / ICLR cycles.
- **Owl Posting + Eric Topol substacks** — opinionated tracking layer for what is happening in pharma-AI commercialisation, complementary to the lab-side coverage. Read for the deal-flow and FDA / regulatory angle.

---

## How to actually use this list

A working researcher should pick **3-5 follow targets**, not 25. Suggested combinations by what you care about:

- **You care about virtual cells as a research programme** → Bunne, Theis, Regev, Arc, CZ Biohub.
- **You care about whether sc-FMs actually work** → Ahlmann-Eltze (Isomorphic), Open Problems consortium, Bo Wang, Yeung-Levy, scverse.
- **You care about pathology FMs and clinical deployment** → Mahmood, Paige.AI, Owkin, Microsoft-Providence, Roche.
- **You care about protein / genomic FMs adjacent to the virtual cell** → EvolutionaryScale, Isomorphic, Arc, Calico.
- **You care about agentic-AI applied to biology** → Moor (MYRIAD), Bo Wang (X-Cell), BioMap (VCHarness), Owkin (Claude integration).
- **You care about pharma-AI deal flow rather than methods** → Lilly + NVIDIA, AstraZeneca + Modella, Insitro, Recursion, plus Owl Posting / Endpoints for the tracking layer.

The pattern across all six combinations: **academic anchor + FM-shipping institute + industry counterpart**. That triangulation — one paper voice, one model-shipping voice, one product/regulatory voice — is what gives you the full picture in any sub-area of the virtual-cell map.
