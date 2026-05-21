---
title: "系统地思考一个面向药物响应的、智能体在环（agent-in-the-loop）项目（v2）"
summary: "经过三轮文献检索后的 v2 收窄。那套架构组合（智能体 + VC FM + 迭代 adapter 微调）原来是一个已在 2025-2026 年发表的范式——\"闭环 in silico 扰动\"+\"智能体式虚拟细胞建模\"——有四个直接的先行系统和两篇综述。这个 v2 诚实地重写贡献表面——临床药物响应（而非基因扰动）+ 患者队列评估（而非留出细胞系）+ 明确的癌症亚组特异性。还补上了 v1 里不存在的那条不可行（no-go）条件。"
---

> *这是[原始 agent-loop-for-drug-response 随笔](agent-loop-for-drug-response.md)的 v2。v1 把这个项目框定为"有趣且新颖"；三轮检索之后，那套架构组合原来已被发表了好几次。v2 保留了 v1 的设计纪律，但对剩下来作为贡献表面的东西保持诚实。*

> *配套阅读：[因果模型、FM 与虚拟细胞](causal-models-fm-and-vc.md)讲第一级 / 第二级框架；[小实验室 v3](small-labs-what-to-build-v3.md)讲为什么"冻结主干上的 adapter"是正确的 Wedge-2 起点；[为什么线性基线会赢](why-linear-baselines-win.md)讲那场让收敛问题变难的经验清算；[临床与智能体](clinical-and-agentic-clinical.md)讲相邻的智能体-临床工作。*

## 那个问题

你能否造出这样一个系统：一个预训练的虚拟细胞 FM 坐在中间，一个 LLM 智能体绕着它打转——挑选有代表性的数据集、跑些简单分析、用学到的东西微调 FM、再复检——直到模型在某一个具体临床问题上收敛到有用的东西？具体地说：*药物 X 会在这个胃癌亚组上起效吗？*

这是一个真实的项目形态。三轮文献检索之后，我不得不报告：**那套架构组合在 2025-2026 年已经是一个有名有姓、已被发表的范式**——"闭环 in silico 扰动"+"智能体式虚拟细胞建模"。新颖性表面远比初看时狭窄。这个 v2 的要点就是对此保持诚实，并找出真正剩下来的那份贡献。

## 诚实的版图：这是一个拥挤的 2025-2026 空间

### 闭环 VC FM（被提出的那个确切组合）

