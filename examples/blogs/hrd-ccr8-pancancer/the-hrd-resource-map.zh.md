---
title: 'hrd 资源地图——六类公共证据，按导航需要重新归档'
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
summary: '本文是 [我们手上能用的数据](the-data-we-have-to-work-with.zh.md) 的姊妹篇。那一篇按时间顺序把九层证据串成叙事，这一篇则按 *资源家族* 重新归档，目的是让项目能"以问题为索引"而不是"以论文为索引"地查阅证据。六大家族包括：（1）真实世界临床—基因组登记库，提供 HRR 突变 + 临床结局，规模可达诊所量级（GENIE / BPC / MSK-CHORD / FMI-Flatiron / ORIEN）；（2）PDX 与类器官生物库，提供逐模型的 HRD 基因型 + PARPi 敏感性（PDMR / HCMI / EurOPDX / Sachs / Hill / Bruna / Tiriac）；（3）可编程查询的单细胞 + 空间数据枢纽（CellxGene Census / TISCH2 / 3CA / 10x Xenium Prime 5K）；（4）IFN 调控 MHC-II 真正运行其上的表观基因组层（TCGA 450k、Corces 2018 ATAC、ENCODE BRCA1/2 细胞系、Roadmap、GTEx ATAC）；（5）可纵向监测 HRD 状态的液体活检 / ctDNA / MRD 层（TRACERx-lung Abbosh 2023——除此之外几乎无可用资源）；（6）HRD 功能性评分方法与对照基准（HRDetect / scarHRD / ovaHRDscar / DeepHRD / HRProfiler / SigMA / RAD51-IF 以及彼此之间的对比研究）。每个家族配一张速查表。结尾给出一张 aim→资源 矩阵，把项目的七个目标精确映射到回答它们的资源上。'
starred: true
---

上一篇博客 [我们手上能用的数据](the-data-we-have-to-work-with.zh.md) 按九个章节、逐层铺陈了与 HRD 相关的公共证据。那种结构适合 *阅读*，但不适合 *查找*。当项目的分析计划提出"BRCA-WT 的类器官 PARPi IC50 在哪里查？"或者"哪里能在统一 schema 下泛癌检索 CCR8⁺ Treg 比例？"——这时候，段落叙述就成了错误的索引。

这篇博客就是那个索引。六个资源 *家族*，每族一张速查表，最后再加一张 aim→资源 的矩阵。叙事归叙事，留在另一篇里；这一篇只为查阅而存在。

## 家族一——真实世界临床—基因组登记库

诊所量级的那一轴。HRR 基因 panel 的检出 + 治疗线 + 临床结局，规模上比任何临床试验队列都高出若干数量级。代价是：仅 panel（不是 WGS）、HRD 判定质量参差，而最深的商业数据集（FMI-CGDB）需要通过赞助商门户审批。

| 资源 | 类型 | HRD 分层 | 治疗信息 | 访问方式 | 锚定文献 |
|---|---|---|---|---|---|
| **AACR GENIE v19** | 登记库 | 各中心 HRR panel | 主表少；BPC 完整 | 开放——Synapse + cBioPortal | Project consortium 2017+ |
| **GENIE BPC** | 精选队列 | HRR panel | 完整 PRISSMM 方案 + RECIST/OS | Synapse DUA | Lavery 2024 |
| **MSK-CHORD** | 单中心队列 | MSK-IMPACT HRR | NLP 协调后的 PFS/OS | cBioPortal `msk_chord_2024`；dbGaP phs002995 | Jee 2024 Nature |
| **FMI-Flatiron CGDB** | 商业登记库 | F1CDx HRR + LOH + HRDsig | Flatiron EHR 全量 + OS | 赞助商门户 | Singal 2019 JAMA |
| **ORIEN AVATAR** | 多中心联盟 | WES → 可推 BRCA + HRDsum | 纵向 EHR | 联盟审批 | Dalton 2018 |
| **MSK-IMPACT** | 平台锚 | BRCA + HRR panel | 旗舰队列中无 | cBioPortal `msk_impact_2017` | Zehir 2017 |
| **MSK-MET** | 转移景观 | HRR panel | 仅转移部位 | cBioPortal `msk_met_2021` | Nguyen 2022 |
| **Foundation HRDsig** | Panel 签名 | F1CDx 瘢痕 | 仅论文 | 开放论文 | Newberg 2023 JCO PO |
| **Tempus HRD-DNA/RNA** | 商业配对 | Tempus HRD-DNA + HRD-RNA 分类器 | 验证集中无 | 赞助商门户 | Stover 2022 BMC Cancer |
| **OncoTree** | 分类法 | n/a | n/a | 开放——oncotree.mskcc.org | Kundra 2021 |

