---
layout: post
title: 用CUDA画Mandelbrot图
date: 2023-09-27
Author: Yanfei Tang
tags: [C]
comments: false
toc: false
---

&emsp;&emsp; CUDA是目前比较流行的高性能计算的开发工具之一，这种编程模式涉及了CPU+GPU的异构计算。
<!-- more -->

我花了一些时间来阅读CUDA编程的两本书，一本是樊哲勇的《CUDA 编程：基础与实践》（书A），一本是Brian Tuomanen的《GPU编程实战：基于Python和CUDA》（书B）。这篇博客的主要内容是将书A中的CUDA C编程应用于书B的案例，采用的案例就是Manderbrot图。

首先，先说明一下产生Manderbrot集合的算法。对于给定的复数，$c$，定义循环序列

$$
z_0 = 0, \quad n = 0 \\
z_n = z_{n-1}^2 + c, \quad n \ge 0
$$

当 $n$ 趋向于无穷大是，$\|z_n\|$ 的上界为2，那么我们定义复数 $c$ 是Manderbrot集合的成员。为了找到了这样的集合，我们可以设计如下的算法[^1]，

```python
def simple_mandelbrot(width, height, real_low, real_high, imag_low, imag_high, max_iters, upper_bound):
    
    real_vals = np.linspace(real_low, real_high, width)
    imag_vals = np.linspace(imag_low, imag_high, height)
        
    # we will represent members as 1, non-members as 0.
    
    mandelbrot_graph = np.ones((height,width), dtype=np.float32)
    
    for x in range(width):
        
        for y in range(height):
            
            c = np.complex64( real_vals[x] + imag_vals[y] * 1j  )            
            z = np.complex64(0)
            
            for i in range(max_iters):
                
                z = z**2 + c
                
                if(np.abs(z) > upper_bound):
                    mandelbrot_graph[y,x] = 0
                    break
                
    return mandelbrot_graph
```

上面是一个简单的串行的程序，下面我们将用CUDA C改写称为一个高性能的CUDA程序。一个典型而简单的CUDA程序结构具有如下的形式：

```C
int main(void)
{
    // 主机代码
    // 核函数调用
    // 主机代码
    return 0;
}

__global void func_from_gpu()
{
    // 核函数代码
}
```

主机（Host）代码包含从主机传输数据到设备（device）的代码。


[^1]: Tuomanen, B. (2018). *Hands-On GPU Programming with Python and CUDA: Explore high-performance parallel computing with CUDA*. Packt Publishing Ltd.