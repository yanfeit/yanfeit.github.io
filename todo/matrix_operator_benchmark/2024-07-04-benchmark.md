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

#### Start A Downloading Server

```python
python -m http.server
```
This will start a server for collegues who want to downloading files.


[^1]: https://medium.com/rapids-ai/single-gpu-cupy-speedups-ea99cbbb0cbb

[^2]: https://docs.cupy.dev/en/stable/user_guide/performance.html

[^3]: https://pytorch.org/tutorials/recipes/recipes/benchmark.html

[^4]: https://pytorch.org/tutorials/recipes/recipes/profiler_recipe.html