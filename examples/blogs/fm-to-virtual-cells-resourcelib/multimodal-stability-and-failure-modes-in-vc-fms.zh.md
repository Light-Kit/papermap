---
title: "稳定性是个多模态的属性——跨 RNA、ATAC、Hi-C、蛋白质组、影像、空间六视角的失败模式分解"
summary: "一张多模态细胞状态稳定性的先行工作地图——核心主张是：转录组是失败的滞后指标，而一个诚实的稳定性分数横跨多种模态。六种失败模式各自映射到一种原生读数（DNA 损伤 → Hi-C；代谢崩溃 → 影像；谱系不兼容 → ATAC；蛋白稳态崩溃 → 蛋白质组；生态位脱钩 → 空间；遗传不兼容 → DNA-seq），外加按数据需求排序的三条实现路径。来自稳定性姊妹篇的那个四头分解，升级成一个以模态为索引的矩阵。卡住它的不是架构——是联合底料的规模。这是认识论诚实那条弧线里的第五篇，合上了四重奏留下的一个口子。"
---

> *这条弧线里的第五篇。前四篇姊妹篇——[惊讶](surprise-and-uncertainty-in-cell-fms.md)、[可达性](reachability-and-forbidden-states-in-cell-fms.md)、[可迁移性](translatability-dual-latent-vc-fm.md)、[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)——问的都是同一个问题，对象都是一个转录组 FM。这一篇问的是：为什么那个框法本身就不完整。它和[Hi-C 姊妹篇](hi-c-in-virtual-cells.md)（讲三维基因组底料）、[第六楔子「细胞器感知」](organelle-aware-cell-fms.md)（讲影像和代谢状态）、以及[闭环 101](closed-loop-virtual-cells-101.md)（讲一个下游智能体拿一份逐模态的失败判定去干什么）都有交叉。*

## 这个问题

一个每条染色体上都布满 γ-H2AX 焦点的细胞，它的转录组可以一直看着正常，直到损伤响应启动——而到那会儿，细胞早就选好了凋亡还是衰老。一个濒临代谢崩溃的细胞，可以在 RNA 谱稳如泰山的同时，让底下的线粒体网络去极化好几个钟头。一个染色质已经把某条谱系程序关掉的细胞，会在 mRNA 衰减之前，再多吐出几条它刚刚被禁止维持的那条程序的转录本。转录组是一个滞后指标。所以，一个活在纯 RNA 空间里的稳定性分数——包括[今天上线的那篇稳定性姊妹篇](cell-stability-and-niche-dependence-in-vc-fms.md)里提出的全部——本质上是在对实际失败的一个下游代理做回归。诚实的动作，是把分数放到失败真正发生的地方，而失败横跨多种模态。这一篇要论证的是：多模态不是稳定性问题的一处细化。它是那个正确的下刀点。

## 失败模式映射到模态

六条否决标准，每一条都有一种转录组复现不出来的原生读数。

