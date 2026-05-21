---
title: "生物学中的基础模型——2026 年全景现状"
summary: "对语料中每一个生物学 FM 的跨库综述——15 个全新档案 + 12 个被深化的档案，涵盖单细胞、病理、基因组、蛋白质、多模态。"
---

对本语料中每一份基础模型（FM）档案的跨库综述。链接会解析到 AACR / ICLR / ISBI / Single-Cell-Genomics 各库中的逐工具深挖。

本语料把为这次综述而写的 **15 个全新档案**（单细胞、病理、基因组、蛋白质、多模态）与在 2026 年 5 月接受了一轮 FM 对比深化的 **12 个已有档案** 区分开来。这 27 个条目涵盖了 AACR 2026 各场次以及 ICLR/ISBI 2026 论文所建立其上或直接评估的那些 FM。

---

## 一览

| 家族 | 代表模型 | 2026 年 SOTA | 承重基准 | 待解问题 |
|---|---|---|---|---|
| **单细胞** | scGPT, Geneformer | scGPT-spatial（2025 年 2 月）；Geneformer-V2-104M_CLcancer | SC-Arena, PerturBench, scPerturBench, Open Problems v2 | 在扰动预测上，有哪个 sc-FM 能击败 `mean-of-training-perturbations` 吗？ |
| **病理** | UNI, Prov-GigaPath, CHIEF | Virchow2 / UNI2-h（2025 年 1 月） | Campanella et al. 2025 临床基准；HEST-1k；BACH；CRC polyp | 规模曲线在哪里趋于平台？（1.85B 的 Virchow2G 是当前的天花板） |
| **基因组 / DNA** | Evo2, Enformer | AlphaGenome（Nature 2026）——26 项变异效应中 25 项取胜 | gnomAD-pathogenic, ENCODE/GTEx 轨迹, GUE/GUE+, NT 18 任务 | 在 AlphaGenome 的轨迹预测取胜之后，ICL 还是一项可行的基因组能力吗？ |
| **蛋白质** | ESM-2 / ESM-3, AlphaFold3 | ESM-3（Science 2025；98B 参数） | 长上下文折叠；新型结合剂设计的命中率 | 生成式蛋白设计 vs 结构预测——哪个更快产出湿实验命中？ |
| **多模态** | BioMedCLIP, PathChat, LLaVA-Med | PathChat-2（Nature 2024 扩展；>1M 条指令） | PMC-VQA, SLAKE, VQA-RAD, PathQABench | 获 FDA 许可的生成式病理副驾（PathChat DX 于 2025 年 1 月获突破性认定）会在 2026 年落地吗？ |

---

## 2025-2026 最大的两个故事

### 1. 单细胞 FM 的线性基线清算

