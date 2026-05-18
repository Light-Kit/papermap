---
title: 'What is a causal model — and why FMs and virtual cells need one'
date: '2026-05-18'
topics:
- causal
- foundation-model
- virtual-cell
- interpretability
summary: A worked-example primer on causal models (Pearl's ladder, do-operator, transportability), why today's biological FMs are correlational and not causal, and why the virtual-cell promise specifically *requires* the causal rung — illustrated through the 2025-2026 papers that name the gap.
starred: false
---

> *Companion landscape: [interpretability, mech-modeling, causal](interpretability-mech-causal.md) — the conceptual sibling of this page. For the empirical pressure that made causal framing urgent, see [why linear baselines win](why-linear-baselines-win.md). For a worked architectural response, [TxPert](https://doi.org/10.1038/s41587-026-03113-4) and [xVERSE](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/) are the 2026 papers that operationalize bits of this picture.*

## The one-paragraph version

A causal model is a model that can answer questions of the form *"what would happen if I intervened?"* — not just *"what tends to co-occur?"*. Today's biological FMs (scGPT, Geneformer, ESM-2, UNI) are trained on objectives that maximize *correlational* prediction: next-token, masked-token, contrastive matching. The virtual-cell promise — *"give me a model I can run a thought-experiment on, like a wet-lab knockout, but in silico"* — is fundamentally a request for the causal rung. The gap between "FM that predicts what cells tend to look like" and "virtual cell that predicts what cells would look like under intervention" is the topic of this page.

## What is a causal model?

Judea Pearl's *Ladder of Causation* gives the cleanest three-rung breakdown:

1. **Association** — *P(Y | X)*. "What does Y look like when I observe X?" Standard correlation, standard regression, almost all of supervised ML. A scGPT embedding that lets you predict cell type from gene expression lives here.
2. **Intervention** — *P(Y | do(X))*. "What happens to Y if I *force* X to take a value?" The `do`-operator is the syntactic move that makes this rung distinct: `P(Y | X=x)` is observational; `P(Y | do(X=x))` is what would happen if you *reached in* and set X. A Perturb-seq experiment that knocks out a gene and measures the response is empirical evidence about *P(transcriptome | do(KO))*.
3. **Counterfactual** — *"Given that I observed Y=y after X=x, what would Y have been if X had been x'?"* The hardest rung — requires a structural model that lets you re-run reality with one variable changed. Personalized-medicine claims ("this patient would have responded to drug B instead of drug A") live here.

A purely correlational model can sit on rung 1 forever and never climb to 2. The climb requires either *interventional data* (someone actually did the do(X), not just observed X) or *structural assumptions* (a causal DAG, a mechanistic prior, a known set of confounders).

**One-line worked example.** Aspirin and headaches co-occur — you observe both at once. Rung 1 will tell you *P(headache | aspirin)* is low. But that's because people *take* aspirin *when* they have headaches; the conditional doesn't tell you whether aspirin *causes* headaches to resolve. *P(headache | do(aspirin))* — the rung-2 quantity — is what an RCT measures. A correlational model that's blind to the difference will get *do(aspirin)* arbitrarily wrong, no matter how much observational data it sees.

In biology, the equivalent move: a gene and a phenotype co-vary in observational scRNA-seq data; the question "what would happen if I knocked out the gene?" is the *do* version, and the correlation alone is uninformative about it.

## Why today's biological FMs are correlational, not causal

The pretraining objectives across the four FM families are all rung-1:

- **scGPT / Geneformer / scFoundation / UCE / CellPLM (single-cell)** — masked-gene-modeling or next-gene-prediction. The model learns *P(gene_i | other_genes)* from a 100M-cell observational corpus. No intervention is anywhere in the objective. See [stage 4 — pretraining objective](stage-4-pretraining-objective.md) for the breakdown.
- **UNI / Virchow2 / CHIEF (pathology)** — contrastive matching on H&E tiles, or self-supervised masked-image-modeling. Each tile is an observation; the model learns the distribution over what tissue looks like.
- **ESM-2 / ESM-3 (protein)** — masked language modeling over amino acid sequences. The corpus is *every protein UniProt has seen* — pure observation.
- **AlphaGenome / Evo2 (genomic)** — track prediction or autoregressive genomic LM. The supervision is what *exists* in ENCODE / GTEx; no interventional information beyond what's already encoded in the experimental tracks themselves.

The 2025-2026 wave of interpretability work (sparse autoencoders trained on scGPT and Geneformer activations — see Simon & Zou 2026; the [interpretability blog](interpretability-mech-causal.md)) confirms the structural diagnosis at the *mechanism* level:

> sc-FMs encode *cell-type* and *pathway* features cleanly. They fail to recover *regulatory* and *causal* features.

In plain English: scGPT *knows* "this is an endothelial cell" and "this is in the apoptosis pathway." It does *not* know "knocking out TP53 will activate the apoptosis pathway." The first kind of knowledge is correlational; the second is causal. The reckoning is, at base, the discovery that the current biological FM stack lives entirely on rung 1.

This is why **a linear baseline that just predicts the mean of training perturbations beats every fancy sc-FM zero-shot on perturbation prediction** — the mean is itself a correlational quantity, and the FM is also a correlational quantity, so the simpler one wins. See [why linear baselines win](why-linear-baselines-win.md) for the four overlapping causes.

## What would a causal FM actually look like?

A few patterns from 2025-2026 work that gesture at the climb to rung 2 — none of them are "the answer," but each is a partial move:

- **Counterfactual / interventional objectives in pretraining.** Pretrain not on "predict the masked gene" but on paired *(unperturbed, perturbed)* pairs from large-scale Perturb-seq / CRISPRi screens. The supervisory signal is *P(transcriptome | do(KO_g))* directly. The compute and data are heavy because interventional corpora (Replogle, scPerturb, TahoeR) are 100-1000× smaller than the observational substrate.
- **Knowledge-graph priors injected into the architecture.** [TxPert (Wenkel et al., Nat Biotech 2026)](https://doi.org/10.1038/s41587-026-03113-4) uses *multiple* knowledge graphs (pathway, regulatory, protein-protein) as inductive bias for transcriptomic perturbation prediction. The KG encodes *some* causal structure (regulatory edges have directionality); the FM is no longer relying on the transformer to learn the regulatory graph from observational data. Note who the authors are: Wenkel co-wrote the 2025 `latent-additive` critique. The critic's own next move was a causally-augmented FM, not abandonment.
- **Counterfactual heads on frozen backbones.** [The sc-FM Perturbation Adapter](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/) keeps the correlational backbone but adds a drug-conditional adapter trained on perturbation pairs. The adapter is asked to do the *do*-prediction; the backbone supplies a representation. This is the smallest-shippable causal-aware module — and it beats the linear-additive baseline, which the full-finetuned sc-FMs couldn't.
- **Mechanistic-biophysical priors.** ESM-3's SE(3)-invariant structure tokens, scFoundation's read-depth-aware attention, pathway-aware sc-FMs that constrain attention to KEGG / Reactome gene sets — each encodes a piece of known causal structure into the architecture itself. The model is no longer asked to discover (say) rotational symmetry from data; it's built in.
- **Active learning over interventions.** Use the FM to *choose the next experiment* — which knockout, which drug, which dose — that would maximally reduce uncertainty in the causal model. Closes the loop between rung-2 data acquisition and the model that asked for it. Mostly aspirational in 2026, but the Replogle-lab and Theis-group infrastructure to support it is being built.
- **Causal transportability frameworks.** [Virtual Cells Need Context, Not Just Scale (bioRxiv 2026.02.04)](https://www.biorxiv.org/content/10.64898/2026.02.04.703804v1) names the *theoretical* gap in Pearl's language: *P(X | do(Y), Z=z₁)* trained in context z₁ does not transport to context z₂ when Z changes. The paper demonstrates the framework on a 22M-cell immunology FM. It names the problem; it does *not* yet operationalize a transportability benchmark — that's the open project.

## Why virtual cells specifically need the causal rung

The virtual-cell promise, in the canonical Bunne et al. *Cell* 2024 framing and the Theis-lab 2026 follow-ups, is:

> Give me a computational object such that I can run a wet-lab thought-experiment on it — knockout, drug treatment, environmental change — and get back a prediction that would replicate in the wet lab.

That request is *literally* a rung-2 request. "What would happen if I…" is *P(transcriptome | do(intervention))*. A correlational virtual cell — one that predicts what cells look like on average but can't tell you what they would look like under intervention — is not a virtual cell in the sense the field is asking for. It is a (very large, very expensive) atlas.

This is the structural reason the linear-baselines reckoning landed so hard: the field built (correlational) atlases, called them virtual cells, and was caught when someone actually evaluated them on the (causal) virtual-cell task they had promised. There are two honest paths forward from this:

1. **Climb to rung 2.** Acquire interventional pretraining corpora at the scale needed (Tahoe-100M and the next-gen Perturb-seq atlases are the substrate bet). Bake causal structure into objectives or architectures (TxPert, xVERSE, counterfactual adapters). Build transportability benchmarks (the open project Virtual Cells Need Context names).
2. **Be honest that we're at rung 1.** Stop calling rung-1 models "virtual cells." Call them what they are: *single-cell atlases-with-good-embeddings*. They are useful for cell-type classification, batch correction, and visualization — none of which require rung 2. The Bunne 2024 framing only fails if you read "virtual cell" as a rung-2 promise; if you read it as "good representation of cell state," rung 1 may be enough.

The May 2026 honest position, traceable in [why linear baselines win](why-linear-baselines-win.md), is that both readings are alive in the literature, and the field has not yet picked one.

## The contrarian footnote

[Foundation Models Improve Perturbation Response Prediction (bioRxiv 2026.02.18)](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1) argues — *directly opposing* the reckoning literature — that with sufficient observational data (Tahoe-100M and beyond), sc-FMs *do* approach interventional performance limits. If this is right, the rung-1/rung-2 distinction is *empirically softer* than Pearl's framework suggests: enough observational data, the argument goes, gradually contains enough interventional information to make the correlational prediction approach the causal one.

This is a position worth taking seriously. The honest 2026 stance is that the causal-vs-correlational gap is **theoretically clean but empirically contested** in the specific case of biological FMs trained on extremely large observational corpora.

## What to read next

- **[Why do single-cell FMs fail to beat linear baselines?](why-linear-baselines-win.md)** — the four causes; the contrarian voice; the matrix that maps each cause to a small-lab project.
- **[Interpretability, mech-modeling, causal](interpretability-mech-causal.md)** — the broader landscape this page sits inside; the mech-modeling thread is the systems-biology side of the causal story.
- **[Stage 4 — pretraining objective](stage-4-pretraining-objective.md)** — where the correlational/causal mismatch is *born* in the modeling stack.
- **[Reading an FM paper critically](reading-an-fm-paper-critically.md)** — the four-question diagnostic for whether a paper's claimed transfer is *causal-survivable* or just *correlational*.
- **[Pearl, *Causality* (2009)](https://bayes.cs.ucla.edu/BOOK-2K/)** — the canonical book. Chapters 1-3 give the ladder; chapter 7 gives transportability.
- **[Bunne et al., *How to Build a Virtual Cell with AI* (Cell 2024)](https://doi.org/10.1016/j.cell.2024.11.015)** — the canonical virtual-cell framing the field is now arguing about.
- **[Virtual Cells Need Context, Not Just Scale (bioRxiv 2026.02.04)](https://www.biorxiv.org/content/10.64898/2026.02.04.703804v1)** — the cleanest 2026 statement of the transportability problem.
- **[Foundation Models Improve Perturbation Response Prediction (bioRxiv 2026.02.18)](https://www.biorxiv.org/content/10.64898/2026.02.18.706454v1)** — the contrarian voice; cite alongside the reckoning papers.
- **[TxPert (Wenkel et al., Nat Biotech 2026)](https://doi.org/10.1038/s41587-026-03113-4)** — the worked example of knowledge-graph-augmented causal-aware FM.

---

*Last updated 2026-05-18.*