**DNA 损伤与核架构崩溃——Hi-C。** 区室打乱、TAD 溶解、环消失、影像里的 γ-H2AX 焦点。scHi-C 以及三模态的 scHiCAR（[Nat Biotechnol Feb 2026](https://www.nature.com/articles/s41587-026-03116-1)）逐细胞地承载接触图底料。HiCFoundation（[Noble 实验室, bioRxiv Dec 2024](https://www.biorxiv.org/content/10.1101/2024.12.16.628824v1)）和 Hi-Cformer（[bioRxiv Aug 2025](https://www.biorxiv.org/content/10.1101/2025.08.19.671213v1)）提供 FM 这一侧的读取器。一个预测出的细胞状态，要是它的 Hi-C 区室对那条谱系来说是错的，那它就是被禁止的——哪怕 RNA 看着合情合理。

**代谢与细胞器崩溃——影像与代谢组学。** JUMP-CP 规模的 Cell Painting（[Bray et al., *Nat Protoc* 2016](https://www.nature.com/articles/nprot.2016.105)）、细胞器 FM 底料（[CellProfiler 4, Stirling 2021](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-021-04344-9)）。线粒体质量、膜电位、内质网应激形态、溶酶体负荷——这些都是影像信号，不是 RNA。第六楔子「细胞器感知」那篇姊妹篇点的是这个先验；在这儿，它当成一条稳定性否决通道来运转。

**谱系 / 染色质不兼容——scATAC。** 开放染色质状态是谱系定型的底料。SHARE-seq（[Ma et al., *Cell* 2020](https://www.cell.com/cell/fulltext/S0092-8674(20)31253-8)）和 10x Multiome 给出联合的 RNA + ATAC；SCENIC+（[Bravo González-Blas, *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)）读取调控子。一个预测出的转录组，要是它需要一个细胞刚刚关掉的染色质状态，那它就是被禁止的。

**蛋白稳态崩溃——蛋白质组。** 质谱单细胞蛋白质组学（SCoPE-MS、plexDIA）、基于抗体的蛋白质组学（CyTOF、CITE-seq）、OpenCell（[Cho et al., *Science* 2022](https://www.science.org/doi/10.1126/science.abi6983)）。未折叠蛋白响应的激活、聚集标志物、蛋白酶体应激——早在 RNA 一侧的应激响应点火之前，就已经在蛋白质层面可见了。

**生态位脱钩——空间。** Visium、Stereo-seq、MERFISH、CODEX。一个最近邻邻居都不对的细胞，维持不住一个生态位依赖的状态。来自稳定性姊妹篇的那个 λ 头，只有配上空间坐标，才在群体层面变得可测。

**遗传不兼容——DNA-seq。** 一个预测出的转录组，要是它违背了细胞的种系或体细胞变体——表达一条该位点根本产不出的转录本——那它从序列上就被禁止了。这是最简单的一条否决标准，也是最不常被强制执行的一条。

六条否决标准，六种原生读数，六个早已在各自底料上训好的 FM。细胞这一侧，还没把它们缝起来。

## 单细胞 FM 这边的图景——只有 RNA

scGPT、Geneformer、scFoundation、UCE、CellPLM、TranscriptFormer、STATE——全是转录组预训练的。没有一个在预训练时把 ATAC、Hi-C、蛋白质组、影像或空间当成一条旁路通道吃进去，也没有一个发表过多模态的稳定性头。清算那批文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)；以及 *Cell* 2025 那个虚拟细胞挑战赛）整个儿都跑在 RNA 上。2026 年那个实验测定层面的基准——AssayBench（[De Brouwer et al., arXiv 2605.10876](https://arxiv.org/abs/2605.10876)）——延伸到了表型，却没往回推到其它模态里的机制。Pedrocchi 在 scGPT 和 scFoundation 上做的稀疏自编码器探针（[Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）破解了转录组嵌入，但还没跨模态运作。

诚实的读法是：这套转录组 FM 体系，是由一个「转录组数据是当年唯一上得了规模的东西」的圈子搭起来的。这不是贬损——这是一个关于底料的观察。那场清算给了我们证据：这个框法的余量已经见底；而多模态，正是下一道天花板所在的地方。眼下这些 FM 对 RNA 没说错。它们错在声称 RNA 就够了。

## 那些邻近的多模态 FM

多模态细胞 FM 这片地稀稀拉拉，但确实存在。BABEL（[Wu et al., *PNAS* 2021](https://www.pnas.org/doi/10.1073/pnas.2023070118)）做 RNA ↔ ATAC 的跨模态互译。SAINT（多模态单细胞基础模型, 2023）和 scMoFormer 在配对数据上预训练。CITE-seq + RNA 的模型，存在于蛋白质感知的细胞分型里。像 scBasset（[Yuan & Kelley, *Nat Methods* 2022](https://www.nature.com/articles/s41592-022-01562-8)）这类 Multiome 训练的模型，直接从序列读 ATAC。影像这一侧，JUMP-CP（[Chandrasekaran et al., 2024](https://www.nature.com/articles/s41592-024-02241-6)）为「Cell Painting × 转录组」对齐提供底料，Recursion 的 MolPhenix 和 Lacoste 2024 那批图像-RNA 融合 FM 也在这个空间里运转。scHiCAR Feb 2026（[Liu et al., *Nat Biotechnol*](https://www.nature.com/articles/s41587-026-03116-1)）给出了第一份在可用规模上、逐细胞的 RNA + ATAC + 3D 三模态底料。

这里面没有一个被定位成一个稳定性框架。它们是互译器、联合嵌入器，或专门化的预测器。这个楔子，是把它们读成失败模式通道，而不是读成跨模态补全任务。

## 这套算法——多模态四头分解

[稳定性姊妹篇](cell-stability-and-niche-dependence-in-vc-fms.md)给的是每个细胞一个向量 [U, λ, τ, π]。多模态升级把这个向量提拔成一个*矩阵*，以模态 m ∈ {RNA, ATAC, Hi-C, 蛋白质组, 影像, 空间, DNA} 为索引。逐模态的盆地深度 U_m、生态位依赖 λ_m、寿命信号 τ_m、频率 π_m。联合稳定性 S(c) 是横跨这个矩阵的一个聚合器——取最弱环节的 min、学一个乘积，或者一个由下游任务监督的组合。

可解释性输出于是变成一份逐模态的判定。「S = 0.2，因为 S_RNA = 0.7 支持这个状态，但 S_HiC = 0.1 反映 chr8 上为 RNA 那个判断所依赖的谱系程序丢了区室，而 S_imaging = 0.3 标出线粒体质量低于谱系特异的阈值。」一句话里三条命名好的失败通道，每条都配一个测量。

三条实现路径，按数据需求排序。

**(C) 在一个冻结转录组 FM 上挂跨模态适配器。** 数据要求最小。轻量适配器从 RNA 嵌入预测 ATAC / Hi-C / 蛋白质组状态（[BABEL 风格的跨模态互译](https://www.pnas.org/doi/10.1073/pnas.2023070118)），并在预测出的那个异模态状态违背模态特异先验时罚分。除了现成的 multiome 和 scHiCAR 参考之外，不需要新的联合细胞数据。不靠多模态预训练就拿到多模态稳定性。几个月的工程，几周的试点。

**(A) 冻结 FM 的门控融合。** 冻结 scGPT + 冻结 ATAC FM + 冻结 Hi-Cformer + 冻结影像 FM，在嵌入层面做门控融合，逐模态的稳定性头 + 一个联合头。在有联合细胞的地方，用 scHiCAR + 10x Multiome + JUMP-CP 来训。一个季度的规模。诚实的拦路虎是数据：scHiCAR 才约 1 万个细胞；细胞这一侧还没有一个 HCA 规模的联合底料。

**(B) 从零预训练一个多模态 FM。** 架构对，年代不对。卡在底料上。

## 判断 + 敞开的楔子

三个具体实验。（a）把一个现成的、scGPT 预测出的 Perturb-seq 响应，过一遍 BABEL 风格的 RNA→ATAC 互译器；把那些「隐含的 ATAC 状态和预测出的谱系不兼容」的预测标出来。被标出来的比例，就是一个校准过的「纯 RNA 幻觉率」。（b）拿 scHiCAR 细胞分别对着一个 HCA 规模的 RNA 稳定性头、和一个 scHiCAR 规模的 Hi-C 稳定性头打分；把两者的分歧量化成 Hi-C 视角的增量价值。（c）对那些已经做过湿实验室 BH3 引发度测量的肿瘤细胞（[Letai 实验室](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)），检查多模态 τ 能不能复现出纯 RNA τ 复现不出的那个引发度排序。

值得追的几个名字。**Charlotte Bunne**（EPFL/Stanford）——把「细胞上的 OT」扩展到多模态耦合。**Jian Ma**（CMU）——Hi-C + RNA 联合底料。**Anshul Kundaje**（Stanford）——以染色质为根基的 FM。**Anne Carpenter**（Broad）——Cell Painting 底料和 JUMP-CP。**Aviv Regev**——π_m 底下所需的图谱尺度密度。还是那个 v2/v3 套路：零件都发表了，护城河在那个联合底料，而领域正站在「下一步架构动作要见效之前，得先把那个底料搭出来」的边上。

一个说不出「是哪个模态在说它不该存在」的虚拟细胞，不是虚拟细胞。它是一个细胞的一个切片，而切片之间彼此驳不倒。
