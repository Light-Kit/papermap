---
title: 'How does a virtual cell know it doesn''t know? Quantifying surprise in cell foundation models'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- uncertainty
- calibration
- ood-detection
summary: "A prior-art map of surprise / uncertainty / OOD-detection methods and an honest verdict on which of them have landed inside single-cell FMs. The named handles (Shannon surprise, Bayesian surprise, Mahalanobis / ODIN / energy-score OOD, Kendall-Gal epistemic-vs-aleatoric, conformal prediction, AlphaFold pLDDT/PAE) are all mature in ML — and almost none have been applied to scGPT, Geneformer, scFoundation, UCE, STATE, or CellPLM at the calibration level. The τ_g translatability score from the dual-latent sibling is a per-gene epistemic-surprise signal in disguise."
starred: false
---

> *Sibling to [the dual-latent translatability essay](translatability-dual-latent-vc-fm.md) (τ_g lives here too, under a different name), [why linear baselines win](why-linear-baselines-win.md) (a calibration-adjacent reckoning, framed differently), [the 101 tour of closed-loop VCs](closed-loop-virtual-cells-101.md), and [causal models, FMs and VCs](causal-models-fm-and-vc.md). This essay asks one more honest question of the VC FM family: when the model gets a cell or perturbation it has never seen, does it tell you it has never seen it?*

## The question

A virtual cell that confidently predicts the wrong response to an unseen drug, in an unseen cell type, is worse than no model at all — it converts unknown unknowns into precise-sounding wrong answers. The whole point of building a virtual cell instead of running the wet experiment is that the model should know which queries it can answer. If the FM cannot tell you when it is extrapolating, what you have is not a virtual cell. It is a regression with confidence delusions.

## The named handles in ML

The ML literature on this is mature. Eight families worth knowing.

**Shannon surprise** — −log p(x) under the model. Perplexity is its exponential average. Language models live and die by it. Trivial to compute when the model is generative, undefined when it is discriminative-only.