- **"Closing the loop: Teaching single-cell foundation models to learn from perturbations"**（[bioRxiv 2025 年 7 月](https://www.biorxiv.org/content/10.1101/2025.07.08.663754v1)）——在一个闭环 ISP 框架内，用 CRISPRa/i Perturb-seq 数据微调 Geneformer-30M-12L。**在 T 细胞激活预测上 PPV 提升三倍。** 这正是字面意义上"用迭代获取的扰动数据微调 VC FM"的想法。
- **VCHarness**（"Harnessing AI to Build Virtual Cells"，[bioRxiv 2026 年 4 月](https://www.biorxiv.org/content/10.64898/2026.04.11.717183v2)）——一个自主 AI 系统，把一个 AI *编码智能体* 与多模态生物学 FM 结合起来去构建扰动-响应模型。**胜过专家设计的方法；把开发时间从数月缩到数天。** 这正是字面意义上"智能体 + 生物学 FM"的组合。
- **CellForge**（[arXiv 2508.02276，2025 年 8 月](https://arxiv.org/abs/2508.02276)）——一个多智能体框架，通过协作式智能体推理，为单细胞扰动任务自主设计并合成神经网络架构。
- **BioLab**（[bioRxiv 2025 年 9 月](https://www.biorxiv.org/content/10.1101/2025.09.03.674085)）——一个多智能体自主生命科学系统，集成了生物学 FM，带有一个 Memory Agent，在 in silico 预测与湿实验设计之间的闭环里更新一个 RAG 知识库。
- **ELISA**（[arXiv 2603.11872](https://arxiv.org/pdf/2603.11872)）——Embedding-Linked Interactive Single-cell Agent：在一个智能体式闭环工作流中，把 scGPT 表达嵌入与 BioBERT 检索及 LLM 中介的解读统一起来。
- **Sequential Optimal Experimental Design of Perturbation Screens**（[bioRxiv 2023 年 12 月](https://www.biorxiv.org/content/10.1101/2023.12.12.571389)）——面向 Perturb-seq 的 *原始* 迭代主动学习范式：每一步获取数据、重训模型、选择下一批。早于 LLM-智能体外壳，但定义了底层的那个回路。
- **两篇 2025 综述**：[LLM4Cell](https://arxiv.org/html/2510.07793v1) 与 [LLMs Meet Virtual Cell](https://arxiv.org/html/2510.07706v1)。*综述论文* 都已经存在这一事实，就告诉你这个空间已经成熟。

### 冻结 VC FM 上的 adapter（用于 v0 的楔子）

- **sc-FM Perturbation Adapter / scDCA**（[arXiv 2412.13478](https://arxiv.org/html/2412.13478v2) → ICLR 2026）——冻结 sc-FM 上的 <1% 药物条件 adapter；击败线性-加性基线。
- **PertAdapt**（[bioRxiv 2025 年 11 月](https://www.biorxiv.org/content/10.1101/2025.11.21.689655)）——用于遗传扰动预测的条件敏感 adapter；内建基因级功能结构。
- **scDrugMap**（[Nature Communications 2025](https://www.nature.com/articles/s41467-025-67481-2)）——跨 495K 细胞 / 60 个数据集、对 8 个 sc-FM + 2 个 LLM 做药物响应的基准。scFoundation 在汇总评测中最强，UCE 在微调后最佳，scGPT 在零样本下最佳。
- **STATE**（Arc Institute）——扰动专家型 FM，在约 1.7 亿未扰动细胞上预训练 + 在跨 70 个物种的 1 亿多扰动细胞上微调。

### 相邻的智能体式生物医学系统（更广的语境）

- **Biomni**（[斯坦福 Zou，bioRxiv 2025 年 6 月](https://www.biorxiv.org/content/10.1101/2025.05.30.656746v1)）——通用生物医学智能体，150 个工具 / 105 个软件包 / 59 个数据库；在 LAB-Bench 上击败人类专家。
- **TxGemma + Agentic-Tx**（[Google，arXiv 2504.06196](https://arxiv.org/abs/2504.06196)）——治疗用 LLM + 18 工具的 Gemini-2.5 智能体。
- **Google AI co-scientist**（[arXiv 2502.18864](https://arxiv.org/abs/2502.18864)）——多智能体（Generation / Reflection / Ranking / Evolution / Meta-review），带 Elo 锦标赛。
- **PharmaSwarm**（[arXiv 2504.17967](https://arxiv.org/abs/2504.17967)）——基于 TxGemma 的三智能体群，带共享内存，随时间微调子模型。

### 临床表面（要超越的标杆）

- **MuMo**（[Nature Sig Transduct Targeted Ther 2024](https://www.nature.com/articles/s41392-024-01932-y)）——多模态 HER2+ 胃癌抗-HER2 ± IO 响应，429 名患者；**AUC 0.884**。*真正的基线。*
- **BATCHIE**（[Nature Communications 2024](https://www.nature.com/articles/s41467-024-55287-7)）——用于组合药物筛选的贝叶斯主动学习；**只用 1.7-20.4% 的训练数据，就达到全量数据准确率的 5-7% 以内**。
- **CRISP**（[Nat Comput Sci 2025](https://www.nature.com/articles/s43588-025-00887-6)）——在数据有限的情况下，对未见过细胞类型做扰动的迁移学习。

## 这对你的贡献意味着什么

**架构新颖性：没了。** "Closing the loop"已经发表了 Geneformer + 迭代 Perturb-seq 微调；VCHarness 已经发表了一个 *击败专家设计架构* 的 AI 智能体 + 生物学 FM；CellForge 与 BioLab 覆盖了多智能体变体。综述已经存在。任何审阅你论文的人在头一个小时内就会撞见这些。

**真正剩下来作为你表面的东西：**

1. **临床药物响应，而非基因扰动。** 上面所有闭环工作都作用于 CRISPRa/i Perturb-seq——细胞系里的基因敲除。带临床结局的患者队列上的药物响应在实质上不同，体现在（a）数据结构（小分子 + 剂量 + 时间），（b）信号（临床终点，而非转录组差值），（c）混杂（肿瘤医生的选择偏倚，而非随机 CRISPR 分配）。
2. **患者队列评估，而非留出细胞系。** 上面每一篇闭环 VC 论文都在留出扰动或留出细胞系上评估。没有一篇针对一个带结局的、密封的 *患者* 队列评估。这就是那道纪律鸿沟。
3. **一个明确的癌症 + 药物 + 生物标志物三元组。** 没有任何已发表系统把这三者与回路架构组合起来。HER2+ 胃癌 + 曲妥珠单抗（trastuzumab）+ MSI 状态是个例子；挑你自己的，并占住它。

这就是贡献表面。它比 v1 所声称的更窄——而且它是 *应用 + 纪律*，而非 *方法*。

## 动任何代码前要内化的概念

1. **闭环 in silico 扰动（ISP）。** 那个有名字的范式。"Closing the loop"是典范引文。
2. **因果阶梯**（Pearl 的第一 / 二 / 三级）——在[因果模型博客](causal-models-fm-and-vc.md)中讲过。
3. **CATE + 元学习器家族**（T/S/X/R/DR/EP-learner）——回答"这种药物会在 *这个* 亚组上起效吗"的标准工具。近期 2024-2025 年扩展到右删失生存。
4. **选择偏倚 / 倾向得分 / IPW**——Hernán & Robins，*Causal Inference: What If*。
5. **贝叶斯主动学习采集函数**——UCB、期望提升、信息增益。BATCHIE 与 Sequential-OED-for-Perturb-seq 是已做好的肿瘤学范例。
6. **迭代自我精炼的奖励黑客（reward hacking）**——（[arXiv 2410.06491](https://arxiv.org/pdf/2410.06491)）LLM-作-评估器回路的有记录在案的失败模式。你的停止规则必须击败它。
7. **FDA SaMD 框架**——2025 年 1 月草案指南（Docket FDA-2024-D-4488）。v0 能正当地宣称什么。

## 动代码前要锁定的五项决策

1. **停止规则。** 一个智能体永不可见的临床队列，AUC 在 N 轮上达到平台。任何别的做法都会重现奖励黑客文献。
2. **亚组定义。** 越窄 = 越有用 + 患者越少。训练放宽；评估收窄（CRISP 的做法）。
3. **FM 被允许做什么。** 冻结主干 + adapter。PertAdapt / scDCA 是模板。
4. **智能体动作空间。** 挑下一个数据集、挑下一个亚组切片、挑下一个 adapter 配置。不是：发明架构（CellForge 已经做得更好）。
5. **基线。** 不是 LR。不是你自己上一轮。**MuMo（AUC 0.884）** 是 HER2+ 胃癌上已发表的标杆。

## 最便宜的第一刀

HER2+ 胃癌里的曲妥珠单抗。冻结 Virchow2（病理）或 scFoundation（sc）+ 药物条件 adapter（scDCA 模板）。预训练底料：[Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398)（1 亿细胞 × 1,100 种药物 × 50 个癌症细胞系）。用一个 Biomni 式智能体来编排数据集选择。留出：密封的内部患者队列。停止：留出 AUC 在 3 轮上达到平台。在留出集上超越 MuMo。

预算：约 2-3 万美元算力，约 2 千美元 LLM API，1 人 × 6-12 个月。

## 三条不可行条件

1. **没有密封的临床患者队列。** 没有诚实的停止规则 → 奖励黑客文献保证失败。
2. **12 个月内打不过 MuMo（AUC 0.884）。** 已发表的标杆；低于它就是一篇没有结果的论文。
3. **把 VCHarness 或 CellForge 应用到你的亚组，能追平或击败你定制的系统。** 这是 *新的* 那项测试，因为两者都已存在、都 *胜过专家设计的方法*。把它们当作对照条件来跑，而不只是基线。如果一个通用的智能体式 VC-模型设计器在你的亚组上获胜，你的方法贡献就是零，只剩临床应用的框架。

## 裁决

三轮检索之后我不得不直说：这个项目的架构新颖性——智能体 + VC FM + 迭代 adapter 微调——在 2025-2026 年至少已被端到端发表了四次（"Closing the loop"、VCHarness、CellForge、BioLab）。可辩护地属于你的，是 *应用 + 纪律*：第一个专门针对一个有名癌症亚组、带患者队列结局评估的药物响应系统。那是一份真实但狭窄的贡献，它的生死取决于你能否（a）密封一个留出的临床队列，（b）超越 MuMo，（c）证明定制在你的亚组上击败 VCHarness。这三者只要任何一个落空，项目就没有结果。把这份清醒当作一项特性：文献已经替你说出了你需要跑的那些实验。

---

*最后更新于 2026-05-18。*
