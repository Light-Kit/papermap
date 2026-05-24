---
title: 'The talk meets the floor — checking the causal-ladder deck against the 2026 conferences'
date: '2026-05-22'
topics:
- conferences
- aacr-2026
- iclr-2026
- virtual-cell
- foundation-model
- causal-ladder
summary: "A self-check: I took my own 'Virtual Cell — A Perspective from the Causal Ladder' deck, rung by rung, and asked the 2026 conference record the same question of each claim — does AACR 2026 (and the ML venues) confirm it, extend it, or quietly leave it on the stage? The headline: the causal ladder turns out to be a venue map. The bottom rungs have aged into mere comparators, the reckoning is now the load-bearing critique of the whole field, and the top rung the deck leaves empty is empty on the floor too — nobody is shipping it."
starred: false
---

> *A companion to the talk **"Virtual Cell: A Perspective from the Causal Ladder"** (Presentations tab). This is not another conference digest — the [AACR 2026 digest](aacr-2026-digest.md) and the [beyond-AACR round-up](aacr-and-other-conferences-2026-virtual-cells.md) already do that. This page runs the other direction: it walks **my own deck**, rung by rung, and asks the conference floor whether each claim held up. Read it next to the [timeline & lineage map](five-questions-timeline-and-lineage.md) and the [data + architecture table](fm-data-and-architecture.md).*

I gave a talk that arranges the virtual-cell field on Pearl's ladder of causality — describe, correlate, intervene, predict, counterfactual — and argues that the field is bunched on the low rungs, that a "reckoning" (linear models matching foundation models) is the hinge of 2026, and that nothing yet reaches the top rung. Then two conferences happened back to back: **AACR 2026** (Apr 17–22, San Diego) and **ICLR 2026** (Apr 23–27). So I did the obvious thing — I checked the deck against them.

The result is cleaner than I expected. **The ladder is also a venue map.** Where a piece of work sits on the causal ladder predicts *which conference it shows up at* and *in what form* — headline talk, lagging poster, or workshop-stage gamble. Here is the whole thing in one table, then the rung-by-rung walk.

## The deck vs. the floor, in one table

| Deck section (rung) | What the deck claims | Conference verdict | Where it actually showed up |
|---|---|---|---|
| **1st-gen FMs** — Geneformer, scGPT, scFoundation, UCE (describe / correlate) | "An era of blooming"; the field clustered on rungs 1–2 | **Confirmed, but aged** | At AACR these names appear in **zero poster titles** — only as comparators inside abstract bodies. ICLR's SC-Arena benchmarks them and finds them weak on causal tasks. |
| **The reckoning** — does FM beat a linear model? signal or noise? | The critical hinge of the field | **Strongly confirmed — now the load-bearing critique** | Ahlmann-Eltze & Huber (*Nat Methods* 2025) shadows **every** ICLR perturbation paper; scPerturBench replicates it; the AACR landscape audit cites it explicitly. |
| **2nd-gen datasets** — Tahoe-100M, X-Atlas, 10M chem-perturb | The new substrate | **Confirmed — Tahoe-100M is everywhere** | Named as the training/eval substrate across ICLR pages and AACR; the "cancer/drug-focused" framing matches AACR's audience exactly. |
| **2nd-gen FMs** — STATE, Tahoe-x1 (perturbation predictors) | The intervene rung | **Confirmed on stage, thin in posters** | STATE is ICLR's production-scale anchor. But AACR's perturbation-prediction family is one of the **thinnest** — 6 of 48 posters — relative to the hype. |
| **Distribution-matching** — diffusion + optimal transport, flow matching | An "add-on" toward prediction | **Stage-only / wrong venue** | Yeung-Levy's CellFlux (flow matching) headlined AACR ED03 — yet **zero** AACR posters use flow matching. It lives at ICLR/NeurIPS, not the poster hall. |
| **Other Voices #1** — needs context, not just scale | A caveat | **Confirmed, and bigger than the deck says** | Bunne's multimodal "virtual patient" *was* the AACR ED03 framing talk; multimodal fusion is the **largest** AACR poster family (8 of 48). |
| **Other Voices #2** — non-transformer (xVERSE) | Claims to beat transformers, peer review pending | **Not on any floor yet** | Zero hits across all conference vaults — it's a 2026 preprint that hasn't reached a meeting. |
| **Closing the loop / Stage 3** — VC + LLM + robotics, the counterfactual predictor | The future stage | **Attempted only at workshop stage** | Lewis & Zueco, *"Toward Generative Virtual Cells"* (ICLR Gen² workshop) — world model + planner, jointly adapted. Bunne's "EchoK" active acquisition is stage-only; **zero** AACR posters implement it. |
| **The top rung** — true counterfactual | "Still unclimbed" | **Confirmed empty** | AACR ships almost nothing on evaluation/verification (3 of 48 posters); the gap on the floor *is* the empty rung the deck's honest map already shows. |

