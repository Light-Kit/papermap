---
title: "90 分钟速读"
summary: "一条能独立走完的 90 分钟路线，带你穿过整个语料库——每一条都把要点直接写在正文里，看完这一页就算吸收到位，链接只是「想再深挖」时的入口，而不是唯一的干货。"
---

一条能独立走完的 90 分钟阅读路线，专挑这套癌症-AI 语料库里最值钱的部分。每一条都把结论**直接写进正文**，在这一页就能消化掉；链接只是「想再往下读」的提示，不是唯一的载体。在 **10 / 35 / 60 / 75 / 85 / 90** 分钟处都设了停车点，随时收手都不亏，要紧的东西已经到手。

这一页是给那种「手头有 90 分钟、想要一个最高性价比横切面」的人准备的**正门**。真正铺得全的内容，在各场会议的资料库里，以及每条目链接出去的逐工具 / 逐试验档案里。

---

## 0:00 — 先认认方向（5 分钟）

### [Conference-vaults 主页](https://liudengzhang.github.io/conference-vaults/) — 2 分钟

conference-vaults 这个站收录了横跨 2025-2026 的 37 场会议——肿瘤（AACR、ASCO 及其各分会、ESMO、ESH、SGO、SITC、SABCS）、AI/ML-生物（ICLR、ICML、NeurIPS、CVPR、ECCV、KDD）、影像（ISBI、MICCAI、RSNA）、单细胞 / 空间（scverse、GBCC、Single Cell Genomics、ASCB）、基因组学（AGBT、ASHG、ESHG、ACMG），还有生信工具（EuroBioC、RECOMB、ECCB、ISMB）。每场会议要么是一个**完整资料库**（会后根据会场录音和摘要建起来的），要么是一个**占位骨架**（给还没到的日程留的坑）。想最快看清 2026 年哪些会议已经有实打实的内容、哪些还只是在跟踪，主页就是最快的入口。

### [2026 时间线](https://liudengzhang.github.io/conference-vaults/timeline/) — 3 分钟

一张全年一览的甘特图，按四条标准给全部 36 场会议打分——能否改变实践、方法新不新、对领域影响有多大、跟踪起来要花多少力气。**真正撑场的是这套打分规则**，甘特图只是套在上面的便利层。先用它定一下 2026 年哪些会议值得占你的日历，再让这篇速读把你收窄到具体条目上。

## 0:05 — 癌症研究的锚（5 分钟）

### [AACR 2026 — 总览](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/) — 5 分钟

AACR 年会是把整套语料库串起来的那个锚，它沿五条轴线组织其余内容：**生物领域的智能体 AI、单细胞 + 空间方法、虚拟细胞、生信 / AI 方法学、临床试验。** 2026 年的日程（4 月 24-29，芝加哥）明显押宝多模态基础模型——Charlotte Bunne 那场关于「虚拟病人」的 ED03 全体报告、Mahmood 那一摞病理 FM 的主旨演讲，还有 18 张建在 UNI / Virchow / CHIEF 这一族病理模型之上的海报。这五条轴线会在这篇速读后面每一节反复冒头，所以这一页回本最快。值得一提的是，整个日程里**标题带 scGPT / Geneformer / UCE 的海报一张都没有**——2025 年那场线性基线清算，在落到领域其余地方之前，先在 AACR 的日程里彻底落了地。

> 🟢 **0:10 可停** — 你已经摸清语料库的形状了。

---

## 0:10 — 今年癌症治疗变了什么（25 分钟）

三场 GU/GI/妇瘤会议上的三组读数，在 2026 年挪动了治疗标准。

### ASCO GI（1 月 8-10，旧金山） — 9 分钟

#### [HERIZON-GEA-01](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/herizon-gea-01/) — 3 分钟

一项三期试验：**zanidatamab + 化疗** 对 trastuzumab + 化疗，作为 HER2 阳性胃 / 胃食管交界腺癌的一线方案。zani+化疗在整个人群里都改善了 OS，而且获益**集中在 PD-L1 CPS ≥1 的患者身上**——这正是领域里挑选检查点抑制剂时早就在用的那条 IO 获益门槛。实践上的改变：zani 取代 trastuzumab，成为一线 HER2+ G/GEJ 的骨架，而 CPS≥1 成了「谁获益最多」的操作性生物标志物。

