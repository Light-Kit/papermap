---
title: '五层数据集计划 —— 每个数据集干什么、有多少病人、验证逻辑怎么搭'
date: '2026-06-02 19:57 UTC'
topics:
- hrd
- pan-cancer
- discovery
- validation
- perturbation
- atlas
- analysis-plan
summary: '这是 190 项语料如何被用起来的唯一一张正经地图。五张表：第一张把数据集按发现 → 验证的步骤钉死；第二张是病人 × 模态 × 瘤种矩阵，所有计数都从原文方法部分核过；第三张列出三个验证小图谱、每个成员各自要做什么；第四张是用扰动数据去模拟 HRD/HRP 对比的五条策略；第五张是配套的 HRP 图谱 —— 没有它整个项目就只剩描述。五层分析计划写在表后。立足点是泛癌种里的 HRD —— CCR8/IFN 轴只是轴涌现可能给出的一个候选输出，不是叙事的框。'
starred: true
---

这篇博客取代了两份旧版盘点（`the-data-we-have-to-work-with` 与 `the-hrd-resource-map`，现已归入 `_archive/`），换成一张按步骤来组织的地图。旧版是按时间和按家族走的 —— 用来认路可以，但都不说**每个数据集在分析里到底干什么**。这一篇说。

姐妹篇 [每个资源都是为了堵哪个缺口](the-gaps-that-built-each-resource.zh.md) 讲的是每个数据集**为什么会被造出来**；这一篇讲项目**怎么用每一个**。泛癌种这个框 —— 比 Luo 2024 的 CCR8 链条要宽 —— 在 [泛癌种的赌注](the-pan-cancer-bet.zh.md) 里立过了，对项目框架还不熟的读者请先看那一篇。

## 五层框架，一段话讲完

项目的形状是**发现 → 验证，落点锚在病人基因组**。Pre-Layer-1 先把 HRD 这件事本身在多种打分方法之间对齐。**Layer 1** 从公开的 WGS + bulk-RNA + 单细胞 + 空间队列里，在 HRD 相关瘤种上拼出一份病人层级的多组学记录。**Layer 2** 做轴涌现 —— 对 HRD 阳性病人在转录与空间特征上做无监督聚类，看跨瘤种里到底是哪条免疫/基质/复制应激轴把 HRD 亚群切开。**Layer 3** 做遗传学验证 —— 敲掉一个 HR 基因，能不能在细胞自主层面把病人层的签名复现出来？Replogle Perturb-seq、DepMap、LINCS L1000。**Layer 4** 做功能验证 —— 带有 HRD 基因型的 PDO 与 PDX 对 PARPi 的应答，是否和轴的预测对得上。**Layer 5** 用临床扰动做最后确认：BIOKEY 的 anti-PD-1 配对活检，以及 PROfound/MAGNITUDE/OlympiAD 的试验应答标签。终点是一个分层器 —— 多模态的 HRD 定义，加上涌现出来的那条可成药轴 —— 用来支撑未来 PARPi 联合方案的临床试验。

## 五张表分别回答什么

五张表，每张回答一个问题：

- **表 1。** 哪些数据集属于哪一步？
- **表 2。** 在发现侧：多少病人，什么瘤种，哪些模态？
- **表 3。** 在验证侧：哪些数据集可以拼成一个小图谱，每个成员各干什么？
- **表 4。** 扰动数据能不能模拟 HRD 对 HRP 的病人级对比？有哪几条策略，每条都漏掉了什么？
- **表 5。** 配套的 HRP（HR-proficient）图谱长什么样，又必须控住哪些混杂？

下面所有计数都是在一次并行调研（2026-06-02）里从源文献或活的数据门户上核出来的。论文和保藏点对不上时，表里报论文方法部分的口径，并把差异标出来。

---

## 表 1 —— 各分析步骤对应的数据集