**实操切入点。** 想算 HRR 突变流行率分母，用 GENIE 主登记库；想看 PARPi/铂类的结局臂，用 GENIE BPC；想做单中心最深的 PARPi-OS 分析，用 MSK-CHORD；想在联盟规模上拿到 WES + RNA-seq + 结局配对，用 ORIEN；想要商业级规模、能写赞助商提案的，FMI-CGDB。

**坦白说存在的空缺。** 并不存在所谓的 "MSK-IMPACT 10 万例" 队列论文；ChinaMAP 是代谢人群参考库，不是肿瘤登记库。坊间常说的 "MSK-IMPACT 47k" 后续，其实是机构内部元数据，并未作为队列正式发表。

## 家族二——PDX 与类器官生物库

跨越 CCLE 细胞系的功能性层。每个模型有 HRD 基因型，每个 PDO 有体外 PARPi IC50，部分库还附带体内 PDX 响应。这是项目能直接问 "BRCA-WT 但功能性 HRD 的类器官也会被 PARPi 杀死吗" 而不必等待患者队列的地方。

| 资源 | 类型 | HRD 分层 | PARPi 读出 | 访问方式 | 锚定文献 |
|---|---|---|---|---|---|
| **PDMR (NCI)** | PDX + PDO + PDC + CAF | 每模型 WES 测 BRCA1/2/PALB2/RAD51C | olaparib + niraparib IC50（PDC 子集） | 开放浏览，取材需 MTA | NCI ongoing |
| **HCMI** | 下一代肿瘤模型 | 每模型 GDC 协调后的 WGS/WES | 中央无（空缺） | 通过 ATCC 开放 | NCI/CRUK/Sanger/HUB |
| **EurOPDX** | 18 机构 PDX 网络 | 每模型突变 + CNA + RNA-seq | 各机构体内 | 开放浏览，成员 MTA | Byrne 2017 / Dudová 2022 |
| **Sachs 2018 — HUB 乳腺 PDO** | PDO 生物库 | 每 PDO BRCA1/2 + WGS-HRD | 每 PDO olaparib IC50 | HUB MTA | Sachs 2018 Cell |
| **Hill 2018 — D'Andrea HGSOC PDO** | PDO 生物库 | 功能性 HR（RAD51 灶 + 复制叉） | olaparib/niraparib/CHK1i/ATRi IC50 | DFCI MTA | Hill 2018 Cancer Discov |
| **Bruna 2016 — Caldas 乳腺 PDTX/PDTC** | PDTX + PDTC | BRCA1 胚系 + BRCA1 甲基化 + 53BP1 病变 | 每 PDTC olaparib IC50 | EGA EGAS00001001913 | Bruna 2016 Cell |
| **Tiriac 2018 — PDAC PDO** | PDO 生物库 | （库内无 BRCA 突变） | 5 种化疗 + olaparib 子集 | 通过 CSHL/HUB 开放 | Tiriac 2018 Cancer Discov |
| **Kopper 2019 — HUB 卵巢 PDO** | PDO 生物库 | 每 PDO HRDsum + BRCA + olaparib IC50 | olaparib + niraparib IC50 | HUB MTA | Kopper 2019 Nat Med |
| **Driehuis 2019 — PDAC PDO** | PDO 生物库 | 每类器官 HRR 基因型 | 76 化合物 + olaparib IC50 | HUB MTA | Driehuis 2019 PNAS |
| **van de Wetering 2015 — CRC PDO** | PDO 生物库（方法学框架） | 每类器官基因型 | 83 化合物 IC50 | HUB MTA | van de Wetering 2015 Cell |

