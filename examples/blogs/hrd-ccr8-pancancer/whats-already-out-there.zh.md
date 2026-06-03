---
title: "外面已经做了什么 —— 我们站在哪些泛癌 HRD 工作之上，又在哪条缝里"
date: '2026-06-03'
topics:
- hrd
- pan-cancer
- review
- positioning
- single-cell
- immune-archetypes
summary: '在把五层方案推进到计算之前，先盘一遍邻居 —— 哪些泛癌 HRD 论文已经发了，哪些还在 preprint，他们把什么留给后面。最近的邻居是 Hjazi 等 2025 年 10 月的 bioRxiv 预印本：他们在 1 万多 TCGA 病例上训了个泛癌 HRD 分类器（CSI-HRD），把 HRD 切成两个免疫表型 —— dHpC（HRD 热 / HRP 冷，乳腺 / 卵巢 / 子宫内膜）与 dCpH（HRD 冷 / HRP 热，肺 / 头颈 / 黑色素瘤；后者的 3p/5q/9p LOH 直接把 IFN-α/β、STING、JAK2 抹掉）。他们也明确写出了自己没做的事：单细胞、空间、扰动联动、试验结局 —— 而那正好就是五层方案。Luo 那条 IFN/CCR8/eTreg 思路也已经被写成综述（Hu 等 2025，Biomarker Research）。差异化的点不再是假设本身，而是病人级别的 record atlas，加上从扰动到 PDO/PDX 到试验结局的整条验证链 —— 这条链还没人组装过。'
starred: true
---

五层方案（见 [the-five-layer-dataset-plan.md](the-five-layer-dataset-plan.md)）把架构搭好了。在把架构推到计算之前，先老实读一遍邻居 —— 已经发的、还在 preprint 的、把什么留下来的 —— 才知道我们到底站在哪条缝里。

一年前的状态是这样的：泛癌 HRD 的基因组图谱已经画好（Knijnenburg 2018；Nguyen 2020），HRD → 免疫激活这条模式也已经被观察到（Wang 2023；Hu 2024），CCR8 作为 Treg 特异性的临床靶点也成熟了。我们瞄的那条缝 —— 跨瘤种、按 HRD 分层、由 IFN/eTreg 介导、在单细胞 + 空间 + 扰动 + 试验结局四种分辨率上一起验证 —— 当时是开的。

之后这一年里发生了三件事，把这条缝收窄了一些，但没有合上。

## 最近的邻居：Hjazi 2025 / CSI-HRD

