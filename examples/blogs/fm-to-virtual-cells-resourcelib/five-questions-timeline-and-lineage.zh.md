---
title: "梯子是什么时候搭起来的：一百个概念背后的时间线与谱系图"
summary: "给五个问题那几篇做的一份补充对照表。那几篇是按概念的「梯级」来排的（描述 → 关联 → 清算 → 干预 → 预测 → 反事实），不是按时间——所以这一篇把每一项有日期的工作摆成表：它到底什么时候出现（首个预印本 vs 版本更迭 vs 正式见刊；挑战赛则是启动 vs 截止），再加上一作、末位/通讯作者和所属机构。两张表加一份发现清单：（1）主时间线，从老到新，正好是梯子的反向；（2）谱系线索——真正把这些工作连起来的那些线，某个实验室或某个人反复跨越多个梯级（Theis 实验室那条方法主梁；Aviv Regev 从 Broad 到 Genentech；Romain Lopez 从 scVI 到 DCD-FG 到 IterPert；Yusuf Roohani 从 GEARS 到 STATE 到虚拟细胞挑战赛；以及垫在所有单细胞 OT 底下的 Chizat 最优传输数学）；（3）日历和梯子打架的地方——数学和数据比靠它们吃饭的模型早了将近十年，一个「扩展」竟然比它的「原作」更早正式发表，还有那个十四个月里造出半个前沿的 2025–26 爆发期。"
---

> *这是[五个问题那一版](fifty-concepts-five-questions-v4.md)和它[全引用、翻倍的那一版](one-hundred-concepts-five-questions-v5.md)的补充篇。那几篇在爬一架梯子——概念是按「这个问题有多难问」来排的，不是按工作落地的时间。这一页是正交的另一种看法：梯子背后的**日历**。还是那些工作，按日期重排，标上谁造的，以及把它们连起来的那些线。把它和 v5 并排着读，就能看见行文的顺序和真实的时间在哪儿岔开了。*

五个问题那几篇是故意**不按时间**写的。它们按梯级给这个领域排序——描述、关联、清算、干预、预测、反事实——因为论点说的是问题的高度，不是论文的日期。对一篇有立场的文章，这是对的主梁。但要检验这个故事**对不对得上日历**，它就是错的主梁。所以，这里是日历。

要盯着看三样东西，这也正是这篇补充篇存在的理由。第一，**双日期**：几乎每一项工作都有一个预印本日期和一个晚得多的正式发表日期，两者常常隔着一年多——所以「X 是什么时候发生的」有两个答案，行文可以悄悄挑那个顺手的。第二，**谱系**：同一小撮实验室和同几个人在每一个梯级上反复出现，把这些线看清楚，比把每个方法都当成孤立的点子要诚实。第三，**那些矛盾**：梯子的顺序暗示了一个时间线，而日期恰恰相反的地方。

关于日期的口径说明。**首次公开**是这项工作最早能被读到的时刻——一篇 bioRxiv/arXiv 预印本，或一次会议投稿，或（少数几个）在没有预印本时直接见刊的那一刻。**正式发表**是同行评审的出口（期刊或会议论文集）。预印本若有明显的版本更迭，就在格内标出。虚拟细胞挑战赛因为是比赛，带的是启动和截止两个日期。「预印本」出现在「正式发表」列里，意思是截至 2026 年 5 月仍未正式见刊。

## 主时间线（从老到新）

