---
title: "细胞器感知的细胞基础模型——谁已经在构建它，又还剩下什么"
summary: "一张 2024-2026 年细胞器感知细胞 FM 的先有技术地图。图像那一侧已经出货（SubCell，基于 HPA，带一个 35 类的亚细胞损失）。scRNA 那一侧恰好只有一个先例（scGenePT），而且它是纯文本的。联合细胞——FM 规模上配对的 Cell-Painting + Perturb-seq——在公开层面是空的。Bunne 在十八个月前就标出了这个缺口；转录组那一半至今仍开放。"
---

> *与 [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md)、[闭环虚拟细胞 101 巡览](closed-loop-virtual-cells-101.md) 和[相邻项目形态文章](adjacent-project-shapes-and-n-of-1.md)互为姊妹篇。v2 说闭环 VC 中的架构新意已经消失；相邻形态文章说多细胞性和跨癌种 anti-PD1 的形态也很拥挤或被数据封死；本文对又一个相邻形态——**细胞器感知的细胞 FM**——提出同样诚实的问题。配套阅读：[空间组学 + 多模态](spatial-omics-and-multimodal.md)，最近的邻接主题；[small labs v3](small-labs-what-to-build-v3.md)，底料即护城河的切入点分类法；[因果模型、FM 与 VC](causal-models-fm-and-vc.md)，第二层框架。*

## 这个问题

今天的细胞 FM——scGPT、Geneformer、scFoundation、UCE、TranscriptFormer、STATE——把每个细胞都当作一袋基因 token。它们没有一个知道 PINK1 住在线粒体里，知道 CALR 住在 ER 里，知道同样的基因表达变化量会因蛋白最终去到哪里而意味着两件不同的事。**细胞器感知** 意味着一个细胞 FM 以细胞器隔室信息为条件、或与之联合训练——蛋白定位标签（Human Protein Atlas）、内源性标记成像（OpenCell），或逐细胞器形态通道（Cell Painting）。这样的东西已经存在了吗？谁在构建它？还剩下什么？

在跨 2024-2026 年文献的两轮检索之后，诚实的地图看起来是这样：*图像* 那一侧已经出货；*scRNA* 那一侧几乎未被触及；*联合* 细胞在公开层面是空的。

## 图像那一侧——SubCell 已经存在

