---
title: "究竟是谁在构建虚拟细胞——2026 年值得关注的人与机构"
summary: "一张领域地图，标出那些 2025–2026 年产出为虚拟细胞设定议程的实验室、研究所与公司——按它们实际交付的东西来组织，而非按声望。"
---

> *与[基础模型全景现状](foundation-models-state-of-play.md)以及[评估论文目录](evaluation-papers-catalog.md)互为伴篇。同一语料，不同切法：这一篇讲的是"谁"，而非"什么"。如果你想知道该关注哪些 Twitter 账号、实验室主页和 substack，先读这一篇；如果你想要方法层面的综述，去读另外两篇。*

## 这份名单是怎么组织的

按各方所 *交付* 的东西分为三类——而不是按它们如何宣传自己。

1. **学术锚点** —— 那些用论文与基准来构筑该领域对话结构的实验室。读它们是为了知道下一个基准、批评或类别会是什么。
2. **交付 FM 的研究所** —— 主要产物不是学术发表、而是一个模型检查点、一个数据集或一场竞赛的非学术团体。读它们是为了知道下一个默认底料会是什么。
3. **产业玩家** —— 主要产物是商业产品、监管申报或战略动作的公司。读它们是为了知道 2027 年什么东西会守得住。

每个条目都以一句话开头，说明 *它在 2026 年 5 月为何承重* ——而不是简历式的总结。凡 resourcelib 中存在对应档案的条目，都会链接到该实体的专属档案。

---

## 学术锚点

### Charlotte Bunne —— EPFL → 洛桑 / 日内瓦大学医院合作

