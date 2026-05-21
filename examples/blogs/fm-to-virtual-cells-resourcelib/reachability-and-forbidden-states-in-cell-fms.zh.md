---
title: "一个虚拟细胞能造访哪些状态？细胞基础模型中的可达性、势垒与被禁止的共表达"
summary: "一张关于细胞状态可达性的既有工作地图——即一个细胞在物理、调控与能量约束下能占据哪些转录状态这一问题——以及对哪些方法已真正落进单细胞 FM 内部的诚实裁决。那些命名的把手（Waddington 地形、最优传输、基于能量的势、神经 SDE、马尔可夫链命运图、谱系互斥性）在动力系统与轨迹 ML 中已经成熟。它们没有一个落进 scGPT、Geneformer、scFoundation、UCE、STATE 或 CellPLM 内部。结果是这些 FM 会毫不犹豫地解码出生物学上被禁止的状态——Oct4 + GATA6 同时高表达、相互排斥的谱系程序同时激活。这是继 surprise 与 translatability 之后的第三个诚实层。"
---

> *与[surprise / 不确定性那篇文章](surprise-and-uncertainty-in-cell-fms.md)（同一束认知诚实之光，从另一个角度看）、[双潜空间可迁移性那篇](translatability-dual-latent-vc-fm.md)（分布 *之间* 的可达性正是 τ_g 所衡量的）、[细胞器感知的第六块楔子](organelle-aware-cell-fms.md)，以及[闭环 VC 的 101 之旅](closed-loop-virtual-cells-101.md)互为兄弟篇。本文问出第三个诚实的问题：当 FM 提出一个新的细胞状态时，它知道生物学会不会允许那个状态存在吗？*

## 问题

并非模型能写下的每一个转录状态，都是细胞能占据的状态。谱系定型关上一些门；能量代价让一些吸引子深、另一些浅；相互排斥的转录因子程序通过直接抑制相互压制。细胞坐在一个低维流形上，带着 **势垒（barriers）** ——这是 Waddington 在 1957 年勾勒为表观遗传地形中山脊的东西，是现代动力系统生物学称为准势曲面的东西，也是单单一块 Perturb-seq 面板就揭示出来的经验事实：表达空间中的大多数点根本从未被观测到。当前的 VC FM 没有编码这其中任何一项。它们把细胞当作一个学得的嵌入中的点，经一个 MLP 解码，并会乐呵呵地产生生物学所禁止的共表达模式。本文的问题是，那个缺失的先验长什么形状。

## 那些命名的把手

动力系统与轨迹推断文献已经为可达性构建机器十年了。有六个家族值得辨识。

