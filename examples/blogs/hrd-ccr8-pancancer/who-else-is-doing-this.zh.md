---
title: '别人在做什么 —— 一张定位图'
date: '2026-06-03 19:57 UTC'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - positioning
  - similar-work
  - foundation-models
summary: '五个 bucket，把 "在 pan-cancer 维度做 基因组 × TME × 治疗响应" 这件事上的其他工作摆出来 —— MOSAIC（Owkin）、Bagaev BostonGene MFP、Bruand BRCA1-STING、Qiu HRD-vs-HRP、PORPOISE、DragonNet、PRECISE/TRANSACT。每个是什么、做了什么、我们差在哪。'
starred: true
---

# 别人在做什么

[[paired-data-pan-cancer]] 和 [[more-paired-data-cohorts]] 回答的是 "有哪些数据"。它们不回答 "谁还在做我们要做的事"。这一篇是那张图。

为什么要画：因为 "novelty 在哪" 是每一个 reviewer、每一个 grant officer 都会问的问题，而 "我们从没见过别人发这个" 是个糟糕的回答 —— 真实答案往往是 "我们没去找"。第二轮搜索翻出了五类可以拿来对位的工作 —— 竞争对手、机制 anchor、架构先例、方法论基础、相邻产业项目。诚实的读法是：这五类里没有哪一个解决了项目的精确问题，但好几个解决了明显相关的问题，我们对自己有义务把 "我们差在哪" 讲清楚。

## 五个 bucket

大致这样划：

1. **产业界的 pan-cancer 多模态队列。** 在病人层面建配对多模态数据的公司 / consortium。最接近 Tier 4 描述的那种 cohort。
2. **学术界的多模态病理 + omics + 结局 FM。** Mahmood 实验室那条线和相邻团队；pan-cancer 多模态生存预测模型。
3. **pan-cancer 免疫 / TME 分型方法。** 用 TME 状态做 pan-cancer 分层的方法 —— "stratifier" 这个输出位置上最直接的竞争者。
4. **HRD 特异的 TME / immune 工作。** 机制研究 + 直接观察 HRD-eTreg —— 最近的实质性先验。
5. **针对治疗响应的因果 / CATE 方法。** response head 下面的方法论基础。

## bucket 1 —— 产业 cohort

最该知道的是 **MOSAIC**（Owkin + Gustave Roussy + Pitt + CHUV + Erlangen + Charité + NanoString）。5,000 万美元。7 种癌（NSCLC, TNBC, DLBCL, OV, GBM, mesothelioma, bladder）。每个病人都是 Visium + Chromium Flex snRNA + bulk RNA + WES + H&E。目标 7,000 例；~2,500 已采；60 例在 MOSAIC-Window 放出来（EGA，controlled access）。不是 WGS —— 这会压低 HRD signature 的分辨率 —— 但它是 HTAN 联邦之外最大的配对 pan-cancer 多模态 cohort。

MOSAIC 之外还有几个：**Tempus**（xT 648 基因 + xR whole-transcriptome + 2026 推出的 xH WGS heme）、**Caris POA**（DNA + WTS + 23k 基因蛋白 + 结局，覆盖 740k+ 病人）、**Tahoe-100M**（perturbation atlas —— 形状不一样，对 drug-response branch 有用），还有一长尾的公司主张（Owkin 的 "MOTRY"/"RlearnCT" 这类产品名搜不到 peer-reviewed paper —— 标成 claim，不当 citation 用）。

这对我们意味着什么：我们不可能重建 MOSAIC。但项目形状 —— "HTAN 给 full-tuple，TCGA/HMF 给规模，Tier 2–3 搭桥" —— 正是 *没有* MOSAIC 时的答案。把 MOSAIC 当作我们没访问权限的 comparator cohort，依靠搭桥逻辑。

## bucket 2 —— 学术多模态 FM

