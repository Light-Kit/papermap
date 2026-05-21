---
title: "这个细胞明天还会在这里吗？虚拟细胞基础模型中的稳定性、生态位依赖与寿命"
summary: "一张关于细胞状态稳定性的先验工作地图——把这个词分解为四个可解释的轴（盆地深度 U、生态位依赖 λ、寿命 τ、群体频率 π）——并对哪些轴已经落进单细胞 FM 给出诚实裁决。这些命名的把手（PRESCIENT 势函数、CellRank 吸收概率、scVelo/dynamo 雅可比、NicheNet 配体-受体耦合、LARRY 谱系追踪寿命、凋亡致敏、SenMayo 衰老特征）在动力系统与轨迹 ML 中已经成熟。它们没有一个作为稳定性头部出货到 scGPT、Geneformer、scFoundation、UCE、STATE 或 CellPLM 上。这是继惊奇、可迁移性、可达性之后的第四个诚实层——也是收束这一四重奏的那一层。"
---

> *认识论诚实四重奏中的第四个同胞。前三个分别问：模型是否知道自己不知道（[惊奇 / 不确定性](surprise-and-uncertainty-in-cell-fms.md)）、一个状态究竟是否可达（[可达性与禁止状态](reachability-and-forbidden-states-in-cell-fms.md)），以及一个细胞情境下的预测在迁移到另一个情境后是否存活（[双隐空间可迁移性](translatability-dual-latent-vc-fm.md)）。这篇随笔问第四个：一旦模型把一个细胞放在某个状态，那个状态会留下吗、留多久，又依赖于哪些外源信号？横切到[关于代谢底物的、细胞器感知的第六楔形](organelle-aware-cell-fms.md)，以及[闭环 101](closed-loop-virtual-cells-101.md)中下游智能体如何处置这个答案。*

## 问题

一个细胞不是流形上的一个点。它是一个带有半衰期和一串依赖关系的点。一个初始（naive）T 细胞需要紧张性（tonic）IL-7 信号，否则它会在数天内死亡。一个调节性 T 细胞需要 TGFβ，否则它会失去 Foxp3 并转化。一个衰老细胞之所以"稳定"，只是在它既拒绝死亡也拒绝分裂这个意义上——一种卡住，而非一个稳态。一个对某个 TME 配体成瘾的肿瘤细胞在体内存活，并在你把它放到组织培养塑料上的那一刻分崩离析。这些区分没有一个住在转录组 FM 的解码器里。FM 提出一个状态，损失函数奖励 token 级的准确度；持存是别人的问题。这篇随笔的问题是：当"稳定"被分解为四个可以逐一测量、归因和审计的轴时，一个稳定性先验呈现什么形状。

## 分解这个词

四个命名的头部，每一个在动力系统或单细胞基因组学文献中都有一个已发表的把手。

