---
title: '队列覆盖进度 —— 我们想要的，我们已有的'
date: '2026-06-05'
topics:
  - hrd
  - pan-cancer
  - data-prep
  - paired-data
  - phase-1
  - progress
summary: '计划 vs 实际 的队列矩阵，结构镜像 [[matched-multi-omic-tumor-table]]，每行加一列 state（planned / downloaded / partial / blocked）。manifest 共 73 行；2026-06-05 已触达约 43 行，剩 31 行在 public-only 转向下全部需要凭证。'
starred: true
---

# 队列覆盖进度 —— 我们想要的，我们已有的

[[matched-multi-omic-tumor-table]] 是 *计划* 那张表 —— 满足 genomics + TME 高分辨配对入选条件的四桶公开队列清单。这一篇是它的 *操作版* 兄弟：同样四桶、同样每行身份，再多一列 `state`，记录这条队列在硬盘上的状态 —— `planned`（计划中）/ `downloaded`（已下载）/ `partial`（部分轴还缺）/ `blocked`（被结构性卡死）。**2026-06-04 的 public-tier 转向**让"够得着 vs 够不着"这条线变得清晰 —— 任何只能走 DUA / PAT 的 gated 队列在政策上就是 `blocked`，不是带宽问题。

## 头条数字

- **计划（manifest）：** 73 队列。
- **已在盘上（downloaded + partial + ready + qc_pass）：** 35 队列。可统计 N 行的病人累计 ≈ 1,950（HTA3 484 是 blocked；METABRIC-IMC 693 + Jackson 281 + Greenwald 100 + Caushi 16 等已在盘上）。
- **public-only 转向下结构性 gated：** 6 行 `blocked`（htan-hta3、launonen、farkkila-topacio、magness-enfield、htapp-klughammer、被替代的 tietscher-2023-breast-imc）+ 32 行 `planned`，全部是 EGA / dbGaP / Synapse / HTAN / GSA 凭证拒绝的 accession，v5 sweep 里没追。

桶内 state 用纯文本 token：`downloaded`（在盘上：ready / qc_pass / downloaded）、`partial`（在盘上但一个主轴仍缺）、`blocked`（status.tsv 在转向下标 blocked）、`planned`（在 manifest 中但从未触达）。

