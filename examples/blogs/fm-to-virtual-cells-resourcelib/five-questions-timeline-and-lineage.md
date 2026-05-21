---
title: 'When the ladder was actually built: a timeline and lineage map behind the hundred concepts'
date: '2026-05-21'
topics:
- foundation-model
- virtual-cell
- primer
- perturbation
- timeline
- meta
summary: "A supplementary cross-check for the five-questions essays. Those essays order their concepts by conceptual rung (describe → correlate → reckon → intervene → predict → counterfactual), not by time — so this companion tabulates, for every dated work, when it actually appeared (first preprint vs. version bumps vs. journal publication; for the challenge, launch vs. close) plus its first and senior author and institute. Two tables and a findings list: (1) the master timeline, sorted oldest → newest, the inverse of the ladder; (2) the lineage threads — the lines that actually connect the works, where one lab or one person recurs across rungs (the Theis-lab methods spine; Aviv Regev from Broad to Genentech; Romain Lopez from scVI to DCD-FG to IterPert; Yusuf Roohani from GEARS to STATE to the Virtual Cell Challenge; the Chizat optimal-transport math under all the single-cell OT); and (3) where the calendar and the ladder disagree — the math and the data predate the models that lean on them by up to a decade, an 'extension' that peer-published before its 'original', and the compressed 2025–26 burst that produced half the frontier in fourteen months."
starred: false
---

> *A supplementary companion to the [five-questions cut](fifty-concepts-five-questions-v4.md) and its [fully-cited, doubled edition](one-hundred-concepts-five-questions-v5.md). Those essays climb a ladder — concepts ordered by how hard a question is to ask, not by when the work landed. This page is the orthogonal view: the **calendar** behind the ladder. Same works, sorted by date, with who built each and the threads that connect them. Read it next to v5 to see where the prose's order and the real chronology pull apart.*

The five-questions essays are deliberately *a-chronological*. They order the field by rung — DESCRIBE, CORRELATE, RECKON, INTERVENE, PREDICT, COUNTERFACTUAL — because the argument is about the height of the question, not the date on the paper. That is the right spine for a thesis. It is the wrong spine for checking whether the story is *true to the calendar*. So here is the calendar.

Three things to look for, and the reason this companion exists at all. First, **dual dates**: almost every work has a preprint date and a much later publication date, and the gap is often more than a year — so "when did X happen" has two answers, and the narrative can quietly pick the convenient one. Second, **lineage**: the same handful of labs and people recur across every rung, and seeing the threads is more honest than treating each method as an isolated idea. Third, **the disagreements**: places where the ladder's order implies a chronology the dates contradict.

A note on what the dates mean. **First public** is the earliest moment the work was readable — a bioRxiv/arXiv preprint, or a conference submission, or (for a few) the journal itself when no preprint exists. **Published** is the peer-reviewed venue (journal or proceedings). Where a preprint had notable version bumps, they are noted inline. The Virtual Cell Challenge, being a competition, carries a launch and a close. "preprint" in the Published column means still-unpublished as of May 2026.

## The master timeline (oldest → newest)

