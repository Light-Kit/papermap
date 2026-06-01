---
title: '在 one-hot 之后：一个不能靠记忆取胜的虚拟细胞 adapter 长什么样'
date: '2026-05-30'
topics:
- foundation-model
- virtual-cell
- causal
- perturbation
- prototype
- identifiability
- interpretability
summary: '2026 年那场清算——把 scFM 的 embedding 换成 perturbation identity 的 one-hot 之后性能几乎不变——通常被读成"FM 没用"。把它反过来读：它说的是 benchmark 测的东西，one-hot 也能做。真正有意思的问题是 one-hot 在结构上*过不了*哪种评测，以及一个必须过这种评测的 adapter 长什么样——frozen backbone、可识别的因果层、Replogle/Norman 当湿实验替身。有机会打过 one-hot 的那个架构，恰好也就是把原型宽度测试"操作化"的那个架构。'
starred: true
---

> *相关阅读：[那场清算](why-linear-baselines-win.md)、[原型，而不是副本](prototypes-not-copies-the-virtual-cell.md)（这一篇在操作化的那个框架）、[因果模型与 FM、VC](causal-models-fm-and-vc.md)（那级阶梯）、[v5 五个问题](one-hundred-concepts-five-questions-v5.md)（整把梯子）、[扩散与流匹配](diffusion-and-flow-matching-for-virtual-cells.md)（adapter 坐在的那个表示）、[细胞状态可达性](cell-state-reachability-as-viability-theory.md)（原型崩坏的地方）。*

2026.02 那篇线性基线的工作落下来之后，圈里被反复引用的那个结论是：拿任何一个 scFM，把它的 embedding 换成一个 **perturbation identity 的 one-hot 向量**，交给下游那个预测扰动后状态的 MLP——性能几乎不掉。在六百多个训练好的模型上都成立。大多数人读出的是最伤的那个版本：foundation model 没在做什么一个 indicator 变量做不到的事。

这个读法对了一半。另一半更有意思。这件事**严格**说明的，是这个 benchmark **分辨不出**"学到的表示"和"查表"。这既是关于模型的陈述，更是关于评测的陈述。如果"记住第 173 号 perturbation"就能赢，那么这个指标从一开始测的就不是你想测的——它测的是 one-hot 也能做的东西。

所以真正的问题不是"FM 有没有用"。真正的问题是：**什么样的评测，one-hot 在结构上就过不了？**——以及，一个必须过这种评测的架构，长相必须是什么样？

这个问题答案很干净。这样的评测是：保留 perturbation 的**因果签名**、但把它的 identity 打乱，预测必须崩——这意味着模型读的必须是因果结构，不是身份。对应的架构是：模型从 perturbation 到预测，必须穿过一个**结构性瓶颈**，这个瓶颈逼着它读因果结构。

这一篇是关于这个架构长什么样、它*不*是什么、以及它最有可能在哪里坏掉。

## 现在所有 adapter 都没有的那个性质

窍门是：别再把 one-hot ablation 当成一个**要打过的数字**，把它当成一种**性质**。

这个性质是：把本该承载扰动机理的那条因果输入打乱——性能必须掉。掉不下来，说明模型读的不是这条因果路径，读的是 identity。掉了，才证明这次预测**需要**那条因果信息。

注意：现在所有挂在 frozen FM 上的 adapter，构造上都没有这个性质。PertAdapt、scDCA、各种 SAE-steering 流水线——它们让 perturbation 信号有不止一条路径走到预测端，其中总有一条是 one-hot 形状的东西（embedding lookup、perturbation token、context vector）。所以即使这些 adapter 在 leaderboard 上变好了，也不一定是**通过**因果结构变好的。它们可能只是更聪明一点的 one-hot。

带这个性质的模型，长相非常具体。"哪个 perturbation"到"细胞变成什么"之间所有的信号，都必须穿过一个**单一瓶颈**：这一层的输入是可解释的因果概念，输出在概念间**学到的有向图**上传播，并且**不携带任何不已经编码在概念里的 identity 信息**。

只要瓶颈足够窄，你就没法把 perturbation identity 偷渡过去。把概念输入打乱，模型剩下的部分就没有可预测的东西了。性能崩。模型过了 ablation——*因为它别无选择*。

