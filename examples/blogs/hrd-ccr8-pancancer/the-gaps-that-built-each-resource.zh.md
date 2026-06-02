---
title: '每一份资源都为填补一道缺口而生 —— 这个语料库赖以站立的数据，背后的来路故事'
date: '2026-06-02'
topics:
- hrd
- tcga
- pcawg
- hartwig
- hrdetect
- chord
- cellxgene
- human-cell-atlas
- organoid
- msk-impact
- aacr-genie
- tracerx
- data-creation
- consortia
summary: '这是 resource-map 与 data-we-have-to-work-with 两篇博客的前传。本语料库收录的每一份数据，都因前一代数据做不到某件事才被造出来 —— 或缺规模，或缺模态，或缺队列，或缺评分，或缺时间维度。本文沿着六道缺口走一遍，点出填补它们的联盟、实验室与公司，连同年份、PI、资助方，以及创立者们自己在原始论文里给出的措辞。读到最后会更明白：选 Luo 2024 作为锚点并非偶然 —— 这个锚点正站在它之前每一代填缺工作的肩上。'
starred: true
---

这个语料库里的每一份资源，存在的理由都很相似：上一代数据做不到造它的人想要它做的事。2006 年的 TCGA 试点上马，是因为彼时还没有任何一个团队能在同一批肿瘤上同时大规模测出 DNA、拷贝数、甲基化与表达。PCAWG 上马，是因为 TCGA 以外显子为主，结构变异在那里几乎隐形。Hartwig 上马，是因为真正杀人的癌是转移性的，而 TCGA 采的是原发灶。HRDetect 上马，是因为 Myriad 的检测算法是一个收费的黑箱。Human Cell Atlas 上马，是因为一管 bulk RNA-seq 里有 20–50% 是非肿瘤成分的平均值。TRACERx 上马，是因为一次活检只是一个过程的一帧快照。

六道缺口，六轮资源建设。本文一道一道地走。它是 [the data we have to work with](the-data-we-have-to-work-with.zh.md)（罗列存在的资源）与 [the HRD resource map](the-hrd-resource-map.zh.md)（按家族组织资源）的前传。这里要问的问题不同：*这些东西为什么会存在*。下面每一处的年份、PI、资助方和"最初目标"原话，都来自每节末尾所引的论文或门户，不是凭记忆。

## 1. 画一个群体，而不是一颗瘤

第一道缺口，是模态的规模。TCGA 之前的肿瘤基因组学还停在 Sanger 时代 —— 一个基因，一篇论文。2006 年由 NCI 与 NHGRI 联合启动的 TCGA 试点押了一个赌注：在数百颗*同样的*肿瘤上同时跑 DNA 测序、SNP 阵列拷贝数、表达微阵列与甲基化阵列，并在论文发表前就把数据放给整个学界。2008 年 *Nature* 那篇胶质母细胞瘤论文兑现了这个赌注 —— 206 颗肿瘤跑四个平台，其中 91 颗做了 Sanger 测序 —— 而它对最初目标的措辞毫不含糊： *"to assess the value of large-scale multidimensional analysis of these molecular characteristics in human cancer and to provide the data rapidly to the research community."* 这一句话，几乎就是接下来十年肿瘤基因组学的整套基础设施哲学。

ICGC 紧接着在 2008 年成立（章程年份；奠基会议在 2007 年 10 月的多伦多）。2010 年 Hudson 在 *Nature* 上写下的目标，是要做 *"comprehensive catalogues of genomic abnormalities ... in 50 different cancer types"*，并采用国别分布式的生产模式与一套全新的生物伦理框架（开放 + 受控分层），这套框架自此成了之后每一个联盟的模板。ICGC 是 TCGA 不得不与世界共享的那份资源。

PCAWG 是一次跨队列的重分析。2020 年作为 *Nature* 旗舰文章发表，由 ICGC/TCGA Pan-Cancer Analysis of Whole Genomes Consortium 主导，把 38 种肿瘤的 2,658 个独立病人（2,778 份样本）汇集起来，在共享云基础设施上跑一条统一的流水线。它填的缺口是：ICGC 各国流水线产出的 calls 之间存在微妙的不可比，而 TCGA 又偏向外显子 —— 非编码驱动突变与结构变异基本是看不见的。PCAWG 之后，非编码驱动词汇和突变特征词汇才真正在跨队列层面变得可信。