| # | 工作 | 类型 | 首次公开 | 正式发表 | 一作 → 末位/通讯 | 机构 · 谱系 |
|---|------|------|----------|----------|------------------|-------------|
| 75 | Monocle | 动力学 | 2014-03 *（直接见刊）* | Nat Biotechnol 2014-05 | Trapnell → Rinn | UW/Broad · Trapnell |
| 98 | MAGeCK | 筛选/选择 | 2014-12 *（直接见刊）* | Genome Biol 2014-12 | W. Li → X.S. Liu | Dana-Farber · Liu |
| 92 | Wasserstein–Fisher–Rao | OT数学 | 2015-06 arXiv | Found Comput Math 2018 | Chizat → Vialard | Paris-Dauphine · Chizat-OT |
| 91 | 非平衡 OT | OT数学 | 2015-08 arXiv | J Funct Anal 2018 | Chizat → Vialard | Paris-Dauphine · Chizat-OT |
| — | Waddington-OT | 细胞OT | 2017-09 bioRxiv | Cell 2019-02 | Schiebinger → Lander & Regev | Broad · Regev |
| 72 | RNA velocity（La Manno） | 动力学 | 2018-08 *（期刊）* | Nature 2018-08 | La Manno → Linnarsson & Kharchenko | Karolinska/Harvard |
| 15 | scVI | 基础模型（VAE） | 2018-11 *（期刊）* | Nat Methods 2018-11 | Lopez → Yosef | UC Berkeley · Lopez/Yosef |
| 55 | MELD | 差异丰度 | 2019-01 bioRxiv | Nat Biotechnol 2021-02 | Burkhardt → Krishnaswamy | Yale · Krishnaswamy |
| 74 | dynamo | 动力学 | 2019-07 bioRxiv | Cell 2022-02 | Qiu → Weissman & Xing | MIT/Pitt · Weissman |
| 73 | scVelo | 动力学 | 2019-10 bioRxiv | Nat Biotechnol 2020-08 | Bergen → Theis | Helmholtz · Theis |
| 43 | sci-Plex | 数据集 | 2019-11 bioRxiv | Science 2020-01 | Srivatsan → Trapnell & Shendure | UW · Trapnell |
| 44 | MIX-Seq | 数据集 | 2019-12 bioRxiv | Nat Commun 2020-08 | McFarland → Regev | Broad · Regev |
| 62 | DDPM（diffusion） | 视觉/ML | 2020-06 arXiv | NeurIPS 2020 | Ho → Abbeel | UC Berkeley · 视觉源头 |
| 87 | Mixscape | 因果 | 2020-06 bioRxiv | Nat Genet 2021-03 | Papalexi → Satija | NYGC · Satija |
| 54 | Milo | 差异丰度 | 2020-11 bioRxiv | Nat Biotechnol 2021-09 | Dann → Marioni | EMBL-EBI · Marioni |
| 56 | scCODA | 差异丰度 | 2020-12 bioRxiv | Nat Commun 2021-11 | Büttner → Theis | Helmholtz · Theis |
| 81 | CPA | 因果/生成 | 2021-04 bioRxiv | Mol Syst Biol 2023-05 | Lotfollahi → Theis | Helmholtz/Sanger · Theis |
| 3 | CELLxGENE | 图谱/平台 | 2021 *（平台；Census 2023）* | Nucleic Acids Res 2024-11 | CZI Cell Science → Carr | CZI |
| 67 | classifier-free guidance | 视觉/ML | 2021-12 NeurIPS-W *（arXiv 2022-07）* | 研讨会 | Ho → Salimans | Google · 视觉源头 |
| 65 | latent diffusion | 视觉/ML | 2021-12 arXiv | CVPR 2022 | Rombach → Ommer | LMU Munich · 视觉源头 |
| 7 | scBERT | 基础模型 | 2021-12 bioRxiv | Nat Mach Intell 2022-09 | F. Yang → Yao | Tencent AI Lab |
| 42 | Perturb-seq（全基因组） | 数据集 | 2021-12 bioRxiv | Cell 2022-06 | Replogle → Weissman | MIT/UCSF · Weissman |
| 89 | CellOT | 细胞OT | 2021-12 bioRxiv | Nat Methods 2023-11 | Bunne → Rätsch | ETH Zurich · Bunne-OT |
| 82 | chemCPA | 因果/生成 | 2022-04 arXiv | NeurIPS 2022 | Hetzel → Theis | Helmholtz · Theis |
| 85 | DCD-FG | 因果发现 | 2022-06 arXiv | NeurIPS 2022 | Lopez → Regev | Genentech · Lopez/Regev |
| 83 | GEARS | 生成 | 2022-07 bioRxiv | Nat Biotechnol 2023-08 | Roohani → Leskovec | Stanford · Leskovec/Roohani |
| 84 | PerturbNet | 生成 | 2022-07 bioRxiv | Mol Syst Biol 2025-07 | H. Yu → Welch | U-Michigan · Welch |
| 86 | CINEMA-OT | 因果 | 2022-07 bioRxiv | Nat Methods 2023-11 | Dong → van Dijk | Yale · van Dijk |
| 93 | NUBOT | 细胞OT | 2022-09 arXiv | AISTATS 2023 | Lübeck → Alvarez-Melis | ETH/MSR · Bunne-OT |
| 63 | flow matching | 视觉/ML | 2022-10 arXiv | ICLR 2023 | Lipman → Lipman | Meta/Weizmann · 视觉源头 |
| 64 | DiT | 视觉/ML | 2022-12 arXiv | ICCV 2023 | Peebles → Xie | Berkeley/NYU · 视觉源头 |
| 8 | Geneformer | 基础模型 | 2023-05 *（无预印本）* | Nature 2023-05 | Theodoris → Ellinor | Broad/Gladstone |
| 9 | scGPT | 基础模型 | 2023-05 bioRxiv | Nat Methods 2024-02 | Cui → B. Wang | Toronto/Vector |
| 10 | scFoundation | 基础模型 | 2023-05 bioRxiv | Nat Methods 2024-06 | Hao → X. Zhang & Le Song | Tsinghua/BioMap |
| 90 | moscot | 细胞OT | 2023-05 bioRxiv | Nature 2025-02 | Klein → Theis | Helmholtz · Theis |
| 36 | Kernfeld 等 | 基准 | 2023-07 bioRxiv | Genome Biol 2025-11 | Kernfeld → Cahan | Johns Hopkins · Cahan |
| 12 | CellPLM | 基础模型 | 2023-10 bioRxiv | ICLR 2024 | Wen → Tang | MSU · Tang |
| 11 | UCE | 基础模型 | 2023-11 bioRxiv | 预印本 | Rosen → Leskovec & Quake | Stanford/Biohub · Leskovec/CZI |
| 94 | TIGON | 细胞OT | 2023-11 *（期刊）* | Nat Mach Intell 2024-01 | Sha → Nie | UC Irvine · Nie |
| 71 | scDiffEq | 生成器 | 2023-12 bioRxiv | 预印本 | Vinyard → Pinello | MGH/Broad · Pinello |
| 99 | IterPert | 主动设计 | 2023-12 bioRxiv | RECOMB 2024 | K. Huang → Regev | Genentech · Regev/Lopez |
| 69 | scDiffusion | 生成器 | 2024-01 arXiv | Bioinformatics 2024-09 | Luo → X. Zhang | Tsinghua · Zhang |
| 13 | Nicheformer | 基础模型（空间） | 2024-04 bioRxiv | 预印本 | Schaar → Theis | Helmholtz · Theis |
| 68 | CFGen | 生成器 | 2024-07 arXiv | ICLR 2025 | Palma → Theis | Helmholtz · Theis |
| 53 | Pertpy | 流水线 | 2024-08 bioRxiv | Nat Methods 2026 | Heumos → Theis | Helmholtz · Theis |
| 37 | PerturBench | 基准 | 2024-08 arXiv | NeurIPS 2025 | Y. Wu → Graepel | Altos Labs |
| 35 | Ahlmann-Eltze, Huber & Anders | 基线论文 | 2024-09 bioRxiv | Nat Methods 2025-08 | Ahlmann-Eltze → Anders & Huber | EMBL · Huber/Anders |
| 38/39 | PertEval-scFM | 基准 | 2024-10 bioRxiv | ICML 2025 | Wenteler → Córdova | QMUL |
| 29 | InterPLM | 可解释性 | 2024-11 bioRxiv | Nat Methods 2025-09 | Simon → Zou | Stanford · Zou |
| 76 | RegVelo | 动力学 | 2024-12 bioRxiv | 预印本 | W. Wang → Theis | Helmholtz · Theis |
| 45 | Tahoe-100M | 数据集 | 2025-02 bioRxiv（v1 → v3 2025-05） | 预印本 | J. Zhang → Alidoust/Goodarzi | Vevo + Arc |
| 48† | C2S-Scale（27B） | 基础模型 | 2025-04 bioRxiv | 预印本 | Rizvi → van Dijk | Yale × Google · van Dijk |
| 70 | CellFlow | 生成器 | 2025-04 bioRxiv | 预印本 | Klein → Theis | Helmholtz · Theis |
| 14 | TranscriptFormer | 基础模型 | 2025-04 bioRxiv | 预印本 | Pearce → Karaletsos & Quake | CZI |
| 45† | X-Atlas/Orion | 数据集 | 2025-06 bioRxiv | 预印本 | Xaira team | Xaira + Foresite |
| 46 | STATE | 基础模型 | 2025-06 bioRxiv | 预印本 | Adduri → Goodarzi *（Roohani 通讯）* | Arc · Arc/Roohani |
| 59 | 虚拟细胞挑战赛 | 挑战赛 | 启动 2025-06 → 截止 ~2025-11 | Cell 2025-06 *（展望文章）* | Roohani → Arc team | Arc · Arc/Roohani |
| 25 | 单细胞 SAE（Pedrocchi） | 可解释性 | 2025-10 bioRxiv | ICLR 2026 | Pedrocchi → Boeva | ETH Zurich · Boeva |
| 48 | Tahoe-x1（3B） | 基础模型 | 2025-10 bioRxiv | 预印本 | Gandhi → Alidoust/Goodarzi | Vevo |
| 57 | GenBio 反驳 | 反驳 | 2026-02 bioRxiv | 预印本 | Cole → Xing | GenBio AI |
| 20 | xVERSE | 基础模型 | 2026-04 bioRxiv | 预印本 | X. Jiang → J. Xie | Duke · Xie |

