---
title: '撑起这条链的六篇论文 —— 在 Luo 2024 之前已经被证好的那些'
date: '2026-06-01'
topics:
- hrd
- cgas-sting
- parpi
- ccr8
- treg
- interferon
- immunotherapy
summary: 'HRD → IFN → CCR8⁺ eTreg 这条链是机制性的，不是猜测 —— 每一环都有至少一篇决定性的前期工作。承重的是六块东西：Sun & Chen 2013（cGAS 作为胞质 DNA 感受器）、Mackenzie 2017 + Harding 2017（cGAS 识别基因组不稳定产生的微核）、Pantelidou/Shen/Sen 2019（几乎同时发表的三篇，证明 PARPi 在 BRCA 缺陷肿瘤中激活 STING）、Plitas 2016 + De Simone 2016（CCR8 是肿瘤 Treg 特异性标志）、Luo 2024（在 HGSOC 中把整条链闭环的锚定论文），以及 CHS-114 phase I（NCT05635643）（瘤内选择性 Treg 清除已能在临床实现）。这篇博客把每一篇走一遍，也指出它们各自留下了什么没做。'
starred: true
---

那篇生物学随笔把整个故事拆成了六环的链条：HRD → 胞质 DNA → cGAS-STING → 持续性的 I 型 IFN → MHC-II^hi 共抑制肿瘤细胞 → CCR8⁺ 效应 Treg → 终末耗竭 CD8。这条链读起来像机制而不像猜测，原因只有一个：**每一环都已经被一项决定性的前期工作独立证明过**。把活儿干完的基本上就是六篇论文（或者说六组论文）。

下面就是一趟巡礼。每一篇讲清楚：他们做了什么、证明了什么、又把什么留给了后来的人。

## 1. Sun & Chen 2013 —— cGAS 作为胞质 DNA 感受器

**Sun L, Wu J, Du F, Chen X, Chen ZJ.** *Cyclic GMP-AMP synthase is a cytosolic DNA sensor that activates the type I interferon pathway.* **Science** 2013;339(6121):786–791.

在这篇之前，领域里已经知道 STING 存在，也知道胞质 DNA 会触发一个干扰素反应，但上游的感受器是谁，没人指认得出来。Sun & Chen 证明 cGAS（当时还叫 MB21D1）能够结合胞质双链 DNA，合成环状二核苷酸 cGAMP，而 cGAMP 又会去激活 STING。这就是整条链最底层的那一环 —— 没有 cGAS 这个感受器，HRD 就根本没法点火。

这篇论文打开了"DNA 损伤即为天然免疫触发"的整个领域。但它当时还没告诉任何人：这个触发器在 HRD 肿瘤里会特异性地被点着。

## 2. Mackenzie 2017 + Harding 2017 —— 微核作为信号源

**Mackenzie KJ, Carroll P, Martin C-A, et al.** *cGAS surveillance of micronuclei links genome instability to innate immunity.* **Nature** 2017;548(7668):461–465.

**Harding SM, Benci JL, Irianto J, Discher DE, Minn AJ, Greenberg RA.** *Mitotic progression following DNA damage enables pattern recognition within micronuclei.* **Nature** 2017;548(7668):466–470.

同一期 Nature，背靠背两篇。Mackenzie 那组证明 cGAS 会定位到微核 —— 也就是有丝分裂时染色体错分离形成的、由核膜包裹的 DNA 片段 —— 而微核核膜的破裂会把里面的 DNA 暴露给 cGAS，从而点燃 IFN 反应。Harding 那组则用包括电离辐射在内的多种 DNA 损伤手段，独立得出了同一结论。两篇合在一起，**把"基因组不稳定如何变成一个天然免疫信号"这一步的机制定下来了**：染色体碎裂、落后染色单体、错连断口产生微核；微核破裂；胞质中出现 DNA；cGAS 点火。

这就是把"HRD 产生 DNA 损伤"翻译成"HRD 产生 cGAS-STING 信号"的那一环。没有它，整条链没有源头。

他们没做的是：把这个机制和某个具体的治疗干预连起来。这一步留到了下一组。

