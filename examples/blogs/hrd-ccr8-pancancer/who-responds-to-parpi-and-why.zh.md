---
title: '谁会对 PARPi 起效，为什么——两条轴的答案'
date: '2026-06-01'
topics:
- hrd
- parpi
- brca
- ifn
- treg
- ccr8
- resistance
- biomarker
summary: '"为什么有些 HRD 病人对 PARPi 起效，有些不起效"——这个问题诚实的答案是：决定响应的不是一条轴，而是两条。第一条是肿瘤内在轴：HR 缺陷究竟掉到多深（BRCA1/2 双等位 vs 杂合、BRCA2 vs BRCA1 vs BRCA1 甲基化、PALB2 / RAD51C/D）、功能层面是否被重新拉回来（53BP1 / Shieldin / PTIP 缺失）、基因层面是否回补（BRCA 继发回复突变），以及 SLFN11 / RAD51 焦点这套传感器处于什么状态。第二条是免疫轴：药物急性诱发的 STING-IFN 招募 CD8 是 PARPi 起效的发动机，但 HRD 长期慢性 IFN 同样是 CCR8⁺ eTreg 区室的养料，而这群 Treg 抑制的正是前面被招募来的那批 CD8。把两条轴合起来看，本项目的分层策略应该是 HRD-功能 × IFN/eTreg-高，而不是 HRD-基因组瘢痕 × IFN/eTreg-高。'
starred: true
---

读过[链条那篇](the-chain-from-broken-dna-to-broken-t-cells.zh.md)和[六篇论文那篇](the-six-papers-the-chain-rests-on.zh.md)的读者，往往会反复回到同一个临床问题：如果 PARPi 是放大这条链条的扩音器，那为什么不是每个 HRD 病人都起效——又为什么有一小部分病人能起效好几年？诚实的答案是，"PARPi 响应"是两条相互独立的轴共同决定的——一条肿瘤内在、一条微环境——并且同样的数值落在不同的轴上，意义并不相同。

这篇博客把两条轴都走一遍。

## 轴一——肿瘤内在：HR 缺陷究竟掉到多深

### BRCAness 谱系上 HR 缺失的深度

在深度谱的一端，SOLO1 七年随访数据（DiSilvestro 等，*JCO* 2023；doi:10.1200/JCO.22.01549）针对一线 BRCA1/2 突变卵巢癌、奥拉帕利（olaparib）维持治疗，给出的 7 年 OS 是 67.0% vs 安慰剂 46.5%（HR 0.55），而且 Kaplan-Meier 曲线出现平台——相当一部分病人之后再没复发。在 BRCA 突变卵巢癌内部，BRCA2 在获益幅度上数值上优于 BRCA1（SOLO1 亚组分析里 HR ≈0.20 vs ≈0.41）；前列腺癌也复现同样的模式（PROfound 的 BRCA 亚组，Mateo 等，*JCO* 2023；doi:10.1200/JCO.23.00339）：BRCA2 突变的 mCRPC 在 rPFS 和 OS 上获益都比 BRCA1 更深。

BRCA1 启动子甲基化也算数，但仅限于纯合甲基化：杂合甲基化**不能**预测响应，并且铂类用药之后甲基化本身可能丢失（Kondrashova 等，*Nat Commun* 2018；doi:10.1038/s41467-018-05564-z）。这正是为什么二分式的"BRCA1 沉默——是/否"判断不够用，最干净的例子之一。

离 BRCA 再远一步，HRR 通路基因 PALB2 在响应上拟表型 BRCA（Tung 等，*JCO* 2020，非 BRCA 的 HRR 乳腺癌：ORR 82%，9/11），RAD51C/RAD51D 突变卵巢癌的表现也相近（Swisher 等，*JCO* 2021，ARIEL2/3 合并分析）。但走到 HRR 清单的另一端，ATM 突变就**不能**预测 PARPi 响应——TRITON3（Fizazi 等，*NEJM* 2023；doi:10.1056/NEJMoa2214676）显示 ATM 队列 rPFS 8.1 vs 6.8 个月、HR 0.95——而 CDK12 改变的肿瘤有自己一套"串联倍增子"表型，并不像 HRD（Wu 等，*Nature* 2018）。把所有"HRR 通路改变"打成一团，是稀释真信号最干净的办法。

HRDsum=42 这个切点（Telli 等，*Clin Cancer Res* 2016；doi:10.1158/1078-0432.CCR-15-2477）当年是在乳腺癌和卵巢癌上训练出来的，现在被广泛使用。Stewart 等（*npj Precis Oncol* 2022；doi:10.1038/s41698-022-00276-6）指出，同一阈值挪到泛癌就开始打偏：泛肿瘤 TCGA 里有 17.5% ≥42 分被判 HRD 阳性，可是临床 BRCA1/2 突变肿瘤里只有 15% 同时被 HRDsum 和 SBS3 一致判阳，肺鳞癌则被判到 ~51% HRD 阳性。今天在病人层面最干净的读出，一是 SBS3（Alexandrov 等，*Nature* 2020）反映基因组瘢痕，二是 FFPE 活检上的功能性 RAD51 焦点（Cruz 等，*Ann Oncol* 2018；Llop-Guevara 等，*Ann Oncol* 2021）反映*现在时态*的 HR 能力。

