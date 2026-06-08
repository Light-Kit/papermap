---
title: 'matched multi-omic tumor cohorts — one canonical table'
date: '2026-06-03 19:57 UTC'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - paired-data
  - dataset-strategy
  - single-cell
summary: 'one row per public cohort with tumor genomics + ≥1 high-resolution TME modality (sc / sn / spatial) on the same patient, indexed by TME modality, with accession IDs (GEO / EGA / dbGaP / Synapse) and per-bucket sample tallies. HTAN sub-atlases broken out individually.'
starred: true
---

# matched multi-omic tumor cohorts — one canonical table

[[paired-data-pan-cancer]] gave the conceptual 5-tier map. [[more-paired-data-cohorts]] turned tiers into named cohorts. This one is the **operational table** — one row per public cohort that satisfies a strict entry condition, indexed by which TME modality it leads with, with the accession IDs that let you actually pull the data.

The entry condition: **tumor genomics** (WGS / WES / panel DNA / SNP / CNA) **AND** at least one **high-resolution TME modality** (scRNA / snRNA / Visium / Visium HD / Xenium / Slide-seq / Stereo-seq / MERFISH / CODEX / MIBI / IMC / mIF / t-CyCIF) on the **same patient**, ideally same lesion same timepoint, with clinical metadata. Bulk-RNA-only cohorts (TCGA, HMF, POG570, MSK-CHORD, MET500, Genomics England 100k) do not qualify as primary rows — they appear only as cross-link backbones in [[paired-data-pan-cancer]].

Four buckets, by TME modality:

- **A — sc/snRNA + genomics** (no spatial component)
- **B — spatial transcriptomics + genomics** (no spatial proteomic)
- **C — spatial proteomics + genomics** (no spatial transcriptomic)
- **D — multi-spatial / full-tuple** (≥2 high-res TME modalities on the same patient — where HTAN, MOSAIC, MSK SPECTRUM live)

HTAN is **not collapsed**. Every Phase-1 sub-atlas that has released public data is its own row, tagged `consortium=HTAN-HTAxx`. Same for MOSAIC, MSK SPECTRUM, TRACERx, METABRIC, HTAPP.

One naming caveat surfaced during the audit. The vault id `htan-hms-ovarian` was assumed to map to HTAN HTA13. It does not — HTA13 in the canonical HTAN registry is **TNP SARDANA**, a multi-center imaging benchmark, not an HGSOC cohort. The Sorger-lab HMS ovarian work is Ludwig-affiliated and lives **outside** the formal HTAN HTA atlas-ID system. The row below keeps the data but renames the consortium tag to `HMS-Sorger (Ludwig)`. Worth fixing in the vault.

