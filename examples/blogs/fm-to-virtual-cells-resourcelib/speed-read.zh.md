---
title: "90 分钟速读"
summary: "一条自成体系的 90 分钟语料通读路径——每个条目都把要点（TL;DR）内嵌呈现，让你在本页就能吸收结论。链接降级为仅供深入阅读之用，想看更多再点。"
---

一条自成体系、贯穿癌症-AI 语料中最高价值内容的 90 分钟通读路径。每个条目都把发现 **内嵌** 呈现，让你在本页就能吸收它；链接是"再深入一步"的提示，而非唯一的载荷。在 **10 / 35 / 60 / 75 / 85 / 90** 分钟处设有停止标记，让你在已掌握大部分要点的情况下随时退出。

本页是为那些有 90 分钟、想要最高价值横截面的人准备的 **正门**。全面的覆盖在会议库（conference vaults）以及每个条目链接到的逐工具 / 逐试验档案里。

---

## 0:00 — 给自己定位（5 分钟）

### [Conference-vaults home](https://liudengzhang.github.io/conference-vaults/) — 2 分钟

conference-vaults 站点索引了 2025-2026 年间的 37 场会议——肿瘤学（AACR、ASCO 及其子会议、ESMO、ESH、SGO、SITC、SABCS）、AI/ML-用于生物学（ICLR、ICML、NeurIPS、CVPR、ECCV、KDD）、影像（ISBI、MICCAI、RSNA）、单细胞 / 空间（scverse、GBCC、Single Cell Genomics、ASCB）、基因组学（AGBT、ASHG、ESHG、ACMG），以及生物信息学工具（EuroBioC、RECOMB、ECCB、ISMB）。每场会议要么是一个 **完整库**（会后基于会议转录和摘要构建），要么是一个 **脚手架**（为即将到来的日期所设的占位）。主页是最快看清哪些 2026 年会议已有实质覆盖、哪些仍在追踪中的方式。

### [2026 Timeline](https://liudengzhang.github.io/conference-vaults/timeline/) — 3 分钟

一张一年一览的甘特图，按四项标准为全部 36 场会议打分——可改变实践的潜力、方法学新颖性、塑造领域的影响力，以及追踪所需的精力。**评分量规才是承重之物**；甘特图只是其上的便利层。用它来决定哪些 2026 年会议值得占用日程时间，然后再让本篇速读把你收窄到具体条目。

## 0:05 — 癌症研究的锚点（5 分钟）

### [AACR 2026 — Overview](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/) — 5 分钟

AACR Annual 是把整个语料沿五条轴线组织起来的锚定会议：**用于生物学的智能体 AI、单细胞 + 空间方法、虚拟细胞、生物信息学 / AI 方法学、临床试验**。2026 年的议程（4 月 24-29 日，芝加哥）大力倾向多模态基础模型——Charlotte Bunne 关于虚拟病人的 ED03 全体大会、Mahmood 那套病理 FM 的主旨演讲，以及 18 张建立在 UNI / Virchow / CHIEF 病理家族之上的海报。这五条轴线在本篇速读后面的每一节里都会复现，所以这是回本最快的一页。值得注意的是，议程中 **没有任何一张标题里含 scGPT / Geneformer / UCE 的海报**——2025 年的线性基线清算在落到领域其余部分之前，已经完整地落进了 AACR 的议程。

> 🟢 **在 0:10 处停止**——你现在已经知道语料的形状了。

---

## 0:10 — 今年癌症治疗有什么改变（25 分钟）

三场 GU/GI/妇科会议上的三项读出，在 2026 年改变了诊疗标准。

### ASCO GI（1 月 8-10 日，旧金山）— 9 分钟

#### [HERIZON-GEA-01](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/herizon-gea-01/) — 3 分钟

