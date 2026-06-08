---
title: '结果优先 —— 把 HRD 当成特征，不当成筛选条件'
date: '2026-06-03 14:57 CT'
topics:
  - hrd
  - pan-cancer
  - cate
  - mixture-of-experts
  - parpi
  - model-design
  - reframe
summary: '上一篇模型设计的更锋利重写 —— cohort 按 treatment 不按 HRD，HRD 退化成一个输入特征，HRD 阴性响应者由此可被发现。'
starred: true
---

# 结果优先

接 [[one-model-many-archetypes]] 那一篇的重写。上一篇的入口是 **HRD 阳性**：在 HRD+ 病人里预测谁响应 PARPi。这一篇换个入口：**不从 HRD 进**。从 **treatment** 进 —— 所有打过 PARPi 的对象 —— 让 HRD 退化成一个输入特征，权重让模型自己学。

模型骨架不变（多模态 MoE + DragonNet 风格 CATE 头），但 cohort 定义不一样、对生物学的 framing 不一样、证伪也更锋利。

## 概念

cohort 是 **任何打过 PARPi 的对象**，PDO、PDX、临床都算，**不按 HRD 状态过滤**。label 是响应：PDO 用 ΔlogIC50，PDX 用 Δ肿瘤体积 AUC，临床用序数 CR/PR/SD/PD。特征里包含 HRD scorer 的 concordance vector（HRDetect、CSI-HRD、CHORD、scarHRD 全部当输入），加上其他所有轴（免疫状态、复制压力耐受、抗原呈递、stromal niche、CCR8/eTreg 负荷）。模型从 treatment label 学响应生物学，HRD 不再是进入条件。

一句话：**问题不再是"HRD+ 的人会不会响应"，而是"既然这个人打了 PARPi，他响不响应靠什么预测 —— 其中 HRD 的贡献占多少"。**

## 为什么这比上一种 framing 更准

三个理由。

**1. 绕开 HRD 定义这件事本身。** HRDetect ≠ CSI-HRD ≠ CHORD ≠ scarHRD，几个 scorer 的分歧是真的，到底哪个 "对" 没人拍得了板。结果优先把这四个全当输入特征 —— 让模型自己在上下文里学权重。没有哪个 scorer 被特别对待。scorer 之间的分歧不再是训练前要解决的问题，它直接 *变成* 训练信号。

**2. 让 HRD 阴性响应者能浮出来。** 训练前先按 HRD+ 过滤，等于结构上拒绝承认 HRD 阴性 PARPi 响应者的存在 —— 哪怕真的存在。有不少 suggestive evidence 显示他们确实存在：BRCAness 表型但没有典型基因组 scar、复制压力耐受型的肿瘤、IFN 驱动的响应者。结果优先给他们留位置。

**3. 直接对得上 PDO/PDX 这种 "treatment 不带偏差" 的数据。** 在人身上，PARPi 大多数时候开给 HRD+ 病人，treatment selection bias 非常严重。但在 PDO/PDX 筛选里，**每一条 line 都会被 PARPi 打一遍，不管 HRD 是什么状态。** 这就是结构上无偏差的来源。结果优先把这个来源放到主位，不当辅助。

## 假设

PARPi 响应是被少数几个生物学 archetype 驱动的。HRD 信号 —— 不管你信哪个 scorer —— 是这些 archetype 里最强的单一预测器，但不是唯一的。其他几个轴（IFN 状态、抗原呈递、CCR8/eTreg 负荷、复制压力耐受、stromal 可达性）贡献了 HRD score 单独抓不到的方差。MoE gating 还原这些 archetype，CATE 头估计每个病人的 treatment effect。

一个具体可检验的预测：模型会在 PDO/PDX 数据里找到 **至少一个 HRD 阴性、PARPi 响应** 的 archetype，并且这个 archetype 在能拿到组学的临床队列里能被部分还原出来。

## 这套 framing 能解锁什么

三个 HRD 优先版本在结构上做不到的发现：

1. **HRD 阴性的响应者。** 现在没人会给开 PARPi 但其实会获益的病人。临床上单独这一条就有意义 —— 它在扩大可入组人群，不是在缩小。
2. **HRD 阳性的非响应者。** 在 HRD 富集的试验人群里，谁注定会失败、不应该上这个药？HRD 优先的模型只能做 "HRD 强 vs 弱"，结果优先把 HRD+ 内部的响应 archetype 拆开。
3. **HRD 自己的机制分解。** 如果模型说 HRD score 和 IFN signature 都预测响应、但分到不同的 routing 分支上 —— 那就是一个可证伪的机制断言：到 PARPi 敏感性有两条路，不是一条以 HRD 当 universal gate。

下游那个 PARPi + anti-CCR8 联合试验入组方案还是能跑 —— anti-CCR8 只发给路由到 dHpC 类 archetype 的病人 —— 但现在那个 archetype 是 gate **算出来的**，不是预先按 HRD 分层切出来的。

## 数据 —— 五层还是那五层，但角色变了

数据计划还是 [[the-five-layer-dataset-plan]] 那张图，变的是每一层在这套 framing 里扮演的角色。

**Layer 1 —— HRD 定义。** 不再是 cohort gate。HRDetect、CSI-HRD、CHORD、scarHRD 每个 sample 给一个分，四个分组成 concordance vector 一起进模型。scorer 之间的分歧变成有信息量的输入，不是 labeling 时要解决的问题。

**Layer 2 —— 发现层 atlas（TCGA、HMF、CPTAC、单细胞 atlas、空间）。** 给 encoder 做 self-supervised 预训练。patient embedding 在见到任何 treatment label 之前，先在泛癌多组学分布上学到一个表征。

