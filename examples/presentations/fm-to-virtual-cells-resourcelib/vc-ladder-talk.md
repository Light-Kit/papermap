---
title: 'Virtual cells: a ladder of what we dare to ask (talk)'
date: '2026-05-21'
summary: "The full ~30-slide talk built on the five-questions essay: the virtual-cell field read as a ladder (describe → correlate → reckon → intervene → predict → counterfactual), every concept named, climbing to the survival-field frontier. Each slide carries a presenter script and a one-line cheat-sheet (open the slide and read below the stage). Batch 1 = slides 1–7."
topics:
- presentation
- virtual-cell
- foundation-model
- perturbation
---

> *Presenter deck. Use ← / → to step; the highlighted cheat-line and full script show below the stage. Companion to the [hundred-concepts essay](one-hundred-concepts-five-questions-v5.md) and the [timeline & lineage map](five-questions-timeline-and-lineage.md).*

<section class="slide" data-cheat="Open with the frame: this talk reads the whole virtual-cell field as one ladder of harder and harder questions." data-notes="Thanks everyone. Today I want to give you a map of the virtual-cell field — foundation models, perturbation prediction, the works — but organised around a single idea. Instead of a list of methods, I&#x27;ll read the field as a ladder: five questions we ask a cell, each one harder than the last. We climb from just describing a cell, up to predicting what a drug does to it, to the hardest question of all — what should we do to change its fate. By the end you&#x27;ll have a place to hang every model and dataset you&#x27;ve heard of, and a feel for where the real frontier is.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#1d2a17"/>
  <rect x="0" y="250" width="1280" height="6" fill="#c0392b"/>
  <text x="640" y="220" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#a9c08f" letter-spacing="3">VIRTUAL CELL GROUP MEETING</text>
  <text x="640" y="330" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="52" font-weight="700" fill="#f7f7ef">Virtual cells: a ladder of</text>
  <text x="640" y="392" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="52" font-weight="700" fill="#f7f7ef">what we dare to ask</text>
  <text x="640" y="460" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#cdd9bf">Foundation models, perturbation, and the five questions we put to a cell</text>
  <text x="640" y="560" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="#7e8f6b">describe → correlate → intervene → predict → counterfactual</text>
</svg>
</section>

<section class="slide" data-cheat="We built giants, but the linear-baseline reckoning says the field still sits near the bottom of the ladder." data-notes="Here&#x27;s the whole field on one slide, and here&#x27;s the uncomfortable headline. Every dot is a real model, dataset, or method, placed by when it appeared (left to right) and how high a causal question it answers (bottom to top). We&#x27;ve poured enormous compute into foundation models down at the bottom — describe and correlate. But in 2024 a plain linear baseline matched or beat all of them on the question that actually matters. So honestly, the field still sits near rung one or two. And the very top rung — knowing which cells live or die under a drug — is still empty. That gap is what this talk is about. We&#x27;ll climb the ladder one rung at a time and come back to this picture at the end.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img" aria-label="Field map: products by time and causal rung">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/><rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="56" font-family="Helvetica,Arial,sans-serif" font-size="40" font-weight="700" fill="#1d2a17">The ladder of causality</text>
  <text x="46" y="80" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="#566b46">Every product, placed by time (→) and the causal rung it reaches (↑)</text>
  <g font-family="Helvetica,Arial,sans-serif" font-size="14.5" fill="#333">
    <circle cx="812" cy="30" r="8" fill="#4e79a7"/><text x="827" y="35">Foundation model</text>
    <circle cx="1032" cy="30" r="8" fill="#e8924a"/><text x="1047" y="35">Dataset</text>
    <circle cx="812" cy="58" r="8" fill="#9c6bab"/><text x="827" y="63">Other tool / method</text>
    <circle cx="1032" cy="58" r="8" fill="#2a9d8f"/><text x="1047" y="63">Event</text>
  </g>
  <line x1="196" y1="158" x2="196" y2="572" stroke="#b9b9ad" stroke-width="1.5"/>
  <text x="46" y="152" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">causal rung ↑</text>
    <text x="182" y="562" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">1</text>
    <text x="182" y="578" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Describe</text>
    <text x="182" y="464" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">2</text>
    <text x="182" y="480" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Correlate</text>
    <text x="182" y="367" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">3</text>
    <text x="182" y="383" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Intervene</text>
    <text x="182" y="270" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">4</text>
    <text x="182" y="286" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Predict</text>
    <text x="182" y="172" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">5</text>
    <text x="182" y="188" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Counterfactual</text>
  <rect x="196" y="430" width="972" height="176" fill="#dfe7ef" opacity="0.5"/>
  <text x="212" y="593" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b7a93" font-style="italic">the field clusters here (≈ rung 1–2)</text>
  <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#5b5b5b"/></marker></defs>
  <line x1="196" y1="596" x2="1174" y2="596" stroke="#5b5b5b" stroke-width="2" marker-end="url(#ar)"/>
    <line x1="196" y1="592" x2="196" y2="600" stroke="#5b5b5b"/>
    <text x="196" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2015</text>
    <line x1="359" y1="592" x2="359" y2="600" stroke="#5b5b5b"/>
    <text x="359" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2017</text>
    <line x1="523" y1="592" x2="523" y2="600" stroke="#5b5b5b"/>
    <text x="523" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2019</text>
    <line x1="686" y1="592" x2="686" y2="600" stroke="#5b5b5b"/>
    <text x="686" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2021</text>
    <line x1="849" y1="592" x2="849" y2="600" stroke="#5b5b5b"/>
    <text x="849" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2023</text>
    <line x1="1013" y1="592" x2="1013" y2="600" stroke="#5b5b5b"/>
    <text x="1013" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2025</text>
  <text x="1170" y="616" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">Timeline →</text>
  <circle cx="515" cy="546" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="515" y="572" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scVI</text>
  <circle cx="727" cy="527" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="727" y="552" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scBERT</text>
  <circle cx="849" cy="571" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="849" y="596" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Geneformer</text>
  <circle cx="870" cy="508" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="855" y="512" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scGPT</text>
  <circle cx="890" cy="449" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="890" y="432" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scFoundation</text>
  <circle cx="915" cy="546" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="915" y="572" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">UCE†</text>
  <circle cx="935" cy="478" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="935" y="503" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">CellPLM</text>
  <circle cx="964" cy="566" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="964" y="591" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Nicheformer</text>
  <circle cx="1001" cy="459" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="986" y="463" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">C2S-Scale</text>
  <circle cx="1033" cy="532" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1033" y="557" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">TranscriptFormer</text>
  <circle cx="1111" cy="498" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1096" y="502" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">xVERSE</text>
  <circle cx="596" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="596" y="396" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">sci-Plex</text>
  <circle cx="760" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="760" y="396" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Perturb-seq</text>
  <circle cx="1013" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="1013" y="396" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Tahoe-100M</text>
  <circle cx="1054" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <line x1="1054" y1="359" x2="1054" y2="341" stroke="#bbb" stroke-width="1"/>
  <text x="1054" y="333" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">X-Atlas</text>
  <circle cx="1070" cy="288" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1055" y="292" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">STATE</text>
  <circle cx="1099" cy="332" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1099" y="357" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Tahoe-x1</text>
  <circle cx="1131" cy="303" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1131" y="286" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">X-Cell</text>
  <circle cx="1143" cy="220" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1143" y="203" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Lingshu-Cell</text>
  <circle cx="972" cy="322" r="10" fill="#2a9d8f" stroke="#fff" stroke-width="2"/>
  <text x="972" y="305" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">the reckoning</text>
  <circle cx="1041" cy="430" r="10" fill="#2a9d8f" stroke="#fff" stroke-width="2"/>
  <text x="1041" y="454" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">VC Challenge</text>
  <circle cx="482" cy="274" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="482" y="256" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">RNA velocity</text>
  <circle cx="637" cy="269" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="637" y="294" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">DDPM (diffusion)</text>
  <circle cx="1021" cy="239" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="1021" y="222" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">CellFlow</text>
  <circle cx="237" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="237" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Chizat unbalanced OT</text>
  <circle cx="417" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="417" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Waddington-OT</text>
  <circle cx="702" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="702" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">CPA</text>
  <circle cx="809" cy="210" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="809" y="235" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">GEARS</text>
  <circle cx="890" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="890" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">moscot</text>
  <circle cx="931" cy="215" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="931" y="240" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">TIGON</text>
  <text x="196" y="658" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#999">† UCE — first posted 2023, revised through v3 (2026); dots mark each work’s first appearance.</text>