**单细胞快照上的最优传输。** Waddington-OT（[Schiebinger 等，*Cell* 2019](https://www.cell.com/cell/fulltext/S0092-8674(19)30039-X)）是奠基性的一步——给定一个发育中群体的两张快照，找出使一个可解释为能量距离的传输代价最小的耦合。TrajectoryNet（[Tong 等，ICML 2020](https://arxiv.org/abs/2002.04461)）用一个学得的连续时间流取代静态耦合。CellOT（[Bunne 等，*Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01969-x)）及其 2024 年的扰动扩展（[Bunne 等，*Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02233-6)）把这套框架推进到药物响应预测：一个未扰动群体与一个扰动群体之间的 OT 代价 *就是* 那个扰动的势垒高度。这是关于可达性的最强现有先验。

**基于能量的势。** PRESCIENT（[Yeo 等，*Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)）从谱系追踪的快照中学出细胞状态嵌入上的一个标量势 U(x)。在 U 之下通过 Langevin 动力学采样，在构造上就尊重势垒——高 U 区域就是极少被造访的。这是 ML 文献中最字面意义上的 Waddington 地形实现，而它仍然未被充分利用。

**神经 SDE 与基于 ODE 的动力学。** 一个不断增长的家族（[Tong 2020](https://arxiv.org/abs/2002.04461)；[Sha 等，2024](https://www.nature.com/articles/s41592-024-02184-y)；[Bunne 2023](https://www.nature.com/articles/s41592-023-01969-x)）拟合漂移 + 扩散向量场，其中低速度 / 高散度的区域充当势垒。MIOFlow（[Huguet 等，NeurIPS 2022](https://arxiv.org/abs/2206.14928)）把流约束在数据流形上，使轨迹不能穿隧过低密度区域。

**马尔可夫链命运图。** CellRank（[Lange 等，*Nat Methods* 2022](https://www.nature.com/articles/s41592-021-01346-6)）和 CellRank 2（[Weiler 等，*Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02303-9)）在单细胞图上构建一个转移矩阵，并读出到达终末状态的吸收概率——即操作性的可达性。模态无关、可扩展到 10⁶ 个细胞，而那个吸收概率恰恰就是一个 VC FM 应当暴露出来的对象。

**谱系互斥性约束。** 最便宜的数据一侧先验。转录因子程序之间的相互排斥在 *主调控因子成对* 的层面有记载——早期胚胎里的 Oct4/GATA6，神经外胚层对肌肉里的 PAX6/MyoD，红系对髓系里的 GATA1/PU.1。来自 MSigDB 和谱系图谱的几百对这样的配对，就足以写出一个任何 FM 都能据之微调的间隔损失。

## 单细胞 FM 的图景——空白

scGPT（[Cui 等，*Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer（[Theodoris 等，*Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）、scFoundation、UCE（[Rosen 等，*Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、CellPLM 和 TranscriptFormer 都没有交付流形距离头、没有 OT 代价正则化项、没有势能监督、没有互斥约束。token 预测的预训练目标对可达性是盲的：在交叉熵下，一个违反谱系互斥性的样本并不比一个尊重它的样本更差，只要边际 token 概率匹配。STATE（[Arc Institute, 2025](https://arcinstitute.org/news/virtual-cell-model-state)）继承了这一点，且没有添加任何公开的可达性层。

经验后果是直接的。Pedrocchi 等对 scGPT 和 scFoundation 的稀疏自编码器探测（[Pedrocchi 等，bioRxiv 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）表明，许多学得的特征没有干净的生物学解释，而一个跨 Geneformer-V2 和 scGPT 的独立 SAE 比较图谱（[Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)）发现，只有约 6–10% 的转录因子表现出调控靶标特异的特征响应——嵌入里包含的 *状态比生物学所支持的还多*。清算文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)）表明，点估计回归向训练均值，这是可达性盲表现为怯懦：当 FM 对势垒没有先验时，对"这个扰动会做什么"最安全的答案就是全局平均。线性基线之所以赢，是因为它们诚实地低信息量；FM 之所以输，是因为它们的高容量解码器在到处幻觉出可达的质量。

没有 scGPT 的 Waddington 头。没有 Geneformer 的 OT 先验。没有 STATE 的势曲面。底料对可达性一无所知。

## 那些确实编码了约束的相邻 FM

AlphaFold（[Jumper 等，*Nature* 2021](https://www.nature.com/articles/s41586-021-03819-2)）是相邻生物学中的存在性证明。其架构在多个层面被约束：等变注意力尊重 3D 结构，结构模块的回收步骤隐含地是在物理先验下的一次迭代精化，而最终的弛豫步骤使用一个 Amber 力场来消除空间冲突（[Eastman 等，*J Chem Theory Comput* 2017](https://pubs.acs.org/doi/10.1021/acs.jctc.7b00529)）。模型无法输出一个原子占据同一空间的结构。ESM-2（[Lin 等，*Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)）没有包含显式的物理约束，但在演化相关序列上的掩码 LM 目标隐含地编码了协变：在接触位置上被禁止的残基对会被数据惩罚。两者都是不同方式下的约束感知 FM。

细胞一侧没有等价物。在一个生成的转录组上没有 Amber 弛豫步骤。在共表达基因对上没有演化协变先验。模型可以产生潜空间中的任何向量，而解码器会照办。

## 微调路径

按可行性排序。这些都不需要一次新的预训练运行。

**(1) 流形正则化微调。** 加一个辅助损失，等于每个生成的嵌入到它在训练集中 k-NN 的距离，对超过逐细胞类型阈值的部分加以惩罚。这是来自[surprise 兄弟篇](surprise-and-uncertainty-in-cell-fms.md)的 OOD 检测被改造为一个可达性先验。马氏距离的变体最干净；一个叠在冻结 scGPT 之上的小校准头，可以在现有图谱数据上几天内训完。

**(2) 谱系互斥性硬约束。** 从 MSigDB 和 Tabula Sapiens 谱系树中精选出 200–500 条相互排斥的标记物配对规则。加一个 hinge 损失，惩罚超过某个间隔的共表达。无架构改动。一周内可做出试点。诚实的局限是覆盖面——互斥规则在造血和神经谱系上被精选得很好，别处稀疏。

**(3) OT 代价辅助头（Bunne 模式）。** 冻结 FM 加一个在预测状态与源状态之间、以扰动为条件的 Sinkhorn 或 W₂ 损失。CellOT 的预训练底料让这立刻可行；新的贡献在于把它作为一条旁路而非一个竞争性架构接入一个转录组 FM。

**(4) PRESCIENT 风格的势头。** 用快照谱系数据在 FM 的嵌入上协同训练一个标量 U(x)；把解码器替换为 U 之下的 Langevin 采样。这是有原则的版本——*生成式* 的可达性，而非拒绝——也是最难的。它也是那个能让 FM 拒绝采样一个被禁止状态、而不是采样它然后事后被惩罚的版本。

## 裁决 + 开放的楔子

架构组合，再一次，是已发表的。可守住的新颖性面在于集成：把来自轨迹推断 / 动力系统文献的可达性机器栓到一个转录组预训练的 FM 上。有三个值得跑的具体实验。

**(a)** 在一个 scGPT 衍生的 Perturb-seq 预测器上，针对 Replogle（[Replogle 等，*Cell* 2022](https://www.cell.com/cell/fulltext/S0092-8674(22)00746-8)）基准消融谱系互斥性 hinge 损失。测量违反至少一条精选互斥规则的预测占比，对比加损失前后。零假设是 FM 已经从数据中隐含地捕捉到了这些规则；这里的先验是它没有。

**(b)** 在冻结 Geneformer 特征之上训练一个 PRESCIENT 头，并就被禁止共表达率，比较 Langevin 样本与 scVI 样本。

**(c)** 把 CellRank 吸收概率用作一个校准目标：任何提出从状态 A 到状态 B 转移的 VC FM，都应当报告一个与 CellRank 在留出谱系数据上相关的吸收概率。

值得关注的人。**Charlotte Bunne**（EPFL → Stanford）做细胞上的 OT，是最活跃的一条线。**Smita Krishnaswamy**（Yale）做尊重流形的流。**Fabian Theis**（HMGU）做轨迹推断和 scVI 家族底料。处在扰动 × 命运交汇处的 **Jesse Engreitz**（Stanford）和 **Aviv Regev** 谱系，正是一个可达性感知的 FM 所需要的。与 surprise 和 Hi-C 兄弟篇相同的 v2/v3 模式：组件已存在，细胞 FM 社区一直在为规模和基准赛跑，而护城河在损失设计里。

一个不拒绝被禁止状态的虚拟细胞，不是虚拟细胞。它是一个带有富于想象力的副作用的回归。
