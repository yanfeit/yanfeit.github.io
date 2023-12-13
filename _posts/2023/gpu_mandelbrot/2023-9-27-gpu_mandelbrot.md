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

我花了一些时间来阅读CUDA编程的两本书，一本是樊哲勇的《CUDA 编程：基础与实践》（书A）[^1]，一本是Brian Tuomanen的《GPU编程实战：基于Python和CUDA》（书B）[^2]。这篇博客的主要内容是将书A中的CUDA C编程应用于书B的案例，采用的案例就是Manderbrot图。

首先，先说明一下产生Manderbrot集合的算法。对于给定的复数，$c$，定义循环序列

$$
z_0 = 0, \quad n = 0 \\
z_n = z_{n-1}^2 + c, \quad n \ge 0
$$

当 $n$ 趋向于无穷大是，$\|z_n\|$ 的上界为2，那么我们定义复数 $c$ 是Manderbrot集合的成员。为了找到了这样的集合，我们可以设计如下的算法，

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

```c
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

主机（host）代码包含从主机传输数据到设备（device）的代码，这里说的设备就是GPU加速卡。核函数调用是使用设备进行数据计算。计算完毕后，就可以把数据从设备上拷贝回主机进行后处理和缓存释放。核函数的声明与定义必须被限定词 \_\_global\_\_ 修饰。以下是一个核函数的声明和定义的示例，

```c
__global__ void mandel(const double *real_vals, const double *imag_vals, int *mandelbrot_graph);

// 主机代码内的调用方式
mandel<<<grid_size, block_size>>>(d_real_vals, d_imag_vals, d_mandelbrot_graph);
```

主机代码调用核函数最大的特点就是一对三括号 `<<<grid_size, block_size>>>`，主要是告诉设备需要多少个线程和排列情况的。grid_size 是指网格大小，可以认为是线程块的个数，block_size 是指线程块大小，可以认为是每个线程块中的线程数，如图1所示。

<p align="center">
   <img src="/images/2023/gpu_mandelbrot/block.png" alt="drawing" style="width:600px;"/>
   <em>图. 1 CUDA线程块</em>
</p>

网格大小和线程块大小可以是三维的，可以在主机代码中采用结构体`dim3`定义三维的网格和线程块，例如，

```c
const int width = 512;
const int height = 512;
const int maxt = 32;
const dim3   grid_size(width/maxt, height/maxt, 1);
const dim3   block_size(maxt, maxt, 1);
```

在核函数定义中，内建变量只在核函数中有效。`gridDim`和`blockDim`是类型为`dim3`的变量，代表从主机代码传入的参数网格大小和线程块个数。`blockIdx`和`threadIdx`是类型为`uint3`的变量，代表网格的索引和线程的索引，并且满足如下的关系：
* blockIdx.x 的取值范围是从 0 到 gridDim.x - 1。
* blockIdx.y 的取值范围是从 0 到 gridDim.y - 1。
* blockIdx.z 的取值范围是从 0 到 gridDim.z - 1。
* threadIdx.x 的取值范围是从 0 到 blockDim.x - 1。
* threadIdx.y 的取值范围是从 0 到 blockDim.y - 1。
* threadIdx.z 的取值范围是从 0 到 blockDim.z - 1。

同时CUDA中对能够定义的网格大小和线程块大小做了限制。对于从开普勒和安培架构的GPU来说，网格大小在x、y和z这3个方向的最大允许值分别为 $2^{31}-1$ 、$65535$ 和 $65535$。而线程块的大小在x、y和z这3个方向的最大允许值分别为 $1024$ 、$1024$ 和 $64$，并且要求了总线程块的大小不能大于 $1024$。

[^1]: 樊哲勇 (2020). *CUDA 编程: 基础与实践*. 清华大学出版社.

[^2]: Tuomanen, B. (2018). *Hands-On GPU Programming with Python and CUDA: Explore high-performance parallel computing with CUDA*. Packt Publishing Ltd.
