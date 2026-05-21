---
title: "病理 FM：真正在临床上落地的那个家族"
summary: "一张关于病理基础模型的全景图——它们在 2025-2026 年成为首批落进真实临床产品的生物学 FM——UNI/UNI2-h、Virchow2、CHIEF、PathChat、CONCH/TITAN、Hibou、H-Optimus——外加机构护城河、许可政治，以及 Owkin → Claude for Healthcare 的部署。"
---

> *与 [基础模型全景现状](foundation-models-state-of-play.md) 配套的全景博客——同一个家族，更深的切片。同胞全景：[基因组 + 蛋白质 FM](genomic-and-protein-fm-landscape.md)。建造机制见 [如何造一个生物学 FM](how-to-build-a-biological-fm.md)；临床部署见 [临床 AI + 智能体临床](clinical-and-agentic-clinical.md)。*

如果非要挑出在 2025-2026 年最清晰地落进临床产品的那一个生物学 FM 家族，那就是病理。当单细胞 FM 忙着在基准战里输给线性基线时（[目录](evaluation-papers-catalog.md)），病理 FM 正悄悄地把获 FDA 许可的模块部署进医院实验室、嵌入 Anthropic 的 Claude for Healthcare，并被打包进 Mahmood 实验室 + Owkin 的、如今已在生产中读片的流水线。本文绘出机构格局、模型阵容、部署面，以及决定你究竟能用哪些检查点的许可政治。

## 机构格局

五个玩家塑造了 2026 年的这个领域：

1. **Mahmood Lab（Brigham + Harvard）**——学术重镇。交付了 UNI、UNI2-h、CONCH、TITAN、MUSK，以及 PathChat 对话式病理智能体。策略：带研究许可的开放权重、深入的临床基准发表、把新的 MD/PhD 训练进这套工作流。2024-2026 年被引用最多的单一病理 FM 谱系。
2. **Owkin**——联邦化打法。横跨欧洲与美国的 800 家医院网络给了 Owkin 一份学术实验室无法匹敌的语料。交付了 H-Optimus，以及 2026 年 1 月在 **Claude for Healthcare and Life Sciences** 内部上线的 Owkin Pathology Explorer 智能体。策略：联邦学习 + 临床部署伙伴关系。
3. **Paige**——商业优先的在位者。最早获 FDA 许可的数字病理模块（前列腺癌检测，随后是乳腺）。交付了 Virchow 和 Virchow2。策略：先拿监管许可，再从前列腺/乳腺扩展到通用数字病理。
4. **HistAI**——小团队搅局者。交付了 **Hibou**（Hibou-B, Hibou-L），唯一一个 Apache-2.0 许可下的顶级病理 FM。相对 Mahmood / Owkin / Paige 是个微小团队；他们的切入点是许可可及性（见 [小实验室](small-labs-what-to-build.md)，切入点 4）。
5. **Roche/Genentech、Tempus、NVIDIA、Bayer/Aignostics**——企业相邻者。Roche 的 Axelios 平台把病理 FM 整合进诊断流水线；Tempus 跑一套泛癌种多模态病理 + 基因组栈；NVIDIA 的 BioNeMo 为产业用户打包病理模型。

竞争结构：Mahmood 发论文，Paige 出产品，Owkin 靠伙伴关系部署，HistAI 用许可打价格战，企业们把所有人整合进去。

## 模型阵容

| 模型 | 实验室 | 年份 | 参数 | 许可 | 区别性特征 |
|---|---|---|---|---|---|
| **UNI** | Mahmood | 2024 | ~300M（ViT-L） | research | 参考级病理 FM；>100M 瓦片预训练 |
| **UNI2-h** | Mahmood | 2024 | ~600M（ViT-H） | research, 门控 | 放大的 UNI；许多任务上当前的榜首 |
| **Virchow** | Paige | 2024 | ~630M（ViT-H） | 门控 | 首个规模化的主要商业病理 FM |
| **Virchow2** | Paige | 2024 | ~630M | 门控 | 3.1M WSI 预训练；在前列腺/乳腺上很强 |
| **CHIEF** | Yu Lab（Harvard） | 2024 | ~600M | **AGPL-3.0** | Cancer-Histology Image Evaluation Foundation；广泛的临床评估 |
| **PathChat** | Mahmood | 2024 | LLM + UNI 骨干 | research | 对话式病理智能体——和一张切片对话 |
| **PathChat-2** | Mahmood | 2025 | 更大 + 多模态 | research | 2025 年的更新；整合更多模态 |
| **CONCH** | Mahmood | 2024 | CLIP 风格（UNI + 文本） | research | 病理-文本对比；用于图文检索 |
| **TITAN** | Mahmood | 2025 | 切片级（以 CONCH 为底） | research | 全切片级 FM；聚合 CONCH 瓦片嵌入 |
| **Hibou-B / -L** | HistAI | 2024 | ~85M / ~300M | **Apache-2.0** | 唯一一个宽松许可的顶级病理 FM |
| **H-Optimus-0 / -1** | Owkin | 2024-25 | ~1B / ~1.1B | research | 在 Owkin 的联邦化 800 家医院网络上训练 |
| **MUSK** | Mahmood | 2024 | 多模态病理 | research | Mahmood 的多模态病理骨干 |