*`#` 是 [v5](one-hundred-concepts-five-questions-v5.md) 里的概念编号；这一列故意是乱序的，因为整张表是按日期排的。`†` 标的是 v5 里以括注出现、没单独编号的工作（C2S-Scale 与 X-Atlas/Orion 分别挨着概念 48 和 45）。「一作 → 末位/通讯」即首位作者 → 末位/通讯作者。几点说明：Geneformer 直接见刊于 Nature，没有公开预印本；CELLxGENE 是机构平台（Explorer 约 2021、Census 2023、论文 2024），没有单一作者；X-Atlas/Orion 的摘要只用首字母列作者；挑战赛的确切截止日期是约数（测试集 2025 年 10 月底放出，约在截止前一周；获奖在 NeurIPS 公布，总结页日期为 2025-12-06）。*

## 谱系线索——把这些工作连起来的那些线

这个领域比它的引用数要小。一小撮实验室、几个反复出现的人，扛起了这架梯子的大半；把线索看清楚，比把每个方法都当成独立点子要诚实得多。

| 谱系（枢纽） | 它扛着的概念 | 这条线占着什么 |
|---|---|---|
| **Theis 实验室**（Helmholtz Munich / TUM；Lotfollahi → Sanger） | (56)(73)(76)(13)(81)(82)(68)(70)(90)(53) | 方法与流水线的主梁——从「关联」到「反事实」**每一个**梯级上都在。这是整个领域里最大的一条谱系。 |
| **Arc Institute** | (45)(46)(48)(59) | 2025–26 那波扰动规模化的推进：数据图谱、模型、3B 放大、挑战赛。 |
| **Aviv Regev**（Broad → Genentech） | Waddington-OT、(44)(85)(99) | 在 Broad 是细胞 OT 的源头加一个扰动图谱 → 在 Genentech 是因果发现和主动设计。 |
| **Romain Lopez**（Yosef 实验室 → Genentech） | (15)(85)(99) | 横跨七年的同一个作者：scVI → DCD-FG → IterPert。从表示到因果再到设计的那条贯穿线。 |
| **Yusuf Roohani**（Stanford/Leskovec → Arc） | (83)(46)(59) | GEARS → STATE（通讯）→ 虚拟细胞挑战赛（一作）。学界时代和 Arc 时代之间那个人。 |
| **Bunne + Chizat-OT**（ETH Zurich；巴黎） | (91)(92) → (89)(93)、Waddington-OT、(94) | 非平衡 OT 的*数学*（Chizat 2015）和它的单细胞化身（CellOT、NUBOT、TIGON、WOT）。 |
| **van Dijk 实验室**（Yale） | (86)(48†) | 反事实 OT（CINEMA-OT）和那个 27B 的类 LLM 细胞模型（C2S-Scale）——同一个末位作者，第五级的两个极端。 |
| **Weissman 实验室** | (42)(74) | Perturb-seq 数据和 dynamo 动力学。 |
| **Trapnell 实验室**（UW） | (43)(75) | sci-Plex 化学图谱和 Monocle 拟时——最老的工具，至今仍是承重墙。 |
| **CZI / Quake** | (3)(11)(14) | 图谱底料和跨物种基础模型（UCE 共同末位、TranscriptFormer）。 |
| **视觉/ML 源头**（非生物） | (62)(63)(64)(65)(67) | 第四级全部的生成机器，整套从计算机视觉搬过来。 |
| **2025–26 的公司们** | (45)(48) Vevo、(45†) Xaira、(57) GenBio、(37) Altos | 如今定义规模前沿的那批工业入场者。 |

