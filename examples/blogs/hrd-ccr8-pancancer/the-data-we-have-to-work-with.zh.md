---
title: '手头有什么数据可用 —— 支撑 HRD × IFN × CCR8 链条的九层公开证据'
date: '2026-06-02'
topics:
- dataset
- parpi
- hrd
- single-cell
- spatial
- proteomics
- bulk-rna
- ovarian-cancer
- breast-cancer
- pancreatic-cancer
- prostate-cancer
- immunotherapy
- resources
summary: '[pan-cancer 押注](the-pan-cancer-bet.zh.md)早先的草稿曾把 GSE222556 称作"几乎是唯一一份"来自 PARPi 治疗患者的公开单细胞数据集。这个判断太紧了，第二轮检索之后画面进一步打开。如今老实画出来的地图有九层 —— (1) bulk 多组学竞技场，配合 metastatic-WGS 队列（Hartwig、PCAWG）以及覆盖 HGSOC / BRCA / UCEC / PDAC / CRC 的逐队列 CPTAC 蛋白基因组锚点，再附 LUAD 与 HNSCC 旁支；(2) 人体 PARPi 治疗单细胞 + 配对时间点的临床蛋白组学 + 首两份公开存档的 PARPi 临床试验 bulk RNA 队列（TOPARP-B mCRPC，AOCS GSE140996 HGSOC）；(3) 横跨 TNBC / 卵巢 / PDAC / SCLC 的临床前 PARPi scRNA；(4) HRD 分层的人体单细胞 + 空间数据，不要求 PARPi 暴露（Vázquez-García MSK-SPECTRUM、Pal BRCA1+/–、Bassez BIOKEY、Launonen/Färkkilä mIF、Stur Visium、Kopper PDO、Hwang HTAPP）；(5) Replogle 全基因组规模的 Perturb-seq，用作 HR 基因的分子指纹；(6) 泛癌免疫图谱与框架（Zheng、Cheng、Combes IRIS、Chu T-stress、Nieto TICAtlas、3CA、Tay 2025 NSCLC CCR8）；(7) **新增** —— IO 治疗队列作为交叉验证（IMvigor210、IMmotion150/151、Braun CheckMate-009/010/025 用于 bulk RNA + 结局；Yost BCC/SCC、Krishna ADAPTeR ccRCC、Caushi NSCLC、Luoma HNSCC、Sade-Feldman 黑色素瘤、Bi RCC、Liu NSCLC 用于单细胞 + scTCR）；(8) **新增** —— 细胞系基线与药物扰动（LINCS L1000 的 PARPi 特征、DepMap + PRISM 的依赖性与敏感性、CCLE 静息态 RNA + 蛋白组学）；(9) 关键试验 PARPi 组的单细胞数据，公开领域里根本不存在。治疗结局这一层主要锚在 HGSOC + mCRPC，但第 4–8 层提供了足够宽的跨瘤种基座，让链条在走向任何新试验论证之前先经受压力测试。'
starred: true
---

读者一旦把[pan-cancer 押注](the-pan-cancer-bet.zh.md)和[链条博客](the-chain-from-broken-dna-to-broken-t-cells.zh.md)走完，下一个现实问题自然冒出来：**眼下到底有哪些数据可以放上桌面？** 这篇博客就是这份清单。

九层，由最窄的（治疗结局）一直铺到最宽的（细胞系基线 + 不公开的部分）。

## 第 1 层 —— bulk 多组学竞技场（Aim 1–4 的主场）

三份公开资源几乎承担了全部工作：

- **TCGA 泛癌** —— 33 种癌型，配套 RNA-seq、SNP array 与 WES。HRD 判定、特征评分以及逐癌种队列规模的主竞技场，能让项目从单瘤种的关联推进到泛癌混合模型。通过 GDC 访问。
- **CPTAC 泛癌蛋白基因组学（2024 协调发布版）** —— 10 种癌型、1,043 例患者，基因组、转录组、蛋白组、磷酸化蛋白组成套配对。任何转录层面的 CCR8 / IFN / LAG3 结果都靠它做蛋白层的交叉验证。
- **TCPA** —— CPTAC 的 RPPA 姐妹库；panel 更小，样本量更大；同一批 target 的第二个蛋白读出。

两个工具可以省下几周时间：

- **GerkeLab/TCGAhrd** —— 预处理好的 Knijnenburg HRDsum / LOH / LST / NtAI 分数，覆盖 33 种癌型、9,125 个样本。在 Aim 1 里直接拿来用。
- **expHRD** —— 仅基于 RNA-seq 的 HRD 预测器，让项目能在缺少 SNP/WES 的 ICI 队列里也补上 HRD 标签。

这一层基本没有争议，几乎是现成的。项目不会卡在这里。

### WGS 级别的转移性 + 非 TCGA 队列

两份补充数据把基因组瘢痕的质量与转移病灶的覆盖度都拉到 TCGA 跟不上的水平：

