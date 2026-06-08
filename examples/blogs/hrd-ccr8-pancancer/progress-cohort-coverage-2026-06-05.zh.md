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
summary: '计划 vs 实际 的队列矩阵，结构镜像 [[matched-multi-omic-tumor-table]]，每行加一列 state（downloaded / partial / in-progress / blocked / unsearched）。manifest 共 74 行；35 已下载、3 partial、11 在 2026-06-05 blank-fill probe 后新归入 in-progress、17 在 2026-06-04 public-only 转向下 blocked-confirmed、8 尚未搜索（paper/accession 未核实）。'
starred: true
---

# 队列覆盖进度 —— 我们想要的，我们已有的

[[matched-multi-omic-tumor-table]] 是 *计划* 那张表 —— 满足 genomics + TME 高分辨配对入选条件的四桶公开队列清单。这一篇是它的 *操作版* 兄弟：同样四桶、同样每行身份，再多一列 `state`，记录这条队列在硬盘上的状态 —— `downloaded`（已下载）/ `partial`（部分轴还缺）/ `in-progress`（公开镜像可获取，今天就能拉）/ `blocked`（已 probed、被结构性卡死）/ `unsearched`（尚未搜索：paper/accession 未核实）。**2026-06-04 的 public-tier 转向**让"够得着 vs 够不着"这条线变得清晰 —— 任何只能走 DUA / PAT 的 gated 队列在政策上就是 `blocked`，不是带宽问题。

## 头条数字

- **35 downloaded · 3 partial · 11 in-progress · 17 blocked · 8 unsearched = 74 manifest 行。**
- **已在盘上（downloaded + partial）：** 38 队列。可统计 N 行的病人累计 ≈ 1,950（HTA3 484 是 blocked；METABRIC-IMC 693 + Jackson 281 + Greenwald 100 + Caushi 16 等已在盘上）。
- **in-progress（2026-06-05 probe 后新可获取）：** 11 队列，约 1,038 病人当量，散在 CELLxGENE / Zenodo / GEO / Mendeley —— 多数是 HTAN 子图谱：主 Synapse fileview gated，但单个实验室把处理过的 h5ad 重新发布到了 CELLxGENE。
- **public-only 转向下结构性 gated（blocked-confirmed，2026-06-05 已 probed）：** 17 行，分布在 A（htan-hta3、bassez、bi、maynard、kim-2020、stewart、couturier）、C（launonen、farkkila-topacio、magness-enfield）、D（htan-hta5、hta6、hta7、hta9、hta10、hms-sorger、owkin-mosaic）。所有 gate 已在 EGA / dbGaP / SCP-OAuth / Synapse-PAT 级别确认。
- **unsearched（paper/accession 未核实，未 probed）：** 8 行 —— accession-unverified（liu-2022、magen-2023、wang-2025、hwang-2025、sun-2024、mskspectrum-cfdna）+ paper-only/embargoed（sun-2021-CNGB、mitri-2024-medRxiv、wu-2025-bioRxiv）。

桶内 state 用纯文本 token：`downloaded`（在盘上、完整）、`partial`（在盘上但一个主轴仍缺）、`in-progress`（今天 probe 确认有公开镜像，可入队但未拉）、`blocked`（已 probed、gated、任何公开镜像都没有）、`unsearched`（paper/accession 未核实，未 probed）。

