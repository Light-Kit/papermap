---
title: "Hi-C 与三维基因组在虚拟细胞中——谁试过、缺了什么"
summary: "一张 2020-2026 年 Hi-C 的先验工作地图。序列→Hi-C 已经成熟（Akita、Orca、C.Origami、AlphaGenome）。scHi-C 图谱与 Hi-C 原生 FM 已存在（Higashi、HiCFoundation、Hi-Cformer）。三模态单细胞——2026 年 2 月的 scHiCAR——给出每个细胞的 RNA + ATAC + 三维接触。但联合的细胞仍然空白：没有任何转录组预训练的 VC FM（scGPT、Geneformer、UCE、scFoundation、CellPLM、TranscriptFormer、rBio）把 Hi-C 当作旁路通道摄入。这读作细胞器感知同胞的第五个未填补楔形。"
---

> *[细胞器感知细胞 FM](organelle-aware-cell-fms.md) 的同胞——那篇随笔为以空间 / 区室信息为条件的细胞 FM 标记出五个未填补的楔形；这一篇充实第六个：作为条件通道的三维基因组接触图。配套阅读：[闭环虚拟细胞 101](closed-loop-virtual-cells-101.md) 了解领域脉络，[小实验室 v3](small-labs-what-to-build-v3.md) 了解底料即护城河，[双隐空间可迁移性随笔](translatability-dual-latent-vc-fm.md) 了解如何在细胞系 → 患者迁移上评估一个 Hi-C 感知的 VC FM。*

## 问题

今天的虚拟细胞 FM 把每个细胞当作一袋基因 token。三维基因组——TAD、环、A/B 区室、CTCF/黏连蛋白支架——是那些 token 从中涌现的调控底料。两个基因在两个细胞中可以处于同一表达水平，却处于全然不同的染色质情境：一个从一个活跃的超级增强子枢纽中迸发，另一个置身于一个会在一小时内将它沉默的 Polycomb 抑制区室。仅转录组的 FM 无法区分这两者。有没有任何虚拟细胞摄入三维基因组？

在勘察了 2020–2026 年文献之后：细胞器感知的 *图像* 一侧已经出货（SubCell）。*序列-到-三维* 一侧已经出货（Akita、Orca、AlphaGenome）。*单细胞-Hi-C* 嵌入一侧已经出货（Higashi、HiCFoundation）。联合的细胞——一个以接触图为条件的、转录组预训练的 VC FM——公开地空白。

## 序列 → Hi-C：成熟的脉络

从 DNA 序列（± 细胞类型轨迹）预测批量接触图。五个命名系统就是这个领域。