这才是"结构上无法记忆"的真正意思。不是参数更多、loss 更巧、benchmark 更花。是信息从 perturbation 到预测，被**允许**怎么流。把流向定对，ablation 是白送的。

## 这样的 adapter 长什么样

搭这个 adapter 用的零件其实都现成。单独看没一个是新的。新意在组合，以及对这个组合的要求是**必须满足那个性质**。

**Backbone，冻住。** 用一个 SOTA scFM——State 的 SE→ST 栈、Tahoe-X1、scFoundation——只做 forward inference。最贵的那一段（训 foundation model）一开始就排除在预算之外。你不在搞一个更好的表示；你在问：基于一个表示，*什么样的用法*能过 ablation。

**Latent 上的因果层。** 借 GraCE-VAE 的 structural-causal-model 层：在 decoder 上显式做一个 SCM 层，处理"被干预的变量是 latent、未知"的情况——单细胞数据正好就在这个 regime 里。每个 perturbation 被映射到一小组**因果概念上的 shift**；decoder 再让这些 shift 在概念间的有向图上传播，最后才重建细胞状态。

**Identifiability 条件。** 这是承重那块。最近关于"nonlinear mixing 下，线性因果表示在 non-paired、single-node 干预上可识别（至差一个标签置换）"的结果，给的就是你需要的那个保证。CRISPRi/CRISPRa 数据现实里就符合：每次扰动就动一个基因，Replogle 的全基因组 panel 给的就是足够的多样性。再叠上 PDAE 的外推保证——"未见 perturbation 的因果签名落在已见的线性 span 之内，外推是有理论保证的"——你就有了一个理论，告诉你*哪些*未见 perturbation 你应该预测得了、*哪些*不该。

**Replogle 和 Norman 当湿实验替身。** 这是让整件事可以在纯计算预算下走完的那一步。adapter 训完之后，你把它推出来的因果边——"概念 A 推动概念 B"——拿去问独立的干预数据：CRISPRi 干掉 A（不同细胞系、不同实验室），下游 B 的签名是不是和你预测的方向一致？不需要新做实验。实验已经在公共仓库里躺好了，要么 reproduce 要么不 reproduce。

**注意这件事*没有*做什么。** 没有新表示、没有更大的模型、没有 benchmark tuning。adapter 单次训练个位数 GPU-hours。整个 compute envelope 在两张 H100 上跑得下，唯一需要把 backbone 装进显存的环节是一次性提 embedding。工作在瓶颈的设计上、在 identifiability 条件的选择上——不在 scale 上。

## 这件事*不*是什么

这个领域已经够拥挤了，明确说一下哪个邻居是哪个邻居。

**SCCVAE** 是精神上最近的一个。学一个调控网络、把扰动建模成在网络上传播的 shift intervention，在未见单基因外推上的确打过 SOTA。但是：它从不碰 foundation model（明说是别人的方向）；只做基因扰动，不碰药；它的因果图就是一个上三角 mask，没有 sparsity penalty。三个弱点，三个机会。把同一个想法搭在 State 的 frozen latent 上、扩到 Tahoe 的药物扰动（带上下一节的 caveat）、给图配一个真正的 sparsity prior——那就是另一篇文章。

**SENA-discrepancy-VAE** 把 interpretability 的活做得很干净，但它证明的是"不掉性能"——可解释性是免费的。更难的那个主张——*通过*可解释性*提升*性能——才是结构性质这条路逼出来的东西。

**CellCap** 把 perturbation **响应**拆解成稀疏的、可解释的 program。漂亮的工作。但它在做*分解*，不在做*归因*。"找到预测错的那个因果概念，用它去校正"——这个 diagnose-and-correct 回路是 CellCap 做不了的动作，因为 program 和 error 不在同一个空间里。

**PertAdapt 和 scDCA** 是把"在 frozen scFM 上挂 adapter"这套范式立起来的工作。它们不是对手，它们是地基。这一篇的新意不是"我搭了个 adapter"。新意在 adapter 内部装的是什么：一个可识别的因果图、一个 error attribution 回路、以及一个让 one-hot ablation 从问题变成自检的结构性承诺。

合起来才是事。单独拿出来，上面任何一篇都不是死的，都是答案的三分之一。

## 它会在哪里坏

