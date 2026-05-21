---
title: "这个细胞明天还在吗？虚拟细胞基础模型里的稳定性、生态位依赖和寿命"
summary: "一张关于细胞状态稳定性的先行工作地图——把「稳定」这个词拆成四条可解释的轴（盆地深度 U、生态位依赖 λ、寿命 τ、群体频率 π），并对哪几条轴真正落进了单细胞 FM，给一个诚实的判断。那些命名好的抓手（PRESCIENT 势能、CellRank 吸收概率、scVelo/dynamo 雅可比、NicheNet 配体-受体耦合、LARRY 谱系追踪寿命、凋亡引发度、SenMayo 衰老特征）在动力系统和轨迹 ML 里都已经成熟。可没有一个，是作为一个稳定性头随 scGPT、Geneformer、scFoundation、UCE、STATE 或 CellPLM 一起出货的。这是继惊讶、可迁移性、可达性之后的第四层诚实——也是给这个四重奏收尾的那一层。"
---

> *认识论诚实四重奏里的第四篇。前三篇分别问：模型知不知道自己不知道（[惊讶 / 不确定性](surprise-and-uncertainty-in-cell-fms.md)）、一个状态到底够不够得着（[可达性与禁止态](reachability-and-forbidden-states-in-cell-fms.md)）、以及一个在某种细胞语境里成立的预测，搬到另一种语境还活不活（[双隐空间可迁移性](translatability-dual-latent-vc-fm.md)）。这一篇问第四个：模型把一个细胞放到某个状态上之后，那个状态待得住吗、能待多久、又仰仗哪些外源信号？它和[第六楔子那篇「细胞器感知」](organelle-aware-cell-fms.md)（讲代谢底物）以及[闭环 101](closed-loop-virtual-cells-101.md)（讲下游智能体拿这个答案去干什么）都有交叉。*

## 这个问题

细胞不是流形上的一个点。它是一个带着半衰期、还拖着一串依赖清单的点。一个初始 T 细胞需要张力性的 IL-7 信号，否则几天内就死。一个调节性 T 细胞需要 TGFβ，不然它会丢掉 Foxp3、转分化。一个衰老细胞「稳定」，仅仅是因为它既不肯死也不肯分裂——那是一种卡住，不是一个稳态。一个对 TME 配体上了瘾的肿瘤细胞，在体内活得好好的，可你一把它扔到组织培养塑料板上，转眼就垮。这些区分，没有一个活在转录组 FM 的解码器里。FM 提出一个状态，损失函数奖励的是 token 级别的准确率；至于持不持续，那是别人的事。这一篇要问的是：当「稳定」被拆成四条能逐一测量、逐一归因、逐一审计的轴时，一个稳定性先验会长成什么形状。

## 把这个词拆开

四个命名好的头，每一个在动力系统或单细胞基因组学文献里都有一个发表过的抓手。

