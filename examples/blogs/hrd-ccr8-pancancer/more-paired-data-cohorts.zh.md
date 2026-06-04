---
title: '又一轮配对数据搜索 —— 第一遍漏掉的队列'
date: '2026-06-03'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - paired-data
  - dataset-strategy
summary: '对五层配对数据图做的第二次扫描 —— 第一遍漏掉的高价值队列（POG570、Pelka、Erickson + WGS、PETREMAC、Owkin MOSAIC、HTAN 子 atlas），按 tier 列，一行说每个为什么重要。'
starred: true
---

# 又一轮配对数据搜索

[[paired-data-pan-cancer]] 那一篇是凭记忆写的。值得再扫一遍，一来是为了补回当时没想起的队列，二来是 —— 老实说 —— 上一篇里有个名字（POG570）**写在文里、不在 corpus 里**。这篇是第二遍扫的结果，沿用同样的五层结构。

framing 没变。Tier 1 还是出统计 power 的地方，Tier 4 还是把机制 ground 住的地方，Tier 5 还是测因果的地方。变的是，每一层现在都有 *具体的* 队列名字，而不是 "等等"。

## POG570 这件事

第一篇里把 POG570（Pleasance 2020, Nature Cancer）和 TCGA / HMF / PCAWG / CPTAC 一起列。但 vault 里 HMF 是 `priestley-2019`，POG 一行都没有。POG570 是公开数据里 **唯一一个 WGS+RNA 同时带 "活检前接受过哪种治疗" 标注** 的队列 —— 包括 platinum 和 PARPi。它是回答 "一个经过治疗的 HRD 基因组长什么样" 这个问题最合适的入口。这一轮里最大的单点漏洞就是这个。

## Tier 1 —— 高 N WGS/WES + bulk RNA + clinical

| 数据集 | 加的是什么 | 规模 |
| --- | --- | --- |
| **POG570**（Pleasance 2020） | 唯一带 "活检前治疗" 标注的 WGS+RNA 队列 | 570 |
| **MET500**（Robinson 2017） | 美国转移性 pan-cancer WES+RNA，最接近 HMF 的美国版 | 500 |
| **Genomics England 100k Cancer**（Sosinsky 2024） | NHS WGS + 真实世界结局；WGS 侧规模逼近 MSK-CHORD | 13,880 |
| **DKTK MASTER**（Horak 2021） | 欧洲版 HMF，对罕见癌种覆盖很重（sarcoma, NETs, CUP） | 1,310 |
| **SU2C-PCF mCRPC**（Abida 2019） | 乳腺/卵巢之外 HRD 比例最高的 WES+RNA 队列；带 PARPi 相关治疗标注 | ~400 |

有意思的地方在于：POG570（治疗后 WGS）+ MASTER（罕见癌种）+ 100k（英国真实世界结局）+ SU2C-PCF（PARPi 语境的前列腺癌）凑在一起，Tier 1 终于覆盖了 **TCGA 结构上代表不充分的人群** —— 转移、治疗后、罕见、不同祖源。

## Tier 2 —— sc 配同一病人的 WGS/WES

| 数据集 | 加的是什么 | 规模 |
| --- | --- | --- |
| **Pelka 2021 CRC**（Broad/Hacohen/Regev） | 最大的配对 sc+WES CRC；MMRd-vs-MMRp 是 HRD 的 "超突变" 姊妹 | 62 pts / ~371k cells |
| **Kim 2018 TNBC chemoresist**（Navin） | TNBC 新辅助纵向 scDNA + scRNA + WES —— 化疗 × clonal evolution × HRD context | 20 pts |
| **Maynard 2020 NSCLC**（Bivona） | 治疗前 / 残留 / 进展 sc+WES —— 教科书级的 Tier 2 纵向设计模板 | 30 pts |
| **Neftel 2019 GBM**（Suvà） | 明确把扩增 / 突变映射到 cell state | 28 pts |
| **Karaayvaz 2018 TNBC** | 罕见的 paired sc+WES TNBC，直接在 HRD 领地里 | 6 pts |

