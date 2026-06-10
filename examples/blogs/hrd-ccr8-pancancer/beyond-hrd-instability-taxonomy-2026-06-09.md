---
title: 'beyond HRD — a genomic-instability taxonomy for the pan-cancer TME'
date: '2026-06-09 15:20 CT'
topics:
  - hrd
  - msi
  - pan-cancer
  - tumor-microenvironment
  - genomic-instability
  - dataset-strategy
summary: 'HRD is one member of a family of DNA-repair / genomic-instability states — MSI/dMMR, POLE/POLD1, TMB-high, APOBEC, and the cold CIN/WGD counterpoint. This maps all six onto one lesion → TME state → therapy axis, with a shared scar·signature·function measurement motif, and places CCR8⁺ eTreg as the convergent evasion lever under the hot cluster (a hypothesis, flagged honestly).'
starred: true
---

# beyond HRD — one instability axis, six states, one shared lever

The project started as **HRD × CCR8** — homologous-recombination deficiency as the genomic selector, CCR8⁺ effector Tregs as the immune lever, a PARPi + anti-CCR8 basket trial as the destination. That framing is right, but it is narrower than it needs to be. HRD is not a special case. It is one member of a **family of DNA-repair and genomic-instability states**, each of which is a tissue-agnostic biomarker, each of which reshapes the tumor microenvironment, and most of which converge on the *same* immune-evasion node the project is already aiming at.

Widening from HRD to the family does not dilute the thesis. It **generalizes** it. The spine stops being "HRD stratifies for PARPi" and becomes:

> **genomic-instability lesion → TME state → therapy axis** — with CCR8⁺ eTreg depletion as the shared resistance lever across the inflamed end of the spectrum.

This sits next to [[the-five-layer-dataset-plan]] (genomics-first) and [[paired-data-pan-cancer]] (the same-patient data constraint). Its companion, [[imputing-instability-from-rna-2026-06-09]], is what lets scRNA-only cohorts carry one of these labels into the analysis at all.

## the measurement motif — scar · signature · function

Every state on this map can be read three ways, and naming the three columns up front keeps the taxonomy honest — they do not always agree, and the disagreements are informative.

| read | what it captures | example (HRD) |
| --- | --- | --- |
| **scar / score** | the cumulative genomic *record* of past instability | Genomic Instability Score (LOH + TAI + LST); Myriad myChoice cut-point **GIS ≥ 42** (FDA P190014) |
| **mutational signature** | the *process* fingerprint in the mutation spectrum | **SBS3** ("BRCAness"); HRDetect (Davies 2017) |
| **functional assay** | the *current* pathway state, in real time | RAD51 foci (Llop-Guevara 2022) |

The scar is a historical record; the function is the live state; the signature sits between. A BRCA-reverted tumor still carries the scar but has regained function — which is exactly why [[imputing-instability-from-rna-2026-06-09]] matters, since expression tracks the *current* state, not the scar.

## the split that actually organizes the family

Raw mutation count does **not** organize these states usefully. The axis that does is **antigen presentation** — whether the instability produces *presented* neoantigens that inflame the TME, or whether it *suppresses* presentation. That split yields two clusters.

### cluster A — hot, repair-deficient (IO ± PARPi-primable)

Base-level or double-strand-break lesions that generate neoantigens and a T-cell-inflamed, IFN-γ-high microenvironment.

