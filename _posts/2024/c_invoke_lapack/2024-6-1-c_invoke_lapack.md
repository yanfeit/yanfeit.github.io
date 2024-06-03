---
layout: post
title: Invoke BLAS/LAPACK compiled Fortran library in C
date: 2024-06-01
Author: Yanfei Tang
tags: [C, Fortran, Scientific Computing, Numerical Computing, LAPACK, BLAS]
comments: false
toc: false
---

Me: "Can you show me some examples using complex number in C language while using LAPACK library?  Please don't use lapacke.h."

Gemini: "LAPACK functionality is typically accessed through the lapacke.h header, which provides a C interface to the underlying Fortran routines.  **Unfortunately, directly using the Fortran LAPACK routines from C can be challenging due to mismatched data types and calling conventions.**"

Me: "😞"
<!-- more -->

&emsp;&emsp; This conversation between me and Gemini took place while I was trying to write a computational lithography program in C language. I considered using BLAS and LAPACK routines from Fortran in our C program because we already had compiled Fortran libraries (`libblas.a` and `liblapack.a`) on our special supercomputer. Obviously, we do not want to rewrite some matrix solvers by ourselves. I asked Gemini for help, but its response lacked satisfactory results or examples. Therefore, we have to 'inform' Gemini, our AI assistant, that the task is challenging but feasible with some effort. Hopefully, Gemini or other large language models (LLM) will improve their responses and provide more examples in the future. If you don't have the time to read the rest, you can directly refer the [**repository**](https://github.com/yanfeit/BlasLapackTest) to check some worked cases. Before I did this, I tried my best to find helpful resources. I found three particularly useful posts: one[^1] written by computational physicist Rubin H. Landau from Oregon State University, another[^2] written by Professor Nelson H. F. Beebe from University of Utah from a point view of mixed language programming, and a third piece[^3] written by Professor Carleton Detar also from University of Utah. To my knowledge, it still requires some efforts to collect all things together and make it out. 

To successfully invoke LAPACK routines in C, we need to understand two things: the language difference between C and Fortran and the compiling steps in a Linux system. 

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

To avoid warnings, you need to declare function prototypes in C before using Fortran routines.  Experienced software engineers often treat compiler warnings as errors. In C, declaring a function prototype is straightforward. Here's an example: 
```c
extern void sgesv_(int*, int*, float*, int*, int*, float*, int*, int*);
```
Please add an underscore `_` afther the Fortrain routine name. In C++ language, you can do such as, `extern "C" {extern void sgesv_(int*, int*, float*, int*, int*, float*, int*, int*);};` to let the compiler know it should compiler as C.

### 1.3 Storage order in C and Fortran

Scientific computing heavily relies on matrices, and Fortran offers a more convenient way to work with them compared to C. Despite a large scientific computing community and significant demand, C still lacks a native multidimensional array library. 

**Performance and Memory:**

The C data order is *row-major*, meaning it's faster to access elements across a row than down a column. This is because row data is stored contiguously in memory. In contrast, Fortran uses *column-major* order, where accessing elements down a column is faster. You can see a visual representation in Fig[^4].

**Index Starting Point:**

Another key difference is the starting index for arrays: Fortran starts at 1, while C starts at 0.

<p align="center">
   <img src="/images/2024/major_order.jpg" alt="drawing" align="middle"/>
   <em>Fig. Storage order in C and Fortran</em>
</p>

### 1.4 Misc

While post[^2] details other differences between C and Fortran, they may not be directly relevant to calling LAPACK routines in C. Focusing on the key points mentioned earlier (data type conversion, function declaration, data order) would be enough for readers.

## 2. Compile and link LAPACK lib

