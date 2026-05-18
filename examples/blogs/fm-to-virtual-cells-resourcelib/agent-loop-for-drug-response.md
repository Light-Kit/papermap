---
title: 'Thinking systematically about an agent-in-the-loop project for drug response (v1, superseded)'
date: '2026-05-18'
topics:
- foundation-model
- agentic
- clinical
- virtual-cell
summary: A short, systematic walk-through of one concrete project shape — a pretrained FM plus an LLM agent that picks datasets, runs simple analyses, and iteratively fine-tunes the FM until convergence — applied to drug-response prediction for a specific cancer subgroup. Superseded by v2 after three rounds of literature search revealed that the architectural composition is already a published 2025-2026 paradigm; see v2 for the corrected contribution surface and the new no-go condition.
starred: false
---

> *⚠ **Superseded by [v2](agent-loop-for-drug-response-v2.md).** After three literature-search rounds, the architectural composition described here turned out to already exist in the 2025-2026 literature ("Closing the loop", VCHarness, CellForge, BioLab). v2 keeps the design discipline below but is honest about what's actually left as the contribution surface (application + discipline, not methods) and adds a no-go condition v1 missed. Read v2 instead; this v1 stays here for the record.*

> *Companion reading: [causal models, FMs and virtual cells](causal-models-fm-and-vc.md) names the rung-1 / rung-2 problem this project bumps into; [small labs v2](small-labs-what-to-build-v2.md) explains why "adapter on a frozen backbone" is the right wedge to start from; [why linear baselines win](why-linear-baselines-win.md) is the empirical pressure that makes the convergence question hard.*

## The question

Can you build a system in which one pretrained foundation model (sc-FM, pathology FM, or genomic FM) sits in the middle, and an LLM agent loops around it — picking representative datasets, running simple analyses, fine-tuning the FM with what it learned, and re-checking — until the model converges on something useful for one specific clinical question? Concretely: *would drug X work on this gastric cancer subgroup?*

This is a real project shape. It is also the place where most agent-in-the-loop systems quietly fail. The point of this post is to think through *why* before writing any code.

## Why this shape at all

You are not trying to invent a new architecture (that's Wedge 1 in the [small labs taxonomy](small-labs-what-to-build-v2.md)). You are taking a frozen FM, layering a small task-specific head, and asking an LLM agent to be the **experiment planner** instead of the human grad student. The FM brings biological pretraining. The adapter brings task specificity. The agent brings *which-data-when* decisions.

The bet is that the agent can navigate the data landscape (TCGA, GDSC, PRISM, DepMap, clinical cohorts) better than a fixed pipeline, because the right next dataset depends on what the model is currently bad at — and the agent can read the model's confusion matrix and pick the next round accordingly.

## The five things you have to decide before you write any code

1. **What is the loop's stopping rule?** This is the single most important design decision. "Train loss flattens" is wrong — the model can drive train loss to zero and still be useless on a new patient. "Validation AUC flattens" is also wrong if the agent picked the validation set. The honest rule: hold out a clinical cohort the agent **never sees and never names**, and stop when AUC on that cohort plateaus for N rounds.
2. **What does "subgroup" mean exactly?** "HER2+ gastric cancer" is one definition; "HER2+ MSI-H gastric cancer with prior platinum exposure" is another. The narrower it is, the more clinically useful — and the fewer patients exist in any single dataset. You will have to train on a wider population and *evaluate* on the narrow one.
3. **What is the FM allowed to do?** Frozen backbone + adapter is the safe first move (1-10 GPU-days per round). Full finetune is GPU-weeks per round and your loop will blow up your compute budget by round 3. Pick frozen-plus-adapter unless you have a strong reason.
4. **What does the agent actually decide?** Realistic agent actions: pick the next dataset, pick the next subgroup slice, pick the next adapter configuration, pick which baseline to compare against. Unrealistic: invent new model architectures or write novel loss functions. Keep the action space small and concrete.
5. **What is the baseline?** A linear model on simple features (age, mutations, expression) is the baseline you must beat. The [linear-baselines reckoning](why-linear-baselines-win.md) is a year of evidence that sc-FMs lose to this baseline on perturbation tasks. If your agent-plus-FM-plus-adapter system can't beat it after 5 rounds, the loop is wrong and adding more rounds won't fix it.

## The cheapest first cut

Trastuzumab in HER2+ gastric cancer. Frozen Virchow2 (pathology FM) plus a drug-conditional adapter. The agent picks rounds from {TCGA-STAD, GDSC gastric lines, PRISM gastric, a held-out internal cohort the agent never touches}. Stopping rule: held-out AUC plateau over 3 rounds. Compare against a linear logistic regression on HER2 IHC + Lauren classification.

Total budget: ~$20-30K in compute, ~$2K in LLM API calls, 1 person × 6-12 months. This is small enough for one motivated PhD student and concrete enough that the comparison matters.

## Where it most likely fails — be honest

- **Causal gap.** You are predicting *what happens if we give the drug*. Your training data is *what happened to patients who received the drug, chosen by oncologists for clinical reasons*. That is selection bias on rung 1, and the [causal-models blog](causal-models-fm-and-vc.md) explains why no amount of fancy modeling fixes it without intervention data or a structural assumption. You will need to either (a) train on randomized-trial data only (rare, small), or (b) be very explicit that this is a hypothesis-generating tool, not a clinical decision tool.
- **Subgroup data scarcity.** The narrower the clinical subgroup, the smaller the sample. Iterative finetune on n=80 will overfit by round 2. Use the subgroup as the *evaluator*, not the *trainer*.
- **Convergence theater.** Agent loops are easy to demo and hard to reproduce. The agent will look like it's "deciding" when it's actually pattern-matching on prompt phrasing. Run the same loop 5 times with different random seeds; if the final model is different each time, you don't have convergence — you have a slot machine.

## Prior art to read before starting

- **Biomni** (Zou lab, 2025) — agentic bioinformatics over a tool library, with a benchmark. Closest published analogue to "agent picks the next analysis."
- **TxAgent / TxGemma** (Google, 2025) — therapeutic-reasoning agent paired with an open small FM.
- **CellAgent** (2024) — orchestrates a scRNA-seq pipeline end-to-end.
- **The active-learning-for-perturbation literature** (Replogle/Theis 2024-2026) — same loop idea, applied to *which knockout to do next* instead of *which drug-response dataset to load*.

## Verdict

The project is interesting and the wedge is correct. The risks are real but named and concrete — convergence rule, subgroup scarcity, causal gap. None of them are research-killers; they are *design constraints*. If you keep the FM frozen, keep the held-out cohort sealed, beat the linear baseline first, and label the output a hypothesis-generation tool rather than a clinical decision-support system, you have a defensible 12-month project that produces a publishable result and a reusable codebase. The thing that turns it from "another agentic-LLM demo" into real work is the discipline of those constraints, not the cleverness of the loop.

> *v2 update (May 2026): the prior-art search done after this v1 found four direct closed-loop-VC-FM systems already published in 2025-2026. The architectural composition isn't novel. See [v2](agent-loop-for-drug-response-v2.md) for the corrected verdict.*

---

*v1 published 2026-05-18. Superseded same day by [v2](agent-loop-for-drug-response-v2.md).*