</svg>
</section>

<section class="slide" data-cheat="The five questions are the whole agenda; the field&#x27;s recurring mistake is taking one rung for another." data-notes="Every computational biologist is chasing the same dream, even if we don&#x27;t say it out loud: rebuild a living cell inside a computer — not a cartoon of one, but a cell you can query. The moment you ask what &#x27;query&#x27; means, the dream resolves into five concrete questions, each harder than the last. What does a typical cell look like? Which genes move together, and in what programs? What happens when I hit it with a signal — a drug, a cytokine? Where will it be in ten days? And, at the top: I know where it&#x27;s headed — what do I do to send it somewhere else? These five questions are our agenda for the rest of the talk. And the single recurring mistake in this field is taking one rung for another — treating a model that can describe as if it could intervene.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">The dream, made concrete: five questions</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">3 / 30</text>
  <text x="44" y="188" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Pin down what &quot;query a cell&quot; means and the dream resolves into five questions, each harder than the last.</text>
  <circle cx="80" cy="268" r="18" fill="#4e79a7"/>
  <text x="80" y="274" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="#fff">1</text>
  <text x="116" y="265" font-family="Helvetica,Arial,sans-serif" font-size="21" font-weight="700" fill="#222">Describe</text>
  <text x="116" y="290" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#555">What does a typical cell look like?</text>
  <circle cx="80" cy="346" r="18" fill="#59a14f"/>
  <text x="80" y="352" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="#fff">2</text>
  <text x="116" y="343" font-family="Helvetica,Arial,sans-serif" font-size="21" font-weight="700" fill="#222">Correlate</text>
  <text x="116" y="368" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#555">Which genes move together, in what programs?</text>
  <circle cx="80" cy="424" r="18" fill="#e8924a"/>
  <text x="80" y="430" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="#fff">3</text>
  <text x="116" y="421" font-family="Helvetica,Arial,sans-serif" font-size="21" font-weight="700" fill="#222">Intervene</text>
  <text x="116" y="446" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#555">What happens when I hit it with a drug?</text>
  <circle cx="80" cy="502" r="18" fill="#9c6bab"/>
  <text x="80" y="508" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="#fff">4</text>
  <text x="116" y="499" font-family="Helvetica,Arial,sans-serif" font-size="21" font-weight="700" fill="#222">Predict</text>
  <text x="116" y="524" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#555">Where will it be in ten days?</text>
  <circle cx="80" cy="580" r="18" fill="#b03a2e"/>
  <text x="80" y="586" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="#fff">5</text>
  <text x="116" y="577" font-family="Helvetica,Arial,sans-serif" font-size="21" font-weight="700" fill="#222">Counterfactual</text>
  <text x="116" y="602" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#555">What do I do to send it somewhere else?</text>
</svg>
</section>

<section class="slide" data-cheat="Rung 1 is coordinates: a foundation model turns observational atlases into a reusable map of cell states." data-notes="Let&#x27;s start at the bottom of the ladder. A foundation model is a high-capacity network pretrained once on a huge unlabeled corpus and then adapted to many downstream tasks — the same idea as GPT, applied to cells. The prize at the end of that road is what we call the virtual cell: a computational cell you can ask &#x27;what if&#x27;. The raw material is the single-cell atlas — CELLxGENE, Tabula Sapiens — millions of cells. The key word is observational: an atlas tells you which states cells happen to occupy, not what makes them change. Hold onto that distinction, because it&#x27;s the crack that runs through the whole field. Rung one is simply about giving every cell a set of coordinates.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 1 — Describe: give a cell coordinates</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#4e79a7"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">4 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 1–3</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">The goal of the whole enterprise, and the raw material it starts from.</text>
  <circle cx="74" cy="270" r="16" fill="#5b6b7b"/>
  <text x="74" y="275" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">1</text>
  <text x="106" y="268" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Foundation model (FM)</text>
  <text x="106" y="292" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">high-capacity network pretrained once on a huge unlabeled corpus, then adapted to many tasks</text>
  <circle cx="74" cy="362" r="16" fill="#5b6b7b"/>
  <text x="74" y="367" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">2</text>
  <text x="106" y="360" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Virtual cell (VC)</text>
  <text x="106" y="384" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the prize at the end of the road — a computational cell you can ask &quot;what if&quot;</text>
  <circle cx="74" cy="454" r="16" fill="#5b6b7b"/>
  <text x="74" y="459" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Single-cell atlas</text>
  <text x="106" y="476" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">CELLxGENE, Tabula Sapiens — an OBSERVATIONAL catalog of which states cells happen to occupy</text>
</svg>
</section>

<section class="slide" data-cheat="The recipe is lifted from LLMs — mask genes, predict them, get a representation. The bet was that this teaches biology." data-notes="How do you actually build that map of cell states? The recipe was borrowed wholesale from large language models. First, self-supervised pretraining on millions of transcriptomes — no labels required, which is what lets you use the giant atlases. Second, tokenization: turn a cell&#x27;s expression counts into a finite vocabulary, the way a sentence becomes a sequence of tokens. And third, the training trick — masked-gene modeling: you hide some of a cell&#x27;s genes, make the model predict them, and a useful representation falls out as a side effect. Note carefully what&#x27;s being masked — genes, not cell-type labels. The implicit bet was that &#x27;fill in the missing gene&#x27; would force the model to learn real regulatory biology. Hold that thought; it comes back to bite us at the reckoning.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 1 — the recipe, borrowed from language</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#4e79a7"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">5 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 4–6</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">How you build the map: three moves lifted straight from large language models.</text>
  <circle cx="74" cy="270" r="16" fill="#5b6b7b"/>
  <text x="74" y="275" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">4</text>
  <text x="106" y="268" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Self-supervised pretraining</text>
  <text x="106" y="292" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">train on millions of transcriptomes with no labels</text>
  <circle cx="74" cy="362" r="16" fill="#5b6b7b"/>
  <text x="74" y="367" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5</text>
  <text x="106" y="360" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Tokenization</text>
  <text x="106" y="384" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">turn a cell&#x27;s expression counts into a finite vocabulary, the way a sentence becomes tokens</text>
  <circle cx="74" cy="454" r="16" fill="#5b6b7b"/>
  <text x="74" y="459" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">6</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Masked-gene modeling</text>
  <text x="106" y="476" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">hide some of a cell&#x27;s genes (not its labels), predict them — a representation falls out as a side effect</text>
