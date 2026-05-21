---
title: "生物学基础模型：2026 年的行情全景"
summary: "把整个语料里的生物学 FM 横向打通做一次综述——15 篇全新撰写的档案，外加 12 篇经过加深，覆盖单细胞、病理、基因组、蛋白质、多模态五大家族。"
---

这是把本语料里每一份基础模型（FM）档案横向打通的一次综述。文中的链接会跳到 AACR / ICLR / ISBI / Single-Cell-Genomics 各个 vault 里对应工具的深度解读。

语料把两类档案分开：为这次综述**全新撰写的 15 篇**（单细胞、病理、基因组、蛋白质、多模态），和**原有的 12 篇**——后者在 2026 年 5 月走了一遍「FM 横向对比」的加深。这 27 篇覆盖的，是 AACR 2026 各场次与 ICLR/ISBI 2026 论文要么在其上搭建、要么直接拿来评测的那些 FM。

---

## 一眼看全景

| 家族 | 锚点模型 | 2026 SOTA | 扛重量的基准 | 悬而未决的问题 |
|---|---|---|---|---|
| **单细胞** | scGPT、Geneformer | scGPT-spatial（2025 年 2 月）；Geneformer-V2-104M_CLcancer | SC-Arena、PerturBench、scPerturBench、Open Problems v2 | 在扰动预测上，有没有哪个 sc-FM 能赢过 `mean-of-training-perturbations`？ |
| **病理** | UNI、Prov-GigaPath、CHIEF | Virchow2 / UNI2-h（2025 年 1 月） | Campanella et al. 2025 临床基准；HEST-1k；BACH；CRC polyp | 规模曲线在哪里见顶？（1.85B 的 Virchow2G 是目前的天花板） |
| **基因组 / DNA** | Evo2、Enformer | AlphaGenome（Nature 2026）——变异效应 25/26 胜 | gnomAD-pathogenic、ENCODE/GTEx 轨迹、GUE/GUE+、NT 18 任务 | AlphaGenome 在轨迹预测上赢了之后，ICL 还算不算一种站得住的基因组能力？ |
| **蛋白质** | ESM-2 / ESM-3、AlphaFold3 | ESM-3（Science 2025；98B 参数） | 长上下文折叠；新型结合子设计命中率 | 生成式蛋白设计 vs 结构预测——哪条更快拿到湿实验命中？ |
| **多模态** | BioMedCLIP、PathChat、LLaVA-Med | PathChat-2（Nature 2024 的延伸；>100 万条指令） | PMC-VQA、SLAKE、VQA-RAD、PathQABench | FDA 放行的生成式病理副驾（PathChat DX 已于 2025 年 1 月拿下突破性认定）会在 2026 年落地吗？ |

---

## 2025-2026 年最大的两条线

### 1. 单细胞 FM 的线性基线清算