- **Hartwig Medical Foundation (HMF)** —— 5,100+ 例转移性患者，配套肿瘤+正常 WGS（中位深度 106×/38×），约一半还配套 RNA-seq。CHORD HRD 分类器（Nguyen et al., *Nat Commun* 2020）+ BRCA1-like vs BRCA2-like 亚分类 + SBS3 都已预先算好；通过 DR-### 申请走受控访问（学术界免费）。这是目前唯一一份*天然就由转移病灶构成*的大规模 WGS 队列 —— 正是 PARPi + anti-CCR8 真正要治的患者群，也正是 TCGA 因为只取原发灶而错判的那一群。
- **PCAWG**（ICGC/TCGA 全基因组泛癌分析，*Nature* 2020）—— 2,658 例供者 / 38 个瘤种，WGS 经过统一再处理，约 1,200 例配套 RNA-seq，SBS3 + RS3/RS5 结构变异 HRD 签名均已预算。签名表无需走 DACO 就能开放下载；原始 WGS 走 ICGC DACO。这是 HRD × IFN/eTreg 分层器在 TCGA 或 HMF 训练后可用的非 TCGA 泛癌验证队列。

### CPTAC 逐队列蛋白基因组锚点

语料库里那条泛 CPTAC 入口给的是协调表。藏在底下的逐队列蛋白基因组学论文，才是项目关心的每一种瘤型更干净的参考 —— 也是把转录层的 CCR8 / IFN / MHC-II 读出落到实际蛋白定量上的位置：

- **HGSOC** —— Zhang et al. *Cell* 2016（174 例肿瘤，配套全局+磷酸化蛋白组学，含 BRCA1/2 状态）加 McDermott et al. *Cell Rep Med* 2020（83 例肿瘤 + 输卵管正常锚点）。Luo 2024 所在竞技场的蛋白层参照。
- **乳腺癌** —— Krug et al. *Cell* 2020（约 122 例肿瘤，配套 HRD 瘢痕 + BRCAness 与磷酸化蛋白组）。配合 Pal 2021 BRCA1+/– scRNA 与 Wu 2021 图谱。
- **子宫内膜癌** —— Dou et al. *Cell* 2020（95 例肿瘤：83 例 EEC + 12 例浆液性；POLE/MSI/CN-high 亚型；含 BRCA1/2 状态）。让 HRD 阳性的浆液性 EEC 能跟 MSI-high EEC 对比 —— 这是项目针对 MSI 混杂因素的对照检查。
- **PDAC** —— Cao et al. *Cell* 2021（140 例 PDAC，105 例高纯度，含 BRCA1/BRCA2/PALB2 状态）。与第 4 层 Hwang 2022 / GSE202051 snRNA 配对的蛋白层。
- **CRC** —— Vasaikar et al. *Cell* 2019（110 例肿瘤，含 MSI 状态）。用来检验 HRD 驱动的 CCR8 富集，即使相对 MSI-high CRC 也是否仍然失衡。
- *旁支* —— Gillette et al. *Cell* 2020 LUAD（110 + 101 NATs）以及 Huang et al. *Cancer Cell* 2021 HPV− HNSCC（108 + 66 NATs）。两份都没有正式的 HRDsum，但能提供反卷积质控所需的 IFN/MHC-II/STAT1 蛋白锚点。HNSCC 额外对应 CHS-114 在 I 期里给出 CCR8⁺Treg 清除读出的适应症（NCT05635643）。

泛 CPTAC 的 HRDsum 协调工作（Loeffler et al., *npj Precision Oncology* 2022）让以上八个队列都能用 bulk-RNA 那层一致的 HRD 评分来检索。CCR8 本身在 bulk CPTAC 的 TMT 检出阈以下 —— 所以项目对 CCR8 永远是用 scRNA 交叉核对，绝不单凭 CPTAC。STAT1、HLA-DRA/DRB1、CIITA、MX1、ISG15、OAS1、IFI6 都有可靠定量；PD-L1 与 LGALS9 能测到但比较稀疏；FGL1 只在 HCC/LUAD 里可信。

## 第 2 层 —— 人体 PARPi 治疗的单细胞数据

比 bulk 那一层稀薄一些，但并不像早先那版草稿暗示的那样稀薄。

### 锚点队列及其姐妹存档

Luo et al. *Cell* 2024 队列（NCT04507841，新辅助 niraparib HGSOC）共存放了三份配套登录号：

- **GSE222556** —— 主体 10x scRNA-seq 队列。在签名走向泛癌之前，定义 eTreg / IFN 签名的主底物。
- **GSE269793** —— 同一试验里其他患者的 Singleron scRNA-seq。签名的平台独立性测试。
- **GSE222555** —— 配对 Singleron scTCR-seq。用来检验终末 eTreg 与终末耗竭 CD8 是否共享 TCR 定义的微生态位，而不仅仅是频率重叠。

这三份合起来，是公开记录里密度最高的人体 PARPi 治疗单细胞 + 克隆型资源。

### 其他配对时间点的人体 PARPi 活检 —— 但是单细胞*蛋白*，而非 RNA

有两份多患者资源提供配对的 PARPi 治疗前 vs 治疗中活检，二者都是单细胞，但读出在**蛋白**层面，而非转录层面。它们跟 scRNA-seq 不能互换：