#### [BREAKWATER 队列 3](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/breakwater-cohort3/) — 3 分钟

**Encorafenib + cetuximab + FOLFIRI** 作为 BRAF V600E 突变型转移性结直肠癌的一线方案。中位 OS 达到 **约 30 个月，对比此前化疗标准的约 15 个月**——翻了一倍，这在结直肠癌里很罕见。这个结果把三联方案确立为 BRAF 突变型 mCRC 的新一线标准，也终结了那场旷日持久的争论：靶向治疗到底该一开始就叠上去，还是等化疗失败之后再上。

#### [Daraxonrasib + zoldonrasib 治胰腺癌](https://liudengzhang.github.io/conference-vaults/conferences/asco-gi-2026/trials/daraxonrasib-zoldonrasib-pdac/) — 3 分钟

**泛 RAS(ON) 抑制剂用于胰腺癌**的首批临床数据——daraxonrasib（RMC-6236）± zoldonrasib（G12D 特异）。在重度经治的 PDAC 里，缓解率和 PFS 是这个病种迄今最干净的泛 RAS 信号。但更要紧的贡献在方法层面：试验里的 ctDNA 动态被提议当作一个**早读出生物标志物**，让下一波泛 RAS 试验有办法在中途就调整，而不必干等影像学终点。

### ASCO GU（2 月 26-28，旧金山） — 9 分钟

#### [KEYNOTE-B15 / EV-304](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/keynote-b15-ev304/) — 3 分钟

**Enfortumab vedotin + pembrolizumab** 对顺铂-吉西他滨，作为肌层浸润性膀胱癌的围手术期治疗。EV+pembro 做出了 **0.53 的 EFS 风险比**——复发风险大约砍掉一半。顺铂当了 30 多年的默认选项，这是第一个在 MIBC 里把它挤下去的方案，也把讨论从「上不上铂」转向了「上不上 ADC+IO」。

#### [LITESPARK-022](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/litespark-022/) — 3 分钟

在高危、已切除的透明细胞 RCC 里，**辅助 pembrolizumab 之上再加 belzutifan（HIF-2α 抑制剂）**。头条的 DFS 数字不是重点——重点是，这是第一项在一个本就有活性的 pembro 骨架上再叠一套机制的辅助 ccRCC 试验，**把「什么才算附加获益」这条线抬高了**：在 pembro 单药已经是标准的场景里。往后的 RCC 辅助试验，要比的是这个组合，而不是安慰剂。

#### [PEACE-3](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/peace-3/) — 3 分钟

在转移性去势抵抗前列腺癌里，**Radium-223 + 恩扎卢胺** 对恩扎单药。Ra-223 此前被看作一个只管骨的小众药；PEACE-3 给这个组合做出了干净的 rPFS 和 OS 获益，还带了一处**中途修改方案、加上骨保护**（denosumab / 唑来膦酸）的操作，把早期那个骨折信号摁住了。这处补丁才是关键转折——它表明，只要骨折隐患被机械地控住，这个组合就站得稳。

### SGO（4 月 10-13，圣胡安） — 7 分钟

#### [ROSELLA](https://liudengzhang.github.io/conference-vaults/conferences/sgo-2026/trials/rosella/) — 4 分钟

在铂耐药卵巢癌里，**relacorilant（选择性糖皮质激素受体拮抗剂）+ 白蛋白紫杉醇** 对白蛋白紫杉醇单药。这个组合在 PFS 和 OS 上都赢了化疗组——**这是任何实体瘤里第一项阳性的三期 GR 拮抗剂试验**。糖皮质激素信号被怀疑跟化疗耐药有关已经好些年了，却从没在临床上被真正瞄准过；ROSELLA 验证了这个机制，也开出了一个新品类。

