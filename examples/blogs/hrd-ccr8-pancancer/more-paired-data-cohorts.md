---
title: 'more paired-data cohorts — what the second sweep turned up'
date: '2026-06-03 14:57 CT'
topics:
  - hrd
  - pan-cancer
  - tumor-microenvironment
  - paired-data
  - dataset-strategy
summary: 'a follow-up pass over the five-tier paired-data map — cohorts the first sweep missed (POG570, Pelka, Erickson + WGS, PETREMAC, Owkin MOSAIC, HTAN sub-atlases), per tier, with one line on why each matters.'
starred: true
---

# more paired-data cohorts

[[paired-data-pan-cancer]] was written from working memory. A second sweep was warranted — partly to catch cohorts that fell out of recall, partly because at least one name in that blog (POG570) is in the text but **not in the corpus**. This note is the result of that second pass, organized along the same five tiers.

The framing didn't change. Tier 1 still gets statistical power, Tier 4 still grounds, Tier 5 still tests causality. What changed is that each tier now has *specific* cohorts to name instead of "and others."

## the POG570 correction

The first blog lists POG570 (Pleasance 2020, Nature Cancer) alongside TCGA / HMF / PCAWG / CPTAC. The vault has `priestley-2019` for HMF, but no POG entry. POG570 is the only public WGS+RNA cohort with **explicit prior-therapy annotation** — including platinum and PARPi — which makes it the right place to ask "what does a treated HRD genome look like." That's the single most consequential gap of this round.

## Tier 1 — high-N WGS/WES + bulk RNA + clinical

| dataset | what it adds | size |
| --- | --- | --- |
| **POG570** (Pleasance 2020) | only WGS+RNA cohort with pre-biopsy therapy annotation | 570 |
| **MET500** (Robinson 2017) | US metastatic pan-cancer WES+RNA — closest US analog to HMF | 500 |
| **Genomics England 100k Cancer** (Sosinsky 2024) | NHS WGS + real-world outcomes; approaches MSK-CHORD scale on the WGS side | 13,880 |
| **DKTK MASTER** (Horak 2021) | European HMF analog, heavy rare-tumor coverage (sarcoma, NETs, CUP) | 1,310 |
| **SU2C-PCF mCRPC** (Abida 2019) | highest-HRD-prevalence non-breast/ovary cohort with WES+RNA + PARPi-relevant treatment | ~400 |

What's noticeable: between POG570 (post-therapy WGS), MASTER (rare tumors), 100k (UK real-world outcomes), and SU2C-PCF (PARPi-context prostate), Tier 1 now covers **populations that TCGA structurally underrepresents** — metastatic, treated, rare, ancestry-diverse.

## Tier 2 — sc + paired WGS/WES on same patient

| dataset | what it adds | size |
| --- | --- | --- |
| **Pelka 2021 CRC** (Broad/Hacohen/Regev) | largest paired sc+WES CRC; MMRd-vs-MMRp is the hypermutator sister of HRD | 62 pts / ~371k cells |
| **Kim 2018 TNBC chemoresist** (Navin) | TNBC neoadjuvant longitudinal scDNA + scRNA + WES — chemo × clonal evolution × HRD context | 20 pts |
| **Maynard 2020 NSCLC** (Bivona) | pre / residual / progression sc+WES — canonical Tier-2 longitudinal design template | 30 pts |
| **Neftel 2019 GBM** (Suvà) | explicit amp/mutation → cell-state mapping | 28 pts |
| **Karaayvaz 2018 TNBC** | rare paired sc+WES TNBC directly in HRD territory | 6 pts |

Pelka is the standout. The MMRd story it tells (MSI-driven immune hub formation) is exactly the *template* we need for HRD: "a genome-level scar drives a TME-level reorganization, visible at single-cell resolution." That template port is the cleanest Tier-2 use we can make of it. Nice-to-have additions for cross-tissue breadth: Lee 2020 CRC, Puram 2017 HNSCC, Tirosh 2016 mel, Jerby-Arnon 2018 mel, Kim 2020 NSCLC met, Stewart 2020 SCLC, Wang 2021 gastric.

## Tier 3 — spatial + paired WGS/WES on same patient

| dataset | spatial modality | size | what it adds |
| --- | --- | --- | --- |
| **Erickson 2022 prostate** | Visium | 11 pts | the cleanest published WGS ↔ Visium pairing with spot-level CNA inference. **The Tier-3 template.** |
| **Ravi 2022 GBM** | Visium + IMC + MALDI + WES | 28 pts | spot-level CNA-inference methods directly transferable to HGSOC |
| **Jackson 2020 breast IMC** | IMC, 37-plex | 281 pts | largest IMC breast cohort with METABRIC-linkable WES/CNA (HRD scores derivable) |
| **Risom 2022 DCIS MIBI** | MIBI, 37-plex | ~122 pts | pre-invasive control for any spatial-HRD claim, in HTAN-Stanford |
| **Wu 2025 HGSOC Visium HD** | Visium HD | ~30 pts | direct successor to `stur-2022-visium`; **preprint, flag** |

One re-tagging fix: `wu-2021-breast` is in the vault as scRNA-only, but the Wu 2021 Nat Genet paper has a Visium component on 6 of the 26 patients. Re-tag to include spatial-transcriptomics so it doesn't get missed when filtering for Tier 3.

## Tier 4 — full tuple on same patient

