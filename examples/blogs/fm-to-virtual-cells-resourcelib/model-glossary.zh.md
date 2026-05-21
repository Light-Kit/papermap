---
title: "模型术语表——演讲中的每一个 FM，各一句话"
summary: "演讲语料中提到的每一个 FM 与虚拟细胞，各一句话，按家族分组。扁平的速查表。"
---

> *FM-to-Virtual-Cells 演讲语料中的科普页——另见[全景中枢](foundation-models-state-of-play.md)。这份扁平的速查表：演讲语料中任何地方提到的每一个基础模型与虚拟细胞，各一句话，按家族分组。当某个名字在备稿途中冒出来、而你只想知道"那又是什么来着"时，看这里。标 **★** 的模型是演讲的 11 个代表模型；每个都链接到最深入介绍它的 papermap 博客。*

标 **★** 的模型是演讲的 11 个代表模型，并链接到它们的完整档案。

## 单细胞基础模型与虚拟细胞

- **scGPT ★**——定义了这个类别的 sc-FM：首个同时把基因 *和* 细胞 token 化、从而实现跨细胞和跨基因注意力的模型（[第 2 阶段——token 化](stage-2-tokenization.md)）。
- **Geneformer V2 ★**——仅编码器的 BERT，采用基于排名的 token 化；其 104M 的癌症精选变体以三分之一的算力追平 316M 的通用模型，杀死了"规模制胜"的叙事（[第 1 阶段——数据语料库](stage-1-data-corpus.md)）。
- **UCE（Universal Cell Embedding）★**——跨物种的 sc-FM：通过 ESM2 蛋白嵌入作桥，在一个嵌入空间里处理 8 个物种（[全景中枢](foundation-models-state-of-play.md)）。
- **STATE ★**——Arc Institute 的 Tahoe-100M 原生虚拟细胞：一个 State Embedding 模块加一个预测扰动结果的 State Transition 模块，是首个 100M 细胞规模的生产级虚拟细胞（[全景中枢](foundation-models-state-of-play.md)）。
- **TranscriptFormer ★**——CZ Biohub 首个生成式跨物种 sc-FM，在跨 12 个物种、横跨 15.3 亿年演化的 112M 细胞上训练（[全景中枢](foundation-models-state-of-play.md)）。
- **Generative Virtual Cells ★**——一个 workshop 概念验证（<250 美元算力），演示了那个设计模式：一个联合的规划器 + 世界模型，在验证门控下更新，而非在一个冻结的快照上离线训练（[小实验室——该建什么](small-labs-what-to-build.md)）。
- **scFoundation**——大型 sc-FM（BioMap），以读深度感知注意力著称；是 2025 年清算反复测试、并在扰动预测上发现其力有不逮的四个模型之一。
- **CellPLM**——细胞作为 token 的 sc-FM（Wen 等，ICLR 2024），配合 scTab，在细胞分型上以 10–20× 更少的训练成本击败 scGPT 和 Geneformer。
- **scBERT**——早期的 BERT 式单细胞模型，先于 2023 年的 sc-FM 浪潮；如今主要具有历史意义。
- **scMulan**——一个多任务单细胞语言模型；是 CellBench-LS 中被基准测试的七个 scFM 之一。
- **GenePT / scELMo**——根本不是训练出来的 sc-FM：是基因 *名字* 的冻结 LLM 嵌入加一个逻辑回归头（约 200 美元算力），在细胞类型注释上零样本地追平或击败 scGPT。
- **xVERSE**——2026 年的架构回应：一个转录组原生（非语言模型）的 sc-FM，在表征上比源自语言模型的 sc-FM 高出 17.9%，并能从少至 4 个细胞解析稀有细胞类型。
- **TxPert**——Wenkel 等人的 *Nature Biotechnology* 2026 扰动预测模型，用多个知识图谱作为归纳偏置——"清算自己回答自己"，因为 Wenkel 合著了 2025 年的 `latent-additive` 批评。
- **MAP**——一个知识驱动的 sc-FM，为未被刻画的药物提供零样本预测；是 2026 年生物特异归纳偏置的范例。
- **Nicheformer**——Theis 实验室的空间组学 sc-FM（约 80M 参数，约 110M 个解离 + 空间细胞，约 25k 美元），以生态位感知目标训练。
- **CellFM**——来自 Zhang 等人的单细胞基础模型（*Nature Communications* 2025）。
- **scPRINT**——Kalfon 等人的 sc-FM（*Nat Commun* 2025），在 50M 细胞上预训练，专门瞄准鲁棒的零样本基因网络推断，而非扰动预测。
- **scPRINT-2**——bioRxiv 2025.12 的继任者（Kalfon, Peyré & Cantini），定位为下一代细胞 FM *并且* 是用于评估它们的一套基准。

## 病理基础模型

