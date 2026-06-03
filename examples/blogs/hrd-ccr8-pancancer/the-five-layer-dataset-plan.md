---
title: 'the five-layer dataset plan — what each dataset does, how many patients, and the verification logic'
date: '2026-06-02'
topics:
- hrd
- pan-cancer
- discovery
- validation
- perturbation
- atlas
- analysis-plan
summary: 'The single canonical map of how the 190-item corpus is going to be used. Five tables: datasets keyed to each step of the discovery → validation framework, the patient × modality × cancer-type matrix with verified counts from the source papers, the three verification mini-atlases and how each member is used, the five strategies for using perturbation data to mimic the HRD/HRP contrast, and the paired HRP atlas that prevents the whole project from being descriptive only. The 5-layer analysis plan is embedded after the tables. Standing point is HRD in pan-cancer — the CCR8/IFN axis is one candidate output of axis emergence, not the framing.'
starred: true
---

This blog replaces two earlier inventories (`the-data-we-have-to-work-with` and `the-hrd-resource-map`, now in `_archive/`) with a single step-keyed map. The earlier essays were chronological and by-family — useful for orientation, but neither says *what each dataset is for inside the analysis*. This one does.

The companion essay [the gaps that built each resource](the-gaps-that-built-each-resource.md) covers *why* each dataset was created. This blog covers *how the project uses each one*. The pan-cancer framing — broader than the Luo 2024 CCR8 chain — is established in [the pan-cancer bet](the-pan-cancer-bet.md); read that first if the project framing isn't familiar.

## The five layers, in one paragraph

The project shape is **discovery → validation, anchored to patient genomics**. Pre-Layer-1 reconciles the multi-modal definition of HRD itself across scoring methods. **Layer 1** assembles a patient-level multi-omic record from public WGS + bulk-RNA + single-cell + spatial cohorts in HRD-relevant cancers. **Layer 2** does axis emergence — unsupervised clustering of HRD-positive patients on transcriptional and spatial features, surfacing whichever immune/stromal/replication-stress axes separate HRD subgroups across multiple cancer types. **Layer 3** validates those axes genetically — does perturbing an HR gene reproduce the patient-level signature cell-autonomously? Replogle Perturb-seq, DepMap, LINCS L1000. **Layer 4** validates functionally — do PDOs and PDX with HRD genotype respond to PARPi the way the axes predict? **Layer 5** confirms in clinical perturbation: BIOKEY paired anti-PD-1 biopsies, trial responder calls from PROfound/MAGNITUDE/OlympiAD. The endpoint is a stratifier — a multi-modal HRD definition plus whichever druggable axis emerges — that would justify a future PARPi-plus-combination trial.

## What's in each table

Five tables, each answering one question:

- **Table 1.** Which datasets belong to which step?
- **Table 2.** For the discovery side: how many patients, in which cancers, with which modalities?
- **Table 3.** For the verification side: which datasets can merge into a single mini-atlas, and how is each member used?
- **Table 4.** Can perturbation data mimic the HRD-versus-HRP patient contrast? Which strategies, and what does each leave on the table?
- **Table 5.** What does the paired HRP (HR-proficient) atlas look like, and which confounders has to be controlled?

All counts in the tables below are extracted from the source publications or live data portals during a parallel-research pass (2026-06-02). Where the paper and the deposit disagree, the table reports the paper's method-section count and notes the discrepancy.

---

## Table 1 — datasets per analysis step