| 步骤 | 数据集 | 主要用途 |
|---|---|---|
| **0. HRD 定义一致性** | HRDetect (Davies 2017)、CHORD (Nguyen 2020)、scarHRD (Sztupinszki 2018)、Myriad myChoice (Telli 2016)、ovaHRDscar (Färkkilä 2023)、DeepHRD (Bergstrom 2024)、expHRD、BRCA1 甲基化、MSK-IMPACT/CHORD 面板派生、Tempus HRD-RNA、FoundationFocus LOH | 在每个队列上跑所有输入模态匹配得上的打分器。输出一张一致性图：HRD-一致（全部打分器一致）、HRD-不一致（打分器之间分歧）、HRD-阴性。**不一致**就是 Layer 2 里每个病人的标签。 |
| **1a. 病人图谱 —— 基因组骨架** | TCGA 泛癌（Knijnenburg 2018 HRD 调用）、PCAWG、HMF (Priestley 2019 + CHORD)、MSK-CHORD (Jee 2024)、CPTAC 泛癌、AACR Project GENIE、FMI-Flatiron CGDB、ORIEN AVATAR | 每个病人一行 —— HR 基因状态、HRD 评分、治疗史、OS/PFS。规模与结局的骨架。 |
| **1b. 病人图谱 —— sc + 空间层** | Vázquez-García 2022 (HGSOC)、Olbrecht 2021 (HGSOC)、Pal 2021 (BRCA1 乳腺)、Wu 2021 (乳腺)、BIOKEY/Bassez 2021 (乳腺 anti-PD-1)、Hwang 2022 (PDAC)、Launonen 2022 (mIF HGSOC)、Stur 2022 (Visium HGSOC)、3CA、CellxGene Census、TISCH2、TICAtlas、IRIS、Chu 2023 | 在基因组骨架之上，给配套有 sc/空间的那一部分病人加一层细胞状态 + 空间生态位。汇总型资源（3CA、CellxGene、TISCH2）用作跨队列谐调；被它们再托管的队列**不重复计数**（见表 2 脚注）。 |
| **2. 异质性 + 风险** | TCGA 生存 + Knijnenburg、HMF 纵向、MSK-CHORD 结局、AACR Project GENIE BPC、PROfound、MAGNITUDE、OlympiAD、OlympiA、SOLO-1、ARIEL3、NOVA、TOPARP-A/B (Mateo 2021)、Christie 2019 AOCS | 用 Layer-1 特征对 HRD+ 病人做聚类；对结局做 Cox 回归。主要结局 PARPi 应答；次要铂应答、OS、IO 应答。 |
| **3. 遗传学验证** | Replogle 2022 Perturb-seq (K562 + RPE1)、DepMap CRISPR + RNAi、CCLE (RNA + 蛋白)、LINCS L1000、PRISM | Replogle 里 sgHR-基因 vs sgCtrl = 细胞自主的合成 HRD 签名；与 Layer 2 病人派生签名做对比。DepMap + PRISM 给出正交的依赖性 + 药敏；LINCS L1000 补上药物扰动那一侧。 |
| **4. 功能验证** | Kopper 2019 (HUB ov)、Hill 2018 (HGSOC PDO)、Tiriac 2018 (PDAC)、Driehuis 2019 PDAC、Bruna 2016 (乳腺 PDTX)、van de Wetering 2015 (CRC)、PDMR、EurOPDX、HCMI/NGCM、Xeva (Mer 2019) | 给细胞系签名套上组织背景这一层修饰。PDO PARPi IC50 vs HRD × 涌现轴评分；PDX 在异种移植尺度上再确认一遍。 |
| **5. 临床扰动** | BIOKEY (Bassez 2021)、TOPARP-A/B 病人级转录组、Christie 2019 AOCS、PROfound-ctDNA + MAGNITUDE-ctDNA 后续子研究 | 在治疗下，预测出来的轴会不会动？anti-PD-1 治疗前/治疗中配对活检 (BIOKEY) + 公开可及的 PARPi 治疗病人转录组。 |
| **（配套）HR-proficient (HRP) 对照图谱** | 每个 Layer-1 数据集的 HR-WT 切片，按瘤种 / 分期 / 治疗史匹配；剔除 MSI-H 与 POLE/POLD1 | 病例-对照的对照那一侧。没有它，项目就只是把 HRD 肿瘤描述了一遍，谈不上特异性。详见表 5。 |

表上有两点需要单独说一下。

**试验队列只进 Layer-5，不进 Layer-1。** 七个关键的 PARPi 试验（PROfound、MAGNITUDE、OlympiAD、OlympiA、SOLO-1、ARIEL3、NOVA）只公开了结局数据；病人级肿瘤转录组都由发起方控管，没有公开存档。**唯一**有公开病人级转录组的 PARPi 治疗队列只有两个：TOPARP-A/B（Mateo 2021，EGA 受控访问，走 ICR DAC）和 Christie 2019 AOCS（GSE140996）。这两个进发现图谱；那七个关键试验只在结局层贡献。

**汇总型资源不重复计数。** 3CA（124 个数据集）和 CellxGene Census（1,845 个数据集 / 1.62 亿细胞 / 9,960 万 unique）再托管了 Layer-1b 里大部分点名的队列。Vázquez-García 2022、Pal 2021、Wu 2021、BIOKEY 2021、Hwang 2022 在两边都出现。TISCH2（190 个数据集 / 630 万肿瘤细胞）再托管了 Pal、Wu、BIOKEY。Chu 2023（30.8 万 T 细胞）复用了 Wu 与 BIOKEY 的 T 细胞。表 2 的病人计数算给**原始**队列；汇总型资源只在跨队列谐调时用，不当作独立贡献者算。

---

## 表 2 —— 病人 × 模态 × 瘤种（发现侧）

计数取自源文献方法部分（适用时按 QC 后；单细胞计数按肿瘤细胞 QC 后）。模态标记：**✓** 有，**◐** 部分队列有（有文献记录），**–** 此数据集中无。

列：WGS、WES、RNA (bulk)、scRNA（括号里是 QC 后肿瘤细胞数）、scATAC、Vis (Visium)、SS (Slide-seq)、DSP (GeoMx DSP)、mIF（多重 IF / t-CyCIF）、TCR、CITE、Prot（蛋白）、Met（甲基化）、Pan（panel-DNA）、Clin（临床）、Out（结局）。

### 基因组骨架

