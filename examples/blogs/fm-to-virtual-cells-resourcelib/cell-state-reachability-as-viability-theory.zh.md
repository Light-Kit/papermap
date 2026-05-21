---
title: "细胞状态可达性作为生存力理论：一个分层流形框架，以及它所蕴含的 v0.1"
summary: "认知诚实弧线中的第八篇文章，也是首篇停止诊断、转而提出模型的文章。前面几篇姊妹篇追问当前细胞 FM 做不到什么（surprise、可达性、可翻译性、稳定性、多模态稳定性、可解释性），并交付了一份为 λ 头服务的、可证伪的两周预备实验。本文为那份预备实验所朝向的更大模型命名——一个锚定于 Aubin 生存力理论（viability theory）的可达性基础模型。细胞状态流形成为一个分层空间：一个已实现的内部（沿发育或演化轨迹出现的状态）、一个可工程化的边界（可由 iPSC 式重编程、TF 鸡尾酒、转分化抵达的状态）、以及一个被禁止的外部（物理或化学约束排除的状态）。模型是一个 diffusion / flow-matching 骨干（CFGen、CellFlow）加上三个新头：一个层位分类器、一个推广 scDiffEq 的谱系图连通性先验、以及一个把 SCENIC+ 调控拮抗、调控 FBA 通量不可行性与布尔调控逻辑相容性相加的禁止能量项。新意在于组合——而生存力理论正是那条让它能抵御不可避免的『这不过是 OOD 检测』审稿意见的引用。"
---

> *认知诚实弧线中的第八篇文章，也是首篇停止追问现有 FM 做不到什么、转而开始提出能够做到的模型的文章。前面七篇——[surprise](surprise-and-uncertainty-in-cell-fms.md)、[可达性](reachability-and-forbidden-states-in-cell-fms.md)、[可翻译性](translatability-dual-latent-vc-fm.md)、[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)、[多模态稳定性](multimodal-stability-and-failure-modes-in-vc-fms.md)、[可解释性领域现状](interpretability-state-of-cell-fms.md)，以及[生态位依赖预备实验](reading-niche-dependence-off-frozen-cell-fms.md)——诊断出缺口，并交付填补其中一块的最小实验。[五十个概念一篇文章](fifty-concepts-one-essay.md) 整合了词汇。本文把这些碎片组装成一个研究计划：一个关于什么能存在、什么能被造出、什么不能的分层流形基础模型。*

## 问题

前七篇文章汇聚到一个该领域一直绕着问而非正面问的问题：不是"我们能多准确地预测扰动响应"，而是"一个细胞究竟能占据哪些状态？"可达性那篇姊妹篇把答案勾勒为自然 / 诱导 / 禁止，却止步于诊断。稳定性那篇姊妹篇把 `stable` 分解为四个可解释的头，而生态位依赖预备实验把那一个新头（λ）作为两周的证伪器交付。本文为预备实验所朝向第一步的那个模型命名——一个 *可达性基础模型*，它把任意查询细胞状态分类进三个层位、把分类归因于一个具名的成因、并在状态可达时提出一条路径。数学骨干已有四十年历史，但从未在 FM 规模上应用于单细胞。模型配方是叠在既有 diffusion / flow-matching 机器之上的一层薄皮。新意在于组合，而智能体的任务是构建 v0.1。

## 理论骨干

