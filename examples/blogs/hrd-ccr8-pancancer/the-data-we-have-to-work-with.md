---
title: 'The data we have to work with — nine layers of public evidence for the HRD × IFN × CCR8 chain'
date: '2026-06-02'
topics:
- dataset
- parpi
- hrd
- single-cell
- spatial
- proteomics
- bulk-rna
- ovarian-cancer
- breast-cancer
- pancreatic-cancer
- prostate-cancer
- immunotherapy
- resources
summary: 'An earlier draft of the [pan-cancer bet](the-pan-cancer-bet.md) called GSE222556 "essentially the only" public single-cell dataset from PARPi-treated patients. That is too tight, and after a second round of digging the picture widens further. The honest map is now nine layers — (1) a bulk multi-omics arena extended with metastatic-WGS cohorts (Hartwig, PCAWG) and per-cohort CPTAC proteogenomic anchors across HGSOC / BRCA / UCEC / PDAC / CRC plus LUAD and HNSCC adjuncts; (2) human PARPi-treated single-cell + paired-timepoint clinical proteomics + the first two publicly deposited PARPi-trial bulk RNA cohorts (TOPARP-B mCRPC, AOCS GSE140996 HGSOC); (3) preclinical PARPi scRNA across TNBC / ovarian / PDAC / SCLC; (4) HRD-stratified human single-cell + spatial where PARPi is not required (Vázquez-García MSK-SPECTRUM, Pal BRCA1+/–, Bassez BIOKEY, Launonen/Färkkilä mIF, Stur Visium, Kopper PDO, Hwang HTAPP); (5) Replogle genome-scale Perturb-seq for the HR-gene molecular fingerprint; (6) pan-cancer immune atlases and frameworks (Zheng, Cheng, Combes IRIS, Chu T-stress, Nieto TICAtlas, 3CA, Tay 2025 NSCLC CCR8); (7) **new** — IO-treated cohorts as cross-validators (IMvigor210, IMmotion150/151, Braun CheckMate-009/010/025 for bulk RNA + outcome; Yost BCC/SCC, Krishna ADAPTeR ccRCC, Caushi NSCLC, Luoma HNSCC, Sade-Feldman melanoma, Bi RCC, Liu NSCLC for single-cell + scTCR); (8) **new** — cell-line baseline and drug-perturbation (LINCS L1000 PARPi signatures, DepMap + PRISM essentiality and sensitivity, CCLE RNA + proteomics rest-state); and (9) pivotal-trial PARPi-arm single-cell data that does not exist publicly. The treated-outcome layer is HGSOC + mCRPC anchored, but Layers 4–8 supply a wide enough cross-tumor base to stress-test the chain before any new-trial argument.'
starred: true
---

When a reader works through the [pan-cancer bet](the-pan-cancer-bet.md) and the [chain blog](the-chain-from-broken-dna-to-broken-t-cells.md), the practical question that follows is: **what data is actually on the table right now?** This blog is the inventory.

