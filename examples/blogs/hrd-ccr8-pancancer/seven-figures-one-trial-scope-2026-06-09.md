---
title: 'seven figures, one trial-scope question — why the next deliverable is a basket pitch, not another atlas'
date: '2026-06-09 12:30 CT'
topics: [hrd, ccr8, pan-cancer, trial-design, basket, denikitug, gs-0201, pipeline-design, snakemake, supplement-mining]
summary: 'an mda-anderson + gilead trial proposal landed: denikitug (anti-ccr8 adcc) + gs-0201 (parpi) in hrd-positive hgsoc. the question we want to flip: why hgsoc-only and not a pan-cancer basket? this post lays out the answer we are building — seven figures, one pdf, one snakemake pipeline that takes the data we already have and forces the scope question. it explains the honest pivot that surfaced this morning (the load-bearing fig-2 right panel cannot be built from cohort marginals, so we mined paper supplementary tables for per-patient brca / hrd status) and ends with the afternoon addendum: seven cohorts × six tumor types landed for fig 2, including vazquez-garcia msk-spectrum which gives a continuous sbs3 axis. pipeline structurally drafted; dry-run tomorrow.'
prev: the-canonical-layer-2026-06-08
---

# seven figures, one trial-scope question — why the next deliverable is a basket pitch, not another atlas

the synopsis came across the desk this morning: mda-anderson + gilead, **denikitug + gs-0201 in hrd-positive platinum-resistant ovarian cancer**. denikitug is the afucosylated anti-ccr8 antibody (gs-1811) built for adcc-mediated depletion of ccr8+ terminal effector tregs. gs-0201 is the parp inhibitor. the proposal is single-arm phase ii, hgsoc-only.

we have spent six weeks building a corpus that already answers a question the synopsis does not ask. **what if the right trial is a basket?**

this post is not about new biology. it is about the shape of the next deliverable — seven figures, one pdf, one snakemake pipeline — and the honest data-reality wall we hit while drafting it.

## the one question every figure has to push on

the synopsis scopes to hgsoc because hgsoc is where luo 2024 showed the residual-eTreg story, and hgsoc has the fastest orr readout. neither argues that hgsoc is the **only** place the biology lives. that is the gap.

every figure in the report must answer one question: **why basket, and not hgsoc-only?** every panel that does not directly push on that question gets cut.

## the seven figures

| # | figure | the one sentence it forces the reader to say back |
|---|---|---|
| **1** | **pan-cancer hrd prevalence** — tcga knijnenburg recap (n=14,199): ov 56%, brca ~47%, paad ~24%, mcrpc ~19%, nsclc ~10%; threshold line at "parpi already fda-approved" | "six tumor types already have an hrd population at scale — why scope to one?" |
| **2** | **hrd × ccr8 joint forest** — joint prevalence + within-cohort coupling, threshold lines at 5% and or=1 | "the biology is not ov-specific. it travels with hrd inside every eligible tumor type." |
| **3** | **mechanism replicability** — luo 2024's residual-eTreg framework reproduced on caushi nsclc, biokey breast, and ≥1 sc post-parpi non-ov if available | "the eTreg-surge mechanism luo described is reproducible outside hgsoc." |
| **4** | **responder-direction pan-cancer** — biokey expander 21.92 vs non-expander 19.48; caushi mpr vs non-mpr ccr8 delta; ≥1 other ici cohort | "baseline ccr8-eTreg-high tracks with response in non-ovarian disease, not just ov." |
| **5** | **per-stratum simon math** — null=15%, alt=35%, n per arm × real-world annual hrd-positive incidence per tumor type | "each basket stratum stands on its own as a simon two-stage." |
| **6** | **accrual: basket vs hgsoc-only** — projected months to full enrollment under three designs (proc-only, all-ov, pan-cancer basket); basket is *faster* | "hgsoc-only is slower, not safer. basket accrues in half the time." |
| **7** | **opportunity cost of hgsoc-only** — projected responders missed per year by restricting to ov; counterfactual responders in brca / paad / nsclc / mcrpc at the basket's assumed 35% orr | "restricting to hgsoc leaves n treatable responders/year on the table." |