| 数据集 | 瘤种 | N 病人 | HRD+ 子集 | WGS | WES | RNA | Pan | Met | Prot | Clin | Out |
|---|---|---|---|---|---|---|---|---|---|---|---|
| TCGA 泛癌（Knijnenburg 2018 在 PanCanAtlas 的 8,739 例上做的 HRD 调用） | 33 种 | 9,125 | 见 Knijnenburg 2018 Fig 2 按瘤种 | ◐ | ✓ | ✓ | – | ✓ | – | ✓ | ✓ (OS, PFI) |
| PCAWG (ICGC/TCGA 2020) | 38 种组织学 | 2,658 例供体 | 部分（SBS3 来自 Alexandrov 2020） | ✓ | – | ◐ (n=1,222) | – | – | – | ◐ | – |
| HMF —— Hartwig (Priestley 2019) | 25 + CUP，转移 | 2,399（入组 4,018 例） | CHORD 按样本 (Nguyen 2020) | ✓ | – | – | – | – | – | ◐ | –（有治疗史，无正式 OS） |
| MSK-CHORD (Jee 2024) | 5 —— NSCLC 7,809、乳腺 5,368、CRC 5,543、前列腺 3,211、PDAC 3,109 | 24,950 | 部分（HR 基因突变状态；panel 算不出 HRDsum） | – | – | ◐ | ✓ (MSK-IMPACT) | – | – | ✓ | ✓ (OS、time-to-met、NLP 应答) |
| CPTAC 泛癌 (Li 2023) | 10 —— BRCA、COAD、GBM、HGSC、HNSCC、LSCC、LUAD、PDAC、ccRCC、UCEC | 1,072 | 部分（WGS 可推；旗舰表里没列） | ◐ | ✓ | ✓ | – | ✓ | ✓（含磷酸化/乙酰化/糖基化） | ✓ | ◐（分期、OS；无 RECIST） |

### 单细胞 + 空间层

| 数据集 | 瘤种 | N 病人 | HR+ 子集 | WGS | RNA | scRNA (QC 后) | Vis | SS | DSP | mIF | TCR | CITE | Clin | Out |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vázquez-García 2022 (MSK-SPECTRUM) | HGSOC | 42（160 sites） | 每例的 WGS 类（HRD-Dup、HRD-Del、FBI、TD） | ✓ | – | ✓（~929k，全 compartment） | – | – | – | ✓ | – | – | ◐ | –（未治） |
| Olbrecht 2021 (Lambrechts) | HGSOC | **7**（14 个多位点样本） | 表 1 给出每病人 BRCA1/2 状态；N 小 | – | – | ✓ (18,403) | – | – | – | – | – | – | ◐ | – |
| Pal 2021 (Visvader/Lindeman) | 乳腺 —— BRCA1 携带者 + 散发 + 正常 | 55（69 libraries） | 8 例 BRCA1+ 样本（4 癌前 + 4 肿瘤） | – | – | ✓ (~341k) | – | – | – | – | – | – | ◐ | – |
| Wu 2021 (Swarbrick) | 乳腺 —— 11 ER+、5 HER2+、10 TNBC | 26 | TNBC BRCA1 小子集 | ◐ | – | ✓ (130,246) | ✓（11,535 spots / 6 sections） | – | – | – | – | ✓（157-Ab TNBC） | ✓ | – |
| BIOKEY (Bassez 2021) | 乳腺 anti-PD-1 | 40（80 paired biopsies） | 未按 HRD 分层 | – | – | ✓ (~175k) | – | – | – | – | ✓ | ✓ | ✓ | 应答 —— T 细胞 "expander" 与否 |
| Hwang 2022 (HTAN PDAC) | PDAC | 43（41 tumor + 2 normal） | 小（HTAPP 臂里个位数 BRCA/PALB2） | ◐ | ✓ | ✓ (224,988 nuclei) | – | – | ✓（21 tumors 上 GeoMx DSP） | – | – | – | ✓ | –（治疗臂对比） |
| Launonen 2022 (Färkkilä) | HGSOC | 44 —— 31 BRCA1/2-mut + 13 HR-WT | 31 BRCA1/2-mut | – | – | – | – | – | – | ✓（t-CyCIF，21 markers，112 TMA cores，124,623 cells） | – | – | ◐ | ◐（增殖性肿瘤亚群有预后信号） |
| Stur 2022 (HGSOC NACT) | HGSOC | 入组 12 / 分析 11 sections | **未按 BRCA 分层** —— 队列按 RECIST 1.1 NACT 应答（6 例 excellent vs 5 例 poor） | – | – | – | ✓（~5k spots / capture area） | – | – | – | – | – | ✓ | NACT 应答（非 OS/PFS） |

### 公开病人级转录组的 PARPi 治疗队列（并入发现图谱）

| 数据集 | 瘤种 | N 病人 | 治疗 | WGS | RNA | Clin | Out |
|---|---|---|---|---|---|---|---|
| TOPARP-A/B (Mateo 2021) | mCRPC | 49 + 98 = 147（跨两期） | 奥拉帕利 (olaparib) | ✓（部分） | ◐ | ✓ | 应答（复合） |
| Christie 2019 AOCS | HGSOC | ~93 | 铂 + 奥拉帕利维持 | – | ✓ | ✓ | 按 HRD 评分的 PFS |

