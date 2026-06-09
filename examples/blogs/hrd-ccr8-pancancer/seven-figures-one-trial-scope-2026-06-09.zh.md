---
title: '七张图，一个试验范围问题 —— 为什么下一个交付物是 basket 提案，而不是又一个图谱'
date: '2026-06-09 12:30 CT'
topics: [hrd, ccr8, pan-cancer, trial-design, basket, denikitug, gs-0201, pipeline-design, snakemake, supplement-mining]
summary: '一份 MDA-Anderson + Gilead 的试验提案落到了桌上：denikitug（anti-CCR8 ADCC）+ gs-0201（PARPi），针对 HRD 阳性的 HGSOC。我们想翻转的问题是：为什么只做 HGSOC，而不是一个 pan-cancer basket？这篇讲我们正在搭的答案 —— 七张图、一份 PDF、一条 snakemake pipeline，把手上已有的数据排成逼问范围的形状。它也记下今早冒出来的诚实转向（fig 2 右栏这块承重面板没法从队列边际分布算出来，于是我们去 paper 补充材料里挖每病人的 BRCA / HRD 状态），最后是下午的补记：fig 2 落地了七个队列 × 六种瘤型，包括给出连续 SBS3 轴的 vazquez-garcia MSK-SPECTRUM。pipeline 结构已搭好，明天 dry-run。'
prev: the-canonical-layer-2026-06-08
---

# 七张图，一个试验范围问题 —— 为什么下一个交付物是 basket 提案，而不是又一个图谱

今早提案摘要送到桌上：MDA-Anderson + Gilead，**denikitug + gs-0201，针对 HRD 阳性的铂耐药卵巢癌**。denikitug 是那个去岩藻糖化的 anti-CCR8 抗体（gs-1811），为 ADCC 介导清除 CCR8+ 终末效应 Treg 而设计；gs-0201 是 PARP 抑制剂。提案是单臂 II 期，只做 HGSOC。

我们花了六周搭起来的语料库，已经能回答一个这份摘要没有问的问题。**如果对的试验是一个 basket 呢？**

这篇不是讲新生物学。它讲的是下一个交付物的形状 —— 七张图、一份 PDF、一条 snakemake pipeline —— 以及我们在起草过程中撞上的那堵诚实的数据现实墙。

## 每张图都必须逼问的那一个问题

摘要把范围划在 HGSOC，是因为 HGSOC 正是 Luo 2024 讲出残留 eTreg 故事的地方，而且 HGSOC 的 ORR 读出最快。这两点都没有说 HGSOC 是这套生物学**唯一**存在的地方。缺口就在这里。

报告里的每一张图都得回答同一个问题：**为什么是 basket，而不是只做 HGSOC？** 任何不直接逼问这个问题的面板，一律砍掉。

## 这七张图

| # | 图 | 它逼读者说回来的那一句话 |
|---|---|---|
| **1** | **pan-cancer HRD 患病率** —— TCGA Knijnenburg 回顾（n=14,199）：OV 56%、BRCA ~47%、PAAD ~24%、mCRPC ~19%、NSCLC ~10%；阈值线画在"PARPi 已获 FDA 批准"处 | "已经有六种瘤型存在规模级的 HRD 人群 —— 凭什么只圈一种？" |
| **2** | **HRD × CCR8 联合森林图** —— 联合患病率 + 队列内耦合，阈值线画在 5% 与 OR=1 | "这套生物学不是 OV 特异的。它在每一种符合条件的瘤型里都跟着 HRD 一起走。" |
| **3** | **机制可复现性** —— 把 Luo 2024 的残留 eTreg 框架在 caushi NSCLC、biokey breast，以及若有的话 ≥1 个 PARPi 后的非 OV sc 队列上重现 | "Luo 描述的 eTreg-surge 机制在 HGSOC 之外也可复现。" |
| **4** | **应答方向 pan-cancer** —— biokey expander 21.92 vs non-expander 19.48；caushi MPR vs non-MPR 的 CCR8 差值；≥1 个其它 ICI 队列 | "基线 CCR8-eTreg-high 在非卵巢疾病里也跟应答相关，不只在 OV。" |
| **5** | **每层 Simon 算术** —— null=15%、alt=35%、每臂 n × 各瘤型真实世界年度 HRD 阳性发病数 | "每个 basket 分层都能各自作为一个 Simon two-stage 立得住。" |
| **6** | **入组：basket vs 只做 HGSOC** —— 三种设计（只做 PROC、全 OV、pan-cancer basket）下达到满额入组的预计月数；basket *更快* | "只做 HGSOC 是更慢，不是更稳。basket 用一半时间就招满了。" |
| **7** | **只做 HGSOC 的机会成本** —— 限定 OV 每年错过的预计应答者；在 basket 假设的 35% ORR 下，BRCA / PAAD / NSCLC / mCRPC 里的反事实应答者 | "限定 HGSOC，等于每年把 n 个可治疗的应答者留在桌上。" |

