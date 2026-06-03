---
title: 'outcome-first — parpi response with HRD as a feature, not a filter'
date: '2026-06-03'
topics:
  - hrd
  - pan-cancer
  - cate
  - mixture-of-experts
  - parpi
  - model-design
  - reframe
summary: 'a sharper reframe of the parpi-response model — treatment, not HRD, defines the cohort. HRD becomes one input feature among many, and HRD-negative responders become recoverable.'
starred: true
---

# outcome-first

A reframe of the previous blog ([[one-model-many-archetypes]]). That blog took **HRD as the cohort entry**: HRD-positive patients in, predict who responds to PARPi. This blog says: don't enter through HRD at all. Enter through the **treatment** — everyone who got PARPi — and let HRD become one of many input features whose contribution the model has to estimate.

Same model skeleton (multi-modal MoE on a joint patient embedding + DragonNet-style CATE head). Different cohort definition, different framing of the biology, sharper falsifiability.

## concept

The cohort is **anyone treated with PARPi**, anywhere — PDO, PDX, trial — with HRD status not used as a filter. The label is response: ΔlogIC50 for PDO, Δtumor-volume AUC for PDX, ordinal CR/PR/SD/PD for trials. The features include the HRD-scorer concordance vector (HRDetect, CSI-HRD, CHORD, scarHRD all as inputs), plus every other axis (immune state, replication-stress tolerance, antigen presentation, stromal niche, CCR8/eTreg load). The model learns response biology from the treatment label without privileging HRD as the entry point.

In one sentence: **the question is no longer "do HRD+ patients respond?" but "given that someone got PARPi, what predicts whether they respond — and how much of that is HRD?"**

## why this is sharper than the previous framing

Three reasons.

**1. It sidesteps the HRD-definition problem.** HRDetect ≠ CSI-HRD ≠ CHORD ≠ scarHRD; the disagreement is real, and the "right" HRD score is unsettled. Outcome-first makes all four inputs to the model — let it weight them in context. No single scorer is privileged. The disagreement is no longer a problem to solve before training; it becomes signal *for* training.

**2. It lets HRD-negative responders surface.** If we filter to HRD+ before training, by construction we cannot find PARPi responders who are HRD-negative — even if they exist. There is suggestive evidence they do: BRCAness phenotypes without classic genomic scar, replication-stress-tolerant tumors, IFN-driven responders. Outcome-first leaves room for them.

**3. It maps directly onto PDO/PDX where treatment is unbiased.** In humans, PARPi is prescribed mostly to HRD+ patients — selection bias on treatment is severe. But in PDO/PDX screens, **every line gets dosed with PARPi regardless of HRD status.** That is the structurally unbiased source. Outcome-first makes that source primary, not supplementary.

## hypothesis

PARPi response is driven by a small number of biological archetypes. HRD signal — under whichever scorer you trust — is the strongest single predictor among them, but not the only one. The other axes (IFN state, antigen presentation, CCR8/eTreg load, replication-stress tolerance, stromal access) contribute variance that the HRD score alone cannot capture. The MoE gating recovers these archetypes; the CATE head estimates per-patient treatment effect.

A specific prediction: the model will identify **at least one HRD-negative, PARPi-responsive archetype** in PDO/PDX data, and that archetype will be partially recoverable in trial cohorts where omics are accessible.

## what this reframe enables

Three discoveries the HRD-first version structurally couldn't make:

1. **HRD-negative responders.** Patients currently not offered PARPi who would benefit. This is clinically actionable on its own — it expands the eligible population rather than narrowing it.
2. **HRD-positive non-responders.** Within the HRD-enriched trial population, who is going to fail and shouldn't get the drug? The HRD-first model could only stratify "HRD strong vs weak"; this one separates response archetypes within HRD+.
3. **Mechanistic decomposition of HRD.** If the model says HRD score and IFN signature both predict response but along different routing branches, that is a falsifiable mechanistic claim: there are two paths to PARPi sensitivity, not one with HRD as the universal gate.

The downstream PARPi + anti-CCR8 trial-eligibility schema still works — anti-CCR8 routes to the dHpC-like archetype — but now that archetype is an **emergent** call from the gate, not a pre-defined HRD-stratum split.

## data — same five layers, different role

Same five-layer plan as [[the-five-layer-dataset-plan]]. What changes is the role each layer plays.

**Layer 1 — HRD definition.** No longer the cohort gate. HRDetect, CSI-HRD, CHORD, scarHRD each produce a score per sample; all four enter as a concordance vector. Discordance among them becomes informative input, not a labeling problem.

**Layer 2 — discovery atlas (TCGA, HMF, CPTAC, sc-atlases, spatial).** Self-supervised pretraining of encoders. The patient embedding learns representation from the full pan-cancer multi-omic distribution, before any treatment label is touched.