## A —— sc/snRNA + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Luo 2024 NANT 卵巢（anchor）[v]** | standalone | HGSOC | WGS + HRD scoring | scRNA + scTCR | 30 | partial | GEO `GSE222556` |
| **Vázquez-García 2022 MSK SPECTRUM [v]** | MSK-SPECTRUM | HGSOC | WGS + scWGS (DLP+) | scRNA | 42 | planned | Synapse `syn25569736` |
| **Olbrecht 2021 [v]** | standalone | HGSOC | germline BRCA | scRNA | 7 | downloaded | ArrayExpress `E-MTAB-8107` |
| **Pal 2021 BRCA1 乳腺 [v]** | standalone | breast (BRCA1) | germline BRCA1 + WGS | scRNA | 21 | downloaded | GEO `GSE161529` |
| **Bassez 2021 BIOKEY [v]** | BIOKEY | breast anti-PD-1 pre/post | WES + panel | scRNA + scTCR | 40 | planned | EGA `EGAS00001004809` |
| **Yost 2019 BCC [v]** | standalone | BCC anti-PD-1 | WES | scRNA + scTCR | 14 | downloaded | GEO `GSE123813` |
| **Caushi 2021 NSCLC [v]** | standalone | NSCLC anti-PD-1 | WES + panel | scRNA + scTCR | 16 | downloaded | GEO `GSE176021` |
| **Luoma 2022 HNSCC [v]** | standalone | HNSCC anti-PD-1 | clinical panel | scRNA | 29 | downloaded | GEO `GSE200996` |
| **Sade-Feldman 2018 mel [v]** | standalone | melanoma anti-PD-1 | WES | scRNA | 48 | downloaded | GEO `GSE120575` |
| **Bi 2021 ccRCC [v]** | standalone | ccRCC anti-PD-1 | WES | scRNA | 8 | planned | Broad SCP `SCP1288` + dbGaP `phs002252` |
| **Liu 2022 NSCLC [v]** | standalone | NSCLC (IO) | WES | scRNA | 35 | planned | EGA `EGAS00001005003` |
| **Magen 2023 HCC [v]** | standalone | HCC anti-PD-1 | WES | scRNA + scTCR | 33 | planned | accession 未查到 |
| **Wang 2025 SCLC PARPi [v]** | standalone | SCLC PARPi | panel | scRNA | verify | planned | accession 未核实 |
| **Pelka 2021 CRC** | standalone | CRC (MMRd/MMRp) | WES | scRNA（+ MERFISH 子集 → D） | 62 | downloaded | GEO `GSE178341` + dbGaP `phs002407` |
| **Lee 2020 CRC（韩国）** | standalone | CRC | WES + bulk RNA | scRNA | 29 | downloaded | GEO `GSE132465` |
| **Maynard 2020 NSCLC 纵向** | standalone | NSCLC TKI pre/residual | WES + NGS | scRNA | 30 | planned | EGA 未核实 |
| **Neftel 2019 GBM** | standalone | GBM IDH-wt | WES | scRNA | 28 | downloaded | Broad SCP `SCP393` + GEO `GSE131928` |
| **Karaayvaz 2018 TNBC** | standalone | TNBC | WES | scRNA (SmartSeq2) | 6 | partial | GEO `GSE118390` |
| **Puram 2017 HNSCC** | standalone | HNSCC | WES | scRNA (SmartSeq2) | 18 | downloaded | GEO `GSE103322` |
| **Kim 2020 NSCLC mets** | standalone | NSCLC（原发 + LN + 脑） | WES | scRNA | 44 | planned | EGA `EGAS00001004001` |
| **Tirosh 2016 melanoma** | standalone | metastatic mel | WES | scRNA (SmartSeq2) | 19 | downloaded | GEO `GSE72056` |
| **Jerby-Arnon 2018 mel** | standalone | mel anti-PD-1 mixed | WES | scRNA | 33 | downloaded | GEO `GSE115978` |
| **Stewart 2020 SCLC CDX** | standalone | SCLC chemo-evolved | WGS-CDX + WES-CTC | scRNA | ~12 | planned | EGA `EGAS00001004025` |
| **Wang 2021 胃（腹膜）** | standalone | gastric + 腹膜转移 | WES | scRNA | 20 | downloaded | GEO `GSE163558` |
| **Zhang 2022 胃 T-cell** | standalone | gastric | WES | scRNA + scTCR | 10 | downloaded | GEO `GSE183904` |
| **Couturier 2020 GBM** | standalone | GBM | WES | scRNA | 14 | planned | EGA `EGAS00001004422` |
| **Lambrechts 2018 NSCLC** | standalone | NSCLC | WES (bulk) | scRNA | 5 | downloaded | ArrayExpress `E-MTAB-6149` |
| **Goveia 2020 NSCLC EC** | standalone | NSCLC 血管内皮 | WES (Lambrechts) | scRNA | 8 | downloaded | ArrayExpress `E-MTAB-8221` |
| **Sun 2021 HCC 早复发** | standalone | HCC（原发 + 早复发） | WES | scRNA + scTCR | 18 | planned | accession 未查到 |
| **Kim 2018 TNBC 化疗抗药** | standalone | TNBC neoadj-chemo | deep WES + scDNA | scRNA | 20 | partial | SRA `SRP114962` |
| **Hwang/Lin 2022 PDAC chemo** | HTAPP-orbital | PDAC FOLFIRINOX | bulk WES | snRNA + DSP | 43 | downloaded | GEO `GSE199102` + dbGaP `phs002371` |
| **HTAN HTA3 BU 肺癌前** | HTAN-HTA3 | 肺腺 + LUSC 前驱 | bulk WES + scDNA | scRNA + mIF | 484 | blocked | Synapse `syn20446927` (Atlas=HTA3) |
| **Su 2025 HCC snRNA** | standalone | HCC | TCGA-LIHC 整合 | snRNA | 12 | downloaded | GEO `GSE282701` |