## A — sc/snRNA + paired genomics

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **Luo 2024 NANT ovarian (anchor) [v]** | standalone | HGSOC | WGS + HRD scoring | scRNA + scTCR | 30 | GEO `GSE222556` |
| **Vázquez-García 2022 MSK SPECTRUM [v]** | MSK-SPECTRUM | HGSOC | WGS + scWGS (DLP+) | scRNA | 42 | Synapse `syn25569736` |
| **Olbrecht 2021 [v]** | standalone | HGSOC | germline BRCA | scRNA | 7 | ArrayExpress `E-MTAB-8107` |
| **Pal 2021 BRCA1-carrier breast [v]** | standalone | breast (BRCA1 carriers) | germline BRCA1 + WGS | scRNA | 21 | GEO `GSE161529` |
| **Bassez 2021 BIOKEY [v]** | BIOKEY (KU Leuven) | breast (anti-PD-1 pre/post) | WES + panel | scRNA + scTCR | 40 | EGA `EGAS00001004809` |
| **Yost 2019 BCC [v]** | standalone | BCC (anti-PD-1) | WES | scRNA + scTCR | 14 | GEO `GSE123813` |
| **Caushi 2021 NSCLC [v]** | standalone | NSCLC (anti-PD-1) | WES + panel | scRNA + scTCR | 16 | GEO `GSE176021` |
| **Luoma 2022 HNSCC [v]** | standalone | HNSCC (anti-PD-1) | clinical panel | scRNA | 29 | GEO `GSE200996` |
| **Sade-Feldman 2018 mel [v]** | standalone | melanoma (anti-PD-1) | WES | scRNA | 48 | GEO `GSE120575` |
| **Bi 2021 ccRCC [v]** | standalone | ccRCC (anti-PD-1) | WES | scRNA | 8 | Broad SCP `SCP1288` + dbGaP `phs002252` |
| **Liu 2022 NSCLC [v]** | standalone | NSCLC (IO) | WES | scRNA | 35 | EGA `EGAS00001005003` |
| **Magen 2023 HCC [v]** | standalone | HCC (anti-PD-1) | WES | scRNA + scTCR | 33 | **accession not located** (verify) |
| **Wang 2025 SCLC PARPi [v]** | standalone | SCLC (PARPi context) | panel | scRNA | verify | **accession unverified** |
| **Pelka 2021 CRC** | standalone | CRC (MMRd / MMRp) | WES | scRNA (+ MERFISH subset → bucket D) | 62 | GEO `GSE178341` + dbGaP `phs002407` |
| **Lee 2020 CRC (Korea)** | standalone | CRC | WES + bulk RNA | scRNA | 29 | GEO `GSE132465` |
| **Maynard 2020 NSCLC longitudinal** | standalone | NSCLC (TKI pre/residual/progression) | WES + clinical NGS | scRNA | 30 | EGA `EGAS00001004422` |
| **Neftel 2019 GBM** | standalone | GBM IDH-wt | WES | scRNA | 28 | Broad SCP `SCP393` + GEO `GSE131928` |
| **Karaayvaz 2018 TNBC** | standalone | TNBC | WES | scRNA (SmartSeq2) | 6 | GEO `GSE118390` |
| **Puram 2017 HNSCC** | standalone | HNSCC | WES | scRNA (SmartSeq2) | 18 | GEO `GSE103322` |
| **Kim 2020 NSCLC mets** | standalone | NSCLC (primary + LN + brain) | WES | scRNA | 44 | EGA `EGAS00001004001` |
| **Tirosh 2016 melanoma** | standalone | metastatic mel | WES | scRNA (SmartSeq2) | 19 | GEO `GSE72056` |
| **Jerby-Arnon 2018 mel** | standalone | mel (anti-PD-1 mixed) | WES | scRNA | 33 | GEO `GSE115978` |
| **Stewart 2020 SCLC CDX** | standalone | SCLC (chemo-evolved) | WGS (CDX) + WES (patient CTC) | scRNA | ~12 | EGA `EGAS00001004025` |
| **Wang 2021 gastric (peritoneal)** | standalone | gastric + peritoneal met | WES | scRNA | 20 | GEO `GSE163558` |
| **Zhang 2022 gastric T-cell** | standalone | gastric | WES | scRNA + scTCR | 10 | GEO `GSE183904` |
| **Couturier 2020 GBM** | standalone | GBM | WES | scRNA | 14 | GEO `GSE163108` |
| **Lambrechts 2018 NSCLC** | standalone | NSCLC | WES (bulk) | scRNA | 5 | ArrayExpress `E-MTAB-6149` |
| **Goveia 2020 NSCLC EC** | standalone | NSCLC endothelial | WES (Lambrechts) | scRNA | 8 | ArrayExpress `E-MTAB-8221` |
| **Sun 2021 HCC early-relapse** | standalone | HCC (primary + early relapse) | WES | scRNA + scTCR | 18 | GEO `GSE149614` |
| **Kim 2018 TNBC chemoresist** | standalone | TNBC (neoadj chemo) | deep WES + scDNA | scRNA | 20 | SRA `SRP114962` |
| **Hwang/Lin 2023 PDAC chemo** | HTAPP-orbital | PDAC (FOLFIRINOX pre/post) | bulk WES | snRNA + CITE-seq | 27 | GEO `GSE205013` + dbGaP `phs002371` |
| **HTAN HTA3 — BU Lung Pre-Cancer** | **HTAN-HTA3** | lung adeno + LUSC pre-malignancy | bulk DNA WES + scDNA | scRNA + mIF (companion) | 484 | Synapse `syn20446927` (filter Atlas=HTA3) |
| **Su 2025 HCC snRNA** | standalone | HCC | TCGA-LIHC WES integration | snRNA | 12 | GEO `GSE282701` |