**MSI / dMMR — HRD's twin.** Loss of mismatch repair (MLH1, MSH2, MSH6, PMS2) — most often via *MLH1* promoter hypermethylation, or germline in Lynch syndrome — leaves microsatellite indels uncorrected, producing a hypermutator phenotype rich in frameshift neoantigens. The result is the prototypical **hot** tumor: dense CD8 infiltration with a compensatory checkpoint program (Llosa 2015). It is the cleanest parallel to HRD — both are **tissue-agnostic, DNA-repair-deficiency biomarkers with a standing FDA approval** — but the downstream biology diverges: MSI → immunotherapy, HRD → PARP-inhibitor synthetic lethality. Pembrolizumab's **MSI-H/dMMR approval (2017) was the first-ever tissue-agnostic cancer indication** (Le 2017; FDA summary Marcus 2019), later extended to first-line metastatic CRC (Andre 2020, KEYNOTE-177). MSI-H is steeply lineage-skewed — ~25–31% of endometrial, ~15–20% of colorectal and gastric, and **under 1–2% almost everywhere else** (Bonneville 2017, 39-cancer landscape; Hause 2016). That skew is the central confounder for any pan-cancer model built on it.

**POLE / POLD1 proofreading loss.** Exonuclease-domain mutations in the replicative polymerases abolish proofreading → an *ultramutator* phenotype (often >100 mut/Mb), signatures **SBS10a/b**, and — unlike MSI — usually **microsatellite-stable**. These tumors are among the most T-cell-inflamed of all and carry the best prognosis of the four molecular subgroups in endometrial cancer (Kandoth 2013); germline variants cause polymerase-proofreading-associated polyposis (Briggs & Tomlinson 2013). Pure IO axis, no PARPi rationale.

**TMB-high (non-MSI).** Not a single lesion but an aggregate count; the **≥10 mut/Mb** cut-point earned pembrolizumab a tissue-agnostic approval (2020, KEYNOTE-158). The load-bearing caveat: TMB is **not universally predictive** — McGrail 2021 showed neoantigen load couples to CD8 infiltration and IO response in lung/melanoma/head-and-neck but **not** in breast, prostate, or glioma, where TMB-high tumors failed to reach a 20% response rate. The threshold is a pragmatic regulatory line, not a biological constant.

**APOBEC (SBS2 / SBS13).** Endogenous cytidine-deaminase mutagenesis at the TpCpW motif — one of the most widespread mutational processes in cancer, dominant in ~30% of sequenced tumors and detectable across most cancer types (Petljak 2022; Alexandrov 2013). Its TME effect is **dual**: it raises neoantigen load (hot-leaning, associated with IO benefit in bladder/NSCLC) but its episodic, subclonal activity also feeds heterogeneity and immune escape. A candidate biomarker, not an approved selector.

### cluster B — cold, CIN-driven (the deliberate contrast arm)

**Chromosomal instability / aneuploidy / whole-genome doubling.** Persistent mis-segregation of whole chromosomes and arms — measured by the **aneuploidy score** (Taylor 2018) and **WGD** status (present in ~30% of tumors, more in metastases; Bielski 2018). This is *copy-number/structural* instability, and it runs the **opposite** way on the antigen axis: high aneuploidy *anti-correlates* with cytotoxic infiltration (Davoli 2017), and WGD actively **silences MHC-I antigen presentation** (epigenetic repression via H3K27me3). The result is the immune-**cold** archetype — low presentation despite often-high SCNA burden, poor IO response. The therapeutic move here is not the same lever; it is **convert-cold-to-hot**, or exploit WGD-specific vulnerabilities such as KIF18A dependency (Quinton 2021). CIN earns its place precisely as the **counterfactual** — the foil that defines what the hot cluster is by being everything it is not.

## the taxonomy, on one page

