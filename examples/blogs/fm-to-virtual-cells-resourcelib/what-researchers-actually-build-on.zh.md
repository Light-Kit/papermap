---
title: "研究者究竟在什么之上做开发？后续研究如何复用细胞基础模型——以及复用的是哪些"
summary: "对每个新人都会问的那个问题给出一个有据可依的回答：研究者究竟真正复用了哪些虚拟细胞 / 单细胞基础模型，又是怎么复用的？简短版本印证了这种直觉，但附带两点提醒。是的——scGPT 与 Geneformer 以巨大优势主导着后续工作（被引最多、工具最完善、是默认的基准对照目标），而 Nicheformer 是最有可能成为空间组学默认选择的空间组学新进者；UCE、scFoundation 与 CellPLM 被引用的程度远高于被真正用作开发基底的程度。但有两处纠正很重要。第一，被引不等于复用：大多数生产级单细胞分析仍然跑的是 scanpy / Seurat 搭配 scVI / Harmony，而 FM 即便被用到，多半也只是冻结的嵌入器或基准对照目标，而非分析流水线本身。第二，「Tahoe」不是一个模型——Tahoe-100M 是一个数据集（Vevo/Tahoe Therapeutics + Arc；1 亿细胞，1,100 种药物，50 个细胞系）；在它之上训练出的模型是 Tahoe-x1（3B 参数，开放权重，2025 年 10 月），与 Arc 的 STATE 并列。更新、更大的模型尚未在复用上取代这些早行者——部分是惯性与工具生态，部分则源于 2025 年的线性基线清算，那次清算让人怀疑规模究竟有没有帮助（同时还有一个仍在进行的逆向反赌：一旦数据达到 Tahoe 规模，规模确实有用）。本文铺陈了后续工作的六种模式（冻结嵌入 + 头部、微调/适配器、基准测试、FM 作为基线、可解释性探测、再预训练），为每一种点名代表性论文，并以这套采用模式对小实验室意味着什么作结：冻结嵌入器这一模式是已被验证、成本低廉的路径，而这恰恰正是我们的「生存场」赌注所在——冻结 Tahoe-x1 与 MoLFormer，接一个新的头部，以 Tahoe-100M 作为基底。"
---

> *这是[全景中枢](foundation-models-state-of-play.md)与[模型术语表](model-glossary.md)的一篇田野定位伴读。它解读的是采用全景，而[清算长文](why-linear-baselines-win.md)解释了这一全景的成因；它还把[五十个概念的赌注](fifty-concepts-one-bet-v2.md)与[生存场模型](what-disappears-conditional-viability-v3.md)中的设计选择落到实处：我们复用 FM 的方式与大多数人成功的方式一样，只是把它对准了一个不同的问题。*

## 这个问题里藏着两个陷阱

「大多数研究者似乎都在用 scGPT、Geneformer、Nicheformer——这是真的吗？那像 Tahoe 这样更新的模型呢？」直觉是对的，但这个问题藏着两个值得在回答之前先拆除的陷阱。

第一个陷阱是 **被引与复用之分**。成为被引最多的模型，与成为被 *用作开发基底* 最多的模型不是一回事，而这两者又都不等于成为人们真正会在自己数据上跑起来的模型。这三类群体彼此重叠，却并不相同；把它们混为一谈，会得出一张失真的地图。

第二个陷阱是 **模型与数据集之分**。「Tahoe」是最咬新人的那个：Tahoe-100M 不是一个你能微调的模型——它是一个 *数据集*。模型是另外的东西（Tahoe-x1），而这一区分会彻底改变「Tahoe 是否正在被采用」这个问题的答案。请把这两个陷阱都记在心里；本文余下的篇幅大半都是在绕开它们。

## 究竟谁真正被复用

