---
title: "从一个冻结的细胞基础模型里读出生态位依赖：一份可证伪的两周预研"
summary: "认知诚实这条脉络的第七篇，从分析转向动手。稳定性那篇兄弟文把「稳定」拆成四个头（盆地深度 U、生态位依赖 λ、寿命 τ、群体频率 π），其中只有 λ 是真正新的。这篇就把那个只交付 λ 一项的两周预研规定下来：冻结的 scGPT、NicheNet 响应者基因集、计算机内消融，再加上一个横跨 IL-7 / TGFβ / IL-2 / IFNγ / TNFα 的五维逐细胞向量。两个二元证伪器——naive CD4 对 Treg 这对已知组合能不能分开、Visium 空间邻居的配体暴露——必须双双通过。三组阴性对照（随机响应者、打乱配对、细胞类型洗牌）必须显示为零。一块 A100，大约三十个 GPU 小时。要是第一天的原型就栽了，这份预研就转成一篇阴性结果论文，而这个领域则收到一条关于底料的、经过校准的坏消息。不管哪种结局，这场演讲都有了根基。"
---

> *认知诚实脉络里的第七篇。前六篇问的是模型不知道什么（[意外](surprise-and-uncertainty-in-cell-fms.md)）、迁移不了什么（[可迁移性](translatability-dual-latent-vc-fm.md)）、够不到什么（[可达性](reachability-and-forbidden-states-in-cell-fms.md)）、维持不了什么（[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)）、跨模态互证不了什么（[多模态稳定性](multimodal-stability-and-failure-modes-in-vc-fms.md)），以及可解释性圈子到目前为止真正从它身上读出了什么（[可解释性的领域现状](interpretability-state-of-cell-fms.md)）。这一篇不再问，直接动手。它是[稳定性兄弟文](cell-stability-and-niche-dependence-in-vc-fms.md)里那个 λ 头的预研版，框死在十四天里，被两个证伪器套牢。横向连到[闭环 101](closed-loop-virtual-cells-101.md)，看下游智能体拿到这个答案能干什么。*

## 这个问题