## 3. 2019 PARPi-STING 三连击 —— Pantelidou、Shen、Sen

**Pantelidou C, Sonzogni O, De Oliveria Taveira M, et al.** *PARP inhibitor efficacy depends on CD8⁺ T-cell recruitment via intratumoral STING pathway activation in BRCA-deficient models of triple-negative breast cancer.* **Cancer Discovery** 2019;9(6):722–737.

**Shen J, Zhao W, Ju Z, et al.** *PARPi triggers the STING-dependent immune response and enhances the therapeutic efficacy of immune checkpoint blockade independent of BRCAness.* **Cancer Research** 2019;79(2):311–319.

**Sen T, Rodriguez BL, Chen L, et al.** *Targeting DNA Damage Response Promotes Antitumor Immunity through STING-Mediated T-cell Activation in Small Cell Lung Cancer.* **Cancer Discovery** 2019;9(5):646–661.

2019 年几乎同时出来的三篇。问的是同一个问题 —— 抑制 DNA 损伤反应（PARP，在 Sen 那篇里还包括 CHK1）能不能在体内激活 STING，抗肿瘤效应是否依赖于免疫系统？—— 然后在三个不同的肿瘤背景里（BRCA 缺陷 TNBC、多种 BRCA 背景、小细胞肺癌）拿到了同一个答案。靶向 DDR 的治疗**确实**会激活 cGAS-STING；抗肿瘤效应**部分依赖免疫**；DDR 抑制剂叠加 anti-PD-1 / anti-PD-L1 同时提升疗效和 CD8 浸润。

在常规临床思维里，这一环是最被低估的。PARPi 当年是按细胞自主的合成致死疗法卖出去的。这三篇论文从机制上证明了它**同时也是一种免疫治疗**。它们正是把 PARPi 用作 PARPi + anti-CCR8 联合方案中"放大器"的依据 —— PARPi 不只是在杀同源重组缺陷的细胞，它在主动驱动那个会去筛选出 eTreg 区室的 IFN 信号。

他们没做的是：去问在持续 PARPi 诱导的 IFN 之下，**Treg 区室会发生什么**。这个空缺是 Luo 2024 填上的。

## 4. Plitas 2016 + De Simone 2016 —— CCR8 作为肿瘤 Treg 靶点

**Plitas G, Konopacki C, Wu K, et al.** *Regulatory T cells exhibit distinct features in human breast cancer.* **Immunity** 2016;45(5):1122–1134.

**De Simone M, Arrigoni A, Rossetti G, et al.** *Transcriptional landscape of human tissue lymphocytes unveils uniqueness of tumor-infiltrating T regulatory cells.* **Immunity** 2016;45(5):1135–1147.

2016 年 11 月那期 *Immunity* 的两篇。Plitas 那组分析了乳腺癌肿瘤组织和配对外周血里的 Treg；De Simone 那组在结直肠癌和肺癌里分析了瘤浸 Treg。两组都独立地指认 **CCR8** 为最干净地把瘤浸 Treg 从外周 Treg 和常规 T 细胞里区分出来的标志物。两组都把 CCR8 提作清除靶点 —— 论点是，一个具备 ADCC 活性的抗 CCR8 抗体可以在不破坏外周免疫耐受的前提下清掉肿瘤里的 Treg。

这就是确立靶点理由的那一对论文。今天在临床里的每一条 anti-CCR8 管线 —— CHS-114、LM-108、GS-1811、FG-3165 —— 立项理由都能溯源回这两篇。

他们没做的是：在临床里证明这个清除策略确实能用。这一步一直等到了 2024 年。

## 5. Luo 2024 —— 把整个回路闭上的那篇锚定论文

**Luo Y, Xia Y, Liu D, et al.** *Neoadjuvant PARPi or chemotherapy in ovarian cancer informs targeting effector Treg cells for HRD tumors.* **Cell** 2024;187(18):4905–4925.e24.