计数的脚注。

**计数方法。** 病人 N 用源文献方法部分给的口径；多位点研究（Vázquez-García、Olbrecht）按病人数报，位点数括起来 —— 保藏样本数不等于病人数。单细胞计数取文献单独报告的肿瘤细胞 QC 后数；只有全局 QC 后数可得时（Vázquez-García、BIOKEY、Wu）就用那个数，并在表里标注。

**HRD 阳性子集 N 因定义而异，本来就不齐。** 在 TCGA 里，HRDetect 调出的 HRD+ ≠ Knijnenburg HRDsum 调出的 HRD+ ≠ BRCA1/2 突变定义的 HRD+。分析计划在有 WGS 的队列用 HRDetect（TCGA、PCAWG、HMF、CPTAC、Vázquez-García），只有 panel-DNA 的队列用 HR 基因突变状态（MSK-CHORD、AACR GENIE）。定义之间的分歧本身就是 Layer-2 的底料，不是噪声。

---

## 表 3 —— 验证小图谱

值得拼起来的三个小图谱。每行写清楚要合并什么、合并后能做什么联合分析、谐调风险藏在哪里。

| 小图谱 | 成员 | 可做的联合分析 | 谐调风险 |
|---|---|---|---|
| **HR 基因扰动参考** | Replogle 2022 Perturb-seq（K562 + RPE1，≥2.5M cells，全基因组 CRISPRi）+ DepMap CRISPR + RNAi（~1,100 lines）+ CCLE RNA（1,019 lines）+ CCLE 蛋白（Nusinow 2020，375 lines × ~9k proteins）+ LINCS L1000（130 万 profiles、25,200 个 perturbagens、978 个 landmark genes、80 lines） | 给每个 HR 基因一份转录签名（Replogle 给单细胞，LINCS 给 bulk），再加每个细胞系的依赖性 + PARPi 药敏（DepMap + PRISM），通过 CCLE 基线对齐到同一套谱系分类下。产物就是细胞自主的合成 HRD 签名，让 Layer 2 病人派生签名有得比。 | Replogle 跑的是 K562 (CML) + RPE1（非癌上皮）。没有肿瘤谱系，没有免疫背景。Replogle 撑得起的只是细胞自主那一段；其余都要靠 Layer 4。 |
| **PDO PARPi 应答图谱** | Kopper 2019（56 ovarian PDOs / 32 病人，niraparib IC50，发表的 panel 里无 olaparib）+ Hill 2018（33 HGSOC short-term cultures / 22 病人，olaparib IC50 + 功能性 RAD51-foci，~2/33 对 olaparib 敏感）+ Tiriac 2018（66 PDAC PDOs，研究性 panel 里有 olaparib）+ Driehuis 2019 PDAC（30 PDOs，24 例做 pharmacotype，76-cpd 含 olaparib）+ Bruna 2016（~83 breast PDTX / ~70 donors，22 例进 96-cpd PDTC 筛选含 olaparib，BRCA1/2 + 53BP1/REV7 lesions 已标）+ van de Wetering 2015（22 CRC PDOs / 20 donors，83-cpd panel，发表的 panel 里无 PARPi） | 跨器官比 PARPi IC50 vs HR 基因型 × 涌现轴评分。器官内比较锚定特异性（HGSOC + 乳腺 + PDAC）；CRC 当阴性对照器官，HRD 生物学在这里理论上不该预测应答。 | 单药 vs panel 筛选混着；纳入的 PARPi 也不一致（Kopper 只有 niraparib；Hill、Tiriac 研究臂、Driehuis、Bruna 有 olaparib；Driehuis HNSCC 与 van de Wetering 没有）。IC50 动态范围跨筛选不能直接比。 |
| **PDX PARPi 应答图谱** | PDMR（~220 套配对 PDX↔PDOrg↔PDC，85+ 种疾病，PDC 臂含 olaparib + niraparib）+ EurOPDX（1,010 PDX，7 国，283 例做 drug-dosing，Curie HBCx 有 PARPi 数据记录）+ HCMI/NGCM（148 NGCM models，62 例有完整分子数据，无标化药物筛选）+ Xeva（Mer 2019，3,470 PDX 整合，主分析 191 病人，51-药 panel 含 olaparib）+ Champions TumorGraft | 在体内做 HRD 基因型 × 药物应答，治疗动力学比 PDO 长。PDMR 与 EurOPDX 是开放贡献者；Champions 加上病人配对深度，但需要商业访问。 | 跨机构 PDX 筛选剂量-时序高度异质。用 PDMR 当谐调骨架，EurOPDX 拓器官覆盖，Xeva 做整合分析。 |

### 每个数据集的用法地图

**遗传扰动成员：**

