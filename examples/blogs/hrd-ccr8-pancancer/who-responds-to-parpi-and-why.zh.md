---
title: '谁对 PARPi 起效、为什么 —— 答案在两条轴上'
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
summary: '为什么同样是 HRD，有的病人对 PARPi 起效、有的不起效？诚实的答案是：响应不在一条轴上决定，而在两条。**肿瘤内在轴**问的是 HR 缺陷掉得有多深 —— BRCA1/2 双等位还是杂合、BRCA2 还是 BRCA1 还是 BRCA1 甲基化、PALB2 / RAD51C/D —— 功能层面是否已经拉回来（53BP1 / Shieldin / PTIP 缺失）、基因层面有没有回补（BRCA 继发回复突变），以及 SLFN11 / RAD51 焦点这套传感器现在还灵不灵。**免疫轴**则是另一回事：PARPi 急性激活 STING-IFN 招募 CD8，是疗效的发动机；可 HRD 长期的慢性 IFN 同样在养着 CCR8⁺ eTreg 区室，反过来压住的正是这批 CD8。两条轴合看，本项目的分层策略应当落在 HRD-功能 × IFN/eTreg-高，而不是 HRD-基因组瘢痕 × IFN/eTreg-高。'
starred: true
---

读过[链条那篇](the-chain-from-broken-dna-to-broken-t-cells.zh.md)和[六篇论文那篇](the-six-papers-the-chain-rests-on.zh.md)的读者，多半会绕回同一个临床问题：既然 PARPi 是这条链条的扩音器，为什么不是每个 HRD 病人都起效？又为什么少数人能稳住好几年？诚实地说，"PARPi 响应"由两条独立的轴共同决定 —— 一条肿瘤内在，一条微环境 —— 同一个数值落在不同的轴上，含义并不一样。

这篇博客把两条轴都走一遍。

## 轴一 —— 肿瘤内在：HR 缺陷掉到多深

### BRCAness 谱系上 HR 缺失的深度

谱系深的那一端，SOLO1 的七年随访（DiSilvestro 等，*JCO* 2023；doi:10.1200/JCO.22.01549）—— 一线 BRCA1/2 突变卵巢癌、olaparib 维持 —— 7 年 OS 67.0% vs 安慰剂 46.5%（HR 0.55），Kaplan-Meier 曲线出现平台，相当一部分病人此后再未复发。在 BRCA 突变卵巢癌内部，BRCA2 的获益幅度数值上优于 BRCA1（SOLO1 亚组 HR ≈0.20 vs ≈0.41）；前列腺癌复现同一模式（PROfound 的 BRCA 亚组，Mateo 等，*JCO* 2023；doi:10.1200/JCO.23.00339）—— BRCA2 突变的 mCRPC 在 rPFS 与 OS 上获益都比 BRCA1 深。

BRCA1 启动子甲基化也算数，但只算纯合的：杂合甲基化**不能**预测响应，而且经过铂类压力之后甲基化本身可能丢掉（Kondrashova 等，*Nat Commun* 2018；doi:10.1038/s41467-018-05564-z）。"BRCA1 沉默 —— 是/否"这种二分判读为什么不够用，这是最干净的例子之一。

再往外一步走，HRR 通路里 PALB2 的响应表型拟 BRCA（Tung 等，*JCO* 2020，非 BRCA 的 HRR 乳腺癌：ORR 82%，9/11），RAD51C/RAD51D 突变卵巢癌也接近（Swisher 等，*JCO* 2021，ARIEL2/3 合并分析）。走到 HRR 清单的另一端，ATM 突变**不能**预测 PARPi 响应 —— TRITON3（Fizazi 等，*NEJM* 2023；doi:10.1056/NEJMoa2214676）里 ATM 队列 rPFS 8.1 vs 6.8 个月、HR 0.95 —— CDK12 改变的肿瘤又自带"串联倍增子"表型，根本不像 HRD（Wu 等，*Nature* 2018）。把整张"HRR 通路改变"清单打包成一团，是稀释真信号最快的办法。

HRDsum=42 这个切点（Telli 等，*Clin Cancer Res* 2016；doi:10.1158/1078-0432.CCR-15-2477）当年训练在乳腺与卵巢上，现在被广泛沿用。Stewart 等（*npj Precis Oncol* 2022；doi:10.1038/s41698-022-00276-6）指出，同一阈值搬到泛癌就开始打偏：泛瘤 TCGA 里有 17.5% ≥42 被判 HRD 阳性，可临床 BRCA1/2 突变肿瘤里只有 15% 被 HRDsum 与 SBS3 一致判阳，肺鳞癌却被判到 ~51%。今天在病人层面最干净的读出有两个：SBS3（Alexandrov 等，*Nature* 2020）记录基因组瘢痕；FFPE 活检上的功能性 RAD51 焦点（Cruz 等，*Ann Oncol* 2018；Llop-Guevara 等，*Ann Oncol* 2021）反映**现在时态**的 HR 能力。