**Layer 3 —— 遗传扰动（Replogle、DepMap、CCLE、LINCS L1000、PRISM）。** 在这套 framing 下更靠中心了。Replogle 的 sgHR-gene + DepMap 的 PARPi 敏感性 + LINCS 的 PARPi profile 给出了细胞自主的 PARPi 响应信号，**包括 HRD+ 和 HRD-** 的细胞系。HRD 阴性但响应的 line 就是发现目标。

**Layer 4 —— 功能性响应（PDO + PDX）。** 这层现在是 supervised CATE 的 **主训练源**。PARPi vs vehicle 是对照，HRD 状态不当 filter。来源：PDO 用 Kopper 2019、Hill 2018、Tiriac 2018、Driehuis 2019、van de Wetering 2015；PDX 用 PDMR、EurOPDX、Xeva、HCMI。任何有 PARPi-vs-vehicle 数据的 line 都进，不看 HRD 分数。

**Layer 5 —— 临床响应（PROfound、MAGNITUDE、OlympiAD、OlympiA、SOLO-1、ARIEL3、NOVA）。** Held-out 验证，但要明确写清楚：这些队列因为试验设计的关系都是 HRD 富集的。它们验证的是 **在 HRD 富集这一层之内** 的响应预测 —— 这也正好对应真实世界 PARPi 处方的大部分情况 —— 但它们 **不** 验证非 HRD 响应者的发现；那个由 PDO/PDX 来验。

## 模型 —— 骨架不变，但有两处结构性变化

架构和 [[one-model-many-archetypes]] 那一篇一样：

```
                            输入（任意子集）
                                  │
        ┌──────────┬──────────┼──────────┬──────────┐
        ▼          ▼          ▼          ▼          ▼
     基因组      bulk RNA    sc-RNA     spatial    clinical
     encoder     encoder    encoder    encoder    encoder
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
         └────────┼────────┘
                  ▼
          CATE head (DragonNet-style)
          τ(z) = E[Y|T=1, z] − E[Y|T=0, z]
```

相对上一篇有两处结构性变化：

1. **HRD score 是一组输入特征**，不是 cohort filter。四个 HRD scorer 在 genomic encoder 里组成 concordance vector，和 HR 基因突变状态、CNA、突变 signature 这些一起进。
2. **cohort 定义按 treatment 走**，不按生物学走。每一条用 PARPi 打过的 PDO/PDX line 进 Stage 2 supervised 训练；每一个吃过 PARPi 的临床病人进 Stage 3 验证。任何阶段都没有 HRD 预 filter。

一个直接结果：propensity head π 在这套 framing 下比上一篇更重要 —— 因为试验里打过 PARPi 的人群不是随机的，是 HRD 富集的。π(z) 显式建模这个 selection，DragonNet 的结构对它做调整。

## 训练阶段

[[one-model-many-archetypes]] 那三个阶段（SSL 预训练 → supervised CATE → 试验队列 held-out）还是一样，但每一步的 cohort 定义现在是 treatment 基的，不是 HRD 基的。具体来说：

- **Stage 2** 是结果优先这套 framing 最显著的地方。每一条有 PARPi-vs-vehicle 数据的 PDO/PDX line 都进训练，不看 HRD 分数。HRD 只是 gate 能读的一个特征。
- **Stage 3** 是 selection bias 的容身之处。试验队列在 **HRD 富集的那一层里面** 验证模型。在这层上的表现告诉我们：模型对 "今天 PARPi 实际被处方的人群" 是否比 HRDetect 单独打分更准。

## 怎么证伪 —— 更锋利一条

上一篇那三条证伪测试（MoE 塌掉、试验 CATE 不相关、dHpC/dCpH 还原不出来）还成立。结果优先这套 framing 额外加一条、而且更狠：

**4. 找不到 HRD 阴性的响应 archetype。** 如果 gate 把每一个 PARPi 响应者（病人或细胞系）都路由到 HRD 特征主导的 archetype 上，分不出一组独立的 HRD 阴性响应者 —— 那这次重新 framing 就什么都没买到：HRD 真的就是 gate，上一篇 HRD 优先的版本就够用了。这条决定了 "重写值不值"。

## 我的真实判断

结果优先是科学上对的 framing。把 HRD 当 cohort filter 是个 category error：我们其实不知道怎么 reliably 定义 HRD，那么按它过滤就把 scorer 之间的分歧带进了 cohort。treatment 是清楚的 —— 要么打了 PARPi 要么没打。

但有一个真实的现实约束。**没有 HRD 但又打了 PARPi 的人群，在人身上又小又有偏。** HRD 阴性还能拿到 PARPi 的病人，往往是 refractory、off-label、或者扩大临床使用项目里出来的 —— 他们不是 "随机 dose PARPi 给非 HRD 病人" 的代表性样本。所以 HRD 阴性响应者的发现，结构上一定是从 PDO/PDX 里出来，不是从人身上。临床验证队列大多数情况下只能告诉我们 "HRD 富集层内部" 的预测准不准。

这没什么不好 —— 它只是说，PDO/PDX 从 "Stage 2 训练源" 变成了 **整个项目的结构中心**。试验队列在它们覆盖的那一块世界里做验证；PDO/PDX 验证试验从来 sample 不到的另一块世界。

最初那个 naïve 问题是 "能不能就一个模型"。第一次的回答是 MoE + CATE。更锋利的回答是：MoE + CATE，**cohort 按 treatment 定义、HRD 当特征，PDO/PDX 优先训，临床试验做 in-stratum 验证、PDO/PDX 做 out-of-stratum 发现。**