- **Färkkilä et al. *Nat Commun* 2020（TOPACIO；NCT02657889）** —— 复发性卵巢癌，niraparib + pembrolizumab，62 例患者，t-CyCIF 高度复合免疫荧光。治疗下 IFN 应答签名与 Treg 比例同步上扬 —— 这是 Luo 2024 Cell 机制的提前预演。数据托管在 GitHub `farkkilab/pubs`；*没有 scRNA-seq 存档*。
- **Mitri et al. *medRxiv* 2024（AMTEC）** —— BRCA-WT 转移性 TNBC，olaparib 单药 → olaparib + durvalumab，约 10 例患者连续活检。空间单细胞蛋白组学（CyCIF/mIHC）+ bulk RNA + WES。托管在 HTAN-OHSU。值得拿来当 pan-cancer 主张的**阴性对照**：BRCA-WT mTNBC 属于 HRD-low，如果 IFN→CCR8 链在那里依然点燃，那主张就比单凭 Luo HGSOC 故事所暗示的更独立于基因组瘢痕；如果点不燃，那链条就依赖于 HRD-deep 肿瘤。

### olaparib 维持治疗下的空间转录组

- **GSE288483** —— Visium 级别的空间转录组学，olaparib 维持治疗 HGSOC。2025 年 9 月存档；写这篇时还没有锚定论文 —— 论文落地后请再次核对。这是最接近 Luo 解离 scRNA 的公开空间对照：可以用来问 CCR8⁺ eTreg 与耗竭 CD8 在*物理上*是否共定位 —— 这是解离 scRNA 答不了的问题。

### 人体 PARPi 治疗*bulk* RNA —— 比预期窄，但并非空白

关键 PARPi 试验按方案几乎都只取 DNA：PRIMA、SOLO-1/2、NOVA、PAOLA-1、POLO、MEDIOLA、OlympiAD、PROfound、ARIEL3、NEOTALA、TALAPRO-1/2 要么压根没采肿瘤 RNA-seq，要么把数据封在 Vivli 之类的申办方门户里。有两个队列已经公开存档，值得跑：

- **TOPARP-A/B**（Mateo et al., *Cancer Discovery* 2021）—— ICR/Royal Marsden 的学术 II 期，olaparib 在 mCRPC 的研究。肿瘤活检、WES + RNA-seq、逐患者 olaparib 应答。通过 ICR DAC 走 EGA 受控访问。**唯一一份公开存档的 PARPi 试验肿瘤 bulk RNA-seq 队列。** 把 PARPi 治疗的转录组竞技场从 HGSOC 扩到前列腺癌。
- **GSE140996**（Christie et al.；Australian Ovarian Cancer Study 子队列）—— AOCS 的 PARPi 治疗 HGSOC bulk RNA + 配套 WGS，**完全开放访问**。在申办方门户之外最接近的第二份公开 PARPi-bulk-RNA 数据集；项目可以立刻在它上面跑 HRD × IFN/eTreg 签名评分。

两个队列仍然算紧。但 TOPARP 给了项目一份能在其上检验链条的、前列腺癌分辨率的 PARPi 转录组，GSE140996 又给了第二份 HGSOC bulk 队列，用来在 bulk 分辨率上交叉核对 Luo 2024 的单细胞发现。

因此，老实的说法是：**GSE222556 + 姐妹存档是唯一一份大规模、配对时间点、多平台的人体 PARPi scRNA+TCR 资源，且只覆盖 HGSOC。** 其余的人体资源要么规模更小，要么停在蛋白层，要么是 HRD-WT，要么是 bulk RNA（TOPARP、GSE140996）。

## 第 3 层 —— 临床前 PARPi scRNA（真正的跨瘤种杠杆）

这是检索之后画面被实质改写的位置。公开领域的 PARPi 临床前 scRNA 覆盖 TNBC、卵巢、PDAC 与 SCLC —— 跨越 HRD-high 与 HRD-low 肿瘤、敏感与耐药模型、急性与慢性给药。

- **Liang et al. *Nat Commun* 2024（TAM_C3 / C5aR1 轴）** —— 配对的 PARPi 敏感（LPA1-T22）vs PARPi 耐药（LPA1-T127）同基因 TNBC 模型，加上 KPCA 同基因卵巢模型。Olaparib + AZD5305（PARP1 选择性）在 4 / 8 / 20 天时间序列上，主实验超过 30,000 细胞。是公开领域最干净的一份数据集，用来回答*"一个 PARPi 初治敏感肿瘤在转向耐药时，TME 长什么样"* —— 直接回应项目关心的 CCR8⁺ eTreg 在耐药时是装载还是卸载这一问题。
- **GSE276238 — Wang et al. *Mol Cancer Ther* 2025（PDAC）** —— 小鼠同基因 PDAC（KPC 衍生），完整 4 臂设计（载体 / olaparib / 放疗 / olaparib + RT）加 anti-PD-L1 联合。是目前找到的唯一一份公开 PDAC PARPi scRNA 数据集。在一个大多 HRD-low 的瘤种里检验 IFN→CD8 链 —— 给项目这条链做特异性测试。
- **del Pino Herrera et al. bioRxiv 2025（OVCAR3 persister）** —— OVCAR3（BRCA1-mut HGSOC 细胞系）在两个月慢性 olaparib 下，scRNA + RNA velocity 比较 naive 与 persister 状态。只覆盖肿瘤细胞内禀，没有微环境。是 PARPi-persister 细胞态最干净的一张图，与 Liang 那份带微环境分辨率的耐药图互补。
- **Wang et al. *Nat Commun* 2025（SCLC）** —— 小鼠同基因 SCLC + PDX，olaparib + RT + anti-PD-L1，scRNA + cGAS-STING 读出。是目前找到的唯一一份 SCLC PARPi 单细胞研究。SCLC 因复制压力而基线胞浆 DNA 很高，但按基因组瘢痕看大多 HRD-low —— 所以链条在这里若依然点燃，能在项目的机制论证里*分离*HRD 驱动与胞浆 DNA 驱动的 IFN。
- **Khan et al. *Nat Immunol* 2026（宿主 T 细胞 PARPi）** —— 小鼠 TIL scRNA 横跨 olaparib、niraparib、talazoparib，显示 PARPi 通过*宿主* DNA 损伤信号扩大 CD8 中央记忆区室。这是项目必须处理的关键警告：在 TCGA bulk RNA 上看到的 PARPi 效应，有可能是宿主免疫细胞内禀的，而不是肿瘤 IFN 驱动的。

