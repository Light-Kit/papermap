---
title: '从转录组反推 HRD 和 MSI —— 把 scRNA-only 队列拉进图里'
date: '2026-06-09 16:05 CT'
topics:
  - hrd
  - msi
  - pan-cancer
  - single-cell
  - genomic-instability
  - dataset-strategy
summary: '配对的 scRNA + 基因组很稀缺（全球大概 ~200–400 个 HRD 病人）；bulk RNA + 基因组却很充裕。一个能从表达读出 HRD/MSI 的模型，能让 scRNA-only 队列带着不稳定性标签进入泛癌分析。这篇讲已有的 prior art（MSIsensor-RNA、IdentifiHR、expHRD）、设计决策（rank 特征、三 compartment 视图、leave-one-cancer-type-out 验证）、队列，以及诚实的边界。'
starred: true
---

# 从转录组反推 HRD 和 MSI

[[beyond-hrd-instability-taxonomy-2026-06-09]] 结尾留了个承诺：如果某个不稳定性状态能从 RNA 读出来，那每一个 scRNA-only 队列都能被分到图上的某个 stratum。这篇就是讲这个承诺到底兑不兑得了，以及怎么搭才能让答案是"可信"的，而不只是"听起来有道理"。

## 让这件事值得做的那个不对称

约束就是 [[paired-data-pan-cancer]] 和 [[matched-multi-omic-tumor-table]] 反复撞上的那个：**同一病人的配对数据很稀缺**。把所有公开来源加起来，既有 single-cell RNA *又有* HRD 基因组 ground truth 的队列，全球也就 **~200–400 个病人** —— Luo 2024、MSK SPECTRUM、Pal 2021，再加几个 HTAN sub-atlas，基本就这些了。

而另一边，**bulk RNA + 基因组很充裕**：TCGA（~11k，带 derived 的 HRD 和 MSI 标签）、HMF（~5k 转移性 WGS+RNA）、POG570、MET500、PCAWG。这个不对称本身就是全部的机会。如果一个在"标签充裕的地方（bulk）"训练的模型，能去"标签缺失的地方（scRNA-only 队列）"打分，那么那几百个 *永远* 不会有配对基因组的单细胞 atlas，每一个都能被 **imputed** 一个不稳定性标签，进而进入分析。稀缺不是放弃 single-cell 的理由，恰恰是去搭这座桥的理由。

## 这事已经被做过 —— 只是分段做的

这不是空想。已发表的三个预测器已经把各个组件覆盖了：

| 预测器 | 目标 | 方法 | 报告的性能 |
| --- | --- | --- | --- |
| **MSIsensor-RNA**（Jia 2024） | MSI | ~109 基因的 SVM，TCGA 训练 | bulk AUC ~0.997；**单细胞 AUC ~0.96，23,902 个细胞** |
| **IdentifiHR**（Weir 2026） | HRD（HGSC） | penalized logistic，GIS ≥ 42 标签 | **pseudobulk scRNA 上 AUC ~0.92** |
| **expHRD**（Lee 2024） | HRD（scarHRD score） | 回归 | 和基因组 scar **PCC ~0.86** |

最硬的两块 prior art —— MSIsensor-RNA 和 IdentifiHR —— 已经在做这个项目需要的那个动作（**bulk 训练，给单细胞打分**），而且两个都用的是 **whole-sample / averaged pseudobulk**。这就让"用 whole-sample pseudobulk 去匹配训练 domain"成了有实证支持的默认选项，而不是一个猜测。

从一开始就要背着两个诚实的 framing：

- **MSI 是好做的目标；HRD 是难的那个。** MMR 缺失留下干净的表达足迹（*MLH1* 沉默）外加一个很强的免疫浸润信号 —— RNA 分类器 AUC 能到 ~0.90–0.98（Li 2020，PreMSIm；Jia 2024）。HRD 的基因组 scar 是 *历史记录*；表达抓的是当下的 "BRCAness" / HR 通路状态，所以性能更低、更依赖 lineage —— Tempus 的 RNA HRD 模型报告的 F1 从 **0.62（NSCLC）到 0.88（前列腺）**（Hsu 2022）。
- **我们预测的是一个转录组 *correlate*，不是 scar。** 把这句说白，免得下游悄悄忘掉。

## 设计决策 1 —— 拿什么标签去训练

HRD 可以定义成连续的 genomic-scar score（scarHRD）、二分类（GIS ≥ 42，Myriad 的工作点）、SBS3 signature，或者 BRCA1/2 biallelic loss。MSI 可以是连续的 MSIsensor score 或二分类的 MSI-H。

**建议：回归连续 score，之后再 threshold。** expHRD 就是这么做的。训练回归保留信息，而且 —— 关键 —— 让你能在 bulk→single-cell 迁移 *之后*、当 score 分布已经换了 domain 时，再去定工作点。一上来就二分类，等于把你在新 domain 重新校准时最需要的那个 gradient 扔了。你照样报临床要用的二分类结果，只是把"模型"和"工作点"解耦开。

## 设计决策 2 —— compartment 张力（关键所在）

