---
title: 'Pathology FMs: the family that''s actually shipping clinically'
date: '2026-05-18'
topics:
- foundation-model
- pathology
- clinical
summary: A landscape of the pathology foundation models that became the first biology FMs to land in real clinical product in 2025-2026 — UNI/UNI2-h, Virchow2, CHIEF, PathChat, CONCH/TITAN, Hibou, H-Optimus — plus the institutional moats, license politics, and the Owkin → Claude for Healthcare deployment.
starred: false
---

> *Companion landscape blog to the [foundation models state-of-play](foundation-models-state-of-play.md) — same family, deeper cut. Sibling landscape: [genomic + protein FMs](genomic-and-protein-fm-landscape.md). For the build mechanics see [how to build a biological FM](how-to-build-a-biological-fm.md); for clinical deployment see [clinical AI + agentic clinical](clinical-and-agentic-clinical.md).*

If you had to pick the single biology-FM family that shipped most clearly into clinical product in 2025-2026, it would be pathology. While single-cell FMs were busy losing benchmark wars to linear baselines ([catalog](evaluation-papers-catalog.md)), pathology FMs were quietly getting FDA-cleared modules deployed in hospital labs, embedded into Anthropic's Claude for Healthcare, and bundled into Mahmood-lab + Owkin pipelines that are now reading slides in production. This essay maps the institutional landscape, the model lineup, the deployment surface, and the license politics that determine which checkpoints you can actually use.

## The institutional landscape

Five players shape the field in 2026:

1. **Mahmood Lab (Brigham + Harvard)** — the academic powerhouse. Shipped UNI, UNI2-h, CONCH, TITAN, MUSK, and the PathChat conversational pathology agent. Strategy: open weights with research licenses, deep clinical-benchmark publication, train new MD/PhDs into the workflow. The single most-cited pathology FM lineage of 2024-2026.
2. **Owkin** — the federation play. 800-hospital network across Europe and the US gives Owkin a corpus no academic lab can match. Shipped H-Optimus and the Owkin Pathology Explorer agent that launched inside **Claude for Healthcare and Life Sciences** in January 2026. Strategy: federated learning + clinical deployment partnerships.
3. **Paige** — the commercial-first incumbent. Earliest FDA-cleared digital-pathology modules (prostate cancer detection, then breast). Shipped Virchow and Virchow2. Strategy: regulatory clearance first, then expand from prostate/breast to general digital pathology.
4. **HistAI** — the small-team disruptor. Shipped **Hibou** (Hibou-B, Hibou-L), the only top-tier pathology FM under Apache-2.0 license. Tiny team relative to Mahmood / Owkin / Paige; their wedge is license accessibility (see [small labs](small-labs-what-to-build.md), Wedge 4).
5. **Roche/Genentech, Tempus, NVIDIA, Bayer/Aignostics** — corporate adjacencies. Roche's Axelios platform integrates pathology FMs into the diagnostics pipeline; Tempus runs a pan-cancer multimodal pathology + genomic stack; NVIDIA's BioNeMo bundles pathology models for industry consumers.

The competitive structure: Mahmood publishes, Paige ships product, Owkin deploys via partnerships, HistAI undercuts on license, the corporates integrate everyone.

## The model lineup

| Model | Lab | Year | Params | License | Distinguishing trait |
|---|---|---|---|---|---|
| **UNI** | Mahmood | 2024 | ~300M (ViT-L) | research | The reference pathology FM; >100M tile pretraining |
| **UNI2-h** | Mahmood | 2024 | ~600M (ViT-H) | research, gated | Scaled UNI; current leaderboard topper for many tasks |
| **Virchow** | Paige | 2024 | ~630M (ViT-H) | gated | First major commercial pathology FM at scale |
| **Virchow2** | Paige | 2024 | ~630M | gated | 3.1M WSI pretraining; very strong on prostate/breast |
| **CHIEF** | Yu Lab (Harvard) | 2024 | ~600M | **AGPL-3.0** | Cancer-Histology Image Evaluation Foundation; broad clinical eval |
| **PathChat** | Mahmood | 2024 | LLM + UNI backbone | research | Conversational pathology agent — talk to a slide |
| **PathChat-2** | Mahmood | 2025 | bigger + multimodal | research | The 2025 update; integrates more modalities |
| **CONCH** | Mahmood | 2024 | CLIP-style (UNI + text) | research | Pathology-text contrastive; for image-text retrieval |
| **TITAN** | Mahmood | 2025 | slide-level (CONCH-backed) | research | Whole-slide-level FM; aggregates CONCH tile embeddings |
| **Hibou-B / -L** | HistAI | 2024 | ~85M / ~300M | **Apache-2.0** | The only permissive-license top-tier pathology FM |
| **H-Optimus-0 / -1** | Owkin | 2024-25 | ~1B / ~1.1B | research | Trained on Owkin's federated 800-hospital network |
| **MUSK** | Mahmood | 2024 | multimodal pathology | research | Mahmood's multimodal pathology backbone |

