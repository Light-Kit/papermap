---
title: 'The HRD resource map — six families of public evidence, organized for navigation'
date: '2026-06-02'
topics:
- hrd
- pan-cancer
- single-cell
- spatial
- proteomics
- bulk-rna
- epigenome
- liquid-biopsy
- real-world
- pdx-organoid
- resources
summary: 'A companion to [the data we have to work with](the-data-we-have-to-work-with.md) — that blog narrated the nine layers chronologically; this one organizes them by *resource family* so the project can navigate by question rather than by paper. Six families: (1) real-world clinico-genomic registries that give HRR-mut + outcome at clinic-N (GENIE / BPC / MSK-CHORD / FMI-Flatiron / ORIEN); (2) PDX + organoid biobanks that give per-model HRD genotype + PARPi sensitivity (PDMR / HCMI / EurOPDX / Sachs / Hill / Bruna / Tiriac); (3) single-cell + spatial hubs the project can query programmatically (CellxGene Census / TISCH2 / 3CA / 10x Xenium Prime 5K); (4) the epigenome layer that IFN-conditioned MHC-II actually runs on (TCGA 450k, Corces 2018 ATAC, ENCODE BRCA1/2 lines, Roadmap, GTEx ATAC); (5) liquid biopsy / ctDNA / MRD where longitudinal HRD-state monitoring is possible (TRACERx-lung Abbosh 2023 — and not much else); (6) HRD-functional scoring methods + benchmarks (HRDetect / scarHRD / ovaHRDscar / DeepHRD / HRProfiler / SigMA / RAD51-IF + the head-to-head benchmarks). Each section has a quick-lookup table. Closes with an aim-→-resource matrix that maps the project''s seven aims onto exactly which resources answer which question.'
starred: true
---

The previous blog, [the data we have to work with](the-data-we-have-to-work-with.md), narrates the public HRD-relevant evidence layer-by-layer in nine sections. That structure is good for *reading*. It is bad for *navigating*. When the project's analysis plan asks "where do I look up per-PDO PARPi IC50 with BRCA-WT included" or "where is CCR8⁺ Treg fraction queryable at uniform schema pan-cancer," paragraph-prose is the wrong index.

This blog is the index. Six resource *families*, one quick-lookup table per family, one closing aim-→-resource matrix. The narrative belongs to the other blog; this one is for reference.

## Family 1 — Real-world clinico-genomic registries

The clinic-N axis. HRR-gene panel calls + treatment-line + outcome, at orders of magnitude more patients than any trial cohort. Trade-off: panel-only (not WGS), variable HRD-call quality, and the deepest commercial dataset (FMI-CGDB) is sponsor-portal-gated.

| Resource | Type | HRD-stratification | Treatment | Access | Anchor |
|---|---|---|---|---|---|
| **AACR GENIE v19** | Registry | HRR panel per site | minimal in main; full in BPC | Open — Synapse + cBioPortal | Project consortium 2017+ |
| **GENIE BPC** | Curated cohort | HRR panel | full PRISSMM regimens + RECIST/OS | Synapse DUA | Lavery 2024 |
| **MSK-CHORD** | Single-institution cohort | MSK-IMPACT HRR | NLP-harmonized + PFS/OS | cBioPortal `msk_chord_2024`; dbGaP phs002995 | Jee 2024 Nature |
| **FMI-Flatiron CGDB** | Commercial registry | F1CDx HRR + LOH + HRDsig | full Flatiron EHR + OS | Sponsor-portal | Singal 2019 JAMA |
| **ORIEN AVATAR** | Multi-center consortium | WES → BRCA + HRDsum derivable | longitudinal EHR | Consortium-gated | Dalton 2018 |
| **MSK-IMPACT** | Platform anchor | BRCA + HRR panel | none in flagship | cBioPortal `msk_impact_2017` | Zehir 2017 |
| **MSK-MET** | Metastatic landscape | HRR panel | site-of-metastasis only | cBioPortal `msk_met_2021` | Nguyen 2022 |
| **Foundation HRDsig** | Panel signature | F1CDx scar | publication only | Open paper | Newberg 2023 JCO PO |
| **Tempus HRD-DNA/RNA** | Commercial paired | Tempus HRD-DNA + HRD-RNA classifier | none in validation | Sponsor-portal | Stover 2022 BMC Cancer |
| **OncoTree** | Taxonomy | n/a | n/a | Open — oncotree.mskcc.org | Kundra 2021 |

