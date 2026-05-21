---
title: "智能体 AI 与基础模型如何相遇？"
summary: "LLM 智能体与生物学 FM 在何处相遇——而且是双向地——以及为什么 Lane 9（智能体-FM 交叉点）是 2026 年最具商业可融资性的赛道。"
---

> *FM-to-Virtual-Cells 演讲语料中的科普页——另见[全景中枢](foundation-models-state-of-play.md)。回答的是有人在第一幕或第四幕会问的那个问题："LLM 智能体与生物学 FM 之间是什么关系？"简短的答案：它是双向的。更长的答案对项目选择很重要，因为 Lane 9——2026 年菜单中最具商业可融资性的赛道——正坐落在这个交叉点上。*

## 标题要点

智能体 AI 与生物学 FM 是 **互补的，而非竞争的**。在交叉点上有四个承重模式：

1. **把 FM 当作工具来用的智能体**——LLM 智能体调用一个生物学 FM（冻结的），就像它会调用一个计算器一样。PathChat-DX、BioAgents、MedAgentGym。
2. **构建 FM 的智能体**——LLM 智能体 + AI 编码智能体自主地设计并训练一个虚拟细胞架构。VCHarness（BioMap，2026）。
3. **基于 FM 进行推理的智能体**——以强化学习对 LLM 进行后训练，其中一个生物学 FM 充当生物学合理性的 *验证器*。rBio（CZ Biohub，2025）。
4. **以 FM 为底料来分析数据的智能体**——自主的计算生物学智能体运行一整套分析并生成新的生物学洞见。CellVoyager（*Nat Methods* 2026）。