- **Replogle 2022。** 取整套 HR panel 的 sgRNA —— BRCA1、BRCA2、PALB2、RAD51、RAD51B/C/D、BRIP1、BARD1、ATM、ATR、CHEK1、CHEK2、NBN、MRE11A、RAD50、FANCA-G、FANCD2、FANCM、TP53BP1、SHLD1/2/3、MAD2L2 (REV7)、USP1、POLQ —— 与 sgCtrl 对比算扰动后转录签名。产物：每个 HR 基因在 K562 与 RPE1 上分别给一份单细胞分辨率的转录指纹。注意：基因清单是按表达**门控**过的 —— 下游用之前必须对照 Table S3 核一遍。
- **DepMap (Tsherniak 2017 + 现行)。** HR 通路基因在全部谱系上的 CRISPR + RNAi 必要性。产物：每条细胞系的 HR 基因依赖分。与 PRISM PARPi IC50 交叉验证"HR 必需的细胞系对 PARPi 敏感"这条预测。
- **PRISM (Corsello 2020)。** FDA 批准的四个 PARPi 全部确认（奥拉帕利 (olaparib)、尼拉帕利 (niraparib)、卢卡帕利 (rucaparib)、他拉唑帕利 (talazoparib)、维利帕利 (veliparib)）。主筛 4,518-cpd × 578-line 单剂量 2.5 µM；二筛 8 点 4 倍稀释从 10 µM 起 × 499 lines。跨细胞系 PARPi 药敏的参考。
- **CCLE。** 基线 RNA（1,019 lines）与蛋白（Nusinow 2020，375 lines × ~9k proteins）。是 LINCS 扰动签名与 Replogle Perturb-seq 指纹叠在上面的"静息态"。用来挑出始终高 ISG/IFN 的细胞系当阳性对照。
- **LINCS L1000。** 9 条 Touchstone 细胞系（以及更广的 80-line panel）上的 PARPi 处理签名；五个 PARPi 全部 10 µM 标化覆盖。是 Replogle 单细胞遗传扰动数据在 bulk-RNA 端的补集。

**PDO 成员：**

- **Kopper 2019。** 卵巢器官对 niraparib 应答的特异性，每条系都有 BRCA1/2 状态记录。当作卵巢的器官内检验。
- **Hill 2018。** 罕见 —— 同时发布了基因组 HR 状态**和**功能性 RAD51-foci 这种 HR 缺陷读出。用来验证基因组 HRD 调用与功能性 HR 缺陷是否对得上。
- **Tiriac 2018、Driehuis 2019 PDAC。** PDAC 的器官内检验。Tiriac 把 PDO 化疗敏感性和临床结局连了起来 —— 稀有且重要。
- **Bruna 2016。** 乳腺 PDTX，每个模型都标注了 BRCA1/2 + 53BP1/REV7 缺失 —— 在队列内尺度上支撑 BRCA 驱动 vs 抗性机制的对比。
- **van de Wetering 2015。** CRC PDOs —— 阴性对照器官，HRD 签名理论上**不**该预测 PARPi 应答。发表的 panel 里没 PARPi，所以它当作转录侧的阴性对照。

**PDX 成员：**

- **PDMR。** 标准 panel 里 PDC 臂含 olaparib + niraparib，门户里可按 BRCA1/2/PALB2/RAD51C/D 分层。当作 PDX 侧的开放骨架。
- **EurOPDX。** 加器官覆盖（1,010 models，7 institutions）。Curie HBCx 是有记录的 PARPi 测试子集。
- **HCMI/NGCM。** 无标化药物筛选，但 62 例有完整 WGS/WES/RNA —— 可做分子学验证，不作药理学。
- **Xeva (Mer 2019)。** 药物基因组学整合框架 —— olaparib 在跨 3,470 条 PDX 记录的 51-药 panel 里。用 Xeva R 包做跨 PDX 分析。

---

## 表 4 —— 把扰动数据当成 HRD/HRP 的拟态

发现侧比的是 HRD 阳性病人 vs HR-proficient 病人。扰动侧得把这层对比在模型里拟出来。五条策略，按**直接程度**排 —— 最直接的（策略 A）是允许做**因果**判读的那一条；其余的，要么是相关性的，要么是背景层面的：

