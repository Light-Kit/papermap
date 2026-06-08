---
title: 'cohort cards — pan-cancer HRD × CCR8 stratifier (73 cohorts across 4 buckets)'
date: '2026-06-06 16:42 UTC'
topics:
  - hrd
  - ccr8
  - pan-cancer
  - cohort-inventory
  - paired-data
  - bucket-A
  - bucket-B
  - bucket-C
  - bucket-D
  - htan
  - panel-status
  - access-tier
summary: 'one-card-per-cohort inventory of the full HRD × CCR8 corpus — 32 bucket-A sc/snRNA + paired genomics, 7 bucket-B spatial transcriptomics + genomics, 9 bucket-C spatial proteomics + genomics, 25 bucket-D multi-spatial / full-tuple. each card carries paper anchor, what-it-is, how-it-fits both axes, on-disk state, blockers, and the open question. side panel: HTAN sub-atlas access map across CELLxGENE / Synapse-PAT / dbGaP-DAR tiers, and CCR8-on-panel status across the spatial-proteomic rows. consolidated from the four-bucket scratch sweep that preceded the 2026-06-05 tier-1 intersection readout.'
starred: true
---

# cohort cards — pan-cancer HRD × CCR8 stratifier (73 cohorts across 4 buckets)

This post is the cohort-by-cohort companion to [[matched-multi-omic-tumor-table]] (the four-bucket schema) and [[progress-cohort-coverage-2026-06-05]] (the planned-vs-actual state matrix). Each card carries the same five fields: **paper anchor**, **what it is**, **how it fits** (HRD axis + CCR8 axis), **what is on disk**, **blockers**, and the **open question** the cohort is positioned to answer.

The four buckets are the project's modality spine:

- **Bucket A — sc/snRNA + paired genomics (32 cohorts).** Single-cell as primary; paired bulk genomics as the HRD anchor.
- **Bucket B — spatial transcriptomics + genomics (7 cohorts).** Visium / Visium-HD / ST / CosMx / Xenium as primary; bulk genomics in principle.
- **Bucket C — spatial proteomics + genomics (9 cohorts).** IMC / MIBI-TOF / t-CyCIF / DVP-MS — the only layer where CCR8 is measured as surface protein.
- **Bucket D — multi-spatial / full-tuple (25 cohorts).** Multi-modality on the same patient set — the configuration for per-patient HRD × CCR8 pairing at Tier 3.

## Bucket A — sc/snRNA + paired genomics (32 cohorts)

The Bucket-A spine of the HRD × CCR8 project: every cohort here lands a single-cell layer as primary modality, with paired bulk genomics as the HRD anchor — when public — and treatment context where available.