这四者都作为 2025–2026 年的公开系统而存在。这个交叉点不再是空想——而 [Li 等 2026 *Nat Biotech* 立场论文"Agentic AI and the rise of in silico team science"](https://doi.org/10.1038/s41587-026-03035-1) 是第一个在期刊层面把整个交叉点框定为一次 *团队科学* 转变、而不仅仅是一次工具化转变的论述。

<iframe src="../../assets/agentic-fm-patterns.html" width="100%" height="580" frameborder="0" loading="lazy" title="Agentic AI × foundation models — the four patterns"></iframe>

*可交互——这四个模式并不构成一个正交的 2×2；2024–2026 年的公开系统沿着一条对角线分布，从 FM 消费者（左下）到 FM 生产者（右上）。把鼠标悬停在任意气泡上可看到标准范例。*

## 模式 1：把 FM 当作工具来用的智能体

**结构**：一个 LLM（Claude / GPT / 开放的 Llama / Qwen）坐在栈的顶端。它接收一个自然语言的用户查询（"给这个肿瘤分期"；"预测在基因 X 上做 CRISPRi 之后的表达"）。它决定要调用哪个下游工具，把一个生物学 FM（病理 / 单细胞 / 基因组）当作一个远程函数来调用，然后基于该 FM 的输出进行推理，给出最终答案。

**标准范例**：

- **[PathChat / PathChat-DX](https://www.nature.com/articles/s41586-024-07618-3)**（Mahmood Lab，*Nature* 2024）——多模态对话式病理模型。LLM 一侧处理自然语言界面；病理 FM 一侧（UNI / CONCH）处理切片编码。**PathChat-DX 是首个获得 FDA 突破性认定（2025 年 1 月）的生成式 AI 病理工具**——这一模式的监管模板。
- **[MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/)**（ICLR 2026，与 AACR 相关）——一个含 72k 任务、沙箱化代码执行的 gym，由 Med-Copilot-7B 编排生物医学分析。智能体编写代码来调用 scikit-learn、运行 scanpy、查询数据库。**这是训练那些把 bio-FM 当作工具来用的智能体的底料。**
- **[Anthropic Claude HCLS 环境中的 Owkin Pathology Explorer](https://owkin.com)**（2026）——一个在基于 Claude 的临床工作流中使用 Owkin 病理 FM 的智能体。FM 驱动病理分析的智能体界面。

**这个模式为何重要**：它让生物学 FM 对那些写不了 PyTorch 的临床医生和生物学家 *可及*。界面层是 LLM；重活是生物学 FM。**智能体并不修复 FM 的准确性问题——但它让这些问题在临床工作流中变得可处理。**

## 模式 2：构建 FM 的智能体

**结构**：一个 LLM 智能体 + AI 编码智能体（设想把 Claude Code 或 Cursor 用在生物学上）自主地 **设计并训练** 一个从头开始的虚拟细胞架构。智能体读取数据集、提出一个架构、编写训练代码、运行训练循环、评估结果，并迭代。输出是一个 *训练好的模型*，而非一个 *预测出的答案*。

**标准范例**：

- **[VCHarness（Cheng 等，bioRxiv 2026.04.11）](https://www.biorxiv.org/content/10.64898/2026.04.11.717183v1)**——BioMap Research + MBZUAI（Le Song + Eric Xing）。把一个 AI 编码智能体与多模态生物学 FM 结合起来，构建扰动-响应模型。**识别出胜过专家设计的架构；把开发时间从数月缩短到数天。**

**这个模式为何重要**：它改变了谁能构建虚拟细胞。一个没有 ML 工程能力的实验室可以描述它想要什么，让智能体去做原型。这个模式还很早——截至 2026 年 4 月，VCHarness 只是一个实验室的一篇论文——但它把智能体 ↔ 虚拟细胞 *构建器* 这一方向变成了具体的东西。**与 rBio 的推理方向（模式 3）相配**：rBio 基于一个现有的虚拟细胞进行推理；VCHarness 构建新的虚拟细胞。

## 模式 3：基于 FM 进行推理的智能体

**结构**：一个 LLM 以强化学习进行后训练。奖励信号来自一个 **充当验证器的生物学 FM**，验证生物学合理性——不是来自基于人类偏好的 RLHF，不是来自基于文本的正确性，而是来自"生物学 FM 是否同意这是真的？"

**标准范例**：

- **[rBio v1（CZ Biohub，2025）](https://virtualcellmodels.cziscience.com/model/rbio)**——Qwen2.5-3B-Instruct，通过 GRPO（Group Relative Policy Optimization）进行后训练，使用 **TranscriptFormer 作为软监督验证器**。**首个在虚拟细胞模拟上训练的推理模型。** 回答诸如 *"抑制基因 A 会增加基因 B 的活性吗？"* 这样的问题，其生物学根基来自一个 sc-FM 而非网络文本。

**这个模式为何重要**：它颠倒了标准的 LLM 工具使用方向。这里不是 *LLM 向 FM 索要答案*，而是 *LLM 在训练期间被 FM 塑形*。输出是一个其推理反映了 FM 所编码生物学的 LLM。这正是该领域自 2024 年 Bunne *Cell* 展望以来一直在呼唤的 **虚拟细胞推理模型**。

**警告**：rBio 是在 Qwen2.5-3B 上后训练的——一个小型 LLM。性能受限于 LLM 的容量和验证器的准确性两者。如果验证器（TranscriptFormer）在某个查询上是错的，rBio 就学会自信地犯错。这与"奖励不佳的 RLHF"是同样的风险画像，移植到了生物学上。

## 模式 4：以 FM 为底料来分析数据的智能体

**结构**：一个自主的计算生物学智能体接收一个数据集和一个宽松的目标（"找出这里有什么有趣的"）。它运行一整条分析流水线——质控、聚类、差异表达、通路富集——按需调用 FM 和经典工具，并浮现 *新的生物学洞见*，而非一个单一的预测值。这是把智能体当作 *初级计算生物学家*，而非当作一个计算器。

**标准范例**：

- **[CellVoyager（Alber 等，*Nat Methods* 2026）](https://doi.org/10.1038/s41592-026-03029-6)**——"AI 计算生物学智能体通过自主分析生物学数据生成新洞见。"当 VCHarness *构建* 一个模型、rBio *基于* 一个模型推理时，CellVoyager *做分析*——自主地、端到端地、在真实的单细胞数据上。

**这个模式为何重要**：它是最接近一个在职科学家日常循环的模式。其他三个模式产出 *模型* 或 *答案*；CellVoyager 产出 *分析*——计算生物学工作的真实单位。对一个小实验室而言，这是最直接地威胁或增强其瓶颈（分析师带宽）的模式。[Li 等 2026 *Nat Biotech* "in silico team science"](https://doi.org/10.1038/s41587-026-03035-1) 这一论述本质上是"当模式 4 变得可靠时，一个实验室会发生什么"。

**警告**：一个浮现"洞见"的自主分析智能体，以机器速度继承了多重比较问题。CellVoyager 式的输出需要与一个人类分析师同样的统计卫生——而且可以说需要更多，因为智能体能在人类注意到自己在 p-hacking 之前，就生成一百个看似合理的发现。

## 2026 年的商业框架

这个交叉点正是制药 + AI 原生生物科技公司花钱的地方：

- **JPM 2026 第二天**：AstraZeneca 收购 **Modella AI**——一个栈里集成了多模态病理 FM + 智能体 AI 能力。智能体把 FM 当作工具的模式，在收购规模上的体现。
- **JPM 2026 第一天**：Lilly + NVIDIA 10 亿美元 AI Co-Innovation Lab——一项以 FM 上的智能体界面为前提的基础设施投入。
- **2026 年**：Owkin 在 Claude 内部推出 Pathology Explorer——智能体 ↔ FM 作为商业界面。

**AACR 2026 AT02 会场"Agentic AI as the Cancer Researcher"** + **4/22 "Agentic AI as the Oncologist" 会场** 是该领域首次在临床 AI 舞台上，于会议层面对这一交叉点做出承诺。

## 这对学术项目选择意味着什么

**[Lane 9（FM 辅助实验设计 / 主动学习）](small-labs-what-to-build.md)** 是坐落在这一交叉点上的赛道。它在一个与湿实验相连的闭环中使用 FM-as-tool 模式（模式 1）。买家是 AI 原生生物科技公司（Recursion、Insitro、Latent Labs、Vevo）——他们会主动为这类工作付钱。

**具体的项目形态**：与一个在做 CRISPRi 或药物扰动筛选的湿实验室合作。实现一个由 LLM 编排、FM 引导的选择循环（模式 1——FM-as-tool）。与文献先验基线比较。输出：发表在 *Nat Methods* / *Cell Systems* 的方法论文 + 一篇临床相关性论文。

**这四个模式暴露出的下一步研究问题**：

- **模式 1（FM-as-tool）**：智能体如何决定对给定查询要调用 *哪一个* 生物学 FM？面向生物学的工具路由尚未解决。
- **模式 2（FM-builder）**：VCHarness 设计架构，但不设计预训练目标。智能体能否设计出一个比下一基因预测 *更好的目标*？（演讲的小实验室增补材料中的 Track 2。）
- **模式 3（FM-as-verifier）**：rBio 使用一个验证器（TranscriptFormer）。一个推理智能体能否使用 *多个* 验证器（TranscriptFormer + 病理 FM + AlphaGenome）来做跨模态的生物学推理？这是开放的后续——而第一篇做出来的论文将占据这条引用。
- **模式 4（FM-as-analysis-substrate）**：CellVoyager 产出自主分析——但谁来审计它们？面向智能体计算生物学输出的统计卫生层（多重比较控制、自动化敏感性分析）尚不存在。那一层本身就是一个可发表的小实验室项目。

## 常见误解

**"智能体 AI 正在取代 FM。"** 错。智能体需要 FM 作为底料。没有生物学 FM，智能体就无可调用。

**"智能体 AI 修复了线性基线清算。"** 不。清算是关于 FM 本身的；智能体让那些 FM 可及，但并不提升它们底层的准确性。如果 scGPT 在扰动预测上输给一个线性基线，那么一个调用 scGPT 的智能体也会输给那个基线。

**"智能体需要 GPT-4 级别的容量。"** 未必。rBio 建立在 Qwen2.5-3B（小型开放模型）之上。MedAgentGym 的 Med-Copilot 是 7B 参数。生物学智能体的瓶颈是 *验证器的准确性* 和 *工具质量*，而非 LLM 的大小。

**"作为一个项目领域，这还太早。"** 截至 2026 年 5 月，这是错的。VCHarness、rBio、MedAgentGym、PathChat-DX、Owkin Pathology Explorer 全都是 2024–2026 年的公开系统。智能体 ↔ FM 交叉点拥有工具、论文和商业信号。它只是还没有一个尘埃落定的分类法——而这正是小实验室的机会。

## 下一步去哪儿

- **[基础模型——全景现状](foundation-models-state-of-play.md)**——本科普页所处的跨家族地图。
- **[小实验室——该构建什么](small-labs-what-to-build.md)**——Lane 9（FM 辅助实验设计 / 主动学习）坐落在智能体 ↔ FM 交叉点上。
- **[AACR 2026 AT02 会场](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/sessions/2026-04-21-at02-agentic-ai-cancer-researcher/)**——"Agentic AI as the Cancer Researcher"。
- **[AACR 2026 4/22 Oncologist 会场](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/sessions/2026-04-22-agentic-ai-as-the-oncologist/)**——临床 AI 即智能体的角度。
- **[ICLR 2026 MedAgentGym 档案](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/)**——面向生物医学分析的智能体底料。
- **[CZI Virtual Cells Platform 上的 rBio 模型卡](https://virtualcellmodels.cziscience.com/model/rbio)**——首个在虚拟细胞模拟上训练的公开推理模型。

---

*最后更新于 2026-05-13。*