| # | Work | Type | First public | Published | First → senior author | Institute · thread |
|---|------|------|--------------|-----------|-----------------------|--------------------|
| 75 | Monocle | dynamics | 2014-03 *(journal-first)* | Nat Biotechnol 2014-05 | Trapnell → Rinn | UW/Broad · Trapnell |
| 98 | MAGeCK | screen/selection | 2014-12 *(journal-first)* | Genome Biol 2014-12 | W. Li → X.S. Liu | Dana-Farber · Liu |
| 92 | Wasserstein–Fisher–Rao | OT-math | 2015-06 arXiv | Found Comput Math 2018 | Chizat → Vialard | Paris-Dauphine · Chizat-OT |
| 91 | unbalanced OT | OT-math | 2015-08 arXiv | J Funct Anal 2018 | Chizat → Vialard | Paris-Dauphine · Chizat-OT |
| — | Waddington-OT | OT-for-cells | 2017-09 bioRxiv | Cell 2019-02 | Schiebinger → Lander & Regev | Broad · Regev |
| 72 | RNA velocity (La Manno) | dynamics | 2018-08 *(journal)* | Nature 2018-08 | La Manno → Linnarsson & Kharchenko | Karolinska/Harvard |
| 15 | scVI | FM (VAE) | 2018-11 *(journal)* | Nat Methods 2018-11 | Lopez → Yosef | UC Berkeley · Lopez/Yosef |
| 55 | MELD | diff-abundance | 2019-01 bioRxiv | Nat Biotechnol 2021-02 | Burkhardt → Krishnaswamy | Yale · Krishnaswamy |
| 74 | dynamo | dynamics | 2019-07 bioRxiv | Cell 2022-02 | Qiu → Weissman & Xing | MIT/Pitt · Weissman |
| 73 | scVelo | dynamics | 2019-10 bioRxiv | Nat Biotechnol 2020-08 | Bergen → Theis | Helmholtz · Theis |
| 43 | sci-Plex | dataset | 2019-11 bioRxiv | Science 2020-01 | Srivatsan → Trapnell & Shendure | UW · Trapnell |
| 44 | MIX-Seq | dataset | 2019-12 bioRxiv | Nat Commun 2020-08 | McFarland → Regev | Broad · Regev |
| 62 | DDPM (diffusion) | CV/ML | 2020-06 arXiv | NeurIPS 2020 | Ho → Abbeel | UC Berkeley · CV-origins |
| 87 | Mixscape | causal | 2020-06 bioRxiv | Nat Genet 2021-03 | Papalexi → Satija | NYGC · Satija |
| 54 | Milo | diff-abundance | 2020-11 bioRxiv | Nat Biotechnol 2021-09 | Dann → Marioni | EMBL-EBI · Marioni |
| 56 | scCODA | diff-abundance | 2020-12 bioRxiv | Nat Commun 2021-11 | Büttner → Theis | Helmholtz · Theis |
| 81 | CPA | causal/generative | 2021-04 bioRxiv | Mol Syst Biol 2023-05 | Lotfollahi → Theis | Helmholtz/Sanger · Theis |
| 3 | CELLxGENE | atlas/platform | 2021 *(platform; Census 2023)* | Nucleic Acids Res 2024-11 | CZI Cell Science → Carr | CZI |
| 67 | classifier-free guidance | CV/ML | 2021-12 NeurIPS-W *(arXiv 2022-07)* | workshop | Ho → Salimans | Google · CV-origins |
| 65 | latent diffusion | CV/ML | 2021-12 arXiv | CVPR 2022 | Rombach → Ommer | LMU Munich · CV-origins |
| 7 | scBERT | FM | 2021-12 bioRxiv | Nat Mach Intell 2022-09 | F. Yang → Yao | Tencent AI Lab |
| 42 | Perturb-seq (genome-scale) | dataset | 2021-12 bioRxiv | Cell 2022-06 | Replogle → Weissman | MIT/UCSF · Weissman |
| 89 | CellOT | OT-for-cells | 2021-12 bioRxiv | Nat Methods 2023-11 | Bunne → Rätsch | ETH Zurich · Bunne-OT |
| 82 | chemCPA | causal/generative | 2022-04 arXiv | NeurIPS 2022 | Hetzel → Theis | Helmholtz · Theis |
| 85 | DCD-FG | causal-discovery | 2022-06 arXiv | NeurIPS 2022 | Lopez → Regev | Genentech · Lopez/Regev |
| 83 | GEARS | generative | 2022-07 bioRxiv | Nat Biotechnol 2023-08 | Roohani → Leskovec | Stanford · Leskovec/Roohani |
| 84 | PerturbNet | generative | 2022-07 bioRxiv | Mol Syst Biol 2025-07 | H. Yu → Welch | U-Michigan · Welch |
| 86 | CINEMA-OT | causal | 2022-07 bioRxiv | Nat Methods 2023-11 | Dong → van Dijk | Yale · van Dijk |
| 93 | NUBOT | OT-for-cells | 2022-09 arXiv | AISTATS 2023 | Lübeck → Alvarez-Melis | ETH/MSR · Bunne-OT |
| 63 | flow matching | CV/ML | 2022-10 arXiv | ICLR 2023 | Lipman → Lipman | Meta/Weizmann · CV-origins |
| 64 | DiT | CV/ML | 2022-12 arXiv | ICCV 2023 | Peebles → Xie | Berkeley/NYU · CV-origins |
| 8 | Geneformer | FM | 2023-05 *(no preprint)* | Nature 2023-05 | Theodoris → Ellinor | Broad/Gladstone |
| 9 | scGPT | FM | 2023-05 bioRxiv | Nat Methods 2024-02 | Cui → B. Wang | Toronto/Vector |
| 10 | scFoundation | FM | 2023-05 bioRxiv | Nat Methods 2024-06 | Hao → X. Zhang & Le Song | Tsinghua/BioMap |
| 90 | moscot | OT-for-cells | 2023-05 bioRxiv | Nature 2025-02 | Klein → Theis | Helmholtz · Theis |
| 36 | Kernfeld et al. | benchmark | 2023-07 bioRxiv | Genome Biol 2025-11 | Kernfeld → Cahan | Johns Hopkins · Cahan |
| 12 | CellPLM | FM | 2023-10 bioRxiv | ICLR 2024 | Wen → Tang | MSU · Tang |
| 11 | UCE | FM | 2023-11 bioRxiv | preprint | Rosen → Leskovec & Quake | Stanford/Biohub · Leskovec/CZI |
| 94 | TIGON | OT-for-cells | 2023-11 *(journal)* | Nat Mach Intell 2024-01 | Sha → Nie | UC Irvine · Nie |
| 71 | scDiffEq | generator | 2023-12 bioRxiv | preprint | Vinyard → Pinello | MGH/Broad · Pinello |
| 99 | IterPert | active-design | 2023-12 bioRxiv | RECOMB 2024 | K. Huang → Regev | Genentech · Regev/Lopez |
| 69 | scDiffusion | generator | 2024-01 arXiv | Bioinformatics 2024-09 | Luo → X. Zhang | Tsinghua · Zhang |
| 13 | Nicheformer | FM (spatial) | 2024-04 bioRxiv | preprint | Schaar → Theis | Helmholtz · Theis |
| 68 | CFGen | generator | 2024-07 arXiv | ICLR 2025 | Palma → Theis | Helmholtz · Theis |
| 53 | Pertpy | pipeline | 2024-08 bioRxiv | Nat Methods 2026 | Heumos → Theis | Helmholtz · Theis |
| 37 | PerturBench | benchmark | 2024-08 arXiv | NeurIPS 2025 | Y. Wu → Graepel | Altos Labs |
| 35 | Ahlmann-Eltze, Huber & Anders | baseline-paper | 2024-09 bioRxiv | Nat Methods 2025-08 | Ahlmann-Eltze → Anders & Huber | EMBL · Huber/Anders |
| 38/39 | PertEval-scFM | benchmark | 2024-10 bioRxiv | ICML 2025 | Wenteler → Córdova | QMUL |
| 29 | InterPLM | interpretability | 2024-11 bioRxiv | Nat Methods 2025-09 | Simon → Zou | Stanford · Zou |
| 76 | RegVelo | dynamics | 2024-12 bioRxiv | preprint | W. Wang → Theis | Helmholtz · Theis |
| 45 | Tahoe-100M | dataset | 2025-02 bioRxiv (v1 → v3 2025-05) | preprint | J. Zhang → Alidoust/Goodarzi | Vevo + Arc |
| 48† | C2S-Scale (27B) | FM | 2025-04 bioRxiv | preprint | Rizvi → van Dijk | Yale × Google · van Dijk |
| 70 | CellFlow | generator | 2025-04 bioRxiv | preprint | Klein → Theis | Helmholtz · Theis |
| 14 | TranscriptFormer | FM | 2025-04 bioRxiv | preprint | Pearce → Karaletsos & Quake | CZI |
| 45† | X-Atlas/Orion | dataset | 2025-06 bioRxiv | preprint | Xaira team | Xaira + Foresite |
| 46 | STATE | FM | 2025-06 bioRxiv | preprint | Adduri → Goodarzi *(Roohani corr.)* | Arc · Arc/Roohani |
| 59 | Virtual Cell Challenge | challenge | launch 2025-06 → close ~2025-11 | Cell 2025-06 *(perspective)* | Roohani → Arc team | Arc · Arc/Roohani |
| 25 | single-cell SAEs (Pedrocchi) | interpretability | 2025-10 bioRxiv | ICLR 2026 | Pedrocchi → Boeva | ETH Zurich · Boeva |
| 48 | Tahoe-x1 (3B) | FM | 2025-10 bioRxiv | preprint | Gandhi → Alidoust/Goodarzi | Vevo |
| 57 | GenBio rebuttal | rebuttal | 2026-02 bioRxiv | preprint | Cole → Xing | GenBio AI |
| 20 | xVERSE | FM | 2026-04 bioRxiv | preprint | X. Jiang → J. Xie | Duke · Xie |

