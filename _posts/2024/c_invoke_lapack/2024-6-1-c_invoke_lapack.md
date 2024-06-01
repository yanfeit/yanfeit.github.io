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

Gemini: "LAPACK functionality is typically accessed through the lapacke.h header, which provides a C interface to the underlying Fortran routines.  **Unfortunately, directly using the Fortran LAPACK routines from C can be challenging due to mismatched data types and calling conventions.**"

Me: "😞"
<!-- more -->

This conversation between me and Gemini happened when our team tried to write a computational lithography program in C language. The consideration of invoking BLAS and LAPACK routine in Fortran in a pure C program is we already have a compiled Fortran library of `libblas.a` and `liblapack.a` dynamic library in our special supercomputer. Surely, we don't want to rewrite some matrix solvers by ourselves. Therefore, we have to 'inform' Gemini, our AI assistant, that the task is challenging, but feasible with some work. Hopefully, Gemini or other GPT models will modify their answer and prompt more examples in future. 




[^1]: 樊哲勇 (2020). *CUDA 编程: 基础与实践*. 清华大学出版社.

[^2]: Tuomanen, B. (2018). *Hands-On GPU Programming with Python and CUDA: Explore high-performance parallel computing with CUDA*. Packt Publishing Ltd.
