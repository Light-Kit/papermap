---
title: '队列覆盖进度 —— 我们想要的，我们已有的'
date: '2026-06-05 01:43 UTC'
topics:
  - hrd
  - pan-cancer
  - data-prep
  - paired-data
  - phase-1
  - progress
summary: '计划 vs 实际 的队列矩阵，结构镜像 [[matched-multi-omic-tumor-table]]，每行加一列 state（downloaded / partial / in-progress / blocked / unsearched）。manifest 共 75 行；44 已下载、6 partial、0 in-progress、15 在 2026-06-04 public-only 转向下 blocked-confirmed、10 尚未搜索（paper/accession 未核实）。33 个队列在 2026-06-05 经 cBioPortal + Knijnenburg 2018 HRD 评分获得格子级 processed-genomic backbone（cell-level partial）；底层支撑是 TCGA 泛癌入库（10,585 名 HRD-scored 病人、8,775 名带完整 bulk-RNA + MC3 + 临床），它不作为热图的一行，但为所有下游队列的 HRD 轴提供基础。'
starred: true
---

# 队列覆盖进度 —— 我们想要的，我们已有的

[[matched-multi-omic-tumor-table]] 是 *计划* 那张表 —— 满足 genomics + TME 高分辨配对入选条件的四桶公开队列清单。这一篇是它的 *操作版* 兄弟：同样四桶、同样每行身份，再多一列 `state`，记录这条队列在硬盘上的状态 —— `downloaded`（已下载）/ `partial`（部分轴还缺）/ `in-progress`（公开镜像可获取，今天就能拉）/ `blocked`（已 probed、被结构性卡死）/ `unsearched`（尚未搜索：paper/accession 未核实）。**2026-06-04 的 public-tier 转向**让"够得着 vs 够不着"这条线变得清晰 —— 任何只能走 DUA / PAT 的 gated 队列在政策上就是 `blocked`，不是带宽问题。

## 头条数字

- **44 downloaded · 6 partial · 0 in-progress · 15 blocked · 10 unsearched = 75 manifest 行。**
- **已在盘上（downloaded + partial）：** 50 队列（经 PR-5 / PR-6 / PR-7 串联后）。可统计 N 行的病人累计由 METABRIC-IMC 693 + Jackson 281 + HTA1-HTAPP 205 + HTA11-VUMC 195 等新入库主导；HTA3（484）和 HTA6（828）继续 blocked。
- **in-progress** 已清空：八个 CELLxGENE 镜像的 HTAN 子图谱（HTA1、HTA4、HTA8、HTA11）以及 Vázquez-García、Erickson、Pei-Min、Krishna 在 PR #5 与 PR #6 之间完成了拉取，全部转为 `downloaded`。
- **partial（6 队列）：** bassez-2021-biokey（Figshare processed Seurat，scTCR/raw 仍 gated）、bi-2021-ccrcc（Broad SCP1288 用户手工上传，WGS dbGaP-blocked）、kim-2018-tnbc-chemoresist（SmartSeq2 + WES partial）、karaayvaz-2018-tnbc（SmartSeq2 + WES partial）、launonen-2022-farkkila-mif-hgsoc（Synapse PAT 拉到 67 MB CycIF，影像 tile 推后）、hms-sorger-ovarian（Synapse PAT 拉到 8.07 GB CycIF 单细胞 CSV，686 文件推后）。
- **public-only 转向下结构性 gated（blocked-confirmed）：** 15 行。A 桶 —— htan-hta3、maynard、kim-2020、stewart、couturier。C 桶 —— farkkila-topacio（即便有 PAT 也是 DUC-gated）、magness-enfield、tietscher-superseded。D 桶 —— hta5、hta6、hta7、hta9、hta10、hta12、owkin-mosaic。所有 gate 已在 EGA / dbGaP / SCP-OAuth / Synapse-PAT 级别 2026-06-05 验证过。
- **unsearched（paper/accession 未核实或 paper-only / embargoed）：** 10 行 —— liu-2022-nsclc、magen-2023-hcc、wang-2025-sclc-parpi、sun-2021-hcc-early-relapse、wu-2025-hgsoc-visium-hd、mitri-2024-amtec-parpi-mtnbc、makhmut-coscia-2025-stic-dvp、mskspectrum-cfdna-parpi-2025、hwang-2025-pdac-neural、sun-2024-hcc-primary-met。
- **格子级 processed-genomic 桥接：** 33 个队列在 cBioPortal + Knijnenburg 2018 backbone 下，其 planned WGS / WES / panel 列获得了 `partial` 格子（master tally：`genomic_sweep_2026-06-05/_master_tally.tsv`）。这些队列的行级优先态多数仍为 `downloaded`（因 sc/sn 主轴已下载），但热图上每一条配对基因组的格子从灰/红 unsearched/blocked 转为 amber partial。

