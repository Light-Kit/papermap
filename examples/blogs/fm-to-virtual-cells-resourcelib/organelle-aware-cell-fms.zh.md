---
title: "细胞器感知的细胞基础模型——谁已经在做了，又还剩下什么"
summary: "一张 2024-2026 年细胞器感知细胞 FM 的前作地图。图像这一面已经交付了（SubCell，建在 HPA 上，带一个 35 类亚细胞定位损失）。scRNA 这一面只有唯一一个前作（scGenePT），而且它只用文本。真正的「联合细胞」——FM 规模下配对的 Cell-Painting + Perturb-seq——在公开领域是空的。Bunne 早在十八个月前就点出了这道缺口；转录组这半边至今还开着。"
---

> *姊妹篇有[agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md)、[闭环虚拟细胞 101 导览](closed-loop-virtual-cells-101.md)，以及[邻近项目形态那篇](adjacent-project-shapes-and-n-of-1.md)。v2 说闭环虚拟细胞的架构新意没了；邻近形态那篇说多细胞性、跨癌种抗 PD1 这些形态要么拥挤、要么被数据卡住；这一篇拿同一个诚实的问题去问又一个邻近形态——**细胞器感知的细胞 FM**。配套阅读：[空间组学 + 多模态](spatial-omics-and-multimodal.md)是最近的邻题；[小实验室 v3](small-labs-what-to-build-v3.md)讲「底料即护城河」那套楔子分类；[因果模型、FM 与虚拟细胞](causal-models-fm-and-vc.md)讲第 2 层因果框架。*

## 这个问题

今天的细胞 FM——scGPT、Geneformer、scFoundation、UCE、TranscriptFormer、STATE——都把一个细胞当成一袋基因 token。它们没一个知道 PINK1 住在线粒体里、CALR 住在内质网里，也不知道同一个基因表达差值，会因为蛋白最后落到哪儿而意思全然不同。**细胞器感知**，指的是这么一种细胞 FM：它以细胞器区室信息为条件、或者拿它来联合训练——蛋白定位标签（Human Protein Atlas）、内源标记成像（OpenCell），或者逐细胞器的形态通道（Cell Painting）。这种东西已经存在了吗？谁在做？还剩下什么？

在 2024-2026 年文献里查了两轮之后，诚实的地图长这样：*图像*这一面已经交付；*scRNA*这一面几乎没人碰；*联合*这个细胞，公开领域是空的。

## 图像这一面——SubCell 早就在了

