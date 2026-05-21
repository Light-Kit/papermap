---
title: "稳定性是一种多模态属性——跨 RNA、ATAC、Hi-C、蛋白质组、影像与空间视角的失败模式分解"
summary: "一张多模态细胞状态稳定性的先行技术地图——主张转录组是失败的滞后指标，而诚实的稳定性评分横跨多种模态。六种失败模式被映射到各自的原生读数（DNA 损伤 → Hi-C；代谢崩溃 → 影像；谱系不兼容 → ATAC；蛋白稳态崩溃 → 蛋白质组；生态位脱耦 → 空间；遗传不兼容 → DNA-seq），并按数据需求对三条实现路径排序。来自稳定性姊妹篇的四 head 分解，变成一个以模态为索引的矩阵。瓶颈不是架构——而是联合底料的规模。这是认识论诚实弧线中的第五篇随笔，合上了那个四篇组合留下的回路。"
---

> *弧线中的第五篇随笔。四篇姊妹篇——[惊奇](surprise-and-uncertainty-in-cell-fms.md)、[可达性](reachability-and-forbidden-states-in-cell-fms.md)、[可翻译性](translatability-dual-latent-vc-fm.md)与[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)——都向一个转录组 FM 提出它们的问题。这一篇追问那个框架为何不完整。横向贯通到[关于 3D 基因组底料的 Hi-C 姊妹篇](hi-c-in-virtual-cells.md)、[关于影像与代谢状态的第六个细胞器感知楔子](organelle-aware-cell-fms.md)，以及[闭环 101](closed-loop-virtual-cells-101.md)——后者讲一个下游智能体拿着逐模态的失败裁决能做什么。*

## 那个问题

一个每条染色体上都有 γ-H2AX 焦点的细胞，在损伤响应启动之前，其转录组可以看起来正常，而到那时细胞早已选择了凋亡或衰老。一个濒临代谢崩溃的细胞，可以在底下线粒体网络去极化的同时，维持数小时稳定的 RNA 谱。一个染色质已关闭错误谱系程序的细胞，会在 mRNA 衰减之前，多产出几份它刚被禁止维持的那个程序的转录本。转录组是一个滞后指标。因此，一个活在纯 RNA 空间里的稳定性评分——包括[今天发布的稳定性姊妹篇](cell-stability-and-niche-dependence-in-vc-fms.md)所提出的一切——是对真实失败的一个下游代理量做回归。诚实的做法是把评分放在失败所在之处，而失败横跨多种模态。本文主张：多模态不是稳定性问题的一次精修。它是正确的切割点。

## 失败模式映射到各模态

六条拒绝判据，每条都有一个转录组无法重现的原生读数。

