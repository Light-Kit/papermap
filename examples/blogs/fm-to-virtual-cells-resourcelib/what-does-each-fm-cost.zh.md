---
title: "训练每个基础模型要花多少钱？"
summary: "对 11 个代表 FM 的训练成本估算——以及当从头训练已不在菜单上时，小实验室仍能可信地参与的几条赛道。"
---

> *FM-to-Virtual-Cells 演讲语料中的科普页——另见 [全景中枢](foundation-models-state-of-play.md)。回答的是有人在第一幕或第二幕会问的那个问题："小实验室在训练上还能竞争吗？"短答案是不能——但更长的答案塑造了哪条赛道是你的。*

## 头条

截至 2026 年 5 月，一次前沿生物学 FM 的完整训练运行需 **2 万至 500 万美元以上**。Geneformer V2-104M_CLcancer（披露 1.7 万美元）是我们矩阵中最便宜的、完全披露的代表模型；Evo2（500 万美元，2,048× H100 历时数月）是披露中最昂贵的。**其间的一切都存在，但大多数实验室披露得比 NVIDIA 联合署名的论文要少**——见下文披露-与-赞助相关的模式。

## 完整矩阵

| 模型 | 家族 | 参数 | GPU 类型 × 数量 | GPU 小时 | $（按需） | 披露 | 来源 |
|---|---|---|---|---|---|---|---|
| **Geneformer V2-104M** | sc-FM | 104M | 64× A100 80GB | 6,656 | **~$17k** | ✅ 已披露 | NVIDIA BioNeMo recipe |
| Geneformer V2-316M | sc-FM | 316M | 128× A100 | 11,576 | ~$30k | ✅ 已披露 | NVIDIA BioNeMo recipe |
| Virchow2 | 病理 | 632M | 512× V100 32GB | ~140,000 | **~$170k** | ✅ 已披露 | Zimmermann 2024 arXiv |
| Virchow2G | 病理 | 1.85B | 512× V100（同一机群） | ~280,000 | ~$340k | ✅ 已披露 | Zimmermann 2024 arXiv |
| **Evo2 (40B)** | 基因组 | 40B | 2,048× H100 | ~2,000,000 | **~$5M** | ✅ 已披露 | Brixi 2026 *Nature* + NVIDIA |
| **ESM-3 (98B)** | 蛋白质 | 98B | （披露 10²⁴ FLOPs） | ~990,000 H100-eq | $2.5M–$8M | ✅ 已披露 | Hayes 2025 *Science* |
| AlphaGenome | 基因组 | ~450M | 每副本 8× TPU v3 × 4 折集成 + 蒸馏 | 未知 | ~$200k 估计 | ⚠️ 部分 | Avsec 2025 *Nature* |
| **scGPT** | sc-FM | 51M | 未知 | 10³–10⁵ A100-h（50× 区间） | $2.6k–$250k 估计 | ❌ 未知 | Cui 2024 *Nat Methods* |
| UNI2-h | 病理 | 681M | 未知（"大量 A100"） | ~30,000 估计 | ~$75k 估计 | ❌ 未知 | Chen 2024 HF card |
| UCE | sc-FM | 650M | 未知 | 1,275–70,000 A100-h | $3k–$175k 估计 | ❌ 未知 | Rosen 2024 *Nat Methods* |
| STATE | sc-FM | 600M SE + ST | 未知 | 未知 | ~$125k 估计 | ❌ 未知 | Adduri 2025 bioRxiv |
| TranscriptFormer | sc-FM | 100M+ | 未知 | 未知 | 未知 | ⚠️ 部分 | Pearce 2025 *Science* |
| Generative VC POC | sc-FM (POC) | 微小 | 1× 消费级 GPU | <100 | **<$250** | ✅ 已披露 | Lewis & Zueco ICLR 2026 |

**方法论**：FLOPs ≈ 6 × 参数 × token（Chinchilla 经验法则，Epoch AI 2024）。小时 → 成本按按需价：A100 80GB 约 $2.5/小时（DGX cloud），V100 32GB 约 $1.20/小时，H100 约 $2.5–4/小时，TPU v3 约 $2/小时（厂商定价）。

## 矩阵显现出的四个模式

### 1. 披露与硬件赞助相关

每一个 ✅ 已披露的条目都有 NVIDIA / DGX-Cloud / TPU 联合署名或框架伙伴关系。*没有* 硬件联合推广方的学界实验室披露得少得多——这是结构性的，不是随机的。披露本身就是一件联合推广的产物。

| ✅ 已披露 | 赞助方 |
|---|---|
| Geneformer V2 | NVIDIA BioNeMo（Theodoris 实验室） |
| Virchow2 | Paige 的 V100 机群 |
| Evo2 | NVIDIA + DGX Cloud（Arc + NVIDIA 论文） |
| ESM-3 | EvolutionaryScale 的 H100 机群 |
| AlphaGenome | Google TPU v3（部分） |

| ❌ 未知 | 实验室 |
|---|---|
| scGPT | Bo Wang 实验室（无硬件联合推广方） |
| UNI / UNI2-h | Mahmood 实验室 |
| UCE | Leskovec + Quake / Stanford |
| STATE | Arc Institute（这一个没有联合署名方） |