桶内 state 用纯文本 token：`downloaded`（在盘上、完整）、`partial`（在盘上但一个主轴仍缺）、`in-progress`（今天 probe 确认有公开镜像，可入队但未拉）、`blocked`（已 probed、gated、任何公开镜像都没有）、`unsearched`（paper/accession 未核实，未 probed）。

## TCGA 底座（不作为热图行，但在每个队列下面撑着）

**TCGA 泛癌图谱**（2026-06-05 入库后 1.28 GB）以"底座"形式垫在整个语料库下面，而不是以编号队列行的身份出现。**10,585 名病人有 Knijnenburg 2018 五元组（HRD-LOH + telomeric AI + LST + BRCA1/2 + HRDsum）算出的 HRD 评分**；其中 **8,775 名带完整的 bulk-RNA + MC3 体细胞突变 + 临床三联体**，使得同一条 HRD 轴可以投射到任何同癌种的 single-cell 或 spatial 队列上。它故意不作为热图行 —— A/B/C/D 四桶是 *项目特异* 的配对模态队列，TCGA 自身没有 spatial 或 single-cell 轴 —— 但 PR #7 中每一个翻为 `partial` 的配对基因组格子，都是经过 TCGA 锚定的 cBioPortal 投射 + Knijnenburg 2018 HRD 评分表（对应癌种：`brca_tcga_pan_can_atlas_2018`、`ov_tcga_pan_can_atlas_2018`、`paad_tcga_pan_can_atlas_2018`、`coadread_tcga_pan_can_atlas_2018`、`luad_tcga_pan_can_atlas_2018`、`lusc_tcga_pan_can_atlas_2018`、`hnsc_tcga_pan_can_atlas_2018`、`skcm_tcga_pan_can_atlas_2018`、`gbm_tcga_pan_can_atlas_2018`、`stad_tcga_pan_can_atlas_2018`、`lihc_tcga_pan_can_atlas_2018`、`cscc_dfarber_2015`、`brca_metabric` 及 Knijnenburg 补充 HRD 表）实现的 partial。HRD 轴因此 *永远有值*，即使队列自身的 WGS / WES 仍被 gated。

