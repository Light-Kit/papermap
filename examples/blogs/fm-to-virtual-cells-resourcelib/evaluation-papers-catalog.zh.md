---
title: "2025–2026 评估论文目录"
summary: "2025–2026 这场「清算」正典的索引——十一篇评估论文，外加一篇唱反调，按各自评了什么、覆盖了哪条轴来归类。"
---

> *FM-to-Virtual-Cells 演讲语料里的一篇说明页——另见[全景中枢](foundation-models-state-of-play.md)。这是这场清算的完整正典，按每篇论文评了什么、覆盖哪条轴来组织。截至 2026 年 5 月，第 4 赛道（复现 / 批评）是 2025–2026 年里发表量遥遥领先的赛道——十一篇评估论文 + 一篇唱反调。本页就是它的索引。*

## 正典一览

| # | 论文 | 发表场所 | 日期 | 评估的模型 | 头条结论 |
|---|---|---|---|---|---|
| 1 | **Ahlmann-Eltze & Huber** | *Nature Methods* | 2025 年 8 月 | 6 个 sc-FM（scGPT、Geneformer、scFoundation、GEARS、CPA）+ UCE | 没一个赢得过 `mean-of-training-perturbations` 线性基线 |
| 2 | **Kedzierska et al.** | *Genome Biology* 26:101 | 2025 年 4 月 | scGPT、Geneformer、UCE、scFoundation | 零样本下 scFM 输给 PCA + kNN |
| 3 | **Wenkel et al.** | *Nature Methods* | 2025 年 7 月 | sc-FM vs `latent-additive` | latent-additive + scGPT 嵌入 = 新的基线下限 |
| 4 | **Wu et al.** | *Nature Methods* | 2026 年 1 月 | 27 种方法 × 29 个数据集 × 6 项指标 | 逐轴拆解失效原因 |
| 5 | **Wu et al.** | *Genome Biology* | 2025 年 10 月 | 6 个 scFM（Geneformer、scGPT、UCE、scFoundation、LangCell、scCello） | 「没有哪个单独的 scFM 能一贯胜过其他」 |
| 6 | **Liu et al. (scEval)** | *Advanced Science* | 2026 年 1 月 | 10 个 scFM × 8 项任务 | 「质疑为单细胞专门开发 FM 的必要性」 |
| 7 | **Parameter-free baseline** | bioRxiv 2026.02.11 | 2026 年 2 月 | sc-FM vs 无参数表征 | 无参数法在下游基准上胜出 |
| 8 | **PertEval-scFM** | ICML 2025 | 2025 年 7 月 | scFM 嵌入（标准化框架） | 在强 / 非典型扰动上多数都赢不过基线 |
| 9 | **CellBench-LS** | bioRxiv 2026.04.01 | 2026 年 4 月 | 7 个 scFM + PCA / UMAP / scVI | 分层低监督下：细胞类型 FM 领先，基因表达经典法领先 |
| 10 | **Han et al. (real-world)** | bioRxiv 2026.04.17 | 2026 年 4 月 | scFM 在药企部署中 | 暴露了工业级的鲁棒性缺口 |
| 11 | **Cellular-dynamics zero-shot** | bioRxiv 2026.03.10 | 2026 年 3 月 | 零样本 scFM 做 RNA velocity | scFM 无法还原细胞动力学 |
| 12 | **Csendes scPerturBench** | BM2 Lab | 2024 | scGPT 复现 | 原始划分有泄漏；更干净的划分暴露出失败 |
| **+唱反调** | **FMs Improve Perturbation** | bioRxiv 2026.02.18 | 2026 年 2 月 | 数据充足时的 sc-FM | **数据够多时，FM 确实能改善扰动预测** |

<iframe src="../../assets/fm-eval-catalog-timeline.html" width="100%" height="470" frameborder="0" loading="lazy" title="The reckoning corpus by venue tier"></iframe>

*可交互——同样这 13 篇论文，按发表日期（x）和发表场所等级（y）摆开：其中六篇登上了同行评审期刊——Nature Methods ×3、Genome Biology、Advanced Science——所以这份语料不是某一个实验室的牢骚，它是跨多个场所过了评审的。颜色标的是评估轴，绿色的 ✕ 是那个唱反调的声音。把鼠标悬上去看头条结论。*

## 按覆盖内容组织的目录

### 轴 1：扰动预测（最初那场清算）

2025 年的批评三连 + Wu et al. *Nat Methods* 确立了一点：按最初的定义，当下的 sc-FM 在扰动预测上赢不过线性基线。