技术上的趋同很惊人：几乎全部都是 **用 DINOv2 式自蒸馏训练的 ViT**（[阶段 4](stage-4-pretraining-objective.md)），主要差别在语料大小和参数量上。差异化已经向上游移到了 **聚合器**（CONCH → TITAN），向下游移到了 **智能体包装器**（PathChat-2, Owkin Pathology Explorer）。

## 2026 年究竟部署了什么

三个值得知道的真实世界部署：

- **Claude for Healthcare 中的 Owkin Pathology Explorer**（于 2026 年 1 月 12 日在 JPM 上线）。Owkin 的病理 FM 被包进一个基于 MCP 的智能体，让临床医生在 Claude 内部用自然语言查询切片。这是首个落进通用 AI 消费产品内部的主要生物学 FM 部署。
- **Paige 获 FDA 许可的模块**（前列腺、乳腺及其他）。事实上的监管模板——这些模块在真实的美国临床实验室里读片，产出医生签字的报告。
- **Brigham + DFCI 的 Mahmood 实验室流水线**。UNI/UNI2-h + PathChat-2 + TITAN 正在 Brigham 跑回顾性和前瞻性切片；许多 Campanella et al. 2025 的临床评估都走的这条流水线。

## 许可政治

许可是一道护城河，而病理是这件事最要紧之处。UNI2-h 和 Virchow2 需要门控访问（登录 + 许可协议）；CHIEF 是 AGPL-3.0（商业用途受限）；H-Optimus 仅限研究。**Hibou 的 Apache-2.0 发布是唯一一个你不用找律师就能丢进商业产品的顶级病理 FM**，这正是 HistAI 在初创公司和做转化工作的学术团体中获得不成比例采纳的原因。给小团队的普遍教训：SOTA 往往被锁在一个你无法借以发布产品的许可后面；一个略逊于 SOTA、但许可干净的模型，可以是对的工具。

## 2026 年它们如何被评估

[Campanella et al. 2025 临床基准](evaluation-papers-catalog.md) 如今是该领域的标准记分卡，与 HEST-1k、BACH、CRC polyp 和 TCGA 衍生的任务套件并列。UNI2-h、Virchow2 和 H-Optimus 在大多数临床任务上相差几个百分点；与第二梯队模型（UNI v1, Hibou-L）的差距真实但不大。差异化已经越过原始准确率，移到了 **许可、部署面、智能体包装器和切片级聚合质量**。

## 2026-2027 即将到来的

三个值得关注的方向：

- **多模态病理**——把 H&E 与 IHC、空间组学（[HEX](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/)）、分子数据和 EHR 配对。PathChat-2 和 MUSK 是早期信号。
- **切片级智能体**——TITAN 式切片聚合 + LLM 智能体包装器 + 工具调用（缩放、比较区域、做摘要）。Owkin Pathology Explorer 是第一个真实的产品范例。
- **监管加速**——Paige 的模式（先让窄模块获 FDA 许可，再扩展）正在被 Owkin 和 Tempus 采纳；预期 2026-2027 年会有 5-10 个新的获 FDA 许可的病理 AI 模块。

## 小团队的角度

如果你有一个病理亚专科和来自一家机构的 ~50k WSI，2026 年杠杆最高的建造是为那个亚专科做 **一个 Hibou 式的持续预训练检查点**（[切入点 3](small-labs-what-to-build.md)），以 Apache-2.0 分发，配一个可用的 PathChat-2 式智能体包装器。大实验室在赛跑着要做通用；切入点是深度 + 干净许可 + 即可部署的智能体。值得内化的那一篇 2026 年带星论文：HEX（从 H&E 出发的虚拟空间蛋白质组学）——它展示了当各块拼在一起后，一套整合的病理 + 空间 + 临床工作流长什么样。

病理是最先长大的那个 FM 家族。看着其他家族向它的模板学习。