## 日历和梯子打架的地方

这才是回报——按梯级读时，悄悄歪曲了时间线的那些地方。

1. **数学和最老的工具坐在梯子的*顶上*，却在日历的*底下*。** Chizat 的 Wasserstein–Fisher–Rao 和非平衡 OT（2015）、Monocle（2014）、MAGeCK（2014）是这里最老的四项工作——可它们出现在概念 (91)(92)(75)(98)，靠近全文的*末尾*。第五级的机器是这个领域里最成熟的，不是最新的。

2. **细胞最优传输比那些它「之后」才出现的基础模型还早。** Waddington-OT 的预印本是 **2017**——比第一级里*任何*一个基础模型都老（最早的 scBERT 也要到 2021 年底）。细胞 OT 这个点子，比那波被叙述成它前身的表示浪潮早了四年。

3. **scVI（2018）、RNA velocity（2018）、MELD（2019）几乎比整个第一、二级都早。** 变分自编码器这块底料，以及最早的扰动效应工具，早在那些被率先引入的 transformer 基础模型之前好几年就已就位。

4. **一个「扩展」竟比它的「原作」更早正式发表。** chemCPA 进同行评审出口（**NeurIPS，2022 年 12 月**）大约比 CPA 的期刊版（**Mol Syst Biol，2023 年 5 月**）早了五个月——尽管 chemCPA 是*扩展*自 CPA 的。谱系之所以没乱，只是因为 CPA 自 **2021 年 4 月**起就以预印本存在；是期刊流程把发表顺序倒了过来。