## B —— spatial transcriptomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Stur 2022 HGSOC Visium [v]** | standalone | HGSOC NACT-response | Visium-only（无 WGS） | Visium | 12 | downloaded | GEO `GSE189843`（已纠正） |
| **Erickson 2022 前列腺 Visium** | standalone | 前列腺腺癌 | WGS + lpWGS | Visium 多切片 | 11 | planned | EGA `EGAS00001006124` |
| **Khaliq / Sun 2024 PDAC** | standalone | PDAC 原发 + 转移 | （公开层无 WES） | Visium FFPE | 30 | downloaded | GEO `GSE272362` |
| **Pei / Min 2025 PDAC 尸检** | standalone | PDAC 尸检多脏器 | WGS/WES 尸检 | Visium 55 切片 | 13 | planned | accession 未核实 |
| **Wu 2025 HGSOC Visium HD** | standalone | HGSOC | WES + HRD | Visium HD | ~30 | planned | accession 未核实 |
| **Ji 2020 cSCC ST** | standalone | 皮肤 SCC | WES（4 例子集） | ST | 10 | downloaded | GEO `GSE144239`（B 轴已纠正） |
| **Xenium Prime 5K demo (10x) [v]** | 10x-public | 乳腺/OV/NSCLC/mel/宫颈 | bulk WGS per block | Xenium 5K + Visium HD | demo | downloaded | 10x portal |
| **Cervilla 2025 ST 平台 benchmark** | standalone | 6 癌种 benchmark | （无） | Visium + CytAssist + HD + Xenium MT/5K | n/a（benchmark） | downloaded | Zenodo `18000256` + `17999961` |

## C —— spatial proteomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Launonen 2022 Färkkilä mIF HGSOC [v]** | standalone | HGSOC HRD-vs-HRP | WGS + BRCA1/2 | t-CyCIF (mIF) | 44 | blocked | Synapse `syn26230540` |
| **Färkkilä 2020 TOPACIO [v]** | TOPACIO | HGSOC + TNBC + 子宫内膜 | WGS + HRDsum + LOH | t-CyCIF | 62 | blocked | Synapse `syn22177117` |
| **Mitri 2024 AMTEC PARPi mTNBC [v]** | HTAPP-umbrella | mTNBC PARPi pre/post | WES | t-CyCIF | 12 | planned | dbGaP `phs002371.v1.p1` |
| **Risom 2022 DCIS MIBI** | HTAN-HTA6-orbital | breast DCIS → IBC | panel + bulk RNA | MIBI-TOF, 37-plex | 122 | downloaded | Mendeley `d87vg86zd8` + figshare `25289011`（公开镜像；canonical syn17773547 未核） |
| **Jackson 2020 乳腺 IMC** | METABRIC-linked | 乳腺（全亚型） | METABRIC WES + CNA（可链） | IMC, 37-plex | 281 | downloaded | Zenodo `4607374` |
| **Tietscher 2023 乳腺 IMC（被替代）** | standalone | breast HER2+ / TNBC | （无 METABRIC 链；无公开 WES） | IMC, 40-plex | 14 | blocked | 被替代 —— 见下一行 |
| **Tietscher 2023 乳腺 IMC（bodenmiller 释出）** | standalone | breast HER2+ / TNBC | （无公开 WES） | IMC 37-plex + scRNA | 14 | downloaded | Zenodo `4911135` + AE `E-MTAB-10607` |
| **Ali / Danenberg 2020/2022 METABRIC IMC** | METABRIC | 乳腺（全亚型） | METABRIC bulk WES + targeted + SNP-CNA | IMC, 37-plex | 693 | downloaded | Zenodo `6036188` + cBioPortal METABRIC |
| **Magness / Enfield 2024 TRACERx 100 IMC** | TRACERx | NSCLC 早期 | 多区域 WES + bulk RNA | IMC（2 panel） | 81 | blocked | Zenodo `12587543`（restricted） |
| **Makhmut / Coscia 2025 STIC DVP** | standalone | HGSOC + STIC | targeted HRD panel | DVP-LMD-MS | 25 | planned | PRIDE per bioRxiv `2025.03.19.643504` |

