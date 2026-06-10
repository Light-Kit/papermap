---
title: '不止 HRD —— 给泛癌 TME 搭一张基因组不稳定性的分类图'
date: '2026-06-09 15:20 CT'
topics:
  - hrd
  - msi
  - pan-cancer
  - tumor-microenvironment
  - genomic-instability
  - dataset-strategy
summary: 'HRD 只是 DNA 修复 / 基因组不稳定性这一大家族里的一员 —— 还有 MSI/dMMR、POLE/POLD1、TMB-high、APOBEC，以及"冷"的 CIN/WGD 对照臂。这篇把六个状态放到同一条 lesion → TME state → therapy axis 轴上，用 scar·signature·function 这套统一的测量母题串起来，并把 CCR8⁺ eTreg 放在 hot cluster 底下作为共用的 evasion lever（这一条是假设，会老老实实标出来）。'
starred: true
---

# 不止 HRD —— 一条不稳定性轴，六个状态，一个共用的 lever

这个项目一开始的 framing 是 **HRD × CCR8** —— 用 HRD 当基因组层面的 selector，用 CCR8⁺ effector Treg 当免疫层面的 lever，终点是一个 PARPi + anti-CCR8 的 basket trial。这个方向没错，但它比它能覆盖的范围窄。HRD 不是特例，它只是 **一整个 DNA 修复 / 基因组不稳定性家族** 里的一员：这些状态每一个都是 tissue-agnostic 的 biomarker，每一个都重塑 TME，而且大多数都汇聚到项目本来就瞄准的那个免疫 evasion 节点上。

从 HRD 扩到整个家族，不是把论点稀释了，是把它 **推广** 了。脊梁从"HRD 选 PARPi"变成：

> **基因组不稳定性 lesion → TME state → therapy axis** —— 而 CCR8⁺ eTreg depletion 是这条谱里"炎症那一端"共用的 resistance lever。

这篇和 [[the-five-layer-dataset-plan]]（基因组优先）、[[paired-data-pan-cancer]]（同一病人配对数据的约束）放在一起看。它的姊妹篇 [[imputing-instability-from-rna-2026-06-09]]，才是让 scRNA-only 队列能带着这些标签之一进入分析的那一步。

## 测量母题 —— scar · signature · function

这张图上每个状态都能从三个角度读，先把这三列点明，能让整个分类保持诚实 —— 因为它们并不总是一致，而不一致的地方恰恰是信息。

| 读法 | 抓的是什么 | 例子（HRD） |
| --- | --- | --- |
| **scar / score** | 过去不稳定性留下的累积 *记录* | Genomic Instability Score（LOH + TAI + LST）；Myriad myChoice 的切点 **GIS ≥ 42**（FDA P190014） |
| **mutational signature** | 突变谱里的 *过程* 指纹 | **SBS3**（"BRCAness"）；HRDetect（Davies 2017） |
| **functional assay** | 当下、实时的通路状态 | RAD51 foci（Llop-Guevara 2022） |

scar 是历史记录，function 是活的状态，signature 夹在中间。一个 BRCA reversion 的肿瘤仍然带着 scar，但 HR 功能已经恢复 —— 这正是 [[imputing-instability-from-rna-2026-06-09]] 重要的原因：表达反映的是 *当下* 状态，不是 scar。

## 真正把这个家族组织起来的，是哪条轴

把这些状态组织起来的，**不是** 原始突变数。是 **antigen presentation** —— 不稳定性到底是产生了能被免疫系统看见的 *presented* neoantigen、把 TME 点燃，还是反过来 *压制* 了呈递。这条轴把家族劈成两个 cluster。

### cluster A —— 热、修复缺陷（IO ± 可被 PARPi 撬动）

碱基层面或 DSB 层面的 lesion，产生 neoantigen，造出一个 T-cell-inflamed、IFN-γ 高的微环境。