the lead figure is the prevalence map, not the forest. when the **only** job is forcing the scope question, the prevalence map is the punch that does it before the reader can rationalize hgsoc-only. the forest plot is the lock-in, not the opener.

## the pipeline that builds the pdf

we own four layers; the seadragon orchestrator already owns the two beneath us.

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

snakemake fits because every rule has a clear input glob, per-cohort work is embarrassingly parallel, and `--profile lsf` integrates with seadragon natively. the directory tree is anchored at `code/pipeline/` with `Snakefile`, `rules/*.smk`, `scripts/*.py`, `config/cohorts.yaml`.

the qc discipline is the part that keeps the deliverable honest. **every figure rule has two outputs, not one** — `figN.png` and `figN_qc.tsv`. the qc sidecar lists, for every cohort: cells/patients pre-filter, post-filter, what was excluded and why. no figure compiles unless its qc sidecar clears a per-figure threshold (e.g., fig 2 needs ≥3 cohorts; fig 4 needs ≥2 responder cohorts). if anchors drift (luo 13.29%, biokey 4.33%, tcga ov 56%), the join rule errors loud rather than silently moving the numbers.

## the honest pivot

we drafted the snakefile and the per-patient axes rule, then went to wire layer 2's `hrd_per_patient` rule to the processed genomic files on disk. it did not survive contact with the filesystem.

```
find <DATA_ROOT> -path '*/processed/hrd*' -name '*.tsv'
→ D/tcga-pancancer-bulk-2026/processed/hrd/_tcga_hrd_high_low_split.tsv
→ C/jackson-2020-breast-imc/processed/hrd/hrd_scores.tsv
→ C/ali-danenberg-2020-metabric-imc/processed/hrd/hrd_scores.tsv
```

**three rows.** the only per-patient hrd scores we have are the tcga pan-cancer table (bulk; no sc pairing) and two imc cohorts (no sc pairing either). luo, caushi, biokey, pal — the sc cohorts that would carry the basket pitch — have no per-patient hrd output yet. the tier-1 master at `_master_intersection.tsv` was using tcga-proxy hrd-high% broadcast uniformly across every patient in those cohorts. that is why the tier-1 forest plot's right panel (within-cohort or) was artifactual — the or≈1 was not biology, it was construction.

> a 2×2 built from two cohort marginals under independence mechanically pins or≈1. any deviation you see is integer-rounding noise. this lesson is now saved in memory as `feedback_2x2_from_marginals_or_artifact.md`.

this matters for the pdf because **fig 2's right panel is load-bearing.** the joint-prevalence panel on the left shows co-presence — both compartments exist in the same tumor types. but the basket biology claim is stronger: the **same patient** has both. cohort marginals cannot show that. only patient-paired data can.

two paths to fix the gap:

| path | cost | timeline |
|---|---|---|
| **(a) run hrd-on-wes ourselves** — bwa-mem2 → mutect2 → sigprofiler → scarHRD on luo (wgs), caushi (wes), biokey (wes) | multi-day seadragon, ≥1 tb compute | a week |
| **(b) mine the paper supplementary tables** — most hrd-focused papers publish per-patient brca / hrd / sbs3 / glOH in supp s1/s2 | hours; subagents + webfetch | today |

we fired (b) this afternoon.

## the supplement-mining fan-out

three parallel subagents, two cohorts each, **no fallback paths and no mock data** (the cohort gets `false` if the column is not in the supp). each returns a tsv row with `paper_doi, supp_files_downloaded, has_per_pt_hrd_score, has_brca_status, has_sbs3, has_other_hrd_proxy, n_patients_in_supp, n_patients_with_hrd_axis, download_method, notes`.

| agent | cohorts | why we expect a hit |
|---|---|---|
| 1 | **luo 2024 nact-ov** (cell, 10.1016/j.cell.2024.06.013) + **bassez 2021 biokey** (nat med, 10.1038/s41591-021-01323-8) | luo paper is hrd-centric; biokey is 31 patients with brca/path typically in suppl. |
| 2 | **pal 2021 brca1-breast** (embo j, 10.15252/embj.2020107333) + **khaliq-sun 2024 pdac** (visium ffpe) | pal cohort is *defined* by brca1 carrier status — the genotype IS the deposit. khaliq is longer shot but pdac is brca-relevant. |
| 3 | **hwang 2022 pdac neoadj** (nat genet, 10.1038/s41588-022-01134-8) + **sade-feldman 2018 mel** (cell, 10.1016/j.cell.2018.10.038) | hwang has 43 pts with 8 treatment arms and pathologic response; sade-feldman has paired pre/post and per-patient r/nr labels. |

