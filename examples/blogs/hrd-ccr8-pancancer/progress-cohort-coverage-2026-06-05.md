---
title: 'cohort coverage progress — what we wanted, what we have'
date: '2026-06-05'
topics:
  - hrd
  - pan-cancer
  - data-prep
  - paired-data
  - phase-1
  - progress
summary: 'planned-vs-actual cohort matrix mirroring [[matched-multi-omic-tumor-table]] but with a per-row state column (planned / downloaded / partial / blocked). 73 manifest rows; ~43 touched at 2026-06-05; 31 untouched all credential-gated under the public-only pivot.'
starred: true
---

# cohort coverage progress — what we wanted, what we have

[[matched-multi-omic-tumor-table]] is the planned schema — the four-bucket inventory of every public cohort that satisfies the genomics+TME-resolution gate. This post is its operational sibling: same four buckets, same per-row identity, plus a `state` column that records whether the cohort is `planned`, `downloaded`, `partial`, or `blocked` on disk. The 2026-06-04 pivot to public-tier only is what makes the reachable-vs-not split crisp — every gated cohort whose only path is a DUA / PAT is `blocked` by policy, not by missing bandwidth.

## top line

- **Planned (manifest):** 73 cohorts.
- **On disk (downloaded + partial + ready + qc_pass):** 35 cohorts. Per-patient sum across rows with reported N ≈ 1,950 (HTA3 484 is blocked; METABRIC-IMC 693 + Jackson 281 + Greenwald 100 + Caushi 16 etc. are on disk).
- **Structurally gated under the public-only pivot:** 6 explicitly `blocked` rows (htan-hta3, launonen, farkkila-topacio, magness-enfield, htapp-klughammer, tietscher-2023-breast-imc superseded), plus 32 `planned` rows that are credential-gated EGA / dbGaP / Synapse / HTAN / GSA accessions never pursued in the v5 sweep.

Bucket states use bare text tokens: `downloaded` (on disk, ready / qc_pass / downloaded), `partial` (on disk but a primary axis still missing), `blocked` (status.tsv flagged blocked under the pivot), `planned` (in manifest, never touched).

