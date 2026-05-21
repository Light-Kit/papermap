---
title: "不是对决：transformer 和 diffusion 在虚拟细胞里到底怎么配合"
summary: "这是[扩散 / 流匹配科普篇](diffusion-and-flow-matching-for-virtual-cells.md)的姊妹篇，写出来就是为了拆掉一个错误的框法：transformer 和 diffusion 不是争夺虚拟细胞王座的两种对立架构，它们处在同一套技术栈的不同层，而且几乎总是一起跑。文章先把两者分清楚——transformer 是个函数逼近器，diffusion / 流匹配是一种生成式的训练目标加采样过程——然后讲清它们配合的四个地方。第一，去噪网络本身通常就是个 transformer：Diffusion Transformer（DiT）把打分 / 速度场网络换成了注意力模型，所以今天每一个细胞生成器内部其实都装着一个 transformer。第二，diffusion 跑在 transformer 的隐空间里：在一个预训练细胞 FM 编码器（scGPT、Geneformer、UCE、Tahoe-x1）之上做潜在扩散，transformer 给坐标系，再用一个计数解码器把真实 scRNA-seq 的计数还原回来。第三，做条件控制的是 transformer：药物编码器（MoLFormer）和细胞状态编码器吐出的向量，去驾驭 classifier-free guidance 或者那条速度场。第四，分工：transformer 回答「细胞能在哪、这是什么细胞」（表示、身份、在基因上做注意力），diffusion / 流回答「细胞怎么动、它会变成什么」（输运、反事实采样）——也就是先嵌入再生成的流水线，STATE 就是个落了地的例子。两者互相补盲区：transformer 没有能用的密度，也采不出反事实；diffusion 需要一个好坐标系和一个可对准的方向，而这正是 transformer 给的。那条诚实的告诫从清算那边接着成立——把它们拼起来并不会凭空造出因果，拼好的整套栈照样得先过一条线性基线。一句话主线：别再问谁赢了；能用的虚拟细胞模型，就是一个 transformer 编码出来的隐空间、加一个由 transformer 编码器做条件的 diffusion / 流生成器——而这恰好就是我们「生存场」那套押注的形状。"
---

> *这篇接着[扩散和流匹配在虚拟细胞里怎么用](diffusion-and-flow-matching-for-virtual-cells.md)往下写，那篇讲的是这两类生成模型本身是什么。这一篇要回答的，是一个老被说成「打架」的问题——「diffusion 是不是把 transformer 打败了？」——答案是：它们是一套栈里的不同层，不是擂台上的对手。周边词汇见[五十个概念的赌注](fifty-concepts-one-bet-v2.md)；大家实际在复用什么，见[研究者到底在谁的基础上做研究](what-researchers-actually-build-on.md)；落到一个具体模型上，见[生存场那篇](what-disappears-conditional-viability-v3.md)。*

## 「对决」这个说法本身就错了

一问「在虚拟细胞里 diffusion 有没有赢过 transformer」，其实就已经把两样不同的东西搅在一起了。**transformer** 是一种*架构*——一个由注意力搭起来的函数逼近器，负责把一组基因 token 变成一个向量。**diffusion**（以及它的表亲流匹配）是一种*训练目标加采样过程*——一套学概率分布、再从里面采样的办法。一个是发动机缸体，另一个是这台发动机被调来干的事。你完全可以造一个去噪网络是 transformer、是 CNN、或者是 MLP 的 diffusion 模型；你也完全可以用掩码 token 损失、对比损失、或者 diffusion 损失去训一个 transformer。所以「transformer 对 diffusion」，就像在问发动机有没有赢过燃料。真正有意思的问题是它们怎么拼在一起——而在虚拟细胞里，它们在四个层面上各拼各的。

## 第一层——去噪的，往往就是个 transformer