### 原发耐药——HR 已经被修回来了

一个 BRCA1 突变肿瘤完全可以 HRD-基因组瘢痕高（SBS3 深、HRDsum 高），却依然对 PARPi 无效，因为它的 HR 功能已经被**修回来了**。路线之一是丢掉那些原本把 BRCA1 缺陷细胞往 NHEJ 方向引流的因子。53BP1 缺失是教科书例子（Bunting 等，*Cell* 2010；Jaspers 等，*Cancer Discov* 2013），同一逻辑延伸到 Shieldin 复合物——REV7/MAD2L2、SHLD1/2/3（Noordermeer 等，*Nature* 2018；Dev 等 2018；Gupta 等 2018）——以及 RIF1。在 BRCA1 突变细胞里把 53BP1 或 Shieldin 丢掉，末端切除重新启动，RAD51 焦点回来了，肿瘤就读作功能性 HR 完整，哪怕它的 BRCA1 仍然是坏的。

另一条路——**复制叉保护但不重建 HR**——走的是 PTIP/MLL3-4 缺失（Chaudhuri 等，*Nature* 2016；doi:10.1038/nature18325）和 EZH2/MUS81 轴（Rondinelli 等，*Nat Cell Biol* 2017）。复制叉稳定下来，被困住的 PARP 不再触发叉塌陷，即便 DSB 修复仍然坏着，合成致死引擎也熄火了。最近的工作把毒性损伤本身重新定义了一遍：Cong、Cantor 等（*Mol Cell* 2021；doi:10.1016/j.molcel.2021.06.011）认为 PARPi 致死的近端损伤是冈崎片段加工缺陷产生的 ssDNA 缺口，而非 DSB 本身。这一来把耐药机制重新挂回到复制叉，也帮我们理解为什么 **SLFN11** 是单基因层面最强的增敏因子（Murai 等，*Oncotarget* 2016；Lok 等，*Clin Cancer Res* 2017；Coussy 等，*Sci Transl Med* 2020）：SLFN11 识别这些缺口，把复制叉不可逆地锁死。

含义很尖锐。HRD 评分看到的是 HR 缺失的历史指纹；它看不到 HR 现在还在不在工作。**功能读出（RAD51 焦点）加上缺口处理的传感器（SLFN11），合起来才能捕捉到 HRDsum 抓不到的、现在时态的 PARPi 敏感性。**

### 获得性耐药——BRCA 基因又回来了

第三种内在模式是回复。在 PARPi 或铂类压力之下，继发突变把 BRCA1/2（或 PALB2、RAD51C、RAD51D）的开放阅读框补回来（Edwards 等，*Nature* 2008；Sakai 等，*Nature* 2008）。治疗前的回复很罕见（铂敏感 ARIEL2 里 2%），进展时则常见——铂耐药队列基线 13–18%，重度预治疗 mCRPC 进展时甚至有 40–60% 的报道（Lin 等，*Cancer Discov* 2019；Goodall 等，*Cancer Discov* 2017）。回复通常是多克隆的：Kondrashova 等（*Cancer Discov* 2017）报告过一个耐药肿瘤同时携带四个独立的 RAD51C 回复等位。回复在影像变化之前就在 ctDNA 里出现，这让它成为最干净的动态生物标志物。

2024 年新的发现是，同一个病人可以同时携带**复合型**的遗传 + 53BP1 通路耐药。Patel/Bono 等（*Ann Oncol* 2024；doi:10.1016/j.annonc.2024.01.005）在 PARPi 耐药乳腺癌里看到 BRCA1/2 回复与 TP53BP1、RIF1、PAXIP1（PTIP）损伤共存。耐药机制没有单一答案——是一个组合。

## 轴二——免疫：是哪种 IFN、哪种 T 细胞、哪种 Treg

这条轴上最常见的错误，是把"IFN 标签"当成一个数。

在**急性、药物诱发**的方向上，PARPi 触发的 cGAS-STING 激活是 PARPi 起效的**必要条件**。Pantelidou 等（*Cancer Discov* 2019）显示，BRCA1 缺失 TNBC 里把 CD8 耗竭，奥拉帕利就失效；Sen 等（*Cancer Discov* 2019）和 Shen 等（*Cancer Res* 2019）在小细胞肺癌和 BRCA 完整的卵巢模型里看到了一样的结果——IFN 反应在很大程度上与 BRCAness 无关。从机制上讲，PARPi 同时也是一种免疫治疗：它让肿瘤细胞分泌 CCL5 和 CXCL10、旁分泌激活树突细胞、招募 CD8，并通过失活 GSK3β 上调肿瘤 PD-L1（Jiao 等，*Clin Cancer Res* 2017）。一个肿瘤只要能把这一波急性反应打起来，无论 HRD 评分的细枝末节如何，这个病人就是响应者。

