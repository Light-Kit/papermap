---
title: 'The six papers the chain rests on — what was already proven before Luo 2024'
date: '2026-06-01'
topics:
- hrd
- cgas-sting
- parpi
- ccr8
- treg
- interferon
- immunotherapy
summary: 'The HRD → IFN → CCR8⁺ eTreg chain is mechanistic, not speculative — every link has at least one definitive prior paper. Six pieces of work do the load-bearing: Sun & Chen 2013 (cGAS as the cytosolic-DNA sensor), Mackenzie 2017 + Harding 2017 (cGAS recognizes micronuclei from genome instability), Pantelidou/Shen/Sen 2019 (the three near-simultaneous papers proving PARPi activates STING in BRCA-deficient tumors), Plitas 2016 + De Simone 2016 (CCR8 is tumor-Treg-specific), Luo 2024 (the HGSOC anchor closing the full loop), and CHS-114 phase I (NCT05635643) (selective intratumoral Treg depletion is clinically achievable). This blog walks each one and notes what they leave open.'
starred: true
---

The biology essay sets up a six-link chain: HRD → cytosolic DNA → cGAS-STING → tonic type-I IFN → MHC-II^hi co-inhibitory tumor cell → CCR8⁺ effector Treg → terminally exhausted CD8. The reason the chain reads as mechanism rather than speculation is that **each link has been independently established by definitive prior work**. Six papers (or paper-clusters) do almost all of it.

What follows is a tour. For each, what they did, what they proved, and what they left for someone else to do.

## 1. Sun & Chen 2013 — cGAS as the cytosolic-DNA sensor

**Sun L, Wu J, Du F, Chen X, Chen ZJ.** *Cyclic GMP-AMP synthase is a cytosolic DNA sensor that activates the type I interferon pathway.* **Science** 2013;339(6121):786–791.

Before this paper, the field knew STING existed and knew cytosolic DNA triggered an interferon response, but the sensor was not identified. Sun & Chen showed that cGAS (then called MB21D1) binds cytosolic dsDNA, synthesizes the cyclic dinucleotide cGAMP, and that cGAMP activates STING. This is the foundational link in the whole chain — without cGAS as the sensor, there is no signal for HRD to fire.

The paper opened the field of "DNA damage as innate-immune trigger." It did not yet tell anyone that the trigger fires in HRD tumors specifically.

## 2. Mackenzie 2017 + Harding 2017 — micronuclei as the source

**Mackenzie KJ, Carroll P, Martin C-A, et al.** *cGAS surveillance of micronuclei links genome instability to innate immunity.* **Nature** 2017;548(7668):461–465.

**Harding SM, Benci JL, Irianto J, Discher DE, Minn AJ, Greenberg RA.** *Mitotic progression following DNA damage enables pattern recognition within micronuclei.* **Nature** 2017;548(7668):466–470.

Two papers published back-to-back in the same Nature issue. Mackenzie's group showed that cGAS localizes to micronuclei — the nuclear-envelope-bound DNA fragments that form when chromosomes mis-segregate during mitosis — and that micronuclear envelope rupture releases the DNA to cGAS, firing the IFN response. Harding's group independently showed the same thing using DNA-damaging stimuli including ionizing radiation. Together they established the **mechanism by which genome instability becomes an innate-immune signal**: chromothripsis, lagging chromatids, and mis-rejoined breaks generate micronuclei; micronuclei rupture; cytosolic DNA appears; cGAS fires.

This is the link that converts "HRD generates DNA damage" into "HRD generates cGAS-STING signal." Without it, the chain has no source.

What they didn't do: connect this to a specific therapeutic intervention. That came next.

## 3. The 2019 PARPi-STING trio — Pantelidou, Shen, Sen

**Pantelidou C, Sonzogni O, De Oliveria Taveira M, et al.** *PARP inhibitor efficacy depends on CD8⁺ T-cell recruitment via intratumoral STING pathway activation in BRCA-deficient models of triple-negative breast cancer.* **Cancer Discovery** 2019;9(6):722–737.

**Shen J, Zhao W, Ju Z, et al.** *PARPi triggers STING-dependent immune response and enhances therapeutic efficacy of immune checkpoint blockade independent of BRCAness.* **Cancer Research** 2019;79(2):311–319.

**Sen T, Rodriguez BL, Chen L, et al.** *Targeting DNA damage response promotes anti-tumor immunity through STING-mediated T-cell activation in small-cell lung cancer.* **Cancer Discovery** 2019;9(5):646–661.

Three near-simultaneous papers in 2019. They asked the same question — does PARPi activate STING in vivo and does the antitumor effect depend on the immune system? — and got the same answer in three different tumor settings (BRCA-deficient TNBC, multiple BRCA contexts, small-cell lung cancer). PARPi treatment **does** activate cGAS-STING; the antitumor effect is **partly immune-dependent**; and combining PARPi with anti-PD-1 / anti-PD-L1 enhances both efficacy and CD8 infiltration.

