---
title: "把「细胞状态可达性」当成一套生存力理论：一个分层流形框架，以及它所引出的 v0.1"
summary: "认知诚实这条主线上的第八篇，也是头一篇不再只做诊断、而是动手提一个模型的。前面七篇姊妹篇追问的是当下的细胞 FM 做不到什么（惊讶、可达性、可翻译性、稳定性、多模态稳定性、可解释性），并交付了一份给 λ 头用的、可证伪的两周预实验。这一篇给那份预实验所朝向的那个更大模型起了名字——一个锚在 Aubin 生存力理论（viability theory）上的「可达性基础模型」。细胞状态流形被看成一个分层空间：一个已实现的内部（沿发育或演化轨迹真出现过的状态）、一个可工程化的边界（靠 iPSC 式重编程、TF 鸡尾酒、转分化能抵达的状态）、以及一个被禁止的外部（物理或化学约束直接排除掉的状态）。模型是一个 diffusion / flow-matching 骨干（CFGen、CellFlow）外加三个新头：一个层位分类器、一个推广了 scDiffEq 的谱系图连通性先验、以及一个把 SCENIC+ 调控拮抗、调控 FBA 通量不可行、布尔调控逻辑相容三项加在一起的「禁止能量」项。新意全在这套组合里——而生存力理论，正是那句能让它顶住「这不就是 OOD 检测嘛」那种条件反射式审稿意见的引用。"
---

> *认知诚实这条主线上的第八篇，也是头一篇不再追问现有 FM 做不到什么、转而动手提那个该做得到的模型。前面七篇——[惊讶](surprise-and-uncertainty-in-cell-fms.md)、[可达性](reachability-and-forbidden-states-in-cell-fms.md)、[可翻译性](translatability-dual-latent-vc-fm.md)、[稳定性](cell-stability-and-niche-dependence-in-vc-fms.md)、[多模态稳定性](multimodal-stability-and-failure-modes-in-vc-fms.md)、[可解释性的领域现状](interpretability-state-of-cell-fms.md)，还有那篇[生态位依赖预实验](reading-niche-dependence-off-frozen-cell-fms.md)——都在诊断那个缺口，并交付能填上其中一块的最小实验。[五十个概念那篇](fifty-concepts-one-bet-v2.md)把这套词汇整合到一处。而这一篇，是把这些零件拼成一份研究纲领：一个关于「什么能存在、什么能被造出来、什么造不出来」的分层流形基础模型。*

## 那个问题

头七篇文章收敛到了一个领域一直在绕着问、却没正面问的问题上：不是「我们能把扰动响应预测得多准」，而是「一个细胞到底能占据哪些状态」。可达性那篇姊妹篇把答案勾勒成了自然态 / 诱导态 / 禁止态三档，但停在了诊断这一步。稳定性那篇把 `stable`（稳定）拆成了四个可解释的头，生态位依赖预实验则把那个唯一的新头（λ）当成一个两周的证伪器交付了出来。这一篇给那份预实验所迈向的模型起了名字——一个*可达性基础模型*：把任意一个查询细胞态分进三个层位之一，把这个判定归因到一个有名有姓的成因上，并在该状态可达时给出一条路径。它的数学骨架已有四十年历史，却从没在 FM 的尺度上用到单细胞身上。这套模型配方是搭在现成 diffusion / flow-matching 机器之上的薄薄一层。新意在于组合，而 agent 的任务，就是把这个 v0.1 造出来。

## 理论骨架