在**慢性、肿瘤内在**的方向上——也就是[链条那篇](the-chain-from-broken-dna-to-broken-t-cells.zh.md)走的那一条——持续的 HRD 驱动的胞质 DNA 泄漏产生基线 IFN，把肿瘤细胞驯化成 MHC-II^hi、共抑制配体阳性的"准 APC"，进而筛选出 CCR8⁺ 终末效应型 Treg 区室，而这群 Treg 抑制的恰恰是前面急性 IFN 招募来的同一批 CD8。Färkkilä 等（*Nat Commun* 2020）在 TOPACIO 活检里看到的就是这种格局：IFN 标签高的肿瘤同时 Treg 高，而 Treg 比例是尼拉帕利（niraparib）+ 派姆单抗响应的负相关因子。Luo 等（*Cell* 2024；doi:10.1016/j.cell.2024.06.013）随后在 HGSOC 里把环闭合：HRD 是装载 CCR8⁺ eTreg 区室的基因组学轴，在 CCR8 人源化小鼠里用 ZL-1218 把这群细胞耗竭，效果比单用尼拉帕利更强。

还有一层巨噬细胞。Mehta 等（*Nat Cancer* 2021；doi:10.1038/s43018-020-00148-7）显示，BRCA1 缺失 TNBC 里 PARPi 通过 SREBP1 脂质重编程驱动 CSF1R 依赖的免疫抑制性巨噬细胞。阻断 CSF1R 或激动 STING，都能以 CD8 依赖的方式恢复疗效。

所以两条轴合起来看：一个 HRD 肿瘤上 PARPi，被急性药物诱发的 IFN（CD8 招募）*推一把*，又被 HRD 驱动的慢性 IFN（eTreg 驯化）*盖一层*，再被巨噬细胞那一层*盖一层*。

## 两条轴为何关系到本项目的分层策略

本项目的工作假设——[那个赌注](the-pan-cancer-bet.zh.md)里的 H3——是 **HRD-高 × IFN/eTreg-高**界定 PARPi + 抗 CCR8 的目标人群。两条轴的答案从三个方向把这一假设打磨得更尖：

1. **用功能 HRD，不要只用基因组瘢痕。** 一个 BRCA1 突变肿瘤如果 53BP1 已被回补，HRDsum 仍然高，但因为 HR 已经被功能性修回来，所以 PARPi 无效。分层策略应该是 HRD-功能（FFPE 上 RAD51-低）× IFN/eTreg-高，而不是 HRD-历史 × IFN/eTreg-高。这对 bulk TCGA 分析能下什么结论是个真切的约束——bulk RNA 看不见 RAD51 焦点。单细胞验证集（Zheng 2021、Cheng 2021、GSE222556）在免疫这边承载更多重量；基因组那边的结论则必须打折扣：HRDsum + SBS3 *减去*已知的 53BP1/Shieldin/PTIP 缺失，是我们能搭出来的最干净的泛癌代理。

2. **IFN 轴本身就是两条轴。** 一个治疗前 IFN 标签高的肿瘤，可以是急性 IFN（好事——近期损伤、CD8 丰富、PARPi 敏感）也可以是慢性 IFN（抑制——HRD 持续、eTreg 丰富）。单凭治疗前 IFN 标签是含糊的；eTreg 比例（或单细胞里的 CCR8⁺Treg 比例，或 bulk 里的反卷积代理）能把它拆开。**eTreg 高 = 慢性 IFN 区间 = 这种联合方案对应的人群。** 这一手分析操作，把 IFN 轴从一个共存协变量变成一个分层协变量。

3. **PALB2 / RAD51C / RAD51D / BRCA1 甲基化肿瘤是个开放问题。** Luo 2024 把链条画清楚是在 BRCA1/2 突变 HGSOC 里。PALB2 突变、RAD51C/D 突变、纯合 BRCA1 甲基化这几类 HRD 肿瘤是否共享同一套 CCR8⁺ eTreg 表型，已发表的单细胞数据**还没有**给出答案。如果是，分层策略可以推广；如果不是，本项目就拿到了一个更尖的"在免疫上算得上数的 HRD"定义。这正是泛癌图谱分析 Aim 2 和 Aim 3 准备回答的那类问题。

## 一句话

PARPi 响应不是单轴预测。Kaplan-Meier 曲线上停在七年的那批病人，是在**两条轴上都赢**的人——HR 功能性深度缺失、还没出现回复、并且微环境也还没翻进慢性 IFN/eTreg 区间。而 PARPi + 抗 CCR8 联合方案对应的，是在轴一上赢（HR 功能性缺失）、在轴二上输（被 eTreg 驯化）的那批病人。这个交集，正是本项目分层策略要找的——而分析层面的推论是：它应该用**功能 HRD 加 IFN/eTreg 共现**来量化，而不是单一的 HRDsum 阈值。