这个项目最需要一起读的一篇，是 Hjazi 等 *"Tissue specificity and chromosomal alterations shape divergent immune programs in HRD tumors"*，2025 年 10 月 bioRxiv，[PMC12633024](https://pmc.ncbi.nlm.nih.gov/articles/PMC12633024/)。

他们做了个 **CSI-HRD** —— 把 SigMA Sig3、genomic instability score、≥5 bp 微同源介导的缺失数三个东西揉进一个梯度提升分类器，泛癌和按瘤种各训了一版，对照 WGS 上的 HRDetect，一致率 91.5%。然后拿这套 caller 跑了 1 万多 TCGA 肿瘤 / 33 种瘤型，配上 bulk-RNA 的炎症评分、CIBERSORTx 反卷积、加一个独立卵巢队列的 CD8⁺ TIL 免疫荧光验证。

结果按他们自己的话讲，分两个表型：

- **dHpC** —— *deficient-Hot / proficient-Cold*。ER+ 乳腺、卵巢、子宫内膜。HRD 肿瘤是点着的：I 型 IFN、NF-κB、趋化因子驱动的 T 细胞招募、毒性 CD8、耗竭 CD8、Treg，全在。这就是 Luo 那套世界的一半。他们层次聚类的 Cluster 1 里就是 HAVCR2⁺ CD8 耗竭加 Treg 那一堆。
- **dCpH** —— *deficient-Cold / proficient-Hot*。肺、头颈、黑色素瘤。HRD 肿瘤反而是被免疫上压住的。3p、5q、9p 上的 LOH —— 也就是 IFNA/IFNB、STING、JAK2 所在的染色体片段 —— 能解释相当一部分的压抑。在所有瘤型里，HRP 基线炎症与 HRD 引起的炎症变化之间的相关系数是 r = −0.63。

然后是他们的落地话术：*"按 HRD 与免疫背景分层，可以帮助找出最有可能从 ICB 联合 PARPi、或者再加抗血管生成的三联方案中获益的人群。"* —— 这句话，结构上就是我们这个项目的定位，只是它是在泛癌 bulk 层面被说出来的。

他们明确没做、也明确写成 future work 的部分，原话是：

> "Single-cell, spatial, and clinical trial-linked analyses to validate these immune programs as predictive biomarkers."

这一句话拆出来，正好就是我们的第 1 层到第 5 层。他们把泛癌 bulk 层面的 landscape 问题关掉了；他们把单细胞 + 空间 + 扰动 + 试验结局的问题留下来，写给后面的人。

## IFN/CCR8/eTreg 那条思路也已经写成综述

Hu 等 *"The distinct landscape of tumor immune microenvironment in homologous recombination deficient cancers"*，*Biomarker Research* 2025，[PMC12366292](https://pmc.ncbi.nlm.nih.gov/articles/PMC12366292/)。

横跨 HGSOC、TNBC、PDAC、前列腺四种瘤的叙述性综述。CCR8 作为 eTreg 标志被点了名。IFN 信号的双面性 —— 先激活，再被 Treg 反过来压住 —— 这条弧线和 Luo 2024 画的是同一条。它不产数据，只在四个瘤种里讲，但它意味着 Luo 那套框架已经被作为综述写下来了。

这件事有点尴尬但值得说清楚：**假设本身已经不是差异化的点了。** 2024 年底到 2025 年中之间有两篇 —— 一篇是泛癌 bulk 层面的 Hjazi，一篇是 IFN/CCR8 链的叙述综述（Hu），两篇加起来已经覆盖了我们项目"它是不是真的、是不是一个能动的靶"这一半。

剩下的，是这两篇没做、或没法做的所有事。

## 邻居其它的几篇

| 论文 | 覆盖了什么 | 离我们最近的层 | 相比我们缺什么 |
|---|---|---|---|
| Wang 2023, *Sci Rep* —— 泛癌 HRD 基因组与分子图谱（[s41598-023-35092-w](https://www.nature.com/articles/s41598-023-35092-w)） | 10,619 TCGA / 33 瘤；HRDsum + 甲基化 + bulk + 少量 sc；HRD 里耗竭 CD8 占 60%，HRP 里 6.2% | 第 1 层、早期第 2 层 | sc 那部分只有 4 个 BRCA1 乳腺 + ccRCC TIL —— 概念验证，不是 atlas；没扰动，没 PDO，没试验 |
| Nguyen 2020, *Nat Comm* —— 泛癌 HRD landscape（[s41467-020-19406-4](https://www.nature.com/articles/s41467-020-19406-4)） | HMF 转移瘤 WGS；CHORD 分类器；把泛癌 HRD 基线定了下来 | 第 1 层基线 | 只到基因组；没转录组、没免疫、没验证链 |
| Yang 2025 —— 亚洲泛癌 HRD（[PMC12107993](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12107993/)） | 9,262 病人 / 17 实体瘤；双等位 HRR + 抑癌基因 calls | 第 1 层、人群验证 | panel-DNA only；HRP 比较组是结构化的，不是表型化的 |
| Wang 2024, *Cancers* —— HRD/HRP **卵巢** sc-RNA + TCR（[PMC11481286](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11481286/)） | 5 HRD vs 3 HRP HGSOC；M1/M2、CAF 亚型、tumor-reactive T 细胞的差异 | 第 2 层雏形，单瘤种 | N=8，只到卵巢 —— 首例已发表的 HRD/HRP 单细胞对照，但不是 atlas |
| Patkar 2024, *Cancer Res Comm* —— 细胞系 HRD（[PMC11621922](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11621922/)） | DepMap/CCLE 泛癌 HRD calls + 药敏交叉 | 第 4 层输入 | 模型侧，不是病人侧 |
| Vanderwerff 2026, *Life Sci Alliance* —— 多组学 ML 找 HRD regulators（[e202503531](https://www.life-science-alliance.org/content/9/2/e202503531)） | 8,000 病人，多组学 ML 找驱动 HRD 形成的基因 | 横切 | 问的是另一个问题 —— *什么驱动 HRD*，不是 *HRD 对 niche 干了什么* |
| Macedo 2025, *NAR* —— DirectHRD（[gkaf313](https://academic.oup.com/nar/article/53/8/gkaf313/8117946)） | 新的 scar-based HRD 分类器，5% 肿瘤比例下 AUC 0.99 | 第 1 层方法 | 方法论文，没病人队列 |
| Kim 2024 —— expHRD（[PMC11241885](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11241885/)） | 基于转录组的 HRD 个体化预测器 | 第 1 层方法 | 方法论文 |

这八篇里有六篇是在 bulk 或基因组层面跑的（除了 Wang 2023 *Sci Rep* 那一小段 sc 和 Wang 2024 *Cancers* 那个 N=8 卵巢比较）。两条单细胞的，一条是方法雏形（Wang 2023 那 4 例乳腺），一条是单瘤种（Wang 2024 卵巢，N=8）。**这一带没有一篇组成了泛癌的单细胞 HRD atlas。**

## 缝在哪 —— 还没人组装起来的部分

把这一带从头到尾读完，剩下没人做的清单其实挺短：

1. **泛癌单细胞 + 空间 HRD atlas，配对 HRP。** Hjazi 在 bulk 层面把"HRD 的免疫后果取决于组织"证完了。下一个问题 —— 单细胞分辨率下，dHpC 会不会进一步分裂成多条瘤种特异的轴（Luo 那条 IFN → CCR8 只是其中一条），dCpH 会不会分成可救的和被 LOH 永久压死的两类 —— 是开的。
2. **病人 record atlas。** 一行一个病人：多种 scorer 的 HRD call、转录组轴评分、空间特征、治疗史、结局。整个邻居都是在瘤群层面或细胞群层面跑，行还没人搭。
3. **轴突现 + 用基因扰动当桥梁，区分细胞自主和微环境介导。** Replogle 2022 Perturb-seq、DepMap、LINCS L1000 里有"急性 HR 基因失活"的细胞自主签名。已发表的 HRD 工作里，没有人把它当作 HRD/HRP 拟态的参照去拆"哪些表型是肿瘤细胞自己出的、哪些是环境出的"。
4. **PDO/PDX 上的 PARPi 应答作为分层方案的功能验证。** Kopper、Tiriac、Hill、Driehuis、Bruna —— 资源都在那。没人把它们当成 HRD 分层的功能 ground-truth 层一起用过。
5. **试验结局作为第 1 – 4 层任何分层方案的留出测试。** PROfound、MAGNITUDE、OlympiAD、ARIEL3 都给得出每个病人的 PARPi 应答端点。Hjazi 自己写了他们没有这个端点；我们可以补上。

这就是项目。里面没有任何一条是新机制，全部都是 bulk-level 泛癌 paper 和叙述综述都没做的那一整套验证架构。

## 这对五层方案的具体影响

读完文献，五层方案里有三处要改：

- **CSI-HRD 进入第 1 层，作为又一个 HRD caller。** 不是唯一 —— HRDetect 和 CHORD 仍然是 WGS 的首选 —— 但当输入是 panel + Sig3（TCGA 大部分能用的数据其实就是这种形态），CSI-HRD 是合适的工具。Hjazi 的 `dHpC` / `dCpH` 表型二分也顺势成了第 2 层的对照假设：我们单细胞分辨率下跑出来的轴突现，是同意他们这套二分、细化它，还是直接反过来？
- **IFN/CCR8/eTreg 从"假设"退一格，变成"候选轴之一"。** Hu 2025 已经把这条思路写成综述了。第 2 层不预先咬定它。无监督方法分出什么轴就跟什么轴；IFN/CCR8 是其中一个候选输出，用来跟 Luo 那条先验比较。（这一条其实和项目 memory 里已经记下的 scope correction 是一致的。）
- **第 3 层（基因）和第 4 层（功能）的优先级要往前提。** 这个项目相对 Hjazi 2025 的差异不在 discovery —— TCGA 规模上人家比我们高 —— 在验证链。Perturb-seq + PDO/PDX + 试验结局，那一段才是缝。

## corpus 现在应该加上的条目

要加进 `examples/hrd-ccr8-pancancer.yaml` 的，有四条：

- `hjazi-2025-csi-hrd` —— `hrd-genomics` 类，泛癌 HRD 分类器 + dHpC/dCpH 表型的锚论文。最重要的邻居。
- `hu-2025-hrd-tme-review` —— `ifn-bridge` 或 `ccr8-etreg` 类，已经把 IFN/CCR8 框架公开写下来的叙述综述。
- `wang-2024-hrd-hrp-ov-sc` —— `atlas-singlecell` 类，首例 HRD/HRP 单细胞 + TCR 对比（卵巢，N=8）。我们第 2 层的单瘤种先例。
- `vanderwerff-2026-hrd-regulators-ml` —— `hrd-genomics` 边缘，多组学 ML 找 HRD regulators。问的是不同问题，但方法上是邻居。

可选、优先级低：

- `macedo-2025-directhrd` —— 第 1 层方法，输入是低肿瘤比例液体或 panel 时合适。
- `kim-2024-exphrd` —— 第 1 层方法，没有 WGS 的队列可作为转录组 fallback。

## 如果只读一篇

[Hjazi 2025 —— PMC12633024](https://pmc.ncbi.nlm.nih.gov/articles/PMC12633024/)。下一个分析 blog 写之前，先把这篇读了。他们的 `dHpC` / `dCpH` 二分表型，现在是公共基线 —— 我们单细胞分辨率下的任何一条轴突现，都得在这个基线上做对照。

一段话总结这个位置：**泛癌 HRD 的 bulk 那一层已经做完。** IFN/CCR8/eTreg 那条思路也已经被写成综述。验证链 —— 单细胞 + 空间 + 扰动 + 功能 + 试验结局，作为一个架构一起跑 —— 还没人组装。**这就是我们要交付的那块。**