给这套框架配的对的引用，不是分布外检测，也不是开集识别——而是 Aubin 的生存力理论（[Aubin, *Viability Theory*, Birkhäuser 1991](https://link.springer.com/book/10.1007/978-3-642-16684-6)；修订版 [Aubin, Bayen & Saint-Pierre, 2011](https://link.springer.com/book/10.1007/978-3-642-16684-6)），它讲的正是一个受约束的动力系统能占据哪些状态、又是怎么抵达那里的。它有三个原生对象，恰好一一对应那三档细胞态：**生存核**（viability kernel，在自然动力学下可被无限期占据的状态）就是已实现的内部；**捕获盆**（capture basin，在能把系统驱回生存核的受控输入下可抵达的状态）就是可工程化的边界；而**非生存的补集**就是被禁止的外部。Hamilton-Jacobi 可达性（[Mitchell, Bayen & Tomlin, *IEEE TAC* 2005](https://ieeexplore.ieee.org/document/1463302)；[Bansal, Chen, Herbert & Tomlin, CDC 2017](https://arxiv.org/abs/1709.07523)）给出计算上的机器，而最近一篇生物学论文（[Hirsch & Herbert, arXiv 2503.11021, 2025](https://arxiv.org/abs/2503.11021)）证明了 HJ 可达性能在小尺度上移植到双时标的基因调控网络。还没有人把这套框架带到图谱尺度的细胞基础模型上。于是整套主张可以压成一句话：*把生存力理论在一个细胞基础模型上落地实现。* 正是这句话，让纲领的其余部分顶得住那位一伸手就抓「这不就是 OOD 检测嘛」的审稿人。

## 模型框架

骨干是借来的。CFGen（[Palma et al., ICLR 2025](https://arxiv.org/abs/2407.11734)）、CellFlow（[Klein, Tejada-Lapuerta, Theis & Bunne, bioRxiv 2025](https://www.biorxiv.org/content/10.1101/2025.04.11.648220v1)）或 scDiffusion（[Luo et al., *Bioinformatics* 2024](https://academic.oup.com/bioinformatics/article/40/9/btae518/7738782)），都能经由流匹配（[Lipman et al., ICLR 2023](https://arxiv.org/abs/2210.02747)）或去噪扩散（[Ho et al., NeurIPS 2020](https://arxiv.org/abs/2006.11239)）在细胞态流形上给出一个能用的密度。真正的贡献，落在外加的三个头上。

**层位头。** 一个带校准置信度的三分类器——已实现 / 可工程化 / 禁止——端到端监督训练，并在形式上当成一个划分好的开集识别问题来处理（[Scheirer et al., *IEEE TPAMI* 2013](https://www.wjscheirer.com/papers/wjs_tpami2013_openset.pdf)）。共形预测（[Vovk, Gammerman & Shafer, 2005](https://link.springer.com/book/10.1007/b106715)）给出逐预测的置信区间，而这正是把可证伪性主张一路扛过评审的那个东西。

**连通性先验。** 一个架在谱系追踪树（LARRY, [Weinreb et al., *Science* 2020](https://www.science.org/doi/10.1126/science.aaw3381)；Cospar；CARLIN）之上的图拉普拉斯正则项。按「一切细胞皆来自细胞」（*omnis cellula e cellula*），每一个已实现的状态都有一条连续的、高密度的路径通回某个祖先。这一项推广了 scDiffEq（[Cofer et al., bioRxiv 2023](https://www.biorxiv.org/content/10.1101/2023.12.06.570508)）——它把 LARRY 条形码用作有监督的命运标签，而我们改用它们在训练里当一个连通性惩罚。「严格推广」这个定调，是熬过一位读过 scDiffEq 的审稿人的关键。

**禁止能量项。** 一个加总而成的能量，一旦离开「已实现 + 可工程化」流形就会陡然升高，且由三个有名有姓的贡献项构成，好让这份能量是可因果归因的，而不是一个黑箱分数。(i) 从 SCENIC+ GRN 算出的调控拮抗（[Bravo González-Blas et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01938-4)），惩罚那些在饱和水平上被共表达的、彼此拮抗的主调控因子。(ii) 调控 FBA 不可行性（[van Berlo et al., *IEEE/ACM TCBB* 2011](https://ieeexplore.ieee.org/document/5560791)；FlexFlux, [Marmiesse, Peyraud & Cottret, *BMC Syst Biol* 2015](https://bmcsystbiol.biomedcentral.com/articles/10.1186/s12918-015-0238-z)），把经典 FBA 的不可行性检测从代谢通量推广到调控状态向量。(iii) 对照来自细胞决策文献的、人工整理的 motif 规则，做布尔调控逻辑相容性判定。流形-EBM 和 MPDR 那一脉文献（[Du & Mordatch, NeurIPS 2019](https://arxiv.org/abs/1903.08689)；[Yoon et al., NeurIPS 2023](https://arxiv.org/abs/2310.18677)）为「一个活在数据流形之外的能量」提供了形式化的脚手架——没有它，这个禁止头读起来就像是临时拍脑袋的。

**合成负样本生成器。** 禁止类没有图谱，得我们自己造。从 SCENIC+ 里采样出彼此拮抗的 TF 对，把两者都设到饱和，再嵌入。把不相容的身份程序在饱和水平上混在一起（Foxp3 配 T-bet，Hb 配 myosin）。在数据支撑之外注入高斯噪声。这个生成器是整套系统里对可复现性最关键的一块，应当作为一个带单元测试的独立模块发布，而不是塞成训练里的内联辅助函数。

**可达性提议器。** 给定一个落在可工程化层位里的查询目标，在一个体细胞源点和该目标之间架一座 Schrödinger 桥（[Bunne et al., *Nat Methods* 2023](https://www.nature.com/articles/s41592-023-01969-x)），提议出那条最优的连续路径，而这条路径的 TF 轨迹就成了鸡尾酒方案。Yamanaka 式的发现就成了天然的、锚在湿实验上的验证：当你在它没见过的数据上要一条「成纤维细胞 → iPSC」的路径时，这个提议器能不能把 OCT4 / SOX2 / KLF4 / MYC 重新发现出来？

## 老老实实算一笔账：哪些是真正属于我们的

diffusion 骨干是借来的（CFGen / CellFlow）。谱系感知的训练信号是 scDiffEq 的一个严格推广。生存力理论的定调是从控制论移植过来的，从没在一个细胞 FM 上落地实现过。而禁止能量的那套融合（SCENIC+ 调控拮抗 + rFBA 通量不可行 + 布尔调控逻辑相容 + 流形-EBM 脚手架）是货真价实的新东西——迄今没有任何预印本或论文把这几项组合在一个细胞基础模型的嵌入上。把层位头当作「带因果归因的开集识别」——三个类别，每个都带一个*有名有姓*的贡献成因——也是架在普通 OOD 检测之上的一个新定调。组合本身，才是贡献。生存力理论是那个让这套组合显得理所当然、而非临时拼凑的东西，也正是评审时能保下这篇论文的那条引用。

## 我们该造的那个 v0.1

具体的两个月范围。一个 A100 节点，大约 150 GPU 小时，三个预注册的证伪器，一个仓库。

**骨干。** 在 Tabula Sapiens v2 加上 iPSC 重编程时程（[Hanna et al., *Nature* 2009](https://www.nature.com/articles/nature08137)；CELLxGENE Census 里近期的 Yamanaka 数据组）上跑一个冻结的 CFGen checkpoint。不要重训；预实验那套纪律一路带着走。

**头。** 在 CFGen 残差流之上挂几个小 MLP。新增参数总量控制在骨干的 5% 以内。骨干冻结，端到端训练大约一周。

**禁止能量，分期上。** 先只上 SCENIC+ 调控拮抗；rFBA 留到 v0.2，布尔逻辑留到 v0.3。当初约束生态位依赖预实验的那套范围纪律，同样约束这一个——每个版本只加一个新项。

**三个预注册的证伪器，在出任何结果之前先写进 `PROTOCOL.md`。**

1. **层位宏平均 AUROC > 0.80**，在那个三分对照上（Tabula Sapiens 的已实现细胞 vs Hanna 的 iPSC 重编程中间态 vs 合成负样本生成器的输出），自助法 CI，留出测试划分，并带明确的供体层泄漏控制。
2. **Yamanaka 复现。** 给定一个成纤维细胞源点、和一个嵌在可工程化层位里的类 iPSC 目标，Schrödinger 桥的鸡尾酒提议器要按积分轨迹权重把 OCT4 / SOX2 / KLF4 / MYC 排进前五候选 TF。这正是[可解释性那篇姊妹篇](interpretability-state-of-cell-fms.md)所点名的、整个细胞 FM 文献里都缺的那块、锚在湿实验上的证伪器。
3. **禁止能量零假设。** 合成负样本细胞的禁止能量要高于已实现的图谱细胞，且自助法 CI 不跨越零；与此同时，对真实图谱细胞做随机基因集消融，*不会*把能量推出已实现的那一带。没有这个对照，禁止头就只是个装饰。

三个都过，那这块底料就是真的，论文自己就写出来了。任何一个没过，论文就变成一份校准过的负结果——而这正是细胞 FM 这个领域和正结果同样急需的东西。

## 结论，以及 agent 的任务

这就是生态位依赖预实验所迈向的那个模型。预实验赚下的可信度（两个证伪器、两周、只用 scGPT），换来的是被听见去讲那个更大主张（生存力理论 + 分层流形 + 禁止能量）的资格。这份活儿被拆成三次提交，好让下游 agent 接手。(i) 起草 `PROTOCOL.md`——预注册证伪器，加上合成负样本生成器的规范，照着 `niche-lambda` 那套纪律来。(ii) 造出 v0.1——CFGen 微调 + 三个头 + 三个证伪器，单块 A100，两个月。(iii) 把仓库以 `strata/` 或 `cellreach/` 发布，禁止能量模块作为要守护的 IP，合成负样本生成器作为测试最密的那个文件。三个要提前堵上的风险：审稿人二号会说*这不就是 OOD 检测嘛*（在摘要里用「带因果归因的开集识别 + 生存力理论」定调来反驳）；scDiffEq 已经用了 LARRY（把连通性先验定调成一个严格推广，而不是一项发明）；合成负样本生成器是承载可信度的那块（作为独立模块、带单元测试发布，别埋进训练循环里）。几个得盯着、防着被抢发的名字：**Charlotte Bunne**（EPFL/Stanford，气质上最接近——CellFlow + CellOT）；**Fabian Theis**（Helmholtz Munich，CFGen 流水线的主人）；**Sylvia Herbert**（UCSD，唯一一个已经在把 HJ 可达性用到生物网络上的人）。一个说不出「什么不能存在」的虚拟细胞，是一个还没配得上这个名字的虚拟细胞。下一步，就是去造一个能说得出的。
