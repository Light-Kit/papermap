---
title: '规范化层 — 让 23 种不同形态的队列喂给同一条 qc 管线'
date: '2026-06-08 16:00 CT'
topics: [hrd, ccr8, pan-cancer, engineering, pipeline-design, canonical-layer, hpc, lsf]
summary: 'v6 之后，语料越过 50 个队列上盘，tier-1（队列级 hrd × ccr8 交集）落地。下一步 tier-2（按细胞的标准化）撞上一堵工程墙：每个队列的形态都不一样（tpm 对 umi、ensembl 对 hgnc 符号、sample 列叫 sample 还是 sample_id 还是 PatientTypeID、log1p 在 X 里还是 counts 在 X 里），qc 派发器每接一个新队列就长出一个分支。这篇是关于架构修复：stage-2 规范化层把 anndata 契约固定下来，把所有按研究的怪癖都推到每队列 30 行的 shim 里。今天我们用 4 个并行 subagent 写了 9 个 shim，在 seadragon hpc 上把环境启好了，第一批多队列 lsf 扇出已经排队。文章开头是四层架构流程图，中段是契约规范，末段是 shim 模式。'
prev: progress-v6-2026-06-05
---

# 规范化层 — 让 23 种不同形态的队列喂给同一条 qc 管线

v6 之后，语料越过 50 个队列上盘，tier-1（队列级 hrd × ccr8 交集）也落地：luo hgsoc 13.29 % > caushi nsclc 10.07 % > puram hnscc 6.91 %，biokey 4.33 % 是试验设计的锚。tier-2 是下一份必须交付的工作 —— 把**按细胞**的状态统一起来，每个队列产出同样的下游产物（qc 后的 counts、双胞体调用、celltypist 标注），然后能合并成一张 patient × (hrd, ccr8-treg) 的总表。

这篇不是关于语料增长。是关于工程形态 —— 那个画对了就让 tier-3 变便宜、画错了就吃掉接下来两周的东西。

## 四层形态

```
┌──────────────────────────────────────────────────────────────────────┐
│  目标：泛癌 hrd × ccr8+treg 分层器 → 试验入组规则                   │
└──────────────────────────────────────────────────────────────────────┘
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       │                          │                          │
   ┌───▼───┐                  ┌───▼────┐                 ┌───▼────┐
   │TIER 1 │                  │TIER 2  │                 │TIER 3  │
   │ 队列  │                  │ sc qc  │                 │ 患者级 │
   │ hrd × │  ───────────►    │ 标准化 │  ────────────►  │ hrd ×  │
   │ ccr8  │                  │        │                 │ treg   │
   │ 完成✓ │                  │ 进行中 │                 │ 待办   │
   └───────┘                  └───┬────┘                 └────────┘
                                  │                            │
                                  │                            ▼
                                  │                       ┌────────┐
                                  │                       │TIER 4  │
                                  │                       │ 读出   │
                                  │                       │ + 论文 │
                                  │                       └────────┘

    ┌──────────────────── tier 2 内部 ───────────────────────────────────┐
    │  阶段 1   写 tier2_qc 模块                scanpy → scrublet →       │
    │           （派发器）                       celltypist               │
    │                                                                    │
    │  阶段 2   规范化层                        ★ 关键所在 ★              │
    │           （契约 + shim 函数）                                      │
    │                                                                    │
    │  阶段 3   hpc 启动                        seadragon module+venv     │
    │                                                                    │
    │  阶段 4   单任务验证                      luo 在 cdragon075         │
    │                                                                    │
    │  阶段 5   批量扇出                        11 个队列经 bsub          │
    │                                                                    │
    │  阶段 6   2 个掉队队列做 r 转换           bassez, lambrechts        │
    └────────────────────────────────────────────────────────────────────┘
```

四层是科学。tier 2 内的六个阶段是工程。★ 才是这篇文章。

## 阶段 2 — 为什么这是关键所在

我们之前已经有 `tier2_qc` 派发器（阶段 1）。自然的扩展方式是：读每个队列的 h5ad，原地修正其怪癖，再跑标准 qc 步骤。前三个队列这样还行。到第六个就是 400 行的 `if/elif` 树。到第十个派发器就读不懂了。失败模式很清楚：**派发器知道得太多，对每个队列的历史都熟悉**。

阶段 2 把这反过来。我们在每个队列和派发器之间插入一个稳定的产物：

