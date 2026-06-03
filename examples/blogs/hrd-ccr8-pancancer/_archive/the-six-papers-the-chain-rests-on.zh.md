---
title: '撑起这条链的六篇论文 —— Luo 2024 之前已经被压实的那些环'
date: '2026-06-01'
topics:
- hrd
- cgas-sting
- parpi
- ccr8
- treg
- interferon
- immunotherapy
summary: 'HRD → IFN → CCR8⁺ eTreg 这条链不是猜测，是机制 —— 每一环都有一篇决定性的前期工作压住。承重的六块：Sun & Chen 2013 指认 cGAS 这个胞质 DNA 感受器；Mackenzie 2017 与 Harding 2017 把基因组不稳定经由微核翻译成 cGAS 信号；Pantelidou、Shen、Sen 2019 三篇几乎同时落地，证明 PARPi 在 BRCA 缺陷肿瘤里把 STING 点着；Plitas 2016 与 De Simone 2016 把 CCR8 钉成瘤浸 Treg 的特异性标志；Luo 2024 在 HGSOC 里把整条链闭上；CHS-114 一期（NCT05635643）则把"瘤内选择性 Treg 清除"从假设推到了临床读数。这篇博客一篇一篇走过去，也点出每一篇留下的空缺。'
starred: true
---

那篇生物学随笔把整个故事拆成了六环：HRD → 胞质 DNA → cGAS-STING → 持续的 I 型 IFN → MHC-II^hi 共抑制肿瘤细胞 → CCR8⁺ 效应 Treg → 终末耗竭 CD8。这条链读起来像机制而不像猜测，原因只有一个：**每一环都已经被一项决定性的前期工作单独证过了**。把活儿干完的基本就是六篇论文（或六组论文）。

下面挨个走一遍。每一篇讲三件事：做了什么、证了什么、把什么留给了后来人。

## 1. Sun & Chen 2013 —— cGAS 作为胞质 DNA 感受器

**Sun L, Wu J, Du F, Chen X, Chen ZJ.** *Cyclic GMP-AMP synthase is a cytosolic DNA sensor that activates the type I interferon pathway.* **Science** 2013;339(6121):786–791.

在这篇之前，STING 已经在那里，胞质 DNA 触发干扰素反应这件事也已经知道，可上游的感受器一直没人指认得出。Sun & Chen 把这一步落实：cGAS（当时还叫 MB21D1）结合胞质双链 DNA，合成环状二核苷酸 cGAMP，cGAMP 再去激活 STING。这就是整条链最底层的一环 —— 没有 cGAS，HRD 根本没法点火。

这篇打开了"DNA 损伤即天然免疫触发"的整个领域。但它当时还没说：这个触发器在 HRD 肿瘤里会被特异性地点着。

## 2. Mackenzie 2017 + Harding 2017 —— 微核作为信号源

**Mackenzie KJ, Carroll P, Martin C-A, et al.** *cGAS surveillance of micronuclei links genome instability to innate immunity.* **Nature** 2017;548(7668):461–465.

**Harding SM, Benci JL, Irianto J, Discher DE, Minn AJ, Greenberg RA.** *Mitotic progression following DNA damage enables pattern recognition within micronuclei.* **Nature** 2017;548(7668):466–470.

同一期 Nature，背靠背两篇。Mackenzie 那组证明 cGAS 会定位到微核 —— 有丝分裂时染色体错分离形成、被核膜包裹的 DNA 片段 —— 微核核膜一破，里面的 DNA 暴露给 cGAS，IFN 反应被点燃。Harding 那组用包括电离辐射在内的多种 DNA 损伤手段，独立做到了同一个结论。两篇合起来，**把"基因组不稳定如何变成一个天然免疫信号"这一步的机制钉死了**：染色体碎裂、落后染色单体、错连断口产生微核；微核破裂；胞质里出现 DNA；cGAS 点火。

这一环干的事，是把"HRD 制造 DNA 损伤"翻成"HRD 制造 cGAS-STING 信号"。少了它，整条链没有源头。