The technical convergence is striking: nearly all are **ViTs trained with DINOv2-style self-distillation** ([stage 4](stage-4-pretraining-objective.md)), differing mainly in corpus size and parameter count. The differentiation has moved upstream to the **aggregator** (CONCH → TITAN) and downstream to the **agent wrapper** (PathChat-2, Owkin Pathology Explorer).

## What's actually deployed in 2026

Three real-world deployments to know:

- **Owkin Pathology Explorer in Claude for Healthcare** (launched January 12, 2026 at JPM). Owkin's pathology FM is wrapped in an MCP-based agent that lets clinicians query slides via natural language inside Claude. This is the first major biology-FM deployment inside a general-purpose AI consumer product.
- **Paige's FDA-cleared modules** (Prostate, Breast, others). The de facto regulatory template — these modules read slides in actual US clinical labs and produce reports physicians sign.
- **Mahmood-lab pipelines at Brigham + DFCI**. UNI/UNI2-h + PathChat-2 + TITAN are running on retrospective and prospective slides at the Brigham; many of the Campanella et al. 2025 clinical evaluations went through this pipeline.

## The license politics

License is a moat, and pathology is where this matters most. UNI2-h and Virchow2 require gated access (login + license agreement); CHIEF is AGPL-3.0 (commercial use restricted); H-Optimus is research-only. **Hibou's Apache-2.0 release is the only top-tier pathology FM you can drop into a commercial product without a lawyer**, which is the reason HistAI gets disproportionate adoption among startups and academic groups doing translational work. The general lesson for small teams: the SOTA is often locked behind a license you can't ship through; a slightly-behind-SOTA model with a clean license can be the right tool.

## How they're evaluated in 2026

The [Campanella et al. 2025 clinical benchmark](evaluation-papers-catalog.md) is now the field's standard scorecard, alongside HEST-1k, BACH, CRC polyp, and TCGA-derived task suites. UNI2-h, Virchow2, and H-Optimus are within a few percentage points on most clinical tasks; the gap to second-tier models (UNI v1, Hibou-L) is real but modest. The differentiation has moved past raw accuracy to **license, deployment surface, agent wrapper, and slide-level aggregation quality**.

## What's coming in 2026-2027

Three directions to watch:

- **Multimodal pathology** — pairing H&E with IHC, spatial-omics ([HEX](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/)), molecular data, and EHR. PathChat-2 and MUSK are early signals.
- **Slide-level agents** — TITAN-style slide-aggregation + LLM agent wrappers + tool-use (zoom, compare regions, summarize). Owkin Pathology Explorer is the first real product example.
- **Regulatory acceleration** — Paige's pattern (FDA-clear narrow modules first, expand) is being adopted by Owkin and Tempus; expect 5-10 new FDA-cleared pathology AI modules in 2026-2027.

## Small-team angle

If you have one pathology subspecialty and ~50k WSIs from one institution, the highest-leverage build in 2026 is **a Hibou-style continual-pretraining checkpoint** ([Wedge 3](small-labs-what-to-build.md)) for that subspecialty, distributed Apache-2.0, with a working PathChat-2-style agent wrapper. The big labs are racing to be general; the wedge is depth + clean license + deployment-ready agent. The single starred 2026 paper to internalize: HEX (virtual spatial proteomics from H&E) — it shows what an integrated pathology + spatial + clinical workflow looks like once the pieces are wired together.

Pathology is the FM family that grew up first. Watch the other families learn from its template.
