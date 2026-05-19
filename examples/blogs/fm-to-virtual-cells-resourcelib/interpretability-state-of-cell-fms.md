---
title: 'What does interpretability know about cell foundation models? SAEs, attention probes, and the regulatory-logic gap'
date: '2026-05-19'
topics:
- foundation-model
- virtual-cell
- interpretability
- sparse-autoencoders
- mechanistic-interpretability
- regulatory-logic
summary: "A prior-art map of single-cell FM interpretability — who is actually opening the box on scGPT, Geneformer, scFoundation, UCE, and STATE, what methods have landed, and how far the claims actually go. SAE atlases (Pedrocchi/Boeva ETH, Kendiukhov Tübingen), transcoder circuit analysis (Hosokawa Tokyo), concept bottlenecks (Claye Paris-Saclay), and attention probes are all shipping in 2025–2026. The consensus emerging across these independent groups: cell FMs encode rich biological structure (pathways, modules, cell-type identity) but minimal causal regulatory logic. ~29–59% of SAE features earn clean GO/Reactome labels; only ~6–10% of transcription factors show regulatory-target-specific responses to perturbation. Multiple stress-tests now show attention-derived GRN edges are beaten by trivial co-expression baselines. The sixth essay in the epistemic-honesty arc, opening a sibling layer to surprise / reachability / translatability / stability / multimodal-stability."
starred: false
---

> *Sixth essay in the arc. The first five — [surprise](surprise-and-uncertainty-in-cell-fms.md), [reachability](reachability-and-forbidden-states-in-cell-fms.md), [translatability](translatability-dual-latent-vc-fm.md), [stability](cell-stability-and-niche-dependence-in-vc-fms.md), [multimodal-stability](multimodal-stability-and-failure-modes-in-vc-fms.md) — asked what the model does *not* know, *cannot* reach, *cannot* transfer, *cannot* sustain, and *cannot* cross-validate across modalities. This essay asks the question those five quietly assumed an answer to: when the model produces a representation, can anyone read what is actually inside it? Cross-cuts to [the organelle-aware sixth wedge](organelle-aware-cell-fms.md) on the substrate features interp would need, and [the closed-loop 101](closed-loop-virtual-cells-101.md) on what a downstream agent would do with an interpretable feature.*

## The question

Each of the previous five essays gestured at a feature-level handle without picking up the actual literature. "Per-head SAE features map basin depth to monosemantic gene programs" assumes an SAE on a cell FM exists and is good enough. "Calibration via reliability diagrams on Pedrocchi-style features" assumes the features are stable across runs. The question of this essay is whether the assumption is paid for. Who has opened scGPT, Geneformer, scFoundation, UCE, and STATE in 2025–2026 with methods stronger than UMAPs and attention heatmaps? What did they find? And is what they found load-bearing for the algorithms the earlier five essays sketched, or is the load-bearing layer still notional? The honest reading turns out to be: a real interpretability literature now exists, a clear empirical pattern has emerged, and the pattern is roughly the opposite of what scGPT and Geneformer claimed at launch.

## The methods that have landed

The 2025–2026 interpretability wave imports four families of method from LLM-side mechanistic interpretability and lands them on cell FMs more or less wholesale.

