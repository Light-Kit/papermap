---
title: "Causal — the theoretical framing of the reckoning"
date: 2026-05-17
topics: [causal]
summary: "7 items. Pearl's causal-transportability framework, structural causal models, and counterfactual pretraining objectives."
kind: topic-summary
---

Causal is one of two mechanistic waves explaining the reckoning. Context-not-scale (2026) names the failure: the field has a causal-transportability problem in Pearl's sense — a model trained on P(X|do(Y), Z=z₁) doesn't predict P(X|do(Y), Z=z₂) when context Z changes. Not a capacity problem; a structural one. CausCell (Nat Comm 2025) operationalises this: structural causal model + diffusion → interpretable cellular reps with explicit cDAGs. Counter-position to black-box scLLMs. IRM (Arjovsky 2019) is the causal-objective method cited as basis for counterfactual pretraining. Lopez-Hsu-causal 2025 is the causal-rep exemplar. CINEMA-OT brings optimal transport to perturbation-effect disentanglement. X-Cell (Wang 2026) is a diffusion LM for perturbation, direct rival to State/scGPT-perturb framing. Qi Liu (BM2 Lab) is the China methods-critique + tooling powerhouse behind CausCell, STAMP, scPerturBench.