基因组事件是 **肿瘤细胞内在的**。但 MSI 最强的预测信号 —— 免疫浸润 —— 住在 **微环境** 里。那你到底给哪些细胞打分？

- **(a) whole-sample pseudobulk** —— 模仿 bulk 训练 domain；保留模型被训练去利用的那个免疫 context。*两个 scRNA-validated 的预测器都是这么做的。* 缺点：被组成 confound —— 一个因为别的原因免疫热的肿瘤会被读成 MSI。
- **(b) malignant-cells-only pseudobulk** —— 对 lesion 的 *生物学* 最忠实；去掉组成 confound。缺点：把驱动 MSI 预测的免疫信号扔了，还造出一个 bulk 模型从没见过的 domain。
- **(c) two-component** —— 把 tumor-intrinsic（malignant-cell）和 TME-context（免疫/基质）拆成两块特征；让你能说清 *每次判读是哪个 compartment 驱动的*。

**建议：默认用 whole-sample pseudobulk 打分（和已验证的预测器对齐），但永远同时算 malignant-only 和 TME-only 两个视图，MSI 用 two-component 模型。** 三个视图一致就建立信任；不一致就把 confound 定位出来 —— 比如 TME-only 高、malignant-only 低，正是一个 MSS-但-炎症的肿瘤被误标的签名。值得注意的是，**目前没有任何已发表工作系统比较过这三个视图在 HRD/MSI 迁移上的表现** —— 所以这是设计里刻意的、新的一块，并如实标注。

## 设计决策 3 —— 扛住 bulk→single-cell 的 domain shift

scRNA 和 bulk 在 dropout、3′ capture bias、组成、平台上都不一样。纠正手段，从强到弱：

1. **用 pathway / gene-set score 当特征，而不是单基因。** 把几十个基因聚成一个 score，能把每个基因的 dropout 平均掉。单点 leverage 最高的选择。
2. **rank-based scoring** —— singscore（Foroutan 2018）、AUCell（Aibar 2017）、UCell（Andreatta 2021）、ssGSEA（Barbie 2009）。这些只依赖细胞内表达的 *rank*，而 rank 恰恰是能扛过深度和 3′-bias 差异的东西。那个 rank-based 的 24-gene-pair HRD signature（Zhuang 2021）就是为这个原因建在这个原理上的。
3. **共同的 rank / quantile 参考**，让 bulk 训练的模型看到的是它预期的那个分布。
4. **noise-augmented 训练** —— 在 bulk 上 downsample 计数、注入 dropout，再 re-pseudobulk，让模型在"已经长得像带噪 pseudobulk"的输入上训练。（这是综合出来的设计；没有论文验证过这个具体的 augmentation 用于 HRD/MSI 迁移。）

## 设计决策 4 —— 信任测试（读的是 event，不是 tissue）

这是把"真预测器"和"tissue 探测器"分开的那一条。HRD 和 MSI 的患病率 **lineage 偏斜很陡**（HRD → 卵巢/乳腺/胰腺；MSI → 子宫内膜/结直肠/胃）。一个泛癌模型可以靠学"癌种作为患病率的 proxy"刷出很高的 pooled AUC，却对 event 一无所知。Kang 2022 把这点说实了 —— per-cancer-type AUROC 从 **0.53 到 0.99** 不等。

**决定性的测试是 leave-one-cancer-type-out（LOCTO）验证，并在每个被留出的 lineage *内部* 打分。** 把一整个 lineage 从训练里留出；如果模型在那个被留出的癌种 *内部* 仍然能分开 HRD/MSI，那它读的是 event。如果 AUC 崩了，那它读的是 tissue。pooled AUC 可以纯粹被 lineage 间的患病率差异抬高 —— 所以要 per-lineage 报，绝不只报 pooled。把 lineage 当成一个显式的、可 ablate 的 covariate。

## 设计决策 5 —— 用一个很小的配对集验证

bulk 标签很多，但配对的 **scRNA + 基因组** 队列只有寥寥几个。就照这个不对称来设计：

- **bulk 上做 nested CV** 做诚实的模型选择；
- **在配对 scRNA 队列上做外部验证** —— 这是对部署中那座桥 *唯一* 可信的估计；
- **指标对齐标签类型**：二分类要 AUC **加 calibration**（reliability curve、Brier），因为阈值会跨 domain 漂移；连续的用 Spearman/Pearson 对基因组 score；
- **三个 negative control**：label-permutation（AUC → 0.5，防泄漏）、lineage-only baseline（模型必须打赢它，防 tissue confound）、random-gene-set（真 signature 必须胜过它）；
- **诚实的不确定性**：bootstrap CI，per-cohort 报，n ≈ 40 时别拿点估计耀武扬威。

候选验证队列（已对照 [[matched-multi-omic-tumor-table]] 核过）：