```
<cohort_dir>/processed/_canonical/
  ├── adata_raw.h5ad        ← 标准形态
  └── _provenance.json       ← 谁、从哪、何时构建的
```

派发器（`orchestrator.tier2_qc`）**只从 `_canonical/` 读**。它根本不知道 bi-2021 的源文件 X 是 log 归一化、原始 counts 在某一层里；不知道 pelka 的 sample 列叫 `PatientTypeID`；不知道 luo 的 gene id 是 ensembl。这些事实只活在阶段-2 shim 里，别的地方一概不知。

### 契约

每份规范化 h5ad 都必须满足：

| 字段                     | 规则                                                                |
| ----------------------- | ------------------------------------------------------------------- |
| `X`                     | 原始 counts（umi）或 tpm。**不能 log1p。** 任何 log 层必须丢掉。     |
| `obs.sample_id`         | str，非空                                                            |
| `obs.patient_id`        | str，非空                                                            |
| `obs.response`          | str — `responder`、`non_responder`、`unknown`、或试验自定义标签       |
| `obs.timepoint`         | str — `pre`、`on`、`post`、`baseline`、或 `unknown`                  |
| `var_names`             | hgnc 符号（ensembl 经 gencode v44 重映射）                            |
| `uns.canonical_version` | `"v1.0"`                                                            |
| `uns.data_modality`     | `scRNA_TPM` / `scRNA_UMI` / `snRNA_UMI`                             |

provenance json 反映阶段-3 在该队列上能做什么、不能做什么：

```json
{
  "cohort_id": "luo-2024-nant-ovarian",
  "data_modality": "scRNA_UMI",
  "qc_capabilities": {
    "scrublet": true,
    "celltypist": true,
    "standard_filters": true
  },
  "n_cells": 661501,
  "n_genes": 56334,
  "canonical_version": "v1.0"
}
```

sade-feldman 的 `qc_capabilities.scrublet=false`（smartseq2 tpm — 双胞体调用没意义）。阶段-3 读这个标志位然后跳过 scrublet。派发器里没有任何特殊情况判断。

### shim，30 行

shim 是按队列的翻译器。它知道这个队列所有的奇怪之处，对外暴露一个干净的规范化产物。luo umi shim 简化版：

```python
def canonicalize_luo_2024_nant_ovarian(cohort_dir):
    adata = sc.read_h5ad(cohort_dir / "processed/tme/luo2024_scrna_10x.h5ad")
    adata.obs = adata.obs.rename(columns={"sample": "sample_id",
                                          "patient": "patient_id"})
    adata.obs["response"]  = "unknown"   # nct04507841 仍在入组
    adata.obs["timepoint"] = "unknown"
    _remap_var_ensembl_to_symbol(adata)  # 39080 个 ensembl → hgnc
    adata.var["mt"] = adata.var_names.str.upper().str.startswith("MT-")
    return _write_canonical(
        adata, cohort_dir, cohort_id="luo-2024-nant-ovarian",
        source_files=[...],
        data_modality="scRNA_UMI",
        qc_capabilities={"scrublet": True, "celltypist": True, "standard_filters": True},
        notes="ensembl→hgnc 经 gencode v44（39080 已映射，17254 保留为 ensembl）。",
    )
```

这就是队列与管线之间的全部接口。第 24 个队列落地时，我们写一个这样的函数。当上游加载器改了 schema 导致列名重命名失败时，改 shim，不是改派发器。

## 并行扇出 — 4 个 subagent，9 个 shim，30 分钟

tier-2 的 13 个队列里我们还需要 11 个 shim（sade-feldman 和 luo 已经做过试点）。顺序写要几个小时。改成 4 个 subagent 并行，每个负责相关的一批：

| subagent | 范围                              | 结果                                  |
| -------- | --------------------------------- | ------------------------------------- |
| A        | caushi, pelka, lee-crc（容易的）   | 3 个 shim，都在 `processed/tme/*.h5ad`|
| B        | bi-2021, htan-hta1（路径不同）     | 2 个 shim，数据在 `processed/scrna/` |
| C        | luoma, pal（原始 10x 摄入）        | 2 个 shim，glob + 拼接 10x 原始数据   |
| D        | bassez, lambrechts, yost, jerby   | 2 个 ready + 2 个需要 r 转换          |

