---
title: 'The data we have to work with — seven layers of public single-cell + spatial evidence for the HRD × IFN × CCR8 chain'
date: '2026-06-02'
topics:
- dataset
- parpi
- hrd
- single-cell
- spatial
- ovarian-cancer
- breast-cancer
- pancreatic-cancer
- resources
summary: 'An earlier draft of the [pan-cancer bet](the-pan-cancer-bet.md) called GSE222556 "essentially the only" public single-cell dataset from PARPi-treated patients. That is too tight. The honest map is seven layers — a bulk multi-omics arena (TCGA + CPTAC + TCPA + GerkeLab/TCGAhrd); a human PARPi-treated single-cell layer (the Luo HGSOC anchor + two sister GEO IDs from the same trial, plus spatial olaparib-maintenance HGSOC, plus two paired-timepoint clinical proteomics resources from TOPACIO and AMTEC); a real preclinical PARPi scRNA layer across TNBC, ovarian, PDAC, and SCLC including paired sensitive/resistant models and chronic-PARPi persister states; a much larger HRD-stratified human single-cell + spatial layer where PARPi treatment is not required (Vázquez-García MSK-SPECTRUM, Pal BRCA1+/–, Bassez BIOKEY, Launonen/Färkkilä BRCA1/2-vs-WT mIF, Stur HGSOC Visium, Kopper ovarian PDO biobank, Hwang HTAPP PDAC); a single-cell HR-gene perturbation layer (Replogle genome-scale Perturb-seq) that gives a per-gene molecular fingerprint of HR loss; pan-cancer single-cell atlases and frameworks (Zheng, Cheng, Combes IRIS, Chu T-stress, Nieto TICAtlas, 3CA, Tay 2025 CCR8 NSCLC); and a list of pivotal-trial PARPi-arm single-cell data that does not exist publicly (PRIMA / SOLO / NOVA / POLO / MEDIOLA / NEOTALA / TALAPRO). The treated-outcome layer is HGSOC-anchored, but the HRD-stratified layer is large enough to test the chain pan-cancer.'
starred: true
---

When a reader works through the [pan-cancer bet](the-pan-cancer-bet.md) and the [chain blog](the-chain-from-broken-dna-to-broken-t-cells.md), the practical question that follows is: **what data is actually on the table right now?** This blog is the inventory.

Seven layers, narrowest (treated-outcome) to widest (pan-cancer framework).

## Layer 1 — The bulk multi-omics arena (where Aims 1–4 live)

Three public resources do almost all the work:

- **TCGA pan-cancer** — 33 cancer types with matched RNA-seq, SNP array, and WES. The arena for HRD calls, signature scoring, and per-cancer cohort sizes that let the project move from per-tumor associations to pan-cancer mixed models. Accessed via the GDC.
- **CPTAC pan-cancer proteogenomics (2024 harmonized release)** — 10 cancer types, 1,043 patients, matched genomics + transcriptomics + proteomics + phosphoproteomics. The protein-level cross-validation layer for any transcript-level CCR8 / IFN / LAG3 finding.
- **TCPA** — RPPA companion to CPTAC; smaller panel, larger sample size; second proteomic readout for the same targets.

Two utilities save weeks:

- **GerkeLab/TCGAhrd** — pre-processed Knijnenburg HRDsum / LOH / LST / NtAI scores for 33 cancer types, 9,125 samples. Used directly in Aim 1.
- **expHRD** — RNA-seq-only HRD predictor that lets the project add HRD calls to ICI cohorts where SNP/WES is absent.

This layer is uncontroversial and almost off-the-shelf. The project will not break here.

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

So the honest claim is: **GSE222556 + sisters is the only large, paired-timepoint, multi-platform human PARPi scRNA+TCR resource, and it is HGSOC-only.** The other human resources are smaller, protein-level, or HRD-WT.

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

## Layer 7 — What is *not* public, and what the project therefore cannot do

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

Five updates to the analysis plan, once Layers 4–6 are folded in:

1. **Aim 1 (HRD landscape) gains a single-cell anchor.** Bulk RNA + GerkeLab/TCGAhrd is still the spine, but Vázquez-García MSK-SPECTRUM (~929k cells across 42 HGSOC patients with HRD-Dup/Del/FBI/TD per case) lets the bulk HRD landscape be cross-validated at single-cell resolution in HGSOC.
2. **Aim 2 (CCR8/IFN deconvolution) gains cross-tumor preclinical scRNA + HRD-stratified human validators.** GSE276238 (PDAC) and Wang 2025 (SCLC) test whether the chain fires in HRD-low tumors; Liang 2024 (TNBC + ovarian) tests whether it modulates at resistance; Launonen/Färkkilä 2022 mIF and Pal 2021 BRCA1+/– give HRD-stratified human references beyond HGSOC. The bulk-RNA claim no longer has to lean on cross-tumor inference alone.
3. **Aim 3 (signature mechanics) gains a per-gene molecular fingerprint.** Replogle 2022 Perturb-seq covers BRCA1, BRCA2, RAD51, RAD51C/D, PALB2, BRIP1, 53BP1, Shieldin (SHLD1/2/3), REV7 at single-cell resolution. The project's HRD signatures can be cross-checked against the actual transcriptional response to losing each gene — separating genomic-scar HRD from functional HRD on a principled basis.
4. **Aim 4 (pan-cancer placement) gains an immune-archetype frame.** Combes IRIS, Nieto TICAtlas, Tirosh 3CA, and Chu T-stress let the project place HRD-high tumors into a pan-cancer immune-archetype map and disambiguate IFN-driven from stress-driven T-cell states. The "HRD-high × IFN/eTreg-high" subgroup the [pan-cancer bet](the-pan-cancer-bet.md) calls for becomes a labelled region of an existing archetype space, not a free-floating claim.
5. **Aim 6 (translational hypothesis) gains a caveat surface and a non-HGSOC CCR8 anchor.** Khan 2026 means the project has to argue why a TCGA-bulk-RNA CCR8 signal is tumor-intrinsic mechanism rather than peripheral-T-cell-trafficking artifact — and the AMTEC paired biopsies are the obvious negative control. Tay 2025 NSCLC anti-PD-1 gives the first non-HGSOC single-cell evidence that the CCR8⁺ Treg compartment behaves as a treatment-responsive axis, which is structurally what the PARPi + anti-CCR8 combination needs.

The headline: the project is still HGSOC-anchored on the *human treated* side, but Layers 4–6 supply a much wider HRD-stratified single-cell base — across breast, pancreatic, prostate, and pan-cancer immune frames — plus a per-gene HR-loss fingerprint from genome-scale Perturb-seq. That is the level of cross-tumor data the chain needs to be stress-tested against before the [pan-cancer bet](the-pan-cancer-bet.md) makes sense as a stratifier rather than a generalization.