Hartwig（HMF）回答的是转移性这一头。Priestley 等人 2019 年发表的论文，是当时最大规模的转移性泛癌基因组研究 —— 2,520 对配对的肿瘤-正常 WGS、2,399 名病人，样本来自荷兰 CPCT-02 / DRUP 跨 41 家医院的活检网络。动机很直接：真正杀人的癌是转移性的，而 TCGA 里几乎没有这类样本。HMF 的数据显示，转移性肿瘤约 56% 携带全基因组倍增，而原发灶只有 25–37% —— 这种差异，没有这个新队列就根本看不到。

CPTAC 补上的是蛋白质组学这一层。Ellis 等人在 2013 年 *Cancer Discovery* 上为联盟做了公开界定，做法是把当时最新的质谱方法跑到已经被 TCGA 注释过的肿瘤上，目标用他们自己的话说，是要给出 *"a fully integrated accounting of DNA, RNA, and protein abnormalities in individual tumors."* TCGA 测的是 DNA 与 RNA。药物作用于蛋白。CPTAC 把这条回路闭合上了。

*来源*：GBM-pilot 2008 PMC2671642；ICGC Hudson 2010 PMC2902243；PCAWG PMC7054214；HMF Priestley 2019 PMC6872491；CPTAC Ellis 2013 PMID 24124232。

## 2. 不靠黑箱也能给 HRD 打分

第二道缺口，是评分。从 2000 年代后期起，单凭 BRCA1/2 检测已经漏掉了绝大多数功能性 HR 缺陷肿瘤。Marquard 与 Birkbak 证明，LOH、端粒等位失衡（TAI）与大规模状态转换（LST）在 SNP 阵列上各自都能追踪 HRD；这一领域需要的是一个可以部署的、单一的 HRD 判读。Telli 等人在 2016 年（*Clinical Cancer Research*）把这三项不加权地合成一个 HRD-score，把前瞻性切点锁在 ≥ 42，并在三项 TNBC 新辅助试验上做了验证。这后来成了 Myriad 的 myChoice CDx，再之后又成了 olaparib 与 niraparib 的伴随诊断 —— 但算法是专有的，平台只此一家，学界没有开放实现可用。

HRDetect 是 Davies 与 Nik-Zainal 2017 年在 *Nature Medicine* 上给出的回答，做在 Wellcome Sanger Institute。前提是：全基因组测序一次性暴露了突变特征（SBS3、SBS8、重排特征 RS3/RS5、微同源 indel）与基因组瘢痕型 HRD 指数；用 lasso 逻辑回归把它们在 560 个乳腺癌 WGS 上融合起来，就能在全基因组层面恢复 BRCA1/2 缺陷 —— AUC 0.98、灵敏度 98.7%，推断出的 HR 缺陷乳腺癌比例扩张到约 22%。它对自己要填的缺口写得很直接：只有约 1–5% 的乳腺癌带有 BRCA1/2 突变并因此对 PARPi 选择性敏感；HRDetect 把这个可受益人群扩大了。

scarHRD（Sztupinszki 与 Szallasi，2018，*npj Breast Cancer*）是 NGS 时代的开源接口。到 2018 年，SNP 阵列已逐步退场，WES/WGS 占主流，而既有的 HRD-sum 还没有 NGS 实现。scarHRD 经由 Sequenza/ASCAT 从 WES/WGS BAM 文件中重新推算等位特异性拷贝数，再重新计算这三项瘢痕分 —— 在 TCGA TNBC 上与阵列版本的 Pearson r 在 0.73–0.87 之间。至今多数学术泛癌 HRD 分析仍调用这个计算器。

CHORD（Nguyen 与 Cuppen，2020，*Nature Communications*）把判读推到突变特征之外。它基于 Hartwig 转移队列搭建（3,504 HMF + 1,854 PCAWG WGS），是一个直接拿全基因组突变上下文计数训练的随机森林模型，并输出 BRCA1 型与 BRCA2 型的判别， *"thereby simplifying HRD calling and avoiding potential complications associated with the fitting step required for computing signature contributions."* CHORD 填的缺口是：HRDetect 是在乳腺训练且依赖特征拟合，CHORD 是泛癌的，也不依赖特征拟合。