| Step | Datasets | Primary use |
|---|---|---|
| **0. HRD definition concordance** | HRDetect (Davies 2017), CHORD (Nguyen 2020), scarHRD (Sztupinszki 2018), Myriad myChoice (Telli 2016), ovaHRDscar (Färkkilä 2023), DeepHRD (Bergstrom 2024), expHRD, BRCA1-methylation, MSK-IMPACT/CHORD panel-derived, Tempus HRD-RNA, FoundationFocus LOH | Run every scorer on every cohort with the required input modality. Output a concordance map: HRD-concordant (all-agree), HRD-discordant (scorers disagree), HRD-negative. Discordance is the per-patient label for Layer 2. |
| **1a. Patient atlas — genomic backbone** | TCGA pan-cancer (Knijnenburg 2018 HRD calls), PCAWG, HMF (Priestley 2019 + CHORD), MSK-CHORD (Jee 2024), CPTAC pan-cancer, AACR Project GENIE, FMI-Flatiron CGDB, ORIEN AVATAR | One row per patient — HR-gene status, HRD score, treatment history, OS/PFS. Scale + outcome backbone. |
| **1b. Patient atlas — sc + spatial layer** | Vázquez-García 2022 (HGSOC), Olbrecht 2021 (HGSOC), Pal 2021 (BRCA1 breast), Wu 2021 (breast), BIOKEY/Bassez 2021 (breast anti-PD-1), Hwang 2022 (PDAC), Launonen 2022 (mIF HGSOC), Stur 2022 (Visium HGSOC), 3CA, CellxGene Census, TISCH2, TICAtlas, IRIS, Chu 2023 | Cell-state + spatial-niche layer over the genomic backbone for the subset of patients with paired sc/spatial. Hubs (3CA, CellxGene, TISCH2) used for cross-cohort harmonization; cohorts re-hosted by hubs are not double-counted (see Table 2 footnote). |
| **2. Heterogeneity + hazard** | TCGA-survival + Knijnenburg, HMF longitudinal, MSK-CHORD outcome, AACR Project GENIE BPC, PROfound, MAGNITUDE, OlympiAD, OlympiA, SOLO-1, ARIEL3, NOVA, TOPARP-A/B (Mateo 2021), Christie 2019 AOCS | Cluster HRD+ patients on Layer-1 features; Cox-regress on outcome. Primary outcome PARPi response; secondary platinum response, OS, IO response. |
| **3. Genetic validation** | Replogle 2022 Perturb-seq (K562 + RPE1), DepMap CRISPR + RNAi, CCLE (RNA + proteomics), LINCS L1000, PRISM | sgHR-gene vs sgCtrl in Replogle = cell-autonomous synthetic-HRD signature; compare to the patient-derived signature from Layer 2. DepMap + PRISM for orthogonal essentiality + drug-sensitivity; LINCS L1000 for the drug-perturbation complement. |
| **4. Functional validation** | Kopper 2019 (HUB ov), Hill 2018 (HGSOC PDO), Tiriac 2018 (PDAC), Driehuis 2019 PDAC, Bruna 2016 (breast PDTX), van de Wetering 2015 (CRC), PDMR, EurOPDX, HCMI/NGCM, Xeva (Mer 2019) | Tissue-context modifier of the cell-line signature. PDO PARPi IC50 vs HRD × emergent-axis score; PDX confirms at xenograft scale. |
| **5. Clinical perturbation** | BIOKEY (Bassez 2021), TOPARP-A/B per-patient transcriptomes, Christie 2019 AOCS, downstream PROfound-ctDNA + MAGNITUDE-ctDNA substudies | Does the predicted axis move under treatment? Anti-PD-1 paired pre/on biopsy (BIOKEY) + PARPi-treated patient transcriptomes where publicly accessible. |
| **(Paired) HR-proficient (HRP) control atlas** | HR-WT slice of every Layer-1 dataset, matched on cancer type / stage / treatment history; MSI-H and POLE/POLD1 cases excluded | The case-control side. Without it, the project is descriptive of HRD tumors but cannot claim specificity. See Table 5. |

Two notes on the table.

**Trial cohorts are Layer-5 only, not Layer-1.** All seven pivotal PARPi trial publications (PROfound, MAGNITUDE, OlympiAD, OlympiA, SOLO-1, ARIEL3, NOVA) released outcome data only; per-patient tumor transcriptomes are sponsor-controlled and have not been deposited publicly. The only PARPi-treated cohorts with public per-patient transcriptomes are TOPARP-A/B (Mateo 2021, EGA controlled-access via ICR DAC) and Christie 2019 AOCS (GSE140996). Those two join the discovery atlas; the seven pivotal trials only contribute to the outcome layer.

**Hubs do not double-count.** 3CA (124 datasets) and CellxGene Census (1,845 datasets / 162M cells / 99.6M unique) re-host most of the named Layer-1b cohorts. Vázquez-García 2022, Pal 2021, Wu 2021, BIOKEY 2021, and Hwang 2022 appear inside both. TISCH2 (190 datasets / 6.3M tumor cells) re-hosts Pal, Wu, and BIOKEY. Chu 2023 (308k T cells) re-uses Wu and BIOKEY T cells. The patient counts in Table 2 belong to the *primary* cohorts; the hubs are used for cross-cohort harmonization, not as independent contributors.

---

## Table 2 — patient × modality × cancer (discovery side)

Counts are from the source paper's methods section (post-QC where applicable; tumor-cell post-QC for single-cell cell counts). Modality marks: **✓** available, **◐** available for a documented subset of the cohort, **–** not in this dataset.

Columns: WGS, WES, RNA (bulk), scRNA (post-QC tumor cell count parenthesized), scATAC, Vis (Visium), SS (Slide-seq), DSP (GeoMx DSP), mIF (multiplex IF / t-CyCIF), TCR, CITE, Prot (proteomics), Met (methylation), Pan (panel-DNA), Clin (clinical), Out (outcome).

### Genomic backbone

