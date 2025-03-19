---
layout: post
title: Mathematical Notes
date: 2024-12-28
author: Yanfei Tang
tags: [math]
comments: false
toc: false
pinned: false
---


This post is about mathematical formulas for my reference.

<!-- more -->

### Integration by parts

For ordinary functions of one variable, the rule for integration by parts follows immediately from integrating the product rule

$$
\begin{align*}
\frac{d}{dx}(fg) &= \frac{df}{dx}g + f\frac{dg}{dx}, \\
\int_a^b \frac{d}{dx} (fg) \, dx &= \int_a^b \frac{df}{dx}g \, dx + \int_a^b f \frac{dg}{dx} \, dx, \\
fg |_a^b &= \int_a^b \frac{df}{dx}g \, dx + \int_a^b f \frac{dg}{dx} \, dx.
\end{align*}
$$

Rearraging, we obtain

$$
\int_a^b \frac{df}{dx}g \, dx = fg |_a^b - \int_a^b f \frac{dg}{dx} \, dx.
$$

In an analogous way, we can obtain a rule for integration by parts for the divergence of a vector field by starting from the product rule for the divergence

$$
\nabla \cdot (f \mathbf{G}) = (\nabla f) \cdot \mathbf{G} + f (\nabla \cdot \mathbf{G}).
$$

integrating both sides yields

$$
\int \nabla \cdot (f \mathbf{G}) \, d\tau = \int (\nabla f) \cdot \mathbf{G} \, d\tau  +  \int f (\nabla \cdot \mathbf{G}) \, d\tau .
$$

Now use the divergence theorem to rewrite the first term, leading to

$$
\int (f \mathbf{G}) \cdot \, d\mathbf{A} = \int (\nabla f) \cdot \mathbf{G} \, d\tau  +  \int f (\nabla \cdot \mathbf{G}) \, d\tau .
$$

which can be rearranged to

$$
\int f (\nabla \cdot \mathbf{G}) \, d\tau = \int (f \mathbf{G}) \cdot \, d\mathbf{A} - \int (\nabla f) \cdot \mathbf{G} \, d\tau .
$$

which is the desired integration by parts.

### Boundary conditions [^1]

#### One-dimensional scalar field $\phi$ 

For a one-dimensional scalar field $\phi$, we have three kinds of boundary conditions.

* boundary condition of the **first** kind:
   
$$
\phi = p,
$$

which is typically called as Dirichlet boundary condition.

* boundary condition of the **third** kind:

$$
[\alpha \frac{d \phi}{dx} + \gamma \phi] = q,
$$

which is called Robin boundary condition.

* boundary condition of the **second** kind:

$\gamma = 0$, a special case of the third boundary condition, is also termed as Neumann condition.

#### Two-dimensional scalar field $\phi$

<p align="center">
   <img src="/images/2024/domain2d.png" alt="drawing" align="middle"/>
   <em>Fig. Two-dimensional domain having a discontinuity interface .</em>
</p>

For a two-dimensional scalar field $\phi$, the three kinds of boundary conditions are

* boundary condition of the **first** kind, also known as Dirichlet boundary condition:

$$
\phi = p \quad \text{on} \quad \Gamma_1
$$

* boundary condition of the **third** kind, known as Robin boundary:

$$
(\alpha_x \frac{\partial \phi}{\partial x} \hat{x} + \alpha_y \frac{\partial \phi}{\partial y} \hat{y})\cdot \hat{n} + \gamma \phi = q \quad \text{on} \quad \Gamma_2
$$

* boundary condition of the **second** kind:

The boundary condition of the second kind is a special case of the above equation with $\gamma=0$ which is known as Neumann boundary condition.

#### Three-dimensional scalar field $\phi$

For a three-dimensional scalar field $\phi$, the three kinds of boundary conditions are

* boundary condition of the **first** kind, also known as Dirichlet boundary condition:

$$
\phi = p 
$$

* boundary condition of the **third** kind, known as Robin boundary:

$$
(\alpha_x \frac{\partial \phi}{\partial x} \hat{x} + \alpha_y \frac{\partial \phi}{\partial y} \hat{y} + \alpha_z \frac{\partial \phi}{\partial z}\hat{z} )\cdot \hat{n} + \gamma \phi = q,
$$

* boundary condition of the **second** kind:

The boundary condition of the second kind is a special case of the above equation with $\gamma=0$ which is known as Neumann boundary condition.

### Reference

[^1]: Jian-Ming Jin, The finite element method in electromagnetics (2015). 
[^2]: Dohyun Kim, https://dohyun-cse.github.io/mfem-tutorial.html