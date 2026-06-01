---
title: 'Thread 3: CCR8 and the effector-Treg target — why this is the right knob, and where the antibody race is'
date: '2026-05-29'
topics:
- ccr8
- treg
- immunotherapy
- tumor-microenvironment
- pan-cancer
summary: 'A decade of "deplete the Tregs" failed because every Treg-depleting antibody also hit peripheral Tregs and triggered autoimmunity. CCR8 changed the calculation — selectively expressed on tumor-infiltrating effector Tregs, near-absent on peripheral Tregs and conventional T cells, so depleting it should leave the systemic immune system alone while removing the local suppressor. Four clinical antibodies are in phase I — CHS-114, LM-108, GS-1811, FG-3165 — and all four are being combined with anti-PD-1. None with PARPi. That gap is the project''s opening.'
---

The history of "deplete the Tregs" is the history of why it never worked. Anti-CD25 antibodies hit peripheral Tregs and effector T cells equally. Anti-CCR4 hit too broad a Treg population and broke peripheral tolerance. Anti-CTLA-4 (ipilimumab, when used at depleting doses) had Treg-depleting effects but also generalized irAEs because CTLA-4 isn't a Treg-exclusive marker. The pattern was: every target broad enough to remove tumor-infiltrating Tregs was broad enough to break systemic tolerance.

CCR8 is the first target where the calculation looked different. Selectively expressed on **tumor-infiltrating effector Tregs**. Near-absent on peripheral Tregs. Near-absent on conventional T cells. If you deplete CCR8⁺ cells with an ADCC-competent antibody, you take out the local suppressor and leave systemic tolerance intact. The OncoImmunology 2022 paper from the Gilead group made this argument explicit using TCGA — a target screen across solid tumors showing CCR8 as the cleanest intratumoral-Treg-specific candidate.

Five years later, this is a clinical question. CHS-114 (tagmokitug, Coherus, IND from Surface Oncology) has the cleanest public PD data: in HNSCC (NCT05635643) it produced **CCR8⁺Treg ↓74%** at the tumor site with **CD8/CCR8⁺Treg ratio ↑12×**, no Grade ≥3 irAEs at the doses tested. That is the selective-depletion claim, validated.

## The clinical race

Four antibodies in phase I as of mid-2026:

- **CHS-114 / tagmokitug** (Coherus, US) — most advanced public PD readout. In combinations with toripalimab in HNSCC and with multiple PD-1 backbones in solid tumors.
- **LM-108** (LaNova → Merck, China/US) — licensed by Merck for global development; combinations with pembrolizumab in NSCLC and GI cancers.
- **GS-1811** (Gilead, US) — the lineage candidate from the OncoImmunology 2022 target screen; phase I with zimberelimab.
- **FG-3165** (FogPharma, US) — newer entrant, fewer public details.

**All four** are being developed with anti-PD-1 backbones. None has a public PARPi combination program. This is not because the combination is biologically implausible — quite the opposite, given Luo 2024. It is because the antibody-development and PARPi-development tracks have proceeded in parallel without crossing, and no one has yet made the case for **which patient population** would justify opening a new combination arm.

That patient population is the project's deliverable.

## What makes CCR8 a "good" target, biochemically

Three things worth noting:

- **Restricted expression**, as above. The single-cell evidence (Zheng 2021 pan-cancer T atlas) confirms CCR8 is largely restricted to terminally differentiated, activated, tissue-resident Tregs — the effector-Treg compartment that does the most local suppression. Peripheral Tregs are CCR8-low. Naïve and central-memory CD4 are CCR8-negative.
- **Co-expression with other Treg-effector markers** — LAG3, TNFRSF18 (GITR), CTLA-4 — that together define the terminal-eTreg state. The Cell 2024 eTreg signature this project reuses (CCR8 + LAG3 + TNFRSF18 + others) captures exactly this state, which is why scoring it on bulk gives an interpretable readout.
- **Mechanism of depletion**, not blockade. Anti-CCR8 antibodies in development are ADCC-/ADCP-competent. They don't antagonize a chemokine-receptor signal; they tag CCR8⁺ cells for removal. The pharmacology is "deplete the cells that have it" rather than "block what they do."

## The per-cancer evidence is already there, scattered

The literature has documented CCR8⁺ eTreg enrichment, with TCGA support, in:

- **Lung cancer** — NSCLC TCGA + function papers, multiple groups.
- **Colorectal cancer** — TCGA + IHC; MSS and MSI-high analyzed separately (MSI-high decouples from HRD here).
- **Hepatocellular carcinoma** — TCGA; HCC is rarely HRD-high, useful as a "CCR8 enrichment without HRD" control.
- **Breast cancer** — TCGA; the canonical second-HRD cancer.
- **Bladder cancer** — TCGA; high-mutation/IO-responsive, another control for "immunogenicity ≠ HRD-driven."
- **Ovarian (HGSOC)** — the Luo 2024 anchor.

What the project does that no individual per-cancer paper has done is **systematize this across the TCGA + CPTAC pan-cancer arena, with HRD-status and IFN-program covariates, with confounder control for total immune infiltrate / TMB / MSI**, and ask: where does the (HRD-high × IFN/eTreg-high) phenotype actually live?

## Where Thread 3 most likely breaks

Three honest failure modes:

- **CCR8 specificity is mostly-but-not-entirely Treg-exclusive.** A subset of activated tissue-resident memory CD8 expresses CCR8 in some contexts; certain Th2 cells express it transiently. The expected hit on those compartments is small but non-zero. Single-cell validation is what keeps the inference honest.
- **eTreg depletion is necessary but not sufficient.** If the CD8 compartment is *terminally* exhausted and uneducable, removing the suppressor doesn't release a working effector. The 3D stratifier (Aim 4) adds Tex co-occurrence precisely because a project that proposes a combination has to argue there's a CD8 population the combination can rescue.
- **The PARPi + anti-CCR8 combination has no public outcome data.** GSE222556 doesn't include anti-CCR8 arms; the CHS-114 phase I doesn't include PARPi arms. The argument has to be made via **stratifier + signal concordance + mouse precedent (Luo 2024)**. The clinical case is hypothesis-shaped, not survival-curve-shaped. This is a feature of where the field is in 2026, not a project weakness.

## What the three threads add up to

Thread 1: HRD generates the DNA-damage burden. Thread 2: that burden fires cGAS-STING and turns IFN into a tonic conditioning signal that selects for terminal-eTreg accumulation. Thread 3: CCR8 is the marker that makes the eTreg compartment uniquely druggable without systemic damage.

The combination — **PARPi + anti-CCR8 in HRD-high × IFN-conditioned tumors** — has a complete mechanism, has clinical precedent in mice (Luo 2024), has a clinical-grade antibody (CHS-114), and is missing only the pan-cancer stratifier that says **who**. That stratifier is what the analysis plan ([the anchor essay](the-pan-cancer-bet.md)) operationalizes.