The compilation of LAPACK and BLAS library by gfortran or other compilers can be found in [LAPACK development repository](https://github.com/Reference-LAPACK/lapack). Readers can follow the guide to have LAPACK and BLAS libraray installed. I had my installation directory in `/opt/` folder. You will see `liblapack.a` and `libblas.a` in the folder after installation.

Once you have the Fortran library installed, you can compile and link the LAPACK libray as follows,

```bash
CC=gcc
CFLAGS=-g -Wall -I ../
LDFLAGS=-L /opt/lapack/lib/  # I have my lib in /opt/lapack/lib folder.
LD=-llapack -lblas -lm -lgfortran   # also add -lm -lgfortran, I use GNU gfortran as my Fortran compiler.

# LAPACK FUNCTIONS
sgesv:
	$(CC) $(CFLAGS) $(LDFLAGS) -c test_sgesv.c -o test_sgesv.o
	$(CC) $(CFLAGS) $(LDFLAGS) test_sgesv.o -o test_sgesv $(LD)
	./test_sgesv
```

## 3. Examples

To conclude, this post provides a practical example that has been successfully tested on Ubuntu Desktop and WSL2 using gcc and gfortran compilers.

```c
#include <stdio.h>
#include <stdlib.h>
#include <complex.h>
#include <float.h>
#include <math.h>
#include "funs.h"

// https://numericalalgorithmsgroup.github.io/LAPACK_Examples/examples/doc/zgeev_example.html
// ZGEEV computes the eigenvalues and, optionally, the left and/or right eigenvectors for GE matrices

int main()
{
    char jobvl='N';  // 'N': left eigenvectors of A are not computed.
    char jobvr='V'; // 'V' : right eigenvectors of A are computed.

    int n = 4;
    double complex A[16] = {-3.97-5.04*I, 0.34-1.5*I, 3.31-3.85*I, -1.1+0.82*I,
                            -4.11+3.7*I, 1.52-0.43*I, 2.5+3.45*I,   1.81-1.59*I,
                            -0.34+1.01*I, 1.88-5.38*I, 0.88-1.08*I, 3.25+1.33*I,
                            1.29-0.86*I, 3.36+0.65*I, 0.64-1.48*I, 1.57-3.44*I};  // on exit, A has been overwritten!
    int lda = 4;
    double complex w[4]; // w contains the complex eigenvalues
    complex double vl[4*4];  // left eigenvector , if jobvl='N' then not referenced.
    int ldvl = 4;    // leading dimension of the array vl
    complex double vr[4*4]; // right eigenvector, 
    int ldvr = 4;   // leading dimension of the array vr
    complex double work[8];
    int lwork = 8;
    double rwork[8];
    int info;

    zgeev_(&jobvl, &jobvr, &n, A, &lda, w, vl, &ldvl, vr, &ldvr, work, &lwork, rwork, &info);

    if (info == 0)
    {
        printf("successful exit!\n");
    }
    else{
        printf("info : %d", info);
    }

    printf("\n");

    for (int i = 0; i < n; i++)
    {
        printf("%dth Eigenvalue : (%f, %f)\n", i,  creal(w[i]), cimag(w[i]));
        printf("\n");
        printf("%dth Eigenvector : \n", i);

        for (int j= 0; j < n; j++)
        {
            int idx = i*n+j;
            printf("(%f, %f)\n", creal(vr[idx]), cimag(vr[idx]));
        }

    }

    return 0;
}
```

In the `funs.h`, you declare the function as follows,
```c
#ifndef __FUNS_H__
#define __FUNS_H__

#include "complex.h"
extern void zgeev_(char* jobvl, char* jobvr, int* n, double complex* A, int* lda, double complex* w, double complex* vl, int* ldvl, double complex* vr, int* ldvr, double complex* work, int* lwork, double* rwork, int* info);
#endif
```
More examples can be found at [repository](https://github.com/yanfeit/BlasLapackTest). Tests is strongly suggested and you can find more examples to be tested in NAG [repository](https://github.com/numericalalgorithmsgroup/LAPACK_examples).


[^1]: https://www.math.utah.edu/software/c-with-fortran.html

[^2]: https://sites.science.oregonstate.edu/~landaur/nacphy/lapack/cprog.html

[^3]: https://web.physics.utah.edu/~detar/phys6720/handouts/fortran_binding.html

[^4]: https://www.intel.com/content/www/us/en/docs/onemkl/developer-guide-windows/2023-0/call-lapack-blas-and-cblas-from-c-language-env.html
