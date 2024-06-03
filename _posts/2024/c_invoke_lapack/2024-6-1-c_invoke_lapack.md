---
layout: post
title: Invoke BLAS/LAPACK compiled Fortran library in C
date: 2024-06-01
Author: Yanfei Tang
tags: [C, Fortran, Scientific Computing, Numerical Computing, LAPACK, BLAS]
comments: false
toc: false
---

Me: "Can you show me some examples using complex number in C language while not using LAPACK library?  Please neither use lapacke.h."

Gemini: "LAPACK functionality is typically accessed through the lapacke.h header, which provides a C interface to the underlying Fortran routines.  **Unfortunately, directly using the Fortran LAPACK routines from C can be challenging due to mismatched data types and calling conventions.**"

Me: "😞"
<!-- more -->

&emsp;&emsp; This conversation between me and Gemini happened when our team tried to write a computational lithography program in C language. The consideration of invoking BLAS and LAPACK routine in Fortran in a C program is that we already have a compiled Fortran library of `libblas.a` and `liblapack.a` dynamic library in our special supercomputer. Surely, we don't want to rewrite some matrix solvers by ourselves. I asked Gemini for assistance. However, it did not give a satisfied results nor examples. Therefore, we have to 'inform' Gemini, our AI assistant, that the task is challenging, but feasible with some work. Hopefully, Gemini or other GPT models will modify their answer and prompt more examples in future. If you don't have the time to read the rest, you can directly refer the [repo](https://github.com/yanfeit/BlasLapackTest) to some worked cases. Before I did this, I tried my best to find some material to help me. I found three posts very useful, one[^1] is wrote by computational physicist Rubin H. Landau from Oregon state university and another one[^2] is wrote by Professor Nelson H. F. Beebe from Utah university from a point view of mixed language programming. The third piece[^3] is wrote by Professor Carleton Detar also from Utah university. Still, to my best knowledge, it still requires some efforts to collect all things together and make it out. 

To successfully invoke LAPACK routines in C, we will need to do understand two things. One is the language difference between C and Fortran, another is the compiling steps in Linux system. 

## 1. Difference between C and Fortran

### 1.1 Data type onversion 
The data type in C must match the data type in Fortran. The following table lists the data type conversion,

| Fortran data type  |  C data type    | 
| :--:               | :--:            | 
|  character         |  char           |      
|  real              |  float          |      
|  double precision  |  double         |   
|  integer           |  int            |
|  complex           |  float complex  |
|  complex*16        |  double complex | 

C Standard committee included complex number arithmetic since C99. To use it, you will need `#include <complex.h>` the header file in your program.

### 1.2 C prototype declarations

You will need to declare function prototype in C before you use Fortran routines in order to avoid warnnings. I was told that some experienced software enigeers claim that they consider any compiler's warnings as errors. In C language, it is straightforward that you can declare a function such as, `extern void sgesv_(int*, int*, float*, int*, int*, float*, int*, int*);`. Please add an underscore `_` afther the Fortrain routine name.In C++ language, you can do such as, `extern "C" {extern void sgesv_(int*, int*, float*, int*, int*, float*, int*, int*);}` to know the compiler know it will do as C way.

# Compiling

# Examples



[^1]: https://www.math.utah.edu/software/c-with-fortran.html

[^2]: https://sites.science.oregonstate.edu/~landaur/nacphy/lapack/cprog.html

[^3]: https://web.physics.utah.edu/~detar/phys6720/handouts/fortran_binding.html