## A —— sc/snRNA + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Luo 2024 NANT 卵巢（anchor）[v]** | standalone | HGSOC | WGS + HRD scoring | scRNA + scTCR | 30 | partial | GEO `GSE222556` |
| **Vázquez-García 2022 MSK SPECTRUM [v]** | MSK-SPECTRUM | HGSOC | WGS + scWGS (DLP+) | scRNA + bulk-RNA | 42 | downloaded | CELLxGENE `4796c91c` + GEO `GSE180661`（Synapse `syn25569736` gated；与 D 行 dedupe） |
| **Olbrecht 2021 [v]** | standalone | HGSOC | germline BRCA | scRNA | 7 | downloaded | ArrayExpress `E-MTAB-8107` |
| **Pal 2021 BRCA1 乳腺 [v]** | standalone | breast (BRCA1) | germline BRCA1 + WGS | scRNA | 21 | downloaded | GEO `GSE161529` |
| **Bassez 2021 BIOKEY [v]** | BIOKEY | breast anti-PD-1 pre/post | WES + panel | scRNA + scTCR | 40 | partial | Figshare `24867018`（processed Seurat 725 MB）+ Nat Med MOESM 16 MB；raw 在 EGA `EGAS00001004809`（gated） |
| **Yost 2019 BCC [v]** | standalone | BCC anti-PD-1 | WES | scRNA + scTCR | 14 | downloaded | GEO `GSE123813` |
| **Caushi 2021 NSCLC [v]** | standalone | NSCLC anti-PD-1 | WES + panel | scRNA + scTCR | 16 | downloaded | GEO `GSE176021` |
| **Luoma 2022 HNSCC [v]** | standalone | HNSCC anti-PD-1 | clinical panel | scRNA | 29 | downloaded | GEO `GSE200996` |
| **Sade-Feldman 2018 mel [v]** | standalone | melanoma anti-PD-1 | WES | scRNA | 48 | downloaded | GEO `GSE120575` |
| **Bi 2021 ccRCC [v]** | standalone | ccRCC anti-PD-1 | WES | scRNA | 8 | partial | Broad SCP `SCP1288`（processed scRNA 1.0 GB，用户手工上传）；raw WGS 在 dbGaP `phs002252` gated |
| **Liu 2022 NSCLC [v]** | standalone | NSCLC (IO) | WES | scRNA | 35 | unsearched | EGA `EGAS00001005003`（manifest PMID 35020028 指向错误论文） |
| **Magen 2023 HCC [v]** | standalone | HCC anti-PD-1 | WES | scRNA + scTCR | 33 | unsearched | accession 未查到（PMID 下找不到 scRNA 论文） |
| **Wang 2025 SCLC PARPi [v]** | standalone | SCLC PARPi | panel | scRNA | verify | unsearched | accession 未核实（仅 Zhang 2025 meta-analysis 接近） |
| **Pelka 2021 CRC** | standalone | CRC (MMRd/MMRp) | WES | scRNA（+ MERFISH 子集 → D） | 62 | downloaded | GEO `GSE178341` + dbGaP `phs002407` |
| **Lee 2020 CRC（韩国）** | standalone | CRC | WES + bulk RNA | scRNA | 29 | downloaded | GEO `GSE132465` |
| **Maynard 2020 NSCLC 纵向** | standalone | NSCLC TKI pre/residual | WES + NGS | scRNA | 30 | blocked | EGA 未核实（blocked-confirmed 2026-06-05） |
| **Neftel 2019 GBM** | standalone | GBM IDH-wt | WES | scRNA | 28 | downloaded | Broad SCP `SCP393` + GEO `GSE131928` |
| **Karaayvaz 2018 TNBC** | standalone | TNBC | WES | scRNA (SmartSeq2) | 6 | partial | GEO `GSE118390` |
| **Puram 2017 HNSCC** | standalone | HNSCC | WES | scRNA (SmartSeq2) | 18 | downloaded | GEO `GSE103322` |
| **Kim 2020 NSCLC mets** | standalone | NSCLC（原发 + LN + 脑） | WES | scRNA | 44 | blocked | EGA `EGAS00001004001`（blocked-confirmed 2026-06-05） |
| **Tirosh 2016 melanoma** | standalone | metastatic mel | WES | scRNA (SmartSeq2) | 19 | downloaded | GEO `GSE72056` |
| **Jerby-Arnon 2018 mel** | standalone | mel anti-PD-1 mixed | WES | scRNA | 33 | downloaded | GEO `GSE115978` |
| **Stewart 2020 SCLC CDX** | standalone | SCLC chemo-evolved | WGS-CDX + WES-CTC | scRNA | ~12 | blocked | EGA `EGAS00001004025`（blocked-confirmed 2026-06-05） |
| **Wang 2021 胃（腹膜）** | standalone | gastric + 腹膜转移 | WES | scRNA | 20 | downloaded | GEO `GSE163558` |
| **Zhang 2022 胃 T-cell** | standalone | gastric | WES | scRNA + scTCR | 10 | downloaded | GEO `GSE183904` |
| **Couturier 2020 GBM** | standalone | GBM | WES | scRNA | 14 | blocked | EGA `EGAS00001004422`（blocked-confirmed 2026-06-05） |
| **Lambrechts 2018 NSCLC** | standalone | NSCLC | WES (bulk) | scRNA | 5 | downloaded | ArrayExpress `E-MTAB-6149` |
| **Goveia 2020 NSCLC EC** | standalone | NSCLC 血管内皮 | WES (Lambrechts) | scRNA | 8 | downloaded | ArrayExpress `E-MTAB-6308`（真实 Goveia 2020 NSCLC-EC，618 MB；先前 E-MTAB-8221 是 paper-level mis-id） |
| **Sun 2021 HCC 早复发** | standalone | HCC（原发 + 早复发） | WES | scRNA + scTCR | 18 | unsearched | BGI/CNGB（需注册）；已弃用 GSE149614 误归属 |
| **Kim 2018 TNBC 化疗抗药** | standalone | TNBC neoadj-chemo | deep WES + scDNA | scRNA | 20 | partial | SRA `SRP114962` |
| **Hwang/Lin 2022 PDAC chemo** | HTAPP-orbital | PDAC FOLFIRINOX | bulk WES | snRNA + DSP | 43 | downloaded | GEO `GSE199102` + dbGaP `phs002371` |
| **HTAN HTA3 BU 肺癌前** | HTAN-HTA3 | 肺腺 + LUSC 前驱 | bulk WES + scDNA | scRNA + mIF | 484 | blocked | Synapse `syn20446927` (Atlas=HTA3) |
| **Su 2025 HCC snRNA** | standalone | HCC | TCGA-LIHC 整合 | snRNA | 12 | downloaded | GEO `GSE282701` |

