---
title: 'Thinking systematically about an agent-in-the-loop project for drug response'
date: '2026-05-18'
topics:
- foundation-model
- agentic
- clinical
- virtual-cell
summary: A systematic walk-through of one concrete project shape — a pretrained FM plus an LLM agent that picks datasets, runs simple analyses, and iteratively fine-tunes the FM until convergence — applied to drug-response prediction for a specific cancer subgroup. The honest 2024-2026 landscape of similar systems, the formalisms you have to know before you start, the design decisions to lock down, and the no-go conditions that should kill the project on day one.
starred: true
---

> *Companion reading: [causal models, FMs and virtual cells](causal-models-fm-and-vc.md) for the rung-1/rung-2 framing this project sits on; [small labs v2](small-labs-what-to-build-v2.md) for why "adapter on a frozen backbone" is the right Wedge-2 starting point; [why linear baselines win](why-linear-baselines-win.md) for the empirical reckoning that motivates the convergence question; [clinical and agentic](clinical-and-agentic-clinical.md) for adjacent agentic-clinical work in the corpus.*

## The question

Can you build a system in which one pretrained foundation model sits in the middle, and an LLM agent loops around it — picking representative datasets, running simple analyses, fine-tuning the FM with what it learned, and re-checking — until the model converges on something useful for one specific clinical question? Concretely: *would drug X work on this gastric cancer subgroup?*

This is a real project shape. It is also a *crowded* one in 2025-2026, and it is the place where most agent-in-the-loop systems quietly fail. The point of this post is to think through *why* — and *what's already been done* — before writing any code.

## The honest landscape: this is not empty territory

At least eight published systems already occupy parts of this design space. Knowing them is half the project:

