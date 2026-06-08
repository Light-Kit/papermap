---
title: 'one model, many archetypes — concept and design for the parpi-response model'
date: '2026-06-03 19:57 UTC'
topics:
  - hrd
  - pan-cancer
  - cate
  - mixture-of-experts
  - parpi
  - model-design
  - concept
summary: 'a single multi-modal mixture-of-experts CATE model that learns which patient archetype routes to which parpi response mechanism — concept, hypothesis, significance, and end-to-end design.'
starred: true
---

# one model, many archetypes

This is a concept note for the model that closes the chain. So far the vault has framed the pan-cancer HRD problem as a five-layer discovery → validation pipeline ([[the-five-layer-dataset-plan]]) and located the open seam ([[whats-already-out-there]]). This blog answers the harder question: **what is the single model we want to train, on what data, and why is this the right shape for the biology?**

Written in grant register. Concept, hypothesis, significance, approach.

## concept

We propose to learn the **conditional treatment effect of PARP inhibition** across the pan-cancer HRD landscape from a multi-modal patient representation, using a **mixture-of-experts (MoE) architecture** in which each expert encodes one archetype of HRD response biology and the gating network's routing serves as the interpretable biomarker output. The model is trained on PDO and PDX functional PARPi response, pretrained self-supervised on unlabeled pan-cancer multi-omic atlases, and validated on PARPi trial outcome cohorts as held-out test.

In one sentence: **the model predicts not "will this patient respond" but "which response mechanism does this patient belong to, and what is the expected effect of PARPi given that routing."**

## hypothesis

HRD-positive patients are not a single class but a mixture of archetypes that differ along several axes:

- immune state (dHpC vs dCpH — the deficient-Hot/Cold split surfaced by Hjazi 2025)
- replication-stress tolerance
- antigen presentation and HLA integrity
- stromal niche composition and T-cell spatial access
- CCR8 / eTreg load

PARPi response is determined by which archetype a patient belongs to, not by HRD status alone. A structured CATE + MoE model can recover both the archetype assignment and the patient-specific treatment effect from multi-modal features; the routing will correlate with — and partially explain — known resistance and sensitivity mechanisms.

## significance

1. **Reframes the biomarker problem.** "Who responds to PARPi" stops being a single-biomarker classification problem and becomes an archetype-routing problem, aligning model structure with the biological structure that Hjazi 2025 and Hu 2025 have already surfaced.
2. **Interpretable subgroup output usable as a stratifier.** The gate's routing distribution per patient is the deliverable — not a black-box score, but an assignment to a named archetype, suitable as a trial enrollment criterion.
3. **Closes the five-layer chain.** Layer-5 clinical perturbation needs a stratifier; this model is that stratifier.
4. **Provides the trial-eligibility schema** for the future combination trial this project is positioning toward (PARPi + anti-CCR8, with anti-CCR8 reserved for patients routed to a dHpC-like archetype).

## what data, and how to merge it

The model needs to consume heterogeneous modalities that no single cohort has all of. The merge strategy must handle missingness as the default case, not the edge case.

### inputs per patient

- **Genomic (WGS / WES / panel).** HRD scores (HRDetect as primary call; CSI-HRD, CHORD, scarHRD as supplementary inputs forming a *concordance vector*), HR-gene mutation status, copy-number alterations, mutational signatures, microsatellite status, POLE/POLD1, Lynch syndrome.
- **Bulk transcriptomic.** Pathway-summarized signatures: HRR, IFN-α/β, cGAS-STING, antigen presentation, CCR8/eTreg, T-cell exhaustion, replication stress, EMT, stromal.
- **Single-cell.** Cell-type composition vector (immune + stromal + tumor), per-compartment state markers (CD8 exhaustion, eTreg fraction, macrophage polarization, CAF subtype), tumor heterogeneity index.
- **Spatial (Visium / mIF / MIBI / Slide-seq).** Niche-level features: T-cell:tumor distance distributions, immune exclusion score, vasculature, tertiary lymphoid structure presence.
- **Clinical.** Cancer type, prior therapy lines, prior platinum exposure, BRCA germline vs somatic, age, performance status.

### merge strategy

Three options were considered:

| strategy | pro | con | verdict |
| --- | --- | --- | --- |
| early fusion (concatenate everything into one vector) | simple | high-dim, no structure, breaks on missing modality | rejected |
| late fusion (one model per modality, average predictions) | handles missing | misses cross-modal interactions (HRD × IFN, BRCAness × CCR8) | rejected |
| **intermediate cross-modal fusion** | per-modality encoders feed a joint latent, learns interactions, handles missing via masking | larger design surface | **chosen** |

The chosen design: **per-modality encoders → joint embedding via cross-modal attention → shared MoE gating → CATE head.**

Missing-modality handling: **masked-modality training.** During each training pass, each modality is dropped with probability *p* so the model learns to predict from any subset. At inference, modalities that are absent for a patient are simply masked. This is critical because TCGA gives us WGS + bulk only, single-cell cohorts give us sc only, trial cohorts give us clinical + panel only — no cohort has the full input set.

## model design

```
                            inputs (any subset present)
                                       │
            ┌──────────────┬───────────┼───────────┬──────────────┐
            ▼              ▼           ▼           ▼              ▼
        genomic         bulk RNA     sc-RNA      spatial       clinical
        encoder         encoder      encoder     encoder       encoder
         (MLP)           (MLP)     (set-attn)  (set-attn)      (embed)
            │              │           │           │              │
            └──────────────┴───────────┼───────────┴──────────────┘
                                       ▼
                            cross-modal attention
                                       │
                                       ▼
                            joint patient embedding z
                                       │
                            ┌──────────┴──────────┐
                            ▼                     ▼
                       MoE gate g(z)         shared trunk
                            │                     │
                            ▼                     ▼
                  ┌─────────┼─────────┐       propensity
                expert₁  expert₂  expert_K        π(z)
                  │        │         │
                  └────────┼─────────┘
                           ▼
                    CATE head (DragonNet-style)
                    τ(z) = E[Y | T=1, z] − E[Y | T=0, z]
```