**Practical entry points.** GENIE main registry for HRR-mut prevalence denominators; GENIE BPC for PARPi/platinum outcome arms; MSK-CHORD for the deepest single-institution PARPi-OS analysis; ORIEN for paired WES + RNA-seq + outcome at consortium scale; FMI-CGDB via sponsor proposal for commercial-grade scale.

**Honest gaps.** No MSK-IMPACT 100k cohort paper exists; ChinaMAP is a metabolic population reference, not a cancer registry. The "MSK-IMPACT 47k" follow-up the field talks about is institutional metadata, not a published cohort.

## Family 2 — PDX + organoid biobanks

The functional layer beyond CCLE cell lines. Per-model HRD genotype, per-PDO PARPi IC50 measured in vitro, and (in some collections) in-vivo PDX response. Where the project can ask "does a BRCA-WT functional-HRD organoid still die from PARPi" without waiting for a patient cohort.

| Resource | Type | HRD-stratification | PARPi readout | Access | Anchor |
|---|---|---|---|---|---|
| **PDMR (NCI)** | PDX + PDO + PDC + CAF | WES BRCA1/2/PALB2/RAD51C per model | olaparib + niraparib IC50 (PDC subset) | Open browse, MTA for material | NCI ongoing |
| **HCMI** | Next-gen cancer models | GDC harmonized WGS/WES per model | none central (gap) | Open via ATCC | NCI/CRUK/Sanger/HUB |
| **EurOPDX** | 18-institution PDX network | per-model mutation + CNA + RNA-seq | institutional in vivo | Open browse, member MTA | Byrne 2017 / Dudová 2022 |
| **Sachs 2018 — HUB breast PDOs** | PDO biobank | BRCA1/2 + WGS-HRD per PDO | olaparib IC50 per PDO | HUB MTA | Sachs 2018 Cell |
| **Hill 2018 — D'Andrea HGSOC PDOs** | PDO biobank | functional HR (RAD51 foci + fork) | olaparib/niraparib/CHK1i/ATRi IC50 | DFCI MTA | Hill 2018 Cancer Discov |
| **Bruna 2016 — Caldas breast PDTX/PDTC** | PDTX + PDTC | BRCA1 germline + BRCA1-meth + 53BP1 lesions | olaparib IC50 per PDTC | EGA EGAS00001001913 | Bruna 2016 Cell |
| **Tiriac 2018 — PDAC PDOs** | PDO biobank | (no BRCA-mut in library) | 5-chemo + olaparib subset | Open via CSHL/HUB | Tiriac 2018 Cancer Discov |
| **Kopper 2019 — HUB ovarian PDOs** | PDO biobank | per-PDO HRDsum + BRCA + olaparib IC50 | olaparib + niraparib IC50 | HUB MTA | Kopper 2019 Nat Med |
| **Driehuis 2019 — PDAC PDOs** | PDO biobank | per-organoid HRR genotype | 76-compound + olaparib IC50 | HUB MTA | Driehuis 2019 PNAS |
| **van de Wetering 2015 — CRC PDOs** | PDO biobank (framework) | per-organoid genotype | 83-compound IC50 | HUB MTA | van de Wetering 2015 Cell |

**Practical entry points.** Hill 2018 for the cleanest "functional HRD + PARPi IC50" pairing at single-organoid resolution; Sachs 2018 for BRCA-WT-functional-HRD breast; PDMR for pan-cancer cross-validation at the platform level.

**Honest gaps.** Tiriac PDAC library has no canonical BRCA1/2 deleterious mutants — non-BRCA PARPi-response signal is the question this library *poses*, not answers. HCMI has no central drug screen.

## Family 3 — Single-cell + spatial hubs

The programmatic-query axis. Where the project can pull thousands of cells across hundreds of donors at uniform schema in one API call, instead of integrating dozens of GEO deposits paper-by-paper. None of these hubs natively flag HRD status per donor — the project supplies that gating downstream — but the cell-type + tissue resolution is there.