## A — sc/snRNA + paired genomics

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Luo 2024 NANT ovarian (anchor) [v]** | standalone | HGSOC | WGS + HRD scoring | scRNA + scTCR | 30 | partial | GEO `GSE222556` |
| **Vázquez-García 2022 MSK SPECTRUM [v]** | MSK-SPECTRUM | HGSOC | WGS + scWGS (DLP+) | scRNA | 42 | planned | Synapse `syn25569736` |
| **Olbrecht 2021 [v]** | standalone | HGSOC | germline BRCA | scRNA | 7 | downloaded | ArrayExpress `E-MTAB-8107` |
| **Pal 2021 BRCA1-carrier breast [v]** | standalone | breast (BRCA1) | germline BRCA1 + WGS | scRNA | 21 | downloaded | GEO `GSE161529` |
| **Bassez 2021 BIOKEY [v]** | BIOKEY | breast anti-PD-1 pre/post | WES + panel | scRNA + scTCR | 40 | planned | EGA `EGAS00001004809` |
| **Yost 2019 BCC [v]** | standalone | BCC anti-PD-1 | WES | scRNA + scTCR | 14 | downloaded | GEO `GSE123813` |
| **Caushi 2021 NSCLC [v]** | standalone | NSCLC anti-PD-1 | WES + panel | scRNA + scTCR | 16 | downloaded | GEO `GSE176021` |
| **Luoma 2022 HNSCC [v]** | standalone | HNSCC anti-PD-1 | clinical panel | scRNA | 29 | downloaded | GEO `GSE200996` |
| **Sade-Feldman 2018 mel [v]** | standalone | melanoma anti-PD-1 | WES | scRNA | 48 | downloaded | GEO `GSE120575` |
| **Bi 2021 ccRCC [v]** | standalone | ccRCC anti-PD-1 | WES | scRNA | 8 | planned | Broad SCP `SCP1288` + dbGaP `phs002252` |
| **Liu 2022 NSCLC [v]** | standalone | NSCLC (IO) | WES | scRNA | 35 | planned | EGA `EGAS00001005003` |
| **Magen 2023 HCC [v]** | standalone | HCC anti-PD-1 | WES | scRNA + scTCR | 33 | planned | accession not located |
| **Wang 2025 SCLC PARPi [v]** | standalone | SCLC PARPi | panel | scRNA | verify | planned | accession unverified |
| **Pelka 2021 CRC** | standalone | CRC (MMRd/MMRp) | WES | scRNA (+ MERFISH subset → D) | 62 | downloaded | GEO `GSE178341` + dbGaP `phs002407` |
| **Lee 2020 CRC (Korea)** | standalone | CRC | WES + bulk RNA | scRNA | 29 | downloaded | GEO `GSE132465` |
| **Maynard 2020 NSCLC longitudinal** | standalone | NSCLC TKI pre/residual | WES + NGS | scRNA | 30 | planned | EGA unverified |
| **Neftel 2019 GBM** | standalone | GBM IDH-wt | WES | scRNA | 28 | downloaded | Broad SCP `SCP393` + GEO `GSE131928` |
| **Karaayvaz 2018 TNBC** | standalone | TNBC | WES | scRNA (SmartSeq2) | 6 | partial | GEO `GSE118390` |
| **Puram 2017 HNSCC** | standalone | HNSCC | WES | scRNA (SmartSeq2) | 18 | downloaded | GEO `GSE103322` |
| **Kim 2020 NSCLC mets** | standalone | NSCLC primary+LN+brain | WES | scRNA | 44 | planned | EGA `EGAS00001004001` |
| **Tirosh 2016 melanoma** | standalone | metastatic mel | WES | scRNA (SmartSeq2) | 19 | downloaded | GEO `GSE72056` |
| **Jerby-Arnon 2018 mel** | standalone | mel anti-PD-1 mixed | WES | scRNA | 33 | downloaded | GEO `GSE115978` |
| **Stewart 2020 SCLC CDX** | standalone | SCLC chemo-evolved | WGS-CDX + WES-CTC | scRNA | ~12 | planned | EGA `EGAS00001004025` |
| **Wang 2021 gastric (peritoneal)** | standalone | gastric + peritoneal-met | WES | scRNA | 20 | downloaded | GEO `GSE163558` |
| **Zhang 2022 gastric T-cell** | standalone | gastric | WES | scRNA + scTCR | 10 | downloaded | GEO `GSE183904` |
| **Couturier 2020 GBM** | standalone | GBM | WES | scRNA | 14 | planned | EGA `EGAS00001004422` |
| **Lambrechts 2018 NSCLC** | standalone | NSCLC | WES (bulk) | scRNA | 5 | downloaded | ArrayExpress `E-MTAB-6149` |
| **Goveia 2020 NSCLC EC** | standalone | NSCLC endothelial | WES (Lambrechts) | scRNA | 8 | downloaded | ArrayExpress `E-MTAB-8221` |
| **Sun 2021 HCC early-relapse** | standalone | HCC primary + early-relapse | WES | scRNA + scTCR | 18 | planned | accession not located |
| **Kim 2018 TNBC chemoresist** | standalone | TNBC neoadj-chemo | deep WES + scDNA | scRNA | 20 | partial | SRA `SRP114962` |
| **Hwang/Lin 2022 PDAC chemo** | HTAPP-orbital | PDAC FOLFIRINOX | bulk WES | snRNA + DSP | 43 | downloaded | GEO `GSE199102` + dbGaP `phs002371` |
| **HTAN HTA3 BU Lung Pre-cancer** | HTAN-HTA3 | lung adeno + LUSC pre-malig | bulk WES + scDNA | scRNA + mIF | 484 | blocked | Synapse `syn20446927` (Atlas=HTA3) |
| **Su 2025 HCC snRNA** | standalone | HCC | TCGA-LIHC integration | snRNA | 12 | downloaded | GEO `GSE282701` |

