---
layout: post
title: Invoke BLAS/LAPACK compiled Fortran library in C
date: 2024-06-01
Author: Yanfei Tang
tags: [C, Fortran, Scientific Computing, Numerical Computing, LAPACK, BLAS]
comments: false
toc: false
---

&emsp;&emsp; Me: "Can you show me some examples using complex number in C language and use LAPACK library? and not use lapacke.h ?"
Gemini: "LAPACK functionality is typically accessed through the lapacke.h header, which provides a C interface to the underlying Fortran routines.  Unfortunately, directly using the Fortran LAPACK routines from C can be challenging due to mismatched data types and calling conventions."
Me: "😞"
<!-- more -->




[^1]: 樊哲勇 (2020). *CUDA 编程: 基础与实践*. 清华大学出版社.

[^2]: Tuomanen, B. (2018). *Hands-On GPU Programming with Python and CUDA: Explore high-performance parallel computing with CUDA*. Packt Publishing Ltd.
