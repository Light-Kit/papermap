---
title: '配对多组学肿瘤队列 —— 一张完整的表'
date: '2026-06-03'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - paired-data
  - dataset-strategy
  - single-cell
summary: '每一行是一个公开队列：肿瘤基因组 + ≥1 种高分辨 TME 模态（sc / sn / spatial），同一病人。按 TME 模态分桶（A/B/C/D），每行带 accession（GEO / EGA / dbGaP / Synapse），每桶给样本数小计。HTAN 子 atlas 一个一行。'
starred: true
---

# 配对多组学肿瘤队列 —— 一张完整的表

[[paired-data-pan-cancer]] 给的是五层概念图。[[more-paired-data-cohorts]] 把每一层落到具体队列。这一篇是**真正能干活的表** —— 每一行是一个满足严格入选条件的公开队列，按主要的 TME 模态分桶，带上 accession（GEO / EGA / dbGaP / Synapse），让你能直接去拉数据。

入选条件：**肿瘤基因组**（WGS / WES / panel DNA / SNP / CNA）**且**至少一种**高分辨 TME 模态**（scRNA / snRNA / Visium / Visium HD / Xenium / Slide-seq / Stereo-seq / MERFISH / CODEX / MIBI / IMC / mIF / t-CyCIF），**同一病人**，最好同病灶同时间点，带临床元数据。bulk-RNA-only 的队列（TCGA、HMF、POG570、MSK-CHORD、MET500、Genomics England 100k）**不算主行** —— 它们只在 [[paired-data-pan-cancer]] 那一篇里当 cross-link backbone。

按 TME 模态分四桶：

- **A —— sc/snRNA + 基因组**（不带 spatial）
- **B —— spatial transcriptomics + 基因组**（不带 spatial 蛋白）
- **C —— spatial proteomics + 基因组**（不带 spatial 转录）
- **D —— multi-spatial / full-tuple**（同一病人 ≥2 种高分辨 TME 模态 —— HTAN、MOSAIC、MSK SPECTRUM 都在这桶）

HTAN **不合并**。每一个有公开数据释放的 Phase-1 子 atlas 都是单独一行，用 `consortium=HTAN-HTAxx` 标。MOSAIC、MSK SPECTRUM、TRACERx、METABRIC、HTAPP 同理。

审计中发现的一个 naming caveat：vault 里 `htan-hms-ovarian` 这条曾被当作 HTAN HTA13。**不是**。HTAN 官方注册表里 HTA13 是 **TNP SARDANA**，一个多中心 imaging benchmark，不是 HGSOC 队列。Sorger 实验室的 HMS 卵巢工作是 Ludwig 资助的，**在 HTAN HTA atlas-ID 系统之外**。下面表里这一行保留数据，但 consortium tag 改成 `HMS-Sorger (Ludwig)`。vault 该改这条。