还有两份奠基性的前作即便不是 scRNA-seq，也值得留在语料库里：

- **Pantelidou et al. *Cancer Discov* 2019** —— KB1P（K14cre-Brca1fl/fl-Trp53fl/fl）GEMM，olaparib 在 BRCA1-null TNBC 体内激活 STING。每一篇 PARPi-IO 论文都引的机制先例。
- **Zhang et al. *Theranostics* 2021** —— BRCA1-KO 小鼠乳腺肿瘤跨四种分子亚型的 scRNA 图谱，逐亚型给出 olaparib 敏感性。当作"PARPi 应答者 TME"参考很好用，虽然耐药轨迹不是它的重点。

## 第 4 层 —— HRD 分层的人体单细胞 + 空间数据（不要求 PARPi 治疗）

这是早先那版草稿整层漏掉的，也是对 pan-cancer 押注最关键的一层。挂钩点是**在单细胞或空间分辨率上给出逐患者 HRD 或 BRCA 状态** —— 那位患者是否暴露过 PARPi 并不重要。

### HGSOC 的 HRD 分层图谱

- **Vázquez-García et al. *Nature* 2022（MSK-SPECTRUM）** —— 42 例未治 HGSOC 患者，160 个肿瘤部位，约 929k 细胞 scRNA + 配套 WGS + mIF，每个病例都标注 HRD-Dup（BRCA1-like）、HRD-Del（BRCA2-like）、FBI（折返反转）或 TD（串联重复）。SBS3 也有报告。是公开领域里最佳的单一底物，可以把 Luo 的 eTreg/IFN 签名投射到一份 HRD 分层、未治的 HGSOC 参照上。Synapse `syn25569736`。
- **Olbrecht et al. *Genome Med* 2021** —— 7 例未治 HGSOC，逐病例报告生殖系 BRCA1/2（ArrayExpress `E-MTAB-8107`）。规模小但干净；与 Vázquez-García 配对做跨队列一致性检查。
- **Stur et al. *iScience* 2022** —— HGSOC Visium，长期存活者队列，逐病例附 BRCA1/2 状态（`GSE211956`）。是规模最小但最干净的 HGSOC+BRCA 空间数据集；可用于 HRD vs HRP 样本之间的配体-受体串话分析。
- **Launonen / Färkkilä et al. *Nat Commun* 2022** —— 44 例 HGSOC（31 例 BRCA1/2-mut，13 例 HR-WT），124,623 细胞，21 标记 t-CyCIF。是 HRD 驱动免疫塑形迄今发表最干净的空间-蛋白检验 —— 也是 Luo 2024 在蛋白层的前作 —— 项目 HGSOC 结果的明显外部验证器。
- **HTAN HMS-Ovarian（Sorger / Färkkilä）** 与 **HTAN HTAPP-Ovarian（Broad/DFCI）** —— 二者都存放了配套 WGS + t-CyCIF / snRNA + 空间数据，逐病例附整理过的 HRD 判定。是带空间配对的 MSK-SPECTRUM 续作。Synapse `syn22000242` / `syn22000241`。

### 乳腺癌（BRCA1+/– 生物学最清楚可读之处）

- **Pal et al. *EMBO J* 2021（`GSE161529`）** —— 罕见的逐患者生殖系 BRCA1 单细胞存档，含明确 BRCA1+/– 的*癌前*组织（69 例标本，约 340k 细胞）。要回答"在肿瘤*出现之前*，BRCA1 杂合上皮长什么样"这个问题非常关键 —— 是项目的 IFN 基线参考。
- **Wu et al. *Nat Genet* 2021（Swarbrick 实验室，`GSE176078`）** —— 26 例原发肿瘤，130k 细胞，scRNA + CITE-seq + Visium；TNBC 子集标注了生殖系 BRCA 状态。事实上的乳腺 TME 图谱参考；包含项目要投射的 IFN 应答癌细胞状态。
- **Bassez et al. *Nat Med* 2021（BIOKEY，`EGAS00001004809`）** —— 40 例乳腺癌患者使用 anti-PD-1，约 175k 细胞 scRNA + CITE + TCR，配对治疗前/治疗中活检。乳腺癌中 CXCL13⁺ CD8 + Tex 可预测 ICB 应答的最佳公开证据 —— 即便不涉及 PARPi，对链条耗竭 CD8 那一臂也是核心。