## Rung by rung

### Rungs 1–2 (the 1st-gen FMs): right, and already historical

The deck spends its early slides on Geneformer, scGPT, scFoundation, scBERT, UCE, CellPLM, Nicheformer, TranscriptFormer — the "blooming" era. The floor confirms the framing and then twists the knife: at AACR 2026, **scGPT, Geneformer, and Universal Cell Embeddings do not appear in a single poster title.** They survive only as comparators buried in abstract bodies (e.g., the scCAP annotation poster, the bulk-RNA benchmarking poster). The headline encoders of 2023 have become the baselines of 2026 — which is exactly what "the field clustered on rungs 1–2 and then moved on" should look like once it's true.

ICLR sharpens it from the methods side: **SC-Arena** (a natural-language reasoning benchmark for single-cell models) runs scGPT / Geneformer / UCE / CellFM through five tasks and reports *"uneven performance on biologically complex tasks, particularly those demanding mechanistic or causal understanding."* That is the ladder's whole thesis stated as a benchmark result.

### The reckoning: the single most-confirmed slide in the deck

The deck's "does VC FM beat a linear model?" slides turn out to be the load-bearing critique of the entire 2026 record. **Ahlmann-Eltze & Huber (*Nature Methods* 2025)** — the finding that scGPT, UCE, scBERT, GEARS, and scFoundation don't reliably beat a *mean-of-training-perturbations* baseline — is cited as the mandatory caveat in *every* ICLR perturbation page I read (the Genentech adapter paper, SC-Arena, the generative-virtual-cells paper). **scPerturBench** independently replicates it, and a separate **mode-collapse critique** (predictions barely vary across perturbations) piles on. If you wanted one slide from the deck to keep unchanged, this is it. (More in [why linear baselines win](why-linear-baselines-win.md).)

### Rungs 3–4 (2nd-gen): the substrate is everywhere, the predictors are thinner than the hype

**Tahoe-100M** is the most-cited dataset on the floor — the training and evaluation substrate that nearly every 2026 perturbation paper either uses or apologizes for not using. Its cancer/drug focus lands perfectly for AACR. **STATE** (Arc) is the production-scale anchor that ICLR papers position themselves against. So the deck's "2nd generation = perturbation predictors on new perturbation data" is correct.

But here is a wrinkle worth a footnote on stage: relative to the volume of talk, the **perturbation-prediction poster family at AACR is one of the smallest** (6 of 48 in the virtual-cells slice; only two posters even use the phrase "virtual cell"/"virtual lab" in their titles). The field is talking about perturbation prediction far more than it is shipping it at the largest cancer meeting in the world. That is itself a finding the deck could name.

### Distribution-matching (diffusion + OT): a stage act, not a poster

The deck gives diffusion and optimal transport their own "add-ons" rung (Diffusion 2020 → DiT 2023 → Flow Matching 2023 → OT-CFM 2023, then CellFlow/CellFlux in cells). On the floor this is the starkest stage-vs-poster split of all: **Serena Yeung-Levy headlined AACR ED03 with CellFlux** — flow matching to map control→perturbed cell populations, scaled to 11.6M images — yet **not one of the 48 AACR posters uses flow matching, velocity fields, or ODE-based generation.** The primitive the deck (correctly) puts on the prediction rung is, at AACR, entirely a podium phenomenon. It lives at ICLR and (come December) NeurIPS. The deck is right about the method; it should be explicit that this method has no poster-hall presence at a cancer meeting yet.

### Other Voices: context confirmed, the loop is workshop-stage, xVERSE is invisible

