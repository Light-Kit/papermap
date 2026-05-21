---
title: "病理 FM：真正在临床里落了地的那一族"
summary: "一张病理基础模型的全景图——它们在 2025-2026 年成了首批落进真实临床产品的生物 FM——UNI/UNI2-h、Virchow2、CHIEF、PathChat、CONCH/TITAN、Hibou、H-Optimus——外加机构护城河、许可证里的政治账，以及 Owkin → Claude for Healthcare 的那次部署。"
---

> *这是和[基础模型全景](foundation-models-state-of-play.md)配套的一篇景观博客——同一族，挖得更深。姊妹景观篇：[基因组 + 蛋白质 FM](genomic-and-protein-fm-landscape.md)。要看构建机制，去[怎么造一个生物 FM](how-to-build-a-biological-fm.md)；要看临床部署，去[临床 AI + 智能体临床](clinical-and-agentic-clinical.md)。*

要是只能挑一个在 2025-2026 年最清楚地落进临床产品的生物 FM 家族，那就是病理。当单细胞 FM 还在评测战里输给线性基线时（[目录](evaluation-papers-catalog.md)），病理 FM 已经悄悄做到了：FDA 许可的模块部署进了医院化验室、被嵌进了 Anthropic 的 Claude for Healthcare、还被打包进了 Mahmood 实验室 + Owkin 那些如今在生产环境里读片的流水线。这篇文章梳理机构景观、模型阵容、部署界面，以及那决定你究竟能用上哪些 checkpoint 的许可证政治账。

## 机构景观

2026 年，五个玩家在塑造这个领域：

1. **Mahmood Lab（Brigham + Harvard）**—— 学术重炮。出了 UNI、UNI2-h、CONCH、TITAN、MUSK，还有 PathChat 这个对话式病理智能体。打法：开放权重配研究许可、扎实发临床基准论文、把新晋 MD/PhD 培养进工作流。2024-2026 年被引最多的病理 FM 谱系。
2. **Owkin**—— 联邦学习那一派。横跨欧美的 800 家医院网络，给了 Owkin 一个学术实验室比不了的语料库。出了 H-Optimus，以及 2026 年 1 月在 **Claude for Healthcare and Life Sciences** 里上线的 Owkin Pathology Explorer 智能体。打法：联邦学习 + 临床部署合作。
3. **Paige**—— 商业优先的在位者。最早拿到 FDA 许可的数字病理模块（前列腺癌检测，随后是乳腺）。出了 Virchow 和 Virchow2。打法：先拿监管许可，再从前列腺/乳腺扩到通用数字病理。
4. **HistAI**—— 小团队搅局者。出了 **Hibou**（Hibou-B、Hibou-L），是顶级病理 FM 里唯一一个 Apache-2.0 许可的。团队相对 Mahmood / Owkin / Paige 来说很小；他们的切口是许可证的可及性（见[小实验室](small-labs-what-to-build.md)，楔子 4）。
5. **Roche/Genentech、Tempus、NVIDIA、Bayer/Aignostics**—— 企业邻接者。Roche 的 Axelios 平台把病理 FM 整进了诊断流水线；Tempus 跑着一套泛癌的多模态病理 + 基因组栈；NVIDIA 的 BioNeMo 为工业客户打包病理模型。

竞争格局：Mahmood 负责发论文，Paige 负责出产品，Owkin 靠合作做部署，HistAI 用许可证打价格战，几家企业把所有人都整合进去。

## 模型阵容

| 模型 | 实验室 | 年份 | 参数量 | 许可证 | 鲜明特点 |
|---|---|---|---|---|---|
| **UNI** | Mahmood | 2024 | ~300M（ViT-L） | research | 病理 FM 的标杆参照；>100M 个 tile 预训练 |
| **UNI2-h** | Mahmood | 2024 | ~600M（ViT-H） | research，需授权 | 放大版 UNI；许多任务上当下的榜首 |
| **Virchow** | Paige | 2024 | ~630M（ViT-H） | 需授权 | 首个上规模的主流商业病理 FM |
| **Virchow2** | Paige | 2024 | ~630M | 需授权 | 3.1M WSI 预训练；前列腺/乳腺上极强 |
| **CHIEF** | Yu Lab（Harvard） | 2024 | ~600M | **AGPL-3.0** | Cancer-Histology Image Evaluation Foundation；临床评测面广 |
| **PathChat** | Mahmood | 2024 | LLM + UNI 骨干 | research | 对话式病理智能体——和切片对话 |
| **PathChat-2** | Mahmood | 2025 | 更大 + 多模态 | research | 2025 年的更新版；整进更多模态 |
| **CONCH** | Mahmood | 2024 | CLIP 式（UNI + 文本） | research | 病理-文本对比学习；用于图文检索 |
| **TITAN** | Mahmood | 2025 | 切片级（CONCH 支撑） | research | 全切片级 FM；聚合 CONCH 的 tile 嵌入 |
| **Hibou-B / -L** | HistAI | 2024 | ~85M / ~300M | **Apache-2.0** | 唯一一个宽松许可的顶级病理 FM |
| **H-Optimus-0 / -1** | Owkin | 2024-25 | ~1B / ~1.1B | research | 训练自 Owkin 那张 800 家医院的联邦网络 |
| **MUSK** | Mahmood | 2024 | 多模态病理 | research | Mahmood 的多模态病理骨干 |

