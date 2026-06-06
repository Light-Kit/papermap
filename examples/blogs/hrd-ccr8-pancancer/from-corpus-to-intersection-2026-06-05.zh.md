---
title: '从语料库到交集 —— 今天，项目跨过了它的第一条分析读出'
date: '2026-06-05'
topics:
  - hrd
  - ccr8
  - pan-cancer
  - intersection-analysis
  - corpus-state
  - analysis-roadmap
summary: '今天项目落地了第一条跨轴的 (hrd-high x ccr8-treg-high) 联合患病率读出，覆盖 15 个队列。luo hgsoc 13.29%、caushi nsclc 10.07%、puram hnscc 6.91%、biokey 4.33%。语料库经历了一次大规模入库（tcga 泛癌底座 + 11 个新拉队列 + biokey processed tier + 12 gb htan-hta12 影像 + 真正的 goveia 替换掉 mis-id）。qc 分成两半：30 个队列已标准化，11 个新入库的需要 tier-2 scanpy 流程。tier 1 结果今天就可发表；tier 2 + 3 在 1-2 周内解锁细胞级整合。'
starred: true
---

# 从语料库到交集 —— 今天，项目跨过了它的第一条分析读出

今天有三条线汇到一处。v6 语料库快照把入库的账目结完。"我们在哪、要去哪" 那篇随笔铺出了三层执行计划。然后 Tier-1 交集分析吐出了第一组数字。这一篇把这三条折叠成一篇。头条就是文章顶部的那张表 —— 这是项目第一次让两条轴针对同一组队列脊柱被测量出来，(HRD-high × CCR8-Treg-high) 的交集有了一个真实的、虽然初步的、prevalence band。

## tier-1 森林

先看结果。在队列级 multiplicative estimate 下的逐队列联合 high prevalence —— CCR8+ in FOXP3+ Tregs（或最接近的已发表 Treg call）从实际 h5ad / .rds 上测出，乘以 Knijnenburg-2018 TCGA 泛癌底座给出的该癌种 HRD-high prevalence —— 一共 15 个队列，两条轴都能估计的:

| cohort | cancer | joint-high % | Wilson 95% | n_patients |
|---|---|---|---|---|
| luo-2024-nant-ovarian | HGSOC | **13.29** | 5.58–28.45 | 30 |
| caushi-2021-nsclc | NSCLC anti-PD-1 | **10.07** | 2.47–33.13 | 16 |
| puram-2017-hnscc | HNSCC | **6.91** | 1.58–25.56 | 18 |
| bassez-2021-biokey | breast anti-PD-1 | **4.33** | 1.10–15.56 | 40 |
| luoma-2022-hnscc | HNSCC anti-PD-1 | 3.83 | 0.54–22.64 | 29 |
| jerby-arnon-2018-mel | melanoma | 1.53 | 0.16–13.29 | 33 |
| sade-feldman-2018-mel | melanoma anti-PD-1 | 1.30 | 0.13–11.63 | 48 |

方法，一段说清楚。`joint_high = (CCR8+ in FOXP3+ Tregs %) × (癌种 HRD-high prevalence, Knijnenburg 2018 TCGA backbone)`。两条轴在队列级别假设独立 —— 这 15 个队列里没有任何一个病人被同时打过两条轴的分，所以这是一个 multiplicative 点估计，不是 per-patient pairing。Wilson 95% CI 用 cohort n_patients 作为分母。Master TSV 在 `logs/intersection_tier1_20260605/_master_intersection.tsv`；forest plot 在 `_forest_plot.png`。

BIOKEY 的 4.33% 是锚定临床试验设计的那个队列。这 15 行里它是最干净的 treatment-causal 范例：来自 Bassez 2021 MOESM3 的 40 名 anti-PD-1 乳腺癌病人，R/NR 标签和 BRCA1/2 状态完整。一个面向前瞻性 phase-2 niraparib + anti-CCR8 试验的样本量计算，应该围绕这个队列展开。Luo HGSOC 之所以列首，是因为 OV 在 TCGA 里 HRD-high prevalence 最高（55.6%）；Caushi NSCLC 和 Puram HNSCC 排其后，是因为它们 CCR8 的原始 fraction（41% 和 68%）够高，能把 HRD floor 中等偏低的癌种也拉上来。SKCM 锚定的几个 melanoma 队列被压在 1.3–1.5%，是因为 SKCM 的 HRD floor 只有 3.4% —— 不管 CCR8 读得多高，都会被压扁。

## 我们今天怎么走到这里

Tier-1 读出坐落在一个今天上午刚刚在功能上 close 掉入库阶段的语料库之上。今天发生的事，按叙事顺序：

**TCGA 泛癌底座入库。** 1.28 GB，路径 `D/tcga-pancancer-bulk-2026/`。10,585 名病人，带预计算的 Knijnenburg-2018 HRD 分数。这是语料库 HRD-axis 的 baseline —— 上面每一条 Tier-1 multiplicative estimate 的 HRD%，最终都指回到这里的一行。