</svg>
</section>

<section class="slide" data-cheat="A wave of cell FMs, 2021–2025 — all the same recipe; note the dates, this is a four-year explosion." data-notes="And then the wave hit. scBERT put BERT onto genes. Geneformer encoded a cell as a rank-ordering of its genes. scGPT went fully generative over gene and cell tokens. scFoundation made attention read-depth-aware. UCE and CellPLM pushed scale and whole-cell tokens; Nicheformer folded in spatial niche; and TranscriptFormer carried the same ambition across species. Underneath all of them sits scVI, the variational autoencoder from 2018 whose per-cell uncertainty is still the cleanest handle we have. Two things to notice. The dates: this is a four-year explosion. And the sameness: nearly every one of these is a variation on the one recipe from the last slide — and they all deliver essentially the same thing, which is the next slide.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 1 — the wave of cell foundation models</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#4e79a7"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">6 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 7–15</text>
  <text x="44" y="188" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">2021–2025: a four-year explosion, all variations on the same masked-gene recipe.</text>
  <rect x="70" y="250" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="86" y="287" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">scBERT</text>
  <text x="306" y="287" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2021</text>
  <rect x="350" y="250" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="366" y="287" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">Geneformer</text>
  <text x="586" y="287" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2023</text>
  <rect x="630" y="250" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="646" y="287" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">scGPT</text>
  <text x="866" y="287" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2023</text>
  <rect x="910" y="250" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="926" y="287" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">scFoundation</text>
  <text x="1146" y="287" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2023</text>
  <rect x="70" y="338" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="86" y="375" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">UCE</text>
  <text x="306" y="375" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2023</text>
  <rect x="350" y="338" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="366" y="375" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">CellPLM</text>
  <text x="586" y="375" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2023</text>
  <rect x="630" y="338" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="646" y="375" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">Nicheformer</text>
  <text x="866" y="375" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2024</text>
  <rect x="910" y="338" width="250" height="60" rx="8" fill="#fff" stroke="#4e79a7" stroke-width="1.5"/>
  <text x="926" y="375" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#1a4480">TranscriptFormer</text>
  <text x="1146" y="375" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="15" fill="#9a9a9a">2025</text>
  <text x="70" y="470" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#555">Underneath them all sits <tspan font-weight="700" fill="#222">(15) scVI</tspan> (2018) — the variational autoencoder whose uncertainty estimates are still the cleanest.</text>
</svg>
</section>

<section class="slide" data-cheat="What FMs really deliver is a frozen encoder; the 2026 counter-move shows the transformer shape isn&#x27;t the load-bearing part." data-notes="So what did all that compute actually buy? Mostly one thing: a frozen encoder. You pretrain once, then read out coordinates for any new cell with no further training. That powers three genuinely useful things — zero-shot transfer to new datasets, batch integration across experiments, and automated cell-type annotation. This is where foundation models genuinely shine, and we should give them that. The 2026 plot twist worth watching is the non-transformer counter-move: transcriptomics-native designs like xVERSE that match or beat the language-model-pedigree FMs on representation and imputation — the first real evidence that the transformer shape was never the load-bearing part. So by the end of rung one, a cell has coordinates. But coordinates are not understanding — and that&#x27;s rung two.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 1 — what it actually delivers</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#4e79a7"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">7 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 16–20</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">All that compute buys one thing — a reusable encoder — plus the uses that flow from it.</text>
  <circle cx="74" cy="270" r="16" fill="#5b6b7b"/>
  <text x="74" y="275" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">16</text>
  <text x="106" y="268" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Frozen encoder</text>
  <text x="106" y="292" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">pretrain once, then read out coordinates for any new cell with no further training</text>
  <circle cx="74" cy="362" r="16" fill="#5b6b7b"/>
  <text x="74" y="367" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">17–19</text>
  <text x="106" y="360" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Zero-shot transfer · batch integration · annotation</text>
  <text x="106" y="384" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the genuinely useful payoffs — and where FMs really shine</text>
  <circle cx="74" cy="454" r="16" fill="#5b6b7b"/>
  <text x="74" y="459" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">20</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Non-transformer counter-move (xVERSE, 2026)</text>
  <text x="106" y="476" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">transcriptomics-native designs that match the LM-pedigree FMs — the transformer shape isn&#x27;t load-bearing</text>
</svg>
</section>

