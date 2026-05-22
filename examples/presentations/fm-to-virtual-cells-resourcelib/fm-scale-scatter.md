---
title: 'Foundation models: size vs. training scale'
date: '2026-05-21'
summary: "A scaling scatter of the single-cell foundation models: x = parameter count, y = number of pretraining cells (both log scale), coloured by the year the model first went online, with each model named at its dot. Shows how the field scaled on both axes — and where the outliers sit (C2S-Scale at 27B params; UCE param-heavy but data-light in 2023; the cell axis jumping with Nicheformer and Tahoe-x1)."
topics:
- presentation
- foundation-model
- virtual-cell
- scaling
---

> *One-slide scaling map of the cell foundation models. Companion to the [ladder talk](vc-ladder-talk.md) and the [timeline & lineage map](five-questions-timeline-and-lineage.md).*

<section class="slide" data-cheat="Two axes of scale: model size (params) and data size (cells). The field grew in BOTH over time — but C2S-Scale (27B, LLM-style) is a parameter outlier, and the cell axis only exploded once Tahoe-100M / spatial corpora arrived." data-notes="This is the scaling picture. Each dot is a single-cell foundation model: x is its parameter count (log scale, from scBERT&#x27;s ~5M to C2S-Scale&#x27;s 27B), y is the number of cells it was pretrained on (log scale, ~1M to ~266M), and colour is the year it first went online — cool blue is older, warm red is 2025. Three things to point at. One: the field scaled on BOTH axes over time — the 2025 models (Tahoe-x1, STATE, TranscriptFormer) sit up and to the right. Two: C2S-Scale is the parameter outlier at 27B, because it&#x27;s an LLM trained on text-encoded cells, not raw expression — huge model, moderate cell count. Three: the data axis only really jumped once the giant atlases arrived — Nicheformer&#x27;s 110M spatial cells, then Tahoe-x1&#x27;s 266M. UCE is the early-param-heavy point: 650M params back in 2023, but only ~36M cells. The 2026 wave keeps pushing right — X-Cell (Xaira) hits 4.9 billion params on 25M CRISPRi-perturbed cells. The honest takeaway: scaling has been the dominant move — which is exactly the move the linear-baseline reckoning called into question.">
<svg viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" class="slide-svg" role="img" aria-label="Foundation models: parameters vs training cells">
  <rect x="0" y="0" width="1280" height="720" fill="#f7f7ef"/>
  <rect x="0" y="0" width="1280" height="92" fill="#dfe9d2"/><rect x="0" y="92" width="1280" height="4" fill="#c0392b"/>
  <text x="44" y="56" font-family="Helvetica,Arial,sans-serif" font-size="36" font-weight="700" fill="#1d2a17">Foundation models: size vs. training scale</text>
  <text x="46" y="80" font-family="Helvetica,Arial,sans-serif" font-size="16" fill="#566b46">x = parameters · y = pretraining cells · colour = year first online · log–log</text>
  <g font-family="Helvetica,Arial,sans-serif" font-size="14.5" fill="#333">
    <circle cx="980" cy="30" r="8" fill="#313695"/><text x="994" y="35">2021</text>
    <circle cx="1110" cy="30" r="8" fill="#74add1"/><text x="1124" y="35">2023</text>
    <circle cx="980" cy="58" r="8" fill="#fdae61"/><text x="994" y="63">2024</text>
    <circle cx="1110" cy="58" r="8" fill="#d73027"/><text x="1124" y="63">2025</text>
    <circle cx="980" cy="86" r="8" fill="#7f0000"/><text x="994" y="91">2026</text>
  </g>
  <line x1="196" y1="182" x2="196" y2="600" stroke="#b9b9ad" stroke-width="1.5"/>
  <line x1="196" y1="600" x2="1158" y2="600" stroke="#b9b9ad" stroke-width="1.5"/>
  <line x1="196" y1="182" x2="196" y2="600" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="196" y="622" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">1M</text>
  <line x1="399" y1="182" x2="399" y2="600" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="399" y="622" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">10M</text>
  <line x1="602" y1="182" x2="602" y2="600" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="602" y="622" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">100M</text>
  <line x1="805" y1="182" x2="805" y2="600" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="805" y="622" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">1B</text>
  <line x1="1008" y1="182" x2="1008" y2="600" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="1008" y="622" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">10B</text>
  <text x="1156" y="622" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#999" font-style="italic">parameters →</text>
  <line x1="196" y1="600" x2="1150" y2="600" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="186" y="604" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">1M</text>
  <line x1="196" y1="439" x2="1150" y2="439" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="186" y="443" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">10M</text>
  <line x1="196" y1="278" x2="1150" y2="278" stroke="#ececec" stroke-width="1" stroke-dasharray="3 4" opacity="0.7"/>
  <text x="186" y="282" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#777">100M</text>
  <text x="156" y="174" font-family="Helvetica,Arial,sans-serif" font-size="13.5" fill="#999" font-style="italic">training cells ↑</text>
  <circle cx="338" cy="592" r="9" fill="#313695" stroke="#fff" stroke-width="1.8"/>
  <text x="352" y="596" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">scBERT</text>
  <circle cx="399" cy="363" r="9" fill="#74add1" stroke="#fff" stroke-width="1.8"/>
  <text x="385" y="367" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Geneformer</text>
  <circle cx="543" cy="356" r="9" fill="#74add1" stroke="#fff" stroke-width="1.8"/>
  <text x="543" y="377" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">scGPT</text>
  <circle cx="584" cy="433" r="9" fill="#74add1" stroke="#fff" stroke-width="1.8"/>
  <text x="584" y="454" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">CellPLM</text>
  <circle cx="602" cy="327" r="9" fill="#74add1" stroke="#fff" stroke-width="1.8"/>
  <text x="616" y="331" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">scFoundation</text>
  <circle cx="539" cy="272" r="9" fill="#fdae61" stroke="#fff" stroke-width="1.8"/>
  <text x="539" y="257" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Nicheformer</text>
  <circle cx="767" cy="350" r="9" fill="#74add1" stroke="#fff" stroke-width="1.8"/>
  <text x="767" y="371" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">UCE</text>
  <circle cx="733" cy="271" r="9" fill="#d73027" stroke="#fff" stroke-width="1.8"/>
  <text x="719" y="275" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">TranscriptFormer</text>
  <circle cx="760" cy="243" r="9" fill="#d73027" stroke="#fff" stroke-width="1.8"/>
  <text x="774" y="247" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">STATE</text>
  <circle cx="902" cy="210" r="9" fill="#d73027" stroke="#fff" stroke-width="1.8"/>
  <text x="902" y="195" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">Tahoe-x1</text>
  <circle cx="1095" cy="327" r="9" fill="#d73027" stroke="#fff" stroke-width="1.8"/>
  <text x="1081" y="331" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">C2S-Scale</text>
  <circle cx="945" cy="374" r="9" fill="#7f0000" stroke="#fff" stroke-width="1.8"/>
  <text x="959" y="378" text-anchor="start" font-family="Helvetica,Arial,sans-serif" font-size="14.5" font-weight="600" fill="#2b2b2b">X-Cell</text>
  <text x="196" y="658" font-family="Helvetica,Arial,sans-serif" font-size="12" fill="#999">Flagship sizes; trainable params where a frozen gene-embedding is added (TranscriptFormer, STATE). Omitted: scVI, xVERSE, Lingshu-Cell — sizes not reported.</text>
</svg>
</section>