## A —— sc/snRNA + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Luo 2024 NANT 卵巢（anchor）[v]** | standalone | HGSOC | WGS + HRD scoring | scRNA + scTCR | 30 | partial | GEO `GSE222556` |
| **Vázquez-García 2022 MSK SPECTRUM [v]** | MSK-SPECTRUM | HGSOC | WGS + scWGS (DLP+) | scRNA + bulk-RNA | 42 | in-progress | CELLxGENE `4796c91c` + GEO `GSE180661`（Synapse `syn25569736` gated；与 D 行 dedupe） |
| **Olbrecht 2021 [v]** | standalone | HGSOC | germline BRCA | scRNA | 7 | downloaded | ArrayExpress `E-MTAB-8107` |
| **Pal 2021 BRCA1 乳腺 [v]** | standalone | breast (BRCA1) | germline BRCA1 + WGS | scRNA | 21 | downloaded | GEO `GSE161529` |
| **Bassez 2021 BIOKEY [v]** | BIOKEY | breast anti-PD-1 pre/post | WES + panel | scRNA + scTCR | 40 | blocked | EGA `EGAS00001004809`（blocked-confirmed 2026-06-05） |
| **Yost 2019 BCC [v]** | standalone | BCC anti-PD-1 | WES | scRNA + scTCR | 14 | downloaded | GEO `GSE123813` |
| **Caushi 2021 NSCLC [v]** | standalone | NSCLC anti-PD-1 | WES + panel | scRNA + scTCR | 16 | downloaded | GEO `GSE176021` |
| **Luoma 2022 HNSCC [v]** | standalone | HNSCC anti-PD-1 | clinical panel | scRNA | 29 | downloaded | GEO `GSE200996` |
| **Sade-Feldman 2018 mel [v]** | standalone | melanoma anti-PD-1 | WES | scRNA | 48 | downloaded | GEO `GSE120575` |
| **Bi 2021 ccRCC [v]** | standalone | ccRCC anti-PD-1 | WES | scRNA | 8 | blocked | Broad SCP `SCP1288` + dbGaP `phs002252`（blocked-confirmed 2026-06-05） |
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
| **Goveia 2020 NSCLC EC** | standalone | NSCLC 血管内皮 | WES (Lambrechts) | scRNA | 8 | downloaded | ArrayExpress `E-MTAB-8221` |
| **Sun 2021 HCC 早复发** | standalone | HCC（原发 + 早复发） | WES | scRNA + scTCR | 18 | unsearched | BGI/CNGB（需注册）；已弃用 GSE149614 误归属 |
| **Kim 2018 TNBC 化疗抗药** | standalone | TNBC neoadj-chemo | deep WES + scDNA | scRNA | 20 | partial | SRA `SRP114962` |
| **Hwang/Lin 2022 PDAC chemo** | HTAPP-orbital | PDAC FOLFIRINOX | bulk WES | snRNA + DSP | 43 | downloaded | GEO `GSE199102` + dbGaP `phs002371` |
| **HTAN HTA3 BU 肺癌前** | HTAN-HTA3 | 肺腺 + LUSC 前驱 | bulk WES + scDNA | scRNA + mIF | 484 | blocked | Synapse `syn20446927` (Atlas=HTA3) |
| **Su 2025 HCC snRNA** | standalone | HCC | TCGA-LIHC 整合 | snRNA | 12 | downloaded | GEO `GSE282701` |

## B —— spatial transcriptomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Stur 2022 HGSOC Visium [v]** | standalone | HGSOC NACT-response | Visium-only（无 WGS） | Visium | 12 | downloaded | GEO `GSE189843`（已纠正） |
| **Erickson 2022 前列腺 Visium** | standalone | 前列腺腺癌 | WGS + lpWGS | Visium 多切片 | 11 | in-progress | Mendeley `svw96g68dv` v3（Visium）；EGA `EGAS00001006124` WGS gated |
| **Khaliq / Sun 2024 PDAC** | standalone | PDAC 原发 + 转移 | （公开层无 WES） | Visium FFPE | 30 | downloaded | GEO `GSE272362` |
| **Pei / Min 2025 PDAC 尸检** | standalone | PDAC 尸检多脏器 | WGS/WES（DAS 未提） | Visium + CosMx-SMI | 13 | in-progress | GEO `GSE274557`（Visium）+ `GSE277782`（CosMx） |
| **Wu 2025 HGSOC Visium HD** | standalone | HGSOC | WES + HRD | Visium HD | ~30 | unsearched | bioRxiv `2025.11.24.690313v1`（pre-acceptance embargo） |
| **Ji 2020 cSCC ST** | standalone | 皮肤 SCC | WES（4 例子集） | ST | 10 | downloaded | GEO `GSE144239`（B 轴已纠正） |
| **Xenium Prime 5K demo (10x) [v]** | 10x-public | 乳腺/OV/NSCLC/mel/宫颈 | bulk WGS per block | Xenium 5K + Visium HD | demo | downloaded | 10x portal |
| **Cervilla 2025 ST 平台 benchmark** | standalone | 6 癌种 benchmark | （无） | Visium + CytAssist + HD + Xenium MT/5K | n/a（benchmark） | downloaded | Zenodo `18000256` + `17999961` |

## C —— spatial proteomics + 配对基因组

