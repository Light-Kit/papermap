---
title: "2025–2026 评估论文目录"
summary: "2025–2026 清算正典的索引——十一篇评估论文外加一篇唱反调，按各自评估了什么、覆盖了哪条轴来组织。"
---

> *FM-to-Virtual-Cells 演讲语料中的科普页——另见[全景中枢](foundation-models-state-of-play.md)。完整的清算正典，按每篇论文评估了什么、覆盖了哪条轴来组织。截至 2026 年 5 月，Lane 4（复现 / 批评）以巨大优势成为 2025–2026 年发表最多的赛道——十一篇评估论文 + 一篇唱反调。本页是这份索引。*

## 正典一览

| # | 论文 | 场地 | 日期 | 所评估的模型 | 头条 |
|---|---|---|---|---|---|
| 1 | **Ahlmann-Eltze & Huber** | *Nature Methods* | 2025 年 8 月 | 6 个 sc-FM（scGPT, Geneformer, scFoundation, GEARS, CPA）+ UCE | 无一能击败 `mean-of-training-perturbations` 线性基线 |
| 2 | **Kedzierska et al.** | *Genome Biology* 26:101 | 2025 年 4 月 | scGPT, Geneformer, UCE, scFoundation | scFM 在零样本下输给 PCA + kNN |
| 3 | **Wenkel et al.** | *Nature Methods* | 2025 年 7 月 | sc-FM 对阵 `latent-additive` | Latent-additive + scGPT-embeddings = 新的基线地板 |
| 4 | **Wu et al.** | *Nature Methods* | 2026 年 1 月 | 27 种方法 × 29 个数据集 × 6 个指标 | 逐轴的失败分解 |
| 5 | **Wu et al.** | *Genome Biology* | 2025 年 10 月 | 6 个 scFM（Geneformer, scGPT, UCE, scFoundation, LangCell, scCello） | "没有一个 scFM 一致地胜过其他" |
| 6 | **Liu et al.（scEval）** | *Advanced Science* | 2026 年 1 月 | 10 个 scFM × 8 个任务 | "对为单细胞开发 FM 的必要性提出质疑" |
| 7 | **Parameter-free baseline** | bioRxiv 2026.02.11 | 2026 年 2 月 | sc-FM 对阵无参数表征 | 无参数法在下游基准上胜出 |
| 8 | **PertEval-scFM** | ICML 2025 | 2025 年 7 月 | scFM 嵌入（标准化框架） | 大多在强 / 非典型扰动上不能击败基线 |
| 9 | **CellBench-LS** | bioRxiv 2026.04.01 | 2026 年 4 月 | 7 个 scFM + PCA / UMAP / scVI | 分层低监督：FM 在细胞类型上领先，经典法在基因表达上领先 |
| 10 | **Han et al.（real-world）** | bioRxiv 2026.04.17 | 2026 年 4 月 | 制药部署中的 scFM | 暴露出工业级的鲁棒性缺口 |
| 11 | **Cellular-dynamics zero-shot** | bioRxiv 2026.03.10 | 2026 年 3 月 | 零样本 scFM 用于 RNA velocity | scFM 无法复原细胞动力学 |
| 12 | **Csendes scPerturBench** | BM2 Lab | 2024 | scGPT 复现 | 原始划分有泄漏；更干净的划分暴露失败 |
| **+唱反调** | **FMs Improve Perturbation** | bioRxiv 2026.02.18 | 2026 年 2 月 | 有充足数据的 sc-FM | **有足够数据时 FM 确实改善扰动预测** |

<iframe src="../../assets/fm-eval-catalog-timeline.html" width="100%" height="470" frameborder="0" loading="lazy" title="The reckoning corpus by venue tier"></iframe>

*交互式——同样这 13 篇论文按发表日期（x）和场地层级（y）排布：有六篇落地于同行评审期刊——Nature Methods ×3、Genome Biology、Advanced Science——所以这个语料库不是某一个实验室的牢骚，它跨多个场地通过了评审。颜色标记评估轴；绿色 ✕ 是唱反调的声音。悬停可看头条。*

## 按所覆盖内容组织的目录

### 轴 1：扰动预测（最初的清算）

2025 年的批评三人组 + Wu 等人 *Nat Methods* 确立了：当前的 sc-FM 在按最初定义的扰动预测上无法击败线性基线。