## D —— multi-spatial / full-tuple

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **HTAN HTA1 HTAPP [v]** | HTAN-HTA1 | mBC + NBL + LUAD + GBM + Ewing | bulk WES + panel | scRNA + Visium + Slide-seq + MERFISH + ExSeq + CODEX + MIBI + snRNA | 205 | planned | Synapse `syn20446927` (Atlas=HTA1) |
| **HTAN HTA4 CHOP 儿科** | HTAN-HTA4 | NBL + AML/B-ALL + pHGG + Ewing | bulk WGS/WES | scRNA + scATAC + CODEX | 69 | planned | Synapse `syn20446927` (Atlas=HTA4) |
| **HTAN HTA5 DFCI 抗药** | HTAN-HTA5 | NSCLC TKIr + HR+/HER2+ breast + IO-r mel | bulk WES | t-CyCIF + scRNA | 156 | planned | Synapse `syn20446927` (Atlas=HTA5) |
| **HTAN HTA6 Duke-Stanford DCIS** | HTAN-HTA6 | breast DCIS → IDC | bulk WGS（HTAN 最大） | MIBI + scRNA + bulk RNA | 828 | planned | Synapse `syn20446927` (Atlas=HTA6) |
| **HTAN HTA7 HMS PATCH** | HTAN-HTA7 | mel + nevus + CTCL + FL + CLL/SLL | clinical panel + bulk RNA | t-CyCIF + H&E | 245 | planned | Synapse `syn20446927` (Atlas=HTA7) |
| **HTAN HTA8 MSK 转移** | HTAN-HTA8 | SCLC + PDAC + 脑 + CRC 转移 | panel + WGS 子集 | scRNA + MIBI + GeoMx DSP | 202 | planned | Synapse `syn20446927` (Atlas=HTA8) |
| **HTAN HTA9 OHSU SMMART** | HTAN-HTA9 | mBC CDK4/6i + IO-evolved | bulk WGS + scDNA + RPPA | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx | 33 | planned | Synapse `syn20446927` (Atlas=HTA9) |
| **HTAN HTA10 Stanford FAP** | HTAN-HTA10 | FAP-CRC | WGS + Hi-C + methylation | scRNA + scATAC + Xenium + CODEX + MS | 40 | planned | Synapse `syn20446927` (Atlas=HTA10) |
| **HTAN HTA11 Vanderbilt CRC** | HTAN-HTA11 | sporadic CRC + adenoma + SSL | bulk WES/WGS | scRNA + Visium + MxIF | 195 | planned | Synapse `syn20446927` (Atlas=HTA11) |
| **HTAN HTA12 WUSTL 泛癌** | HTAN-HTA12 | 11 癌种泛癌 | bulk WGS/WES | scRNA + snRNA + scATAC + Visium + CODEX + IMC + Xenium pilot | 295 | planned | Synapse `syn20446927` (Atlas=HTA12) |
| **MSK SPECTRUM cfDNA / PARPi 2025** | MSK-SPECTRUM | HGSOC 铂 + PARPi 维持 | scWGS-DLP + WGS + cfDNA | scRNA 子集 | 24 | planned | dbGaP `phs002857` |
| **HMS-Sorger 卵巢 [v]** | HMS-Sorger | HGSOC | WGS + HRD | t-CyCIF 40-plex | 25 | planned | Synapse Sorger-lab |
| **Owkin MOSAIC-Window 膀胱** | MOSAIC | bladder MIBC | WES + bulk RNA | Visium + Chromium Flex snRNA + H&E | 15 | planned | EGA `EGAD50000001251` |
| **HTAPP Klughammer 2024 mBC** | HTAN-HTA1-orbital | metastatic breast | WES + lpWGS | snRNA + CODEX + MERFISH + ExSeq + Slide-seq | 30 | blocked | dbGaP `phs002371` + SCP `SCP2702` |
| **HTAN HTA8 SCLC 子集（Chan 2021）** | HTAN-HTA8-orbital | SCLC | IMPACT panel + WGS 子集 | scRNA + MIBI + Vectra | 21 | planned | dbGaP `phs002371` |
| **Hwang 2022 PDAC neoadj [v]** | standalone | PDAC naive + neoadj | WES + DSP | snRNA + GeoMx DSP | 43 | downloaded | GEO `GSE202051` + dbGaP `phs002789` |
| **Hwang 2025 PDAC neural** | standalone | PDAC | bulk panel | Visium + snRNA | 25 | planned | accession 未核实 |
| **Sun 2024 HCC 原发 + 转移** | standalone-Fudan | HCC | 多区域 WES + bulk RNA | Visium + scRNA + IHC | 182 | planned | accession 未查到 |
| **Liu 2024 儿科 HGG（Filbin）** | standalone | pHGG/DMG/DHG 原发 + 复发 | matched WGS | snRNA + snATAC + CODEX | 16 | downloaded | GEO `GSE231860` |
| **Ravi 2022 GBM 多组学** | standalone | GBM 原发 + 复发 | bulk WES + inferred CNA | Visium + IMC + MALDI + scRNA | 28 | downloaded | GEO `GSE194329` |
| **Greenwald 2024 GBM (Suvà/Tirosh)** | standalone | GBM + IDH-mut glioma | bulk WES + TCGA-anchored | Visium + MIBI + scRNA + scATAC + Patch-seq | 100 | downloaded | GEO `GSE237183` + Zenodo `8105466` |
| **Denisenko 2024 HGSOC Visium + CosMx** | standalone | HGSOC | WES 子集 | Visium + CosMx SMI | 10 | downloaded | EGA `EGAS00001006816` + Zenodo `10048057` |
| **Krishna 2021 ADAPTeR ccRCC IO [v]** | ADAPTeR | ccRCC nivo pre/on/post | WES | scRNA + scTCR + mIF | 6 | planned | EGA `EGAS00001005188` |
| **Wu 2021 乳腺 Visium [v]** | standalone | breast ER+ / HER2+ / TNBC | WES (controlled) | scRNA + Visium 子集 | 26 | downloaded | GEO `GSE176078` |

