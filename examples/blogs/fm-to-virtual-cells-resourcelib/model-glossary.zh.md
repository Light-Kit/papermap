---
title: "模型术语表——演讲里的每一个 FM，一句话讲完"
summary: "演讲语料里点到名的每一个 FM 与虚拟细胞，各一句话，按家族分组。一张扁平的速查表。"
---

> *FM-to-Virtual-Cells 演讲语料里的一篇说明页——另见[全景中枢](foundation-models-state-of-play.md)。这是一张扁平的速查表：演讲语料里任何地方点到名的每一个基础模型与虚拟细胞，各一句话，按家族分组。备稿备到一半，只想确认「那玩意儿到底是啥来着」，翻这里就行。标了 **★** 的，是这场演讲的 11 个锚点模型；每一个都链到把它讲得最透的那篇 papermap 博客。*

标了 **★** 的，是这场演讲的 11 个锚点模型，链到它们的完整档案。

## 单细胞基础模型与虚拟细胞

- **scGPT ★**——给这个品类定调的那个 sc-FM：头一个把基因*和*细胞都 token 化，从而打通了跨细胞、跨基因的注意力（[阶段 2——token 化](stage-2-tokenization.md)）。
- **Geneformer V2 ★**——纯编码器 BERT，用基于排名的 token 化；那个 104M 的肿瘤精编版本，只用三分之一的算力就追平了 316M 的通用版，把「规模制胜」的叙事按死了（[阶段 1——数据语料](stage-1-data-corpus.md)）。
- **UCE (Universal Cell Embedding) ★**——那个跨物种的 sc-FM：靠 ESM2 蛋白嵌入做桥，把 8 个物种装进同一个嵌入空间（[全景中枢](foundation-models-state-of-play.md)）。
- **STATE ★**——Arc Institute 那个 Tahoe-100M 原生的虚拟细胞：一个 State Embedding 模块加一个 State Transition 模块来预测扰动后果，是头一个跑在 1 亿细胞规模上的生产级虚拟细胞（[全景中枢](foundation-models-state-of-play.md)）。
- **TranscriptFormer ★**——CZ Biohub 头一个生成式的跨物种 sc-FM，在跨 12 个物种、横跨 15.3 亿年演化的 1.12 亿细胞上训成（[全景中枢](foundation-models-state-of-play.md)）。
- **Generative Virtual Cells ★**——一个 workshop 的概念验证（算力不到 250 美元），演示了这套设计模式：一个联合的「规划器 + 世界模型」，在验证门控下更新，而不是在一份冻结的快照上离线训练（[小实验室——该做什么](small-labs-what-to-build.md)）。
- **scFoundation**——一个大型 sc-FM（BioMap），亮点是测序深度感知的注意力；它是 2025 年那场清算反复测、又反复发现它在扰动预测上不行的四个模型之一。
- **CellPLM**——一个「细胞即 token」的 sc-FM（Wen et al., ICLR 2024），配上 scTab，能在细胞分型上以 10–20 倍更低的训练成本赢过 scGPT 和 Geneformer。
- **scBERT**——早期那个 BERT 风格的单细胞模型，比 2023 年的 sc-FM 浪潮还早；如今基本只剩历史价值。
- **scMulan**——一个多任务单细胞语言模型；CellBench-LS 里被基准测的七个 scFM 之一。
- **GenePT / scELMo**——压根不是训出来的 sc-FM：是把基因*名字*喂给冻结 LLM 拿到的嵌入，再加一个逻辑回归头（算力约 200 美元），在细胞类型注释的零样本上追平甚至赢过 scGPT。
- **xVERSE**——2026 年那个架构上的回应：一个转录组原生（非语言模型）的 sc-FM，在表征上比 LM 派生的 sc-FM 高 17.9%，用少到 4 个细胞就能分辨出稀有细胞类型。
- **TxPert**——Wenkel et al. 的《Nature Biotechnology》2026 扰动预测模型，把多个知识图谱当作归纳偏置——堪称「清算自己回答了自己」，因为 Wenkel 正是 2025 年那篇 `latent-additive` 批评的合著者。
- **MAP**——一个知识驱动的 sc-FM，能对没测过的药做零样本预测；2026 年「生物学专属归纳偏置」的一个范例。
- **Nicheformer**——Theis 组那个空间组学 sc-FM（约 80M 参数，约 1.1 亿解离 + 空间细胞，约 2.5 万美元），用一个生态位感知的目标训成。
- **CellFM**——Zhang et al. 的一个单细胞基础模型（《Nature Communications》2025）。
- **scPRINT**——Kalfon et al. 的 sc-FM（《Nat Commun》2025），在 5,000 万细胞上预训练，瞄准的是稳健的零样本基因网络推断，而不是扰动预测。
- **scPRINT-2**——bioRxiv 2025.12 的续作（Kalfon, Peyré & Cantini），既被定位成下一代细胞 FM，*也*是一套评估它们的基准。

## 病理基础模型

