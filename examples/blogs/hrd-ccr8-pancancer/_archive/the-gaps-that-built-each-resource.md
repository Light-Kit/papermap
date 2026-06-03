---
title: 'the gaps that built each resource — origin stories of the data this corpus rests on'
date: '2026-06-02'
topics:
- hrd
- tcga
- pcawg
- hartwig
- hrdetect
- chord
- cellxgene
- human-cell-atlas
- organoid
- msk-impact
- aacr-genie
- tracerx
- data-creation
- consortia
summary: 'A prequel to the resource-map and the data-we-have-to-work-with blogs. Every dataset in this corpus was built to fix something the previous generation of data could not do — a gap in scale, in modality, in cohort, in scoring, in time. This essay walks the six gaps and names the consortia, labs, and companies that filled them, with year, PI, funder, and the founders'' own framing pulled from the original papers. By the end the choice of Luo 2024 as the anchor makes more sense: the anchor stands on every gap-filling generation before it.'
starred: true
---

Every resource in this vault was built because the previous generation of data
could not do something the people building it needed it to do. The TCGA pilot
in 2006 was built because no single group had ever measured DNA, copy number,
methylation, and expression on the same tumors at scale. PCAWG was built
because TCGA was exome-dominant and structural variants were invisible.
Hartwig was built because the cancers that kill people are metastatic and TCGA
sampled the primary. HRDetect was built because the Myriad assay was a
paywalled black box. The Human Cell Atlas was built because a bulk RNA-seq
sample is a 20–50% non-tumor average. TRACERx was built because a single
biopsy is a snapshot of a process.

Six gaps, six waves of resource-building. This essay walks them one at a time.
It is the prequel to [the data we have to work with](the-data-we-have-to-work-with.md)
(which lists what exists) and [the HRD resource map](the-hrd-resource-map.md)
(which organizes it by family). Here the question is different: *why does each
thing exist at all*. Every year, PI, funder, and "original goal" line below
was pulled from the source paper or portal cited at the end of the section,
not from memory.

## 1. map a population, not a tumor

The first gap was scale-of-modalities. Cancer genomics before TCGA was
Sanger-era — one gene, one paper. The TCGA pilot, launched in 2006 by the NCI
and NHGRI jointly, made a bet: characterize hundreds of the *same* tumors
across DNA sequencing, SNP-array copy number, expression microarrays, and
methylation arrays, and put the data into the community before publication.
The 2008 *Nature* glioblastoma paper validated the bet — 206 tumors profiled
across four platforms, 91 of them Sanger-sequenced — with the founding aim
stated bluntly: "to assess the value of large-scale multidimensional analysis
of these molecular characteristics in human cancer and to provide the data
rapidly to the research community." That sentence is the entire infrastructure
philosophy of cancer genomics for the next decade.

ICGC followed in 2008 (charter year; the founding meeting was Toronto, October
2007). The 2010 Hudson *Nature* paper set the goal at "comprehensive
catalogues of genomic abnormalities ... in 50 different cancer types," with a
distributed, country-by-country production model and a new bioethical
framework (open + controlled tiers) that became the template for every
consortium since. ICGC is the resource TCGA had to share the world with.

PCAWG was the cross-cohort reanalysis. Published in 2020 as a *Nature*
flagship by the ICGC/TCGA Pan-Cancer Analysis of Whole Genomes Consortium, it
pooled 2,658 unique donors (2,778 samples) across 38 tumor types and ran them
through a single uniform pipeline on shared cloud infrastructure. The gap it
filled was that ICGC's per-country pipelines had produced subtly
non-comparable calls, and TCGA was exome-biased — non-coding drivers and
structural variants were essentially invisible. PCAWG is what made the
non-coding driver vocabulary and the mutational-signature vocabulary
cross-cohort-credible at all.