**Bayesian surprise** ([Itti & Baldi, *Vision Research* 2009](https://www.sciencedirect.com/science/article/pii/S0042698909000709)) — KL[posterior ‖ prior]. Measures how much the observation *moves* the model's beliefs, not just how unlikely the observation is. Cleaner when the prior is flat, since "unlikely under a flat prior" is not surprising in the right way.

**OOD detection.** A whole subfield. The named methods worth recognizing: Mahalanobis distance to training features ([Lee et al., NeurIPS 2018](https://arxiv.org/abs/1807.03888)), ODIN with temperature scaling ([Liang et al., ICLR 2018](https://arxiv.org/abs/1706.02690)), energy score ([Liu et al., NeurIPS 2020](https://arxiv.org/abs/2010.03759)), deep-ensemble disagreement ([Lakshminarayanan et al., NeurIPS 2017](https://arxiv.org/abs/1612.01474)), MC-dropout variance ([Gal & Ghahramani, ICML 2016](https://arxiv.org/abs/1506.02142)).

**Epistemic vs aleatoric uncertainty** ([Kendall & Gal, NeurIPS 2017](https://arxiv.org/abs/1703.04977); [Hüllermeier & Waegeman, *Mach Learn* 2021](https://link.springer.com/article/10.1007/s10994-021-05946-3)). Crucial distinction. Epistemic = the model does not know, in principle fixable with more data. Aleatoric = irreducible noise in the world. Most of what you care about for VC FMs is epistemic, because that is what tells you the model is extrapolating.

**Conformal prediction** ([Vovk, Gammerman, Shafer, 2005](https://link.springer.com/book/10.1007/978-3-031-06649-8); [Angelopoulos & Bates, *FnT* 2021](https://arxiv.org/abs/2107.07511)). Distribution-free prediction *sets* with finite-sample coverage guarantees. The right object when you want a calibrated set of plausible answers rather than a point estimate and a vibe.

**Influence functions** ([Koh & Liang, ICML 2017](https://arxiv.org/abs/1703.04730)). How much would removing this training point change the prediction? Lets you answer "is this output supported by the training data?" without a held-out probe.

**Free-energy / predictive coding** ([Friston, *Nat Rev Neurosci* 2010](https://www.nature.com/articles/nrn2787)). The grand-unified-theory version. Variational lower bound as the brain's loss function. Mostly relevant here as the ancestor of the ELBO that scVI exposes.

## The single-cell FM picture — mostly empty

scVI ([Lopez et al., *Nat Methods* 2018](https://www.nature.com/articles/s41592-018-0229-2)) and its scvi-tools descendants expose a per-cell ELBO and Bayesian uncertainty on the latent — they always did, by virtue of being VAEs. That is the one credible calibration story in the substrate.

The 2023–2024 sc-FM wave does not continue it. scGPT ([Cui et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)), Geneformer ([Theodoris et al., *Nature* 2023](https://www.nature.com/articles/s41586-023-06139-9)), scFoundation, UCE ([Rosen et al., *Nat Methods* 2024](https://www.nature.com/articles/s41592-024-02201-0)), CellPLM, TranscriptFormer — none publishes calibration curves, OOD-detection benchmarks, or epistemic-uncertainty estimates as part of the headline model. The masked-gene-prediction loss exposes a per-token likelihood you *could* turn into a Shannon-surprise signal, but the papers do not foreground it.

STATE ([Arc Institute, 2025](https://arcinstitute.org/news/virtual-cell-model-state)) ships as a product with versioned releases and adapter APIs, and still has no published uncertainty layer. The 2025 reckoning literature ([Ahlmann-Eltze & Huber, *Nat Methods* 2025](https://www.nature.com/articles/s41592-025-02692-8); Wenkel et al; Csendes et al) shows that the *point estimates* on perturbation prediction collapse to linear-baseline levels — but the reckoning is about reliability of the mean, not calibration of the distribution around it. Those are different questions and only one has been asked.

The closest published moves are auxiliary. Some recent zero-shot benchmarks ([Boiarsky et al; Kedzierska et al 2025](https://www.biorxiv.org/content/10.1101/2025.02.13.638126v1)) measure transfer error on held-out tissues, which is implicitly an OOD probe. Sparse-autoencoder interpretability work on scGPT ([Patel et al, 2025](https://arxiv.org/abs/2502.13608)) cracks open the per-feature representation, which is a precondition for token-level surprise but not yet the surprise itself.

There is no scGPT pLDDT. No Geneformer confidence head. No STATE per-prediction calibration. The cell side of the biological-FM landscape is calibration-naive in 2026.

## The adjacent biology FMs that DO ship uncertainty

AlphaFold ([Jumper et al., *Nature* 2021](https://www.nature.com/articles/s41586-021-03819-2)) is the field-defining counterexample. **pLDDT** is a per-residue confidence score that ships with every prediction, and the protein community has internalized it so completely that papers report mean pLDDT alongside structure. **PAE** (predicted aligned error) gives a per-residue-pair confidence on relative positions. These are not optional add-ons — they are how the model communicates its uncertainty, and how downstream users decide whether a region is trustworthy. AlphaFold-Multimer extends the same idea to interfaces ([Evans et al., 2021](https://www.biorxiv.org/content/10.1101/2021.10.04.463034v2)).

ESM-2 ([Lin et al., *Science* 2023](https://www.science.org/doi/10.1126/science.ade2574)) exposes per-token perplexity that the ProteinGym benchmark ([Notin et al., NeurIPS 2023](https://proceedings.neurips.cc/paper_files/paper/2023/hash/cac723e5ff29f65e3fcbb0739ae91bee-Abstract-Datasets_and_Benchmarks.html)) turns into a variant-effect calibration story — high-perplexity substitutions correlate with deleterious mutations across 217 deep-mutational-scanning datasets. Imperfect calibration, but it ships.

Pathology FMs are partway there: Virchow-2 and its peers ship classification confidences, but calibration is not their selling point.

The pattern: structural and sequence FMs shipped uncertainty heads as part of the headline product. Cell FMs did not.

## The τ_g connection

The translatability score I sketched in [the dual-latent sibling](translatability-dual-latent-vc-fm.md) is, formally, a per-gene epistemic-uncertainty signal in disguise. The score asks how much the VC FM should *trust* the cell-line→patient transfer for gene g — that is exactly an epistemic claim about whether the gene-specific representation has been pinned down enough by the training substrate to support the extrapolation. The natural ML grounding is per-gene Mahalanobis distance between the cell-line latent's gene-projection and the patient latent's, or equivalently a per-gene KL between predictive distributions. The Sade-Feldman anti-PD1 falsifier in that essay is a Bayesian-surprise test: τ_g should be near zero everywhere a cell line carries no immune signal, and the head is mis-calibrated if it returns τ > 0 there.

That move — naming τ_g as a calibrated surprise score rather than a regression confidence — would slot the dual-latent project directly into the AlphaFold-pLDDT tradition. Same shape, different modality.

## Verdict + open wedges

The architectural composition is published. Nothing in this essay is novel ML. The defensible novelty surface for VC FMs is application of mature uncertainty methods to a substrate where the field has been content with point estimates. Three concrete moves:

**(a)** A pLDDT-style per-cell confidence head on a frozen scGPT or Geneformer. Train on held-out cell types; report calibration via reliability diagrams and expected calibration error. The plumbing exists — Patel-style SAEs expose the right intermediate features.

**(b)** Conformal prediction over Perturb-seq response. Distribution-free coverage guarantees on the predicted transcriptional response to a held-out perturbation. Nobody has done this end-to-end on a Replogle-style benchmark.

**(c)** Bayesian-surprise novelty score for new cell types in atlas search. SCimilarity returns a neighbor; the surprise score returns the confidence that the neighbor is actually a neighbor.

Same v2/v3 pattern. None of three is architecturally novel — all three are unoccupied because the cell FM community has been racing for scale and benchmarks instead of asking what the models do not know. Names to follow: **Berens lab** (Tübingen) for sc-FM calibration, **Theis lab** (HMGU) for scVI-family uncertainty, **Pe'er lab** (MSKCC) for Bayesian single-cell modeling. Honest no-go: if a calibration head on scGPT does not improve out-of-distribution rejection on a sealed test cohort relative to scGPT-raw, the head is decoration; the substrate may be too leaky for any post-hoc fix.

A virtual cell that does not know what it does not know is not a virtual cell.
