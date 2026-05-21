---
title: "可解释性对细胞基础模型究竟知道些什么？SAE、注意力探针，以及调控逻辑的缺口"
summary: "一份单细胞 FM 可解释性的现有研究地图——谁在真正打开 scGPT、Geneformer、scFoundation、UCE 和 STATE 这只盒子，哪些方法已经落地，以及那些主张实际走到了多远。SAE 图谱（Pedrocchi/Boeva ETH，Kendiukhov Tübingen）、transcoder 电路分析（Hosokawa 东京）、概念瓶颈（Claye Paris-Saclay）和注意力探针都在 2025–2026 年陆续交付。这些独立团队之间正在浮现的共识：细胞 FM 编码了丰富的生物结构（通路、模块、细胞类型身份），但只编码了极少的因果调控逻辑。约 29–59% 的 SAE 特征能赢得干净的 GO/Reactome 标签；只有约 6–10% 的转录因子对扰动表现出调控靶点特异的响应。多项压力测试如今显示，注意力衍生的 GRN 边被平凡的共表达基线击败。这是认知诚实弧线中的第六篇随笔，开启了与意外性 / 可达性 / 可迁移性 / 稳定性 / 多模态稳定性并列的姊妹层。"
---

> *本弧线的第六篇随笔。前五篇——[意外性](surprise-and-uncertainty-in-cell-fms.md)、[可达性](reachability-and-forbidden-states-in-cell-fms.md)、[可迁移性](translatability-dual-latent-vc-fm.md)、[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)、[多模态稳定性](multimodal-stability-and-failure-modes-in-vc-fms.md)——问的是模型 *不* 知道什么、*不能* 到达什么、*不能* 迁移什么、*不能* 维持什么、以及 *不能* 跨模态交叉验证什么。本篇随笔则提出那五篇悄悄假定了答案的问题：当模型产生一个表征时，有没有人能读出里面究竟是什么？横向连接到[器官感知的第六楔子](organelle-aware-cell-fms.md)，谈可解释性所需的底料特征；以及[闭环 101](closed-loop-virtual-cells-101.md)，谈下游智能体会拿一个可解释特征做什么。*

## 这个问题

前面五篇随笔每一篇都指向了一个特征层面的把手，却没有真正去捡起实际的文献。"逐头 SAE 特征把盆地深度映射到单义的基因程序"假定了一个建在细胞 FM 上的 SAE 存在、且足够好用。"通过 Pedrocchi 式特征上的可靠性图做校准"假定了那些特征在多次运行间是稳定的。本篇随笔的问题是：这个假定是否被付了账。在 2025–2026 年，谁用比 UMAP 和注意力热力图更强的方法打开了 scGPT、Geneformer、scFoundation、UCE 和 STATE？他们发现了什么？而他们的发现，对前五篇随笔勾勒的算法是否承重，还是说那个承重的层仍是空想？诚实的解读结果是：一个真实的可解释性文献如今已经存在，一个清晰的经验模式已经浮现，而这个模式大致与 scGPT 和 Geneformer 发布时所宣称的相反。

## 已经落地的方法

2025–2026 年的可解释性浪潮，从 LLM 一侧的机理可解释性引进了四类方法，并大体原封不动地把它们落到了细胞 FM 上。

