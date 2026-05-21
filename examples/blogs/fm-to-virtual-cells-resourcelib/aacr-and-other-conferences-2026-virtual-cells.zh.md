---
title: "AACR 之外——其余 2026 年会议为虚拟细胞故事添了什么"
summary: "2026 年的虚拟细胞并非仅由 AACR 一家交付。JPM 给出了资金信号，AGBT 奠定了底料，ICLR 确立了方法，ISBI/ASCO 锚定了临床。一份关于七场最重要会议的综述。"
---

> *与 [AACR 2026 综述](aacr-2026-digest.md) 及 [人物与机构博客](people-and-institutes.md) 配套。AACR 综述讲的是 AACR 做了什么。本页讲的是其余各处：JPM、AGBT、ICLR、ISBI、scverse、single-cell-genomics，以及 AACR 之后的 ASCO 集群，添上了 AACR 没有的东西。*

## 对虚拟细胞至关重要的七场 2026 年会议

每场会议扮演的结构性角色都不同。读懂 2026 年最干净的方式，是并行追踪全部七场，而不是把任何一场当作权威。

| # | 会议 | 日期 | 它确立了什么 | 关键头条 |
|---|---|---|---|---|
| 1 | **JPM 2026** | 1 月 12–15 日，SF | 资金信号 | Lilly + NVIDIA 10 亿美元；AstraZeneca 收购 Modella AI |
| 2 | **AGBT 2026** | 2 月 22–25 日，Marco Island | 数据底料 | 10x Atera, Roche Axelios, Element Vitari, Ultima UG200 |
| 3 | **ICLR 2026** | 4 月 23–27 日，Rio | 方法 | LMRL + MLGenX + Gen² + GEM workshop；AlphaGenome、Evo 2、Generative VC 论文 |
| 4 | **ISBI 2026** | 4 月 8–11 日，Athens | 影像底料 | 病理 + 空间 FM 基准 |
| 5 | **scverse 2025** | 8 月 25–28 日，Heidelberg | 生态系统 | Pertpy, scvi-tools v2, AnnData v0.11 |
| 6 | **Single Cell Genomics 2026** | 5 月 10–15 日 GRC + 6 月 10–12 日 Wellcome | 社区 | CZI VCC 首批结果初窥；CELLxGENE v3 |
| 7 | **ASCO GI / GU 2026** | 1 月 8–10 日 / 2 月 26–28 日 | 临床信号 | 试验读出中首批 FM 衍生的生物标志物 |

模式是：AACR 是 2026 年虚拟细胞的**舞台**，但**底料**（AGBT）、**方法**（ICLR）、**资金**（JPM）和**临床证据点**（ASCO）全都流经其他场所。把 AACR 当作故事的全部，就会错过为它供料的上游管线，以及评判它的下游漏斗。

---

## 1. JPM 2026——虚拟细胞成了一道药企资本配置的问题