架构干净、理论有牙。它也至少有四种失败方式，趁还没被 reviewer 点出来之前自己先点。

**药物扰动违反 single-node 假设。** Nonlinear mixing 下的 identifiability 假设一次 intervention 只动一个 latent。CRISPRi/CRISPRa 单基因合得上。药——比如 Tahoe-100M 里的那些——一次动十个东西、还不同剂量。Single-node identifiability 在这里不成立。诚实的做法是**说出来**：identifiability 保证覆盖单基因遗传扰动；药物结果是 predictive，但**没有**这个保证。藏比承认更糟。

**瓶颈必须真的窄。** "结构上无法记忆"不是免费的。它依赖瓶颈携带的 bit 数少于"perturbation identity 需要的 bit 数"。一个宽的瓶颈——比如对一个 500-perturbation panel 用 1024 维的概念层——就是一个更贵的 one-hot。窄度必须**实测**：扫瓶颈宽度，量 one-hot-ablation 的性能掉幅，找到掉幅消失的那个点。那个点就是真实的记忆阈值，模型必须活在它下方。

**Error attribution 需要一个真方法。** 说"把 error 投影到概念空间"是 hand-waving。能站住的选项：基于梯度的归因（loss 对每个概念 shift 的 integrated gradients）、概念反事实扰动（强制把一个概念设成它的预测值，量预测变化），或者——最好——利用因果层的线性结构做一个 closed-form 的 decomposition。挑一个，证它合理，别含糊地指 attention weights。

**Held-out 切分必须诚实。** 未见 perturbation ≠ 未见细胞。"已见 perturbation 下未见的细胞"是在重述 in-distribution 问题，对外推几乎没有预测力。PDAE 保证把未见 perturbation 切成两半：因果签名落在已见线性 span 内的（外推保证）、落在外面的（没保证）。**分别**报告、附上 PDAE 准则的明确陈述——这才让结论可证伪。

**窗口在关。** SCCVAE 作者已写到 FM 扩展是下一步方向。Intervention identifiability 的理论 paper 在 NeurIPS 2025 落地。one-hot 那次清算到现在六个月。任何认真的人都在同一场赛跑里。方法论纪律不会因为领域跑得快就放宽；时间表会。

## 原型宽度测试，被操作化

退一步。这件事除了一篇文章，还为什么重要？

在[原型那篇](prototypes-not-copies-the-virtual-cell.md)里，frame 是：virtual cell 是一个 prototype——一个生成式、可干预、可用 OT 连接的范本，真实细胞与它有可测量的关系。当下整个领域的危机，本质上是一个**原型宽度**问题：今天的 virtual cell 是窄原型，在贴近训练分布的细胞上看着行，离开训练支撑就丢掉所有结构。

结构性质这条路，做的事情就是把宽度测试**操作化**。一个能过 one-hot ablation 的模型——一个真在通过可识别的因果概念，把 perturbation 一路传到预测的模型——按构造就有一个**机制**，把它的原型和它从未见过的扰动连起来。机制给了你一个有原则的"这个扰动还在原型的射程内吗"的判据（PDAE 的线性-span 测试），机制也给了你一个有原则的"这个原型为什么觉得答案是 X"的拆解（因果图）。两者都是宽度性质。原型变宽了——以一种可量化的方式——因为机制延伸到了训练支撑之外。

这里也是因果 adapter 和 [OT 桥](prototypes-not-copies-the-virtual-cell.md)做互补工作的地方。OT 给你原型分布和观测细胞之间的**距离**，以及它们之间的**传输映射**。因果层给你原型在干预下**会变成什么**的**机制**。距离和机制，并列站着。前者回答"这个真实细胞和原型有多近"；后者回答"原型在被扰动时会怎么走"。一个同时拥有这两件事的领域，才有真正可预测的细胞理论的雏形。

这件事没有一件是定论。瓶颈可能窄不到逼出那个性质。Identifiability 条件在异质细胞 regime 下可能塌掉。Replogle 上的复现率回来可能太低，机制讲不动。但答案的**形状**——frozen backbone、可识别的窄瓶颈、在学到的因果图上传播、用独立干预数据做验证——是后-清算时代这个领域需要的形状。如果不是这个，那也会是骨架相同的东西。