**MSI / dMMR —— HRD 的双胞胎。** mismatch repair（MLH1、MSH2、MSH6、PMS2）失活 —— 最常见是 *MLH1* 启动子高甲基化，或 Lynch syndrome 里的胚系 —— 让微卫星 indel 得不到纠正，造出富含 frameshift neoantigen 的 hypermutator 表型。结果就是典型的 **热** 肿瘤：密集 CD8 浸润，外加一套代偿性的 checkpoint program（Llosa 2015）。这是和 HRD 最干净的对照 —— 两个都是 **tissue-agnostic、带 FDA 适应症的 DNA 修复缺陷 biomarker** —— 但下游生物学分叉了：MSI → 免疫治疗，HRD → PARP 抑制剂的 synthetic lethality。Pembrolizumab 的 **MSI-H/dMMR 适应症（2017）是史上第一个 tissue-agnostic 的癌症适应症**（Le 2017；FDA summary Marcus 2019），后来扩到一线转移性 CRC（Andre 2020，KEYNOTE-177）。MSI-H 有很陡的 lineage 偏斜 —— 子宫内膜 ~25–31%，结直肠和胃 ~15–20%，**其它几乎所有地方都低于 1–2%**（Bonneville 2017，39 癌种 landscape；Hause 2016）。这个偏斜是任何建在它之上的泛癌模型的核心 confounder。

**POLE / POLD1 校读缺陷。** 复制聚合酶的 exonuclease domain 突变废掉了校读 → *ultramutator* 表型（常 >100 mut/Mb），signature **SBS10a/b**，而且 —— 跟 MSI 不一样 —— 通常是 **微卫星稳定（MSS）** 的。这些肿瘤是所有状态里最 T-cell-inflamed 的之一，在子宫内膜癌四个分子亚型里预后最好（Kandoth 2013）；胚系变异导致 polymerase-proofreading-associated polyposis（Briggs & Tomlinson 2013）。纯 IO 轴，没有 PARPi 的理由。

**TMB-high（非 MSI）。** 不是单一 lesion，是一个聚合计数；**≥10 mut/Mb** 这个切点给 pembrolizumab 拿到一个 tissue-agnostic 适应症（2020，KEYNOTE-158）。要紧的 caveat：TMB **不是普遍预测性的** —— McGrail 2021 发现 neoantigen load 在肺癌/黑色素瘤/头颈癌里和 CD8 浸润、IO 应答耦合，但在乳腺、前列腺、glioma 里 **不耦合**，这些癌种里 TMB-high 肿瘤连 20% 的应答率都到不了。这个阈值是个务实的监管线，不是生物学常数。

**APOBEC（SBS2 / SBS13）。** APOBEC3 cytidine deaminase 在 TpCpW motif 上的内源性 mutagenesis —— 癌症里最广泛的 mutational process 之一，在 ~30% 测序肿瘤里占主导，绝大多数癌种都能测到（Petljak 2022；Alexandrov 2013）。它对 TME 的效应是 **双面的**：抬高 neoantigen load（偏热，在膀胱癌/NSCLC 里和 IO benefit 相关），但它那种 episodic、subclonal 的活动也喂养 heterogeneity 和免疫逃逸。是个候选 biomarker，不是已获批的 selector。

### cluster B —— 冷、CIN 驱动（刻意留的对照臂）

**Chromosomal instability / aneuploidy / whole-genome doubling。** 整条染色体和染色体臂持续 mis-segregation —— 用 **aneuploidy score**（Taylor 2018）和 **WGD** 状态衡量（~30% 肿瘤有 WGD，转移灶更高；Bielski 2018）。这是 *copy-number / structural* 不稳定性，在 antigen 轴上走 **相反** 方向：高 aneuploidy 和 cytotoxic 浸润 *负相关*（Davoli 2017），WGD 还主动 **沉默 MHC-I 抗原呈递**（通过 H3K27me3 的表观抑制）。结果是免疫 **冷** 的原型 —— 尽管 SCNA 负荷常常很高，呈递却很低，IO 应答差。这里的治疗动作不是同一个 lever，而是 **convert-cold-to-hot**，或者利用 WGD 特异的 vulnerability，比如 KIF18A 依赖（Quinton 2021）。CIN 恰恰因为是 **counterfactual** 才有它的位置 —— 它是那面镜子，用"什么都不是"来定义 hot cluster 到底是什么。

## 一页纸的分类表

| 状态 | lesion 类别 | scar / score | signature | function | TME（为什么） | therapy axis | anchor |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **HRD** | DSB 修复（HR） | GIS ≥ 42 | SBS3 | RAD51 foci | 偏热 —— DSB、neoantigen、cGAS-STING | **PARPi**（+ IO） | Davies 2017；Myriad P190014 |
| **MSI / dMMR** | mismatch repair | MSIsensor | （ID/SBS hypermutation） | dMMR IHC | 热 —— frameshift neoantigen，密集 CD8 | **IO**（pembro 2017） | Le 2017；Bonneville 2017 |
| **POLE / POLD1** | 复制校读 | TMB ultra | SBS10a/b | EDM 基因型 | 强热 —— ultramutator，MSS | **IO** | Kandoth 2013 |
| **TMB-high（非 MSI）** | 聚合负荷 | ≥ 10 mut/Mb | 混合 | — | *只在部分 lineage* 热 | **IO**（受 lineage 限制） | KEYNOTE-158；McGrail 2021 |
| **APOBEC** | ssDNA 脱氨 | TpCpW 富集 | SBS2 + SBS13 | A3 表达 | 双面 —— 偏热但强化逃逸 | IO 相邻（研究中） | Petljak 2022 |
| **CIN / WGD** | copy-number / 结构 | aneuploidy score | CIN signature | WGD ploidy | **冷** —— MHC-I 被沉默，CD8 低 | **convert-to-hot** / WGD vulnerability | Davoli 2017；Taylor 2018 |