**PORPOISE**（Chen 2022, Cancer Cell —— Mahmood 实验室）是最近的发表过的架构先例。Pan-cancer，14 种 TCGA 癌型，attention MIL 融合 WSI + bulk RNA + 突变 + CNV，预测生存，patch 级 attribution。围绕 PORPOISE 的 Mahmood 生态 —— UNI, CONCH, TANGLE, MUSK, MADELEINE, PathChat, KEEP —— 给了你一整套病理 encoder 栈，可以插进来而不用从头训。**MCAT**（Chen 2021, ICCV）是 "path × omics 用 cross-modal attention" 这件事的起源。**SurvPath**（Jaume 2024, CVPR）把 pathway 拿来 tokenize，让 WSI patch × pathway token 跑 attention —— 拿来当我们 MoE expert 的 ablation 很合适。**HEALNet**（Hemker 2024, NeurIPS）是 "现实 cohort 里不是每个病人都有全套模态" 这件事最实在的方案。

我们差在哪：PORPOISE 是 *预后*（survival），不是 *预测*（treatment effect）。它用 bulk 基因组，不用 WGS scar 也不用 spatial。也没有 MoE —— 它就是一个融合 embedding。WGS scar 特征 + spatial + DragonNet CATE + MoE archetype，这个组合才是缺口。

## bucket 3 —— pan-cancer 免疫 / TME 分型

直接竞争在这一格里。**BostonGene MFP**（Bagaev 2021, Cancer Cell）是这个领域的 canonical pan-cancer TME 分型 —— 一个 29 基因 ssGSEA 把 20+ 癌种归到 4 个 conserved subtype（IE / IE-F / F / D），预测 ICI 响应。**EcoTyper**（Newman/Steen/Luca 2021, Cell）把 bulk + scRNA 分解成 cell state 和反复出现的 "ecotype"。**Thorsson 2018**（TCGA Pan-Immune Working Group）给这个领域第一个 6 类 pan-cancer 免疫分型，跑在 10k TCGA 上，是 `knijnenburg-2018`（我们 vault 里那篇 DDR 的）的免疫姊妹篇。**Charoentong TCIA** 打包了 Immunophenoscore 做 pan-cancer ICI 预测。

这几个里，Bagaev MFP 是我们必须 benchmark 的那个。它是 bulk-only（没有基因组轴、没有 spatial、没有因果 head），但发表过、被验证过、被引用得够多，"我们在 response 预测上打过 MFP" 是个干净的 claim。差异化很具体：MFP **没有任何基因组输入**。我们的 genomic encoder 吃的是四个 scorer 的 HRD concordance vector（[[hrd-is-computable]]）+ 拷贝数 signature + HR 基因状态。这就是 MFP 看不见的那个轴。

## bucket 4 —— HRD 特异的 TME / immune

这格里有两个发现比其他的更要紧。

**Bruand 2021**（Konstantinopoulos 实验室, Cell Reports）显示 BRCA1 缺陷的卵巢癌有 **细胞自主的 STING 驱动炎症**，同时上调 VEGF-A 驱动免疫抵抗；STING 敲除恢复双 ICB 响应。这正是 [[outcome-first]] 里被一笔带过的 "HRD → STING → IFN → 免疫抵抗" 这座桥的机制 anchor。它应该被放在最前面引，不是塞在角落里。

**Qiu 2024**（Adv Sci）距离我们尴尬地近。他们对 5 例 HRD 和 3 例 HRP HGSOC 做了 scRNA + scTCR，然后发现的东西正是我们预期的：HRD 肿瘤富集 FGFR1+PDGFRβ+ myCAFs、M1 巨噬细胞、**tumor-reactive CD4+ Treg**。最后那一类正是 CCR8 eTreg 的故事。N 是 8。癌种只是卵巢。framing 是描述性的。最接近的竞争性读法是：Qiu 在细胞层独立证实了 "HRD 里有 CCR8-eTreg" 的 pattern，而我们是 pan-cancer + treatment-causal 的扩展。我们应该引它，不是假装它不存在。

这一格里还有：**Drews 2022 CIN signatures**（Markowetz, Nature）—— 17 个拷贝数 signature 跑在 7,880 个肿瘤、33 癌种上，预测药物响应。是 Macintyre 2018 的 pan-cancer 扩展。这是 genomic encoder 里跟 SBS3 并列的自然输入特征。

