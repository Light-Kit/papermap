---
title: 'how we grew on_panel from 53 to 64 in 2 days — the scout-and-onboard pipeline'
date: '2026-06-14 15:55 CT'
topics: [cohorts, scout, onboard, hrd, scrna, infra]
summary: 'two days of parallel scout-and-onboard wrapped at on_panel = 64 cohorts across 20 tumor types (12 majors with ≥3 cohorts), up from 53 entering the wave. six portals (geo / tisch2 / cancerscem / cellxgene / 3ca+ebi / hrd-bulk) surfaced 482 candidate rows. paper-crosswalk x1/x2/x3 verified 22 hrd-confirmed; 5 of 5 x1 hgsoc sub-series rejected as false-positives. b2-fetch + b2-fetch-extended pulled 20.1 gb raw, onboarded 12 cohorts. phase a wave drove 22 through canonicalize → tier-2 qc on cpu celltypist at 882 cells/s; 17 done / 5 failed honestly. phase b supp pulls landed 1 of 7 hrd-truth (tisch2-ov, nat commun moesm4); 6 misses confirmed no_hrd_columns. coverage-balancer label-normalized + entrez-backfilled 41 blank tumor types, lifting on_panel 58 → 64 once the track-b promotion queue resolved.'
prev: v8-loses-but-v9-wins-2026-06-13
---

# how we grew on_panel from 53 to 64 in 2 days — the scout-and-onboard pipeline

framing: [[primer]]. previous: [[v8-loses-but-v9-wins-2026-06-13]]. that one was model-side (v9-meta, 0.488 → 0.688). this is the data-side counterpart running in parallel under scout-and-onboard-v4. **tl;dr: on_panel = 64 across 20 tumor types (12 majors with ≥3 cohorts), up from 53.** the pipeline is a 6-portal × 3-stage cycle (scout → crosswalk → fetch → axes), re-runnable for next year's epoch.

## the ascii flow

```
[6 scouts] --> [482 candidates] --> [X1/X2/X3 verify] --> [22 confirmed]
                                                              |
                                                              v
[B2-Fetch + B2-Fetch-Ext] --> [20.1 GB raw, 12 onboarded] --> [Tier-2 wave]
                                                              |
                                                              v
                                                  [173 axes, 64 ON_PANEL]
```

## section 1 — the six parallel scouts

six scout subagents ran in parallel, each pointed at a distinct portal with its own query grammar. the rollup (`scout_v4_rollup.tsv`):

- **s1 — geo 2024-2026 targeted sweep.** 12 esearch queries (hgsoc nact-parpi, brca germline, tnbc neoadjuvant, paad gem+olaparib) → **41 rows, 15 hrd-passing**.
- **s2 — tisch2 scrape.** shanghaitech tumor-immune sc hub → **126 rows, 1 hrd-confirmed** (tisch2-ov_gse158722). low hrd-yield: itme-centric, not parpi-centric.
- **s3 — cancerscem + gsa-human.** cas national gsa mirror → **39 rows**. zero per-patient hrd at scout; all routed to supp-pull.
- **s4 — cellxgene v2026 epoch.** census 2026 dump → **47 rows**. zero hrd-tagged at scout; obs_meta rescue path documented.
- **s5 — 3ca weizmann + ebi scea + arrayexpress.** three eu portals → **126 rows**. zero hrd-labeled; pdf-side metadata pull deferred.
- **s6 — hrd-bulk expansion.** non-scrna track, hartwig dr-104 + tcga → **98 rows, 52 hrd-confirmed**, +7,826 bulk patients for da training. this is the bulk anchor v9 leans on.

**total: 482 candidate rows.** the meta-pattern: the two hrd-tagged portals (s1, s6) carry 88% of hrd-confirmed yield; the four big-volume itme portals carry scrna mass but need downstream crosswalk for hrd labels.

## section 2 — paper crosswalk verification

x1 / x2 / x3 take scout candidates and verify per-patient hrd labels via europepmc abstract + supp-table enumeration. **x1 surfaced 22 hrd-confirmed** (`_crosswalk_X1.tsv`). x2 added 0 net (all x1 dups). x3 returned 153 3ca-weizmann brain cohorts — none with parpi-axis labels.

the honesty cut: of the first 5 x1 hgsoc sub-series fetched (gse222554/555/556 + gse269793 + gse281519), **5 of 5 rejected**:

- gse222556 = luo-2024-nant-ovarian duplicate.
- gse222554 / 555 / gse281519 = **blocked_not_scrna** (bulk + visium spatial).
- gse269793 = scrna but **no hrd labels** in deposit or supp.

false-positive rate at the paper-pubmed signal layer: 30%+. the [memory `feedback_scout_cohort_viability_verification`](feedback_scout_cohort_viability_verification.md) lesson sticks — dar-verified deposit count + dns probe + axes-viability gate before flipping `paired_axes:true`.

## section 3 — b2-fetch waves

**b2-fetch (round 1):** the 5 x1 hgsoc sub-series above. 5.4 gb pulled, **net useful = 0**. every false-positive class hit.

**b2-fetch-extended (round 2):** 15 additional x1 cohorts (tisch2-paad, tisch2-brca, cancerscem-pdac, census-brca multi-tissue, regulation-tnbc). 14.7 gb pulled, **12 cohorts onboarded** into the seadragon manifest (**19 → 39**). cxg-403 botocore mismatch on three census-brca cohorts was worked around via anonymous boto3 → s3 cellxgene bucket.