Bunne 是当前该领域关于 **虚拟患者** 作为操作性目标的最清晰声音——而不是抽象意义上的虚拟细胞。她[与一个大型多机构团队合作的 Cell 2024 视角文章](https://doi.org/10.1016/j.cell.2024.11.015)是被引最多的 AI 虚拟细胞北极星定义，而 AACR 2026 ED03 全会（在[AACR-2026 综述博客](aacr-2026-digest.md)中有报道）实际上就是她当前研究计划的现场呈现：多模态 H&E + 空间蛋白组学基础模型、在瑞士超算上的硅内扰动，再叠加上主动获取（"EchoK"）。当你想知道 *集成的* 虚拟细胞技术栈端到端应该长什么样时，去读她的团队。

### Aviv Regev 团队 —— Genentech（前 Broad）

Regev 一侧的框架是参考映射，而非从头模拟：构建足够稠密的图谱，使得任何新的查询细胞或扰动都能与之定位（[Rood, Regev 等 2024](https://doi.org/10.1016/j.cell.2024.07.035)）。Regev 在操作层面也很重要，因为她身处 Genentech、手握预算——她团队的押注塑造了制药行业实际上如何把图谱式思维落地，而这比公开预印本所呈现的姿态更受约束。把她与 Bunne 配对来看，就能见到 2024 年那两份其余领域至今仍在与之争论的经典论纲。

### Fabian Theis —— Helmholtz Munich + TUM

Theis 是最有意思的"帐篷里"声音，因为他 2026 年的 Cell Systems 视角文章（[Theis 等 2026](https://doi.org/10.1016/j.cels.2026.101534)）是一次明确的转向——从扩展单体式 sc-FM，转向 **模块化、机制感知的组件**。他曾是早期的 sc-FM 倡导者（scVI、scANVI、scArches 都出自或伴随他的生态系统），这使得他对清算文献的让步更有分量。如果你想知道欧洲 sc-FM 共识正往哪个方向移动，Theis 实验室主页是信噪比最高的订阅之一。

### Mahmood Lab —— Harvard / BWH / MGB

Faisal Mahmood 的团队是 **病理基础模型** 的重心所在：UNI、UNI2-h、CONCH、TITAN、PathChat、PathChat-DX（FDA 突破性器械，2025 年 1 月）。该实验室的鲜明特征是覆盖面之广——模型发布、临床基准论文、监管工作全部出自同一个团队，且以稳定的节奏产出 Nature 系列成果。专门盯着病理这一纵向，去关注他们；他们的工作是学术文献里最接近"完整的 FM-到-临床流水线"的东西。

### Bo Wang Lab —— Vector Institute / 多伦多大学

Wang 的团队以 scGPT 定义了 sc-FM 这一类别，此后一直是核心参照点。2026 年有意思的动作是 X-Cell——一个围绕 sc-FM 技术栈的智能体外壳——这是一个押注：下一次增益来自工具使用型智能体端到端地编排分析，而不是继续扩展 scGPT。盯着这个团队，看看"FM 之后接智能体"的模式在那些 2025 年清算中裸 sc-FM 表现不佳的任务上是否真的奏效。

### Constantin Ahlmann-Eltze + Wolfgang Huber —— 前 EMBL Heidelberg

这二人是 **该领域近期历史上影响最深远的单篇评估论文** 的作者——2025 年那项结果显示，简单的线性基线在扰动预测上追平或击败了 scGPT 和 Geneformer。Ahlmann-Eltze 此后转去了 **Isomorphic Labs**，这本身就是一个承重信号：该领域最尖锐的 sc-FM 批评者如今身处 DeepMind 的商业药物发现部门内部。关注他们接下来发表什么，因为那会告诉你后清算时代的文献将向哪些基准收敛。

### Serena Yeung-Levy —— Stanford 生物医学数据科学

Yeung-Levy 的团队目前是关于 **流匹配（flow matching）作为基元** 用于分布到分布扰动建模的最有意思的押注（CellFlux、CellFlux V2，达 1160 万张图像）。她也是生物学中 **基于 VLM 的科学推理基准** 的主要声音（MicroVQA、BioMedICA），而这是与 FM 训练瓶颈不同的另一个瓶颈，且是其余领域大多忽视的一个。两个截然不同的研究计划，皆承重。

### Michael Moor —— ETH Zurich

Moor 的实验室是学术版图里最清晰的 **医学智能体 AI** 声音，以 MYRIAD（600 万条目的结构化医学问答图谱）和逐步验证每一步推理的过程奖励模型为支柱。他的框架——医学智能体因两个截然不同的原因而失败，无结构的依据 *以及* 未经验证的推理——是当前流通中对智能体 AI 问题最明确的分解。当 LLM 智能体浪潮冲击诊断时，去关注他。

### Leskovec + Quake —— Stanford / SNAP

Jure Leskovec 与 Steve Quake 的联合产出是学术界产量最高的图与物理感知单细胞计划。它们对虚拟细胞议程的相关性在于结构先验这一侧：Bunne 和 Yeung-Levy 推动的是表征学习的规模，而这个团队把机制先验与图结构推入底料。Quake 的湿实验与仪器视角与 Leskovec 的图机器学习一侧相结合，给了他们一个独特的切入角度。

---

## 交付 FM 的研究所

### CZI / CZ Biohub / Virtual Biology Initiative

Chan Zuckerberg 这套基础设施——CZI 作为出资方、[CZ Biohub Network](https://www.czbiohub.org/) 作为干湿与计算的一臂、[CZI Virtual Cell Models](https://virtualcellmodels.cziscience.com/) 作为统领框架——是 **该领域最重要的单一非学术机构**，因为它控制着底料。CELLxGENE 是默认的细胞图谱数据层；Virtual Cell Challenge（[VCC 2025 启动](https://virtualcellchallenge.org/)，Cell 论文）是该领域第一个带留出评估的社区基准。Biohub 也交付自己的模型（TranscriptFormer、rBio），这意味着同一个机构同时运行基准、底料和一个内部参赛者——这种双重角色值得追踪。值得关注的关键人物：Priscilla Chan（CZI）、Theofanis Karaletsos、Steve Quake、Angela Pisco（Biohub）。

### Arc Institute

Arc 是生物 FM 领域里最大的非 DeepMind 的学术风格算力平台——大约 2,048 块 H100——并交付大学团体根本无法匹敌的开放权重模型：**STATE**（扰动）、**Evo / Evo 2**（基因组 FM，70 亿+ 参数，约 6×10²³ FLOPs），以及与 Tahoe Therapeutics 和 CZ Biohub 合作的 **Tahoe-100M** 数据集。Patrick Hsu 和 Hani Goodarzi 是要知道的名字。Arc 重塑了该领域，因为它是唯一一个在营利性 AI 实验室之外、以超大规模算力运作、同时又以超大规模厂商所不为的方式交付开放权重的可信团体。

### EvolutionaryScale

这是从 Meta 蛋白语言模型分拆出来的公司，交付 **ESM-3**（Science 2025，980 亿参数，披露约 10²⁴ FLOPs）。在算力上的透明度很罕见——DeepMind、Recursion 以及大多数病理厂商都不披露训练成本——这使得 ESM-3 成为校准点，其他蛋白 FM 的算力主张都可以据此做合理性核查。处在该领域开放对封闭分裂的开放权重一侧。

### Isomorphic Labs

DeepMind 的药物发现分拆公司，继承了 AlphaFold / AlphaProteo / AlphaMissense 以及全新的 **AlphaGenome**（Nature 2026，变异效应 25/26 项胜出）。封闭权重、托管 API 姿态——与 Arc 在结构上正相反。最近招募 Ahlmann-Eltze（见上文）这一动作表明，Isomorphic 意在以该领域最尖锐批评者的水准建立内部评估能力。

### Calico

Calico 的 Borzoi 是后 Enformer 文献中被引最多的基因组 FM 贡献，即便头条已经转向 AlphaGenome 和 Evo 2，该团队仍以稳定节奏持续交付。Calico 这个机构也很重要，因为它是少数明确以衰老/长寿为使命的实验室之一——这是虚拟细胞方法长周期的下游消费者，而非方法贡献者——出于这个理由值得追踪。

### CellxGene / Human Cell Atlas

两个相互重叠、值得合在一起关注的联盟：**Human Cell Atlas**（Sarah Teichmann、Aviv Regev、John Marioni 等）提供多组织参考数据；**CELLxGENE**（CZI）是把它落地的底料。HCA 产出经典图谱；CZI 负责工程实现。每一个 Tahoe-100M、每一个 SC-Arena、每一次 Virtual Cell Challenge 的运行，都依赖于流经其中之一或两者的数据。

### Microsoft Research + Providence（Prov-GigaPath）

微软-Providence 合作产出了 Prov-GigaPath（Nature，2024 年 7 月）——截至 2024 年中公开披露的最大病理 FM 训练集，其不寻常之处在于它是医院-医疗系统的直接合作，而非厂商/学术的组合。可作为一个模板，看超大规模厂商加付费方的协作如何交付临床 FM 工作。

### BioMap Research + MBZUAI

虚拟细胞领域最值得追踪的中国/阿联酋一轴玩家：**xVERSE** 是一个背后有相当算力的转录组原生 sc-FM，**VCHarness**（自主虚拟细胞构建器）是 2025-2026 年发表的较有雄心的智能体生物条目之一。BioMap 也是少数以此规模交付的非西方团体之一；想要一个非 CZI / 非 Arc 的视角，去关注它。

---

## 产业玩家

### Paige.AI + MSK（Thomas Fuchs）

Paige 于 2025 年 1 月获得了 **首个针对通用病理基础模型的 FDA 510(k) 许可**，技术骨干是 Virchow 模型家族。这次许可在任何学术 FM 团体之前就跨过了监管边界——连 Mahmood 的 PathChat-DX 至今仍处于突破性器械状态。盯着看这个 510(k) 先例将如何塑造对后续病理 FM 的处理（每个新模型都需要自己的一份许可吗？）。

### Owkin

Owkin 在 2026 年的鲜明动作是 **在 Anthropic Claude 内部交付一个以病理基础模型为后端的智能体** —— Owkin Pathology Explorer 集成。这是当前病理 AI 联邦数据一侧产品化为 LLM 工具层的最清晰例子，并赋予 Owkin 一个不同于 Paige 或 Mahmood 的分发界面。巴黎/纽约双总部；欧洲最资深的病理 AI 团队之一。

<aside class="qa" data-q="1"><b>关于"Owkin 在 2026 年的鲜明动作是在 Anthropic Claude 内部交付一个以病理基础模型为后端的智能体"的问题：</b> 多讲讲 Claude 内部的 Owkin Pathology Explorer 集成——它实际上做什么，谁能用？</aside>

<aside class="qa-reply" data-q="1"><b>答：</b> Pathology Explorer 是 Owkin "K Pro" 产品线中一个基于 MCP 的智能体，交付于 Anthropic 的 Claude for Healthcare and Life Sciences 内部（2026 年 1 月 12 日发布）。机制上：Owkin 构建了 MCP 编码，使 Claude 把病理问题路由给 Owkin 的智能体，后者返回对患者组织图像的空间感知分析——细胞/组织分型、肿瘤微环境研究、生物标志物提取、队列生存分析。底层模型在 Owkin 的 800 家医院 / 104 个中心的组织病理网络上训练；发布材料未点名某个特定的公开 FM（Phikon、OwkinZero），因此确切的模型接线未披露。这种分发把医院级病理 AI 放进了每一个 Claude HCLS 工作流中，而不是藏在 Owkin 自家的 SaaS 界面之后。</aside>

### Recursion Pharmaceuticals

按扰动成像数据集规模计，最大的 AI 原生生物科技公司。**BioHive-2** 集群 + NVIDIA 合作让 Recursion 跻身算力资源较好的产业玩家之列。其数据护城河在成像一侧，而非模型一侧。盯着看合并后的表型组学平台（Recursion + Exscientia 于 2024 年合并）开始交付集成读出。

### Insitro

Daphne Koller 的公司。是由一位资深 ML 学者运营、与虚拟细胞相邻的生物科技公司的最清晰例子，其模型交付节奏比 Recursion 更保守，但与制药合作管线的整合更深。要关注的是临床阶段候选物，而非头条式的模型发布。

### Cellarity

由 Flagship 孵化的公司，专门押注 **以细胞状态表征作为药物发现底料**。算力不及 Recursion，学术曝光度不及 Insitro，但其概念框架——对细胞状态建模、找到能把状态朝理想方向推动的化合物——是风险投资支持的生物科技中与虚拟细胞议程最契合的。

### Latent Labs

由 DeepMind 校友创立的英国生物科技公司，正在构建虚拟细胞 FM。处于早期；公开细节稀薄。值得关注，因为它是最早可识别的、把 DeepMind 蛋白 FM 打法拿到细胞尺度上应用的分拆公司之一，并带有 Arc（非营利）和 Isomorphic（聚焦药物）所不具备的创业商业化向量。

### Tahoe Therapeutics + Vevo

这两家与 Arc 相邻 / 由 Arc 资助的初创公司，交付的是 Arc-CZ Biohub 虚拟细胞联盟的湿实验一侧。Tahoe 是 Tahoe-100M 扰动数据集背后的运营方；Vevo 则是"我们拿这底料做什么"的第二步戏。关注 Arc 的 GitHub，看这两家配合着交付什么。

### Roche Tissue Diagnostics / NavigatorAI

在位的内部制药病理 AI 玩法，在此作为反例收入：Paige、Owkin 和 Mahmood 是由风投或资助支持的，而 Roche 拥有已部署的临床病理足迹和一套诊断业务模式。随着病理纵向的整合（Modella → AstraZeneca，PathChat-Dx → FDA 突破性认定），Roche 内部就是衡量一个完全集成、由制药公司拥有的病理 AI 能力长什么样的基准。

### NVIDIA BioNeMo

并非通常意义上交付模型的机构，而是越来越多的生物 FM 训练运行所经由的 **基础设施层** ——包括[JPM 2026 礼来–NVIDIA 10 亿美元 AI 共创实验室](aacr-and-other-conferences-2026-virtual-cells.md)。追踪 BioNeMo 的更新，就能知道 18 个月后默认训练栈会长什么样。

---

## 值得单独一提的生态与元组织

- **scverse**（Fabian Theis 等）—— Scanpy / AnnData / squidpy / scvi-tools。任何新 sc-FM 都得对照它来证明自己价值的经典工具底料。即便在 FM 浪潮之后，在评估论文里击败 sc-FM 的，仍是以 scverse 为根基的基线。
- **Mostly AI / Open Problems 社区**（Daniel Burkhardt、Smita Krishnaswamy 等）—— Open Problems for Single Cell 联盟与 SC-Arena 并肩运行着最受尊重的社区基准。"Open Problems v2"框架已成为评估论文里的默认引用。
- **Pertpy 维护者**（Lukas Heumos、Theis 团队）—— 这个扰动分析的 Python 框架已成为扰动预测评估工具的默认底料。Nature Methods 2025 的发表把它从"有用的库"提升为"标准参照"。
- **awesome-virtual-cell**（Liudeng Zhang，本语料的源作者）—— 社区维护的虚拟细胞论文/工具索引。作为一个追踪源很有用，尤其在 AACR / JPM / ICLR 周期前后。
- **Owl Posting + Eric Topol 的 substack** —— 关于制药 AI 商业化正在发生什么的有观点的追踪层，与实验室一侧的报道互补。读它是为了交易流以及 FDA / 监管的角度。

---

## 怎样实际使用这份名单

一名在职研究者应当挑选 **3-5 个关注目标**，而不是 25 个。按你在意的东西，建议如下组合：

- **你在意作为研究计划的虚拟细胞** → Bunne、Theis、Regev、Arc、CZ Biohub。
- **你在意 sc-FM 到底管不管用** → Ahlmann-Eltze（Isomorphic）、Open Problems 联盟、Bo Wang、Yeung-Levy、scverse。
- **你在意病理 FM 与临床部署** → Mahmood、Paige.AI、Owkin、Microsoft-Providence、Roche。
- **你在意与虚拟细胞相邻的蛋白 / 基因组 FM** → EvolutionaryScale、Isomorphic、Arc、Calico。
- **你在意应用于生物学的智能体 AI** → Moor（MYRIAD）、Bo Wang（X-Cell）、BioMap（VCHarness）、Owkin（Claude 集成）。
- **你在意制药 AI 的交易流而非方法** → Lilly + NVIDIA、AstraZeneca + Modella、Insitro、Recursion，外加 Owl Posting / Endpoints 作为追踪层。

贯穿这六种组合的模式：**学术锚点 + 交付 FM 的研究所 + 产业对应者**。这种三角定位——一个论文声音、一个交付模型的声音、一个产品/监管的声音——正是在虚拟细胞地图的任何子领域里能让你看到全貌的东西。