打头的图是患病率地图，不是森林图。当**唯一**的任务就是逼出范围问题时，患病率地图是那一拳 —— 在读者还来不及为"只做 HGSOC"找理由之前就打下去。森林图是锁死，不是开场。

## 搭出这份 PDF 的 pipeline

我们自己拥有四层；底下两层 seadragon orchestrator 已经拥有了。

```
┌─── layer 0  CANONICAL  ────┐    (fixed inputs)
│   adata_raw.h5ad           │     owned by orchestrator
│   _provenance.json         │
└────────────┬───────────────┘
             │
┌─── layer 1  TIER-2 QC  ────┐    (fixed inputs)
│   adata_qc.h5ad            │     owned by orchestrator (in flight tonight)
│   qc_summary.tsv           │
└────────────┬───────────────┘
             │ (read-only)
╔════════════▼═══════════════════════════════╗
║       layer 2 — per-patient axes           ║   ← snakemake fan-out per cohort
║                                            ║
║   hrd_per_patient.tsv                      ║
║   ccr8_per_patient.tsv                     ║
║   patient_paired.tsv  +  qc.tsv            ║
╚════════════╤═══════════════════════════════╝
             │
╔════════════▼═══════════════════════════════╗
║       layer 3 — cross-cohort joins         ║   ← snakemake gather
║                                            ║
║   prevalence_pancancer.tsv                 ║
║   coupling_paired.tsv                      ║
║   responder_direction.tsv                  ║
║   joins_qc.tsv  ← anchor checks must pass  ║
╚════════════╤═══════════════════════════════╝
             │
╔════════════▼═══════════════════════════════╗
║       layer 4 — seven figures              ║   ← parallel, each emits
║                                            ║      fig + sibling _qc.tsv
║   fig1 … fig7                              ║      with exclusion ledger
╚════════════╤═══════════════════════════════╝
             │
╔════════════▼═══════════════════════════════╗
║       layer 5 — pdf assembly (reportlab)   ║
║                                            ║
║   reports/hrd_ccr8_pancancer_basket.pdf    ║
╚════════════════════════════════════════════╝
```

选 snakemake 是因为：每条 rule 都有清晰的输入 glob，per-cohort 的活儿是 embarrassingly parallel，而且 `--profile lsf` 跟 seadragon 原生对接。目录树锚在 `code/pipeline/`，里面是 `Snakefile`、`rules/*.smk`、`scripts/*.py`、`config/cohorts.yaml`。

让交付物保持诚实的关键，在于 QC 纪律。**每条图的 rule 都有两个输出，不是一个** —— `figN.png` 和 `figN_qc.tsv`。这个 QC 旁挂文件为每个队列列出：过滤前的细胞/病人数、过滤后、剔了什么、为什么剔。一张图除非它的 QC 旁挂文件过了该图专属的阈值（比如 fig 2 需要 ≥3 个队列，fig 4 需要 ≥2 个应答队列），否则不编译。一旦 anchor 漂移（Luo 13.29%、biokey 4.33%、TCGA OV 56%），join rule 会大声报错，而不是悄悄把数字挪过去。

## 那个诚实的转向

我们起草了 Snakefile 和 per-patient axes rule，然后去把 layer 2 的 `hrd_per_patient` rule 接到磁盘上那些处理好的 genomic 文件 —— 它一接触文件系统就没撑住。

