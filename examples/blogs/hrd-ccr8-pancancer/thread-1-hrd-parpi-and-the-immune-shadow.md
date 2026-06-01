---
title: 'Thread 1: HRD, PARPi, and the immune shadow they cast'
date: '2026-05-31'
topics:
- hrd
- parpi
- synthetic-lethality
- dna-repair
- cgas-sting
- interferon
- tumor-microenvironment
summary: 'The familiar half of the story — homologous-recombination deficiency, PARP trapping, synthetic lethality — is what gets PARPi into the clinic. The unfamiliar half — that the same DNA-damage burden generates cytosolic DNA, fires cGAS-STING, and conditions the tumor microenvironment via type I IFN — is the bridge to everything Threads 2 and 3 do. This essay walks the pharmacology side, then names the four ways HRD is operationalized (HRDsum, BRCA1/2 status, SBS3, expHRD), why each one needs tumor-type-specific cutpoints, and how the "early activation vs late immunosuppression" balance shows up downstream.'
---

The clinical story for PARP inhibitors begins with synthetic lethality. Cells with intact homologous recombination tolerate PARP inhibition. Cells without it — BRCA1/2-mutant, or carrying the same scar pattern from another HR-pathway lesion — can't repair the double-strand breaks that arise when PARP-trapped lesions stall replication forks. The forks collapse, the cells die, and the tumor shrinks. Olaparib's 2014 approval in BRCA-mutant ovarian was the proof; niraparib, rucaparib, talazoparib followed.

That story is well-told and not the story this thread is about. The thread is about what HRD does to the **immune microenvironment** — early, often, and in a direction that current single-agent PARPi cannot exploit.

## How HRD gets operationalized — and why definitions matter

There are four working definitions of HRD in the pan-cancer literature, and they disagree in interesting ways:

- **Genomic scar (HRDsum)** — Knijnenburg 2018 sums LOH, LST, and TAI/NtAI into a single score, available for every TCGA sample via GerkeLab/TCGAhrd. Strength: works on SNP-array data, computable at scale, well-characterized. Weakness: cutpoints are tumor-type dependent. The ≥42 threshold optimized on ovarian doesn't transfer; npj Precision Oncology 2022 spelled this out explicitly. Any pan-cancer analysis that applies one cutpoint globally is making a mistake.
- **HRR gene status** — direct BRCA1/2 and other HR-pathway lesions. Biallelic inactivation discriminates well; monoallelic is weak. BRCA1 vs BRCA2 vs BRCA1-promoter-methylated have **different** TMEs and should be analyzed separately. Averaging them is the easy mistake.
- **Mutational signature (SBS3)** — orthogonal to the scar-based metric, derives from SNV patterns. Useful as a sanity check; SBS3 and HRDsum agree most of the time but not always.
- **expHRD** — transcriptome-based, cohort-independent. Lets you add HRD calls to RNA-seq-only cohorts where SNP/WES isn't available — important for ICI clinical cohorts where outcomes exist but genomic data are missing.

Using one of these alone is a known failure mode. Using all four in parallel, with the agreement structure as itself a result, is the project's starting move.

## The PARP-trapping mechanism, briefly

PARPi work because PARP isn't just an enzyme — it's also a physical block on damaged DNA. Standard PARPi (olaparib, talazoparib, niraparib) **trap** PARP on the DNA, converting a single-strand-break repair intermediate into a replication-fork stall. In HR-intact cells the fork collapses get repaired. In HR-deficient cells they don't, and the cell dies.

That is the cell-autonomous story. It's necessary but not sufficient to explain why HRD tumors do or do not respond to PARPi over time.

## The immune side — what HRD does even before treatment

HRD generates persistent low-level DNA damage independent of PARPi. The damage releases short DNA fragments into the cytosol, where cGAS detects them, fires STING, and induces type I IFN. The result is an HRD tumor that is, at baseline, more IFN-stimulated than its HR-proficient counterpart.

Type I IFN is a **double-edged** signal in the tumor. On one side it recruits effector T cells, upregulates antigen presentation, and primes the adaptive response — exactly the effects that make IFN-high tumors more IO-responsive on average. On the other side it upregulates **PD-L1**, **MHC-II on tumor cells**, and various co-inhibitory ligands. The same signal that recruits CD8s also gives them reasons to exhaust.

That is the **early activation vs late immunosuppression** balance that the 2025 Biomarker Research review synthesizes for HRD specifically. HRD tumors tend to start in the "activated" half and drift, under chronic IFN exposure, into the "suppressed" half — and the markers of suppression are exactly the ones an aware project would gate on.

PARPi *adds* to this signal: PARP trapping → more replication-fork collapse → more cytosolic DNA → more cGAS-STING firing → more IFN. PARPi is, mechanistically, also an immunomodulator. This is why the immune effects of PARPi were under-appreciated for a decade — the cell-killing story is so clean it absorbed all the attention.

## The bridge to Threads 2 and 3

The Luo 2024 result reads in one sentence as the chain HRD → IFN → tumor-cell MHC-II^hi + co-inhibitory ligands → CCR8⁺ effector Treg enrichment → suppressed CD8. The first arrow is Thread 1 (this essay). The middle two arrows are Thread 2 — IFN as the conditioning signal that turns HRD into a specific microenvironmental phenotype. The last arrow is Thread 3 — CCR8⁺ eTregs as a therapeutic target.

The point worth keeping is that **none** of those arrows fires automatically. HRD generates IFN tonically, but tumor-cell MHC-II upregulation depends on dose, duration, and tissue context. CCR8⁺ eTreg enrichment depends on whether the necessary CCL1/CCL18 chemokine sources are present. CD8 exhaustion depends on antigen load and on whether other co-inhibitory pathways are firing.

That is why the pan-cancer story is not "HRD → eTreg" in a straight line. It is "HRD tumors that have **already** turned the IFN-conditioning corner" → eTreg. The IFN axis is the filter.

## What this thread gives the project

Five practical things:

- A **set of HRD definitions** (HRDsum, BRCA1/2 calls, SBS3, expHRD) and the requirement that they be run together with sensitivity analysis on tumor-type-specific cutpoints — never one definition, never one cutpoint pan-cancer.
- A **prior** on the immune phenotype to look for: not "is HRD immunogenic" (already known) but "does HRD tumor-cell MHC-II + co-inhibitory ligand upregulation, conditioned on IFN-high state, predict the eTreg phenotype" — the conditional claim that distinguishes a stratifier from a correlation.
- The **explicit acknowledgment** that BRCA1 vs BRCA2 vs methylated BRCA1 tumors have different TMEs and need separate treatment.
- A **path through Thread 2** — IFN is not a confounder to be controlled, it's the mediator the project's mediation analysis will name.
- The **pharmacologic frame** for why PARPi belongs in the combination at all: PARPi is both the synthetic-lethal kill switch and the IFN amplifier. The eTreg compartment exists because IFN persists; PARPi makes the IFN persist harder. That is the mechanistic reason PARPi + anti-CCR8 should be more than the sum of its parts.

Onward to Thread 2 — the IFN bridge itself.