## B — spatial transcriptomics + paired genomics

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Stur 2022 HGSOC Visium [v]** | standalone | HGSOC NACT-response | Visium-only (no WGS) | Visium | 12 | downloaded | GEO `GSE189843` (corrected) |
| **Erickson 2022 prostate Visium** | standalone | prostate adeno | WGS + lpWGS | Visium multi-section | 11 | planned | EGA `EGAS00001006124` |
| **Khaliq / Sun 2024 PDAC** | standalone | PDAC primary + mets | (no WES on public layer) | Visium FFPE | 30 | downloaded | GEO `GSE272362` |
| **Pei / Min 2025 PDAC autopsy** | standalone | PDAC autopsy multi-organ | WGS/WES autopsy | Visium 55-section | 13 | planned | accession unverified |
| **Wu 2025 HGSOC Visium HD** | standalone | HGSOC | WES + HRD | Visium HD | ~30 | planned | accession unverified |
| **Ji 2020 cSCC ST** | standalone | cutaneous SCC | WES (subset 4) | ST | 10 | downloaded | GEO `GSE144239` (B-arm corrected) |
| **Xenium Prime 5K demo (10x) [v]** | 10x-public | breast/OV/NSCLC/mel/cervix | bulk WGS per block | Xenium 5K + Visium HD | demo | downloaded | 10x portal |
| **Cervilla 2025 ST platforms benchmark** | standalone | 6-cancer benchmark | (none) | Visium + CytAssist + HD + Xenium MT/5K | n/a (benchmark) | downloaded | Zenodo `18000256` + `17999961` |

## C — spatial proteomics + paired genomics

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Launonen 2022 Färkkilä mIF HGSOC [v]** | standalone | HGSOC HRD-vs-HRP | WGS + BRCA1/2 | t-CyCIF (mIF) | 44 | blocked | Synapse `syn26230540` |
| **Färkkilä 2020 TOPACIO [v]** | TOPACIO | HGSOC + TNBC + endometrial | WGS + HRDsum + LOH | t-CyCIF | 62 | blocked | Synapse `syn22177117` |
| **Mitri 2024 AMTEC PARPi mTNBC [v]** | HTAPP-umbrella | mTNBC PARPi pre/post | WES | t-CyCIF | 12 | planned | dbGaP `phs002371.v1.p1` |
| **Risom 2022 DCIS MIBI** | HTAN-HTA6-orbital | breast DCIS → IBC | panel + bulk RNA | MIBI-TOF, 37-plex | 122 | downloaded | Mendeley `d87vg86zd8` + figshare `25289011` (open mirror; canonical syn17773547 unverified) |
| **Jackson 2020 breast IMC** | METABRIC-linked | breast (all subtypes) | METABRIC WES + CNA (linkable) | IMC, 37-plex | 281 | downloaded | Zenodo `4607374` |
| **Tietscher 2023 breast IMC (superseded)** | standalone | breast HER2+ / TNBC | (no METABRIC link; no public WES) | IMC, 40-plex | 14 | blocked | superseded — see successor row below |
| **Tietscher 2023 breast IMC (bodenmiller release)** | standalone | breast HER2+ / TNBC | (no public WES) | IMC 37-plex + scRNA | 14 | downloaded | Zenodo `4911135` + AE `E-MTAB-10607` |
| **Ali / Danenberg 2020/2022 METABRIC IMC** | METABRIC | breast (all subtypes) | METABRIC bulk WES + targeted + SNP-CNA | IMC, 37-plex | 693 | downloaded | Zenodo `6036188` + cBioPortal METABRIC |
| **Magness / Enfield 2024 TRACERx 100 IMC** | TRACERx | NSCLC early-stage | multi-region WES + bulk RNA | IMC (2 panels) | 81 | blocked | Zenodo `12587543` (restricted) |
| **Makhmut / Coscia 2025 STIC DVP** | standalone | HGSOC + STIC | targeted HRD panel | DVP-LMD-MS | 25 | planned | PRIDE per bioRxiv `2025.03.19.643504` |