**zanidatamab + 化疗** 对阵 trastuzumab + 化疗作为 HER2 阳性胃 / GEJ 腺癌一线治疗的 3 期试验。Zani+化疗在全人群中改善了 OS，且获益 **集中于 PD-L1 CPS ≥1 的患者**——这正是该领域用于检查点抑制剂选择的 IO-获益阈值。实践改变：zani 取代 trastuzumab 成为 1L HER2+ G/GEJ 的骨架方案，而 CPS≥1 成为判断谁获益最多的可操作生物标志物。

#### [BREAKWATER cohort 3](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/breakwater-cohort3/) — 3 分钟

**Encorafenib + cetuximab + FOLFIRI** 作为 BRAF V600E 突变型转移性结直肠癌的 1L 治疗。中位 OS 达到 **约 30 个月对阵此前化疗 SOC 的约 15 个月**——翻了一倍，这在结直肠癌中很罕见。该结果确立了三联方案为 BRAF 突变 mCRC 的新 1L 标准，并终结了关于靶向治疗应在前置还是在化疗失败后叠加的长期争论。

#### [Daraxonrasib + zoldonrasib PDAC](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/daraxonrasib-zoldonrasib-pdac/) — 3 分钟

**pan-RAS(ON) 抑制剂在胰腺癌中** 的首批临床数据——daraxonrasib（RMC-6236）± zoldonrasib（G12D 特异性）。在经过大量预处理的 PDAC 中的缓解率和 PFS 是迄今该疾病中最干净的 pan-RAS 信号。更重要的贡献是方法学上的：试验中的 ctDNA 动态被提议作为一种 **早期读出生物标志物**，给下一波 pan-RAS 试验一种在研究中途自适应的方式，而不必等待影像学终点。

### ASCO GU（2 月 26-28 日，旧金山）— 9 分钟

#### [KEYNOTE-B15 / EV-304](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/keynote-b15-ev304/) — 3 分钟

**Enfortumab vedotin + pembrolizumab** 对阵顺铂-吉西他滨作为肌层浸润性膀胱癌的围手术期治疗。EV+pembro 产生了 **0.53 的 EFS 风险比**——复发风险大致减半。顺铂作为默认方案已逾 30 年；这是 MIBC 中第一个取代它的方案，并把讨论从"用不用铂？"推向"用不用 ADC+IO？"

#### [LITESPARK-022](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/litespark-022/) — 3 分钟

为高危切除后透明细胞 RCC，**在辅助 pembrolizumab 上加用 Belzutifan（HIF-2α 抑制剂）**。头条 DFS 不是重点——重点在于这是第一个在本已活跃的 pembro 骨架之上叠加一种机制的辅助 ccRCC 试验，从而 **在 pembro 单药已是 SOC 的场景下，抬高了"加成获益"的门槛**。未来的 RCC 辅助试验将以这一组合为标尺来衡量，而非以安慰剂。

#### [PEACE-3](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/peace-3/) — 3 分钟

转移性去势抵抗性前列腺癌中，**Radium-223 + enzalutamide** 对阵 enza 单药。Ra-223 此前被视为一种小众的仅限骨的药物；PEACE-3 显示该组合带来干净的 rPFS 和 OS 获益，并以一次 **试验中途的方案修订加入了骨保护**（denosumab / 唑来膦酸），修正了早期的骨折信号。这次回填是关键转折——它表明一旦从机制上控制住骨折风险，该组合是持久的。

### SGO（4 月 10-13 日，圣胡安）— 7 分钟

#### [ROSELLA](https://liudengzhang.github.io/conference-vaults/conferences/sgo-2026/trials/rosella/) — 4 分钟

铂耐药卵巢癌中，**Relacorilant（选择性糖皮质激素受体拮抗剂）+ nab-paclitaxel** 对阵 nab-paclitaxel 单药。该组合在 PFS 和 OS 上击败了化疗组——是 **任何实体瘤中首个阳性的 GR 拮抗剂 3 期试验**。糖皮质激素信号多年来一直被认为与化疗耐药有关，却从未在临床上被靶向；ROSELLA 验证了该机制并开辟了一个类别。