| state | lesion class | scar / score | signature | function | TME (why) | therapy axis | anchor |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **HRD** | DSB repair (HR) | GIS ≥ 42 | SBS3 | RAD51 foci | hot-leaning — DSBs, neoantigens, cGAS-STING | **PARPi** (+ IO) | Davies 2017; Myriad P190014 |
| **MSI / dMMR** | mismatch repair | MSIsensor | (ID/SBS hypermutation) | dMMR IHC | hot — frameshift neoantigens, dense CD8 | **IO** (pembro 2017) | Le 2017; Bonneville 2017 |
| **POLE / POLD1** | replication proofreading | TMB ultra | SBS10a/b | EDM genotype | strongly hot — ultramutator, MSS | **IO** | Kandoth 2013 |
| **TMB-high (non-MSI)** | aggregate burden | ≥ 10 mut/Mb | mixed | — | hot *only in some lineages* | **IO** (lineage-caveated) | KEYNOTE-158; McGrail 2021 |
| **APOBEC** | ssDNA deamination | TpCpW enrichment | SBS2 + SBS13 | A3 expression | dual — hot-leaning but escape-reinforcing | IO-adjacent (investigational) | Petljak 2022 |
| **CIN / WGD** | copy-number / structural | aneuploidy score | CIN signature | WGD ploidy | **cold** — silenced MHC-I, low CD8 | **convert-to-hot** / WGD vulnerabilities | Davoli 2017; Taylor 2018 |

The compact framing: **cluster A makes antigens the immune system can see; cluster B hides them.** HRD straddles the boundary — inflamed enough to be IO-relevant, but uniquely PARPi-synthetic-lethal.

## where CCR8⁺ eTreg sits

CCR8 marks **tumor-infiltrating effector Tregs** specifically — clonally expanded, suppressive, and largely absent from peripheral Treg/Tconv (Plitas 2016; De Simone 2016) — which makes it a clean target for *selective intratumoral* Treg depletion, synergistic with anti-PD-1 in preclinical models (Kidani 2022). On this map, eTreg/CCR8 is the **convergent third axis sitting underneath cluster A**:

- in the **hot** states, accumulated eTregs are the brake on an otherwise-primed response — so CCR8 depletion is the rational IO-intensifier / PARPi-IO partner that releases pre-existing CD8 immunity. This is the project's core bet, generalized from HRD to the whole inflamed cluster.
- in the **cold** state, eTregs are one suppressive layer atop a deeper antigen-presentation defect — so CCR8 alone is unlikely to suffice without a convert-to-hot step. Cluster B is the mechanistic explanation for *why the same lever works in A but not B*.

> ⚠️ **An honesty flag this project must carry.** The literature solidly establishes two separate facts: MSI-H tumors are **Treg-rich** (Michel/Maby), and tumor Tregs are **CCR8⁺ effectors** (Plitas 2016). It does **not** yet directly establish that **CCR8⁺ eTreg enrichment scales with MSI (or HRD) status** within a lineage. That composite is the **project's testable hypothesis, not a citation** — and it is exactly the thing a MSI/HRD-stratified scRNA re-analysis (CCR8, TNFRSF9, CTLA-4 eTreg signatures) should test rather than assume.

## what this changes for the trial

Three concrete shifts fall out of treating instability as one axis rather than one marker:

1. **Eligibility broadens from HRD to a hot-instability basket.** HRD, MSI-H, POLE, and high-TMB tumors share the "primed-but-braked" phenotype; CCR8 depletion is mechanistically the same intervention across them. That is a larger, more lineage-diverse eligible population than HRD alone — the basket logic the field already accepts for tissue-agnostic biomarkers.
2. **CIN becomes the built-in negative-control arm.** A cold, WGD-high stratum predicts *non*-response to CCR8 monotherapy — a falsifiable prediction that strengthens the design rather than weakening it.
3. **The label can come from expression.** Most candidate cohorts will never have matched genomics. If instability can be read from RNA (the subject of [[imputing-instability-from-rna-2026-06-09]]), every scRNA-only cohort becomes assignable to a stratum on this map.

## close

The shortest version:

- HRD is one of **six** instability states, not a special case — and they sort onto **one axis** (antigen presentation), into a **hot** cluster and a **cold** contrast arm.
- Every state reads three ways — **scar · signature · function** — and the disagreements between them are signal.
- **CCR8⁺ eTreg** is the convergent lever under the hot cluster; whether it tracks instability *status* is the project's hypothesis to test, not a fact to cite.
- The cold (CIN/WGD) arm is not a gap — it is the **counterfactual** that makes the hot-cluster claim falsifiable.