### 胰腺癌与卵巢 PDO

- **Hwang et al. *Nat Genet* 2022（`GSE202051`）** —— 43 例 PDAC 患者，约 225k 细胞核 snRNA + 配套 Slide-seqV2；HTAN HTAPP 子集标注了 BRCA1/2/PALB2 基因型。与第 3 层同基因 GSE276238 数据集配对的人体 PDAC 参考。
- **Kopper et al. *Nat Med* 2019（HUB Foundation）** —— 32 例 HGSOC / LGSOC / 透明细胞 / 子宫内膜样卵巢癌患者的 56 个类器官，逐 PDO 附 HRD 评分、BRCA1/2 状态以及**逐类器官测得的 olaparib + niraparib IC50**。功能性 HRD × PARPi 应答的底物；后续 scRNA 已在子集上叠加。

第 4 层的标题：在单细胞或空间分辨率上拿到逐患者 HRD 或 BRCA 状态的样本，规模远比 PARPi 治疗那一层大。项目可以在不需要任何治疗结局分辨率之前，就先在约 50–100 例 HRD 分层人体样本上检验 IFN→CCR8⁺ eTreg→耗竭 CD8 这条链。

## 第 5 层 —— 单细胞 HR 基因扰动（HR 缺失的分子指纹）

这是另一种资源 —— 不是肿瘤队列，而是单细胞分辨率上的逐基因功能丧失读出。

- **Replogle et al. *Cell* 2022** —— K562 + RPE1 全基因组规模 CRISPRi Perturb-seq，约 250 万细胞。HR 名单都明确包含其中：**BRCA1、BRCA2、RAD51、RAD51C、RAD51D、PALB2、BRIP1、53BP1 (TP53BP1)、Shieldin (SHLD1/2/3)、REV7 (MAD2L2)**。让项目可以逐 HR 基因问，*它的缺失在单细胞分辨率上的转录画像是什么样* —— 这正是任何 bulk-RNA HRD 签名隐式想恢复的分子指纹。

PARPi 不在 sci-Plex 原版（`GSE139944`，A549/K562/MCF7 中 188 种化合物）里 —— 已核实。所以 sci-Plex *不是* PARPi 单细胞剂量-应答资源。Replogle 的筛选更接近的类比：覆盖 PARPi 抑制剂在功能上能拟表型的那批基因，是"HR 缺陷在单细胞分辨率上做什么"的*遗传学*版本。

## 第 6 层 —— 泛癌单细胞图谱与框架

这些不做 HRD 分层，但它们是项目用来核对 bulk-反卷积信号是否对应真实细胞、以及把 HRD 肿瘤放进更广阔的泛癌免疫景观里的依据。

- **Zheng et al. *Science* 2021** —— 泛癌 T 细胞图谱，21 个瘤种，316 例患者，约 390k T 细胞配 TCR。确认 CCR8 在多瘤种里标记瘤内 eTreg，并给出逐癌种的 eTreg 比例。
- **Cheng et al. *Cell* 2021** —— 泛癌髓系图谱。HRD vs HRP 样本中 DC–Treg 对话的 DC 与巨噬细胞参考。
- **Combes et al. *Cell* 2022（IRIS）** —— 12 个适应症共 364 例肿瘤，含 HGSOC、乳腺、PDAC；约 150 万活细胞 scRNA + 28 色流式。是把 HRD 肿瘤放进泛癌免疫原型图的框架 —— 回答"HRD-high 肿瘤落在 IRIS 原型的哪里"。
- **Chu et al. *Nat Med* 2023（`GSE207422`）** —— 16 个瘤种共 308k T 细胞。定义出与 IFN/exhaustion 正交的 TSTR（应激-应答）状态，项目在 HRD-high 肿瘤中应当做出区分 —— HRD 驱动的 IFN 是装载到 eTreg 轴、TSTR 轴，还是两者都装？
- **Magen et al. *Nat Med* 2023（HCC 新辅助 anti-PD-1）** —— 用配套 scRNA + CITE + TCR + 空间组合论证"DC + Tfh 生态位使 Tex 分化"的方法学黄金标准。项目的 CCR8-eTreg 生态位分析应当对照它的方案做。
- **Nieto et al. *Genome Res* 2021（TICAtlas）** —— 约 500k 细胞，217 例患者，13 个瘤种；与 SPOTlight 空间反卷积兼容的投影框架。
- **Tirosh 实验室 *Nat Cancer* 2025（3CA —— Curated Cancer Cell Atlas）** —— 124 个数据集，2,836 个样本，含递归的癌细胞元程序，其中一个就是 IFN-α/γ 应答模块。让项目把 HRD 驱动的 IFN 与泛癌基线放在一起比较，而不是孤立地宣称。
- **Tay et al. *Cell* 2025** —— anti-PD-1 NSCLC scRNA 在治疗后定义出三种 Treg 状态（增殖型、CCR8–、CCR8+）。给免疫治疗轴上的 CCR8 提供了直接的单细胞证据；检验 eTreg 区室是否作为治疗效应在扩张 —— 这对项目在 HGSOC 之外做出 PARPi → IFN → eTreg 的因果主张至关重要。