#### [RUBY 4 年 OS](https://liudengzhang.github.io/conference-vaults/conferences/sgo-2026/trials/ruby-4yr-os/) — 3 分钟

晚期/复发子宫内膜癌里 **dostarlimab + 化疗** 的长期随访。dMMR 亚组打出了 **73% 的 4 年 OS 率**——这种平台期形态，在黑色素瘤里比在妇瘤里常见得多。这批数据把 IO+化疗钉死成 dMMR 子宫内膜癌的标准，也重置了大家对「长期」的预期：在免疫治疗的主场之外，「长期」原来能长成这样。

> 🟢 **0:35 可停** — 你已经把到 2026 年癌症临床的脉了。

---

## 0:35 — 生信工具（25 分钟）

两场社区会议，定义了今年关于工具的对话。

### EuroBioC 2025（9 月，巴塞罗那） — 14 分钟

#### [主题与要点](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/themes/) — 4 分钟

EuroBioC 2025 的两条大脉络是：**（1）空间组学的合流**——隔一场报告就有某种形式的空间转录组，Visium HD 或 Stereo-seq 正变成默认底料；**（2）跨语言互操作**——Python/R 那道长年的隔阂正在塌掉，Bioconductor 的类拿到了 Python 封装，`scverse` 的对象也有了 R 视图。同年和 GBCC 那个「联合」的提法，就是这件事在操作上的后果：一个工具同时投进两个生态，如今已是入场门槛。

#### [DESpace](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/despace/) — 4 分钟

一个检测空间可变基因 / 域特异模式的方法，它**把 SVG 重新框成一个大家熟悉的、跑在聚类协变量上的负二项 GLM 问题**。落到实处：用户可以拿做 bulk RNA-seq 时已经在用的那套回归机器去做空间差异表达，而不必再学一套新的高斯过程框架。它的贡献就在这个概念上的腾挪——把任何有 bulk-RNA 经验的湿实验分析师「正经做空间 DE」的门槛拉低了。

#### [SpatialData](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/spatialdata/) — 3 分钟

一个 **Zarr / OME-NGFF 跨语言数据框架**，把栅格图像、分割掩膜和表格化的组学数据装进同一个可寻址的对象里，Python（`spatialdata-py`）和 R（`SpatialData` 的 Bioconductor 移植）两边都能读。它是如今每个现代空间组学工具瞄准的底料，也是 Python scverse 世界和 R Bioconductor 世界之间的那座桥。要从 2025 年这波空间浪潮里只挑一块基础设施去吃透，就是它。

#### [iSEE](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/isee/) — 3 分钟

Bioconductor 里那个交互可视化的标杆公民——一个 Shiny 应用，用户在里面拼面板（UMAP、热图、样本表、标志基因），每个面板都是响应式联动的。2025 年的更新加上了 **S4 面板图组合 + 代码导出**，于是一通点击的会话可以导成可复现的 R 代码。在科学计算栈里，「既能交互又能复现」长什么样，iSEE 就是那个范本。

### GBCC 2025（6 月，冷泉港） — 11 分钟

#### [主题与要点](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/themes/) — 4 分钟

GBCC 是第一届 Galaxy + Bioconductor 联合会议，而它的元故事就是这个联办本身的理由：随着分析流水线越拉越长、越来越多语言混用，台前的分析师越来越想要一个 **能把他们信得过的 Bioconductor 工具包起来的 GUI 工作流运行器（Galaxy）**。另一条线是**智能体 AI 加持的分析**——能读懂笔记本上下文、再提议下一步的 LLM 副驾驶，有好几个 demo 已经在常规差异表达流程里把这套跑通了。

#### [plyxp](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/plyxp/) — 4 分钟

Mike Love 的包，给 `SummarizedExperiment` 对象配上了 **dplyr 式的动词**——`filter()`、`mutate()`、`summarise()` 直接作用在 rowData/colData 上，就像它们是 tibble 一样。这座桥之所以要紧，是因为 S4 是组学该有的对象模型（带类型、能校验、多 assay），而 tidyverse 又是大多数 R 用户该有的交互模型。plyxp 就是个范例：两者怎么共存，谁都不用放弃自己的习惯。