| Resource | Type | HRD-stratification | Treatment-arm tags | Access | Query interface |
|---|---|---|---|---|---|
| **CellxGene Census** | Programmatic hub (~75M human cells) | No (disease + tissue + donor_id) | mixed | Open | `cellxgene-census` Python + R, SOMA/TileDB |
| **TISCH2** | Tumor scRNA hub (190 datasets, ~6M cells) | No | explicit IO-arm tag | Open | per-dataset h5ad/Seurat |
| **3CA** | Curated cancer cell atlas (124 datasets, 2,836 samples) | No (cancer-type only) | per-study | Open | per-study .rds/.h5ad with harmonized MP labels |
| **10x Xenium Prime 5K** | Vendor spatial panels (HGSOC + breast FFPE) | No (vendor demos) | untreated demos | Open | h5/AnnData/zarr |
| **HuBMAP** | Healthy spatial + sc (5,032 datasets, 27 organs) | No (healthy reference) | n/a | Open + EGA controlled | HuBMAPR + search API |
| **Tabula Sapiens v2** | Healthy reference (1.14M cells, 28 tissues) | No | healthy donors | Open | also in Census |
| **GTEx single-cell** | Healthy snRNA (8 tissues, 209k nuclei) | No | healthy | Open | portal + Census |

**Practical entry points.** CellxGene Census for "pull every HGSOC scRNA at uniform schema and score the eTreg signature" in one call. TISCH2 for IO-treated cohorts pre-annotated with treatment arms (Yost, Bi, Sade-Feldman, BIOKEY). 3CA for malignant-cell IFN-α/γ meta-program scoring across tumor types. Xenium Prime 5K for vendor-grade HGSOC + breast spatial controls with CCR8 / MHC-II / ISG markers on the panel.

## Family 4 — Epigenome (methylation + chromatin)

The mechanism layer underneath the IFN bridge. BRCA1 promoter methylation as an HRD driver; CIITA pIV accessibility as the IFN-γ → MHC-II switch; IFN-locus chromatin state. Where the project tests *why* HRD tumors run a chronic-IFN program rather than just *that* they do.

| Resource | Type | HRD-stratification | What it answers | Access | Anchor |
|---|---|---|---|---|---|
| **TCGA HM450k pan-cancer** | Methylation (10k tumors, 33 types) | BRCA1 promoter beta + pair with HRDsum | "is BRCA1-meth an HRD driver per cancer type" | Open via GDC | TCGA Pan-Can 2018 |
| **Corces 2018 — TCGA pan-cancer ATAC** | Bulk ATAC (410 tumors, 23 types) | sample-matched to HRDsum | "is CIITA / IFN locus accessible in HRD tumors" | Open via GDC | Corces 2018 Science |
| **Roadmap Epigenomics** | 111 reference epigenomes | n/a (healthy baseline) | normal-tissue chromatin baseline | Open | Kundaje 2015 Nature |
| **ENCODE BRCA1/2-line ATAC + ChIP** | Cancer-line chromatin (MCF7, HCC1937, UWB1.289, Capan-1, etc.) | near-isogenic BRCA1/2 vs WT | line-level mechanism | Open | ENCODE consortium |
| **Granja 2021 — pan-cancer scATAC** | scATAC reference + ArchR | none | cell-type-resolved accessibility | Open (GSE139369) | Granja 2021 Nat Genet |
| **GTEx v9 ATAC** | Normal-tissue bulk ATAC (~400 samples) | n/a (healthy baseline) | tumor-vs-normal delta | Open | GTEx Consortium |
| **Ma 2020 — SHARE-seq** | Paired scATAC + scRNA method anchor | n/a | technical reference for paired modality | Open (GSE140203) | Ma 2020 Cell |
| **GEO HRD-meth deposits** | GSE65820 / GSE233242 / GSE211692 | explicit HRD labels per deposit | discrete-cohort complements to TCGA-450k | Open via GEO | per-deposit |
| **Polak 2017 — BRCA1-meth HRD** | Paper anchor | yes (paired WGS + 450k) | "BRCA1-meth phenocopies BRCA1-mut HRD" | Open | Polak 2017 Nat Genet |
| **Bell 2011 — TCGA-OV** | Paper anchor | yes (HGSOC HM27/HM450) | TCGA-OV BRCA1-meth class | Open | TCGA Research Network |
| **CIITA pIV / IFN-γ** | Mechanism review | n/a | molecular hook for IFN-γ → MHC-II | Open | Wright-Ting 2006 |
| **Axelrod 2019 — MHC-II on tumor** | Review | n/a | tumor-cell MHC-II in breast/melanoma | Open | Axelrod 2019 CCR |