## 第 7 层 —— IO 治疗队列作为交叉验证

PARPi + anti-CCR8 联合没有任何临床证据。anti-PD-1 单药有。把 HRD × IFN/eTreg 分层器拿到真实的 IO 应答上去检验，是项目在自己跑试验之前能拿到的最接近转化终点的位置 —— 而且 IO biomarker 这个竞技场比 PARPi 治疗的那一头更丰厚。

### IO 试验 bulk RNA（应答 + 结局配对）

- **IMvigor210**（Mariathasan et al., *Nature* 2018）—— 348 例转移性尿路上皮癌，治疗前 RNA-seq + atezolizumab 应答/OS。同时打包在开放的 `IMvigor210CoreBiologies` R 包里；是最容易上手的 IO-bulk-RNA 竞技场。每篇 IO biomarker 论文都对照的 TGF-β-excluded / T-effector-inflamed 二分法 —— 与项目的 IFN/eTreg 轴直接可比。
- **IMmotion150**（McDermott et al., *Nat Med* 2018，EGAD00001004183）和 **IMmotion151**（Motzer et al., *Cancer Cell* 2020，EGAS00001004353）—— 263 与 823 例 mRCC 肿瘤，atezo ± bev vs sunitinib，RNA-seq + ORR/PFS/OS，通过 EGA 受控访问（Genentech/Roche DAC）。IMmotion151 是最大的 IO+TKI 转录组 ccRCC 队列，带一个 7 簇 NMF 亚型图（含 IFN/T-eff 簇），项目的分层器可以直接映射上去。
- **Braun CheckMate-009/010/025**（Braun et al., *Nat Med* 2020，dbGaP `phs001493`）—— 311 例 ccRCC 肿瘤，RNA-seq + WES + nivo vs everolimus 结局，临床+分子表作为补充材料发布。这是 Genentech EGA 系列之外最容易拿到的 IO 试验 RNA 队列 —— HRD × IFN/eTreg 分层器的独立 ccRCC 验证。

申办方控制但已发表签名可用的：JAVELIN Renal 101（Pfizer portal）、KEYNOTE-426（Merck External Data Sharing）、IMvigor010（Genentech DAC）、CheckMate-274（BMS Vivli）。它们没法直接下载，但其已发表的签名分数可以作为额外的一致性参考点。

### IO 单细胞锚点（配对前/后 + scTCR）

要专门检验 CCR8 的动力学 —— 不只是 IFN 签名分数 —— 相关的资源是带 TCR 的配对前后 IO scRNA 队列：

- **Yost et al. *Nat Med* 2019（`GSE123813`）** —— 15 例 BCC/SCC 患者，配套*同位点配对治疗前+治疗后* anti-PD-1 scRNA + scTCR（约 79k 细胞）。"克隆替换"的金标准数据集；让项目检验 CCR8⁺ eTreg 克隆型是否在 IO 下保持存在，而 CD8 克隆翻篇。
- **Krishna et al. *Cancer Cell* 2021（ADAPTeR，`EGAD00001008166`）** —— 6 例 ccRCC 患者，nivolumab 前 / 治疗中（第 9 周）/ 治疗后纵向 scRNA + scTCR + WES + mIF（约 167k 细胞）。是唯一一份 ccRCC 纵向 scRNA+TCR 图谱；它分辨出的 TRM 生态位正是 CCR8⁺ eTreg 所在的位置。
- **Caushi & Zhang et al. *Nature* 2021（`GSE176021`）** —— 20 例新辅助 nivolumab NSCLC 患者，scRNA + scTCR + MANAFEST 新抗原-TCR 映射（约 560k T 细胞）。是唯一一份具有新抗原分辨 CD8 状态的新辅助肺癌数据集 —— 让项目能问 CCR8⁺ Treg 是否随 MANA 负荷扩张。
- **Luoma et al. *Cell* 2022（`GSE200996`）** —— HNSCC 新辅助 anti-PD-1，配对前后活检。CHS-114 I 期 CCR8 清除读出（NCT05635643）在 HGSOC 之外的非 HGSOC 组织搭档。
- **Sade-Feldman et al. *Cell* 2018（`GSE120575`）** —— 32 例黑色素瘤患者，48 份活检，约 16k Smart-seq2 CD45+ 细胞，其中 12 例配对治疗前后。每篇 Treg/exhaustion 签名论文都对照的经典黑色素瘤 IO scRNA 数据集。
- **Bi et al. *Cancer Cell* 2021（`SCP1288`）** —— ccRCC nivo+ipi scRNA 图谱。Krishna 2021 ADAPTeR 的正交验证队列。
- **Liu et al. *Nat Cancer* 2022（`GSE179994`）** —— 纵向 NSCLC anti-PD-1 scRNA + scTCR，包含治疗中的血液时间点。用外周克隆型动态补足 Caushi 的组织快照。

这些都不是 PARPi 队列。但它们是人体 IO 里 CCR8⁺ eTreg → 耗竭 CD8 链最被仔细测量过的地方 —— 如果项目的分层器在它们中没有一份能跟上 IO 应答，那它几乎肯定也跟不上 PARPi + anti-CCR8 应答。IO 单细胞这一层，是项目在任何联合主张之前做的可行性检查。