**实操切入点。** 想要单类器官分辨率上最干净的 "功能性 HRD + PARPi IC50" 配对，用 Hill 2018；想要 BRCA-WT 功能性 HRD 的乳腺模型，用 Sachs 2018；想在平台层面做泛癌交叉验证，用 PDMR。

**坦白说存在的空缺。** Tiriac 的 PDAC 库里没有典型的 BRCA1/2 失功突变体——它 *提出* 的是非 BRCA PARPi 响应信号这个问题，但并不能 *回答* 它。HCMI 没有中央化的药物筛选。

## 家族三——单细胞与空间数据枢纽

可编程查询的那一轴。这里项目可以用一次 API 调用，跨数百名供者、统一 schema 地拉到数以千计的细胞，而不必逐篇论文去整合数十个 GEO 沉积。这些枢纽都不会原生地按供者标注 HRD 状态——这一层门控由项目在下游补——但细胞类型 + 组织分辨率它们都给齐了。

| 资源 | 类型 | HRD 分层 | 治疗臂标签 | 访问方式 | 查询接口 |
|---|---|---|---|---|---|
| **CellxGene Census** | 可编程枢纽（约 7,500 万人类细胞） | 否（仅 disease + tissue + donor_id） | 混合 | 开放 | `cellxgene-census` Python + R，SOMA/TileDB |
| **TISCH2** | 肿瘤 scRNA 枢纽（190 数据集，约 600 万细胞） | 否 | 明确标注 IO 治疗臂 | 开放 | 各数据集 h5ad/Seurat |
| **3CA** | 精选肿瘤细胞图谱（124 数据集，2,836 样本） | 否（仅癌种） | 各研究自带 | 开放 | 各研究 .rds/.h5ad，附协调后的 MP 标签 |
| **10x Xenium Prime 5K** | 厂商空间 panel（HGSOC + 乳腺 FFPE） | 否（厂商演示） | 未治疗演示 | 开放 | h5/AnnData/zarr |
| **HuBMAP** | 健康空间 + sc（5,032 数据集，27 器官） | 否（健康参考） | n/a | 开放 + EGA 受控 | HuBMAPR + 搜索 API |
| **Tabula Sapiens v2** | 健康参考（114 万细胞，28 组织） | 否 | 健康供者 | 开放 | 也在 Census 中 |
| **GTEx single-cell** | 健康 snRNA（8 组织，20.9 万核） | 否 | 健康 | 开放 | 门户 + Census |

**实操切入点。** 想 "一次调用就把所有 HGSOC scRNA 以统一 schema 拉下来并打 eTreg 签名分"，用 CellxGene Census；想要预先标注好治疗臂的 IO 治疗队列（Yost、Bi、Sade-Feldman、BIOKEY），用 TISCH2；想跨癌种给恶性细胞打 IFN-α/γ meta-program 分，用 3CA；想要厂商级 HGSOC + 乳腺空间对照、panel 上同时带 CCR8 / MHC-II / ISG 标志物的，用 Xenium Prime 5K。

## 家族四——表观基因组（甲基化 + 染色质）

IFN 桥之下的机制层。BRCA1 启动子甲基化作为 HRD 驱动；CIITA pIV 可及性作为 IFN-γ → MHC-II 的开关；IFN 位点的染色质状态。这是项目用来检验 HRD 肿瘤 *为何* 会跑慢性 IFN 程序——而不仅是 *跑了* 这件事——的地方。

