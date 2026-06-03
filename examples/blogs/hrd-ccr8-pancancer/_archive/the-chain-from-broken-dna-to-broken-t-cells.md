---
title: 'From broken DNA to broken T cells — the HRD → IFN → CCR8⁺ Treg chain, beat by beat'
date: '2026-06-01'
topics:
- hrd
- cgas-sting
- interferon
- mhc-class-ii
- ccr8
- treg
- exhausted-cd8
- tumor-microenvironment
summary: 'A biology-first walk through the mechanism the rest of the vault operates on. HR-deficient tumors leak DNA fragments into the cytosol. cGAS senses them, STING fires, the tumor cell makes type-I IFN constantly. Chronic IFN recruits CD8s and simultaneously turns tumor cells into MHC-II^hi, co-inhibitory-ligand-positive surfaces — APCs that present antigen but deliver stop signals. Those surfaces select for CCR8⁺ terminal effector Tregs, which suppress the recruited CD8s into terminal exhaustion. PARPi amplifies the cytosolic-DNA signal. The chain is what the project stratifies for.'
starred: true
---

The one-sentence version: HR-deficient tumors leak DNA fragments into the cytosol, cGAS senses them, STING fires, the tumor cell makes type-I interferon **constantly**; chronic IFN recruits CD8 T cells *and* turns tumor cells into MHC-II^hi co-inhibitory-ligand-positive APCs, those APCs select for CCR8⁺ terminal effector Tregs, the eTregs suppress the recruited CD8s into terminal exhaustion, and PARPi amplifies the cytosolic-DNA signal that started it all.

Six links in the chain. Each link is its own piece of biology, and each one tells you where the chain can break — or where a combination can be designed to break it.

## 1. Why HR-deficient cells leak DNA

Double-strand breaks happen in every dividing cell, mostly from collapsed replication forks. In HR-proficient cells, homologous recombination uses the sister chromatid as a template and repairs the break faithfully. In HR-deficient cells — BRCA1/2-mutant, BRCA1-promoter-methylated, or carrying lesions in other HR-pathway genes — the cell falls back on error-prone routes (NHEJ, MMEJ) that leave **fragments**: micronuclei, lagging chromatids, free DNA pieces. Some of those fragments end up outside the nucleus, in the cytosol, where DNA isn't supposed to be.

The cell reads cytosolic DNA the way it would read a virus.

## 2. cGAS-STING — the sensor that turns damage into a signal

Cyclic GMP-AMP synthase (cGAS) binds cytosolic double-stranded DNA non-sequence-specifically and produces a small molecule, cGAMP. cGAMP binds STING in the ER, STING translocates and recruits TBK1, TBK1 phosphorylates IRF3, IRF3 dimerizes and enters the nucleus, and the cell turns on the **type-I interferon** transcriptional program. IFN-α and IFN-β get secreted; surrounding cells (immune and stromal) see them via IFNAR and turn on hundreds of **interferon-stimulated genes** (ISGs).

The key feature for HRD biology: this signal is **tonic**. An HRD cell is generating cytosolic DNA continuously, not in a one-shot burst. The IFN it produces is therefore chronic, not acute. That single property — chronic vs acute — is what flips IFN from an anti-tumor signal to a pro-suppression signal.

## 3. Why chronic IFN has two effects, not one

Acute type-I IFN is what you want during a viral infection: it recruits effector CD8 T cells, primes NK responses, upregulates MHC-I antigen presentation, and generally tells the adaptive system "the danger is here, attack." Most immuno-oncology arguments for IFN's value (the IFN-high tumor / IO-responder correlation) ride on this acute biology.

Chronic IFN does the same things and adds new ones:

- It upregulates **PD-L1** on tumor cells. (PD-L1 induction is largely IFN-γ-driven, but type-I IFN contributes via STAT1.)
- It induces **MHC class II on non-professional APCs** — including the tumor cell itself, via CIITA. Normally MHC-II is restricted to dendritic cells, macrophages, B cells. Under sustained IFN exposure, tumor cells start expressing it.
- It upregulates a roster of **co-inhibitory ligands**: galectin-9 (the TIM-3 ligand), FGL1 (a LAG-3 ligand), and others. These are stop signals — present an antigen and tell the responding T cell to disengage.

A tumor cell that simultaneously expresses MHC-II, presents antigen, lacks proper co-stimulation, and decorates itself with co-inhibitory ligands is not an antigen-presenter in any useful sense. It is a **Treg-conditioner**.