| 策略 | 拟态对象 | 数据集 | 局限 |
|---|---|---|---|
| **A. 单细胞分辨率的遗传 HR 基因敲除** | 细胞自主的 HR 缺陷转录态对配对亲本细胞。对比是 sgBRCA1 / sgBRCA2 / sgPALB2 / sgRAD51 / sgSHLD1-3 / sgTP53BP1 / sgREV7 vs sgCtrl，扰动后用单细胞读出。 | Replogle 2022 Perturb-seq（全基因组规模，K562 + RPE1） | K562 (CML) + RPE1（非癌上皮）。没有肿瘤谱系、没有基质、没有免疫。只能撑细胞自主层面的主张。 |
| **B. CRISPR 必要性 + 药敏关联** | "最依赖 HR 基因的细胞系对 PARPi 最敏感" —— 对 HR 通路状态的间接读出。 | DepMap CRISPR + RNAi + PRISM PARPi | 细胞系里 BRCA1/2 突变线少（CCLE 跨谱系约 30 条）；必要性会混入谱系相关的旁路信号。 |
| **C. PARPi 药物扰动** | 药物诱发的 HR 应激签名 —— PARPi 处理后 6/24 h，细胞是什么样？ | LINCS L1000（Touchstone 9 lines × 全部 5 个 PARPi，10 µM）；PRISM PARPi 8 点剂量-应答 | 急性药物应答 ≠ 慢性 HRD 状态。捕获的是复制应激，不是组成性 HR 缺陷。 |
| **D. 同源供体 PDO 内的等基因 HR-基因 KO** | 同一供体的 HR-proficient vs HR-deficient，在人源肿瘤或正常组织类器官里。是肿瘤背景下 HRD 最干净的供体内因果对比。 | **目前语料里没有。** 候选：Dekkers / van Rheenen / Clevers 的 CRISPR 改造等基因 BRCA-KO PDO 方案 (2020)，用在 Sachs 2018 乳腺 PDO 生物库的母本上。 | 稀、供体特异、扩展慢。 |
| **E. 体内 Brca 条件性小鼠模型** | 免疫健全宿主里的 HR 缺陷肿瘤 —— 唯一一种让免疫微环境从肿瘤起始起就与 HR 缺陷共演化的设置。 | **目前语料里没有。** 候选：Jonkers KB1P (K14-Cre;Brca1^f/f;Trp53^f/f，2007，basal TNBC)、KB2P (Brca2，2010)、WB1P (Wap-Cre;Brca1^f/f;Trp53^f/f，2022，luminal)；Perets/Drapkin Pax8-Cre Brca1/2 HGSOC GEMM (2013)；Dreyer/Sansom KPC-Brca2 PDAC (2021)。 | 是鼠不是人；等位漂移；免疫系统不完全有代表性。 |

### 语料缺口讨论 —— D + E

策略 A、B、C 都覆盖了。D 和 E 没有 —— 语料里**零**条等基因 HR-KO PDO、**零**条体内 Brca 条件性小鼠模型。Phase-B 的调研子智能体扫了一遍补口候选，捞回六项，值得在后续提交里加上（本轮不加）：

- `jonkers-2007-kb1p-gemm` —— K14-Cre;Brca1^f/f;Trp53^f/f basal TNBC GEMM；体内 PARPi 工作的奠基平台（Jonkers lab，NKI）。
- `jonkers-kb2p-brca2-gemm` —— K14-Cre;Brca2^f/f;Trp53^f/f；同背景下 Brca1 vs Brca2 对比。
- `jonkers-2022-wb1p-luminal` —— Wap-Cre;Brca1^f/f;Trp53^f/f；luminal 乳腺肿瘤，回答细胞起源的问题。
- `perets-2013-ovarian-brca-gemm` —— Pax8-Cre fallopian-tube 起源 HGSOC；卵巢特异的免疫健全 HRD 模型。
- `dreyer-2021-kpc-brca2-pdac` —— Pdx1-Cre;Kras^G12D;Trp53^R172H;Brca2^f/f；匹配 KPC 对照的 PDAC HRD GEMM。
- `dekkers-2020-isogenic-brca-pdo` —— 配对供体人源乳腺类器官里的 CRISPR 改造 BRCA1/2-KO；唯一真正的供体内等基因资源。

加上之后，策略 D 与 E 各有一个成员，验证链才能在不离开语料的前提下走到体内 + 供体内。这次加是一次单独的语料更新，不在本博客范围内。

---

## 表 5 —— 配套的 HRP 图谱

HRP 图谱不是一个单独的数据集，而是每个 Layer-1 数据集里 HR 野生型那一片切出来 —— 按协变量匹配，匹配的强度要顶得住"HRD 肿瘤本来就免疫细胞多 / 年纪更大 / 都是铂治疗之后的"这类显而易见的反驳。

| 来源 | HR+ 切片 | HR− (HRP) 切片 | 匹配策略 | 备注 |
|---|---|---|---|---|
| TCGA 泛癌 (Knijnenburg 2018) | 每瘤种 HRDsum 高（最高四分位 + BRCA1/2-mut） | 最低四分位 HRDsum + HR-panel WT | 瘤种内按分期、年龄、治疗暴露匹配；剔除 MSI-H、POLE/POLD1、Lynch | 泛癌骨架；按瘤种 HRD+ 比例本就不齐（卵巢最高；THCA / KICH / KIRP / LAML 最低） |
| HMF (Priestley 2019) —— 转移 | CHORD HRD-阳性 | CHORD HRD-阴性 + HR panel WT | 按既往铂、既往 PARPi、活检部位匹配（HMF 偏乳腺 / 肺 / CRC） | TCGA 偏原发，HMF 给出转移端的对照 |
| MSK-CHORD (Jee 2024) | 每病人 HR 基因突变 | HR-WT panel | 在覆盖的 5 个适应症内匹配；结局可关联 | Panel-DNA 算不出 HRDsum —— 定义只能是 HR 基因突变，不是 HRD 评分 |
| Vázquez-García 2022 | 按 WGS 类的 HRD-Dup + HRD-Del | FBI + TD WGS 类 | 同研究、同平台；治疗未启动 | HGSOC 在 sc 分辨率上最干净的研究内对比 |
| Wu 2021（乳腺） | TNBC BRCA1-mut 子集 | 散发 ER+ / HER2+ / TNBC | 按亚型匹配；亚型混杂很强 | 优先用 TNBC 内分层 |
| Pal 2021 | 4 例 BRCA1 肿瘤 + 4 例 BRCA1 癌前 | 24 例 mammoplasty 正常 + 散发肿瘤 | 研究内分析，模型里把癌前和肿瘤分开 | BRCA1 癌前那一臂独特 —— 给出早期态签名 |
| BIOKEY (Bassez 2021) | BRCA-mut 子集（小） | BRCA-WT | 治疗前基线匹配；应答分层与 BRCA 状态有交互 | 治疗臂混杂：anti-PD-1 应答本身就是另一根轴 |
| Launonen 2022 | 31 BRCA1/2-mut | 13 HR-WT | 同研究，只有 mIF —— 直接空间对比 | 直接配对的空间图谱 |
| TOPARP-A/B (Mateo 2021) | HRR-altered 应答者 | HRR-altered 非应答者 + HR-WT | 治疗-应答分层 | PARPi 治疗的发现臂 |