| 资源 | 类型 | HRD 分层 | 能回答什么 | 访问方式 | 锚定文献 |
|---|---|---|---|---|---|
| **TCGA HM450k 泛癌** | 甲基化（10k 肿瘤，33 类型） | BRCA1 启动子 beta，可与 HRDsum 配对 | "BRCA1 甲基化在某癌种里是否是 HRD 驱动" | 通过 GDC 开放 | TCGA Pan-Can 2018 |
| **Corces 2018 — TCGA 泛癌 ATAC** | bulk ATAC（410 肿瘤，23 类型） | 样本与 HRDsum 匹配 | "CIITA / IFN 位点在 HRD 肿瘤里是否可及" | 通过 GDC 开放 | Corces 2018 Science |
| **Roadmap Epigenomics** | 111 个参考表观基因组 | n/a（健康基线） | 正常组织染色质基线 | 开放 | Kundaje 2015 Nature |
| **ENCODE BRCA1/2 细胞系 ATAC + ChIP** | 细胞系染色质（MCF7、HCC1937、UWB1.289、Capan-1 等） | 近等基因 BRCA1/2 与 WT 对比 | 细胞系层面的机制 | 开放 | ENCODE consortium |
| **Granja 2021 — 泛癌 scATAC** | scATAC 参考 + ArchR | 无 | 细胞类型分辨率的可及性 | 开放（GSE139369） | Granja 2021 Nat Genet |
| **GTEx v9 ATAC** | 正常组织 bulk ATAC（约 400 样本） | n/a（健康基线） | 肿瘤 vs 正常的 delta | 开放 | GTEx Consortium |
| **Ma 2020 — SHARE-seq** | scATAC + scRNA 配对方法锚 | n/a | 配对模态的技术参考 | 开放（GSE140203） | Ma 2020 Cell |
| **GEO HRD 甲基化沉积** | GSE65820 / GSE233242 / GSE211692 | 各沉积自带 HRD 标签 | TCGA-450k 的离散队列补充 | 通过 GEO 开放 | 各沉积 |
| **Polak 2017 — BRCA1 甲基化 HRD** | 论文锚 | 是（WGS + 450k 配对） | "BRCA1 甲基化与 BRCA1 突变 HRD 表型一致" | 开放 | Polak 2017 Nat Genet |
| **Bell 2011 — TCGA-OV** | 论文锚 | 是（HGSOC HM27/HM450） | TCGA-OV BRCA1 甲基化亚型 | 开放 | TCGA Research Network |
| **CIITA pIV / IFN-γ** | 机制综述 | n/a | IFN-γ → MHC-II 的分子接口 | 开放 | Wright-Ting 2006 |
| **Axelrod 2019 — 肿瘤 MHC-II** | 综述 | n/a | 乳腺/黑色素瘤中的肿瘤细胞 MHC-II | 开放 | Axelrod 2019 CCR |

**实操切入点。** 想做 BRCA1 甲基化作为 HRD 驱动的那条轴，用 TCGA-450k × GerkeLab HRDsum；想看 HRD 分层 TCGA 肿瘤中 CIITA 启动子的可及性，用 Corces 2018；想追溯背后的细胞系机制，用 ENCODE BRCA1/2 细胞系 ATAC。

**坦白说存在的空缺。** 没有泛 TCGA 的 EPIC v2，没有泛 TCGA 的 WGBS。EPIC 级别的甲基化只在 HMF / ICGC-ARGO 的子集里，无法替代 TCGA。

## 家族五——液体活检 / ctDNA / MRD

治疗下的纵向轴。坦白讲：在公共沉积层面，这个家族基本是空的。Hartwig 没有血浆臂；关键的 PARPi 试验 ctDNA 队列（PROfound、MAGNITUDE、PROpel）由赞助商把控。唯一的 Tier-A 公共沉积是 TRACERx-lung——组织 + 血浆配对——它不是 PARPi 队列，但是项目应该参照的 *方法学模板*。

| 资源 | 类型 | HRD 分层 | 治疗信息 | 访问方式 | 锚定文献 |
|---|---|---|---|---|---|
| **TRACERx 肺 — Abbosh 2023** | 连续血浆 + 组织 WES | 组织来源的 HRD 评分 | 辅助化疗 + 治疗前基线 | EGA EGAS00001006494 | Abbosh 2023 Nature |
| **PROfound ctDNA — Chi 2023** | 血浆 BRCA/ATM（mCRPC PARPi） | 血浆 BRCA1/2 + ATM | olaparib vs abi/enza | 赞助商（AZ + FMI） | Chi 2023 CCR |
| **MAGNITUDE ctDNA — Chi 2025** | 连续血浆 HRR（mCRPC PARPi） | HRR panel 纵向 | niraparib + abi | 赞助商（J&J + Resolution） | Chi 2025 Nat Med |

