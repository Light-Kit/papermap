---
title: "虚拟细胞怎么知道自己「不知道」？给细胞基础模型的惊讶量个值"
summary: "一张关于「惊讶 / 不确定性 / OOD 检测」方法的先验地图，外加一句诚实的判词：这些方法里，到底有几个真正落进了单细胞 FM 内部。那些叫得上名字的把手（Shannon 惊讶、Bayesian 惊讶、Mahalanobis / ODIN / 能量分数 OOD、Kendall-Gal 的认知 vs 偶然、共形预测、AlphaFold 的 pLDDT/PAE）在 ML 里全都成熟了——可几乎没有一个，在校准这个层面被用到 scGPT、Geneformer、scFoundation、UCE、STATE 或 CellPLM 身上。来自双隐变量姊妹篇的 τ_g 可翻译性分数，其实是一个换了名字的、逐基因的认知惊讶信号。"
---

> *这篇是[双隐变量可翻译性那篇](translatability-dual-latent-vc-fm.md)的姊妹篇（τ_g 也住在那里，只是叫了别的名字），也和[为什么线性基线会赢](why-linear-baselines-win.md)（一场和校准沾边、但换了框架来讲的清算）、[闭环虚拟细胞 101 巡礼](closed-loop-virtual-cells-101.md)、以及[因果模型、FM 与 VC](causal-models-fm-and-vc.md)同气连枝。这篇向 VC FM 这一族再问一个诚实的问题：当模型碰到一个它从没见过的细胞或扰动时，它会不会告诉你它没见过？*

## 问题

一个虚拟细胞，要是在一个没见过的细胞类型里、对一种没见过的药，自信满满地给出错误响应，那它比没有模型还糟——它把「未知的未知」变成了听起来很精确的错误答案。建虚拟细胞而不是去跑湿实验，整件事的要点就在于：模型应当知道哪些查询它答得了。如果 FM 没法告诉你它正在外推，那你手里的就不是一个虚拟细胞，而是一个揣着自信妄想的回归。

## ML 里那些叫得上名字的把手

ML 在这件事上的文献已经很成熟。八个值得认识的家族。

**Shannon 惊讶**——模型下的 −log p(x)。困惑度是它的指数平均。语言模型的命门就在它身上。当模型是生成式的，它算起来不费劲；当模型只是判别式的，它就没有定义。

