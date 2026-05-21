---
title: "可解释性到底摸清了细胞基础模型的什么？SAE、注意力探针，以及那道调控逻辑的缺口"
summary: "一份单细胞 FM 可解释性的现有研究地图——到底是谁在真刀真枪地拆开 scGPT、Geneformer、scFoundation、UCE 和 STATE，哪些方法已经落地，那些主张又究竟走到了哪一步。SAE 图谱（Pedrocchi/Boeva ETH，Kendiukhov Tübingen）、transcoder 电路分析（Hosokawa 东京）、概念瓶颈（Claye Paris-Saclay）、注意力探针，都在 2025–2026 年陆续交付。这些彼此独立的团队，正汇出一个共识：细胞 FM 编码了丰富的生物结构（通路、模块、细胞类型身份），却几乎没编码因果调控逻辑。约 29–59% 的 SAE 特征能拿到干净的 GO/Reactome 标签；只有约 6–10% 的转录因子，对扰动表现出调控靶点特异的响应。多项压力测试如今显示，注意力衍生的 GRN 边，被平凡的共表达基线打败。这是「认知诚实」这条弧线里的第六篇，开出了与意外性 / 可达性 / 可迁移性 / 稳定性 / 多模态稳定性并列的姊妹层。"
---

> *这条弧线的第六篇。前五篇——[意外性](surprise-and-uncertainty-in-cell-fms.md)、[可达性](reachability-and-forbidden-states-in-cell-fms.md)、[可迁移性](translatability-dual-latent-vc-fm.md)、[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)、[多模态稳定性](multimodal-stability-and-failure-modes-in-vc-fms.md)——分别在问：模型*不*知道什么、*够不到*什么、*迁移不了*什么、*维持不住*什么、跨模态*互验不了*什么。这一篇要问的，是那五篇都悄悄假定了答案的那个问题：当模型吐出一个表征，到底有没有人能读懂里面究竟装了什么？它还横向连到[器官感知的第六切口](organelle-aware-cell-fms.md)（可解释性需要什么样的底料特征），以及[闭环 101](closed-loop-virtual-cells-101.md)（一个下游智能体拿到一个可解释特征会怎么用）。*

## 这个问题

前五篇每一篇都朝「特征级把手」招了招手，却没真把相关文献捡起来。「逐头的 SAE 特征把盆地深度映到单义的基因程序上」——这话假定了一个细胞 FM 上的 SAE 存在、而且好用。「在 Pedrocchi 式特征上用可靠性图做校准」——这话假定了那些特征在多次运行间是稳定的。本篇要问的，就是这笔假设的账有没有人付。2025–2026 年里，谁用比 UMAP 和注意力热图更硬的方法，打开过 scGPT、Geneformer、scFoundation、UCE 和 STATE？他们发现了什么？而他们发现的东西，是真撑得起前五篇勾画的那些算法，还是说那个承重层至今仍是个空想？老实读下来，答案是：一片真正的可解释性文献如今已经存在，一个清晰的经验模式已经浮现，而这个模式，和 scGPT、Geneformer 当初发布时的说法，差不多正好相反。

## 已经落地的那些方法

2025–2026 年的可解释性浪潮，从 LLM 那边的机制可解释性几乎原封不动地搬来了四类方法，落到了细胞 FM 上。

