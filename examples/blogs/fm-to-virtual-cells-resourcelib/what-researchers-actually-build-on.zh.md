---
title: "大家到底在谁的基础上做研究？细胞基础模型的复用真相，以及用的到底是哪几个"
summary: "新人最常问的一个问题，这里给一个有依据的回答：单细胞 / 虚拟细胞基础模型里，研究者真正会去复用的是哪几个，又是怎么用的？直觉大体没错，但要补两句。第一，scGPT 和 Geneformer 确实遥遥领先——起步最早、工具最全、是几乎所有新论文的默认对照；Nicheformer 则是空间组学这一支最有希望坐上默认位置的新面孔；至于 UCE、scFoundation、CellPLM，被引的热度远高于真正被人拿来当底座的热度。第二，也是更要紧的两个澄清：一是被引并不等于上手用，真正的日常分析仍然是 scanpy / Seurat 配 scVI / Harmony，FM 就算用上了，多半也只是个冻结的嵌入器或者一个用来比较的靶子；二是「Tahoe」根本不是一个模型——Tahoe-100M 是数据集（Vevo/Tahoe Therapeutics 与 Arc 联合发布，1 亿细胞、1,100 种药、50 个细胞系），真正的模型叫 Tahoe-x1（3B 参数、开放权重，2025 年 10 月），和 Arc 的 STATE 站在一起。更新更大的这批模型，目前还没能在复用上把早起的那几个挤下去——一半是惯性和生态的问题，一半是 2025 年那场线性基线清算让人开始怀疑「堆规模到底有没有用」（当然，也有人正反过来赌：等数据堆到 Tahoe 这个量级，规模就有用了）。文章把复用的六种常见姿势讲清楚（冻结嵌入加一个头、微调/适配器、做基准评测、拿 FM 当基线、可解释性探针、再预训练），各配一篇代表作，最后落到这套行情对小实验室的启示：冻结嵌入这条路最便宜、也最被验证过，而这正是我们「生存场」这套押注的落点——冻结 Tahoe-x1 和 MoLFormer，外接一个新的头，拿 Tahoe-100M 当底料。"
---

> *这篇可以和[全景中枢](foundation-models-state-of-play.md)、[模型术语表](model-glossary.md)对照着读：它讲的是「行情」，而[那场清算](why-linear-baselines-win.md)讲的是行情背后的成因。它也把[五十个概念那篇](fifty-concepts-one-bet-v2.md)和[生存场模型](what-disappears-conditional-viability-v3.md)里的取舍落到了实处——我们复用 FM 的方式，和大多数人成功的方式没两样，只是把它对准了一个不一样的问题。*

## 这个问题里其实埋了两个坑

「大家好像都在用 scGPT、Geneformer、Nicheformer，是这样吗？那像 Tahoe 这种更新的呢？」直觉没错，但回答之前，得先把两个坑填上。

第一个坑：**被引多，不等于被用得多。** 引用量最高的模型，未必就是大家最愿意拿来当底座往上搭的那个；而这两者，又都不等于研究者真会在自己数据上跑起来的那个。三拨人有交集，但绝不是同一拨。混为一谈，画出来的地图就是歪的。

第二个坑：**别把数据集当成模型。** 「Tahoe」最容易把新人绊倒：Tahoe-100M 不是一个能拿去微调的模型，它是个**数据集**；真正的模型是另一个东西（Tahoe-x1）。这层区别一旦点破，「Tahoe 到底有没有被采用」这个问题的答案就完全不一样了。这两个坑先记着，下面基本都在绕开它们。

## 真正被反复使用的，是哪几个