Pelka 是最值得看的一篇。它讲的 MMRd 故事 ——"一个基因组层的 scar 驱动一个 TME 层的重组，在单细胞分辨率下能看到" —— 正好就是我们对 HRD 要做的 *模板*。把这套模板移到 HRD 上是 Pelka 对我们最干净的用法。其他癌种覆盖广度上值得加的：Lee 2020 CRC, Puram 2017 HNSCC, Tirosh 2016 mel, Jerby-Arnon 2018 mel, Kim 2020 NSCLC met, Stewart 2020 SCLC, Wang 2021 gastric。

## Tier 3 —— spatial 配同一病人的 WGS/WES

| 数据集 | 空间模态 | 规模 | 加的是什么 |
| --- | --- | --- | --- |
| **Erickson 2022 prostate** | Visium | 11 pts | 公开数据里最干净的 WGS ↔ Visium 配对，带 spot 级 CNA 反推。**Tier 3 模板。** |
| **Ravi 2022 GBM** | Visium + IMC + MALDI + WES | 28 pts | spot 级 CNA 反推方法可以直接搬到 HGSOC |
| **Jackson 2020 breast IMC** | IMC，37-plex | 281 pts | 最大的乳腺 IMC 队列；通过 METABRIC 链得到 WES/CNA → HRD 分可算 |
| **Risom 2022 DCIS MIBI** | MIBI，37-plex | ~122 pts | 任何 "空间 × HRD" 主张的 pre-invasive 对照（HTAN-Stanford） |
| **Wu 2025 HGSOC Visium HD** | Visium HD | ~30 pts | `stur-2022-visium` 的直接后继；**preprint，flag** |

一处 re-tag：`wu-2021-breast` 在 vault 里只挂了 scRNA，但 Wu 2021 Nat Genet 那篇 26 个病人里有 6 个做了 Visium。把它的模态标签加上 `spatial-transcriptomics`，不然 Tier 3 过滤的时候会漏掉。

## Tier 4 —— 全套都在同一病人

HTAN 不止 HTAPP + HMS-Ovarian。vault 里只有这两个，但整个网络至少还有 9 个 Phase-1 子 atlas 值得知道，再加上 2024 年立项的 Phase-2 中心在陆续放数据。最相关的五个：

| HTAN 子 atlas | 谁 | 范围 |
| --- | --- | --- |
| **HTA12 WUSTL**（Ding/Fields/Gillanders） | scRNA + snATAC + WGS + Visium + CODEX + CyCIF；PDAC + 乳腺 + MM | 最大的多癌种 Tier-4 单中心 |
| **HTA11 Vanderbilt CRC**（Coffey/Lau） | 腺瘤 → CRC | Pelka 2021 数据 + Phase-2 延续 |
| **HTA5 DFCI Resistance**（Johnson/Regev） | 治疗中 / 治疗后 NSCLC + mel + 乳腺 | Tier 4 ↔ Tier 5 的桥 —— 直接对应 PARPi + anti-CCR8 语境 |
| **HTA8 MSKCC Metastasis**（Pe'er/Iacobuzio-Donahue） | 原发 → 转移配对 | 罕见的原发/转移配对 Tier-4 |
| **HTA208 MOSAIC-Ov3D**（MDACC） | 第二个 HGSOC Tier-4 队列 | 独立于 MSK-SPECTRUM 和 HMS —— 复现层 |

HTAN 之外，最该知道的是 **Owkin MOSAIC** —— 5,000 万美元，~2,500 例已采，7 种癌（NSCLC, TNBC, DLBCL, OV, GBM, mesothelioma, bladder），Visium + Chromium Flex snRNA + bulk RNA + WES + H&E。前 60 例作为 MOSAIC-Window 已经在 EGA 上（controlled access）。注意：是 WES 不是 WGS，HRD signature 的分辨率会被压低。但这是目前 **非 NCI** 的 Tier-4 cancer atlas 里最大的一个，是这个量级的项目都得对得起的 comparator。

ASTRA（Garvan + U-Tokyo + 10x，2025 年 11 月启动）和 HTAN Phase-2 各中心（HTA200–HTA209）属于 aspirational —— 记一下它们存在，等真有数据再回来看。