### 2. 2 万美元下限——最便宜的可复现 sc-FM 训练是什么？

**Geneformer V2-104M_CLcancer**：64× A100 80GB × 4 天 8 小时 = 6,656 A100 小时 = **按需 $16,640**。再加上约 3 千美元用于 1,400 万癌症细胞的持续预训练步。**全包 2 万美元，完全披露，NVIDIA BioNeMo recipe 公开。** 这是唯一一个小实验室能从完整 recipe 核验成本的、已发表的学界 sc-FM 训练。

低于 2 万美元的一切要么是 POC（Lewis & Zueco，250 美元），要么未披露。高于 2 万美元 *且也披露* 的一切都需要一个硬件伙伴。

### 3. 500 万美元上限——披露中最昂贵的生物学 FM 是什么？

**Evo2 (40B)**：NVIDIA DGX Cloud（AWS）上的 2,048× H100，"数月"。约 200 万 H100 小时，按需约 500 万美元。Evo2 的 *Nature* 论文明确披露："约为 AlphaFold 的 150× 算力，约为 ESM-3 的 2× FLOPs"——这是 2025–2026 年发表的最干净的跨模型算力比。

**ESM-3 (98B)**：在 *Science* 中作为单一数字披露的 1.07 × 10²⁴ FLOPs。从业者可以在自己偏好的硬件上对任何等价的 FLOPs 预算做成本比较。EvolutionaryScale 把这个数字作为该领域的算力参照点发布。

### 4. 病理 FM 居于中档（$75k–$340k）且比 sc-FM 披露更多

病理家族是 *透明度异类*。Virchow2 / Virchow2G 公布硬件数量 + 患者级出处。UNI / UNI2-h 把算力藏在"大量 A100 小时"之后。这一分化是机构性的：Paige（商业分拆，需要硬件披露以获供应商信任）vs Mahmood 实验室（学界，无联合推广方）。

## 这对小实验室规划意味着什么

**你在预训练上无法竞争。** 500 万美元集中在全球约 5 家机构。即便是 17 万美元（Virchow2）也需要一家商业病理实验室才能调动的 V100 机群。没有 NVIDIA 联合署名的学界单细胞实验室，无法从已发表的 recipe 复现一次前沿 sc-FM 训练运行。

**但小实验室的剧本不是预训练。** 它是：

- **赛道 1——冻结嵌入工作**（$0–$500）：仅推理，1× 消费级 GPU，数周。
- **赛道 2——PEFT / LoRA / 适配器**（$500–$5k）：1–8× A100 数天，2–4 个月。适配器是贡献；预训练是租来的。
- **赛道 3——领域专用小型 FM**（$10k–$50k）：在你的疾病领域复刻 Geneformer V2-104M_CLcancer 剧本。6–12 个月。
- **赛道 4——复现 / 批评**（$0–$2k）：推理 + 线性回归。Ahlmann-Eltze 以低于 2 千美元就让整张 sc-FM 扰动预测排行榜退役。

完整的 9 赛道预算层级概览见 [小实验室——该构建什么](small-labs-what-to-build.md)。

## 如何读一项算力主张

当你看到一篇论文声称某个 FM 训练耗资 X 时，核查：

1. **已披露 vs 已估计 vs 未知。** 作者是否陈述了 GPU 数量、小时数和硬件类型？如果他们只说"大量 A100 小时"，那就是未知——粗略估算有很宽的不确定性带。
2. **单次运行还是多次？** 前沿训练运行常常重试。报告的成本通常是 *成功* 那次的。若一篇论文说"我们在 64 个 A100 上训练了一周"却不说之前有多少次失败运行，按真实总成本乘以 2–10×。
3. **推理成本 vs 训练成本。** 有些论文把两者混为一谈。训练是一次性的且昂贵；推理是按次的且便宜。对赛道 1（冻结嵌入）而言，只有推理才要紧。
4. **预训练成本 vs 微调成本。** 若论文报告"训练耗资 $X"，核查那是仅预训练，还是包含下游微调。微调通常比预训练便宜 10–100×。
5. **软件栈。** NVIDIA BioNeMo、JAX、MosaicML 等每一种每 FLOP 都有不同的成本特征。一篇带 BioNeMo recipe 的 NVIDIA 联合署名论文是最可复现的披露模式。

## 下一步去哪儿

- **[基础模型——全景现状](foundation-models-state-of-play.md)**——本成本矩阵所处的跨家族地图。
- 带运算过程的更完整资源表存放在演讲的算力补充矩阵中。
- **[`_resources-matrix.md`](../_resources-matrix.md)**——完整的算力 / 成本 / 团队 / 数据矩阵，带 已披露 / 已估计 / 未知 标签并展示运算。
- **[NVIDIA BioNeMo 训练 recipe](https://github.com/NVIDIA/bionemo-framework)**——Geneformer V2 唯一公开的训练成本复现 recipe。
- **[Epoch AI 训练算力方法论](https://epoch.ai/blog/estimating-training-compute)**——FLOPs ≈ 6 × 参数 × token 的经验法则。
- **[Cottier et al. 2024 *arXiv*](https://arxiv.org/abs/2405.21015)**——"The Rising Costs of Training Frontier AI Models"——本语料所遵循的方法论。

---

*最后更新于 2026-05-13。*