直觉是对的：**scGPT**（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）与 **Geneformer**（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）是后续单细胞 FM 工作的两大支柱。它们起步早，交付了可用的代码和权重（[scGPT 在 GitHub 上](https://github.com/bowang-lab/scGPT)约有 1.6k stars；[Geneformer 在 Hugging Face 上](https://huggingface.co/ctheodoris/Geneformer)有一族检查点），而且——这是自我强化的那一环——它们成了 *每篇新论文默认拿来对照基准的对象*，这就让它们无论是否胜出都持续被引用。**Nicheformer**（[Schaar et al., *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02814-z)；[代码](https://github.com/theislab/nicheformer)）是来自 Theis 实验室的空间组学新进者；它更新，采用度也更小，但它最有可能成为 *空间* 领域的默认选择，正如 scGPT 成了解离数据的默认选择那样。

排在这三者之后的，是一些被引用程度远高于被用作开发基底程度的模型。**UCE**（[Rosen et al., bioRxiv 2023](https://www.biorxiv.org/content/10.1101/2023.11.28.568918)；[代码](https://github.com/snap-stanford/UCE)）几乎只被当作一个 *冻结的、零样本的嵌入器* 来用——按其设计，它根本没有微调路径。**scFoundation**（[Hao et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02305-7)；[代码](https://github.com/biomap-research/scFoundation)）最常出现的场景是与 GEARS 搭配做扰动。**CellPLM**（[Wen et al., ICLR 2024](https://openreview.net/forum?id=BKXvPDekud)）出现在基准测试里的次数，多于被别人当作基底来开发的次数。

| 模型 | 角色 | 复用信号 | 主导的后续模式 |
|---|---|---|---|
| **scGPT** | 解离 scRNA FM | 复用最多；约 1.6k GitHub stars；默认基准对照目标 | 冻结/零样本嵌入器，有时会微调 |
| **Geneformer** | 解离 scRNA FM | 另一个默认选择；多检查点的 HF 家族 | 为分类微调 + 计算机模拟扰动 |
| **Nicheformer** | 空间 + 解离 FM | 空间组学新进者，采用仍处早期 | 用于空间任务的线性探针 / 微调 |
| **UCE** | 通用嵌入器 | 中等；仅作嵌入器 | 冻结的零样本嵌入 |
| **scFoundation** | 感知测序深度的 FM | 中等；偏向扰动 | 嵌入 + GEARS 用于药物/扰动 |
| **CellPLM** | 细胞作为 token 的 FM | 大多是一个基准测试条目 | 被引用多于被用作开发基底 |

## 人们如何复用它们——六种模式

撇开模型的名字，后续工作大致可归为六种模式，按其常见程度大致排序：

1. **冻结嵌入 + 一个轻量头部。** 把 FM 当作固定的编码器来跑，再训练一个线性或小型 MLP 头部，用于细胞类型注释或标签迁移。这是占绝对优势的最常见模式，也是最便宜的——UCE 和零样本 scGPT 就活在这里，而这也是一个小实验室能在「笔记本加一块 GPU」上跑起来的模式。
2. **微调 / 适配器。** 让骨干网络针对某个任务专门化——扰动、疾病状态、空间生态位——通常借助 LoRA/FiLM 式的适配器，而非完整重训。Geneformer 是经典的微调目标；scFoundation+GEARS 是扰动的范式。
3. **基准测试研究。** 这类论文的产出 *本身就是* 那场比较——FM 彼此之间、以及 FM 与线性 / HVG / scVI 基线之间的比较。[Kedzierska et al., *Genome Biology* 2025](https://link.springer.com/article/10.1186/s13059-025-03574-x) 和 [Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02772-6) 是参照点。
4. **FM 作为基线。** 每一个新模型（STATE、Tahoe-x1、xVERSE、TxPert）都拿 scGPT/Geneformer/UCE 来作基准——于是早行者作为「要跨过的标杆」赚得了引用。
5. **可解释性 / 探测。** 在 FM 的残差流上做稀疏自编码器和注意力探针（[SAE 工作, bioRxiv 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631)）——[可解释性长文](interpretability-state-of-cell-fms.md)讨论了这暴露出的调控逻辑缺口。
6. **再预训练 / 持续预训练。** 罕见，且大多由原始实验室来做（scGPT-spatial、Geneformer V2），因为它需要我们其余人并不具备的算力和基底。

模式 1–2 是「在其之上做开发」。模式 3–5 是「围绕其做开发」——而在 2025 年之后，这个领域有惊人的一大块精力转向了模式 3。

## 诚实的缺口：被引不是流水线

这就是那些抢眼数字所掩盖的纠正。scGPT 和 Geneformer 主导着 *文献*，但它们并不主导 *实验台*。大多数日常的单细胞分析仍跑的是经典栈——工作流用 scanpy / Seurat，整合用 **scVI**（[Lopez et al., *Nat Methods* 2018](https://doi.org/10.1038/s41592-018-0229-2)）/ scANVI / Harmony——而 scverse 的「最佳实践」推荐的默认路径仍是这些，而非某个 FM。当 FM 真的出现在一项真实分析里时，绝大多数情况下是处在模式 1（一个冻结的嵌入器）或模式 4（一个基准对照目标），而非作为生产流水线。

而且，2025 年的清算可量度地把后续工作从「构建」掰向了「审计」。在 [Ahlmann-Eltze & Huber](https://www.nature.com/articles/s41592-025-02772-6) 表明没有任何 sc-FM 能在扰动预测上击败一个调好的线性基线、以及 [Kedzierska et al.](https://link.springer.com/article/10.1186/s13059-025-03574-x) 表明零样本的 scGPT/Geneformer 不如 HVG/scVI/Harmony 之后，「这个 FM 跨过线性标杆了吗」就成了一个标准的审稿人问题——完整的解剖见[为什么线性基线会赢](why-linear-baselines-win.md)。如今 2026 年的许多后续工作是带批判性的基准测试，而非不加批判的延伸。

## 那些更新的模型——以及 Tahoe 的混淆

现在说第二个陷阱。**Tahoe-100M**（[Vevo/Tahoe Therapeutics + Arc, 2025](https://www.biorxiv.org/content/10.1101/2025.02.20.639398)）是一个 **数据集**——约 1 亿条单细胞转录组，横跨 1,100 种小分子药物和 50 个癌症细胞系，是 Arc 虚拟细胞图谱的首发投放，下载量超过 250k+。你不会去微调 Tahoe-100M；你在 *它之上* 训练。它的采用度已经 **相当可观**——但那是作为 *基底与基准* 的角色，即图谱所扮演的角色，而非作为一个模型。

在它之上、或与它并行训练的那些模型则更新。**Tahoe-x1**（[Tahoe Bio, 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.23.683759)；[权重在 HF 上](https://huggingface.co/tahoebio/Tahoe-x1)）是一个规模扩展到 3B 参数、开放权重的单细胞 FM——截至 2026 年中，它问世才几周到几个月，因此外部的后续工作仍很稀薄。**STATE**（[Arc Institute, 2025](https://www.biorxiv.org/content/10.1101/2025.06.26.661135)）是 Arc 的扰动专精 FM，被定位为一个 *可查询的产品*（带版本、有支持），而非一次性的基准——这是一项机构层面的赌注：驱动采用的是正常运行时间和支持，而不只是准确率。

那么：更新/更大的模型在复用上取代 scGPT 和 Geneformer 了吗？**还没有。** 三个原因。惯性与工具生态——早行者有数年积累的教程、封装和 StackOverflow 答案。新近性——Tahoe-x1 和 STATE 太新，还来不及累积下游论文。以及清算本身——当抢眼的结论是「更大并没有击败一个线性基线」时，换用一个 3B 参数模型的动力就被钝化了。出于诚实，那个仍在进行的反赌值得标出来：一篇 [2026 年的逆向预印本](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1)（《Foundation Models Improve Perturbation Response Prediction》）主张，一旦数据达到 Tahoe 规模，FM *确实* 会改善扰动预测——所以「更新的模型没用」这一判决，在迈向 2027 年之际，是一个尚未盖棺的实证问题，而非已成定论的结论。

## 这对像我们这样的小实验室意味着什么

这套采用模式，悄悄地，其实是一份配方。那个奏效的模式——大多数人凭它成功、成本也最低的那个——是模式 1：一个 **作为编码器的冻结 FM，加上一个新的、小型可训练头部**。这不是退而求其次；它是已被验证的路径，而且恰恰正是我们自己赌注的所在。[生存场模型](what-disappears-conditional-viability-v3.md)把 Tahoe-x1 冻结作为细胞编码器、把 MoLFormer 冻结作为药物编码器，只训练一个小型的「风险与输运」头部，并以 Tahoe-100M 作为基底——与这个领域已经验证过的复用模式相同，只是对准了一个那些拥挤的模型回答不了的问题（谁能在一种你从未试过的药物下存活）。我们对待那些更大的模型，正按数据所指示的方式来：把 Tahoe-x1 和 MoLFormer 当作 *冻结的编码器*，把 Waddington-OT 和 moscot 当作 *基线*，把 Tahoe-100M 当作 *基底*，并从第一天起就把[线性基线当作标杆](why-linear-baselines-win.md)来要求自己。采用全景给的教训不是「等那个胜出的模型」——而是：只要问题是新的，那个最便宜、最常被复用的模式就足够了。（[小实验室长文](small-labs-what-to-build-v3.md)把这笔经济账讲得很明白。）

## 一句话总结论点

是的——scGPT 和 Geneformer 是人们真正在其之上做开发的模型，Nicheformer 则是空间领域的继承者；但被引不是流水线（流水线仍是 scanpy + scVI），「Tahoe」是一个数据集，它的模型（Tahoe-x1）真实存在，却太新、还没取代任何人，而清算已把许多后续工作变成了审计——所以对一个小实验室来说，能持久的那一步是最寻常的那一步：一个冻结的编码器、一个新的头部、一个公开的基底，以及一条诚实的基线。
