---
title: 'Clinical AI + agentic clinical: where biology FMs become real product'
date: '2026-05-18'
topics:
- foundation-model
- clinical
- agents
summary: A landscape of how biology FMs are crossing from preprint to clinical product in 2025-2026 — Owkin Pathology Explorer inside Claude for Healthcare, DeepRare for rare-disease diagnosis, multimodal aging clocks, ECG/retinal/EHR FMs, and the deployment surface that decides which research actually ships.
starred: false
---

> *Companion to [pathology FM landscape](pathology-fm-landscape.md) (the biggest clinical-product family) and [agentic methods meets FMs](agentic-meets-foundation.md) (the orchestration layer). For build mechanics see [how to build a biological FM](how-to-build-a-biological-fm.md).*

Clinical AI is where biology FMs become real product. A research paper claims a benchmark; a clinical deployment touches a patient's care. The two are different worlds with different success criteria, different timelines, and different stakeholders. This essay maps the 2025-2026 clinical-deployment landscape — what shipped, what's in pilot, what's stuck in review — and the deployment surface that increasingly decides which research actually matters.

## The deployment surface in 2026

Five real surfaces where biology FMs reach clinicians and patients today:

1. **Claude for Healthcare and Life Sciences** (Anthropic, launched January 12, 2026 at JPM). General-purpose Claude with healthcare-specific safeguards + a growing roster of MCP-integrated agents. **Owkin Pathology Explorer** ships inside it as the first major biology-FM agent. Other K Pro line integrations are rolling out monthly.
2. **Microsoft Dragon Copilot** and the broader Microsoft Healthcare stack. Ambient documentation, EHR-integrated suggestions, increasingly agentic clinical workflows. The deployment template for "AI assists with the chart" use cases.
3. **Hippocratic AI's safety-focused clinical agents**. Voice-based agents for post-discharge care, medication reconciliation, and patient education. Demonstrates that safety + reliability can be the competitive moat for clinical AI.
4. **Tempus, Foundation Medicine, Caris** — the genomic-pathology multimodal stack. Pan-cancer FM-aided reports that feed into oncology decision support.
5. **FDA-cleared narrow modules** (Paige Prostate, Aidoc, Viz.ai, Caption Health, RapidAI, etc.). Each cleared for one specific task; the regulatory template most clinical FM products will eventually follow.

The structural insight: **the deployment surface is the moat**, not the model. A slightly-behind-SOTA model with a clean integration into Claude for Healthcare or Epic reaches more patients than a SOTA model that lives in a Jupyter notebook.

## Headline 2025-2026 clinical FMs

### DeepRare — rare disease diagnosis with traceable reasoning

DeepRare (starred in the corpus) is the most-discussed clinical agentic system of 2026. It combines an LLM reasoning layer with structured access to OMIM, ClinVar, HPO, GeneReviews, and recent literature; on benchmark rare-disease cases it matches expert geneticists, and crucially **shows its reasoning chain** so a clinician can audit each step. The deployment story is still early (most rare-disease centers are running pilots), but it's the most credible "agentic clinical assistant" deployed in 2026.

### Multimodal clocks of human aging

The 2026 starred "Multimodal clocks of human aging" paper combines EHR + omics + imaging + functional measures into a single biological-age estimate, validated against mortality and morbidity endpoints across multiple cohorts. The deployment surface is preventive care and clinical research; the digital-twin framing is starting to attract serious investment.

### ECG-FM and other physiological-signal FMs

Foundation models trained on hospital-scale ECG corpora (millions of 12-lead tracings) are showing strong performance on arrhythmia classification, left-ventricular-dysfunction detection from sinus-rhythm ECGs, and early-warning prediction. **Retinal FMs** (RETFound, Moorfields-Google DeepMind work) play the same role in ophthalmology — preventive disease detection from a single fundus image.

### Pathology agents (covered separately)