```
find <DATA_ROOT> -path '*/processed/hrd*' -name '*.tsv'
→ D/tcga-pancancer-bulk-2026/processed/hrd/_tcga_hrd_high_low_split.tsv
→ C/jackson-2020-breast-imc/processed/hrd/hrd_scores.tsv
→ C/ali-danenberg-2020-metabric-imc/processed/hrd/hrd_scores.tsv
```

**三行。** 我们手上唯一的每病人 HRD 评分，就是 TCGA pan-cancer 表（bulk，没有 sc 配对）和两个 IMC 队列（也没有 sc 配对）。Luo、caushi、biokey、pal —— 这些撑起 basket 提案的 sc 队列 —— 还没有任何每病人 HRD 输出。`_master_intersection.tsv` 里那张 tier-1 主表，一直是把 TCGA 代理的 HRD-high% 均匀广播到这些队列里的每一个病人身上。这就是为什么 tier-1 森林图右栏（队列内 OR）是人造的 —— OR≈1 不是生物学，是构造方式。

> 在独立假设下、用两个队列边际分布拼出来的 2×2，机械上就会把 OR 钉在 ≈1。你看到的任何偏离都是整数取整的噪声。这一课现在已存进 memory，名为 `feedback_2x2_from_marginals_or_artifact.md`。

这对 PDF 很要紧，因为 **fig 2 的右栏是承重的。** 左边的联合患病率面板显示的是共存 —— 两个 compartment 在同样的瘤型里都存在。但 basket 的生物学主张更强：**同一个病人**两者都有。队列边际分布显示不了这个。只有 patient-paired 数据能。

补这个缺口有两条路：

| 路径 | 成本 | 时间线 |
|---|---|---|
| **(a) 我们自己跑 HRD-on-WES** —— bwa-mem2 → mutect2 → sigprofiler → scarHRD，跑在 Luo（WGS）、caushi（WES）、biokey（WES） | 多天 seadragon，≥1 TB 算力 | 一周 |
| **(b) 挖 paper 补充材料** —— 大多数聚焦 HRD 的论文会在 supp s1/s2 里发每病人 BRCA / HRD / SBS3 / gLOH | 几小时；subagents + webfetch | 今天 |

我们今天下午开了 (b)。

## supplement-mining 的 fan-out

三个并行 subagent，每个两个队列，**没有 fallback 路径，没有 mock 数据**（某个队列如果 supp 里没那一列，它就拿 `false`）。每个返回一行 tsv：`paper_doi, supp_files_downloaded, has_per_pt_hrd_score, has_brca_status, has_sbs3, has_other_hrd_proxy, n_patients_in_supp, n_patients_with_hrd_axis, download_method, notes`。

| agent | 队列 | 为什么我们预期能命中 |
|---|---|---|
| 1 | **Luo 2024 nact-ov**（Cell, 10.1016/j.cell.2024.06.013）+ **bassez 2021 biokey**（Nat Med, 10.1038/s41591-021-01323-8） | Luo 这篇以 HRD 为核心；biokey 是 31 个病人，BRCA/病理通常在 suppl 里。 |
| 2 | **pal 2021 brca1-breast**（EMBO J, 10.15252/embj.2020107333）+ **khaliq-sun 2024 pdac**（Visium FFPE） | pal 队列本身就是*用* BRCA1 携带状态定义的 —— 基因型就是那份 deposit。khaliq 把握小些，但 PDAC 跟 BRCA 相关。 |
| 3 | **hwang 2022 pdac neoadj**（Nat Genet, 10.1038/s41588-022-01134-8）+ **sade-feldman 2018 mel**（Cell, 10.1016/j.cell.2018.10.038） | hwang 有 43 个病人、8 个治疗臂加病理应答；sade-feldman 有配对的 pre/post 和每病人 R/NR 标签。 |

只要这六个里有任意三个落地了每病人 BRCA 或 HRD 状态、覆盖 ≥10 个病人，layer 2 就拿到一条 `ingest_paper_supplements.smk` rule，把它们归一到同一份 `hrd_per_patient.tsv` schema，fig 2 的右栏就变成**跨配对队列的、汇总的每病人 Spearman ρ** —— 那条承重的耦合证据。

## 真正跑之前，靠什么让 pipeline 正确