Hartwig (HMF) was the metastatic answer, published by Priestley et al. in
2019 as the largest pan-cancer study of metastatic genomes — 2,520 paired
tumor-normal WGS from 2,399 patients, sequenced from the Dutch CPCT-02 / DRUP
biopsy network across 41 hospitals. The motivation was direct: the cancers
that kill people are metastatic, and TCGA had almost none of them. HMF showed
metastatic tumors carry whole-genome duplication ~56% of the time vs 25–37%
in primaries — a difference that would have been impossible to see without
the new cohort.

CPTAC was the proteogenomic layer. Framed publicly by Ellis et al. in *Cancer
Discovery* 2013, the consortium ran the latest mass-spectrometry methods on
TCGA-annotated tumors, with the stated goal of providing "a fully integrated
accounting of DNA, RNA, and protein abnormalities in individual tumors." TCGA
sequenced DNA and RNA. Drugs hit proteins. CPTAC closed that loop.

*Sources*: GBM-pilot 2008 PMC2671642; ICGC Hudson 2010 PMC2902243; PCAWG
PMC7054214; HMF Priestley 2019 PMC6872491; CPTAC Ellis 2013 PMID 24124232.

## 2. score HRD without a black box

The second gap was scoring. From the late 2000s on, BRCA1/2 testing alone was
missing the bulk of functionally HR-deficient tumors. Marquard and Birkbak
showed that LOH, telomeric allelic imbalance (TAI), and large-scale state
transitions (LST) each tracked HRD on SNP arrays; the field needed a single,
deployable HRD call. Telli et al. in 2016 (*Clinical Cancer Research*) summed
the three into one unweighted HRD-score, locked the prospective cutoff at ≥
42, and validated it on three neoadjuvant TNBC trials. That became Myriad's
myChoice CDx and, in time, the olaparib and niraparib companion diagnostic —
but the algorithm was proprietary, the platform was Myriad-only, and academic
groups had no open implementation.

HRDetect was Davies and Nik-Zainal's 2017 *Nature Medicine* answer, built at
the Wellcome Sanger Institute. The premise was that whole-genome sequencing
exposed mutational signatures (SBS3, SBS8, rearrangement signatures RS3/RS5,
microhomology indels) and the genomic-scar HRD-index all at once, and that
fusing them in a lasso logistic regression on 560 WGS breast cancers would
recover BRCA1/2-deficiency genome-wide — AUC 0.98, sensitivity 98.7%, and the
inferred HR-deficient breast fraction expanded to ~22%. The founding sentence
states the gap directly: about 1–5% of breast cancers carry BRCA1/2 mutations
and are selectively PARPi-sensitive; HRDetect extends that population.

scarHRD (Sztupinszki and Szallasi, 2018, *npj Breast Cancer*) was the
open-source NGS port. By 2018 SNP arrays were being retired for WES/WGS, and
the published HRD-sum had no NGS implementation. scarHRD re-derived
allele-specific copy number from WES/WGS BAMs via Sequenza/ASCAT and
recomputed the three scar scores — Pearson r 0.73–0.87 against the array
versions on TCGA TNBC. It is the calculator most academic pan-cancer HRD
analyses still call.

CHORD (Nguyen and Cuppen, 2020, *Nature Communications*) pushed past
signatures. Built on the Hartwig metastatic cohort (3,504 HMF + 1,854 PCAWG
WGS), it is a random forest trained directly on genome-wide mutation-context
counts and outputs a BRCA1- vs BRCA2-type call, "thereby simplifying HRD
calling and avoiding potential complications associated with the fitting step
required for computing signature contributions." The gap CHORD filled: HRDetect
was breast-trained and signature-dependent; CHORD is pan-cancer and
signature-free.

ovaHRDscar (Perez-Villatoro and Färkkilä, 2023, *npj Precision Oncology*) is
the ovarian-specific tightening. Telli's HRD ≥ 42 threshold was originally set
on a mixture of breast and ovarian samples, and HGSC patients were being
mis-stratified by a breast-weighted cutoff. The authors retrained the
allelic-imbalance length/count thresholds on HGSC-only WGS and gained
precision in three independent ovarian cohorts (DECIDER, TERVA, PCAWG AU-OVA).