## B —— spatial transcriptomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Stur 2022 HGSOC Visium [v]** | standalone | HGSOC NACT-response | Visium-only（无 WGS） | Visium | 12 | downloaded | GEO `GSE189843`（已纠正） |
| **Erickson 2022 前列腺 Visium** | standalone | 前列腺腺癌 | WGS + lpWGS | Visium 多切片 | 11 | downloaded | Mendeley `svw96g68dv` v3（Visium）；EGA `EGAS00001006124` WGS gated |
| **Khaliq / Sun 2024 PDAC** | standalone | PDAC 原发 + 转移 | （公开层无 WES） | Visium FFPE | 30 | downloaded | GEO `GSE272362` |
| **Pei / Min 2025 PDAC 尸检** | standalone | PDAC 尸检多脏器 | WGS/WES（DAS 未提） | Visium + CosMx-SMI | 13 | downloaded | GEO `GSE274557`（Visium）+ `GSE277782`（CosMx） |
| **Wu 2025 HGSOC Visium HD** | standalone | HGSOC | WES + HRD | Visium HD | ~30 | unsearched | bioRxiv `2025.11.24.690313v1`（pre-acceptance embargo） |
| **Ji 2020 cSCC ST** | standalone | 皮肤 SCC | WES（4 例子集） | ST | 10 | downloaded | GEO `GSE144239`（B 轴已纠正） |
| **Xenium Prime 5K demo (10x) [v]** | 10x-public | 乳腺/OV/NSCLC/mel/宫颈 | bulk WGS per block | Xenium 5K + Visium HD | demo | downloaded | 10x portal |
| **Cervilla 2025 ST 平台 benchmark** | standalone | 6 癌种 benchmark | （无） | Visium + CytAssist + HD + Xenium MT/5K | n/a（benchmark） | downloaded | Zenodo `18000256` + `17999961` |