- **Akita**（[Fudenberg, Kelley, Pollard, *Nat Methods* 2020](https://www.nature.com/articles/s41592-020-0958-x)）——CNN，约 1 Mb 窗口，Hi-C/Micro-C 目标。鼻祖；其后一切都引用它。
- **Orca**（[Zhou, *Nat Genet* 2022](https://www.nature.com/articles/s41588-022-01065-4)）——层次化编码器/解码器，kb-到-染色体尺度，区室 + TAD + 环于一栈。
- **C.Origami**（[Tan, Xu, Yue, *Nat Biotechnol* 2023](https://www.nature.com/articles/s41587-022-01612-8)）——DNA + CTCF ChIP-seq + ATAC → 2 Mb Hi-C，8,192 bp 分箱。首个可信的"染色质折叠的计算机内遗传筛选"框架。
- **Epiphany**（[Yang et al., *Genome Biol* 2023](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-023-02934-9)）——一维表观基因组 → Hi-C，GAN。
- **HiCGen**（Wei et al., *Adv Sci* 2025）——层次化多尺度；CTCF + ATAC 输入；Polycomb 感知的环。

2025 年最强的入局者是 **AlphaGenome**（[Avsec et al., DeepMind bioRxiv 2025.06.25.661532](https://www.biorxiv.org/content/10.1101/2025.06.25.661532v1)）。统一 transformer；把 Hi-C 接触轨迹与 RNA-seq、ATAC、组蛋白标记一起作为一等输出头部发出；报告在 1 Mb 区间上的 Pearson R 高于 Orca。这是首次有一个通才 DNA FM 把 Hi-C 当作一个对等模态、而非一个延伸目标。

五者共有的缺口：它们从 DNA 预测 **批量** 接触图。没有一个摄入单细胞 RNA 或 ATAC 状态并发出一张单细胞接触图。

## scHi-C 图谱 + 原生 FM

单细胞一侧有它自己长达十年的脉络。

- **Nagano et al.**（[*Nature* 2013](https://www.nature.com/articles/nature12593)）——首个 scHi-C。
- **Stevens et al.**（[*Nature* 2017](https://www.nature.com/articles/nature21429)）——单倍体 mESC，G1 分选，完整三维结构恢复。
- **Higashi**（[Zhang, Zhou, Ma, *Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-01034-y)）——超图自编码器，对 scHi-C 进行填补 + 嵌入。参照性的 scHi-C 嵌入模型。
- **Fast-Higashi**（[Zhang & Ma, *Cell Syst* 2023](https://www.cell.com/cell-systems/fulltext/S2405-4712(23)00006-7)）——张量分解，快 50–100×，用以初始化 Higashi。
- **sn-m3C-seq**（[Lee et al., *Nat Methods* 2019](https://www.nature.com/articles/s41592-019-0547-z)）——每个细胞核的甲基化 + 三维接触联合。
- **小鼠脑 m3C 图谱**（[Liu et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06805-y)）——301K 甲基化组 + 176K 联合 m3C 谱，4,673 个细胞群，330 亿次接触。
- **人脑 m3C 图谱**（[Tian et al., *Science* 2023](https://www.science.org/doi/10.1126/science.adf5357)）——横跨 17 个脑区的 145K m3C 细胞核。
- **4DN Phase 2**（[Dekker et al.](https://www.4dnucleome.org/)）——联盟门户，>1,800 个实验集，每细胞类型 140K+ 个环；该阶段历时 2020–2025。

现在有两个 Hi-C 原生 FM 公开了。

- **HiCFoundation**（[Wang & Noble, bioRxiv 2024.12.16.628821](https://www.biorxiv.org/content/10.1101/2024.12.16.628821v1)）——1.18 亿接触子矩阵，81 个人类细胞系/组织，编码器-解码器 + 分块对比损失。首个 Hi-C 原生基础模型。
- **Hi-Cformer**（[bioRxiv 2025.08.04.668453](https://www.biorxiv.org/content/10.1101/2025.08.04.668453v2)）——面向 *单细胞* Hi-C 的 transformer；染色体感知的层次化注意力；将自身定位为 scHi-C 专用。

两者都是仅-Hi-C。没有一个桥接到转录组 FM。

## 单细胞分辨率下的联合三模态

最有趣的前沿——而且是被底料卡住、而非被方法卡住。

- **sci-Hi-C**（[Ramani et al., *Nat Methods* 2017](https://www.nature.com/articles/nmeth.4155)）——组合索引 scHi-C，无转录组。
- **HiRES**（[Liu et al., *Science* 2023](https://www.science.org/doi/10.1126/science.adg3797)）——一个细胞内的单细胞 Hi-C **+ RNA-seq**。概念验证。
- **GAGE-seq**（[Zhou et al., *Nat Genet* 2024](https://www.nature.com/articles/s41588-024-01855-y)）——细胞层面并发的三维基因组 + 转录组，组合索引，每次运行数万个细胞。
- **scHiCAR**（[Yu, Crawford et al., *Nat Biotechnol* Feb 2026](https://www.nature.com/articles/s41587-026-03013-7)）——已确认 **三模态**：每个细胞的 RNA + ATAC + 三维接触。162 万个小鼠脑细胞；横跨 22 个细胞类型的 5 kb 增强子–启动子环。当前联合单细胞底料的最先进水平。
- 一篇 **四组学单细胞论文** 于 2026 年初出现在 Nature（s41586-026-10322-z），加入了第四个模态。底料竞赛已经开打。

那个硬事实：**没有任何转录组预训练的虚拟细胞 FM 把 Hi-C 当作旁路通道摄入。** 我跨 scGPT、Geneformer、UCE、scFoundation、CellPLM、TranscriptFormer、rBio 和 GREmLN 直接核实了这一点。最接近的招式是 ChromFound（[arXiv 2505.12638](https://arxiv.org/abs/2505.12638)），一个 scATAC FM，它 *使用 Hi-C 导出的增强子-启动子范围作为一个架构先验*——它并不把接触图作为输入摄入。这个楔形是真实的。

## 为什么联合的细胞重要

染色质轴不是奢侈品的三个理由。

**迸发频率控制是环介导的。** Mediator 与 BRD4 的工作（[*Sci Adv* 2024, adl4893](https://www.science.org/doi/10.1126/sciadv.adl4893)）显示三维接触直接调制转录迸发。一个没有接触信息的虚拟细胞不得不从共表达里隐式地重学这一点，而那恰恰是数据效率坍塌的那类高维逆问题。

**扰动追踪已经存在。** [Liu et al, *Nature* 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12074983/)——混合 CRISPR + 多尺度染色质成像，137 个基因 / 420 个 sgRNA，26 个新型三维调控因子。这是规模上最接近"Perturb-seq + Hi-C"的东西，并证明联合的扰动 × 染色质数据是可以被采集的。

**药物响应是染色质分歧的。** HDAC 与 BRD4 抑制剂筛选（肺癌图景，[bioRxiv 2024.05.23.592075](https://www.biorxiv.org/content/10.1101/2024.05.23.592075v1)）显示细胞系分歧的染色质响应，而批量 Hi-C 把它模糊掉了。TAD、环、A/B 区室恰恰是仅-RNA 的 FM 不得不从共表达里 *重学* 的那些调控原语。直接把接触图给它，是一份可观的归纳偏置馈赠。

## 那个未填补的楔形

三个选项，按可守度排序。

**(a) 在冻结的 sc-FM 上、带 Hi-C 旁路输入的适配器**——眼下最容易、最可守。拿 scGPT 或 UCE，冻结骨干，学一个交叉注意力适配器，摄入来自 Higashi 或 HiCFoundation 的逐细胞接触嵌入；在留出的 Perturb-seq + 染色质-扰动配对上监督（Engreitz/Hansen 数据集是显而易见的目标）。算力：小实验室可行——冻结骨干适配器范式——与 scDCA 在药物上所用相同的配方。风险是脑组织之外的数据覆盖，因为联合的 scHi-C+RNA 图谱目前仍大多是小鼠和脑。

**(b) 在 scHiCAR + GAGE-seq + m3C 语料上的联合预训练。** 真正的多模态底料。数百万联合细胞如今已存在，但单细胞接触图的 token 化尚未解决——Hi-Cformer 是唯一一次认真的尝试，而它只在 Hi-C 上工作。卡点 *不是* 算力、*也不再是* 数据量；它是那个表征问题：一个接触矩阵如何变成一个 token 序列，能与基因 token 并肩住在同一个注意力栈里。

**(c) 因果的、三维感知的扰动预测器。** 以细胞的接触图为条件，预测对一次扰动的 scRNA 响应。还没人端到端尝试过这个。这是关于"染色质轴是否携带了仅靠转录组会错过的、关于扰动结果的因果信息"的干净检验。

卡点，按顺序：(i) **单细胞接触图的 token 化** 是那个真正的架构缺口；(ii) **脑组织之外的联合数据** 仍然稀薄；(iii) 在适配器尺度上 **算力并非约束**，这就是为什么 (a) 是正确的第一刀。

## 名字 + 裁决

三个值得追踪。**Jian Ma**（CMU），因 Higashi → Fast-Higashi → GAGE-seq → scHi-C-FM 的轨迹；最有可能迈出下一步的实验室。**Geoffrey Fudenberg + Katie Pollard**（Gladstone，UCSF），因序列→三维的理论脉络；Akita 的血脉是他们的。**Jesse Engreitz**（Stanford）与 **Anders Sejr Hansen**（MIT），因一个 Hi-C 感知的 VC FM 真正会需要的扰动 × 三维因果数据集。

值得一提：**Bing Ren**（UCSD），因 sn-m3C-seq 脑图谱；**William Noble**（UW），因 HiCFoundation；**Feng Yue**（Northwestern），因 C.Origami。

与同胞随笔相同的 v2/v3 模式。架构组合已经发表——冻结 sc-FM 上的适配器范式（scDCA）、三模态底料（scHiCAR）、Hi-C 原生 FM（HiCFoundation、Hi-Cformer）。可守的新颖性表面住在那个 *未填补的接合处*：一个带 Hi-C 旁路输入头部的、转录组预训练的 VC FM，在那些刚刚才变得可用的 scHiCAR/GAGE-seq 配对上训练。护城河，正如在细胞器感知随笔里那样，处于模型的上游——脑之外的联合配对数据，外加一套还没人达成共识的接触图 token 化方案。虚拟细胞的转录组那一半有数据；染色质那一半就是新的楔形。