DeepHRD (Bergstrom and Alexandrov, 2024, *J Clin Oncol*) moved the call into
H&E. The founding sentence: "Standard diagnostic tests for detecting HRD
require molecular profiling, which is not universally available." A weakly
supervised CNN trained on TCGA whole-slide images (n = 1,008 breast + 459
ovarian) predicts HRD without any sequencing input, with platinum-PFS
hazard ratios on external cohorts that match molecular HRD calls. In
low-resource settings — or for slides where DNA is gone — DeepHRD is the
only HRD call you can run.

*Sources*: Telli 2016 PMID 26957554; Davies 2017 PMID 28288110; Sztupinszki
2018 PMID 29978035; Nguyen 2020 PMC7643118; Perez-Villatoro 2023 PMC9800569;
Bergstrom 2024 PMID 39083703.

## 3. sequence what the clinic actually treats

The third gap was provenance. TCGA samples were research-only, with no
treatment history and no outcome data — wonderful for biology, useless for
"did this patient respond to platinum." A different kind of resource had to
be built.

MSK-IMPACT was the first at-scale clinical-grade NGS. Cheng et al. validated
the 341-gene hybridization-capture panel as a CLIA assay in 2015 (*J Mol
Diagn*); Zehir et al. in 2017 (*Nat Med*) reported the first 10,336 advanced-
cancer patients profiled on the expanded 410-gene version at Memorial Sloan
Kettering, with senior authorship by Michael Berger. Eleven percent of those
patients enrolled on genomically matched trials — the founding sentence is
that MSK-IMPACT was built as a "flexible and comprehensive" assay to profile
oncogenic DNA prospectively and match patients to genomically guided studies.
The downstream consequence is that essentially every cBioPortal cohort that
calls itself "clinical-grade pan-cancer" descends from this design.

AACR Project GENIE was the multi-center pool. Published in *Cancer Discovery*
2017 with Cerami (Dana-Farber) and Sawyers (MSKCC) as senior authors, it
launched with eight founding centers (DFCI, MSKCC, Johns Hopkins, MD Anderson,
Vanderbilt-Ingram, Gustave Roussy, Princess Margaret, NKI) sharing ~19,000
samples from 18,324 patients. The motivation was that clinical NGS data were
"frequently siloed in individual institutions" — no single center had the
power to ask questions about rare cancers or rare variants. GENIE solved it
with a master participation agreement, a data-use agreement, and
Sage-Bionetworks + cBioPortal as the harmonization layer.

The Foundation Medicine + Flatiron clinico-genomic database (CGDB) was the
commercial counterpart. Singal et al. published the design in *JAMA* 2019:
deidentified linkage of Foundation Medicine's CGP results to Flatiron's
EHR-derived clinical records across 275 US oncology practices, launched on
4,064 advanced NSCLC patients. The gap was that FoundationOne reports were
detached from outcomes and Flatiron's EHR records had no panel-grade molecular
profile; the linkage made both useful for real-world precision-oncology
evidence.

ORIEN AVATAR is the academic counterpart, federated through the Total Cancer
Care protocol — a single consent giving lifetime longitudinal follow-up,
biobanking, and recontact. AVATAR layers WES + transcriptome on TCC-consented
patients. The mission is on the portal: "harness technology-based
collaboration to break down barriers between institutions, enable rapid
learning, and accelerate research and discovery." (The portal does not list a
founding year; the founding-institution lineage at Moffitt + Ohio State is
documented elsewhere.)

Tempus HRD-RNA (Leibowitz et al., 2022, *BMC Cancer*) addressed the panel-era
HRD-call gap. Existing HRD assays were DNA-only and validated mainly on
breast/ovarian. Tempus trained an RNA-expression classifier on >16,000 RNA-
seq samples paired with their HRD-DNA call, with the explicit framing that
DNA + RNA together "may identify HRD-positive patients across cancer types"
when DNA scar signal alone is ambiguous. (First author is Leibowitz at Tempus
Labs; Stover at Ohio State is collaborating clinical investigator — the
corpus id is `stover-2022-tempus-hrd` for legacy reasons.)