**Practical entry points.** TCGA-450k × GerkeLab HRDsum for the BRCA1-meth HRD-driver axis; Corces 2018 for CIITA promoter accessibility per HRD-stratified TCGA tumor; ENCODE BRCA1/2-line ATAC for the line-level mechanism behind it.

**Honest gap.** No pan-TCGA EPIC v2 exists. No pan-TCGA WGBS exists. EPIC-class methylation lives in HMF / ICGC-ARGO subsets, not a TCGA replacement.

## Family 5 — Liquid biopsy / ctDNA / MRD

The longitudinal axis under treatment. The honest news: this family is mostly empty for public deposits. Hartwig has no plasma arm. The pivotal PARPi-trial ctDNA cohorts (PROfound, MAGNITUDE, PROpel) are sponsor-controlled. The single Tier-A deposit is TRACERx-lung — paired tissue + plasma — which is not PARPi, but is the *methodological template* the project should mirror.

| Resource | Type | HRD-stratification | Treatment | Access | Anchor |
|---|---|---|---|---|---|
| **TRACERx lung — Abbosh 2023** | Serial plasma + tissue WES | tissue-derived HRD scoring | adjuvant chemo + treatment-naive baseline | EGA EGAS00001006494 | Abbosh 2023 Nature |
| **PROfound ctDNA — Chi 2023** | Plasma BRCA/ATM (mCRPC PARPi) | BRCA1/2 + ATM plasma | olaparib vs abi/enza | Sponsor (AZ + FMI) | Chi 2023 CCR |
| **MAGNITUDE ctDNA — Chi 2025** | Serial plasma HRR (mCRPC PARPi) | HRR panel longitudinal | niraparib + abi | Sponsor (J&J + Resolution) | Chi 2025 Nat Med |

**Practical entry point.** TRACERx lung is the only longitudinal HRD-adjacent plasma cohort with paired tissue WES deposited publicly. Use as the methodological template. PROfound + MAGNITUDE cite the published BRCA/HRR plasma operating points; raw data not accessible.

## Family 6 — HRD-functional scoring methods + benchmarks

The "which HRD definition to use when" axis. The project already has HRDsum (Knijnenburg), CHORD, SBS3, and expHRD. This family adds the rest of the scoring landscape and the head-to-head benchmarks needed to pick per cohort.

| Method | Input | Cutpoint | Strength | Anchor |
|---|---|---|---|---|
| **HRDsum / scarHRD** | WES/WGS or SNP-array | ≥42 (Telli/Knijnenburg) | universal baseline | Knijnenburg 2018 + Sztupinszki 2018 |
| **HRDetect** | WGS | score ≥0.7 | best WGS classifier, AUC ~0.98 | Davies 2017 Nat Med |
| **CHORD** | WGS | probability ≥0.5 | shipped with HMF; BRCA1-like vs BRCA2-like | Nguyen 2020 Nat Commun |
| **ovaHRDscar** | WGS/WES | ≥54 | outperforms HRDsum for HGSOC PFS/OS | Färkkilä 2023 npj PrecOnc |
| **myChoice GIS** | Myriad SNP-based NGS | ≥42 | FDA-CDx (NOVA/PRIMA/PAOLA) | Telli 2016 CCR |
| **F1CDx LOH** | Foundation panel | ≥16% (ARIEL3) | FDA-CDx for rucaparib | Coleman 2017 + Hodgson 2018 |
| **Foundation HRDsig** | F1CDx panel CNV | model probability | F1CDx pan-tumor successor | Jensen 2025 PLOS One |
| **DeepHRD** | H&E WSI | model probability | image-only; rescues WGS-missing | Bergstrom 2024 JCO |
| **HRProfiler** | WES | model probability | outperforms HRDetect on WES | Abbasi 2025 Cancer Res |
| **SigMA** | targeted panel | Sig3 likelihood | rescues panel-only HRD on GENIE | Gulhan 2019 / Polak-Park 2022 |
| **expHRD** | RNA-seq | model probability | adds HRD calls to RNA-only ICI cohorts | Park 2024 BMC Bioinf |
| **Tempus HRD-RNA** | Tempus xT RNA | model probability | industrial RNA-HRD validator | Stover 2022 BMC Cancer |
| **RAD51-IF foci** | FFPE IF | <10% RAD51⁺ geminin⁺ = HRD | catches HR-restoration / reversion; CCNE1-amp gating | Castroviejo-Bermejo 2018 EMBO MM |
| **Marquard 2015** | components | n/a | origin of LOH/LST/TAI per-cancer ranking | Marquard 2015 Biomark Res |
| **Vergote 2024** | consensus | n/a | EU expert HRD-testing recommendations | Vergote 2024 EJC |