三篇独立的 2025 年论文——[Ahlmann-Eltze & Huber, *Nature Methods*](https://www.nature.com/articles/s41592-025-02772-6)、Kedzierska et al. *Genome Biology*、Wenkel et al. *Nature Methods*——表明在那些原论文报告为取胜的扰动预测任务上，scGPT、Geneformer、scFoundation 和 UCE **无法击败平凡的线性基线**（`mean-of-training-perturbations` 或 `latent-additive`）。PerturBench 的 `latent-additive + scGPT-embeddings` 基线如今成了每一个新主张都必须越过的下限。

后果：

- **AACR 2026 没有任何一张标题里带 scGPT/Geneformer/UCE 的海报**（相比之下，[病理 FM 栈](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/synthesis-fm-pathology-traction/) 出现在 18 张海报里）。
- [SC-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) 的 ICLR 2026 论文如今是一份 *记分卡*，而非参赛者。
- [Geneformer V2](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/geneformer/) 反转了"规模取胜"的叙事：癌症领域的 `V2-104M_CLcancer` 检查点（14M 癌症细胞，104M 参数）匹敌或击败 316M 的深度模型。领域特异的预训练击败了原始的规模。

这是自 2023 年以来单细胞 ML 里 *最清晰的纪律纠偏*。往后的框架是：任何想为 AACR 式下游任务宣称效用的 sc-FM，都必须发布 (a) 细胞类型分类、(b) 药物-扰动预测、(c) 跨组织迁移的数字，*全部对照* LA-on-scGPT 基线。

### 2. 病理 FM 的 Virchow 再平衡

Nature 2024 的排序（Prov-GigaPath → UNI → CHIEF）在 2025 年翻转了：

- **[Virchow2](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/virchow/)**（Paige+MSK，632M ViT-H，3.1M WSI）在 Campanella et al. 2025 *Nature Communications* 临床基准上拿下第一。
- **[UNI2-h](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/uni/)** 于 2025 年 1 月 14 日发布——681M ViT-H/14，2 亿+ 瓦片，加入了 IHC——如今在 BACH（1.0 BAcc）和若干 Mahmood 栈下游任务上领先。
- **[CHIEF](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/chief/)** 在 2025 年没有发布任何 v2。相对 Apache-2.0 的替代品，AGPL-3.0 + 门控权重如今是一笔真实的采纳税，这解释了它在 AACR 2026 上近乎为零的牵引力。
- **[PathChat / PathChat DX](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/pathchat/)** 于 **2025 年 1 月获得 FDA 突破性设备认定**——首个获此认定的生成式 AI 病理工具。
- **[Hibou](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/hibou/)**（HistAI——*不是 Owkin*）是唯一一个 Apache-2.0 的顶级病理 FM。Owkin 的对应物是 Phikon / Phikon-v2。

由此推论：病理 FM 是本语料中 *唯一* 在 2025-2026 年有 FDA 通道监管活动的家族。单细胞、基因组和蛋白质 FM 仍停留在临床前工具阶段。

---

## 家族深挖

### 单细胞 FM

五个主要模型。两个在 2025 年前就已存在；三个在 2024-2025 年随线性基线批评一同登场。

| 模型 | 架构 | 参数 | 预训练语料 | 公开权重 | 页面 |
|---|---|---|---|---|---|
| **scGPT** | 编码器-解码器 transformer | 51M | 33M 细胞 | ✅ MIT | [scgpt.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/scgpt/) |
| **Geneformer** | 仅编码器 BERT | 10M / 104M / 316M | 30M / 95M 细胞（V2） | ✅ Apache-2.0 | [geneformer.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/geneformer/) |
| **UCE** | 仅编码器 ViT 风格 | 650M | ~36M 细胞 / 8 物种 | ✅ MIT | [uce.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/uce/) |
| **scFoundation** | xTrimoGene 编码器 | 100M | 50M+ 人类细胞 | ✅ Apache-2.0 | [scfoundation.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/scfoundation/) |
| **GET** | 多模态 transformer | ~50M | scATAC + scRNA，~1.3M 细胞 | ✅ MIT | [get.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/get/) |
| **CellPLM** | 细胞即 token 的 transformer | ~80M | scRNA，配对空间 | ✅ MIT | [cellplm.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/cellplm/) |

非 FM 但相邻：**[Cell2Location](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/cell2location/)**——空间反卷积的贝叶斯在位者，如今受到 scGPT-spatial + CellPLM 这些预训练替代品的威胁。

生成式虚拟细胞模型（一个独立的子类）：
- **[Generative Virtual Cells](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/generative-virtual-cells/)**（Lewis & Zueco, ICLR 2026）——联合更新的规划器 + 世界模型
- **STATE**（Arc Institute, 2025）——冻结的 Tahoe-100M 快照

### 病理 FM

| 模型 | 架构 | 预训练语料 | 公开权重 | 许可 | 页面 |
|---|---|---|---|---|---|
| **UNI / UNI2-h** | ViT-L/16 → ViT-H/14 | 100M 瓦片 → 200M+ 瓦片 | ✅（2025 年门控） | CC-BY-NC | [uni.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/uni/) |
| **Prov-GigaPath** | DINOv2 ViT-G/14 | 来自 171K WSI 的 1.4B 瓦片 | ✅ | CC-BY-NC | [prov-gigapath.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/prov-gigapath/) |
| **CHIEF** | ViT-L + CTransPath | 60K WSI | ✅（门控） | AGPL-3.0 | [chief.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/chief/) |
| **Virchow / Virchow2** | DINOv2 ViT-H | 1.5M / 3.1M WSI | ✅ 仅 Virchow | CC-BY-NC | [virchow.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/virchow/) |
| **Hibou-B / Hibou-L** | DINOv2 ViT | 1.14M 切片 | ✅ | Apache-2.0 | [hibou.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/hibou/) |
| **PathChat / PathChat-2** | 视觉-语言（LLaVA 风格） | 457K 条指令（PathChat-2：>1M） | ❌（FDA 突破性认定） | 专有 | [pathchat.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/pathchat/) |

综述语境：[Mahmood 病理 FM 主旨演讲](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/mahmood-pathology-fm-keynote/)（ISBI 2026）与 [FM-病理-牵引力全景](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/synthesis-fm-pathology-traction/)。

### 基因组 / DNA FM

| 模型 | 架构 | 上下文 | 参数 | token 化 | 页面 |
|---|---|---|---|---|---|
| **Nucleotide Transformer** | 仅编码器 | 6 kb | 50M–2.5B | 6-mer（词表 4,104） | [nucleotide-transformer.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/nucleotide-transformer/) |
| **DNABERT-2** | 编码器 + ALiBi + FlashAttn | 128 bp（预训练） | 117M | BPE（词表 4,096） | [dnabert-2.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/dnabert-2/) |
| **HyenaDNA** | Hyena 隐式卷积（无注意力） | 最高 1M | 6.6M–1.6B | 单核苷酸（词表 12） | [hyenadna.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/hyenadna/) |
| **Evo2** | StripedHyena SSM | 最高 1M | 7B / 40B | 字节级 | [genomic-icl-evo2.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/genomic-icl-evo2/) |
| **AlphaGenome** | U-Net + transformer 瓶颈 | 1 Mb | ~450M（厂商） | 单核苷酸 | [alphagenome.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/alphagenome/) |

划分这个家族的那条线：**轨迹预测 transformer**（Enformer, AlphaGenome）vs **生成式 DNA LM**（Evo2, HyenaDNA）。AlphaGenome 在调控变异效应评估上以 25/26 取胜，但 Evo2 守住独特的 ICL 阵地，因为你无法对一个轨迹预测模型做提示。

### 蛋白质 + 多模态 FM

| 模型 | 模态 | 备注 | 页面 |
|---|---|---|---|
| **ESM-3** | 蛋白质（3 轨道：序列 + 结构 + 功能） | 98B 参数；de novo 生成了 esmGFP（与 avGFP 序列一致性 36%） | [esm-3.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/esm-3/) |
| **Proteina Complexa** | 原子级蛋白结合剂设计 | PDGFR 命中率 63.5%；首批 de novo 碳水化合物结合剂 | [proteina-complexa.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/proteina-complexa/) |
| **TEA** | 带表位条件的 de novo 蛋白 | ICLR 2026 | [tea-de-novo-protein.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/tea-de-novo-protein/) |
| **BioMedCLIP** | 视觉-语言（生物医学） | PMC-15M（1530 万图文对）；MIT 许可 | [biomedclip.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/biomedclip/) |

---

## 虚拟细胞——为什么这个问题难

"虚拟细胞"是 *一个能预测任意细胞在任意扰动下基因表达的习得模型* 的简称。三个正交的问题挡着它：

1. **评估**——大多数"虚拟细胞"论文在某些任务上报告 SOTA，可一旦你跑对了对照，这些任务就被发现由线性基线主导。[SC-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) 是 2025 年后做诚实记分的尝试。
2. **训练数据**——Tahoe-100M（Vevo / Arc Institute, 2025）是最大的扰动图谱，但覆盖仍偏向药物、供体浅。
3. **生成 vs 预测**——你是 (a) 以一个扰动 token 为条件对一个生成模型采样，还是 (b) 训练一个确定性头部来预测扰动后的表达？Lewis & Zueco 的 [Generative Virtual Cells](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/generative-virtual-cells/) 押注 (a)；Arc 的 STATE 押注 (b)。

2026 年的成功长什么样：一个 FM 在 *按扰动、按供体、按细胞类型留出的扰动预测* 上击败 `latent-additive + scGPT-embeddings`。截至 2026 年 5 月，没有公开模型越过全部三种切分。

---

## 2026 年的待解问题

1. **单细胞：** 在 2025 年后的切分上，会有哪个 FM 击败 LA-on-scGPT 基线吗？（如果没有，这个领域需要的是新的预训练目标，而不是更多细胞。）
2. **病理：** Virchow2G（1.85B）是否标志着病理 FM 的规模仍有回报，还是 UNI2-h 的 `H/14 + 200M tiles` 已经撞上曲线平台？
3. **基因组：** 既然 AlphaGenome 不用提示就在变异效应上以 25/26 取胜，ICL 对基因组学还有用吗？还是 Evo2 的 ICL 阵地只是个利基？
4. **蛋白质：** ESM-3 的 de novo 设计命中率在湿实验规模上能撑住吗，还是 esmGFP 只是一个孤例？
5. **临床：** 在 PathChat DX 之后，会有第二个生成式病理副驾在 2026 年获得 FDA 突破性认定吗？

---

## 更深的全景博客

本页是跨家族地图；每个家族还各有自己的专属全景博客：

- [病理 FM](pathology-fm-landscape.md)——UNI/UNI2-h、Virchow2、CHIEF、Hibou、PathChat-2、Owkin → Claude for Healthcare 部署、许可政治。
- [基因组 + 蛋白质 FM](genomic-and-protein-fm-landscape.md)——Enformer → AlphaGenome 25/26 横扫、ESM-2/3、AlphaFold 1/2/3、RFdiffusion、Evo 2。
- [临床 AI + 智能体临床](clinical-and-agentic-clinical.md)——部署面（Claude for Healthcare、Dragon Copilot、获 FDA 许可的模块）外加 DeepRare、多模态衰老时钟。
- [空间组学 + 多模态生物学](spatial-omics-and-multimodal.md)——SpatialData 底料、HEX、BioMedCLIP / PathChat-2 / LLaVA-Med、模态桥。
- [可解释性、机制建模、因果](interpretability-mech-causal.md)——科学方法这条尾巴：SAE、探针、机制先验、相关性/因果性的错配。

另见：[一个生物学 FM 是如何造出来的](how-to-build-a-biological-fm.md)（六阶段走读）与 [小实验室造什么](small-labs-what-to-build.md)（小团队的切入点）。

## 如何使用本页

- **从各会议库链入**：上面每份档案都坐落在它的宿主库里（AACR / ICLR / ISBI）。本页是跨库地图。
- **从 [Speed Read](speed-read.md) 链入**：90 分钟路径中的 0:35–1:15 段覆盖价值最高的 FM 档案。
- **由一手来源支撑**：档案里的每一个数值主张都以一个引用收尾（Nature / *Nature Methods* / Science / ICLR / NeurIPS / arXiv / bioRxiv / HuggingFace 模型卡）。

如果你在追踪某个特定的 FM 家族，从上面的家族深挖表开始，顺着工具链接走。如果你在追踪学科级的争论，**线性基线清算** 和 **Virchow 再平衡** 两节概括了 2025-2026 年最大的两次路线纠偏。