一条大声失败的 pipeline 很便宜。一条悄悄失败的 pipeline 很贵。在图层烧掉第一个 bsub 之前，已经接好五道闸：

1. **`snakemake --dry-run`** —— DAG 在不执行的情况下解析。抓住缺失的 rule 接线。
2. **`snakemake --dag | dot -tpng`** —— 可视化 DAG 审计；一眼确认 layer 2→5 是连通的。
3. **anchor 检查烤进 layer 3 的 join 脚本** —— Luo 队列级患病率必须重现 13.29%（±0.05 内）；biokey 4.33%；TCGA OV 必须重现 56% HRD-high。硬 `assert`。anchor 一漂移，pipeline 就拒绝渲染 fig 2。
4. **在 3 个队列（Luo、caushi、biokey）上端到端跑一遍 toy subset**，再扩到 13 个。在不烧队列的前提下抓住 I/O + schema bug。
5. **每个阶段都出 PDF 预览** —— `snakemake report` 用当下已经就绪的图来跑；缺的图用占位页显示还差什么，这样我们永远不会发一份半生不熟的 PDF 还说做完了。

## 一天内能不能跑完 —— 诚实地说

- **pipeline 本身，一旦写好：能，一天轻松搞定。** layer 2–5 在已处理好的数据上是 I/O-bound 的。13 个队列 × 每条轴 ~2 分钟 × 并行 = 整个 build 不到 30 分钟。
- **起草 + 验证迭代：今天不行。** 6 个队列的 tier-2 QC 还在 seadragon 上跑（1–2 小时）。还有 ~18 个脚本要写（layer 3 + layer 4 + reportlab）。图的设计迭代永远最慢。supplement mining 今天落地；ingest rule 明天落地。
- **现实时间线：今天结束前 pipeline 起草完 + dry-run 干净；第一份真 PDF 明晚。**

## 这篇到底在讲什么

每个项目到这个阶段都有同一个诱惑：继续加队列、继续加图谱、继续搭语料库。能翻转一个试验范围的活儿，恰恰是这个的**反面**。它是挑一个问题（只做 HGSOC，还是 basket？），逼每一张图都去顶这个问题。我们手上的语料库已经能回答这个问题 —— 我们只是还没把它排成七个面板而已。

下一篇要么带着三个 patient-paired 队列和真正的 fig 2 散点落地，要么带着诚实的队列边际版本加一条脚注说明还差什么落地。无论哪样，PDF 这周发。

## 补记 —— 18:30 CT：实际落地了什么

早上那篇发出去六小时后，supplement-mining 的 fan-out 已经收敛。最终战果比早上的预测好得多。

### fig 2 patient-paired 池 —— 7 个队列 × 6 种瘤型，~236 个病人

| 队列 | 瘤型 | n | 轴来源 |
|---|---|---|---|
| luo 2024 nact-ov | hgsoc | 34 | mmc1 table s1 —— 每病人 HRD/HRP + BRCA |
| **vazquez-garcia 2022 msk-spectrum** | **hgsoc** | **42** | **moesm4 —— 连续 SBS3 + Myriad GIS + HRD-dup/del/fbi** |
| pal 2021 brca1-breast | brca | 52 | ev1+ev2 —— 每病人 BRCA1 携带状态 |
| karaayvaz 2018 tnbc | tnbc | 5 | moesm1 supp t1 —— BRCA1/2 胚系 |
| pelka 2021 crc | crc | ~60 | mmc1 sheet a —— 每病人 MMR-IHC + MMRstatus（mutator 轴等价物） |
| caushi 2021 nsclc | nsclc | 9 | moesm5+8 —— HR-通路基因命中（ATM/BARD1/PALB2） |
| **kumar 2022 gastric（磁盘 id `zhang-2022-gastric-tcell`）** | **stad** | **34** | **cd-21-0683 supp t1 —— MMR + EBV + TCGA 亚型** |

最大的解锁是 vazquez-garcia。MSK-SPECTRUM 给了我们 40 个 WGS 样本的**每病人连续 SBS3 权重** —— 池子里最干净的 HRD 轴。fig 2 右栏因此变成真正的散点（SBS3 权重 vs CCR8-eTreg 比例），不再是早上那个我们得道歉的箱线图。另外六个是二元 HRD 或 mutator 等价物 —— 跟 vazquez 汇总后覆盖 ~236 个病人、横跨六种瘤型，这是真正够 basket 级的。