### bassez-2021-biokey
**Paper.** Bassez et al. 2021 Nat Med | PMID 33958794 | n=40, breast anti-PD-1 pre/on-Tx, scRNA + scTCR (10x 5')

**What it is.** A 40-patient anti-PD-1 window-of-opportunity trial in breast cancer with matched pre/on-treatment scRNA and scTCR, expander vs non-expander labelled.

**How it fits.** Treatment-causal anchor on both HRD axis (BRCA1/2 from MOESM3) and CCR8 axis (22.65% in CD4_REG; +2.45 pp expander Pre-Tx). Tier 1 + Tier 3 trial-design exemplar.

**On disk.** 0.74 GB partial: Figshare 24867018 Seurat .rds + Nat Med supps; CCR8 22.65%, joint-high 4.33%. EGA raw still gated.

**Still missing / blockers.** Raw FASTQ + CITE-seq + WES on EGA EGAS00001004809 (controlled). Per-patient CCR8 × HRD pairing waiting on Tier-3 scVI integration.

**Open question.** Does CCR8-Treg-high mark anti-PD-1 non-responders prospectively?

### bi-2021-ccrcc
**Paper.** Bi et al. 2021 Cancer Cell | PMID 33711272 | n=8, ccRCC anti-PD-L1 (atezo+bev / nivo), scRNA (10x 3')

**What it is.** Eight-patient ccRCC IO trial cohort profiling exhausted CD8 trajectories under PD-L1 blockade with scRNA.

**How it fits.** CCR8 axis only (0.53% in T-Reg label; n=750). HRD axis blocked at public layer. Tier 1 cohort with proxy flag; not Tier-3 eligible (n=8, ccRCC unmappable to Knijnenburg 12-study subset).

**On disk.** 1.05 GB partial via user manual upload from Broad SCP1288 (matrix + normalized + metadata); CCR8 quantified. scTCR not in SCP deposit.

**Still missing / blockers.** Raw WGS/WES on dbGaP phs002252 (controlled — charter-excluded). KIRC HRD baseline needs separate TCGA-Knijnenburg pull.

**Open question.** Does CCR8 stratify durable PD-L1 responders within ccRCC?

### caushi-2021-nsclc
**Paper.** Caushi et al. 2021 Nature | PMID 34290406 | n=16, NSCLC anti-PD-1 neoadjuvant, scRNA + scTCR (10x 5')

**What it is.** Sixteen-patient NSCLC anti-PD-1 neoadjuvant cohort dissecting MANA-specific T-cell clones in MPR vs non-MPR tumors.

**How it fits.** Both axes: CCR8 high (41% in author Tregs); HRD baseline from LUAD+LUSC TCGA. Tier 1 joint-high 10.07% — second only to Luo HGSOC. Treatment-causal axis (MPR/non-MPR) intact.

**On disk.** 4.35 GB downloaded; 113 scRNA + 107 scTCR GEO files, all size-verified; cohort-level CCR8 fed Tier-1.

**Still missing / blockers.** Bulk WES + panel companion not at GEO; typically dbGaP-gated. Per-patient HRD pairing blocked; n=16 small for cell-level test.

**Open question.** Is CCR8-Treg density the missing brake on MPR conversion?

### couturier-2020-gbm
**Paper.** Couturier et al. 2020 Nat Commun | PMID 33293613 | n=14, GBM IDH-wt, scRNA (10x 3')

**What it is.** Fourteen-patient GBM single-cell atlas tracing developmental hierarchies (OPC/AC/MES/NPC) within IDH-wt glioma.

**How it fits.** Neither axis productive at public tier: GBM HRD-rare (<5% Knijnenburg); Treg fraction in malignant-cell-skewed deposit small. Tier-1 unmappable; held as Tier-2 sc-QC backbone only.

**On disk.** Empty / 0 GB — EGA EGAS00001004422 stays controlled per 2026-06-04 public-only pivot; manifest accession patched from prior Mathewson 2021 mis-id.

**Still missing / blockers.** Raw scRNA + WES on EGA-controlled access. No companion modality at public layer. Charter-excluded from DAR pursuit.

**Open question.** Is there any CCR8-Treg niche detectable in IDH-wt GBM at all?

### goveia-2020-nsclc-ec
**Paper.** Goveia et al. 2020 Cancer Cell | PMID 32049045 | n=8, NSCLC endothelial subset, scRNA (10x 3')

**What it is.** NSCLC tumor-endothelial atlas extending the Lambrechts 2018 cohort into the endothelial niche.

**How it fits.** Neither axis: manifest accession E-MTAB-8221 is mis-attributed (fetal-lung-dev-dual-smad, not Goveia NSCLC-EC). Real Goveia E-MTAB-6308 drafted-future, not fetched. HRD and CCR8 both blocked.

**On disk.** 0.14 GB downloaded (the mis-id fetal-lung dataset; CCR8 absent in var, FOXP3 0.33%). Real Goveia cohort = 0 bytes on disk.

**Still missing / blockers.** Real Goveia at ArrayExpress E-MTAB-6308 needs re-pull. WES shared with Lambrechts (also no public mirror). Endothelial-skewed deposit limits T-cell N.

**Open question.** Does endothelial CCR8 ligand expression track HRD niches?

### htan-hta3-bu-lung-precancer
**Paper.** HTAN HTA3 BU lung pre-malignancy atlas | PMID `<unverified>` | n=484, lung-adeno + LUSC pre-malignant lesions, scRNA + mIF

**What it is.** HTAN's largest sub-atlas — 484 lung specimens spanning normal -> AAH -> AIS -> MIA -> invasive, with scRNA, mIF, scDNA and WES.

**How it fits.** Could anchor HRD-axis pre-malignant trajectory (WES + scDNA) and CCR8 axis (scRNA). Tier 1 not feasible until HTAN gating resolved; held as Tier-2 candidate.

**On disk.** 0 GB blocked. Synapse master fileview syn20446927 returns 403 for personal PAT — needs HTAN Network team membership.

**Still missing / blockers.** HTAN Network team ACL grant beyond PAT. Per-atlas project not individually listable. Application drafted in `_secrets/applications_2026-06-05/`.

**Open question.** Does CCR8-Treg seeding precede invasive transformation in lung?

### hwang-lin-2022-pdac-chemo
**Paper.** Hwang & Lin et al. 2022 Nat Genet | PMID 36253549 | n=43, PDAC FOLFIRINOX pre/post, snRNA + GeoMx DSP

**What it is.** Forty-three-patient PDAC FOLFIRINOX neoadjuvant atlas with snRNA nuclei and GeoMx DSP spatial-transcriptomic wells.

**How it fits.** Both axes provisional: CCR8 5.26% in activated Treg (snRNA bulk-dropout rescued via subcluster); HRD via TCGA-PAAD baseline (BRCA-mut subset valuable). Tier 1 anchor for PARPi-adjacent chemo context.

**On disk.** 2.83 GB ready; 224,988 nuclei H5AD + GeoMx DSP processed (608 wells); HRD axis blocked at public layer.

**Still missing / blockers.** WES on dbGaP phs002371 (controlled — charter-excluded). No matched pre/post within patient. OS/PFS only in paper supplementary, not extracted.

**Open question.** Does FOLFIRINOX expand or contract CCR8-Treg in BRCA-mut PDAC?

### jerby-arnon-2018-mel
**Paper.** Jerby-Arnon et al. 2018 Cell | PMID 30388455 | n=33, melanoma anti-PD-1 mixed, scRNA SmartSeq2

**What it is.** Thirty-three-patient melanoma SmartSeq2 atlas defining the T-cell-exclusion (TCE) program across naive and post-IO tumors.

**How it fits.** CCR8 axis strong (45.05% in FOXP3+ T.CD4 — SmartSeq2 full-length rescue). HRD via SKCM Knijnenburg backbone. Tier 1 joint-high 1.53%.

**On disk.** 0.29 GB ready; GEO GSE115978; CCR8 + Treg quantified; 16 naive + 16 post-treatment split.

**Still missing / blockers.** WES dbGaP-gated (no public mirror). RECIST coding gated in paper Suppl Table S1, not extracted. n=33 limits cell-level HRD pairing.

**Open question.** Does the TCE program co-segregate with CCR8-Treg density?

### karaayvaz-2018-tnbc
**Paper.** Karaayvaz et al. 2018 Nat Commun | PMID 30311936 | n=6, TNBC, scRNA SmartSeq2

**What it is.** Six-patient TNBC SmartSeq2 atlas profiling tumor heterogeneity and minimal-residual stemness signatures.

**How it fits.** Both axes accessible despite small N — TNBC + HRD-relevant; SmartSeq2 should rescue CCR8 cleanly. Held as Tier-2 sc-QC + Tier-3 candidate; priority-1 in manifest.

**On disk.** 1.38 GB partial; 4 WES (FFPE tumor-only) + 1 CEPH LCL ctrl + 1534 SmartSeq2 cells; WES download in progress; scRNA FASTQ 115 GB deferred.

**Still missing / blockers.** HRD-scorer R env install pending (CHORD/HRDetect/scarHRD). Clinical outcomes absent from GEO. n=6 caps cell-level power.

**Open question.** Does CCR8-Treg co-occur with HRD signatures in residual TNBC?

### kim-2018-tnbc-chemoresist
**Paper.** Kim et al. 2018 Cell | PMID 29681456 | n=20, TNBC neoadjuvant chemo longitudinal, scRNA SmartSeq2

**What it is.** Twenty-patient TNBC neoadjuvant chemotherapy cohort with paired pre/post deep WES, scDNA, scRNA tracing clonal selection.

**How it fits.** HRD-relevant (deep WES + scDNA + CNA) and treatment-causal (11/21 longitudinal). SmartSeq2 should rescue CCR8. Tier-1 + Tier-3 high-value when aligned.

**On disk.** 80.7 GB partial; 21 WXS + SS2 + 7 scDNA downloading; CCR8 not yet quantified; HRD scorer env READY but no BAMs/MAFs.

**Still missing / blockers.** SmartSeq2 alignment deferred. Processed TME matrices NOT in any open repo — needs raw align before Tier-1 entry.

**Open question.** Does HRD-high TNBC pre-chemo carry CCR8-Treg signature that survives chemo?

### kim-2020-nsclc-mets
**Paper.** Kim et al. 2020 Nat Commun | PMID 32385277 | n=44, NSCLC primary + LN + brain mets, scRNA (10x 3')

**What it is.** Forty-four-patient NSCLC primary-plus-metastasis atlas mapping cell-state shifts as tumors seed lymph-node and brain niches.

**How it fits.** Treatment-naive metastatic biology — neither axis tractable at the public tier today. HRD baseline available via LUAD + LUSC TCGA; CCR8 axis would need raw scRNA access. Currently charter-excluded.

**On disk.** Empty / 0 GB — EGA EGAS00001004001 stays controlled per the 2026-06-04 public-only pivot.

**Still missing / blockers.** Raw scRNA + WES on EGA-controlled access. No companion modality at the public layer. Met-biology relevance preserved for future DAR consideration.

**Open question.** Does the brain-met niche systematically deplete or enrich CCR8-Treg?

### lambrechts-2018-nsclc
**Paper.** Lambrechts et al. 2018 Nat Med | PMID 29942094 | n=5, NSCLC, scRNA (10x 3') endothelial-focused

**What it is.** Five-patient NSCLC scRNA atlas with endothelial-cell focus; foundational tumor-EC reference for the lung TME field.

**How it fits.** Neither axis productive: n=5 too small for cell-level HRD pairing; CCR8 quant pending Tier-2 standardization. Held as Tier-2 sc-QC reference cohort only, downstream of Caushi for IO context.

**On disk.** 0.31 GB downloaded via BioStudies API; 9 files; Tier-2 standardization queued; no CCR8 quant card yet.

**Still missing / blockers.** Bulk WES not at public mirror (E-MTAB-6149 sc-only). No clinical outcomes. n=5 caps any per-patient analysis; role is reference scaffold.

**Open question.** Does the founding NSCLC sc reference already show a CCR8-Treg fingerprint?

### lee-2020-crc-korea
**Paper.** Lee et al. 2020 Nat Genet | PMID 32451460 | n=29, CRC Korean cohort, scRNA (10x 3')

**What it is.** Twenty-nine-patient (deposit n=23) Korean CRC scRNA atlas defining tumor heterogeneity across MSS/MSI strata and immune compartments.

**How it fits.** CCR8 axis only (1.65% in author Tregs, eTreg 0.84%). HRD-rare in CRC; analogue to Pelka MMRd/MMRp template. Held as Tier-2 sc-QC. Tier-1 cohort with proxy flag.

**On disk.** 1.20 GB ready; 63,689 cells / 33 samples / 23 patients; broad-lineage QC pass.

**Still missing / blockers.** WES + bulk-RNA companion not at GEO/Zenodo/SRA-open. Treatment-naive cohort (no Tx-response axis). Manifest n_patients=29 vs deposit=23 discrepancy flagged.

**Open question.** Does MSI-high CRC carry a distinct CCR8-Treg signal vs MSS?

### liu-2022-nsclc
**Paper.** Liu et al. 2022 NSCLC IO | PMID `<unverified>` | n=35, NSCLC IO, scRNA (10x 3')

**What it is.** Thirty-five-patient NSCLC IO scRNA cohort — paper-side PMID resolution still pending (the manifest-cited PMID 35020028 resolves to a German rheumatology editorial, not Liu).

**How it fits.** Intended as a sister Tier-1 cohort to Caushi (IO context + HRD via LUAD/LUSC TCGA backbone), but completely blocked at the public tier. EGA EGAS00001005003 controlled access.

**On disk.** Empty / 0 GB — EGA controlled access not pursued per 2026-06-04 public-only pivot.

**Still missing / blockers.** Raw scRNA + WES on EGA-controlled access. PMID needs author-side resolution. Charter-excluded for DAR submission.

**Open question.** Adds NSCLC IO cell-level resolution beyond Caushi — value pending paper verification.

### luo-2024-nant-ovarian
**Paper.** Luo et al. 2024 Cell | PMID `<unverified>` | n=30, HGSOC NACT, scRNA + scTCR (10x 5')

**What it is.** Thirty-patient HGSOC neoadjuvant-chemo atlas with paired WGS — the project's flagship anchor cohort.

**How it fits.** Both axes anchor: CCR8 quantified across 661,501 cells / 16,124 eTregs; HRD baseline from OV TCGA (56% high) gives joint-high 13.29% — Tier-1 top rank. Treatment-axis partial.

**On disk.** 10.74 GB partial; 34 pts scRNA + scTCR; CCR8 fed Tier-1 forest plot; HRD genomics partial-processed via cBio OV-TCGA.

**Still missing / blockers.** Raw WGS in GSA-Human HRA007180 (controlled); Cell Table S1 HRD scores Cloudflare-gated. Per-patient HRD-CCR8 pairing waits on Tier-3.

**Open question.** Does NACT-selected HGSOC preserve the HRD × CCR8 co-incidence after platinum?

### luoma-2022-hnscc
**Paper.** Luoma et al. 2022 Cell | PMID 36087573 | n=29, HNSCC anti-PD-1, scRNA + scTCR (10x 5')

**What it is.** Twenty-nine-patient HNSCC anti-PD-1 neoadjuvant cohort dissecting tissue-resident exhausted CD8 dynamics.

**How it fits.** CCR8 axis strong (37.5% in Tregs); HRD via HNSC TCGA. Tier-1 joint-high 3.83%. Treatment-causal axis (pathologic response high/med/low) intact.

**On disk.** 3.18 GB ready, pass QC; 74,557 cells / 25 sc tumor samples / 19 pts; Treg union 8,377; Pre-Tx pairing limited to 6/19.

**Still missing / blockers.** Clinical-panel genomics not at public layer (HRD axis blocked beyond TCGA backbone). Pre/Post within-patient pairing limited.

**Open question.** Does CCR8-Treg decline coincide with pathologic-response conversion under anti-PD-1?

### magen-2023-hcc
**Paper.** Magen et al. 2023 Nat Med | PMID 37322116 | n=33, HCC anti-PD-1, scRNA + scTCR + MERSCOPE

**What it is.** Thirty-three-patient HCC anti-PD-1 cohort (single-cell companion to Marron 2022 cemiplimab + off-label samples) with scRNA, scTCR, MERSCOPE spatial layer.

**How it fits.** Both axes plausible at the cohort design level: HCC HRD-rare but bridgeable via LIHC TCGA backbone; clean anti-PD-1 IO context. Tier 1 not yet computed (accession verification pending; data not on disk).

**On disk.** 0 GB — accession NOT-LOCATED in manifest; verify before download. Deferred priority 4.

**Still missing / blockers.** Accession resolution for raw + processed scRNA layer. WES typically dbGaP-gated. MERSCOPE spatial-layer accessibility unknown until accession resolves.

**Open question.** Does anti-PD-1 HCC carry the same CCR8-Treg fingerprint as anti-PD-1 NSCLC/HNSCC?

### maynard-2020-nsclc-longitudinal
**Paper.** Maynard et al. 2020 Cell | PMID 32822576 | n=30, NSCLC TKI pre/residual/progression, scRNA (10x 3')

**What it is.** Thirty-patient EGFR/ALK NSCLC TKI longitudinal atlas tracking pre-treatment, residual-disease, and progression states with paired bulk WES.

**How it fits.** TKI is not HRD-direct, but the residual-disease window is uniquely tractable for CCR8-Treg resistance biology. Held as Tier-2 sc-QC candidate; Tier-1 unmappable until accession verified.

**On disk.** Empty / 0 GB — EGA accession UNVERIFIED (prior EGAS00001004422 was Couturier mis-attribution per 2026-06-04 EGA API check).

**Still missing / blockers.** Real EGA accession requires author contact. Raw scRNA + WES + NGS on EGA-controlled access. Charter-excluded from DAR.

**Open question.** Does TKI residual disease enrich CCR8-Treg as a resistance niche?

### neftel-2019-gbm
**Paper.** Neftel et al. 2019 Cell | PMID 31327527 | n=28, GBM IDH-wt, scRNA SmartSeq2 + 10x

**What it is.** Twenty-eight-patient GBM atlas defining four malignant cell states (NPC, OPC, AC, MES) and their plasticity in IDH-wt glioma.

**How it fits.** Neither axis productive at the public tier: GBM HRD-rare; deposit is malignant-cell-skewed with small Treg N. Dual SmartSeq2 + 10x modality; held as Tier-2 reference.

**On disk.** 1.34 GB ready (GEO GSE131928 secondary only); SCP393 gated, not pursued; TPM-only deposit; Treg n small.

**Still missing / blockers.** WES on dbGaP-gated, no public mirror. Manifest hrd_signal=wes-chord not supported by GEO deposit. Mito-genes stripped pre-deposit limits MT-QC.

**Open question.** Are CCR8-Treg detectable at all in GBM single-cell deposits?

### olbrecht-2021-hgsoc
**Paper.** Olbrecht et al. 2021 Genome Biol | PMID 34010452 | n=7, HGSOC, scRNA (10x 3')

**What it is.** Seven-patient HGSOC scRNA atlas defining stromal-compartment heterogeneity across primary OV tumors.

**How it fits.** HRD-relevant cancer (germline BRCA flagged) but small N; CCR8 axis = 0% in deposit (chemistry + filtering). Tier-2 sc-QC candidate only; Tier-1 unmappable.

**On disk.** 3.05 GB ready; 0 tumor cells after pre-existing filter; CCR8+ = 0, FOXP3+ = 0, Tregs = 0; deposit ships no genomic, no clinical outcomes.

**Still missing / blockers.** No paired genomic in ArrayExpress deposit. No clinical outcomes. n=7 too small for per-patient HRD-CCR8 test.

**Open question.** Does Olbrecht's stromal-skewed sampling explain its CCR8 floor?

### pal-2021-brca1-breast
**Paper.** Pal et al. 2021 EMBO J | PMID 33950524 | n=21, BRCA1-carrier breast, scRNA (10x 3')

**What it is.** Twenty-one-patient rare BRCA1-carrier breast cancer scRNA atlas — the only public sc cohort with germline-BRCA1 enrichment as the cohort selection criterion.

**How it fits.** HRD axis direct via germline BRCA1 carrier status; CCR8 axis quantifiable from 10x 3' (with chemistry-floor caveat). High-value Tier-1 + Tier-3 candidate despite N=21.

**On disk.** 2.36 GB downloaded; GSE161529 RAW.tar extracted (141 files, 138 size-verified); aria2c rc=3 noted; CCR8 not yet quantified.

**Still missing / blockers.** WGS not at GEO/Zenodo/SRA-open (sc-only deposit). HRD-scorer R env install pending. No companion bulk genomics layer publicly available.

**Open question.** Does germline-BRCA1 breast carry a CCR8-Treg signature distinct from sporadic TNBC?

### pelka-2021-crc
**Paper.** Pelka et al. 2021 Cell | PMID 34450029 | n=62, CRC MMRd/MMRp, scRNA (10x 3') + MERFISH subset

**What it is.** Sixty-two-patient CRC scRNA atlas stratified MMRd vs MMRp, with a MERFISH spatial subset that doubles as a D-tier orbital cohort.

**How it fits.** MMR is the sibling of HRD — analogue template for the project. CCR8 3.2% MMRd vs 2.4% MMRp. Tier-1 joint-high 1.20% (proxy flag). HRD axis blocked at the public layer.

**On disk.** 1.21 GB ready, pass-partial QC; public scRNA only; CCR8 quantified by MMR strata; CRC HRD-rare.

**Still missing / blockers.** WES on dbGaP phs002407 (charter-excluded). MERFISH subset planned as D-tier orbital (Chen Cell 2021), not yet pulled.

**Open question.** Does the MMRd CCR8 enrichment generalize to HRD-high biology?

### puram-2017-hnscc
**Paper.** Puram et al. 2017 Cell | PMID 29198524 | n=18, HNSCC, scRNA SmartSeq2

**What it is.** Eighteen-patient HNSCC SmartSeq2 atlas — the founding HNSCC sc reference, defining malignant-cell partial-EMT trajectories.

**How it fits.** CCR8 axis strong (67.7% in FOXP3+ Tregs — SmartSeq2 full-length rescue, the highest CCR8 fraction in the corpus). HRD via HNSC TCGA. Tier-1 joint-high 6.91% — third-highest in the forest plot.

**On disk.** 0.09 GB ready; 5,902 SmartSeq2 cells / 18 patients; CCR8 and Treg quantified in P3 dispatch.

**Still missing / blockers.** WES not at GEO/Zenodo/SRA-open. Clinical absent from GEO supplementary. Treg n=127 limits per-patient HRD-CCR8 test.

**Open question.** Is HNSCC's high CCR8-Treg fraction HPV-status dependent?

### sade-feldman-2018-mel
**Paper.** Sade-Feldman et al. 2018 Cell | PMID 30388456 | n=37 (48 timepoints), melanoma anti-PD-1, scRNA SmartSeq2

**What it is.** Thirty-seven-patient melanoma anti-PD-1 SmartSeq2 cohort defining TCF7+ memory-like vs exhausted CD8 states.

**How it fits.** Treatment-causal co-headline with Caushi: CCR8 38.26% in Tregs; Responder × Post 24.63% vs Non-responder × Post 44.89%. Tier-1 joint-high 1.30% (SKCM HRD floor compresses).

**On disk.** 0.13 GB ready, pass QC; 16,291 cells / 37 patients / 48 sample-timepoints; SS2 rescues CCR8.

**Still missing / blockers.** No WES in GSE120575 (manifest claim deferred); raw via dbGaP per author. Manifest n=48 actually 37 patients.

**Open question.** Does the +20 pp Non-responder CCR8 gap replicate in non-melanoma anti-PD-1?

### stewart-2020-sclc-cdx
**Paper.** Stewart et al. 2020 Nat Cancer | PMID 33179010 | n=12, SCLC chemo-evolved CDX, scRNA (10x 3')

**What it is.** Twelve-patient SCLC circulating-tumor-cell-derived xenograft model with WGS-CDX + WES-CTC and matched scRNA.

**How it fits.** HRD axis direct (WGS-CDX + WES-CTC = SBS3-derivable); SCLC + PARPi-relevant chemo context. CCR8 axis intrinsic to immune-deficient CDX (limited).

**On disk.** Empty / 0 GB — EGA EGAS00001004025 stays controlled per public-only pivot. Alt-genomic via cBioPortal sclc_ucologne_2015 noted.

**Still missing / blockers.** Raw scRNA + WGS on EGA-controlled access. SCLC outside Knijnenburg 33-list — alt cBioPortal backbone needed for HRD-high call.

**Open question.** Does PARPi-evolved SCLC carry a residual HRD genomic scar?

### su-2025-hcc-snrna
**Paper.** Su et al. 2025 | PMID `<unverified>` | n=6 (12 samples), HCC, snRNA

**What it is.** Six-patient HCC snRNA cohort with paired tumor-peritumor (T/P) sampling; WES indirect via TCGA-LIHC integration.

**How it fits.** CCR8 axis only (17.17% in Treg subcluster via snRNA bulk-dropout rescue). HRD axis analytical-only (no per-patient WES). Tier-2 sc-QC candidate.

**On disk.** 1.71 GB ready, partial; 12 GSMs / 124,316 nuclei post-QC; manifest n_pat=12 actually 6 patients × T/P.

**Still missing / blockers.** No per-patient WES (TCGA-LIHC integration is analytical strategy, not modality). No treatment/outcome fields in GEO. n=6 limits cell-level test.

**Open question.** Does HCC tumor-vs-peritumor sampling reveal CCR8-Treg-niche compartmentalization?

### sun-2021-hcc-early-relapse
**Paper.** Sun et al. 2021 Cell | PMID 33357445 | n=18, HCC primary + early-relapse, scRNA + scTCR

**What it is.** Eighteen-patient HCC primary + early-relapse paired scRNA + scTCR cohort tracing relapse-specific immune-niche shifts within the same patient.

**How it fits.** Treatment-causal cohort (within-patient relapse pairing) and CCR8-axis-relevant for an under-sampled cancer. HRD via LIHC TCGA backbone. Deposit at BGI/CNGB-DB requires registration — deferred.

**On disk.** Empty / 0 GB — CNGB-DB user registration pending. Prior GSE149614 was Lu 2022 HCC atlas mis-attribution, confirmed 2026-06-05.

**Still missing / blockers.** CNGB-DB user registration to unlock raw. WES typically deposited alongside. Demoted to priority 4 per 2026-06-04 patch — do not download.

**Open question.** Does early-HCC-relapse carry a distinct CCR8-Treg signature vs primary?

### tirosh-2016-melanoma
**Paper.** Tirosh et al. 2016 Science | PMID 27124452 | n=19, metastatic melanoma, scRNA SmartSeq2

**What it is.** Nineteen-patient metastatic melanoma cohort — the founding cancer SmartSeq2 atlas defining malignant heterogeneity and microenvironment composition.

**How it fits.** CCR8 axis clean (38.65% in FOXP3+ Tregs via SmartSeq2 full-length rescue; n=63 eTregs). HRD via SKCM TCGA backbone. Tier-1 joint-high 1.31% (SKCM HRD floor compresses).

**On disk.** 0.08 GB ready; 4,645 SS2 cells / 19 tumors; CCR8 + Treg quantified; log2(TPM/10+1) TPM-only deposit.

**Still missing / blockers.** WES FASTQ on dbGaP (charter-excluded). No treatment outcomes in GEO. Mito-genes stripped pre-deposit limits MT-QC.

**Open question.** Does the founding melanoma sc reference's CCR8 fraction reset our cancer-type prior?

### vazquez-garcia-2022-mskspectrum
**Paper.** Vazquez-Garcia et al. 2022 Nature | PMID 36347242 | n=42, HGSOC MSK SPECTRUM, scRNA (10x 3') + scWGS-DLP

**What it is.** Forty-two-patient HGSOC MSK SPECTRUM atlas with paired scWGS-DLP, WGS, and scRNA across multi-site sampling.

**How it fits.** Both axes anchor in principle — but CCR8 0% in CELLxGENE deposit (column filtered) = platform-floor artifact. Tier-1 joint-high 0.00% (platform-artifact flag). Dual-bucket A/D.

**On disk.** 16.13 GB downloaded; 5 scRNA datasets (CELLxGENE 4796c91c) + GSE180661 bulk-RNA; HRD axis partial via cBio OV-TCGA.

**Still missing / blockers.** Raw with CCR8 column requires Synapse syn25569736 — Synapse mixed access. Per-patient WGS-CCR8 pairing blocked until raw re-fetched.

**Open question.** Does CCR8 reappear in HGSOC when re-pulled from raw vs CELLxGENE re-deposit?

### wang-2021-gastric-peritoneal
**Paper.** Wang et al. 2021 gastric+peritoneal | PMID `<unverified>` | n=6 (manifest 20), gastric + peritoneal-met, scRNA (10x 3' v3)

**What it is.** Six-patient gastric+peritoneal-metastasis scRNA atlas (10x v3, NovaSeq 6000) tracing site-specific immune shifts.

**How it fits.** CCR8 axis only (1.82% peak in peritoneal met). HRD axis blocked — no genomic in deposit despite manifest claim. Tier-2 sc-QC candidate.

**On disk.** 0.76 GB ready; 10 samples / 6 patients; CCR8 detected in all 10; 9/10 pass mito-QC; manifest has 3 errors flagged.

**Still missing / blockers.** No genomic deposit (manifest WES claim stale). Manifest n_patients=20 -> actually 6. No clinical outcomes.

**Open question.** Does peritoneal-met seeding co-opt CCR8-Treg from primary gastric?

### yost-2019-bcc
**Paper.** Yost et al. 2019 Nat Med | PMID 31359002 | n=14, BCC anti-PD-1, scRNA + scTCR (10x 5')

**What it is.** Fourteen-patient basal-cell carcinoma anti-PD-1 cohort with paired pre/post scRNA + scTCR mapping clonotype-replacement dynamics.

**How it fits.** CCR8 axis strong (37.11% in author Treg cluster, n=4540, strongest in P3 batch). HRD axis blocked (BCC not HRD-direct; no genomic at public layer). Tier-1 joint-high 1.26% (proxy flag).

**On disk.** 0.16 GB ready; CCR8 quantified per Treg cluster; scTCR aligned; P3 dispatch complete.

**Still missing / blockers.** Manifest WES claim unsupported by GEO deposit. RECIST coding gated in paper Suppl Table S1. BCC HRD-rare even in cancer-type backbone.

**Open question.** Does CCR8-Treg track clonotype replacement under anti-PD-1?

### zhang-2022-gastric-tcell
**Paper.** Kumar-Tan et al. 2022 gastric T-cell | PMID `<unverified>` | n=29 (manifest 10), gastric, scRNA + scTCR (10x 5')

**What it is.** Twenty-nine-patient NGCII gastric scRNA + scTCR T-cell-focused atlas — cohort-id is a misnomer (deposit GSE183904 is Kumar-Tan 2022, not Zhang).

**How it fits.** CCR8 axis strong (18.76% in Tregs; primary tumor 18.95%). HRD axis blocked (no genomic raw in deposit). Tier-2 sc-QC + Tier-1 candidate.

**On disk.** 0.69 GB ready; 158,641 cells / 29 patients / 40 samples; AnnData processed/tme/zhang2022.h5ad; CCR8 + Treg quantified.

**Still missing / blockers.** Cohort-id misnomer needs correction. WES stale in manifest (deposit ships no genomic raw). No treatment outcomes.

**Open question.** Does gastric CCR8-Treg compartment differ by anatomic-site (primary vs peritoneal)?

### Footer — bucket A unverified or partially-verified cohorts

Cohorts where the PMID could not be confidently verified from the manifest or memory at the 45-minute time-cap, and were marked `<unverified>` in the card header:

- **luo-2024-nant-ovarian** — Luo Cell 2024; manifest references Cell 2024 without PMID; project anchor but PMID not yet cited in any memory file.
- **liu-2022-nsclc** — manifest explicitly flags the previously-cited PMID 35020028 as invalid (German rheumatology editorial); real PMID still awaits author-side resolution.
- **wang-2021-gastric-peritoneal** — multiple "Wang 2021 gastric" papers exist; manifest does not pin PMID; conservative call given GSE163558 deposit-side mis-id history.
- **zhang-2022-gastric-tcell** — cohort-id explicitly flagged in status: deposit GSE183904 belongs to Kumar-Tan 2022, not Zhang; PMID needs cohort-id correction first.
- **su-2025-hcc-snrna** — 2025 record; no PMID in manifest yet; cohort is GEO-only (GSE282701).
- **htan-hta3-bu-lung-precancer** — sub-atlas, no single anchor PMID; HTAN itself is a consortium accession.
- **magen-2023-hcc** — header cites PMID 37322116 (user-verified per manifest patch), but accession NOT-LOCATED and on-disk = 0 GB, so the PMID is verified but the cohort is otherwise unverified at the data layer.

## Bucket B — spatial transcriptomics + genomics (7 cohorts)

Seven cohorts where the primary layer is spatial transcriptomics (Visium, Visium-HD, Stereo-seq-era ST, CosMx, Xenium) paired in principle with bulk genomics — the substrate for tissue-architecture HRD × CCR8 readouts when within-spot CCR8 detection holds.

### erickson-2022-prostate-visium
**Paper.** Erickson et al 2022 Nature | PMID 35948708 | n=11 patients, prostate adenocarcinoma, Visium multi-section + matched WGS/lpWGS.

**What it is.** Spatially-resolved WGS-clone-to-Visium-section pairing across multifocal prostate primaries.

**How it fits.** HRD axis via SBS3 from matched WGS; CCR8 axis via spot deconvolution; Tier-3 candidate but PRAD HRD-floor is ~1%, capping joint-high.

**On disk.** 10.35 GB downloaded from Mendeley svw96g68dv (Visium count matrices + H&E + 325 files); status=downloaded; ROIs fully public, per-spot coordinates included.

**Still missing / blockers.** Bulk-RNA companion not in public layer; EGAS00001006124 raw WGS BAMs controlled (not pursued); HRD scoring blocked at SBS3-from-MAF until WGS DAR; CCR8 deconvolution not yet run.

**Open question.** Does intra-tumor SBS3 heterogeneity track CCR8-Treg neighborhoods within one focus?

### ji-2020-cscc-st
**Paper.** Ji et al 2020 Cell | PMID 32579974 | n=10 patients, cutaneous squamous-cell carcinoma, ST-Visium-predecessor + scRNA companion.

**What it is.** Original spatial-transcriptomic atlas of cSCC tumor-stroma boundaries with paired droplet scRNA.

**How it fits.** Neither HRD nor CCR8 axis tractable at public layer; archival B-bucket exemplar; CCR8 spatial drop-out confirms platform-artifact rule.

**On disk.** 658 MB downloaded; GSE144239 = 12 ST-legacy + 4 Visium v1 sections; scRNA arm 48,164 cells / 10 patients; status=ready; ROIs and coordinates public.

**Still missing / blockers.** No public per-sample WES (manifest accession_primary stale for B-bucket); no treatment-response (baseline cohort); CCR8 ST 0.039%, Visium 0% — drop-out, not zero.

**Open question.** Can FOXP3 proxy alone resolve cSCC tumor-edge Treg architecture?

### khaliq-sun-2024-pdac
**Paper.** Khaliq and Sun et al 2024 (PDAC primary+mets Visium) | PMID UNVERIFIED | n=30 specimens, pancreatic ductal adenocarcinoma, Visium-FFPE.

**What it is.** Visium-FFPE survey of PDAC primaries with matched liver/peritoneal metastases.

**How it fits.** CCR8 axis only — detected in 27/30 sections (FFPE probe-set advantage); HRD axis blocked at public layer; BRCA-mut PDAC subset would matter if WES surfaced.

**On disk.** 260 MB downloaded from GSE272362; 26 pass + 1 warn + 3 fail QC; status=ready; manifest WES+bulkRNA claim is wrong — open layer is Visium-only with public ROIs.

**Still missing / blockers.** No WES, no bulk-RNA, no clinical at public layer; paper supplementary required for clinical metadata; HRD scoring entirely blocked.

**Open question.** Do PDAC liver-mets shift CCR8 stromal niches versus primaries?

### pei-min-2025-pdac-autopsy
**Paper.** Pei and Min et al 2025 Nature 642:212 | PMID UNVERIFIED | n=13 autopsy patients, PDAC multi-organ, Visium 55-sections + CosMx companion.

**What it is.** Rapid-autopsy PDAC mapping of polyclonal seeding across primary plus multi-organ metastases.

**How it fits.** Both axes scoped — WGS/WES claimed for SBS3, CosMx 1000-plex for spatial CCR8 — but CosMx panel omits CCR8 and FOXP3+CD4+ Treg proxy reads n=6 across two slides.

**On disk.** 7.88 GB downloaded; GSE274557 Visium (57 GSMs) + GSE277782 CosMx (7 GSMs); status=downloaded; ROIs and coordinates public per GEO supplementary.

**Still missing / blockers.** WGS/WES accession not in Nature data-availability statement (UNVERIFIED); CosMx 1k panel structurally CCR8-blind; HRD scoring blocked until raw genomics located.

**Open question.** Do autopsied multi-organ PDAC mets share one SBS3 clone or diverge?

### stur-2022-hgsoc-visium
**Paper.** Stur et al 2022 (HGSOC NACT-response Visium) | PMID UNVERIFIED | n=12 patients, high-grade serous ovarian, Visium-only.

**What it is.** Visium survey of HGSOC pre- and post-neoadjuvant-chemotherapy response architecture.

**How it fits.** CCR8 axis only as proxy — FOXP3 spot-fraction ER 3.50% vs PR 0.72% (~4.9x); HRD axis downgraded since paper appears Visium-only with no matched WGS despite OV HRD-floor of 56%.

**On disk.** 213 MB downloaded; GSE189843 (accession corrected from GSE211956 per Wave-A pre-flight); status=ready; spatial coordinates absent in GEO deposit, count matrices only.

**Still missing / blockers.** No matched WGS — HRD axis structurally blocked; CCR8 mRNA undetectable on Visium-v1 (drop-out); spatial coords absent from GEO upload limit re-analysis.

**Open question.** Does FOXP3 stromal density predict NACT pathologic response in HGSOC?

### wu-2025-hgsoc-visium-hd
**Paper.** Wu et al 2025 preprint 10.1101/2025.11.24.690313 | PMID UNVERIFIED (preprint) | n=30 patients, HGSOC, Visium-HD + WES with HRD scores.

**What it is.** Visium-HD-resolution HGSOC atlas with matched WES and per-patient HRD-status calls.

**How it fits.** Both axes scoped on paper — would be the cleanest B-bucket HRD-stratified spatial deposit if accession surfaces; Tier-3 candidate if Visium-HD spot-size resolves CCR8 detection.

**On disk.** 0 bytes — accession UNVERIFIED, deferred per priority-4 charter rule; no raw, no processed, no intermediates on disk; status row absent from status.tsv.

**Still missing / blockers.** No verified GEO/Zenodo/EGA accession; preprint data-availability section not yet inspected; until accession verified the row stays deferred, no DAR pursued.

**Open question.** Does Visium-HD 2-um binning finally resolve CCR8+ Treg spots in HGSOC?

### xenium-5k-demo-10x
**Paper.** 10x Genomics 2024-2025 Xenium Prime 5K + Visium-HD technical demos | no PMID (vendor portal) | demo n, breast/OV/NSCLC/melanoma/cervix FFPE blocks, Xenium-5K + Visium-HD.

**What it is.** Public 10x vendor blocks demonstrating Xenium Prime 5K Human Pan Tissue panel on five cancer FFPE types.

**How it fits.** Methods-validation row — Xenium 5K panel includes CCR8, so this is the platform pilot for HRD-anchored Xenium probes; no patient-level HRD or CCR8 readout possible.

**On disk.** 96.65 GB downloaded; 36 files (30 raw + 6 meta) including matched Xenium v1 NSCLC tech-note; sha256 checksums verified; status=downloaded; ROIs and cell-segmentation public.

**Still missing / blockers.** No per-block WGS released by 10x as open mirror (HRD axis blocked at vendor level); single-block-per-type prevents within-cancer replication; no clinical metadata.

**Open question.** Does Xenium 5K detect CCR8+ Tregs at densities matching scRNA references?

### Footer — bucket B unverified PMIDs

- khaliq-sun-2024-pdac: PMID not located; manifest cites paper-supplementary-required.
- pei-min-2025-pdac-autopsy: PMID not verified; cited only as Nature 642:212 (2025); accession UNVERIFIED per manifest.
- stur-2022-hgsoc-visium: PMID not verified at manifest level; accession corrected from GSE211956 to GSE189843 (prior was Denisenko 2024 mis-id).
- wu-2025-hgsoc-visium-hd: preprint only (bioRxiv 10.1101/2025.11.24.690313); no PMID; accession itself UNVERIFIED.
- xenium-5k-demo-10x: vendor data, no PMID by design.
- erickson-2022-prostate-visium: PMID 35948708 cited from public knowledge, not from manifest field.
- ji-2020-cscc-st: PMID 32579974 cited from public knowledge, not from manifest field.

## Bucket C — spatial proteomics + genomics (9 cohorts)

Spatial-protein cohorts (IMC, MIBI-TOF, t-CyCIF, DVP-MS) paired with WGS/WES or panel genomics — the only layer in the project where CCR8 is measured as surface protein rather than 10x-3' mRNA, side-stepping the chemistry-floor artefact that compresses every Tier-1 scRNA reading.

### ali-danenberg-2020-metabric-imc
**Paper.** Ali, Danenberg 2020 Nat Cancer | PMID 35122080 | n=693, breast all-subtypes, IMC-37plex on METABRIC tumors.

**What it is.** Largest breast IMC atlas to date, layered onto METABRIC targeted-panel WES and SNP6 CNA.

**How it fits.** Surface-protein FOXP3 bypasses the 10x-3' chemistry floor — but CCR8 is NOT on the 37-plex panel, blocking Treg quantification at protein scale.

**On disk.** 52 GB from Zenodo 6036188; METABRIC genomics open via cBioPortal `brca_metabric`.

**Still missing / blockers.** CCR8 absent from panel; HRD scoring blocked on R-env (CHORD/HRDetect compiling); RECIST never measured; EGA raw imaging not pursued.

**Open question.** Does CNA-derived HRD-high track FOXP3 density in TNBC?

### farkkila-2020-topacio
**Paper.** Farkkila 2020 Nat Commun | PMID 32393781 | n=62, HGSOC + TNBC + endometrial, t-CyCIF on TOPACIO trial.

**What it is.** Phase-2 niraparib + pembrolizumab trial with t-CyCIF pre-/post biopsies plus matched WGS, HRDsum and BRCA-LOH.

**How it fits.** Most direct treatment-causal template in the corpus: real PARPi-IO combination with HRD axis and surface-protein TME — exactly what a niraparib + anti-CCR8 trial would mimic.

**On disk.** Zero bytes; Synapse syn21569629 confirmed but priority files blocked.

**Still missing / blockers.** DUC-gated; Synapse PAT alone insufficient — requires Data Use Certificate. CCR8 status on panel unconfirmed.

**Open question.** Is CCR8 on the t-CyCIF panel?

### jackson-2020-breast-imc
**Paper.** Jackson, Bodenmiller 2020 Nature | PMID 31959985 | n=281, breast all-subtypes, IMC-37plex Basel cohort (METABRIC-linked).

**What it is.** First large breast IMC atlas; single-cell protein imaging joined retroactively to METABRIC WES and CNA.

**How it fits.** Surface FOXP3 is direct, but CCR8 is NOT on the 37-plex panel — Treg call reverts to FOXP3-only proxy, replicating the bulk-RNA limitation rather than escaping it.

**On disk.** 45 GB from Zenodo 4607374; HRD via METABRIC backdrop returns 19.1% HRD-high.

**Still missing / blockers.** CCR8 not on panel; genomics needs METABRIC ID join; no longitudinal; outcomes partial.

**Open question.** Does FOXP3 proxy track CCR8 mRNA from BIOKEY?

### launonen-2022-farkkila-mif-hgsoc
**Paper.** Launonen, Farkkila 2022 Nat Commun | PMID 36302750 | n=44, HGSOC HRD-stratified, t-CyCIF multiplexed IF.

**What it is.** HGSOC tumor microarray imaged at single-cell resolution, pre-stratified by BRCA1/2 and HRD-vs-HRP — cleanest pre-stratified HRD cohort.

**How it fits.** Direct HRD-axis comparator; surface-protein TME side-steps the 10x-3' chemistry floor that compressed CCR8 in every scRNA HGSOC cohort. CCR8 panel-status pending.

**On disk.** 65 MB processed tier via Synapse syn23747228 PAT unlock; ~3,700 raw tiles deferred.

**Still missing / blockers.** Raw OME-TIFF unfetched; CCR8 status unconfirmed; per-cell coordinates not yet ingested into spatial pipeline.

**Open question.** Is CCR8 on the t-CyCIF panel?

### magness-enfield-2024-tracerx-imc
**Paper.** Magness, Enfield 2024 Nat Cancer | PMID-unverified | n=81, NSCLC early-stage, IMC two-panel under TRACERx.

**What it is.** TRACERx early-NSCLC IMC sub-study with multi-region WES and matched bulk-RNA from the parent backbone.

**How it fits.** NSCLC HRD-rare (LUAD ~9%, LUSC ~7%), so yield is modest, but multi-region WES is the project's only multi-region HRD comparator and surface FOXP3 complements Caushi.

**On disk.** Zero bytes; Zenodo 12587543 returns HTTP 403 (access restricted at source).

**Still missing / blockers.** Zenodo blocked despite "open" tag; CCR8 status on either panel unverified; PMID needs resolution; likely requires TRACERx consortium credentials.

**Open question.** Does either IMC panel carry CCR8?

### makhmut-coscia-2025-stic-dvp
**Paper.** Makhmut, Coscia 2025 Mol Syst Biol | PMID-unverified (bioRxiv 2025.03.19.643504) | n=25, HGSOC + STIC, DVP-LMD-MS.

**What it is.** Deep Visual Proteomics on laser-microdissected STIC precursors and matched HGSOC, plus a targeted HRD-LOH panel.

**How it fits.** Only DVP-MS cohort in the corpus; proteome depth runs to thousands vs IMC's 30-40, so CCR8 is quantifiable proteome-wide if expressed — no antibody constraint.

**On disk.** Zero bytes; PRIDE PXD069630 located but not pulled; HRD-panel not in any open deposit.

**Still missing / blockers.** PRIDE pull pending; HRD-panel location unknown; precursors may carry too few immune cells for CCR8.

**Open question.** Does MS proteome cover CCR8?

### mitri-2024-amtec-parpi-mtnbc
**Paper.** Mitri 2024 (HTAPP-AMTEC umbrella) | PMID-unverified | n=12, metastatic TNBC PARPi pre-/post, t-CyCIF.

**What it is.** AMTEC phase-2 PARPi trial in mTNBC with t-CyCIF imaging and bulk-WES on matched pre-/post biopsies — direct PARPi treatment-causal cohort.

**How it fits.** With TOPACIO, the only on-treatment PARPi exposure cohort in the corpus — surface CCR8 pre/post niraparib in HRD-stratified mTNBC would literally instantiate the Tier-1 trial design.

**On disk.** Zero bytes; dbGaP phs002371.v1.p1 controlled-access, charter-excluded under public-pivot.

**Still missing / blockers.** dbGaP DAR not pursued; PMID needs verification; CCR8 antibody status on t-CyCIF panel unconfirmed; n=12 small.

**Open question.** Is CCR8 on the AMTEC panel?

### risom-2022-dcis-mibi
**Paper.** Risom, Angelo 2022 Cell | PMID 35216671 | n=122, breast DCIS-to-IBC, MIBI-TOF 37-plex.

**What it is.** Largest MIBI-TOF cohort in the corpus; tracks DCIS-to-invasive progression with 37-plex imaging and matched panel genomics.

**How it fits.** Surface FOXP3 across the DCIS-IBC continuum maps Treg recruitment to invasion; HRD context limited because DCIS rarely carries BRCA-LOH, but BRCA-carriers give a clean preinvasive readout.

**On disk.** 574 MB via Mendeley d87vg86zd8 + figshare 25289011; HTAN-HTA6 orbital genomic blocked.

**Still missing / blockers.** CCR8 absent from 37-plex MIBI panel; HTAN gated; no clinical follow-up; possible paper mis-ID flagged.

**Open question.** Does FOXP3 density rise at DCIS-IBC transition?

### tietscher-2023-breast-imc
**Paper.** Tietscher, Bodenmiller 2023 Nat Commun | PMID 36609566 | n=14, breast HER2+/TNBC, IMC-40plex + scRNA companion.

**What it is.** Paired IMC and scRNA on the same tumors — only cohort with same-patient protein and transcript layers.

**How it fits.** Direct control for the chemistry-floor problem: IMC CCR8 vs 10x-3' mRNA CCR8 in the same patients quantifies the protein-vs-mRNA correction factor used implicitly elsewhere.

**On disk.** 25 GB via Zenodo 4911135 + ArrayExpress E-MTAB-10607 (FASTQ deferred); under `-bodenmiller` variant.

**Still missing / blockers.** CCR8 on 40-plex IMC unverified; no METABRIC link; no public HRD axis; scRNA FASTQ deferred.

**Open question.** Does protein-CCR8 correlate with mRNA-CCR8?

### Footer — bucket C CCR8 antibody panel status (the load-bearing differentiator)

| cohort | CCR8 on panel? | source |
|---|---|---|
| ali-danenberg-2020-metabric-imc | **NO** | 37-plex IMC, confirmed in status.tsv |
| farkkila-2020-topacio | unconfirmed | t-CyCIF; file-level read blocked behind DUC |
| jackson-2020-breast-imc | **NO** | 37-plex IMC, manifest + status confirm |
| launonen-2022-farkkila-mif-hgsoc | unconfirmed | t-CyCIF; channel inventory pending |
| magness-enfield-2024-tracerx-imc | unconfirmed | IMC two-panel; Zenodo 403 blocks read |
| makhmut-coscia-2025-stic-dvp | **likely YES (untargeted MS)** | DVP proteome-wide, no panel constraint |
| mitri-2024-amtec-parpi-mtnbc | unconfirmed | AMTEC t-CyCIF panel not yet pulled |
| risom-2022-dcis-mibi | **NO** | 37-plex MIBI, confirmed in status.tsv |
| tietscher-2023-breast-imc | unconfirmed | 40-plex IMC; channel readout pending |

Practical take: of the four cohorts with confirmed panel status, three are NO (Ali-Danenberg, Jackson, Risom). The DVP-MS cohort (Makhmut-Coscia) is the strongest near-term bet for protein-CCR8 because untargeted mass spec carries no panel-design veto. The four t-CyCIF cohorts (TOPACIO, Launonen, AMTEC, plus partial Tietscher) are priority targets for channel-list inventory — even one CCR8-positive t-CyCIF panel would unlock the project's first true protein-level Treg readout.

**Bucket C unverified PMIDs:** magness-enfield-2024-tracerx-imc, makhmut-coscia-2025-stic-dvp, mitri-2024-amtec-parpi-mtnbc. All three need author-side resolution before blog publication.

## Bucket D — multi-spatial / full-tuple (25 cohorts)

Bucket-D cohorts span multiple spatial or single-cell modalities on the same patient set, which is exactly the configuration needed for per-patient HRD × CCR8 pairing at Tier 3; most are HTAN sub-atlases gated under a multi-tier access model (open CELLxGENE shards, Synapse-PAT level-3, dbGaP-DUA raw).

### denisenko-2024-hgsoc-visium-cosmx
**Paper.** Denisenko 2024 Genome Med | PMID 38978133 | n=10 HGSOC, ovarian, Visium + CosMx-SMI + scRNA + WES-subset

**What it is.** Paired Visium ST and 1000-plex CosMx SMI on the same HGSOC sections with matched scRNA reference.

**How it fits.** Full-tuple Tier-3 candidate on the spatial axis: same-section Visium + CosMx is the rare configuration letting eTreg neighborhood claims be cross-validated within one patient.

**On disk.** 2.08 GB at `D/denisenko-2024-hgsoc-visium-cosmx/`: Visium 8 sections (20,123 spots), CosMx (39,959 cells), scRNA 5 samples.

**Still missing / blockers.** WES at EGAS00001006816 controlled, not pursued; CosMx 979-plex omits CCR8, so spatial CCR8 reads 0% by panel construction, not biology.

**Open question.** Does CCR8 dropout invalidate Visium-only spatial CCR8 maps?

### greenwald-2024-gbm-suva-tirosh
**Paper.** Greenwald 2024 Cell | PMID 38917789 | n=100 GBM + IDH-mut glioma, brain, Visium + MIBI + scRNA + scATAC + Patch-seq + WES-subset

**What it is.** Five-modality glioma atlas — the densest multi-spatial single-disease cohort in the corpus, >1M cells.

**How it fits.** Full-tuple Tier-3 candidate per-patient if WES sub-cohort overlaps Visium/MIBI patients; GBM HRD-floor (~6%) compresses joint-high but per-patient pairing is real.

**On disk.** 26.38 GB at `D/greenwald-2024-gbm-suva-tirosh/`; Zenodo 12624860 codex repair rerun, Visium processed 20 h5ads landed.

**Still missing / blockers.** WES is bulk-subset only and not per-patient mapped to spatial IDs; Visium-MIBI patient-overlap table not yet extracted from supplements — blocks tuple closure.

**Open question.** Which patients carry the full 5-modality set?

### hms-sorger-ovarian-renamed
**Paper.** Färkkilä / Sorger 2023 Nat Cancer | PMID 38191822 | n=25 HGSOC, ovarian, 40-plex t-CyCIF + WGS + HRD scores

**What it is.** Single-cell 40-plex t-CyCIF spatial proteomic atlas of HGSOC with matched WGS HRD calls.

**How it fits.** Tier-3 full-tuple in principle (per-patient WGS-HRD × spatial Treg), but blocked by panel: CCR8 is absent from the 40-plex set, forcing FOXP3+ proxy.

**On disk.** 8.07 GB at `D/hms-sorger-ovarian/` via Synapse PAT (syn53283672); 4 CycIF CSVs + metadata; 686 raw imaging files deferred.

**Still missing / blockers.** Raw imaging kept blocked; CCR8 absent from CyCIF panel forces FOXP3+ proxy (0.84% of 6.42M cells across 16 patients).

**Open question.** Can FOXP3+ density substitute for CCR8 in proteomic atlases?

### htan-hta10-stanford-fap
**Paper.** Curtis HTAN HTA10 (in prep) | PMID UNVERIFIED | n=40 FAP-CRC, colorectal, scRNA + scATAC + Xenium + CODEX + MS + WGS + HiC + meth

**What it is.** Seven-modality familial-adenomatous-polyposis CRC atlas — the broadest single-cohort modality footprint in HTAN.

**How it fits.** Not an HRD cohort (FAP is APC-driven, not HR-deficient), so excluded from per-patient HRD × CCR8 tuple; retained as cross-disease CCR8-Treg spatial reference only.

**On disk.** Zero bytes — HTA10 atlas project is PAT-gated; syn20446927 master fileview returns 403 without HTAN Network team membership.

**Still missing / blockers.** Blocked at HTAN Network team membership tier; PAT alone insufficient; per-atlas ACL grant also required.

**Open question.** Worth pursuing membership for a non-HRD cohort?

### htan-hta11-vanderbilt-crc
**Paper.** Chen 2021 Cell | PMID 34653364 | n=195 CRC + adenoma + SSL, colorectal, scRNA + Visium + MxIF + bulk-WES/WGS

**What it is.** Vanderbilt CRC HTAN atlas spanning the adenoma-to-carcinoma transition with paired scRNA + Visium + MxIF.

**How it fits.** Full-tuple Tier-3 candidate on the CRC-MMRp subset where HRD signal exists; CCR8 2.70% in Tregs (n=37); Visium and MxIF add the spatial axis Chen 2021 lacked.

**On disk.** 2.81 GB at `D/htan-hta11-vanderbilt-crc/` — 3 h5ad CELLxGENE assets (a48f5033); Visium + MxIF PAT-gated.

**Still missing / blockers.** Visium + MxIF + WES/WGS sit behind HTAN Network gating; only scRNA processed h5ads landed via the CELLxGENE mirror.

**Open question.** Does adenoma-to-carcinoma transition pre-stage CCR8-Treg infiltration?

### htan-hta12-wustl-pancancer
**Paper.** Ding / Chen WUSTL HTA12 | PMID UNVERIFIED | n=295 across 11 tumor types, pan-cancer, scRNA + snRNA + scATAC + Visium + CODEX + IMC + Xenium-pilot + WGS/WES

**What it is.** Pan-cancer WUSTL HTAN atlas — broadest cancer-type span, only HTAN with Xenium pilot.

**How it fits.** Top Tier-3 candidate: pan-cancer covers HRD-relevant types (TNBC, PDAC, ccRCC) with WGS/WES anchored to CPTAC/TCGA HRD; pairing tractable on the 21-PAAD imaging subset.

**On disk.** 158 KB partial at `D/htan-hta12-wustl-pancancer/`: Zenodo 12689994 IDC manifest; 12 GB DICOM deferred.

**Still missing / blockers.** scRNA + Visium + CODEX + IMC PAT-gated; cross-modality patient table absent from public layer.

**Open question.** Does Xenium pilot resolve CCR8 where Visium drops out?

### htan-hta1-htapp
**Paper.** Klughammer 2024 Nat Med | PMID 39478111 | n=205 mBC+NBL+LUAD+GBM+Ewing, multi-cancer, scRNA + Visium + SlideSeq + MERFISH + ExSeq + CODEX + MIBI + snRNA + WES

**What it is.** Nine-modality HTAPP "orbital" atlas — densest modality footprint in HTAN, mBC HRD subset embedded.

**How it fits.** Tier-3 candidate on the mBC sub-cohort: WES anchors HRD while Visium + MERFISH + CODEX + MIBI deliver spatial Treg context.

**On disk.** 8.40 GB at `D/htan-hta1-htapp/` — 32 CELLxGENE h5ads (a96133de); CCR8 2.02% in Tregs; Tier-1 joint-high 0.39%.

**Still missing / blockers.** SlideSeq + MERFISH + ExSeq + CODEX + MIBI PAT-gated; CELLxGENE labels lack Treg subtypes; mBC WES not patient-linked.

**Open question.** Can MERFISH cross-validate the FOXP3+CD4+ proxy?

### htan-hta4-chop-pediatric
**Paper.** Maris / Tan HTAN HTA4 (CHOP pediatric) | PMID UNVERIFIED | n=69 NBL + AML + B-ALL + pHGG + Ewing, pediatric, scRNA + scATAC + CODEX + WGS/WES

**What it is.** Pediatric multi-cancer HTAN atlas with paired scRNA + scATAC + CODEX and WGS/WES anchored to pediatric cBioPortal mirrors.

**How it fits.** Not a primary HRD cohort (all 5 pediatric cancers outside Knijnenburg-2018); retained as pediatric CCR8-Treg developmental baseline; Tier-1 flag=unmappable.

**On disk.** 14.35 GB at `D/htan-hta4-chop-pediatric/`: 3 CELLxGENE collections (NBL + pHGG + KMT2Ar), 8 h5ads; CCR8 0.00% in Tregs (n=87, n_pts=56).

**Still missing / blockers.** scATAC + CODEX PAT-gated; WGS/WES backfillable via cBioPortal (nbl_target_2018_pub, aml_stjude_2024, brain_cptac_2020).

**Open question.** Is pediatric CCR8-Treg zero developmental or technical?

### htan-hta5-dfci-resistance
**Paper.** Jänne / Wu HTAN HTA5 (DFCI resistance) | PMID UNVERIFIED | n=156 NSCLC-TKIr + HR/HER2 breast + IO-r melanoma, multi-cancer, t-CyCIF + scRNA + bulk-WES

**What it is.** DFCI therapy-resistance HTAN atlas pairing t-CyCIF with scRNA across four resistance contexts.

**How it fits.** Full-tuple Tier-3 candidate on HR+ breast subset where HRD has ER-driven signal; t-CyCIF + scRNA + WES on same patients is the project-ideal configuration, currently inaccessible.

**On disk.** Zero bytes — HTA5 atlas project is PAT-gated; syn20446927 master fileview returns 403 without HTAN Network team membership.

**Still missing / blockers.** Blocked at HTAN Network membership; 16k CyCIF files inaccessible; resistance-specific design justifies pursuing membership.

**Open question.** Does IO-resistance enrich CCR8-Treg fraction?

### htan-hta6-duke-stanford-dcis
**Paper.** Marks / Curtis HTAN HTA6 (DCIS) | PMID UNVERIFIED | n=828 breast DCIS-to-IDC, breast, MIBI + scRNA + bulkRNA + bulk-WGS (largest HTAN WGS)

**What it is.** Duke-Stanford DCIS-progression atlas — largest HTAN WGS deposit (2,630 files), MIBI + scRNA paired.

**How it fits.** Outstanding full-tuple Tier-3 candidate if accessible: 828 patients with WGS-anchored HRD + MIBI spatial Treg on the DCIS-to-IDC axis; BRCA-carrier subset embedded.

**On disk.** Zero bytes — HTA6 atlas project is PAT-gated; syn20446927 master fileview returns 403 without HTAN Network team membership.

**Still missing / blockers.** Blocked at HTAN Network membership; WGS-largest + BRCA-carrier subset + n=828 scale make this the single highest-value HTAN target.

**Open question.** Does DCIS-to-IDC pre-stage HRD or CCR8 first?

### htan-hta7-hms-patch-sorger
**Paper.** Sorger HTAN HTA7 (HMS imaging) | PMID UNVERIFIED | n=245 melanoma + nevus + CTCL + FL + CLL/SLL, multi-cancer, t-CyCIF + CyCIF + H&E + panel + bulkRNA

**What it is.** HMS imaging-powerhouse HTAN atlas — three orthogonal imaging modalities on heme + skin cancers.

**How it fits.** Not a primary HRD cohort (panel-only genomic, no WES/WGS); retained as imaging-cross-modality reference for CCR8-Treg spatial pattern transfer.

**On disk.** Zero bytes — HTA7 atlas project is PAT-gated; syn20446927 master fileview returns 403 without HTAN Network team membership.

**Still missing / blockers.** Blocked at HTAN Network membership; panel-only genomic weakens HRD; CCR8 antibody-dependent on CyCIF panel (unverified).

**Open question.** Does melanoma + heme co-atlas reveal cross-tissue CCR8-Treg?

### htan-hta8-msk-metastasis
**Paper.** Chan / Massagué HTAN HTA8 | PMID 33945786 | n=202 SCLC + PDAC + brain-mets + CRC-mets, metastasis, scRNA + MIBI + GeoMx-DSP + panel + WGS-subset

**What it is.** MSK metastasis HTAN atlas with BRCA-mutant PDAC sub-cohort and paired scRNA + MIBI + GeoMx-DSP.

**How it fits.** Full-tuple Tier-3 candidate on BRCA-mutant PDAC: WGS-derived HRD + MIBI spatial Treg + scRNA CCR8 within metastasis context; CCR8 6.25% in Tregs (n=1360); joint-high 0.82%.

**On disk.** 23.29 GB at `D/htan-hta8-msk-metastasis/` — 20 CELLxGENE h5ads (62e8f058 + efd94500); Treg-depletion sub-cohort orthogonal.

**Still missing / blockers.** MIBI + GeoMx-DSP tiers PAT-gated; WGS BRCA-PDAC subset not patient-linked in CELLxGENE deposit.

**Open question.** Does metastasis enrich CCR8-Treg versus primary?

### htan-hta8-sclc-chan-2021
**Paper.** Chan 2021 Cancer Cell | PMID 33945786 | n=21 SCLC, lung, scRNA + MIBI + Vectra-IHC + IMPACT-panel + WGS-subset

**What it is.** SCLC sub-cohort of HTA8 — 21 patients, 54 specimens, paired scRNA + MIBI + Vectra-IHC.

**How it fits.** Full-tuple Tier-3 candidate on SCLC if cBioPortal sclc_ucologne_2015 alt-mirror can anchor HRD scores; SCLC unmapped to Knijnenburg-2018 so currently Tier-1 unmappable.

**On disk.** Zero bytes as standalone — superseded by `htan-hta8-msk-metastasis` aggregate; scRNA accessible via parent atlas h5ad set.

**Still missing / blockers.** Raw at dbGaP phs002371 controlled, not pursued; MIBI + Vectra PAT-gated; SCLC cBioPortal alt-mirror (PMID 26168399, n=120 George 2015) promotes WGS open-mirror.

**Open question.** Can SCLC HRD be backfilled from cBioPortal alt-mirror?

### htan-hta9-ohsu-smmart-mbc
**Paper.** Gray / Heiser HTA9 (SMMART mBC) | PMID UNVERIFIED | n=33 mBC CDK4/6i + IO-evolved, breast, mIHC/CyCIF + scATAC + scRNA + EM + GeoMx + WGS + scDNA + RPPA

**What it is.** OHSU SMMART deep-longitudinal mBC atlas — 8-modality including scDNA-seq.

**How it fits.** Highest-value HTAN for HRD: WGS + scDNA dual anchor + CyCIF + scRNA + GeoMx + treatment-evolution on 33 mBC patients — bespoke Tier-3.

**On disk.** Zero bytes — HTA9 is PAT-gated; syn20446927 master fileview returns 403 without HTAN Network membership.

**Still missing / blockers.** Blocked at HTAN Network membership; scDNA + WGS + treatment-evolved mBC makes this the highest HRD-relevance target after HTA6.

**Open question.** Does CDK4/6i resistance correlate with CCR8-Treg expansion?

### htapp-klughammer-2024-mbc
**Paper.** Klughammer 2024 Nat Med | PMID 39478111 | n=30 metastatic breast, breast, snRNA + CODEX + MERFISH + ExSeq + SlideSeq + WES + lpWGS

**What it is.** HTA1-orbital HTAPP extension — 30 mBC patients with snRNA + four spatial modalities.

**How it fits.** Superseded by `htan-hta1-htapp` parent aggregate (same Klughammer 2024 paper, same CELLxGENE collection a96133de); retained in manifest as orbital tag, not a separate Tier-3 candidate.

**On disk.** Zero bytes as standalone — merged into `htan-hta1-htapp` per 2026-06-05 supersedure; file inventory at `logs/htapp-klughammer-2024-mbc/scp2702_file_inventory.tsv`.

**Still missing / blockers.** Broad SCP SCP2702 OAuth-gated; CITE/ADT layer claimed in v4 manifest is NOT in SCP2702 inventory (manifest overstated); record-only under pivot.

**Open question.** Is the supersedure decision reversible if SCP opens?

### hwang-2022-pdac-neoadj
**Paper.** Hwang 2022 Nat Genet | PMID 35902743 | n=43 PDAC treatment-naive + neoadjuvant, pancreatic, snRNA + GeoMx-DSP + WES + BRCA subset

**What it is.** PDAC neoadjuvant cohort — 18 untreated + 25 neoadj-treated, snRNA + GeoMx-DSP genomic + spatial WTA.

**How it fits.** Full-tuple Tier-3 candidate on BRCA-mutant PDAC: WES-HRD + snRNA Treg + GeoMx-DSP spatial on same patients with 8 neoadjuvant arms and 3-tier response encoded.

**On disk.** 2.63 GB at `D/hwang-2022-pdac-neoadj/`: 224,988 snRNA cells (193,565 QC-passing), 37/43 patients; CCR8 0.13% immune.

**Still missing / blockers.** Raw WES dbGaP phs002789 controlled; DSP-WTA counts not in GEO (Broad SCP1089-1096 auth); no matched pre/post within patient.

**Open question.** Does neoadjuvant arm shift CCR8-Treg spatial niche?

### hwang-2025-pdac-neural
**Paper.** Hwang 2025 (UNVERIFIED — likely re-attribution of 2022 Nat Genet) | PMID UNVERIFIED | n=25 PDAC, pancreatic, Visium + snRNA + bulk-panel

**What it is.** Claimed PDAC neural-axis cohort with Visium + snRNA — manifest entry of uncertain provenance.

**How it fits.** Superseded by `hwang-2022-pdac-neoadj` per 2026-06-05 supersedure (real paper is Hwang 2022 Nat Genet PMID 35902743, GSE202051); 2025 attribution invalid, not a Tier-3 candidate.

**On disk.** Zero bytes — deferred under access tier; no accession verified.

**Still missing / blockers.** Accession unverified, paper attribution invalid; 62-sample claim unsubstantiated; resolution is to drop the row or fold into hwang-2022.

**Open question.** Is there a real 2025 Hwang follow-up to verify?

### krishna-2021-adapter-ccrcc-io
**Paper.** Krishna 2021 Cancer Cell | PMID 33861994 | n=6 ccRCC nivolumab pre/on/post, kidney, scRNA + scTCR + mIF + WES

**What it is.** ADAPTeR clinical trial — 6 ccRCC patients with longitudinal IO timepoints (pre/on/post-nivo) and matched scRNA + scTCR + mIF.

**How it fits.** Treatment-causal IO exemplar but ccRCC unmappable to Knijnenburg-2018 12-cancer subset; CCR8 20.07% in Tregs (n=2491, n_pts=6) anchors the high-end CCR8 range; Tier-1 unmappable.

**On disk.** 1.18 GB at `D/krishna-2021-adapter-ccrcc-io/` — 1 CELLxGENE h5ad (3f50314f); scTCR + mIF tiers deferred.

**Still missing / blockers.** Raw at EGAS00001005188 controlled, not pursued; scTCR + mIF not landed; ccRCC needs Knijnenburg full n=448 KIRC slice backfill to unlock Tier-1.

**Open question.** Does longitudinal IO shift CCR8-Treg pre-to-post?

### liu-2024-pediatric-hgg-filbin
**Paper.** Liu / Filbin 2024 (DFCI/BCH) | PMID UNVERIFIED | n=16 pHGG/DMG/DHG primary + recurrent, pediatric brain, snRNA + snATAC + CODEX + matched-WGS (claimed)

**What it is.** Pediatric HGG/DMG primary + recurrent cohort claimed in manifest as 4-modality.

**How it fits.** Not an HRD cohort (pHGG outside Knijnenburg-2018); retained as pediatric CCR8-Treg recurrent-vs-primary reference; small-n Treg (n=63) limits claims.

**On disk.** 471 MB at `D/liu-2024-pediatric-hgg-filbin/`: 19 snRNA samples, 28,093 → 15,706 post-QC; CCR8 11.11% in Treg (n=7/63); eTreg 11.11%.

**Still missing / blockers.** No WGS at GSE231860 public layer; snATAC + CODEX NOT deposited despite manifest claim (snRNA + bulk-FPKM only); n=16 manifest vs 19 actual.

**Open question.** Where do snATAC and CODEX layers actually live?

### mskspectrum-cfdna-parpi-2025
**Paper.** Shah / Reis-Filho MSK SPECTRUM cfDNA-PARPi (in prep) | PMID UNVERIFIED | n=24 HGSOC platinum + PARPi-maint, ovarian, scWGS-DLP + bulk-WGS + longitudinal cfDNA + scRNA-subset

**What it is.** MSK SPECTRUM PARPi-maintenance sub-cohort — scDNA-DLP + bulk-WGS + longitudinal cfDNA on HGSOC under PARPi.

**How it fits.** Highest project-relevance external cohort: PARPi-maintenance is the trial-design analog, scDNA-DLP gives per-cell HRD trajectory, cfDNA gives resistance dynamics; full-tuple Tier-3 if scRNA subset overlaps.

**On disk.** Zero bytes — dbGaP phs002857 controlled-access, not pursued under public-only pivot.

**Still missing / blockers.** dbGaP DAR application not submitted; PARPi-maintenance design is irreplaceable so this + TOPACIO are the strongest DAR-pursuit candidates if the pivot relaxes.

**Open question.** Does CCR8-Treg track PARPi resistance temporally?

### owkin-mosaic-window-bladder
**Paper.** MOSAIC bladder MIBC (Owkin in prep) | PMID UNVERIFIED | n=15 MIBC public (60 total), bladder, Visium + Chromium-Flex snRNA + H&E + WES + bulkRNA

**What it is.** Owkin MOSAIC bladder-MIBC window-of-opportunity cohort — Visium + Chromium-Flex snRNA + H&E.

**How it fits.** Full-tuple Tier-3 candidate on BLCA (Knijnenburg BLCA HRD baseline ~30%); 15 public patients are the openly-accessible MIBC subset of the 60-patient consortium drop.

**On disk.** Zero bytes — EGAD50000001251 (parent EGAS50000000689) controlled-access, not pursued under public-only pivot.

**Still missing / blockers.** Cohort EGA-controlled at dataset-level; manifest n=15 is public subset only, not full 60-patient drop; pursuit requires EGA DAR outside the public-only pivot.

**Open question.** Does MIBC neoadjuvant window reveal CCR8 pre-IO shift?

### ravi-2022-gbm-multiomics
**Paper.** Ravi 2022 (mismatch — GSE194329 = Wang Y 2023 PMID 36823172) | PMID UNVERIFIED | n=28 GBM primary + recurrent, brain, Visium + IMC + MALDI + scRNA + WES

**What it is.** GBM multi-omics cohort claimed as 4-modality but GSE194329 resolves to Wang 2023 Visium-v1.

**How it fits.** Manifest-mismatch — real Ravi WES at dbGaP phs002251 controlled; current data is Wang 2023 Visium-v1 (10 pts) without IMC/MALDI/scRNA; not a Tier-3 candidate.

**On disk.** 5.27 GB at `D/ravi-2022-gbm-multiomics/`: 27,233 Visium-v1 spots; cohort identity = Wang 2023, not Ravi 2022.

**Still missing / blockers.** Six manifest errors flagged; CCR8=0 (Visium-v1 dropout); real Ravi paper needs PMID resolution.

**Open question.** Where is the real Ravi 2022 GBM Visium + IMC deposit?

### sun-2024-hcc-primary-met
**Paper.** Sun 2024 Fudan HCC primary + met (in prep) | PMID UNVERIFIED | n=182 HCC primary + metastatic, liver, Visium + scRNA + IHC + multi-region WES + bulkRNA

**What it is.** Fudan HCC primary + metastatic cohort claimed as 4-modality with multi-region WES.

**How it fits.** Full-tuple Tier-3 candidate on LIHC context (LIHC outside Knijnenburg-2018 12-cancer subset but multi-region WES would anchor scarHRD-style scoring); not currently mappable.

**On disk.** Zero bytes — accession NOT-LOCATED; deferred access tier.

**Still missing / blockers.** Accession unverified — no GEO/EGA/Synapse handle in manifest; Sun 2024 Fudan HCC matches multiple candidates; resolution requires PMID search before the row can be actioned.

**Open question.** Does HCC multi-region WES reveal intra-patient HRD heterogeneity?

### tcga-pancancer-bulk-2026
**Paper.** Knijnenburg 2018 Cell Rep | PMID 29617664 | n~10,000 pan-cancer (12 HRD-focus = 5,921 seq), pan-cancer, bulk-RNA + WES MC3 + CNA Gistic2 + HRD + clinical

**What it is.** TCGA pan-cancer processed tier — the project's HRD-axis backbone across 12 HRD-relevant cancers.

**How it fits.** Backbone cohort for every Tier-1 multiplicative estimate; per-cancer HRD prevalence (OV 55.6% → PRAD 1%) traces here; not patient-paired with sc, so not Tier-3.

**On disk.** 1.28 GB at `D/tcga-pancancer-bulk-2026/`: UCSC-Xena PANCAN + cBioPortal REST (12 studies); 8,775 with RNA+mut+clin; 5,804 Knijnenburg-scored.

**Still missing / blockers.** No spatial axis — bulk-RNA forces CCR8 deconv (CIBERSORTx / EcoTyper); per-patient sc pairing impossible by design.

**Open question.** Does TCGA bulk CCR8 deconv match sc CCR8?

### wu-2021-breast-visium
**Paper.** Wu 2021 Nat Genet | PMID 34493872 | n=26 breast ER+/HER2+/TNBC, breast, scRNA + Visium-subset + WES

**What it is.** Breast cancer scRNA + Visium reference atlas — 100,064 cells across 26 patients with Visium on 6 sections.

**How it fits.** TNBC subset (n=10) is the Tier-3 full-tuple candidate: WES + scRNA + Visium on same patients, TNBC HRD-high anchors the axis; Tier-1 joint-high 0.60% (clean).

**On disk.** 2.33 GB at `D/wu-2021-breast-visium/`: 100k cells/26 pts, 15,611 Visium spots/6 sections; eTreg TNBC 3.13% vs ER+ 0.37%.

**Still missing / blockers.** WES at EGAS00001005173 controlled, not pursued; HRD-env compiling; no clinical follow-up in GEO; Visium-WES patient overlap absent.

**Open question.** Is TNBC eTreg enrichment HRD-driven or ER-axis?

### HTAN sub-atlas access map

| atlas_id | cohort_id | open (CELLxGENE / GEO / Zenodo) | Synapse-PAT level-3 | dbGaP / EGA DAR |
|---|---|---|---|---|
| HTA1 | htan-hta1-htapp | scRNA (32 h5ads, CELLxGENE a96133de) | Visium + SlideSeq + MERFISH + ExSeq + CODEX + MIBI + snRNA | bulk-WES (dbGaP-DUA) |
| HTA4 | htan-hta4-chop-pediatric | scRNA (8 h5ads, 3 CELLxGENE collections) | scATAC + CODEX | bulk-WGS/WES (dbGaP-DUA, cBioPortal alt-mirror available) |
| HTA5 | htan-hta5-dfci-resistance | none (network gated) | t-CyCIF + scRNA (network membership required) | bulk-WES (dbGaP-DUA) |
| HTA6 | htan-hta6-duke-stanford-dcis | none (network gated) | MIBI + scRNA + bulkRNA (network membership required) | bulk-WGS 2,630 files (dbGaP-DUA) |
| HTA7 | htan-hta7-hms-patch-sorger | none (network gated) | t-CyCIF + CyCIF + H&E + bulkRNA (network membership required) | clinical-panel + bulkRNA (network) |
| HTA8 | htan-hta8-msk-metastasis, htan-hta8-sclc-chan-2021 | scRNA (20 h5ads, CELLxGENE 62e8f058 + efd94500) | MIBI + GeoMx-DSP | WGS BRCA-PDAC subset (dbGaP phs002371) |
| HTA9 | htan-hta9-ohsu-smmart-mbc | none (network gated) | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx (network) | bulk-WGS + scDNA + RPPA (dbGaP-DUA) |
| HTA10 | htan-hta10-stanford-fap | none (network gated) | scRNA + scATAC + Xenium + CODEX + MS (network) | WGS + HiC + meth (dbGaP-DUA) |
| HTA11 | htan-hta11-vanderbilt-crc | scRNA (3 h5ads, CELLxGENE a48f5033) | Visium + MxIF | bulk-WES/WGS (dbGaP-DUA) |
| HTA12 | htan-hta12-wustl-pancancer | DICOM imaging manifest (Zenodo 12689994, IDC s3) | scRNA + snRNA + scATAC + Visium + CODEX + IMC + Xenium-pilot | bulk-WGS/WES CPTAC/TCGA (dbGaP-DUA, cBioPortal mirror available) |

### Footer — bucket D unverified PMIDs

The following bucket-D rows have PMID=UNVERIFIED in the manifest and need resolution before downstream citation:

- htan-hta10-stanford-fap (Curtis FAP-CRC, HTA10)
- htan-hta12-wustl-pancancer (Ding/Chen WUSTL pan-cancer, HTA12)
- htan-hta4-chop-pediatric (Maris/Tan CHOP pediatric, HTA4)
- htan-hta5-dfci-resistance (Jänne/Wu DFCI resistance, HTA5)
- htan-hta6-duke-stanford-dcis (Marks/Curtis DCIS, HTA6)
- htan-hta7-hms-patch-sorger (Sorger HMS imaging, HTA7)
- htan-hta9-ohsu-smmart-mbc (Gray/Heiser SMMART mBC, HTA9)
- hwang-2025-pdac-neural (likely re-attribution of Hwang 2022 Nat Genet PMID 35902743 — supersedure recorded)
- liu-2024-pediatric-hgg-filbin (Filbin DFCI/BCH pediatric HGG)
- mskspectrum-cfdna-parpi-2025 (Shah/Reis-Filho MSK SPECTRUM cfDNA-PARPi)
- owkin-mosaic-window-bladder (Owkin MOSAIC MIBC)
- ravi-2022-gbm-multiomics (manifest mismatch — GSE194329 resolves to Wang Y 2023 PMID 36823172)
- sun-2024-hcc-primary-met (Sun Fudan HCC primary+met)
