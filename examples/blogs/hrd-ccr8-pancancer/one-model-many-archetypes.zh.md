---
title: '一个模型，多个原型 —— PARPi 响应预测模型的概念与设计'
date: '2026-06-03 19:57 UTC'
topics:
  - hrd
  - pan-cancer
  - cate
  - mixture-of-experts
  - parpi
  - model-design
  - concept
summary: '一个跑在多模态病人表征上的 mixture-of-experts CATE 模型，学的是"哪种病人属于哪种响应机制" —— 概念、假设、意义、端到端设计。'
starred: true
---

# 一个模型，多个原型

这是收尾那个模型的概念说明。到这一步，仓库已经把泛癌 HRD 的问题拆成五层的发现 → 验证管线（[[the-five-layer-dataset-plan]]），也找到了缝（[[whats-already-out-there]]）。这篇博客回答更难的问题：**我们最终要训的那一个模型，长什么样？吃哪些数据？为什么是这种结构才配得上这套生物学？**

写法按 grant 来。概念、假设、意义、方案。

## 概念

我们要学的是 **PARPi 的 conditional treatment effect (CATE)**，跨整个泛癌 HRD landscape，从一个多模态的患者表征出发，用 **mixture-of-experts (MoE)** 架构。每个 expert 编码 HRD 响应生物学里的一种 archetype，gating network 的路由本身就是可解释的 biomarker 输出。模型在 PDO 和 PDX 的功能性 PARPi 响应上做 supervised 训练，在泛癌多组学 atlas 上做 self-supervised 预训练，在 PARPi 临床试验队列上做 held-out 验证。

一句话：**模型预测的不是"这个病人会不会响应"，而是"这个病人属于哪种响应机制，以及在那个路由下 PARPi 的预期效应是多少"。**

## 假设

HRD 阳性病人不是一个 class，是一个 mixture，沿几个轴分裂：

- 免疫状态（dHpC vs dCpH —— Hjazi 2025 已经看出来的 deficient-Hot / Cold 分裂）
- 复制压力的耐受度
- 抗原呈递和 HLA 完整性
- 基质 niche 组成、T cell 的空间可达性
- CCR8 / eTreg 负荷

PARPi 响应由病人属于哪个 archetype 决定，不只是 HRD 状态。一个 CATE + MoE 模型能从多模态特征里同时还原 archetype 归属和病人层面的 treatment effect；gate 的路由会对应 —— 并部分解释 —— 已知的耐药 / 敏感机制。

## 意义

1. **biomarker 问题换个形状。** "谁对 PARPi 响应"不再是单 biomarker 的分类问题，变成 archetype routing 问题，让模型结构对齐 Hjazi 2025 和 Hu 2025 已经看到的生物学结构。
2. **可解释的亚群输出，能当 stratifier 用。** 每个病人在 gate 上的路由分布，就是交付物 —— 不是黑箱打分，是 archetype 命名，可以直接挂到临床试验的入组标准上。
3. **闭合那条五层链。** Layer-5 临床扰动需要 stratifier，这个模型就是 stratifier。
4. **给后续 trial 提供 eligibility schema。** 也就是这个项目最终指向的 PARPi + anti-CCR8 联合试验 —— anti-CCR8 只发给路由到 dHpC 类 archetype 的病人。

## 用哪些数据，怎么合到一个模型里

模型要吃异质的模态，而且**没有任何一个队列覆盖所有模态**，所以"模态缺失"必须是默认假设而不是特例。

### 每个病人的输入

- **基因组（WGS / WES / panel）。** HRD 分数（HRDetect 当主分，CSI-HRD、CHORD、scarHRD 作为辅助输入构成 *concordance vector*）、HR 基因突变、CNA、突变 signatures、MSI、POLE/POLD1、Lynch。
- **Bulk 转录组。** 通路 summary signature：HRR、IFN-α/β、cGAS-STING、抗原呈递、CCR8/eTreg、T cell exhaustion、复制压力、EMT、stroma。
- **单细胞。** 细胞类型组成向量（免疫 + 基质 + 肿瘤）、各 compartment 的状态 marker（CD8 exhaustion、eTreg 比例、macrophage polarization、CAF subtype）、肿瘤异质性指数。
- **Spatial（Visium / mIF / MIBI / Slide-seq）。** Niche 级别特征：T cell 到肿瘤的距离分布、immune exclusion、血管、TLS 是否存在。
- **临床。** 癌种、既往线数、铂类暴露史、BRCA 是 germline 还是 somatic、年龄、PS。