### 所有行都要控住的混杂

HRD vs HRP 对比一旦不处理这些就垮。按对分析的偏差强度从大到小列：

- **剔除 MSI-H。** MSI-H 肿瘤带有自己的一套免疫签名（高 TMB、IFN、CD8 浸润），表型上像 HRD 驱动的那一套，但成因不同。默认从两侧都剔除。
- **POLE/POLD1 高突变型。** 与 MSI-H 同理 —— 会污染 IFN/TMB 轴。剔除。
- **Lynch 综合征病人。** 是 MSI-H 的子集，但单独标 —— 因为在 Pal 2021 这类遗传对比里，胚系状态本身重要。
- **治疗史。** 铂后、PARPi 后病人的转录基线和未治不一样。分成未治 / 铂后 / PARPi 后做。HMF 大部分是治疗后，TCGA 大部分是未治 —— 这是按队列分别建模的决定，不是用协变量去回归扣掉。
- **原发 vs 转移。** TCGA 是原发，HMF 是转移。合并前必须先按活检部位调整。
- **乳腺里的亚型混杂。** ER 状态、HER2 状态、TNBC —— 每个亚型都有自己的免疫基线。乳腺要先分亚型再合。
- **未治 vs 治疗后的单细胞基线。** 化疗后单细胞构成会显著变。Vázquez-García、Olbrecht、Wu、Pal 是未治；BIOKEY 是 anti-PD-1 治疗后。未治子集是更干净的发现层。

---

## 分析计划，五层 + 一层

这一节把表串起来。它是项目里**拿数据干什么**的那一层。计划本身和任何单一机制都解耦 —— 包括 Luo 2024 那条 CCR8 链。

### Pre-Layer-1 —— HRD 定义一致性

第一件交付物是一张跨队列的 HRD 多打分器一致性图。每个有 WGS 的病人都跑 HRDetect、CHORD、ovaHRDscar（在 HGSOC 里）、scarHRD、基于 SBS3 的调用；只有 panel-DNA 的病人用 HR 基因突变状态（BRCA1/2/PALB2/RAD51 旁系同源/BRIP1/BARD1/ATM/CHEK1/2）。有 H&E 的病人跑 DeepHRD 作为影像端的打分器。然后把每个病人归到三个桶里之一：**HRD-一致**（≥3 个打分器一致）、**HRD-不一致**（打分器之间分歧 —— 尤其当 WGS 打分和 panel-DNA 派生调用矛盾时）、**HRD-阴性**。不一致不是噪声，是下一层的分析底料。

### Layer 1 —— 病人记录图谱

拼一张病人级表：一行一病人，列是瘤种、HR 基因状态、各打分器的 HRD 评分、转录轴评分（在有 bulk 和 sc 的地方算）、空间特征（从 Visium / mIF / Slide-seq / GeoMx 里抽）、治疗史、OS、PFS。这是**病人记录**图谱，不是整合的单细胞图谱。病人记录表能支撑 Cox 回归、轴涌现、分层器开发。整合的单细胞图谱是 stretch goal，支撑的是细胞态制图，不是分层。

具体地：TCGA + HMF + MSK-CHORD + PCAWG + CPTAC 是骨架。Vázquez-García + Wu + Pal + BIOKEY + Hwang + Olbrecht + Launonen + Stur 给配套有 sc/空间的那部分病人加一层。汇总型资源（3CA + CellxGene + TISCH2）做跨队列批次谐调，不当独立贡献者。试验结局数据（PROfound + MAGNITUDE + OlympiAD + OlympiA + SOLO-1 + ARIEL3 + NOVA）只作为结局行入表，转录组列标注"发起方控管，不可用"。

### Layer 2 —— 轴涌现

在 HRD-一致的病人里，对转录组 + 空间 + 免疫构成这些列做无监督结构发现。文献里以前出现过的候选轴 —— IFN/cGAS-STING 信号、抗原呈递（肿瘤上 MHC-II）、CCR8+ 效应 Treg 浸润、CD8 效应 vs 耗竭比、复制应激、免疫冷亚群、抗原丢失 —— 都要测一下能否跨多瘤种把 HRD-一致亚群切开，但任何一条都不能预先承诺。如果跨瘤种就只涌现出一条轴，那就是那条轴。如果涌现两到三条，那分层器由它们联合定义。