技术上的趋同很扎眼：几乎全是**用 DINOv2 式自蒸馏训练的 ViT**（[阶段 4](stage-4-pretraining-objective.md)），差别主要在语料规模和参数量。差异化已经往上游挪到了**聚合器**（CONCH → TITAN），往下游挪到了**智能体外壳**（PathChat-2、Owkin Pathology Explorer）。

## 2026 年到底部署了什么

三个值得知道的真实部署：

- **Claude for Healthcare 里的 Owkin Pathology Explorer**（2026 年 1 月 12 日在 JPM 上线）。Owkin 的病理 FM 被包进一个基于 MCP 的智能体里，让临床医生能在 Claude 里用自然语言查切片。这是首个落进通用 AI 消费产品内部的主流生物 FM 部署。
- **Paige 的 FDA 许可模块**（前列腺、乳腺等）。事实上的监管模板——这些模块在真实的美国临床化验室里读片，产出由医生签字的报告。
- **Brigham + DFCI 的 Mahmood 实验室流水线**。UNI/UNI2-h + PathChat-2 + TITAN 正在 Brigham 跑回顾性和前瞻性的切片；Campanella et al. 2025 的许多临床评测都走的是这条流水线。

## 许可证里的政治账

许可证就是护城河，而病理是这一点最要紧的地方。UNI2-h 和 Virchow2 需要授权访问（登录 + 许可协议）；CHIEF 是 AGPL-3.0（商用受限）；H-Optimus 仅限研究。**Hibou 的 Apache-2.0 发布，是唯一一个你不用找律师就能直接塞进商业产品的顶级病理 FM**，这正是 HistAI 在初创和做转化研究的学术组里能拿到不成比例采用率的原因。给小团队的普遍教训：SOTA 往往锁在一个你没法用来出货的许可证后面；一个略逊于 SOTA、但许可证干净的模型，可能才是对的工具。

## 2026 年它们是怎么被评测的

[Campanella et al. 2025 临床基准](evaluation-papers-catalog.md)如今是这个领域的标准成绩单，和它并列的还有 HEST-1k、BACH、CRC polyp，以及 TCGA 衍生的任务套件。UNI2-h、Virchow2 和 H-Optimus 在大多数临床任务上只差几个百分点；它们和第二梯队（UNI v1、Hibou-L）的差距真实存在，但不大。差异化已经越过了原始准确率，挪到了**许可证、部署界面、智能体外壳，以及切片级聚合的质量**上。

## 2026-2027 会来什么

三个值得盯的方向：

- **多模态病理**—— 把 H&E 和 IHC、空间组学（[HEX](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/)）、分子数据、EHR 配起来。PathChat-2 和 MUSK 是早期信号。
- **切片级智能体**—— TITAN 式的切片聚合 + LLM 智能体外壳 + 工具使用（放大、对比区域、做总结）。Owkin Pathology Explorer 是头一个真实的产品例子。
- **监管提速**—— Paige 那套路子（先把窄模块过 FDA、再扩张）正被 Owkin 和 Tempus 采纳；预计 2026-2027 会有 5-10 个新的 FDA 许可病理 AI 模块。

## 小团队的切入角度

如果你手里有一个病理亚专科、加上来自单一机构的约 5 万张 WSI，2026 年杠杆最高的一件活，就是为那个亚专科做**一个 Hibou 式的持续预训练 checkpoint**（[楔子 3](small-labs-what-to-build.md)），以 Apache-2.0 分发，再配一个能跑的 PathChat-2 式智能体外壳。大实验室都在抢着做通用；切口是深度 + 干净许可证 + 即可部署的智能体。2026 年那篇唯一被加星、值得内化的论文：HEX（从 H&E 出发的虚拟空间蛋白质组学）——它展示了当各块都接好之后，一套整合的病理 + 空间 + 临床工作流是什么样子。

病理是最先长大的那个 FM 家族。看着其他家族向它的模板学吧。
