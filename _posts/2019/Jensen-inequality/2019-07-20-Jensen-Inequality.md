---
layout: post
title: 琴生不等式(Jensen's Inequality)
date: 2019-07-20
author: Yanfei Tang
tags: [math]
comments: false
toc: false
pinned: false
---



这篇是写给我自己作为参考的，内容大多来源于维基百科和[SCRIBD](https://www.scribd.com/document/105657184/A-Proof-of-Jensen-s-Inequality)。

<!-- more -->

琴生不等式是在数学中一个很重要的不等式，普通大学的理工科学生在大一就应该会接触到。这个不等式是这么描述的：

对于一个实函数$\phi(x)$，在区间$I$内它是凸的（$\frac{d^2 \phi(x)}{d^2 x} > 0, \text{for} \, x \in I$），那么它满足下面的关系，
$$
\phi( \sum_{i = 1}^{N} p_i x_i ) \le \sum_{i=1}^{N} p_i \phi(x_i)，
$$
其中 $p_i \ge 0$, $\sum\limits_{i=1}^{N} p_i = 1$，且$x_i \in I, (i = 1, …, N)$。

**证明**：令$A =  \sum_\limits{i = 1}^{N} p_i x_i $，显然$A \in I$。取


$$
\begin{aligned}
S &= \sum_{i=1}^{N} p_i \phi(x_i) - \phi(A) \\
  &= \sum_{i=1}^{N} p_i \Big[  \phi(x_i) - \phi(A) \Big] \\
  &= \sum_{i=1}^{N} p_i \int_{A}^{x_i} \phi' (x) dx
\end{aligned}
$$


若$A \le x_i$，因为$\phi'(x)$在区间$I$是递增的，可以得到$\int_{A}^{x_i} \phi' (x) dx \ge \phi'(A) (x_i - A)$，同样可以证明$A > x_i$的情形前式也是成立的。那么，


$$
\begin{aligned}
S &\ge \sum_{i=1}^{N} p_i \phi'(A) (x_i - A) \\
	& = \phi'(A) \Big[ \sum_{i=1}^N p_i (x_i - A) \Big] \\
	& = \phi'(A) (A - A) \\
	& = 0,
\end{aligned}
$$


证毕。

## 概率密度函数的形式

*这部分来源于维基百科，证明的思路同上*

假设函数 $f(x)$ 是概率密度函数，也就是$\int_{- \infty}^{\infty} f(x) \, dx = 1$ 且 $f(x) \ge 0$。若$g$ 是任一实值可测函数，$\phi$ 在$g$ 的值域中是凸函数，那么
$$
\phi \Big( \int_{-\infty}^{\infty} g(x) f(x) \, dx \Big) 
\le \int_{-\infty}^{\infty} \phi(g(x)) f(x) \, dx 。
$$
若$g(x) = x$，则这形式的不等式简化成一个常用特例：
$$
\phi \Big( \int_{-\infty}^{\infty} x f(x) \, dx \Big) 
\le \int_{-\infty}^{\infty} \phi(x) f(x) \, dx 。
$$

## 统计物理的应用

统计物理里面有一个很重要的等式Jarzynski equality，对于任何非平衡过程，均有
$$
\langle e^{-\beta W} \rangle = e^{-\beta \Delta F}，
$$
其中$\langle \cdot \rangle$ 代表系综平均， $\Delta F$代表过程前后的Helmholtz自由能的变化。$e^{x}$是凸函数，根据琴生不等式， $e^{-\beta \Delta F} = \langle e^{-\beta W} \rangle  \ge e^{-\beta \langle W \rangle} $， 也就是$\langle W \rangle \ge \Delta F$，热力学第二定律。