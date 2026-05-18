---
title: 'Thinking systematically about an agent-in-the-loop project for drug response (v2)'
date: '2026-05-18'
topics:
- foundation-model
- agentic
- clinical
- virtual-cell
summary: A v2 narrowing after three rounds of literature search. The architectural composition (agent + VC FM + iterative adapter finetune) turned out to be a published 2025-2026 paradigm — "closed-loop in silico perturbation" + "agentic virtual cell modeling" — with four direct prior systems and two surveys. This v2 rewrites the contribution surface honestly: clinical drug-response (not gene perturbation) + patient-cohort evaluation (not held-out cell lines) + defined cancer subgroup specificity. Adds the no-go condition that didn't exist in v1.
starred: true
---

> *This is v2 of [the original agent-loop-for-drug-response essay](agent-loop-for-drug-response.md). v1 framed the project as "interesting and novel"; three rounds of search later, the architectural composition turned out to be already published several times. v2 keeps the design discipline from v1 but is honest about what's left as the contribution surface.*

> *Companion reading: [causal models, FMs and virtual cells](causal-models-fm-and-vc.md) for the rung-1/rung-2 framing; [small labs v2](small-labs-what-to-build-v2.md) for why "adapter on a frozen backbone" is the right Wedge-2 starting point; [why linear baselines win](why-linear-baselines-win.md) for the empirical reckoning that makes the convergence question hard; [clinical and agentic](clinical-and-agentic-clinical.md) for adjacent agentic-clinical work.*

## The question

Can you build a system in which one pretrained virtual-cell FM sits in the middle, and an LLM agent loops around it — picking representative datasets, running simple analyses, fine-tuning the FM with what it learned, and re-checking — until the model converges on something useful for one specific clinical question? Concretely: *would drug X work on this gastric cancer subgroup?*

This is a real project shape. After three rounds of literature search I have to report that **the architectural composition is already a named, published paradigm in 2025-2026** — "closed-loop in silico perturbation" + "agentic virtual cell modeling." The novelty surface is much narrower than it first appears. The point of this v2 is to be honest about that and find the contribution that's actually left.

## The honest landscape: this is a crowded 2025-2026 space

### Closed-loop VC FMs (the exact composition proposed)