if any three of the six land per-patient brca or hrd status with ≥10 patients covered, layer 2 gets a `ingest_paper_supplements.smk` rule that normalizes them into the same `hrd_per_patient.tsv` schema, and fig 2's right panel becomes a **pooled per-patient spearman ρ across paired cohorts** — the load-bearing coupling evidence.

## what makes the pipeline correct before a real run

a pipeline that fails loud is cheap. a pipeline that fails silent is expensive. five gates are wired in before we burn the first bsub on the figure layer:

1. **`snakemake --dry-run`** — dag resolves without executing. catches missing rule wiring.
2. **`snakemake --dag | dot -tpng`** — visual dag audit; one glance confirms layers 2→5 are connected.
3. **anchor checks baked into layer 3 join scripts** — luo cohort-level prevalence must reproduce 13.29% within ±0.05; biokey 4.33%; tcga ov must reproduce 56% hrd-high. hard `assert`. the pipeline refuses to render fig 2 if anchors drift.
4. **toy subset run on 3 cohorts** (luo, caushi, biokey) end-to-end before scaling to 13. catches i/o + schema bugs without burning the queue.
5. **pdf preview at every stage** — `snakemake report` runs with whatever figures are ready; placeholder pages for missing figs show what's still pending so we never ship a half-baked pdf and call it done.

## one-day execution feasibility — honest

- **the pipeline itself, once written: yes, easily one day.** layers 2–5 are i/o-bound on already-processed data. 13 cohorts × ~2 min per axis × parallel = under 30 min for the full build.
- **drafting + validation iteration: not today.** tier-2 qc for 6 cohorts is still firing on seadragon (1–2h). ~18 more scripts to write (layer 3 + layer 4 + reportlab). figure-design iteration is always the slowest. supplement mining lands today; ingest rule lands tomorrow.
- **realistic timeline: pipeline drafted + dry-run-clean by end of today; first real pdf tomorrow evening.**

## what this post is really about

every project at this stage has the same temptation: keep adding cohorts, keep adding atlases, keep building the corpus. the work that flips a trial scope is the **opposite** of that. it is picking one question (hgsoc-only or basket?) and forcing every figure to push on it. the corpus we have already answers the question — we just have not arranged it into seven panels yet.

the next post will either land with three patient-paired cohorts and the real fig 2 scatter, or it will land with the honest cohort-marginal version and a footnote explaining what's pending. either way, the pdf ships this week.

## addendum — 18:30 ct: what actually landed

six hours after the morning post, the supplement-mining fan-out has resolved. final tally is much better than the morning prediction.

### fig 2 patient-paired pool — 7 cohorts × 6 tumor types, ~236 patients

| cohort | tumor | n | axis source |
|---|---|---|---|
| luo 2024 nact-ov | hgsoc | 34 | mmc1 table s1 — hrd/hrp + brca per patient |
| **vazquez-garcia 2022 msk-spectrum** | **hgsoc** | **42** | **moesm4 — continuous sbs3 + myriad gis + hrd-dup/del/fbi** |
| pal 2021 brca1-breast | brca | 52 | ev1+ev2 — brca1 carrier per patient |
| karaayvaz 2018 tnbc | tnbc | 5 | moesm1 supp t1 — brca1/2 germline |
| pelka 2021 crc | crc | ~60 | mmc1 sheet a — mmr-ihc + mmrstatus per patient (mutator-axis equivalent) |
| caushi 2021 nsclc | nsclc | 9 | moesm5+8 — hr-pathway gene hits (atm/bard1/palb2) |
| **kumar 2022 gastric (on-disk id `zhang-2022-gastric-tcell`)** | **stad** | **34** | **cd-21-0683 supp t1 — mmr + ebv + tcga subtype** |