*Sources*: Cheng 2015 PMID 25801821; Zehir 2017 PMID 28481359; AACR GENIE
PMC5611790; Singal 2019 PMID 30964529; ORIEN portal oriencancer.org/
research-programs; Leibowitz 2022 PMID 35643464.

## 4. build the model when the patient can't be the experiment

The fourth gap was experimental. Trial-stage drug combinations cannot be
tested directly on patients. Mice are not humans. Cell lines lose tumor
heterogeneity after a few passages. Something in between was needed.

The NCI Patient-Derived Models Repository (PDMR) launched as a public reagent
in 2017 (with development from ~2012), providing early-passage, molecularly
characterized, clinically annotated PDX, PDC, CAF, and organoid models from
NCI Frederick — explicitly to "improve preclinical reproducibility and clarify
the PDX role in drug development." HCMI / NGCM (announced 2016, public launch
2017) was the next-generation expansion, with NCI, Cancer Research UK,
Wellcome Sanger, and Hubrecht Organoid Technology as the four partners — the
verbatim goal was up to "1,000 patient-derived next-generation cancer
models (NGCMs)" combining organoid, conditionally reprogrammed cell, and
neurosphere protocols with case-matched normal-tumor sequencing.

EurOPDX is the European federation, formalized in Byrne et al. 2017 (*Nat Rev
Clin Oncol*) and now operating >1,500 PDX models across >30 cancer
pathologies. The founding rationale was that single-center PDX collections
were too small to cover cancer heterogeneity and lacked standardized protocols
for preclinical work.

The Clevers-lab organoid trio is the living-tumor biobank lineage. Sachs et
al. (2018, *Cell*) built the breast biobank — >100 organoid lines from >100
patients at 95% establishment efficiency, enabled by Wnt + R-spondin + Noggin
+ neuregulin-1 ductal-epithelium media — with the explicit goal of "a
representative collection of well-characterized BC organoids available for
cancer research and drug development." Tiriac et al. (2018, *Cancer
Discovery*) built the PDAC counterpart at Cold Spring Harbor in Tuveson's lab:
114 PDOs from 101 patients, with the rationale that PDAC cell lines were
skewed to basal/squamous and the Classical subtype was under-represented —
"pharmacotyping" complete in under six weeks meant clinical-decision-grade
turnaround. Kopper et al. (2019, *Nature Medicine*) closed the gap with
ovarian: 56 lines from 32 patients covering all four main subtypes.

DepMap formalized the dependency-map concept in 2017 (Tsherniak et al.,
*Cell*) by running genome-scale shRNA across 501 cancer cell lines and
deconvolving on-target from seed-effect dependencies with the DEMETER
algorithm — an answer to the gap that tumors carry hundreds of mutations but
only a handful are actionable. The portal now hosts >2,000 cancer models with
CRISPR (Avana) and drug-screen layers; the original framing was "an initial
framework for a cancer dependencies map" enabling "the prioritization of
therapeutic targets."

*Sources*: PDMR dctd.cancer.gov/drug-discovery-development/reagents-materials/
pdmr; HCMI cancer.gov/ccg/research/functional-genomics/hcmi; EurOPDX
europdx.eu; Sachs 2018 PMID 29153835; Tiriac 2018 PMC6125219; Kopper 2019
PMID 31011207; Tsherniak 2017 PMC5667678.

## 5. see the cell, not the bulk