#### [RUBY 4-yr OS](https://liudengzhang.github.io/conference-vaults/conferences/sgo-2026/trials/ruby-4yr-os/) — 3 分钟

晚期/复发性子宫内膜癌中 **dostarlimab + 化疗** 的长期随访。dMMR 亚组达到了 **73% 的 4 年 OS 率**——这种平台模式在黑色素瘤中比在妇科肿瘤中更常见。这些数据巩固了 IO+化疗作为 dMMR-子宫内膜癌标准的地位，并重置了在免疫治疗本土领域之外"长期"看起来应当如何的预期。

> 🟢 **在 0:35 处停止**——你已掌握 2026 年癌症临床的脉搏。

---

## 0:35 — 生物信息学工具（25 分钟）

两场定义了今年工具讨论的社区会议。

### EuroBioC 2025（9 月，巴塞罗那）— 14 分钟

#### [Themes & takeaways](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/themes/) — 4 分钟

EuroBioC 2025 的两大模式是 **（1）空间组学的汇聚**——每隔一个报告就涉及某种形式的空间转录组学，Visium HD 或 Stereo-seq 正成为默认底料——以及 **（2）跨语言互操作**——长期的 Python/R 鸿沟正在崩解，因为 Bioconductor 类正获得 Python 封装，而 `scverse` 对象正获得 R 视图。"联合"的框定（与同年的 GBCC）是其可操作的后果：一个工具同时发布进两个生态系统现在已是入场底线。

#### [DESpace](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/despace/) — 4 分钟

一种空间可变基因 / 域特异性模式的检测方法，**把 SVG 重新框定为一个在簇协变量上的、熟悉的负二项 GLM 问题**。实务上：它让用户能用他们已经在 bulk RNA-seq 上使用的同一套回归机器来做空间差异表达，而不必学习一套新的高斯过程框架。这一概念性的挪移才是贡献——它降低了任何有 bulk-RNA 经验的湿实验分析师正确做空间 DE 的激活能。

#### [SpatialData](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/spatialdata/) — 3 分钟

一个 **Zarr / OME-NGFF 的跨语言数据框架**，把栅格图像、分割掩膜和表格组学保存在单一可寻址对象里，从 Python（`spatialdata-py`）和 R（`SpatialData` 的 Bioconductor 移植）两边都能读取。它是当下每个现代空间组学工具都瞄准的底料，也是 Python scverse 与 R Bioconductor 世界之间的桥梁。如果要从 2025 年的空间浪潮里挑一块基础设施来理解，就是它。

#### [iSEE](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/isee/) — 3 分钟

Bioconductor 里交互式可视化的典范公民——一个 Shiny 应用，用户在其中拼装面板（UMAP、热图、样本表、标志基因），且每个面板都被响应式地联动。2025 年的更新加入了 **S4 面板图组合 + 代码提取**，于是一次点击的会话可以被导出为可复现的 R。iSEE 是科学计算栈中"既交互又可复现"长什么样的范本。

### GBCC 2025（6 月，冷泉港）— 11 分钟

#### [Themes & takeaways](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/themes/) — 4 分钟

GBCC 是首届 Galaxy + Bioconductor 联合会议，而其元故事就是这一动机本身：随着分析流水线变得更长、更跨语言，实验台分析师越来越想要一个 **GUI 工作流运行器（Galaxy），用来封装他们信任的 Bioconductor 工具**。另一条线是 **智能体-AI 增强的分析**——能读取 notebook 上下文并提议下一步的 LLM 副驾，多个演示显示它在常规差异表达流程上奏效。

#### [plyxp](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/plyxp/) — 4 分钟

