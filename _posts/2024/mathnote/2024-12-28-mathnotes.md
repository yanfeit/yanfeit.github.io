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



# Reference

[^1]: Jian-Ming Jin, The finite element method in electromagnetics (2015). 