| Dataset | Cancer | N patients | HRD+ subset | WGS | WES | RNA | Pan | Met | Prot | Clin | Out |
|---|---|---|---|---|---|---|---|---|---|---|---|
| TCGA pan-cancer (Knijnenburg 2018 HRD calls over 8,739 of PanCanAtlas) | 33 types | 9,125 | per-organ in Knijnenburg 2018 Fig 2 | ◐ | ✓ | ✓ | – | ✓ | – | ✓ | ✓ (OS, PFI) |
| PCAWG (ICGC/TCGA 2020) | 38 histologies | 2,658 donors | partial (SBS3 from Alexandrov 2020) | ✓ | – | ◐ (n=1,222) | – | – | – | ◐ | – |
| HMF — Hartwig (Priestley 2019) | 25 + CUP, metastatic | 2,399 (from 4,018 enrolled) | CHORD per-sample (Nguyen 2020) | ✓ | – | – | – | – | – | ◐ | – (treatment history, no formal OS) |
| MSK-CHORD (Jee 2024) | 5 — NSCLC 7,809, breast 5,368, CRC 5,543, prostate 3,211, PDAC 3,109 | 24,950 | partial (HR-gene mutation status; HRDsum not computable from panel) | – | – | ◐ | ✓ (MSK-IMPACT) | – | – | ✓ | ✓ (OS, time-to-met, NLP response) |
| CPTAC pan-cancer (Li 2023) | 10 — BRCA, COAD, GBM, HGSC, HNSCC, LSCC, LUAD, PDAC, ccRCC, UCEC | 1,072 | partial (WGS-derivable; not in flagship table) | ◐ | ✓ | ✓ | – | ✓ | ✓ (incl. phospho/acetyl/glyco) | ✓ | ◐ (stage, OS; no RECIST) |

### Single-cell + spatial layer

| Dataset | Cancer | N patients | HR+ subset | WGS | RNA | scRNA (post-QC) | Vis | SS | DSP | mIF | TCR | CITE | Clin | Out |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Vázquez-García 2022 (MSK-SPECTRUM) | HGSOC | 42 (160 sites) | per-case WGS class (HRD-Dup, HRD-Del, FBI, TD) | ✓ | – | ✓ (~929k all-compartment) | – | – | – | ✓ | – | – | ◐ | – (treatment-naive) |
| Olbrecht 2021 (Lambrechts) | HGSOC | **7** (14 multi-site samples) | per-patient BRCA1/2 in Table 1; small N | – | – | ✓ (18,403) | – | – | – | – | – | – | ◐ | – |
| Pal 2021 (Visvader/Lindeman) | breast — BRCA1 carriers + sporadic + normal | 55 (69 libraries) | 8 BRCA1+ samples (4 preneoplastic + 4 tumor) | – | – | ✓ (~341k) | – | – | – | – | – | – | ◐ | – |
| Wu 2021 (Swarbrick) | breast — 11 ER+, 5 HER2+, 10 TNBC | 26 | small TNBC BRCA1 subset | ◐ | – | ✓ (130,246) | ✓ (11,535 spots / 6 sections) | – | – | – | – | ✓ (157-Ab TNBC) | ✓ | – |
| BIOKEY (Bassez 2021) | breast anti-PD-1 | 40 (80 paired biopsies) | not stratified by HRD | – | – | ✓ (~175k) | – | – | – | – | ✓ | ✓ | ✓ | response — T-cell "expander" vs not |
| Hwang 2022 (HTAN PDAC) | PDAC | 43 (41 tumor + 2 normal) | small (single-digit BRCA/PALB2 in HTAPP arm) | ◐ | ✓ | ✓ (224,988 nuclei) | – | – | ✓ (GeoMx DSP on 21 tumors) | – | – | – | ✓ | – (treatment-arm comparison) |
| Launonen 2022 (Färkkilä) | HGSOC | 44 — 31 BRCA1/2-mut + 13 HR-WT | 31 BRCA1/2-mut | – | – | – | – | – | – | ✓ (t-CyCIF, 21 markers, 112 TMA cores, 124,623 cells) | – | – | ◐ | ◐ (prognostic signal for proliferative tumor subpop) |
| Stur 2022 (HGSOC NACT) | HGSOC | 12 enrolled / 11 sections analyzed | **not BRCA-stratified** — cohort is RECIST 1.1 NACT response (6 excellent vs 5 poor) | – | – | – | ✓ (~5k spots / capture area) | – | – | – | – | – | ✓ | NACT response (not OS/PFS) |

### PARPi-treated cohorts with public per-patient transcriptomes (join the discovery atlas)

| Dataset | Cancer | N patients | Treatment | WGS | RNA | Clin | Out |
|---|---|---|---|---|---|---|---|
| TOPARP-A/B (Mateo 2021) | mCRPC | 49 + 98 = 147 across phases | olaparib | ✓ (subset) | ◐ | ✓ | response (composite) |
| Christie 2019 AOCS | HGSOC | ~93 | platinum + olaparib maintenance | – | ✓ | ✓ | PFS by HRD score |

Footnote on counts.

