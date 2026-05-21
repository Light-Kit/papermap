---
title: "认真盘一盘一个「agent 在环」的药物响应项目（v2）"
summary: "查了三轮文献之后收窄出来的 v2。原以为「agent + 虚拟细胞 FM + 迭代式 adapter 微调」这套架构组合是新的，结果它在 2025-2026 年早已是个被命名、被发表的范式——「闭环计算机模拟扰动」加「agent 化虚拟细胞建模」——已有四个直接的前作系统、两篇综述。这版 v2 老老实实把贡献面重画了一遍：临床药物响应（不是基因扰动）+ 患者队列评估（不是留出细胞系）+ 一个明确划定的癌症亚组特异性。还补上了一条 v1 里根本没有的「劝退条件」。"
---

> *这是[最初那篇 agent-loop-for-drug-response](agent-loop-for-drug-response.md)的 v2。v1 把这项目说成「有意思、够新」；查了三轮文献之后才发现，那套架构组合早就被发表过好几回了。v2 保住了 v1 的设计纪律，但对「真正还剩下什么贡献面」这件事说了实话。*

> *配套阅读：[因果模型、FM 与虚拟细胞](causal-models-fm-and-vc.md)讲第 1 / 第 2 层因果阶梯的框架；[小实验室 v3](small-labs-what-to-build-v3.md)讲为什么「冻结骨干上挂 adapter」是楔子 2 正确的起手式；[为什么线性基线会赢](why-linear-baselines-win.md)讲那场让「收敛」这个问题变难的实证清算；[临床与 agent 化](clinical-and-agentic-clinical.md)讲邻近的 agent 化临床工作。*

## 这个问题

你能不能搭这么一个系统：中间坐着一个预训练好的虚拟细胞 FM，外面绕着一个 LLM agent——挑代表性数据集、跑些简单分析、拿学到的东西去微调那个 FM、再回头复检——一圈圈转下去，直到模型在某个具体临床问题上收敛到有用为止？说具体点：*药 X 对这个胃癌亚组管不管用？*

这是个实打实的项目形态。但查了三轮文献之后，我得报告一个事实：**这套架构组合在 2025-2026 年早已是个有名有姓、已被发表的范式**——「闭环计算机模拟扰动」加「agent 化虚拟细胞建模」。新意的余地，远比第一眼看上去要窄得多。这版 v2 的意义，就是把这事说破，再去找真正还剩下的那点贡献。

## 老实说，这是个 2025-2026 的拥挤赛道

### 闭环虚拟细胞 FM（正是这里提出的那套组合）