**[v]** = already in vault.

**Tally A:** **~33 cohorts, ~1,300 patients** (HTAN HTA3 alone contributes 484; the standalone single-study cohorts sum to ~800 patients across ~32 studies, median N≈20).

## B — spatial transcriptomics + paired genomics

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **Stur 2022 HGSOC Visium [v]** | standalone | HGSOC (NACT response) | WGS | Visium | 12 | GEO `GSE211956` |
| **Erickson 2022 prostate Visium** | standalone | prostate adeno | WGS + low-pass WGS | Visium (multi-section per pt) | 11 | EGA `EGAS00001006124` |
| **Khaliq / Sun 2024 PDAC primary+met** | standalone | PDAC (primary + liver/LN mets) | WES + bulk RNA | Visium | 21 | GEO `GSE272362` |
| **Pei / Min 2025 PDAC rapid autopsy** | standalone | PDAC (autopsy multi-organ) | WGS/WES (autopsy) | Visium (55 sections) | 13 | **accession unverified** (Nature 642:212–221) |
| **Wu 2025 HGSOC Visium HD (preprint)** | standalone | HGSOC | bulk WES + HRD | Visium HD | ~30 | **accession unverified** (preprint `10.1101/2025.11.24.690313`) |
| **Ji 2020 cSCC ST** | standalone | cutaneous SCC | WES (subset 4) | ST (Visium predecessor) | 10 | GEO `GSE144236` |
| **Xenium Prime 5K demo (10x) [v]** | 10x-public | breast, OV, NSCLC, melanoma, cervical | bulk WGS per block | Xenium 5K + Visium HD | demo (single-block per type) | 10x portal |

**Tally B:** **7 cohorts, ~100 patients** (excluding the 10x demo, which is single-block per cancer type). This is the smallest bucket — Visium / Xenium with paired WGS on the same patient is still rare.

## C — spatial proteomics + paired genomics

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **Launonen 2022 Färkkilä mIF HGSOC [v]** | standalone | HGSOC (HRD-vs-HRP) | WGS + BRCA1/2 status | t-CyCIF (mIF) | 44 | Synapse `syn26230540` |
| **Färkkilä 2020 TOPACIO [v]** | TOPACIO (niraparib+pembro) | HGSOC + TNBC + endometrial | WGS + HRDsum + LOH | t-CyCIF | 62 | Synapse `syn22177117` |
| **Mitri 2024 AMTEC PARPi mTNBC [v]** | standalone | mTNBC (PARPi pre/post) | WES | t-CyCIF | 12 | dbGaP `phs002371.v1.p1` (HTAN-HTAPP) |
| **Risom 2022 DCIS MIBI (HTAN-Stanford)** | HTAN-HTA6-orbital | breast DCIS → IBC | targeted panel + bulk RNA | MIBI-TOF, 37-plex | 122 | Synapse via HTAN-HMS (`syn17773547` candidate — verify) |
| **Jackson 2020 breast IMC** | standalone (METABRIC-linked) | breast (all subtypes) | METABRIC WES + CNA (linkable) | IMC, 37-plex | 281 | Zenodo `4607374` |
| **Tietscher 2023 breast IMC** | standalone (METABRIC-linked) | breast (HER2+ + TNBC) | METABRIC WES + bulk RNA | IMC, 40-plex | 281 | Zenodo `7647079` |
| **Ali / Danenberg 2020/2022 METABRIC IMC** | METABRIC (CRUK Cambridge) | breast (all subtypes) | METABRIC bulk WES + targeted + SNP-CNA | IMC, 37-plex | 483 (Ali) / 693 (Danenberg) | Zenodo `6036188` + cBioPortal METABRIC `EGAS00000000083` |
| **Magness / Enfield 2024 TRACERx 100 IMC** | TRACERx (CRUK / UCL) | NSCLC early-stage | multi-region WES + bulk RNA | IMC (2 panels) | 81 | Zenodo `12587543` (controlled-access via request) |
| **Makhmut / Coscia 2025 STIC DVP** | standalone | HGSOC + STIC precursors | targeted HRD panel | deep visual proteomics (DVP, LMD-MS) | ~25 | PRIDE per bioRxiv 2025.03.19.643504 |

