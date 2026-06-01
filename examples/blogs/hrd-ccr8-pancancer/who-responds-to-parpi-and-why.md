---
title: 'Who responds to PARPi, and why — the two-axis answer'
date: '2026-06-01'
topics:
- hrd
- parpi
- brca
- ifn
- treg
- ccr8
- resistance
- biomarker
summary: 'The honest answer to "why do some HRD patients respond to PARPi and others do not" is that there are two axes, not one. Axis one is tumor-intrinsic: how deep the HR-deficiency actually goes (biallelic BRCA1/2 vs heterozygous, BRCA2 vs BRCA1 vs BRCA1-methylated, PALB2 / RAD51C/D), what is functionally restored (53BP1 / Shieldin / PTIP loss), what is genetically reverted (secondary BRCA reversion mutations), and whether the SLFN11 / RAD51-foci sensor is in the right state. Axis two is immune: acute drug-induced STING-IFN that recruits CD8s is the engine of PARPi efficacy, but chronic baseline HRD-driven IFN is also the substrate of the CCR8⁺ eTreg compartment that suppresses those same CD8s. The two axes together imply the project''s stratifier should be HRD-functional × IFN/eTreg-high, not HRD-genomic-scar × IFN/eTreg-high.'
starred: true
---

A reader who has worked through the [chain blog](the-chain-from-broken-dna-to-broken-t-cells.md) and the [six-papers blog](the-six-papers-the-chain-rests-on.md) keeps arriving at the same clinical question: if PARPi is the amplifier that drives the chain, why doesn't every HRD patient respond — and why does a fraction respond for years? The honest answer is that "PARPi response" is the joint outcome of two independent axes — one tumor-intrinsic, one microenvironmental — and the same number on either axis can mean different things.

This blog walks both.

## Axis 1 — Tumor-intrinsic: how deep does the HR deficiency actually go

### Depth of HR loss across the BRCAness spectrum

At one end of the depth scale, the SOLO1 7-year update (DiSilvestro et al. *JCO* 2023; doi:10.1200/JCO.22.01549) for frontline ovarian BRCA1/2-mutant patients on maintenance olaparib shows 7-year OS of 67.0% versus 46.5% on placebo (HR 0.55), with a Kaplan-Meier curve that plateaus — a non-trivial fraction never relapses. Within BRCA-mutant ovarian, BRCA2 numerically outperforms BRCA1 on the magnitude of benefit (HR ≈0.20 vs ≈0.41 in SOLO1 subgroup analysis), and the same pattern repeats in prostate (PROfound BRCA subgroup, Mateo et al. *JCO* 2023; doi:10.1200/JCO.23.00339): BRCA2-mutant mCRPC has a deeper rPFS and OS benefit than BRCA1.

BRCA1-promoter methylation matters too, but only homozygous: heterozygous methylation does **not** predict response, and methylation itself can be lost after platinum (Kondrashova et al. *Nat Commun* 2018; doi:10.1038/s41467-018-05564-z). This is one of the cleanest examples of why a binary "BRCA1 silenced — yes / no" call is not enough.

A step away from BRCA, the HRR-pathway gene PALB2 phenocopies BRCA in response (Tung et al. *JCO* 2020 in non-BRCA HRR breast: ORR 82%, 9/11) and RAD51C/RAD51D-mutant ovarian behaves comparably (Swisher et al. *JCO* 2021 ARIEL2/3 pooled). At the other extreme of the HRR list, ATM mutation does **not** predict PARPi response — TRITON3 (Fizazi et al. *NEJM* 2023; doi:10.1056/NEJMoa2214676) showed rPFS 8.1 vs 6.8 mo, HR 0.95 in the ATM cohort — and CDK12-altered tumors have their own "tandem duplicator" phenotype that fails to behave HRD-like (Wu et al. *Nature* 2018). Lumping all "HRR-pathway alterations" together is the cleanest way to dilute a real signal.

The HRDsum=42 cutpoint (Telli et al. *Clin Cancer Res* 2016; doi:10.1158/1078-0432.CCR-15-2477) was trained on breast and ovarian and is widely used. Stewart et al. (*npj Precis Oncol* 2022; doi:10.1038/s41698-022-00276-6) showed that the same threshold mis-fires pan-cancer: 17.5% of pan-tumor TCGA scored HRD-positive at ≥42, but only 15% of clinical-BRCA1/2 tumors were concordant on both HRDsum and SBS3, and lung squamous returned ~51% HRD-positive. The cleanest patient-level readouts today are SBS3 (Alexandrov et al. *Nature* 2020) for the genomic scar and functional RAD51 foci on an FFPE biopsy (Cruz et al. *Ann Oncol* 2018; Llop-Guevara et al. *Ann Oncol* 2021) for *present-tense* HR competence.