### 怎么合

考虑过三种：

| 策略 | 好处 | 坏处 | 结论 |
| --- | --- | --- | --- |
| early fusion（全部拼成一个向量） | 简单 | 高维、丢结构、缺一个模态就崩 | 否 |
| late fusion（每个模态一个模型，平均预测） | 处理缺失 | 看不到跨模态交互（HRD × IFN、BRCAness × CCR8） | 否 |
| **intermediate cross-modal fusion** | 每个模态单独 encode，再 join，学交互，缺失靠 mask 处理 | 设计面更大 | **选这个** |

最终方案：**per-modality encoders → cross-modal attention 拼成一个 joint embedding → MoE gating → CATE head。**

缺失模态的处理：**masked-modality training。** 训练时每个模态以概率 *p* 被丢掉，逼模型学会在任何子集上预测。推理时缺哪个 mask 哪个。这一步关键：TCGA 只给我们 WGS + bulk，sc 队列只有 sc，临床试验队列只有 clinical + panel —— 没有任何一个队列吃满所有输入。

## 模型设计

```
                            输入（任意子集）
                                  │
        ┌──────────┬──────────┼──────────┬──────────┐
        ▼          ▼          ▼          ▼          ▼
     基因组      bulk RNA    sc-RNA     spatial    clinical
     encoder     encoder    encoder    encoder    encoder
      (MLP)      (MLP)    (set-attn) (set-attn)   (embed)
        │          │          │          │          │
        └──────────┴──────────┼──────────┴──────────┘
                              ▼
                       cross-modal attention
                              │
                              ▼
                    joint patient embedding z
                              │
                  ┌───────────┴───────────┐
                  ▼                       ▼
              MoE gate g(z)          shared trunk
                  │                       │
                  ▼                       ▼
         ┌────────┼────────┐          propensity
       expert₁ expert₂ expert_K          π(z)
         │       │       │
         └───────┼───────┘
                 ▼
          CATE head (DragonNet-style)
          τ(z) = E[Y|T=1, z] − E[Y|T=0, z]
```

### encoders

- 基因组、bulk、clinical：带 layer norm 的 MLP。
- sc 和 spatial：**set transformer / DeepSet attention**，对细胞和 niche 排列不变，能 pool 数量不定的细胞 / spot。

### joint embedding

跨模态 attention，每个 token 带 modality-type embedding（join 层要知道这个 token 来自哪种模态）。输出一个 patient embedding *z*。

### MoE 头

K ≈ 6 个 expert，soft gating。每个 expert 是一个小 MLP，负责一个潜在 archetype 的响应生物学。gating 是稀疏的（top-k routing，k=2），为了可解释 —— 每个病人"主要"属于一个 archetype，附带一个次要的。每个病人的 gate 输出，就是 **biomarker 交付物**。

为什么用 MoE 而不是一个 MLP：一个 MLP 会把不同机制平均掉；MoE 把它们分开。dHpC 和 dCpH 就是同样 HRD 分数、**响应机制相反**的两种病人，gating network 是结构上唯一能编码这种"相反"的地方。

### CATE 头

DragonNet 风格：两个 outcome head μ₀ 和 μ₁（不打 PARPi 时的响应，打了 PARPi 时的响应），加一个 propensity head π 做调整。CATE = μ₁ − μ₀，每个病人一个。

这一系的架构参考：causal forests（Athey/Wager 2018）、DragonNet（Shi/Blei/Veitch 2019）、TARNet（Shalit 2017）、CEVAE（Louizos 2017）、Bayesian causal forests（Hahn 2020），加 MoE 这条线（Jacobs/Jordan 1991 → Shazeer 2017 → 现代 sparse MoE）。