Nine layers, narrowest (treated-outcome) to widest (cell-line baseline + what's not public).

## Layer 1 — The bulk multi-omics arena (where Aims 1–4 live)

Three public resources do almost all the work:

- **TCGA pan-cancer** — 33 cancer types with matched RNA-seq, SNP array, and WES. The arena for HRD calls, signature scoring, and per-cancer cohort sizes that let the project move from per-tumor associations to pan-cancer mixed models. Accessed via the GDC.
- **CPTAC pan-cancer proteogenomics (2024 harmonized release)** — 10 cancer types, 1,043 patients, matched genomics + transcriptomics + proteomics + phosphoproteomics. The protein-level cross-validation layer for any transcript-level CCR8 / IFN / LAG3 finding.
- **TCPA** — RPPA companion to CPTAC; smaller panel, larger sample size; second proteomic readout for the same targets.

Two utilities save weeks:

- **GerkeLab/TCGAhrd** — pre-processed Knijnenburg HRDsum / LOH / LST / NtAI scores for 33 cancer types, 9,125 samples. Used directly in Aim 1.
- **expHRD** — RNA-seq-only HRD predictor that lets the project add HRD calls to ICI cohorts where SNP/WES is absent.

This layer is uncontroversial and almost off-the-shelf. The project will not break here.

### WGS-grade metastatic + non-TCGA cohorts

Two additions raise the genomic-scar quality and the metastatic-disease coverage that TCGA cannot follow:

- **Hartwig Medical Foundation (HMF)** — 5,100+ metastatic patients with tumor+normal WGS (median 106×/38×) and matched RNA-seq on ~half. CHORD HRD classifier (Nguyen et al., *Nat Commun* 2020) + BRCA1-like vs BRCA2-like sub-classification + SBS3 are pre-computed; controlled access via DR-### application (free academic). This is the only large WGS cohort that is *metastatic by construction* — the patient population PARPi + anti-CCR8 actually treats, exactly where TCGA misclassifies because TCGA is primary.
- **PCAWG** (ICGC/TCGA Pan-Cancer Analysis of Whole Genomes, *Nature* 2020) — 2,658 donors / 38 tumor types with uniformly reprocessed WGS, ~1,200 paired RNA-seq, and pre-computed SBS3 + RS3/RS5 structural-variant HRD signatures. Signature tables are open without DACO friction; raw WGS via ICGC DACO. Non-TCGA pan-cancer validation cohort for any HRD × IFN/eTreg stratifier trained on TCGA or HMF.

### CPTAC per-cohort proteogenomic anchors

The pan-CPTAC entry already in the corpus is the harmonized table. The per-cohort proteogenomic papers underneath it are the cleaner reference for each tumor type the project cares about — and the place to ground transcript-level CCR8 / IFN / MHC-II readouts in actual protein quantification:

- **HGSOC** — Zhang et al. *Cell* 2016 (174 tumors, paired global+phospho proteomics, BRCA1/2 status) plus McDermott et al. *Cell Rep Med* 2020 (83 tumors + fallopian-tube normal anchors). The protein-level reference for the same arena Luo 2024 operates in.
- **Breast** — Krug et al. *Cell* 2020 (~122 tumors with HRD scar + BRCAness, paired phosphoproteome). Pairs Pal 2021 BRCA1+/– scRNA and Wu 2021 atlas.
- **Endometrial** — Dou et al. *Cell* 2020 (95 tumors: 83 EEC + 12 serous; POLE/MSI/CN-high subtypes; BRCA1/2 status). Lets HRD-positive serous EEC be compared to MSI-high EEC — the project's MSI confounder check.
- **PDAC** — Cao et al. *Cell* 2021 (140 PDAC, 105 high-purity, BRCA1/BRCA2/PALB2 status). Protein layer pairing Hwang 2022 / GSE202051 snRNA from Layer 4.
- **CRC** — Vasaikar et al. *Cell* 2019 (110 tumors with MSI status). Substrate for testing whether HRD-driven CCR8 enrichment is disproportionate even relative to MSI-high CRC.
- *Adjuncts* — Gillette et al. *Cell* 2020 LUAD (110 + 101 NATs) and Huang et al. *Cancer Cell* 2021 HPV− HNSCC (108 + 66 NATs). No formal HRDsum, but they provide the IFN/MHC-II/STAT1 protein anchors needed for deconvolution QC. HNSCC additionally matches the indication where CHS-114 has its phase-I CCR8⁺Treg-depletion readout (NCT05635643).

The pan-CPTAC HRDsum harmonization (Loeffler et al., *npj Precision Oncology* 2022) lets all eight cohorts be queried with the same HRD score the bulk-RNA layer uses. CCR8 itself is below TMT detection in bulk CPTAC — so the project always cross-checks CCR8 via scRNA, never via CPTAC alone. STAT1, HLA-DRA/DRB1, CIITA, MX1, ISG15, OAS1, IFI6 are reliably quantified; PD-L1 and LGALS9 are detectable but sparse; FGL1 is reliable in HCC/LUAD only.

## Layer 2 — Human PARPi-treated single-cell

Sparser than the bulk layer, but not as sparse as the earlier draft implied.

### The anchor and its sister deposits

The Luo et al. *Cell* 2024 cohort (NCT04507841 neoadjuvant niraparib HGSOC) deposits three companion accessions:

- **GSE222556** — the main 10x scRNA-seq cohort. The primary substrate for defining the eTreg / IFN signature before rolling it out pan-cancer.
- **GSE269793** — Singleron scRNA-seq from additional patients in the same trial. Platform-independence test for the signature.
- **GSE222555** — paired Singleron scTCR-seq. The substrate for testing whether terminal eTregs and terminally exhausted CD8 share TCR-defined microniches, not just frequency.

Together these three are the densest human PARPi-treated single-cell + clonotype resource in the public record.

### Other paired-timepoint human PARPi biopsies — but single-cell *protein*, not RNA

Two multi-patient resources offer paired pre-PARPi vs on-PARPi biopsies, both single-cell, but at the **protein** rather than transcript level. They are not interchangeable with scRNA-seq:

- **Färkkilä et al. *Nat Commun* 2020 (TOPACIO; NCT02657889)** — recurrent ovarian, niraparib + pembrolizumab, 62 patients with t-CyCIF highly-multiplexed immunofluorescence. The IFN-response signature and the Treg fraction co-rise under treatment — the pre-Luo foreshadow of the Cell 2024 mechanism. Data on GitHub `farkkilab/pubs`; *no scRNA-seq deposit*.
- **Mitri et al. *medRxiv* 2024 (AMTEC)** — BRCA-WT metastatic TNBC, olaparib mono → olaparib + durvalumab, ~10 patients with serial biopsies. Spatial single-cell proteomics (CyCIF/mIHC) + bulk RNA + WES. Hosted in HTAN-OHSU. Worth running as the **negative control** for the pan-cancer claim: BRCA-WT mTNBC is HRD-low, so if the IFN→CCR8 chain still fires there, the claim is more genomic-scar-independent than the Luo HGSOC story alone implies; if it doesn't fire, the chain depends on HRD-deep tumors.

### Spatial transcriptomics under PARPi maintenance

- **GSE288483** — Visium-class spatial transcriptomics, olaparib-maintenance HGSOC. Deposited September 2025; no anchor publication as of this writing — re-verify when the paper lands. The closest public spatial complement to the Luo dissociated scRNA: useful for asking whether CCR8⁺ eTregs and exhausted CD8 are *physically* co-located, which dissociated scRNA cannot answer.

### Human PARPi-treated *bulk* RNA — narrower than expected, but not empty

The pivotal PARPi trials are almost entirely DNA-only by protocol: PRIMA, SOLO-1/2, NOVA, PAOLA-1, POLO, MEDIOLA, OlympiAD, PROfound, ARIEL3, NEOTALA, and TALAPRO-1/2 either did not collect tumor RNA-seq or kept it under sponsor control via Vivli. Two cohorts are publicly deposited and worth running:

- **TOPARP-A/B** (Mateo et al., *Cancer Discovery* 2021) — ICR/Royal Marsden academic phase II of olaparib in mCRPC. Tumor biopsies, WES + RNA-seq, per-patient olaparib response. EGA controlled-access via the ICR DAC. **The only publicly-deposited PARPi-trial tumor bulk RNA-seq cohort.** Extends the PARPi-treated transcriptome arena to prostate, outside HGSOC.
- **GSE140996** (Christie et al.; Australian Ovarian Cancer Study sub-cohort) — AOCS PARPi-treated HGSOC bulk RNA + paired WGS, **fully open-access**. The closest second public PARPi-bulk-RNA dataset outside sponsor portals; the project can run HRD × IFN/eTreg signature scoring on this immediately.

Two cohorts is still tight. But TOPARP gives the project a prostate-resolved PARPi transcriptome where the chain can be tested, and GSE140996 gives a second HGSOC bulk cohort to cross-check the Luo 2024 single-cell findings at bulk resolution.

So the honest claim is: **GSE222556 + sisters is the only large, paired-timepoint, multi-platform human PARPi scRNA+TCR resource, and it is HGSOC-only.** The other human resources are smaller, protein-level, HRD-WT, or bulk-RNA (TOPARP, GSE140996).

## Layer 3 — Preclinical PARPi scRNA (the actual cross-tumor leverage)

This is where the search materially changed the picture. Public preclinical scRNA under PARPi covers TNBC, ovarian, PDAC, and SCLC — across HRD-high and HRD-low tumors, sensitive and resistant models, acute and chronic dosing.

- **Liang et al. *Nat Commun* 2024 (TAM_C3 / C5aR1 axis)** — paired PARPi-sensitive (LPA1-T22) vs PARPi-resistant (LPA1-T127) syngeneic TNBC plus the KPCA syngeneic ovarian model. Olaparib + AZD5305 (PARP1-selective) on a 4 / 8 / 20-day timecourse with >30,000 cells in the main experiment. The cleanest public dataset for *"what does the TME look like when a PARPi-naive sensitive tumor becomes resistant"* — directly relevant to the project's question of whether CCR8⁺ eTregs load or unload at resistance.
- **GSE276238 — Wang et al. *Mol Cancer Ther* 2025 (PDAC)** — mouse syngeneic PDAC (KPC-derived) with a full 4-arm design (vehicle / olaparib / radiotherapy / olaparib + RT) plus anti-PD-L1 combination. The only public PDAC PARPi scRNA dataset found. Tests the IFN→CD8 chain in a tumor type that is mostly HRD-low — a specificity test for the project's chain.
- **del Pino Herrera et al. bioRxiv 2025 (OVCAR3 persister)** — OVCAR3 (BRCA1-mut HGSOC line) under 2-month chronic olaparib, scRNA + RNA velocity comparing naive vs persister states. Tumor-cell-intrinsic only, no microenvironment. The cleanest map of the PARPi-persister cell state, complementing Liang's microenvironment-resolved resistance map.
- **Wang et al. *Nat Commun* 2025 (SCLC)** — mouse syngeneic SCLC + PDX, olaparib + RT + anti-PD-L1, scRNA + cGAS-STING readout. The only SCLC PARPi single-cell study found. SCLC has high baseline cytosolic DNA from replication stress but is largely HRD-low by genomic-scar — so the chain firing here would *separate* HRD-driven from cytosolic-DNA-driven IFN in the project's mechanistic argument.
- **Khan et al. *Nat Immunol* 2026 (host T-cell PARPi)** — mouse TIL scRNA across olaparib, niraparib, talazoparib showing PARPi expands the CD8 central-memory compartment via *host* DNA-damage signaling. The important caveat the project has to address: PARPi effects seen in TCGA bulk RNA could be host-immune-cell-intrinsic rather than tumor-IFN-driven.

Two foundational predecessors are worth keeping in the corpus even though they're not scRNA-seq:

- **Pantelidou et al. *Cancer Discov* 2019** — KB1P (K14cre-Brca1fl/fl-Trp53fl/fl) GEMM, olaparib activates STING in vivo in BRCA1-null TNBC. The mechanistic precedent every PARPi-IO paper cites.
- **Zhang et al. *Theranostics* 2021** — scRNA atlas of BRCA1-KO mouse mammary tumors across four molecular subtypes with subtype-resolved olaparib sensitivity. Useful as the "PARPi-responder TME" reference, though resistance trajectories are not the focus.

## Layer 4 — HRD-stratified human single-cell + spatial (PARPi treatment not required)

This is the layer the earlier draft of this blog missed entirely, and it is the one that matters most for the pan-cancer bet. The hook is **per-patient HRD or BRCA status reported at single-cell or spatial resolution** — whether the patient ever saw a PARPi is irrelevant.

### HGSOC HRD-stratified atlases

- **Vázquez-García et al. *Nature* 2022 (MSK-SPECTRUM)** — 42 treatment-naive HGSOC patients, 160 tumor sites, ~929k cells scRNA + paired WGS + mIF, with each case labeled HRD-Dup (BRCA1-like), HRD-Del (BRCA2-like), FBI (foldback-inversion), or TD (tandem-duplicator). SBS3 calls reported. The single best public substrate for projecting the Luo eTreg/IFN signature onto an HRD-stratified, treatment-naive HGSOC reference. Synapse `syn25569736`.
- **Olbrecht et al. *Genome Med* 2021** — 7 untreated HGSOC patients with germline BRCA1/2 noted per case (ArrayExpress `E-MTAB-8107`). Small but clean; pairs with Vázquez-García for cross-cohort consistency.
- **Stur et al. *iScience* 2022** — HGSOC Visium in a long-term-survivor cohort with BRCA1/2 status per case (`GSE211956`). The smallest-but-cleanest HGSOC-with-BRCA spatial dataset; useful for ligand-receptor crosstalk in HRD vs HRP samples.
- **Launonen / Färkkilä et al. *Nat Commun* 2022** — 44 HGSOC (31 BRCA1/2-mut, 13 HR-WT), 124,623 cells, 21-marker t-CyCIF. The cleanest published spatial-protein test of HRD-driven immune conditioning — the protein-level precursor to Luo 2024 — and the obvious external validator for the project's HGSOC findings.
- **HTAN HMS-Ovarian (Sorger / Färkkilä)** and **HTAN HTAPP-Ovarian (Broad/DFCI)** — both deposit paired WGS + t-CyCIF / snRNA + spatial with curated HRD calls per case. The HTAN extension of MSK-SPECTRUM with spatial pairing. Synapse `syn22000242` / `syn22000241`.

### Breast (where BRCA1+/– biology is most legible)

- **Pal et al. *EMBO J* 2021 (`GSE161529`)** — the rare per-patient germline-BRCA1 single-cell deposit, with explicit BRCA1+/– *preneoplastic* tissue (69 specimens, ~340k cells). Critical for asking what BRCA1-heterozygous epithelium looks like *before* tumor — the IFN baseline reference for the project.
- **Wu et al. *Nat Genet* 2021 (Swarbrick lab, `GSE176078`)** — 26 primary tumors, 130k cells, scRNA + CITE-seq + Visium; germline BRCA status flagged for a TNBC subset. The de-facto reference breast TME atlas; includes IFN-response cancer-cell states the project will project onto.
- **Bassez et al. *Nat Med* 2021 (BIOKEY, `EGAS00001004809`)** — 40 BC patients on anti-PD-1, ~175k cells scRNA + CITE + TCR with paired pre/on-treatment biopsies. The best public proof that CXCL13⁺ CD8 + Tex predict ICB response in breast — central to the exhausted-CD8 arm of the chain, even without PARPi.

### Pancreatic and ovarian PDO

- **Hwang et al. *Nat Genet* 2022 (`GSE202051`)** — 43 PDAC patients, ~225k nuclei snRNA + paired Slide-seqV2; BRCA1/2/PALB2 genotype noted in the HTAN HTAPP subset. The human PDAC reference that pairs with the syngeneic GSE276238 dataset from Layer 3.
- **Kopper et al. *Nat Med* 2019 (HUB Foundation)** — 56 organoids from 32 HGSOC / LGSOC / clear-cell / endometrioid ovarian patients with per-PDO HRD scores, BRCA1/2 status, and **olaparib + niraparib IC50 measured per organoid**. The functional HRD × PARPi-response substrate; subsequent scRNA has been layered on subsets.

The headline for Layer 4: per-patient HRD or BRCA status at single-cell or spatial resolution exists for a far larger cohort than the PARPi-treated layer. The project can test the IFN→CCR8⁺ eTreg→exhausted CD8 chain against ~50–100 HRD-stratified human samples *before* needing any treated-outcome resolution.

## Layer 5 — Single-cell HR-gene perturbation (molecular fingerprint of HR loss)

A different kind of resource — not a tumor cohort, but a per-gene loss-of-function readout at single-cell resolution.

- **Replogle et al. *Cell* 2022** — K562 + RPE1 genome-scale CRISPRi Perturb-seq, ~2.5 million cells. The HR roster is explicitly included: **BRCA1, BRCA2, RAD51, RAD51C, RAD51D, PALB2, BRIP1, 53BP1 (TP53BP1), Shieldin (SHLD1/2/3), REV7 (MAD2L2)**. Lets the project ask, for each HR gene, *what does its loss look like transcriptionally* at single-cell resolution — the molecular fingerprint that any bulk-RNA HRD signature is implicitly trying to recover.

PARPi was not in the sci-Plex original (`GSE139944`, 188 compounds in A549/K562/MCF7) — verified. So sci-Plex is *not* a PARPi single-cell dose-response resource. The Replogle screen is the closer analog: the *genetic* version of "what does HR deficiency do at single-cell resolution," covering the genes a PARPi inhibitor effectively phenocopies.

## Layer 6 — Pan-cancer single-cell atlases and frameworks

These are not HRD-stratified but they are how the project will check that bulk-deconvolved signals correspond to real cells, and how it will place HRD tumors into the broader pan-cancer immune landscape.

- **Zheng et al. *Science* 2021** — pan-cancer T-cell atlas, 21 cancer types, 316 patients, ~390k T cells with paired TCR. Confirms CCR8 marks intratumoral eTregs across tumor types and supplies per-cancer eTreg fractions.
- **Cheng et al. *Cell* 2021** — pan-cancer myeloid atlas. The DC and macrophage reference for the DC–Treg conversation in HRD vs HRP samples.
- **Combes et al. *Cell* 2022 (IRIS)** — 364 tumors across 12 indications incl. HGSOC, breast, PDAC; ~1.5M live-cell scRNA + 28-color flow. The framework for placing HRD tumors into a pan-cancer immune-archetype map — answers "where does an HRD-high tumor sit among IRIS archetypes."
- **Chu et al. *Nat Med* 2023 (`GSE207422`)** — 308k T cells across 16 cancer types. Defines a TSTR (stress-response) state orthogonal to IFN/exhaustion that the project should disambiguate in HRD-high tumors — does HRD-driven IFN load the eTreg axis, the TSTR axis, or both?
- **Magen et al. *Nat Med* 2023 (HCC neoadjuvant anti-PD-1)** — the methodological gold standard for "DC + Tfh niche enables Tex differentiation" using paired scRNA + CITE + TCR + spatial. The protocol the project's CCR8-eTreg-niche analysis should mirror.
- **Nieto et al. *Genome Res* 2021 (TICAtlas)** — ~500k cells, 217 patients, 13 cancer types; the projection framework compatible with SPOTlight spatial deconvolution.
- **Tirosh lab *Nat Cancer* 2025 (3CA — Curated Cancer Cell Atlas)** — 124 datasets, 2,836 samples with recurrent cancer-cell metaprograms including an IFN-α/γ-response module. Lets the project compare HRD-driven IFN against a pan-cancer baseline rather than assert it in isolation.
- **Tay et al. *Cell* 2025** — anti-PD-1 NSCLC scRNA defines three Treg states post-treatment (proliferating, CCR8–, CCR8+). Direct CCR8 single-cell evidence on the immunotherapy axis; tests whether the eTreg compartment expands as a treatment effect, which matters for the project's PARPi → IFN → eTreg causal claim outside HGSOC.

## Layer 7 — IO-treated cohorts as cross-validators

The PARPi + anti-CCR8 combination has no clinical evidence. Anti-PD-1 monotherapy does. Testing the HRD × IFN/eTreg stratifier against actual IO response is the closest the project gets to a translational endpoint short of running its own trial — and the IO biomarker arena is richer than the PARPi-treated one.

### IO-trial bulk RNA (response + outcome paired)

- **IMvigor210** (Mariathasan et al., *Nature* 2018) — 348 metastatic urothelial-cancer tumors with pre-treatment RNA-seq + atezolizumab response/OS. Also packaged as the open `IMvigor210CoreBiologies` R package; the easiest IO-bulk-RNA arena to spin up. The TGF-β-excluded / T-effector-inflamed dichotomy every IO biomarker paper benchmarks against — directly comparable to the project's IFN/eTreg axis.
- **IMmotion150** (McDermott et al., *Nat Med* 2018, EGAD00001004183) and **IMmotion151** (Motzer et al., *Cancer Cell* 2020, EGAS00001004353) — 263 and 823 mRCC tumors, atezo ± bev vs sunitinib, RNA-seq + ORR/PFS/OS via EGA controlled-access (Genentech/Roche DAC). IMmotion151 is the largest IO+TKI transcriptomic ccRCC cohort, with a 7-cluster NMF subtype map (incl. an IFN/T-eff cluster) the project's stratifier maps directly onto.
- **Braun CheckMate-009/010/025** (Braun et al., *Nat Med* 2020, dbGaP `phs001493`) — 311 ccRCC tumors with RNA-seq + WES + nivo vs everolimus outcome, with clinical+molecular tables released as supplement. The most accessible IO-trial RNA cohort outside Genentech's EGA series — independent ccRCC validation of the HRD × IFN/eTreg stratifier.

Sponsor-controlled but published-signature-usable: JAVELIN Renal 101 (Pfizer portal), KEYNOTE-426 (Merck External Data Sharing), IMvigor010 (Genentech DAC), CheckMate-274 (BMS Vivli). These cannot be downloaded, but their published signature scores can be referenced as additional concordance points.

### IO single-cell anchors (paired pre/post + scTCR)

For testing CCR8 dynamics specifically — not just IFN signature scores — the relevant resources are paired pre/post IO scRNA cohorts with TCR:

- **Yost et al. *Nat Med* 2019 (`GSE123813`)** — 15 BCC/SCC patients with *site-matched paired pre+post* anti-PD-1 scRNA + scTCR (~79k cells). Gold-standard "clonal replacement" dataset; lets the project test whether CCR8⁺ eTreg clonotypes persist while CD8 clones turn over under IO.
- **Krishna et al. *Cancer Cell* 2021 (ADAPTeR, `EGAD00001008166`)** — 6 ccRCC patients longitudinal pre / on-Tx (week 9) / post nivolumab, scRNA + scTCR + WES + mIF (~167k cells). The only ccRCC longitudinal scRNA+TCR atlas; the TRM niche this dataset resolves is exactly where CCR8⁺ eTregs sit.
- **Caushi & Zhang et al. *Nature* 2021 (`GSE176021`)** — 20 NSCLC patients on neoadjuvant nivolumab with scRNA + scTCR + MANAFEST neoantigen-TCR mapping (~560k T cells). The only neoadjuvant lung dataset with neoantigen-resolved CD8 states — lets the project ask whether CCR8⁺ Tregs scale with MANA load.
- **Luoma et al. *Cell* 2022 (`GSE200996`)** — HNSCC neoadjuvant anti-PD-1, paired pre/post biopsies. The non-HGSOC tissue companion for the CHS-114 phase-I CCR8-depletion readout (NCT05635643).
- **Sade-Feldman et al. *Cell* 2018 (`GSE120575`)** — 32 melanoma patients, 48 biopsies, ~16k Smart-seq2 CD45+ cells with paired pre+post in 12 patients. Canonical melanoma IO scRNA dataset every Treg/exhaustion signature paper benchmarks against.
- **Bi et al. *Cancer Cell* 2021 (`SCP1288`)** — ccRCC nivo+ipi scRNA atlas. Orthogonal validation cohort to Krishna 2021 ADAPTeR.
- **Liu et al. *Nat Cancer* 2022 (`GSE179994`)** — longitudinal NSCLC anti-PD-1 scRNA + scTCR including on-treatment blood timepoints. Complements Caushi's tissue snapshot with peripheral clonotype dynamics.

None of these are PARPi cohorts. But they are where the CCR8⁺ eTreg → exhausted-CD8 chain has been measured most carefully in human IO — and if the project's stratifier doesn't track IO response in any of them, it almost certainly won't track PARPi + anti-CCR8 response either. The IO single-cell layer is the project's plausibility check before any combination claim.

## Layer 8 — Cell-line baseline and drug-perturbation

Three resources operate on cell lines rather than patient tumors. They give the rest-state expression frame, the per-PARPi perturbation signature, and the HR-gene dependency profile that any patient-level inference should sit on top of.

- **LINCS L1000 / CMap** (Subramanian et al., *Cell* 2017; `GSE92742` Phase 1 + `GSE70138` Phase 2) — olaparib, niraparib, talazoparib, rucaparib all profiled in the 9 core Touchstone lines and broader CMap panel. ISG15, IFI6, IFIT1, STAT1 are on the 978-transcript landmark set. The reference for asking per-cell-line whether a PARPi actually induces ISGs at all, and whether the magnitude tracks HRD genotype.
- **DepMap + PRISM** (Tsherniak et al., *Cell* 2017; Corsello et al., *Nat Cancer* 2020) — DepMap CRISPR/RNAi essentiality across ~1,150 lines for BRCA1, BRCA2, PALB2, RAD51, 53BP1 (TP53BP1), Shieldin (SHLD1/2/3), REV7 (MAD2L2). PRISM gives all four PARPi in the primary 4,518-compound × ~578-line screen and the 8-dose × 1,448-compound × 499-line secondary. The cell-line genetics + drug-sensitivity layer underneath the HRD-*functional* axis the project wants (versus HRD-genomic-scar alone).
- **CCLE bulk RNA + proteomics** (Ghandi et al., *Nature* 2019; Nusinow et al., *Cell* 2020) — ~1,400 lines with RNA-seq and 375 lines with TMT10 proteomics (~12,755 proteins). Baseline ISG (ISG15, IFI6, MX1, STAT1, IRF7), MHC-II, PD-L1, LGALS9, CCR8 expression per line at the transcript and protein level. The rest-state reference Replogle Perturb-seq fingerprints and L1000 PARPi signatures sit on top of.

Concrete use: before touching any patient cohort, the project can ask (i) does this PARPi induce an ISG response at all in this cell line — L1000; (ii) which HR-gene losses are growth-essential there — DepMap; (iii) what the baseline ISG/MHC-II/CCR8 state is — CCLE RNA and proteomics. The cell-line layer answers the "does the mechanism work at all in this context" question that bulk-tumor inference cannot.

## Layer 9 — What is *not* public, and what the project therefore cannot do

Honest list of holes:

- **No public scRNA from PRIMA, SOLO-1/2, NOVA** (pivotal ovarian PARPi-maintenance trials). All bulk + outcome.
- **No public scRNA from POLO** (olaparib BRCA pancreas maintenance). Bulk biomarker only.
- **No public scRNA from MEDIOLA** (olaparib + durvalumab BRCA breast). Multiplex IF only in published outputs.
- **No public scRNA from NEOTALA** (talazoparib gBRCA TNBC neoadjuvant). Bulk + WES.
- **No public scRNA from TALAPRO-1/2** (talazoparib mCRPC). Bulk + WES.
- **No public PARPi-arm scRNA from any ATR / WEE1 / CHK1 combination trial** (e.g., OLAPCO ceralasertib + olaparib).
- **No PARPi compound in the sci-Plex original (GSE139944).** sci-Plex screens 188 compounds in A549/K562/MCF7 — olaparib was not among them. So no public sci-Plex PARPi dose-response single-cell data exists.

What this means concretely: the project cannot run a **PARPi-treated × outcome-paired** scRNA analysis at any scale beyond the Luo cohort. The pan-cancer claim has to be made by **stratification plus signal concordance**, framed as hypothesis-generating for a future trial — exactly as the [pan-cancer bet](the-pan-cancer-bet.md) already states.

## What this changes for the project

Seven updates to the analysis plan, once Layers 4–8 are folded in:

1. **Aim 1 (HRD landscape) gains a single-cell anchor + a metastatic-WGS arena + non-TCGA validation.** Bulk RNA + GerkeLab/TCGAhrd is still the spine, but Vázquez-García MSK-SPECTRUM (~929k cells across 42 HGSOC patients with HRD-Dup/Del/FBI/TD per case) cross-validates the bulk HRD landscape at single-cell resolution in HGSOC; **HMF + CHORD** brings 5,100+ metastatic patients with WGS-grade HRD calls and matched RNA-seq into the arena — the population PARPi + anti-CCR8 actually treats; **PCAWG** gives a non-TCGA pan-cancer SBS3 + RS3/RS5 validation cohort the stratifier can be tested against out-of-distribution.
2. **Aim 2 (CCR8/IFN deconvolution) gains cross-tumor preclinical scRNA + HRD-stratified human validators + per-cohort CPTAC protein anchors.** GSE276238 (PDAC) and Wang 2025 (SCLC) test whether the chain fires in HRD-low tumors; Liang 2024 (TNBC + ovarian) tests whether it modulates at resistance; Launonen/Färkkilä 2022 mIF and Pal 2021 BRCA1+/– give HRD-stratified human references beyond HGSOC; and the per-cohort CPTAC proteogenomics (Zhang 2016 / McDermott 2020 HGSOC, Krug 2020 breast, Dou 2020 UCEC, Cao 2021 PDAC, Vasaikar 2019 CRC) ground STAT1 / MHC-II / ISG-product / LGALS9 readouts at protein level across the project's core tumor types.
3. **Aim 3 (signature mechanics) gains a per-gene molecular fingerprint + a cell-line essentiality + drug-sensitivity layer.** Replogle 2022 Perturb-seq covers BRCA1, BRCA2, RAD51, RAD51C/D, PALB2, BRIP1, 53BP1, Shieldin (SHLD1/2/3), REV7 at single-cell resolution; **DepMap + PRISM** adds per-line HR-gene essentiality and per-line PARPi sensitivity across ~1,150 cell lines; **LINCS L1000** adds the per-line PARPi → ISG perturbation signature. Together they let the project separate genomic-scar HRD from functional HRD on a principled basis and check whether each PARPi actually induces ISGs in HRD-relevant lines before extrapolating to tumors.
4. **Aim 4 (pan-cancer placement) gains an immune-archetype frame.** Combes IRIS, Nieto TICAtlas, Tirosh 3CA, and Chu T-stress let the project place HRD-high tumors into a pan-cancer immune-archetype map and disambiguate IFN-driven from stress-driven T-cell states. The "HRD-high × IFN/eTreg-high" subgroup the [pan-cancer bet](the-pan-cancer-bet.md) calls for becomes a labelled region of an existing archetype space, not a free-floating claim.
5. **Aim 5 (clinical concordance) gains a real proxy via IO-trial bulk RNA cohorts.** IMvigor210 (mUC), IMmotion150/151 (mRCC), and Braun CheckMate-009/010/025 (ccRCC) supply ~1,700 patients with paired transcriptomes + actual IO outcome — the closest the project gets to testing whether HRD-high × IFN/eTreg-high tracks response in a real clinical cohort, before any PARPi combination argument. The stratifier should track IO response in at least some of these cohorts if it tracks anything at all.
6. **Aim 6 (translational hypothesis) gains a caveat surface, a non-HGSOC CCR8 anchor, AND a public PARPi-treated transcriptome outside HGSOC.** Khan 2026 means the project has to argue why a TCGA-bulk-RNA CCR8 signal is tumor-intrinsic mechanism rather than peripheral-T-cell-trafficking artifact — and the AMTEC paired biopsies are the obvious negative control. Tay 2025 NSCLC anti-PD-1 gives the first non-HGSOC single-cell evidence that the CCR8⁺ Treg compartment behaves as a treatment-responsive axis. And **TOPARP-B** (Mateo 2021, olaparib mCRPC tumor RNA + outcome via EGA) is the only publicly-deposited PARPi-trial tumor bulk RNA-seq cohort — it lets the IFN/eTreg signature actually be scored against PARPi response in a non-HGSOC tumor type.
7. **Aim 7 (CCR8 dynamics under IO) becomes addressable.** The IO single-cell anchors — Yost BCC/SCC paired pre+post + scTCR, Krishna ADAPTeR ccRCC longitudinal, Caushi NSCLC with MANAFEST, Luoma HNSCC neoadjuvant, Sade-Feldman melanoma — let the project ask, at clonotype resolution, whether CCR8⁺ eTreg clones persist while CD8 clones turn over under IO, and whether CCR8⁺ Tregs scale with neoantigen load. This is the structural prerequisite for arguing a PARPi + anti-CCR8 combination should outperform either alone.

The headline: the project is still HGSOC-anchored on the *human PARPi-treated single-cell* side, but Layers 4–8 supply a much wider cross-tumor base — HRD-stratified human single-cell + spatial (Layer 4), per-gene HR-loss Perturb-seq (Layer 5), pan-cancer immune-archetype frames (Layer 6), IO-treated bulk RNA + scRNA + scTCR cohorts where the chain's downstream half has been measured most carefully (Layer 7), and a cell-line baseline + perturbation layer to plausibility-check the mechanism per line before extrapolation (Layer 8). That is the level of cross-tumor data the chain needs to be stress-tested against before the [pan-cancer bet](the-pan-cancer-bet.md) makes sense as a stratifier rather than a generalization.
