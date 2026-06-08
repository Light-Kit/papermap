---
title: 'the canonical layer — how 23 different cohort shapes feed one qc pipeline'
date: '2026-06-08 21:00 UTC'
topics: [hrd, ccr8, pan-cancer, engineering, pipeline-design, canonical-layer, hpc, lsf]
summary: 'after v6, the corpus crossed 50 cohorts on disk and the tier-1 (cohort-level) hrd × ccr8 intersection landed. the next task — tier-2 per-cell standardization — surfaced an engineering wall: every cohort arrives in a different shape (tpm vs umi, ensembl vs hgnc symbols, sample column called sample vs sample_id vs patienttypeid, log1p in X vs counts in X), and the qc dispatcher was growing a per-cohort branch every time. this post is about the architectural fix: a stage-2 canonical layer that pins one anndata contract and pushes all per-study quirks into a 30-line shim per cohort. today we wrote 9 shims via 4 parallel subagents, bootstrapped the env on seadragon hpc, and have the first multi-cohort lsf fan-out queued. four-tier flowchart at the top, contract spec in the middle, shim pattern at the end.'
prev: progress-v6-2026-06-05
---

# the canonical layer — how 23 different cohort shapes feed one qc pipeline

after v6, the corpus crossed 50 cohorts on disk and tier-1 (cohort-level hrd × ccr8 intersection) landed: luo hgsoc 13.29 % > caushi nsclc 10.07 % > puram hnscc 6.91 %, biokey 4.33 % as the trial-design anchor. tier-2 is the next obligation: harmonize the **per-cell** state so each cohort yields the same downstream artifacts (qc'd counts, doublet calls, celltypist labels) and can be folded into a single patient × (hrd, ccr8-treg) matrix.

this post is not about corpus growth. it is about the engineering shape of the workflow — the thing that, if drawn correctly, makes tier-3 cheap and, if drawn wrong, eats the next two weeks.

## the four-tier shape

```
┌──────────────────────────────────────────────────────────────────────┐
│  goal: pan-cancer hrd × ccr8+treg stratifier → trial-eligibility rule │
└──────────────────────────────────────────────────────────────────────┘
                                  │
       ┌──────────────────────────┼──────────────────────────┐
       │                          │                          │
   ┌───▼───┐                  ┌───▼────┐                 ┌───▼────┐
   │TIER 1 │                  │TIER 2  │                 │TIER 3  │
   │cohort │                  │sc qc   │                 │patient │
   │ hrd × │  ───────────►    │standard│  ────────────►  │  hrd × │
   │ ccr8  │                  │ -ize   │                 │  treg  │
   │done ✓ │                  │ active │                 │ future │
   └───────┘                  └───┬────┘                 └────────┘
                                  │                            │
                                  │                            ▼
                                  │                       ┌────────┐
                                  │                       │TIER 4  │
                                  │                       │readout │
                                  │                       │ + paper│
                                  │                       └────────┘

    ┌──────────────────── inside tier 2 ─────────────────────────────────┐
    │  stage 1   write tier2_qc module          scanpy → scrublet →      │
    │            (the dispatcher)               celltypist               │
    │                                                                    │
    │  stage 2   the canonical layer            ★ load-bearing ★         │
    │            (the contract + the shims)                              │
    │                                                                    │
    │  stage 3   hpc bootstrap                  seadragon module+venv    │
    │                                                                    │
    │  stage 4   one-job validation             luo on cdragon075        │
    │                                                                    │
    │  stage 5   batch fan-out                  11 cohorts via bsub      │
    │                                                                    │
    │  stage 6   r-conversion for stragglers    bassez, lambrechts       │
    └────────────────────────────────────────────────────────────────────┘
```

four tiers, scientific. six stages inside tier 2, engineering. the ★ is the post.

## stage 2 — why this is the load-bearing piece

we already had a `tier2_qc` dispatcher (stage 1). the natural way to grow it is: read each cohort's h5ad, fix its quirks inline, then run the standard qc steps. that worked for the first three cohorts. by cohort six it was a 400-line `if/elif` tree. by cohort ten the dispatcher was unreadable. the failure mode is **the dispatcher knows too much about each cohort's history**.

stage 2 inverts that. we put one stable artifact between every cohort and the dispatcher:

```
<cohort_dir>/processed/_canonical/
  ├── adata_raw.h5ad        ← the standard shape
  └── _provenance.json       ← who built this, from what, when
```

the dispatcher (`orchestrator.tier2_qc`) **only reads from `_canonical/`**. it has no idea that bi-2021's source had log-normalised X with raw counts in a layer, that pelka's sample column was called `PatientTypeID`, that luo's gene ids were ensembl. those facts live in stage-2 shims and nowhere else.

### the contract

every canonical h5ad satisfies:

| field           | rule                                                          |
| --------------- | ------------------------------------------------------------- |
| `X`             | raw counts (umi) or tpm. **no log1p.** drop any log layer.    |
| `obs.sample_id` | str, non-null                                                 |
| `obs.patient_id`| str, non-null                                                 |
| `obs.response`  | str — `responder`, `non_responder`, `unknown`, or trial-label |
| `obs.timepoint` | str — `pre`, `on`, `post`, `baseline`, or `unknown`           |
| `var_names`     | hgnc symbols (ensembl is remapped via gencode v44)            |
| `uns.canonical_version` | `"v1.0"`                                              |
| `uns.data_modality`     | `scRNA_TPM` / `scRNA_UMI` / `snRNA_UMI`               |

the provenance json mirrors what stage-3 can and cannot do:

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

`qc_capabilities.scrublet=false` for sade-feldman (smartseq2 tpm — doublet calls are not meaningful). stage-3 reads the flag and skips scrublet. no exceptions in the dispatcher.

### the shim, in 30 lines

a shim is the per-cohort translator. it knows everything weird about one cohort and exposes a clean canonical artifact. the luo umi shim, abbreviated:

```python
def canonicalize_luo_2024_nant_ovarian(cohort_dir):
    adata = sc.read_h5ad(cohort_dir / "processed/tme/luo2024_scrna_10x.h5ad")
    adata.obs = adata.obs.rename(columns={"sample": "sample_id",
                                          "patient": "patient_id"})
    adata.obs["response"]  = "unknown"   # nct04507841 still accruing
    adata.obs["timepoint"] = "unknown"
    _remap_var_ensembl_to_symbol(adata)  # 39080 ensembl → hgnc
    adata.var["mt"] = adata.var_names.str.upper().str.startswith("MT-")
    return _write_canonical(
        adata, cohort_dir, cohort_id="luo-2024-nant-ovarian",
        source_files=[...],
        data_modality="scRNA_UMI",
        qc_capabilities={"scrublet": True, "celltypist": True, "standard_filters": True},
        notes="ensembl→hgnc via gencode v44 (39080 mapped, 17254 kept as ensembl).",
    )
```

that is the whole interface between cohort and pipeline. when a 24th cohort lands, we write one of these. when a column rename breaks because the upstream loader changed schema, we change the shim, not the dispatcher.

## the parallel fan-out — 4 subagents, 9 shims, 30 minutes

we needed shims for 11 of the 13 tier-2 cohorts (sade-feldman and luo were already done as pilots). writing them sequentially would have taken hours. instead: four subagents in parallel, each inspecting + drafting shims for a related batch:

| subagent | scope                             | result                              |
| -------- | --------------------------------- | ----------------------------------- |
| A        | caushi, pelka, lee-crc (easy)     | 3 shims, all `processed/tme/*.h5ad` |
| B        | bi-2021, htan-hta1 (path redirect)| 2 shims, data in `processed/scrna/` |
| C        | luoma, pal (raw 10x ingest)       | 2 shims, glob + concat 10x raw      |
| D        | bassez, lambrechts, yost, jerby   | 2 ready + 2 r-conversion needed     |

each subagent returned shim code as text — not file edits — so they couldn't collide on `canonicalize.py`. main agent consolidated. one file change, 11 shims registered, syntax-checked, ready to run.

| status                  | cohorts                                                                                | n  |
| ----------------------- | -------------------------------------------------------------------------------------- | -- |
| already validated       | sade-feldman, luo                                                                      | 2  |
| **new, ready to run**   | caushi, pelka, lee-crc, bi-2021, htan-hta1, luoma, pal-2021, yost, jerby-arnon         | 9  |
| deferred (r-conversion) | bassez (seurat .rds), lambrechts (cellview .rds shards)                                | 2  |

## stage 3-4 — getting onto seadragon

with shims written, the next bottleneck is wall-time, not architecture. each cohort takes 5-45 min of single-node compute; running them sequentially is six hours, parallel is forty minutes. seadragon is the path.

seadragon has no conda, no shared `/home` with our dev server, and its compute nodes have no internet. the env pattern is `module load python/3.11.3` + venv. we'd done this before — `Project_4_Gastric_Cancer/06_SCENIC_TFVelo/.claude/skills/compute-node.md` had a working skill — and ported it into this project's `.claude/skills/`. that took the bootstrap from "discover by trial" to "follow the recipe":

```bash
cd /rsrch8/home/bcb/lzhang34/Project_6_HRD_PARPi
module load python/3.11.3
python -m venv envs/scanpy_seadragon
source envs/scanpy_seadragon/bin/activate
pip install --upgrade pip
pip install "numpy<2.4" scanpy anndata scrublet celltypist pandas h5py scipy
```

three failure modes hit along the way, all from the skill's experience: (a) lsf does not create parent dirs for `-o`/`-e` logs — the first job exited in 4 seconds; (b) multi-line bsubs pasted from clipboard get `;` injected at newlines — the second job exited in 0.3 seconds with mangled python module paths; (c) `bsub -Is` without a trailing `/bin/bash` enters stdin-command mode. the skill captured all three; the project now has its own copy.

luo's full tier-2 qc is running interactively on `cdragon075` as this post is being written.

## stage 5 — fan-out

when luo finishes on seadragon, the batch submitter is one command:

```bash
nohup bash code/sc/_seadragon_submit_tier2_qc_20260608.sh \
  > logs/seadragon_tier2_20260608/_submit.log 2>&1 &
```

the script issues 11 `bsub` calls, one per cohort. each request is `64 g / 8 cores / 4 h wall / queue medium`. resources are well under seadragon's capacity (104 cores total, 832 g ram — small fraction of the cluster). the actual bottleneck was never compute.

## what the stage-2 abstraction buys

three properties show up downstream:

1. **stage-3 dispatcher has zero per-cohort branches.** there's a single `load_canonical()` that reads `_canonical/adata_raw.h5ad` + `_provenance.json`, and one gate on `qc_capabilities.scrublet`. that's it.

2. **shims are independent units of work.** the next 12 cohorts (post-r-conversion + future ingest batches) each need one ~30-line function. four subagents in parallel can author them in under an hour.

3. **the contract survives upstream chaos.** if the bi-2021 loader changes its column from `biosample_id` to `sample_uuid` tomorrow, the bi-2021 shim changes one line. no other code moves.

the cost is also real: we wrote 14 functions to support 13 cohorts (the 9 new shims + helpers + the two pilots). but writing 13 small focused functions is cheaper than maintaining one 400-line dispatcher that grows a new branch every cohort.

## what's next

tier-2 finishes when 11 jobs on seadragon return clean `qc_summary.json` files. then tier-3 begins: per-patient ccr8+ treg fraction from the canonical filtered cells, joined with the per-patient hrd score from tier-1. the patient × (hrd, ccr8-treg) matrix is the readout.

bassez and lambrechts (r-conversion) and three remaining ingest cohorts wait on a smaller follow-up. they each need one rscript or one ingest call; then they slot in as shim #12, #13, #14. no architectural change.

the shape held.
