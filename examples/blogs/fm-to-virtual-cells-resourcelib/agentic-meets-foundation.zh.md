---
title: "智能体 AI 和基础模型，是怎么碰到一起的？"
summary: "LLM 智能体和生物 FM 在哪里相遇——而且是双向的——以及为什么 Lane 9（智能体与 FM 的交叉点）是 2026 年最容易拿到钱的那条赛道。"
---

> *这是 FM-to-Virtual-Cells 系列讲稿里的一篇释疑——另见[全景中枢](foundation-models-state-of-play.md)。它回答的是有人会在第一幕或第四幕抛出的那个问题：「LLM 智能体和生物 FM 到底是什么关系？」短答案：双向的。长一点的答案在选题时才真正要紧，因为 Lane 9——2026 年这份选题菜单里最容易融到资的一条——恰好就坐落在这个交叉点上。*

## 一句话先说在前面

智能体 AI 和生物 FM 是**互补，不是竞争**。在这个交叉点上，有四种承重的模式：

1. **智能体把 FM 当工具用**—— LLM 智能体调用一个（冻结的）生物 FM，就像调一个计算器。PathChat-DX、BioAgents、MedAgentGym。
2. **智能体去造 FM**—— LLM 智能体 + AI 编码智能体，自主地设计并训练出一个虚拟细胞架构。VCHarness（BioMap，2026）。
3. **智能体在 FM 之上做推理**—— LLM 经过强化学习后训练，其中一个生物 FM 充当生物合理性的*验证器*。rBio（CZ Biohub，2025）。
4. **智能体拿 FM 当底料去分析数据**—— 自主的计算生物智能体跑完一整套分析，并产出新的生物洞见。CellVoyager（*Nat Methods* 2026）。