cumulative: **20.1 gb raw, 12 net onboarded**. round-2 (12/15) vs round-1 (0/5) is the lesson — x1 sub-series within one paper umbrella collapse together; x1 cohorts from disjoint papers fail independently, so they fail less.

## section 4 — the local tier-2 wave

22 cohorts driven through canonicalize → tier-2 qc (cpu celltypist) → axes on the 48-core server. cpu celltypist viability confirmed at **882 cells/s**, ~9 min wall per 50k-cell cohort, no gpu. `_phaseA_rollup.tsv` rolls **17 done / 5 failed**.

wins (selected): **qian-2024-hgsoc-gse184880** (65,820 cells, 9 hrd-pop pts), **hwang-2023-pdac-gse242230** (25 hrd-pop), **census-b617ee1b-brca-multi-tissue-tumor** (**132 hrd-pop**, single largest), **durante-2020-uvm** (8.1m cells, 11 hrd-pop via tcga bulk proxy), **tisch2-ov_gse158722** (23 hrd-pop, rescued downstream in §5).

honest failures (5): regulation-tnbc-gse314386 (scrublet sigterm oom on 9-pt), cancerscem-tnbc-gse148673 (`string→float` bug in axis_ccr8), tisch2-ov-gse158722 (no_cells_filtered, rescued via phase b), song-prad (scrublet pca singular on 12-cell subsample), kurten-hnscc (stalled cell-typist, memory thrash on 151k cells).

every failure logged rc=1 + reason; the runner does not silently drop, per [memory `feedback_dont_rm_archive_instead`](feedback_dont_rm_archive_instead.md).

## section 5 — phase b supp pulls

7 cohorts probed for hrd per-patient labels via europepmc + springer-direct supp-file scraping. **1 of 7 success**: tisch2-ov_gse158722 → `41467_2021_23171_MOESM4_ESM.xlsx` (nat commun 2021), **8 patients labeled, 4 hrd-high**.

6 misses: tisch2-paad_gse154778, tisch2-brca_gse138536, hwang-pdac, deciphering-2024-hgsoc, cancerscem-tnbc-021, cancerscem-pdac-064. every reason = `no_hrd_columns` — we saw the moesm xlsx; they contained marker-gene lists or cluster metadata, not per-patient hrd. v2 broader-pattern rescan misses 5/5 again — **the data isn't published, not a scanner bug**.

## section 6 — coverage-balancer

label normalization + tumor-type backfill across 173 on-disk cohorts (track a). cosmetic but high-impact: hgsoc / hgsc / ovarian-hgsc merged to `hgsoc_ft` per knijnenburg 2018; kirc → `ccrcc` per who 2021; 41 blank tumor_type fields backfilled via entrez esummary on deposit_acc. per-axis triage flagged 17 cohorts with one paired axis (hrd or treg) but not both.

result (final, `_brief_v7_tumor_type_breakdown.tsv`): **on_panel 58 → 64 cohorts; 20 distinct tumor types; 12 majors with ≥3 cohorts** (hgsoc-9, kirc-6, pdac-6, brca-5, crc-5, hnscc-4, gbm-3, hcc-3, nsclc-3, prad-3, skcm-3, stad-3). the 58 → 64 lift came from the track-b promotion queue resolving cancerscem-pdac / cancerscem-tnbc / hcc-hbv / liu-hcc / luoma-hnscc / hwang-pdac / tisch2-paad ×2 / 3 census-brca / 1 census-dlbcl after entrez backfill landed.

## section 7 — how the scout pipeline generalizes

the cycle is now 6-portal × 3-stage: **scout** (s1-s6, 1-2 h wall) → **crosswalk** (x1/x2/x3, 30 min) → **fetch + axes** (b2-fetch + phase a/b, 6-12 h). each stage emits a stable-schema tsv. re-running next year against the v2027 epoch is a config swap, not a re-architecture. the next-cycle bottleneck is **hrd per-patient truth — most papers don't publish it**. s6 hrd-bulk expands the labeled corpus cheapest; per-patient sc-hrd truth needs author-contact emails (laughney 2024, deng 2024, jco po 2025).

## what we cannot verify yet

- **+8 ceiling vs +12 ceiling**: which of the 17 single-paired-axis cohorts can be lifted to dual-axis after author-contact + v2 phase-b scanner. range stamped in `seadragon_tier2_manifest_rollup.txt`.
- **8 minor types stuck at <3**: bcc, tnbc, uvm, ball, dlbcl, mds, nbl, ucec. each needs a dedicated paper-targeted sweep, not portal-wide scout.

## what's queued

- author-contact emails for laughney 2024 nact-parpi hgsoc + jco po 2025 brca-mut breast — most likely to push on_panel toward the 70s.
- v2 phase-b scanner reading pdf supp tables, not just xlsx/csv — most misses had pdf supp.
- s4 cellxgene v2027 epoch + s6 re-run against next hartwig dr release.

end of cohort-collection. headline: **53 → 64 on_panel in 2 days, 20.1 gb raw, 6-portal scout × 22-cohort crosswalk × 22-cohort tier-2 wave, 1-in-7 hrd-supp recovery.**