#### [bioc-to-galaxy](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/bioc-to-galaxy/) — 3 分钟

一个 **LLM 辅助的翻译器，从 Bioconductor 包的 DESCRIPTION 文件生成 Galaxy 的 XML 工具封装**。它要紧在哪：把一个 Bioconductor 工具封进 Galaxy，以前要一个领域专家花上一天；现在压到几分钟。它捎带的元故事是，LLM 辅助的包翻译如今已经是一个真正的互操作原语——同样的套路会在 Python ↔ R、CWL ↔ Nextflow 等地方反复出现。

> 🟢 **1:00 可停** — 你已经摸清 2025 年的生信工具行情了。

---

## 1:00 — 生物里 AI / ML 的拐点（15 分钟）

两场会议，2026 年的方法学前沿在这里挪了位。

### ICLR 2026（4 月 23-27，里约） — 9 分钟

#### [MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/) — 3 分钟

一个面向医学 / 临床推理智能体的 **7.2 万任务、沙盒化代码执行训练场**，配套了 Med-Copilot-7B 这个在场内训出来的小模型。贡献是这个训练场，不是那个模型——它给智能体生物学研究提供了一个标准化的评测平面，类似 SWE-bench 之于软件工程智能体的作用。这是 AACR 2026 生物智能体那条线最主要的智能体 AI 锚点。

#### [Proteina Complexa](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/proteina-complexa/) — 3 分钟

**原子级蛋白结合剂设计**，靠的是在全原子蛋白复合物上做流匹配。头条数字：**针对 PDGFR 的 63.5% 实验命中率**（任何从头结合剂生成器里报道过的最高值），以及**有史以来第一批从头设计的碳水化合物结合剂**。这个结果重新框定了结合剂设计这个领域：原子级 + 流匹配，如今同时压过了 AlphaFold-Multimer 引导的设计和更早的扩散式生成器。

#### [sc-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) — 3 分钟

一个**知识增强的虚拟细胞基准**，在细胞类型分类、扰动预测、跨组织迁移三项上给 sc-FM 打分，并以一个 `latent-additive` 基线作为地板。因为所有主流 sc-FM（scGPT、Geneformer、scFoundation、UCE）都跑不过那块地板，sc-Arena 如今的角色是一张**记分卡，而不是一个参赛者**——任何新的 sc-FM 主张都得先过这一页。它该这么读：「这才是给虚拟细胞打分的正确姿势。」

### ISBI 2026（4 月 8-11，伦敦） — 6 分钟

#### [Mahmood 病理 FM 主旨演讲](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/mahmood-pathology-fm-keynote/) — 3 分钟

Faisal Mahmood 的主旨演讲摆出了 Mahmood 组一直在出货的**三层病理 FM 栈**：一个在超过 1 亿张 H&E 图块上用 DINOv2 训出来的图块编码器（UNI / UNI2-h），一个把图块聚成切片级表征的 attention-MIL 聚合器（CONCH / TITAN），以及一组疾病特异的任务头（做临床推理的 PathChat、拿到 FDA 突破性认定的诊断工具 PathChat-DX）。这套栈是如今所有真正在用的病理 FM 流水线的操作模板；2026 年你要建一个病理模型，就是建在这个脚手架上。

#### [分割 FM 综述](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/segmentation-foundation-models-isbi/) — 3 分钟

一篇跨论文的综述，串起 **SAM-3 / MedSAM / SegVol 这一脉**——可提示的医学分割 FM，还带原生 3D 扩展。2026 年的拐点是：这些模型如今只要一个点或一个框的提示，就能在 CT、MRI、显微镜下都分得像样，任务特异的微调以小时计、不再以周计。含义是：「把分割当成研究问题」这套框架基本翻篇了；新的问题是怎么把这些模型包进放射科医生 / 病理医生真会用的临床界面里。

> 🟢 **1:15 可停** — 你已经拿到 2026 年生物里 AI/ML 的地图了。

---

## 1:15 — 脑癌深挖一刀（10 分钟）