**Sparse autoencoders.** The dominant move. [Pedrocchi, Barkmann, Joudaki & Boeva (ETH Zürich), bioRxiv Oct 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2) (accepted ICLR 2026) is the first canonical study — TopK SAEs trained on scGPT and scFoundation residual streams, features steerable to remove technical-confound dimensions. [Ihor Kendiukhov (U Tübingen)](https://arxiv.org/abs/2603.02952) extended this in Feb–Mar 2026 with a comparative SAE atlas across Geneformer-V2 and scGPT, plus a JumpReLU follow-up. SAE features are the modern stand-in for what the field used to call "interpretable gene programs," but unlike NMF or scVI factors they emerge from the FM's own internal geometry rather than being imposed on the raw data.

**Transcoders.** Cleaner circuit decomposition. [Hosokawa et al. (U Tokyo), arXiv 2509.14723](https://arxiv.org/abs/2509.14723) ported Anthropic-style transcoders to Cell2Sentence, giving a per-token compositional decomposition the SAE substrate does not. Still single-paper, but the methodology is mature on the LLM side.

**Concept bottlenecks + counterfactuals.** [Claye, Marschall, Ouerdane, Hudelot, Duquesne (Scienta Lab + CentraleSupélec), arXiv 2510.25807](https://arxiv.org/abs/2510.25807) train an interpretable bottleneck layer on top of a frozen scRNA-seq FM and use counterfactual attribution to ask "what would need to change for the model to predict the other class." Tested with a wet-lab immunologist as the audit channel — the cleanest existing human-in-the-loop interp story on the cell side.

**Causal circuit tracing.** [Kendiukhov, arXiv 2603.01752](https://arxiv.org/abs/2603.01752) uses SAE-feature ablation as a causal intervention on Geneformer and scGPT internals, walking the LLM mech-interp playbook step by step. The architecture is borrowed; the finding (next section) is biology-specific.

The methods are imported; the originality is which biology they pin to features.

## What has been found

A clear empirical pattern has emerged across these independent groups, and it is not flattering to the founding-paper narrative.

**Features get labeled at ~29–59% coverage, regulatory targets at ~6–10%.** SAE atlases ([Pedrocchi 2025](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2); [Kendiukhov 2603.02952](https://arxiv.org/abs/2603.02952)) report that roughly one third to one half of monosemantic features can be matched to GO, Reactome, or TRRUST annotations — meaningful, but well short of the "the model has learned the regulome" framing. The stricter test — does a feature respond *specifically* to perturbing one TF's known targets — passes for only ~6–10% of transcription factors. The model has learned co-occurring biology, not causal regulators.

**Attention beats trivial co-expression baselines? No.** [Kendiukhov 2602.17532](https://arxiv.org/abs/2602.17532) and the [genomic-attention framework on bioRxiv (June 2025)](https://www.biorxiv.org/content/10.1101/2025.06.26.661544v1) systematically evaluated attention-derived edges in Geneformer and scGPT and found that for perturbation-response prediction, attention captures *co-expression* rather than unique regulatory signal — a trivial baseline reproduces most of the attention-weight signal. This directly contradicts the "attention attends to TFs" framing in the original Geneformer paper. Three independent groups now agree.

**Layer-stratified abstraction is real.** Across SAE atlases, early layers carry gene-identity features, mid layers carry pathway-level features, late layers carry cell-type and tissue features. The cell FMs *did* learn hierarchy — the disagreement is about whether the hierarchy contains causal logic.

**No prospective wet-lab validation yet exists.** All interpretability validation in the cell-FM literature as of May 2026 is post-hoc against published annotations. Zero SAE features have been used to predict a phenotype that was *then* verified in CRISPR. This is the field's biggest credibility gap.

## The adjacent FMs that ship something interpretability-shaped

Protein-side FMs ship interp by construction. AlphaFold's pLDDT and PAE ([Jumper 2021](https://www.nature.com/articles/s41586-021-03819-2)) are confidence on persistence at the residue level; ESM-2 perplexity ([Lin 2023](https://www.science.org/doi/10.1126/science.ade2574)) calibrates variant-effect rank order across 217 deep-mutational-scanning datasets. Genomic FMs (Enformer, AlphaGenome) emit attribution tracks per nucleotide that wet-lab promoter assays can falsify in days. The LLM-side mech-interp literature ([Anthropic transcoders, sparse autoencoders, circuit tracing](https://transformer-circuits.pub/)) is the methodological parent of every method named above on the cell side; Pedrocchi, Kendiukhov, Hosokawa, and Claye are downstream by construction. The cell side imports the pipeline. What it has not yet imported is the wet-lab-falsification step — protein FMs and LLM-interp work both have it; cell-FM interp does not.

## The roadmap — what would close the gap

Three implementation paths, ranked by data demand.

**(C) SAE-feature → wet-lab prospective test.** Smallest data ask, biggest credibility return. Pick a high-confidence feature from the Pedrocchi atlas, predict that perturbing a specific gene-set in a cell line *should* activate it, run the Perturb-seq, compare. One feature, one experiment, the field's first prospective interp claim. Months of bench time.

**(A) Probing benchmark — AssayBench-shaped, interp-quality-shaped.** A standardized panel: do SAEs trained on different FMs find the same features? Do features ablated in one FM degrade the same downstream tasks as in another? Do regulons recovered via attention probes match Perturb-seq edges quantitatively? This is what closes the gap that [AssayBench (De Brouwer 2026)](https://arxiv.org/abs/2605.10876) opened — assay-prediction has a benchmark; interpretation-quality does not.

**(B) Per-cell-type circuit dissection on UCE / scFoundation / STATE.** Currently no published dissection beyond scGPT and Geneformer. UCE and scFoundation pretrain on different substrates; STATE has explicit perturbation supervision and a public adapter API but zero independent mech-interp work. The first circuit-traced exhaustion or EMT regulator-set in STATE would be a meaningful publication.

The honest reading is that the methods are ahead of the empirical biology they get applied to. The interp wave is methodologically mature and substrate-bound; the next move is biology-side.

## Verdict + open wedges

Three concrete experiments that would resolve currently-open questions. (a) Run the [Pedrocchi SAE pipeline](https://www.biorxiv.org/content/10.1101/2025.10.22.681631v2) on STATE's residual stream and ask whether the explicit perturbation pretraining shows up as more regulatory-target-specific features than scGPT — the prediction from the perturbation-supervised vs masked-language-model framing is yes; the field has not checked. (b) For the ~10% of TFs where Kendiukhov found target-specific features, design a single CRISPR-i wet-lab to *prospectively* test the prediction; report the false-positive rate; this is the missing wet-lab handshake. (c) Use the Patel-style scGPT SAE features as the substrate for the per-cell stability heads [the stability sibling sketched](cell-stability-and-niche-dependence-in-vc-fms.md) — the closure: interpretability features become the inputs the U / λ / τ / π regressions read.

Names to follow. **Valentina Boeva** (ETH Zürich) for the canonical SAE-on-scGPT pipeline. **Ihor Kendiukhov** (Tübingen) for the stress-test atlas — the field's most coordinated interp campaign. **Sosuke Hosokawa** (Tokyo) for transcoders on cell substrates. **Charlotte Claye** (Scienta Lab / Paris-Saclay) for human-in-the-loop concept bottlenecks. **Fabian Theis** (Helmholtz Munich) for the [Nicheformer](https://www.nature.com/articles/s41592-025-02814-z) tissue-niche probing axis. The cell-FM founding labs (Theodoris, Bo Wang, Arc) have so far been less active in independent interp than the methodological adopters — that may shift in 2026 as the field absorbs the regulatory-logic gap.

The methods are imported, the empirical pattern is real, and the wet-lab handshake is missing. A cell foundation model whose interpretability stops at GO labels is not interpretable. It is annotated.