## Tier 5 —— 治疗暴露的多模态

IO 这边把上一篇没收进来的 melanoma + bladder 经典队列都补上：

| 队列 | 试验 / 背景 | 加的是什么 |
| --- | --- | --- |
| **Riaz 2017 CM-038** | nivo melanoma | 公开的 pre/on WES+RNA+TCR 配对队列之一 |
| **Gide 2019** | 单药 vs combo IO 澳洲 melanoma | 单药 vs combo 分层，外部 test set 用得很多 |
| **Powles 2019 ABACUS** | 新辅助 atezo 膀胱 | 新辅助 IO 的 pre + 膀胱切除后配对，带 pCR —— gold standard 设计 |
| **Cascone 2021 NEOSTAR** | 新辅助 nivo +/- ipi NSCLC | NSCLC 新辅助 IO 的 pre + 切除后配对，带 MPR |
| **INSPIRE basket**（Princess Margaret） | pembro basket：HNSCC / TNBC / HGSOC / mel | TNBC + HGSOC 篮子里有 pre/on WES+RNA 配对 —— **跟 HRD 沾边** |

PARPi 这一侧就比较扎心。大多数 PARPi pivotal（SOLO-1, PRIMA, OlympiA, VELIA, DUO-O, ATHENA-MONO/COMBO）都是 sponsor 控制，原始多模态数据进不去。它们对 positioning 仍然重要。例外是 **PETREMAC**（Eikesdal 2021, Bergen）：一个罕见的 **BRCAwt TNBC 上 PARPi 单药 pre/post 配对多组学队列**，带 RAD51 IF + BRCA1 methylation + PAM50 + TILs。N 小（32），但直接 HRD 相关 —— 公开数据里唯一能问 "olaparib 对一个 BRCAwt TNBC 肿瘤和它的 TME 做了什么，在同一个病人身上" 的数据集。

跟项目主线最像的已发表 trial 是 **DUO-O**（Harter 2025）—— 1L 卵巢的 durvalumab + olaparib + bev，myChoice HRD 分层是 primary endpoint。Sponsor 控制，没法训，但告诉我们这个 trial design 的真实景观长什么样。

## 这一遍换了什么

不是 framing —— 五层的桥还是那座桥。变的是每一层现在有具体的队列名字可以指：

- Tier 1 出信号 —— TCGA + HMF + **POG570** + **100k Genomes** + **MASTER** + **SU2C-PCF**
- Tier 2 定位 —— Vázquez-García + Bassez + **Pelka** + **Kim TNBC** + **Maynard** + **Neftel**
- Tier 3 看组织 —— Launonen + Stur + **Erickson** + **Ravi** + **Jackson IMC** + **Risom DCIS**
- Tier 4 ground —— HTAPP + HMS-Ovarian + **WUSTL HTA12** + **Vanderbilt HTA11** + **DFCI HTA5** + **MSKCC HTA8** + **MOSAIC-Ov3D HTA208** + **Owkin MOSAIC**
- Tier 5 测因果 —— BIOKEY + IMvigor210 + TOPARP + **PETREMAC** + **Riaz** + **ABACUS** + **NEOSTAR** + **INSPIRE** + PARPi pivotal 全套（作为 positioning anchor）

层与层之间搭桥 —— Tier 1 给规模，Tier 2–3 给分辨率，Tier 4 给 grounding，Tier 5 给因果 —— 是 [[one-model-many-archetypes]] 那个架构本来就准备做的。上面这些队列只是给这个架构填上了具体地址。

## 还留着的两件事

这一轮没回答的：

1. **谁还在问这个问题。** 这是下一篇 [[who-else-is-doing-this]]。配对数据图说 "有哪些数据"，没说 "谁还在用这些数据"。
2. **真要加进 vault 的是哪些。** 上面这些不是都该进 corpus —— 有些是 positioning，有些是 aspirational。最短的答案是：先加 POG570，再加 [[who-else-is-doing-this]] 里的五个 "相似研究"，再加 PETREMAC，HTAN 子 atlas 作为一批批量加。Triage 是另一场对话。