5. **第四级全部的机器，都比每一个用它的单细胞生成器要老。** DDPM（2020）→ classifier-free guidance（2021）→ latent diffusion（2021）→ flow matching（2022）→ DiT（2022），全都早于 scDiffEq（2023）、scDiffusion（2024）、CFGen（2024）和 CellFlow（2025）。第四级是一次移植，而供体比受体早了好几年。

6. **「印证」在预印本的时间轴上是反着的。** 很自然会把线性基线那场清算（Ahlmann-Eltze, Huber & Anders）当成第一声、把 Kernfeld 等人当成事后的确认——但 Kernfeld 的**预印本（2023-07）**比清算的**预印本（2024-09）**早了一年多。Ahlmann-Eltze 是先在期刊*发表*的（2025-08，对 Kernfeld 的 2025-11）；但作为预印本，是 Kernfeld 更早指出了这道落差。两边都没错——但谁要是把其中一篇说成另一篇的「印证」，就把顺序弄反了。*（v5 现已更新，标明 Kernfeld 的预印本更早。）*

7. **数据早在判它的那张判决书之前好几年就备好了。** sci-Plex（2019）、MIX-Seq（2019）、Perturb-seq（2021 预印本）全都早于 2024–25 那场针对用这些数据训出来的模型的清算。是模型落在了底料后面，而不是反过来。

8. **半个前沿是在十四个月里落地的。** Tahoe-100M（2025-02）→ C2S-Scale / CellFlow / TranscriptFormer（2025-04）→ X-Atlas / STATE / 虚拟细胞挑战赛（2025-06）→ Pedrocchi SAE / Tahoe-x1（2025-10）→ GenBio 反驳（2026-02）→ xVERSE（2026-04）。文章里被讲成一段序列的「干预及以上」那段故事，落到日历上，几乎就是一次爆发。

## 怎么把这一篇对着 v5 读

这里没有任何东西能掀翻那架[梯子](one-hundred-concepts-five-questions-v5.md)——那篇文章从没声称按时间，而且按问题高度来排，仍是它论点更好的框架。它原先有几处措辞，暗示了一个日历并不支持的时间顺序，现在 v5 已经对齐了：开头已经标明这些梯级是*概念*的顺序、不是*日期*的顺序，清算那一处也注明了 Kernfeld 的预印本更早。还有两件被这套顺序悄悄藏起来的事实，读的时候值得记着：OT/因果那条谱系（第五级）大体上比那些基础模型（第一级）*更老*；扩散那套机器（第四级）是从计算机视觉搬来的，早于每一个单细胞用法。时间线揭出的更深的那个规律，是谱系上的：这个领域的方法主梁大体是一家实验室（Theis），它的规模前沿是一家机构和它的衍生公司（Arc / Vevo），而它最锋利的数学是一个十年前的、非生物学的点子（Chizat 的非平衡 OT），就摆在那儿等人来捡——而这，并非偶然，恰恰是[那个赌注](fifty-concepts-one-bet-v2.md)所说的下一级所在之处。