直觉确实对：**scGPT**（[Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)）和 **Geneformer**（[Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)）是后续工作的两根顶梁柱。它们出道早，代码和权重都给得齐整（[scGPT 的 GitHub](https://github.com/bowang-lab/scGPT) 大约 1.6k star，[Geneformer 的 Hugging Face](https://huggingface.co/ctheodoris/Geneformer) 放了一整族 checkpoint），而且还有一层滚雪球效应：它们成了新论文「默认要拿来比一比」的对象，于是不管输赢，引用都一直在涨。**Nicheformer**（[Schaar et al., *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02814-z)；[代码](https://github.com/theislab/nicheformer)）来自 Theis 组，是空间组学这一支的新人——目前用的人还不算多，但它很可能像 scGPT 之于解离数据那样，坐上空间领域的默认位置。

再往后，是另一批「论文里常被提、真正被拿去搭东西却不多」的模型。**UCE**（[Rosen et al., bioRxiv 2023](https://www.biorxiv.org/content/10.1101/2023.11.28.568918)；[代码](https://github.com/snap-stanford/UCE)）几乎只当冻结的零样本嵌入器用——它的设计本来就没留微调的口子。**scFoundation**（[Hao et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02305-7)；[代码](https://github.com/biomap-research/scFoundation)）最常见的用法是配 GEARS 做扰动。**CellPLM**（[Wen et al., ICLR 2024](https://openreview.net/forum?id=BKXvPDekud)）则更多是出现在别人的评测表里，而不是被当作底座。

| 模型 | 定位 | 复用热度 | 最常见的用法 |
|---|---|---|---|
| **scGPT** | 解离 scRNA FM | 复用最多；约 1.6k star；默认对照对象 | 冻结/零样本嵌入器，偶尔微调 |
| **Geneformer** | 解离 scRNA FM | 另一个默认；HF 上一族 checkpoint | 微调做分类 + 计算机模拟扰动 |
| **Nicheformer** | 空间 + 解离 FM | 空间组学新人，采用尚早 | 空间任务上的线性探针 / 微调 |
| **UCE** | 通用嵌入器 | 一般；只当嵌入器 | 冻结的零样本嵌入 |
| **scFoundation** | 感知测序深度的 FM | 一般；偏扰动 | 嵌入 + GEARS 做药物/扰动 |
| **CellPLM** | 细胞即 token 的 FM | 多半是评测表里的一行 | 被提及多，被搭建少 |

## 复用的六种姿势

把模型名字撇开，后续工作其实就这六种姿势，大致按常见程度从高到低排：

1. **冻结嵌入，外接一个轻量头。** 把 FM 当成固定编码器跑一遍，再训一个线性或小 MLP 的头，做细胞类型注释或标签迁移。这是占绝对多数、也最省钱的玩法——UCE 和零样本 scGPT 就活在这里，小实验室一台机器加一块卡就能跑起来。
2. **微调 / 适配器。** 让骨干网络专门去啃某个任务——扰动、疾病状态、空间生态位——通常用 LoRA、FiLM 这类适配器，而不是整个重训。Geneformer 是最经典的微调对象，scFoundation 配 GEARS 是做扰动的套路。
3. **基准评测。** 这类论文的成果本身就是「那张比较表」：FM 之间互比，再跟线性 / HVG / scVI 这些基线比。[Kedzierska et al., *Genome Biology* 2025](https://link.springer.com/article/10.1186/s13059-025-03574-x) 和 [Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02772-6) 是绕不开的两篇。
4. **拿 FM 当基线。** 每个新模型（STATE、Tahoe-x1、xVERSE、TxPert）都要拿 scGPT/Geneformer/UCE 来垫底比一比——于是早起的那几个，靠「当标杆」又赚一波引用。
5. **可解释性 / 探针。** 在 FM 的残差流上挂稀疏自编码器、做注意力探针（[SAE 那篇, bioRxiv 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631)）——它暴露出的「调控逻辑缺口」，[可解释性那篇](interpretability-state-of-cell-fms.md)讲得更细。
6. **再预训练 / 持续预训练。** 很少见，而且基本是原作者自己在做（scGPT-spatial、Geneformer V2），因为这要的算力和数据底料，我们其他人根本凑不齐。

前两种是「在 FM 之上搭」，第三到第五种是「围着 FM 转」——而 2025 年之后，这个领域有相当大一块力气，是往第三种上挪的。

## 一个得说破的落差：被引，不等于真上手

抢眼的引用数字底下，藏着这么个事实：scGPT 和 Geneformer 称霸的是**文献**，不是**实验台**。绝大多数日常单细胞分析跑的还是那套老班底——流程用 scanpy / Seurat，整合用 **scVI**（[Lopez et al., *Nat Methods* 2018](https://doi.org/10.1038/s41592-018-0229-2)）/ scANVI / Harmony——scverse 那本「最佳实践」里推荐的默认路径，至今也是这些，而不是某个 FM。FM 真要出现在一项实打实的分析里，十有八九是在第一种姿势（一个冻结嵌入器）或第四种姿势（一个对照靶子）上，而不是当成生产流水线本身。

更关键的是，2025 年那场清算实打实地把后续工作从「往上搭」掰向了「挑毛病」。自从 [Ahlmann-Eltze & Huber](https://www.nature.com/articles/s41592-025-02772-6) 证明没有一个 sc-FM 能在扰动预测上赢过一个调好的线性基线、[Kedzierska et al.](https://link.springer.com/article/10.1186/s13059-025-03574-x) 又证明零样本的 scGPT/Geneformer 还不如 HVG/scVI/Harmony，「这个 FM 过没过线性这条线」就成了审稿人会随口一问的标准问题——来龙去脉见[为什么线性基线会赢](why-linear-baselines-win.md)。所以 2026 年的不少后续工作，是带着批判去做评测，而不是闷头往上接。

## 那些「更新」的模型，以及 Tahoe 这个误会

现在轮到第二个坑。**Tahoe-100M**（[Vevo/Tahoe Therapeutics 与 Arc, 2025](https://www.biorxiv.org/content/10.1101/2025.02.20.639398)）是个**数据集**——约 1 亿条单细胞转录组，覆盖 1,100 种小分子药物、50 个癌症细胞系，是 Arc 虚拟细胞图谱的第一炮，下载量 25 万次以上。它不是拿来微调的，你是在**它之上**训练。所以它的采用度其实已经**相当高**了——但那是「底料 + 基准」这个角色，也就是图谱该扮演的角色，而不是一个模型。

在它之上、或者跟它并行训出来的模型，才是真正更新的那批。**Tahoe-x1**（[Tahoe Bio, 2025 年 10 月](https://www.biorxiv.org/content/10.1101/2025.10.23.683759)；[权重在 HF](https://huggingface.co/tahoebio/Tahoe-x1)）是个把规模拉到 3B 参数、开放权重的单细胞 FM——到 2026 年中也才问世几周到几个月，外面跟进的工作还很少。**STATE**（[Arc Institute, 2025](https://www.biorxiv.org/content/10.1101/2025.06.26.661135)）是 Arc 主打扰动的 FM，定位成一个「可以被反复调用的产品」（有版本、有维护），而不是发一篇就完事的基准——这是一种机构层面的押注：真正驱动采用的，是稳定性和支持，不只是准确率。

那么，更新更大的模型，把 scGPT 和 Geneformer 在复用上挤下去了吗？**还没有。** 三个原因。一是惯性和生态——早起的那几个攒了好几年的教程、封装和 StackOverflow 上的现成答案。二是太新——Tahoe-x1 和 STATE 还没来得及攒下游论文。三是清算本身——当头条结论是「堆大了也没赢过线性基线」时，换去用一个 3B 模型的动力自然就弱了。出于公允，也得把另一边的赌注摆出来：[2026 年有一篇唱反调的预印本](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1)（《Foundation Models Improve Perturbation Response Prediction》）主张，只要数据堆到 Tahoe 这个量级，FM 在扰动预测上**确实**会变好——所以「更新的没用」这句话，在通往 2027 年的路上还是个没定论的实证问题，而不是盖棺定论。

## 这对我们这样的小实验室意味着什么

把这套行情倒过来看，其实就是一份现成的配方。真正奏效、大多数人靠它出活、又最省钱的，就是第一种姿势：**拿冻结的 FM 当编码器，再外接一个新的小头去训。** 这不是退而求其次，这是被反复验证过的正路，而且恰好就是我们这套押注的落点。[生存场模型](what-disappears-conditional-viability-v3.md)就是把 Tahoe-x1 冻起来当细胞编码器、把 MoLFormer 冻起来当药物编码器，只训一个小小的「风险 + 输运」头，再拿 Tahoe-100M 当底料——和这个领域早就验证过的复用方式如出一辙，只是对准了一个那些拥挤模型答不上来的问题：在一种你从没试过的药下，谁能活下来。对那些更大的模型，我们就照行情教的来用：Tahoe-x1 和 MoLFormer 当**冻结编码器**，Waddington-OT 和 moscot 当**基线**，Tahoe-100M 当**底料**，并且从第一天起就拿[线性基线当标杆](why-linear-baselines-win.md)来卡自己。这套行情真正的教训，不是「等那个会赢的模型出现」——而是：只要问题够新，那个最便宜、最多人用的姿势就够了。（这笔经济账，[小实验室那篇](small-labs-what-to-build-v3.md)算得很清楚。）

## 一句话结论

是的——大家真正拿来搭东西的是 scGPT 和 Geneformer，空间这一支由 Nicheformer 接棒；但被引不等于上手用（真正的流水线还是 scanpy + scVI），「Tahoe」是个数据集、它的模型 Tahoe-x1 是真的、却新到还没挤下谁，而那场清算又把不少后续工作变成了挑毛病——所以对一个小实验室来说，能走得久的反倒是最朴素的那一步：一个冻结的编码器、一个新的头、一份公开的底料，再加一条诚实的基线。