一场会议（AACR Brain Tumors 2026，3 月 23-25，费城），产出了今年最连贯的一段 CNS 癌症故事。

### [Monje GD2 CAR-T 治 DIPG](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/monje-gd2-cart-dipg/) — 3 分钟

Michelle Monje 关于 **GD2 靶向 CAR-T 治 H3K27M 突变型弥漫中线胶质瘤 / DIPG** 的最新进展。这个信号是迄今最强的儿科 CNS CAR-T 结果——在一个中位 OS 几十年来一直徘徊在 <12 个月的病种里，做出了持久的影像学缓解。机制故事是：H3K27M 把 DMG 细胞锁进一种类 OPC 状态，这种状态在表面上一致地表达 GD2，这正是该抗原可被瞄准的原因——而在成人胶质瘤里它做不到这一点。

### [Suva 胶质瘤细胞状态](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/suva-glioma-cell-states/) — 4 分钟

Mario Suva 给成人胶质母细胞瘤的细胞层级提出的**四状态框架**：类星形胶质（AC）、间充质（MES）、类少突前体（OPC）、类神经前体（NPC）。这套框架决定了 **CAR-T 抗原逃逸的地形**——哪种状态逃哪种抗原，能在试验读出之前就告诉你耐药的走向。它是个概念脚手架，脑瘤 CAR-T 领域如今就拿它来解读缓解模式。

### [胶质瘤神经科学 + TAM（综述）](https://liudengzhang.github.io/conference-vaults/conferences/aacr-brain-tumors-2026/talks/neuroscience-of-gliomas-tam/) — 3 分钟

这是把交叉对话拢到一起的综述：胶质瘤细胞跟邻近神经元形成 **功能性的、AMPAR 介导的突触**（Monje 等人），而肿瘤相关巨噬细胞这一隔室则汇聚到一条 **TREM2 / SPP1 轴** 上、压制抗肿瘤免疫。这两段故事在同一个肿瘤里相遇，也解释了为什么历史上的 CNS 免疫治疗一直不给力——神经环路和髓系环路这两条，得同时去处理。这是今年最连贯的一段 CNS 癌症机制故事。

> 🟢 **1:25 可停** — 你已经在一个病种上扎得很深了。

---

## 1:25 — 测序平台（5 分钟）

### [Roche Axelios 1](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/roche-axelios-1/) — 5 分钟

Roche 的 **150 美元 / 30× duplex 全基因组锚定**，在 AGBT 2026（2 月 22-25，马可岛）上发布。这个平台用的是按扩展测序（SBX）——Roche 在 2016 年退出高通量测序之后、基于纳米孔的一次回归——而这个头条数字，重置了那场在 200-600 美元区间僵持了好几年的「每基因组成本」对话。战略含义是：Illumina 现在面对两个站得住脚的价位竞争者（Roche 在通量高端，Element/Ultima 在成本地板），那些在旧价位下本来很勉强的群体基因组测序项目，经济账开始算得通了。

> 🟢 **1:30 可停** — 整篇速读读完。

---

## 还有时间的话（加餐选读，30 分钟）

六条，若你还有一场后续，可以在特定轴线上扎得更深。

### [JPM 2026 主题](https://liudengzhang.github.io/conference-vaults/conferences/jpm-2026/themes/) — 5 分钟

今年的金融 / 战略框。JPM 上最大的一条公告是 **Lilly + NVIDIA 那笔 10 亿美元的 Vera Rubin 算力交易**，用于自建 BioNeMo 基础模型训练——这是「制药正从模型即服务的消费、转向自建 FM」最干净的一个信号。另一条线是 AI-CRO 的整合（Owkin 的 Pathology Explorer 进了 Claude for Healthcare、Tempus AI 的一系列交易）——AI-临床数据这盘棋如今是一个品类，而不是一次性买卖。

### [Element VITARI](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/element-vitari/) + [Ultima UG200](https://liudengzhang.github.io/conference-vaults/conferences/agbt-2026/launches/ultima-ug200/) — 5 分钟