**Counts methodology.** Patient N is the source paper's methods-section value; for multi-site studies (Vázquez-García, Olbrecht), N is reported as patients with site count parenthesized — the deposited-sample count is not the patient count. Single-cell counts are post-QC tumor-cell counts where the paper reports them separately; where only the global post-QC count is available (Vázquez-García, BIOKEY, Wu) that is what is shown, with the qualifier in the table.

**HRD-positive subset N is heterogeneous and definition-dependent.** TCGA HRD+ called by HRDetect ≠ HRD+ called by Knijnenburg HRDsum ≠ HRD+ called by BRCA1/2 mutation. The analysis plan uses HRDetect where WGS is available (TCGA, PCAWG, HMF, CPTAC, Vázquez-García) and panel-derived HR-gene mutation status where only panel-DNA is available (MSK-CHORD, AACR GENIE). Discordance between definitions becomes the Layer-2 substrate, not noise.

---

## Table 3 — verification mini-atlases

Three mini-atlases worth assembling. Each row names what gets merged, what joint analysis becomes possible, and where the harmonization risk lives.

| Mini-atlas | Members | Joint analysis enabled | Harmonization risk |
|---|---|---|---|
| **HR-gene perturbation reference** | Replogle 2022 Perturb-seq (K562 + RPE1, ≥2.5M cells, genome-scale CRISPRi) + DepMap CRISPR + RNAi (~1,100 lines) + CCLE RNA (1,019 lines) + CCLE proteomics (Nusinow 2020, 375 lines × ~9k proteins) + LINCS L1000 (1.3M profiles, 25,200 perturbagens, 978 landmark genes, 80 cell lines) | Per-HR-gene transcriptional signature (single-cell from Replogle, bulk from LINCS) plus per-cell-line essentiality + PARPi sensitivity (DepMap + PRISM), aligned on the same lineage taxonomy via CCLE baseline. Yields the cell-autonomous synthetic-HRD signature that Layer 2's patient-derived signature gets compared against. | Replogle is K562 (CML) + RPE1 (non-cancer epithelium). No tumor lineage, no immune context. The cell-autonomous claim is what Replogle can support; everything else needs Layer 4. |
| **PDO PARPi-response atlas** | Kopper 2019 (56 ovarian PDOs / 32 patients, niraparib IC50, no olaparib in published panel) + Hill 2018 (33 HGSOC short-term cultures / 22 patients, olaparib IC50 + functional RAD51-foci, ~2/33 olaparib-sensitive) + Tiriac 2018 (66 PDAC PDOs, olaparib in investigational arm) + Driehuis 2019 PDAC (30 PDOs, 24 pharmacotyped, 76-cpd panel with olaparib) + Bruna 2016 (~83 breast PDTX / ~70 donors, 22 in 96-cpd PDTC screen with olaparib, BRCA1/2 + 53BP1/REV7 lesions called) + van de Wetering 2015 (22 CRC PDOs / 20 donors, 83-cpd panel, no PARPi in published panel) | PARPi IC50 vs HR-genotype × emergent-axis score across organs. The within-organ comparison anchors specificity (HGSOC + breast + PDAC); CRC is included as the negative control where HRD biology should not predict response. | Single-agent vs panel screen mixing; PARPi included varies (niraparib only in Kopper; olaparib in Hill, Tiriac investigational arm, Driehuis, Bruna; absent in Driehuis HNSCC and van de Wetering). IC50 dynamic range is not directly cross-screen comparable. |
| **PDX PARPi-response atlas** | PDMR (~220 matched PDX↔PDOrg↔PDC sets, 85+ disease types, olaparib + niraparib in PDC arm) + EurOPDX (1,010 PDX, 7 countries, 283 with drug-dosing, Curie HBCx documents PARPi data) + HCMI/NGCM (148 NGCM models, 62 with full molecular data, no standardized drug screen) + Xeva (Mer 2019, 3,470 PDX integrated, 191 patients in primary PG analysis, olaparib in 51-drug panel) + Champions TumorGraft | In-vivo drug response × HRD genotype, longer treatment dynamics than PDO. PDMR and EurOPDX are the open contributors; Champions adds patient-correlation depth at the cost of commercial access. | Inter-institutional PDX screens are dose-schedule heterogeneous. Use PDMR as the harmonization spine, EurOPDX as the organ-broadening layer, and Xeva as the integration analytic. |

### Per-dataset use map

**Genetic-perturbation members:**

