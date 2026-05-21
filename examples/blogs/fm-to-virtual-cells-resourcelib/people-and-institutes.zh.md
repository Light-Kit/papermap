---
title: "虚拟细胞到底是谁在做：2026 年值得追的人与机构"
summary: "一张实战地图，盘点 2025–2026 年真正在给虚拟细胞定调的实验室、研究所和公司——分类的依据是各家实际拿得出手的东西，而不是名气。"
---

> *这篇可以和[基础模型全景](foundation-models-state-of-play.md)、[评测论文目录](evaluation-papers-catalog.md)对照着看。同一批语料，换个切法：这篇讲的是「谁」，不是「什么」。想知道该关注哪些 Twitter 账号、实验室主页和 substack，先读这篇；想要方法层面的梳理，去看另外两篇。*

## 这份名单是怎么排的

按各家「拿得出什么」来分，分三类——看的是真东西，不是宣传口径。

1. **学术锚点**——那些靠论文和基准给整个领域定话题的实验室。读他们，是为了知道下一个基准、下一篇批评、下一个新品类会从哪冒出来。
2. **出模型的研究所**——主要产出不是学术论文，而是模型 checkpoint、数据集或者一场竞赛的那些机构。读他们，是为了知道下一个默认底料会是什么。
3. **产业玩家**——主要产出是商业产品、监管文件或者一步战略动作的公司。读他们，是为了知道 2027 年什么东西能站得住脚。

每一条都先用一句话点明**它在 2026 年 5 月为什么是承重的**——不是简历摘要。凡是 resourcelib 里有专门档案的条目，都会给出链接。

---

## 学术锚点

### Charlotte Bunne —— EPFL → 洛桑 / 日内瓦大学医院合作体

