---
layout: post
title:  Inverse Problems On PDEs
date: 2020-04-28
Author: Yanfei Tang
tags: [math]
comments: false
---

Inverse problems have wide applications on real-world problems. When I was a PhD student in Oak Ridge, I was very excited at one of my researches on inverse problems of Fredholm integral of the first kind. I still remembered that when I first encountered with that problem, my immediate reaction was that this was a very realistic problem and I would have a solid training on applied mathematics if I worked on that. I happily took the chanllenge on that. Several year laters, my taste of problems does not change. I was right, this was one of the interesting problems that I was ever studied. 

<!-- more -->

This blog is an exploration on another kind of inverse problems about solving PDEs. It does not offer any methodologies to solve the problems but give an insight why it is so hard to solve a PDEs inversely. My source is from some slides on websites. I will use a diffusion equation as an example. 



Suppose that we have a one dimensional diffusion equation of heat such as 

$$
\frac{\partial u}{\partial t} = \frac{\partial^2 u}{\partial x^2} \\(t, x) \in (0, \infty) \times(-1, 1) \\u(t, -1) = u(t, 1) = 0, \quad u(0, x)= u_0(x). \tag{1}
$$

The problem is self-explained for students trained in physics or mathematics. Typically, we will be asked such as, given a $u_0(x)$ find out $u(t, x)$ for some $t>0$. This is what we called as a forward problem. The backward problem is to find $u_0$ given $u(t, x)$. Here I will try to explain why it will be hard to derive $u_0$ in reality. 



First, let us solve the Eq. (1) forwadly by using the Fourier series technique. Let

$$
u(t, x) \approx \sum_{k = -N}^{N} \hat{u}_k(t) e^{ikx} \tag{2},
$$

then the first order differential of Eq. (2) respect to time t is

$$
\frac{\partial u}{\partial t} \approx \sum_{k = -N}^{N} \hat{u}_k^{'}(t) e^{ikx}. \tag{3}
$$

As well as the second order differential of Eq. (3) respect to displacement $x$ is

$$
\frac{\partial^2 u}{\partial x^2} \approx \sum_{k=-N}^{N} -k^2 \hat{u}_k(t) e^{ikx}. \tag{4}
$$

Therefore, $\hat{u}_k^{'}(t) = -k^2 \hat{u}_k(t)$, we can get $\hat{u}_k(t) = e^{-k^2 t}\hat{u}_k(0)$. In the end, the solution is, 

$$
u(t, x) \approx \sum_{k = -N}^{N} e^{-k^2 t} \hat{u}_k(0) e^{ikx}.
$$



Now suppose that we want to recover $u(0, x)$ from $u(T, x)$. From above derivation, we know that $\hat{u}_k(T) = e^{-k^2 T}\hat{u}_k(0)$, thus $\hat{u}_k(0) = e^{k^2 T}\hat{u}_k(T)$. If we put all these into Fourier series expansion of $u(0, x)$, we will have
$$
u(0, x) \approx \sum_{k = -N}^{N}  e^{k^2 T}\hat{u}_k(T) e^{ikx} \tag{5}.
$$

In reality, noise will be presented in the modes or observed signal $u(T, x)$, we shall expect that

$$
\begin{array}uu_{\text{recovered}} (0, x)  & \approx \sum\limits_{k = -N}^{N}  e^{k^2 T} (\hat{u}_k(T) + \eta_k) e^{ikx} \\&= u(0, x) + \sum\limits_{k = -N}^{N}  e^{k^2 T} \eta_k  e^{ikx}. \tag{6}\end{array}
$$

It is noticed that noise in the highest modes is amplified exponentially. 