**11 个走替代路径新拉的队列。** erickson-2022-prostate-visium（Mendeley `svw96g68dv`）、pei-min-2025-pdac-autopsy（GEO `GSE274557` + `GSE277782`）、htan-hta1-htapp（CELLxGENE `a96133de`）、htan-hta4-chop-pediatric（三个 CELLxGENE collection）、htan-hta8-msk-metastasis（`62e8f058` + `efd94500`）、htan-hta11-vanderbilt-crc（`a48f5033`）、krishna-2021-adapter-ccrcc-io（`3f50314f`）、vazquez-garcia-2022-mskspectrum（`4796c91c` + GEO `GSE180661`）。一共拉了 ~78.6 GB。它们共享一个模式：master accession 被 gate 了，但实验室把 processed-tier h5ad 悄悄重新发到了 CELLxGENE 或者 Mendeley。

**BIOKEY 走 Figshare 入库。** 727 MB 的 Seurat .rds + 16 MB 的 Nat Med 增补。CELLxGENE 上的那次试探是今天的意外 —— 当 EGA 的 master 还在 gate 状态的时候，BIOKEY 的 processed tier 一直就放在一个社区上传的 Figshare 记录里。40 名 anti-PD-1 乳腺癌病人带 R/NR + BRCA 状态：项目的 treatment-causal 范例。

**HTA12 影像层。** 12.26 GB 的 DICOM，通过 `s5cmd` 从 `s3://idc-open-data/` 拉下来。需要一个更正：影像层是 21 名 PAAD 病人，**不是**之前博客里说的 295 —— 295 是整个 multi-modal atlas 的总和，单影像子集要小得多。

**bi-2021-ccrcc。** 用户手动 scp 上传，从 Broad SCP1288 走（Google 登录，不需要 DAR）。盘上 1 GB。

**真正的 Goveia 2020 NSCLC-EC。** 拉了 `E-MTAB-6308` 把之前被误标成 "goveia" 的 fetal-lung 数据替换掉。原来那份 fetal-lung-dev 单独保留在 `A/fetal-lung-dev-dual-smad/`，作为独立的一行。

**Synapse PAT 拿到并用上了。** 解锁了原计划 9 个队列里的 2 个（Launonen-2022-farkkila + hms-sorger-ovarian，合计 ~8.13 GB）。6 个 HTAN 子图谱还需要 HTAN Network team membership；TOPACIO 被 DUC gate 住。单独一个 PAT 远没有原来想象的那么有力 —— 大多数 Synapse-deposited HTAN 队列还需要 Atlas 侧的 ACL grant。

**5 个 manifest mis-ID 修复。** magen-2023-hcc 的 PMID 修正成 `37322116`（Magen Nat Med 2023）；wang-2025-sclc-parpi 作为幻觉条目删除；goveia mis-id 已处理（见上）；htapp-klughammer = HTA1-HTAPP 去重；vazquez-garcia 加上 A/D 双 bucket 标签。

Manifest 状态，今日收盘：

| state | 数量 |
|---|---|
| downloaded | 44 |
| partial | 6 |
| in-progress | 0 |
| blocked-confirmed | 15 |
| unsearched | 10 |
| **total manifest rows** | **75** |

## qc 进度

QC 实话实说是被切成三块的，不粉饰：

**30 个队列已标准化。** Phase 1–4 入库的，带完整的 `qc_card.md` 工件：cell count、mitochondrial%、doublet flag、cluster label。这些是已经可以直接进入跨队列整合、不需要再加工的行。

**11 个新入库的需要走 Tier-2 scanpy 流程。** BIOKEY、bi-2021、krishna、HTA1/4/8/11、vazquez-garcia、pei-min、erickson、HMS-Sorger。它们有 CCR8 quantification card（这就是 Tier-1 表喂进去的东西），但是没有标准的 sc QC 工件 —— MT% 过滤、scrublet doublet 调用、log-norm + HVG、CellTypist 调和的 label。Tier-2 子 agent 在写本文的时候已经在跑，输出到 `logs/sc_qc_tier2_20260605/`。

**~20 个队列 QC 最小或缺失。** 大多是被 gate 的（HTA3/5/6/7/9/10、TOPACIO、Magness-Enfield）和今天新入库的格式特殊的零散行。一部分没法 QC 是因为盘上根本没数据；另一部分（HMS-Sorger CycIF cell table、HTA12 DICOM）格式不是 sc，需要自己的 format-specific 流程。

重要的一点：**对于 Tier-1 结果，QC 的不齐性不会破坏分析。** 我们在队列汇总层级工作 —— CCR8% 来自每个队列已有的 card，HRD% 来自 TCGA 底座。Tier-2 标准化是用来解锁 Tier-3（细胞级 scVI 整合）的，不是 Tier-1 需要的。