- **Biomni** ([Stanford Zou lab, bioRxiv June 2025](https://www.biorxiv.org/content/10.1101/2025.05.30.656746v1)) — general biomedical agent with 150 tools, 105 packages, 59 databases, code-as-interface with loops and parallelization. Beats human experts on LAB-Bench. *Tool-use loop; the underlying FM is static.*
- **TxGemma + Agentic-Tx** ([Google, arXiv 2504.06196, March 2025](https://arxiv.org/abs/2504.06196)) — 2B/9B/27B therapeutic FM fine-tuned on 7M examples, plus an 18-tool Gemini-2.5-driven agent. *Closest "agent + small FM as a unit"; FM is fixed at deploy time.*
- **Google AI co-scientist** ([arXiv 2502.18864, Feb 2025](https://arxiv.org/abs/2502.18864)) — multi-agent (Generation / Reflection / Ranking / Evolution / Meta-review), Elo-tournament hypothesis ranking, iterative self-improvement. *The closest architectural analogue to the user's loop — at the hypothesis level, not the FM-weights level.*
- **PharmaSwarm** ([arXiv 2504.17967, April 2025](https://arxiv.org/abs/2504.17967)) — three-agent swarm on TxGemma with a **shared memory layer that fine-tunes underlying submodels over time**. *This is the published "loop that finetunes the FM" — the exact pattern proposed here. Lower-tier venue but the architecture matches.*
- **CellAgent** ([bioRxiv 2024 → ICLR 2026](https://www.biorxiv.org/content/10.1101/2024.05.13.593861v4)) — Planner-Executor-Evaluator for scRNA-seq + spatial, with executor-side self-optimization. *Pipeline-level loop, not finetune-level.*
- **BATCHIE** ([Nature Communications 2024](https://www.nature.com/articles/s41467-024-55287-7)) — Bayesian active learning for drug combination screens. **Reached within 5-7% of full-data accuracy using only 1.7-20.4% of the training set.** *The empirical proof that "agent picks the next experiment" works for drug screens.*
- **CRISP** ([Nat Comput Sci 2025](https://www.nature.com/articles/s43588-025-00887-6)) — transfer-learning framework for perturbation responses in unseen cell types, with limited empirical data. *Directly addresses the subgroup-scarcity problem this project would hit.*
- **MuMo** ([Nature Sig Transduct Targeted Ther 2024](https://www.nature.com/articles/s41392-024-01932-y)) — multi-modal (radiology + pathology + clinical) for HER2+ gastric anti-HER2 ± immunotherapy on 429 patients. **AUC 0.884.** *This is the actual baseline to beat — not a logistic regression.*

The defensible novelty of *this* project, after all that, is narrow: **a specific clinical subgroup (a named cancer + drug + biomarker triple) plus the discipline of a sealed held-out cohort**. The loop architecture is not novel.

## Concepts to internalize before writing any code

Five named formalisms cover everything the rest of this post argues informally. Read these first:

1. **Ladder of causation** — Pearl's rung 1 (association) → rung 2 (intervention, do-operator) → rung 3 (counterfactual). The [causal-models blog](causal-models-fm-and-vc.md) covers it; this project lives or dies on whether it tries to climb to rung 2.
2. **Conditional Average Treatment Effect (CATE)** and the **meta-learner family** (T / S / X / R / DR / EP-learner). The standard tool for "would this drug work on *this* subgroup." Recent 2024-2025 work extends DR-learner and EP-learner to right-censored survival data — directly relevant to oncology outcomes.
3. **Selection bias, propensity score, inverse-probability weighting.** Why oncologist-selected drug-response data is observational, not interventional. Hernán & Robins, *Causal Inference: What If* — free, canonical.
4. **Bayesian active learning + acquisition functions** (UCB, expected improvement, information gain). BATCHIE is the worked oncology example.
5. **Iterative-self-refinement reward hacking.** Documented failure mode: when an LLM is its own generator and evaluator, shared heuristics get exploited and quality stagnates or *declines* over rounds. ([arXiv 2410.06491](https://arxiv.org/pdf/2410.06491), [arXiv 2603.04069](https://arxiv.org/pdf/2603.04069)) — your stopping rule has to defeat this.

## The five decisions to lock down before code

1. **Stopping rule.** Train loss is wrong (overfits trivially). Validation AUC is wrong if the agent picked the validation set. The honest rule: **a clinical cohort the agent never sees and never names**, with AUC plateau over N rounds. Anything else reproduces the reward-hacking literature's failures.
2. **Subgroup definition.** Narrower = more clinically useful + fewer patients. "HER2+ MSI-H gastric, prior platinum" might be <100 patients globally with both genomics and outcomes. Train on the wider population; **evaluate on the narrow subgroup** — this is the CRISP-style transfer-learning move.
3. **What the FM is allowed to do.** Frozen backbone + adapter is safe (1-10 GPU-days per round). Full finetune blows up your compute by round 3 of any loop. Pick frozen-plus-adapter unless you have a written reason not to.
4. **Agent action space.** Realistic: pick next dataset, pick next subgroup slice, pick next adapter config, pick which baseline to compare against. Unrealistic: invent architectures, write loss functions. Keep it small and concrete.
5. **The baseline you must beat.** Not a logistic regression. **MuMo (AUC 0.884)** is the published bar on HER2+ gastric anti-HER2 ± IO response. If after 5 rounds you can't beat MuMo, the loop is wrong and more rounds won't fix it.

## The cheapest first cut

Trastuzumab in HER2+ gastric cancer. Frozen Virchow2 (or sc-FM) plus a drug-conditional adapter — the [sc-FM Perturbation Adapter template](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/sc-fm-perturbation-adapter/), already the highest-leverage Wedge-2 move in 2026. Pretraining substrate: **[Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398)** (100M cells × 1,100 drugs × 50 cancer lines, free, open). Orchestrate dataset selection with a Biomni-style agent (open-source, drop-in). Held-out: an internal clinical cohort the agent never touches. Stopping rule: held-out AUC plateau over 3 rounds. Compare against **MuMo**.

Budget: ~$20-30K compute, ~$2K LLM API, 1 person × 6-12 months. Small enough for one PhD-student-year.

## Where it most likely fails

- **Causal gap.** You are predicting *what happens if we give the drug*; training data is *what happened to patients who received the drug, chosen by oncologists for clinical reasons*. This is rung-1 selection bias; no amount of modeling fixes it without intervention data or a structural assumption. Frame the output as **hypothesis-generation under the FDA SaMD lens** ([2025 draft guidance, Docket FDA-2024-D-4488](https://www.linkedin.com/pulse/fdas-2025-draft-guidance-aiml-samd-lifecycle-updated-prajapati-vyhbc)), not clinical decision support — otherwise the regulatory story is a footnote and reviewers will notice.
- **Subgroup data scarcity.** Even with CRISP-style transfer, n=80 on the narrow subgroup will overfit by round 2 if you train on it. **Evaluate on it; don't train on it.**
- **Convergence theater.** Agent loops are easy to demo and hard to reproduce. Run the same loop 5 times with different seeds; if the final model is different each time, you have a slot machine, not convergence. The reward-hacking literature (above) is the closest theoretical account of why this happens — your stopping rule has to be loop-external, not loop-internal.

## Two no-go conditions

1. **You can't secure a real held-out clinical cohort the agent never sees.** Without it the loop has no honest stopping rule and the published failure modes guarantee you will reproduce them.
2. **You can't beat MuMo (AUC 0.884) within 12 months on HER2+ gastric.** That is the empirical bar in the literature today. A v0 materially below it is a paper without a result.

## Verdict

The project is interesting and the wedge is correct, but the architecture is not novel — PharmaSwarm already does shared-memory submodel finetuning in a multi-agent loop; Google's co-scientist already runs iterative-evolution hypothesis loops; Biomni already does agent-driven biomedical analysis with code-as-interface. What's defensibly *yours* is **the discipline of the clinical-subgroup specificity plus the sealed held-out cohort**, applied as a focused recombination of existing infrastructure (Biomni + sc-FM Perturbation Adapter + Tahoe-100M + MuMo benchmark). Frame it as hypothesis-generation, beat MuMo, publish, and you have a 12-month project that produces a real result rather than another agentic-LLM demo. Skip any of those constraints and the literature already tells you what happens next.

---

*Last updated 2026-05-18.*