- **Virchow2 ★**——当下病理 FM 的 SOTA，也是硬件最透明的一个：一个 632M 参数的 ViT-H/14，在约 22.5 万病人的约 20 亿张 H&E/IHC tile 上训成（[病理 FM 景观](pathology-fm-landscape.md)）。
- **UNI2-h ★**——Mahmood 那条栈的旗舰 tile 编码器（681M 参数），也是 Virchow2 那个不透明的对照面；自 2025 年 1 月起在 HF 上设了门（[病理 FM 景观](pathology-fm-landscape.md)）。
- **UNI**——Mahmood 组最早那个病理 tile 编码器（《Nature Medicine》2024），UNI2-h 的前身。
- **Virchow / Virchow2G**——Paige + MSK 那条病理 FM 线：Virchow 是 V1 tile 编码器；Virchow2G 是在同一套机队上把规模拉到 1.85B 参数的放大版。
- **CHIEF**——一个跨组织类型做癌症检测与预后的病理 FM。
- **Prov-GigaPath**——一个全玻片病理 FM（Microsoft + Providence），在真实世界的临床玻片上训成。
- **Phikon / Phikon-v2**——Owkin 的病理 FM，难得的是它们是这个家族里 Apache-2.0 的例外（家族里其余的许可都偏紧）。
- **H-optimus-0**——Bioptimus 那个开放权重的病理 tile 编码器，又一个宽松许可的例外。
- **Hibou**——一个开放的病理 FM（Apache-2.0）。
- **CONCH**——Mahmood 组一个对比式的视觉-语言病理 FM。
- **TITAN**——Mahmood 纵向栈里那个玻片级模型，坐在 UNI2-h tile 编码器之上。
- **PathChat / PathChat-2 / PathChat-DX**——Mahmood 组那个视觉-语言病理助手；PathChat-DX 是头一个拿到 FDA 突破性认定（2025 年 1 月）的生成式 AI 病理工具。

## 基因组基础模型

- **AlphaGenome ★**——DeepMind 那个变体效应 SOTA：一个 U-Net + transformer 的单一模型，在 1-Mb 上下文里拿下 25/26 个调控变体效应基准（[基因组 + 蛋白 FM 景观](genomic-and-protein-fm-landscape.md)）。
- **Evo2 ★**——Arc + NVIDIA 那个生成式基因组 FM（7B/40B 参数，训练约 500 万美元）：唯一一个被证明有上下文学习能力、且有 100 万 token 上下文的基因组 FM（[基因组 + 蛋白 FM 景观](genomic-and-protein-fm-landscape.md)）。
- **Nucleotide Transformer**——一个早期的 DNA 基础模型（InstaDeep），跨多个基因组预训练，用于变体与调控任务。
- **DNABERT-2**——一个 BPE token 化的 DNA FM，原版 DNABERT 那个偏效率的后继者。
- **HyenaDNA**——一个状态空间（非 transformer）基因组 FM，专为单核苷酸分辨率下的超长上下文而造。
- **Caduceus**——一个双向、反向互补等变的状态空间 DNA FM，用于长程基因组任务。
- **Enformer**——FM 纪元之前 DeepMind 那个用注意力从序列预测基因表达的模型；AlphaGenome 取代掉的那批单任务模型之一。
- **Borzoi**——Calico 那个预测 RNA-seq 覆盖度的模型，Enformer 的后继者，同样被 AlphaGenome 的单模型路线收编。

## 蛋白基础模型

- **ESM-3 ★**——EvolutionaryScale 那个 98B 参数、带 7 条 token 轨道的多模态蛋白 FM；从头生成了 esmGFP，并立下了生物 FM 里最干净的算力披露标杆（[基因组 + 蛋白 FM 景观](genomic-and-protein-fm-landscape.md)）。
- **ESM-2**——开放权重的前代蛋白语言模型；至今仍是大多数学术复现的主力。
- **ESMFold**——基于 ESM-2 的结构预测器：不靠 MSA，单序列就能快速折叠。
- **AlphaFold 3**——DeepMind / Isomorphic 那个结构预测器，扩展到了复合物——蛋白与核酸、离子、配体。
- **Proteina / Proteina Complexa**——生成式蛋白设计 FM；Proteina Complexa 在一个 PDGFR 结合子设计任务上报出了 63.5% 的湿实验命中率。

## 多模态 / 视觉-语言

- **BioMedCLIP**——一个生物医学图-文对比模型，在大规模的「插图-图注」配对上训成。
- **Med-Gemini**——Google 那个医疗多模态模型家族，做临床推理和医学影像问答。

## 建在基础模型*之上*的智能体系统

*它们本身不是基础模型，但在演讲里反复出现，因为 2026 年的故事，就是智能体 AI 和 FM 在合流。*

- **rBio**——一个被后训练成能*在虚拟细胞之上做推理*的 Qwen 模型，用 TranscriptFormer 当验证器。
- **VCHarness**——一个端到端*搭建*虚拟细胞模型的自主智能体。
- **CellVoyager**——一个自主*分析*单细胞数据的智能体（《Nature Methods》2026）。
- **MedAgentGym**——一个用来训练和评估医疗 AI 智能体的智能体环境 / 基准。
- **PathChat-DX**——一个把病理 FM 当工具调用的 LLM 智能体；「智能体使用 FM」最清楚的一个例子。

## 接下来读什么

- **[90 分钟速读](speed-read.md)**——穿过这些模型背后那些论文的一条精选阅读顺序。
- 这 11 个锚点模型逐一的完整档案（资源 / 框架 / 独特之处 / 暴露出的缺口），放在演讲补充材料里。
- **[什么是基础模型？](what-is-a-foundation-model.md)**——这些模型归入的那套五家族分类法。
- **[每个 FM 各自花了多少？](what-does-each-fm-cost.md)**——算力披露的全景。
- **[为什么线性基线会赢？](why-linear-baselines-win.md)**——单细胞这个家族为什么陷入危机。
- **[基础模型跨库索引](../../foundation-models.md)**——所有会议库里的每一个 FM 页面。

---

*最后更新于 2026-05-14。*
