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

This conversation between me and Gemini happened when our team tried to write a computational lithography program in C language. The consideration of invoking BLAS and LAPACK routine in Fortran in a C program is we already have a compiled Fortran library of `libblas.a` and `liblapack.a` dynamic library in our special supercomputer. Surely, we don't want to rewrite some matrix solvers by ourselves. Therefore, we have to 'inform' Gemini, our AI assistant, that the task is challenging, but feasible with some work. Hopefully, Gemini or other GPT models will modify their answer and prompt more examples in future. If you don't have the time to read the rest, you can directly refer the [repo](https://github.com/yanfeit/BlasLapackTest) to some worked cases. Before I did this, I tried my best to find some material to help me. I found two posts very useful, one[^1] is wrote by computational physicist Rubin H. Landau from Oregon state university and another one[^2] is wrote by Professor Nelson H. F. Beebe from Utah university from a point view of mixed language programming. Still, to my best knowledge, it still requires some efforts to collect all things together and make it out. 

# Difference 

# Compiling

# Examples



[^1]: https://www.math.utah.edu/software/c-with-fortran.html

[^2]: https://sites.science.oregonstate.edu/~landaur/nacphy/lapack/cprog.html