HTAN is bigger than HTAPP + HMS-Ovarian. The vault has those two; the network has at least nine other Phase-1 sub-atlases worth knowing about, plus a handful of Phase-2 centers funded 2024 whose data is ramping. The five-most-relevant:

| HTAN sub-atlas | who | scope |
| --- | --- | --- |
| **HTA12 WUSTL** (Ding/Fields/Gillanders) | scRNA + snATAC + WGS + Visium + CODEX + CyCIF; PDAC + breast + MM | largest multi-tumor Tier-4 single-center |
| **HTA11 Vanderbilt CRC** (Coffey/Lau) | adenoma → CRC | Pelka 2021 data + Phase-2 continuation |
| **HTA5 DFCI Resistance** (Johnson/Regev) | on/post-treatment NSCLC + mel + breast | Tier 4 ↔ Tier 5 bridge — directly relevant to PARPi + anti-CCR8 context |
| **HTA8 MSKCC Metastasis** (Pe'er/Iacobuzio-Donahue) | primary → met pairs | rare paired primary/met Tier-4 |
| **HTA208 MOSAIC-Ov3D** (MDACC) | second HGSOC Tier-4 cohort | independent of MSK-SPECTRUM and HMS — replication |

Outside HTAN, the one to know is **Owkin MOSAIC** — a $50M, ~2,500-collected, 7-cancer multi-modal cohort (Visium + Chromium Flex snRNA + bulk RNA + WES + H&E). The first 60 samples are released as MOSAIC-Window on EGA. Caveat: WES not WGS, which limits HRD-signature resolution. This is the largest **non-NCI** Tier-4 cancer atlas in existence, and the comparator any project at this scope has to position against.

ASTRA (Garvan + U-Tokyo + 10x, launched Nov 2025) and HTAN Phase-2 centers (HTA200–HTA209) are aspirational — note their existence; come back when data is actually released.

## Tier 5 — treatment-exposed multi-modal

The IO side picks up the canonical melanoma+bladder cohorts that didn't make the first cut:

| cohort | trial / context | what it adds |
| --- | --- | --- |
| **Riaz 2017 CM-038** | nivo melanoma | one of the few public paired pre/on WES+RNA+TCR cohorts |
| **Gide 2019** | mono vs combo IO Australian melanoma | mono-vs-combo stratification, widely used external test set |
| **Powles 2019 ABACUS** | neoadj atezo bladder | paired pre/post neoadj IO with pCR — gold-standard design |
| **Cascone 2021 NEOSTAR** | neoadj nivo +/- ipi NSCLC | paired pre/post NSCLC IO with MPR |
| **INSPIRE basket** (Princess Margaret) | pembro basket: HNSCC / TNBC / HGSOC / mel | paired pre/on WES+RNA in TNBC + HGSOC baskets — **HRD-adjacent** |

The PARPi side is more sobering. Most PARPi pivotals (SOLO-1, PRIMA, OlympiA, VELIA, DUO-O, ATHENA-MONO/COMBO) are sponsor-controlled — raw multi-modal data isn't accessible. They still matter for positioning. The exception is **PETREMAC** (Eikesdal 2021, Bergen): a rare **paired pre/post PARPi monotherapy multi-omic cohort in BRCAwt TNBC**, with RAD51 IF + BRCA1 methylation + PAM50 + TILs. Small N (32) but directly HRD-relevant — the only public dataset that probes "what does olaparib do to a BRCAwt TNBC tumor and its TME, on the same patient."

The closest published analog to the HRD-CCR8+PARPi trial concept this project is built around is **DUO-O** (Harter 2025) — durvalumab + olaparib + bev as 1L ovarian, with myChoice HRD stratification primary endpoint. Sponsor-controlled, so we can't train on it, but it tells us the trial-design landscape we'd be entering.

## what this changes

Not the framing — the five-tier bridge is unchanged. What changes is that each tier now has specific cohorts to point to:

- Tier 1 detects signal — TCGA + HMF + **POG570** + **100k Genomes** + **MASTER** + **SU2C-PCF**
- Tier 2 localizes — Vázquez-García + Bassez + **Pelka** + **Kim TNBC** + **Maynard** + **Neftel**
- Tier 3 organizes — Launonen + Stur + **Erickson** + **Ravi** + **Jackson IMC** + **Risom DCIS**
- Tier 4 grounds — HTAPP + HMS-Ovarian + **WUSTL HTA12** + **Vanderbilt HTA11** + **DFCI HTA5** + **MSKCC HTA8** + **MOSAIC-Ov3D HTA208** + **Owkin MOSAIC**
- Tier 5 tests causality — BIOKEY + IMvigor210 + TOPARP + **PETREMAC** + **Riaz** + **ABACUS** + **NEOSTAR** + **INSPIRE** + the PARPi pivotal set as positioning anchors

The bridge between tiers — Tier 1 at scale, Tier 2–3 at resolution, Tier 4 as grounding, Tier 5 as causality — is what [[one-model-many-archetypes]] was already shaped for. The cohorts above just give that shape specific addresses.

## what this leaves open

Two things this sweep did *not* answer:

1. **Who else is asking this question.** That's the next blog — [[who-else-is-doing-this]]. The paired-data map says what exists; it doesn't say who else is using it.
2. **What we'd actually add to the vault.** Not all of these belong in the corpus — some are positioning, some are aspirational. The short answer: POG570 first, then the five "similar research" items in [[who-else-is-doing-this]], then PETREMAC, then HTAN sub-atlases as a batch. The triage is its own conversation.