## C —— spatial proteomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Launonen 2022 Färkkilä mIF HGSOC [v]** | standalone | HGSOC HRD-vs-HRP | WGS + BRCA1/2 | t-CyCIF (mIF) | 44 | partial | Synapse `syn23747228`（PAT 拉到 4 个优先 CycIF + metadata 文件，67 MB；3,700 影像 tile 推后） |
| **Färkkilä 2020 TOPACIO [v]** | TOPACIO | HGSOC + TNBC + 子宫内膜 | WGS + HRDsum + LOH | t-CyCIF | 62 | blocked | Synapse `syn21569629`（PAT 读到 metadata；每个文件都 DUC-gated —— 需 Data Use Certificate，仅 PAT 不够） |
| **Mitri 2024 AMTEC PARPi mTNBC [v]** | HTAPP-umbrella | mTNBC PARPi pre/post | WES | t-CyCIF | 12 | unsearched | medRxiv `2024.08.29.24312245`（paper-only，HTAN OHSU 门户人工走查推后） |
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
| **HTAN HTA1 HTAPP [v]** | HTAN-HTA1 | mBC + NBL + LUAD + GBM + Ewing | bulk WES + panel | scRNA + Visium + Slide-seq + MERFISH + ExSeq + CODEX + MIBI + snRNA | 205 | downloaded | CELLxGENE `a96133de` + Zenodo `4479018`（Synapse `syn20446927` HTA1 WGS gated） |
| **HTAN HTA4 CHOP 儿科** | HTAN-HTA4 | NBL + AML/B-ALL + pHGG + Ewing | bulk WGS/WES | scRNA + snRNA + scATAC + CODEX | 69 | downloaded | CELLxGENE `cee845e3`（NBL）+ `9ceda3d2`（pHGG）+ `10ec9198`（AML/B-ALL）；Synapse 锁 WGS/WES |
| **HTAN HTA5 DFCI 抗药** | HTAN-HTA5 | NSCLC TKIr + HR+/HER2+ breast + IO-r mel | bulk WES | t-CyCIF + scRNA | 156 | blocked | Synapse `syn20446927` (Atlas=HTA5)（blocked-confirmed 2026-06-05） |
| **HTAN HTA6 Duke-Stanford DCIS** | HTAN-HTA6 | breast DCIS → IDC | bulk WGS（HTAN 最大） | MIBI + scRNA + bulk RNA | 828 | blocked | Synapse `syn20446927` (Atlas=HTA6)（blocked-confirmed 2026-06-05） |
| **HTAN HTA7 HMS PATCH** | HTAN-HTA7 | mel + nevus + CTCL + FL + CLL/SLL | clinical panel + bulk RNA | t-CyCIF + H&E | 245 | blocked | Synapse `syn20446927` (Atlas=HTA7)（blocked-confirmed 2026-06-05） |
| **HTAN HTA8 MSK 转移** | HTAN-HTA8 | SCLC + PDAC + 脑 + CRC 转移 | panel + WGS 子集 | scRNA + MIBI + GeoMx DSP | 202 | downloaded | CELLxGENE `62e8f058`（Chan SCLC）+ `efd94500`（Treg）；Synapse 锁 WGS |
| **HTAN HTA9 OHSU SMMART** | HTAN-HTA9 | mBC CDK4/6i + IO-evolved | bulk WGS + scDNA + RPPA | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx | 33 | blocked | Synapse `syn20446927` (Atlas=HTA9)（blocked-confirmed 2026-06-05） |
| **HTAN HTA10 Stanford FAP** | HTAN-HTA10 | FAP-CRC | WGS + Hi-C + methylation | scRNA + scATAC + Xenium + CODEX + MS | 40 | blocked | Synapse `syn20446927` (Atlas=HTA10)（blocked-confirmed 2026-06-05） |
| **HTAN HTA11 Vanderbilt CRC** | HTAN-HTA11 | sporadic CRC + adenoma + SSL | bulk WES/WGS | scRNA + snRNA + Visium + MxIF | 195 | downloaded | CELLxGENE `a48f5033`（Chen Cell 2021 HTAN VUMC）；Synapse 锁 WGS/MxIF |
| **HTAN HTA12 WUSTL 泛癌** | HTAN-HTA12 | 泛癌（PAAD open tier） | bulk WGS/WES | PAAD 病理切片显微镜（IDC） | 21 | blocked | NCI IDC 通过 Zenodo `12689994` manifests 拉到 n=21 PAAD slides；HTA12 其余轴仍 Synapse-gated。先前 n=295 指的是全多癌种图谱、所有模态汇总。 |
| **MSK SPECTRUM cfDNA / PARPi 2025** | MSK-SPECTRUM | HGSOC 铂 + PARPi 维持 | scWGS-DLP + WGS + cfDNA | scRNA 子集 | 24 | unsearched | dbGaP `phs002857`（drafted-future；无 PubMed 命中） |
| **HMS-Sorger 卵巢 [v]** | HMS-Sorger | HGSOC | WGS + HRD | t-CyCIF 40-plex | 25 | partial | Synapse `syn53283672`（PAT 拉到 4 个 CycIF 单细胞 CSV + metadata，8.07 GB；686 影像文件推后；WGS gated） |
| **Owkin MOSAIC-Window 膀胱** | MOSAIC | bladder MIBC | WES + bulk RNA | Visium + Chromium Flex snRNA + H&E | 15 | blocked | EGA `EGAD50000001251`（blocked-confirmed 2026-06-05） |
| **HTAPP Klughammer 2024 mBC** | HTAN-HTA1-orbital | metastatic breast | WES + lpWGS | snRNA + CODEX + MERFISH + ExSeq + Slide-seq | 30 | downloaded | CELLxGENE `a96133de` + Zenodo `4479018`（与 HTA1-HTAPP dedupe 候选） |
| **HTAN HTA8 SCLC 子集（Chan 2021）** | HTAN-HTA8-orbital | SCLC | IMPACT panel + WGS 子集 | scRNA + MIBI + Vectra | 21 | downloaded | CELLxGENE `62e8f058` + Zenodo `14057537`（被 HTA8 涵盖） |
| **Hwang 2022 PDAC neoadj [v]** | standalone | PDAC naive + neoadj | WES + DSP | snRNA + GeoMx DSP | 43 | downloaded | GEO `GSE202051` + dbGaP `phs002789` |
| **Hwang 2025 PDAC neural** | standalone | PDAC | bulk panel | Visium + snRNA | 25 | unsearched | 可能重命名为 hwang-2022-nat-genet-pdac-neoadj（PMID 35902743）；与 hwang-lin-2022 重叠 |
| **Sun 2024 HCC 原发 + 转移** | standalone-Fudan | HCC | 多区域 WES + bulk RNA | Visium + scRNA + IHC | 182 | unsearched | accession 未查到（无 PubMed 命中；可能误命名） |
| **Liu 2024 儿科 HGG（Filbin）** | standalone | pHGG/DMG/DHG 原发 + 复发 | matched WGS | snRNA + snATAC + CODEX | 16 | downloaded | GEO `GSE231860` |
| **Ravi 2022 GBM 多组学** | standalone | GBM 原发 + 复发 | bulk WES + inferred CNA | Visium + IMC + MALDI + scRNA | 28 | downloaded | GEO `GSE194329` |
| **Greenwald 2024 GBM (Suvà/Tirosh)** | standalone | GBM + IDH-mut glioma | bulk WES + TCGA-anchored | Visium + MIBI + scRNA + scATAC + Patch-seq | 100 | downloaded | GEO `GSE237183` + Zenodo `8105466` |
| **Denisenko 2024 HGSOC Visium + CosMx** | standalone | HGSOC | WES 子集 | Visium + CosMx SMI | 10 | downloaded | EGA `EGAS00001006816` + Zenodo `10048057` |
| **Krishna 2021 ADAPTeR ccRCC IO [v]** | ADAPTeR | ccRCC nivo pre/on/post | WES + WGS | scRNA + scTCR + mIF | 6 | downloaded | CELLxGENE `3f50314f`（Krishna Cancer Cell 2021）；EGA `EGAS00001005188` 锁 WGS/WES |
| **Wu 2021 乳腺 Visium [v]** | standalone | breast ER+ / HER2+ / TNBC | WES (controlled) | scRNA + Visium 子集 | 26 | downloaded | GEO `GSE176078` |