2025 年三篇彼此独立的论文——[Ahlmann-Eltze & Huber, *Nature Methods*](https://www.nature.com/articles/s41592-025-02772-6)、Kedzierska et al. *Genome Biology*、Wenkel et al. *Nature Methods*——证明了 scGPT、Geneformer、scFoundation、UCE 在扰动预测任务上**赢不过区区一个线性基线**（`mean-of-training-perturbations` 或 `latent-additive`），而这些任务，原论文当年都是当成胜绩报出来的。如今 PerturBench 那个 `latent-additive + scGPT-embeddings` 基线，成了每一项新主张都必须先过的地板线。

后果：

- **AACR 2026 上没有一张海报的标题里带 scGPT/Geneformer/UCE**（相比之下，[病理 FM 那一摞](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/synthesis-fm-pathology-traction/)出现在 18 张海报里）。
- ICLR 2026 那篇 [SC-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) 如今是一张*记分卡*，而不再是一名参赛者。
- [Geneformer V2](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/geneformer/) 把「规模即胜利」的叙事整个倒了过来：癌症领域的 `V2-104M_CLcancer` checkpoint（1400 万癌症细胞、104M 参数）追平甚至超过了 316M 的深模型。是领域专属预训练赢过了纯粹的规模。

这是单细胞 ML 自 2023 年以来*最清晰的一次纪律纠偏*。往后的框架是：任何想为 AACR 那类下游任务声称有用的 sc-FM，都得把 (a) 细胞类型分类、(b) 药物扰动预测、(c) 跨组织迁移这三组数字，*全部*拿去跟「scGPT 上的 LA」基线比一遍才行。

### 2. 病理 FM 里的 Virchow 重新洗牌

Nature 2024 那套排序（Prov-GigaPath → UNI → CHIEF）在 2025 年翻盘了：

- **[Virchow2](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/virchow/)**（Paige+MSK，632M ViT-H，3.1M 张 WSI）在 Campanella et al. 2025 *Nature Communications* 临床基准上拿下第一。
- **[UNI2-h](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/uni/)** 于 2025 年 1 月 14 日发布——681M ViT-H/14、2 亿多 tile、加入了 IHC——如今在 BACH（1.0 BAcc）和 Mahmood 那一摞的若干下游任务上领跑。
- **[CHIEF](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/chief/)** 在 2025 年没出 v2。比起 Apache-2.0 的替代品，AGPL-3.0 + 权重门禁如今实打实是一道采用税，这也解释了它在 AACR 2026 上近乎为零的存在感。
- **[PathChat / PathChat DX](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/pathchat/)** 于 **2025 年 1 月拿下 FDA 突破性器械认定**——头一个拿到这个认定的生成式 AI 病理工具。
- **[Hibou](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/hibou/)**（出自 HistAI——*不是 Owkin*）是唯一一个 Apache-2.0 的顶级病理 FM。Owkin 那边对应的是 Phikon / Phikon-v2。

由此可得一条推论：在本语料里，病理 FM 是*唯一*在 2025-2026 年有 FDA 监管动作的家族。单细胞、基因组、蛋白质 FM 仍停在临床前工具阶段。

---

## 各家族深潜

### 单细胞 FM

五个主力模型。两个出在 2025 年之前；三个在 2024-2025 年伴着线性基线那场批判一起落地。

| 模型 | 架构 | 参数 | 预训练语料 | 公开权重 | 页面 |
|---|---|---|---|---|---|
| **scGPT** | 编码器-解码器 transformer | 51M | 33M 细胞 | ✅ MIT | [scgpt.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/scgpt/) |
| **Geneformer** | 仅编码器 BERT | 10M / 104M / 316M | 30M / 95M 细胞（V2） | ✅ Apache-2.0 | [geneformer.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/geneformer/) |
| **UCE** | 仅编码器 ViT 风格 | 650M | ~36M 细胞 / 8 物种 | ✅ MIT | [uce.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/uce/) |
| **scFoundation** | xTrimoGene 编码器 | 100M | 50M+ 人类细胞 | ✅ Apache-2.0 | [scfoundation.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/scfoundation/) |
| **GET** | 多模态 transformer | ~50M | scATAC + scRNA，~1.3M 细胞 | ✅ MIT | [get.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/get/) |
| **CellPLM** | 细胞即 token 的 transformer | ~80M | scRNA，配对空间 | ✅ MIT | [cellplm.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/cellplm/) |

非 FM 但相邻的：**[Cell2Location](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/cell2location/)**——空间反卷积里的贝叶斯老牌选手，如今正被 scGPT-spatial + CellPLM 这些预训练替代品威胁。

生成式虚拟细胞模型（自成一个子类）：
- **[Generative Virtual Cells](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/generative-virtual-cells/)**（Lewis & Zueco, ICLR 2026）——联合更新的规划器 + 世界模型
- **STATE**（Arc Institute, 2025）——Tahoe-100M 的冻结快照

### 病理 FM

| 模型 | 架构 | 预训练语料 | 公开权重 | 许可 | 页面 |
|---|---|---|---|---|---|
| **UNI / UNI2-h** | ViT-L/16 → ViT-H/14 | 1 亿 tile → 2 亿+ tile | ✅（2025 年加门禁） | CC-BY-NC | [uni.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/uni/) |
| **Prov-GigaPath** | DINOv2 ViT-G/14 | 来自 171K 张 WSI 的 14 亿 tile | ✅ | CC-BY-NC | [prov-gigapath.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/prov-gigapath/) |
| **CHIEF** | ViT-L + CTransPath | 60K 张 WSI | ✅（加门禁） | AGPL-3.0 | [chief.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/chief/) |
| **Virchow / Virchow2** | DINOv2 ViT-H | 1.5M / 3.1M 张 WSI | ✅ 仅 Virchow | CC-BY-NC | [virchow.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/virchow/) |
| **Hibou-B / Hibou-L** | DINOv2 ViT | 1.14M 张切片 | ✅ | Apache-2.0 | [hibou.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/hibou/) |
| **PathChat / PathChat-2** | 视觉-语言（LLaVA 风格） | 457K 条指令（PathChat-2：>100 万） | ❌（FDA 突破性认定） | 专有 | [pathchat.md](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/tools/pathchat/) |

综述脉络见：[Mahmood 病理 FM 主旨报告](https://liudengzhang.github.io/conference-vaults/conferences/isbi-2026/tools/mahmood-pathology-fm-keynote/)（ISBI 2026）与 [FM-病理-势头全景](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/topics/bioinfo-tools/synthesis-fm-pathology-traction/)。

### 基因组 / DNA FM

| 模型 | 架构 | 上下文 | 参数 | 分词 | 页面 |
|---|---|---|---|---|---|
| **Nucleotide Transformer** | 仅编码器 | 6 kb | 50M–2.5B | 6-mer（词表 4,104） | [nucleotide-transformer.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/nucleotide-transformer/) |
| **DNABERT-2** | 编码器 + ALiBi + FlashAttn | 128 bp（预训练） | 117M | BPE（词表 4,096） | [dnabert-2.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/dnabert-2/) |
| **HyenaDNA** | Hyena 隐式卷积（无注意力） | 最高 1M | 6.6M–1.6B | 单核苷酸（词表 12） | [hyenadna.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/hyenadna/) |
| **Evo2** | StripedHyena SSM | 最高 1M | 7B / 40B | 字节级 | [genomic-icl-evo2.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/genomic-icl-evo2/) |
| **AlphaGenome** | U-Net + transformer 瓶颈 | 1 Mb | ~450M（厂商） | 单核苷酸 | [alphagenome.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/alphagenome/) |

划开这个家族的那条线：一边是**轨迹预测 transformer**（Enformer、AlphaGenome），一边是**生成式 DNA LM**（Evo2、HyenaDNA）。AlphaGenome 在调控变异效应评测上 25/26 胜出，但 Evo2 守着一块独有的 ICL 阵地——因为轨迹预测模型你根本没法去 prompt。

### 蛋白质 + 多模态 FM

| 模型 | 模态 | 备注 | 页面 |
|---|---|---|---|
| **ESM-3** | 蛋白质（三轨：序列 + 结构 + 功能） | 98B 参数；从头生成了 esmGFP（与 avGFP 36% 同一性） | [esm-3.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/esm-3/) |
| **Proteina Complexa** | 原子级蛋白结合子设计 | PDGFR 命中率 63.5%；首批从头设计的碳水结合子 | [proteina-complexa.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/proteina-complexa/) |
| **TEA** | 带表位条件的从头蛋白设计 | ICLR 2026 | [tea-de-novo-protein.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/tea-de-novo-protein/) |
| **BioMedCLIP** | 视觉-语言（生物医学） | PMC-15M（1530 万图文对）；MIT 许可 | [biomedclip.md](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/biomedclip/) |

---

## 虚拟细胞——为什么这问题难

「虚拟细胞」是个简称，指*一个学出来的模型，能预测任意细胞在任意扰动下的基因表达*。三个互不相干的问题把它挡在门外：

1. **评测**——大多数「虚拟细胞」论文报的 SOTA，一旦你跑对了那个对照，就会发现任务本身是被线性基线主宰的。[SC-Arena](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-arena/) 是 2025 年之后想老老实实记分的一次尝试。
2. **训练数据**——Tahoe-100M（Vevo / Arc Institute, 2025）是最大的扰动图谱，但覆盖仍偏药物、供体太浅。
3. **生成 vs 预测**——你是 (a) 拿一个扰动 token 去给生成模型加条件、然后采样，还是 (b) 训一个确定性的头去预测扰动后的表达？Lewis & Zueco 的 [Generative Virtual Cells](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/generative-virtual-cells/) 押的是 (a)；Arc 的 STATE 押的是 (b)。

2026 年的成功长什么样：一个 FM 在*按扰动、按供体、按细胞类型留出*的扰动预测上，赢过 `latent-additive + scGPT-embeddings`。截至 2026 年 5 月，还没有任何公开模型把这三种划分全部过掉。

---

## 2026 年的悬念

1. **单细胞：**在 2025 年之后那套划分上，会不会有哪个 FM 赢过「scGPT 上的 LA」基线？（要是不会，那这领域需要的是一个新的预训练目标，而不是更多细胞。）
2. **病理：**Virchow2G（1.85B）是不是在说病理 FM 堆规模仍然划算，还是 UNI2-h 的 `H/14 + 200M tile` 早就摸到曲线平台了？
3. **基因组：**AlphaGenome 不用 prompt 就在变异效应上 25/26 胜出之后，ICL 对基因组还有用吗？还是说 Evo2 的 ICL 地盘只是个小生境？
4. **蛋白质：**ESM-3 的从头设计命中率，到了湿实验规模上还撑得住吗，还是 esmGFP 只是个孤例？
5. **临床：**继 PathChat DX 之后，2026 年会不会有第二个生成式病理副驾拿到 FDA 突破性认定？

---

## 更深的全景博客

这一页是跨家族的总图；每个家族另有自己专属的全景博客：

- [病理 FM](pathology-fm-landscape.md)——UNI/UNI2-h、Virchow2、CHIEF、Hibou、PathChat-2，Owkin → Claude for Healthcare 的落地，以及许可上的政治。
- [基因组 + 蛋白质 FM](genomic-and-protein-fm-landscape.md)——Enformer → AlphaGenome 的 25/26 横扫、ESM-2/3、AlphaFold 1/2/3、RFdiffusion、Evo 2。
- [临床 AI + 智能体临床](clinical-and-agentic-clinical.md)——落地这一面（Claude for Healthcare、Dragon Copilot、FDA 放行的模块），外加 DeepRare、多模态衰老时钟。
- [空间组学 + 多模态生物学](spatial-omics-and-multimodal.md)——SpatialData 底料、HEX、BioMedCLIP / PathChat-2 / LLaVA-Med，以及那些模态之间的桥。
- [可解释性、机理建模、因果](interpretability-mech-causal.md)——科学方法的那条长尾：SAE、探针、机理先验，以及相关性 / 因果的错配。

另见：[一个生物 FM 是怎么造出来的](how-to-build-a-biological-fm.md)（六阶段走查）与[小实验室造什么](small-labs-what-to-build.md)（小团队的几条切入点）。

## 怎么用这一页

- **从各个会议 vault 链接进来：**上面每一份档案都待在它的宿主 vault 里（AACR / ICLR / ISBI）。这一页是跨 vault 的总图。
- **从 [Speed Read](speed-read.md) 链接进来：**90 分钟路线里的 0:35–1:15 这一段，覆盖的是价值最高的那批 FM 档案。
- **背后有原始文献撑着：**档案里每一个数字主张，结尾都附着一条引用（Nature / *Nature Methods* / Science / ICLR / NeurIPS / arXiv / bioRxiv / HuggingFace 模型卡）。

如果你在追某个特定的 FM 家族，从上面那张家族深潜表入手，顺着工具链接走。如果你在追领域层面的争论，那**线性基线清算**和**Virchow 重新洗牌**这两节，把 2025-2026 年最大的两次方向纠偏都总结好了。