交给验证侧的时候，统计纪律不能松。从病人图谱推出来的轴**不能**在它被推出来的同一批病人上"被验证"—— 那是循环论证。留出的设计是 TCGA-train / HMF-test 分割：在原发肿瘤队列上发现轴，在转移队列上验证。试验队列的结局数据是第二组留出 —— Layer-2 发现阶段绝不碰。

### Layer 3 —— 遗传学验证

Replogle Perturb-seq sgHR-基因 vs sgCtrl：在 K562 + RPE1 的两个库里，给每个 HR 通路基因算扰动后转录签名。产物是每个 HR 基因一份单细胞指纹。和 Layer-2 病人派生的轴比一下：细胞自主的 Replogle 签名能不能复现病人那条轴？若能，病人信号里就含有细胞自主成分 —— 那条轴至少部分**由** HR 缺失**引起**，不只是与它相关。DepMap CRISPR 必要性 + PRISM PARPi 药敏给出正交的遗传必要性 + 药敏参考。LINCS L1000 PARPi 签名（10 µM、6/24 h、9 条 Touchstone 系）把遗传/药物扰动的三角形补齐。

这一层的风险纪律：分 HR 亚组做 Cox 回归，每个协变量需要 ≥10 个事件。子队列（比如不常见瘤种里的器官内 HRD+）肯定不够。合的时候要小心。

### Layer 4 —— 功能验证

PDO PARPi IC50 vs HRD 基因型 × Layer-2 轴评分，在 PDO 生物库（Kopper、Hill、Tiriac、Driehuis、Bruna，以及作为阴性对照器官的 van de Wetering）上做联合建模。轴评分能不能在 HR 基因型之外**再**预测 PARPi 应答？PDX 在异种移植尺度上确认（PDMR + EurOPDX + Xeva + HCMI 做分子端交叉参考）。这是套在细胞自主 Replogle 签名之上的"组织背景修饰"层。

### Layer 5 —— 临床扰动

BIOKEY anti-PD-1 配对活检：预测出来的轴在 anti-PD-1 治疗下会不会动？然后 TOPARP-A/B（PARPi mCRPC）和 Christie 2019 AOCS（铂 + 奥拉帕利 HGSOC）当作 PARPi 治疗的公开发现队列。PROfound + MAGNITUDE + OlympiAD + OlympiA + SOLO-1 + ARIEL3 + NOVA 只贡献结局 —— 应答者 vs 非应答者标签，不给转录组 —— 用来验证 Layer-2 的轴跟得上临床 PARPi 应答。

### 隐含的 aim 5 —— 翻成试验入组方案

终点是一张试验入组方案：谁会被入组、用什么生物标志（HRD 打分器组合 + 轴评分切点）、对什么联合方案、在什么背景下。这一步是回到 Luo 2024 的连接 —— 但不被它绑死。如果 Layer-2 涌现的轴确实和 CCR8/IFN 相关，未来的试验就是 PARPi + anti-CCR8。如果涌现的是别的（复制应激易损性、抗原呈递缺陷、免疫冷亚群），未来的试验就是别的。数据架构两边都通用。

---

## 交付物

链条端到端跑完，项目产出五件命名的交付物：

- 一张跨打分器、按病人、泛癌的 **HRD 一致性图**。是第一张跨打分器、多模态的 HRD 调用图谱。
- 一份**病人记录多组学图谱** —— 一行一病人，列 = HRD 调用 + 转录轴 + 空间特征 + 结局。
- 一张**轴涌现图** —— 跨瘤种把 HRD 亚群切开的那条（或那几条）可成药轴，在 HMF 队列上做留出验证。
- **验证交叉参照** —— Replogle / DepMap / PRISM / LINCS 给细胞自主 + 药物扰动可重复性；PDO + PDX 给组织背景的可重复性。
- 一份**试验入组方案** —— 分层器以它在未来组合试验方案里应有的样子写出来。

---

## 调研中应用的语料修订

随本博客一同对 YAML 做了两处修正（初稿里指出的 Launonen DOI 其实是调研 agent 误读 —— 语料里写的本来就是正确 DOI）：

1. **Hwang 2022 空间模态**：原本语料 YAML 的 `why` 文本把 Hwang 2022 写成 PDAC + Slide-seq。发表版（Hwang et al. 2022 *Nat Genet*）用的是 NanoString GeoMx Whole-Transcriptome DSP，做在 21 个肿瘤上，不是 Slide-seqV2。`label` 与 `why` 已改为 GeoMx DSP。Slide-seq 可能对应 Hwang 实验室的另一篇姊妹存档，但不属于这份语料的锚定文献。
2. **Stur 2022 分层**：原本语料 YAML 暗示 Visium 队列按 BRCA 状态分层。发表版 Stur 2022 *iScience* **没有**报告 BRCA 状态；队列分组用的是 RECIST 1.1 NACT 应答（6 例 excellent vs 5 例 poor 应答者）。`label` 与 `why` 已改为 NACT-应答框架 —— Stur 2022 支撑的是 NACT-应答这一层分析，不是 BRCA 分层的空间分析。BRCA 分层的那篇 Stur 是另一篇 2023 年的 preprint。
