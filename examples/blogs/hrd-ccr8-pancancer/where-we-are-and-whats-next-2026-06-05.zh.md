---
title: '我们在哪、要去哪 —— 语料库从"收集"转向"分析"的拐点'
date: '2026-06-05'
topics:
  - hrd
  - ccr8
  - pan-cancer
  - data-strategy
  - analysis-roadmap
summary: '项目刚刚跨过一个拐点。语料库组装在功能上已经完成（48 队列、约 12,600 病人当量、TCGA 泛癌底座、首条 HRD 读出覆盖 14,199 病人、首条 CCR8 读出覆盖 11 个新入库队列）。这篇文章解释我们手上有什么、这两条读出在说什么、以及把这个语料库推到 (HRD-high × CCR8-eTreg-high) 交集（也就是未来 PARPi + anti-CCR8 临床试验的根基）的三层执行计划。'
starred: true
---

# 我们在哪、要去哪 —— 语料库从"收集"转向"分析"的拐点

## 拐点

昨天，项目的瓶颈在数据组装：找 accession、对付凭据、拆解 paper-mis-ID、判断哪一个 Synapse 图谱对应哪一篇论文。今天，瓶颈在分析：把语料库转成一个 *跟临床试验直接相关* 的交集。这个转向不是某一个事件造成的，是几件事的累积效应 —— 把 **TCGA 泛癌** 作为底座入库（10,585 名病人带预计算的 Knijnenburg HRD 分数），通过 CELLxGENE / Zenodo / GEO / Mendeley 这些替代渠道拉到 **11 个新队列**（这些队列的主 accession 是 gated 的，但实验室单独把处理后的 h5ad 重新发布过），并把 **BIOKEY** 加为项目的 treatment-causal 范例（R/NR + Pre/On + expander/non-expander 标签完整）。

四个 papermap PR（#4–#7）承载了这次拐点：#4 把 TCGA 作为 HRD 脊柱入库，#5 一次清扫 8 个 CELLxGENE 镜像的 HTAN 子图谱 + Vázquez-García + Erickson + Pei-Min + Krishna，#6 增加了两个 Synapse-PAT 的 partial（Launonen、HMS-Sorger），#7 把格子级 processed-genomic backbone 拼到了 33 个队列上。这四个 PR 排入队后，语料库就从"可发现性地图"变成了"操作型 manifest"。

## 盘上有什么

语料库沿用 [[matched-multi-omic-tumor-table]] 的四桶 schema：A = sc/snRNA + 基因组、B = spatial 转录组 + 基因组、C = spatial 蛋白组 + 基因组、D = 多 spatial / TCGA 锚定的 full-tuple。75 行 manifest 现在解析得很干净：

| state | 数量 | 含义 |
| --- | --- | --- |
| downloaded | 44 | 在盘上、主轴完整 |
| partial | 6 | 在盘上但一个主轴仍缺 |
| in-progress | 0 | 已清空 —— 可拉取的镜像全部入盘 |
| blocked | 15 | 已在 EGA / dbGaP / Synapse-PAT / SCP-OAuth 级别 probe 过，没有公开镜像 |
| unsearched | 10 | accession / PMID 尚未核实 |
| **总计** | **75** | |

结构性缺口现在是政策问题，不是带宽问题。在 2026-06-04 的 public-only 转向下，每一个 gated 行都是出于明确原因被 gated 的：HTAN Network team 成员资格（HTA3、HTA5、HTA6、HTA7、HTA9、HTA10、HTA12）、TOPACIO DUC、EGA DAC（Maynard、Kim 2020、Stewart、Couturier、Owkin MOSAIC），以及 Liu-2022 NSCLC 和 Magen-2023 HCC 这两个连有效 accession 都查不到的。

针对这个语料库已经产出了两条分析读出，它们正是让拐点变得 *可见* 的原因：

**HRD 轴覆盖 14,199 名病人。** TCGA 泛癌 + cBioPortal HRD studies + METABRIC 合起来给出了 14,199 条配对 HRD 读数：其中 8,775 带完整的 bulk-RNA + MC3 + 临床三联体，5,804 跨 12 个 cBioPortal HRD studies 经 Knijnenburg 评分，再加上 METABRIC HR-gene 严格代理（4.1%）和 TCGA-BRCA Knijnenburg 背景（19.1%）。各癌种排序精确复现 Knijnenburg 2018 Fig 1：OV 约 56% HRD-high、BRCA 约 19%、PRAD 约 1%。cBioPortal + Knijnenburg 通过同癌种投射（`brca_tcga_pan_can_atlas_2018`、`ov_tcga_pan_can_atlas_2018`、`paad_tcga_pan_can_atlas_2018` 加 11 个其他）把 processed-genomic backbone 给了 33 个 single-cell 队列。

**CCR8 轴覆盖 11 个新入库队列。** BIOKEY 在 CD4_REG Treg 中 22.65%（n=1,965，40 名病人）位居榜首，Krishna ADAPTeR ccRCC 20.07%（n=2,491，published label）和 HTA8 MSK Metastasis 6.25%（n=1,360，published Treg label，SCLC + PDAC + CRC mets 混合）紧随其后。CELLxGENE deposit 的伪迹也浮上来：Vázquez-García MSK SPECTRUM HGSOC 读出 0.00%，是因为 CCR8 在 deposit 的 var 里被过滤掉了；CosMx 1,000-plex panel（Pei-Min、Denisenko）则根本不包含 CCR8。这些零读不是生物学，是 inventory 问题。

## 这两条读出在说什么