## A —— sc/snRNA + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **Luo 2024 NANT 卵巢（anchor）[v]** | standalone | HGSOC | WGS + HRD scoring | scRNA + scTCR | 30 | GEO `GSE222556` |
| **Vázquez-García 2022 MSK SPECTRUM [v]** | MSK-SPECTRUM | HGSOC | WGS + scWGS (DLP+) | scRNA | 42 | Synapse `syn25569736` |
| **Olbrecht 2021 [v]** | standalone | HGSOC | germline BRCA | scRNA | 7 | ArrayExpress `E-MTAB-8107` |
| **Pal 2021 BRCA1-携带者乳腺 [v]** | standalone | breast (BRCA1 carriers) | germline BRCA1 + WGS | scRNA | 21 | GEO `GSE161529` |
| **Bassez 2021 BIOKEY [v]** | BIOKEY (KU Leuven) | breast (anti-PD-1 pre/post) | WES + panel | scRNA + scTCR | 40 | EGA `EGAS00001004809` |
| **Yost 2019 BCC [v]** | standalone | BCC (anti-PD-1) | WES | scRNA + scTCR | 14 | GEO `GSE123813` |
| **Caushi 2021 NSCLC [v]** | standalone | NSCLC (anti-PD-1) | WES + panel | scRNA + scTCR | 16 | GEO `GSE176021` |
| **Luoma 2022 HNSCC [v]** | standalone | HNSCC (anti-PD-1) | clinical panel | scRNA | 29 | GEO `GSE200996` |
| **Sade-Feldman 2018 mel [v]** | standalone | melanoma (anti-PD-1) | WES | scRNA | 48 | GEO `GSE120575` |
| **Bi 2021 ccRCC [v]** | standalone | ccRCC (anti-PD-1) | WES | scRNA | 8 | Broad SCP `SCP1288` + dbGaP `phs002252` |
| **Liu 2022 NSCLC [v]** | standalone | NSCLC (IO) | WES | scRNA | 35 | EGA `EGAS00001005003` |
| **Magen 2023 HCC [v]** | standalone | HCC (anti-PD-1) | WES | scRNA + scTCR | 33 | dbGaP `phs002748` |
| **Wang 2025 SCLC PARPi [v]** | standalone | SCLC (PARPi context) | panel | scRNA | verify | GEO (per paper) |
| **Pelka 2021 CRC** | standalone | CRC (MMRd / MMRp) | WES | scRNA（+ MERFISH 子集 → D 桶） | 62 | GEO `GSE178341` + dbGaP `phs002407` |
| **Lee 2020 CRC（韩国）** | standalone | CRC | WES + bulk RNA | scRNA | 29 | GEO `GSE132465` |
| **Maynard 2020 NSCLC 纵向** | standalone | NSCLC (TKI pre/residual/progression) | WES + clinical NGS | scRNA | 30 | EGA `EGAS00001004422` |
| **Neftel 2019 GBM** | standalone | GBM IDH-wt | WES | scRNA | 28 | Broad SCP `SCP393` + GEO `GSE131928` |
| **Karaayvaz 2018 TNBC** | standalone | TNBC | WES | scRNA (SmartSeq2) | 6 | GEO `GSE118390` |
| **Puram 2017 HNSCC** | standalone | HNSCC | WES | scRNA (SmartSeq2) | 18 | GEO `GSE103322` |
| **Kim 2020 NSCLC mets** | standalone | NSCLC（原发 + LN + 脑） | WES | scRNA | 44 | EGA `EGAS00001004001` |
| **Tirosh 2016 melanoma** | standalone | metastatic mel | WES | scRNA (SmartSeq2) | 19 | GEO `GSE72056` |
| **Jerby-Arnon 2018 mel** | standalone | mel (anti-PD-1 mixed) | WES | scRNA | 33 | GEO `GSE115978` |
| **Stewart 2020 SCLC CDX** | standalone | SCLC (chemo-evolved) | WGS (CDX) + WES (患者 CTC) | scRNA | ~12 | EGA `EGAS00001004025` |
| **Wang 2021 胃（腹膜）** | standalone | gastric + 腹膜转移 | WES | scRNA | 20 | GEO `GSE163558` |
| **Zhang 2022 胃 T-cell** | standalone | gastric | WES | scRNA + scTCR | 10 | GEO `GSE183904` |
| **Couturier 2020 GBM** | standalone | GBM | WES | scRNA | 14 | GEO `GSE163108` |
| **Lambrechts 2018 NSCLC** | standalone | NSCLC | WES (bulk) | scRNA | 5 | ArrayExpress `E-MTAB-6149` |
| **Goveia 2020 NSCLC EC** | standalone | NSCLC 血管内皮 | WES (Lambrechts) | scRNA | 8 | ArrayExpress `E-MTAB-8221` |
| **Sun 2021 HCC 早复发** | standalone | HCC（原发 + 早复发） | WES | scRNA + scTCR | 18 | GEO `GSE149614` |
| **Kim 2018 TNBC 化疗抗药** | standalone | TNBC (neoadj chemo) | deep WES + scDNA | scRNA | 20 | SRA `SRP114962` |
| **Hwang/Lin 2023 PDAC chemo** | HTAPP-orbital | PDAC (FOLFIRINOX pre/post) | bulk WES | snRNA + CITE-seq | 27 | GEO `GSE205013` + dbGaP `phs002371` |
| **HTAN HTA3 —— BU 肺癌前** | **HTAN-HTA3** | 肺腺 + LUSC 前驱 | bulk DNA WES + scDNA | scRNA + mIF（companion） | 484 | Synapse `syn20446927` (filter Atlas=HTA3) |
| **Su 2025 HCC snRNA** | standalone | HCC | TCGA-LIHC WES 整合 | snRNA | 12 | GEO `GSE282701` |