Mike Love 的包，给 `SummarizedExperiment` 对象提供 **dplyr 风格的动词**——`filter()`、`mutate()`、`summarise()` 像操作 tibble 那样作用于 rowData/colData。这座桥很重要，因为 S4 是组学的正确对象模型（有类型、经校验、多 assay），但 tidyverse 是大多数 R 用户的正确交互模型。plyxp 是这两者如何共存而无人需要放弃自己惯例的范例。

#### [bioc-to-galaxy](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/bioc-to-galaxy/) — 3 分钟

一个 **从 Bioconductor 包的 DESCRIPTION 文件到 Galaxy XML 工具封装的 LLM 辅助翻译器**。它为何重要：为 Galaxy 封装一个 Bioconductor 工具过去要让一位领域专家花一天；这把它降到了几分钟。它承载的元故事是：LLM 辅助的包翻译现在已是一种真正的互操作原语——同样的模式会在 Python ↔ R、CWL ↔ Nextflow 等处复现。

> 🟢 **在 1:00 处停止**——你已了解 2025 年生物信息学工具的版图。

---

## 1:00 — 生物学中的 AI / ML 拐点（15 分钟）

两场在 2026 年方法学前沿移动了的会议。

### ICLR 2026（4 月 23-27 日，里约）— 9 分钟

#### [MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/) — 3 分钟

一个为医学 / 临床推理智能体准备的 **7.2 万任务的沙箱化代码执行竞技场**，配套有 Med-Copilot-7B，一个在该竞技场内训练的较小模型。贡献是竞技场，而非模型——它给智能体生物学研究一个标准化的评估面，类比于 SWE-bench 之于软件工程智能体的作用。这是 AACR 2026 生物学智能体赛道的首要智能体-AI 锚点。

#### [Proteina Complexa](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/proteina-complexa/) — 3 分钟

通过在全原子蛋白复合物上的流匹配（flow matching）进行的 **原子级蛋白结合剂设计**。头条数字：**针对 PDGFR 的 63.5% 实验命中率**（任何从头结合剂生成器中报告的最高值），以及 **有史以来报告的首批从头碳水化合物结合剂**。该结果重塑了结合剂设计领域：原子级 + 流匹配现在同时击败了 AlphaFold-Multimer 引导的设计和更早的基于扩散的生成器。

#### [sc-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) — 3 分钟

一个 **知识增强的虚拟细胞基准**，以 `latent-additive` 基线作为下限，对 sc-FM 在细胞类型分类、扰动预测和跨组织迁移上打分。由于所有主要的 sc-FM（scGPT、Geneformer、scFoundation、UCE）都低于那个下限，sc-Arena 现在作为一个 **记分牌而非参赛者** 运作——它是每个新 sc-FM 主张都必须越过的一页。正确的读法是："这才是给虚拟细胞打分的真正方式。"

### ISBI 2026（4 月 8-11 日，伦敦）— 6 分钟

#### [Mahmood pathology FM keynote](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/mahmood-pathology-fm-keynote/) — 3 分钟

Faisal Mahmood 的主旨演讲铺陈了 Mahmood 实验室一直在交付的 **三层病理 FM 栈**：一个在 >1 亿张 H&E 瓦片上经 DINOv2 训练的瓦片编码器（UNI / UNI2-h）、一个把瓦片聚合为切片级表征的 attention-MIL 聚合器（CONCH / TITAN），以及疾病特异性的任务头（PathChat 用于临床推理，PathChat-DX 用于获 FDA 突破性认定的诊断工具）。该栈是当下每条正被认真使用的病理-FM 流水线的可操作模板；如果你在 2026 年构建一个病理模型，你就建在这套脚手架上。

#### [Segmentation FMs synthesis](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/segmentation-foundation-models-isbi/) — 3 分钟

对 **SAM-3 / MedSAM / SegVol 这一脉络** 的跨论文综述——带原生 3D 扩展的可提示医学分割 FM。2026 年的拐点是：这些模型现在能在 CT、MRI 和显微镜上，从单个点或框提示开始就胜任地分割，任务特异性微调以小时而非以周来衡量。其含义是：把分割当作一个研究问题来框定基本已经结束了；新问题是如何把这些模型封装进放射科医生 / 病理医生真正会用的临床 UI 里。