每个 subagent 把 shim 代码作为文本返回 —— 不直接改文件 —— 所以它们不会在 `canonicalize.py` 上互相冲突。主 agent 做合并。一次文件修改、11 个 shim 注册、语法检查通过、可执行。

| 状态                  | 队列                                                                                  | n  |
| --------------------- | ------------------------------------------------------------------------------------- | -- |
| 已验证                 | sade-feldman, luo                                                                     | 2  |
| **新增、ready 可跑**   | caushi, pelka, lee-crc, bi-2021, htan-hta1, luoma, pal-2021, yost, jerby-arnon        | 9  |
| 推迟（r 转换）         | bassez（seurat .rds）, lambrechts（cellview .rds 分片）                                | 2  |

## 阶段 3-4 — 上 seadragon

shim 写完之后，下一个瓶颈是 wall-time，不是架构。每个队列单节点跑 5-45 分钟；顺序跑要六小时，并行跑四十分钟。seadragon 是路径。

seadragon 没有 conda，`/home` 和我们开发用的服务器不共享，计算节点没有外网。环境模式是 `module load python/3.11.3` + venv。我们之前做过 —— `Project_4_Gastric_Cancer/06_SCENIC_TFVelo/.claude/skills/compute-node.md` 里有一份能用的 skill —— 我们把它移植到本项目的 `.claude/skills/`。这把启动从"试错探索"变成了"照着配方做"：

```bash
cd /rsrch8/home/bcb/lzhang34/Project_6_HRD_PARPi
module load python/3.11.3
python -m venv envs/scanpy_seadragon
source envs/scanpy_seadragon/bin/activate
pip install --upgrade pip
pip install "numpy<2.4" scanpy anndata scrublet celltypist pandas h5py scipy
```

路上撞了三种失败，都在 skill 的经验里：（a）lsf 不会给 `-o`/`-e` 日志预建父目录 —— 第一份任务 4 秒退出；（b）从剪贴板粘贴多行 bsub 命令时换行会被替换成 `;` —— 第二份任务 0.3 秒退出，python 模块路径被破坏；（c）`bsub -Is` 后面不加 `/bin/bash` 会进 stdin-命令模式。skill 都记录了；项目现在有了自己的副本。

写这篇博客时，luo 的完整 tier-2 qc 正在 `cdragon075` 上交互式跑。

## 阶段 5 — 扇出

luo 在 seadragon 上跑完之后，批量提交器一行：

```bash
nohup bash code/sc/_seadragon_submit_tier2_qc_20260608.sh \
  > logs/seadragon_tier2_20260608/_submit.log 2>&1 &
```

脚本发出 11 个 `bsub` 调用，每队列一个。每个申请 `64 g / 8 核 / 4 小时 wall / queue medium`。资源远低于 seadragon 容量（合计 104 核、832 g —— 集群里的小零头）。瓶颈从来不是算力。

## 阶段-2 这层抽象买到了什么

下游会出现三个性质：

1. **阶段-3 派发器零按队列分支。** 只有一个 `load_canonical()` 读 `_canonical/adata_raw.h5ad` + `_provenance.json`，外加一个对 `qc_capabilities.scrublet` 的判断。仅此而已。

2. **shim 是独立的工作单元。** 接下来的 12 个队列（r 转换之后 + 未来的摄入批次）每个只需要一个 ~30 行的函数。4 个 subagent 并行能在一小时内写完。

3. **契约能扛住上游的混乱。** 如果明天 bi-2021 加载器把 `biosample_id` 列改成 `sample_uuid`，bi-2021 的 shim 改一行。其他代码全部不动。

代价也是真实的：我们为支持 13 个队列写了 14 个函数（9 个新 shim + 辅助函数 + 2 个试点）。但 13 个小而专的函数比一个每加一个队列就长出新分支的 400 行派发器要便宜。

## 接下来

tier-2 完成的标志是 seadragon 上的 11 个任务都返回干净的 `qc_summary.json`。然后 tier-3 开始：从规范化后的过滤细胞算出每患者 ccr8+ treg 比例，与 tier-1 的每患者 hrd 分数联表。patient × (hrd, ccr8-treg) 矩阵就是读出。

bassez 与 lambrechts（r 转换）以及剩下三个待摄入队列等一个小的后续任务。每个需要一份 rscript 或一次摄入调用；然后作为第 12、13、14 号 shim 接入。架构不动。

形态保住了。