谈到把**虚拟病人**当成可操作目标（而不是抽象意义上的虚拟细胞），Bunne 是当下最清晰的那个声音。她那篇[联合多家机构发表的 Cell 2024 视角文章](https://doi.org/10.1016/j.cell.2024.11.015)，是被引最多、最具北极星意义的「AI 虚拟细胞」定义；而 AACR 2026 ED03 全会报告（[AACR-2026 综述博客](aacr-2026-digest.md)里有覆盖）几乎就是她当下的研究纲领现场直播：多模态 H&E + 空间蛋白质组学的基础模型、在瑞士超算上做计算机模拟扰动、再叠一层主动采集（「EchoK」）。想知道一个**整合式**的虚拟细胞栈端到端该长什么样，就看她的组。

### Aviv Regev 的组 —— Genentech（原 Broad）

Regev 这一边的思路是参照映射，而不是从零模拟：把图谱建得足够密，密到任何一个新查询细胞、任何一次新扰动都能在图谱里被定位（[Rood, Regev et al. 2024](https://doi.org/10.1016/j.cell.2024.07.035)）。Regev 在操作层面也很关键，因为她身处 Genentech、手里有预算——她这组的押注，影响着药企究竟怎么把图谱式思路落到实处，而这比公开预印本里那副姿态要受限得多。和 Bunne 配着看，就是 2024 年那两份至今还被全行业拿来争论的经典立论。

### Fabian Theis —— Helmholtz Munich + TUM

Theis 是「圈内人」里最有意思的声音，因为他 2026 年那篇 Cell Systems 视角文章（[Theis et al. 2026](https://doi.org/10.1016/j.cels.2026.101534)）摆明了是一次转向：从堆规模、做单体式 sc-FM，掉头走向**模块化、懂机制的组件**。他早年是 sc-FM 的拥趸（scVI、scANVI、scArches 都出自或伴生于他的生态），正因如此，这次向清算文献低头才显得更有分量。如果你想知道欧洲 sc-FM 共识往哪边偏，Theis 实验室主页是信噪比最高的订阅之一。

### Mahmood Lab —— Harvard / BWH / MGB

Faisal Mahmood 的组是**病理基础模型**的重心所在：UNI、UNI2-h、CONCH、TITAN、PathChat、PathChat-DX（FDA 突破性器械认定，2025 年 1 月）。这个实验室最鲜明的特点是跨度大——模型发布、临床基准论文、监管工作，全出自同一支团队，而且 Nature 系刊的产出节奏很稳。专盯病理这个垂直方向的话就跟他们；在学术文献里，他们的工作最接近一条「从 FM 到临床的完整流水线」。

### Bo Wang Lab —— Vector Institute / 多伦多大学

Wang 这组用 scGPT 定义了 sc-FM 这个品类，从那以后一直是核心参照点。2026 年值得注意的一步是 X-Cell——给 sc-FM 栈套了个智能体外壳，赌的是：下一波收益来自会用工具的智能体端到端编排分析，而不是把 scGPT 继续往大里堆。盯着这组，看看「FM 之后接智能体」这套路子，在那些 2025 年清算里 sc-FM 裸跑表现不佳的任务上，到底能不能兑现。

### Constantin Ahlmann-Eltze + Wolfgang Huber —— 原 EMBL Heidelberg

他们写出了**这个领域近期史上最具分量的那篇评测论文**——2025 年那个结果：在扰动预测上，简单的线性基线打平甚至打赢了 scGPT 和 Geneformer。Ahlmann-Eltze 此后去了 **Isomorphic Labs**，这件事本身就是个承重信号：这个领域最犀利的 sc-FM 批评者，如今进了 DeepMind 的商业制药部门。盯着他们接下来发什么，因为那会告诉你后清算时代的文献将朝哪些基准收敛。

### Serena Yeung-Levy —— Stanford 生物医学数据科学

Yeung-Levy 这组目前是把**流匹配（flow matching）当作建模基元**、用来做分布到分布扰动建模的最有意思的一注（CellFlux、CellFlux V2，1160 万张图像）。她同时也是生物领域**基于 VLM 的科学推理基准**最主要的代言人（MicroVQA、BioMedICA）——这跟「训 FM」那个瓶颈是两回事，而且是整个领域大多在忽视的一个。两条独立的研究纲领，都是承重的。

### Michael Moor —— ETH Zurich

在学术圈里，Moor 实验室是**医学智能体 AI** 最清晰的那个声音，主心骨是 MYRIAD（600 万条结构化医学问答图谱）和会逐步核验每一步推理的过程奖励模型。他的提法——医学智能体出错有两类截然不同的原因，一是缺乏结构化的事实根基，二是推理没被核验——是当前关于智能体 AI 问题最明晰的一次拆解。等 LLM 智能体浪潮打到诊断领域时，就该关注他了。

### Leskovec + Quake —— Stanford / SNAP

Jure Leskovec 和 Steve Quake 的联合产出，是学术界里产量最高的「懂图、懂物理」的单细胞纲领。他们之于虚拟细胞议程的意义在结构先验这一侧：当 Bunne 和 Yeung-Levy 在推表征学习的规模时，这组是在往底料里塞机制先验和图结构。Quake 的湿实验与仪器视角，叠上 Leskovec 的图机器学习视角，给了他们一个独特的切入角度。

---

## 出模型的研究所

### CZI / CZ Biohub / Virtual Biology Initiative

Chan Zuckerberg 这套基础设施——CZI 是出资方，[CZ Biohub Network](https://www.czbiohub.org/) 是干湿与计算的执行臂，[CZI Virtual Cell Models](https://virtualcellmodels.cziscience.com/) 是统领的伞——是**这个领域里最重要的非学术机构**，因为它掌着底料。CELLxGENE 是默认的细胞图谱数据层；Virtual Cell Challenge（[VCC 2025 启动](https://virtualcellchallenge.org/)，配 Cell 论文）则是这个领域第一个带留出集评测的社区基准。Biohub 自己也出模型（TranscriptFormer、rBio），这意味着同一家机构既办基准、又供底料、还派了支自家选手下场——这种双重身份值得盯紧。值得关注的关键人物：Priscilla Chan（CZI）、Theofanis Karaletsos、Steve Quake、Angela Pisco（Biohub）。

### Arc Institute

Arc 是生物 FM 领域里除 DeepMind 之外最大的学术式算力平台——大约 2,048 块 H100——而且出的是开放权重模型，其规模高校组根本比不了：**STATE**（扰动）、**Evo / Evo 2**（基因组 FM，7B+ 参数，约 6×10²³ FLOPs），以及和 Tahoe Therapeutics、CZ Biohub 合作的 **Tahoe-100M** 数据集。要记住的名字是 Patrick Hsu 和 Hani Goodarzi。Arc 重塑了这个领域：它是唯一一个在营利 AI 实验室之外、能以超算厂商级别的算力运转、同时还以那些厂商不会采取的方式开放权重的可信团队。

### EvolutionaryScale

这家是 Meta 蛋白质语言模型那支的分拆公司，主打 **ESM-3**（Science 2025，98B 参数，披露约 10²⁴ FLOPs）。它在算力上的透明度很罕见——DeepMind、Recursion 以及大多数病理厂商都不披露训练成本——这让 ESM-3 成了一个校准锚点，别家的蛋白质 FM 算力说法都能拿它来对一对真假。它站在这个领域「开放对封闭」之争的开放权重那一边。

### Isomorphic Labs

DeepMind 的制药分拆公司，继承了 AlphaFold / AlphaProteo / AlphaMissense 以及全新的 **AlphaGenome**（Nature 2026，26 项变异效应任务里赢了 25 项）。封闭权重、托管 API 的姿态——和 Arc 在结构上正好相反。前面提到他们最近招了 Ahlmann-Eltze，这信号是说 Isomorphic 打算把内部评测能力建到这个领域最犀利批评者的水准。

### Calico

在后 Enformer 时代的文献里，Calico 的 Borzoi 是被引最多的那份基因组 FM 贡献；即便头条早已被 AlphaGenome 和 Evo 2 抢走，这组依旧在以稳定节奏出活。Calico 这家机构本身也值得留意，因为它是少数明确以衰老/长寿为使命的实验室之一——这是虚拟细胞方法在远端的下游消费者，而不是方法贡献者，正因如此值得追踪。

### CellxGene / Human Cell Atlas

两个有交叠的联盟，值得当成一个来追：**Human Cell Atlas**（Sarah Teichmann、Aviv Regev、John Marioni 等）提供多组织的参照数据；**CELLxGENE**（CZI）则是把它落地运转的底料。HCA 产出那些经典图谱，CZI 负责工程实现。每一次 Tahoe-100M、每一次 SC-Arena、每一次 Virtual Cell Challenge 跑动，依赖的数据都流经其中之一或二者。

### Microsoft Research + Providence（Prov-GigaPath）

微软与 Providence 的合作产出了 Prov-GigaPath（Nature，2024 年 7 月）——截至 2024 年中是公开披露过的最大病理 FM 训练集，特别之处在于它是医院—医疗系统的直接合作，而非「厂商 / 学术」那种组合。它有用，是因为它给出了一个模板：一家超算厂商加一家付费方该怎么合作出临床 FM 工作。

### BioMap Research + MBZUAI

虚拟细胞领域里，最值得追的「中国 / 阿联酋一轴」玩家：**xVERSE** 是一个原生做转录组的 sc-FM，背后算力相当扎实；**VCHarness**（自主搭虚拟细胞的构建器）则是 2025–2026 年发表的智能体生物里更有野心的几个之一。BioMap 也是少数能在这个规模上出活的非西方团队之一；想要一个非 CZI、非 Arc 的视角，就追它。

---

## 产业玩家

### Paige.AI + MSK（Thomas Fuchs）

Paige 在 2025 年 1 月拿下了**通用病理基础模型的首张 FDA 510(k) 许可**，技术骨干是 Virchow 模型家族。它越过监管那道线，比任何学术 FM 组都早——连 Mahmood 的 PathChat-DX 都还停在突破性器械阶段。盯着这个 510(k) 先例怎么去塑造后续病理 FM 的待遇（每个新模型都得自己单独再过一遍许可吗？）。

### Owkin

Owkin 2026 年最鲜明的一步，是**把一个由病理基础模型驱动的智能体塞进了 Anthropic 的 Claude**——也就是 Owkin Pathology Explorer 集成。这是当下最干净的一个例子，展示了病理 AI 联邦数据这一侧如何产品化成一个 LLM 工具层，也让 Owkin 拿到了一个不同于 Paige 或 Mahmood 的分发界面。巴黎 / 纽约双总部；欧洲最资深的病理 AI 团队之一。

<aside class="qa" data-q="1"><b>就「Owkin 2026 年最鲜明的一步，是把一个由病理基础模型驱动的智能体塞进了 Anthropic 的 Claude」一句的提问：</b>多说说 Claude 里的 Owkin Pathology Explorer 集成——它到底干什么，谁能用？</aside>

<aside class="qa-reply" data-q="1"><b>答：</b>Pathology Explorer 是 Owkin「K Pro」系列里一个基于 MCP 的智能体，搭载在 Anthropic 的 Claude for Healthcare and Life Sciences 里（2026 年 1 月 12 日上线）。机制上：Owkin 做了 MCP 编码，让 Claude 把病理问题路由给 Owkin 的智能体，后者返回对患者组织图像的空间感知分析——细胞 / 组织分型、肿瘤微环境研究、生物标志物提取、队列生存分析。底层模型训练自 Owkin 那张 800 家医院 / 104 个中心的组织病理网络；上线材料没点名某个具体的公开 FM（Phikon、OwkinZero），所以确切的模型接线方式未披露。这种分发方式，把医院级病理 AI 直接塞进了每一条 Claude HCLS 工作流，而不是藏在 Owkin 自家的 SaaS 界面后面。</aside>

### Recursion Pharmaceuticals

按扰动成像数据集规模算，是最大的 AI 原生生物科技公司。**BioHive-2** 集群 + NVIDIA 合作，让 Recursion 跻身算力配置较好的工业玩家之列。它的数据护城河在成像那一侧，不在模型那一侧。盯着合并后的表型组学平台（Recursion + Exscientia 于 2024 年合并）何时开始交付整合读出。

### Insitro

Daphne Koller 的公司。一个由资深 ML 学者掌舵、与虚拟细胞相邻的生物科技公司里最干净的例子；它出模型的节奏比 Recursion 保守，但与药企合作管线的整合更深。要盯的是临床阶段的候选药物，而不是头条式的模型发布。

### Cellarity

Flagship 孵化的公司，专门押注**把细胞状态表征当作药物发现的底料**。算力不如 Recursion，学术能见度不如 Insitro，但它的概念框架——给细胞状态建模、找能把状态往理想方向推的化合物——在风投支持的生物科技里，是与虚拟细胞议程契合得最干净的一个。

### Latent Labs

英国生物科技公司，由 DeepMind 校友创立，在做虚拟细胞 FM。还很早，公开细节不多。值得关注，因为它是最早一批能叫得出名的分拆公司之一：把 DeepMind 的蛋白质 FM 打法搬到细胞尺度来用，还带着一个 Arc（非营利）和 Isomorphic（专注制药）都没有的创业商业化向量。

### Tahoe Therapeutics + Vevo

两家与 Arc 相邻 / 由 Arc 资助的初创，负责 Arc–CZ Biohub 虚拟细胞联盟里的湿实验那一侧。Tahoe 是 Tahoe-100M 扰动数据集背后的操盘手；Vevo 则是「拿到底料之后干什么」的第二步玩法。追 Arc 的 GitHub，就能看到这两家是怎么配合着出活的。

### Roche Tissue Diagnostics / NavigatorAI

药企内部自研病理 AI 的那位在位者，放在这里当反例：Paige、Owkin、Mahmood 靠的是风投或经费，而 Roche 有一片已部署的临床病理足迹，还有一套诊断业务模式。随着病理这个垂直方向不断整合（Modella → AstraZeneca，PathChat-Dx → FDA 突破性认定），Roche 内部自研就是一个标尺：一套完全整合、由药企自有的病理 AI 能力，应该长成什么样。

### NVIDIA BioNeMo

通常意义上它不算一个出模型的机构，但它是越来越多生物 FM 训练流程要经过的**基础设施层**——包括 [JPM 2026 上礼来与 NVIDIA 的 10 亿美元 AI 协同创新实验室](aacr-and-other-conferences-2026-virtual-cells.md)。追 BioNeMo 的更新，就能知道 18 个月后默认的训练栈会长什么样。

---

## 还值得单列一笔的生态与元组织

- **scverse**（Fabian Theis 等）—— Scanpy / AnnData / squidpy / scvi-tools。任何新 sc-FM 都得拿它这套经典工具底料来证明自己。即便 FM 浪潮过后，在评测论文里打赢 sc-FM 的，依旧是这些扎根 scverse 的基线。
- **Mostly AI / Open Problems 社区**（Daniel Burkhardt、Smita Krishnaswamy 等）—— Open Problems for Single Cell 联盟和 SC-Arena 一起，办着最受认可的社区基准。「Open Problems v2」这个提法，已经成了评测论文里的默认引用。
- **Pertpy 维护者**（Lukas Heumos，Theis 组）—— 这个扰动分析的 Python 框架，已经成了扰动预测评测工具的默认底料。2025 年的 Nature Methods 论文，把它从「好用的库」抬升到了「标准参照」。
- **awesome-virtual-cell**（Liudeng Zhang，本语料的源头作者）—— 社区维护的虚拟细胞论文 / 工具索引。当追踪源用很合适，尤其是在 AACR / JPM / ICLR 那几个节点前后。
- **Owl Posting + Eric Topol 的 substack** —— 追踪药企 AI 商业化动向的一个有观点的层，正好补上实验室那一侧的覆盖。看交易流和 FDA / 监管角度，就读它们。

---

## 这份名单到底该怎么用

一个干活的研究者应该挑 **3–5 个追踪对象**，而不是 25 个。按你在乎什么，给几组建议搭配：

- **你在乎把虚拟细胞当成一项研究纲领** → Bunne、Theis、Regev、Arc、CZ Biohub。
- **你在乎 sc-FM 到底好不好使** → Ahlmann-Eltze（Isomorphic）、Open Problems 联盟、Bo Wang、Yeung-Levy、scverse。
- **你在乎病理 FM 与临床部署** → Mahmood、Paige.AI、Owkin、Microsoft-Providence、Roche。
- **你在乎与虚拟细胞相邻的蛋白质 / 基因组 FM** → EvolutionaryScale、Isomorphic、Arc、Calico。
- **你在乎应用于生物的智能体 AI** → Moor（MYRIAD）、Bo Wang（X-Cell）、BioMap（VCHarness）、Owkin（Claude 集成）。
- **你在乎药企 AI 的交易流而非方法** → 礼来 + NVIDIA、AstraZeneca + Modella、Insitro、Recursion，再加上 Owl Posting / Endpoints 这个追踪层。

六组搭配里都有一个共同的套路：**学术锚点 + 出模型的研究所 + 产业对应方**。这种三角定位——一个论文声音、一个出模型的声音、一个产品 / 监管的声音——才是让你在虚拟细胞地图任何一个子领域都看到全貌的关键。