*`#` is the concept number in [v5](one-hundred-concepts-five-questions-v5.md); the column is intentionally out of order because the table is sorted by date. `†` marks works named parenthetically in v5 rather than numbered (C2S-Scale and X-Atlas/Orion sit beside concepts 48 and 45). "First → senior author" is first-listed → last/corresponding. Caveats: Geneformer appeared directly in Nature with no public preprint; CELLxGENE is an org platform (Explorer ~2021, Census 2023, paper 2024) with no single author; X-Atlas/Orion's abstract lists authors by initials only; the Challenge's exact close date is approximate (test set released late Oct 2025, ~one week before deadline; winners announced at NeurIPS, wrap-up dated 2025-12-06).*

## Lineage threads — the lines that connect the works

The field is smaller than its citation count. A handful of labs and a few recurring people carry most of the ladder; reading the threads is more honest than treating each method as a standalone idea.

| Thread (hub) | Concepts it carries | What the thread owns |
|---|---|---|
| **Theis lab** (Helmholtz Munich / TUM; Lotfollahi → Sanger) | (56)(73)(76)(13)(81)(82)(68)(70)(90)(53) | The methods-and-pipelines spine — present on **every** rung from CORRELATE to COUNTERFACTUAL. The single biggest lineage in the field. |
| **Arc Institute** | (45)(46)(48)(59) | The 2025–26 perturbation-scale push: the data atlas, the model, the 3B scale-up, the challenge. |
| **Aviv Regev** (Broad → Genentech) | Waddington-OT, (44)(85)(99) | OT-for-cells origin and a perturbation atlas at the Broad → causal discovery and active design at Genentech. |
| **Romain Lopez** (Yosef lab → Genentech) | (15)(85)(99) | One author across seven years: scVI → DCD-FG → IterPert. The through-line from representation to causality to design. |
| **Yusuf Roohani** (Stanford/Leskovec → Arc) | (83)(46)(59) | GEARS → STATE (corresponding) → Virtual Cell Challenge (first author). The human link between the academic and Arc eras. |
| **Bunne + Chizat-OT** (ETH Zurich; Paris) | (91)(92) → (89)(93), Waddington-OT, (94) | The unbalanced-OT *math* (Chizat 2015) and its single-cell incarnations (CellOT, NUBOT, TIGON, WOT). |
| **van Dijk lab** (Yale) | (86)(48†) | Counterfactual-OT (CINEMA-OT) and the 27B LLM-style cell model (C2S-Scale) — same senior author, opposite ends of rung 5. |
| **Weissman lab** | (42)(74) | The Perturb-seq data and the dynamo dynamics. |
| **Trapnell lab** (UW) | (43)(75) | The sci-Plex chemical atlas and Monocle pseudotime — the oldest tools, still load-bearing. |
| **CZI / Quake** | (3)(11)(14) | The atlas substrate and the cross-species FMs (UCE co-senior, TranscriptFormer). |
| **CV/ML originators** (non-bio) | (62)(63)(64)(65)(67) | All of rung 4's generative machinery, imported wholesale from computer vision. |
| **The 2025–26 companies** | (45)(48) Vevo, (45†) Xaira, (57) GenBio, (37) Altos | The industrial entrants who now set the scale frontier. |