他们没做的：把这套机制和某个具体的治疗干预连上。这一步留给了下一组。

## 3. 2019 PARPi-STING 三连击 —— Pantelidou、Shen、Sen

**Pantelidou C, Sonzogni O, De Oliveria Taveira M, et al.** *PARP inhibitor efficacy depends on CD8⁺ T-cell recruitment via intratumoral STING pathway activation in BRCA-deficient models of triple-negative breast cancer.* **Cancer Discovery** 2019;9(6):722–737.

**Shen J, Zhao W, Ju Z, et al.** *PARPi triggers the STING-dependent immune response and enhances the therapeutic efficacy of immune checkpoint blockade independent of BRCAness.* **Cancer Research** 2019;79(2):311–319.

**Sen T, Rodriguez BL, Chen L, et al.** *Targeting DNA Damage Response Promotes Antitumor Immunity through STING-Mediated T-cell Activation in Small Cell Lung Cancer.* **Cancer Discovery** 2019;9(5):646–661.

2019 年几乎同时落地的三篇。问的是同一个问题 —— 抑制 DNA 损伤反应（PARP，Sen 那篇还加了 CHK1）能不能在体内把 STING 点着？抗肿瘤效应是不是要靠免疫系统？—— 然后在三个不同的肿瘤背景（BRCA 缺陷 TNBC、混合 BRCA 背景、小细胞肺癌）里拿到了同一个答案。靶向 DDR **确实**会激活 cGAS-STING；抗肿瘤效应**部分靠免疫**；DDR 抑制剂叠加 anti-PD-1 / anti-PD-L1 既能加疗效，也能拉 CD8 浸润。

在常规临床思维里这一环最被低估。PARPi 当年是按细胞自主的合成致死疗法卖出去的。这三篇从机制层面把它另一个身份摆出来：**它同时也是一种免疫治疗**。把 PARPi 当作 PARPi + anti-CCR8 联合方案里的"放大器"，依据就在这里 —— PARPi 不只是在杀同源重组缺陷的细胞，它在主动推那条会筛出 eTreg 区室的 IFN 信号。

他们没做的：去问在持续 PARPi 诱导的 IFN 之下，**Treg 区室会发生什么**。这个空缺由 Luo 2024 填上。

## 4. Plitas 2016 + De Simone 2016 —— CCR8 作为肿瘤 Treg 靶点

**Plitas G, Konopacki C, Wu K, et al.** *Regulatory T cells exhibit distinct features in human breast cancer.* **Immunity** 2016;45(5):1122–1134.

**De Simone M, Arrigoni A, Rossetti G, et al.** *Transcriptional landscape of human tissue lymphocytes unveils uniqueness of tumor-infiltrating T regulatory cells.* **Immunity** 2016;45(5):1135–1147.

2016 年 11 月那期 *Immunity* 的两篇。Plitas 那组拿乳腺癌肿瘤组织配对外周血做 Treg；De Simone 那组在结直肠癌和肺癌里做瘤浸 Treg。两组独立得到同一个结论：**CCR8** 是把瘤浸 Treg 从外周 Treg 和常规 T 细胞里干净分开的那个标志物。两组都顺势把 CCR8 提为清除靶点 —— 论点是，一个带 ADCC 活性的抗 CCR8 抗体可以只清掉肿瘤里的 Treg，不动外周免疫耐受。

这就是把靶点理由立起来的那一对论文。今天临床里的每一条 anti-CCR8 管线 —— CHS-114、LM-108、GS-1811、FG-3165 —— 立项依据都能溯源回这两篇。

他们没做的：在临床里证这套清除策略真能用。这一步一直等到了 2024 年。

## 5. Luo 2024 —— 把整个回路闭上的那篇锚定论文

**Luo Y, Xia Y, Liu D, et al.** *Neoadjuvant PARPi or chemotherapy in ovarian cancer informs targeting effector Treg cells for HRD tumors.* **Cell** 2024;187(18):4905–4925.e24.