> 🟢 **在 1:15 处停止**——你已掌握 2026 年生物学中 AI/ML 的地图。

---

## 1:15 — 脑癌深度挖掘（10 分钟）

一场会议（AACR Brain Tumors 2026，3 月 23-25 日，费城）产出了今年最连贯的 CNS 癌症故事。

### [Monje GD2 CAR-T DIPG](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/monje-gd2-cart-dipg/) — 3 分钟

Michelle Monje 关于 **靶向 GD2 的 CAR-T 用于 H3K27M 突变型弥漫中线胶质瘤 / DIPG** 的进展。这一信号是迄今最强的儿科 CNS CAR-T 结果——在一种几十年来中位 OS 一直徘徊于 <12 个月的疾病中取得了持久的影像学缓解。机制故事是：H3K27M 把 DMG 细胞锁定在一种类 OPC 状态，该状态在表面一致地表达 GD2，正是这一点让该抗原以成人胶质瘤中所不具备的方式变得可被靶向。

### [Suva glioma cell states](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/suva-glioma-cell-states/) — 4 分钟

Mario Suva 关于成人胶质母细胞瘤细胞层级的 **四态框架**：类星形胶质（AC）、间叶（MES）、类少突前体（OPC）、类神经前体（NPC）。该框架决定了 **CAR-T 抗原逃逸的地理学**——哪种状态逃逸哪种抗原，会在试验读出之前就告诉你耐药轨迹。它是脑肿瘤 CAR-T 领域其余部分现在用来解读缓解模式的概念脚手架。

### [Neuroscience of gliomas + TAM (synthesis)](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/neuroscience-of-gliomas-tam/) — 3 分钟

这次的跨报告综述：胶质瘤细胞与邻近神经元形成 **功能性的、AMPAR 介导的突触**（Monje 等人），而肿瘤相关巨噬细胞区室汇聚于一条抑制抗肿瘤免疫的 **TREM2 / SPP1 轴**。这两个故事在同一个肿瘤里相遇，并解释了为何历史上的 CNS 免疫治疗表现不佳——神经回路和髓系回路必须同时被处理。这是今年最连贯的机制性 CNS 癌症故事。

> 🟢 **在 1:25 处停止**——你已就一种疾病做了深入挖掘。

---

## 1:25 — 测序平台（5 分钟）

### [Roche Axelios 1](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/roche-axelios-1/) — 5 分钟

Roche 的 **150 美元 / 30× duplex 基因组锚点**，在 AGBT 2026（2 月 22-25 日，马可岛）发布。该平台使用扩展测序（sequencing-by-expansion, SBX）——Roche 在 2016 年退出高通量测序后基于纳米孔的回归——其头条数字重置了那场多年来在 200-600 美元处僵持的每基因组成本之争。战略含义是：Illumina 现在面对两个可信的价位竞争者（Roche 在通量的高端，Element/Ultima 在成本的下限），而对于此前在更高价格下处于边际的项目，群体基因组测序的经济账开始算得过来了。

> 🟢 **在 1:30 处停止**——完整速读已完成。

---

## 如果你还有时间（延伸选读，30 分钟）

如果你有一次后续会话，六个能深化特定轴线的条目。

### [JPM 2026 themes](https://liudengzhang.github.io/conference-vaults/conferences/jpm-2026/themes/) — 5 分钟

今年的金融 / 战略框架。JPM 最大的公告是 **Lilly + NVIDIA 的 10 亿美元 Vera Rubin 算力交易**，用于内部 BioNeMo 基础模型训练，这是制药正从模型即服务的消费转向内部 FM 自建的最清晰信号。另一条线是 AI-CRO 整合（Owkin 的 Pathology Explorer 进入 Claude for Healthcare、Tempus AI 的多项交易）——AI-临床数据这盘棋现在已是一个类别，而非一次性事件。