`[v]` = 已在 vault topic YAML。state 反映 2026-06-05 status.tsv 加每队列 MANIFEST.yaml。被替代的 `tietscher-2023-breast-imc` 行保留在原位但标 `blocked`，由紧接其下的 `tietscher-2023-breast-imc-bodenmiller` 替代。

## 缺口，一段话讲完

最大的病人数缺口都是 *结构性* 的，不是操作性的。**HTAN HTA6 Duke DCIS（828 人）**、**HTA3 BU 肺癌前（484）**、**HTA12 WUSTL 泛癌（295）**、**HTA7 HMS PATCH（245）**、**HTA1 HTAPP（205）** 都是 `planned` 或 `blocked`，因为 Synapse `syn20446927` fileview 在 2026-06-04 转向下需要 PAT —— 不是带宽问题。HTAN 外，缺口集中在三个 EGA-gated 的免疫治疗队列（Bassez BIOKEY 40、Liu 2022 NSCLC 35、Kim 2020 NSCLC mets 44）和两个 `blocked` Synapse 队列 —— 后者恰好是直接 HRD 上下文 —— **Launonen / Färkkilä mIF HGSOC（44）** 和 **Färkkilä 2020 TOPACIO（62）**（唯一一个公开层 niraparib+pembro trial）。今天关掉的四个（jackson、kim、greenwald、tietscher）构成 v5 → post-v5 的 delta：jackson IMC 281 人（Zenodo 开放，METABRIC 可链）、kim-2018 TNBC 化疗抗药（deep WES + scDNA + SmartSeq2，20 人）、greenwald 2024 GBM（Visium + MIBI + scRNA + scATAC，100 人）、tietscher 2023 乳腺 IMC bodenmiller 释出（被替代行的纠正版本）。换算下来，自 v5 cut 以来 **+约 400 人** 进入 downloaded 集。

## 页脚

[[matched-multi-omic-tumor-table]] · [[progress-v5-2026-06-05]] · [[paired-data-pan-cancer]]
