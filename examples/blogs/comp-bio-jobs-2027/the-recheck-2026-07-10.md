---
title: 'the re-check: 2,195 roles re-verified, and how to actually judge an offer'
date: '2026-07-10 09:00 CT'
topics:
  - landscape
  - strategy
  - visa
  - data-quality
starred: true
---

# the re-check: 2,195 roles re-verified, and how to actually judge an offer

A few weeks after the two vaults were expanded to their current size — **947 employers / 1,187 full-time roles** here, and **620 orgs / 1,008 internships** in the sibling vault — I went back and re-checked the whole thing. Not a light glance: every statistic recomputed from the source YAML, every URL re-fetched, and the highest-stakes eligibility flags re-audited against what employers actually say. Job data rots, and a tracker you don't re-verify quietly becomes fiction. This post is what the re-check found, the map as the numbers actually stand today, a shortlist of where the odds favour **you** — an F-1, PRC-national cancer-omics PhD (HRD, single-cell, spatial) — and, because you asked, a playbook on how to tell a good option from a dead end.

## the re-check: does the expansion still hold up?

Three things came back, and the honest answer is *mostly yes, with fixable drift*.

**Links.** Of **1,813 unique URLs**, **85.7% are live**, **6.3% are hard-dead** (404/410), 5.2% are bot-blocked (career sites that refuse an automated fetch — not dead, just unverifiable this way), and ~2% timed out. The 114 dead links touch 112 roles, and almost all are careers pages whose *path* changed under the same company (Deepcell, Ginkgo, Paige) — exactly the posting-rot the vault was built to expect. None were dead links dressed up as live; the remediation is to repoint them at the current careers page.

**Numbers.** I recomputed every figure the blogs claim — 31 checks — and **14 had drifted**. Every single one was a status or regional-count line that was never refreshed when the vault grew; **none touch the headline eligibility numbers.** The most visible: the full-time map still said "Singapore/Japan/Korea (44)" and "Canada/Australia (48)" when the real counts are **117** and **110**. Those are corrected now.

**Flags.** This is the part worth reading twice. I re-audited **57** of the most consequential eligibility flags. **36 were confirmed. 21 were corrected — and *why* they were wrong matters more than the count:**

