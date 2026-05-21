---
title: "Hi-C 与三维基因组进虚拟细胞——谁试过，又缺了什么"
summary: "一张 2020-2026 年 Hi-C 的先验工作地图。序列→Hi-C 这条线已经成熟（Akita、Orca、C.Origami、AlphaGenome）。scHi-C 图谱和 Hi-C 原生 FM 也都有了（Higashi、HiCFoundation、Hi-Cformer）。三模态单细胞——2026 年 2 月的 scHiCAR——能给出每个细胞的 RNA + ATAC + 三维接触。可那个真正联合起来的细胞还是空着的：还没有哪个转录组预训练的 VC FM（scGPT、Geneformer、UCE、scFoundation、CellPLM、TranscriptFormer、rBio）把 Hi-C 当成一条旁路通道吃进去。可以把它读成「细胞器感知」那篇姊妹文里的第五块没填的切入点。"
---

> *这篇是 [细胞器感知细胞 FM](organelle-aware-cell-fms.md) 的姊妹篇——那篇给「以空间 / 区室信息为条件的细胞 FM」标出了五块没填的切入点；这篇把第六块补上：把三维基因组的接触图当成一条条件通道。配套阅读：[闭环虚拟细胞 101](closed-loop-virtual-cells-101.md) 看领域脉络，[小实验室 v3](small-labs-what-to-build-v3.md) 看「底料即护城河」，[双隐空间可迁移性那篇](translatability-dual-latent-vc-fm.md) 看怎么在「细胞系 → 病人」迁移上评估一个 Hi-C 感知的 VC FM。*

## 问题

今天的虚拟细胞 FM，把每个细胞都当成一袋基因 token。可三维基因组——TAD、环、A/B 区室、CTCF/黏连蛋白搭起来的支架——才是这些 token 从中冒出来的那块调控底料。两个基因在两个细胞里可以处在同一个表达水平，染色质情境却天差地别：一个是从活跃的超级增强子枢纽里迸发出来的，另一个则窝在一个 Polycomb 抑制区室里，过一小时就要被沉默掉。只有转录组的 FM，分不清这两者。那么，有没有哪个虚拟细胞，把三维基因组吃进去了？

把 2020–2026 年的文献勘察一遍之后：细胞器感知的*图像*那一侧，已经出货了（SubCell）。*序列-到-三维*那一侧，已经出货了（Akita、Orca、AlphaGenome）。*单细胞-Hi-C*嵌入那一侧，也出货了（Higashi、HiCFoundation）。唯独那个联合起来的细胞——一个以接触图为条件、又是转录组预训练的 VC FM——在公开文献里是空的。

## 序列 → Hi-C：成熟的那条线

从 DNA 序列（± 细胞类型轨迹）去预测批量接触图。撑起这块领域的，是五个有名有姓的系统。