它们最直接的合体方式：diffusion 模型*里面*那张网络，就是个 transformer。Diffusion Transformer（[Peebles & Xie, ICCV 2023](https://arxiv.org/abs/2212.09748)）证明了，早期 diffusion 模型用的那个卷积 U-Net 可以扔掉，换成一个朴素的 transformer，让它在（加了噪的）输入加上时间步和条件上做注意力——而且这样还更能扩展。流匹配里也一样：那条**速度场**就是用一个 transformer 来参数化的。放到细胞上很顺，因为一个细胞本来就是一组基因 token，正是注意力被设计来吃的输入。所以当你读到某个细胞生成器「是个 diffusion 模型」时，往下看一层，里头做去噪的基本都是个 transformer。在这一层，它们根本不是二选一；一个是被包在另一个里头的。

## 第二层——diffusion 跑在 transformer 的隐空间里

第二种合体方式是潜在扩散。直接生成两万维左右、又稀疏的原始计数向量太难，于是从图像生成那边借来一个招（[Rombach et al., CVPR 2022](https://arxiv.org/abs/2112.10752)）：在一个*学出来的隐空间*里生成，再解码回去。在细胞里，这个隐空间恰恰就是一个预训练好的 transformer 基础模型现成给你的：把 scGPT、Geneformer、UCE 或者 Tahoe-x1 当冻结编码器跑一遍，在它们的嵌入空间里做 diffusion 或流匹配，再用一个感知计数的头解码出去，让输出尊重真实 scRNA-seq 那种离散、过度离散的结构。**CFGen**（[Palma et al., ICLR 2025](https://arxiv.org/abs/2407.11734)）和 **scDiffusion**（[Luo et al., *Bioinformatics* 2024](https://academic.oup.com/bioinformatics/article/40/9/btae518/7738782)）靠的都是学出来的隐空间和感知计数的似然，而不是把表达当成高斯。这里分工很利落：transformer 给的是*坐标系*——一个距离有意义的紧凑流形，diffusion 给的是这个流形上的*生成运动*。

## 第三层——做条件控制的，是 transformer

一个虚拟细胞，只有当你能驾驭它时才有用：在*给定*一种药、一个扰动、一种细胞类型、一个生态位的前提下生成细胞。而那个用来驾驭的向量，几乎总是从一个 transformer 来的。一个小分子药，由像 **MoLFormer**（[Ross et al., 2022](https://arxiv.org/abs/2106.09553)）这样的化学 transformer 来编码；一个细胞的上下文，由一个细胞 FM 的 transformer 来编码；这些向量再被注入到生成器里，用来做 **classifier-free guidance**（[Ho & Salimans, 2022](https://arxiv.org/abs/2207.12598)）——带标签和不带标签各训一份，采样时把两者插值，把生成往那个条件上推。生成模型提供的是*搬动*概率质量的机制；transformer 编码器提供的是往哪个方向搬。谁也替不了谁。

## 第四层——真正的分工：先表示，再输运

退一步看，这两者回答的是互补的问题。transformer 生来是回答**细胞能在哪、这是什么细胞**——在基因上做注意力，得出身份、细胞类型、批次、一个能用的表示；这正是第一波基础模型赖以立足的「嵌入并分类」的强项（[scGPT](https://www.nature.com/articles/s41592-024-02201-0)、[Geneformer](https://www.nature.com/articles/s41586-023-06139-9)）。diffusion 和流匹配生来是回答**细胞怎么动、它会变成什么**——沿流形输运，对一个反事实的细胞群做条件采样（[CellFlow](https://www.biorxiv.org/content/10.1101/2025.04.11.648220v1) 做群体响应；[scDiffEq](https://www.biorxiv.org/content/10.1101/2023.12.06.570508) 干脆让 diffusion *就是*那套动力学）。所以能跑通的流水线是**先嵌入、再生成**：transformer 把细胞映进一个隐空间，生成模型在里头做输运，再由一个解码器还原成计数。Arc 的 **STATE**（[2025](https://www.biorxiv.org/content/10.1101/2025.06.26.661135)）就是这种分工落地的一个例子——一个状态表示模块、一个状态转移模块——而不是押注哪一派胜过另一派。

## 它们互相补对方的盲区

正因如此，这件事该用「协作」来框，而不是「竞争」。一个被训来嵌入并分类的 transformer，**没有能用的密度**——它学的是一条决策边界，不是一个分布，所以它没法告诉你一个候选细胞有多可能，也采不出一个新细胞；掩码 token 那个目标从来没产出过一个生成模型。diffusion 给的恰恰就是这个。反过来，一个被直接丢到原始计数上、既没好坐标系、又没条件的 diffusion 模型，会又慢、又糊、又没法驾驭；而 transformer 给了它一个能干活的流形，和一个可以被推的方向。说白了：transformer 知道*细胞是什么*，diffusion 知道*怎么造更多、以及怎么在它们之间移动*，而虚拟细胞这套栈两样都要。那个曾经想在一个模型里把两件事都干了的前辈——VAE，也就是 [scVI](https://www.nature.com/articles/s41592-018-0229-2)——正是如今这种分工所改进掉的对象：生成的目标一样，但样本更糊、密度也比一个专门的 diffusion / 流头要松。

## 清算留下来的那条告诫

把它们拼起来，并不会买来因果。一个 transformer 编码的隐空间，配一个流匹配生成器、再加 transformer 做条件，可以把处理后细胞的分布拟合得漂漂亮亮，却照样预测不了一种留出药物的响应，因为**密度不是因果**，联合分布不是调控机制——这正是[线性基线那场清算](why-linear-baselines-win.md)撞上的那堵墙。这套合体的栈是必要的，但不是充分的：它是这个领域目前表示和输运细胞状态最好的机器，可一个配合得再默契的 transformer 加 diffusion 模型，在它那套优雅算数之前，仍得先过一条调好的线性基线。架构层面的协作，替代不了那个对的归纳偏置。

## 这对我们意味着什么

我们自己的押注，是有意识地做成这套栈的一个实例，而不是去站队那场对决。[生存场模型](what-disappears-conditional-viability-v3.md)把一个 transformer 细胞编码器（Tahoe-x1）和一个 transformer 药物编码器（MoLFormer）冻起来当表示层，跑一个流 / 输运生成器当移动层，再补上这两类模型都不提供的那一样东西——一个判定*谁能活下来*、而不只是看活下来的长什么样的死亡项。这就是「这两者怎么配合」的答案：transformer 给坐标和条件，diffusion / 流给输运，而你加在上面的那点科学——清算说缺的那个归纳偏置——才是把一对协作的通用工具变成一个虚拟细胞的关键。别再问谁赢了；要问的是，你往这一对上面再装点什么。