### encoders

- Genomic, bulk, clinical: MLP with layer norm.
- sc and spatial: **set transformer / DeepSet attention** so the model is permutation-invariant over cells and over spatial niches, and can pool a variable number of cells/spots per patient.

### joint embedding

Cross-modal attention over per-modality tokens with learnable modality-type embeddings (so the joint layer knows which token came from which modality). Output: a single patient embedding *z*.

### mixture-of-experts head

K ≈ 6 experts, soft-gated. Each expert is a small MLP that models the response biology of one latent archetype. Gating is sparse (top-k routing, k=2) for interpretability — each patient is "mostly" one archetype with a secondary. The per-patient gate output is the **biomarker deliverable.**

Rationale for MoE over a single MLP: a single MLP averages mechanisms; MoE specializes them. dHpC and dCpH are exactly the case where two patients with the same HRD score have *opposite* response mechanisms, and the gating network is the structural place to encode that opposition.

### CATE head

DragonNet-style: two outcome heads μ₀ and μ₁ (response under no PARPi, response under PARPi) plus a propensity head π for adjustment. CATE = μ₁ − μ₀ per patient. This is the per-patient treatment-effect estimate.

References for this architectural family: causal forests (Athey/Wager 2018), DragonNet (Shi/Blei/Veitch 2019), TARNet (Shalit 2017), CEVAE (Louizos 2017), Bayesian causal forests (Hahn 2020), and the standard MoE line (Jacobs/Jordan 1991 → Shazeer 2017 → modern sparse MoE).

## training, in three stages

**Stage 1 — self-supervised pretraining of encoders.** Masked feature reconstruction on unlabeled pan-cancer multi-omic data: TCGA, HMF, CPTAC for bulk + genomic; CellxGene, 3CA, TISCH2 for sc; Launonen 2022 and Stur 2022 for spatial. Goal: encoders that produce stable embeddings from any subset of modalities, before any treatment label is seen.

**Stage 2 — supervised CATE training on functional response.** PDO PARPi IC50 (Kopper 2019, Hill 2018, Tiriac 2018, Driehuis 2019, van de Wetering 2015) and PDX PARPi response (PDMR, EurOPDX, Xeva, HCMI). These give a *clean functional treatment label*: same model with PARPi vs vehicle, IC50 difference or tumor regression as continuous outcome. This is where the CATE head and the MoE gating are actually trained.

**Stage 3 — held-out validation on trial cohorts.** PROfound, MAGNITUDE, OlympiAD, OlympiA, SOLO-1, ARIEL3, NOVA — to the extent omics are accessible. No fine-tuning on trial data; pure held-out test. The metric is whether the model's per-patient CATE estimate correlates with observed PFS/OS difference, and whether the archetype routing recovers known responder / non-responder subgroups.

The three stages are deliberate: Stage 1 learns the *patient representation*, Stage 2 learns the *treatment effect*, Stage 3 tests whether the two transfer to humans treated in trials.

## response label harmonization

PARPi response is not one endpoint. The harmonization scheme:

- **In vitro (PDO):** ΔlogIC50 between PARPi and vehicle, z-scored within tumor type.
- **In vivo (PDX):** Δtumor-volume AUC between PARPi and vehicle, z-scored.
- **Clinical (trial):** ordinal response — CR / PR / SD ≥ 6 mo / SD < 6 mo / PD — mapped to a continuous latent via cumulative-link ordinal regression, with PFS hazard ratio as a secondary alignment anchor.

The latent response is the model's outcome variable. This unifies the three label scales into one trainable target.

## what falls out of the model

- **Per-patient CATE estimate** (predicted PARPi benefit).
- **Per-patient archetype routing** (the gate output) — the interpretable biomarker.
- **Per-archetype response biology** — what each expert learned, recoverable by integrated-gradients on its outputs.
- **Cross-modal interaction map** — which feature pairs (e.g., HRD × IFN signature, BRCA1-mut × CCR8 fraction) drive routing.
- **Trial-eligibility schema** — predicted CATE + archetype, packageable as enrollment criteria for the PARPi + anti-CCR8 combination trial.

## what would falsify this

- If the MoE collapses (gating routes all patients to one expert), the archetype hypothesis is wrong, or the model is undertrained, or the patient embedding does not carry archetype-relevant signal.
- If trial-cohort CATE does not correlate with observed PFS difference, the PDO/PDX → human transfer has failed.
- If archetype routings do not recover the dHpC/dCpH split from Hjazi 2025, the model has not converged on biologically meaningful subgroups.

Each of these is a cheap pre-registered test, not a post-hoc concern.

## why this is the right shape

A single linear or single-MLP model would average away the very biology the project exists to find. A pure causal-forest CATE estimator handles heterogeneity but offers no interpretable latent structure. A pure clustering model finds archetypes but predicts nothing. The MoE + CATE composition gets both: archetype discovery from the gate, treatment-effect estimation from the CATE head, in one trainable object.

The naïve idea was "one model." This blog says yes — but the right one model is **mixture-of-experts CATE on a multi-modal patient embedding, trained PDO/PDX-first, validated trial-held-out.**