| 队列 | 癌种 | ground truth | n | accession | 为什么 |
| --- | --- | --- | --- | --- | --- |
| **MSK SPECTRUM**（Vázquez-García 2022） | HGSOC | single-cell WGS（DLP+）HRD 亚型 **+** scRNA，同病人 | 42 | syn25569736 | 最好的验证集 —— 基因组标签 *和* 单细胞分辨率的转录组 |
| **Luo 2024**（项目 anchor） | HGSOC | WGS + HRD，neoadjuvant PARPi，+ scRNA/scTCR | 30 | GSE222556 | 验证级，且 treatment-exposed |
| **Pelka 2021** | CRC（MMRd/MMRp） | MMR / MSI 状态 + WES + scRNA | 62 | GSE178341 / phs002407 | MSI/dMMR 的验证 analog |
| **Pal 2021** | 乳腺，BRCA1 携带者 | 胚系 BRCA1 + scRNA | 21 | GSE161529 | 单细胞分辨率上的 HR 缺陷基因型 |

## 设计决策 6 —— 一个正交的交叉检验

从 scRNA 推断 copy-number 的工具 —— **CopyKAT**（Gao 2021）、**Numbat**（Gao 2023）、现已弃用的 inferCNV —— 给出一个 *独立的*、单细胞原生的基因组不稳定性读数（CNA burden），完全不依赖 bulk 训练的模型。用它两次：定义 malignant-cell 集合，以及做交叉检验 —— 一个高的表达预测 HRD score，应该和 malignant cell 里高的推断 CNA burden 同时出现。不一致就标记为可能的误判。（caveat：CNA burden 是 *chromosomal* 不稳定性的 proxy —— 和 HRD 重叠但不等同，所以一致算 corroborating，不一致算 flag-for-review，不能当第二个 ground truth。Benchmark：Brief Bioinform 2025，有 allele 数据时 Numbat 最好，纯表达时 CopyKAT 最好。）

## 推荐的 pipeline，八条

1. **训练：** TCGA bulk（HRD 标签来自 Knijnenburg 2018 / scarHRD；MSI 来自 Bonneville 2017），再扩 HMF、POG570、MET500、PCAWG。
2. **标签：** 回归连续 score（scarHRD / MSIsensor）；迁移 *之后* 再 threshold。
3. **特征：** rank-based pathway/program score —— 最便宜、最有效的 dropout 修正。
4. **Compartment：** 三个视图（whole / malignant-only / TME-only）；MSI 用 two-component 模型。
5. **模型：** elastic net 作为有据可依的默认（expHRD / IdentifiHR / Kang 2022 背后的方法）；只有 nested CV 证明它泛化时，才上 gradient boosting 这个升级。
6. **桥：** noise-augment bulk 训练；把 bulk 和 scRNA-pseudobulk 归一到共同 rank 参考；用 whole-sample pseudobulk 打分，三个视图都报。
7. **验证：** nested CV → LOCTO（within-lineage AUC）→ 外部配对 scRNA 队列，带 bootstrap CI 和 calibration → 三个 negative control。
8. **交叉检验：** malignant cell 里的 CopyKAT / Numbat CNA burden；一致 corroborate，不一致 flag。

## 关于 foundation model 的一句

项目自己的 FM vault（scGPT、Geneformer、scFoundation）是个诱人的替代特征源 —— 把细胞 embed，从 embedding 上预测标签。值得做一个实验臂，但要睁着眼：多个 benchmark 发现，不做任务 fine-tune 的话，**zero-shot FM embedding 可能还不如一个朴素的 PCA / HVG baseline**（Kedzierska 2025；Cui 2024）。所以 FM embedding 是一个必须 *打赢* elastic-net baseline 才配进来的臂 —— 不是默认。而且到目前为止，**没有已发表的方法从 FM embedding 预测 HRD/SBS3** —— 一个真正的 gap，也是一个可能的贡献点。

## 诚实的边界

- **天花板是真的。** 全球 ~200–400 个 HRD 配对单细胞病人，框死了那座 *桥*（不是 bulk 预测器）到底能被验证到多精。把它当 bound 报，别当点估计。
- **没有已发表的端到端桥。** MSIsensor-RNA 和 IdentifiHR 验证的是 *组件*；这里的完整 pipeline（bulk-train → noise-augment → 三视图打分 → LOCTO → CNA 交叉检验）是由已验证的部件拼起来的，不是对某一个 workflow 的复现。这同一口气里既是 novelty 也是 risk。
- **HRD ≠ scar。** 每一个 imputed 的 HRD 标签都是一个转录组 correlate。它好到足以把 scRNA-only 队列 *分层* 到 [[beyond-hrd-instability-taxonomy-2026-06-09]] 那张图上；它不是基因组 HRD 检测的替代品。

## 收尾

- 配对数据的稀缺，是 imputation 的 **理由**，不是放弃 single-cell 的理由。
- 那个动作（bulk 训练 → scRNA 打分）**已经被分段验证** —— MSI 干净，HRD 部分。
- 这套设计的全部工作就是让标签 **可信**：rank 特征对付 domain shift，三个 compartment 视图对付 confound，**LOCTO** 证明 event-not-tissue，CNA burden 当正交检验，小 n 下报诚实的 CI。
- 回报是：每个 scRNA-only 队列都拿到一个不稳定性标签、**进入分类图** —— 把几百个配对病人撬成一张泛癌图。
