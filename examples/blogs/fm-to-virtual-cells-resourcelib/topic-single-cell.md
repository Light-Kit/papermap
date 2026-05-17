---
title: "Single-cell FMs — the reckoning, the response, the alternatives"
date: 2026-05-17
topics: [single-cell]
summary: "98 items. The most actively contested topic in the corpus: scGPT/Geneformer/UCE under critique, with architectural alternatives and agentic uses emerging."
kind: topic-summary
---

The sc-FM thread spans scGPT, Geneformer, UCE, scFoundation, CellPLM — and the 2025–2026 evaluation wave (Wu, Liu sc-Eval, CellBench-LS, Han RWD, cell-dynamics-zero-shot, Montazeri) that exposed how they fail beyond simple cell-type tasks. The architectural response: xVERSE (transcriptomics-native, beats LM-derived FMs by 17.9 %), TxPert (knowledge-graph prior), CellaMa (alt transformer), CLM-X (spatial + temporal). The agent layer (CellVoyager analyses sc data, Cytoverse runs in-browser) treats the FM as substrate. Simon & Zou 2026 give the mechanistic explanation: SAEs recover cell-type and pathway features cleanly, but not regulatory or causal features. The honest position May 2026: sc-FMs encode correlation, the downstream task wants causation.