**When to use which.** Use **HRDsum / scarHRD (≥42)** as the universal cross-cohort baseline for TCGA, CPTAC, and any WES dataset. For **HGSOC arms specifically use ovaHRDscar (≥54)** — it out-predicts HRDsum for PFS/OS in HGSOC. Reserve **CHORD / HRDetect** for WGS cohorts (HMF, PCAWG) where they reach AUC > 0.95. For **RNA-only or ICI cohorts** use **expHRD** with **Tempus HRD-RNA** as the industrial sanity-check. Layer **SigMA** on panel-only cohorts (MSK-IMPACT, GENIE). Call **DeepHRD** on H&E-only slides. Add **RAD51-IF (functional HRD)** as the orthogonal gate that catches HR-restoration / reversion edge cases the scar scores misclassify — especially for CCNE1-amp HGSOC where ~half are still functionally HRD.

## Aim → resource matrix

The project's analysis plan has seven aims (per the closing implications of [the data we have to work with](the-data-we-have-to-work-with.md)). This matrix maps each aim onto the families and specific resources that answer it most directly.

| Aim | Question | Family | First-line resources |
|---|---|---|---|
| **Aim 1** | Pan-cancer HRD landscape | hrd-genomics / real-world / epigenome | TCGA (Knijnenburg HRDsum) + HMF (CHORD) + PCAWG (SBS3) + **TCGA-450k (BRCA1-meth)** + **GENIE v19** for HRR prevalence + **MSK-CHORD** for outcomes |
| **Aim 2** | HRD → IFN/eTreg signal | atlas-singlecell / epigenome | MSK-SPECTRUM (HGSOC scRNA) + Pal 2021 BRCA1+/– + Launonen/Färkkilä mIF + **Corces 2018 ATAC** + **CPTAC HGSOC/BRCA proteogenomics** |
| **Aim 3** | Signature mechanics + per-gene fingerprint | signatures / models | Replogle Perturb-seq + **DepMap/PRISM** + **HRDetect** + **scarHRD** + **ovaHRDscar** + **RAD51-IF** + **Hill 2018 PDOs** + **Sachs 2018 PDOs** |
| **Aim 4** | Pan-cancer placement / immune archetype | atlas-singlecell / datasets | Zheng 2021 T-atlas + Combes IRIS + Chu T-stress + 3CA + **TISCH2** + **CellxGene Census** |
| **Aim 5** | Clinical concordance (IO proxy) | datasets / real-world | IMvigor210 + IMmotion150/151 + Braun CM-9/10/25 + **GENIE BPC** + **FMI-CGDB** |
| **Aim 6** | Translational hypothesis (PARPi-treated) | parpi-immune / real-world | Luo 2024 + TOPARP-B + GSE140996 + **TRACERx-lung methodology** + **PROfound/MAGNITUDE plasma operating points** |
| **Aim 7** | CCR8 dynamics under IO (clonotype) | atlas-singlecell | Yost BCC/SCC + Krishna ADAPTeR + Caushi NSCLC + Luoma HNSCC + Magen HCC + **Tay 2025 NSCLC CCR8** |

Bold entries are Round-4 additions.

## What this changes for the project

Not the chain, not the bet — the chain is still in the [chain blog](the-chain-from-broken-dna-to-broken-t-cells.md) and the bet is still in [the pan-cancer bet](the-pan-cancer-bet.md). What changes is *legibility*. Round 1–3 built up the corpus opportunistically — anchor, then PARPi, then HRD-stratified-non-PARPi. Round 4 reorganizes the result into a search index. Pick the question, find the family, get the resources.

If the project asked "what should I download today to start scoring HRDsum × IFN signature × CCR8⁺ Treg fraction on a pan-cancer cohort with outcomes?" the answer, before this round, was *go read four blog posts*. The answer now is one sentence: **MSK-CHORD on cBioPortal, score with scarHRD, deconvolve with CIBERSORTx, regress against the eTreg signature, control for total immune infiltrate + TMB + MSI**. The resources are in the corpus; the methods are in the signatures family; the cohort is in the real-world family. The map exists.