另一项归在 QC 下值得提的进展：把每癌种 baseline 算出来的那条 HRD scoring pipeline。在 TCGA + METABRIC + Jackson 上给 14,199 名病人打了分。OV 56% → PRAD 1% 完美复现 Knijnenburg 2018 Fig 1。R-scorer 安装（CHORD / HRDetect / scarHRD）还在用户的 terminal 里跑 —— 等它落地，就可以解锁 Tier-2.5 refinement，把现在用的 HR-gene-mutation 严格代理换成 METABRIC 上 rigorous Birkbak-style 的分。

## 往前的计划

三层并行执行，能并行的全部并行：

**Tier 1 —— 今天完成。** 队列级 joint-high prevalence。本文顶部的那张表。可以作为单图结果加一段清楚的 caveats 发表。Master 在 `logs/intersection_tier1_20260605/_master_intersection.tsv`；forest plot 在 `_forest_plot.png`；逐队列的 `_status_updates.log` 已经 append 到 `_index/status.tsv`。Tier-1 不依赖任何其他东西。

**Tier 2 —— 正在跑，~3–5 天 wall-clock。** 在 11 个新入库的队列 + pal-2021 + lambrechts-2018 上标准化 sc QC。逐队列的 scanpy 流程（MT 过滤、scrublet、log-norm + HVG），CellTypist 调和的 cell-type label 让 Treg call 不再依赖作者的 label，跨队列的统一 patient-metadata schema（cancer / treatment / response / BRCA / HRD score）。输出到 `logs/sc_qc_tier2_20260605/_unified_patient_metadata.tsv`。子 agent 在飞行中。

**Tier 3 —— 第二周。** 对 Tier-2 标准化过的队列做 scVI 或 Harmony 的跨队列整合。Per-cell CCR8+ Treg score × per-patient HRD score → 个体级（不是队列级）的 (HRD-high × CCR8-eTreg-high) 交集。这是论文的头条图。前置条件：Tier-2 标准化完成、R-scorer 层装好以便在 METABRIC 上跑 rigorous Birkbak HRD。

策略上的异步项，不在 critical path 上：

- **TOPACIO DUC 申请已起草** 在 `_secrets/applications_2026-06-05/topacio_duc_draft.md`。提交决定还没下。TOPACIO 是 HGSOC 上的 niraparib + pembro —— 项目最相关的外部试验队列。
- **HTAN Network team membership 已起草** 在 `_secrets/applications_2026-06-05/htan_network_membership_draft.md`。能解锁 6 个 HTAN 子图谱、1,302 名病人。
- **5 个 EGA-gated 队列**（liu-2022、maynard、kim-2020、stewart、couturier）在 2026-06-04 公开层 pivot 下仍然被 block。如果战略收益值得官僚成本，可以单独走 dbGaP / EGA DAR；在当前 pivot 下保持 block。

## caveats

任何看 Tier-1 表的 reviewer 都该先了解的五件事：

1. **队列级独立性假设下的 multiplicative 估计。** 这 15 个队列里没有任何一个病人两条轴都被单独测过 —— Tier-3 才是产生真正 per-patient pairing 的步骤。这里的 joint-high% 是 HRD 状态和 CCR8-Treg 密度独立这一假设下的 patient-equivalent 期望分数。真实的 concordance 可能富集（如果 HRD 肿瘤会招募 CCR8 Treg）也可能贫化。
2. **癌种代理 ≠ 队列内的 HRD 分布。** Wu 的 TNBC 过抽样、Pelka 的 MMRd/MMRp 五五开、Luo 的 NACT 选样，都可能从 TCGA 泛癌的同癌种 baseline 上偏离。那几行的 Tier-1 数字继承的是 TCGA 先验，不是队列先验。
3. **CCR8 受 chemistry 干扰。** 10x 3' 相比 SmartSeq2 低报大约 2×。Vazquez-García 的 0.00% 几乎肯定是 inventory artifact —— CCR8 在 CELLxGENE deposit 的列空间里被过滤掉了 —— 不是生物学上的零。CosMx 1,000-plex panel 整体省掉了 CCR8，所以任何用 CosMx 1k panel 的 spatial-proteomic 队列读到的 CCR8 都是构造上的零。
4. **小队列上 Wilson CI 很宽**（每行 n=6–65）。队列之间的排名可解释；绝对的 joint-high 百分比有很大变动空间。
5. **Krishna ccRCC 不能映射** 到项目的 12 癌种 Knijnenburg 子集。KIRC 在 TCGA 完整 backbone 里有，但不在今天工作集里；那一行 defer 到将来一次跑里去对 Knijnenburg 完整 n=448 KIRC 切片。

这是项目第一组跨轴的数字。它们 noisy 而且 provisional。它们也是第一条真正的数据点 —— 告诉我们 (HRD × CCR8) 的交集不是空中楼阁，在能测到它的几个队列里，它落在 4–13% 之间，正好是 phase-2 stratifier 试验需要被 powered 的 prevalence 范围。