**[v]** = 已在 vault。

**A 桶小计：** **约 33 个队列，~1,300 病人**（HTA3 一家就 484 人；剩下的 standalone 单研究队列加起来约 800 人 / 32 个研究，N 中位数 ≈ 20）。

## B —— spatial transcriptomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **Stur 2022 HGSOC Visium [v]** | standalone | HGSOC (NACT response) | WGS | Visium | 12 | GEO `GSE211956` |
| **Erickson 2022 前列腺 Visium** | standalone | 前列腺腺癌 | WGS + low-pass WGS | Visium（同病人多切片） | 11 | EGA `EGAD00001008622` |
| **Khaliq / Sun 2024 PDAC 原发 + 转移** | standalone | PDAC（原发 + 肝/LN 转移） | WES + bulk RNA | Visium | 21 | GEO `GSE272362` |
| **Pei / Min 2025 PDAC rapid autopsy** | standalone | PDAC（尸检多脏器） | WGS/WES（尸检） | Visium（55 切片） | 13 | dbGaP（per Nature 2025 supp.） |
| **Wu 2025 HGSOC Visium HD（preprint）** | standalone | HGSOC | bulk WES + HRD | Visium HD | ~30 | per preprint，accession TBD |
| **Ji 2020 cSCC ST** | standalone | 皮肤 SCC | WES（4 例子集） | ST（Visium 前身） | 10 | GEO `GSE144236` |
| **Xenium Prime 5K demo (10x) [v]** | 10x-public | 乳腺、OV、NSCLC、mel、宫颈 | bulk WGS per block | Xenium 5K + Visium HD | demo（每种癌一个 block） | 10x portal |

**B 桶小计：** **7 个队列，~100 病人**（10x demo 不算，每种癌就一个 block）。这是最小的一桶 —— Visium / Xenium + WGS 同一病人配对仍然很少。

## C —— spatial proteomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **Launonen 2022 Färkkilä mIF HGSOC [v]** | standalone | HGSOC (HRD-vs-HRP) | WGS + BRCA1/2 状态 | t-CyCIF (mIF) | 44 | Synapse `syn26230540` |
| **Färkkilä 2020 TOPACIO [v]** | TOPACIO (niraparib+pembro) | HGSOC + TNBC + 子宫内膜 | WGS + HRDsum + LOH | t-CyCIF | 62 | Synapse `syn22177117` |
| **Mitri 2024 AMTEC PARPi mTNBC [v]** | standalone | mTNBC (PARPi pre/post) | WES | t-CyCIF | 12 | dbGaP per paper |
| **Risom 2022 DCIS MIBI (HTAN-Stanford)** | HTAN-HTA6-orbital | breast DCIS → IBC | targeted panel + bulk RNA | MIBI-TOF, 37-plex | 122 | Synapse `syn26844071` |
| **Jackson 2020 乳腺 IMC** | standalone (METABRIC-linked) | 乳腺（全亚型） | METABRIC WES + CNA（可链） | IMC, 37-plex | 281 | Zenodo `4607374` |
| **Tietscher 2023 乳腺 IMC** | standalone (METABRIC-linked) | 乳腺（HER2+ + TNBC） | METABRIC WES + bulk RNA | IMC, 40-plex | 281 | Zenodo `7647079` |
| **Ali / Danenberg 2020/2022 METABRIC IMC** | METABRIC (CRUK Cambridge) | 乳腺（全亚型） | METABRIC bulk WES + targeted + SNP-CNA | IMC, 37-plex | 483 (Ali) / 693 (Danenberg) | Zenodo `6036188` + cBioPortal METABRIC `EGAS00000000083` |
| **Magness / Enfield 2024 TRACERx 100 IMC** | TRACERx (CRUK / UCL) | NSCLC 早期 | 多区域 WES + bulk RNA | IMC（2 panel） | 81 | EGA `EGAS00001000809` |
| **Makhmut / Coscia 2025 STIC DVP** | standalone | HGSOC + STIC 前驱 | targeted HRD panel | deep visual proteomics (DVP, LMD-MS) | ~25 | PRIDE per bioRxiv 2025.03.19.643504 |