Owkin Pathology Explorer, PathChat-2, and TITAN are the pathology-clinical-agent story; see the [pathology FM landscape](pathology-fm-landscape.md) for the full picture. Worth flagging here that the Owkin → Claude for Healthcare integration is the field's most-visible clinical deployment of a biology FM in early 2026.

### Imaging FMs adjacent to clinical workflows

Beyond pathology, **radiology FMs** (RSNA-bench-trained models, MAIRA-2, RAD-DINO) and **histology-radiology multimodal models** are increasingly being wired into Epic and Cerner. Aidoc and Viz.ai have already shown the deployment template — narrow FDA-cleared modules for stroke detection and PE detection — and FM-backed versions are the next iteration.

## What separates research-quality from clinical-quality

Six properties that distinguish a deployment-ready biology FM from a benchmark winner:

1. **Reliability under distribution shift.** Hospital populations vary; a model that works on Brigham slides may fail on community-hospital slides. Demonstrated robustness across institutions is table stakes.
2. **Calibration of uncertainty.** A clinical model that says "92% probability of malignancy" needs that 92% to actually mean 92% in deployment. Mis-calibrated FMs are dangerous.
3. **Traceable reasoning.** DeepRare's reasoning-chain transparency isn't a nice-to-have; it's increasingly a regulatory expectation. Black-box FMs face headwinds.
4. **Integration into existing workflows.** A FM that requires a clinician to leave Epic, log into a separate web app, and copy-paste results will not be used. Integration into Epic, Cerner, PACS, and LIS is where deployment lives or dies.
5. **Continuous monitoring.** A deployed FM degrades silently as patient populations and clinical practice evolve. Post-deployment monitoring infrastructure is mandatory in modern frameworks.
6. **Regulatory clearance pathway.** FDA 510(k) for narrow tasks; SaMD for broader tools; EMA equivalent in Europe. The pathway determines deployment speed.

## Evaluation: clinical RCT vs. retrospective vs. claims-based

Clinical FM evaluation in 2026 has three tiers:

- **Clinical RCT** — the gold standard but rare; expensive, slow, regulatory-scrutinized. Used for FDA approval of the highest-stakes tools.
- **Retrospective held-out** — most published clinical-FM evaluations live here. Holds out a temporal or geographic slice and shows the model still works. The standard for first-line publication.
- **Claims-based outcome** — observe whether deploying the FM is associated with better outcomes in real-world claims data. Increasingly important as FMs deploy at scale.

The [Campanella et al. 2025 clinical benchmark](evaluation-papers-catalog.md) is one of the cleanest retrospective benchmarks; clinical-RCT evidence for biology FMs remains scarce in 2026.

## Where small teams can ship into clinical

Three realistic 2026 wedges for a 1-5 person team:

- **Agentic clinical workflows for a narrow specialty** — wrap an existing FM (pathology, radiology, omics) in an LLM orchestrator + traceable reasoning, target one disease area, partner with one clinical group. DeepRare is the template.
- **Decision support tools for rare-disease groups** — small populations are under-served by big platforms; a focused tool reaches its audience.
- **Integration plumbing** — connectors between pathology FMs and Epic, between omics FMs and PathOS, between agentic systems and the EHR. Unglamorous but indispensable.

What to *not* do as a small team: try to ship an FDA-cleared general-purpose clinical FM. The regulatory cost is multi-million-dollar; the integration cost is multi-year. Pick a wedge that doesn't fight Owkin, Paige, Microsoft, or Anthropic directly.

## What to watch in 2026-2027

- **The next wave of MCP-integrated biology agents inside Claude for Healthcare** — the Owkin Pathology Explorer template will be copied by genomic-FM, omics, and radiology providers within the year.
- **More FDA-cleared FM-backed narrow modules** — expect 10+ new clearances by end of 2027 across pathology, radiology, ophthalmology, cardiology.
- **The first clinical RCT showing FM-assisted care improves outcomes** — when this lands, the regulatory and reimbursement landscape will shift.

Clinical is where the science meets the patient. Watch what gets deployed, not just what gets benchmarked.