**实操切入点。** TRACERx 肺是唯一一个有公开组织 WES 配对、且与 HRD 接近的纵向血浆队列，作为方法学模板使用。PROfound + MAGNITUDE 引用其已发表的 BRCA/HRR 血浆操作点；原始数据无法获取。

## 家族六——HRD 功能性评分方法与对照基准

"该用哪种 HRD 定义" 的那一轴。项目已经有 HRDsum（Knijnenburg）、CHORD、SBS3 和 expHRD。这一族补齐了剩下的评分版图，以及在不同队列里挑方法时需要的头对头基准。

| 方法 | 输入 | 切点 | 长处 | 锚定文献 |
|---|---|---|---|---|
| **HRDsum / scarHRD** | WES/WGS 或 SNP 芯片 | ≥42（Telli/Knijnenburg） | 通用基线 | Knijnenburg 2018 + Sztupinszki 2018 |
| **HRDetect** | WGS | 分数 ≥0.7 | WGS 最佳分类器，AUC 约 0.98 | Davies 2017 Nat Med |
| **CHORD** | WGS | 概率 ≥0.5 | 随 HMF 发布；区分 BRCA1-like 与 BRCA2-like | Nguyen 2020 Nat Commun |
| **ovaHRDscar** | WGS/WES | ≥54 | HGSOC 的 PFS/OS 上优于 HRDsum | Färkkilä 2023 npj PrecOnc |
| **myChoice GIS** | Myriad SNP-based NGS | ≥42 | FDA-CDx（NOVA/PRIMA/PAOLA） | Telli 2016 CCR |
| **F1CDx LOH** | Foundation panel | ≥16%（ARIEL3） | rucaparib 的 FDA-CDx | Coleman 2017 + Hodgson 2018 |
| **Foundation HRDsig** | F1CDx panel CNV | 模型概率 | F1CDx 泛瘤继任者 | Jensen 2025 PLOS One |
| **DeepHRD** | H&E WSI | 模型概率 | 仅靠图像；补救 WGS 缺失的样本 | Bergstrom 2024 JCO |
| **HRProfiler** | WES | 模型概率 | 在 WES 上优于 HRDetect | Abbasi 2025 Cancer Res |
| **SigMA** | 靶向 panel | Sig3 似然 | 把仅 panel 的 HRD 信号从 GENIE 中救回来 | Gulhan 2019 / Polak-Park 2022 |
| **expHRD** | RNA-seq | 模型概率 | 给只有 RNA 的 ICI 队列加 HRD 调用 | Park 2024 BMC Bioinf |
| **Tempus HRD-RNA** | Tempus xT RNA | 模型概率 | 工业级 RNA-HRD 验证器 | Stover 2022 BMC Cancer |
| **RAD51-IF 焦点** | FFPE IF | RAD51⁺ geminin⁺ <10% 即 HRD | 捕获 HR 恢复 / 回复；CCNE1 扩增门控 | Castroviejo-Bermejo 2018 EMBO MM |
| **Marquard 2015** | 组分 | n/a | LOH/LST/TAI 跨癌种排序的起源 | Marquard 2015 Biomark Res |
| **Vergote 2024** | 共识 | n/a | 欧洲专家 HRD 检测共识 | Vergote 2024 EJC |