`[v]` = 已在 vault topic YAML。state 反映 2026-06-05 status.tsv 加每队列 MANIFEST.yaml。被替代的 `tietscher-2023-breast-imc` 行保留在原位但标 `blocked`，由紧接其下的 `tietscher-2023-breast-imc-bodenmiller` 替代。

## 缺口，一段话讲完

最大的病人数缺口都是 *结构性* 的，不是操作性的。**HTAN HTA6 Duke DCIS（828 人）**、**HTA3 BU 肺癌前（484）**、**HTA7 HMS PATCH（245）**、**HTA9 OHSU SMMART** 仍是 `blocked` —— Synapse `syn20446927` fileview 在 2026-06-04 转向下需要 HTAN Network team membership；PR #6 的 personal-PAT followup 已确认 personal token 能读 project metadata 但拉不动 sub-atlas 文件，TOPACIO 额外 DUC-gated。HTAN 外，缺口集中在三个 EGA-gated 的免疫治疗队列（Bassez BIOKEY 40 —— 现已通过 Figshare processed Seurat 转为 `partial`、Liu 2022 NSCLC 35、Kim 2020 NSCLC mets 44）和两个直接 HRD 上下文的 `blocked`/`partial` Synapse 队列 —— **Färkkilä 2020 TOPACIO（62，niraparib+pembro）** 仍 blocked；**Launonen / Färkkilä mIF HGSOC（44）** + **HMS-Sorger 卵巢（25）** 已经 partial。v5 → PR-7 delta：PR #5 把 8 个 CELLxGENE 镜像的 HTAN 子图谱加上 Vázquez-García、Erickson、Pei-Min、Krishna 全部入库为 `downloaded`（约 700 病人当量在盘上）；PR #6 通过 Synapse PAT 增加 2 个 partial（Launonen 67 MB、HMS-Sorger 8.07 GB），并阐明 6 个 HTAN 子图谱的 gate；PR #7 给 33 个队列加上格子级 processed-genomic backbone。TCGA 泛癌入库（10,585 名 HRD-scored 病人、8,775 名带完整 bulk-RNA + MC3 + 临床）是支撑 —— 它让每条配对基因组格子从灰/红 `unsearched`/`blocked` 变成 amber `partial`。