## Where the calendar and the ladder disagree

This is the payoff — the spots where reading by rung quietly misrepresents the timeline.

1. **The math and the oldest tools sit at the *top* of the ladder but the *bottom* of the calendar.** Chizat's Wasserstein–Fisher–Rao and unbalanced-OT papers (2015), Monocle (2014), and MAGeCK (2014) are the four oldest works here — yet they appear as concepts (91)(92)(75)(98), near the essay's *end*. Rung 5's machinery is the field's most mature, not its newest.

2. **Optimal transport for cells predates the foundation models it appears "after."** Waddington-OT's preprint is **2017** — older than *every* FM in rung 1 (scBERT, the earliest, is late 2021). The OT-for-cells idea is four years older than the representation wave it's narrated as following.

3. **scVI (2018), RNA velocity (2018), and MELD (2019) predate almost all of rungs 1–2.** The variational-autoencoder substrate and the first perturbation-effect tools were in place years before the transformer FMs that the essay introduces first.

4. **An "extension" was peer-published before its "original."** chemCPA reached a peer-reviewed venue (**NeurIPS, Dec 2022**) roughly five months before CPA's journal version (**Mol Syst Biol, May 2023**) — even though chemCPA *extends* CPA. The lineage is intact only because CPA lived as a preprint from **April 2021**; the journal route inverted the publication order.