- **13 internship "✗" that were false alarms.** Private, non-federal programs marked ineligible that an F-1 student on CPT/OPT can in fact join. A posting saying "no visa sponsorship" does **not** bar a summer intern — CPT needs no sponsorship. WashU's McDonnell Genome Institute explicitly accepts F-1 students (✗→✓); Natera, 10x, ArsenalBio, CZ Biohub, Mayo and others were over-warned (✗→?).
- **2 UK pharma over-harsh.** AstraZeneca-UK and GSK were marked "no sponsorship." Both are **licensed UK Skilled Worker visa sponsors** on the Home Office register — a hard ✗ overstates it. Corrected to "verify" (it's posting- and level-dependent).
- **6 DOE national-lab postdocs, nuanced.** ORNL, Argonne, PNNL and LANL allow foreign nationals for unclassified work *on paper* — but for a PRC national specifically, DOE "sensitive-country" review is genuinely hard. I've kept these cautious rather than thrown them open.
- **the genuine bars held.** Van Andel and Dartmouth's T32/NRSA training postdocs really are US-citizen/permanent-resident-only by statute (42 CFR 66). Those ✗ correctly stand.

The lesson I'd underline for your own search: **a false ✗ is the most expensive error in a job hunt** — it tells you "don't bother" about a door that's actually open. Re-verify eligibility from the *primary* source before you cross anything off.

## the map, by the numbers

For full-time work the screen isn't the science — it's the visa. Every full-time role carries a sponsorship flag for a PRC national: `✓` a sourced basis to sponsor, `?` unstated (verify), `✗` a genuine bar. Here is how the 1,187 fall out by region.

| region | roles | ✓ | ? | ✗ |
|---|--:|--:|--:|--:|
| **China** | 125 | 121 | 4 | — |
| **United States** | 581 | 321 | 251 | 9 |
| **UK & Europe** | 254 | 57 | 197 | — |
| **Singapore / Japan / Korea** | 117 | 18 | 99 | — |
| **Canada / Australia** | 110 | 16 | 94 | — |

The single most underrated line in that table is inside the US number. US universities and nonprofit research institutes are **H-1B cap-exempt** — they sponsor outside the lottery, year-round. Of **217 US postdocs, 199 are ✓** on that basis; of **364 US industry roles, only 122 are ✓** and 242 are unstated. Read plainly:

| US role type | roles | ✓ | ? | ✗ |
|---|--:|--:|--:|--:|
| **cap-exempt postdoc** | 217 | 199 | 9 | 9 |
| **industry FTE** | 364 | 122 | 242 | — |

The academic postdoc is not a consolation prize — for a foreign national it is the *most reliable* full-time foothold in the US, because it removes the H-1B lottery entirely. The pragmatic move is to run both pipelines at once: chase the sponsoring-industry Scientist roles for the pay and the ceiling, but keep two or three cap-exempt cancer-genomics postdocs as the floor you can always stand on.

And your profile is not niche. The tight cancer-omics core — roles touching single-cell, spatial, comp-onc or multi-omics — is **809 of 1,187** full-time roles and **454 of 1,008** internships. Genomics (864), ML/AI (781), comp-onc (579) and single-cell (491) are the four most common topic tags in the whole full-time vault. You are central to this market, not adjacent to it.

## where the odds favour you

Scoring both vaults on topical fit, realistic work-authorization odds for a PRC national, and role quality, then grouping into tiers you can run in parallel:

**Your work-authorization floor — cap-exempt postdocs you can always stand on.** MSK (Chan Lab, computational cancer), Princeton (Raphael Lab, cancer genomics/HRD), Columbia Irving (Azizi Lab, single-cell + spatial + FMs), Brigham/HMS (Nirmal Lab, spatial omics), Stanford (Alizadeh, CAPP-Seq), Fox Chase (Yu Lab, single-cell & spatial). All H-1B cap-exempt, all bullseye.

**Highest-upside US industry (sponsoring).** Genentech gRED, AstraZeneca Oncology R&D (Dynamic Omics), BMS Computational Genomics, Bayer Spatial Multi-Omics, Novartis Oncology Data Science — established H-1B/green-card sponsors. Target the *first* PhD rung even when the post says "Senior."

**China — no-friction.** Tongji (Chenfei Wang, MAESTRO/STRIDE), Westlake, Wuhan (Suoqin Jin, CellChat), HKUST, plus BeiGene on the industry side. Zero visa question; genuinely strong single-cell/spatial method labs.

**Europe reach — international-by-design institutes.** EMBL Heidelberg (Huber Group) and EMBL-EBI are intergovernmental — the most frictionless visa path anywhere for a PRC national; plus DKFZ, the Crick (Turajlic), Cambridge CRUK.

**Internships to line up now** (all CPT-eligible, no sponsorship needed): Genentech's single-cell & spatial comp-bio intern, BMS's PBAI immunotherapy internship, AstraZeneca R&D Data Science, MD Anderson computational research intern, Moderna PBAI.

If I had to name the top few overall: **MSK Chan Lab, EMBL Huber Group, Princeton Raphael Lab, the Genentech single-cell/spatial internship, and Columbia's Azizi Lab.** Start there.

## how to actually judge an internship or a job

You asked how to tell whether an option is *good*. The short version, drawn from how people who've made this exact transition and the managers who hire for it actually talk:

- **Treat an offer as an investigation, not a gift.** The moment you have leverage and access is *before* you sign. For an internship, ask up front: the return-offer rate (a strong program runs its internship as a hiring pipeline and will tell you; vagueness is the tell), who your *one* dedicated mentor is, and what specific, nameable deliverable you'll leave with. "Help the team with single-cell analysis" is busywork; "build and validate an HRD classifier on cohort X" is a portfolio piece.
- **Return-offer odds are partly structural, not just performance.** In-person internships convert far more often than remote (~72% vs ~56%), and even strong interns lose offers to headcount freezes — so weight on-site programs and don't stake a whole visa timeline on one conversion.
- **The internship is free to the employer** (CPT/OPT need no sponsorship), so "we don't sponsor visas" should *not* stop you applying to summer roles. Sponsorship only bites at full-time conversion. Apply broadly.
- **For a full-time offer, reverse-interview the manager and a peer.** Ask what time people actually leave, what the last person in the role went on to do, and — for a PRC national — get the sponsorship commitment against real data (MyVisaJobs/USCIS), not a verbal "yes." A small company that won't file an H-1B is a dead end no matter how good the science.
- **Aim for the "learning zone" and weight the team as heavily as the task.** Growth lives between boredom and panic; a role where the loop from idea to a result you can learn from is *days, not years* compounds far faster. Under-challenge ("rust-out") is a real, underrated hazard — a safe first role is itself a risk.

On the two searches at once: they run on different calendars, so stagger them. The **internship pipeline is a fall sprint** (apply Aug–Nov; the best roles are gone by December). The **full-time / postdoc pipeline peaks Nov–Feb** — organise in September, start outreach in November, interview in January, offers by mid-February. And spend your effort where it converts: **referrals and direct hiring-manager outreach**, not portal submissions. Referrals are a large share of hires from a tiny share of applicants; a warm intro or a paper the team already knows beats a hundred cold applications.

Two structural facts to internalise as a PRC national, because they change which roles are even worth chasing. First, your US STEM PhD is itself an immigration asset: OPT + STEM-OPT is a **36-month runway = three H-1B lottery attempts**, plus a second draw reserved for advanced-degree holders. Second, **cap-exempt employers** (universities, nonprofit research institutes) skip the lottery entirely — which is why the academic postdoc keeps coming back as your strongest safe harbour. On the postdoc-vs-industry question the sources genuinely split: if you *know* you want biotech, a postdoc is optional and carries a documented earnings penalty; do one only for a real reason (an academic/PI track, a genuine skills gap, or to explore which sector fits) and cap it at ~2 years.

## the honest caveat, unchanged

There are still **no live 2027–2029 requisitions** — that hiring hasn't happened yet, and full-time reqs rot fast. Every row here points either to a currently-open role (to show you the shape, level and sponsorship reality of the real job) or to the employer's careers / lab page, where the next one will appear. No dead link is shown as live, and no URL was invented. Re-pull the live links when each season opens — and re-verify any eligibility flag from the primary source before you decide a door is closed.

Filter by United States vs International and by the topics you actually do, start with the starred roles, and treat this as the target map it is — now freshly re-verified.