| name | consortium | cancer | genomic | TME | N pts | state | accession |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Launonen 2022 Färkkilä mIF HGSOC [v]** | standalone | HGSOC HRD-vs-HRP | WGS + BRCA1/2 | t-CyCIF (mIF) | 44 | blocked | Synapse `syn26230540` |
| **Färkkilä 2020 TOPACIO [v]** | TOPACIO | HGSOC + TNBC + 子宫内膜 | WGS + HRDsum + LOH | t-CyCIF | 62 | blocked | Synapse `syn22177117` |
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
| **HTAN HTA1 HTAPP [v]** | HTAN-HTA1 | mBC + NBL + LUAD + GBM + Ewing | bulk WES + panel | scRNA + Visium + Slide-seq + MERFISH + ExSeq + CODEX + MIBI + snRNA | 205 | in-progress | CELLxGENE `a96133de` + Zenodo `4479018`（Synapse `syn20446927` HTA1 WGS gated） |
| **HTAN HTA4 CHOP 儿科** | HTAN-HTA4 | NBL + AML/B-ALL + pHGG + Ewing | bulk WGS/WES | scRNA + snRNA + scATAC + CODEX | 69 | in-progress | CELLxGENE `cee845e3`（NBL）+ `9ceda3d2`（pHGG）+ `10ec9198`（AML/B-ALL）；Synapse 锁 WGS/WES |
| **HTAN HTA5 DFCI 抗药** | HTAN-HTA5 | NSCLC TKIr + HR+/HER2+ breast + IO-r mel | bulk WES | t-CyCIF + scRNA | 156 | blocked | Synapse `syn20446927` (Atlas=HTA5)（blocked-confirmed 2026-06-05） |
| **HTAN HTA6 Duke-Stanford DCIS** | HTAN-HTA6 | breast DCIS → IDC | bulk WGS（HTAN 最大） | MIBI + scRNA + bulk RNA | 828 | blocked | Synapse `syn20446927` (Atlas=HTA6)（blocked-confirmed 2026-06-05） |
| **HTAN HTA7 HMS PATCH** | HTAN-HTA7 | mel + nevus + CTCL + FL + CLL/SLL | clinical panel + bulk RNA | t-CyCIF + H&E | 245 | blocked | Synapse `syn20446927` (Atlas=HTA7)（blocked-confirmed 2026-06-05） |
| **HTAN HTA8 MSK 转移** | HTAN-HTA8 | SCLC + PDAC + 脑 + CRC 转移 | panel + WGS 子集 | scRNA + MIBI + GeoMx DSP | 202 | in-progress | CELLxGENE `62e8f058`（Chan SCLC）+ `efd94500`（Treg）；Synapse 锁 WGS |
| **HTAN HTA9 OHSU SMMART** | HTAN-HTA9 | mBC CDK4/6i + IO-evolved | bulk WGS + scDNA + RPPA | mIHC/CyCIF + scATAC + scRNA + EM + GeoMx | 33 | blocked | Synapse `syn20446927` (Atlas=HTA9)（blocked-confirmed 2026-06-05） |
| **HTAN HTA10 Stanford FAP** | HTAN-HTA10 | FAP-CRC | WGS + Hi-C + methylation | scRNA + scATAC + Xenium + CODEX + MS | 40 | blocked | Synapse `syn20446927` (Atlas=HTA10)（blocked-confirmed 2026-06-05） |
| **HTAN HTA11 Vanderbilt CRC** | HTAN-HTA11 | sporadic CRC + adenoma + SSL | bulk WES/WGS | scRNA + snRNA + Visium + MxIF | 195 | in-progress | CELLxGENE `a48f5033`（Chen Cell 2021 HTAN VUMC）；Synapse 锁 WGS/MxIF |
| **HTAN HTA12 WUSTL 泛癌** | HTAN-HTA12 | 11 癌种泛癌 | bulk WGS/WES | scRNA + snRNA + scATAC + Visium + CODEX + IMC + Xenium pilot | 295 | in-progress | Zenodo `12689994`（Visium/H&E imaging）；Synapse 锁 WGS/WES/RNA-seq |
| **MSK SPECTRUM cfDNA / PARPi 2025** | MSK-SPECTRUM | HGSOC 铂 + PARPi 维持 | scWGS-DLP + WGS + cfDNA | scRNA 子集 | 24 | unsearched | dbGaP `phs002857`（drafted-future；无 PubMed 命中） |
| **HMS-Sorger 卵巢 [v]** | HMS-Sorger | HGSOC | WGS + HRD | t-CyCIF 40-plex | 25 | blocked | Synapse Sorger-lab（blocked-confirmed 2026-06-05） |
| **Owkin MOSAIC-Window 膀胱** | MOSAIC | bladder MIBC | WES + bulk RNA | Visium + Chromium Flex snRNA + H&E | 15 | blocked | EGA `EGAD50000001251`（blocked-confirmed 2026-06-05） |
| **HTAPP Klughammer 2024 mBC** | HTAN-HTA1-orbital | metastatic breast | WES + lpWGS | snRNA + CODEX + MERFISH + ExSeq + Slide-seq | 30 | in-progress | CELLxGENE `a96133de` + Zenodo `4479018`（与 HTA1-HTAPP dedupe 候选） |
| **HTAN HTA8 SCLC 子集（Chan 2021）** | HTAN-HTA8-orbital | SCLC | IMPACT panel + WGS 子集 | scRNA + MIBI + Vectra | 21 | in-progress | CELLxGENE `62e8f058` + Zenodo `14057537`（被 HTA8 涵盖） |
| **Hwang 2022 PDAC neoadj [v]** | standalone | PDAC naive + neoadj | WES + DSP | snRNA + GeoMx DSP | 43 | downloaded | GEO `GSE202051` + dbGaP `phs002789` |
| **Hwang 2025 PDAC neural** | standalone | PDAC | bulk panel | Visium + snRNA | 25 | unsearched | 可能重命名为 hwang-2022-nat-genet-pdac-neoadj（PMID 35902743）；与 hwang-lin-2022 重叠 |
| **Sun 2024 HCC 原发 + 转移** | standalone-Fudan | HCC | 多区域 WES + bulk RNA | Visium + scRNA + IHC | 182 | unsearched | accession 未查到（无 PubMed 命中；可能误命名） |
| **Liu 2024 儿科 HGG（Filbin）** | standalone | pHGG/DMG/DHG 原发 + 复发 | matched WGS | snRNA + snATAC + CODEX | 16 | downloaded | GEO `GSE231860` |
| **Ravi 2022 GBM 多组学** | standalone | GBM 原发 + 复发 | bulk WES + inferred CNA | Visium + IMC + MALDI + scRNA | 28 | downloaded | GEO `GSE194329` |
| **Greenwald 2024 GBM (Suvà/Tirosh)** | standalone | GBM + IDH-mut glioma | bulk WES + TCGA-anchored | Visium + MIBI + scRNA + scATAC + Patch-seq | 100 | downloaded | GEO `GSE237183` + Zenodo `8105466` |
| **Denisenko 2024 HGSOC Visium + CosMx** | standalone | HGSOC | WES 子集 | Visium + CosMx SMI | 10 | downloaded | EGA `EGAS00001006816` + Zenodo `10048057` |
| **Krishna 2021 ADAPTeR ccRCC IO [v]** | ADAPTeR | ccRCC nivo pre/on/post | WES + WGS | scRNA + scTCR + mIF | 6 | in-progress | CELLxGENE `3f50314f`（Krishna Cancer Cell 2021）；EGA `EGAS00001005188` 锁 WGS/WES |
| **Wu 2021 乳腺 Visium [v]** | standalone | breast ER+ / HER2+ / TNBC | WES (controlled) | scRNA + Visium 子集 | 26 | downloaded | GEO `GSE176078` |