<section class="slide" data-cheat="Rung 2 is reading the co-expression structure back out — FMs are genuinely good at sorting and embedding here." data-notes="Rung two asks which genes move together. The embeddings encode gene programs — co-expression modules the network picked up on its own — and they gesture at the regulatory network underneath. This is where foundation models genuinely earn their keep: embed-and-classify, sorting cells by type and state. One appealing reading of why they work is that attention behaves like a learned gene-gene interaction map, a dense affinity between genes. So far so good — but notice we&#x27;re still describing structure, not mechanism.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 2 — Correlate: read the programs</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#59a14f"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">8 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 21–24</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">The next question: which genes move together — and what that does (and doesn&#x27;t) tell you.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">21</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Gene programs</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">co-expression modules the network learned without being told to</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">22</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Gene regulatory network (GRN)</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the wiring the programs gesture at underneath</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">23</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Embed-and-classify</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">what FMs are genuinely good at — sort cells by type and state</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">24</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Attention as a gene–gene interaction map</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">one reading of the model&#x27;s power: a learned, dense affinity between genes</text>
</svg>
</section>

<section class="slide" data-cheat="SAEs pull monosemantic features out of the latent — the same interpretability toolkit now applied to cells." data-notes="Can we read those programs out in human terms? The interpretability toolkit says yes, partly. Sparse autoencoders decompose the latent space into monosemantic features — interpretable directions, one biological concept apiece. This is mechanistic interpretability, the same program people run on language models, now applied to cells, with a simple linear probe as the baseline and InterPLM as the protein-model analog. It&#x27;s real progress on seeing what these models encode. But seeing what they encode sets up the punchline on the next slide.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 2 — opening the black box</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#59a14f"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">9 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 25–29</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">If the programs are in there, can we read them out in human terms?</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">25</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Sparse autoencoders (SAEs)</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">decompose the latent into interpretable directions</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">26</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Monosemantic features</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">one direction, one biological concept</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">27</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Mechanistic interpretability</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the single-cell instance of the interpretability program</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">28–29</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Linear probe · InterPLM</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the simple baseline, and the protein-model analog</text>
</svg>
</section>

<section class="slide" data-cheat="The verdict: FMs encode organized biological knowledge but almost no causal mechanism — coordinates aren&#x27;t understanding." data-notes="Here&#x27;s the verdict that emerges from prying the box open — and it&#x27;s the same one the next rung will deliver the hard way. Studying the representational geometry, using the models for imputation and denoising, reading out features — all of it points one direction: these models encode beautifully organized biological knowledge, and almost no causal mechanism. They know what tends to go with what. They do not know what causes what. Rungs one and two are where foundation models shine, and also where the field fooled itself — it mistook coordinates for understanding. Which brings us to the reckoning.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 2 — the verdict: knowledge, not mechanism</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#59a14f"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">10 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 30–32</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Pry the box open and you find the same thing the next rung proves the hard way.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">30</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Representational geometry</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the structure of these latent spaces, studied directly</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">31</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Imputation &amp; denoising</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">another thing the representations buy you</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">32</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Knowledge without mechanism</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the features encode organized biological knowledge — and almost no causal mechanism</text>
</svg>
</section>

<section class="slide" data-cheat="The perturbation-prediction task is the honest test: predict the cell&#x27;s new state after an intervention." data-notes="Everything so far has been about cells as they are. But the test that actually matters is different: the perturbation-prediction task. Given a drug, or a CRISPR knockout, predict the cell&#x27;s new state — where it goes, not where it sits. This is the first genuinely interventional question, and it&#x27;s the natural benchmark for any model that claims to understand cells rather than just catalog them. So people ran the obvious experiment: take the big foundation models and test them on it. The result, in 2024, was not what the field expected.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">The hinge — Reckon: the test that matters</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">11 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concept 33</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">There&#x27;s one task that separates description from understanding — and it&#x27;s brutal.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">33</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The perturbation-prediction task</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">given a drug or a gene knockout, predict the cell&#x27;s NEW state — not its current one</text>
</svg>
</section>

<section class="slide" data-cheat="The pivot: a regression that predicts the mean of training perturbations matched/beat every FM (Ahlmann-Eltze et al., 2024)." data-notes="Here is the slide the whole first half builds to. Someone tried the dumbest possible baseline: predict the average of the perturbations you saw in training — no foundation model at all, just a linear regression. And on the perturbation-prediction task, that baseline matched or beat every published single-cell foundation model. That&#x27;s the 2024 reckoning, from Ahlmann-Eltze, Huber and Anders, and the same mean-baseline result was flagged even earlier in a preprint by Kernfeld and colleagues. Sit with that for a second. All that pretraining, all that scale — and a line through the data did as well. The obvious question is: why?">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">The reckoning: a line beats the giants</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">12 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 34–36</text>
  <text x="44" y="188" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">On the task that matters, a plain linear baseline matched or beat every published cell FM.</text>
  <rect x="360" y="321" width="150" height="279" rx="4" fill="#c0392b"/>
  <text x="435" y="626" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="600" fill="#444">Linear baseline</text>
  <rect x="600" y="330" width="150" height="270" rx="4" fill="#9c6bab"/>
  <text x="675" y="626" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="600" fill="#444">Best single-cell FM</text>
  <rect x="840" y="366" width="150" height="234" rx="4" fill="#b9b9ad"/>
  <text x="915" y="626" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="600" fill="#444">Avg. FM</text>
  <line x1="330" y1="600" x2="1000" y2="600" stroke="#999" stroke-width="1.5"/>
  <text x="320" y="310" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">accuracy on</text>
  <text x="320" y="328" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">perturbation</text>
  <text x="320" y="346" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">prediction ↑</text>
  <text x="106" y="650" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="#555"><tspan font-weight="700" fill="#c0392b">(34) linear baseline</tspan> · <tspan font-weight="700">(35)</tspan> Ahlmann-Eltze, Huber &amp; Anders (2024) · <tspan font-weight="700">(36)</tspan> mean/additive baseline, Kernfeld et al. (earlier preprint)</text>
</svg>
</section>

<section class="slide" data-cheat="The diagnosis: leaky splits + metrics that reward the mean, plus a real gap — representation is not intervention." data-notes="Two things went wrong, and it&#x27;s worth separating them. Some of the gap was how we graded: leaky train-test splits that let models memorize, and metrics that quietly rewarded just predicting the population average. Fix those and a one-line regression on the FM embeddings — the latent-additive baseline — becomes the honest floor everyone now has to beat. But some of the gap was real. The 2026 re-appraisal lands in a sensible place: keep foundation models for what they&#x27;re good at, rungs one and two, and stop pretending that filling in masked genes taught them regulatory logic. The diagnosis is one sentence: representation is not intervention. You cannot climb rung three for free.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Reckon — why it happened, and the re-appraisal</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">13 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 37–40</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Part of the gap was how we were grading; part of it was real.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">37</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Latent-additive baseline</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">a one-line regression on FM embeddings became the new floor to beat</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">38</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Leaky splits</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">train/test overlap that flattered the models</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">39</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Metric (mis)calibration</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">scores that rewarded predicting the population mean</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">40</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The 2026 re-appraisal</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">keep FMs for rungs 1–2; stop pretending masked-genes learned regulatory logic</text>
</svg>
</section>

<section class="slide" data-cheat="The fix for rung 3 isn&#x27;t a bigger model — it&#x27;s interventional data: perturb on purpose, then sequence." data-notes="So the field did the right thing: it changed its data. If watching cells sit in their natural states can&#x27;t teach you what causes what, then stop watching and start poking. That&#x27;s the turn from observational to interventional data, and it&#x27;s the most important move in this whole story. The first big form is genetic: Perturb-seq pairs a single-cell readout with CRISPR edits, so you actually know what you changed. For the first time the data itself contains interventions, not just snapshots.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 3 — Intervene: change the data</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">14 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 41–42</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">If observation won&#x27;t teach causation, stop observing and start intervening.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">41</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Observational → interventional data</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the field&#x27;s central pivot: perturb on purpose, then read out</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">42</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Perturb-seq</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">single-cell readout paired with CRISPR edits — genetic intervention at scale</text>
</svg>
</section>

<section class="slide" data-cheat="Chemical perturbation scaled from sci-Plex to Tahoe-100M — ~100M dose-resolved drug-treated cells." data-notes="The other lever is chemical — drugs, not edits. sci-Plex showed you could multiplex chemical transcriptomics, reading many drugs in one experiment; MIX-Seq did it across cell lines. And then the scale jumped. Tahoe-100M is roughly a hundred million cells, eleven hundred small molecules, fifty cancer lines, resolved by dose — the largest perturbation atlas by cell count. Its genome-wide genetic counterpart is X-Atlas/Orion, Xaira&#x27;s eight-million-cell Perturb-seq. The point is: the substrate finally exists. The question becomes what you build on top of it.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 3 — chemical perturbation, at scale</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">15 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 43–45</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">The other lever is drugs — and the atlases got enormous.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">43</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">sci-Plex</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">multiplexed chemical transcriptomics — many drugs, one experiment</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">44</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">MIX-Seq</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">multiplexed drug response across cell lines</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">45</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Tahoe-100M</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">~100M cells, ~1,100 drugs, 50 lines, dose-resolved (genome-wide genetic counterpart: X-Atlas/Orion)</text>
</svg>
</section>

<section class="slide" data-cheat="Perturbation-native models (STATE, Tahoe-x1) model the set-level shift a perturbation induces, not a point." data-notes="On this new substrate, a genuinely different kind of model shows up — built for interventions from the start. Arc Institute&#x27;s STATE is the flagship, and its signature move is the right one: model a perturbation as a set-level distributional shift — how a whole population of cells moves — rather than predicting one average point. Tahoe-x1 pushes scale, three billion parameters, the largest model actually trained on perturbations, though C2S-Scale reaches twenty-seven billion in an LLM style. The deeper claim here is substrate-as-moat: the way past the masked-token ceiling isn&#x27;t a bigger net, it&#x27;s better data.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 3 — perturbation-native models</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">16 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 46–49</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">On interventional data, a new kind of model appears — built for shifts, not snapshots.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">46</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">STATE (Arc Institute)</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">models a perturbation as a shift, trained on interventional data</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">47</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Set-level distributional shift</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">predict how a whole population moves, not one point</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">48</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Tahoe-x1</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">3B-param, the largest perturbation-trained model (C2S-Scale reaches 27B, LLM-style)</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">49</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Substrate-as-moat</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the answer to the masked-token ceiling: better data, not just bigger nets</text>
</svg>
</section>

<section class="slide" data-cheat="Two camps now: institutes scaling vs. small groups fine-tuning — and Pertpy standardizing the plumbing." data-notes="The reckoning had a sociological effect: it split the field into two directions. Big institutes keep scaling foundation models. Smaller groups — statisticians, computational scientists — innovate on the modeling itself, and they keep winning with a light adapter, a LoRA or FiLM head, on a frozen backbone. The now-routine finding is that careful fine-tuning beats raw pretraining. Underneath both camps, Pertpy has become the standard analysis pipeline, which matters more than it sounds — it makes results comparable. So the field is no longer one race; it&#x27;s two, with shared infrastructure.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 3 — two directions, one pipeline</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">17 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 50–53</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">The reckoning split the field into two camps — and standardized the plumbing underneath.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">50</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The two-direction era</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">big institutes scale; small groups innovate on the modeling itself</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">51</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Adapter (LoRA / FiLM)</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the small-lab move: a light head on a frozen backbone</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">52</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Fine-tuning beats pretraining</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the now-routine finding</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">53</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Pertpy</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the standard analysis pipeline underneath both camps</text>
</svg>
</section>

<section class="slide" data-cheat="A whole family answers rung 3 descriptively (differential abundance); the real prize is context generalization." data-notes="There&#x27;s also a quieter, descriptive way to answer rung three: don&#x27;t model the effect, just measure which populations changed. Milo, MELD, and scCODA all do differential abundance — telling you which cell types shrank or grew under a perturbation. Worth flagging the open argument: a GenBio rebuttal claims that under better-calibrated metrics the larger models do beat the baselines — directionally fair, commercially interested, not settled. The field&#x27;s real program is in-silico perturbation, and the prize is context generalization — the Virtual Cell Challenge&#x27;s held-out target — because the same perturbation does different things in different cells. That context-dependence is the thing nobody has nailed.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 3 — the descriptive answers + the prize</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#e8924a"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">18 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 54–60</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Before modeling effects, you can just measure which populations changed — and name the real goal.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">54–56</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Differential abundance: Milo · MELD · scCODA</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">measure which cell populations shrank or grew</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">57</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The metrics rebuttal (GenBio)</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">under better-calibrated metrics, larger models do beat baselines (contested)</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">58–59</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">In-silico perturbation · context generalization</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the program, and the Virtual Cell Challenge&#x27;s held-out target</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">60</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Context-dependent gene function</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the prize: the same perturbation does different things in different cells</text>
</svg>
</section>

<section class="slide" data-cheat="Rung 4: model the whole distribution of outcomes and sample — the machinery (diffusion, flow matching, DiT) is from vision." data-notes="If a single point prediction loses to a ridge regression, the move is to raise the ambition: don&#x27;t predict one outcome, model the entire distribution of outcomes and sample from it. The machinery came straight from computer vision. Diffusion reverses a noising process to generate. Flow matching learns a velocity field that carries noise to data. The Diffusion Transformer makes the denoiser itself an attention model — which means rung four is literally built on top of rung one. None of this was invented in biology; it was transplanted. The interesting question is what it takes to make it work on cells.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 4 — Predict: model the whole distribution</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#9c6bab"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">19 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 61–64</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">If a point prediction loses to a ridge regression, raise the ambition: model the distribution and sample.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">61</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The distribution</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">model the full spread of outcomes, then draw from it</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">62</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Diffusion</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">reverse a noising process to generate (Ho et al., 2020)</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">63</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Flow matching</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">learn a velocity field that carries noise to data</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">64</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Diffusion Transformer (DiT)</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">make the denoiser an attention model — so rung 4 is built ON rung 1</text>
</svg>
</section>

<section class="slide" data-cheat="Latent diffusion + a count-aware decoder + guidance adapt vision generators to cells (CFGen, CellFlow, scDiffEq)." data-notes="Generating raw twenty-thousand-dimensional counts directly is brutal, so three adaptations make the image machinery work on cells. Latent diffusion runs the process inside a learned latent space. A count-aware decoder — a negative-binomial head — restores the discrete, over-dispersed structure of real scRNA-seq. And classifier-free guidance lets you steer samples toward a particular drug or dose. The single-cell instances followed quickly: CFGen, scDiffusion, CellFlow, and scDiffEq, which goes furthest by making the diffusion itself the cell&#x27;s dynamics. These can reproduce a treated population strikingly well.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 4 — the single-cell generators</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#9c6bab"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">20 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 65–71</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Three adaptations make image machinery work on counts — then the instances arrive.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">65</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Latent diffusion</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">run the process inside a learned latent, not raw 20k-dim counts</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">66</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Count-aware decoder</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">a negative-binomial head restores discrete, over-dispersed counts</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">67</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Classifier-free guidance</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">steer samples toward a drug or dose</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">68–71</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">CFGen · scDiffusion · CellFlow · scDiffEq</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the single-cell instances (scDiffEq makes diffusion BE the dynamics)</text>
</svg>
</section>

<section class="slide" data-cheat="The other half of &#x27;forward&#x27; is real motion — RNA velocity / scVelo / dynamo — not generative sampling." data-notes="There&#x27;s a second meaning of &#x27;forward&#x27; that isn&#x27;t generative sampling at all — it&#x27;s reading the cell&#x27;s actual motion. RNA velocity infers near-future direction from the ratio of spliced to unspliced transcripts; scVelo and dynamo refine that into a full dynamical vector-field picture. Trajectory inference — Monocle, Slingshot, PAGA — orders cells along pseudotime. RegVelo couples velocity with a regulatory network. These are lovely and grounded in real biophysics. But notice they describe how cells are already moving — which sets up the caveat that forces the final rung.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 4 — the other &#x27;forward&#x27;: real dynamics</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#9c6bab"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">21 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 72–76</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Generative sampling isn&#x27;t the only way forward — some tools read actual motion.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">72</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">RNA velocity</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">near-future direction from spliced/unspliced ratios</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">73–74</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">scVelo · dynamo</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">refine velocity into a dynamical, vector-field picture</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">75</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Trajectory inference</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">Monocle, Slingshot, PAGA — order cells along pseudotime</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">76</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">RegVelo</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">couple velocity with a regulatory network</text>
</svg>
</section>

<section class="slide" data-cheat="Matching the distribution ≠ causality — a generator can nail the treated population and know nothing about why." data-notes="Here&#x27;s the caveat, and it&#x27;s the hinge into the last rung. A generator can reproduce the treated population beautifully — match every moment of the distribution — and still not know why any single cell moved. Distribution-matching is not causality. Getting the picture right is not the same as knowing the mechanism. And underneath it all is the axis these models keep throwing away: dynamics, real time. Today&#x27;s models are mostly snapshots. So we&#x27;ve climbed to rung four — we can draw the cell forward — and we still can&#x27;t answer the question we actually care about: what should I do? That&#x27;s rung five.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 4 — the caveat that forces rung 5</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#9c6bab"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">22 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 77–78</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">A model can match the treated population perfectly and still understand nothing.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">77</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Distribution-matching is not causality</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">reproduce the treated cells beautifully — and still not know why any one moved</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">78</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Dynamics</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the time axis a static snapshot throws away; today&#x27;s models are snapshots</text>
</svg>
</section>

<section class="slide" data-cheat="Rung 5 models the effect with Pearl&#x27;s do() operator — P(cell | do(drug)), not P(cell). The obstacle is transportability." data-notes="The honest response to &#x27;matching isn&#x27;t causality&#x27; is to stop modeling the picture and start modeling the effect. That&#x27;s Pearl&#x27;s do() operator: not the probability of a cell, but the probability of a cell given that you do a drug — P(cell | do(drug)). It&#x27;s a different mathematical object, and it&#x27;s the right one. The obstacle has a precise name too: causal transportability. A model you fit in one context — one cell line, one assay — need not hold in another. Generalizing an intervention is exactly where things get hard, and the next few slides are the genuinely causal lineage that tries.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 5 — Counterfactual: change its fate</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">23 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 79–80</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">The honest response to &#x27;matching isn&#x27;t causality&#x27; is to model the effect itself.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">79</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The do() operator</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">Pearl&#x27;s move: not P(cell) but P(cell | do(drug))</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">80</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Causal transportability</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the obstacle: a model fit in one context need not hold in another</text>
</svg>
</section>

<section class="slide" data-cheat="The CPA/GEARS lineage factors the effect (perturbation + dose + covariate) so it can reach unseen drugs and knockouts." data-notes="The first genuinely causal thread tries to disentangle the effect so it can extrapolate. CPA factors a cell&#x27;s latent representation into additive parts — the perturbation, the dose, the covariates — so you can recombine them. chemCPA routes the perturbation through a molecular-structure encoder, which lets it reach drugs it never saw. GEARS injects a gene-gene knowledge graph to predict unseen and even combinatorial knockouts. PerturbNet generalizes the generative map across perturbation space. The shared ambition is the right one: not just fit what you measured, but predict the effect of something you haven&#x27;t tried.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 5 — disentangle the effect</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">24 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 81–84</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">One thread factors the effect apart so it can extrapolate.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">81</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">CPA</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">factor a cell&#x27;s latent into perturbation + dose + covariate</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">82</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">chemCPA</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">route the perturbation through a molecular-structure encoder — unseen drugs</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">83</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">GEARS</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">inject a gene-graph to predict unseen and combinatorial knockouts</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">84</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">PerturbNet</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">generalize the generative map across perturbation space</text>
</svg>
</section>

<section class="slide" data-cheat="A parallel thread removes confounding and contamination (DCD-FG, CINEMA-OT, Mixscape) before claiming an effect." data-notes="A parallel thread goes after structure and confounding directly — because a clean effect estimate is worthless if the data are dirty. DCD-FG does causal discovery from interventions, learning the graph rather than assuming it. CINEMA-OT separates the genuine treatment effect from the confounder riding along with it. And Mixscape does something deceptively important: it removes the cells that escaped the perturbation entirely — the non-targeting contamination that otherwise washes out your signal. Unglamorous, but you can&#x27;t make a counterfactual claim on contaminated data.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 5 — strip out the confounding</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">25 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 85–87</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Another thread attacks structure and contamination directly.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">85</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Causal discovery from interventions (DCD-FG)</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">learn the causal graph from interventional data</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">86</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">CINEMA-OT</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">separate the true effect from the confounder</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">87</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Mixscape</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">remove cells that escaped the perturbation — non-targeting contamination</text>
</svg>
</section>

<section class="slide" data-cheat="The deepest idea: read a perturbation as an optimal-transport map from control to treated (CellOT, moscot)." data-notes="Now the deepest idea on this rung. Instead of generating treated cells, read the perturbation as a coupling — an optimal-transport map that carries the control population onto the treated one. It&#x27;s causal in spirit: it asks, for each control cell, where did it most plausibly go. CellOT brought neural optimal transport to perturbation response; moscot scaled it to atlases and multiple modalities. This reframes the whole problem as transport rather than generation — and it opens a door the generators can&#x27;t, which is the next slide: what if mass isn&#x27;t conserved?">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 5 — the optimal-transport coupling</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">26 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 88–90</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">The deepest causal idea here: a map that carries control cells to treated ones.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">88</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Optimal-transport coupling</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">read a perturbation as a map from the control population to the treated one</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">89</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">CellOT</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">neural OT for perturbation response</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">90</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">moscot</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">OT at atlas scale, multimodal</text>
</svg>
</section>

<section class="slide" data-cheat="Unbalanced OT (WFR) lets the map create/destroy mass — splitting a death term from the transport term. This is the math the bet sits on." data-notes="Standard optimal transport assumes mass is conserved — every control cell goes somewhere. But real drugs kill cells, so the treated population is smaller. That&#x27;s where unbalanced optimal transport comes in: it lets mass be created and destroyed. The Wasserstein-Fisher-Rao formulation does the crucial thing — it splits the map into two terms, a death term and a transport term. That machinery underlies Waddington-OT, NUBOT, and TIGON, which already learns a per-cell growth and death rate field — though for a developmental time-course, not a drug. Either way, the coupling reads as a per-cell treatment effect. Remember this math; the whole closing bet sits on it.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 5 — when mass is created and destroyed</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">27 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 91–95</text>
  <text x="44" y="188" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Standard OT conserves mass. Real drugs kill cells — so the map needs a death term.</text>
  <circle cx="293" cy="444" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="294" cy="421" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="276" cy="425" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="327" cy="440" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="326" cy="436" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="311" cy="435" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="268" cy="447" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="313" cy="443" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="273" cy="402" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="278" cy="418" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="309" cy="429" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="314" cy="413" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="308" cy="441" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="287" cy="464" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="313" cy="458" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="284" cy="411" r="5" fill="#4e79a7" opacity="0.85"/>
  <circle cx="810" cy="377" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="837" cy="387" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="809" cy="356" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="808" cy="408" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="799" cy="386" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="829" cy="348" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="821" cy="410" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="783" cy="374" r="5" fill="#e8924a" opacity="0.85"/>
  <circle cx="817" cy="359" r="5" fill="#e8924a" opacity="0.85"/>
  <text x="300" y="520" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="600" fill="#444">control</text>
  <text x="820" y="520" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="600" fill="#444">treated (fewer cells)</text>
  <defs><marker id="a27" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#777"/></marker></defs>
  <path d="M360,400 Q580,375 770,362" fill="none" stroke="#777" stroke-width="1.6" opacity="0.6" marker-end="url(#a27)"/>
  <path d="M360,430 Q580,405 770,380" fill="none" stroke="#777" stroke-width="1.6" opacity="0.6" marker-end="url(#a27)"/>
  <path d="M360,460 Q580,435 770,398" fill="none" stroke="#777" stroke-width="1.6" opacity="0.6" marker-end="url(#a27)"/>
  <path d="M330,470 Q360,560 410,575" fill="none" stroke="#c0392b" stroke-width="1.8" stroke-dasharray="5 4"/>
  <text x="430" y="585" font-family="Helvetica,Arial,sans-serif" font-size="16" font-weight="700" fill="#c0392b">death (mass destroyed) ✕</text>
  <text x="106" y="650" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#555"><tspan font-weight="700">(91) unbalanced OT</tspan> lets mass change · <tspan font-weight="700">(92) WFR</tspan> splits death from transport · Waddington-OT · <tspan font-weight="700">(93) NUBOT</tspan> · <tspan font-weight="700">(94) TIGON</tspan> · <tspan font-weight="700">(95) per-cell effect</tspan></text>
</svg>
</section>

<section class="slide" data-cheat="The sharpest form of rung 5 flips the question to WHO survives — the survival field π(x|drug,dose)." data-notes="Push rung five to its sharpest form and the question flips. Every model so far asks what the survivors look like. The real question is who survives. That&#x27;s the survival field — pi of x given drug and dose — the probability that a cell in state x persists under that treatment. Modeling survival instead of appearance forces a distinction the generators quietly skip: competing risks, telling true death apart from a non-lethal change of state. The selection logic is old — CRISPR screens read a selection coefficient off guide dropout — but per-gene and in bulk, never per-cell from transcriptomic state. And the top of the ladder is to stop conditioning on others&#x27; experiments and run your own: active experimental design, the closed loop where a model earns causality by acting — toward a runnable world model of the cell.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">Rung 5 — the flip: not what survivors look like, but WHO survives</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">28 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concepts 96–100</text>
  <text x="44" y="196" font-family="Helvetica,Arial,sans-serif" font-size="22" fill="#2b2b2b">Push the question to its sharpest form and it inverts.</text>
  <circle cx="74" cy="262" r="16" fill="#5b6b7b"/>
  <text x="74" y="267" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">96</text>
  <text x="106" y="260" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The survival field  π(x | drug, dose)</text>
  <text x="106" y="284" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">the probability a cell at state x persists under that treatment</text>
  <circle cx="74" cy="346" r="16" fill="#5b6b7b"/>
  <text x="74" y="351" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">97</text>
  <text x="106" y="344" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Competing risks</text>
  <text x="106" y="368" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">separate true death from a non-lethal change of state</text>
  <circle cx="74" cy="430" r="16" fill="#5b6b7b"/>
  <text x="74" y="435" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">98</text>
  <text x="106" y="428" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Selection coefficient (MAGeCK)</text>
  <text x="106" y="452" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">screens read survival off guide dropout — but per-gene, in bulk</text>
  <circle cx="74" cy="514" r="16" fill="#5b6b7b"/>
  <text x="74" y="519" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">99–100</text>
  <text x="106" y="512" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">Active experimental design (IterPert) → a runnable world model</text>
  <text x="106" y="536" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">earn causality by acting; snapshot → trajectory → simulator</text>
</svg>
</section>

<section class="slide" data-cheat="Recap: the field climbed to rung 4 and has a hand on rung 5; the bet is that the next rung isn&#x27;t a bigger FM." data-notes="Let&#x27;s come back to where we started. On this ladder, the field has climbed solidly through rung four — we can draw the cell forward — and it&#x27;s just setting a hand on rung five. We have powerful models like STATE, giant interventional atlases like Tahoe-100M, standard pipelines like Pertpy. So here&#x27;s the bet this whole map argues for, and it is a bet, not consensus. The next breakthrough is probably not a bigger foundation model. Scaling still pays, and reasonable people disagree. But the most under-worked axis isn&#x27;t a better generator — it&#x27;s a change in the object we model. And the survival field — knowing which cells live or die — is the one object still missing from this map.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img" aria-label="Field map: products by time and causal rung">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/><rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="56" font-family="Helvetica,Arial,sans-serif" font-size="40" font-weight="700" fill="#1d2a17">The ladder of causality</text>
  <text x="46" y="80" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="#566b46">Every product, placed by time (→) and the causal rung it reaches (↑)</text>
  <g font-family="Helvetica,Arial,sans-serif" font-size="14.5" fill="#333">
    <circle cx="812" cy="30" r="8" fill="#4e79a7"/><text x="827" y="35">Foundation model</text>
    <circle cx="1032" cy="30" r="8" fill="#e8924a"/><text x="1047" y="35">Dataset</text>
    <circle cx="812" cy="58" r="8" fill="#9c6bab"/><text x="827" y="63">Other tool / method</text>
    <circle cx="1032" cy="58" r="8" fill="#2a9d8f"/><text x="1047" y="63">Event</text>
  </g>
  <line x1="196" y1="158" x2="196" y2="572" stroke="#b9b9ad" stroke-width="1.5"/>
  <text x="46" y="152" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">causal rung ↑</text>
    <text x="182" y="562" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">1</text>
    <text x="182" y="578" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Describe</text>
    <text x="182" y="464" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">2</text>
    <text x="182" y="480" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Correlate</text>
    <text x="182" y="367" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">3</text>
    <text x="182" y="383" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Intervene</text>
    <text x="182" y="270" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">4</text>
    <text x="182" y="286" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Predict</text>
    <text x="182" y="172" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">5</text>
    <text x="182" y="188" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Counterfactual</text>
  <rect x="196" y="430" width="972" height="176" fill="#dfe7ef" opacity="0.5"/>
  <text x="212" y="593" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b7a93" font-style="italic">the field clusters here (≈ rung 1–2)</text>
  <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#5b5b5b"/></marker></defs>
  <line x1="196" y1="596" x2="1174" y2="596" stroke="#5b5b5b" stroke-width="2" marker-end="url(#ar)"/>
    <line x1="196" y1="592" x2="196" y2="600" stroke="#5b5b5b"/>
    <text x="196" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2015</text>
    <line x1="359" y1="592" x2="359" y2="600" stroke="#5b5b5b"/>
    <text x="359" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2017</text>
    <line x1="523" y1="592" x2="523" y2="600" stroke="#5b5b5b"/>
    <text x="523" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2019</text>
    <line x1="686" y1="592" x2="686" y2="600" stroke="#5b5b5b"/>
    <text x="686" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2021</text>
    <line x1="849" y1="592" x2="849" y2="600" stroke="#5b5b5b"/>
    <text x="849" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2023</text>
    <line x1="1013" y1="592" x2="1013" y2="600" stroke="#5b5b5b"/>
    <text x="1013" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2025</text>
  <text x="1170" y="616" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">Timeline →</text>
  <circle cx="515" cy="546" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="515" y="572" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scVI</text>
  <circle cx="727" cy="527" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="727" y="552" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scBERT</text>
  <circle cx="849" cy="571" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="849" y="596" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Geneformer</text>
  <circle cx="870" cy="508" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="855" y="512" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scGPT</text>
  <circle cx="890" cy="449" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="890" y="432" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">scFoundation</text>
  <circle cx="915" cy="546" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="915" y="572" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">UCE†</text>
  <circle cx="935" cy="478" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="935" y="503" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">CellPLM</text>
  <circle cx="964" cy="566" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="964" y="591" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Nicheformer</text>
  <circle cx="1001" cy="459" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="986" y="463" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">C2S-Scale</text>
  <circle cx="1033" cy="532" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1033" y="557" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">TranscriptFormer</text>
  <circle cx="1111" cy="498" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1096" y="502" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">xVERSE</text>
  <circle cx="596" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="596" y="396" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">sci-Plex</text>
  <circle cx="760" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="760" y="396" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Perturb-seq</text>
  <circle cx="1013" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="1013" y="396" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Tahoe-100M</text>
  <circle cx="1054" cy="371" r="10" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <line x1="1054" y1="359" x2="1054" y2="341" stroke="#bbb" stroke-width="1"/>
  <text x="1054" y="333" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">X-Atlas</text>
  <circle cx="1070" cy="288" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1055" y="292" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">STATE</text>
  <circle cx="1099" cy="332" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1099" y="357" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Tahoe-x1</text>
  <circle cx="1131" cy="303" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1131" y="286" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">X-Cell</text>
  <circle cx="1143" cy="220" r="10" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1143" y="203" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Lingshu-Cell</text>
  <circle cx="972" cy="322" r="10" fill="#2a9d8f" stroke="#fff" stroke-width="2"/>
  <text x="972" y="305" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">the reckoning</text>
  <circle cx="1041" cy="430" r="10" fill="#2a9d8f" stroke="#fff" stroke-width="2"/>
  <text x="1041" y="454" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">VC Challenge</text>
  <circle cx="482" cy="274" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="482" y="256" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">RNA velocity</text>
  <circle cx="637" cy="269" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="637" y="294" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">DDPM (diffusion)</text>
  <circle cx="1021" cy="239" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="1021" y="222" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">CellFlow</text>
  <circle cx="237" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="237" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Chizat unbalanced OT</text>
  <circle cx="417" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="417" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">Waddington-OT</text>
  <circle cx="702" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="702" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">CPA</text>
  <circle cx="809" cy="210" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="809" y="235" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">GEARS</text>
  <circle cx="890" cy="176" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="890" y="159" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">moscot</text>
  <circle cx="931" cy="215" r="10" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="931" y="240" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" font-weight="600" fill="#2b2b2b">TIGON</text>
  <text x="196" y="658" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#999">† UCE — first posted 2023, revised through v3 (2026); dots mark each work’s first appearance.</text>
</svg>
</section>

<section class="slide" data-cheat="Close on the frontier: the math and the data are ready; the missing object is a per-cell survival field — build that and the cell tells you what to DO." data-notes="So let me close where the essay closes. The most under-worked move in the field is to change the object we model — from existence to survival. From describing the cell to deciding its fate. And the striking thing is how ready this is. The math is ready: unbalanced optimal transport, the Wasserstein-Fisher-Rao split, a decade old. The data is ready: Tahoe-100M, a hundred million dose-resolved drug-treated cells. The only thing missing is the object itself — nobody has assembled a learned, drug- and dose-conditioned, per-cell survival field that separates death from transition. That gap is the opportunity. Build the model that knows who lives, and you finally have a virtual cell worth querying — one that tells you not what a treated population looks like, but what to do. Thank you.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="58" font-family="Helvetica,Arial,sans-serif" font-size="34" font-weight="700" fill="#1d2a17">The open frontier: from existence to survival</text>
  <rect x="44" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="158" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">1  Describe</text>
  <rect x="284" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="398" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">2  Correlate</text>
  <rect x="524" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="638" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">3  Intervene</text>
  <rect x="764" y="108" width="228" height="32" rx="5" fill="#ececec"/>
  <text x="878" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="500" fill="#9a9a9a">4  Predict</text>
  <rect x="1004" y="108" width="228" height="32" rx="5" fill="#b03a2e"/>
  <text x="1118" y="129" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="700" fill="#fff">5  Counterfactual</text>
  <text x="44" y="700" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">Virtual cells · five questions</text>
  <text x="640" y="700" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">30 / 30</text>
  <text x="1236" y="700" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#a3a3a3">concept 96</text>
  <text x="640" y="270" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="40" font-weight="700" fill="#9a6a06">π(x | drug, dose)</text>
  <text x="640" y="312" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#7e6a3a">the probability a cell at state x survives a treatment — a learned, per-cell survival field</text>
  <circle cx="120" cy="380" r="7" fill="#b03a2e"/>
  <text x="142" y="378" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The math is ready</text>
  <text x="142" y="402" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">unbalanced OT / Wasserstein–Fisher–Rao splits death from transport (a decade old)</text>
  <circle cx="120" cy="458" r="7" fill="#b03a2e"/>
  <text x="142" y="456" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The data is ready</text>
  <text x="142" y="480" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">Tahoe-100M — ~100M dose-resolved drug-treated cells</text>
  <circle cx="120" cy="536" r="7" fill="#b03a2e"/>
  <text x="142" y="534" font-family="Helvetica,Arial,sans-serif" font-size="20" font-weight="700" fill="#222">The object is missing</text>
  <text x="142" y="558" font-family="Helvetica,Arial,sans-serif" font-size="15.5" fill="#666">no one has built a learned, drug/dose-conditioned, per-cell survival field that separates death from transition</text>
  <rect x="106" y="612" width="1068" height="46" rx="6" fill="#1d2a17"/>
  <text x="640" y="641" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="18" font-weight="600" fill="#f7f7ef">Build the model that knows who lives — and the virtual cell finally tells you what to <tspan font-style="italic">do</tspan>.</text>
</svg>
</section>