**U(c)——盆地深度。** 这是 Waddington 地形那个量。盆地深，意味着状态在小扰动后会松弛回来；盆地浅，意味着轻轻一推就翻到别处去。PRESCIENT（[Yeo et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-23518-w)）从快照式谱系数据里学出一个标量势能 U(x)，用 Langevin 采样去尊重那些势垒。CellRank 2（[Weiler et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02303-9)）算的是进入各个终末宏观态的吸收概率——操作上，这是 U 的动力学风味版本。scVelo（[Bergen et al., *Nat Biotechnol* 2020](https://www.nature.com/articles/s41587-020-0591-3)）和 dynamo（[Qiu et al., *Cell* 2022](https://www.cell.com/cell/fulltext/S0092-8674(21)01577-7)）拟合的是「漂移 + 扩散」向量场；不动点处的雅可比特征值，直接就给出线性稳定性。

**λ(c)——生态位依赖。** 一个细胞之所以「稳定」，只是有条件地——条件就是那些撑着它的外源信号。数学上的抓手是梯度 ∂U/∂(生态位驱动的程序)：你要是在计算机里把 IL-7 响应程序消掉、盆地随之塌掉，那这细胞就是 IL-7 依赖的。NicheNet（[Browaeys et al., *Nat Methods* 2020](https://www.nature.com/articles/s41592-019-0667-5)）和 CellChat（[Jin et al., *Nat Commun* 2021](https://www.nature.com/articles/s41467-021-21246-9)）能预测每个细胞消费哪些配体-受体通道。空间组学（[Visium, MERFISH](https://www.nature.com/articles/s41592-021-01358-2)）给出那些配体到底来自哪个实际的邻里。**正是这个头，让「靠什么环境」这个问题变成可回答的、一个逐细胞的命名配体依赖向量**，而不是含含糊糊一句「语境」。

**τ(c)——寿命。** 动力学意义上的稳定。中性粒细胞约能活 5 天，记忆 T 细胞能活几十年。谱系追踪实验直接测的就是 τ。LARRY（[Weinreb et al., *Science* 2020](https://www.science.org/doi/10.1126/science.aaw3381)）是那个经典的、可扩展的 scRNA-seq 谱系追踪底料；GESTALT 和各种水印系统把这个想法又往前推。SenMayo（[Saul et al., *Nat Commun* 2022](https://www.nature.com/articles/s41467-022-32552-1)）这类衰老特征则标出另一种模式——长寿但增殖停滞。凋亡引发度（[Sarosiek et al., *Cancer Cell* 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）测的是一个细胞离线粒体凋亡阈值有多近，这是 τ 必须对得上的湿实验室金标准。

**π(c)——群体概率。** 在经验图谱分布下的频率。π 高，意味着这个状态被普遍观察到；再配上低 U，那就是「常见但病态」（肿瘤里的耗竭 T 细胞、衰老组织里的衰老成纤维细胞）。在 FM 嵌入上做贝叶斯密度估计——就是那个供给 U 的同一条流，换个归一化——白送给你这个。

这四者的乘积，不是一个标量。它是每个细胞一个四维向量，分解出细胞之所以稳定或不稳定的*原因*。

## 单细胞 FM 这边的图景——空的

scGPT（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、Geneformer（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）、scFoundation、UCE（[Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）、CellPLM、TranscriptFormer，还有 STATE（[Arc Institute 2025](https://arcinstitute.org/news/virtual-cell-model-state)）——U、λ、τ、π 没有一个是它们作为已发表的头出货的。掩码 token 那个预训练目标对稳定性是盲的：一条违背寿命生物学的 token 序列——比方说高细胞周期蛋白和终末凋亡引发度并存——只要边际 token 概率对得上，就不会额外付出任何损失。2025 年那场清算（[Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8)）测的是模型回归到了*哪个均值*，而不是它预测出的那个状态有多耐久。

scVI 的 ELBO（[Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)）是底料里现成最接近的抓手，但它抓的是密度而非盆地深度，而且既没有生态位依赖层，也没有寿命层。STATE 的适配器 API 对「一次预测出的扰动转移之后的持续性」没有任何已发表的校准。在 scGPT 和 scFoundation 上做的稀疏自编码器可解释性（[Pedrocchi et al., bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)，已被 ICLR 2026 接收）是稳定性归因的一个前置条件，但本身不是那个分数——它暴露出来的，是那些头将要去读的特征。

没有 scGPT 的盆地深度头。没有 Geneformer 的生态位依赖梯度。没有 STATE 的寿命回归。那个四维向量，没人算过。

## 那些已经出货了「稳定性形状」某种东西的邻近 FM

结构生物学那边的 FM 朝它比划过。AlphaFold-Multimer（[Evans et al., 2021](https://www.biorxiv.org/content/10.1101/2021.10.04.463034v2)）出货的界面 PAE，是对相对位置的一个逐残基对置信度——在结合界面这个尺度上，算一个「持续性置信度」的代理。ESM-2 的困惑度（[Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)）在蛋白质层面校准变体效应预测——「这个替换有多*稳定*」恰恰就是它的本行话。基因组 FM（Enformer、AlphaGenome）输出的是轨迹，而不是细胞状态之间的转移概率；它们不在这套本体论里。

细胞这一侧最接近的邻近测量，是 BH3 profiling（[Letai 实验室](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）——一个测细胞被引向凋亡有多深的湿实验室测量。它是任何一个计算机里的稳定性分数都得对上的那个金标准 τ 锚。至今还没有哪个转录组 FM，在一个已发表的基准上和它正面打成平手过。

## 这套算法

一个冻结 FM 的微调配方。在一个固定的 scGPT 或 Geneformer 嵌入之上挂四个头；没有一个需要一轮新的预训练。

**U 头。** 在 FM 嵌入上架一个标准化流，在 HCA / CELLxGENE 预训练细胞上训。一个留出细胞在这条流下的对数密度，就是势能。校准锚：PRESCIENT 风格的 Langevin 采样在收敛时应当复现出经验密度。

**λ 头。** 对每个细胞，用 NicheNet 配体程序特征（[Browaeys 2020](https://www.nature.com/articles/s41592-019-0667-5)）识别出候选的生态位配体通道。在输入里逐个扰动每个配体驱动的基因程序（把响应基因集清零，或把它的表达掩到群体中位数）。重算 U。梯度 ∂U/∂(配体程序) 就是逐细胞、逐配体的依赖分数。输出：一个在命名配体上的稀疏向量。这样一个 λ 主导在 IL-7 上的 T 细胞，和一个 λ 主导在 TGFβ 上的 Treg，就能直接拿来比了。

**τ 头。** 用三路信号做监督回归：（i）有 LARRY 追踪的地方，用它估的寿命；（ii）从同一个 FM 嵌入算出的 RNA-velocity 周转率；（iii）对着 SenMayo 衰老（[Saul 2022](https://www.nature.com/articles/s41467-022-32552-1)）和凋亡引发基因特征（[Sarosiek 2017](https://www.cell.com/cancer-cell/fulltext/S1535-6108(17)30048-9)）手工打的分。SCENIC+ 的 TF 调控子分数（[Bravo González-Blas et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)）作为辅助特征喂进来。输出：每个细胞一个以「小时到年」为单位的预期寿命。

**π 头。** 图谱边际密度。和 U 是同一条标准化流，只换一层归一化；比值 U/π 把「深而常见」（记忆 T）、「深但稀有」（长寿造血干细胞）、「浅但常见」（增殖中的祖细胞）、「浅且稀有」（模型的幻觉）四者分开。

**S 综合。** 一个可学习的线性组合 S = w · [U, λ, τ, π]，由下游任务来监督：「预测哪些状态在撤去细胞因子后还能存活」、「预测哪些耗竭 T 细胞会对检查点封锁有响应」、「预测这个肿瘤细胞会不会一上组织培养塑料板就垮」。

**可解释性层。** 三摞。（i）逐头 SAE 特征（[Pedrocchi 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2)）把 U 的贡献映射到单义的基因程序上。（ii）逐配体 λ 排序给出那个「叫得出名字的环境」答案。（iii）SenMayo / BH3 特征分解让 τ 可被检视。输出的句式模板：「S(c) = 0.3，U 高（深盆地），但 λ 主导在 IL-7 上——预测消掉 IL-7 会让 U 塌掉 40%。」

## 判断 + 敞开的楔子

三个具体的验证实验。（a）来自 TGFβ 敲除小鼠的 Treg → 敲除*前*，λ 就该把 TGFβ 依赖标成主导；敲除*后*，U 该塌。（b）健康外周血里的中性粒细胞 → π 高但 τ 短。（c）耗竭 CD8 T 细胞 → 在肿瘤里 U 低、π 高，在健康组织里 π 低；那个四维向量把「常见但病态」和「常见且稳定」分得开——而这个区分，领域靠肉眼已经做了十五年。

值得追的几个名字。**Charlotte Bunne**（EPFL → Stanford）——生态位转移的 OT 提法，以及现存最干净的扰动-稳定性工作。**Manolis Kellis**（MIT）——调控子与衰老这条轴。**Aviv Regev**——图谱尺度的密度，以及那个经验性的 π。**Anthony Letai**（Dana-Farber）——把 BH3 引发度当作湿实验室的 τ 锚。**Marius Lange**（Theis 实验室）——CellRank-2 那套吸收概率机器，U 头可以整套借过来。

和前三篇姊妹篇一个 v2/v3 套路：零件都在，细胞 FM 圈子一直在为规模和基准赛跑，而护城河在损失设计和那个联合底料里。一个说不出是什么让自己活着的虚拟细胞，不是虚拟细胞。它是一张快照，而快照没有未来。
