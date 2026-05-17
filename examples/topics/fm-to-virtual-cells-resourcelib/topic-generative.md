---
title: "Generative biology FMs — sequence, structure, cellular state"
date: 2026-05-17
topics: [generative]
summary: "22 items. Generative methods across DNA (Evo), proteins (ESM-3, ProGen2, RFDiffusion), and cellular state (scTranslator, scDiffusion, gen-virtual-cells)."
kind: topic-summary
---

The generative thread spans every biological modality. DNA: Evo2 (only genomic FM with demonstrated in-context learning, 1M-token context, ~$5M training), Evo-v1, AlphaGenome (variant-effect SOTA). Proteins: ESM-3 (98B params, generated esmGFP de novo), AlphaFold3 (complex prediction), ProGen2 (pre-ESM3 sequence generation), RFDiffusion (de novo design). Cellular state: scTranslator (Tencent, align-free scRNA→protein generation, 2M cells + 18k bulk samples), UNAGI (time-series scRNA virtual-disease simulator), CausCell (causal SCM + diffusion for interpretable cellular reps), Lingshu-Cell (Chinese-industry generative cellular world model). Flow-matching (Morehead 2026 review) is the technique under generative virtual cells. Gen-virtual-cells (Lewis & Zueco 2026) is the workshop proof on <$250 of compute that closed-loop validation-gated generation is feasible.