### [Element VITARI](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/element-vitari/) + [Ultima UG200](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/ultima-ug200/) — 5 分钟

**100 美元基因组的下限**。Element 的 VITARI（avidity 测序的规模化外扩）和 Ultima 的 UG200（以通量为主的更新换代）都瞄准低于 200 美元 / 30× 的区间，从成本下限一侧补足 Roche。两者合在一起让 100 美元基因组成为 2026 年的真实产品，而非 2030 年的预测——这改变了哪些东西会在群体规模上被测序、哪些仍停留在外显子组或 panel 分辨率。

### [ACMG Presidential Plenary — NBS expansion](https://liudengzhang.github.io/conference-vaults/conferences/acmg-2026/talks/presidential-plenary-nbs-expansion/) — 5 分钟

新生儿筛查向 **群体规模基因组测序** 的扩展。这场全体大会论证了随着测序成本下降，把约 100 个可干预基因加入 NBS 的理由——并就结果回报、父母知情同意和下游照护路径给出了具体的可操作设计。这是上面 100 美元基因组故事的政策接口。

### [PSMAaddition](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/psmaaddition/) — 5 分钟

**Lu-PSMA-617 前移三线**，进入 1L 转移性激素敏感性前列腺癌。该放射性配体此前是 3L+ 的选项；PSMAaddition 显示了把它叠加进初始治疗组合时的 OS / rPFS 获益。实践含义：诊断时进行 PSMA-PET 筛查在操作上变得必要，而不只是锦上添花。

### [sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) — 5 分钟

一个叠加在冻结 sc-FM 骨干上的 **<1% 药物条件适配器（adapter）**，给出比线性-可加基线更好的零样本扰动预测。架构上的教训是：sc-FM 骨干的表征是有用的，但扰动任务需要一个原始预训练从未赋予它的小型药物条件头。这是 2026 年的"小团队构建模式"——保留 FM，加一个薄薄的专用头。

### [DeeDeeExperiment](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/deedeeexperiment/) + [Tidyomics](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/tidyomics/) — 5 分钟

Bioconductor 的 **数据类演进**：DeeDeeExperiment 为差异表达工作流泛化了 SummarizedExperiment，而 tidyomics 给主要组学类提供了 tidyverse 动词。两者合在一起就是对"2030 年的 Bioconductor 长什么样？"的回答——底下是有类型的 S4，上面是 tidyverse 的流畅。

---

## 或者转向一个脚手架库

如果你想跟进一场即将到来的会议：

- **5 月 26-29 日**：[RECOMB 2026](https://liudengzhang.github.io/conference-vaults/conferences/recomb-2026/) — 方法 / 算法
- **5 月 29 日-6 月 2 日**：[ASCO 2026](https://liudengzhang.github.io/conference-vaults/conferences/asco-2026/) — 今年最大的肿瘤学读出
- **6 月 11-14 日**：[EHA 2026](https://liudengzhang.github.io/conference-vaults/conferences/eha-2026/) — 欧洲血液学
- **6 月 13-16 日**：[ESHG 2026](https://liudengzhang.github.io/conference-vaults/conferences/eshg-2026/) — 欧洲人类遗传学（与 EHA 同周）

---

## 这是如何策展的

速读的选择偏向（1）**可改变实践或定义类别的结果**、（2）**很可能在多个 2026 库中复现的工具**，以及（3）**跨库故事**（癌症-临床脉搏、生物信息学工具的演进、生物学中 AI/ML 的拐点）。每一节的篇幅都被调到落在一个自然的停止点上，让你可以提早退出而不丢失主线。改写成内嵌-TL;DR 形式（2026 年 5 月）是为了让这成为一页你真正会读完的东西，而非一份你弹开就走的目录。

全面的覆盖在会议库本身里——本页是为 90 分钟读者优化的路径。
