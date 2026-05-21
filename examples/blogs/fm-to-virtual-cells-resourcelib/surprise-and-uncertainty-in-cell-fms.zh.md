---
title: "一个虚拟细胞如何知道自己不知道？量化细胞基础模型中的惊讶"
summary: "一张关于惊讶 / 不确定性 / OOD 检测方法的先验工作地图，以及对其中哪些已经落进单细胞 FM 内部的诚实评判。那些有名字的把手（Shannon 惊讶、Bayesian 惊讶、Mahalanobis / ODIN / 能量分数 OOD、Kendall-Gal 认知-vs-偶然、共形预测、AlphaFold pLDDT/PAE）在 ML 里都已成熟——而几乎没有一个在校准层面被应用到 scGPT、Geneformer、scFoundation、UCE、STATE 或 CellPLM 上。来自双隐变量同胞篇的 τ_g 可翻译性分数，是一个伪装起来的逐基因认知惊讶信号。"
---

> *与 [双隐变量可翻译性随笔](translatability-dual-latent-vc-fm.md)（τ_g 也活在那里，只是换了个名字）、[为什么线性基线会赢](why-linear-baselines-win.md)（一场与校准相邻、只是框法不同的清算）、[闭环 VC 的 101 巡礼](closed-loop-virtual-cells-101.md) 和 [因果模型、FM 与 VC](causal-models-fm-and-vc.md) 同胞。本文向 VC FM 家族再问一个诚实的问题：当模型拿到一个它从未见过的细胞或扰动时，它会告诉你它从未见过吗？*

## 这个问题

一个虚拟细胞，对一种没见过的药、在一种没见过的细胞类型里，笃定地预测出错误的响应，比根本没有模型还糟——它把未知的未知变成了听起来精确的错误答案。造一个虚拟细胞而不去跑湿实验，整个意义就在于：模型应当知道哪些查询它能回答。如果 FM 没法告诉你它在外推，那你手里的就不是一个虚拟细胞。它是一个带着自信妄想的回归。

## ML 里那些有名字的把手

ML 在这方面的文献已经成熟。八个值得知道的家族。

**Shannon 惊讶**——模型下的 −log p(x)。困惑度（perplexity）是它的指数平均。语言模型靠它生死攸关。当模型是生成式时计算起来稀松平常，当它只是判别式时则没有定义。

