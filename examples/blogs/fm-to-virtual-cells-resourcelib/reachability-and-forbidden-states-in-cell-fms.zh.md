---
title: "一个虚拟细胞能去到哪些状态？细胞基础模型里的可达性、势垒与被禁的共表达"
summary: "这是一张「细胞状态可达性」的既有工作地图——所谓可达性，就是问：一个细胞在物理、调控、能量这三重约束下，到底能占据哪些转录状态；同时也给出一个诚实的裁决：这些方法里，到底有哪几样真落进了单细胞 FM 内部。那几个叫得出名字的把手（Waddington 地形、最优传输、能量势、神经 SDE、马尔可夫链命运图、谱系互斥）在动力系统和轨迹 ML 那边都已经成熟。可它们没有一个进到 scGPT、Geneformer、scFoundation、UCE、STATE 或 CellPLM 里头。结果就是：这些 FM 会眼都不眨地解出生物学根本不允许的状态——Oct4 与 GATA6 同时高、互斥的谱系程序同时激活。这是继「意外」与「可迁移」之后的第三层诚实。"
---

> *这篇和[意外 / 不确定性那篇](surprise-and-uncertainty-in-cell-fms.md)（同一束认识论诚实之光，只是换了个角度看）、[双隐空间可迁移性那篇](translatability-dual-latent-vc-fm.md)（分布*之间*的可达性，正是 τ_g 在量的东西）、[器官感知的第六切入点](organelle-aware-cell-fms.md) 以及[闭环 VC 的 101 巡礼](closed-loop-virtual-cells-101.md) 是一家子。这篇问的是第三个诚实的问题：当 FM 提出一个新的细胞状态时，它知不知道生物学到底会不会允许这个状态存在？*

## 这个问题

不是模型能写下来的每一个转录状态，都是细胞真能占据的状态。谱系定型会关上一扇扇门；能量代价让一些吸引子很深、另一些很浅；互斥的转录因子程序靠直接抑制把彼此摁住。细胞坐在一张低维流形上，流形上有**势垒**——Waddington 在 1957 年把它画成表观遗传地形里的一道道脊，现代动力系统生物学把它叫作准势能面，而单单一块 Perturb-seq 面板就把它揭示成一个经验事实：表达空间里的绝大多数点，根本就从没被观察到过。当下的 VC FM 没有把这些里的任何一样编码进去。它们把细胞当成学出来的嵌入里的一个点，过一个 MLP 解码出来，然后会乐呵呵地产出生物学明令禁止的共表达模式。这篇要问的，是那个缺失的先验长什么形状。

## 那几个叫得出名字的把手

动力系统和轨迹推断这一脉，造可达性机器已经造了十年。有六个家族值得认一认。