**稀疏自编码器（Sparse autoencoders）。** 占主导的动作。[Pedrocchi, Barkmann, Joudaki & Boeva（ETH Zürich），bioRxiv 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)（被 ICLR 2026 接收）是第一份经典研究——在 scGPT 和 scFoundation 残差流上训练的 TopK SAE，其特征可被引导（steerable）以移除技术混杂维度。[Ihor Kendiukhov（U Tübingen）](https://arxiv.org/abs/2603.02952) 在 2026 年 2–3 月对此做了扩展，给出了一个横跨 Geneformer-V2 和 scGPT 的比较性 SAE 图谱，外加一个 JumpReLU 后续。SAE 特征是该领域过去所称的"可解释基因程序"的现代替身，但与 NMF 或 scVI 因子不同，它们从 FM 自身的内部几何中涌现，而非被强加于原始数据之上。

**Transcoder。** 更干净的电路分解。[Hosokawa et al.（U Tokyo），arXiv 2509.14723](https://arxiv.org/abs/2509.14723) 把 Anthropic 风格的 transcoder 移植到 Cell2Sentence，给出了 SAE 底料所不具备的逐 token 的组合式分解。仍是单篇论文，但该方法论在 LLM 一侧已经成熟。

**概念瓶颈 + 反事实。** [Claye, Marschall, Ouerdane, Hudelot, Duquesne（Scienta Lab + CentraleSupélec），arXiv 2510.25807](https://arxiv.org/abs/2510.25807) 在一个冻结的 scRNA-seq FM 之上训练一个可解释的瓶颈层，并用反事实归因来问"要让模型预测另一个类别，需要改变什么"。以一位湿实验免疫学家作为审计通道进行测试——是细胞一侧现有最干净的人在环可解释性故事。

**因果电路追踪。** [Kendiukhov, arXiv 2603.01752](https://arxiv.org/abs/2603.01752) 用 SAE 特征消融作为对 Geneformer 和 scGPT 内部的因果介入，一步步走 LLM 机理可解释性的剧本。架构是借来的；发现（下一节）则是生物特异的。

方法是引进来的；原创性在于它们把哪些生物学钉到了特征上。

## 已经发现的东西

一个清晰的经验模式已在这些独立团队之间浮现，而它对那套创始论文的叙事并不讨好。

**特征以约 29–59% 的覆盖率被标注，调控靶点则为约 6–10%。** SAE 图谱（[Pedrocchi 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)；[Kendiukhov 2603.02952](https://arxiv.org/abs/2603.02952)）报告，大约三分之一到二分之一的单义特征能与 GO、Reactome 或 TRRUST 注释相匹配——有意义，但远未达到"模型已学会调控组"的措辞。更严格的测试——一个特征是否 *特异地* 对扰动某个 TF 的已知靶点作出响应——只对约 6–10% 的转录因子通过。模型学到的是共现的生物学，而非因果调控因子。

**注意力击败了平凡的共表达基线吗？没有。** [Kendiukhov 2602.17532](https://arxiv.org/abs/2602.17532) 和 [bioRxiv 上的基因组注意力框架（2025 年 6 月）](https://www.biorxiv.org/content/10.1101/2025.06.26.661544v1) 系统地评估了 Geneformer 和 scGPT 中注意力衍生的边，发现对于扰动响应预测，注意力捕捉的是 *共表达* 而非独特的调控信号——一个平凡基线就能复现大部分注意力权重信号。这直接反驳了原始 Geneformer 论文中"注意力关注 TF"的措辞。如今有三个独立团队达成一致。

**逐层分层的抽象是真实的。** 跨各份 SAE 图谱，早期层携带基因身份特征，中间层携带通路级特征，晚期层携带细胞类型与组织特征。细胞 FM *确实* 学到了层级——分歧在于这个层级是否包含因果逻辑。

**尚不存在前瞻性的湿实验验证。** 截至 2026 年 5 月，细胞 FM 文献中的所有可解释性验证都是事后地对照已发表注释。零个 SAE 特征曾被用来预测一个 *随后* 在 CRISPR 中被验证的表型。这是该领域最大的可信度缺口。

## 那些交付了某种可解释性形状之物的相邻 FM

蛋白一侧的 FM 在构造上就交付可解释性。AlphaFold 的 pLDDT 和 PAE（[Jumper 2021](https://www.nature.com/articles/s41586-021-03819-2)）是残基层面对结构持续性的置信度；ESM-2 困惑度（[Lin 2023](https://www.science.org/doi/10.1126/science.ade2574)）在 217 个深度突变扫描数据集上校准了变异效应的排序。基因组 FM（Enformer、AlphaGenome）逐核苷酸发出归因轨迹，湿实验启动子检测可在数日内将其证伪。LLM 一侧的机理可解释性文献（[Anthropic 的 transcoder、稀疏自编码器、电路追踪](https://transformer-circuits.pub/)）是上面在细胞一侧点名的每一种方法的方法论之父；Pedrocchi、Kendiukhov、Hosokawa 和 Claye 在构造上都是下游。细胞一侧引进了这条流水线。它尚未引进的，是那一步湿实验证伪——蛋白 FM 和 LLM 可解释性工作两者都有；细胞 FM 可解释性则没有。

## 路线图——什么能弥合缺口

三条实施路径，按数据需求排序。

**(C) SAE 特征 → 湿实验前瞻性测试。** 数据需求最小，可信度回报最大。从 Pedrocchi 图谱中挑一个高置信度特征，预测在某细胞系中扰动一个特定基因集 *应当* 激活它，跑 Perturb-seq，比较。一个特征，一个实验，该领域首个前瞻性可解释性主张。需要数月的实验台时间。

**(A) 探测基准——AssayBench 形状的、可解释性质量形状的。** 一个标准化面板：在不同 FM 上训练的 SAE 是否找到相同的特征？在一个 FM 中被消融的特征，是否退化与另一个 FM 中相同的下游任务？通过注意力探针复原的调控子（regulon），是否在量上匹配 Perturb-seq 的边？这就是弥合 [AssayBench（De Brouwer 2026）](https://arxiv.org/abs/2605.10876) 所开启缺口的东西——检测预测有一个基准；解释质量则没有。

**(B) 在 UCE / scFoundation / STATE 上做逐细胞类型的电路解剖。** 目前没有超出 scGPT 和 Geneformer 的已发表解剖。UCE 和 scFoundation 在不同底料上预训练；STATE 有显式的扰动监督和一个公开的适配器 API，却没有任何独立的机理可解释性工作。在 STATE 中首个被电路追踪出的耗竭或 EMT 调控因子集，将是一篇有意义的论文。

诚实的解读是：方法领先于它们所被应用到的经验生物学。这波可解释性在方法论上成熟、却受底料约束；下一步在生物一侧。

## 裁决 + 开放的楔子

三个能解决当前开放问题的具体实验。(a) 在 STATE 的残差流上跑 [Pedrocchi SAE 流水线](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，并询问那显式的扰动预训练是否表现为比 scGPT 更多的调控靶点特异特征——从扰动监督对掩码语言模型的框架来看，预测是肯定的；该领域尚未核对。(b) 对于 Kendiukhov 发现具有靶点特异特征的那约 10% 的 TF，设计一个单一的 CRISPR-i 湿实验来 *前瞻性地* 测试预测；报告假阳性率；这是缺失的那次湿实验握手。(c) 把 Patel 式的 scGPT SAE 特征用作[稳定性同胞篇所勾勒](cell-stability-and-niche-dependence-in-vc-fms.md)的逐细胞稳定性头的底料——闭合：可解释性特征成为 U / λ / τ / π 回归所读取的输入。

值得追踪的名字。**Valentina Boeva**（ETH Zürich），经典的 SAE-on-scGPT 流水线。**Ihor Kendiukhov**（Tübingen），那个压力测试图谱——该领域最协调的可解释性战役。**Sosuke Hosokawa**（Tokyo），细胞底料上的 transcoder。**Charlotte Claye**（Scienta Lab / Paris-Saclay），人在环的概念瓶颈。**Fabian Theis**（Helmholtz Munich），[Nicheformer](https://www.nature.com/articles/s41592-025-02814-z) 的组织-生态位探测轴。细胞 FM 的创始实验室（Theodoris、Bo Wang、Arc）在独立可解释性上迄今不如那些方法论采纳者活跃——随着该领域消化调控逻辑的缺口，这或许会在 2026 年改变。

方法是引进来的，经验模式是真实的，而那次湿实验握手是缺失的。一个可解释性止步于 GO 标签的细胞基础模型，并不是可解释的。它是被注释的。
