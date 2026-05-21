---
title: "一个虚拟细胞的两个隐空间——用自定义适配器比较细胞系与病人的药物响应"
summary: "一张关于 2019-2026 年细胞系 ↔ 病人药物响应迁移的先验技术地图——PRECISE、TRANSACT、CODE-AE、scDEAL、MOLI、TUGDA、scAdaDrug、PERCEPTION、CRISP、scDrugMap、UniCure。架构组合（双隐空间分解）已被发表；FM-骨干版本只有一个在世竞争者（UniCure，问世六个月）；逐基因可迁移性分数 τ_g 才是真正空着的位置。可立得住的做法——把一个冻结的 VC FM 微调两次，用 CKA/OT 对齐瓶颈，把一个学得的 τ_g 作为承重输出交付，并在 Sade-Feldman anti-PD1 上证伪——在那里 τ 必须 ≈ 0。"
---

> *与 [agent-loop-for-drug-response v2](agent-loop-for-drug-response-v2.md)、[101 巡览](closed-loop-virtual-cells-101.md)、[相邻项目形态](adjacent-project-shapes-and-n-of-1.md) 以及 [细胞器感知的细胞 FM](organelle-aware-cell-fms.md) 是同辈。v2 说闭环架构已被发表。相邻形态那篇文章说多细胞性和跨癌-anti-PD1 已经拥挤。细胞器感知那一篇说图像侧已交付，scRNA 侧仍空着。本文把同一面诚实的镜子对准再一个形态——**用一个叠在冻结 VC FM 之上的自定义适配器，对细胞系与病人的药物响应做双隐空间比较**。配套阅读：[小实验室 v3](small-labs-what-to-build-v3.md) 看"底料即护城河"的框定；[为什么线性基线会赢](why-linear-baselines-win.md) 看经验上的清算；[因果模型、FM 与 VC](causal-models-fm-and-vc.md) 看那把使"可迁移性"成为一个良定义对象的第二阶（rung-2）框定。*

## 这个问题

取一个虚拟细胞 FM。在同一骨干上微调两次——一次在 **细胞系药物响应**（GDSC + Tahoe-100M）上，一次在 **病人药物响应**（TCGA-配对队列、BeatAML、PharmacoDB）上。你得到两个隐空间。比较它们——不只是预测性地，而是机制性地——去理解药物响应的哪些轴线在系统间被保留、哪些坍缩。最后那一点才是奖品：一个解释 *为什么迁移会失败* 的模型，而不是一个只预测响应的模型。并且自己构建那个适配器——为 *比较* 而设计，而非为响应头而设计。

## 一段七年的拥挤先验技术

细胞系 → 病人的药物响应迁移问题，比这种框定所暗示的更古老、也更密集。小编码器时代横跨 2019-2024：