### Primary resistance — the HR was already restored

A BRCA1-mutant tumor can be HRD-genomic-scar-high (deep SBS3, high HRDsum) yet PARPi-refractory because its HR has been functionally **restored**. The route is loss of the NHEJ-channeling factors that normally force BRCA1-deficient cells away from HR. 53BP1 loss is the canonical example (Bunting et al. *Cell* 2010; Jaspers et al. *Cancer Discov* 2013), and the same logic extends to the Shieldin complex — REV7/MAD2L2, SHLD1/2/3 (Noordermeer et al. *Nature* 2018; Dev et al. 2018; Gupta et al. 2018) — and RIF1. Lose 53BP1 or Shieldin in a BRCA1-mutant cell, end resection resumes, RAD51 foci come back, and the tumor reads as functionally HR-proficient even though its BRCA1 is still broken.

A separate path — **fork protection without HR restoration** — runs through PTIP/MLL3-4 loss (Chaudhuri et al. *Nature* 2016; doi:10.1038/nature18325) and the EZH2/MUS81 axis (Rondinelli et al. *Nat Cell Biol* 2017). Replication forks become stable, trapped PARP no longer triggers fork collapse, and the synthetic-lethality engine stalls even though DSB repair is still broken. Recent work reframes the toxic lesion itself: Cong, Cantor et al. (*Mol Cell* 2021; doi:10.1016/j.molcel.2021.06.011) argue that the proximal PARPi-killed lesion is ssDNA gaps from defective Okazaki-fragment processing rather than DSBs per se. This both ties resistance back to the fork and helps explain why **SLFN11** is the strongest single sensitizer (Murai et al. *Oncotarget* 2016; Lok et al. *Clin Cancer Res* 2017; Coussy et al. *Sci Transl Med* 2020): SLFN11 reads those gaps and irreversibly arrests the fork.

The implication is sharp. HRD score sees the historical fingerprint of HR loss; it does not see whether HR is currently working. **A functional readout (RAD51 foci) plus a gap-handling sensor (SLFN11) together capture present-tense PARPi sensitivity in a way HRDsum cannot.**

### Acquired resistance — the BRCA gene came back

The third intrinsic mode is reversion. Secondary mutations restore the BRCA1/2 (or PALB2, RAD51C, RAD51D) open reading frame after PARPi or platinum pressure (Edwards et al. *Nature* 2008; Sakai et al. *Nature* 2008). Reversion is rare pre-treatment (2% in platinum-sensitive ARIEL2) and common at progression — 13–18% baseline in platinum-resistant cohorts, with reports of 40–60% at progression in heavily-pretreated mCRPC (Lin et al. *Cancer Discov* 2019; Goodall et al. *Cancer Discov* 2017). Reversions are usually polyclonal: Kondrashova et al. (*Cancer Discov* 2017) reported a single resistant tumor carrying four independent RAD51C reversion alleles. They appear in ctDNA before imaging changes, which makes them the cleanest dynamic biomarker.

What is new in 2024 is that the same patient can carry **combined** genetic + 53BP1-pathway resistance. Patel/Bono et al. (*Ann Oncol* 2024; doi:10.1016/j.annonc.2024.01.005) showed co-occurring BRCA1/2 reversions with TP53BP1, RIF1, and PAXIP1 (PTIP) lesions in PARPi-resistant breast cancer. There is no single resistance mechanism — there is a portfolio.

## Axis 2 — Immune: which IFN, which T cells, which Tregs

The mistake on this axis is to use "IFN signature" as a single number.

In the **acute, drug-induced** direction, PARPi-triggered cGAS-STING activation is **required** for PARPi efficacy. Pantelidou et al. (*Cancer Discov* 2019) showed that CD8 depletion abolishes olaparib's effect in BRCA1-null TNBC; Sen et al. (*Cancer Discov* 2019) and Shen et al. (*Cancer Res* 2019) showed the same in small-cell lung cancer and across BRCA-proficient ovarian models — the IFN response is largely BRCAness-independent. PARPi is, mechanistically, also an immunotherapy: it makes tumor cells secrete CCL5 and CXCL10, activates dendritic cells paracrine, recruits CD8s, and upregulates tumor PD-L1 via inactivation of GSK3β (Jiao et al. *Clin Cancer Res* 2017). A patient whose tumor mounts this acute response is a responder regardless of HRD-score subtleties.