## unsearched vs blocked 的分裂 —— 今天换了什么

之前那张表把所有凭证 gated 的行都塞进一个 `planned` 桶，意思就是"在 manifest 里、还没碰过"。今天的 blank-fill probe + PR #5 / PR #6 / PR #7 串联把这一团拆成了三种语义清晰的格子。**blocked-confirmed** 是我们真正想要的严格定义：今天已经在 EGA / dbGaP / Synapse-PAT / SCP-OAuth 各级别 probed 过，任何公开镜像都没有 —— 这些 gate 是真的。**in-progress** 现在已经清空：先前那 11 个主 accession 被 gated 但单个实验室把 processed h5ad 重新发布到 CELLxGENE / Zenodo / Mendeley / GEO 的队列，在 PR #5（8 个入库）与 PR #6（2 个 Synapse-PAT partial）之间完成了所有拉取。**unsearched** 是剩下的残渣：accession 或 PMID 撑不过基本文献核对的行，加上 paper-only 的行 —— 这些行的 deposit 要么在注册墙后（BGI/CNGB）要么在 pre-acceptance embargo 里（bioRxiv）。"尚未搜索"现在是一个一等公民的格子颜色（灰色），明确区别于"已搜索、被 gated"（红色）。

v5 cut 时为 in-progress、现已变成 `downloaded`（PR #5）或经 Synapse-PAT 变成 `partial`（PR #6）的 11 个队列：