The fifth gap was averaging. A bulk RNA-seq sample from a TCGA tumor is 20–
50% non-tumor by mass — stroma, infiltrate, normal epithelium — and you
cannot tell IFN-producing cells from IFN-receiving cells without resolution
below the bulk. The Human Cell Atlas (Regev, Teichmann, Lander et al., 2017,
*eLife* white paper) was the field's answer at the human-tissue scale. The
founding sentence: bulk RNA-seq "could only be applied to bulk tissue samples
... providing average genomic measures ... but masking their differences
across cells." The goal was "an open comprehensive reference map of the
molecular state of cells in healthy human tissues" at a target of at least 10
billion cells across all tissues, organs, and systems — with the consortium
growing to ~3,900 members across ~1,700 institutes in 100+ countries.

CellxGene Census (Chan Zuckerberg Initiative, first LTS release May 2023) is
the programmatic-query layer. The motivation was that CZ CELLxGENE Discover
hosted hundreds of single-cell datasets but every cross-study reuse demanded
one-off harmonization. The SOMA API specification on TileDB-SOMA exposes
33M+ cells, 436 datasets, and 2,700+ cell types across five species as one
queryable cloud-resident matrix, with AnnData / Seurat / SingleCellExperiment
interop. The original goal was simply to "access, query, and analyze all
single-cell RNA data from CZ CELLxGENE Discover" without manual
harmonization.

TISCH2 (Han et al., 2023, *Nucleic Acids Research*) is the tumor-focused
harmonized hub from the Wang and Li labs at Tongji and Sichuan. The gap was
that tumor scRNA studies were accumulating faster than analysts could
re-process them; TISCH2 ran every dataset through the same MAESTRO pipeline
(QC, batch correction, clustering, DE, cell-type annotation) and at launch
served 190 datasets / ~6.3 million cells / 50 cancer types.

3CA — the Curated Cancer Cell Atlas — is the Tirosh-lab pan-cancer atlas
behind the meta-program paper (Gavish et al., 2023, *Nature*). Cancer scRNA
studies had been siloed per tumor type; 3CA integrated 77 studies into one
substrate (1,163 tumor samples, 24 tumor types) and ran per-tumor NMF to
extract 41 consensus malignant meta-programs. It is the only pan-cancer
single-cell tumor-state vocabulary that exists at this scale today.

HuBMAP (Snyder et al., 2019, *Nature*) is the spatial counterpart, funded by
the NIH Common Fund and led from Stanford. The HCA's dissociated scRNA
sacrificed tissue architecture; HuBMAP built it back with imaging mass
cytometry (CODEX, MIBI), spatial transcriptomics (Slide-seq, Visium), and
mass-spec metabolomics, coordinated through Tissue Mapping Centers + a HIVE
data hub, with the goal of "a widely accessible framework for comprehensively
mapping the human body at single-cell resolution."

Zheng et al. (2021, *Science*) built the pan-cancer T-cell atlas from
Peking University (Zhang lab) — ~390,000 T cells across 21 cancer types from
316 donors, with paired TCR-seq where available. The gap was that "we lack
systematic comparison of the heterogeneity and dynamics of tumor-infiltrating
T cells across cancer types" — every prior T-cell study was one cancer at a
time. The CCR8⁺ terminal-eTreg pattern that anchors this project's chain is
visible in Zheng's atlas across tumor types because Zheng built the substrate
that lets you see it.

*Sources*: HCA Regev 2017 elifesciences.org/articles/27041; CellxGene Census
chanzuckerberg.github.io/cellxgene-census/; TISCH2 Han 2023 NAR D1425;
3CA Gavish 2023 nature.com/articles/s41586-023-06130-4; HuBMAP Snyder 2019
PMID 31597973; Zheng 2021 PMID 34914499.

## 6. watch time, not snapshot

The sixth gap was temporal. An HRD call is dynamic — reversion mutations
restore BRCA function, clonal selection picks resistant subclones, treatment
pressure rewrites the call between resection and progression. A single biopsy
captures none of that.