In the **chronic, tumor-intrinsic** direction — the one the [chain blog](the-chain-from-broken-dna-to-broken-t-cells.md) walks — sustained HRD-driven cytosolic-DNA leakage produces baseline IFN that conditions tumor cells into MHC-II^hi, co-inhibitory-ligand-positive APCs, which select the CCR8⁺ terminal effector-Treg compartment that suppresses the same CD8s the acute IFN just recruited. Färkkilä et al. (*Nat Commun* 2020) saw exactly this in TOPACIO biopsies: IFN-signature-high tumors also had Treg-high microenvironments, and the Treg fraction was the negative correlate of niraparib + pembrolizumab response. Luo et al. (*Cell* 2024; doi:10.1016/j.cell.2024.06.013) then closed the loop in HGSOC: HRD is the genomic axis that loads the CCR8⁺ eTreg compartment, and depleting it with ZL-1218 in CCR8-humanized mice goes further than niraparib alone.

There is also a macrophage layer. Mehta et al. (*Nat Cancer* 2021; doi:10.1038/s43018-020-00148-7) showed PARPi in BRCA1-null TNBC drives CSF1R-dependent immunosuppressive macrophages via SREBP1 lipid reprogramming. CSF1R blockade or STING agonism restore efficacy in a CD8-dependent way.

The two-axis picture is therefore: an HRD tumor on PARPi gets *helped* by acute drug-induced IFN (CD8 recruitment), *capped* by chronic HRD-driven IFN (eTreg conditioning), and *capped again* by the macrophage layer.

## Why the two axes matter for the project's stratifier

The project's working hypothesis — H3 in [the bet](the-pan-cancer-bet.md) — is that **HRD-high × IFN/eTreg-high** defines the population for PARPi + anti-CCR8. The two-axis answer sharpens that hypothesis three ways:

1. **Use functional HRD, not just genomic scar.** A BRCA1-mutant tumor with restored 53BP1 reads HRDsum-high but is PARPi-refractory through HR restoration. The stratifier should pair HRD-functional (RAD51-low on FFPE) × IFN/eTreg-high, not HRD-historical × IFN/eTreg-high. This is a real constraint on what the bulk TCGA analysis can claim — bulk RNA cannot see RAD51 foci. The single-cell validators (Zheng 2021, Cheng 2021, GSE222556) become more load-bearing for the immune call, and the genomic call has to be hedged: HRDsum + SBS3 *minus* known 53BP1/Shieldin/PTIP loss is the cleanest pan-cancer proxy we can build.

2. **The IFN axis is two axes.** A tumor that is IFN-signature-high pre-treatment can be acute-IFN (good — recent damage, CD8-rich, PARPi-responsive) or chronic-IFN (suppressive — sustained HRD, eTreg-rich). Pre-treatment IFN signature on its own is ambiguous; the eTreg fraction (or the CCR8⁺Treg fraction in single-cell, or a deconvolution proxy in bulk) disambiguates. **High eTreg = chronic-IFN regime = the population the combination is for.** This is the analytic move that turns the IFN axis from a co-occurring covariate into a stratifying covariate.

3. **PALB2 / RAD51C / RAD51D / BRCA1-methylated tumors are an open question.** Luo 2024 mapped the chain in BRCA1/2-mutant HGSOC. Whether the PALB2-mutant, RAD51C/D-mutant, and homozygous-BRCA1-methylated HRD tumors share the same CCR8⁺ eTreg phenotype is **not** answered by the published single-cell data. If yes, the stratifier generalizes; if no, the project has a sharper definition of "HRD that matters immunologically." This is exactly the kind of question Aim 2 and Aim 3 of the pan-cancer atlas analysis are positioned to answer.

## The headline

PARPi response is not a single-axis prediction. The patients who plateau on the Kaplan-Meier curve at seven years are the ones who win on **both** axes — deep functional HR loss, no reversion yet, and a microenvironment that has not tipped into the chronic-IFN/eTreg regime. The patients the PARPi + anti-CCR8 combination is for are the ones who win on axis one (functional HR loss) and lose on axis two (eTreg-conditioned). That intersection is what the project's stratifier is trying to find — and the analytic upshot is that it should be measured with **functional HRD plus IFN/eTreg co-occurrence**, not a single HRDsum threshold.