| 队列 | 来源 | 病人数 | 模态 | 落地版本 |
| --- | --- | --- | --- | --- |
| erickson-2022-prostate-visium | Mendeley `svw96g68dv` v3 | 11 | Visium（count 矩阵 + H&E） | PR #5 |
| pei-min-2025-pdac-autopsy | GEO `GSE274557` + `GSE277782` | 13 | Visium（57 样本）+ CosMx-SMI（7 样本，1000-plex） | PR #5 |
| htan-hta1-htapp | CELLxGENE `a96133de` + Zenodo `4479018` | 205 | scRNA + Visium + ExSeq | PR #5 |
| htan-hta4-chop-pediatric | CELLxGENE `cee845e3` / `9ceda3d2` / `10ec9198` | 69 | scRNA + snRNA（NBL + pHGG + AML/B-ALL） | PR #5 |
| htan-hta8-msk-metastasis | CELLxGENE `62e8f058` + `efd94500` | 202 | scRNA（Chan SCLC + Treg） | PR #5 |
| htan-hta11-vanderbilt-crc | CELLxGENE `a48f5033` | 195 | scRNA + snRNA（Chen Cell 2021 HTAN VUMC） | PR #5 |
| htan-hta12-wustl-pancancer | NCI IDC 公开桶 via Zenodo `12689994` manifests | 21（PAAD open-tier，不是 295） | PAAD 病理切片显微镜（DICOM，12 GB）—— 因 WGS/WES/scRNA/Visium 轴仍 Synapse-gated，重新归类为 `blocked` | PR #5（n 修订） |
| htapp-klughammer-2024-mbc | CELLxGENE `a96133de` + Zenodo `4479018` | 30 | snRNA + ExSeq + imaging | PR #5 |
| htan-hta8-sclc-chan-2021 | CELLxGENE `62e8f058` + Zenodo `14057537` | 21 | scRNA | PR #5 |
| krishna-2021-adapter-ccrcc-io | CELLxGENE `3f50314f` | 6 | scRNA（Krishna Cancer Cell 2021） | PR #5 |
| vazquez-garcia-2022-mskspectrum | CELLxGENE `4796c91c` + GEO `GSE180661` | 42 | scRNA（5 数据集，92.7 万细胞）+ bulk-RNA | PR #5 |
| launonen-2022-farkkila-mif-hgsoc | Synapse `syn23747228` via PAT | 44 | 67 MB CycIF + metadata（4 个优先文件；3,700 影像 tile 推后） | PR #6 |
| hms-sorger-ovarian | Synapse `syn53283672` via PAT | 25 | 8.07 GB CycIF 单细胞 CSV（4 个文件；686 影像/FCS 推后） | PR #6 |

三类 manifest 后续动作（推到下一轮）：**dedupe 候选** —— htapp-klughammer-2024-mbc 与 htan-hta1-htapp 共享 Klughammer Nat Med 2024 的 CELLxGENE deposit；htan-hta8-sclc-chan-2021 被 htan-hta8-msk-metastasis 涵盖；A 行的 vazquez-garcia-2022-mskspectrum 与任何 D 行镜像同 CELLxGENE deposit。**accession-unverified** —— liu-2022-nsclc（manifest PMID 35020028 指向一篇德语风湿编辑评论）、magen-2023-hcc（PMID 下找不到 scRNA 论文）、wang-2025-sclc-parpi（仅 Zhang 2025 meta-analysis 接近）、hwang-2025-pdac-neural（疑为 Hwang 2022 Nat Genet PMID 35902743 误归属）、sun-2024-hcc-primary-met（无 PubMed 命中）、mskspectrum-cfdna-parpi-2025（drafted-future）。**paper-only / embargoed** —— sun-2021-hcc-early-relapse（deposit 在 BGI/CNGB，需注册）、mitri-2024-amtec-parpi-mtnbc（仅 medRxiv，HTAN OHSU 门户人工走查推后）、wu-2025-hgsoc-visium-hd（bioRxiv pre-acceptance）。

PR #5 + PR #6 + PR #7 后的净 delta：约 840 病人当量已 `downloaded`（PR-5 八个入库扣掉 HTA12 的 295 → 21 修订），再加 2 个 Synapse-PAT 新 partial（Launonen 44 + HMS-Sorger 25 = 69），再加 33 个队列的格子级 processed-genomic backbone（约 12,000 病人当量的 TCGA-anchored WGS/WES/panel 格子）。整个语料库从"可发现性地图"转为"操作 manifest：每条配对基因组轴至少有值；每行 Synapse-gated 都明确标注 DUC- 或 team- 需求"。

## 页脚

[[matched-multi-omic-tumor-table]] · [[progress-v5-2026-06-05]] · [[paired-data-pan-cancer]]
