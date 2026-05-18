---
title: 'Two adjacent project shapes (multicellularity FM; cross-cancer anti-PD1) and whether you can finetune on one patient'
date: '2026-05-18'
topics:
- foundation-model
- virtual-cell
- agentic
- clinical
summary: A v2-style audit of three follow-up questions — can a virtual-cell FM identify the modules that make multicellular structure possible; can a per-cancer-finetuned FM explain why anti-PD1 works on melanoma but fails on pancreatic; can you finetune a VC FM on a single patient. Three rounds of search return three honest verdicts — multicellularity needs a wet-lab moat (TranscriptFormer already covers the dry version); the cross-cancer ICI shape has already been published (COMPASS) and pancreatic specifically is data-blocked; and n=1 backbone finetuning has zero peer-reviewed evidence, with scArches reference mapping the only real n=1 move.
starred: false
---

> *Sibling to [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md) and the [101 tour of closed-loop virtual cells](closed-loop-virtual-cells-101.md). v2 evaluated the agent-loop-for-drug-response project shape; the 101 tour explained the field-level mental model. This essay evaluates three follow-up questions that came out of those — two "what about this adjacent shape?" and one "is the n=1 thing real?" Companion reading: [causal models, FMs and virtual cells](causal-models-fm-and-vc.md) for the rung-1/rung-2 framing; [why linear baselines win](why-linear-baselines-win.md) for the empirical reckoning; [small labs v2](small-labs-what-to-build-v2.md) for the wedge taxonomy; [clinical and agentic clinical](clinical-and-agentic-clinical.md) for the adjacent clinical-agent work.*

## The three questions

After the v2 verdict — *agent + VC FM + iterative adapter finetune is a published 2025-2026 paradigm; defensible novelty is application + discipline, not the loop* — three natural follow-ups came up. (1) **Multicellularity FM** — could you use a VC FM to find the gene modules that *make multicellular structure possible*, by training across the unicellular-to-metazoan arc? (2) **Anti-PD1 cross-cancer** — could you finetune a VC FM per cancer type and answer the question every immuno-oncologist asks, *why does anti-PD1 work on melanoma but fail on pancreatic*? (3) **n=1 finetuning** — could you finetune a VC FM on data from a single patient and personalize it? Three rounds of literature search returned three sharp, mostly negative answers. This essay walks each.

## Question 1 — Multicellularity FM

**The honest landscape.** Two labs effectively own the comparative cell-type-evolution wedge: Sebé-Pedrós (CRG) and Tanay (Weizmann), with King and Brunet (Berkeley) holding the choanoflagellate biology. CZI has been working the FM side. Specifically:

- **TranscriptFormer** (Pratapa et al., CZI, [bioRxiv April 2025](https://www.biorxiv.org/content/10.1101/2025.04.25.650731v1)) is the closest published prior art — a generative single-cell FM trained on ~112M cells across 12 species spanning 1.53 Gyr. It includes *Spongilla* (one sponge) and *C. elegans* and yeast. It includes **zero choanoflagellates, zero Capsaspora, zero ichthyosporeans, zero placozoans, zero ctenophores, and zero cnidarians.** It is the most-adjacent-existing-FM and it explicitly leaves the pre-metazoan and basal-metazoan part of the arc empty.
- **Kim, Sebé-Pedrós et al.**, "Chromatin loops are an ancestral hallmark of the animal regulatory genome" ([*Nature* 642:1097, 2025](https://www.nature.com/articles/s41586-025-08960-w)) is the non-FM comparative-regulome version of the same question — Hi-C + ATAC + RNA across sponges, ctenophores, placozoans, cnidarians AND ichthyosporeans, filastereans, choanoflagellates. The bar to beat.
- **Dudin et al.**, *Chromosphaera perkinsii* ([*Nature* 636:102, 2024](https://www.nature.com/articles/s41586-024-08115-3)) — an ichthyosporean showing symmetry breaking, palintomic cleavage, and ≥2 cell types in colonies ~1 Gyr before animals. The wet-lab existence proof that pre-metazoan multicellularity is real.
- **Stuart, Pratapa et al.** ([bioRxiv 2025.02.19.639005](https://www.biorxiv.org/content/10.1101/2025.02.19.639005v2)) trained a universal cell-transcriptome model and *generated a virtual atlas of the extinct Tasmanian tiger from its genome alone.* The framework for ancestral / counterfactual virtual cells exists. Nobody has applied it across a multicellularity-transition boundary.
- **SATURN** (Rosen, Brbic et al., [*Nat. Methods* 21:1492, 2024](https://www.nature.com/articles/s41592-024-02191-z)) is the only demonstrated way to integrate species without 1-to-1 orthologs — the required machinery for any cross-holozoan FM.
- **Najle, Sebé-Pedrós et al.** placozoa cell atlas (4 species, ~65K cells); **Salinas-Saavedra et al.** [*Hydractinia* atlas](https://www.nature.com/articles/s41467-025-57168-z) (~200K cells); **SAMap** ([Tarashansky et al. *eLife* 2021](https://elifesciences.org/articles/66747)) for the cross-species mapping baseline; **cNMF** and **Pareto archetypes** for the geometric module-discovery baselines any FM claim must beat.

**The substrate is the killer.** Total public single-cell counts on the pre-metazoan and basal-metazoan side run roughly: choanoflagellates ~0; Capsaspora ~0 (bulk + ATAC only); ichthyosporeans very limited; sponges ~10–50K each; placozoa ~65K; ctenophores tens of thousands; cnidaria ~10⁵–10⁶. The total is on the order of 10⁵–10⁶ cells — three to four orders of magnitude below the scale UCE, scGPT, or TranscriptFormer were pretrained at. **De novo FM pretraining on this arc is not viable.** A SATURN/TranscriptFormer fine-tune is the only realistic computational path, and the missing choanoflagellate + Capsaspora atlases would have to be *generated wet-lab as part of the project*.

**Three no-go conditions:**
1. *"We identify modules X, Y, Z distinguishing unicellular vs aggregative Capsaspora."* Sebé-Pedrós 2013 *eLife* + 2016 *Cell* already did this with bulk + ATAC.
2. *"We identify ancient stem / contractile cell families across animal phyla."* SAMap (2021) + the placozoa atlas + Kim 2025 *Nature* have largely done this.
3. *"We build a cross-species sc-FM that includes one non-bilaterian."* TranscriptFormer (April 2025) does exactly this with *Spongilla*. Adding one more non-bilaterian and stopping is incremental.

**Defensible scope** — and this is the important point — is *wet+dry, not pure dry*. Generate the missing pre-metazoan scRNA atlas substrate (choanoflagellate life-cycle, Capsaspora life-cycle, ideally a second ichthyosporean), then fine-tune a SATURN/TranscriptFormer-class model on the unicellular-to-multicellular arc, then run Stuart-style generative ancestral-state and counterfactual analysis of multicellularity modules (cadherin/integrin adhesion, Notch/Wnt cross-talk, ECM, programmed cell death). **The wet-lab step is the moat.** Without it, the project reduces to "fine-tune TranscriptFormer on the data that already exists" — and the data that already exists is a *Spongilla* away from where TranscriptFormer already is.

**Verdict.** Genuinely interesting biology, but as a *dry-only* project the unfilled wedge is too narrow — TranscriptFormer plus the Kim 2025 chromatin-loops paper plus Stuart 2025's generative framework leave room only for incremental additions. As a *wet+dry* project it is genuinely novel and worth a multi-year program — but it requires a wet-lab partnership with a choanoflagellate or pre-metazoan lab (King at Berkeley; Brunet now at Geneva; Sebé-Pedrós at CRG; Ruiz-Trillo also at CRG) that the user does not currently have. Without that partnership, this is not the next project.

## Question 2 — Anti-PD1 cross-cancer

**The honest landscape.** The space is more crowded than the question first suggested.

- **COMPASS** (Wang et al., Harvard + Roche, [medRxiv 2025.05.01.25326820 v3](https://www.medrxiv.org/content/10.1101/2025.05.01.25326820v3)) is a concept-bottleneck transformer FM, pretrained on **10,184 tumors across 33 cancer types**, fine-tuned on **16 ICI cohorts spanning 7 cancers and 6 ICI regimens**. It beats 22 baselines including TIDE, PD-L1, and TMB. **This is the exact project shape, already published.** Anyone reviewing a "cross-cancer FM for ICI response" proposal will land on COMPASS in their first ten minutes.
- **CURE AI** (AACR 2025 abstract B011) already demonstrates the cross-cancer-transfer story (lung ↔ ccRCC bidirectional).
- **Bagaev MFP** (*Cancer Cell* 2021), **Litchfield et al.** (*Cell* 2021, pan-cancer ICB), **easier**, **TimiGP-Response**, **IKCScore**, **IRNet**, **NetBio**, **DeepGeneX**, **Tres**, **scCURE**, **TNBC-ICI**, **PRECISE** — at least nine benchmarked FM/ML-based ICI predictors with cross-cancer or per-cancer scope already exist.
- The independent benchmark ["Deconstructing biomarker generalisation failure..."](https://pmc.ncbi.nlm.nih.gov/articles/PMC12699758/) (2025) shows **all 9 SOTA ICI-response models perform near chance on direct cross-cohort transfer.** The real unsolved problem is *transportability*, not *prediction within one cohort*.
- **TIDE** (Jiang/Liu *Nat Med* 2018 + updates), **IMPRES** (Auslander *Nat Med* 2018), **MFP**, **IPRES** are the published bars; AUCs typically 0.65–0.75 on melanoma cohorts.
- Per-cancer paired-patient counts in the published pre/on-treatment scRNA cohorts (Sade-Feldman 2018/2025, Bi RCC, Yost SCC, Zhang HCC, Bassez breast, Jerby-Arnon melanoma): melanoma ~150–200, NSCLC ~80–150, breast/RCC/GBM borderline, **pancreatic <20 paired patients with response labels** — because *anti-PD1 single-agent response rate in pancreatic is near zero* outside the MSI-H subset (which is <1% of pancreatic cases).

**Why pancreatic specifically is data-blocked.** You cannot fine-tune a model to discriminate "responder vs non-responder" if the data contains essentially no responders. The honest pancreatic answer — *the response rate is structurally near zero because pancreatic tumors are cold, fibrotic, and exclude T-cells* — is biology, established by Hingorani, Tuveson, Bardeesy. It is not a model output. Asking an FM "why does pancreatic fail" reframes a wet-lab biology question as a computational question that the available data cannot answer.

**Three no-go conditions:**
1. *"FM for cross-cancer ICI response prediction."* COMPASS is already that.
2. *"Beat TIDE on a single melanoma cohort by training a transformer."* Done many times; doesn't move the needle.
3. *"Per-cancer fine-tune + agent picks next cohort."* If the loop wraps only existing scRNA cohorts, it is a CellForge re-skin (see the [101 tour](closed-loop-virtual-cells-101.md) for what CellForge already does).

**Defensible scope** — pathology-FM (Virchow2 or UNI2) cancer-type-conditioned ICI predictor under **leave-one-cancer-out (LOCO) evaluation**, with a CellForge or Biomni-style agent picking the next cohort to add. Rationale: H&E is universal (works on pancreatic, MSS-CRC, GBM where scRNA-seq cohorts are thin); the cross-cancer pathology-FM ICI angle is largely untouched (COMPASS is bulk transcriptomic); and LOCO is the evaluation the field is converging on as the honest test of cross-cohort transportability — the real unsolved problem the independent benchmark above named.

**Verdict.** Strictly stronger than the HER2+ gastric shape evaluated in v2 — bigger trial substrate, broader clinical surface, cleaner cross-cancer framing. But the obvious version (FM + per-cancer fine-tune + cross-cancer comparison) is COMPASS; the pancreatic framing is data-blocked; the defensible niche is *pathology-FM under LOCO*, not transcriptomic-FM head-to-head with COMPASS. If pursued, the project ships as "first pathology-FM cross-cancer ICI predictor under leave-one-cancer-out" — narrower than v1 of the question, but the only one a small team can defensibly own.

## Question 3 — Can you finetune a VC FM on one patient?

**Honest answer — mostly no, with one important exception.**

Three regimes have to be kept apart:

- **(a) Reference mapping / projection.** scArches ([Lotfollahi et al. *Nat Biotech* 2021](https://www.nature.com/articles/s41587-021-01001-7)) projects a single new sample into a reference latent space. Backbone frozen; only a small projection head is updated. Trainable parameters drop 4–5 orders of magnitude. Disease-specific variation (COVID-19 BAL was the published demonstration) is preserved. **This is the only n=1 move that has peer-reviewed validation.**
- **(b) Head-only finetuning with patient labels.** Works when labels exist, but this is really a cohort-trained head queried per patient — the Tempus IPS / PurIST pattern. The "n=1" is the *inference*, not the training. Calling this "n=1 finetuning" is misleading.
- **(c) Backbone or adapter weight updates for predictive shifts at n=1.** Zero peer-reviewed evidence. scPEFT, PertAdapt, scDCA all validate on multi-donor or multi-cell-line cohorts. The smallest scPEFT experiment is still multi-donor. The general LLM PEFT literature says PEFT needs ≥32–100 labeled examples per class to beat in-context learning; below ~10–30 examples without strong regularization (EWC, KL-to-base, orthogonal projection), finetuning *actively degrades* base-task performance.

**What "one patient's data" really means.** 10K–100K scRNA cells from one biopsy = n=1 from the model's perspective — one batch, one disease context, one technical replicate. WSI tiles within a slide are spatially correlated and do not count as independent samples. Longitudinal bulk RNA-seq across treatment timepoints is the most n=1-friendly modality because it gives within-patient temporal contrast. Multimodal concatenation does *not* multiply n.

**If you insist on n=1 finetuning in the anti-PD1 context**, the literature-supported recipe is:
1. **Reference-map** the patient's biopsy with scArches into a published responder atlas (Sade-Feldman / Jerby-Arnon / Bassez).
2. Use the FM *frozen* as a feature extractor + a *cohort-trained* logistic or GBM head.
3. If you absolutely must update weights, **LoRA r≤8 on the last 1–2 blocks** + KL-to-base + EWC penalty, capped at <1% trainable params.
4. Validate on a *within-patient* held-out sample — a second biopsy, a later timepoint — not on the same biopsy.
5. Pre-register the comparison against frozen-FM + cohort head.
6. Do not update the full backbone. Do not report training-set AUC. Do not claim "clinically meaningful" without repeated within-patient measurements (Woodcock 2024 N-of-1 framework, [*Nat Commun*](https://www.nature.com/articles/s41467-024-54077-5)).

**Verdict.** The defensible publishable framing is *"scArches projection + frozen-FM features + cohort-trained head; within-patient longitudinal embedding shifts correlate with response,"* **not** *"we finetuned scGPT on one patient."* The latter has no published precedent and a non-trivial literature on why it will fail (catastrophic forgetting, distribution collapse, base-task degradation at small n). n=1 personalization is real — just not where the question first put it.

## The pattern across all three

Same pattern as v2. **Architectural novelty is gone in each case.** The dry FM piece of multicellularity is held by TranscriptFormer; the cross-cancer FM piece of ICI is held by COMPASS; the backbone-finetune-on-n=1 piece simply does not exist as a peer-reviewed move. What is defensibly left in each case lives *upstream of the model*:

- Multicellularity → the missing pre-metazoan scRNA atlas (wet-lab work).
- Anti-PD1 cross-cancer → leave-one-cancer-out on the universal-modality (pathology) substrate.
- n=1 personalization → the reference atlas and the within-patient longitudinal sampling design.

The moat is the data substrate and the evaluation discipline, not the loop. This is the same conclusion v2 reached for the HER2+ gastric shape, and it generalizes: **in 2026 closed-loop virtual cells, the loop is commodity and the substrate is the moat.**

## What to actually do next

Of the three adjacent shapes, only one is pursuable by a small team without a wet-lab partner: **the pathology-FM cross-cancer ICI predictor under leave-one-cancer-out**, with a CellForge-style agent driving cohort acquisition. The multicellularity FM is genuinely novel but the moat is wet-lab atlas generation that requires a Berkeley/CRG/Geneva collaboration. n=1 backbone finetuning is a no-go; n=1 reference mapping is real but not a project on its own — it is a *module* inside whatever larger project you build. None of this contradicts v2; it sharpens it. The v2 verdict said "application + discipline." This essay says the same in three more contexts.

---

*Last updated 2026-05-18.*