**什么时候用哪个。** 把 **HRDsum / scarHRD（≥42）** 作为 TCGA、CPTAC 以及任何 WES 数据集的通用跨队列基线。**HGSOC 臂明确改用 ovaHRDscar（≥54）**——在 HGSOC 的 PFS/OS 上它优于 HRDsum。**CHORD / HRDetect** 留给 WGS 队列（HMF、PCAWG），在那里它们能达到 AUC > 0.95。**仅 RNA 或 ICI 队列** 用 **expHRD**，再加一个 **Tempus HRD-RNA** 作为工业级 sanity-check。**仅 panel 的队列**（MSK-IMPACT、GENIE）再叠 **SigMA**。**只有 H&E 切片** 时用 **DeepHRD**。把 **RAD51-IF（功能性 HRD）** 作为正交门，捕获瘢痕分数会漏判的 HR 恢复 / 回复边缘情形——尤其是 CCNE1 扩增 HGSOC，其中约一半在功能上仍是 HRD。

## aim → 资源 矩阵

项目的分析计划设定了七个 aim（按 [我们手上能用的数据](the-data-we-have-to-work-with.zh.md) 末尾的小结所列）。下面这张矩阵把每个 aim 直接映射到最相关的家族与具体资源上。

| Aim | 问题 | 家族 | 一线资源 |
|---|---|---|---|
| **Aim 1** | 泛癌 HRD 全景 | hrd-genomics / real-world / epigenome | TCGA（Knijnenburg HRDsum）+ HMF（CHORD）+ PCAWG（SBS3）+ **TCGA-450k（BRCA1-meth）** + **GENIE v19** 算 HRR 流行率 + **MSK-CHORD** 算结局 |
| **Aim 2** | HRD → IFN/eTreg 信号 | atlas-singlecell / epigenome | MSK-SPECTRUM（HGSOC scRNA）+ Pal 2021 BRCA1+/– + Launonen/Färkkilä mIF + **Corces 2018 ATAC** + **CPTAC HGSOC/BRCA 蛋白质基因组学** |
| **Aim 3** | 签名机制 + 单基因指纹 | signatures / models | Replogle Perturb-seq + **DepMap/PRISM** + **HRDetect** + **scarHRD** + **ovaHRDscar** + **RAD51-IF** + **Hill 2018 PDO** + **Sachs 2018 PDO** |
| **Aim 4** | 泛癌定位 / 免疫原型 | atlas-singlecell / datasets | Zheng 2021 T-atlas + Combes IRIS + Chu T-stress + 3CA + **TISCH2** + **CellxGene Census** |
| **Aim 5** | 临床一致性（IO 代理） | datasets / real-world | IMvigor210 + IMmotion150/151 + Braun CM-9/10/25 + **GENIE BPC** + **FMI-CGDB** |
| **Aim 6** | 转化假设（PARPi 治疗后） | parpi-immune / real-world | Luo 2024 + TOPARP-B + GSE140996 + **TRACERx-lung 方法学** + **PROfound/MAGNITUDE 血浆操作点** |
| **Aim 7** | IO 下 CCR8 的克隆动力学 | atlas-singlecell | Yost BCC/SCC + Krishna ADAPTeR + Caushi NSCLC + Luoma HNSCC + Magen HCC + **Tay 2025 NSCLC CCR8** |

加粗条目是 Round-4 新加入的。

## 这件事对项目意味着什么

链条没变，赌注也没变——链条仍然在 [链条博客](the-chain-from-broken-dna-to-broken-t-cells.zh.md) 里，赌注仍然在 [泛癌赌注](the-pan-cancer-bet.zh.md) 里。变的是 *可读性*。Round 1–3 是机会主义地堆语料——先打锚，再补 PARPi，再补 HRD 分层的非 PARPi 部分。Round 4 把成果重新组织成一份搜索索引。先挑问题，再找家族，再取资源。

如果项目今天问 "我得下载什么，才能在带结局的泛癌队列上跑 HRDsum × IFN 签名 × CCR8⁺ Treg 比例？"——在这一轮之前，答案是 *先去把四篇博客读一遍*；在这一轮之后，答案能用一句话给出：**在 cBioPortal 上拉 MSK-CHORD，用 scarHRD 评分，用 CIBERSORTx 做去卷积，把它对 eTreg 签名做回归，同时控制总免疫浸润 + TMB + MSI**。资源在语料里，方法在签名家族里，队列在真实世界家族里。地图已经画好了。