### fig 4 应答方向池 —— 6 个队列 × 6 种瘤型

| 队列 | 瘤型 | 应答标签 | n |
|---|---|---|---|
| bassez 2021 biokey | brca | expander / non-expander | 31 |
| sade-feldman 2018 mel | skcm | r / nr | 32 |
| bi 2021 ccrcc | ccrcc | RECIST + ICB 暴露队列 | 21 |
| simpson 2020 sclc-cdx | sclc | 一线卡铂上的 RECIST pr/pd/sd | 31 |
| jerby-arnon 2018 mel valco2 | skcm | RECIST + PFS | 114 |
| maynard 2020 nsclc longitudinal | nsclc | TN/RD/PD 时间点 | n=样本数 |

这六个里有四个是今天下午新加的。basket 提案现在有了真正的应答方向面板，不再只是 biokey 21.92 vs 19.48 这一个事实。

### 没有改变的数据现实发现

早上的假设是大多数论文会出货。这只对了一半。今天**诚实的没出货**：

- **bassez biokey**：这项研究**根本没做 WES**。发表的是 E/NE + ER/PR/HER2 + Ki67 + sTILs。是论文设计的上限，不是检索失败。
- **hwang pdac**、**khaliq pdac**、**steele pdac（不在磁盘上）**：PDAC 论文不在 supp 里发 HRD 轴。PDAC 覆盖停留在队列级 TCGA-PAAD only。
- **liu hcc（cohort_id `su-2025-hcc-snrna` 命名错了；实际一作是 Liu K）**：论文 supp 是图注 + HBV 状态而已。没有 HRD 轴。
- **greenwald gbm**：只有基因程序 metaprogram 进了 supp；没有病人表。
- **puram hnscc** 和 **tirosh skcm**：puram 12 行突变（整体只有 1 个功能性 HRD-通路命中）；tirosh 的表是基因列表，不是病人轴。
- **wu 2021 breast**：一句自由文本"BRCA2 mutation"提及；其余都锁在 egas00001005173。

supp-mining agent 给出三条有用的更正，之后应折回 manifest：

1. manifest 里的 `wang-2021-gastric-peritoneal` 实际是 **Jiang H 2022, Clin Transl Med**（10.1002/ctm2.730）。
2. manifest 里的 `zhang-2022-gastric-tcell` 实际是 **Kumar V 2022, Cancer Discovery**（10.1158/2159-8290.cd-21-0683）。
3. manifest 里的 `su-2025-hcc-snrna` 实际是 **Liu K 2025, Mol Clin Oncol**（10.3892/mco.2025.2871）。cohort id 里那个 "su" 是误读了一个 GEO 联系人字段。

### pipeline 状态 —— 结构已搭好，dry-run 待跑

snakemake pipeline 的四层现在都有 rule 文件和脚本落在 `code/pipeline/` 下：

```
layer 2  per_patient_axes.smk         + 4 ingestion scripts (in flight)
layer 3  cross_cohort_joins.smk       + 4 join scripts  (done; anchor checks baked in)
layer 4  figures.smk                  + 7 figure scripts + clinical_assumptions.yaml  (done)
layer 5  report.smk                   + render_report.py (reportlab) + figure_captions.yaml  (done)
```

cohorts.yaml 已用今天的战果刷新：vazquez/pal/karaayvaz/pelka/caushi/kumar 现在都是 `paired_axes: true`；bassez 更正为 `false`（我们现在知道它没有 WES 轴）；maynard 和 simpson 作为 supp-only 的应答轴贡献者加了进来。

下一步是 layer 2 的 ingestion subagent（还在跑）加 `snakemake --dry-run` 确认 DAG 解析。然后在 3 个队列（luo + vazquez + pal）上跑个 toy，再扩到七个。然后出 PDF。

### 没有改变的

早上的论点仍然是论点。七张图、一份 PDF、一个问题。basket 提案就是交付物。改变的是证据的强度 —— patient-paired 面板里是六种瘤型，而不是"只有 luo，还得道歉"。早上是在问这些图*能不能*搭出来。下午是在问它们实际有多强。