## bucket 5 —— 因果 / CATE 方法

项目实际上已经隐含使用的架构基础。**DragonNet**（Shi 2019, NeurIPS）是 CATE head 的命名来源 —— 共享 trunk + propensity head + outcome head + targeted regularization，做观察数据的 treatment effect。**X-learner**（Künzel 2019, PNAS）是 treated/control 不平衡（PARPi cohort 因选择 bias 一定不平衡）时的标准 baseline。**PRECISE**（Mourragui 2021）和它的非线性后继 **TRANSACT** 是细胞系到病人的 drug-response transfer 方法，让项目里 "用 PRISM/GDSC 的 PARPi 敏感性来 anchor response head" 这件事在方法论上站得住。**DeepCDR** 是多组学药物响应的 baseline。**TARNet**、**Causal Forests**、**DeepIV** 属于 related work 一段里要点到的。

这些不是竞争对手。它们是基础。framing 应该是 "我们把 DragonNet 扩展到多模态癌症基因组输入 + MoE routing"。引用，不要试图差异化。

## 这一轮最该读的五篇

如果只读五篇：

1. **Bagaev 2021 MFP** —— 直接竞争者；要 benchmark。
2. **Bruand 2021 BRCA1-STING** —— 机制 anchor；放在最前面引。
3. **Qiu 2024 HRD-vs-HRP TME** —— "HRD 里有 CCR8-eTreg" 的独立证实。
4. **Chen 2022 PORPOISE** —— 最近的架构先例。
5. **MOSAIC（Owkin）** —— 我们访问不到但必须对位的 comparator cohort。

## 差异化，每个一句

- **vs Bagaev MFP**：bulk-only，29 基因 ssGSEA，没有基因组轴。我们加 WGS scar × scRNA cell state × spatial × DragonNet CATE。
- **vs Bruand**：机制小鼠 + 小人 cohort。我们是 population-scale、pan-cancer、treatment-causal 的扩展。
- **vs Qiu**：8 个病人，卵巢，描述性。我们是 pan-cancer、N 上千、带 treatment effect head。
- **vs PORPOISE**：path + omics → 生存（预后）。我们是 path + WGS + RNA + sc + spatial → PARPi CATE（预测），MoE 做 archetype。
- **vs MOSAIC**：他们赢在配对 cohort 规模。我们赢在 HRD 基因组轴 + 公开数据上的 treatment causality。我们不是在 cohort 大小上竞争，是在问题形状上竞争。

## 我们 *不* 是

值得明说：

- 我们 **不是** 一个病理 FM。UNI / CONCH / Virchow 存在；我们用它们。
- 我们 **不是** 一个 pan-cancer 免疫状态分型器。MFP / EcoTyper / Thorsson 存在；我们 benchmark 它们。
- 我们 **不是** 一个机制性 HRD-免疫学论文。Bruand / Qiu / Färkkilä 在做这事；我们引它们。
- 我们 **不是** 一个单细胞 atlas。HTAN / HCA / CellxGene 在做；我们消费它们。

我们 **是**：pan-cancer，配对多模态（WGS + RNA + sc + spatial + clinical），HRD-as-feature（[[hrd-is-computable]]），treatment-causal（[[outcome-first]]），搭桥 tier（[[paired-data-pan-cancer]]），MoE 路由 archetype（[[one-model-many-archetypes]]）。组合是贡献，不是任何单一组件。

## 对项目的三个具体动作

这张图能落到三件事上：

1. **把 top 5 加进 vault，放在最前引。** Bagaev、Bruand、Qiu、PORPOISE、MOSAIC —— 以后任何 positioning 段落都该从这几个名字起。
2. **规划一次 MFP benchmark。** 把 Bagaev 的 4 类标签盖在我们第一个跑的 pan-cancer cohort 上，报对比。"HRD × IFN/eTreg 在 IE/IE-F/F/D 之外加分辨率了吗" 就是可证伪的检验。
3. **methods 段引 DragonNet / PRECISE / TRANSACT。** 不是差异化 —— 是基础。漏引会显得我们没读过。
