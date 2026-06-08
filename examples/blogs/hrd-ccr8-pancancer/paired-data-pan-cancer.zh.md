---
title: '配对数据 —— 在泛癌公开队列里搜"肿瘤基因组 × TME"该怎么搜'
date: '2026-06-03 14:57 CT'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - paired-data
  - dataset-strategy
summary: '一张五层图 —— 把"基因组事件 × TME"这个问题需要的多模态配对公开数据按完整度分层，说明为什么"配对"是整件事的关键，以及"高 N bulk" 和 "低 N spatial" 之间的桥到底搭在哪。'
starred: true
---

# 配对数据 —— 泛癌搜索 "肿瘤基因组 × TME"

一篇关于怎么在公开泛癌数据里搜的笔记，当真正想问的问题是 **基因组事件怎么和 TME 互动** —— 一边是 HRD、LOH、BRCA loss、HLA loss、IFN/STING loss、癌基因扩增；另一边是 CD8 exhaustion、抑制性 macrophage、stromal exclusion、IFN-driven 炎症。

结构性的难处不在于"有没有数据"。在于 **"同一个病人身上"** 有没有你需要的那几种模态。这个约束让公开数据的可用范围一下子掉好几个数量级。

这篇博客把这块"塌下去的"地图画出来，然后给一个搜索策略。它放在 [[the-five-layer-dataset-plan]] 旁边（那篇是基因组优先的视角），同时也是 [[outcome-first]] 那个 framing 真正能跑起来需要的基础 —— 因为在 PARPi 治疗过的病人上拿到多模态配对数据，是 outcome-first 成立的前提。

## 理想的那一整套

把 "基因组 × TME" 完整答案需要的八种模态摆出来：

| 模态 | 告诉你什么 |
| --- | --- |
| WES / WGS / SNP / CNV array | 突变、CNA、LOH、HRD 分、HLA loss、neoantigen load —— *肿瘤基因组上发生了什么* |
| bulk RNA-seq | 免疫 signature、通路分、IFN 响应、抗原呈递 —— 但是肿瘤和 TME 混在一起的平均 |
| scRNA-seq | 每种细胞独立的程序 —— 肿瘤 vs T vs macrophage vs CAF vs 内皮 —— *是哪种细胞在响应* |
| scDNA-seq / scRNA inferCNV | 把基因组改变和具体的恶性 clone 挂钩 —— *这个 clone 对应这种 TME 状态* |
| multiome / scATAC | 染色质可及性、控制免疫逃逸 / IFN / stromal 重塑的 TF 回路 |
| spatial transcriptomics（Visium、Slide-seq） | niche 尺度的 tumor–immune–stromal 物理组织结构 |
| spatial proteomics（IMC、CODEX、MIBI、mIF） | 空间上的蛋白层面免疫表型 —— PD-1、PD-L1、CD8、FOXP3、HLA、STING |
| H&E / 组织学 | 形态、结构、坏死、stromal 屏障、血管分布 —— 也是组织学 × 分子多模态模型的底层 |

一句话框：**基因组告诉你发生了什么，sc 告诉你哪些细胞在响应，spatial 告诉你它们有没有在物理上互动。**

## 配对数据这个约束

绝大多数公开队列都是 *模态深但病人浅* —— 一个非常漂亮的 sc atlas，但没有匹配 WGS；或者一万人级别的 WGS 资源，但没有空间。一旦你要求 *同一个病人*（而且最好是同一块组织）被多种模态测到，可用世界从 "公开数据全景" 缩到只剩几个队列。

这不是抱怨。这就是这个项目的核心数据策略问题。

## 五层地图

| tier | 同一病人的模态组合 | 谁有 |
| --- | --- | --- |
| 1 —— 主力（高 N、分辨率低） | WES/WGS + bulk RNA + clinical | TCGA（~11k 泛癌）、PCAWG（~2.8k WGS+RNA）、HMF（~5k 转移性 WGS+RNA+治疗）、CPTAC（~1k + 蛋白）、POG570（BC Cancer 转移性）。MSK-CHORD 在 panel 层面加 outcome（~25k）。 |
| 2 —— sc 配上基因组 | WGS/WES + scRNA 同一病人 | Vázquez-García 2022（HGSOC，~42 配对）、Bassez 2021 BIOKEY（乳腺 IO，pre/post）、Wu/Swarbrick 2021（乳腺）、Olbrecht 2021（HGSOC 子集）、Pal 2021（BRCA1 携带者）、Hwang 2022（PDAC）。全部是癌种特异性。 |
| 3 —— spatial 配上基因组 | WGS + 空间组学 同一病人 | Stur 2022（HGSOC Visium + WGS 子集）、Launonen 2022（mIF + HRD）、10x 公开数据、零散的 Visium+WGS 论文。很少。 |
| 4 —— 全套都在 | 基因组 + sc + spatial 全在同一病人 | **HTAN**（Human Tumor Atlas Network）是唯一为这个目的建的资源 —— BRCA、CRC、OVARIAN、PDAC、BRAIN、PRE-CANCER、PEDIATRIC 这几个 atlas，加 Hwang 2022 PDAC。全部公开来源加起来全球可能 <500 个病人。 |
| 5 —— 治疗暴露 + 多模态 | tier 2 或 4 + 临床响应 | BIOKEY（乳腺 pre/post anti-PD-1）、NEONIPI CRC、新辅助乳腺队列。"基因组事件 → TME 状态 → 响应" 这条因果链 **只有在这一层** 可以真正被检验。 |