- **Replogle 2022.** Pull sgRNAs for the full HR panel — BRCA1, BRCA2, PALB2, RAD51, RAD51B/C/D, BRIP1, BARD1, ATM, ATR, CHEK1, CHEK2, NBN, MRE11A, RAD50, FANCA-G, FANCD2, FANCM, TP53BP1, SHLD1/2/3, MAD2L2 (REV7), USP1, POLQ — and compute the post-perturbation transcriptional signature versus sgCtrl. Output: per-HR-gene transcriptional fingerprint at single-cell resolution, in K562 and RPE1 separately. Caveat: the gene list is *expression-gated* — must verify against Table S3 before downstream use.
- **DepMap (Tsherniak 2017 + current).** CRISPR + RNAi essentiality of HR-pathway genes across all lineages. Output: per-line HR-gene dependency score. Cross-reference with PRISM PARPi IC50 to test the prediction "HR-essential lines are PARPi-sensitive."
- **PRISM (Corsello 2020).** All four FDA-approved PARPi confirmed (olaparib, niraparib, rucaparib, talazoparib, veliparib). Primary 4,518-cpd × 578-line single-dose 2.5 µM; secondary 8-point 4-fold dilution from 10 µM × 499 lines. The cross-line PARPi sensitivity reference.
- **CCLE.** Baseline RNA (1,019 lines) and proteomics (Nusinow 2020, 375 lines × ~9k proteins). The "rest state" that LINCS perturbation signatures and Replogle Perturb-seq fingerprints sit on top of. Use to identify the always-on-ISG and always-on-IFN cell lines as positive controls.
- **LINCS L1000.** PARPi compound treatment signatures on the 9 Touchstone lines (and the broader 80-line panel); covers all 5 PARPi at 10 µM standard. Bulk-RNA complement to Replogle's single-cell genetic-perturbation data.

**PDO members:**

- **Kopper 2019.** Ovarian-organ specificity for niraparib response, BRCA1/2 status documented per line. Use as the within-organ test for ovarian.
- **Hill 2018.** The functional RAD51-foci readout — the rare PDO collection that publishes both genomic HR-status *and* the functional HR-deficiency assay. Use to validate that genomic HRD calls and functional HR-deficiency converge.
- **Tiriac 2018, Driehuis 2019 PDAC.** Within-organ test for PDAC. Tiriac links PDO chemo-sensitivity to clinical outcome — rare and important.
- **Bruna 2016.** Breast PDTX with BRCA1/2 + 53BP1/REV7-loss lesions called per model — supports the BRCA-driven vs resistance-mechanism contrast at within-cohort scale.
- **van de Wetering 2015.** CRC PDOs — the negative-control organ where the HRD signature should *not* predict PARPi response. No PARPi in the published panel, so it functions as a transcriptional negative control.

**PDX members:**

- **PDMR.** The portal-queryable BRCA1/2/PALB2/RAD51C/D-stratified PDC arm with olaparib + niraparib in the standard panel. Use as the open PDX-side spine.
- **EurOPDX.** Adds organ-breadth (1,010 models, 7 institutions). Curie HBCx is the documented PARPi-tested subset.
- **HCMI/NGCM.** No standardized drug screen, but 62 cases with full WGS/WES/RNA — useful as molecular-only validation, not pharmacological.
- **Xeva (Mer 2019).** The pharmacogenomics integration framework — olaparib is in the 51-drug panel across 3,470 integrated PDX records. Use the Xeva R package for the cross-PDX analytic.

---

## Table 4 — perturbation as HRD/HRP mimic

The discovery side compares HRD-positive vs HR-proficient patients. The perturbation side has to mimic that contrast in models. Five strategies, ranked by directness — the *most* direct (Strategy A) is what allows a *causal* read; the rest are correlative or contextual:

| Strategy | What it mimics | Datasets | Limitation |
|---|---|---|---|
| **A. Genetic HR-gene KO at single-cell** | Cell-autonomous HR-deficient transcriptional state versus matched parental cells. The contrast is sgBRCA1 / sgBRCA2 / sgPALB2 / sgRAD51 / sgSHLD1-3 / sgTP53BP1 / sgREV7 vs sgCtrl, post-perturbation profiled at single-cell resolution. | Replogle 2022 Perturb-seq (genome-scale, K562 + RPE1) | K562 (CML) + RPE1 (non-cancer epithelium). No tumor lineage, no stroma, no immune. Cell-autonomous claims only. |
| **B. CRISPR essentiality + drug-sensitivity association** | "Cell lines that depend most on HR genes are the most PARPi-sensitive" — the indirect read on HR-pathway state. | DepMap CRISPR + RNAi + PRISM PARPi | Cell-line BRCA1/2-mut lines are scarce (~30 across CCLE); essentiality mixes lineage-specific bystander signals. |
| **C. PARPi drug perturbation** | Pharmacologically induced HR-stress signature — what does the cell look like 6/24 h after PARPi exposure? | LINCS L1000 (Touchstone 9 lines × all 5 PARPi at 10 µM); PRISM PARPi 8-point dose-response | Acute drug response ≠ chronic HRD state. Captures replication stress, not constitutive HR-deficiency. |
| **D. Isogenic HR-gene KO in matched-donor PDOs** | Same-donor HR-proficient vs HR-deficient, in human tumor or normal-tissue organoid. The cleanest within-donor causal contrast for tumor-context HRD. | **Not in the current corpus.** Candidate: the Dekkers / van Rheenen / Clevers CRISPR-engineered isogenic BRCA-KO PDO protocol (2020) on Sachs 2018 breast PDO biobank parents. | Sparse, donor-specific, slow to scale. |
| **E. In-vivo Brca-conditional mouse models** | HR-deficient tumor in an immune-competent host — the only setting where the immune microenvironment co-evolves with HR-deficiency from tumor initiation. | **Not in the current corpus.** Candidates: Jonkers KB1P (K14-Cre;Brca1^f/f;Trp53^f/f, 2007, basal TNBC), KB2P (Brca2, 2010), WB1P (Wap-Cre;Brca1^f/f;Trp53^f/f, 2022, luminal); Perets/Drapkin Pax8-Cre Brca1/2 HGSOC GEMM (2013); Dreyer/Sansom KPC-Brca2 PDAC (2021). | Mouse-not-human; allele drift; immune system not perfectly representative. |