## D — multi-spatial / full-tuple

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **HTAN HTA1 HTAPP [v]** | HTAN-HTA1 | mBC + NBL + LUAD + GBM + Ewing | bulk WES + panel | scRNA + Visium + Slide-seq + MERFISH + ExSeq + CODEX + MIBI + snRNA | 205 | planned | Synapse `syn20446927` (Atlas=HTA1) |
| **HTAN HTA4 CHOP Pediatric** | HTAN-HTA4 | NBL + AML/B-ALL + pHGG + Ewing | bulk WGS/WES | scRNA + scATAC + CODEX | 69 | planned | Synapse `syn20446927` (Atlas=HTA4) |
| **HTAN HTA5 DFCI Resistance** | HTAN-HTA5 | NSCLC TKIr + HR+/HER2+ breast + IO-r mel | bulk WES | t-CyCIF + scRNA | 156 | planned | Synapse `syn20446927` (Atlas=HTA5) |
| **HTAN HTA6 Duke-Stanford DCIS** | HTAN-HTA6 | breast DCIS → IDC | bulk WGS (largest in HTAN) | MIBI + scRNA + bulk RNA | 828 | planned | Synapse `syn20446927` (Atlas=HTA6) |
| **HTAN HTA7 HMS PATCH** | HTAN-HTA7 | mel + nevus + CTCL + FL + CLL/SLL | clinical panel + bulk RNA | t-CyCIF + H&E | 245 | planned | Synapse `syn20446927` (Atlas=HTA7) |
| **HTAN HTA8 MSK Metastasis** | HTAN-HTA8 | SCLC + PDAC + brain + CRC mets | panel + WGS subset | scRNA + MIBI + GeoMx DSP | 202 | planned | Synapse `syn20446927` (Atlas=HTA8) |
| **HTAN HTA9 OHSU SMMART** | HTAN-HTA9 | mBC CDK4/6i + IO-evolved | bulk WGS + scDNA + RPPA | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx | 33 | planned | Synapse `syn20446927` (Atlas=HTA9) |
| **HTAN HTA10 Stanford FAP** | HTAN-HTA10 | FAP-CRC | WGS + Hi-C + methylation | scRNA + scATAC + Xenium + CODEX + MS | 40 | planned | Synapse `syn20446927` (Atlas=HTA10) |
| **HTAN HTA11 Vanderbilt CRC** | HTAN-HTA11 | sporadic CRC + adenoma + SSL | bulk WES/WGS | scRNA + Visium + MxIF | 195 | planned | Synapse `syn20446927` (Atlas=HTA11) |
| **HTAN HTA12 WUSTL pan-cancer** | HTAN-HTA12 | 11-tumor pan-cancer | bulk WGS/WES | scRNA + snRNA + scATAC + Visium + CODEX + IMC + Xenium pilot | 295 | planned | Synapse `syn20446927` (Atlas=HTA12) |
| **MSK SPECTRUM cfDNA / PARPi 2025** | MSK-SPECTRUM | HGSOC platinum + PARPi-maint | scWGS-DLP + WGS + cfDNA | scRNA subset | 24 | planned | dbGaP `phs002857` |
| **HMS-Sorger Ovarian [v]** | HMS-Sorger | HGSOC | WGS + HRD | t-CyCIF 40-plex | 25 | planned | Synapse Sorger-lab |
| **Owkin MOSAIC-Window bladder** | MOSAIC | bladder MIBC | WES + bulk RNA | Visium + Chromium Flex snRNA + H&E | 15 | planned | EGA `EGAD50000001251` |
| **HTAPP Klughammer 2024 mBC** | HTAN-HTA1-orbital | metastatic breast | WES + lpWGS | snRNA + CODEX + MERFISH + ExSeq + Slide-seq | 30 | blocked | dbGaP `phs002371` + SCP `SCP2702` |
| **HTAN HTA8 SCLC sub-cohort (Chan 2021)** | HTAN-HTA8-orbital | SCLC | IMPACT panel + WGS subset | scRNA + MIBI + Vectra | 21 | planned | dbGaP `phs002371` |
| **Hwang 2022 PDAC neoadj [v]** | standalone | PDAC naive + neoadj | WES + DSP | snRNA + GeoMx DSP | 43 | downloaded | GEO `GSE202051` + dbGaP `phs002789` |
| **Hwang 2025 PDAC neural** | standalone | PDAC | bulk panel | Visium + snRNA | 25 | planned | accession unverified |
| **Sun 2024 HCC primary + met** | standalone-Fudan | HCC | multi-region WES + bulk RNA | Visium + scRNA + IHC | 182 | planned | accession not located |
| **Liu 2024 pediatric HGG (Filbin)** | standalone | pHGG/DMG/DHG primary + recurrent | matched WGS | snRNA + snATAC + CODEX | 16 | downloaded | GEO `GSE231860` |
| **Ravi 2022 GBM multiomics** | standalone | GBM primary + recurrent | bulk WES + inferred CNA | Visium + IMC + MALDI + scRNA | 28 | downloaded | GEO `GSE194329` |
| **Greenwald 2024 GBM (Suvà/Tirosh)** | standalone | GBM + IDH-mut glioma | bulk WES + TCGA-anchored | Visium + MIBI + scRNA + scATAC + Patch-seq | 100 | downloaded | GEO `GSE237183` + Zenodo `8105466` |
| **Denisenko 2024 HGSOC Visium + CosMx** | standalone | HGSOC | WES subset | Visium + CosMx SMI | 10 | downloaded | EGA `EGAS00001006816` + Zenodo `10048057` |
| **Krishna 2021 ADAPTeR ccRCC IO [v]** | ADAPTeR | ccRCC nivo pre/on/post | WES | scRNA + scTCR + mIF | 6 | planned | EGA `EGAS00001005188` |
| **Wu 2021 breast Visium [v]** | standalone | breast ER+ / HER2+ / TNBC | WES (controlled) | scRNA + Visium subset | 26 | downloaded | GEO `GSE176078` |