## 每一层是用来干什么的

- **Tier 1** 是基因组事件能拿到统计 power 的地方。"HRD 会不会在泛癌 bulk RNA 上改变 IFN signature？" —— 这是 TCGA × HMF 的问题，N 上千，几天就能出答案。
- **Tier 2** 是把信号定位到细胞类型的地方。"在 HRD+ 肿瘤里，IFN 信号到底是来自恶性细胞、macrophage 还是 CD8？" —— 这种问题需要 Vázquez-García 风格的 WGS + scRNA 配对，而且答案是癌种特异的。
- **Tier 3** 是问 "组织结构" 的地方。"HRD 阳性的恶性 niche 离 CD8 浸润更近，还是离 immune-excluded 的 CAF 区更近？" —— 需要 Visium + WGS，而且要 per-niche 的基因组 call。
- **Tier 4** 是 grounding 层。HTAN 的几个 atlas 是公开数据里唯一三种分辨率全部叠在同一个病人身上的地方。N 小，但机制要在这里落地。
- **Tier 5** 是因果检验。没有 pre/post 配对的治疗数据，你只能描述相关性，分不清 "TME 状态导致响应" 和 "TME 状态只是和基因组事件 *碰巧一起出现*"。

## 为什么这个问题应该以 HTAN 为骨架

HTAN 是唯一一个 **公开** 的、明确为 **泛癌多模态配对采集** 设计的资源。WGS + scRNA + spatial 同一病人，跨多个癌种，是建构上就这么定的。如果一个项目把 "同一病人上的基因组 × TME" 作为分析单元，那 HTAN 就是结构骨架 —— TCGA / HMF 是两翼提供 N。

这和大家通常的直觉相反（"从 TCGA 开始"）。对纯基因组问题，TCGA 是对的入口。对 **基因组 × TME** 问题，是 HTAN。

## 搜索策略 —— 先按 "模态组合" 搜，不先按癌种

除了癌种，两个值得用来 index 的轴：

1. **按模态组合搜，不按癌种搜。** 我们的问题是 *哪种基因组事件驱动哪种 TME 状态*，癌种是次要的。先按组合 scope（"哪些队列有 ≥30 个病人同时有 WGS + scRNA + spatial？"）能在你 commit 到某个组织之前回答 "这个问题到底可不可做"。
2. **按治疗暴露搜。** 未治疗 → 治疗的配对队列（特别是 IO 和 PARPi）是 "基因组事件 → TME 状态 → 响应" 这条链能被检验的地方。未治疗的 atlas 大多数情况下只能描述相关。BIOKEY 风格的设计是对 [[outcome-first]] 那个 framing 最关键的一类数据。

## 桥 —— 项目实际的形状

诚实的约束：tier 4（全套配对）全公开来源加起来全球 <500 个病人。对绝大多数有意思的基因组事件，你要么有 *高 N bulk*（TCGA、HMF）、要么有 *低 N sc+spatial*（HTAN、单癌种队列）。**两者你拿不全。**

所以项目的形状是 **搭桥**，不是挑一个 tier：

- Tier 1 检测信号 —— HRD / HLA-loss / IFN-loss 在 bulk 上有没有改变 TME 相关 signature、在哪、改变多少？
- Tier 2–3 定位信号 —— 这个信号在细胞类型或 niche 层面具体落在哪？
- Tier 4 把机制 ground 住 —— 三种分辨率叠在同一病人身上时，真实的 co-variation 是什么样？
- Tier 5 检验因果 —— 这些 "基因组事件驱动的 TME 偏移" 在 pre/post 配对数据里，能不能预测治疗响应？

这也是 [[one-model-many-archetypes]] 那个模型骨架对的形状。cross-modal attention + masked-modality training 从设计上就把配对数据稀缺这件事当默认 —— 它就是为了能在 tier 1 大规模学 encoder、在 tier 2–3 学癌种特异的细胞响应、把 tier 4 当 joint grounding 而做的。

## 收尾

搜索策略最短的版本：

- 按 **同一病人的模态组合** 给公开队列建 index，不按癌种
- 把 HTAN 当 "基因组 × TME" 的结构骨架，TCGA / HMF 当高 N 两翼
- 优先 **治疗暴露的配对队列**（BIOKEY、NEONIPI、新辅助），因为因果只能在那里测
- 接受 "搭桥" 是项目形状这件事 —— 没有任何一个单独的数据集能回答这个问题