- **"Closing the loop: Teaching single-cell foundation models to learn from perturbations"** ([bioRxiv July 2025](https://www.biorxiv.org/content/10.1101/2025.07.08.663754v1)) — fine-tunes Geneformer-30M-12L with CRISPRa/i Perturb-seq data in a closed-loop ISP framework. **Three-fold PPV improvement on T-cell activation prediction.** This is the literal "fine-tune the VC FM with iteratively acquired perturbation data" idea.
- **VCHarness** ("Harnessing AI to Build Virtual Cells", [bioRxiv April 2026](https://www.biorxiv.org/content/10.64898/2026.04.11.717183v2)) — autonomous AI system combining an AI *coding agent* with multimodal biological FMs to construct perturbation-response models. **Outperforms expert-designed approaches; cuts dev time from months to days.** This is the literal "agent + biological FM" composition.
- **CellForge** ([arXiv 2508.02276, August 2025](https://arxiv.org/abs/2508.02276)) — multi-agent framework that autonomously designs and synthesizes neural network architectures for single-cell perturbation tasks via collaborative agent reasoning.
- **BioLab** ([bioRxiv September 2025](https://www.biorxiv.org/content/10.1101/2025.09.03.674085)) — multi-agent autonomous life-sciences system integrating biological FMs, with a Memory Agent that updates a RAG knowledge base in a closed loop between in silico prediction and wet-lab design.
- **ELISA** ([arXiv 2603.11872](https://arxiv.org/pdf/2603.11872)) — Embedding-Linked Interactive Single-cell Agent: unifies scGPT expression embeddings with BioBERT retrieval and LLM-mediated interpretation in an agentic closed-loop workflow.
- **Sequential Optimal Experimental Design of Perturbation Screens** ([bioRxiv Dec 2023](https://www.biorxiv.org/content/10.1101/2023.12.12.571389)) — the *original* iterative-active-learning paradigm for Perturb-seq: at each step, acquire data, retrain the model, select the next batch. Pre-dates the LLM-agent wrapper but defines the underlying loop.
- **Two 2025 surveys**: [LLM4Cell](https://arxiv.org/html/2510.07793v1) and [LLMs Meet Virtual Cell](https://arxiv.org/html/2510.07706v1). The fact that *survey papers* already exist tells you the space is mature.

### Adapter-on-frozen-VC-FM (the wedge for v0)

- **sc-FM Perturbation Adapter / scDCA** ([arXiv 2412.13478](https://arxiv.org/html/2412.13478v2) → ICLR 2026) — <1% drug-conditional adapter on frozen sc-FM; beats the linear-additive baseline.
- **PertAdapt** ([bioRxiv Nov 2025](https://www.biorxiv.org/content/10.1101/2025.11.21.689655)) — condition-sensitive adapter for genetic perturbation prediction; gene-level functional structure built in.
- **scDrugMap** ([Nature Communications 2025](https://www.nature.com/articles/s41467-025-67481-2)) — benchmark of 8 sc-FMs + 2 LLMs across 495K cells / 60 datasets for drug response. scFoundation strongest in pooled, UCE best after finetune, scGPT best zero-shot.
- **STATE** (Arc Institute) — perturbation-specialist FM, pretrained on ~170M unperturbed + finetuned on 100M+ perturbed cells across 70 species.

### Adjacent agentic biomedical systems (broader context)

- **Biomni** ([Stanford Zou, bioRxiv June 2025](https://www.biorxiv.org/content/10.1101/2025.05.30.656746v1)) — general biomedical agent, 150 tools / 105 packages / 59 databases; beats human experts on LAB-Bench.
- **TxGemma + Agentic-Tx** ([Google, arXiv 2504.06196](https://arxiv.org/abs/2504.06196)) — therapeutic LLM + 18-tool Gemini-2.5 agent.
- **Google AI co-scientist** ([arXiv 2502.18864](https://arxiv.org/abs/2502.18864)) — multi-agent (Generation / Reflection / Ranking / Evolution / Meta-review) with Elo tournaments.
- **PharmaSwarm** ([arXiv 2504.17967](https://arxiv.org/abs/2504.17967)) — three-agent swarm on TxGemma with shared memory that fine-tunes submodels over time.

### Clinical surface (the bar to beat)

- **MuMo** ([Nature Sig Transduct Targeted Ther 2024](https://www.nature.com/articles/s41392-024-01932-y)) — multi-modal HER2+ gastric anti-HER2 ± IO response on 429 patients; **AUC 0.884**. *The actual baseline.*
- **BATCHIE** ([Nature Communications 2024](https://www.nature.com/articles/s41467-024-55287-7)) — Bayesian AL for combination drug screens; **5-7% of full-data accuracy with only 1.7-20.4% of training data**.
- **CRISP** ([Nat Comput Sci 2025](https://www.nature.com/articles/s43588-025-00887-6)) — transfer-learning for perturbation in unseen cell types with limited data.

## What this means for your contribution

**Architectural novelty: gone.** "Closing the loop" already publishes Geneformer + iterative Perturb-seq finetune; VCHarness already publishes an AI agent + biological FM that *beats expert-designed architectures*; CellForge and BioLab cover the multi-agent variant. Surveys already exist. Anyone reviewing your paper will land on these in their first hour.

**What's actually left as your surface:**

1. **Clinical drug-response, not gene perturbation.** All the closed-loop work above is on CRISPRa/i Perturb-seq — gene knockouts in cell lines. Drug-response on patient cohorts with clinical outcomes is materially different in (a) data structure (small molecules + dose + time), (b) signal (clinical endpoint, not transcriptomic delta), (c) confounding (oncologist selection bias, not random CRISPR assignment).
2. **Patient-cohort evaluation, not held-out cell lines.** Every closed-loop VC paper above evaluates on held-out perturbations or held-out cell lines. None evaluates against a sealed *patient* cohort with outcomes. This is the discipline gap.
3. **A defined cancer + drug + biomarker triple.** No published system combines all three with the loop architecture. HER2+ gastric + trastuzumab + MSI status is the example; pick yours and own it.

That's the contribution surface. It's narrower than v1 claimed — and it's *application + discipline*, not *methods*.

## Concepts to internalize before any code

1. **Closed-loop in silico perturbation (ISP).** The named paradigm. "Closing the loop" is the canonical citation.
2. **Ladder of causation** (Pearl rungs 1/2/3) — covered in the [causal-models blog](causal-models-fm-and-vc.md).
3. **CATE + meta-learner family** (T/S/X/R/DR/EP-learner) — the standard tool for "would this drug work on *this* subgroup." Recent 2024-2025 extensions to right-censored survival.
4. **Selection bias / propensity score / IPW** — Hernán & Robins, *Causal Inference: What If*.
5. **Bayesian AL acquisition functions** — UCB, expected improvement, information gain. BATCHIE and Sequential-OED-for-Perturb-seq are the worked oncology examples.
6. **Iterative-self-refinement reward hacking** — ([arXiv 2410.06491](https://arxiv.org/pdf/2410.06491)) the documented failure mode of LLM-as-evaluator loops. Your stopping rule must defeat this.
7. **FDA SaMD framework** — January 2025 draft guidance (Docket FDA-2024-D-4488). What the v0 can legitimately claim.

## The five decisions to lock down before code

1. **Stopping rule.** A clinical cohort the agent never sees, AUC plateau over N rounds. Anything else reproduces the reward-hacking literature.
2. **Subgroup definition.** Narrower = more useful + fewer patients. Train wide; evaluate narrow (the CRISP move).
3. **What the FM is allowed to do.** Frozen backbone + adapter. PertAdapt / scDCA are the templates.
4. **Agent action space.** Pick next dataset, pick next subgroup slice, pick next adapter config. Not: invent architectures (CellForge already does that better).
5. **The baseline.** Not LR. Not your own previous round. **MuMo (AUC 0.884)** is the published bar on HER2+ gastric.

## The cheapest first cut

Trastuzumab in HER2+ gastric. Frozen Virchow2 (pathology) or scFoundation (sc) + drug-conditional adapter (scDCA template). Pretrain substrate: [Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398) (100M cells × 1,100 drugs × 50 cancer lines). Orchestrate dataset selection with a Biomni-style agent. Held-out: sealed internal patient cohort. Stopping: held-out AUC plateau over 3 rounds. Beat MuMo on the held-out.

Budget: ~$20-30K compute, ~$2K LLM API, 1 person × 6-12 months.

## Three no-go conditions

1. **No sealed clinical patient cohort.** No honest stopping rule → reward-hacking literature guarantees failure.
2. **Can't beat MuMo (AUC 0.884) within 12 months.** Published bar; below it is a paper without a result.
3. **VCHarness or CellForge applied to your subgroup matches or beats your bespoke system.** This is the *new* test, given that both already exist and both *outperform expert-designed approaches*. Run them as control conditions, not just baselines. If a general-purpose agentic VC-model designer wins on your subgroup, your methods contribution is zero and only the clinical-application framing remains.

## Verdict

After three rounds of search I have to be straightforward: the project's architectural novelty — agent + VC FM + iterative adapter finetune — has been published end-to-end at least four times in 2025-2026 ("Closing the loop", VCHarness, CellForge, BioLab). What's defensibly yours is *application + discipline*: the first such system specifically targeting drug-response in a named cancer subgroup with patient-cohort outcome evaluation. That's a real but narrow contribution, and it lives or dies on whether you can (a) seal a held-out clinical cohort, (b) beat MuMo, and (c) demonstrate that bespoke beats VCHarness on your subgroup. If any of those three fails, the project has no result. Treat this clarity as a feature: the literature has already told you the experiments you need to run.

---

*Last updated 2026-05-18.*