- **#1 "needs context, not just scale"** is *more* central than the deck implies. Charlotte Bunne's multimodal **virtual-patient** FM — joint H&E + spatial proteomics across 33 clinical studies — was the framing talk of the whole ED03 session, and multimodal fusion is the **biggest** AACR poster family (8 posters). The deck treats "context" as a dissenting voice; on the AACR floor it's the main stage.
- **#5 "closing the loop" / Stage 3** has exactly one real instantiation, and it's a *workshop* paper: Lewis & Zueco's **"Toward Generative Virtual Cells"** (ICLR Gen²) proposes a world-model + experiment-planner co-evolved under validation gating — the deck's "VC + LLM + robotics" loop, minus the robotics, explicitly speculative. Bunne's "EchoK" active-acquisition idea is the same bet from the AACR stage, with **zero** poster analogues. The loop is being *argued*, not *shipped*.
- **#2 non-transformer (xVERSE)** returns **no hits anywhere** in the conference corpus. It's a 2026 preprint that hasn't reached a meeting; on stage, flag it as a preprint claim, not a conference result.

### The top rung: empty on the deck, empty on the floor

The deck's most defensible design choice — leaving rung 5 (true counterfactual) unclimbed, with the OT/causal tools merely "reaching toward" it — is corroborated hard. The AACR synthesis of ED03-vs-corpus found that across Bunne, Yeung-Levy, and Moor, **~40% of stage time went to evaluation, benchmarking, and verification — and the poster hall shipped essentially nothing on that axis** (3 of 48 posters touch evaluation; 1 touches agentic autonomy; none do both). The capability that would let you *know* you'd reached the counterfactual rung — verified, benchmarked, identified — is the exact thing nobody is building. The empty rung isn't pessimism; it's the floor.

## What the floor adds that the deck understates

Three things the conferences make visible that the current deck doesn't quite say:

1. **Evaluation is now its own subfield.** The deck has the reckoning (the *critique*) but not the *response* to it: SC-Arena, scPerturBench, Open Problems, the mode-collapse work. 2026's most interesting move isn't a bigger model — it's the scramble to build a scorecard that distinguishes mechanism from pattern-matching. That deserves a slide.
2. **The venue effect is real and predictive.** Benchmarks, flow matching, and process-reward agents land at ICLR/NeurIPS/ICML, *not* AACR — the AACR synthesis says the stage leaders are 18–24 months ahead of the median poster on exactly these axes. The ladder predicts the venue: low rungs → legacy papers and *Nature Methods* critiques; middle rungs → AACR posters (lagging); top rungs → ML-workshop gambles. That's a genuinely useful framing to hand an audience.
3. **"Virtual cell" vs. "virtual patient."** For a cancer audience, the AACR-native framing is Bunne's *virtual patient* — multimodal, clinical, spatial-proteomics-anchored — not the molecular-transcriptomic *virtual cell* the deck centers. The deck is correct for an ML/single-cell room; for an AACR room, it needs a bridge slide from cell to patient.

## Verdict: did the talk hold up?

Mostly yes, and in the places that matter most. The **1st→2nd-generation split**, the **reckoning as the hinge**, **Tahoe/STATE as the second-gen substrate-and-model**, and the **honestly empty top rung** all survive contact with the conference floor — several of them more strongly than I'd hedged on stage. The corrections are additive, not structural: name the **evaluation subfield**, flag **flow matching and the closed loop as stage/workshop-only** (not yet poster-real), mark **xVERSE as a preprint claim**, and add a **cell→patient bridge** for cancer audiences.

The one reframe I'll actually steal for the next version: *the ladder is a venue map.* Tell the audience where a result lives — Nature Methods critique, AACR poster, or ICLR workshop — and you've told them which rung it's really on.

---

*Sources: AACR 2026 ED03 session transcript + the 48-poster virtual-cells landscape and ED03-vs-corpus synthesis (conference-vaults); ICLR 2026 tool pages for SC-Arena, the Genentech perturbation adapter, and "Toward Generative Virtual Cells" (Gen² workshop); Ahlmann-Eltze & Huber, [Nat Methods 2025](https://www.nature.com/articles/s41592-025-02772-6); NeurIPS/ICML/single-cell-genomics 2026 are still upcoming and are cited here as where the rest is heading, not as presented results. Companion reading: [AACR 2026 digest](aacr-2026-digest.md), [beyond AACR](aacr-and-other-conferences-2026-virtual-cells.md), [people & institutes](people-and-institutes.md).*