- **[Ahlmann-Eltze & Huber 2025 *Nat Methods*](https://www.nature.com/articles/s41592-025-02772-6)**——那篇经典论文。在 6 个已发表 FM 上做纯推理 + 一行的线性基线。**<2k 美元算力。退役了整个 sc-FM 扰动预测排行榜。**
- **[Kedzierska et al. 2025 *Genome Biology*](https://doi.org/10.1186/s13059-025-03574-x)**——把结果推广到 UCE 和零样本设定。Cambridge + Broad。
- **[Wenkel et al. 2025 *Nat Methods*](https://pubmed.ncbi.nlm.nih.gov/41044630/)**——提出 `latent-additive + scGPT-embeddings` 作为新的基线地板。当前的 FM 仍然不能一致地击败它。
- **[Wu et al. 2025 *Nat Methods*](https://www.nature.com/articles/s41592-025-02980-0)**——27 种方法 × 29 个数据集 × 6 个指标。首个逐轴的失败分解——有些 FM 在组合扰动上更强，但在分布外细胞类型上无一胜出。
- **[Parameter-free baseline（bioRxiv 2026.02）](https://www.biorxiv.org/content/10.64898/2026.02.11.705358v1)**——Ahlmann-Eltze 的直接继任者；清算之后最干净的头条。
- **[PertEval-scFM ICML 2025](https://icml.cc/virtual/2025/poster/43799)**——正式场地的盖章。

### 轴 2：超越扰动——大多数细胞级任务

2026 年的评估浪潮把批评拓宽到了扰动之外。

- **[Liu et al. 2026 *Adv Sci* — scEval](https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202514490)**——10 个 scFM × 8 个任务。**头条**：*"单细胞基础模型在所有任务上未必一致地胜过任务专用方法，这对为单细胞分析开发基础模型的必要性提出了质疑。"* 最强的"FM 范式值不值得？"的措辞。
- **[Wu et al. 2025 *Genome Biology*（2025 年 10 月）](https://pmc.ncbi.nlm.nih.gov/articles/PMC12492631/)**——6 个 scFM（Geneformer, scGPT, UCE, scFoundation, LangCell, scCello）在基因级 + 细胞级、以细胞本体论为锚的指标上。**头条**：*"没有一个 scFM 在所有任务上一致地胜过其他。"*（与 Wu *Nat Methods* 不同——尽管同姓，作者不同。）
- **[CellBench-LS（bioRxiv 2026.04）](https://www.biorxiv.org/content/10.64898/2026.04.01.714123v1)**——7 个 scFM（scGPT, Geneformer, LangCell, CellPLM, scMulan, scFoundation, Nicheformer）+ PCA / UMAP / scVI 基线，在低监督场景下。FM 在细胞类型识别上领先；经典方法在基因表达量化上保持竞争力。

### 轴 3：新的评估维度

2026 年的浪潮开辟了最初清算未曾覆盖的新轴。

- **[Han et al. — Real-world RNA-seq data integration（bioRxiv 2026.04）](https://www.biorxiv.org/content/10.64898/2026.04.17.719314v1)**——工业作者（Mansi 等）；与制药相关、达到部署级别的评估。真实世界数据整合中的鲁棒性缺口。
- **[Cellular-dynamics zero-shot（bioRxiv 2026.03）](https://www.biorxiv.org/content/10.64898/2026.03.10.710748v1)**——把批评延伸到 **RNA-velocity / 动力学重建**，一条超越扰动预测的新轴。零样本 scFM 嵌入无法复原细胞动力学。

### 轴 4：复现 + 干净划分

- **[Csendes scPerturBench（BM2 Lab）](https://bm2-lab.github.io/scPerturBench-reproducibility/)**——在一个带有对抗性扰动 / 细胞类型划分的基准上对 scGPT 的独立复现。发现原始的 scGPT 训练 / 测试划分有泄漏。

### 唱反调的声音

- **[Foundation Models Improve Perturbation Response Prediction（bioRxiv 2026.02.18）](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1)**——声称 **有足够数据时**，FM *确实* 显著改善遗传 + 化学扰动预测，并逼近根本性的性能极限。**直接对立于** Ahlmann-Eltze、Liu、parameter-free 和 Wu 系列论文。**这篇论文是否站得住，决定了这场清算是一个永久的裁决，还是一个暂时的状态。**

## 未覆盖的轴——还有什么仍然开放

在这 12 篇论文之间，有五条评估轴尚未被系统性覆盖。每一条都为 2026 年的一篇 <2k 美元算力的 Lane 4 论文敞开着。**这些就是今天写一篇新批评论文的差异化角度。**

| 未覆盖的轴 | 为何重要 | 需要什么 |
|---|---|---|
| **供体划分基准** | 跨供体泛化几乎没被衡量，因为数据底料是供体偏斜的（Tahoe-100M = 50 个细胞系，无患者来源） | 一个在 HTAN 或 HCA 真实世界队列上的留出供体基准 |
| **跨组织迁移** | 在组织 A 上预训练、在组织 B 上评估——几乎从未测过。即便 UCE 的跨物种测试也是在健康组织内部。 | 一个用按组织分层的 scRNA 图谱构建的正式跨组织划分 |
| **时间分辨扰动** | 大多数评估是稳态的。0h 对 6h 对 24h 扰动后呢？ | 一个带多个时间点的 perturb-seq 数据集 + 一个时间划分协议 |
| **癌症细胞系 → 原发肿瘤迁移** | 专门应用于癌症的供体划分。如果 sc-FM 不能从 K562 迁移到患者肿瘤，它们就帮不了肿瘤学。 | 配对的 K562/RPE1 + 匹配的原发肿瘤 scRNA 队列 |
| **稀有队列鲁棒性** | 当每类 <100 个细胞时，FM 性能如何退化？xVERSE 论文暗示了这一点（用 4 个细胞解析稀有类型），但没有把那条曲线形式化。 | 一个跨 sc-FM 的、系统化的"退化对队列规模"基准 |

第一篇落地其中任何一条的论文，将拿下 2026–2028 周期的引用。**<2k 美元算力。*Nat Methods* / *Genome Biology* / *Adv Sci* 会要它。**

## 如何用这份目录来选题

**如果你想写一篇批评论文（Lane 4）**：
1. 从上面的表格里挑一条未覆盖的轴。
2. 通过核对上面 12 篇论文，验证这条轴没被覆盖。
3. 选定你的测试集：Replogle（Cell 2022）、Norman（Science 2019）、Tahoe-100M、Open Problems v2、scPerturBench。
4. 至少把 Ahlmann-Eltze + Wenkel 基线实现为你的地板。
5. 引用唱反调的那篇（FMs Improve Perturbation），并探讨你的发现是支持还是反驳它。
6. 关于你会希望自己的论文通过的清单，见[批判性地读一篇 FM 论文](reading-an-fm-paper-critically.md)。

**如果你想写一篇方法论论文（Track 1–9）**：
- Track 3、6、8、9 是清算之后的评估前沿。
- [Track 9（因果可迁移性）](interpretability-mech-causal.md) 最开放，因为《虚拟细胞需要语境》（2026）点名了那个框架，却没把它付诸实操为一个基准套件。
- Track 8（协同信息得分，Synergistic Information Score）最具体——微软在 2026 年 2 月发表了这个指标，而还没有人把它跨多模态 FM 动物园应用一遍。

## 叙事弧线

按时间顺序读时，这 12 篇论文讲述了同一个故事：

- **2024 → 2025 年初**：零散的警告（Boiarsky NeurIPS workshop、Csendes scPerturBench 预印本）。
- **2025 年 8 月**：Ahlmann-Eltze *Nat Methods* 落下经典一击——线性基线在扰动预测上击败每一个已发表的 sc-FM。
- **2025 年 4–10 月**：Kedzierska、Wenkel、Wu *Nat Methods*、Wu *Genome Biology*——清算成为一个语料库。
- **2026 年 1–4 月**：Liu *Adv Sci*、parameter-free、CellBench-LS、Han 等、cellular-dynamics——清算从扰动预测推广到大多数细胞级任务。**到 2026 年 4 月，它已是全学科范围的共识。**
- **2026 年 2 月**：唱反调的声音到来（FMs Improve Perturbation）。清算重新变得有争议。
- **2026 年 2 月**：《虚拟细胞需要语境》点名了那个 *理论* 框架（因果可迁移性）。
- **2026 年 5 月**：该领域的诚实立场是 *四部分的*——清算 + 唱反调 + 理论根基 + 架构回应（xVERSE、组合式 FM、TranscriptFormer）。

这就是演讲第一幕走过的那条弧线。

## 下一步去哪儿

- **[基础模型——全景现状](foundation-models-state-of-play.md)**——四时代框架（范式 → 雄心 → 清算 → 回应）住在这里。
- **[90 分钟速读](speed-read.md)**——把这份目录放进更广的文献网络中，附一个精选的阅读顺序。
- **[为什么线性基线会赢？](why-linear-baselines-win.md)**——目录背后的机制。
- **[如何批判性地读一篇 FM 论文](reading-an-fm-paper-critically.md)**——那份 8 项清单。
- **[补充材料 §E——含方法论细节的完整评估目录](../fm-to-virtual-cells-supplementary.md#e-20252026-evaluation-papers-catalog)** *（私人笔记）*——更深一层。

---

*最后更新于 2026-05-13。*