ovaHRDscar（Perez-Villatoro 与 Färkkilä，2023，*npj Precision Oncology*）是面向卵巢癌的收紧版。Telli 的 HRD ≥ 42 切点原本是在乳腺与卵巢混合样本上设的，结果是 HGSC 病人被偏乳腺的切点错分。作者只用 HGSC WGS 重新训练等位失衡片段的长度/数量阈值，并在三个独立的卵巢队列（DECIDER、TERVA、PCAWG AU-OVA）上拿到了更高的精度。

DeepHRD（Bergstrom 与 Alexandrov，2024，*J Clin Oncol*）把判读搬到了 H&E。开篇一句： *"Standard diagnostic tests for detecting HRD require molecular profiling, which is not universally available."* 一个弱监督 CNN，在 TCGA 全玻片图像（n = 1,008 乳腺 + 459 卵巢）上训练，不依赖任何测序输入即可预测 HRD，在外部队列上的铂类 PFS 风险比与分子 HRD 判读匹配。在低资源环境，或玻片对应的 DNA 已不可得时，DeepHRD 就是唯一能跑的 HRD 判读。

*来源*：Telli 2016 PMID 26957554；Davies 2017 PMID 28288110；Sztupinszki 2018 PMID 29978035；Nguyen 2020 PMC7643118；Perez-Villatoro 2023 PMC9800569；Bergstrom 2024 PMID 39083703。

## 3. 把临床真正治疗的那部分测出来

第三道缺口，是来源。TCGA 样本是研究专用的，没有治疗史也没有结局数据 —— 做生物学研究很好，但回答不了"这个病人对铂类响应如何"这种问题。需要造一种完全不同的资源。

MSK-IMPACT 是第一个达到临床级规模的 NGS。Cheng 等人在 2015 年（*J Mol Diagn*）把 341 基因的杂交捕获 panel 验证为一项 CLIA 检测；Zehir 等人在 2017 年（*Nat Med*）报道了在 Memorial Sloan Kettering 用扩展后的 410 基因版本前瞻性检测的前 10,336 名晚期肿瘤病人，资深作者是 Michael Berger。其中 11% 的病人入组了基因组匹配的试验 —— 它的奠基句子是把 MSK-IMPACT 设计为一个 *"flexible and comprehensive"* 的检测，用于前瞻性地刻画致癌 DNA 并把病人匹配到基因组指导的研究中去。它在下游的余波是：今天 cBioPortal 上任何自称"临床级泛癌"的队列，几乎都承袭这一设计。

AACR Project GENIE 是多中心的汇池。2017 年在 *Cancer Discovery* 上发表，资深作者是 Cerami（Dana-Farber）与 Sawyers（MSKCC），由八个创始中心（DFCI、MSKCC、Johns Hopkins、MD Anderson、Vanderbilt-Ingram、Gustave Roussy、Princess Margaret、NKI）共享约 19,000 份样本、18,324 名病人。动机是临床 NGS 数据 *"frequently siloed in individual institutions"* —— 任何单中心都缺乏问"罕见癌种里的罕见变异是怎样"这类问题的统计势。GENIE 用一份联合参与协议、一份数据使用协议，以及 Sage Bionetworks + cBioPortal 作为协调层，把这道缺口补上了。

Foundation Medicine 与 Flatiron 联合的 clinico-genomic database（CGDB）是商业上的对照物。Singal 等人在 2019 年 *JAMA* 上公布了设计：把 Foundation Medicine 的 CGP 结果与 Flatiron 来自 EHR 的临床记录做去标识化链接，覆盖全美 275 家肿瘤诊所，启动队列是 4,064 名晚期 NSCLC 病人。缺口在于：FoundationOne 的报告与结局是脱钩的，而 Flatiron 的 EHR 又没有 panel 级的分子刻画；这次链接让两者都对真实世界精准肿瘤学的证据生成有了用武之地。

ORIEN AVATAR 是它的学术对照物，通过 Total Cancer Care 协议做联盟式运作 —— 一份知情同意，覆盖终身纵向随访、生物样本库与再联系。AVATAR 在 TCC 同意的病人上叠加 WES + 转录组。它的使命直接挂在门户上： *"harness technology-based collaboration to break down barriers between institutions, enable rapid learning, and accelerate research and discovery."* （门户没有标注成立年份；它在 Moffitt 与俄亥俄州立大学的创始机构脉络另有文献记载。）