### Corpus-gap discussion — D + E

Strategies A, B, C are covered. Strategies D and E are not — the corpus has zero isogenic-HR-KO PDOs and zero in-vivo Brca-conditional mouse models. The Phase-B research agent surveying gap-fill candidates returned six items worth proposing in a follow-up commit (none added in this round):

- `jonkers-2007-kb1p-gemm` — K14-Cre;Brca1^f/f;Trp53^f/f basal TNBC GEMM; the foundational platform for in-vivo PARPi work (Jonkers lab, NKI).
- `jonkers-kb2p-brca2-gemm` — K14-Cre;Brca2^f/f;Trp53^f/f; matched-background Brca1-vs-Brca2 contrast.
- `jonkers-2022-wb1p-luminal` — Wap-Cre;Brca1^f/f;Trp53^f/f; luminal mammary tumors, addresses cell-of-origin question.
- `perets-2013-ovarian-brca-gemm` — Pax8-Cre fallopian-tube-origin HGSOC; ovarian-specific immune-competent HRD model.
- `dreyer-2021-kpc-brca2-pdac` — Pdx1-Cre;Kras^G12D;Trp53^R172H;Brca2^f/f; PDAC HRD GEMM matched to KPC controls.
- `dekkers-2020-isogenic-brca-pdo` — CRISPR-engineered BRCA1/2-KO in matched-donor human breast organoids; the only true within-donor isogenic resource.

These add a Strategy-D and Strategy-E member each, which is what allows the validation chain to reach in-vivo + within-donor without leaving the corpus. Adding them is a follow-up corpus update, not in scope for this blog.

---

## Table 5 — paired HRP atlas

The HRP atlas is not a separate dataset. It is the HR-wild-type slice of every Layer-1 dataset, matched on covariates strong enough to survive the obvious criticism that HRD tumors just have more immune cells / are older / are post-platinum.

| Source | HR+ slice | HR− (HRP) slice | Matching strategy | Notes |
|---|---|---|---|---|
| TCGA pan-cancer (Knijnenburg 2018) | per-organ HRDsum-high (top quartile + BRCA1/2-mut) | bottom quartile HRDsum + WT for HR-panel | Match within cancer type on stage, age, treatment exposure; exclude MSI-H, POLE/POLD1, Lynch | The pan-cancer backbone; per-organ HRD+ proportion is uneven (ovarian highest; THCA / KICH / KIRP / LAML lowest) |
| HMF (Priestley 2019) — metastatic | CHORD HRD-positive | CHORD HRD-negative + WT HR panel | Match on prior platinum, prior PARPi, biopsy site (HMF skews to breast / lung / CRC) | Metastatic-disease comparator to TCGA's primary-tumor bias |
| MSK-CHORD (Jee 2024) | HR-gene mutation calls per patient | HR-WT panel | Match within the 5 covered indications; outcome-linked | Panel-DNA cannot compute HRDsum — definition is HR-gene mutation, not HRD score |
| Vázquez-García 2022 | HRD-Dup + HRD-Del per WGS class | FBI + TD WGS classes | Same study, same platform; treatment-naive baseline | Cleanest within-study contrast at sc resolution for HGSOC |
| Wu 2021 (breast) | TNBC BRCA1-mut subset | sporadic ER+ / HER2+ / TNBC | Match on subtype; subtype confounds heavily | Use within-TNBC stratification preferentially |
| Pal 2021 | 4 BRCA1-tumor + 4 BRCA1-preneoplastic | 24 normal mammoplasty + sporadic tumors | Within-study, separate preneoplastic from tumor in the modeling | The BRCA1-preneoplastic arm is unique — early-state signature |
| BIOKEY (Bassez 2021) | BRCA-mut subset (small) | BRCA-WT | Pre-treatment baseline matching; response stratification interacts with BRCA status | Treatment-arm confound: anti-PD-1 response is the response axis |
| Launonen 2022 | 31 BRCA1/2-mut | 13 HR-WT | Same study, mIF-only — direct spatial contrast | Direct paired spatial atlas |
| TOPARP-A/B (Mateo 2021) | HRR-altered responders | HRR-altered non-responders + HR-WT | Treatment-on-response stratification | The PARPi-treated discovery arm |