## 4. CCR8⁺ effector Tregs — why those, why there

When a CD4 T cell engages a tumor cell displaying peptide-on-MHC-II with stop signals and no co-stimulation, the CD4's fate is biased away from effector differentiation and toward the regulatory program. The regulatory T cells that survive and accumulate in this niche aren't generic Tregs — they're a specific terminal state: **CCR8^high, LAG3^high, TNFRSF18 (GITR)^high, CTLA-4^high**, with tissue-resident features and high suppressive output.

This is the **effector Treg (eTreg)** state. The Cell 2024 paper's terminal-eTreg signature names these markers explicitly. CCR8 is the cleanest identifier because — and this is the clinically critical fact — it is expressed almost exclusively on tumor-infiltrating eTregs, not on peripheral Tregs and not on conventional T cells. The pan-cancer single-cell T atlas (Zheng et al. 2021, ~390k T cells across 21 cancers) confirms this pattern across tumor types.

eTregs are the population that does the most local suppression: they consume IL-2, deliver CTLA-4-mediated trans-endocytosis of co-stimulatory ligands, secrete IL-10 and TGF-β, and physically interpose between effector T cells and the cells those effectors are trying to attack.

## 5. The CD8 fate — terminal exhaustion as the failure mode

The CD8 T cells that the same chronic IFN signal *recruited* into the tumor now find themselves in a microenvironment with high antigen load, persistent inhibitory signaling from tumor-cell co-inhibitory ligands, and active eTreg-mediated suppression. They progress through the canonical exhaustion trajectory — progenitor exhausted (TCF1^+) → effector-like → terminally exhausted (TIM-3^+ TOX^+) — and at the terminal end they are functionally inert.

Crucially, the **CD8s and the eTregs are co-located**. The Luo 2024 scRNA + TCR analysis showed terminal eTregs and terminally exhausted CD8 in the same tumor regions, on the same lesional samples. They are two outputs of the same chronic-IFN-conditioning program, sharing the same triggering environment.

## 6. PARPi — the amplifier you can pull on

PARP enzymes are involved in single-strand-break repair and replication-fork stabilization. Standard PARP inhibitors (olaparib, niraparib, talazoparib, rucaparib) **trap** PARP physically on the DNA. In HR-deficient cells, trapped PARP at a damaged site causes replication-fork collapse → double-strand break → unresolved damage → cell death. That's the synthetic-lethality argument that gets PARPi to market.

But fork collapse also produces **more cytosolic DNA fragments**. PARPi therefore amplifies the very signal at the start of the chain. An HRD-tumor on PARPi is, mechanistically, a higher-IFN tumor than the same tumor untreated — which means PARPi is also unintentionally amplifying the eTreg-conditioning program.

This is why PARPi as a single agent has the response/resistance profile it does: the cell-killing effect helps, the immune-conditioning effect works against it, and which one dominates depends on whether the eTreg compartment is already in place. PARPi monotherapy does still reduce tumor burden in HRD models — Luo et al. confirmed niraparib alone attenuates tumor progression in their CCR8-humanized orthotopic ovarian model — but its ceiling is lower than the underlying biology allows. Add anti-CCR8 to deplete the eTregs and the ceiling lifts: in the Luo experiment niraparib + ZL-1218 produced significantly greater suppression than either agent alone.

## The whole chain in two takeaways

Two things to carry away:

**First**: the chain is mechanistic, not statistical. Every link is a named molecular event with named molecules. HRD → cytosolic DNA → cGAS-STING → type-I IFN → IFN signaling via IFNAR + STAT1 → CIITA + co-inhibitory ligand induction in tumor cells → eTreg conditioning of engaged CD4s → CCR8⁺ terminal eTregs → suppression of recruited CD8 → terminal exhaustion. You can intervene at any link, but the most-druggable one — selective enough to spare peripheral immunity, late enough to capture the consequence rather than the cause — is CCR8.

**Second**: the chain runs at variable speed in different tumors. Some HRD tumors are caught in the acute-IFN phase and are IO-responsive without any of this. Others have completed the conditioning and are stuck in the suppressive end-state. The job of the [pan-cancer stratifier](the-pan-cancer-bet.md) is to tell those two populations apart — because only the second one is the population that PARPi + anti-CCR8 was designed for.