Tempus HRD-RNA（Leibowitz 等，2022，*BMC Cancer*）回答的是 panel 时代的 HRD 判读缺口。现有 HRD 检测都是 DNA only，验证范围又主要在乳腺/卵巢。Tempus 在 >16,000 份 RNA-seq 样本上训练了一个 RNA 表达分类器，与自家的 HRD-DNA 判读做配对，明确表述是：当 DNA 瘢痕信号本身不够明确时，DNA + RNA 一起 *"may identify HRD-positive patients across cancer types"*。（第一作者 Leibowitz 在 Tempus Labs；俄亥俄州立大学的 Stover 是协作的临床研究者 —— 语料库 id 出于历史原因仍为 `stover-2022-tempus-hrd`。）

*来源*：Cheng 2015 PMID 25801821；Zehir 2017 PMID 28481359；AACR GENIE PMC5611790；Singal 2019 PMID 30964529；ORIEN portal oriencancer.org/research-programs；Leibowitz 2022 PMID 35643464。

## 4. 病人不能当试验台，就得造一个替身

第四道缺口，是实验。试验阶段的组合用药不能直接在病人身上试。鼠不是人。细胞系传上几代就丢了肿瘤异质性。需要一种介于两者之间的东西。

NCI Patient-Derived Models Repository（PDMR）于 2017 年作为公共试剂资源上线（开发自 ~2012 年起），由 NCI Frederick 提供早传代、分子刻画完整、有临床注释的 PDX、PDC、CAF 与类器官模型 —— 它的明确目标是 *"improve preclinical reproducibility and clarify the PDX role in drug development."* HCMI / NGCM（2016 年宣布，2017 年公开上线）是下一代扩展，四个合作方分别是 NCI、Cancer Research UK、Wellcome Sanger 与 Hubrecht Organoid Technology —— 原文给出的目标是要做到 *"1,000 patient-derived next-generation cancer models (NGCMs)"*，把类器官、条件性重编程细胞与神经球三套方案与配对的正常-肿瘤测序绑在一起。

EurOPDX 是欧洲的联盟，2017 年由 Byrne 等人在 *Nat Rev Clin Oncol* 上正式定型，目前运行 30 多种肿瘤病理学条件下的 1,500 多个 PDX 模型。其奠基理由是：单中心 PDX 收藏对癌症异质性的覆盖太小，临床前工作缺乏标准化协议。

Clevers 实验室的类器官三联是"活体肿瘤生物库"这一脉。Sachs 等人（2018，*Cell*）搭起了乳腺生物库 —— >100 名病人 >100 株类器官，建系效率 95%，靠 Wnt + R-spondin + Noggin + neuregulin-1 这一套导管上皮专用培养基实现，明确目标是 *"a representative collection of well-characterized BC organoids available for cancer research and drug development."* Tiriac 等人（2018，*Cancer Discovery*）在冷泉港 Tuveson 实验室搭起了 PDAC 对应物：101 名病人 114 株 PDO，理由是 PDAC 细胞系偏 basal/squamous 而 Classical 亚型代表不足 —— 六周以内完成的"pharmacotyping"意味着临床决策级别的周转时间。Kopper 等人（2019，*Nature Medicine*）补上了卵巢这一头：32 名病人 56 株，覆盖全部四个主要亚型。

DepMap 在 2017 年（Tsherniak 等，*Cell*）把"依赖图谱"这一概念定型，做法是在 501 株肿瘤细胞系上跑全基因组规模的 shRNA，再用 DEMETER 算法把脱靶 seed effect 与真正的靶向依赖剥离开来 —— 它要回答的缺口是：肿瘤携带几百个突变，但真正可成药的只有寥寥几个。门户目前承载了 >2,000 株肿瘤模型，叠加了 CRISPR（Avana）与药物筛选层；最初的措辞是 *"an initial framework for a cancer dependencies map"*，目标是 *"the prioritization of therapeutic targets."*

*来源*：PDMR dctd.cancer.gov/drug-discovery-development/reagents-materials/pdmr；HCMI cancer.gov/ccg/research/functional-genomics/hcmi；EurOPDX europdx.eu；Sachs 2018 PMID 29153835；Tiriac 2018 PMC6125219；Kopper 2019 PMID 31011207；Tsherniak 2017 PMC5667678。

## 5. 看见细胞，而不是平均