这个项目就是围着这篇论文搭起来的。Luo 等人利用新辅助尼拉帕利二期临床研究（NCT04507841）里 HGSOC 患者的 scRNA + TCR 数据，在人类肿瘤里把整条链跑了一遍 —— HRD 驱动一个 IFN 条件化的肿瘤细胞状态，这个状态选择性地筛出 CCR8⁺ 终末 eTreg，而后者又与终末耗竭 CD8 共定位。随后他们在 **CCR8 人源化（hCCR8 敲入）小鼠**里、用原位 Trp53⁻/⁻;Brca1⁻/⁻ ID8 卵巢肿瘤模型验证了治疗推论：临床阶段的抗 CCR8 抗体 **ZL-1218**（再鼎医药）联合尼拉帕利产生的抑瘤效果显著强于任一单药 —— 尼拉帕利单药本身确实在抑制肿瘤进展，联合方案只是走得更远。一个使用 anti-CD25 作为另一种 eTreg 清除策略的平行臂复现了同样的协同效应。

这是一篇整合性的工作。它把 cGAS-STING-PARPi 那一线（第 2、3 环）和 CCR8-Treg 那一线（第 4 环）连了起来，第一次在一个接受治疗的人类队列里产出了端到端的机制图。

它没做的是：去问这是不是 HGSOC 特有的，还是可以推广到泛癌。这正是本项目要回答的问题。

## 6. CHS-114 phase I（NCT05635643）—— 选择性清除的临床证据

**Coherus BioSciences, 2024 readouts.** CHS-114（tagmokitug），头颈鳞癌剂量爬坡队列。

Plitas/De Simone 的靶点理由当年预测的是：通过 CCR8 在瘤内做选择性 Treg 清除应该奏效，且不会引发系统性自身免疫。CHS-114 的一期临床正好把这一预测拿来试了。读出结果（SITC / AACR 2025）：肿瘤组织里 **CCR8⁺ Treg 下降 74%**，**CD8 / CCR8⁺ Treg 比值上升 12 倍**，瘤内 **CD8 密度上升 73%**，总 FOXP3⁺ Treg 下降 43%，安全性"**可控**"（无 DLT，联合臂中除了 toripalimab 已知的安全谱之外也没出现新的安全信号）。"选择性清除"这件事，已经不是假设了。

这让这套联合方案在操作层面变得可行。如果没有一个临床级的选择性 Treg 清除药，PARPi + anti-CCR8 就只是一套没有落地路径的生物学。CHS-114（以及并行的 LM-108 / GS-1811 / FG-3165 这几条管线）让它成了一个能设计的临床试验。

## 六篇合起来证明了什么，没证明什么

这六篇（或六组）论文确立了：

- **感受器是存在的。** cGAS 检测胞质 DNA。（Sun & Chen）
- **HRD 会点着这个感受器。** 基因组不稳定产生的微核破裂、释放 DNA 给 cGAS。（Mackenzie + Harding）
- **PARPi 会放大这一信号。** PARPi 诱导的复制叉崩塌在体内驱动 STING 激活。（Pantelidou + Shen + Sen）
- **靶点是真的。** CCR8 特异性地标志瘤浸 Treg。（Plitas + De Simone）
- **整条链在患者体内确实在跑。** HGSOC 的 scRNA 数据从头到尾追踪到了。（Luo）
- **药能用。** 选择性清除在临床上是可达成的。（CHS-114）

它们**没有**证明的：

- 这条链是不是在**泛癌**里都跑得通（Luo 只做了 HGSOC；单癌种的 CCR8 论文有，但没有跨癌种的整合分析）。
- HRD-high × IFN-high 是不是为这套联合方案做患者入组的**正确分层指标**（目前还没有公开的联合方案临床试验）。
- 在任何一个具体亚组里，联合方案是否**优于** PARPi 或 anti-CCR8 单药（没有结局数据）。

这三块空缺，正是本项目泛癌分层工作要补的位 —— 赌的是，公共多组学数据里其实已经存在足够的证据，能去定义出 PARPi + anti-CCR8 当年就是为之设计的那群人，哪怕到今天还没人去做那个临床试验。

这条链不是猜测。它是六块已经做完的基础工作，在等第七块：把"人"定义出来。