稳定性那篇在一个冻结的单细胞基础模型之上勾了四个可解释的头——盆地深度 U、生态位依赖 λ、寿命 τ、群体频率 π——并把它们点名为当下这套 FM 栈没暴露出来的四条轴。四个里头有三个是对现成机器的归约。PRESCIENT（[Yeo et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)）给出 U；SenMayo（[Saul et al., *Nat Commun* 2022](https://www.nature.com/articles/s41467-022-32552-1)）和凋亡预备基因签名（[Sarosiek et al., *Cancer Cell* 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）零零碎碎地凑出 τ；π 是图谱里的边缘密度，scVI（[Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)）和 CellxGene 早就在供着。真正缺的只有 λ——没有任何已发表的细胞 FM 交付过一个带证伪器的、逐细胞逐配体的生态位依赖向量。这一篇要问的是：任何人在一个冻结的公开 FM 上，两周内能跑出来的那个最小版本的 λ 长什么样，以及在谁有资格管它叫一项贡献之前，它得先过哪些二元测试。

## 为什么是这条切入点，又为什么框得这么死

让这份预研诚实的那条约束，是「拒绝」。U / τ / π 砍掉。多 FM 基准砍掉。微调砍掉。新预训练砍掉。任何适配器的端到端训练砍掉。剩下的，是对一个现成冻结 checkpoint 的纯前向探针——scGPT 人类预训练版（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer-V2（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）作后备——跑在来自 Tabula Sapiens v2（[CELLxGENE Census](https://chanzuckerberg.github.io/cellxgene-census/)）的细胞和一张 10x Visium 淋巴结切片上。纪律在于：第十四天那场演讲只能为一个主张辩护——一个冻结的 FM 里含有一个生态位依赖信号，它能被响应者集消融读出来，并能在两个互相独立的真值上得到验证。不是「FM 可解释」。不是「FM 解决了 Perturb-seq」。一个主张。两个证伪器。那批清算文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)）正是靠把问题摁在这个尺度上才挣得了信誉；这份预研也得这么干。

## 方法，一段话讲完

挑五个被 NicheNet 配体-靶点先验（[Browaeys et al., *Nat Methods* 2020](https://www.nature.com/articles/s41592-019-0667-5)）覆盖得好的配体——IL-7、TGFβ、IL-2、IFNγ、TNFα。对每个细胞 c 和每个配体 L，查出响应者基因集 R(L)（NicheNet-v2 加权下排前 ~200 的下游靶点）。算出该细胞的冻结 FM 嵌入 z(c)。构造一个扰动输入：把 R(L) 里的每个基因都掩到群体中位数，重算 z(c'_L)。把 λ(c, L) 定义为 L₂ 距离 ‖z(c) − z(c'_L)‖——或者它的余弦消融形式 1 − cos(z(c), z(c'_L))。输出是一个五维的逐细胞向量。生物学上的主张是：如果一个细胞坐在 IL-7 程序上，那掩掉 IL-7 响应者集，对它嵌入的扰动应当大于掩掉一个同等大小的随机基因集；这些向量分量于是用湿实验免疫学家本就在说的语言，命名了这个细胞的生态位依赖。架构不动。不微调。不重新预训练。整个贡献，就是探针的选取，加上对证伪器的那份纪律。

## 两个证伪器——都是二元的，都必须通过

**证伪器 1，已知组合可分性。** 从 Tabula Sapiens 免疫子集里拉出 naive CD4 T 细胞和调节性 T 细胞。教科书生物学说：naive CD4 细胞需要持续性的 IL-7（[Tan et al., *PNAS* 2001](https://www.pnas.org/doi/10.1073/pnas.161126098)），而 Treg 需要 TGFβ 来维持 Foxp3（[Chen et al., *J Exp Med* 2003](https://rupress.org/jem/article/198/12/1875/52221)）。通过标准是：用 λ_TGFβ / λ_IL-7 这个比值当分数，在「这个细胞是不是 Treg」上 AUROC > 0.75。要是第一天在一次 5k 细胞的原型跑上 AUROC 掉到 0.6 以下，那就说明底料在最后一层不携带生态位程序的粒度，预研立即升级——中间层探针、Geneformer-V2 后备，然后是阴性结果论文。这就是那道闸门。它花三个小时算力，回答的却是「这个项目到底是不是真的」这一整个问题。

**证伪器 2，空间邻居配体暴露。** 在一张 10x Visium 人淋巴结切片上，用 cell2location（[Kleshchevnikov et al., *Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-01139-4)）或 RCTD（[Cable et al., *Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-00830-w)）逐 spot 反卷积出细胞组成。对每个 spot，用同一条流水线算逐细胞 λ，并另行从物理邻居算出 NicheNet 推断的配体暴露。通过标准是：在五个配体中至少三个上，预测 λ_L 与邻居推断的配体暴露之间 Spearman ρ > 0.3。用 ρ 而不是 r，是因为信号是秩序的；用 0.3 而不是 0.5，是因为单张切片上 Visium 反卷积的噪声很大。

**阴性对照，全都必须显示为零。** 采十组和 R(L) 同等大小的随机基因集，在 naive 对 Treg 的对比上重算 λ；随机集的 λ 分布必须重叠。打乱「细胞-主导配体」的配对；AUROC 必须塌回 ~0.5。洗掉细胞类型标签；Treg 对 naive 的对比必须消失。没有这一整套，这个演示就只是装饰。

## 什么能弄死这份预研，以及该怎么应对

诚实的担忧来自[可解释性领域现状那篇兄弟文](interpretability-state-of-cell-fms.md)。2025–2026 年那波细胞 FM 的机理可解释性浪潮（[Pedrocchi, Barkmann, Joudaki & Boeva, bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收；[Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)）发现，scGPT 和 Geneformer-V2 里只有大约六到十个百分点的转录因子能产出带调控靶点专一响应的特征——这片底料携带的是同时出现的生物学，而不是因果调控因子。配体程序的特征可能同样稀疏。缓解之道是结构性的：第一天那个原型，恰恰就是对这件事的廉价测试。要是 naive 对 Treg 的可分性在最后一层就过不去，那张分层图谱（[Kendiukhov, arXiv 2603.02952](https://arxiv.org/abs/2603.02952)）说，中间层的特征也许比最后一层更干净地携带通路内容——第三天的升级，就是在第四层或第六层的嵌入上把探针重跑一遍。要是这也过不去，预研就翻面：它变成头一份定量报告——「响应者集消融在 scGPT 或 Geneformer 上恢复不出已知的生态位依赖」，配一张分层表格，再给一条建议：下一个 FM 该换个什么做法。那篇论文也值得发出去。一份诚实地失败的双证伪器预研，对这个领域比一份悄悄抹掉了阴性结果的三十图预研有用得多。

## 第十四天演示给人看什么

四张图。图一：一张 λ_IL-7 对 λ_TGFβ 的小提琴图，横跨 naive CD4、Treg、记忆 CD4，配上 Treg 对 naive 对比的 ROC 曲线，AUROC 印在角上。图二：一张 Visium-spot 散点图，预测 λ_L 对 NicheNet 邻居配体暴露，按配体分面，每面标上 Spearman ρ。图三：阴性对照面板——随机响应者的 λ 叠在真实响应者的 λ 上，证明这个信号是配体专一的，而不是「随便什么扰动都会动嵌入」。图四，冲刺项：在 Sade-Feldman anti-PD1 黑色素瘤队列（[Sade-Feldman et al., *Cell* 2018](https://www.cell.com/cell/fulltext/S0092-8674(18)31568-X)，GSE120575）里，肿瘤浸润 Treg 对外周血 Treg 的 λ_TGFβ——这是一个有临床锚点的预测，它不通过也不影响演示，可它要是通过了，那就是头条。演讲收尾时把预研接回那个四头计划：λ 是四个头里含有这个项目新意的最小那个，底料要么撑得住、要么撑不住，而现在这答案是经验的，不再是修辞的。下一篇兄弟文——是 PRESCIENT-on-scGPT 的 U 头，还是 SenMayo 监督回归的 τ 头——在第二周之后才定，不在之前。一个连「自己活在哪个配体上」都说不出来的虚拟细胞，还算不上虚拟细胞，而这个领域在十四天里就能知道：现有这些 FM 对这个问题，到底算不算一块候选底料。