**DNA 损伤与核架构崩溃——Hi-C。** 区室打乱、TAD 溶解、loop 丢失、影像下的 γ-H2AX 焦点。scHi-C 与三模态 scHiCAR（[Nat Biotechnol 2026 年 2 月](https://www.nature.com/articles/s41587-026-03116-1)）承载着每细胞的接触图底料。HiCFoundation（[Noble lab，bioRxiv 2024 年 12 月](https://www.biorxiv.org/content/10.1101/2024.12.16.628824v1)）与 Hi-Cformer（[bioRxiv 2025 年 8 月](https://www.biorxiv.org/content/10.1101/2025.08.19.671213v1)）提供 FM 一侧的读取器。一个预测的细胞状态，若其 Hi-C 区室对该谱系是错的，那么即便 RNA 看起来貌似合理，它也是被禁止的。

**代谢与细胞器崩溃——影像与代谢组学。** JUMP-CP 规模的 Cell Painting（[Bray 等，*Nat Protoc* 2016](https://www.nature.com/articles/nprot.2016.105)）、细胞器 FM 底料（[CellProfiler 4，Stirling 2021](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04344-9)）。线粒体质量、膜电位、ER 应激形态、溶酶体负荷——这些是影像信号，而非 RNA。细胞器感知的第六楔子姊妹篇为这一先行技术命名；在这里它作为一条稳定性拒绝通道运作。

**谱系 / 染色质不兼容——scATAC。** 开放染色质状态是谱系定向的底料。SHARE-seq（[Ma 等，*Cell* 2020](https://www.cell.com/cell/fulltext/S0092-8674(20)31253-8)）与 10x Multiome 给出联合的 RNA + ATAC；SCENIC+（[Bravo González-Blas，*Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)）读取调控子（regulon）。一个需要细胞刚刚关闭的某个染色质状态的预测转录组，是被禁止的。

**蛋白稳态崩溃——蛋白质组。** 质谱单细胞蛋白质组学（SCoPE-MS、plexDIA）、基于抗体的蛋白质组学（CyTOF、CITE-seq）、OpenCell（[Cho 等，*Science* 2022](https://www.science.org/doi/10.1126/science.abi6983)）。未折叠蛋白响应的激活、聚集标志物、蛋白酶体应激——在蛋白层面上的可见时间，远早于 RNA 一侧的应激响应被点燃。

**生态位脱耦——空间。** Visium、Stereo-seq、MERFISH、CODEX。一个最近邻是错的细胞，无法维持一个依赖生态位的状态。来自稳定性姊妹篇的 λ head，只有在有空间坐标时才能在群体层面变得可测。

**遗传不兼容——DNA-seq。** 一个违反细胞胚系或体系变异的预测转录组——表达一份该位点无法产出的转录本——按序列就是被禁止的。这是最简单的拒绝判据，也是最少被强制执行的。

六条拒绝判据、六个原生读数、六个已分别在各自底料上训练好的 FM。细胞一侧还没把它们缝起来。

## 单细胞 FM 图景——仅 RNA

scGPT、Geneformer、scFoundation、UCE、CellPLM、TranscriptFormer、STATE——全是转录组预训练。没有一个在预训练时把 ATAC、Hi-C、蛋白质组、影像或空间当作旁路通道摄入，也没有一个发表了多模态稳定性 head。清算文献（[Ahlmann-Eltze & Huber，*Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)；*Cell* 2025 的 Virtual Cell Challenge）完全运作在 RNA 之上。2026 年的检测级基准——AssayBench（[De Brouwer 等，arXiv 2605.10876](https://arxiv.org/abs/2605.10876)）——延伸到了表型，但没有回推到其他模态中的机制。作用于 scGPT 与 scFoundation 上的 Pedrocchi 稀疏自编码器探针（[Pedrocchi 等，bioRxiv 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，被 ICLR 2026 接收）破解了转录组嵌入，但尚未跨模态运作。

诚实的解读是：这套转录组 FM 栈，是由一个"转录组数据才是大规模存在之物"的社群造出来的。这不是贬低——这是一个底料层面的观察。清算给了我们证据，表明这个框架已经用尽了它的余量空间；多模态正是下一道天花板所在之处。当前的 FM 关于 RNA 并没有错。它们错在声称 RNA 就够了。

## 相邻的多模态 FM

多模态细胞-FM 版图稀疏，但确实存在。BABEL（[Wu 等，*PNAS* 2021](https://www.pnas.org/doi/10.1073/pnas.2023070118)）跨模态地翻译 RNA ↔ ATAC。SAINT（多模态单细胞基础模型，2023）与 scMoFormer 在配对数据上预训练。面向蛋白感知细胞分型的 CITE-seq + RNA 模型存在。像 scBasset（[Yuan & Kelley，*Nat Methods* 2022](https://www.nature.com/articles/s41592-022-01562-8)）这样的 Multiome 训练模型直接读取 ATAC 序列。影像一侧，JUMP-CP（[Chandrasekaran 等，2024](https://www.nature.com/articles/s41592-024-02241-6)）为 Cell-Painting × 转录组的对齐提供底料，Recursion 的 MolPhenix 与 Lacoste 2024 的图像-RNA 融合 FM 都在那个空间运作。scHiCAR 2026 年 2 月（[Liu 等，*Nat Biotechnol*](https://www.nature.com/articles/s41587-026-03116-1)）以可用的规模给出了第一份每细胞的三模态 RNA + ATAC + 3D 底料。

这些之中没有一个被定位为稳定性框架。它们是翻译器、联合嵌入器，或专门的预测器。这个楔子在于：把它们读作失败模式通道，而非读作跨模态补全任务。

## 算法——多模态四 head 分解

[稳定性姊妹篇](cell-stability-and-niche-dependence-in-vc-fms.md)给出了一个每细胞向量 [U, λ, τ, π]。多模态升级把那个向量提升为一个以模态 m ∈ {RNA, ATAC, Hi-C, proteomic, imaging, spatial, DNA} 为索引的 *矩阵*。逐模态的盆地深度 U_m、生态位依赖 λ_m、寿命信号 τ_m、频率 π_m。联合稳定性 S(c) 是横跨这个矩阵的一个聚合器——最弱环节的 min、学到的乘积，或下游任务监督的组合。

可解释性输出就变成了逐模态的裁决。"S = 0.2，因为 S_RNA = 0.7 支持该状态，但 S_HiC = 0.1 反映了 RNA 判定所依赖的那个谱系程序在 chr8 上的区室丢失，而 S_imaging = 0.3 标记出线粒体质量低于谱系特异性阈值。"三条有名字的失败通道，每条都附一项测量，一句话讲完。

三条实现路径，按数据需求排序。

**（C）在一个冻结转录组 FM 上加跨模态 adapter。** 数据需求最小。轻量 adapter 从 RNA 嵌入预测 ATAC / Hi-C / 蛋白质组状态（[BABEL 式跨模态翻译](https://www.pnas.org/doi/10.1073/pnas.2023070118)），并在预测的替代模态状态违反模态特异性先验时施加惩罚。除了现有的 multiome 与 scHiCAR 参照之外，不需要新的联合细胞数据。不靠多模态预训练就实现多模态稳定性。数月的工程、数周的试点。

**（A）冻结-FM 门控融合。** 冻结 scGPT + 冻结 ATAC FM + 冻结 Hi-Cformer + 冻结影像 FM，在嵌入层做门控融合，逐模态稳定性 head + 一个联合 head。在可得之处，在 scHiCAR + 10x Multiome + JUMP-CP 联合细胞上训练。季度级规模。诚实的瓶颈是数据：scHiCAR 约 1 万细胞；细胞一侧还没有 HCA 规模的联合底料。

**（B）从零预训练一个多模态 FM。** 对的架构，错的年代。受底料瓶颈所限。

## 裁决 + 开放楔子

三个具体实验。（a）把一个现有的 scGPT 预测的 Perturb-seq 响应送过一个 BABEL 式 RNA→ATAC 翻译器；标记那些所蕴含的 ATAC 状态与预测谱系不兼容的预测。被标记的比例就是一个校准好的纯 RNA 幻觉率。（b）把 scHiCAR 细胞分别对一个 HCA 规模的 RNA 稳定性 head 与一个 scHiCAR 规模的 Hi-C 稳定性 head 打分；把分歧量化为 Hi-C 视角的增值。（c）对那些已在湿实验测过 BH3 priming 的肿瘤细胞（[Letai lab](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)），检查多模态 τ 是否能恢复纯 RNA τ 无法恢复的 priming 排序。

值得追踪的人。**Charlotte Bunne**（EPFL/Stanford），把 OT-on-cells 扩展到多模态耦合。**Jian Ma**（CMU），Hi-C + RNA 联合底料。**Anshul Kundaje**（Stanford），染色质锚定的 FM。**Anne Carpenter**（Broad），Cell Painting 底料与 JUMP-CP。**Aviv Regev**，π_m 之下所需的图谱规模密度。同样的 v2/v3 范式：组件都已发表，护城河是联合底料，而这一领域正处在不得不先建好那个底料、下一步架构动作才会有回报的边缘。

一个无法告诉你哪个模态在说它不应存在的虚拟细胞，不是一个虚拟细胞。它是一个细胞的一张切片，而切片之间不能相互反驳。
