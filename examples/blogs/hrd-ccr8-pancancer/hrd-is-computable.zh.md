---
title: 'HRD 是能算出来的 —— 但算的是哪个 HRD？'
date: '2026-06-03'
topics:
  - hrd
  - pan-cancer
  - label-imputation
  - scorer-disagreement
  - model-design
summary: '一条短记 —— HRD 不需要标注，从原始基因组就能算出来。但每一次算出来的 call 都继承了你训的是哪个 scorer，所以喂 concordance vector 比挑一个 scorer 更老实。'
starred: true
---

# HRD 是能算出来的 —— 但算的是哪个 HRD？

聊天里冒出来的一个小澄清，单独存一篇。它把 [[outcome-first]] 那个 framing 收紧一点，也解释了为什么 [[one-model-many-archetypes]] 里 genomic encoder 吃的是四个 scorer 组成的 concordance vector，而不是一个 HRD call。

## 容易的那半

你不需要 "这例是不是 HRD" 的标注才能做 HRD 研究。**label 是能从原始数据里直接算的** —— 前提是你拿到的模态本身带这个信号：

| 模态 | HRD call 算得出吗 | 谁读出来 |
| --- | --- | --- |
| WGS | 能，效果好 | HRDetect、CHORD、CSI-HRD、scarHRD 全部能从一对肿瘤-正常 WGS 端到端跑出来。读的是 SBS3（deletion-microhomology）、大片段重排 pattern、全基因组的 LOH 结构。 |
| WES | 能算一部分 | scarHRD 类的分还能算，但 SBS3 大半丢了。call 会弱。 |
| panel DNA | 只能到基因层面 | 抓得到 BRCA1/2/PALB2/RAD51/ATM 的突变状态。绝大多数 BRCAness —— 功能性 HRD 但没有典型 HR 基因突变 —— 抓不到。还会把那些已经有 reversion 突变、看起来还像 HR-mut 但功能上其实已经不 HRD 的肿瘤错误地保留下来。 |
| bulk RNA | 能训 imputation | BRCAness signature 是有的（Severson、Peng 那一系列），但比基因组 call 噪声大，而且会带训练队列的 bias。 |
| sc-RNA | 信号弱 | 单细胞层面没有干净的 HRD 信号。可以从 pseudobulk 反推，但会丢很多。 |
| spatial | 基本没有 | spot / pixel 级别的数据里没有直接的 HRD 信号。 |

所以对我们真正在用的发现队列 —— TCGA、HMF、PCAWG、CPTAC —— HRD 其实**早就在那里了**，不管原文有没有给 call。我们自己算就行。

## 难的那半

但是 "算 HRD" 和 "知道 HRD" 不是一回事。算出来的是 **某一个 scorer 定义下的 HRD**。HRDetect 的 HRD ≠ CHORD 的 HRD ≠ "有 BRCA1/2 突变"。四个 scorer 当年训的时候对的 anchor 不一样（BRCA1/2 突变体、BRCAness 表型、功能性实验），训的队列也不一样（HRDetect 偏乳腺、CHORD 是泛癌等等）。它们在具体的肿瘤上会给出不一样的答案 —— 而且这种分歧不是噪声，是几个 scorer **在测不同的东西**。

所以如果你训一个 "预测这例是不是 HRD" 的 imputer、对的是 scorer X，那你训出来的不是 "预测 HRD"，是 **预测 scorer X 的 HRD**。同一例肿瘤在 scorer Y 下会给完全不同的答案。

## 这件事对项目意味着什么

这正是 [[one-model-many-archetypes]] 里 genomic encoder 吃 **concordance vector** —— 四个 scorer 的输出都当独立输入 —— 而不是只塞一个 call 的原因。也是 [[outcome-first]] 把 HRD 当 feature 不当 filter 的原因。既然连 label 本身都是有争议的：

1. 让模型学 *预测响应*，不要让它学 *预测 HRD*。response 是唯一一个不继承 scorer 选择的 ground truth。
2. 算得出 HRD 分的（WGS、WES），四个全喂。让模型看到 scorer 之间的分歧。
3. 算不出 HRD 分的（panel-only、RNA-only、spatial-only），让模型自己 impute —— 但当成 **四个独立的 imputation**，每个 scorer 各算一遍，分歧本身就是信号。

## 短的答案

是的，HRD 能从数据里算出来，尤其是 WGS —— 不需要预先的标注。不是的，你算出来的不是 "HRD 的真值"；你算的是某个 scorer 的 call，四个 scorer 在真实肿瘤上确实会分歧。模型不该看到一个 HRD label。它该看到四个，并从分歧里学到信息。

这就是 concordance vector 存在的理由。