5. **All of rung 4's machinery is older than every single-cell generator that uses it.** DDPM (2020) → classifier-free guidance (2021) → latent diffusion (2021) → flow matching (2022) → DiT (2022) all predate scDiffEq (2023), scDiffusion (2024), CFGen (2024), and CellFlow (2025). Rung 4 is a transplant, and the donor is years ahead of the recipient.

6. **The "corroboration" runs backwards in preprint time.** It is natural to read the linear-baseline reckoning (Ahlmann-Eltze, Huber & Anders) as the first word and Kernfeld et al. as the confirmation — but Kernfeld's **preprint (Jul 2023)** predates the reckoning's **preprint (Sep 2024)** by over a year. Ahlmann-Eltze *published* in a journal first (Aug 2025 vs. Kernfeld's Nov 2025); as preprints, Kernfeld flagged the gap earlier. Both are right — but whoever calls one a "corroboration" of the other has the order backwards. *(v5 has since been updated to credit Kernfeld's earlier preprint.)*

7. **The data was ready years before the verdict that judged it.** sci-Plex (2019), MIX-Seq (2019), and Perturb-seq (2021 preprint) all predate the 2024–25 reckoning on models trained against such data. The models lagged the substrate, not the other way round.

8. **Half the frontier landed in fourteen months.** Tahoe-100M (2025-02) → C2S-Scale / CellFlow / TranscriptFormer (2025-04) → X-Atlas / STATE / Virtual Cell Challenge (2025-06) → Pedrocchi SAEs / Tahoe-x1 (2025-10) → GenBio rebuttal (2026-02) → xVERSE (2026-04). The INTERVENE-and-above story the essay tells as a sequence is, on the calendar, very nearly a single burst.

## How to read this against v5

Nothing here unseats the [ladder](one-hundred-concepts-five-questions-v5.md) — the essay never claimed chronology, and ordering by question-height is still the better frame for its argument. A few of its phrasings used to imply a time order the calendar doesn't support, and v5 has since been brought into line: its opening now flags that the rungs are the order of *ideas*, not *dates*, and its reckoning note credits Kernfeld's earlier preprint. Two facts the order still quietly hides are worth holding in mind as you read it: the OT/causal lineage (rung 5) is mostly *older* than the FMs (rung 1), and the diffusion machinery (rung 4) is imported from computer vision and predates every single-cell use. The deeper pattern the timeline exposes is the lineage one: the field's methods spine is largely a single lab (Theis), its scale frontier a single institute and its spinouts (Arc / Vevo), and its sharpest mathematics a decade-old, non-biological idea (Chizat's unbalanced OT) waiting to be picked up — which is, not incidentally, exactly where [the bet](fifty-concepts-one-bet-v2.md) says the next rung lives.
