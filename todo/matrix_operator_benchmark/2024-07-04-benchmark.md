---
layout: post
title: Benchmark of numpy/torch/CuPy's matrix operators on various Platforms
date: 2024-07-04
Author: Yanfei Tang
tags: [gpu, cpu, matrix operator, benchmark, torch, cuda]
comments: false
toc: false
---

&emsp;&emsp; 

<!-- more -->

#### Theoretical Performance for various GPU cards

Before we benchmark the some matrix operator, it is essential to have some sense about the performance of the GPU cards. Below is the theoretical performance for various GPU cards which I might have access to. I get the numbers from [thch power up](https://www.techpowerup.com/gpu-specs/a100-sxm4-80-gb.c3746).

|                     | FP32 single [TFLOPS] | FP64 double [TFLOPS] |
|---------------------|----------------------|----------------------|
| RTX 3060 12GB       | 12.74                | 0.199                |
| RTX 4070 12GB       | 29.15                | 0.455                |
| RTX A5000 24GB      | 27.77                | 0.434                |
| Telsa V100 DGX 32GB | 15.67                | 7.834                |
| A100 SXM4 80GB      | 19.49                | 9.746                |




[^1]: https://medium.com/rapids-ai/single-gpu-cupy-speedups-ea99cbbb0cbb

[^2]: https://docs.cupy.dev/en/stable/user_guide/performance.html

[^3]: https://pytorch.org/tutorials/recipes/recipes/benchmark.html

[^4]: https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html