**U(c)——盆地深度。** Waddington 景观量。深盆地意味着该状态在小扰动后回弛；浅盆地意味着轻轻一推就会把它推向别处。PRESCIENT（[Yeo et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)）从快照谱系数据学得一个标量势 U(x)，其 Langevin 采样尊重势垒。CellRank 2（[Weiler et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02303-9)）计算进入终末宏观态的吸收概率——操作上，这是 U 的动力学口味。scVelo（[Bergen et al., *Nat Biotechnol* 2020](https://www.nature.com/articles/s41587-020-0591-3)）与 dynamo（[Qiu et al., *Cell* 2022](https://www.cell.com/cell/fulltext/S0092-8674(21)01577-7)）拟合漂移+扩散向量场；不动点处的雅可比特征值直接给出线性稳定性。

**λ(c)——生态位依赖。** 一个细胞只有在撑起它的外源信号条件下才"稳定"。其数学把手是梯度 ∂U/∂(生态位驱动的程序)：如果你在计算机里消融掉 IL-7 响应程序而盆地坍塌，那么该细胞依赖 IL-7。NicheNet（[Browaeys et al., *Nat Methods* 2020](https://www.nature.com/articles/s41592-019-0667-5)）与 CellChat（[Jin et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-21246-9)）预测每个细胞消耗哪些配体-受体通道。空间组学（[Visium, MERFISH](https://www.nature.com/articles/s41592-021-01358-2)）给出那些配体从中抵达的实际邻域。**正是这个头部，让"什么环境"可以被回答为一个逐细胞向量**——由命名配体依赖关系构成，而非一个含糊的"情境"。

**τ(c)——寿命。** 动力学稳定性。中性粒细胞约存活 5 天，记忆 T 细胞数十年。谱系追踪实验直接测量 τ。LARRY（[Weinreb et al., *Science* 2020](https://www.science.org/doi/10.1126/science.aaw3381)）是规范的、可扩展的 scRNA-seq 谱系追踪底料；GESTALT 与水印系统延伸了这一想法。诸如 SenMayo（[Saul et al., *Nat Commun* 2022](https://www.nature.com/articles/s41467-022-32552-1)）的衰老特征标记出一种不同的模式——长寿但增殖停滞。凋亡致敏（[Sarosiek et al., *Cancer Cell* 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）测量一个细胞坐得离线粒体凋亡阈值有多近，是 τ 必须匹配的湿实验金标准。

**π(c)——群体概率。** 经验图谱分布下的频率。高 π 意味着该状态常被观测到；与低 U 结合则意味着常见-但-病理（肿瘤中的耗竭 T 细胞、衰老组织中的衰老成纤维细胞）。在 FM 嵌入上的贝叶斯密度估计——与供给 U 的同一个流、只是换了归一化——免费给出这个。

四者之积不是单一标量。它是每个细胞一个四维向量，分解出该细胞稳定或不稳定的"为什么"。

## 单细胞 FM 的图景——空白

scGPT（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）、scFoundation、UCE（[Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、CellPLM、TranscriptFormer，以及 STATE（[Arc Institute 2025](https://arcinstitute.org/news/virtual-cell-model-state)）都没有把 U、λ、τ、π 中的任何一个作为已发表的头部出货。掩码-token 预训练目标对稳定性是盲的：一个违反寿命生物学的 token 序列——比如高细胞周期蛋白与终末凋亡致敏共表达——只要边际 token 概率对得上，就不会招致额外损失。2025 年的清算（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)）测量的是模型回归到 *哪个均值*，而非预测出的状态有多耐久。

scVI 的 ELBO（[Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)）是底料中现有最接近的把手，但它捕捉的是密度而非盆地深度，并且它没有生态位依赖或寿命层。STATE 的适配器 API 没有提供任何关于"在一次预测的扰动转移后持存"的已发表校准。在 scGPT 与 scFoundation 上的稀疏自编码器可解释性（[Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）是稳定性归因的一个前提条件，但不是分数本身——它暴露出这些头部将要读取的特征。

没有 scGPT 盆地深度头部。没有 Geneformer 生态位依赖梯度。没有 STATE 寿命回归。这个四维向量尚未被计算。

## 那些出货了某种稳定性形状之物的相邻 FM

结构生物学 FM 朝它打了个手势。AlphaFold-Multimer（[Evans et al., 2021](https://www.biorxiv.org/content/10.1101/2021.10.04.463034v2)）出货了界面 PAE，作为关于相对位置的逐残基对置信度——在结合界面尺度上的一个持存置信度代理。ESM-2 困惑度（[Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)）在蛋白层面校准变异效应预测——"这个替换有多 *稳定*"正是它的惯用语。基因组 FM（Enformer、AlphaGenome）发出轨迹而非细胞状态之间的转移概率；它们不在这个本体里。

在细胞这一侧最接近的相邻测量是 BH3 谱（[Letai 实验室](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）——一项关于一个细胞为凋亡致敏到何种程度的湿实验测量。它是任何计算机内稳定性分数都必须匹配的金标准 τ-锚点。还没有任何转录组 FM 在一个已发表的基准上与它正面匹敌过。

## 算法

一个冻结-FM 微调配方。在固定的 scGPT 或 Geneformer 嵌入之上的四个头部；没有一个需要新的预训练运行。

**U 头部。** 在 FM 嵌入上的一个归一化流，在 HCA / CELLxGENE 预训练细胞上训练。一个留出细胞在该流下的对数密度就是势。校准锚点：PRESCIENT 式的 Langevin 样本在收敛时应复现经验密度。

**λ 头部。** 对每个细胞，通过 NicheNet 配体-程序特征（[Browaeys 2020](https://www.nature.com/articles/s41592-019-0667-5)）识别候选生态位-配体通道。扰动输入中每个配体驱动的基因程序（把响应者集合置零，或把其表达掩码到群体中位数）。重新计算 U。梯度 ∂U/∂(配体-程序) 就是逐细胞、逐配体的依赖分数。输出：一个在命名配体上的稀疏向量。一个 λ 主导于 IL-7 的 T 细胞，与一个 λ 主导于 TGFβ 的 Treg，于是可直接比较。

**τ 头部。** 用三个信号源进行监督回归：(i) 在可得处的 LARRY-追踪寿命估计、(ii) 从同一 FM 嵌入导出的 RNA-速度周转率，以及 (iii) 针对 SenMayo 衰老（[Saul 2022](https://www.nature.com/articles/s41467-022-32552-1)）与凋亡致敏基因特征（[Sarosiek 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）的手工评分。SCENIC+ TF-调控子分数（[Bravo González-Blas et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)）作为辅助特征喂入。输出：一个以小时-到-年为单位的逐细胞期望寿命。

**π 头部。** 图谱边际密度。与 U 同一个归一化流，但用不同的归一化层；比值 U/π 把"深且常见"（记忆 T）与"深但稀有"（长寿造血干细胞）、"浅但常见"（循环祖细胞）、"浅且稀有"（模型的幻觉）区分开来。

**S 复合。** 一个可学习的线性组合 S = w · [U, λ, τ, π]，由下游任务监督："预测哪些状态在细胞因子撤除后存活"、"预测哪些耗竭 T 细胞对检查点阻断有响应"、"预测这个肿瘤细胞是否在组织培养塑料上坍塌"。

**可解释性层。** 三个栈。(i) 逐头部 SAE 特征（[Pedrocchi 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)）把 U-贡献映射到单义基因程序。(ii) 逐配体 λ 排名给出命名环境的答案。(iii) SenMayo / BH3-特征分解使 τ 可检视。输出句子模板："S(c) = 0.3，其中 U 高（深盆地），但 λ 主导于 IL-7——预测消融 IL-7 会使 U 坍塌 40%。"

## 裁决 + 开放楔形

三个具体的验证实验。(a) 来自 TGFβ-敲除小鼠的 Treg → λ 应在敲除前就把 TGFβ 依赖标记为主导；U 应在敲除后坍塌。(b) 健康外周血中的中性粒细胞 → 尽管 π 高，τ 短。(c) 耗竭的 CD8 T 细胞 → 在肿瘤中低 U、高 π，在健康组织中低 π；这个四维向量把"常见-但-病理"与"常见-且-稳定"区分开——这是这个领域用肉眼判断了十五年的一个区分。

值得追踪的名字。**Charlotte Bunne**（EPFL → Stanford），因其对生态位转移的 OT 框架，以及现有最干净的扰动-稳定性工作。**Manolis Kellis**（MIT），因调控子-与-衰老轴。**Aviv Regev**，因图谱尺度的密度和经验性的 π。**Anthony Letai**（Dana-Farber），因 BH3 致敏作为湿实验 τ 锚点。**Marius Lange**（Theis 实验室），因 U 头部可整体借用的 CellRank-2 吸收概率机械装置。

与前三个同胞相同的 v2/v3 模式：组件已存在，细胞-FM 社区一直在为规模与基准赛跑，而护城河在于损失设计与联合底料。一个无法告诉你它靠什么活下去的虚拟细胞不是一个虚拟细胞。它是一张快照，而快照没有未来。
