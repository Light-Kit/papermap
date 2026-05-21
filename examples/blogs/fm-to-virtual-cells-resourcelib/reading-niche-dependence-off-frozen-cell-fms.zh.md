---
title: "从一个冻结的细胞基础模型上读出生态位依赖：一个可证伪的两周预研"
summary: "认知诚实脉络中的第七篇文章从分析转向行动。稳定性兄弟篇把『稳定』分解为四个头（U 盆地深度、λ 生态位依赖、τ 寿命、π 群体频率）；只有 λ 是真正新颖的。本文规定了那个只交付 λ 一项的两周预研：冻结的 scGPT、NicheNet 响应者基因集、硅内消融，以及一个跨 IL-7 / TGFβ / IL-2 / IFNγ / TNFα 的五维逐细胞向量。两个二元证伪器——naive CD4 对 Treg 的已知配对可分性，以及 Visium 空间邻居配体暴露——必须通过。阴性对照（随机响应者、打乱配对、细胞类型洗牌）必须显示零结果。一块 A100，约三十个 GPU 小时。如果第一天的原型失败，预研就变成一篇阴性结果论文，而该领域得到一条关于底料的、经过校准的坏消息。无论哪种结果，这场演讲都有了根基。"
---

> *认知诚实脉络中的第七篇文章。前六篇问的是模型不知道什么（[surprise](surprise-and-uncertainty-in-cell-fms.md)）、不能迁移什么（[translatability](translatability-dual-latent-vc-fm.md)）、不能到达什么（[reachability](reachability-and-forbidden-states-in-cell-fms.md)）、不能维持什么（[stability](cell-stability-and-niche-dependence-in-vc-fms.md)）、不能跨模态交叉验证什么（[multimodal-stability](multimodal-stability-and-failure-modes-in-vc-fms.md)），以及可解释性社区迄今从它身上实际读出了什么（[可解释性领域现状](interpretability-state-of-cell-fms.md)）。这一篇不再发问，而是交付。它是[稳定性兄弟篇](cell-stability-and-niche-dependence-in-vc-fms.md)中 λ 头的预研版本，限定为十四天，并被两个证伪器所约束。横向连到[闭环 101](closed-loop-virtual-cells-101.md)，讲下游智能体拿这个答案做什么。*

## 问题