### Confounders to control across all rows

The HRD-vs-HRP comparison breaks if these aren't handled. Listed in order of how strongly each one biases the analysis.

- **MSI-H exclusion.** MSI-H tumors carry an immune signature (high TMB, IFN, CD8 infiltration) that imitates the HRD-driven phenotype but for unrelated reasons. Excluded by default from both arms.
- **POLE/POLD1 hypermutators.** Same reason as MSI-H — confounds the IFN/TMB axis. Excluded.
- **Lynch-syndrome patients.** Subset of MSI-H but flagged separately because germline status matters for the inheritance contrast in Pal 2021-style analyses.
- **Treatment history.** Post-platinum and post-PARPi patients have a different transcriptional baseline than treatment-naive patients. Stratify into naive / post-platinum / post-PARPi. The HMF cohort is mostly post-treatment; TCGA is mostly treatment-naive — this is a per-cohort modeling decision, not a covariate adjustment.
- **Primary versus metastatic.** TCGA is primary; HMF is metastatic. Adjusting for biopsy site is necessary before merging.
- **Subtype mixing in breast.** ER status, HER2 status, TNBC — each has its own immune baseline. Stratify within breast before combining.
- **Treatment-naive versus treated single-cell baseline.** Single-cell composition differs sharply post-chemotherapy. Vázquez-García, Olbrecht, Wu, Pal are treatment-naive; BIOKEY is anti-PD-1-treated. The treatment-naive subset is the cleaner discovery layer.

---

## The analysis plan, in five layers + one

This section connects the tables. It is the *what we will do with the data* layer of the project. The plan is independent of any single mechanism, including the Luo 2024 CCR8 chain.

### Pre-Layer-1 — HRD definition concordance

The first deliverable is a multi-scorer concordance map of HRD across cohorts. For every patient that has WGS, run HRDetect, CHORD, ovaHRDscar (in HGSOC), scarHRD, and SBS3-based calls; for patients with only panel-DNA, use HR-gene mutation status (BRCA1/2/PALB2/RAD51 paralog/BRIP1/BARD1/ATM/CHEK1/2). For patients with H&E, run DeepHRD as the imaging-side scorer. Then classify every patient into one of three buckets: **HRD-concordant** (≥3 scorers agree), **HRD-discordant** (scorers disagree — especially when WGS-based scoring disagrees with panel-DNA-derived calls), and **HRD-negative**. Discordance is not noise. It is the analytic substrate for the next layer.

### Layer 1 — the patient-record atlas

Build a single patient-level table: one row per patient, columns = cancer type, HR-gene status, HRD-score per scorer, transcriptomic axis scores (computed from bulk and single-cell where available), spatial features (extracted from Visium / mIF / Slide-seq / GeoMx), treatment history, OS, PFS. This is the *patient-record* atlas, not an integrated single-cell atlas. A patient-record table is what supports Cox regression, axis emergence, and stratifier development. An integrated single-cell atlas is a stretch goal that supports cell-state cartography, not stratification.

Practically: TCGA + HMF + MSK-CHORD + PCAWG + CPTAC form the backbone. Vázquez-García + Wu + Pal + BIOKEY + Hwang + Olbrecht + Launonen + Stur are layered on for the subset of patients with paired sc/spatial. Hubs (3CA + CellxGene + TISCH2) are used for cross-cohort batch harmonization, not as independent contributors. Trial outcome data (PROfound + MAGNITUDE + OlympiAD + OlympiA + SOLO-1 + ARIEL3 + NOVA) joins as outcome-only rows, with sponsor-controlled transcriptomes flagged as unavailable.

### Layer 2 — axis emergence

Within HRD-concordant patients, do unsupervised structure discovery on the transcriptomic + spatial + immune-composition columns. Candidate axes the field has surfaced before — IFN/cGAS-STING signaling, antigen presentation (MHC-II on tumor), CCR8+ effector-Treg infiltration, CD8 effector vs exhausted ratio, replication stress, immune-cold subset, antigen loss — should be tested for whether they separate HRD-concordant subgroups across multiple cancer types, but none should be pre-committed. If only one axis emerges across cancers, that is the axis. If two or three emerge, they jointly define the stratifier.

The validation hand-off requires statistical discipline. Axes inferred from the patient atlas cannot be "validated" against the same patient subsets they were inferred from — that is circular. The held-out design is the TCGA-train / HMF-test split: discover the axis on the primary-tumor cohort, validate on the metastatic cohort. The trial-cohort outcome data is a second held-out — never used in Layer-2 discovery.