### 原发耐药 —— HR 已经被修回来了

一个 BRCA1 突变肿瘤完全可以 HRD-基因组瘢痕高（SBS3 深、HRDsum 高），却对 PARPi 无效 —— 它的 HR 功能**已经修回来了**。路径之一，是丢掉原本把 BRCA1 缺陷细胞往 NHEJ 方向引流的那批因子。53BP1 缺失是教科书例子（Bunting 等，*Cell* 2010；Jaspers 等，*Cancer Discov* 2013），同一逻辑延伸到 Shieldin 复合物 —— REV7/MAD2L2、SHLD1/2/3（Noordermeer 等，*Nature* 2018；Dev 等 2018；Gupta 等 2018）—— 以及 RIF1。BRCA1 突变细胞一旦丢掉 53BP1 或 Shieldin，末端切除重新启动，RAD51 焦点回来了，肿瘤读起来像功能性 HR 完整，哪怕 BRCA1 本身仍然是坏的。

另一条路是**保护复制叉但不重建 HR** —— PTIP/MLL3-4 缺失（Chaudhuri 等，*Nature* 2016；doi:10.1038/nature18325）和 EZH2/MUS81 轴（Rondinelli 等，*Nat Cell Biol* 2017）就走这条。复制叉一旦稳住，被困的 PARP 不再触发叉塌陷，DSB 修复就算还坏着，合成致死的引擎也熄了。新近的工作把毒性损伤本身重新定义了一遍：Cong、Cantor 等（*Mol Cell* 2021；doi:10.1016/j.molcel.2021.06.011）认为 PARPi 致死的近端损伤其实是冈崎片段加工缺陷产生的 ssDNA 缺口，而非 DSB。这一来把耐药机制重新挂回复制叉，也解释了 **SLFN11** 为何是单基因层面最强的增敏因子（Murai 等，*Oncotarget* 2016；Lok 等，*Clin Cancer Res* 2017；Coussy 等，*Sci Transl Med* 2020）：SLFN11 识别这些缺口，把复制叉不可逆地锁死。

含义很尖锐。HRD 评分看到的是 HR 缺失的历史指纹，看不到 HR 此刻还在不在工作。**功能读出（RAD51 焦点）配上缺口处理的传感器（SLFN11），合起来才抓得到 HRDsum 抓不到的、现在时态的 PARPi 敏感性。**

### 获得性耐药 —— BRCA 基因又回来了

第三种内在模式是回复。PARPi 或铂类的压力之下，继发突变把 BRCA1/2（或 PALB2、RAD51C、RAD51D）的开放阅读框补回来（Edwards 等，*Nature* 2008；Sakai 等，*Nature* 2008）。治疗前的回复罕见（铂敏感 ARIEL2 里 2%），进展时则常见 —— 铂耐药队列基线 13–18%，重度预治疗 mCRPC 进展时甚至报到 40–60%（Lin 等，*Cancer Discov* 2019；Goodall 等，*Cancer Discov* 2017）。回复往往是多克隆的：Kondrashova 等（*Cancer Discov* 2017）就在一例耐药肿瘤里看到四个独立的 RAD51C 回复等位。回复在影像变化之前就先到 ctDNA 里露面，这让它成为最干净的动态生物标志物。

2024 年的新发现是：同一个病人可以同时携带**复合型**耐药 —— 遗传回复叠加 53BP1 通路损伤。Patel/Bono 等（*Ann Oncol* 2024；doi:10.1016/j.annonc.2024.01.005）在 PARPi 耐药乳腺癌里观察到 BRCA1/2 回复与 TP53BP1、RIF1、PAXIP1（PTIP）损伤共存。耐药从来不是单一答案 —— 它是一个组合。

## 轴二 —— 免疫：哪种 IFN、哪种 T 细胞、哪种 Treg

这条轴上最常见的错误，是把"IFN 标签"当成一个数读。

**急性、药物诱发**那一头，PARPi 触发 cGAS-STING 是疗效的**必要条件**。Pantelidou 等（*Cancer Discov* 2019）显示，BRCA1 缺失 TNBC 里把 CD8 耗竭，olaparib 就失效；Sen 等（*Cancer Discov* 2019）和 Shen 等（*Cancer Res* 2019）在小细胞肺癌与 BRCA 完整的卵巢模型里看到同样结果 —— IFN 反应很大程度上与 BRCAness 脱钩。机制层面，PARPi 同时也是免疫治疗：肿瘤细胞分泌 CCL5、CXCL10，旁分泌激活树突细胞，招募 CD8，并通过失活 GSK3β 上调肿瘤 PD-L1（Jiao 等，*Clin Cancer Res* 2017）。一个肿瘤只要这一波急性反应能打起来，HRD 评分的细枝末节无所谓 —— 这个病人就是响应者。

