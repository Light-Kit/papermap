---
title: 'Hook — the ladder of causality'
date: '2026-05-21'
summary: "A one-slide hook for the virtual-cell talk: every dated work plotted as a node on a two-axis map — time (x) against the five-rung causal ladder (y, describe→counterfactual) — coloured by type (FM / VC / dataset / other tool) and wired with the key lineage arrows. The honest reading: despite the model-scaling boom, the linear-baseline reckoning puts the field back near rung 1–2, and the top rung (the survival field π(x|drug,dose)) is still empty."
topics:
- presentation
- virtual-cell
- causal-inference
---

> *Presenter view of the talk's opening hook. Use ← / → to step slides; speaker notes show below the stage. This is the visual twin of the [timeline & lineage companion](five-questions-timeline-and-lineage.md).*

<section class="slide" data-notes="Pearl&#x27;s ladder, applied to the cell: rung 1 describe, 2 correlate, 3 intervene, 4 predict, 5 counterfactual. The hook - we built giant foundation models, but the 2024 linear-baseline reckoning says that on the question that matters (perturbation prediction) the field is really back near rung 1-2. The gold star top-right is the survival field pi(x|drug,dose): nobody has built it yet. Lineage to point at: the optimal-transport math (Chizat 2015) predates the cells by a decade; Roohani carries GEARS into STATE; the diffusion machinery is imported from vision.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img" aria-label="Timeline node-map: the ladder of causality">
  <defs>
    <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#5b5b5b"/>
    </marker>
    <marker id="arg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#b8860b"/>
    </marker>
  </defs>
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/>
  <rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="56" font-family="Helvetica,Arial,sans-serif" font-size="40" font-weight="700" fill="#1d2a17">The ladder of causality</text>
  <text x="46" y="80" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="#566b46">Ten years of climbing — and the top rung is still empty</text>
  <g font-family="Helvetica,Arial,sans-serif" font-size="14.5" fill="#333">
    <circle cx="770" cy="26" r="8" fill="#4e79a7"/>
    <text x="785" y="31">Foundation model</text>
    <circle cx="1005" cy="26" r="8" fill="#59a14f"/>
    <text x="1020" y="31">Virtual cell / challenge</text>
    <circle cx="770" cy="52" r="8" fill="#e8924a"/>
    <text x="785" y="57">Dataset</text>
    <circle cx="1005" cy="52" r="8" fill="#9c6bab"/>
    <text x="1020" y="57">Other tool / method</text>
    <polygon points="770.0,70.0 772.0,75.2 777.6,75.5 773.2,79.1 774.7,84.5 770.0,81.4 765.3,84.5 766.8,79.1 762.4,75.5 768.0,75.2" fill="#fff3d6" stroke="#b8860b" stroke-width="1.6"/>
    <text x="785" y="83">the open prize (unbuilt)</text>
  </g>
  <line x1="196" y1="178" x2="196" y2="572" stroke="#b9b9ad" stroke-width="1.5"/>
  <text x="46" y="170" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">causal rung ↑</text>
    <line x1="190" y1="566" x2="196" y2="566" stroke="#b9b9ad"/>
    <text x="182" y="562" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">1</text>
    <text x="182" y="578" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Describe</text>
    <line x1="190" y1="474" x2="196" y2="474" stroke="#b9b9ad"/>
    <text x="182" y="470" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">2</text>
    <text x="182" y="486" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Correlate</text>
    <line x1="190" y1="381" x2="196" y2="381" stroke="#b9b9ad"/>
    <text x="182" y="377" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">3</text>
    <text x="182" y="393" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Intervene</text>
    <line x1="190" y1="288" x2="196" y2="288" stroke="#b9b9ad"/>
    <text x="182" y="284" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">4</text>
    <text x="182" y="300" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Predict</text>
    <line x1="190" y1="196" x2="196" y2="196" stroke="#b9b9ad"/>
    <text x="182" y="192" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14" font-weight="600" fill="#5b5b5b">5</text>
    <text x="182" y="208" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12.5" fill="#8a8a8a">Counterfactual</text>
  <rect x="196" y="441" width="972" height="162" fill="#e7c2bb" opacity="0.30"/>
  <text x="212" y="465" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="14.5" fill="#a23b2d" font-style="italic">where the field really is (≈ rung 1–2) — the linear-baseline reckoning</text>
  <line x1="196" y1="596" x2="1174" y2="596" stroke="#5b5b5b" stroke-width="2" marker-end="url(#ar)"/>
    <line x1="196" y1="592" x2="196" y2="600" stroke="#5b5b5b"/>
    <text x="196" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2015</text>
    <line x1="368" y1="592" x2="368" y2="600" stroke="#5b5b5b"/>
    <text x="368" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2017</text>
    <line x1="540" y1="592" x2="540" y2="600" stroke="#5b5b5b"/>
    <text x="540" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2019</text>
    <line x1="712" y1="592" x2="712" y2="600" stroke="#5b5b5b"/>
    <text x="712" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2021</text>
    <line x1="884" y1="592" x2="884" y2="600" stroke="#5b5b5b"/>
    <text x="884" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2023</text>
    <line x1="1056" y1="592" x2="1056" y2="600" stroke="#5b5b5b"/>
    <text x="1056" y="616" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#5b5b5b">2025</text>
  <text x="1170" y="616" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13" fill="#999" font-style="italic">Timeline →</text>
  <path d="M239,196 Q334,170 428,196" fill="none" stroke="#8a8a8a" stroke-width="1.6" opacity="0.7" marker-end="url(#ar)"/>
  <path d="M428,196 Q678,170 927,196" fill="none" stroke="#8a8a8a" stroke-width="1.6" opacity="0.7" marker-end="url(#ar)"/>
  <path d="M669,288 Q876,262 1082,288" fill="none" stroke="#8a8a8a" stroke-width="1.6" opacity="0.7" marker-end="url(#ar)"/>
  <path d="M841,196 Q972,216 1103,288" fill="none" stroke="#8a8a8a" stroke-width="1.6" opacity="0.7" marker-end="url(#ar)"/>
  <path d="M617,381 Q706,355 794,381" fill="none" stroke="#8a8a8a" stroke-width="1.6" opacity="0.7" marker-end="url(#ar)"/>
  <path d="M1103,288 Q1125,216 1146,196" fill="none" stroke="#b8860b" stroke-width="1.6" opacity="0.7" stroke-dasharray="5 5" marker-end="url(#arg)"/>
  <circle cx="239" cy="196" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="239" y="178" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Chizat unbalanced OT</text>
  <circle cx="428" cy="196" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="428" y="178" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Waddington-OT</text>
  <circle cx="497" cy="288" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="497" y="270" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">RNA velocity</text>
  <circle cx="531" cy="566" r="11" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="531" y="592" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">scVI</text>
  <circle cx="617" cy="381" r="11" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="617" y="363" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">sci-Plex</text>
  <circle cx="669" cy="288" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="669" y="314" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">DDPM (diffusion)</text>
  <circle cx="738" cy="196" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="738" y="178" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">CPA</text>
  <circle cx="794" cy="381" r="11" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="794" y="407" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Perturb-seq</text>
  <circle cx="794" cy="566" r="11" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="794" y="592" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">scBERT</text>
  <circle cx="841" cy="196" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="841" y="178" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">GEARS</text>
  <circle cx="919" cy="566" r="11" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="919" y="592" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">scGPT / Geneformer</text>
  <circle cx="927" cy="196" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="927" y="178" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">moscot</text>
  <circle cx="1030" cy="381" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="1030" y="363" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">the reckoning</text>
  <circle cx="1069" cy="381" r="11" fill="#e8924a" stroke="#fff" stroke-width="2"/>
  <text x="1069" y="407" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Tahoe-100M</text>
  <circle cx="1082" cy="288" r="11" fill="#9c6bab" stroke="#fff" stroke-width="2"/>
  <text x="1082" y="270" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">CellFlow</text>
  <circle cx="1103" cy="288" r="11" fill="#4e79a7" stroke="#fff" stroke-width="2"/>
  <text x="1119" y="294" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">STATE</text>
  <circle cx="1103" cy="381" r="11" fill="#59a14f" stroke="#fff" stroke-width="2"/>
  <line x1="1103" y1="394" x2="1103" y2="415" stroke="#bbb" stroke-width="1"/>
  <text x="1103" y="427" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">VC Challenge</text>
  <polygon points="1146.5,181.0 1150.3,190.7 1160.8,191.4 1152.7,198.0 1155.3,208.1 1146.5,202.5 1137.7,208.1 1140.3,198.0 1132.2,191.4 1142.7,190.7" fill="#fff3d6" stroke="#b8860b" stroke-width="2.2"/>
  <text x="1146" y="172" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="15" font-weight="700" fill="#9a6a06">the open prize</text>
  <text x="1142" y="226" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14" fill="#9a6a06">survival field  π(x | drug, dose)</text>
</svg>
</section>