**单细胞快照上的最优传输。** Waddington-OT（[Schiebinger et al., *Cell* 2019](https://www.cell.com/cell/fulltext/S0092-8674(19)30039-X)）是开山一招——给定一个发育群体的两张快照，去找那个使传输代价最小的耦合，而这代价可以解读成能量距离。TrajectoryNet（[Tong et al., ICML 2020](https://arxiv.org/abs/2002.04461)）把静态耦合换成了一个学出来的连续时间流。CellOT（[Bunne et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01969-x)）和它 2024 年的扰动扩展（[Bunne et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02233-6)）把这套框架推进药物响应预测：未扰动群体和扰动后群体之间的那个 OT 代价，*就是*那个扰动的势垒高度。这是现有最强的可达性先验。

**基于能量的势。** PRESCIENT（[Yeo et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)）从带谱系追踪的快照里，在细胞状态嵌入上学出一个标量势 U(x)。在 U 下用 Langevin 动力学采样，天生就尊重势垒——高 U 区域本就极少被造访。这是 ML 文献里对 Waddington 地形最字面的一次实现，可至今用得太少。

**神经 SDE 与基于 ODE 的动力学。** 有一个在长大的家族（[Tong 2020](https://arxiv.org/abs/2002.04461)；[Sha et al., 2024](https://www.nature.com/articles/s41592-024-02184-y)；[Bunne 2023](https://www.nature.com/articles/s41592-023-01969-x)）拟合的是「漂移 + 扩散」向量场，低速度 / 高散度的区域就充当势垒。MIOFlow（[Huguet et al., NeurIPS 2022](https://arxiv.org/abs/2206.14928)）把流约束在数据流形上，这样轨迹就没法穿越低密度区域「打隧道」过去。

**马尔可夫链命运图。** CellRank（[Lange et al., *Nat Methods* 2022](https://www.nature.com/articles/s41592-021-01346-6)）和 CellRank 2（[Weiler et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02303-9)）在单细胞图上建一个转移矩阵，读出到各个终末状态的吸收概率——这就是可操作的可达性。它与模态无关、能扩到 10⁶ 个细胞，而那个吸收概率，恰恰就是一个 VC FM 本该暴露出来的对象。

**谱系互斥约束。** 数据侧最便宜的先验。转录因子程序之间的互斥，在*成对主调控因子*这个层面是有记载的——早期胚胎的 Oct4/GATA6、神经外胚层 vs 肌肉的 PAX6/MyoD、红系 vs 髓系的 GATA1/PU.1。从 MSigDB 和谱系图谱里凑出几百对这样的组合，就够写一个间隔损失，任何 FM 都能拿它去微调。

## 单细胞 FM 这一边——空的

scGPT（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）、scFoundation、UCE（[Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、CellPLM 和 TranscriptFormer，统统没有流形距离头、没有 OT 代价正则、没有势能监督、没有互斥约束。token 预测这个预训练目标对可达性是盲的：在交叉熵下，一个违反谱系互斥的样本，并不比一个尊重互斥的样本更差——只要边缘 token 概率对得上就行。STATE（[Arc Institute, 2025](https://arcinstitute.org/news/virtual-cell-model-state)）继承了这一切，也没添任何公开的可达性层。

经验上的后果是直接的。Pedrocchi 等人对 scGPT 和 scFoundation 做的稀疏自编码器探针（[Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）显示，许多学出来的特征没有一个干净的生物学解释；另有一份横跨 Geneformer-V2 与 scGPT 的独立 SAE 对比图谱（[Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)）发现，只有大约 6–10% 的转录因子会表现出调控靶点专一的特征响应——这个嵌入里装的*状态比生物学撑得起的还多*。那批清算文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)）显示点估计会回归到训练均值，这其实就是可达性盲表现成的怯懦：当 FM 对势垒没有任何先验时，对「这个扰动会干出什么」最保险的答案，就是全局平均。线性基线赢，是因为它诚实地信息量低；FM 输，是因为它那个高容量解码器在到处幻觉出可达的质量。

没有 scGPT 的 Waddington 头。没有 Geneformer 的 OT 先验。没有 STATE 的势能面。这片底料对可达性是天真的。

## 那些确实编码了约束的相邻 FM

AlphaFold（[Jumper et al., *Nature* 2021](https://www.nature.com/articles/s41586-021-03819-2)）就是相邻生物学里的存在性证明。它的架构在多个层面都受约束：等变注意力尊重 3D 结构，结构模块的循环步骤其实是在物理先验下隐式地迭代精修，而最后那一步松弛用 Amber 力场来消除位阻冲突（[Eastman et al., *J Chem Theory Comput* 2017](https://pubs.acs.org/doi/10.1021/acs.jctc.7b00529)）。这个模型没法输出一个让原子挤占同一空间的结构。ESM-2（[Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)）虽然没放进一条显式的物理约束，但它在进化相关序列上的掩码 LM 目标，隐式地编码了协变：接触位点上被禁的残基对，会被数据本身惩罚。两者都是约束感知的 FM，只是方式不同。

细胞这一边没有对应物。一个生成出来的转录组上，没有 Amber 松弛这一步。共表达基因对上，没有进化协变先验。模型可以在隐空间里产出任意向量，而解码器照单全收去执行。

## 几条微调路径

按可行性排序。这些都不需要重新预训练一遍。

**（1）流形正则微调。** 加一个辅助损失，等于每个生成嵌入到它在训练集里 k-NN 的距离，超过某个按细胞类型设的阈值就罚。这就是把[意外那篇兄弟文](surprise-and-uncertainty-in-cell-fms.md)里的 OOD 检测，改造成一个可达性先验。马氏距离的变体最干净；在一个冻结的 scGPT 之上挂一个小小的校准头，拿现有图谱数据几天就能训出来。

**（2）谱系互斥硬约束。** 从 MSigDB 和 Tabula Sapiens 谱系树里整理 200–500 条互斥的标记对规则。加一个 hinge 损失，惩罚超过某个间隔的共表达。架构不动。一周内就能跑试点。诚实的局限在于覆盖——互斥规则在造血和神经谱系里整理得很好，别处就稀疏了。

**（3）OT 代价辅助头（Bunne 套路）。** 冻结 FM，外加一个 Sinkhorn 或 W₂ 损失，作用在预测态与源态之间，以扰动为条件。CellOT 那套预训练底料让这一招立刻可行；这里的新贡献，是把它当成一条旁路接进转录组 FM，而不是当成一个互相竞争的架构。

**（4）PRESCIENT 式势能头。** 用快照谱系数据，在 FM 的嵌入上共训一个标量 U(x)；把解码器换成在 U 下的 Langevin 采样。这是讲原理的版本——*生成式*的可达性，而不是事后拒绝——也是最难的一条。它同时也是唯一能让 FM 拒绝去采样一个被禁状态、而不是先采出来再被事后惩罚的那条路。

## 裁决 + 还开着的切入点

架构上怎么搭，又一次，是已发表的。守得住的新意面在于整合：把轨迹推断 / 动力系统文献里的可达性机器，拴到一个转录组预训练的 FM 上。有三个具体实验值得跑。

**（a）**在一个 scGPT 派生的 Perturb-seq 预测器上，对照 Replogle（[Replogle et al., *Cell* 2022](https://www.cell.com/cell/fulltext/S0092-8674(22)00746-8)）基准，做谱系互斥 hinge 损失的消融。量一量加之前和加之后，有多大比例的预测至少违反一条整理过的互斥规则。零假设是 FM 已经从数据里隐式抓到了这些规则；这里押的先验是它没抓到。

**（b）**在冻结的 Geneformer 特征之上训一个 PRESCIENT 头，把 Langevin 样本和 scVI 样本拿来比一比被禁共表达的发生率。

**（c）**拿 CellRank 的吸收概率当校准目标：任何提出从状态 A 到状态 B 转移的 VC FM，所报的吸收概率都应该在留出的谱系数据上和 CellRank 的相关。

值得追的人。**Charlotte Bunne**（EPFL → Stanford）做细胞上的 OT，这条线最活跃。**Smita Krishnaswamy**（Yale）做尊重流形的流。**Fabian Theis**（HMGU）做轨迹推断和 scVI 那一族底料。**Jesse Engreitz**（Stanford）和 **Aviv Regev** 在扰动 × 命运的交叉口上做谱系——那正是一个可达性感知的 FM 会用得到的地方。和「意外」「Hi-C」那几篇兄弟文一个 v2/v3 套路：组件都在，细胞 FM 圈子一直在抢规模、抢基准，而护城河在损失的设计里。

一个不肯拒绝被禁状态的虚拟细胞，根本不是虚拟细胞。它是一个带着想象力副作用的回归。