最浓缩的说法：**cluster A 造出免疫系统看得见的抗原；cluster B 把抗原藏起来。** HRD 跨在边界上 —— 炎症到足以和 IO 相关，但又独有 PARPi synthetic lethality。

## CCR8⁺ eTreg 在哪

CCR8 特异地标记 **肿瘤浸润的 effector Treg** —— 克隆扩增、抑制性、在外周 Treg/Tconv 上基本不表达（Plitas 2016；De Simone 2016）—— 这让它成为 *选择性、瘤内* Treg depletion 的干净靶点，在临床前模型里和 anti-PD-1 协同（Kidani 2022）。在这张图上，eTreg/CCR8 是 **坐在 cluster A 底下的那条汇聚轴**：

- 在 **热** 的那些状态里，堆积的 eTreg 是踩在一个本来已经 primed 的应答上的刹车 —— 所以 CCR8 depletion 是把已有的 CD8 免疫松开的那个理性的 IO-intensifier / PARPi-IO 搭档。这就是项目的核心赌注，从 HRD 推广到整个炎症 cluster。
- 在 **冷** 的那个状态里，eTreg 只是盖在更深的抗原呈递缺陷之上的一层抑制 —— 所以光靠 CCR8 不太可能够，得先 convert-to-hot。cluster B 正是 *为什么同一个 lever 在 A 管用、在 B 不管用* 的机制解释。

> ⚠️ **这个项目必须背着的一个诚实标记。** 文献扎实地立住了两个 *分开* 的事实：MSI-H 肿瘤 **富 Treg**（Michel/Maby），以及肿瘤 Treg 是 **CCR8⁺ effector**（Plitas 2016）。它 **还没有** 直接立住的是：在同一 lineage 内，**CCR8⁺ eTreg 的富集随 MSI（或 HRD）状态而变**。这个复合命题是 **项目要去检验的假设，不是一条可引用的事实** —— 而它恰恰是一个按 MSI/HRD 分层的 scRNA 再分析（看 CCR8、TNFRSF9、CTLA-4 这些 eTreg signature）应该去检验、而不是去假定的东西。

## 这对临床试验意味着什么

把不稳定性当作"一条轴"而不是"一个 marker"，会落出三个具体的变化：

1. **入组从 HRD 扩到一个 hot-instability basket。** HRD、MSI-H、POLE、高 TMB 共享那个"已 primed 但被刹住"的表型；CCR8 depletion 在它们之间机制上是同一个干预。这是一个比单 HRD 更大、lineage 更多样的可入组人群 —— 也就是这个领域对 tissue-agnostic biomarker 早已接受的 basket 逻辑。
2. **CIN 成了天然的 negative-control 臂。** 一个冷的、WGD 高的 stratum 预测对 CCR8 单药 *不* 应答 —— 这是一个可证伪的预测，让设计更强而不是更弱。
3. **标签可以从表达来。** 大多数候选队列永远不会有配对基因组。如果不稳定性能从 RNA 读出（这是 [[imputing-instability-from-rna-2026-06-09]] 的主题），那每一个 scRNA-only 队列都能被分到这张图上的某个 stratum。

## 收尾

最短的版本：

- HRD 是 **六个** 不稳定性状态之一，不是特例 —— 它们排在 **同一条轴**（antigen presentation）上，分成一个 **热** cluster 和一个 **冷** 对照臂。
- 每个状态都能三种读法 —— **scar · signature · function** —— 它们之间的不一致就是信号。
- **CCR8⁺ eTreg** 是热 cluster 底下的汇聚 lever；它是否随不稳定性 *状态* 而变，是项目要检验的假设，不是要引用的事实。
- 冷的（CIN/WGD）那一臂不是缺口 —— 它是让热-cluster 论点 **可证伪** 的 counterfactual。