- **PRECISE**（Mourragui, *Bioinformatics* 2019, [doi:10.1093/bioinformatics/btz372](https://doi.org/10.1093/bioinformatics/btz372)）——通过对比 PCA 得到的线性共识子空间。这一脉络的开端。
- **MOLI**（Sharifi-Noghabi, *Bioinformatics* 2019）——后期整合的 triplet-margin 嵌入。
- **AITL**（Sharifi-Noghabi 2020）——对抗式的输入 + 输出域自适应。
- **TRANSACT**（Mourragui, *PNAS* 2021, [doi:10.1073/pnas.2106682118](https://doi.org/10.1073/pnas.2106682118)）——kernel-PCA 的非线性扩展；浮现出共享的转录组成分。
- **TUGDA**（Peres da Silva, *Bioinformatics* 2021）——任务-不确定性引导的 DA；把负迁移减少 94%。
- **CODE-AE**（He/Xie, *Nat Mach Intell* 2022, [doi:10.1038/s42256-022-00541-0](https://doi.org/10.1038/s42256-022-00541-0)）——带显式正交 `共享 + 系统特异` 隐空间分解的自编码器。**用户想法的直接架构祖先。**
- **scDEAL**（Chen, *Nat Commun* 2022）——通过 DaNN + MMD 的 bulk-到-sc 域自适应。
- **scAdaDrug**（[arXiv:2403.05260](https://arxiv.org/abs/2403.05260), 2024）——带逐隐特征权重生成器的、重要性感知的多源 DA。
- **PERCEPTION**（Sinha/Ruppin, *Nat Cancer* 2024, [doi:10.1038/s43018-024-00756-7](https://doi.org/10.1038/s43018-024-00756-7)）——最强的临床试验验证足迹。**关键：它不是一个 VC FM**——在配对的 bulk + sc 上的 DNN。

然后 FM 时代开启，2024-2026：

- **CRISP**（*Nat Comput Sci* 2025）——首个 sc-FM-骨干的迁移；细胞类型 → 细胞类型，而非细胞系 ↔ 病人。
- **scDrugMap**（*Nat Commun* 2025）——8 个 sc-FM 在响应分类上的基准；scFoundation 在汇总后最强，UCE 在微调后最佳。
- **UniCure**（[bioRxiv 2025.06.14.658531](https://www.biorxiv.org/content/10.1101/2025.06.14.658531v1)）——**唯一最接近的在世竞争者**。真正的 FM 骨干（UCE + Uni-Mol），在 180 万条扰动谱上预训练，在病人来源的类肿瘤簇上微调。但它只做 *一次* 病人微调，没有配对的细胞系微调，也没有显式的 Δ-隐空间分析。
- **TRANSPIRE-DRP**（*J Transl Med* 2025）——PDX → 病人的 AE + 对抗式 DA。

**没有一个把"VC FM + 配对的双重微调 + Δ-隐空间比较 + 逐基因 τ 输出"作为一个系统来做。** UniCure 问世六个月，且在配对微调那一步上落空。CODE-AE 是小编码器规模上的架构祖先。其余的一切要么省略了 FM 骨干，要么省略了双重微调，要么省略了基因级的读出。

## 逐基因的 τ_g 空白

把双隐空间分解先放一边，看看 *模型输出什么*。在调查了细胞系→病人迁移文献、逐基因域自适应文献、药理学可迁移性量规以及 2024-2026 的 FM 时代工作之后，**没有一篇论文输出一个学得的、每基因一个的标量 τ_g ∈ [0,1]，用来表述"基因 g 的细胞系响应以置信度 τ 迁移到病人响应"。**

最接近的现有产物各自以不同方式落空：

- **scAdaDrug**——逐隐特征、逐样本的权重，没有稳定的生物学身份（你读不出"EGFR 能迁移、KRAS 不能"）。
- **TUGDA**——逐任务（逐药物）的不确定性，而非逐基因。
- **CODE-AE**——隐空间中的逐样本对齐，没有基因分辨的读出。
- **TRANSACT**——因子/成分级的载荷，而非逐基因。
- **PDXGEM**（*BMC Med Genomics* 2020）——二元的一致性过滤器，而非学得的连续 τ。
- **Sakellaropoulos**（*Front Genet* 2023）——KS 检验过滤器 + 排序面板。离散的，而非端到端学得的。
- **Wendler & Wehling Translatability Score**（*J Transl Med* 2017, [PMC5670516](https://pmc.ncbi.nlm.nih.gov/articles/PMC5670516/)）——药物项目级别的人工评分量规。同一个词，完全不同的对象。
- **pRRophetic / oncoPredict**——由多基因岭回归模型推算的病人 IC50。其系数是样本-预测权重，而非迁移-置信度分数。

τ_g 这一框定确实是空着的。三个可预见的审稿人反对，附诚实的回应：

1. *"pRRophetic 在精神上做了这件事。"* 不。pRRophetic 输出样本预测；系数不是学得的逐基因迁移置信度，而生物标志物发现是事后通过 IDWAS 进行的。
2. *"逐样本的重要性加权 DA 在功能上做了同样的事。"* 不。逐样本权重把 *"这个病人异常"* 与 *"这个基因不可迁移"* 混为一谈。一个 τ_g 头显式地对样本做边缘化，并在基因轴上是可辨识的——这是一个不同的统计对象。
3. *"可迁移性是药物特异的，而非基因特异的。"* 部分有理。诚实的因子分解是 τ_{g,d}。但细胞系→肿瘤的失败模式（微环境驱动的基因、细胞系中缺失的免疫基因、细胞系中被夸大的细胞周期通路）在很大程度上是 *基因内禀的*，并在多个药物类别间复现——见 Yu 等人, *Sci Adv* 2020, [PMC7458440](https://pmc.ncbi.nlm.nih.gov/articles/PMC7458440/)。一个边缘的 τ_g 仍然是良定义且有信息量的。

## 自定义适配器——损失优先，架构从简

已经有十二种适配器形态被发表在 VC FM 上：scDCA（由药物嵌入调制的 FiLM-on-bias）、[PertAdapt](https://www.biorxiv.org/content/10.1101/2025.11.21.689655)（基因相似度掩码的注意力 + 自适应的扰动敏感基因损失）、scPEFT（LoRA / Adapter / Prefix）、FUSED（scGPT 与 MolFormer 之间的多头交叉注意力）、scGPT-DRP-GNN、XTransferCDR、scGenePT（在基因 token 处的文本注入）、Bio-DTA（动态 token 重写）、PertDiT（扩散-transformer 交叉注意力）、STATE 端到端，外加智能体生成器 CellForge 和 VCHarness。**纯架构上的新颖性大体已经关闭。** 一种新口味的 FiLM 读起来像是一次迭代。

在一个冻结的 VC FM 上 *没有* 被尝试过的是：

1. **双头共享主干适配器**，在瓶颈上带 **CKA / OT / Procrustes 对齐损失**。细胞系头和病人头共享一个主干；瓶颈相似度告诉你哪些轴线在迁移中存活。
2. **逐基因 τ_g 头**，作为 FM 特征上的 DR-learner 或 EP-learner。
3. **域条件 FiLM**，由一个 `{细胞系, PDX, 病人}` token 驱动逐层的 γ/β。
4. **辅助可迁移性标量**，逐药物预测细胞系→病人的可迁移性。
5. **对比的配对样本（细胞系, 肿瘤）** 损失，在一个 VC FM 骨干上。

**在 2026 年，"构建你自己的适配器"意味着损失优先、架构从简。** 新颖性必须存在于 *目标函数* 和 *比较机器* 中，而非瓶颈的算术里。最强的这一套同时命中四个空格：**冻结的 STATE 骨干 + 共享主干双头适配器（细胞系头 + 病人头）+ 瓶颈上的 CKA/OT 对齐损失 + 逐基因 τ_g DR-learner 头 + 逐药物的辅助可迁移性标量。** 瓶颈本身可以是普通的 LoRA 或 scDCA 式的 FiLM-on-bias——瓶颈的算术不是你竞争的地方。

## 数据通路

底料是存在的，但 *配对的* 底料比宣传所暗示的更窄：

- **GDSC2 × TCGA**——主力；约 30-60 种药物有可用的重叠（cisplatin、paclitaxel、gemcitabine、5-FU、sorafenib、erlotinib、tamoxifen、temozolomide 是数据充足的那些）。
- **CCLE / PRISM × TCGA**——细胞系一侧有 4,518 种化合物 × 578 个细胞系。
- **BeatAML 2.0**（*Cancer Cell* 2022）——805 名 AML 病人，对 145 种抑制剂的离体响应 + RNA-seq。**最干净的单适应症测试床**：venetoclax 有 367 个配对样本，与 CCLE-AML（GDSC 上约 40 个细胞系）配对。
- **NIBR-PDXE**（Gao, *Nat Med* 2015）——约 1,000 个 PDX × 60 种处理。用于细胞系 → PDX → 病人扩展的 **第三域桥梁**。
- **Sade-Feldman melanoma anti-PD1**（*Cell* 2018）——48 名病人。**负对照证伪器**：anti-PD1 没有细胞系响应，因为细胞系没有免疫系统。在 anti-PD1 轴上 τ_g 必须 ≈ 0。如果你的头在这些基因上返回 τ > 0，那它就是在过拟合，项目就死了。这是一个犀利的单一检验。
- **Tahoe-100M**（Vevo + Arc, 2025）——1 亿细胞 × 1,100 种药物 × 50 个细胞系，对细胞系一侧而言是超定的。

## 不可为之事 + 值得关注的名字

与 v2 同样的模式。诚实的不可为之事是：

1. **如果你的"VC FM + 自定义适配器"在一个封存的病人队列上打不过 CODE-AE，那 FM 就是装饰。** CODE-AE 是小编码器规模上的架构祖先。把它当作一个 *对照条件* 来跑，而不只是一条引用。如果它打平或胜出，那 FM 骨干就没有挣到它的算力。
2. **如果 τ_g 在 Sade-Feldman anti-PD1 上不被证伪，那这个头就是在过拟合。** 在训练之前就承诺这项检验。它是文献提供的最便宜的单一证伪设置。
3. **如果 UniCure 或一个被移植到双域设置的 CRISP 变体，在一个封存队列上追平了你定制的系统，那你的方法贡献就是零。** UniCure 问世六个月且处在类似的轨迹上；把它当作在世的标尺。

三个值得关注的名字：**Lodewyk Wessels**（NKI）和 **Soufiane Mourragui**（Sanger）——PRECISE → TRANSACT 这一脉络以及 2026 年的样本高效自适应工作；**Eytan Ruppin**（NCI）和 **Sanju Sinha**（Sanford Burnham）——PERCEPTION 以及最强的临床试验验证足迹；**Lei Xie**（Hunter / CUNY）——CODE-AE 以及双隐空间分解的直接祖先。荣誉提名：**UniCure 团队**（在世的竞争；开始前去跟他们聊聊）、Hossein Sharifi-Noghabi（Roche）、Qin Ma（OSU；scDEAL / scDrugMap），以及如果三方扩展在计划之内的话，**NIBR-PDXE** 团队。

结论：与 v2/v3 同样的模式，但高了一层。双隐空间分解已被发表。FM 骨干版本有一个在世竞争者。**逐基因 τ_g 头才是真正空着的位置**——把它作为承重的主张来承诺，围绕让 τ_g 可辨识来设计适配器和损失，并在做任何别的事之前先在 Sade-Feldman 上证伪它。架构组合不是你的护城河；比较机器才是。