第五道缺口，是平均化。一份 TCGA 肿瘤的 bulk RNA-seq 在质量上有 20–50% 是非肿瘤成分 —— 间质、浸润、正常上皮 —— 你不可能在 bulk 层面区分"产生 IFN 的细胞"与"接收 IFN 的细胞"。Human Cell Atlas（Regev、Teichmann、Lander 等，2017，*eLife* 白皮书）就是这个领域在人体组织尺度上给出的答案。它的奠基句是：bulk RNA-seq *"could only be applied to bulk tissue samples ... providing average genomic measures ... but masking their differences across cells."* 目标是建立 *"an open comprehensive reference map of the molecular state of cells in healthy human tissues"*，覆盖所有组织、器官与系统、至少 100 亿个细胞 —— 联盟最终发展到约 3,900 名成员、100 多个国家的约 1,700 个研究机构。

CellxGene Census（Chan Zuckerberg Initiative，首个 LTS 版本发布于 2023 年 5 月）是这一切的可编程查询层。动机是：CZ CELLxGENE Discover 上托管了数百个单细胞数据集，但凡跨研究复用都得做一次性的协调。基于 TileDB-SOMA 的 SOMA API 规范，把超过 3300 万细胞、436 个数据集、跨五个物种的 2,700+ 细胞类型暴露成一个常驻云端、可查询的矩阵，并与 AnnData / Seurat / SingleCellExperiment 互通。最初的目标说得很朴素：*"access, query, and analyze all single-cell RNA data from CZ CELLxGENE Discover"*，不再需要手工协调。

TISCH2（Han 等，2023，*Nucleic Acids Research*）是同济与四川（Wang 与 Li 实验室）做的、聚焦肿瘤的协调中心。缺口是：肿瘤 scRNA 研究的产出速度，已经远超分析师们能跟着重新处理的速度。TISCH2 把每一个数据集都送进同一条 MAESTRO 流水线（QC、批次校正、聚类、差异表达、细胞类型注释），首发时承载了 190 个数据集 / 约 630 万细胞 / 50 种肿瘤。

3CA —— Curated Cancer Cell Atlas —— 是 Tirosh 实验室搭起来的泛癌图谱，是 meta-program 论文（Gavish 等，2023，*Nature*）背后的那个底座。此前的肿瘤 scRNA 研究都按瘤种割裂开来；3CA 把 77 项研究整合到同一个底物上（1,163 个肿瘤样本、24 种肿瘤），再在每颗肿瘤上跑 NMF，抽出了 41 个共识的恶性细胞 meta-program。这是今天唯一一个在这个规模上存在的泛癌单细胞肿瘤状态词汇表。

HuBMAP（Snyder 等，2019，*Nature*）是空间这一头的对应物，由 NIH Common Fund 资助、斯坦福主导。HCA 那种解离后的 scRNA 牺牲了组织结构；HuBMAP 用成像质谱（CODEX、MIBI）、空间转录组（Slide-seq、Visium）与质谱代谢组把结构补回来，通过若干 Tissue Mapping Center 加一个 HIVE 数据中心做协调，目标是 *"a widely accessible framework for comprehensively mapping the human body at single-cell resolution."*

Zheng 等人（2021，*Science*）在北京大学（张泽民实验室）搭起了泛癌 T 细胞图谱 —— 来自 316 个供者、21 种肿瘤的约 39 万个 T 细胞，可获得时配以 TCR-seq。缺口的措辞是：*"we lack systematic comparison of the heterogeneity and dynamics of tumor-infiltrating T cells across cancer types"* —— 此前每一项 T 细胞研究都只看一种肿瘤。本项目链条所锚定的 CCR8⁺ 终末态 eTreg 模式之所以能跨瘤种被看见，是因为 Zheng 把那块让它得以被看见的底物搭了出来。

*来源*：HCA Regev 2017 elifesciences.org/articles/27041；CellxGene Census chanzuckerberg.github.io/cellxgene-census/；TISCH2 Han 2023 NAR D1425；3CA Gavish 2023 nature.com/articles/s41586-023-06130-4；HuBMAP Snyder 2019 PMID 31597973；Zheng 2021 PMID 34914499。

## 6. 看时间，而不是看快照

第六道缺口，是时间。HRD 判读其实是动态的 —— 回复突变能恢复 BRCA 功能、克隆选择会挑出耐药亚克隆、治疗压力会在切除与进展之间重写这一判读。单次活检捕捉不到这些。