- **[Ahlmann-Eltze & Huber 2025 *Nat Methods*](https://www.nature.com/articles/s41592-025-02772-6)**——开山的那篇正典。对 6 个已发布的 FM 做纯推理，外加一行代码的线性基线。**算力不到 2,000 美元，却把整张 sc-FM 扰动预测排行榜送进了博物馆。**
- **[Kedzierska et al. 2025 *Genome Biology*](https://doi.org/10.1186/s13059-025-03574-x)**——把结论延伸到了 UCE 和零样本设定。Cambridge + Broad。
- **[Wenkel et al. 2025 *Nat Methods*](https://pubmed.ncbi.nlm.nih.gov/41044630/)**——提出 `latent-additive + scGPT 嵌入` 作为新的基线下限。当下的 FM 仍然没法一贯地赢过它。
- **[Wu et al. 2025 *Nat Methods*](https://www.nature.com/articles/s41592-025-02980-0)**——27 种方法 × 29 个数据集 × 6 项指标。第一次逐轴拆解失效原因——有些 FM 在组合扰动上更强，但没一个在分布外细胞类型上行。
- **[无参数基线（bioRxiv 2026.02）](https://www.biorxiv.org/content/10.64898/2026.02.11.705358v1)**——Ahlmann-Eltze 的直接续作；清算之后最干净的一个头条。
- **[PertEval-scFM ICML 2025](https://icml.cc/virtual/2025/poster/43799)**——正式会场盖章。

### 轴 2：扰动之外——大多数细胞级任务

2026 年的评估浪潮，把批评从「只盯扰动」拓宽了出去。

- **[Liu et al. 2026 *Adv Sci* — scEval](https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202514490)**——10 个 scFM × 8 项任务。**头条**：*「单细胞基础模型未必在所有任务上都一贯胜过任务专用方法，这质疑了为单细胞分析开发基础模型的必要性。」* 是「FM 这条范式到底值不值」立得最硬的一种说法。
- **[Wu et al. 2025 *Genome Biology*（2025 年 10 月）](https://pmc.ncbi.nlm.nih.gov/articles/PMC12492631/)**——6 个 scFM（Geneformer、scGPT、UCE、scFoundation、LangCell、scCello），在基因级 + 细胞级上、用细胞本体论锚定的指标评。**头条**：*「没有哪个单独的 scFM 能在所有任务上一贯胜过其他。」*（与 Wu *Nat Methods* 不是同一篇——尽管同姓，作者不同。）
- **[CellBench-LS（bioRxiv 2026.04）](https://www.biorxiv.org/content/10.64898/2026.04.01.714123v1)**——7 个 scFM（scGPT、Geneformer、LangCell、CellPLM、scMulan、scFoundation、Nicheformer）+ PCA / UMAP / scVI 基线，在低监督场景下评。FM 在细胞类型识别上领先；经典方法在基因表达定量上仍有一拼。

### 轴 3：新的评估维度

2026 年的浪潮，开出了最初那场清算没覆盖到的新轴。

- **[Han et al. — 真实世界 RNA-seq 数据整合（bioRxiv 2026.04）](https://www.biorxiv.org/content/10.64898/2026.04.17.719314v1)**——工业界署名（Mansi et al.）；与药企相关、部署级的评估。真实世界数据整合中的鲁棒性缺口。
- **[细胞动力学零样本（bioRxiv 2026.03）](https://www.biorxiv.org/content/10.64898/2026.03.10.710748v1)**——把批评延伸到了 **RNA velocity / 动力学重建**，这是扰动预测之外的一条新轴。零样本 scFM 嵌入无法还原细胞动力学。

### 轴 4：复现 + 干净的划分

- **[Csendes scPerturBench（BM2 Lab）](https://bm2-lab.github.io/scPerturBench-reproducibility/)**——在一个带对抗式扰动/细胞类型划分的基准上，独立复现 scGPT。发现原始的 scGPT 训练/测试划分有泄漏。

### 唱反调的那个声音

- **[Foundation Models Improve Perturbation Response Prediction（bioRxiv 2026.02.18）](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1)**——主张**只要数据够多**，FM 在遗传 + 化学扰动预测上*确实*能显著改善，并逼近根本性的性能上限。**直接对立**于 Ahlmann-Eltze、Liu、无参数法和那两篇 Wu。**这篇站不站得住，决定了这场清算是一纸永久判决，还是一个临时状态。**

## 还没人盖到的轴——哪些口子还开着

在这 12 篇论文之外，有五条评估轴还没被系统覆盖。每一条都给一篇 2026 年的第 4 赛道论文敞着门，算力不到 2,000 美元。**这些就是今天一篇新批评论文能拉开差距的角度。**

| 没盖到的轴 | 为什么要紧 | 需要什么 |
|---|---|---|
| **供者划分基准** | 跨供者泛化几乎没被测过，因为数据底料本身就偏供者（Tahoe-100M = 50 个细胞系，没有来自病人的） | 在 HTAN 或 HCA 真实世界队列上做一个留出供者的基准 |
| **跨组织迁移** | 在组织 A 上预训练、在组织 B 上评估——几乎从没测过。连 UCE 的跨物种测试也都是在健康组织内部做的。 | 用一个按组织分层的 scRNA 图谱，做一个正式的跨组织划分 |
| **时间分辨的扰动** | 大多数评估都是稳态的。那扰动后 0h vs 6h vs 24h 呢？ | 一个带多个时间点的 perturb-seq 数据集 + 一套时间划分协议 |
| **癌症细胞系 → 原发肿瘤的迁移** | 把供者划分专门用到癌症上。如果 sc-FM 没法从 K562 迁到病人肿瘤，它就帮不了肿瘤学。 | 配对的 K562/RPE1 + 匹配的原发肿瘤 scRNA 队列 |
| **稀有队列的鲁棒性** | 每类不足 100 个细胞时，FM 的表现怎么退化？xVERSE 那篇提了一嘴（用 4 个细胞就分辨出稀有类型），但没把那条曲线形式化。 | 一个跨 sc-FM 的「退化 vs 队列规模」系统性基准 |

谁第一个落地其中任何一条，谁就拿下 2026–2028 这一轮的引用。**算力不到 2,000 美元。*Nat Methods* / *Genome Biology* / *Adv Sci* 都会要它。**

## 怎么用这份目录来选项目

**如果你想写一篇批评论文（第 4 赛道）**：
1. 从上面那张表里挑一条没盖到的轴。
2. 对照上面那 12 篇，核实这条轴确实没被覆盖过。
3. 选好你的测试集：Replogle（Cell 2022）、Norman（Science 2019）、Tahoe-100M、Open Problems v2、scPerturBench。
4. 至少把 Ahlmann-Eltze + Wenkel 这两条基线实现出来，当你的地板。
5. 引上那篇唱反调的（FMs Improve Perturbation），并正面说清楚你的发现是支持它还是反驳它。
6. 你自己那篇论文该过哪些关，清单见 [批判性地读一篇 FM 论文](reading-an-fm-paper-critically.md)。

**如果你想写一篇方法论文（第 1–9 轨）**：
- 第 3、6、8、9 轨是清算之后的评估前沿。
- [第 9 轨（因果可迁移性）](interpretability-mech-causal.md)口子开得最大，因为 Virtual Cells Need Context（2026）只点出了框架，却没把它落成一套基准。
- 第 8 轨（协同信息分数）最具体——Microsoft 在 2026 年 2 月发布了这个指标，还没人把它套到多模态 FM 这一大群上去。

## 这条叙事弧线

这 12 篇论文，按时间顺序读下来，讲的是同一个故事：

- **2024 → 2025 年初**：零星的预警（Boiarsky NeurIPS workshop、Csendes scPerturBench 预印本）。
- **2025 年 8 月**：Ahlmann-Eltze *Nat Methods* 落下那一锤定音——线性基线在扰动预测上击败每一个已发布的 sc-FM。
- **2025 年 4–10 月**：Kedzierska、Wenkel、Wu *Nat Methods*、Wu *Genome Biology*——这场清算成了一整片语料。
- **2026 年 1–4 月**：Liu *Adv Sci*、无参数法、CellBench-LS、Han et al.、细胞动力学——清算从扰动预测推广到了大多数细胞级任务。**到 2026 年 4 月，这成了全学科范围的共识。**
- **2026 年 2 月**：唱反调的声音到场（FMs Improve Perturbation）。清算重新被争议起来。
- **2026 年 2 月**：Virtual Cells Need Context 给出了**理论上**的框定（因果可迁移性）。
- **2026 年 5 月**：这个领域诚实的立场是**四块拼起来**的——清算 + 唱反调 + 理论根基 + 架构回应（xVERSE、组合式 FM、TranscriptFormer）。

这条弧线，正是这场演讲第一幕走过的路。

## 接下来读什么

- **[基础模型——全景](foundation-models-state-of-play.md)**——那套「四个纪元」的框架（范式 → 雄心 → 清算 → 回应）就放在这里。
- **[90 分钟速读](speed-read.md)**——把这份目录放进更大的文献网络里，配一条精选的阅读顺序。
- **[为什么线性基线会赢？](why-linear-baselines-win.md)**——这份目录背后的机理。
- **[怎样批判性地读一篇 FM 论文](reading-an-fm-paper-critically.md)**——那张 8 项清单。
- **[补充材料 §E——带方法学细节的完整评估目录](../fm-to-virtual-cells-supplementary.md#e-20252026-evaluation-papers-catalog)** *（私人笔记）*——更深的一层。

---

*最后更新于 2026-05-13。*