这四种都已经作为 2025–2026 年的公开系统真实存在。这个交叉点不再是空中楼阁——而 [Li et al. 2026 *Nat Biotech* 立场论文《Agentic AI and the rise of in silico team science》](https://doi.org/10.1038/s41587-026-03035-1)，是头一个在期刊层面把整个交叉点框定为一次*团队科学*转变、而不只是工具层转变的工作。

<iframe src="../../assets/agentic-fm-patterns.html" width="100%" height="580" frameborder="0" loading="lazy" title="Agentic AI × foundation models — the four patterns"></iframe>

*可交互——这四种模式并不构成一个正交的 2×2；2024–2026 年的公开系统是沿着一条对角线排布的，从 FM 的消费者（左下）一路到 FM 的生产者（右上）。把鼠标悬到任一气泡上，能看到对应的经典范例。*

## 模式一：智能体把 FM 当工具用

**结构**：一个 LLM（Claude / GPT / 开源 Llama / Qwen）坐在栈的最上层。它接收用户的自然语言查询（「给这个肿瘤分期」；「预测对 Gene X 做 CRISPRi 之后的表达」）。它决定调用哪个下游工具，把一个生物 FM（病理 / 单细胞 / 基因组）当远程函数调起来，再在 FM 的输出之上推理，给出最终答案。

**经典范例**：

- **[PathChat / PathChat-DX](https://www.nature.com/articles/s41586-024-07618-3)**（Mahmood Lab，*Nature* 2024）—— 多模态对话式病理模型。LLM 那一侧负责自然语言接口，病理 FM 那一侧（UNI / CONCH）负责切片编码。**PathChat-DX 是首个拿到 FDA 突破性认定的生成式 AI 病理工具（2025 年 1 月）**——也是这一模式的监管模板。
- **[MedAgentGym](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/)**（ICLR 2026，与 AACR 相关）—— 一个含 7.2 万项任务的沙盒化代码执行 gym，由 Med-Copilot-7B 编排各类生物医学分析。智能体写代码去调 scikit-learn、跑 scanpy、查数据库。**这是训练「会把生物 FM 当工具用」的智能体的底料。**
- **[Anthropic Claude HCLS 环境里的 Owkin Pathology Explorer](https://owkin.com)**（2026）—— 一个在基于 Claude 的临床工作流里调用 Owkin 病理 FM 的智能体。FM 驱动病理分析的智能体接口。

**这一模式为什么要紧**：它让那些不会写 PyTorch 的临床医生和生物学家也能*用上*生物 FM。接口层是 LLM，重活在生物 FM。**智能体并不去修 FM 的准确率问题——但它让这些问题在临床工作流里变得可处理。**

## 模式二：智能体去造 FM

**结构**：一个 LLM 智能体 + AI 编码智能体（设想 Claude Code 或者 Cursor 干起生物的活）从零自主地**设计并训练**出一个虚拟细胞架构。智能体读数据集、提一个架构、写训练代码、跑训练循环、评估结果、再迭代。输出的是一个*训练好的模型*，而不是一个*预测出来的答案*。

**经典范例**：

- **[VCHarness（Cheng et al., bioRxiv 2026.04.11）](https://www.biorxiv.org/content/10.64898/2026.04.11.717183v1)**—— BioMap Research + MBZUAI（Le Song + Eric Xing）。把一个 AI 编码智能体和多模态生物 FM 结合起来，构建扰动响应模型。**找出了优于专家设计的架构；把开发周期从数月压到数天。**

**这一模式为什么要紧**：它改变了「谁能造虚拟细胞」这件事。一个没有 ML 工程能力的实验室，可以把想要什么描述出来，让智能体去做原型。这模式还很早——截至 2026 年 4 月，VCHarness 还只是一个实验室的一篇论文——但它把「智能体 ↔ 虚拟细胞」里的*构建器*这个方向落到了实处。**和 rBio 那个推理方向（模式三）正好配对**：rBio 是在一个已有的虚拟细胞之上做推理，VCHarness 则是去造新的。

## 模式三：智能体在 FM 之上做推理

**结构**：一个 LLM 经过强化学习后训练。奖励信号来自一个**充当验证器的生物 FM**，验的是生物合理性——不是基于人类偏好的 RLHF，不是基于文本的对错，而是「这个生物 FM 同不同意这是真的？」

**经典范例**：

- **[rBio v1（CZ Biohub，2025）](https://virtualcellmodels.cziscience.com/model/rbio)**—— Qwen2.5-3B-Instruct，用 GRPO（组相对策略优化）后训练，把 **TranscriptFormer 当作软监督的验证器**。**首个在虚拟细胞模拟上训练出来的推理模型。**它回答诸如*「抑制基因 A 会不会提高基因 B 的活性？」*这类问题，所依据的生物根基来自一个 sc-FM，而不是网络文本。

**这一模式为什么要紧**：它把标准的 LLM 用工具的方向给反过来了。不再是*LLM 向 FM 要一个答案*，而是*在训练过程中由 FM 来塑造 LLM*。输出的是一个推理反映了 FM 所编码生物学的 LLM。这正是自 2024 年 Bunne 那篇 *Cell* 视角文章以来，整个领域一直在求的那个**虚拟细胞推理模型**。

**注意**：rBio 是在 Qwen2.5-3B 上后训练的——一个小 LLM。性能同时受限于 LLM 的容量和验证器的准确率。如果验证器（TranscriptFormer）在某个查询上错了，rBio 就会学着自信地犯错。这跟「用糟糕奖励做 RLHF」的风险画像一模一样，只是搬到了生物里。

## 模式四：智能体拿 FM 当底料去分析数据

**结构**：一个自主的计算生物智能体，拿到一个数据集和一个含糊的目标（「找找这里有什么有意思的」）。它跑完一整条分析流水线——质控、聚类、差异表达、通路富集——按需调用 FM 和经典工具，浮现出来的是*新的生物洞见*，而不是单个预测值。这是把智能体当成一个*初级计算生物学家*，而不是一个计算器。

**经典范例**：

- **[CellVoyager（Alber et al., *Nat Methods* 2026）](https://doi.org/10.1038/s41592-026-03029-6)**——「AI 计算生物智能体通过自主分析生物数据产出新洞见。」VCHarness *造*模型、rBio 在模型之上*推理*，而 CellVoyager 是*做分析*——自主、端到端、在真实的单细胞数据上。

**这一模式为什么要紧**：它是四种里最贴近一个干活科学家日常循环的那个。另外三种模式产出的是*模型*或*答案*；CellVoyager 产出的是*分析*——计算生物工作真正的那个基本单元。对一个小实验室来说，这是最直接威胁——或者增强——那个瓶颈（分析师的带宽）的模式。[Li et al. 2026 *Nat Biotech*「in silico team science」](https://doi.org/10.1038/s41587-026-03035-1)那套提法，本质上就是在问「当模式四变得可靠时，一个实验室会发生什么」。

**注意**：一个会浮现「洞见」的自主分析智能体，会以机器的速度继承多重比较问题。CellVoyager 这类输出，需要和人类分析师一样的统计卫生——甚至需要得更多，因为在人类还没意识到自己在 p-hacking 之前，智能体就能生成上百个看起来挺像样的发现。

## 2026 年的商业框架

这个交叉点，正是药企 + AI 原生生物科技公司花钱的地方：

- **JPM 2026 第二天**：AstraZeneca 收购 **Modella AI**——多模态病理 FM + 智能体 AI 能力，打包在一个栈里。智能体调 FM 那一模式，被搬到了收购级别。
- **JPM 2026 第一天**：礼来 + NVIDIA 的 10 亿美元 AI 协同创新实验室——一项预设了「FM 之上要有智能体接口」的基础设施承诺。
- **2026**：Owkin 在 Claude 里推出 Pathology Explorer——把「智能体 ↔ FM」做成了商业接口。

**AACR 2026 AT02 场次《Agentic AI as the Cancer Researcher》** + **4/22《Agentic AI as the Oncologist》场次**，是整个领域首次在临床 AI 的会议舞台上对这个交叉点做出承诺。

## 这对学术选题意味着什么

**[Lane 9（FM 辅助的实验设计 / 主动学习）](small-labs-what-to-build.md)**就是坐落在这个交叉点上的那条赛道。它用 FM 当工具的模式（模式一），和湿实验形成一个闭环。买家是 AI 原生生物科技公司（Recursion、Insitro、Latent Labs、Vevo）——他们是真会为这种工作付钱的。

**具体的项目形态**：找一个在跑 CRISPRi 或药物扰动筛选的湿实验室合作。实现一个由 LLM 编排、FM 引导的筛选闭环（模式一——FM 当工具）。和文献先验基线做对比。产出：一篇 *Nat Methods* / *Cell Systems* 的方法论文 + 一篇临床相关性论文。

这四种模式还暴露出**接下来的研究问题**：

- **模式一（FM 当工具）**：智能体怎么决定一个查询该调*哪个*生物 FM？面向生物的工具路由还没解决。
- **模式二（FM 构建器）**：VCHarness 设计的是架构，不是预训练目标。智能体能不能设计出一个比「下一基因预测」*更好的目标*？（讲稿小实验室增补里的 Track 2。）
- **模式三（FM 当验证器）**：rBio 用的是单个验证器（TranscriptFormer）。一个推理智能体能不能用*多个*验证器（TranscriptFormer + 病理 FM + AlphaGenome）来做跨模态的生物推理？这是个敞开着的后续——头一篇做出来的，就拿走那个引用。
- **模式四（FM 当分析底料）**：CellVoyager 产出自主分析——但谁来审？一个面向智能体计算生物输出的统计卫生层（多重比较控制、自动化敏感性分析）还不存在。这个层本身就是一个能发论文的小实验室项目。

## 几个常见误解

**「智能体 AI 在取代 FM。」** 错。智能体需要 FM 当底料。没有生物 FM，智能体根本没东西可调。

**「智能体 AI 能解决线性基线那场清算。」** 不能。那场清算针对的是 FM 本身；智能体让这些 FM 变得可及，却不会改善它们底层的准确率。如果 scGPT 在扰动预测上输给一个线性基线，那一个去调 scGPT 的智能体，照样会输给那个基线。

**「智能体得要 GPT-4 级别的容量。」** 未必。rBio 是建在 Qwen2.5-3B（小开源模型）上的。MedAgentGym 的 Med-Copilot 是 7B 参数。生物智能体的瓶颈是*验证器准确率*和*工具质量*，不是 LLM 的大小。

**「这领域太早了，还不能当项目方向。」** 截至 2026 年 5 月，错。VCHarness、rBio、MedAgentGym、PathChat-DX、Owkin Pathology Explorer 全都是 2024–2026 年的公开系统。「智能体 ↔ FM」这个交叉点已经有工具、有论文、有商业信号了。它只是还没有一套定型的分类法——而这恰好就是小实验室的机会。

## 接下来读什么

- **[基础模型——全景](foundation-models-state-of-play.md)**—— 这篇释疑所栖身的那张跨家族地图。
- **[小实验室——能造什么](small-labs-what-to-build.md)**—— Lane 9（FM 辅助的实验设计 / 主动学习）坐落在「智能体 ↔ FM」交叉点上。
- **[AACR 2026 AT02 场次](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/sessions/2026-04-21-at02-agentic-ai-cancer-researcher/)**——《Agentic AI as the Cancer Researcher》。
- **[AACR 2026 4/22 肿瘤医生场次](https://liudengzhang.github.io/conference-vaults/conferences/aacr-2026/sessions/2026-04-22-agentic-ai-as-the-oncologist/)**—— 临床 AI 即智能体的角度。
- **[ICLR 2026 MedAgentGym 档案](https://liudengzhang.github.io/conference-vaults/conferences/iclr-2026/tools/medagentgym/)**—— 生物医学分析的智能体底料。
- **[CZI Virtual Cells 平台上的 rBio 模型卡](https://virtualcellmodels.cziscience.com/model/rbio)**—— 首个在虚拟细胞模拟上训练出来的公开推理模型。

---

*最后更新于 2026-05-13。*