现存最强的那个玩家是 **SubCell**（Lundberg 组，KTH/Stanford/CZI，[bioRxiv 2024.12.06.627299](https://www.biorxiv.org/content/10.1101/2024.12.06.627299v2)）。SubCell 是一个蛋白质组感知的 ViT，在完整的 Human Protein Atlas 亚细胞合集上训练：**113 万单细胞 × 13,141 种蛋白 × 37 个细胞系**，多任务损失既含蛋白识别，又含一个 **35 类亚细胞定位头**。模型在 CZI 虚拟细胞平台上公开。它的嵌入能迁移到作用机制预测、细胞周期相位、药物响应、跨物种定位。怎么诚实地读，它都是图像这一面那个已发表的「细胞器感知 FM」。

围着 SubCell 的星座很密。**MorphGen**（[arXiv 2510.01298](https://arxiv.org/abs/2510.01298), ICML-W 2025）是个扩散生成器，把 Cell-Painting 全部六个通道联合建模，标题里就明明白白自称「细胞器感知」——是生成式的，不是编码器式的。**EMCellFound**（[bioRxiv 2025.12.09.693109](https://www.biorxiv.org/content/10.64898/2025.12.09.693109)）是电镜版的对应物：一个 400 万图像的 MAE，8 类细胞器分类做到约 96%。**scDINO / Cell-DINO**（Doron et al., PLOS CB 2025）在 HPA 上给出一个强的 DINOv2 基线。**OpenPhenom-S/16**（[Recursion, 2024 年 11 月](https://huggingface.co/recursionpharma/OpenPhenom)）是建在 RxRx3 + JUMP-CP 上的公开 Cell-Painting MAE——明确*不是*细胞器感知（一袋通道）。**CytoSelf**（CZ Biohub, Nat Methods 2022）是 FM 时代之前唯一一个构造上就细胞器感知的模型（OpenCell 1,310 个标记），但从没被放大过。

**图像这一面的判决：** 做完了。任何宣布「我要在 HPA 上建一个细胞器感知视觉 FM」的人，头一个小时就会撞上 SubCell。这里守得住的新意面很窄——而且图像这一面的下一步，最可能也还是从 Lundberg 那儿出来。

## scRNA 这一面——只有一个前作，还只用文本

几乎没人。那一串经典细胞 FM（scGPT、Geneformer、scFoundation、UCE、TranscriptFormer、STATE、CellPLM、Nicheformer、scGPT-spatial）里，**没一个**把 HPA、OpenCell 或 GO-Cellular-Component 标签当成一个条件化通道或辅助头喂进去。唯一一个真正的前作是 **scGenePT**（Istrate et al., [bioRxiv 2024.10.23.619972](https://www.biorxiv.org/content/10.1101/2024.10.23.619972), 2024 年 10 月），它给 scGPT 补上了 NCBI / UniProt / GO 的文本注释。GO-CC 是其中一个辅助文本通道，而论文最抢眼的结论是：GO-CC 注释对*单基因扰动预测*帮助最大。

要命的告诫在于：scGenePT 的「细胞器感知」信号，粒度是 GO-CC 字符串经一个语言编码器融合进去的——不是 HPA 那个 35 类图像衍生的层级，不是 OpenCell 那套邻近 MS 衍生的细胞器归属，也不是 Cell Painting 的形态通道。这模型从没见过一张细胞器的图。它见的是*关于*细胞器的文字。

另有一篇做谱几何探针的论文发现，scGPT 在它的中间层里*涌现式*地学到了一根亚细胞轴，全程没有被任何亚细胞标签监督过——分泌型 vs 胞质型 vs 内质网 / 线粒体的分离，就出现在谱几何里。信号潜伏在底料中，只是从没被当成训练目标用过。

**scRNA 这一面那个空着的格子：** 没有任何已发表的细胞 FM，把 HPA 图像衍生的定位向量、OpenCell 内源标记簇、或 Cell-Painting 逐细胞器特征，当成条件化通道喂进一个序列式的 scRNA FM。最接近的就是 scGenePT，而「GO-CC 文本」和「HPA 图像嵌入」之间那道沟，相当宽。

## 联合这一面——那个空格子

最有意思的楔子——*也是被底料卡得最死的*。**没有任何公开 FM，把细胞器通道分辨的形态与单细胞表达联合预训练。** 最近的几个邻居，各以不同方式擦肩而过：

- **PAST**（[arXiv 2507.06418](https://arxiv.org/abs/2507.06418), 2025 年 7 月）——单细胞分辨率下的 H&E + scRNA 联合，2000 万配对 tile。模态不对（H&E，不是 Cell Painting）；没有细胞器通道。
- **STORM**（Recursion, 2025-26）——H&E + 空间转录组联合，120 万个 spot，是组织层级、不是细胞层级。
- **CellCLIP**（NeurIPS 2025）——Cell Painting + 扰动文本，逐通道对齐；第二个模态是文本。
- **Perturb-Multimodal**（Feldman 组, Cell 2025）——通过组织内合并 CRISPR 做配对的成像 + 测序；是一项实验，没框成基础模型。

硬邦邦的事实：**FM 规模下配对的 Cell-Painting + Perturb-seq，公开领域不存在。** JUMP-CP（Chandrasekaran et al., Nat Methods 2024）只有图像——11.6 万化合物 × 15 亿 U2OS 细胞，没有 scRNA。[Tahoe-Arc-Biohub](https://arcinstitute.org/news/tahoe-arc-biohub)（2026 年 1 月，1.2 亿细胞，22.5 万扰动）只有 Perturb-seq——没有 Cell Painting。Recursion 内部两套底料都有（约 50 PB），却*没有*放出一个联合配对模态的 FM，这件事本身就很说明问题：就算数据齐了，架构和训练目标的设计看来也不轻松。

这恰恰就是 Bunne 等人那个伏笔。《How to Build a Virtual Cell with AI》（Cell, 2024 年 12 月）明确点了这道缺口：「……同样关键的是要建模细胞器和无膜区室……人类蛋白质组的荧光显微成像是天然的底料，而当前 FM 起初依赖的是转录组学测量，成像模态对持续建模细胞空间组织将是关键。」SubCell 答了图像那半边。十八个月过去，转录组那半边还开着。

## 五个具体、没人填的楔子

1. **HPA 条件化的细胞 FM。** 把逐基因的 HPA-Subcellular 图像嵌入拼进 scGPT/UCE/Geneformer 的基因 token 嵌入里。辅助损失：从细胞上下文嵌入预测那 35 类 HPA 标签。最便宜、最干净的楔子——没人做，是因为 SubCell 停在图像嵌入、scGenePT 只用了 GO-CC 文本。
2. **OpenCell 条件化的细胞 FM。** 拿 Leonetti 那 1,310 个内源标记蛋白，加上邻近 MS 的细胞器谱图谱（Cell 2025），当成监督式的侧通道。规模比 HPA 小，但图结构丰富，因为相互作用组靠共定位把蛋白和细胞器绑在了一起。
3. **细胞器 token transformer。** 每个细胞每个细胞器一个 token，和基因 token 交叉注意。让模型能把「线粒体质量上升；核糖体蛋白表达下降」表达成一个内部单事件。没有已发表的模型这么做。
4. **mtDNA 感知的细胞 FM。** 那 37 个 mtDNA 编码的基因，通常被过滤掉、或只用于 QC。把它们当成一条独立的区室 token 流，和那约 1,500 个核编码的线粒体定位蛋白并列；有机会去预测异质性（heteroplasmy）和核-线粒体耦合。mitoSplitter / MitoSort 是分析工具，不是 FM。
5. **AlphaGenome ↔ scGPT 桥。** [AlphaGenome](https://www.biorxiv.org/content/10.1101/2025.06.25.661532)（DeepMind, 2025 年 6 月）能为每个基因预测上千条核内 track。把这些 track 当成转录组 FM 里的基因嵌入先验——让核 FM 变成细胞 FM 的一个结构性先验。概念上很干净，没人测过。

## 判决 + 该盯的人

还是 v2/v3 那个套路。架构组合，凡是被做了的地方都已发表（图像这一面是 SubCell，scRNA 这一面是 scGenePT 浅浅碰了一下）。守得住的新意面，在那条*没人填的 scRNA 条件化轴*和那条*联合预训练轴*上，而这两条都是被底料卡住、不是被方法卡住。护城河在模型的上游：HPA 图像向量流水线、OpenCell 邻近 MS 标签，以及——最要紧的——FM 规模下配对的 Cell-Painting + Perturb-seq，眼下只有 Recursion 内部有，而 CZI/NVIDIA 看来正在出钱。

三个该跟的名字：**Emma Lundberg**（HPA、SubCell；图像这一面的下一步）、**Manuel Leonetti**（OpenCell + Organelle Profiling；邻近 MS 的真值）、**Theofanis Karaletsos**（CZI 的组合式虚拟细胞栈；SubCell 共同作者）。加映：Recursion 的表型组团队，看下一版 OpenPhenom；Janelia 的 CellMap，看一个电镜那一面的 FM。

诚实的劝退：要是「冻结 scGPT + HPA 图像向量侧通道」在某个细胞器趋向的药物类（BH3 拟似物、内质网应激剂、mTOR 抑制剂）上打不赢原味 scGPT，这项目就蒸发了。而且这个楔子迟早得靠配对数据来推——在公开 HPA 标签上做个干式改装，六个月内就能测，但能走得久的版本，需要那块联合底料。还是 v2 那个判决，只是更深一层，钻进了细胞内部。