the headline unlock is vazquez-garcia. msk-spectrum gives us **per-patient continuous sbs3 weight** for 40 wgs samples — the cleanest hrd axis in the pool. fig 2's right panel becomes a real scatter (sbs3 weight vs ccr8-eTreg fraction), not a box plot we had to apologize for in the morning. the other six are binary hrd or mutator-equivalent — pooled with vazquez they cover ~236 patients across six tumor types, which is genuinely basket-grade.

### fig 4 responder-direction pool — 6 cohorts × 6 tumor types

| cohort | tumor | response label | n |
|---|---|---|---|
| bassez 2021 biokey | brca | expander / non-expander | 31 |
| sade-feldman 2018 mel | skcm | r / nr | 32 |
| bi 2021 ccrcc | ccrcc | recist + icb-exposed cohort | 21 |
| simpson 2020 sclc-cdx | sclc | recist pr/pd/sd on 1l carboplatin | 31 |
| jerby-arnon 2018 mel valco2 | skcm | recist + pfs | 114 |
| maynard 2020 nsclc longitudinal | nsclc | tn/rd/pd timepoints | n=samples |

four of those six are new this afternoon. the basket pitch now has a real responder-direction panel; not just the biokey 21.92 vs 19.48 fact.

### the data-reality findings that didn't change

the morning hypothesis was that most papers would yield. that's only half-right. the **honest no-yields** today:

- **bassez biokey**: the study did **no wes at all**. e/ne + er/pr/her2 + ki67 + stils is what got published. paper-design limit, not retrieval failure.
- **hwang pdac**, **khaliq pdac**, **steele pdac (not on disk)**: pdac papers don't ship hrd-axis in supp. pdac coverage stays at cohort-level tcga-paad only.
- **liu hcc (the cohort_id `su-2025-hcc-snrna` is misnamed; actual first author is liu k)**: paper supp is figure legends + hbv status only. no hrd axis.
- **greenwald gbm**: only the gene-program metaprograms made it into supp; no patient table.
- **puram hnscc** and **tirosh skcm**: 12 mutation rows for puram (only 1 functional hrd-pathway hit total); tirosh tables are gene lists, not patient axes.
- **wu 2021 breast**: one free-text "brca2 mutation" mention; the rest is gated at egas00001005173.

three useful corrections from the supp-mining agents that should be folded back into the manifest later:

1. the manifest's `wang-2021-gastric-peritoneal` is actually **jiang h 2022, clin transl med** (10.1002/ctm2.730).
2. the manifest's `zhang-2022-gastric-tcell` is actually **kumar v 2022, cancer discovery** (10.1158/2159-8290.cd-21-0683).
3. the manifest's `su-2025-hcc-snrna` is actually **liu k 2025, mol clin oncol** (10.3892/mco.2025.2871). the "su" in the cohort id came from misreading a geo contact field.

### pipeline status — structurally drafted, dry-run pending

all four layers of the snakemake pipeline now have rule files and scripts on disk under `code/pipeline/`:

```
layer 2  per_patient_axes.smk         + 4 ingestion scripts (in flight)
layer 3  cross_cohort_joins.smk       + 4 join scripts  (done; anchor checks baked in)
layer 4  figures.smk                  + 7 figure scripts + clinical_assumptions.yaml  (done)
layer 5  report.smk                   + render_report.py (reportlab) + figure_captions.yaml  (done)
```

cohorts.yaml is refreshed with today's wins: vazquez/pal/karaayvaz/pelka/caushi/kumar are now `paired_axes: true`; bassez is corrected to `false` (we now know it has no wes axis); maynard and simpson are added as supp-only response-axis contributors.

next step is the layer 2 ingestion subagent (still running) plus `snakemake --dry-run` to confirm the dag resolves. then a toy run on 3 cohorts (luo + vazquez + pal) before scaling to seven. then the pdf.

### what didn't change

the morning thesis is still the thesis. seven figures, one pdf, one question. the basket pitch is the deliverable. what changed is the strength of the evidence — six tumor types in the patient-paired panel instead of "luo only, with apologies." the morning was about whether the figures *could* be built. the afternoon is about how strong they actually are.