- **「Closing the loop: Teaching single-cell foundation models to learn from perturbations」**（[bioRxiv 2025 年 7 月](https://www.biorxiv.org/content/10.1101/2025.07.08.663754v1)）——在一个闭环 ISP 框架里，用 CRISPRa/i Perturb-seq 数据微调 Geneformer-30M-12L。**在 T 细胞激活预测上把 PPV 拉高了三倍。** 这就是「拿迭代获取的扰动数据去微调虚拟细胞 FM」那个想法的字面实现。
- **VCHarness**（「Harnessing AI to Build Virtual Cells」，[bioRxiv 2026 年 4 月](https://www.biorxiv.org/content/10.64898/2026.04.11.717183v2)）——一个自主 AI 系统，把一个 AI *编程 agent* 和多模态生物学 FM 拼起来，去构建扰动响应模型。**胜过专家手工设计的方案；把开发周期从几个月压到几天。** 这就是「agent + 生物学 FM」那套组合的字面实现。
- **CellForge**（[arXiv 2508.02276, 2025 年 8 月](https://arxiv.org/abs/2508.02276)）——一个多 agent 框架，通过 agent 之间协同推理，自主地为单细胞扰动任务设计并合成神经网络架构。
- **BioLab**（[bioRxiv 2025 年 9 月](https://www.biorxiv.org/content/10.1101/2025.09.03.674085)）——一个整合了生物学 FM 的多 agent 自主生命科学系统，带一个记忆 agent，在「计算机模拟预测」与「湿实验设计」的闭环里更新一个 RAG 知识库。
- **ELISA**（[arXiv 2603.11872](https://arxiv.org/pdf/2603.11872)）——Embedding-Linked Interactive Single-cell Agent：在一个 agent 化的闭环工作流里，把 scGPT 的表达嵌入、BioBERT 检索、以及 LLM 居中的解读统一起来。
- **Sequential Optimal Experimental Design of Perturbation Screens**（[bioRxiv 2023 年 12 月](https://www.biorxiv.org/content/10.1101/2023.12.12.571389)）——Perturb-seq 上*最原始*的迭代式主动学习范式：每一步采集数据、重训模型、选下一批。它比 LLM-agent 那层封装更早，但定义了底下那个环。
- **两篇 2025 年综述**：[LLM4Cell](https://arxiv.org/html/2510.07793v1) 和 [LLMs Meet Virtual Cell](https://arxiv.org/html/2510.07706v1)。连*综述论文*都已经有了，本身就告诉你这赛道成熟了。

### 冻结虚拟细胞 FM 上挂 adapter（v0 的楔子）

- **sc-FM Perturbation Adapter / scDCA**（[arXiv 2412.13478](https://arxiv.org/html/2412.13478v2) → ICLR 2026）——在冻结 sc-FM 上挂一个 <1% 的药物条件化 adapter；打赢线性加性基线。
- **PertAdapt**（[bioRxiv 2025 年 11 月](https://www.biorxiv.org/content/10.1101/2025.11.21.689655)）——做基因扰动预测的条件敏感 adapter；内建了基因层面的功能结构。
- **scDrugMap**（[Nature Communications 2025](https://www.nature.com/articles/s41467-025-67481-2)）——一个跨 49.5 万细胞 / 60 个数据集、对 8 个 sc-FM + 2 个 LLM 做药物响应的基准评测。汇总场景下 scFoundation 最强，微调后 UCE 最佳，零样本则 scGPT 最佳。
- **STATE**（Arc Institute）——主打扰动的 FM，在约 1.7 亿未扰动细胞上预训练、再在跨 70 个物种的 1 亿+ 扰动细胞上微调。

### 邻近的 agent 化生物医学系统（更大的背景）

- **Biomni**（[Stanford Zou, bioRxiv 2025 年 6 月](https://www.biorxiv.org/content/10.1101/2025.05.30.656746v1)）——通用生物医学 agent，150 个工具 / 105 个包 / 59 个数据库；在 LAB-Bench 上胜过人类专家。
- **TxGemma + Agentic-Tx**（[Google, arXiv 2504.06196](https://arxiv.org/abs/2504.06196)）——治疗学 LLM + 18 个工具的 Gemini-2.5 agent。
- **Google AI co-scientist**（[arXiv 2502.18864](https://arxiv.org/abs/2502.18864)）——多 agent（Generation / Reflection / Ranking / Evolution / Meta-review），带 Elo 锦标赛机制。
- **PharmaSwarm**（[arXiv 2504.17967](https://arxiv.org/abs/2504.17967)）——建在 TxGemma 上的三 agent 蜂群，共享记忆，随时间微调子模型。

### 临床这一面（要超的那条线）

- **MuMo**（[Nature Sig Transduct Targeted Ther 2024](https://www.nature.com/articles/s41392-024-01932-y)）——在 429 名患者上做 HER2+ 胃癌抗 HER2 ± IO 响应的多模态模型；**AUC 0.884**。*真正的那条基线。*
- **BATCHIE**（[Nature Communications 2024](https://www.nature.com/articles/s41467-024-55287-7)）——做组合药物筛选的贝叶斯主动学习；**只用 1.7-20.4% 的训练数据，就达到全量数据 5-7% 误差内的准确率**。
- **CRISP**（[Nat Comput Sci 2025](https://www.nature.com/articles/s43588-025-00887-6)）——在数据有限的未见细胞类型上做扰动的迁移学习。

## 这对你的贡献意味着什么

**架构新意：没了。** 「Closing the loop」已经发了 Geneformer + 迭代 Perturb-seq 微调；VCHarness 已经发了一个*胜过专家设计架构*的 AI agent + 生物学 FM；CellForge 和 BioLab 把多 agent 那个变体也占了。综述都有了。任何审你稿子的人，头一个小时就会撞上这些。

**真正还剩下的贡献面：**

1. **临床药物响应，不是基因扰动。** 上面所有闭环工作都是 CRISPRa/i Perturb-seq——细胞系里的基因敲除。患者队列上、带临床结局的药物响应，在三件事上根本不一样：（a）数据结构（小分子 + 剂量 + 时间），（b）信号（临床终点，不是转录组差值），（c）混杂（肿瘤科医生的选择偏倚，不是随机的 CRISPR 分配）。
2. **患者队列评估，不是留出细胞系。** 上面每一篇闭环虚拟细胞论文，评估的都是留出的扰动或留出的细胞系。没有一篇是拿一个封存的*患者*队列、带结局来评的。这就是那道纪律缺口。
3. **一个明确的「癌症 + 药 + biomarker」三元组。** 没有任何已发表的系统把这三样和闭环架构合到一起。HER2+ 胃癌 + 曲妥珠单抗 + MSI 状态是个例子；挑你自己的，把它占住。

这就是贡献面。它比 v1 吹的要窄——而且它是*应用 + 纪律*，不是*方法*。

## 动手写代码前要内化的概念

1. **闭环计算机模拟扰动（ISP）。** 那个被命名的范式。「Closing the loop」是它的标准引用。
2. **因果阶梯**（Pearl 第 1/2/3 层）——见[因果模型那篇](causal-models-fm-and-vc.md)。
3. **CATE + 元学习器一族**（T/S/X/R/DR/EP-learner）——「这药对*这个*亚组管不管用」的标准工具。近年 2024-2025 已扩展到右删失生存数据。
4. **选择偏倚 / 倾向得分 / IPW**——Hernán & Robins，《Causal Inference: What If》。
5. **贝叶斯主动学习的采集函数**——UCB、期望改进、信息增益。BATCHIE 和 Sequential-OED-for-Perturb-seq 是肿瘤学里现成的范例。
6. **迭代式自我精炼的奖励黑客**——（[arXiv 2410.06491](https://arxiv.org/pdf/2410.06491)）LLM-as-evaluator 闭环那个有记录在案的失败模式。你的停机规则必须能挫败它。
7. **FDA SaMD 框架**——2025 年 1 月的指南草案（Docket FDA-2024-D-4488）。决定 v0 能正当宣称什么。

## 动手前要拍板的五个决定

1. **停机规则。** 一个 agent 永远看不到的临床队列，AUC 在 N 轮里趋平。其余任何做法，都是在复现奖励黑客那批文献。
2. **亚组定义。** 越窄 = 越有用 + 患者越少。训得宽，评得窄（CRISP 那一招）。
3. **FM 被允许干什么。** 冻结骨干 + adapter。PertAdapt / scDCA 是模板。
4. **agent 的动作空间。** 挑下一个数据集、挑下一个亚组切片、挑下一套 adapter 配置。不是：发明架构（CellForge 已经做得更好了）。
5. **基线。** 不是逻辑回归。不是你自己上一轮。**MuMo（AUC 0.884）**才是 HER2+ 胃癌上那条已发表的线。

## 最省的第一刀

HER2+ 胃癌里的曲妥珠单抗。冻结 Virchow2（病理）或 scFoundation（单细胞）+ 药物条件化 adapter（scDCA 模板）。预训练底料：[Tahoe-100M](https://www.biorxiv.org/content/10.1101/2025.02.20.639398)（1 亿细胞 × 1,100 种药 × 50 个癌症细胞系）。用一个 Biomni 式的 agent 编排数据集选择。留出集：一个封存的内部患者队列。停机：留出 AUC 在 3 轮里趋平。在留出集上打赢 MuMo。

预算：约 2-3 万美元算力，约 2 千美元 LLM API，1 人 × 6-12 个月。

## 三条劝退条件

1. **没有一个封存的临床患者队列。** 没有诚实的停机规则 → 奖励黑客那批文献保证你会失败。
2. **12 个月内打不赢 MuMo（AUC 0.884）。** 已发表的那条线；低于它，就是一篇没结果的论文。
3. **把 VCHarness 或 CellForge 套到你的亚组上，它打平甚至打赢你那套定制系统。** 这是*新增*的一条测试，因为这两个都已存在、而且都*胜过专家设计的方案*。把它们当成对照条件来跑，不只是当基线。要是一个通用的 agent 化虚拟细胞建模器在你的亚组上赢了，那你的方法贡献就是零，只剩临床应用这层框架。

## 结论

查了三轮，我得直说：这项目的架构新意——agent + 虚拟细胞 FM + 迭代式 adapter 微调——在 2025-2026 年至少被端到端地发表过四次（「Closing the loop」、VCHarness、CellForge、BioLab）。真正守得住、归你的，是*应用 + 纪律*：第一个专门瞄准某个有名有姓的癌症亚组、并用患者队列结局来评估的这类系统。这是个真实但很窄的贡献，它的生死系于你能不能：（a）封存一个留出的临床队列，（b）打赢 MuMo，（c）证明定制系统能在你的亚组上赢过 VCHarness。这三样里任何一样塌了，项目就没有结果。把这份清醒当成好事吧：文献已经替你把该做的实验列出来了。

---

*最后更新于 2026-05-18。*