最强的单一现有玩家是 **SubCell**（Lundberg 实验室，KTH/Stanford/CZI，[bioRxiv 2024.12.06.627299](https://www.biorxiv.org/content/10.1101/2024.12.06.627299v2)）。SubCell 是一个蛋白质组感知的 ViT，在完整的 Human Protein Atlas Subcellular 集合上训练：**1.13M 单细胞 × 13,141 蛋白 × 37 个细胞系**，其多任务损失包含蛋白识别外加一个 **35 类亚细胞定位头**。该模型在 CZI Virtual Cells Platform 上公开。它的嵌入可迁移到作用机制预测、细胞周期相位、药物响应和跨物种定位。按任何诚实的解读，它都是图像侧已发表的"细胞器感知 FM"。

围绕 SubCell 的星座很密集。**MorphGen**（[arXiv 2510.01298](https://arxiv.org/abs/2510.01298)，ICML-W 2025）是一个扩散生成器，联合建模全部六个 Cell-Painting 通道，并在标题中明确自称"organelle-aware"——是生成式而非编码器式的。**EMCellFound**（[bioRxiv 2025.12.09.693109](https://www.biorxiv.org/content/10.64898/2025.12.09.693109)）是电子显微镜的对应物：一个 4M 图像的 MAE，带 8 类细胞器分类，准确率约 96%。**scDINO / Cell-DINO**（Doron 等，PLOS CB 2025）在 HPA 上给出一个强的 DINOv2 基线。**OpenPhenom-S/16**（[Recursion，Nov 2024](https://huggingface.co/recursionpharma/OpenPhenom)）是 RxRx3 + JUMP-CP 上公开的 Cell-Painting MAE——明确 *不是* 细胞器感知的（一袋通道）。**CytoSelf**（CZ Biohub，Nat Methods 2022）是唯一一个在前 FM 时代按构造就具备细胞器感知的模型（OpenCell 1,310 个标记），但从未被扩规模。

**对图像侧的判决：** 已完成。任何宣布"我要在 HPA 上构建一个细胞器感知的视觉 FM"的人，都会在头一个小时内落到 SubCell 上。这里可辩护的新意面很窄——而 Lundberg 也是图像侧下一步最可能出现的地方。

## scRNA 那一侧——一个先例，而且它是纯文本的

几乎没人。在那些标准的细胞 FM（scGPT、Geneformer、scFoundation、UCE、TranscriptFormer、STATE、CellPLM、Nicheformer、scGPT-spatial）中，**没有一个** 把 HPA、OpenCell 或 GO-Cellular-Component 标签作为一个条件化通道或辅助头来摄入。唯一真正的先例是 **scGenePT**（Istrate 等，[bioRxiv 2024.10.23.619972](https://www.biorxiv.org/content/10.1101/2024.10.23.619972)，Oct 2024），它用 NCBI / UniProt / GO 文本注释增强 scGPT。GO-CC 是其中一个辅助文本通道，而该论文的标题发现是 GO-CC 注释对 *单基因扰动预测* 帮助最大。

关键的警告：scGenePT 的"细胞器感知"信号处在通过一个语言编码器融合的 GO-CC 字符串的粒度上——不是 HPA 的 35 类图像衍生层级，不是 OpenCell 的邻近 MS 衍生细胞器归属，也不是 Cell Painting 的形态通道。这个模型从未见过一张细胞器的图像。它看到的是 *关于* 一个细胞器的文本。

另一篇谱几何探测论文发现，scGPT 在其中间层中 *涌现式* 地学到了一个亚细胞轴，而从未被监督去学它——分泌型 vs 胞质 vs ER/线粒体的分离出现在谱几何中。这个信号潜藏在底料里；只是从未被用作一个训练目标。

**scRNA 侧那个空格子：** 没有已发表的细胞 FM 把 HPA 图像衍生的定位向量、OpenCell 内源性标记簇，或 Cell-Painting 逐细胞器特征，作为一个条件化通道馈入一个基于序列的 scRNA FM。最接近的东西是 scGenePT，而"GO-CC 文本"与"HPA 图像嵌入"之间的差距是相当大的。

## 联合那一侧——那个空格子

最有趣的切入点——*也是底料封锁最严重的*。**没有公开的 FM 把细胞器通道分辨的形态与单细胞表达联合预训练**。最接近的邻居各以不同方式落空：

- **PAST**（[arXiv 2507.06418](https://arxiv.org/abs/2507.06418)，Jul 2025）——在单细胞分辨率上联合 H&E + scRNA，20M 配对瓦片。错的模态（H&E，不是 Cell Painting）；没有细胞器通道。
- **STORM**（Recursion，2025-26）——联合 H&E + 空间转录组，1.2M 个点，组织级而非细胞级。
- **CellCLIP**（NeurIPS 2025）——Cell Painting + 扰动文本，通道级对齐；第二个模态是文本。
- **Perturb-Multimodal**（Feldman 实验室，Cell 2025）——通过组织内汇集 CRISPR 配对成像 + 测序；一个实验，并未框定为基础模型。

硬事实：**FM 规模上配对的 Cell-Painting + Perturb-seq 在公开层面并不存在。** JUMP-CP（Chandrasekaran 等，Nat Methods 2024）是纯图像的——116K 化合物 × 1.5B U2OS 细胞，无 scRNA。[Tahoe-Arc-Biohub](https://arcinstitute.org/news/tahoe-arc-biohub)（Jan 2026，120M 细胞，225K 扰动）是纯 Perturb-seq 的——无 Cell Painting。Recursion 内部同时拥有这两套底料（约 50 PB），却 *尚未* 发布一个联合的配对模态 FM，这件事本身就有信息含量：即便有了数据，架构和训练目标的设计看来也并非小事。

这正是 Bunne 等所流露的迹象。*How to Build a Virtual Cell with AI*（Cell，Dec 2024）明确标出了这个缺口："……同样关键的是建模细胞器和无膜区室……人类蛋白质组的荧光显微成像是天然的底料，而当前的 FM 起初依赖于转录组测量，然而成像模态对于持续建模细胞的空间组织将是关键。"SubCell 回答了图像那一半。转录组那一半在十八个月后仍然开放。

## 五个具体的未填补切入点

1. **HPA 条件化的细胞 FM。** 把逐基因的 HPA-Subcellular 图像嵌入拼接进 scGPT/UCE/Geneformer 的基因 token 嵌入。辅助损失：从细胞上下文嵌入预测 35 类 HPA 标签。最便宜的干净切入点——没人做过，是因为 SubCell 止步于图像嵌入，而 scGenePT 只用了 GO-CC 文本。
2. **OpenCell 条件化的细胞 FM。** 用 Leonetti 的 1,310 个内源性标记蛋白外加邻近 MS 细胞器谱图谱（Cell 2025）作为监督式侧通道。比 HPA 小，但因为相互作用组通过共定位把蛋白与细胞器绑在一起而富含图结构。
3. **细胞器 token transformer。** 每个细胞每个细胞器一个 token，与基因 token 交叉注意。让模型能把"线粒体质量增加；核糖体蛋白表达下降"表达为一个单一的内部事件。没有已发表的模型这样做。
4. **mtDNA 感知的细胞 FM。** 那 37 个 mtDNA 编码的基因通常被过滤掉或只用于质控。把它们当作一个独立的隔室 token 流，与约 1,500 个核编码的线粒体定位蛋白并列；有机会预测异质性和核-线粒体偶联。mitoSplitter / MitoSort 作为分析工具存在，而非 FM。
5. **AlphaGenome ↔ scGPT 桥。** [AlphaGenome](https://www.biorxiv.org/content/10.1101/2025.06.25.661532)（DeepMind，Jun 2025）为每个基因预测数千条核内轨迹。把这些轨迹用作转录组 FM 中的基因嵌入先验——把核 FM 变成细胞 FM 的结构先验。概念上干净，未经检验。

## 判决 + 值得关注的名字

与 v2/v3 同样的模式。在已经做过的地方，架构组合已被发表（图像侧的 SubCell，scRNA 侧轻量的 scGenePT）。可辩护的新意面活在 *未填补的 scRNA 条件化轴* 和 *联合预训练轴*，二者都是被底料封锁而非被方法封锁。护城河在模型的上游：HPA 图像向量流水线、OpenCell 邻近 MS 标签，以及——最重要的——FM 规模上配对的 Cell-Painting + Perturb-seq，目前只有 Recursion 在内部拥有，而 CZI/NVIDIA 看来正在资助它。

三个值得追踪的名字：**Emma Lundberg**（HPA、SubCell；图像侧的下一步）、**Manuel Leonetti**（OpenCell + Organelle Profiling；邻近 MS 的真值）、**Theofanis Karaletsos**（CZI 的组合式虚拟细胞栈；SubCell 共同作者）。附加：Recursion 的表型组学团队，关注下一次 OpenPhenom 发布；Janelia 的 CellMap，关注一个 EM 侧的 FM。

诚实的不可行：如果"冻结的 scGPT + HPA 图像向量侧通道"在一个细胞器趋向的药物类别（BH3 模拟物、ER 应激剂、mTOR 抑制剂）上打不过原版 scGPT，那这个项目就蒸发了。而这个切入点迟早必须由配对数据驱动——在公开 HPA 标签上做一次干式改装，六个月内可检验，但耐久的版本需要那套联合底料。同样的 v2 判决，向细胞内部又深了一层。