这个项目就是围着这篇论文搭起来的。Luo 等人拿新辅助尼拉帕利二期临床（NCT04507841）里 HGSOC 患者的 scRNA + TCR 数据，把整条链在人类肿瘤里完整跑了一遍 —— HRD 推出一个被 IFN 条件化的肿瘤细胞状态，这个状态选择性地筛出 CCR8⁺ 终末 eTreg，eTreg 又和终末耗竭 CD8 共定位在一起。接下来他们在 **CCR8 人源化（hCCR8 敲入）小鼠** + 原位 Trp53⁻/⁻;Brca1⁻/⁻ ID8 卵巢肿瘤模型里验证治疗推论：临床期抗 CCR8 抗体 **ZL-1218**（再鼎医药）联合尼拉帕利的抑瘤效果显著强于任一单药 —— 尼拉帕利单药也确实在压肿瘤进展，联合只是把它推得更远。一个用 anti-CD25 走另一条 eTreg 清除路线的平行臂，复现了同一个协同。

这是一篇整合工作。它把 cGAS-STING-PARPi 那条线（第 2、3 环）和 CCR8-Treg 那条线（第 4 环）连上了，第一次在接受治疗的人类队列里给出端到端的机制图。

它没做的：去问这是 HGSOC 独有的，还是能往泛癌推。这正是本项目要回答的问题。

## 6. CHS-114 phase I（NCT05635643）—— 选择性清除的临床证据

**Coherus BioSciences, 2024 readouts.** CHS-114（tagmokitug），头颈鳞癌剂量爬坡队列。

Plitas / De Simone 当年那套靶点理由的预测是：经由 CCR8 在瘤内做选择性 Treg 清除应该奏效，并且不会引发系统性自身免疫。CHS-114 的一期就把这条预测拿去试了。读数（SITC / AACR 2025）：肿瘤组织里 **CCR8⁺ Treg 下降 74%**、**CD8 / CCR8⁺ Treg 比值上升 12 倍**、瘤内 **CD8 密度上升 73%**、总 FOXP3⁺ Treg 下降 43%，安全性"**可控**"（无 DLT，联合臂里除了 toripalimab 已知的安全谱之外没冒新的信号）。"选择性清除"这件事，已经不是假设了。

这让整套联合方案在工程上落了地。少一个临床级的选择性 Treg 清除药，PARPi + anti-CCR8 就只是一套没有路径的生物学。CHS-114（连同并行的 LM-108 / GS-1811 / FG-3165）把它变成了一个能设计的临床试验。

## 六篇合起来证明了什么，没证明什么

这六篇（或六组）立住的是：

- **感受器在那里。** cGAS 检测胞质 DNA。（Sun & Chen）
- **HRD 会把它点着。** 基因组不稳定造出微核，微核破裂把 DNA 交给 cGAS。（Mackenzie + Harding）
- **PARPi 会把这信号放大。** PARPi 诱导的复制叉崩塌在体内推 STING 激活。（Pantelidou + Shen + Sen）
- **靶点是真的。** CCR8 特异性地标记瘤浸 Treg。（Plitas + De Simone）
- **整条链在患者体内确实在跑。** HGSOC 的 scRNA 从头到尾追下来了。（Luo）
- **药能用。** 选择性清除在临床上做得到。（CHS-114）

它们**没有**证的：

- 这条链在**泛癌**里跑不跑得通（Luo 只做了 HGSOC；单瘤种的 CCR8 工作有，跨瘤种的整合分析没有）。
- HRD 高 × IFN 高是不是这套联合方案做病人入组的**正确分层指标**（目前没有公开的联合方案临床）。
- 在任何一个具体亚组里，联合方案是不是**优于** PARPi 或 anti-CCR8 单药（无结局数据）。

这三块空缺，就是本项目泛癌分层工作要补的位 —— 赌的是，公共多组学数据里其实已经够，能把 PARPi + anti-CCR8 当年就是为之设计的那群人定义出来，哪怕到今天还没人去做那个临床试验。

这条链不是猜测。它是六块已经做完的基础工作，在等第七块：把"人"定义出来。