## 训练分三阶段

**Stage 1 —— encoder 的 self-supervised 预训练。** 在无标签的泛癌多组学上做 masked feature reconstruction：bulk + 基因组用 TCGA、HMF、CPTAC；sc 用 CellxGene、3CA、TISCH2；spatial 用 Launonen 2022、Stur 2022。目标：让 encoder 在见到任何 treatment label 之前，就能从任意模态子集产出稳定的 embedding。

**Stage 2 —— 在功能性响应上做 supervised CATE 训练。** PDO PARPi IC50（Kopper 2019、Hill 2018、Tiriac 2018、Driehuis 2019、van de Wetering 2015）+ PDX PARPi 响应（PDMR、EurOPDX、Xeva、HCMI）。这里有干净的 *功能性 treatment label*：同一个模型 PARPi vs vehicle，IC50 差或肿瘤回缩当连续 outcome。CATE head 和 MoE gating 真正在这一步被训。

**Stage 3 —— 临床试验队列上 held-out 验证。** PROfound、MAGNITUDE、OlympiAD、OlympiA、SOLO-1、ARIEL3、NOVA —— 在能拿到组学的范围内。不在试验数据上 fine-tune，纯 held-out。指标：模型预测的 per-patient CATE 是否和真实 PFS/OS 差关联；archetype routing 是否还原已知的 responder/non-responder 亚群。

三阶段是有意拆的：Stage 1 学 *patient 表征*，Stage 2 学 *treatment effect*，Stage 3 测前两者能不能迁到真人身上。

## 响应 label 怎么对齐

PARPi 响应不是一个 endpoint。对齐方案：

- **In vitro（PDO）：** PARPi 和 vehicle 之间的 ΔlogIC50，按肿瘤类型 z-score。
- **In vivo（PDX）：** PARPi 和 vehicle 之间的 Δ肿瘤体积 AUC，z-score。
- **临床（trial）：** 序数响应 —— CR / PR / SD ≥ 6 个月 / SD < 6 个月 / PD —— 通过 cumulative-link 序数回归映到一个连续 latent，PFS hazard ratio 作为第二个对齐 anchor。

这个 latent 响应才是模型的 outcome。三种 label 在这里被合到一个可训练目标上。

## 这个模型能掉出来什么

- **每个病人的 CATE 估计**（PARPi 的预期获益）。
- **每个病人的 archetype routing**（gate 输出）—— 可解释 biomarker。
- **每个 archetype 的响应生物学** —— 每个 expert 学到了什么，对 expert 的输出做 integrated-gradients 就能恢复。
- **跨模态交互图** —— 哪些特征对（HRD × IFN signature、BRCA1-mut × CCR8 fraction）在驱动 routing。
- **Trial eligibility schema** —— CATE 预测 + archetype，能直接打包成 PARPi + anti-CCR8 联合试验的入组标准。

## 怎么能证伪

- MoE 塌掉了（gating 把所有病人 route 到同一个 expert），那要么 archetype 假设是错的、要么模型欠训、要么 patient embedding 没带 archetype 相关的信号。
- 试验队列的 CATE 和真实 PFS 差对不上 —— PDO/PDX → 人的迁移失败。
- archetype routing 还原不出 Hjazi 2025 的 dHpC/dCpH 分裂 —— 模型没收敛到有生物学意义的亚群上。

这三条都是 pre-register 的便宜测试，不是事后救火。

## 为什么这才是对的形状

一个线性或者单 MLP 的模型，会把这个项目存在的理由本身（那套生物学）平均掉。一个纯 causal forest 的 CATE estimator 能处理异质性，但拿不到可解释的 latent 结构。一个纯 clustering 模型能找出 archetype 但啥也预测不了。MoE + CATE 这种组合两边都拿：archetype 从 gate 来，treatment effect 从 CATE head 来，全在一个可训对象里。

最初那个 naïve 的想法是"一个模型"。这篇博客的答案是：行 —— 但那个对的"一个模型"，是 **跑在多模态患者表征上的 mixture-of-experts CATE，PDO/PDX 优先训，临床试验 held-out 验。**