## 第 8 层 —— 细胞系基线与药物扰动

有三份资源跑在细胞系而非患者肿瘤上。它们给出静息态表达框架、逐 PARPi 扰动签名以及 HR 基因依赖性谱 —— 任何患者层面的推断都该建在它们之上。

- **LINCS L1000 / CMap**（Subramanian et al., *Cell* 2017；`GSE92742` Phase 1 + `GSE70138` Phase 2）—— olaparib、niraparib、talazoparib、rucaparib 全部在 9 条核心 Touchstone 细胞系以及更广泛的 CMap panel 中被剖析过。ISG15、IFI6、IFIT1、STAT1 都在 978 转录本的 landmark 集合里。这是逐细胞系追问"这种 PARPi 是否真的诱导 ISG，以及强度是否跟 HRD 基因型同步"的参考。
- **DepMap + PRISM**（Tsherniak et al., *Cell* 2017；Corsello et al., *Nat Cancer* 2020）—— DepMap 在约 1,150 条细胞系上提供 BRCA1、BRCA2、PALB2、RAD51、53BP1 (TP53BP1)、Shieldin (SHLD1/2/3)、REV7 (MAD2L2) 的 CRISPR/RNAi 必需性数据。PRISM 在 4,518 化合物 × 约 578 系的主筛 和 8 剂量 × 1,448 化合物 × 499 系的二级筛里都包含四种 PARPi。项目想要的 HRD-*功能性*轴（相对于单看 HRD-基因组瘢痕）所站立的细胞系遗传 + 药敏层。
- **CCLE bulk RNA + 蛋白组学**（Ghandi et al., *Nature* 2019；Nusinow et al., *Cell* 2020）—— 约 1,400 条细胞系有 RNA-seq，375 条有 TMT10 蛋白组学（约 12,755 个蛋白）。逐细胞系的基线 ISG（ISG15、IFI6、MX1、STAT1、IRF7）、MHC-II、PD-L1、LGALS9、CCR8 在转录和蛋白层上的表达。Replogle Perturb-seq 指纹与 L1000 PARPi 签名都建在它给的静息态参照之上。

具体怎么用：在碰任何患者队列之前，项目可以先问 (i) 这种 PARPi 在这条细胞系里到底诱不诱导 ISG —— L1000；(ii) 哪些 HR 基因缺失在那里是生长必需 —— DepMap；(iii) 基线 ISG/MHC-II/CCR8 处于什么状态 —— CCLE RNA 与蛋白组学。细胞系这一层回答的是 bulk 肿瘤推断答不了的"机制在这个情境下能不能跑得通"。

## 第 9 层 —— 什么*不*公开，以及项目因此做不了什么

老实列一下空洞：

- **PRIMA、SOLO-1/2、NOVA 没有公开 scRNA**（关键的卵巢 PARPi 维持治疗试验）。都是 bulk + 结局。
- **POLO 没有公开 scRNA**（olaparib 在 BRCA 胰腺癌的维持）。仅有 bulk biomarker。
- **MEDIOLA 没有公开 scRNA**（olaparib + durvalumab 在 BRCA 乳腺癌）。发表内容里只有多重 IF。
- **NEOTALA 没有公开 scRNA**（talazoparib 在 gBRCA TNBC 新辅助）。Bulk + WES。
- **TALAPRO-1/2 没有公开 scRNA**（talazoparib 在 mCRPC）。Bulk + WES。
- **任何 ATR / WEE1 / CHK1 联合试验都没有公开的 PARPi 组 scRNA**（例如 OLAPCO 中的 ceralasertib + olaparib）。
- **sci-Plex 原版（GSE139944）里没有 PARPi 化合物。** sci-Plex 在 A549/K562/MCF7 中筛了 188 个化合物 —— olaparib 不在其中。所以公开的 sci-Plex PARPi 剂量-应答单细胞数据并不存在。

这具体意味着什么：项目无法在 Luo 队列之外做任何规模的**PARPi 治疗 × 结局配对** scRNA 分析。Pan-cancer 主张只能靠**分层 + 信号一致性**来做，定位为对未来试验的假设生成 —— [pan-cancer 押注](the-pan-cancer-bet.zh.md)已经是这么说的。

## 这一切对项目意味着什么

把第 4–8 层折进来之后，分析计划有七处更新：

