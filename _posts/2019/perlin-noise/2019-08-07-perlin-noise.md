---
layout: post
title:  Perlin噪声和Python的ctypes
date: 2019-08-07
Author: Yanfei Tang
tags: [python, C, algorithm]
comments: false
---

最近在知乎上看了一篇关于用C加速Python的[短文](https://zhuanlan.zhihu.com/p/76058539)，受益匪浅。同时也受到启发，撰写此文作为以后的参考。

<!-- more -->

<p align="center">
   <img src="/images/2019/perlin-noise/cppnoise.gif" alt="drawing" align="middle"/>
</p>

作为Python的用户经常碰到的一个问题就是速度太慢，一般来说速度下降的一个主要原因是来自多重的for循环。如何给现有的Python代码加速其实是Python用户的一门必修课。比较熟悉numpy的用户，可以熟练地写成矩阵化操作，这样可以大大加速运行的效率。这和MATLAB里多用矩阵操作而少用for循环是一个道理。但往往我们中的大多数并没有高超的numpy技巧。即便是有，Python代码的阅读性可能反而会下降。就算退一步讲，写成了比较好的numpy的代码也未必会比C/C++的代码快。在不放弃Python语言的前提下，怎么用C语言来提速呢？方法有很多，前面的所指的[短文](https://zhuanlan.zhihu.com/p/76058539)已经给出了一个答案。这里我再用一个例子做一个简单的说明，希望对大家有所帮助。首先[代码](https://github.com/yanfeit/PerlinNoise)都可以取到。**注意本文中C代码内存没有释放，但执行没有问题。**

关于Perlin噪声，我就不详细介绍。简单地说来，Perlin噪声具有光滑性，自然性和随机性的特点。感兴趣的读者可以找到很多相关资料，在这里我推荐两个，[pvigier](https://github.com/pvigier/perlin-numpy)的GitHub site和[Adrian](https://flafla2.github.io/2014/08/09/perlinnoise.html)的博客。Pvigier的Perlin噪声是用numpy来实现的，读者如果对自己numpy的技巧深感自信，可以去阅读一下他写的代码。阅读他的代码之后，我们可以给自己两个问题：

1. 我是否可以写出这样高度矩阵化操作的numpy代码？
2. 是否我们遇到的所用问题都可以用numpy矩阵化的操作来解决？

我想读者心中可能也会犯嘀咕，确实，高度矩阵化的操作需要程序员有高超的numpy技巧。反正我自愧不如，认为我很难写出那样漂亮的代码。我们再来看看Adrian的博客，这是篇博客文中的上乘之作， 是关于Perlin噪声的一个详细介绍，配合C#来实现。我想大多数读者可能和我一样，对写成for循环的形式感到极度舒适。而阅读这样的代码我想读者们也是驾轻就熟吧。所以我首先制作了一个Perlin噪声的C代码，之后我们会使用ctypes来调用动态链接库的代码。

### 创建动态链接库

```bash
$ mkdir build
$ cd build
$ cmake ..
$ make
$ mv ./lib/libperlinNoise.dylib ../python # Move library to the python folder.
$ cd ../python
$ python caltime.py # compare the time usage of numpy and C code.
```

为了快速测试一下效果，读者可以尝试执行以上的代码。
用了make之后我们会在/build/lib目录下得到一个libperlinNoise.dylib的动态链接库文件，在这个库里面我们可以调用两个函数。它们的接口如下所示，

```c
// 你可以在./lib/PerlinNoise.h的文件中找到相应代码。
// 纯粹为了解释一下Float
#ifndef PRECISION
#define PRECISION 1
#endif
#if PRECISION==1
typedef float Float;
#else
typedef double Float;
#endif
// .....省略很多代码......
// lattice 是指生成梯度所在的格子的大小，x,y,z当然指的是方向
// res 是指resolution，解析度（像素）。这里我与Pvigier的定义是不同的。
Float* perlinNoise3D(int lattice_x, int lattice_y, int lattice_z, 
                     int res_x, int res_y, int res_z);
Float* perlinNoise2D(int lattice_x, int lattice_y, int res_x, int res_y);
```

两个函数返回的是指向Float的指针，我选用了单精度的浮点数也就是float。这里面有个需要注意的地方，函数切记不要返回指向一个超过二维数组的指针，其实根本就没有这样的定义，具体请看这个[帖子](https://stackoverflow.com/questions/43013870/how-to-make-c-return-2d-array-to-python?noredirect=1&lq=1)。有了libperlinNoise.dylib这个动态链接库之后，剩下的任务就交给Python了。以下是我的代码的一部分（借鉴了Pvigier的代码，在./python/cppnoise.py中可以找到相应的代码），


```python
# 我们所采用加速的方法，ctypes是build-in package
import ctypes
# 因为我们要返回指针，我觉得调用numpy下的这个包是我找到的比较简单可行的方法
from numpy.ctypeslib import ndpointer
# ...省略...其余的包的调用....

def octavePerlin2d(lattice, res, octaves = 1, persistence=0.5):

	# pass the dynamic library
	lib = ctypes.CDLL('./libperlinNoise.dylib')
	# get the 2d Perlin noise function
	perlinNoise2D = lib.perlinNoise2D
	# Need specify the types of the argument for function perlinNoise2D
	perlinNoise2D.argtypes = (ctypes.c_int, ctypes.c_int, 
                                  ctypes.c_int, ctypes.c_int)

	# This note is extremely useful to understand how to return a 2d array!
	# https://stackoverflow.com/questions/43013870/
        # how-to-make-c-return-2d-array-to-python?noredirect=1&lq=1
	# We can never pass a 2d array, therefore return 1d array in a C function
	perlinNoise2D.restype = ndpointer(dtype=ctypes.c_float, 
                                          shape = (res[0], res[1]))
	
	noise = np.zeros(res)
	frequency = 1
	amplitude = 1
	for _ in range(octaves):
		temp = perlinNoise2D(ctypes.c_int(frequency*lattice[1]), 
			ctypes.c_int(frequency*lattice[0]), 
			ctypes.c_int(res[1]), 
			ctypes.c_int(res[0]) )
		noise += amplitude * temp
		frequency *= 2
		amplitude *= persistence
	return noise
```

相比于[木盏](https://zhuanlan.zhihu.com/p/76058539)的函数，我这里相对来说复杂一点点。我们需要注意的是，我们得告诉函数传入的参数的类型和返回的类型和大小，这点至关重要。

```python
# 读取动态链接库，
lib = ctypes.CDLL('./libperlinNoise.dylib')
# 从句柄中拿到PerlinNoise2D的函数
perlinNoise2D = lib.perlinNoise2D
# 告诉函数传入参数的个数和类型
perlinNoise2D.argtypes = (ctypes.c_int, ctypes.c_int, 
                          ctypes.c_int, ctypes.c_int)
# 告诉函数返回的类型，是c_float。shape是optinal的。
perlinNoise2D.restype = ndpointer(dtype=ctypes.c_float, 
                                  shape = (res[0], res[1]))
# 调用的方法非常简单。
temp = perlinNoise2D(ctypes.c_int(frequency*lattice[1]), 
			ctypes.c_int(frequency*lattice[0]), 
			ctypes.c_int(res[1]), 
			ctypes.c_int(res[0]) )
```

在Python中调用动态链接库后得到的加速效果（当然我在C++用了单精度的float），读者可以自行修改成双精度去测试一下。

```bash
$ python caltime.py
2D noise, numpy time consuming:  0.08261830806732177
3D noise, numpy time consuming:  4.525643992424011
2D noise, cpp time consuming:  0.007184123992919922
3D noise, cpp time consuming:  0.1645211935043335
```

我们可以发现C语言的代码可以说快了将近10倍以上。