**Bayesian 惊讶**（[Itti & Baldi, *Vision Research* 2009](https://www.sciencedirect.com/science/article/pii/S0042698909000709)）—— KL[后验 ‖ 先验]。它量的是这次观测把模型的信念*挪动*了多少，而不只是这次观测有多不可能。当先验是平的时候，它更干净，因为「在一个平先验下不可能」并不算那种正经意义上的惊讶。

**OOD 检测。** 自成一片子领域。值得认识的几个有名方法：到训练特征的 Mahalanobis 距离（[Lee et al., NeurIPS 2018](https://arxiv.org/abs/1807.03888)）、带温度缩放的 ODIN（[Liang et al., ICLR 2018](https://arxiv.org/abs/1706.02690)）、能量分数（[Liu et al., NeurIPS 2020](https://arxiv.org/abs/2010.03759)）、深度集成的分歧（[Lakshminarayanan et al., NeurIPS 2017](https://arxiv.org/abs/1612.01474)）、MC-dropout 方差（[Gal & Ghahramani, ICML 2016](https://arxiv.org/abs/1506.02142)）。

**认知不确定性 vs 偶然不确定性**（[Kendall & Gal, NeurIPS 2017](https://arxiv.org/abs/1703.04977)；[Hüllermeier & Waegeman, *Mach Learn* 2021](https://link.springer.com/article/10.1007/s10994-021-05946-3)）。一个要紧的区分。认知 = 模型不知道，原则上多给点数据就能补上。偶然 = 世界里不可约的噪声。对 VC FM 来说，你真正在乎的多半是认知那一类，因为正是它告诉你模型在外推。

**共形预测**（[Vovk, Gammerman, Shafer, 2005](https://link.springer.com/book/10.1007/978-3-031-06649-8)；[Angelopoulos & Bates, *FnT* 2021](https://arxiv.org/abs/2107.07511)）。无分布假设的预测*集合*，带有限样本的覆盖保证。当你想要的是一组校准过的、说得通的候选答案，而不是一个点估计加一种感觉时，它就是那个对的对象。

**影响函数**（[Koh & Liang, ICML 2017](https://arxiv.org/abs/1703.04730)）。把这个训练点拿掉，预测会变多少？它让你不用留出探针就能回答「这个输出有没有训练数据支撑」。

**自由能 / 预测编码**（[Friston, *Nat Rev Neurosci* 2010](https://www.nature.com/articles/nrn2787)）。大一统理论那个版本。把变分下界当成大脑的损失函数。在这里它主要作为 scVI 所暴露的那个 ELBO 的祖先而相关。

## 单细胞 FM 这边的图景——基本是空的

scVI（[Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)）和它的 scvi-tools 后代，暴露了一个逐细胞的 ELBO 以及隐空间上的 Bayesian 不确定性——它们生来就有，因为它们本就是 VAE。这是底料里唯一一个站得住脚的校准故事。

2023–2024 年那波 sc-FM 没接着往下走。scGPT（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）、scFoundation、UCE（[Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、CellPLM、TranscriptFormer——没有一个把校准曲线、OOD 检测基准或者认知不确定性估计当作头牌模型的一部分发布出来。掩码基因预测损失暴露了一个逐 token 的似然，你*本可以*把它变成一个 Shannon 惊讶信号，但论文都没把它摆到台面上。

STATE（[Arc Institute, 2025](https://arcinstitute.org/news/virtual-cell-model-state)）以产品形态发布，有版本化的发行和适配器 API，却照样没有一个公开的不确定性层。2025 年那批清算文献（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)；Wenkel et al；Csendes et al）表明，扰动预测上的*点估计*塌到了线性基线的水平——但这场清算说的是均值的可靠性，不是均值周围那个分布的校准。这是两个不同的问题，而只有一个被问过。

最接近的几个公开动作都属于辅助性质。一些近期的零样本基准（[Boiarsky et al；Kedzierska et al 2025](https://www.biorxiv.org/content/10.1101/2025.02.13.638126v1)）测了在留出组织上的迁移误差，这隐含地是个 OOD 探针。在 scGPT 和 scFoundation 上做的稀疏自编码器可解释性工作（[Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）撬开了逐特征的表征，这是 token 级惊讶的前提条件，但还不是惊讶本身。

没有 scGPT 版的 pLDDT。没有 Geneformer 的置信头。没有 STATE 的逐预测校准。2026 年，生物 FM 版图的细胞这一侧，是「校准盲」的。

## 那些确实出了不确定性的相邻生物 FM

AlphaFold（[Jumper et al., *Nature* 2021](https://www.nature.com/articles/s41586-021-03819-2)）是那个定义了领域的反例。**pLDDT** 是一个随每次预测一起给出的逐残基置信分数，蛋白质社区把它内化得如此彻底，以至于论文都会把平均 pLDDT 和结构并排报出来。**PAE**（预测对齐误差）则给相对位置一个逐残基对的置信度。这些不是可选的附加件——它们就是模型沟通其不确定性的方式，也是下游用户判断某个区域可不可信的依据。AlphaFold-Multimer 把同样的思路延伸到了界面（[Evans et al., 2021](https://www.biorxiv.org/content/10.1101/2021.10.04.463034v2)）。

ESM-2（[Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)）暴露了逐 token 的困惑度，而 ProteinGym 基准（[Notin et al., NeurIPS 2023](https://proceedings.neurips.cc/paper_files/paper/2023/hash/cac723e5ff29f65e3fcbb0739ae91bee-Abstract-Datasets_and_Benchmarks.html)）把它变成了一个变异效应的校准故事——在 217 个深度突变扫描数据集上，高困惑度的替换和有害突变相关。校准并不完美，但它出了。

病理 FM 走到了半路：Virchow-2 和它的同辈出了分类置信度，但校准不是它们的卖点。

这个套路是：结构和序列 FM 把不确定性头当作头牌产品的一部分发了出来；细胞 FM 没有。

## τ_g 的关联

我在[双隐变量姊妹篇](translatability-dual-latent-vc-fm.md)里勾勒的那个可翻译性分数，在形式上，就是一个换了名字、伪装起来的逐基因认知不确定性信号。这个分数问的是：对基因 g，VC FM 该在多大程度上*信任*这次「细胞系→患者」的迁移——这恰恰就是一个关于「该基因特异的表征，有没有被训练底料钉得够牢、足以支撑这次外推」的认知性主张。它天然的 ML 落地，是细胞系隐变量的基因投影与患者隐变量之间的逐基因 Mahalanobis 距离，或者等价地，是预测分布之间的逐基因 KL。那篇文章里的 Sade-Feldman 抗 PD1 证伪器，就是一个 Bayesian 惊讶检验：凡是细胞系不携带免疫信号的地方，τ_g 都该接近零；如果那个头在那些地方返回 τ > 0，它就是校准失准了。

把 τ_g 命名为一个校准过的惊讶分数、而不是一个回归置信度——这一步，会让双隐变量项目直接接进 AlphaFold-pLDDT 那条传统里。同样的形状，不同的模态。

## 判词 + 敞开的楔子

架构层面的组合已经发表过了。这篇文章里没有任何新的 ML。VC FM 真正能站得住的新意面，在于把成熟的不确定性方法，应用到一个此前一直满足于点估计的底料上。三个具体动作：

**(a)** 在冻结的 scGPT 或 Geneformer 上加一个 pLDDT 式的逐细胞置信头。在留出的细胞类型上训练；用可靠性图和期望校准误差来报校准。管线是现成的—— Pedrocchi 式的 SAE 暴露了所需的那些中间特征。

**(b)** 在 Perturb-seq 响应上做共形预测。对一个留出扰动的预测转录响应，给出无分布假设的覆盖保证。还没有人在 Replogle 式的基准上端到端地做过这件事。

**(c)** 给图谱搜索里的新细胞类型做一个 Bayesian 惊讶新颖度分数。SCimilarity 返回一个邻居；这个惊讶分数则返回「这个邻居到底是不是邻居」的置信度。

还是那个 v2/v3 套路。三个里没有一个在架构上是新的——三个都还空着，只因为细胞 FM 社区一直在为规模和基准狂奔，而没去问模型不知道什么。值得追的人：sc-FM 校准看 **Berens 实验室**（Tübingen），scVI 一族的不确定性看 **Theis 实验室**（HMGU），Bayesian 单细胞建模看 **Pe'er 实验室**（MSKCC）。诚实的「此路不通」：如果一个加在 scGPT 上的校准头，在一个封存的测试队列上相对 scGPT-原始版并没有改善分布外拒识，那这个头就是装饰；底料可能漏得太厉害，任何事后修补都救不回来。

一个不知道自己「不知道什么」的虚拟细胞，不是虚拟细胞。
