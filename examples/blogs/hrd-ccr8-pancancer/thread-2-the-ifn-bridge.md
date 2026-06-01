---
title: 'Thread 2: The IFN/cGAS-STING bridge — why HRD becomes a CCR8 story'
date: '2026-05-30'
topics:
- interferon
- cgas-sting
- mhc-class-ii
- hrd
- tumor-microenvironment
- treg
summary: 'The hinge of the project. HRD generates cytosolic DNA → cGAS-STING fires → tumor cells produce type I IFN tonically. IFN does two things at once — recruits effectors, and conditions tumor cells into an MHC-II^hi co-inhibitory state that selects for terminal effector Tregs. Without the IFN axis the HRD-eTreg link is co-occurrence; with it, the link has a mechanism, a mediator to test for, and a reason the stratifier should be 2D (HRD × IFN) rather than 1D (HRD alone).'
---

If Thread 1 is about why HRD damages cells, this one is about why HRD **rewires** them. The bridge is short and load-bearing: HR-deficient cells generate cytosolic DNA at elevated rates → cGAS detects it → STING fires → type I IFN is produced tonically by the tumor itself. Under chronic IFN exposure the tumor cell turns into a specific kind of antigen-presenting environment — MHC-II^hi, co-inhibitory-ligand-positive, and, by the time it stabilizes, the perfect substrate for terminal effector-Treg accumulation.

That is the IFN bridge. Read carefully it explains four things the literature has been treating as separate.

## What cGAS-STING actually does in this context

The pathway was originally described as an innate-immune sensor of viral DNA. Its tumor relevance came later. The basic logic:

- **Damaged DNA escapes the nucleus** (micronuclei, replication-fork collapse fragments, stressed mitochondrial DNA).
- **cGAS binds the cytosolic DNA** and synthesizes cGAMP.
- **STING binds cGAMP** and activates TBK1 → IRF3 → type I IFN transcription.
- The tumor cell produces IFN-α and IFN-β; the surrounding cells (immune and stromal) see it and turn on **interferon-stimulated genes** (ISGs), MHC-I, MHC-II, PD-L1, and a range of co-stimulatory and co-inhibitory ligands.

HR-deficient cells generate more cytosolic DNA than HR-proficient cells **even without treatment**, simply because their unresolved double-strand breaks more often leak into the cytosol via micronuclei. PARPi amplifies the same effect by stalling replication forks. So an HRD tumor on PARPi is, mechanistically, a sustained-IFN tumor.

## Why IFN is double-edged

This is the part that makes the whole project worth doing. Type I IFN has two opposed effects:

- **Recruits and activates effectors.** ISGs amplify antigen presentation, draw in CD8 T cells, prime NK responses, and generally turn the tumor into something the adaptive system can see. This is the half of IFN biology immunotherapy programs love.
- **Conditions for exhaustion and suppression.** Chronic IFN upregulates **PD-L1** on tumor cells (the original PD-1 target rationale), **MHC-II on non-professional APCs** (including the tumor cell itself), and a roster of co-inhibitory ligands (TIM-3 ligand galectin-9, LAG-3 ligand FGL1, etc.). Tonic IFN exposure pushes CD8s toward terminally exhausted states. It also pushes Tregs toward the **effector-Treg** phenotype — CCR8^hi, LAG3^hi, TNFRSF18^hi — that does the most local suppression.

The pan-cancer literature has historically reported the activation half ("IFN-high tumors respond to anti-PD-1") and the suppression half ("IFN drives PD-L1 and exhaustion") in separate papers, as if they were rival findings. They aren't. They are the **same biology at different durations**: acute IFN activates; chronic IFN conditions. HRD is what makes IFN chronic.

## The MHC-II^hi tumor cell — the under-noticed phenotype

A specific consequence of chronic IFN-γ exposure (and to a lesser extent type-I IFN) is **CIITA induction in non-immune cells**, including some tumor cells. MHC-II on tumor cells is famously context-dependent — sometimes prognostically favorable (melanoma in particular), sometimes correlated with Treg accumulation. The Luo 2024 result resolves the puzzle: **MHC-II^hi tumor cells that simultaneously upregulate co-inhibitory ligands and lack co-stimulation** are not effective antigen-presenters; they are functional Treg-conditioners. They present a peptide to a CD4 T cell, deliver inhibitory signal, and select for the terminal-eTreg phenotype.

This is the Luo 2024 mechanism in one sentence: HRD-driven chronic IFN turns the tumor cell into a Treg-conditioning APC. The CD8 exhaustion that follows is downstream of the Treg accumulation, not parallel to it.

## What this means for the project's analysis

Three concrete consequences:

1. **The stratifier has to be 2D, not 1D.** "HRD-high" is not enough. Many HRD tumors live in the acute-IFN, activated half of the biology, especially at presentation. The interesting subgroup is **HRD-high AND IFN-conditioned**, where IFN-conditioned is operationalized via an ISG signature or a tumor-cell MHC-II^hi state (the latter accessible only via single-cell deconvolution). This is what makes the project's claim more than a recapitulation of "HRD predicts IO response."

2. **IFN is a mediator, not a confounder.** In the mediation analysis, the project's claim is that the HRD → eTreg association is **mediated** by the IFN program. Removing the IFN axis from the model should attenuate the association; removing the eTreg readout from the model should not affect the HRD-IFN association. This is the structural-equation step that distinguishes Aim 3 from a generic covariate-control exercise.

3. **The negative comparison is MSI-high.** MSI-high tumors are also highly immunogenic and highly IFN-stimulated — but by a different mechanism (mismatch-repair-deficient → neoantigen-rich → adaptive-IFN-γ-dominated rather than tonic cGAS-STING type-I). MSI-high tumors should **not** show the same CCR8⁺ eTreg enrichment if the project's specificity claim is right. They are the discriminating test.

## Where this thread is most likely to break

Three places, named explicitly:

- **Tumor-cell MHC-II^hi state is hard to estimate from bulk.** The clean readout is single-cell, and only Zheng 2021 / Cheng 2021 / GSE222556 give that at scale. Bulk transcriptome can give an IFN/ISG estimate but cannot directly say "the tumor cell upregulated MHC-II." The project leans on single-cell validation for this step.
- **Type-I vs type-II IFN distinction matters.** cGAS-STING produces type I (α/β); CD8/Th1 produce type II (γ); both induce ISGs and MHC, but with different kinetics. The HRD-driven branch is type-I-dominated; the immune-recruitment branch is type-II-dominated. The project's signature choice (Hallmark INTERFERON_ALPHA_RESPONSE rather than the broader IFN signature) reflects this.
- **The MHC-II conditioning logic is not universal.** Some tissues (skin, gut) have professional APC populations that dominate antigen presentation; tumor-cell MHC-II contributes little. In other tissues (ovary, breast, prostate) it can dominate. The pan-cancer subgroup map (Aim 4) will reveal where the mechanism is portable and where it is not.

Thread 3 picks up where this one ends: the eTreg compartment itself, what makes CCR8 the right target, and where the clinical anti-CCR8 race actually stands.