`[v]` = 已在 vault topic YAML。state 反映 2026-06-05 status.tsv 加每队列 MANIFEST.yaml。被替代的 `tietscher-2023-breast-imc` 行保留在原位但标 `blocked`，由紧接其下的 `tietscher-2023-breast-imc-bodenmiller` 替代。

## 缺口，一段话讲完

最大的病人数缺口都是 *结构性* 的，不是操作性的。**HTAN HTA6 Duke DCIS（828 人）**、**HTA3 BU 肺癌前（484）**、**HTA12 WUSTL 泛癌（295）**、**HTA7 HMS PATCH（245）**、**HTA1 HTAPP（205）** 都是 `planned` 或 `blocked`，因为 Synapse `syn20446927` fileview 在 2026-06-04 转向下需要 PAT —— 不是带宽问题。HTAN 外，缺口集中在三个 EGA-gated 的免疫治疗队列（Bassez BIOKEY 40、Liu 2022 NSCLC 35、Kim 2020 NSCLC mets 44）和两个 `blocked` Synapse 队列 —— 后者恰好是直接 HRD 上下文 —— **Launonen / Färkkilä mIF HGSOC（44）** 和 **Färkkilä 2020 TOPACIO（62）**（唯一一个公开层 niraparib+pembro trial）。今天关掉的四个（jackson、kim、greenwald、tietscher）构成 v5 → post-v5 的 delta：jackson IMC 281 人（Zenodo 开放，METABRIC 可链）、kim-2018 TNBC 化疗抗药（deep WES + scDNA + SmartSeq2，20 人）、greenwald 2024 GBM（Visium + MIBI + scRNA + scATAC，100 人）、tietscher 2023 乳腺 IMC bodenmiller 释出（被替代行的纠正版本）。换算下来，自 v5 cut 以来 **+约 400 人** 进入 downloaded 集。

## unsearched vs blocked 的分裂 —— 今天换了什么