**Bayesian 惊讶**（[Itti & Baldi, *Vision Research* 2009](https://www.sciencedirect.com/science/article/pii/S0042698909000709)）——KL[后验 ‖ 先验]。它衡量的是观测把模型的信念 *移动* 了多少，而不仅仅是观测有多不可能。当先验是平的时更干净，因为"在一个平先验下不可能"并不是那种正确意义上的惊讶。

**OOD 检测。** 一个完整的子领域。值得认得的有名方法：到训练特征的 Mahalanobis 距离（[Lee et al., NeurIPS 2018](https://arxiv.org/abs/1807.03888)）、带温度缩放的 ODIN（[Liang et al., ICLR 2018](https://arxiv.org/abs/1706.02690)）、能量分数（[Liu et al., NeurIPS 2020](https://arxiv.org/abs/2010.03759)）、深度集成的分歧（[Lakshminarayanan et al., NeurIPS 2017](https://arxiv.org/abs/1612.01474)）、MC-dropout 方差（[Gal & Ghahramani, ICML 2016](https://arxiv.org/abs/1506.02142)）。

**认知不确定性 vs 偶然不确定性**（[Kendall & Gal, NeurIPS 2017](https://arxiv.org/abs/1703.04977)；[Hüllermeier & Waegeman, *Mach Learn* 2021](https://link.springer.com/article/10.1007/s10994-021-05946-3)）。关键区分。认知（epistemic）= 模型不知道，原则上可用更多数据来修。偶然（aleatoric）= 世界里不可约的噪声。对 VC FM 来说，你在乎的大多数是认知的，因为那才是告诉你模型在外推的东西。

**共形预测**（[Vovk, Gammerman, Shafer, 2005](https://link.springer.com/book/10.1007/978-3-031-06649-8)；[Angelopoulos & Bates, *FnT* 2021](https://arxiv.org/abs/2107.07511)）。带有限样本覆盖保证的、无分布的预测 *集合*。当你想要一个校准过的、由若干合理答案构成的集合、而不是一个点估计加一点感觉时，这就是对的对象。

**影响函数**（[Koh & Liang, ICML 2017](https://arxiv.org/abs/1703.04730)）。移除这个训练点会把预测改变多少？让你不用留出探针就能回答"这个输出是否被训练数据支撑？"。

**自由能 / 预测编码**（[Friston, *Nat Rev Neurosci* 2010](https://www.nature.com/articles/nrn2787)）。大统一理论版本。把变分下界当作大脑的损失函数。在这里大多作为 scVI 暴露出的那个 ELBO 的先祖而相关。

## 单细胞 FM 的图景——大体上是空的

scVI（[Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)）及其 scvi-tools 后裔暴露了一个逐细胞的 ELBO 和隐变量上的贝叶斯不确定性——它们一向如此，正因为它们是 VAE。这是底料里那个唯一可信的校准故事。

2023–2024 的 sc-FM 浪潮并未延续它。scGPT（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）、scFoundation、UCE（[Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、CellPLM、TranscriptFormer——没有一个把校准曲线、OOD 检测基准或认知不确定性估计作为头条模型的一部分发布出来。掩码基因预测损失暴露了一个逐 token 的似然，你 *本可以* 把它变成一个 Shannon 惊讶信号，但论文并未把它摆到台前。

STATE（[Arc Institute, 2025](https://arcinstitute.org/news/virtual-cell-model-state)）作为一个带版本化发布和适配器 API 的产品交付，至今仍没有一个发布出来的不确定性层。2025 年的清算文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)；Wenkel et al；Csendes et al）表明扰动预测上的 *点估计* 坍缩到线性基线水平——但这场清算关乎均值的可靠性，而非其周围分布的校准。这是两个不同的问题，而只有其中一个被问过。

最接近的已发表动作是辅助性的。一些近期的零样本基准（[Boiarsky et al；Kedzierska et al 2025](https://www.biorxiv.org/content/10.1101/2025.02.13.638126v1)）测量留出组织上的迁移误差，这隐含地是一个 OOD 探针。在 scGPT 和 scFoundation 上的稀疏自编码器可解释性工作（[Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）撬开了逐特征的表征，这是 token 级惊讶的一个前提，但还不是惊讶本身。

没有 scGPT 的 pLDDT。没有 Geneformer 的置信头部。没有 STATE 的逐预测校准。2026 年生物学 FM 全景的细胞这一侧，对校准是天真无知的。

## 那些 *确实* 交付了不确定性的相邻生物学 FM

AlphaFold（[Jumper et al., *Nature* 2021](https://www.nature.com/articles/s41586-021-03819-2)）是那个定义了整个领域的反例。**pLDDT** 是一个随每次预测一同交付的逐残基置信分数，蛋白质社区已经把它内化得如此彻底，以至于论文会在结构旁报告平均 pLDDT。**PAE**（predicted aligned error）给出相对位置上的逐残基对置信度。这些不是可选的附加项——它们正是模型沟通其不确定性的方式，也是下游用户判断某个区域是否可信的依据。AlphaFold-Multimer 把同样的想法扩展到界面（[Evans et al., 2021](https://www.biorxiv.org/content/10.1101/2021.10.04.463034v2)）。

ESM-2（[Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)）暴露了逐 token 的困惑度，ProteinGym 基准（[Notin et al., NeurIPS 2023](https://proceedings.neurips.cc/paper_files/paper/2023/hash/cac723e5ff29f65e3fcbb0739ae91bee-Abstract-Datasets_and_Benchmarks.html)）把它变成了一个变异效应校准故事——高困惑度的替换在 217 个深度突变扫描数据集里与有害突变相关。校准并不完美，但它交付了。

病理 FM 走到了一半：Virchow-2 及其同辈交付分类置信度，但校准不是它们的卖点。

模式如此：结构与序列 FM 把不确定性头部作为头条产品的一部分交付了。细胞 FM 没有。

## τ_g 的关联

我在 [双隐变量同胞篇](translatability-dual-latent-vc-fm.md) 里草绘的可翻译性分数，形式上是一个伪装起来的逐基因认知不确定性信号。这个分数问的是：对基因 g，VC FM 应当多 *信任* 细胞系→患者的迁移——这恰好是一个认知性的主张，即基因特异的表征是否已被训练底料钉得足够牢以支撑那次外推。它自然的 ML 落地，是细胞系隐变量的基因投影与患者隐变量之间的逐基因 Mahalanobis 距离，或等价地，是预测分布之间的逐基因 KL。那篇随笔里的 Sade-Feldman 抗 PD1 证伪器是一个 Bayesian 惊讶检验：在任何一个细胞系不携带免疫信号的地方，τ_g 都应当接近零，而如果头部在那里返回 τ > 0，它就是误校准的。

那一步动作——把 τ_g 命名为一个校准过的惊讶分数、而非一个回归置信度——会把双隐变量项目直接嵌入 AlphaFold-pLDDT 的传统。同样的形状，不同的模态。

## 评判 + 待占切入点

架构上的组合已经发表。本文里没有任何新颖的 ML。VC FM 可守的新颖性面，是把成熟的不确定性方法应用到一个领域一直满足于点估计的底料上。三个具体动作：

**(a)** 在一个冻结的 scGPT 或 Geneformer 上做一个 pLDDT 式的逐细胞置信头部。在留出的细胞类型上训练；用可靠性图和期望校准误差报告校准。管道已经存在——Pedrocchi 式的 SAE 暴露了对的中间特征。

**(b)** 在 Perturb-seq 响应上做共形预测。对预测的、面向一个留出扰动的转录响应给出无分布的覆盖保证。还没有人在一个 Replogle 式基准上端到端地做过这件事。

**(c)** 在图谱搜索里为新细胞类型做 Bayesian 惊讶新颖性分数。SCimilarity 返回一个邻居；惊讶分数返回"这个邻居确实是邻居"的置信度。

同样的 v2/v3 模式。三者没有一个在架构上新颖——三者之所以都还空着，是因为细胞 FM 社区一直在为规模和基准赛跑，而不去问模型不知道什么。值得追的名字：**Berens lab**（Tübingen），做 sc-FM 校准；**Theis lab**（HMGU），做 scVI 系不确定性；**Pe'er lab**（MSKCC），做贝叶斯单细胞建模。诚实的不可行情形：如果 scGPT 上的一个校准头部，相对 scGPT-raw，并不改善在一个封存测试队列上的分布外拒识，那这个头部就是装饰；这个底料也许漏得太厉害，任何事后修补都救不了。

一个不知道自己不知道什么的虚拟细胞，不是一个虚拟细胞。