### Layer 3 — genetic validation

Replogle Perturb-seq sgHR-gene vs sgCtrl: compute the post-perturbation transcriptional signature for every HR-pathway gene in the K562 + RPE1 libraries. The output is a per-HR-gene single-cell fingerprint. Compare against the Layer-2 patient-derived axis: does the cell-autonomous Replogle signature reproduce the axis the patients show? If yes, the patient signal includes cell-autonomous components — the axis is at least partly *caused by* HR loss, not just *correlated* with it. DepMap CRISPR essentiality + PRISM PARPi sensitivity provide the orthogonal genetic-essentiality + drug-sensitivity reference. LINCS L1000 PARPi signatures (10 µM, 6/24 h, 9 Touchstone lines) complete the genetic/drug-perturbation triangle.

The hazard discipline here: per-HR-subgroup Cox regression needs ≥10 events per covariate. Sub-cohorts (e.g., per-organ HRD+ in less-common cancers) will be underpowered. Pool with care.

### Layer 4 — functional validation

PDO PARPi IC50 vs HRD genotype × Layer-2 axis score, joint-modeled across the PDO biobanks (Kopper, Hill, Tiriac, Driehuis, Bruna, van de Wetering as the negative-control organ). Does the axis score predict PARPi response above and beyond HR-genotype? PDX confirms at xenograft scale (PDMR + EurOPDX + Xeva + HCMI for molecular cross-reference). This is the tissue-context modifier layer over the cell-autonomous Replogle signature.

### Layer 5 — clinical perturbation

BIOKEY paired anti-PD-1 biopsies: does the predicted axis move under anti-PD-1 treatment? Then TOPARP-A/B (PARPi mCRPC) and Christie 2019 AOCS (platinum + olaparib HGSOC) as the PARPi-treated public discovery cohorts. PROfound + MAGNITUDE + OlympiAD + OlympiA + SOLO-1 + ARIEL3 + NOVA contribute outcome only — responder vs non-responder labels, not transcriptomes — to validate that the Layer-2 axis tracks clinical PARPi response.

### Implicit aim 5 — translate to trial-eligibility schema

The endpoint is a trial-eligibility schema: who would be enrolled, with what biomarker (HRD scorer combination + axis score cutpoint), for what combination, in what setting. This is the connection back to Luo 2024 — without being constrained to it. If the Layer-2 axis turns out to be CCR8/IFN-related, the future trial is PARPi + anti-CCR8. If it turns out to be something else (replication-stress vulnerability, antigen-presentation defect, immune-cold subset), the future trial is something else. The data architecture is the same either way.

---

## Deliverables

When the chain runs end-to-end, the project produces five named artifacts:

- A **HRD concordance map** across scorers, per patient, pan-cancer. The first cross-scorer multi-modality HRD-call atlas.
- A **patient-record multi-omic atlas** — one row per patient, columns = HRD calls + transcriptomic axes + spatial features + outcome.
- An **axis-emergence figure** — whichever druggable axes separate HRD subgroups across cancer types, with held-out validation in the HMF cohort.
- **Validation cross-references** — Replogle / DepMap / PRISM / LINCS for cell-autonomous + drug-perturbation reproducibility; PDO + PDX for tissue-context reproducibility.
- A **trial-eligibility schema** — the stratifier as it would appear in a future combination-trial protocol.

---

## Corpus fixes surfaced during research

Three corrections to the YAML emerged from the Phase-B research and should be applied in a follow-up commit (not in this blog round):

1. **Launonen 2022 DOI**: the corpus YAML cites `10.1038/s41467-022-32310-3`, which does not resolve. The correct DOI is `10.1038/s41467-022-28389-3` (*Nat Commun* 2022, 13:835).
2. **Hwang 2022 spatial modality**: the corpus YAML's `why` text describes Hwang 2022 as PDAC + Slide-seq. The published paper (Hwang et al. 2022 *Nat Genet*) uses NanoString GeoMx Whole-Transcriptome DSP on 21 tumors, not Slide-seqV2. Slide-seq may apply to a sister Hwang-lab deposit but not to the corpus-anchor paper.
3. **Stur 2022 stratification**: the corpus YAML implies BRCA-status stratification of the Visium cohort. The published Stur 2022 *iScience* paper does *not* report BRCA status; cohort split is RECIST 1.1 NACT response (6 excellent vs 5 poor responders). The BRCA-stratified Stur paper is a separate 2023 preprint, not the iScience one. The corpus rationale should be revised — Stur 2022 supports the NACT-response analysis layer, not the BRCA-stratified spatial analysis.

These are not blocking for the analysis plan as written — the plan above uses Stur 2022 correctly under NACT-response stratification — but they should be reflected in the YAML so the per-item `why` and `doi` fields are accurate.