之前那张表把所有凭证 gated 的行都塞进一个 `planned` 桶，意思就是"在 manifest 里、还没碰过"。今天的 blank-fill probe（三个搜索子 agent 分别覆盖 A / D / B+C 三桶）把这一团拆成了三种语义清晰的格子。**blocked-confirmed** 是我们真正想要的严格定义：今天已经在 EGA / dbGaP / Synapse-PAT / SCP-OAuth 各级别 probed 过，任何公开镜像都没有 —— 这些 gate 是真的。**in-progress** 是今天的惊喜：11 个队列，它们的主 accession 是 gated，但单个实验室把处理过的 h5ad 重新发布到了 CELLxGENE（或 Zenodo / Mendeley / GEO）—— 今天就能拉，不需要 DUA，一条 `wget` 就行。**unsearched** 是剩下的残渣：accession 或 PMID 撑不过基本文献核对的行，加上 paper-only 的行 —— 这些行的 deposit 要么在注册墙后（BGI/CNGB）要么在 pre-acceptance embargo 里（bioRxiv）。"尚未搜索"现在是一个一等公民的格子颜色（灰色），明确区别于"已搜索、被 gated"（红色）。

11 个新可获取的队列和它们的公开镜像：

| 队列 | 新公开来源 | 病人数 | 模态 |
| --- | --- | --- | --- |
| erickson-2022-prostate-visium | Mendeley `svw96g68dv` v3 | 11 | Visium（count 矩阵 + H&E） |
| pei-min-2025-pdac-autopsy | GEO `GSE274557` + `GSE277782` | 13 | Visium（57 样本）+ CosMx-SMI（7 样本，1000-plex） |
| htan-hta1-htapp | CELLxGENE `a96133de` + Zenodo `4479018` | 205 | scRNA + Visium + ExSeq |
| htan-hta4-chop-pediatric | CELLxGENE `cee845e3` / `9ceda3d2` / `10ec9198` | 69 | scRNA + snRNA（NBL + pHGG + AML/B-ALL） |
| htan-hta8-msk-metastasis | CELLxGENE `62e8f058` + `efd94500` | 202 | scRNA（Chan SCLC + Treg） |
| htan-hta11-vanderbilt-crc | CELLxGENE `a48f5033` | 195 | scRNA + snRNA（Chen Cell 2021 HTAN VUMC） |
| htan-hta12-wustl-pancancer | Zenodo `12689994` | 295 | Visium / H&E DICOM 影像 |
| htapp-klughammer-2024-mbc | CELLxGENE `a96133de` + Zenodo `4479018` | 30 | snRNA + ExSeq + imaging |
| htan-hta8-sclc-chan-2021 | CELLxGENE `62e8f058` + Zenodo `14057537` | 21 | scRNA |
| krishna-2021-adapter-ccrcc-io | CELLxGENE `3f50314f` | 6 | scRNA（Krishna Cancer Cell 2021） |
| vazquez-garcia-2022-mskspectrum | CELLxGENE `4796c91c` + GEO `GSE180661` | 42 | scRNA（5 数据集，92.7 万细胞）+ bulk-RNA |

三类 manifest 后续动作（推到下一轮）：**dedupe 候选** —— htapp-klughammer-2024-mbc 与 htan-hta1-htapp 共享 Klughammer Nat Med 2024 的 CELLxGENE deposit；htan-hta8-sclc-chan-2021 被 htan-hta8-msk-metastasis 涵盖；A 行的 vazquez-garcia-2022-mskspectrum 与任何 D 行镜像同 CELLxGENE deposit。**accession-unverified** —— liu-2022-nsclc（manifest PMID 35020028 指向一篇德语风湿编辑评论）、magen-2023-hcc（PMID 下找不到 scRNA 论文）、wang-2025-sclc-parpi（仅 Zhang 2025 meta-analysis 接近）、hwang-2025-pdac-neural（疑为 Hwang 2022 Nat Genet PMID 35902743 误归属）、sun-2024-hcc-primary-met（无 PubMed 命中）、mskspectrum-cfdna-parpi-2025（drafted-future）。**paper-only / embargoed** —— sun-2021-hcc-early-relapse（deposit 在 BGI/CNGB，需注册）、mitri-2024-amtec-parpi-mtnbc（仅 medRxiv，HTAN OHSU 门户人工走查推后）、wu-2025-hgsoc-visium-hd（bioRxiv pre-acceptance）。

净 delta：约 1,038 病人当量今天就能恢复，不违反 2026-06-04 public-only 转向。

## 页脚

[[matched-multi-omic-tumor-table]] · [[progress-v5-2026-06-05]] · [[paired-data-pan-cancer]]