**Layer 3 — genetic perturbation (Replogle, DepMap, CCLE, LINCS L1000, PRISM).** More central under this framing. Replogle sgHR-gene + DepMap PARPi sensitivity + LINCS PARPi profile give cell-autonomous PARPi-response signal across HRD-positive **and** HRD-negative cell lines. The HRD-negative responsive lines are the discovery target.

**Layer 4 — functional response (PDO + PDX).** This is now the **primary training source** for supervised CATE. PARPi vs vehicle is the contrast; HRD status is not a filter. Sources: Kopper 2019, Hill 2018, Tiriac 2018, Driehuis 2019, van de Wetering 2015 for PDO; PDMR, EurOPDX, Xeva, HCMI for PDX. Every line with PARPi-vs-vehicle data, regardless of HRD score.

**Layer 5 — clinical response (PROfound, MAGNITUDE, OlympiAD, OlympiA, SOLO-1, ARIEL3, NOVA).** Held-out validation, with an explicit acknowledgement: these cohorts are HRD-enriched by trial design. They validate response prediction *within* the HRD-enriched stratum — which is most of what real-world PARPi prescribing looks like — but they do **not** validate non-HRD responder discovery. PDO/PDX does that.

## model — same skeleton, two structural shifts

Architecture is unchanged from [[one-model-many-archetypes]]:

```
                            inputs (any subset present)
                                       │
            ┌──────────────┬───────────┼───────────┬──────────────┐
            ▼              ▼           ▼           ▼              ▼
        genomic         bulk RNA     sc-RNA      spatial       clinical
        encoder         encoder      encoder     encoder       encoder
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
                  └─────────┼─────────┘
                            ▼
                    CATE head (DragonNet-style)
                    τ(z) = E[Y | T=1, z] − E[Y | T=0, z]
```

Two structural shifts from the HRD-first version:

1. **HRD score is one of many input features**, not the cohort filter. The four HRD scorers form a concordance vector inside the genomic encoder, sitting alongside HR-gene mutation status, copy-number alterations, mutational signatures, and the rest.
2. **Cohort definition is treatment-defined**, not biology-defined. Every PDO/PDX line dosed with PARPi enters Stage 2 supervised training. Every trial patient who received PARPi enters Stage 3 validation. No HRD pre-filter at any stage.

A consequence: the propensity head π becomes more important here than in the HRD-first version, because the PARPi-treated population in trials is not random — it is HRD-enriched by prescribing pattern. π(z) explicitly models that selection; the DragonNet structure adjusts for it.

## training stages

Stages are the same three from [[one-model-many-archetypes]] — SSL pretrain → supervised CATE → trial-held-out validation — but the cohort definition at each stage is now treatment-based, not HRD-based. Specifically:

- **Stage 2** is the main place the outcome-first reframe shows up. Every PDO/PDX line with PARPi-vs-vehicle data enters training, regardless of HRD score. HRD is just one feature the gate can read.
- **Stage 3** is where the selection-bias caveat lives. Trial cohorts validate the model **within the HRD-enriched stratum**. Performance on this stratum tells us whether the model is better than HRDetect-alone for the population PARPi is actually prescribed to today.

## falsifiability — sharpened

The previous blog's three falsifiability tests still apply (MoE collapse, trial CATE non-correlation, missing dHpC/dCpH split). The outcome-first reframe adds a fourth, more demanding one:

**4. No HRD-negative responsive archetype found.** If the gate routes every PARPi-responsive patient/line to an HRD-feature-dominant archetype, with no separable HRD-negative responder group, then the outcome-first reframe bought nothing: HRD really is the gate, and the HRD-first version was sufficient. This is the test that decides whether the reframe was worth doing.

## what I actually think

The outcome-first reframe is the right scientific framing. HRD as cohort filter is a category error: we don't know how to define HRD reliably, so filtering by it imports the disagreement among scorers into our cohort. Treatment is unambiguous — either someone got PARPi or they didn't.

But there is a real practical caveat. **The non-HRD-treated human population is small and biased.** Patients without HRD who got PARPi are typically refractory, off-label, or in expanded-access — they are not a representative sample of "non-HRD patients dosed with PARPi at random." So HRD-negative responder discovery is structurally going to come from PDO/PDX, not from humans. Trial cohorts will mostly tell us about prediction *within* the HRD-enriched stratum.

That is fine — it just means PDO/PDX move from "Stage 2 of training" to **the structural center of the project**. Trial cohorts validate within their slice of the world; PDO/PDX validate the part of the world the trials never sample.

The naïve question was "can we build one model?" The first answer was MoE + CATE. The sharper answer is: MoE + CATE, with **treatment as the cohort definition and HRD as a feature, trained PDO/PDX-first, with trial cohorts as in-stratum validation and PDO/PDX as out-of-stratum discovery.**