- **Akita**（[Fudenberg, Kelley, Pollard, *Nat Methods* 2020](https://www.nature.com/articles/s41592-020-0958-x)）——CNN，约 1 Mb 窗口，目标是 Hi-C/Micro-C。鼻祖；后头的全都引它。
- **Orca**（[Zhou, *Nat Genet* 2022](https://www.nature.com/articles/s41588-022-01065-4)）——层次化的编码器/解码器，从 kb 一路到染色体尺度，区室 + TAD + 环装在一个栈里。
- **C.Origami**（[Tan, Xu, Yue, *Nat Biotechnol* 2023](https://www.nature.com/articles/s41587-022-01612-8)）——DNA + CTCF ChIP-seq + ATAC → 2 Mb Hi-C，8,192 bp 分箱。第一个把「在染色质折叠上做计算机内遗传筛选」这个说法立得让人信服的。
- **Epiphany**（[Yang et al., *Genome Biol* 2023](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-023-02934-9)）——一维表观基因组 → Hi-C，GAN。
- **HiCGen**（Wei et al., *Adv Sci* 2025）——层次化多尺度；CTCF + ATAC 输入；环还带 Polycomb 感知。

2025 年最强的入局者是 **AlphaGenome**（[Avsec et al., DeepMind bioRxiv 2025.06.25.661532](https://www.biorxiv.org/content/10.1101/2025.06.25.661532v1)）。统一 transformer；它把 Hi-C 接触轨迹跟 RNA-seq、ATAC、组蛋白标记一起，当成一等的输出头给吐出来；报的在 1 Mb 区间上的 Pearson R 比 Orca 高。这是头一回，有一个通才 DNA FM 把 Hi-C 当成一个平起平坐的模态，而不是一个够一够才能碰到的目标。

五者共有的那个缺口：它们都是从 DNA 去预测**批量**接触图。没有一个会把单细胞的 RNA 或 ATAC 状态吃进去，再吐出一张单细胞的接触图。

## scHi-C 图谱 + 原生 FM

单细胞这一侧，自己也有一条长达十年的脉络。

- **Nagano et al.**（[*Nature* 2013](https://www.nature.com/articles/nature12593)）——头一个 scHi-C。
- **Stevens et al.**（[*Nature* 2017](https://www.nature.com/articles/nature21429)）——单倍体 mESC，G1 期分选，把完整的三维结构恢复出来了。
- **Higashi**（[Zhang, Zhou, Ma, *Nat Biotechnol* 2022](https://www.nature.com/articles/s41587-021-01034-y)）——超图自编码器，对 scHi-C 又填补又嵌入。scHi-C 嵌入模型里的那个参照。
- **Fast-Higashi**（[Zhang & Ma, *Cell Syst* 2023](https://www.cell.com/cell-systems/fulltext/S2405-4712(23)00006-7)）——张量分解，快 50–100×，拿来给 Higashi 做初始化。
- **sn-m3C-seq**（[Lee et al., *Nat Methods* 2019](https://www.nature.com/articles/s41592-019-0547-z)）——每个细胞核的甲基化 + 三维接触联合测。
- **小鼠脑 m3C 图谱**（[Liu et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06805-y)）——301K 甲基化组 + 176K 联合 m3C 谱，4,673 个细胞群，330 亿次接触。
- **人脑 m3C 图谱**（[Tian et al., *Science* 2023](https://www.science.org/doi/10.1126/science.adf5357)）——横跨 17 个脑区的 145K 个 m3C 细胞核。
- **4DN Phase 2**（[Dekker et al.](https://www.4dnucleome.org/)）——联盟门户，>1,800 个实验集，每种细胞类型 140K+ 个环；这个阶段跑了 2020–2025。

现在有两个 Hi-C 原生 FM 公开了。

- **HiCFoundation**（[Wang & Noble, bioRxiv 2024.12.16.628821](https://www.biorxiv.org/content/10.1101/2024.12.16.628821v1)）——1.18 亿个接触子矩阵，81 个人类细胞系/组织，编码器-解码器 + 分块对比损失。头一个 Hi-C 原生的基础模型。
- **Hi-Cformer**（[bioRxiv 2025.08.04.668453](https://www.biorxiv.org/content/10.1101/2025.08.04.668453v2)）——一个面向*单细胞* Hi-C 的 transformer；染色体感知的层次化注意力；把自己定位成 scHi-C 专用。

这俩都是只管 Hi-C。没有一个搭桥到转录组 FM 那边。

## 单细胞分辨率下的联合三模态

最有意思的前沿——而且是被底料卡住，不是被方法卡住。

- **sci-Hi-C**（[Ramani et al., *Nat Methods* 2017](https://www.nature.com/articles/nmeth.4155)）——组合索引的 scHi-C，没有转录组。
- **HiRES**（[Liu et al., *Science* 2023](https://www.science.org/doi/10.1126/science.adg3797)）——一个细胞里同时拿单细胞 Hi-C **+ RNA-seq**。概念验证。
- **GAGE-seq**（[Zhou et al., *Nat Genet* 2024](https://www.nature.com/articles/s41588-024-01855-y)）——在细胞层面同时测三维基因组 + 转录组，组合索引，每次跑数万个细胞。
- **scHiCAR**（[Yu, Crawford et al., *Nat Biotechnol* Feb 2026](https://www.nature.com/articles/s41587-026-03013-7)）——已经坐实是**三模态**：每个细胞的 RNA + ATAC + 三维接触。162 万个小鼠脑细胞；横跨 22 种细胞类型的 5 kb 增强子–启动子环。当下联合单细胞底料的最高水平。
- 2026 年初 Nature 还出了一篇 **四组学单细胞论文**（s41586-026-10322-z），又加了第四个模态。底料的军备竞赛已经开打了。

那个绕不开的硬事实：**还没有哪个转录组预训练的虚拟细胞 FM 把 Hi-C 当成一条旁路通道吃进去。** 我挨个核了 scGPT、Geneformer、UCE、scFoundation、CellPLM、TranscriptFormer、rBio 和 GREmLN，确认就是这样。最贴近的招法是 ChromFound（[arXiv 2505.12638](https://arxiv.org/abs/2505.12638)），一个 scATAC FM，它*把 Hi-C 导出的增强子-启动子范围当成一个架构先验*——但它并不把接触图当输入吃进去。这块切入点是真实存在的。

## 为什么那个联合的细胞要紧

染色质这条轴不是个奢侈品，有三个理由。

**迸发频率的控制是靠环来介导的。** Mediator 和 BRD4 那块工作（[*Sci Adv* 2024, adl4893](https://www.science.org/doi/10.1126/sciadv.adl4893)）显示，三维接触直接调制转录迸发。一个手里没有接触信息的虚拟细胞，就只能从共表达里隐式地把这件事重学一遍——而那恰恰是数据效率会塌掉的那类高维逆问题。

**扰动追踪已经做出来了。** [Liu et al, *Nature* 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12074983/)——混合 CRISPR + 多尺度染色质成像，137 个基因 / 420 个 sgRNA，26 个新型三维调控因子。这是规模上最接近「Perturb-seq + Hi-C」的东西，也证明了「扰动 × 染色质」的联合数据是采得出来的。

**药物响应在染色质上是有分歧的。** HDAC 和 BRD4 抑制剂筛选（肺癌图景，[bioRxiv 2024.05.23.592075](https://www.biorxiv.org/content/10.1101/2024.05.23.592075v1)）显示，不同细胞系的染色质响应是分歧的，而批量 Hi-C 把这种分歧给糊掉了。TAD、环、A/B 区室，恰恰就是只看 RNA 的 FM 不得不从共表达里*重学一遍*的那些调控原语。直接把接触图给它，就是一份分量不轻的归纳偏置馈赠。

## 那块没填的切入点

三个选项，按可守度排。

**(a) 在冻结的 sc-FM 上、带 Hi-C 旁路输入的适配器**——眼下最省事、最可守。拿 scGPT 或 UCE，骨干冻住，学一个交叉注意力适配器，把来自 Higashi 或 HiCFoundation 的逐细胞接触嵌入吃进去；在留出的 Perturb-seq + 染色质-扰动配对上监督（Engreitz/Hansen 数据集是最顺手的目标）。算力上：小实验室够得着——冻结骨干的适配器范式——跟 scDCA 在药物上用的是同一套配方。风险在于脑组织之外的数据覆盖，因为联合的 scHi-C+RNA 图谱目前还大多是小鼠和脑。

**(b) 在 scHiCAR + GAGE-seq + m3C 语料上做联合预训练。** 真正的多模态底料。如今数百万个联合细胞已经有了，但单细胞接触图的 token 化还没解决——Hi-Cformer 是唯一一次认真的尝试，而它也只在 Hi-C 上工作。卡点*不是*算力、*也不再是*数据量；卡点是那个表征问题：一张接触矩阵怎么变成一串 token，好让它跟基因 token 并肩住进同一个注意力栈里。

**(c) 因果的、三维感知的扰动预测器。** 以一个细胞的接触图为条件，去预测它对一次扰动的 scRNA 响应。还没人端到端试过这个。这是一记干净的检验：染色质这条轴，到底有没有携带那些「只看转录组会漏掉的、关于扰动结果的因果信息」。

卡点，按顺序：(i) **单细胞接触图的 token 化**才是那个真正的架构缺口；(ii) **脑组织之外的联合数据**还是稀薄；(iii) 在适配器尺度上**算力并不是约束**——这就是为什么 (a) 是该下的第一刀。

## 名字 + 判决

三个值得追的人。**Jian Ma**（CMU），冲他那条 Higashi → Fast-Higashi → GAGE-seq → scHi-C-FM 的轨迹；最有可能迈出下一步的实验室。**Geoffrey Fudenberg + Katie Pollard**（Gladstone，UCSF），冲序列→三维那条理论脉络；Akita 的血脉是他们的。**Jesse Engreitz**（Stanford）和 **Anders Sejr Hansen**（MIT），冲一个 Hi-C 感知的 VC FM 真正会需要的那批「扰动 × 三维」因果数据集。

值得一提：**Bing Ren**（UCSD），冲 sn-m3C-seq 脑图谱；**William Noble**（UW），冲 HiCFoundation；**Feng Yue**（Northwestern），冲 C.Origami。

跟姊妹篇里一样的 v2/v3 模式。架构组合早就发表过了——冻结 sc-FM 上的适配器范式（scDCA）、三模态底料（scHiCAR）、Hi-C 原生 FM（HiCFoundation、Hi-Cformer）。可守的那块新意，住在那个*还没填的接合处*：一个带 Hi-C 旁路输入头、又是转录组预训练的 VC FM，在那批刚刚才变得可用的 scHiCAR/GAGE-seq 配对上训练。护城河，跟细胞器感知那篇一样，处在模型的上游——脑之外的联合配对数据，外加一套还没人达成共识的接触图 token 化方案。虚拟细胞的转录组那一半，数据是有的；染色质那一半，才是新的切入点。
