---
title: "State-space models — the non-transformer alternative"
date: 2026-05-17
topics: [state-space]
summary: "3 items. HyenaDNA and Caduceus carry the state-space programme in genomic FMs; Tiezzi 2025 is the architectural review."
kind: topic-summary
---

State-space models are the most active non-transformer alternative in biology FMs. HyenaDNA is the state-space genomic FM for very long context at single-nucleotide resolution — the architecture that broke transformer's quadratic-attention scaling for DNA. Caduceus extends HyenaDNA with bidirectional, reverse-complement-equivariant structure — DNA-specific inductive bias. Tiezzi 2025 ("Transformer / recurrent / state-space crossroads") is the architectural review that places state-space alongside transformers and modern RNNs. The pattern: state-space wins when the modality has very long sequences (DNA), the natural ordering matters, and quadratic attention becomes prohibitive. Less traction yet in proteins or single-cell, where context lengths are shorter and the attention bottleneck binds less. Worth tracking as one of the "architectures with biology-specific inductive biases" tracks in the post-reckoning architectural response.