**慢性、肿瘤内在**那一头 —— 也就是[链条那篇](the-chain-from-broken-dna-to-broken-t-cells.zh.md)走的那条 —— HRD 持续不停，胞质 DNA 泄漏给出基线 IFN，肿瘤细胞被驯化成 MHC-II^hi、共抑制配体阳性的"准 APC"，CCR8⁺ 终末效应型 Treg 区室被筛出来；这群 Treg 压住的，正是前面急性 IFN 招募来的同一批 CD8。Färkkilä 等（*Nat Commun* 2020）在 TOPACIO 活检里看到的就是这种格局：IFN 标签高的肿瘤同时 Treg 高，而 Treg 比例是 niraparib + pembrolizumab 响应的负相关因子。Luo 等（*Cell* 2024；doi:10.1016/j.cell.2024.06.013）随后在 HGSOC 里把环闭上：HRD 是装载 CCR8⁺ eTreg 区室的基因组学轴；CCR8 人源化小鼠里用 ZL-1218 耗竭这群细胞，效果比单用 niraparib 更强。

巨噬细胞还要再算一层。Mehta 等（*Nat Cancer* 2021；doi:10.1038/s43018-020-00148-7）显示，BRCA1 缺失 TNBC 里 PARPi 通过 SREBP1 脂质重编程驱动 CSF1R 依赖的免疫抑制性巨噬细胞。阻断 CSF1R 或激动 STING，都能以 CD8 依赖的方式把疗效拉回来。

两条轴合起来：HRD 肿瘤上 PARPi，被急性 IFN（CD8 招募）*推一把*，又被慢性 IFN（eTreg 驯化）*盖一层*，再被巨噬细胞*盖一层*。

## 两条轴为何关乎本项目的分层策略

本项目的工作假设 —— [那个赌注](the-pan-cancer-bet.zh.md)里的 H3 —— 是 **HRD-高 × IFN/eTreg-高**界定 PARPi + anti-CCR8 的目标人群。两条轴的答案从三处把这一假设磨得更尖：

1. **用功能 HRD，不要只用基因组瘢痕。** BRCA1 突变肿瘤如果 53BP1 已被回补，HRDsum 仍然高，但 HR 功能已经修回来，PARPi 就无效。分层策略应当是 HRD-功能（FFPE 上 RAD51-低）× IFN/eTreg-高，而不是 HRD-历史 × IFN/eTreg-高。这对 bulk TCGA 分析能下什么结论是一道真切的约束 —— bulk RNA 看不见 RAD51 焦点。免疫那一侧的重头落在单细胞验证集（Zheng 2021、Cheng 2021、GSE222556）；基因组这一侧的结论则要打折扣：HRDsum + SBS3 *减去*已知的 53BP1/Shieldin/PTIP 缺失，是我们能搭出来的最干净的泛癌代理。

2. **IFN 轴本身就是两条轴。** 治疗前 IFN 标签高的肿瘤，可能是急性 IFN（好事 —— 近期损伤、CD8 丰富、PARPi 敏感），也可能是慢性 IFN（抑制 —— HRD 持续、eTreg 丰富）。单看治疗前 IFN 标签是含糊的；eTreg 比例（单细胞里的 CCR8⁺Treg 比例，或 bulk 反卷积出来的代理）能把它拆开。**eTreg 高 = 慢性 IFN 区间 = 这套联合方案对应的人群。** 这一手分析操作，把 IFN 轴从共存协变量变成分层协变量。

3. **PALB2 / RAD51C / RAD51D / BRCA1 甲基化肿瘤是开放问题。** Luo 2024 把链条画清楚的，是 BRCA1/2 突变 HGSOC。PALB2 突变、RAD51C/D 突变、纯合 BRCA1 甲基化这几类 HRD 肿瘤是否共享同一套 CCR8⁺ eTreg 表型，已发表的单细胞数据**还没有**答案。共享，分层策略就能推广；不共享，本项目就拿到了一个更尖的"在免疫上算得上数的 HRD"定义。这正是泛癌图谱分析 Aim 2 与 Aim 3 准备回答的那类问题。

## 一句话

PARPi 响应不是单轴可预测。Kaplan-Meier 曲线上停在七年的那批病人，是**两条轴都赢**的人 —— HR 功能性深度缺失、尚未回复、微环境也还没翻进慢性 IFN/eTreg 区间。PARPi + anti-CCR8 对应的，则是轴一赢（HR 功能性缺失）、轴二输（已被 eTreg 驯化）的那批人。这个交集就是本项目分层策略要找的东西 —— 分析层面的推论是：要用**功能 HRD 加 IFN/eTreg 共现**来量化，而不是单一的 HRDsum 阈值。