为这套框架找的正确引用，不是分布外检测，也不是开集识别——而是 Aubin 的生存力理论（[Aubin, *Viability Theory*, Birkhäuser 1991](https://link.springer.com/book/10.1007/978-3-642-16684-6)；修订版 [Aubin, Bayen & Saint-Pierre, 2011](https://link.springer.com/book/10.1007/978-3-642-16684-6)），其数学陈述了一个受约束的动力系统能占据什么、以及它如何到达那里。三个原生对象直接映射到三个细胞状态层位：**生存力核**（viability kernel，在自然动力学下可无限期抵达的状态）是已实现的内部；**捕获盆**（capture basin，在把系统驱回生存力核的受控输入下可抵达的状态）是可工程化的边界；**非生存力补集**是被禁止的外部。Hamilton-Jacobi 可达性（[Mitchell, Bayen & Tomlin, *IEEE TAC* 2005](https://ieeexplore.ieee.org/document/1463302)；[Bansal, Chen, Herbert & Tomlin, CDC 2017](https://arxiv.org/abs/1709.07523)）给出计算机器，而最近一篇生物学论文（[Hirsch & Herbert, arXiv 2503.11021, 2025](https://arxiv.org/abs/2503.11021)）证明了 HJ 可达性可在小规模上移植到双时间尺度的基因调控网络。还没有人把这套框架带到图谱级的细胞基础模型。这一论点便归结为一句话：*在细胞基础模型上被操作化的生存力理论。* 正是那句话，让计划其余部分能抵御那位条件反射般伸手去抓"这不过是 OOD 检测"的审稿人。

## 模型框架

骨干是借来的。CFGen（[Palma et al., ICLR 2025](https://arxiv.org/abs/2407.11734)）、CellFlow（[Klein, Tejada-Lapuerta, Theis & Bunne, bioRxiv 2025](https://www.biorxiv.org/content/10.1101/2025.04.11.648220v1)）或 scDiffusion（[Luo et al., *Bioinformatics* 2024](https://academic.oup.com/bioinformatics/article/40/9/btae518/7738782)）都能经由 flow matching（[Lipman et al., ICLR 2023](https://arxiv.org/abs/2210.02747)）或去噪扩散（[Ho et al., NeurIPS 2020](https://arxiv.org/abs/2006.11239)）在细胞状态流形上给出一个可用的密度。贡献坐落于叠加其上的三个头。

**层位头。** 一个带校准置信度的三分类器——已实现 / 可工程化 / 禁止——端到端监督，并在形式上被当作一个分割式开集识别问题（[Scheirer et al., *IEEE TPAMI* 2013](https://www.wjscheirer.com/papers/wjs_tpami2013_openset.pdf)）。Conformal prediction（[Vovk, Gammerman & Shafer, 2005](https://link.springer.com/book/10.1007/b106715)）给出逐预测的置信区间，正是这一点让可证伪性主张能通过审稿。

**连通性先验。** 一个在谱系追踪树（LARRY, [Weinreb et al., *Science* 2020](https://www.science.org/doi/10.1126/science.aaw3381)；Cospar；CARLIN）上的图拉普拉斯正则器。依据 *omnis cellula e cellula*，每个已实现状态都有一条连续的高密度路径回到某个祖先。这推广了 scDiffEq（[Cofer et al., bioRxiv 2023](https://www.biorxiv.org/content/10.1101/2023.12.06.570508)），后者用 LARRY 条码做监督式命运标签——我们则在训练中把它们用作连通性惩罚。这种严格推广的定调正是面对读过 scDiffEq 的审稿人也能存活之处。

**禁止能量项。** 一个相加的能量，在已实现 + 可工程化流形之外飙升，带有三个具名贡献者，从而让该能量是可因果归因的，而非黑箱评分。(i) 由 SCENIC+ GRN（[Bravo González-Blas et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)）评分的调控拮抗，惩罚在饱和处共表达的相互拮抗的主调控因子。(ii) 调控 FBA 不可行性（[van Berlo et al., *IEEE/ACM TCBB* 2011](https://ieeexplore.ieee.org/document/5560791)；FlexFlux, [Marmiesse, Peyraud & Cottret, *BMC Syst Biol* 2015](https://bmcsystbiol.biomedcentral.com/articles/10.1186/s12918-015-0238-z)），把经典 FBA 不可行性检测从代谢通量扩展到调控状态向量。(iii) 针对取自细胞决策文献的精选 motif 规则的布尔调控逻辑相容性。流形-EBM 与 MPDR 文献（[Du & Mordatch, NeurIPS 2019](https://arxiv.org/abs/1903.08689)；[Yoon et al., NeurIPS 2023](https://arxiv.org/abs/2310.18677)）为一个生活在数据流形之外的能量提供了形式脚手架——没有它，禁止头读起来就像临时拼凑。

**合成负样本生成器。** 禁止类没有图谱；我们把它构造出来。从 SCENIC+ 采样拮抗的 TF 对，把两者都设为饱和，再嵌入。在饱和处混合不相容的身份程序（Foxp3 与 T-bet，Hb 与 myosin）。在数据支撑之外注入高斯噪声。这个生成器是整个系统里最关乎可复现性的一块，应当作为一个带单元测试的独立模块出货，而不是内联的辅助函数。

**可达性提议器。** 给定一个落在可工程化层位的查询目标，一座连接体细胞源与目标的 Schrödinger bridge（[Bunne et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01969-x)）提出最优的连续路径，而该路径的 TF 轨迹便成为鸡尾酒提议。Yamanaka 式发现成了自然的、以湿实验为锚的验证：当被要求在它没见过的数据上找一条 fibroblast → iPSC 路径时，提议器能否重新发现 OCT4 / SOX2 / KLF4 / MYC？

## 诚实清点下，真正属于我们的是什么

扩散骨干是借来的（CFGen / CellFlow）。谱系感知的训练信号是 scDiffEq 的严格推广。生存力理论的定调是从控制理论移植来的，从未在细胞 FM 上被操作化。禁止能量的融合（SCENIC+ 调控拮抗 + rFBA 通量不可行性 + 布尔调控逻辑相容性 + 流形-EBM 脚手架）是真正全新的——迄今没有任何预印本或论文在细胞基础模型嵌入上把这些项组合起来。把层位头作为因果归因式开集识别——三个类，每个都带一个 *具名* 的贡献成因——是叠在朴素 OOD 检测之上的一种新定调。组合就是贡献。生存力理论是让这个组合显得不可避免而非临时拼凑的东西，也正是那条将在审稿时为论文辩护的引用。

## 我们应当构建的 v0.1

具体的两个月范围。一个 A100 节点，约 150 GPU 小时，三个预注册的证伪器，一个仓库。

**骨干。** 在 Tabula Sapiens v2 加 iPSC 重编程时间序列（[Hanna et al., *Nature* 2009](https://www.nature.com/articles/nature08137)；CELLxGENE Census 中近期的 Yamanaka panel）上的冻结 CFGen 检查点。不要重训；预备实验的纪律延续下来。

**头。** 叠在 CFGen 残差流之上的小型 MLP。新增参数总量不到骨干的 5%。在冻结骨干下端到端训练约一周。

**禁止能量，分阶段。** 先只用 SCENIC+ 调控拮抗；把 rFBA 作为 v0.2 引入，布尔逻辑作为 v0.3。约束生态位依赖预备实验的那套范围纪律同样约束这一个——每次发布只加一个新项。

**三个预注册的证伪器，在任何结果出现之前写进 `PROTOCOL.md`。**

1. **层位宏平均 AUROC > 0.80**，在三分类对照上（Tabula Sapiens 已实现细胞 vs Hanna iPSC 重编程中间体 vs 合成负样本生成器输出），bootstrap CI，带显式供体级泄漏控制的留出测试划分。
2. **Yamanaka 复现。** 给定一个 fibroblast 源与一个嵌入在可工程化层位的、近似 iPSC 的目标，Schrödinger-bridge 鸡尾酒提议器按整合轨迹权重把 OCT4 / SOX2 / KLF4 / MYC 排进前五的 TF 候选。这正是 [可解释性姊妹篇](interpretability-state-of-cell-fms.md) 在整个细胞 FM 文献中点名缺失的、以湿实验为锚的证伪器。
3. **禁止能量零假设。** 合成负样本细胞的禁止能量高于已实现图谱细胞，bootstrap CI 不跨越零，且对真实图谱细胞做随机基因集消融 *不会* 把能量挪出已实现的能带。没有这个控制，禁止头就只是装饰。

若三者全部通过，底料就是真实的，论文便会自己写出来。若任一失败，论文就成为一个经校准的负结果——这是细胞 FM 领域与正结果一样迫切需要的东西。

## 裁决与智能体的任务

这就是生态位依赖预备实验所朝向第一步的那个模型。预备实验赚来可信度（两个证伪器、两周、仅用 scGPT），从而在更大的主张（生存力理论 + 分层流形 + 禁止能量）上被人听见。工作被排列成下游智能体可接手的三次提交。(i) 起草 `PROTOCOL.md`——预注册的证伪器与合成负样本生成器规格，对照 `niche-lambda` 的纪律。(ii) 构建 v0.1——CFGen 微调 + 三个头 + 三个证伪器，单 A100 历时两个月。(iii) 把仓库作为 `strata/` 或 `cellreach/` 出货，禁止能量模块作为被辩护的 IP，合成负样本生成器作为测试最充分的文件。三个需要预先化解的风险：审稿人 2 会说 *这不过是 OOD 检测*（以摘要中的因果归因式 OSR + 生存力理论定调反驳）；scDiffEq 已经用了 LARRY（把连通性先验定调为一种严格推广，而非发明）；合成负样本生成器是承载可信度的那一块（作为带单元测试的独立模块出货，而不是埋进训练循环）。需要留意以防被抢先的名字：**Charlotte Bunne**（EPFL/Stanford，精神上最接近——CellFlow + CellOT）；**Fabian Theis**（Helmholtz Munich，掌管 CFGen 管线）；**Sylvia Herbert**（UCSD，唯一一位已经把 HJ 可达性应用于生物网络的人）。一个无法告诉你什么不能存在的虚拟细胞，是一个还没有挣得自己名字的虚拟细胞。下一步，就是去构建一个能做到的。