JPM 2026 上对虚拟细胞最具后果的单一公告，是 **[Lilly + NVIDIA 10 亿美元 AI 协同创新实验室](https://investor.lilly.com/news-releases/news-release-details/nvidia-and-lilly-announce-co-innovation-ai-lab-reinvent-drug)**（第 1 天，1 月 12 日周一）——它被明确定位为 JPM 上有史以来宣布的规模最大的药企–AI 基础设施承诺，以 **NVIDIA BioNeMo + Vera Rubin 算力** 为底料。信号的重点不在头条上的美元数字，而在于 *钱花到哪里*：在一家前三大药企内部为自研 FM 开发配置专用 GPU 容量，而不再继续依赖学界发布或模型即服务的供应商。

<aside class="qa" data-q="1"><b>关于"NVIDIA BioNeMo"的提问：</b> 我们需要了解更多。</aside>

<aside class="qa-reply" data-q="1"><b>答：</b> BioNeMo 是 NVIDIA 的生物分子 FM 技术栈：开源的 BioNeMo Framework（在 NVIDIA GPU 上训练 + 微调）外加用于部署的 BioNeMo NIM 微服务。开箱即用，它打包了一批覆盖虚拟细胞相邻面的预训练模型——ESM 家族蛋白、MolMIM / DiffDock 风格的小分子、单细胞（Geneformer 移植版）以及基因组编码器。对 Lilly 的意义在于：搭配 Vera Rubin 算力，它给一支药企内部团队提供了一条交钥匙路径，可在专有数据上重训或蒸馏这些模型，而不必苦等 Arc / EvolutionaryScale / 学界发布，也不必按调用次数向模型即服务的供应商付费。</aside>

次具后果的，是 **AstraZeneca 对 Modella AI 的收购**（第 2 天，1 月 13 日周二）——业内媒体将其描述为大型药企首次收购一家以肿瘤学多模态基础模型为目标的 AI 公司。第 2 天的定调是：AI 不再是药企去 *合作* 的东西；它成了药企 *拥有* 的东西。

这对虚拟细胞计划意味着三个结构性变化：

- **"FM 出品机构"层级如今正与药企内部团队竞争。** Arc、CZ Biohub、EvolutionaryScale、BioMap——它们每一家如今都得论证：为什么自己的开放权重发布会比 Lilly 在 BioNeMo + Vera Rubin 技术栈上内部所能造出来的更好。
- **病理垂直领域正在整合。** Modella → AstraZeneca，再加上 2025 年早些时候的 [PathChat-DX FDA 突破性器械](https://paige.ai/) 认定，意味着独立的病理 FM 初创公司如今面对一个明确的并购参考价。
- **合规与 ROI 才是当下鲜活的话题。** Alex Hogan 的 STATus Report，以及 Hogan Lovells 关于 AI 合规 + BIOSECURE 的论述，全都汇聚到同一种定调：AI 是"入场底牌"，话题已从 *你会不会做 AI* 转向 *给我们看 ROI 和合规故事*。

值得一提的反向信号是：**Regeneron 的 George Yancopoulos** 在第 4 天公开质疑当前 AI 在医学中的应用——这是会上最显赫的科学声音对 AI 极端主义的反击。把 Yancopoulos 的审慎与 Ahlmann-Eltze 的批评路线并置：这个领域两位最善于表达的怀疑者，如今分别身处美国最大的生物技术公司和 DeepMind 的商业分拆机构。这场清算既有论文背书，也有机构背书。

具体到虚拟细胞议程：JPM 2026 *并没有* 交付任何一笔贴着虚拟细胞标签的交易。没有 Cellarity 收购，没有 Recursion 巨额交易，没有 Insitro IPO。其含义是，这个领域尚未进入交易阶段——它仍处于 *基础设施* 与 *人才收购* 的阶段。JPM 2027 才是值得关注首笔以虚拟细胞为锚的并购或许可事件的那个周期。

---

## 2. AGBT 2026——其余一切赖以运行的底料刷新

AGBT（Marco Island，2 月 22–25 日）是测序平台与空间基因组学的展示场，而 2026 年是个异常密集的发布大年。在 AGBT 下游出货的平台直接决定了虚拟细胞社区能拿到什么数据来建模。

对虚拟细胞最重要的 2026 年发布：

- **10x Genomics Atera**——单一平台上的 18k 基因全转录组扩增 + 可叠加的 1k 基因 panel；仪器 49.5 万美元，试剂约 2,200 美元/样本。AGBT 上做了路线图预览；*2026 年 4 月 AACR 正式发布*。这是 10x 首个把 Visium-HD 式的 WTA 广度与 Xenium 式的靶向 panel 分辨率合并进单一工作流的平台——它直接支撑了 Bunne / Yeung-Levy 在 AACR ED03 演讲中论证该领域所需的那种多模态 H&E + 空间转录组数据。
- **Roche Axelios 1**——150 美元的 30× 人类基因组（duplex），仪器 75 万美元，2026 年夏季正式发布。Element 与 Complete Genomics 一直在推的每基因组成本下限，终于触及了让扰动实验的图谱级重测序成为常规操作的水平。
- **Element Biosciences VITARI**——100 美元基因组，每次运行 100 亿读段，3 TB 产出，标价 68.9 万美元。这是让单一实验室建图谱在经济上变得可行的价位点。
- **Ultima Genomics UG200 / UG200 Ultra**——Q60 ppmSeq duplex；Ultra 上每周 162 Tb，125 万美元。这是超大规模式图谱运作所需的吞吐层级。
- **Singular G4X Spatial Sequencer**——500-plex RNA + 18-plex 蛋白 + H&E 等价物，每样本约数百美元。这个平台以学界社区真正负担得起的价位点，把 Bunne 的"空间蛋白质组学作为 FM 底料"论点付诸实施。
- **Bruker CellScape（空间蛋白质组学）+ PaintScape（3D）+ CosMx mouse WT**——在空间蛋白质组学层级上的直接竞争回应；CosMx 小鼠全转录组 + 64 种蛋白，是首台让小鼠扰动社区能规模化构建空间多模态数据集的仪器。
- **Stellaromics Pyxa**——首台 3D 空间成像仪；AGBT 首秀。下一代虚拟细胞底料将需要建模的那个新维度。

这对虚拟细胞意味着：**底料不再是瓶颈**。这个领域在 2024 年告诉自己所需要的数据（细胞图谱级的多模态空间数据、配对的影像 + 转录组、扰动级重测序），正于 2026 年在商业平台上、以学界实验室负担得起的价位点出货。瓶颈从"我们有没有数据"转移到"我们有没有真正能利用它的模型"——这正是 AACR ED03 全体大会所确立的定调。

---

## 3. ICLR 2026——方法真正所在之处

ICLR（Rio，4 月 23–27 日）是 AACR 海报厅下游所对应的方法场所。ICLR 2026 的生物足迹比 ICML 2026 更密集——四个明确的生物 workshop，外加第五个含大量生物子集的科学 FM workshop：

- **LMRL**（Learning Meaningful Representations of Life）——面向基因组学、单细胞、空间的基础模型；虚拟细胞作为头条定调。在 ICLR 与 NeurIPS 反复举办。
- **MLGenX**（第 3 届）——"From Reasoning to Experimentation: Closing the Loop Between AI Agents and the Biological Lab"——靶点鉴定、扰动推理、BRChallenge 智能体基准。
- **Gen² / Gen2**——蛋白质科学中的定向进化；细胞与组织状态的工程化。首届。
- **GEM**——蛋白、配体、核酸、细胞；连接计算生物学与实验生物学。
- **FM4Science**——面向气候、材料、生物学的问题驱动型 FM；生物子集在范围内。

ICLR 2026 中三个承重的虚拟细胞结果：

### AlphaGenome（Nature 2026，在 ICLR + LMRL 上展示）

Isomorphic / DeepMind 的基因组 FM，在标准基准套件上取得 **25/26 项变异效应胜出**。LMRL 会场上的头条定调是：AlphaGenome 在轨迹预测上的胜出，实际上终结了 Evo 2 重新挑起的"上下文学习对基因组 FM 是否仍可行"之争——至少在下一个 Evo 发布之前如此。与 Calico 的 Borzoi 工作并看，可得 2026 年基因组 FM 的全貌。

### Evo 2（Arc Institute，ICLR + 多个 workshop）

Arc Institute 的 70 亿以上参数的基因组 FM，训练算力约为 6×10²³ FLOPs，开放权重。它是最可信的非 DeepMind 基因组 FM，也是后 AlphaGenome 文献将要拿来对比的对象。ICLR 会场上有趣的争论是：如果 Isomorphic 以每次查询显著更低的成本推出 AlphaGenome 即服务，开放权重的姿态是否还能存续。

### Generative Virtual Cells（Lewis & Zueco，Gen² workshop）

一篇立场加概念验证的论文，提出一个 **协同进化框架**：虚拟细胞世界模型与扰动规划器在内外两个时间尺度上联合适配，并以验证门控的架构搜索为基础。相对 Arc 的 STATE（生产规模上最接近的对照）的区分点在于 *验证门控下的联合适配*，而非在冻结的 Tahoe-100M 快照上离线训练。

Lewis & Zueco 的定调——"世界模型 + 规划器，在验证门控下联合适配"——正是 AACR-2027 虚拟细胞库应当预期在 6–12 个月内开始从 Cradle、Recursion、Insitro 涌现出来的架构模式。这是关于下一代虚拟细胞系统去向的、当前最明确的一张地图。

外加一长串横跨 MLGenX、GEM、LMRL 的生物 FM workshop 论文——具体到面向空间 / 单细胞 / 病理子集的 **多模态基础模型**，NeurIPS 2025 LMRL 更丰富；ICLR 2026 则在 **智能体回路与生成式虚拟细胞** 这条轴上更强。

---

## 4. ISBI 2026——病理 FM 的影像底料

ISBI（Athens，4 月 8–11 日）是锚定病理 FM 子领域的影像方法场所。ISBI 2026 贡献了：

- 关于 **Virchow2 / Virchow2G**（现已达 18.5 亿参数；当前病理 FM 的上限）以及作为开放权重基准竞争者的 **UNI2-h** 的工具线论文。
- 在罕见病与儿科病理数据集上对病理 FM 的直接评估——这是大队列学界 FM 系统性表现欠佳的那一片领域。
- 一年一度的 MICCAI 相邻基准刷新——2026 年余下时间里每一篇病理 FM 论文都要据以评估的对象。

具体就病理 FM 而言，ISBI 是仅次于 Mahmood 实验室自身 Nature 出版物的第二重要会议。对虚拟细胞议程而言，ISBI 之所以重要，是因为 **Bunne 正在推动的多模态 H&E + 空间蛋白质组学方向** 取决于病理 FM 技术栈是否足够成熟、能充当骨干——而 ISBI 正是评判这种成熟度的场所。

---

## 5. scverse 2025——生态系统层

scverse（Heidelberg，2025 年 8 月下旬；**正是 2025 年这一届锚定了 2026 年的底料故事**）是 Scanpy / AnnData / squidpy / scvi-tools 生态系统的社区会议。2025 年这批发布——包括从有用的库跃升为 Nature-Methods 发表标准的 **pertpy**、**scvi-tools v2**、以及 **AnnData v0.11**——成了 2026 年每一篇单细胞 FM 论文借以评估的底料。

scverse 2025 对虚拟细胞而言有趣的叙事，是那条在多场主旨演讲中反复出现的明确定调：**下一阶段不是更大的 FM，而是把 FM 更好地集成进既有的 scverse 管线**。这是 Theis 2026 年 Cell Systems 论点的操作版本：不要用一个庞然一体的 sc-FM 去替换 scvi-tools，而要把 FM 当作管线其余部分可以使用的一个组件。

2026 年的 scverse 会议（8 月 25–28 日，地点待定）将是首波"FM 作为组件"集成工具落地之处。值得在日历上标记。

---

## 6. Single Cell Genomics 2026——首批 VCC 结果走入现实

单细胞社区在 2026 年有两场并行的"Single Cell Genomics"会议：**GRC**（5 月 10–15 日）与 **Wellcome / Sanger** 版（6 月 10–12 日）。两者都以相对封闭、重演讲的形式举办，没有海报的批量发表，这意味着本综述的底料是后续的业内媒体报道而非一手记录。

三件值得关注的事：

- **Virtual Cell Challenge（VCC）首批结果初窥**，来自 CZI 竞赛——超出最初 Cell 论文公告之外的排行榜条目。VCC 在启动时被定调为该领域首个带留出评估的基准；GRC 与 Wellcome 活动是首波竞争者交流情报之处。
- **CELLxGENE v3** 更新与 HCA 图谱发布——下一代 sc-FM 借以训练的底料刷新。
- **Bo Wang 的 X-Cell** 与 BioMap 的 **VCHarness** 正面对决——这两个领先的"围绕 sc-FM 的智能体封装"系统，都在 AACR 2026 上被预告过，但都还没有一篇完整的正面对决论文。SCG 会议是首次对比最可能出现的场所。

---

## 7. ASCO GI / GU 2026——临床信号漏斗

两场年初的 ASCO 子会议——**ASCO GI**（1 月 8–10 日）与 **ASCO GU**（2 月 26–28 日）——是 AI 衍生的生物标志物工作必须从"漂亮的多模态模型"走向"有区分度的试验读出"的场所。2026 年这两届都有明显增多的 *FM 衍生生物标志物* 海报足迹——并不抢头条，但与病理 FM 衍生的分层评分开始作为探索性终点出现在试验队列中的轨迹相符。

具体需要关注的模式：在那些用 **病理 FM**（UNI、Virchow2、CHIEF）对回顾性队列做分层、并把 AI 衍生评分与主要终点一同报告的试验。ASCO GI 2026 有 2-3 项这样的读出；ASCO GU 2026 有 4-5 项。ASCO 2026 主会（5 月 29 日–6 月 2 日）预计会有显著更多。

更宏观的信号是：AI 生物标志物正成为肿瘤学试验中的一项 *标准探索性分析*，而不仅是方法学故事。这种扩散从首批 PathChat / UNI 出版物算起花了约 4 年，这与 AlphaFold 衍生的靶点类别出现在临床管线披露中所花的扩散时间线相同。对细胞 FM 一侧也要为同样的扩散滞后做规划：首批细胞 FM 衍生的分层评分进入注册性试验，大约在 2030 年前后。

---

## 把这七场串起来的是什么——2026 年虚拟细胞的成熟度曲线

并行通读全部七场 2026 年场所，提示该领域正处于其成熟度曲线上的一个特定点：

- **底料已解决。** AGBT 2026 出货了平台；除空间蛋白质组学外（AGBT 也在平台层级上有所应对），数据可获得性瓶颈大体已过。
- **方法正在多样化。** ICLR 2026 主办了四个生物 workshop；后 AACR 清算的文献已从"把 sc-FM 做大"转向一组方法的组合——flow matching、智能体封装、协同进化回路、模块化组合、机制感知组件。
- **资金正在整合。** JPM 2026 标志着从合作到收购的转变；药企–AI 能力正在最大的公司内部化。
- **社区仍处于基准收敛之前。** scverse 与 SCG 2026 揭示，该领域有多个相互竞争的基准（VCC、SC-Arena、scPerturBench、Open Problems v2、PertEval-scFM），对哪个才是正典尚无共识。
- **临床读出尚早但已起步。** ASCO GI / GU 2026 有了首波探索性 FM 衍生生物标志物报告；ASCO 2026 主会与 ESMO 2026 将是更大队列的检验。
- **舞台与海报在评估上的落差是悬而未决的问题。** AACR 全体大会讲者把约 40% 的舞台时间花在评估上；AACR 海报厅几乎没出货任何与之相关的东西。SCG / scverse 上是同样的模式——操作型社区在出货能力；学界社区在出货批评；二者的整合是 2027 年的工作。

诚实的总结是：2026 年是 **虚拟细胞计划不再是单一研究社区**、转而成为一个 **多场所、多底料、多利益相关方的计划** 的一年——你已无法靠读一本期刊或参加一场会议来追踪它。故而有了这份 paper map。

---

## 接下来读什么（本语料内）

- **[AACR 2026 综述](aacr-2026-digest.md)**——同一故事中专属 AACR 的切面。
- **[值得关注的人物与机构](people-and-institutes.md)**——谁在这些场所出货的领域地图。
- **[基础模型全景现状](foundation-models-state-of-play.md)**——2026 年各场所要么基于、要么评估的那 27 份 FM 卷宗。
- **[为什么线性基线会赢](why-linear-baselines-win.md)**——清算正典的方法学背景。
- **[评估论文目录](evaluation-papers-catalog.md)**——为舞台-海报落差供料的 11+1 篇评估论文。