1. **Aim 1（HRD 全景）多了单细胞锚点 + 转移性 WGS 竞技场 + 非 TCGA 验证。** Bulk RNA + GerkeLab/TCGAhrd 仍然是脊柱，但 Vázquez-García MSK-SPECTRUM（42 例 HGSOC 患者约 929k 细胞，逐病例附 HRD-Dup/Del/FBI/TD）在 HGSOC 的单细胞分辨率上交叉验证 bulk HRD 全景；**HMF + CHORD** 把 5,100+ 例转移性患者、带 WGS 级 HRD 判定和配套 RNA-seq 引入竞技场 —— 这是 PARPi + anti-CCR8 真正治疗的群体；**PCAWG** 给出一份非 TCGA 的泛癌 SBS3 + RS3/RS5 验证队列，分层器可以在分布外被检验。
2. **Aim 2（CCR8/IFN 反卷积）多了跨瘤种临床前 scRNA + HRD 分层的人体验证器 + 逐队列 CPTAC 蛋白锚点。** GSE276238（PDAC）与 Wang 2025（SCLC）检验链条在 HRD-low 肿瘤里是否点燃；Liang 2024（TNBC + 卵巢）检验它在耐药时如何调制；Launonen/Färkkilä 2022 mIF 与 Pal 2021 BRCA1+/– 在 HGSOC 之外给出 HRD 分层的人体参照；逐队列 CPTAC 蛋白基因组学（Zhang 2016 / McDermott 2020 HGSOC、Krug 2020 乳腺、Dou 2020 UCEC、Cao 2021 PDAC、Vasaikar 2019 CRC）把 STAT1 / MHC-II / ISG 产物 / LGALS9 读出在项目的核心瘤种里都锚到蛋白层。
3. **Aim 3（签名机理）多了逐基因分子指纹 + 细胞系必需性 + 药敏层。** Replogle 2022 Perturb-seq 在单细胞分辨率上覆盖 BRCA1、BRCA2、RAD51、RAD51C/D、PALB2、BRIP1、53BP1、Shieldin (SHLD1/2/3)、REV7；**DepMap + PRISM** 在约 1,150 条细胞系上补上逐细胞系的 HR 基因必需性与逐细胞系的 PARPi 敏感性；**LINCS L1000** 加上逐细胞系的 PARPi → ISG 扰动签名。三者合起来，让项目可以在原则上把基因组瘢痕 HRD 与功能 HRD 区分开，并在外推到肿瘤之前核对各种 PARPi 是否真的在 HRD 相关细胞系里诱导 ISG。
4. **Aim 4（泛癌定位）多了免疫原型框架。** Combes IRIS、Nieto TICAtlas、Tirosh 3CA 与 Chu T-stress 让项目把 HRD-high 肿瘤放进泛癌免疫原型图，并区分 IFN 驱动与应激驱动的 T 细胞状态。[pan-cancer 押注](the-pan-cancer-bet.zh.md)所说的"HRD-high × IFN/eTreg-high"亚组从此是已有原型空间里的一块标注区域，不再是漂浮的主张。
5. **Aim 5（临床一致性）通过 IO 试验 bulk RNA 队列拿到了一个真实替代终点。** IMvigor210（mUC）、IMmotion150/151（mRCC）与 Braun CheckMate-009/010/025（ccRCC）提供约 1,700 例患者的配对转录组 + 真实 IO 结局 —— 在任何 PARPi 联合论证之前，这是项目最接近"HRD-high × IFN/eTreg-high 是否跟真实临床应答相符"的检验。如果分层器在其中至少一些队列里能跟上 IO 应答，那它至少还能跟上点什么。
6. **Aim 6（转化假设）多了一个警告面、一个非 HGSOC 的 CCR8 锚点，以及一份 HGSOC 之外的公开 PARPi 治疗转录组。** Khan 2026 意味着项目必须论证：TCGA bulk RNA 上的 CCR8 信号是肿瘤内禀机制，而不是外周 T 细胞迁移的伪影 —— AMTEC 配对活检就是最自然的阴性对照。Tay 2025 NSCLC anti-PD-1 给出 HGSOC 之外首份单细胞证据，表明 CCR8⁺ Treg 区室是一条对治疗有反应的轴。**TOPARP-B**（Mateo 2021，olaparib mCRPC 肿瘤 RNA + 结局，通过 EGA）是唯一一份公开存档的 PARPi 试验肿瘤 bulk RNA-seq 队列 —— 它让 IFN/eTreg 签名真正能在 HGSOC 之外的瘤种里针对 PARPi 应答打分。
7. **Aim 7（IO 下的 CCR8 动力学）变得可处理。** IO 单细胞锚点 —— Yost BCC/SCC 配对前后 + scTCR、Krishna ADAPTeR ccRCC 纵向、Caushi NSCLC + MANAFEST、Luoma HNSCC 新辅助、Sade-Feldman 黑色素瘤 —— 让项目可以在克隆型分辨率上问，IO 下 CCR8⁺ eTreg 克隆是否在持续存在，而 CD8 克隆在翻篇，以及 CCR8⁺ Treg 是否随新抗原负荷扩张。这是论证 PARPi + anti-CCR8 联合应当胜过任一单药的结构性前提。

总的来说：项目在*人体 PARPi 治疗单细胞*这一侧仍然锚在 HGSOC，但第 4–8 层提供了更宽的跨瘤种基座 —— HRD 分层的人体单细胞 + 空间（第 4 层）、逐基因 HR 缺失的 Perturb-seq（第 5 层）、泛癌免疫原型框架（第 6 层）、链条下游半段被最仔细测量过的 IO 治疗 bulk RNA + scRNA + scTCR 队列（第 7 层），以及在外推之前能逐细胞系做机制可行性检查的细胞系基线 + 扰动层（第 8 层）。这正是链条在被压力测试之前需要的跨瘤种数据量级，也是让 [pan-cancer 押注](the-pan-cancer-bet.zh.md)成立为分层器、而不是一般化主张所需的条件。