**100 美元基因组的地板。** Element 的 VITARI（把 avidity 测序铺开规模）和 Ultima 的 UG200（主要是通量上的换代），都瞄准 200 美元 / 30× 以下这一档，从成本地板那侧补上 Roche。两者合起来，把 100 美元基因组做成了一个真实的 2026 年产品，而不是 2030 年的预测——这会改变什么东西值得在群体规模上测序，什么东西停在外显子或 panel 的分辨率上。

### [ACMG 主席全体报告 — NBS 扩展](https://liudengzhang.github.io/conference-vaults/conferences/acmg-2026/talks/presidential-plenary-nbs-expansion/) — 5 分钟

新生儿筛查向**群体规模的基因组测序**扩展。这场全体报告论证了：随着测序成本下降，往 NBS 里再加约 100 个可干预的基因——还给出了在结果回报、家长知情同意、下游照护路径上具体的操作设计。这是上面那段 100 美元基因组故事的政策接口。

### [PSMAaddition](https://liudengzhang.github.io/conference-vaults/conferences/asco-gu-2026/trials/psmaaddition/) — 5 分钟

**Lu-PSMA-617 往前挪了三线**，进到一线转移性激素敏感前列腺癌。这个放射配体此前是个 3 线以后的选项；PSMAaddition 表明，把它叠进起始的治疗组合里，能拿到 OS / rPFS 获益。实践含义：诊断时就做 PSMA-PET 筛查，从「锦上添花」变成了操作上的必需。

### [sc-FM 扰动适配器](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) — 5 分钟

一个挂在冻结 sc-FM 骨干之上的 **不到 1% 参数的药物条件适配器**，把零样本扰动预测做得比线性-加性基线还好。架构上的教训：sc-FM 骨干的表征是有用的，但扰动这个任务需要一个小小的药物条件头——这是原始预训练从没给过它的。这就是 2026 年那种「小团队的建造范式」：留着 FM，外加一个薄薄的专用头。

### [DeeDeeExperiment](https://liudengzhang.github.io/conference-vaults/conferences/eurobioc-2025/tools/deedeeexperiment/) + [Tidyomics](https://liudengzhang.github.io/conference-vaults/conferences/gbcc-2025/tools/tidyomics/) — 5 分钟

**Bioconductor 的数据类演进**：DeeDeeExperiment 把 SummarizedExperiment 推广到差异表达工作流，tidyomics 给主要的组学类配上 tidyverse 动词。两者合起来，就是对「Bioconductor 到 2030 年长什么样」的回答——底下是带类型的 S4，顶上是 tidyverse 的流畅。

---

## 或者转去一个骨架资料库

要是你想跟一场即将到来的会议：

- **5 月 26-29**：[RECOMB 2026](https://liudengzhang.github.io/conference-vaults/conferences/recomb-2026/) — 方法 / 算法
- **5 月 29-6 月 2**：[ASCO 2026](https://liudengzhang.github.io/conference-vaults/conferences/asco-2026/) — 今年最大的一场肿瘤读数
- **6 月 11-14**：[EHA 2026](https://liudengzhang.github.io/conference-vaults/conferences/eha-2026/) — 欧洲血液学
- **6 月 13-16**：[ESHG 2026](https://liudengzhang.github.io/conference-vaults/conferences/eshg-2026/) — 欧洲人类遗传学（和 EHA 同一周）

---

## 这份速读是怎么挑出来的

速读的选法偏向三类：（1）**能改变实践、或定义一个品类的结果**，（2）**很可能在多个 2026 资料库里反复出现的工具**，（3）**那些跨资料库的故事**（癌症临床的脉、生信工具的演进、生物里 AI/ML 的拐点）。每一节的篇幅都掐在一个自然的停车点上，所以你可以提前收手而不丢主线。这次改写成「正文内联 TL;DR」的形式（2026 年 5 月），就是想让它成为一页你真会读完的东西，而不是一份你扫一眼就弹开的目录。

铺得全的内容，在各场会议的资料库本身里——这一页是给 90 分钟读者的那条优化路线。