TRACERx（Jamal-Hanjani 等，2014，*PLOS Biology*）是 Charles Swanton 给出的设计答案，由 Cancer Research UK 资助，依托 UCL Cancer Institute 运行。它的奠基句是： *"a single tumour biopsy may not fully capture the current or future tumour landscape and merely represents a 'snapshot' of the disease in space and time."* 协议是在 842 例 I–IIIA 期 NSCLC 病人中，在切除时做前瞻性多区域 WES，并在复发时做连续再活检，随访五年。Abbosh 等人 2023 年 *Nature* 论文又在此之上叠加了一个针对个体肿瘤定制的 ctDNA 检测 —— 原发灶的多区域 WES 喂给 panel 设计，panel 再以约三个月的节奏追踪血浆 ctDNA，从而在影像复发之前数个月就能检出 MRD。HRD 在 PARPi 压力下发生回复的时间线，将来也会以类似的形式呈现。

Hartwig 队列是转移性这一头的对应物。Priestley 2019 那篇论文写到，活检 *"at study entry and again at progression on each new line of therapy"* —— 这是一条连续再采样的协议，在 CPCT-02 / DRUP 网络里同意的病人身上产生纵向的转移性 WGS。具体到 PARPi 暴露过的人群，HMF 就是治疗压力下 HRD 演化变得可见的地方。

PROfound 试验（de Bono 等，2020，*NEJM*；NCT02987543，AstraZeneca + Merck）是第一项按 HRR 基因状态筛选病人、并在 PARPi 压力下纵向追踪 HRR 突变的 III 期 mCRPC 研究。A 队列（BRCA1/BRCA2/ATM）olaparib 对二线激素治疗的 rPFS 为 7.4 vs 3.6 个月 —— 但它的 ctDNA 副协议同样重要，因为这是 HRR 回复生物学在公开记录里浮现出来的地方。

*来源*：TRACERx Jamal-Hanjani 2014 PLOS Biol pbio.1001906；Abbosh 2023 DOI 10.1038/s41586-023-05776-4；HMF Priestley 2019 PMC6872491；PROfound ClinicalTrials.gov NCT02987543 / DOI 10.1056/NEJMoa1911440。

## 然后才有 Luo 2024

整个项目的锚点 —— Luo 等人，2024，*Cell* —— 用的是带配对 TCR-seq 的单细胞 RNA-seq、空间转录组、CCR8 人源化小鼠模型，以及功能性 CRISPR。*这些东西，TCGA 在 2006 年启动时一样都不存在。* 液滴式 scRNA 直到约 2015 年都还只是研究兴趣。CellxGene Census 才三岁。CCR8 作为肿瘤 eTreg 的靶点被严肃命名，要到 2016 年的 Plitas 与 De Simone。让 Luo 能说"某一克隆型在同一病人的肿瘤浸润 eTreg 与血液样本之间共享"的那种 TCR-seq 协调能力，是 2018 年以后才有的。

Luo 是六轮资源建设叠加之后才能写出来的东西。泛癌底物（TCGA、ICGC、PCAWG、HMF、CPTAC）定义了 HRD 在基因组尺度上长什么样。HRD 评分这条脉（HRDetect → CHORD → ovaHRDscar → DeepHRD）让判读变得可移植。临床级 panel（MSK-IMPACT、GENIE、FMI-Flatiron、ORIEN、Tempus）把判读连到治疗与结局上。活体肿瘤模型（PDMR、HCMI、EurOPDX、Clevers 的类器官、DepMap）让判读在试验阶段的组合里变得可检验。单细胞中心（HCA、CellxGene Census、TISCH2、3CA、HuBMAP、Zheng）让细胞层面的后果变得可见。纵向队列（TRACERx、HMF、PROfound ctDNA）让时间维度变得可读。

当这个项目要从一颗 bulk TCGA 肿瘤里反卷出 CCR8⁺ eTreg 特征，并去问它是否与 HRD 共分布时，这六轮里的每一轮都在承重。选 Luo 作为锚点，并不是随手一指"最新最有意思的论文"。它是一篇*只能在现在*被写出来的论文，因为它所依赖的数据生态*只有现在*才存在。

资源本身的清单形式，见 [the data we have to work with](the-data-we-have-to-work-with.zh.md) 与 [the HRD resource map](the-hrd-resource-map.zh.md)。这些资源为什么正是项目七个研究目标所需的那一组，请看 resource-map 博客末尾的"目标—资源"矩阵。