`[v]` = present in the vault topic YAML. State markers reflect status.tsv as of 2026-06-05 plus per-cohort MANIFEST.yaml. The superseded `tietscher-2023-breast-imc` row is left in place but `blocked` and replaced by `tietscher-2023-breast-imc-bodenmiller` in the row directly below it.

## the gap, in one paragraph

The biggest patient-equivalent absences are structural, not operational. **HTAN HTA6 Duke DCIS (828 patients)**, **HTA3 BU Lung (484)**, **HTA12 WUSTL pan-cancer (295)**, **HTA7 HMS PATCH (245)**, and **HTA1 HTAPP (205)** are all `planned` or `blocked` because the Synapse `syn20446927` fileview requires a PAT under the 2026-06-04 pivot — not because of bandwidth. Outside HTAN, the missing patient mass concentrates in three EGA-gated immunotherapy cohorts (Bassez BIOKEY 40, Liu 2022 NSCLC 35, Kim 2020 NSCLC mets 44) and the two `blocked` Synapse cohorts that are direct HRD context — **Launonen / Färkkilä mIF HGSOC (44)** and **Färkkilä 2020 TOPACIO (62)**, the only public-tier niraparib+pembro trial. Four cohorts closed today (jackson, kim, greenwald, tietscher) form the v5→post-v5 delta: jackson IMC at 281 patients (Zenodo open, METABRIC linkable), kim-2018 TNBC chemoresist (deep WES + scDNA + SmartSeq2, 20 patients), greenwald 2024 GBM (Visium + MIBI + scRNA + scATAC, 100 patients), tietscher 2023 breast IMC bodenmiller release (the corrected sister to the superseded row). That is roughly **+400 patients** added to the downloaded set since v5 was cut.

## footer

[[matched-multi-omic-tumor-table]] · [[progress-v5-2026-06-05]] · [[paired-data-pan-cancer]]