稳定性那篇文章在一个冻结的单细胞基础模型之上勾勒了四个可解释的头——盆地深度 U、生态位依赖 λ、寿命 τ、群体频率 π——并把它们命名为当前 FM 技术栈不暴露的四个轴。在这四个里，三个是对现有机器的归约。PRESCIENT（[Yeo 等，*Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)）给出 U；SenMayo（[Saul 等，*Nat Commun* 2022](https://www.nature.com/articles/s41467-022-32552-1)）和凋亡引发基因特征（[Sarosiek 等，*Cancer Cell* 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）零碎地覆盖 τ；π 是图谱边际密度，scVI（[Lopez 等，*Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)）和 CellxGene 已经在提供。只有 λ 是真正缺失的——没有哪个已发表的细胞 FM 交付一个带证伪器的逐细胞、逐配体生态位依赖向量。本文的问题是，任何人能在两周内、在一个冻结的公开 FM 上跑起来的 λ 的最小版本长什么样，以及在任何人被允许把它称作一项贡献之前，它必须通过哪些二元测试。

## 为什么是这块楔子，又限定得这么死

让这个预研保持诚实的约束是拒绝。U / τ / π 被砍掉。多 FM 基准被砍掉。微调被砍掉。新的预训练被砍掉。任何适配器的端到端训练被砍掉。剩下的是对一个现有冻结检查点的仅前向传播探测——scGPT 人类预训练版（[Cui 等，*Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、以 Geneformer-V2（[Theodoris 等，*Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）作为后备——运行在来自 Tabula Sapiens v2（[CELLxGENE Census](https://chanzuckerberg.github.io/cellxgene-census/)）的细胞和单张 10x Visium 淋巴结切片上。纪律在于，第十四天的演讲必须恰好守护一个论断：一个冻结的 FM 含有一个生态位依赖信号，它可以通过响应者集合消融读出，并对照两个独立的真值得到验证。不是"FM 是可解释的"。不是"FM 解决了 Perturb-seq"。一个论断。两个证伪器。清算文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)）正是靠把问题守在这个尺度上赢得了可信度；这个预研也得如此。

## 方法，一段话讲清

挑五个被 NicheNet 配体-靶标先验（[Browaeys 等，*Nat Methods* 2020](https://www.nature.com/articles/s41592-019-0667-5)）很好覆盖的配体——IL-7、TGFβ、IL-2、IFNγ、TNFα。对每个细胞 c 和每个配体 L，查出响应者基因集 R(L)（前约 200 个 NicheNet-v2 加权的下游靶标）。计算该细胞的冻结 FM 嵌入 z(c)。通过把 R(L) 中的每个基因掩盖到群体中位数来构造一个扰动输入；重新计算 z(c'_L)。把 λ(c, L) 定义为 L₂ 距离 ‖z(c) − z(c'_L)‖——或它的余弦消融形式 1 − cos(z(c), z(c'_L))。输出是一个五维的逐细胞向量。生物学论断是，如果一个细胞坐落在 IL-7 程序上，那么掩盖 IL-7 响应者集合，对它的嵌入的扰动应当大于掩盖一个同等大小的随机基因集；这些向量条目随后用一个湿实验免疫学家已经在说的语言命名出这个细胞的生态位依赖。无架构改动。无微调。无新的预训练运行。整个贡献就是探头的选择和证伪器的纪律。

## 证伪器——两个都是二元的，两个都必须通过

**证伪器 1，已知配对可分性。** 从 Tabula Sapiens 免疫子集中拉出 naive CD4 T 细胞和调节性 T 细胞。教科书生物学是 naive CD4 细胞需要张力性 IL-7（[Tan 等，*PNAS* 2001](https://www.pnas.org/doi/10.1073/pnas.161126098)），而 Treg 需要 TGFβ 来维持 Foxp3（[Chen 等，*J Exp Med* 2003](https://rupress.org/jem/article/198/12/1875/52221)）。通过判据是：以比值 λ_TGFβ / λ_IL-7 作为分数，在"这个细胞是不是 Treg"上的 AUROC > 0.75。如果在第一天的一次 5k 细胞原型运行中 AUROC 跌到 0.6 以下，那么底料在最终层并不携带生态位程序的粒度，预研立刻升级——中间层探测、Geneformer-V2 后备，然后是阴性结果论文。这是闸门。它花三小时算力，并回答整个"这个项目是否真实"的问题。

**证伪器 2，空间邻居配体暴露。** 在一张 10x Visium 人类淋巴结切片上，用 cell2location（[Kleshchevnikov 等，*Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-01139-4)）或 RCTD（[Cable 等，*Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-00830-w)）对每个 spot 的细胞组成做反卷积。对每个 spot，用同一条流水线计算逐细胞 λ，并单独从物理邻居计算 NicheNet 推断的配体暴露。通过判据是：对五个配体中至少三个，预测的 λ_L 与邻居推断的配体暴露之间 Spearman ρ > 0.3。用 ρ 而非 r，是因为信号是秩序的；用 0.3 而非 0.5，是因为单张切片上的 Visium 反卷积噪声很大。

**阴性对照，全部必须显示零结果。** 抽取十个与 R(L) 同等大小的随机基因集，在 naive 对 Treg 的对比上重新计算 λ；随机集的 λ 分布必须重叠。打乱细胞到主导配体的配对；AUROC 必须坍缩到约 0.5。洗牌细胞类型标签；Treg 对 naive 的对比必须消失。没有这套电池组，这个演示就是装饰。

## 什么可能杀死这个预研，以及该怎么办

诚实的担忧来自[可解释性领域现状兄弟篇](interpretability-state-of-cell-fms.md)。2025–2026 年针对细胞 FM 的机制可解释性浪潮（[Pedrocchi, Barkmann, Joudaki & Boeva, bioRxiv 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收；[Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)）发现，在 scGPT 和 Geneformer-V2 中只有大约百分之六到十的转录因子产生具有调控靶标特异响应的特征——底料携带的是共同出现的生物学，而非因果的调控因子。配体程序特征可能同样稀疏。缓解措施是结构性的：第一天的原型恰恰就是针对这一点的廉价测试。如果 naive 对 Treg 的可分性在最终层失败，那么按层分层的图谱（[Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)）说，中间层特征携带通路内容可能比最终层更干净——第三天的升级就是在第四层或第六层嵌入上重复这个探测。如果那也失败，预研就翻转：它变成第一份"响应者集合消融在 scGPT 或 Geneformer 上无法恢复已知生态位依赖"的定量报告，附一张分层的表格和一条关于下一个 FM 需要做出哪些不同的建议。那篇论文也值得交付。一个诚实失败的双证伪器预研，对该领域比一个悄悄略过其阴性结果的三十图预研更有用。

## 第十四天的演示展示什么

四张图。图一：一张 λ_IL-7 对 λ_TGFβ 的小提琴图，跨 naive CD4、Treg 和 memory CD4，配上 Treg 对 naive 对比的 ROC 曲线，AUROC 印在角上。图二：一张 Visium-spot 的散点图，预测的 λ_L 对 NicheNet-邻居配体暴露，按配体分面，每个分面标出 Spearman ρ。图三：阴性对照面板——把随机响应者 λ 叠在真实响应者 λ 之上，证明信号是配体特异的，而不是任何扰动都会移动嵌入。图四，是个加分项：来自 Sade-Feldman 抗 PD1 黑色素瘤队列（[Sade-Feldman 等，*Cell* 2018](https://www.cell.com/cell/fulltext/S0092-8674(18)31568-X)，GSE120575）的肿瘤浸润 Treg 对外周血 Treg 上的 λ_TGFβ，一个有临床锚定的预测，它不必为了演示而通过，但如果通过了就是头条。演讲以把预研接回那个四头计划来收尾：λ 是四个头中最小却含有项目新颖性的那个，底料要么支持它、要么不支持，而答案如今是经验性的、而非修辞性的。下一个兄弟篇——经由 PRESCIENT-on-scGPT 的 U 头，或经由 SenMayo 监督回归的 τ 头——在第二周之后决定，而非之前。一个说不出自己依赖哪种配体而活的虚拟细胞，还不是虚拟细胞，而该领域将在十四天内得以知晓现有 FM 是否甚至算得上是这个问题的候选底料。