- **Virchow2 ★**——当前的病理 FM SOTA，也是硬件最透明的：一个 632M 参数的 ViT-H/14，在来自约 225k 名患者的约 20 亿张 H&E/IHC 瓦片上训练（[病理 FM 景观](pathology-fm-landscape.md)）。
- **UNI2-h ★**——Mahmood 栈的旗舰瓦片编码器（681M 参数），是与 Virchow2 相对的那个不透明的对照；自 2025 年 1 月起 HF 门控（[病理 FM 景观](pathology-fm-landscape.md)）。
- **UNI**——最初的 Mahmood 实验室病理瓦片编码器（*Nature Medicine* 2024），UNI2-h 的前身。
- **Virchow / Virchow2G**——Paige + MSK 的病理 FM 系列：Virchow 是 V1 瓦片编码器；Virchow2G 是在同一硬件队列上的 1.85B 参数放大版。
- **CHIEF**——一个跨组织类型用于癌症检测和预后的病理 FM。
- **Prov-GigaPath**——一个全切片病理 FM（Microsoft + Providence），在真实世界临床切片上训练。
- **Phikon / Phikon-v2**——Owkin 的病理 FM，在一个原本许可受限的家族中以 Apache-2.0 例外而著称。
- **H-optimus-0**——Bioptimus 的开放权重病理瓦片编码器，又一个宽松许可的例外。
- **Hibou**——一个开放的病理 FM（Apache-2.0）。
- **CONCH**——来自 Mahmood 实验室的对比式视觉-语言病理 FM。
- **TITAN**——Mahmood 纵向栈中的切片级模型，位于 UNI2-h 瓦片编码器之上。
- **PathChat / PathChat-2 / PathChat-DX**——Mahmood 实验室的视觉-语言病理助手；PathChat-DX 是首个获 FDA 突破性认定的生成式 AI 病理工具（2025 年 1 月）。

## 基因组基础模型

- **AlphaGenome ★**——DeepMind 的变异效应 SOTA：一个单一的 U-Net + transformer 模型，在 1-Mb 语境下赢得 25/26 个调控变异效应基准（[基因组 + 蛋白 FM 景观](genomic-and-protein-fm-landscape.md)）。
- **Evo2 ★**——Arc + NVIDIA 的生成式基因组 FM（7B/40B 参数，约 500 万美元训练）：唯一展示出上下文学习和 1M-token 语境的基因组 FM（[基因组 + 蛋白 FM 景观](genomic-and-protein-fm-landscape.md)）。
- **Nucleotide Transformer**——一个早期的 DNA 基础模型（InstaDeep），跨多个基因组预训练，用于变异和调控任务。
- **DNABERT-2**——一个 BPE token 化的 DNA FM，是原始 DNABERT 的注重效率的继任者。
- **HyenaDNA**——一个状态空间（非 transformer）的基因组 FM，专为单核苷酸分辨率下的超长语境而建。
- **Caduceus**——一个双向、反向互补等变的状态空间 DNA FM，用于长程基因组任务。
- **Enformer**——前 FM 时代的 DeepMind 模型，通过注意力从序列预测基因表达；是 AlphaGenome 所取代的单任务模型之一。
- **Borzoi**——Calico 的 RNA-seq 覆盖度预测模型，Enformer 的继任者，同样被 AlphaGenome 的单模型方法所并吞。

## 蛋白基础模型

- **ESM-3 ★**——EvolutionaryScale 的 98B 参数多模态蛋白 FM，含 7 条 token 轨道；从头生成了 esmGFP，并树立了生物学 FM 中最干净的算力披露基准（[基因组 + 蛋白 FM 景观](genomic-and-protein-fm-landscape.md)）。
- **ESM-2**——开放权重的前代蛋白语言模型；仍是大多数学术复现的主力。
- **ESMFold**——基于 ESM-2 的结构预测器：无需 MSA 的快速单序列折叠。
- **AlphaFold 3**——DeepMind / Isomorphic 的结构预测器，扩展到复合物——蛋白与核酸、离子和配体。
- **Proteina / Proteina Complexa**——生成式蛋白设计 FM；Proteina Complexa 在一个 PDGFR 结合剂设计任务上报告了 63.5% 的湿实验命中率。

## 多模态 / 视觉-语言

- **BioMedCLIP**——一个生物医学图像-文本对比模型，在大规模图-注（figure-caption）对上训练。
- **Med-Gemini**——Google 的医学多模态模型家族，用于临床推理和医学图像问答。

## 建在基础模型 *之上* 的智能体系统

*它们本身不是基础模型，但在演讲中反复出现，因为 2026 年的故事是智能体 AI 与 FM 的汇聚。*

- **rBio**——一个被后训练以 *基于* 虚拟细胞进行推理的 Qwen 模型，用 TranscriptFormer 作为验证器。
- **VCHarness**——一个端到端 *构建* 虚拟细胞模型的自主智能体。
- **CellVoyager**——一个自主 *分析* 单细胞数据的智能体（*Nature Methods* 2026）。
- **MedAgentGym**——一个用于训练和评估医学 AI 智能体的智能体环境 / 基准。
- **PathChat-DX**——一个调用病理 FM 作为工具的 LLM 智能体；"智能体使用 FM"的最清晰例证。

## 下一步去哪儿

- **[90 分钟速读](speed-read.md)**——一个穿过这些模型背后论文的精选阅读顺序。
- 那 11 个代表模型的完整逐模型档案（资源 / 框架 / 独特特征 / 暴露出的缺口）住在演讲补充材料里。
- **[什么是基础模型？](what-is-a-foundation-model.md)**——这些模型归入的五大家族分类法。
- **[每个 FM 要花多少钱？](what-does-each-fm-cost.md)**——算力披露全景。
- **[为什么线性基线会赢？](why-linear-baselines-win.md)**——为何单细胞家族正陷于危机。
- **[基础模型跨库索引](../../foundation-models.md)**——所有会议库中的每一个 FM 页面。

---

*最后更新于 2026-05-14。*