TRACERx (Jamal-Hanjani et al., 2014, *PLOS Biology*) was Charles Swanton's
design answer, funded by Cancer Research UK and run out of UCL Cancer
Institute. The founding sentence: "a single tumour biopsy may not fully
capture the current or future tumour landscape and merely represents a
'snapshot' of the disease in space and time." The protocol was prospective
multi-region WES at resection plus serial re-biopsy at recurrence across 842
stage I–IIIA NSCLC patients with five-year follow-up. The Abbosh et al. 2023
*Nature* paper layered a tumor-informed personalized ctDNA assay on top —
multi-region WES from the primary feeds the panel design, which then tracks
plasma ctDNA at ~3-monthly cadence to detect MRD months before imaging
relapse. That is the timeline that will eventually exist for HRD reversions
under PARPi.

The Hartwig cohort is the metastatic analog. The Priestley 2019 paper notes
that biopsies were taken "at study entry and again at progression on each new
line of therapy" — a serial re-sampling protocol that produces longitudinal
metastatic WGS for the patients who give consent in the CPCT-02 / DRUP
network. For PARPi-treated populations specifically, HMF is where
treatment-pressure HRD evolution becomes visible.

The PROfound trial (de Bono et al., 2020, *NEJM*; NCT02987543, AstraZeneca +
Merck) was the first phase III mCRPC trial that selected patients by HRR-gene
status and tracked HRR mutations longitudinally on PARPi pressure. Cohort A
(BRCA1/BRCA2/ATM) had rPFS 7.4 vs 3.6 months on olaparib vs second-line
hormonal therapy — but the ctDNA sub-protocol matters as much, because that
is where HRR-reversion biology surfaces in the public record.

*Sources*: TRACERx Jamal-Hanjani 2014 PLOS Biol pbio.1001906; Abbosh 2023
DOI 10.1038/s41586-023-05776-4; HMF Priestley 2019 PMC6872491; PROfound
ClinicalTrials.gov NCT02987543 / DOI 10.1056/NEJMoa1911440.

## and then there's Luo 2024

The anchor of this whole project — Luo et al., 2024, *Cell* — uses single-cell
RNA-seq with paired TCR-seq, spatial transcriptomics, CCR8-humanized mouse
models, and functional CRISPR. *None of that existed when TCGA launched in
2006.* Droplet scRNA was a research curiosity until ~2015. CellxGene Census
is three years old. CCR8 was not seriously named as a tumor-eTreg target
until Plitas and De Simone in 2016. The TCR-seq harmonization that lets Luo
say a clonotype is shared between a tumor-infiltrating eTreg and the same
patient's blood draw was a 2018-onwards capability.

Luo is what you get when six waves of resource-building stack. The pan-cancer
substrate (TCGA, ICGC, PCAWG, HMF, CPTAC) defined what HRD looks like at
genome scale. The HRD-scoring lineage (HRDetect → CHORD → ovaHRDscar →
DeepHRD) made the call portable. The clinical-grade panels (MSK-IMPACT,
GENIE, FMI-Flatiron, ORIEN, Tempus) connected the call to treatment and
outcome. The living-tumor models (PDMR, HCMI, EurOPDX, the Clevers
organoids, DepMap) made the call testable in trial-stage combinations. The
single-cell hubs (HCA, CellxGene Census, TISCH2, 3CA, HuBMAP, Zheng) made
the cellular consequence visible. The longitudinal cohorts (TRACERx,
HMF, PROfound ctDNA) made the time dimension legible.

When this project goes to deconvolve a CCR8⁺ eTreg signature from a bulk
TCGA tumor and ask whether it co-segregates with HRD, every one of those
six waves is load-bearing. The choice of Luo as the anchor isn't an
arbitrary "newest interesting paper" pick. It is the paper that could only
have been written *now*, because the data ecosystem it depends on only
exists *now*.

For the resources themselves, in inventory form, see
[the data we have to work with](the-data-we-have-to-work-with.md) and
[the HRD resource map](the-hrd-resource-map.md). For why those resources are
the ones the project's seven aims actually need, see the aim-to-resource
matrix at the bottom of the resource-map blog.