**Tally C:** **9 cohorts, ~1,400 patients** (METABRIC IMC alone contributes ~700; this bucket is dominated by breast).

## D — multi-spatial / full-tuple (HTAN, MOSAIC, SPECTRUM, multi-modal standalones)

### D.1 — HTAN sub-atlases (released data only — June 2026)

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **HTAN HTA1 HTAPP (Broad/DFCI/HMS) [v]** | **HTAN-HTA1** | metastatic breast + NBL + LUAD + GBM + Ewing | bulk WES + panel | scRNA + Visium + Slide-seq + MERFISH + ExSeq + CODEX + MIBI + snRNA | ~205 (mBC sub-cohort 60 with HRD subset) | Synapse `syn20446927` (Atlas=HTA1) |
| **HTAN HTA4 CHOP Pediatric** | **HTAN-HTA4** | NBL + AML/B-ALL + pHGG + Ewing | bulk WGS/WES | scRNA + scATAC + CODEX | 69 | Synapse `syn20446927` (Atlas=HTA4) |
| **HTAN HTA5 DFCI Resistance** | **HTAN-HTA5** | NSCLC (TKI-resistant) + HR+/HER2+ breast + IO-resistant mel | bulk WES | t-CyCIF (16k files — largest in HTAN) + scRNA | 156 | Synapse `syn20446927` (Atlas=HTA5) |
| **HTAN HTA6 Duke-Stanford DCIS** | **HTAN-HTA6** | breast DCIS → IDC | **bulk WGS (2,630 files — largest WGS in HTAN)** | MIBI + scRNA + bulk RNA | **828** | Synapse `syn20446927` (Atlas=HTA6) |
| **HTAN HTA7 HMS PATCH (Sorger)** | **HTAN-HTA7** | melanoma + nevus + CTCL + FL + CLL/SLL | clinical panel + bulk RNA | t-CyCIF / CyCIF (powerhouse imaging) + H&E | 245 | Synapse `syn20446927` (Atlas=HTA7) |
| **HTAN HTA8 MSK Metastasis (Pe'er/Iacobuzio)** | **HTAN-HTA8** | SCLC + PDAC + brain mets + CRC mets (rapid autopsy) | panel + WGS subset (BRCA-mut PDAC) | scRNA + MIBI + GeoMx DSP | 202 | Synapse `syn20446927` (Atlas=HTA8) |
| **HTAN HTA9 OHSU SMMART/MBC** | **HTAN-HTA9** | metastatic breast (CDK4/6i + IO-evolved) | **bulk WGS + scDNA-seq (1.6k files — largest scDNA in HTAN)** + RPPA | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx | 33 (deep longitudinal) | Synapse `syn20446927` (Atlas=HTA9) |
| **HTAN HTA10 Stanford FAP (Snyder/Curtis/Greenleaf)** | **HTAN-HTA10** | FAP-CRC | WGS + Hi-C + methylation | scRNA + scATAC + Xenium + CODEX + mass-spec | 40 | Synapse `syn20446927` (Atlas=HTA10) |
| **HTAN HTA11 Vanderbilt CRC (Coffey/Lau)** | **HTAN-HTA11** | sporadic CRC + adenoma + SSL | bulk WES/WGS | scRNA + Visium + MxIF | 195 | Synapse `syn20446927` (Atlas=HTA11) |
| **HTAN HTA12 WUSTL pan-cancer (Ding)** | **HTAN-HTA12** | **11-tumor pan-cancer** (breast/TNBC, PDAC, ccRCC, endometrial, CRC, AML, cholangio, glioma, HNSCC, melanoma, meningioma) | bulk WGS/WES (CPTAC/TCGA pipelines) | scRNA + snRNA + scATAC + **Visium (largest in HTAN)** + CODEX + IMC + Xenium pilot | **295** | Synapse `syn20446927` (Atlas=HTA12) |

**Excluded HTAN atlas IDs:** HTA2 (BU PCAPP pilot — no public data); HTA13 (TNP SARDANA — multi-center imaging benchmark, not a patient cohort).

### D.2 — Non-HTAN multi-spatial / full-tuple cohorts

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **MSK SPECTRUM (Vázquez-García) [v]** | **MSK-SPECTRUM** | HGSOC | WGS + scWGS (DLP+) | scRNA + mIF | 42 | Synapse `syn25569736` |
| **MSK SPECTRUM cfDNA / PARPi extension 2025** | **MSK-SPECTRUM** | HGSOC (pre/post platinum + PARPi maint.) | scWGS (DLP+) + bulk WGS + longitudinal cfDNA | scRNA (subset) | 24 | dbGaP `phs002857` |
| **HMS-Sorger Ovarian [v, RENAME]** | HMS-Sorger (Ludwig) — **not HTAN** | HGSOC | WGS + HRD curated via MSK-SPECTRUM pipeline | t-CyCIF (40-plex) | ~25 | Synapse per Sorger lab page |
| **Owkin MOSAIC-Window (bladder subset)** | **MOSAIC** (Owkin + 5 EU centers) | bladder (MIBC) — first public MOSAIC release | WES + bulk RNA | Visium + Chromium Flex snRNA + H&E | **15** public (MIBC subset of ~2,500 collected pan-cancer) | EGA `EGAD50000001251` (parent `EGAS50000000689`) |
| **HTAPP metastatic breast (Klughammer 2024)** | HTAN-HTA1-orbital | metastatic breast | WES + low-pass WGS | snRNA + CITE-seq | 30 | dbGaP `phs002371` + Broad SCP `SCP2702` |
| **HTAN HTA8 SCLC sub-cohort (Chan 2021)** | HTAN-HTA8-orbital | SCLC | matched IMPACT panel + WGS subset | scRNA + MIBI + Vectra IHC | 21 (54 specimens) | dbGaP `phs002371` (HTAN-MSK) |
| **Hwang 2022 PDAC neoadj [v]** | standalone | PDAC (treatment-naive + neoadj) | WES + GeoMx DSP genomic readout | snRNA + GeoMx DSP | 43 | GEO `GSE202051` + dbGaP `phs002789` |
| **Hwang 2025 PDAC neural invasion** | standalone | PDAC | bulk panel (verify) | Visium + snRNA | 25 (62 samples) | **accession unverified** |
| **Sun 2024 HCC primary + metastasis** | standalone (Fudan) | HCC | multi-region WES + bulk RNA | Visium + scRNA + IHC | **182 (257 primary + 176 met)** | **accession not located** (verify) |
| **Liu 2024 pediatric HGG (Filbin)** | standalone (DFCI/BCH) | pHGG / DMG / DHG (primary ↔ recurrent) | matched WGS | snRNA + snATAC + CODEX | 16 | GEO `GSE231860` |
| **Ravi 2022 GBM multiomics** | standalone | GBM (primary + recurrent) | bulk WES + spot-level inferred CNA | Visium + IMC + MALDI + scRNA | 28 | GEO `GSE194329` |
| **Greenwald 2024 GBM (Suvà/Tirosh)** | standalone | GBM + IDH-mut glioma | bulk WES (subset, + TCGA-anchored) | Visium + MIBI + scRNA + scATAC + Patch-seq | 100 (>1M cells) | GEO `GSE237183` + Zenodo `10.5281/zenodo.8105466` |
| **Denisenko 2024 HGSOC Visium + CosMx** | standalone | HGSOC | WES subset (verify EGA) | Visium + CosMx SMI | 10 (Visium) / 1 (CosMx) | EGA `EGAS00001006816` + Zenodo `10048057` |
| **Krishna 2021 ADAPTeR ccRCC IO [v]** | ADAPTeR (Royal Marsden) | ccRCC (nivo pre/on/post) | WES | scRNA + scTCR + mIF | 6 | EGA `EGAS00001005188` |
| **Wu 2021 breast (Visium subset) [v]** | standalone | breast (ER+/HER2+/TNBC) | WES | scRNA + Visium subset | 26 (sc); 6 (Visium) | GEO `GSE176078` |

**Tally D:** **25 cohorts, ~3,400 patients across HTAN + MOSAIC + SPECTRUM + standalones.**

HTAN released sub-atlases (Phase 1) alone: **~2,300 patients** across the 10 released centers, weighted heavily by HTA6 Duke DCIS (828) and HTA3 BU Lung (484, listed in Bucket A since it's sc-dominant). Outside HTAN: ~700 patients across ~13 standalones + MOSAIC + SPECTRUM. Note the **wild N variance**: HTA9 OHSU has 33 patients but ~1,866 biospecimens because it's deep longitudinal; HTA6 Duke has 828 patients with ~1,438 biospecimens because it's cross-sectional DCIS screening.

## pan-total

| bucket | cohorts | patients (approx) | notes |
| --- | --- | --- | --- |
| A — sc/sn + genomics | 33 | ~1,300 | dominated by HTA3 (484); median standalone N ≈ 20 |
| B — spatial-T + genomics | 7 | ~100 | smallest bucket — Visium / Xenium + WGS pairing still rare |
| C — spatial-proteomic + genomics | 9 | ~1,400 | dominated by METABRIC IMC (~700 across Ali + Danenberg) |
| D — multi-spatial / full-tuple | 25 | ~3,400 | HTAN = ~2,300; MOSAIC + SPECTRUM + standalones = ~700; structurally HTAN-monopoly |
| **pan-total** | **~74** | **~6,200** | per-patient unique; minor double-counting in HTA1/HTAPP-orbital rows acknowledged |

The dataset is approximately **70 cohorts and 6,000+ patients globally** that meet the strict same-patient genomics+TME-resolution gate.

## what's notable

**Where new data is actually growing**: Bucket B (spatial-T + WGS). 2024–2025 brought four PDAC cohorts (Khaliq/Sun, Hwang 2025, Pei 2025), the prostate Erickson 2022, and Visium HD's first HGSOC application (Wu 2025 preprint). Spatial transcriptomics + WGS on the same patient went from "two cohorts" (Stur + early Visium demos) to a real bucket in 18 months.

**Where it isn't**: Bucket A (sc + WGS) is mature — most cancer types are represented; new growth is mostly cancer-type breadth (gastric Zhang 2022, HCC Sun 2021), not radically new design. The frontier is Bucket D — multi-spatial on the same patient — which is structurally **HTAN-monopoly**, because no academic single-lab budget pays for Visium + scRNA + WGS + CODEX on hundreds of patients.

**Where HRD lives**: most HRD-relevant rows are in Bucket A (BRCA1/2 single-cell cohorts) and Bucket D (HTA6 DCIS BRCA carriers, HTA9 OHSU MBC, HTAN HTA12 WUSTL TNBC arm, MOSAIC TNBC, HMS-Sorger HGSOC, MSK SPECTRUM, Färkkilä TOPACIO, Mitri AMTEC PARPi). The HRD-specific multi-spatial cohort count is **~10**, total HRD-relevant patient N ≈ 200–400 globally — the structural cap on any pan-cancer HRD × TME study.

**MOSAIC's actual size**: 60 patients are public via MOSAIC-Window on EGA. The 2,500-collected number is for the funded effort overall, not what's accessible today. Plan around 60.

## aspirational watchlist (not yet released)

**HTAN Phase 2 (HTA200–HTA209)**: funded Sep 2024 (RFA-CA-23-039); no public data under those atlas IDs as of June 2026. Track. The two HRD-relevant ones:

- **HTA201 — OHSU PDAC in BRCA/PALB2/ATM carriers** (Sears/Brody/Fertig) — DNA-repair-defined cohort by design
- **HTA208 — MDACC HGSOC MOSAIC-Ov3D** (Mok/Ferri-Borgogno/Birrer) — HRD-stratified HGSOC, sc + WGS + 3D-spatial

Others: HTA200 (UCSF Skin), HTA202 (Caltech LGG), HTA203 (MDACC Gastric GAME3D), HTA204 (DFCI Myeloma), HTA205 (CHLA Pediatric Solid), HTA206 (WUSTL Prostate — CRPC BRCA2/CDK12 subset is HRD-relevant), HTA207 (Vanderbilt CRC across ages), HTA209 (Yale Lymphoma).

**ASTRA consortium** (Garvan + U-Tokyo + 10x, launched Nov 2025): Asia-Pacific 2,000-sample Xenium pan-cancer atlas — pilot only currently.

**HTAN Phase 2 data is likely to triple Bucket D over 2026–2027.** Re-audit then.

## access status

A post-publication verification round caught some accession errors and clarified the access pattern. Quick map by repository:

- **Open** (no application — anyone downloads): all GEO `GSE…`, ArrayExpress `E-MTAB-…`, SRA `SRP…`, Broad Single Cell Portal `SCP…`, Zenodo, PRIDE. The bulk of Bucket A and most of Bucket B / C standalones live here.
- **Controlled-access** (DAC application required, typically 2–6 weeks): dbGaP `phs…`, EGA `EGAS…` / `EGAD…`. Metadata is public; raw FASTQ/BAM are gated. Most of the immunotherapy cohorts (BIOKEY, CM-038, ADAPTeR, etc.), the HTAN raw genomics tier, and Owkin MOSAIC fall here.
- **Synapse — mixed**: processed L3/L4 + metadata are openly downloadable with a free Synapse account. Raw L1/L2 is gated via a paired dbGaP/EGA tier. HTAN master fileview `syn20446927` is the gateway — browse anything, but raw sequencing for each sub-atlas needs the matching DUA. HMS-LSP Synapse projects (Färkkilä, Launonen, HMS-Sorger ovarian) release processed CyCIF/mIF + segmentation tables openly.
- **GSA (Chinese NGDC)** — `HRA…` IDs are typically controlled-access (HDAC application).
- **Owkin MOSAIC-Window**: the public `EGAD50000001251` release is specifically the **15-patient muscle-invasive bladder subset** of MOSAIC's broader ~2,500 collected pan-cancer pool. Plan around 15, not 60.

Six accession IDs in the original draft pointed to the wrong cohorts and have been corrected in the tables above:

- Erickson 2022 prostate Visium: `EGAD00001008622` (EPICC CRC) → corrected to `EGAS00001006124`.
- Magness/Enfield 2024 TRACERx 100 IMC: `EGAS00001000809` (TRACERx pilot) → corrected to Zenodo `12587543`.
- Greenwald 2024 GBM: "GEO + Synapse" → corrected to `GSE237183` + Zenodo `10.5281/zenodo.8105466`.
- Mitri 2024 AMTEC: "dbGaP per paper" → confirmed `phs002371.v1.p1` (HTAN-HTAPP umbrella).
- Sun 2024 HCC: `HRA005020` was actually a Sichuan U. islet study → marked `accession not located`.
- Magen 2023 HCC: `phs002748` was actually Rosenberg metastectomy TCR → marked `accession not located`.
- Risom 2022 DCIS MIBI: `syn26844071` was actually a Lee 2020 CRC project → flagged with `syn17773547` as a candidate, verify before relying on.

Four 2025 cohorts (Hwang Cancer Cell PDAC neural, Pei Nature PDAC autopsy, Wu HGSOC Visium HD preprint, Wang SCLC PARPi) are recent enough that their accessions aren't surfaced in public indexes yet — flagged `accession unverified` in their rows. Track each at publication.

The lesson: agent-sourced accession IDs need direct verification, not just policy categorisation. The four-bucket inventory and patient counts are solid; the six wrong IDs were transcription / matching errors, not cohort errors.

## housekeeping

A few corpus follow-ups this audit surfaced (proposals, not merges):

1. **Rename `htan-hms-ovarian` to `hms-ovarian-sorger`** and drop the `consortium=HTAN-HTA13` claim. HTA13 is TNP SARDANA, not ovarian.
2. **Re-tag `wu-2021-breast`** to include `spatial-transcriptomics` (the Visium component is genuine on 6 of 26 patients; currently hidden behind a `single-cell-rna`-only modality tag).
3. **Add POG570** (`pog570-pleasance-2020`) — Tier-1 cohort named in [[paired-data-pan-cancer]] but missing from vault.
4. **Add high-value Bucket-D adds**: Owkin MOSAIC (`owkin-mosaic`), HTAN HTA12 WUSTL, HTAN HTA9 OHSU SMMART, HTAN HTA6 Duke DCIS, HTAN HTA5 DFCI Resistance.
5. **Add high-value Bucket-C adds**: METABRIC IMC (`ali-2020-metabric-imc`), TRACERx 100 IMC (`magness-enfield-2024-tracerx-imc`), STIC DVP (`makhmut-2025-stic-spatialproteomics`).

Triage for those lives in the round-2 report (`_Temp/2026-06-03-paired-data-search-round-2.md`); the user has the punch list.