**C 桶小计：** **9 个队列，~1,400 病人**（METABRIC IMC 一家就贡献 ~700；这桶被乳腺主导）。

## D —— multi-spatial / full-tuple（HTAN、MOSAIC、SPECTRUM、多模态 standalone）

### D.1 —— HTAN 子 atlas（仅含已释放数据 —— 截至 2026 年 6 月）

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **HTAN HTA1 HTAPP (Broad/DFCI/HMS) [v]** | **HTAN-HTA1** | 转移乳腺 + NBL + LUAD + GBM + Ewing | bulk WES + panel | scRNA + Visium + Slide-seq + MERFISH + ExSeq + CODEX + MIBI + snRNA | ~205（mBC 子队列 60 含 HRD 子集） | Synapse `syn20446927` (Atlas=HTA1) |
| **HTAN HTA4 CHOP 儿科** | **HTAN-HTA4** | NBL + AML/B-ALL + pHGG + Ewing | bulk WGS/WES | scRNA + scATAC + CODEX | 69 | Synapse `syn20446927` (Atlas=HTA4) |
| **HTAN HTA5 DFCI Resistance** | **HTAN-HTA5** | NSCLC (TKI 抗药) + HR+/HER2+ 乳腺 + IO 抗药 mel | bulk WES | t-CyCIF（16k 文件 —— HTAN 里最大）+ scRNA | 156 | Synapse `syn20446927` (Atlas=HTA5) |
| **HTAN HTA6 Duke-Stanford DCIS** | **HTAN-HTA6** | 乳腺 DCIS → IDC | **bulk WGS（2,630 文件 —— HTAN 里最大 WGS）** | MIBI + scRNA + bulk RNA | **828** | Synapse `syn20446927` (Atlas=HTA6) |
| **HTAN HTA7 HMS PATCH (Sorger)** | **HTAN-HTA7** | mel + 痣 + CTCL + FL + CLL/SLL | clinical panel + bulk RNA | t-CyCIF / CyCIF（imaging 龙头）+ H&E | 245 | Synapse `syn20446927` (Atlas=HTA7) |
| **HTAN HTA8 MSK Metastasis (Pe'er/Iacobuzio)** | **HTAN-HTA8** | SCLC + PDAC + 脑转 + CRC 转（rapid autopsy） | panel + WGS 子集（BRCA-mut PDAC） | scRNA + MIBI + GeoMx DSP | 202 | Synapse `syn20446927` (Atlas=HTA8) |
| **HTAN HTA9 OHSU SMMART/MBC** | **HTAN-HTA9** | 转移乳腺（CDK4/6i + IO 演化） | **bulk WGS + scDNA-seq（1.6k 文件 —— HTAN 里最大 scDNA）**+ RPPA | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx | 33（深度纵向） | Synapse `syn20446927` (Atlas=HTA9) |
| **HTAN HTA10 Stanford FAP (Snyder/Curtis/Greenleaf)** | **HTAN-HTA10** | FAP-CRC | WGS + Hi-C + 甲基化 | scRNA + scATAC + Xenium + CODEX + mass-spec | 40 | Synapse `syn20446927` (Atlas=HTA10) |
| **HTAN HTA11 Vanderbilt CRC (Coffey/Lau)** | **HTAN-HTA11** | 散发 CRC + 腺瘤 + SSL | bulk WES/WGS | scRNA + Visium + MxIF | 195 | Synapse `syn20446927` (Atlas=HTA11) |
| **HTAN HTA12 WUSTL 泛癌 (Ding)** | **HTAN-HTA12** | **11 癌种泛癌**（乳腺/TNBC、PDAC、ccRCC、子宫内膜、CRC、AML、cholangio、glioma、HNSCC、mel、meningioma） | bulk WGS/WES（CPTAC/TCGA 管线） | scRNA + snRNA + scATAC + **Visium（HTAN 里最大）**+ CODEX + IMC + Xenium pilot | **295** | Synapse `syn20446927` (Atlas=HTA12) |

**排除的 HTAN atlas ID：** HTA2（BU PCAPP pilot —— 无公开数据）；HTA13（TNP SARDANA —— 多中心 imaging benchmark，不是病人队列）。

### D.2 —— 非 HTAN 的 multi-spatial / full-tuple 队列

| name | consortium | cancer | genomic | TME | N pts | accession |
| --- | --- | --- | --- | --- | --- | --- |
| **MSK SPECTRUM (Vázquez-García) [v]** | **MSK-SPECTRUM** | HGSOC | WGS + scWGS (DLP+) | scRNA + mIF | 42 | Synapse `syn25569736` |
| **MSK SPECTRUM cfDNA / PARPi 扩展 2025** | **MSK-SPECTRUM** | HGSOC（pre/post 铂 + PARPi 维持） | scWGS (DLP+) + bulk WGS + 纵向 cfDNA | scRNA（子集） | 24 | dbGaP `phs002857` |
| **HMS-Sorger 卵巢 [v, RENAME]** | HMS-Sorger (Ludwig) —— **非 HTAN** | HGSOC | WGS + HRD（用 MSK-SPECTRUM 管线 curate） | t-CyCIF (40-plex) | ~25 | Synapse per Sorger lab page |
| **Owkin MOSAIC（MOSAIC-Window release）** | **MOSAIC** (Owkin + 5 EU 中心) | NSCLC + TNBC + DLBCL + OV + GBM + mesothelioma + bladder | WES + bulk RNA | Visium + Chromium Flex snRNA + H&E | 60 公开 / ~2,500 已采 | EGA `EGAD50000001251` (parent `EGAS50000000689`) |
| **HTAPP metastatic breast (Klughammer 2024)** | HTAN-HTA1-orbital | metastatic 乳腺 | WES + low-pass WGS | snRNA + CITE-seq | 30 | dbGaP `phs002371` + Broad SCP `SCP2702` |
| **HTAN HTA8 SCLC 子队列 (Chan 2021)** | HTAN-HTA8-orbital | SCLC | 配对 IMPACT panel + WGS 子集 | scRNA + MIBI + Vectra IHC | 21（54 specimens） | dbGaP `phs002371` (HTAN-MSK) |
| **Hwang 2022 PDAC neoadj [v]** | standalone | PDAC（治疗前 + neoadj） | WES + GeoMx DSP genomic readout | snRNA + GeoMx DSP | 43 | GEO `GSE202051` + dbGaP `phs002789` |
| **Hwang 2025 PDAC 神经侵犯** | standalone | PDAC | bulk panel（verify） | Visium + snRNA | 25（62 samples） | dbGaP per Cancer Cell 2025 |
| **Sun 2024 HCC 原发 + 转移** | standalone (Fudan) | HCC | 多区域 WES + bulk RNA | Visium + scRNA + IHC | **182（257 原发 + 176 转移）** | GSA `HRA005020` |
| **Liu 2024 儿童 HGG (Filbin)** | standalone (DFCI/BCH) | pHGG / DMG / DHG（原发 ↔ 复发） | matched WGS | snRNA + snATAC + CODEX | 16 | GEO `GSE231860` |
| **Ravi 2022 GBM 多组学** | standalone | GBM（原发 + 复发） | bulk WES + spot 级 inferred CNA | Visium + IMC + MALDI + scRNA | 28 | GEO `GSE194329` |
| **Greenwald 2024 GBM (Suvà/Tirosh)** | standalone | GBM + IDH-mut glioma | bulk WES（子集 + TCGA-anchored） | Visium + MIBI + scRNA + scATAC + Patch-seq | 100（>1M cells） | GEO + Synapse（per paper） |
| **Denisenko 2024 HGSOC Visium + CosMx** | standalone | HGSOC | WES 子集（verify EGA） | Visium + CosMx SMI | 10 (Visium) / 1 (CosMx) | EGA `EGAS00001006816` + Zenodo `10048057` |
| **Krishna 2021 ADAPTeR ccRCC IO [v]** | ADAPTeR (Royal Marsden) | ccRCC (nivo pre/on/post) | WES | scRNA + scTCR + mIF | 6 | EGA `EGAS00001005188` |
| **Wu 2021 乳腺（Visium 子集）[v]** | standalone | 乳腺 (ER+/HER2+/TNBC) | WES | scRNA + Visium 子集 | 26（sc）；6（Visium） | GEO `GSE176078` |

**D 桶小计：** **25 个队列，~3,400 病人**（HTAN + MOSAIC + SPECTRUM + standalone 加起来）。

HTAN 已释放的 Phase 1 子 atlas 单独：**~2,300 病人**，重头是 HTA6 Duke DCIS (828) 和 HTA3 BU Lung (484，但因为以 sc 为主放在 A 桶)。HTAN 之外：~700 病人，来自 13 个 standalone + MOSAIC + SPECTRUM。注意 **N 的分布很不平均**：HTA9 OHSU 只 33 个病人但有 ~1,866 个 biospecimen，因为是深度纵向；HTA6 Duke 有 828 个病人 ~1,438 个 biospecimen，因为是横断面 DCIS 筛查。

## 总账

| bucket | 队列数 | 病人数（近似） | 备注 |
| --- | --- | --- | --- |
| A —— sc/sn + 基因组 | 33 | ~1,300 | HTA3 一家就 484；standalone 队列 N 中位数 ≈ 20 |
| B —— spatial-T + 基因组 | 7 | ~100 | 最小的一桶 —— Visium / Xenium + WGS 同一病人仍稀缺 |
| C —— spatial-proteomic + 基因组 | 9 | ~1,400 | METABRIC IMC 主导（Ali + Danenberg 合计 ~700） |
| D —— multi-spatial / full-tuple | 25 | ~3,400 | HTAN = ~2,300；MOSAIC + SPECTRUM + standalone = ~700；结构上是 HTAN 主导 |
| **pan-total** | **~74** | **~6,200** | 病人去重计；HTA1/HTAPP-orbital 行间有轻微 double-count |

整张表大致是 **70 个队列 / 6,000+ 病人** 全球范围满足这道 "同一病人 + 基因组 + TME 高分辨" 的严苛入选条件。

## 几件值得注意的事

**数据真正在增长的地方**：B 桶（spatial-T + WGS）。2024–2025 一下子冒出来 4 个 PDAC 队列（Khaliq/Sun、Hwang 2025、Pei 2025）+ 前列腺 Erickson 2022 + Visium HD 第一次用到 HGSOC（Wu 2025 preprint）。空间转录组 + WGS 同一病人，从 18 个月前的 "两个队列"（Stur + 几个 Visium demo）变成了一个真桶。

**没在增长的地方**：A 桶（sc + WGS）已经成熟 —— 大多数癌种都覆盖到了；新增长主要是 **癌种宽度**（胃癌 Zhang 2022、HCC Sun 2021），不是激进的设计创新。真正的前沿是 D 桶 —— 同一病人 multi-spatial —— 结构上是 **HTAN 一家垄断**，因为没有哪个学术单实验室预算撑得起 Visium + scRNA + WGS + CODEX 跑几百例病人。

**HRD 队列在哪**：HRD 相关的行集中在 A 桶（BRCA1/2 sc 队列）和 D 桶（HTA6 DCIS BRCA carriers、HTA9 OHSU MBC、HTAN HTA12 WUSTL TNBC arm、MOSAIC TNBC、HMS-Sorger HGSOC、MSK SPECTRUM、Färkkilä TOPACIO、Mitri AMTEC PARPi）。HRD-specific 的 multi-spatial 队列大概 **10 个**，全球 HRD-relevant 病人 N ≈ 200–400 —— 这就是 pan-cancer HRD × TME 研究天花板。

**MOSAIC 实际多大**：60 个病人通过 MOSAIC-Window 在 EGA 公开。2,500 这个数字是 funded effort 的目标，不是今天能拿到的。规划按 60。

## aspirational 观察清单（尚未释放）

**HTAN Phase 2 (HTA200–HTA209)**：2024 年 9 月立项（RFA-CA-23-039）；截至 2026 年 6 月这些 atlas ID 下都没有公开数据。跟踪。两个 HRD 相关的：

- **HTA201 —— OHSU PDAC，BRCA/PALB2/ATM 携带者**（Sears/Brody/Fertig）—— DNA-repair-defined 队列，按设计
- **HTA208 —— MDACC HGSOC MOSAIC-Ov3D**（Mok/Ferri-Borgogno/Birrer）—— HRD 分层 HGSOC，sc + WGS + 3D-spatial

其他：HTA200（UCSF 皮肤）、HTA202（Caltech LGG）、HTA203（MDACC 胃 GAME3D）、HTA204（DFCI 骨髓瘤）、HTA205（CHLA 儿科实体瘤）、HTA206（WUSTL 前列腺 —— CRPC BRCA2/CDK12 子集 HRD-relevant）、HTA207（Vanderbilt CRC 跨年龄）、HTA209（Yale 淋巴瘤）。

**ASTRA consortium**（Garvan + U-Tokyo + 10x，2025 年 11 月启动）：亚太 2,000-sample Xenium 泛癌 atlas —— 目前只有 pilot。

**HTAN Phase 2 数据大概率在 2026–2027 把 D 桶翻三倍。** 那时再 audit。

## 顺手清单

这次审计带出来几条 corpus 的 follow-up（只是提议，不是合并）：

1. **把 `htan-hms-ovarian` 改名 `hms-ovarian-sorger`**，撤掉 `consortium=HTAN-HTA13` 这个标签。HTA13 是 TNP SARDANA，不是卵巢。
2. **给 `wu-2021-breast` 加上 `spatial-transcriptomics` 模态标签**（Visium 部分是真的，26 个病人里 6 个有；现在被 `single-cell-rna` 标签盖住了）。
3. **加 POG570**（`pog570-pleasance-2020`）—— [[paired-data-pan-cancer]] 那篇里点名了的 Tier-1 队列，vault 里没有。
4. **高价值的 D 桶补**：Owkin MOSAIC（`owkin-mosaic`）、HTAN HTA12 WUSTL、HTAN HTA9 OHSU SMMART、HTAN HTA6 Duke DCIS、HTAN HTA5 DFCI Resistance。
5. **高价值的 C 桶补**：METABRIC IMC（`ali-2020-metabric-imc`）、TRACERx 100 IMC（`magness-enfield-2024-tracerx-imc`）、STIC DVP（`makhmut-2025-stic-spatialproteomics`）。

triage 已经写在 round-2 报告里（`_Temp/2026-06-03-paired-data-search-round-2.md`）；用户有那份清单。