This is the most underappreciated piece of the chain in routine clinical thinking. PARPi was originally sold as a cell-autonomous synthetic-lethal therapy. These three papers proved it is **also** an immunotherapy, mechanistically. They are what justifies using PARPi as the amplifier in a PARPi + anti-CCR8 combination — PARPi isn't just killing HR-deficient cells; it's actively driving the IFN signal that selects the eTreg compartment.

What they didn't do: ask what happens **to the Treg compartment** under sustained PARPi-induced IFN. That is the gap Luo 2024 filled.

## 4. Plitas 2016 + De Simone 2016 — CCR8 as the tumor-Treg target

**Plitas G, Konopacki C, Wu K, et al.** *Regulatory T cells exhibit distinct features in human breast cancer.* **Immunity** 2016;45(5):1122–1134.

**De Simone M, Arrigoni A, Rossetti G, et al.** *Transcriptional landscape of human tissue lymphocytes unveils uniqueness of tumor-infiltrating T regulatory cells.* **Immunity** 2016;45(5):1135–1147.

Two papers in the same November 2016 issue of *Immunity*. Plitas's group profiled Tregs from breast tumors and paired peripheral blood; De Simone's group profiled tumor-infiltrating Tregs across colorectal and lung cancers. Both groups independently identified **CCR8** as the marker that most cleanly distinguishes tumor-infiltrating Tregs from peripheral Tregs and from conventional T cells. Both proposed CCR8 as a depletion target — argued that an ADCC-competent anti-CCR8 antibody would deplete tumor Tregs without breaking peripheral tolerance.

This is the target-rationale paper-pair. Every anti-CCR8 program in clinic today — CHS-114, LM-108, GS-1811, FG-3165 — traces its rationale back to these two papers.

What they didn't do: prove the depletion works clinically. That took until 2024.

## 5. Luo 2024 — the anchor that closed the loop

**Luo Y, Xia Y, Liu D, et al.** *Neoadjuvant PARPi or chemotherapy in ovarian cancer informs targeting effector Treg cells for HRD tumors.* **Cell** 2024;187(18):4905–4925.e24.

The paper this project is built around. Using scRNA + TCR from HGSOC patients on the neoadjuvant niraparib phase II (NCT04507841), Luo et al. traced the full chain in human tumors — HRD drives an IFN-conditioned tumor-cell state, which selects for CCR8⁺ terminal eTregs, which co-occur with terminally exhausted CD8. Then they validated the therapeutic implication in CCR8-humanized mice: PARPi + anti-CCR8 cut tumor burden where PARPi alone did not.

This is the integration paper. It joined the cGAS-STING-PARPi work (links 2–3) to the CCR8-Treg work (link 4) and produced the first end-to-end mechanism in a treated human cohort.

What it didn't do: ask whether this is HGSOC-specific or generalizable pan-cancer. That is the question this project answers.

## 6. The CHS-114 phase I (NCT05635643) — clinical proof of selective depletion

**Coherus BioSciences, 2024 readouts.** CHS-114 (tagmokitug) in head-and-neck squamous cell carcinoma, dose-escalation cohort.

The Plitas/De Simone target rationale predicted that selective intratumoral Treg depletion via CCR8 should work without systemic autoimmunity. The CHS-114 phase I tested it. The readouts: **CCR8⁺Treg ↓74%** at the tumor site, **CD8/CCR8⁺Treg ratio ↑12×**, no Grade ≥3 immune-related adverse events at the doses tested. The selective-depletion claim is no longer hypothetical.

This makes the combination operationally feasible. Without a clinical-grade selective Treg-depleter, the PARPi + anti-CCR8 combination is biology with no execution route. CHS-114 (and the parallel LM-108 / GS-1811 / FG-3165 programs) make it a designable trial.

## What the six together establish, and what they don't

These six papers (or paper-clusters) establish:
- **The sensor exists.** cGAS detects cytosolic DNA. (Sun & Chen)
- **HRD fires the sensor.** Genome-instability micronuclei rupture and release DNA to cGAS. (Mackenzie + Harding)
- **PARPi amplifies it.** PARPi-induced replication-fork collapse drives STING activation in vivo. (Pantelidou + Shen + Sen)
- **The target is real.** CCR8 marks tumor-infiltrating Tregs specifically. (Plitas + De Simone)
- **The chain runs in patients.** HGSOC scRNA traces it end-to-end. (Luo)
- **The drug works.** Selective depletion is clinically achievable. (CHS-114)

What they do **not** establish:
- That the chain runs **pan-cancer** (Luo is HGSOC-only; per-cancer CCR8 papers exist but no integrated cross-cancer analysis).
- That HRD-high × IFN-high is the right **patient stratifier** to enroll for the combination (no public combination trial yet).
- That the combination **outperforms** PARPi or anti-CCR8 monotherapy in any specific subgroup (no outcome data).

Those three gaps are exactly the contribution of this project's pan-cancer stratifier work — the bet that the public multi-omics record already contains the evidence to define the population that PARPi + anti-CCR8 was designed for, even though no one has run the trial yet.

The chain isn't speculation. It is six pieces of fundamental work waiting on the seventh: the patient definition.