把 BIOKEY 走通端到端，能让分析流水线变得具体。BIOKEY 是 BIOKEY anti-PD-1 乳腺癌队列（Bassez 2021），40 名病人，带 R/NR + Pre/On treatment 轴，BRCA1/2 状态在 MOESM3 supp：

1. TCGA-BRCA 底座说，在 Knijnenburg HRD-sum 阈值下，乳腺癌大约 **19.1% 为 HRD-high**。METABRIC HR-gene 严格代理（4.1%）是下界；BIOKEY-like 乳腺癌的群体估计就落在这两者之间。
2. BIOKEY 的 per-cell CCR8 quant 说 **CD4_REG Treg 中 22.65% 为 CCR8+** —— 这是在实际 h5ad 上算出来的，n=1,965 个 Treg。
3. 在"HRD 状态与 CCR8-eTreg 密度在队列层面大致独立"的假设下，队列层面 joint-high 估计是 **22.65% × 19.1% ≈ 4.3%**，也就是 BIOKEY 40 名病人里约 4.3% 落在 (HRD-high × CCR8-Treg-high) 桶里。这就是临床试验设计的靶子：高 HRD 且 CCR8-eTreg 高浸润的肿瘤，是 PARPi + anti-CCR8 的假设响应者。
4. 这是 **队列层面** 的估计，不是病人层面的配对。严格的个体层面配对需要下面 Tier 2 / Tier 3 的工作 —— sc 分辨率的 HRD imputation 对每病人 CCR8 eTreg 比例，BIOKEY MOESM3 的 BRCA1/2 状态作为锚点。

BIOKEY 里 expander 与 non-expander 的差异信号（Pre-Tx Expander 21.92% vs Non-expander 19.48%，CD4_REG Treg CCR8+ 比例上 +2.45 pp）暗示 CCR8 阳性方向是响应者方向，但幅度小。要做到 *确定性*，需要 sc 分辨率。

## 三层执行计划

**Tier 1 —— 队列层面的交集（现在开始，约 1 天）。** 不做新数据工作。用盘上已有的：每队列 Treg 中 CCR8% 来自 qc_card，每癌种 HRD-high 流行率来自 TCGA-Knijnenburg。产物落在 `logs/intersection_tier1_20260605/` 下的 master TSV，一行一队列：cohort、cancer type、N、CCR8+ in Tregs、HRD-high %（TCGA 锚定）、joint-high 估计、按队列 N 给的 95% CI。输出：第一张跨队列 joint-high 流行率表 + forest plot。作为队列层面的结果可独立发表，跟 Tier 2/3 解耦。Tier 1 **不等** 后面两层。

**Tier 2 —— 标准化 sc QC（并行进行，约 3–5 天）。** 在 11 个新入库队列 + Pal 2021 + Lambrechts 2018 上跑 Scanpy 流水线：MT% / gene-count / scrublet doublet / log-norm + HVG。用 CellTypist 统一细胞类型标签（Immune_All_Low + Tumor_Immune，按适用范围），让 Treg 调用脱离对作者 label 的依赖。跨队列统一病人元数据 schema（cancer / treatment / response / BRCA1/2 / HRD score，凡是有的）。这一层让队列之间真正 *可比*，是 Tier 3 的前置条件。

**Tier 3 —— 跨队列整合（第二周）。** 用 scVI 或 Harmony 对 Tier 2 已 QC 的队列做跨队列整合 → 每细胞 CCR8+ Treg 调用 × 每病人 HRD 分数（无 per-patient 基因组的癌种用 Knijnenburg backbone，有 WGS/WES 的用 scorer 集合）→ 个体层面的 (HRD-high × CCR8-eTreg-high) 交集分析。这是这篇 paper 的 headline。

三层并行：Tier 1 单独在 critical path 上，Tier 2 + Tier 3 与之并行，因为 Tier 1 已经可以单独产出一个可发表的队列层面结果。

## 警示与未决问题

- **五个队列卡在正式申请下。** HTAN Network team 覆盖 HTA3 / HTA5 / HTA6 / HTA7 / HTA9 / HTA10 / HTA12；TOPACIO 需 Data Use Certificate；Liu-2022 NSCLC、Maynard、Kim-2020、Stewart、Couturier 需 EGA DAC。草稿已写，审批等待中。这些都不在 Tier 1 的 critical path 上。
- **R-scorer 安装仍在跑。** CHORD / HRDetect / scarHRD 安装仍在用户终端中进行。在它落地之前，四 scorer 的 concordance vector（[[hrd-is-computable]]）只能退化为 Knijnenburg-only。
- **CellTypist 覆盖不均匀。** 一些 HTAN h5ad 用 Cell Ontology ID 而不是作者标签；Treg 调用会优雅退化，但 eTreg 子调用在这些行上更脆弱。Tier 2 会把这一层抹平。
- **响应者方向的故事需要 sc 分辨率。** BIOKEY 的 +2.45 pp expander 信号是真的，但幅度小；ADAPTeR 的 pre/on/post 结构可能带更多信号，但 n=6。

## 为什么这件事重要

如果 (HRD-high × CCR8-eTreg-high) 流行率在 breast / ovarian / pancreatic / prostate 之间能稳定在约 4%，按 SEER 发病率推算约为 **每年 40 万美国病人**。这个规模对一个二期 niraparib + anti-CCR8 试验足够大；同时小到必须用多模态分层器（sc + spatial + 基因组 + 临床）才能在前瞻性入组中找到。那个分层器，就是这个语料库、这条 HRD 轴、这条 CCR8 轴存在的理由。