**稀疏自编码器。** 最主流的一手。[Pedrocchi, Barkmann, Joudaki & Boeva（ETH Zürich），bioRxiv 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)（已被 ICLR 2026 接收）是第一篇标杆之作——在 scGPT 和 scFoundation 的残差流上训 TopK SAE，特征可被「驾驶」以剥掉技术混杂维度。[Ihor Kendiukhov（U Tübingen）](https://arxiv.org/abs/2603.02952) 在 2026 年 2–3 月把这条线延伸了，跨 Geneformer-V2 和 scGPT 做了一份对比性的 SAE 图谱，外加一个 JumpReLU 的后续。SAE 特征是这个领域以前所谓「可解释基因程序」的现代替身，但和 NMF 或 scVI 因子不同，它是从 FM 自身的内部几何里冒出来的，而不是硬加在原始数据上的。

**Transcoder。** 更干净的电路分解。[Hosokawa et al.（U Tokyo），arXiv 2509.14723](https://arxiv.org/abs/2509.14723) 把 Anthropic 风格的 transcoder 移植到了 Cell2Sentence 上，给出了一种逐 token 的组合式分解——这是 SAE 那套底料给不了的。目前还是孤篇一作，但这套方法在 LLM 一边已经很成熟。

**概念瓶颈 + 反事实。** [Claye, Marschall, Ouerdane, Hudelot, Duquesne（Scienta Lab + CentraleSupélec），arXiv 2510.25807](https://arxiv.org/abs/2510.25807) 在一个冻结的 scRNA-seq FM 之上训了一个可解释的瓶颈层，再用反事实归因去问「要变什么，模型才会改判成另一类」。它请了一位湿实验免疫学家当审计通道来测——这是细胞这一边现存最干净的「人在环」可解释性故事。

**因果电路追踪。** [Kendiukhov, arXiv 2603.01752](https://arxiv.org/abs/2603.01752) 把 SAE 特征消融当成一种因果干预，作用到 Geneformer 和 scGPT 的内部，一步一步照搬 LLM 机制可解释性的剧本。架构是借来的；结论（下一节）则是生物学专属的。

方法是搬来的；原创之处，在于把哪些生物学钉到了特征上。

## 已经发现了什么

这些彼此独立的团队，汇出了一个清晰的经验模式——而它对那套「奠基论文」的叙事，并不友好。

**特征能贴标签的覆盖率约 29–59%，调控靶点的约 6–10%。** SAE 图谱（[Pedrocchi 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)；[Kendiukhov 2603.02952](https://arxiv.org/abs/2603.02952)）报告说，单义特征里大约三分之一到一半能对上 GO、Reactome 或 TRRUST 的注释——有意义，但离「模型已经学会了调控组」这种框定还差得远。更严的那个测试——一个特征会不会**特异地**响应「扰动某个 TF 的已知靶点」——只有约 6–10% 的转录因子能过。模型学到的是共现的生物学，不是因果的调控者。

**注意力能打赢平凡的共表达基线吗？打不赢。** [Kendiukhov 2602.17532](https://arxiv.org/abs/2602.17532) 和 [bioRxiv 上那套基因组注意力框架（2025 年 6 月）](https://www.biorxiv.org/content/10.1101/2025.06.26.661544v1) 系统评估了 Geneformer 和 scGPT 里注意力衍生的边，发现就扰动响应预测而言，注意力捕到的是**共表达**，而不是独有的调控信号——一个平凡的基线就能复现出注意力权重信号的大部分。这直接顶撞了原版 Geneformer 论文里「注意力关注 TF」的说法。如今三个独立团队的看法一致。

**分层抽象是真的。** 跨多份 SAE 图谱看，浅层承载基因身份特征，中层承载通路级特征，深层承载细胞类型和组织特征。细胞 FM **确实**学到了层级——分歧在于，这个层级里到底有没有因果逻辑。

**至今还没有任何前瞻性的湿实验验证。** 截至 2026 年 5 月，细胞 FM 文献里所有的可解释性验证，都是事后对照已发表的注释做的。没有任何一个 SAE 特征被用来预测一个**随后**在 CRISPR 中得到核实的表型。这是这个领域最大的可信度缺口。

## 那些「带点可解释性形状」的相邻 FM

蛋白这一边的 FM，可解释性是天生自带的。AlphaFold 的 pLDDT 和 PAE（[Jumper 2021](https://www.nature.com/articles/s41586-021-03819-2)）是残基层面对「持久性」的置信度；ESM-2 的困惑度（[Lin 2023](https://www.science.org/doi/10.1126/science.ade2574)）在 217 个深度突变扫描数据集上，校准了变体效应的排序。基因组 FM（Enformer、AlphaGenome）逐核苷酸地吐出归因轨道，湿实验的启动子测定几天内就能证伪。LLM 那边的机制可解释性文献（[Anthropic 的 transcoder、稀疏自编码器、电路追踪](https://transformer-circuits.pub/)），是上面所有这些细胞侧方法的方法论母体；Pedrocchi、Kendiukhov、Hosokawa、Claye 在构造上都是它的下游。细胞这一边把整条流水线搬了过来。它还没搬过来的，是那一步「湿实验证伪」——蛋白 FM 和 LLM 可解释性都有这一步；细胞 FM 可解释性没有。

## 路线图——怎么把缺口补上

三条实现路径，按数据需求从低到高排。

**（C）SAE 特征 → 前瞻性湿实验。** 数据要的最少，可信度回报最大。从 Pedrocchi 图谱里挑一个高置信特征，预测「在某个细胞系里扰动某一组特定基因*应当*把它激活」，跑 Perturb-seq，再对一对。一个特征、一个实验，就是这个领域第一条前瞻性的可解释性主张。要花数月的台前时间。

**（A）探针基准——AssayBench 形状、可解释性质量形状。** 一套标准化面板：在不同 FM 上训的 SAE，会不会找到同一批特征？在一个 FM 里被消融的特征，退化的下游任务，和另一个 FM 里被消融时的一样吗？通过注意力探针恢复出的调控子，在数量上对得上 Perturb-seq 的边吗？这就是去补 [AssayBench（De Brouwer 2026）](https://arxiv.org/abs/2605.10876) 开出的那道口子——化验预测有了基准，解释质量还没有。

**（B）在 UCE / scFoundation / STATE 上做逐细胞类型的电路剖解。** 目前除了 scGPT 和 Geneformer，还没有任何已发表的剖解。UCE 和 scFoundation 在不同的底料上预训练；STATE 有显式的扰动监督和一个公开的适配器 API，可独立的机制可解释性工作却为零。在 STATE 里第一次用电路追踪追出一组「耗竭」或「EMT」调控因子，就会是一篇有分量的论文。

老实说，方法跑在了它们所应用的经验生物学前头。这波可解释性在方法上已经成熟，却被底料绑住了；下一步该往生物学那一边走。

## 结论 + 还开着的切口

三个能解决当下悬而未决问题的具体实验。(a) 在 STATE 的残差流上跑一遍 [Pedrocchi SAE 流水线](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，看看显式的扰动预训练，会不会比 scGPT 显出更多「调控靶点特异」的特征——从「扰动监督 vs 掩码语言模型」这个框架来推，预测是会；可这个领域还没去查。(b) 对 Kendiukhov 发现的那约 10% 有靶点特异特征的 TF，设计一个 CRISPR-i 湿实验去**前瞻性地**测那个预测；报出假阳性率；这就是缺失的那一次湿实验握手。(c) 把 Patel 式的 scGPT SAE 特征，当成[稳定性那篇姊妹文勾画的](cell-stability-and-niche-dependence-in-vc-fms.md)逐细胞稳定性头的底料——这就闭环了：可解释性特征，变成了 U / λ / τ / π 那几个回归读取的输入。

值得追的几个名字。**Valentina Boeva**（ETH Zürich），标杆的「SAE-on-scGPT」流水线。**Ihor Kendiukhov**（Tübingen），那份压力测试图谱——这个领域最成体系的一次可解释性战役。**Sosuke Hosokawa**（东京），细胞底料上的 transcoder。**Charlotte Claye**（Scienta Lab / Paris-Saclay），人在环的概念瓶颈。**Fabian Theis**（Helmholtz Munich），[Nicheformer](https://www.nature.com/articles/s41592-025-02814-z) 那条组织生态位探针轴。细胞 FM 的几个奠基实验室（Theodoris、Bo Wang、Arc），到目前为止在独立可解释性上，反倒不如这些方法的采用者活跃——随着这个领域开始消化那道调控逻辑缺口，这一点 2026 年可能会变。

方法是搬来的，经验模式是真的，缺的是那一次湿实验握手。一个可解释性止步于 GO 标签的细胞基础模型，不叫可解释。那叫被注释过。
