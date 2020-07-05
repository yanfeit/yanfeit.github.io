---
layout: post
title:  Pass Functor to Functions in C++
date: 2020-07-05
Author: Yanfei Tang
tags: [C++]
comments: false
---

Practical algorithm generically applies to a group of functions. For example, It is typical that an integration routine can take different functions as input. Because of the popular usage, this technique should be taught in any modern C++ class. This blog will guide you about how to pass a function to a routine in C++. The material is taken from my favourite reference book *Numerical Recipes*[^1]. 

<!-- more -->

Suppose you have other parameters to pass through in the calling problems, in a non-OOP program it is very bothering for you to do that. You can check the source code and manual of *GNU Scientific Libray* to see how people do that. One of my repositories about differential evolution code also tells you how to do that, you are welcome to check the code, [Portal](https://github.com/yanfeit/DifferentialEvolution). In a modern OOP program, there is a better solution.

C++ provides an elegant way to pass function to the routine: *function object* or *functor*. Below we can define a function, such as $f(x) = cx^p$, where $c$ and $p$ are communicated from somewhere else in your program.

```c++
class Functor
{
public:
	double c, p; // other parameters 
	Functor(const double cc, const double pp) : c(cc), p(pp) {} // constructor
	~Functor(){} // destructor
	
    // The operator () will be overloaded to evaluate the funciton
	double operator()(const double x)
	{
		return c * pow(x, p);
	}
  
    // Other helper function
    double dx(const double x)
    {
  	    return c * p * pow(x, p-1);
    }
};
```

In the calling program, we can declare an instance of $\text{Functor}$ by

```c++
Functor h(2.0, 2.0);
//  Compute f(x) = 2.0 * x^2 when x = 4.0
cout << h(4.0) << endl;
cout << h.dx(4.0) << endl;
```

Clearly, you can add other helper function to the $\text{Functor}$, for example, the derivative of the function.

We can make a *templated* function to accept the functor by declaring

```c++
template <class T>
double SomeFunction(T &func, const double a){
	// Surely, you can make the function much more complicated!
	return func(a);
}
```

It is easy to call the routine **SomeFunction** by

```c++
cout << SomeFunction<Functor>(h, 1.0) << endl;
```

Now, what about if we want to pass the **Functor** to an object? For example, if we want to integrate the function as $\int_{a}^{b} f(x)$, we can declare such integral method as a class like the following,

```c++
class Quadrature
{
public:
	virtual double next() = 0;
	int n;
};

template <class T>
class Trapzd : public Quadrature
{
public:
	double a, b, s;
	T &func;
	Trapzd(){};
	Trapzd(T &funcc, const double aa, const double bb) : func(funcc), a(aa), b(bb) { n = 0; }

	double next()
	{
		double x, tnm, sum, del;
		int it, j;
		n++;
		if (n == 1)
		{
			return (s = 0.5 * (b - a) * (func(a) + func(b)));
		}
		else
		{
			for (it = 1, j = 1; j < n - 1; j++)
				it <<= 1;
			tnm = it;
			del = (b - a) / tnm;
			x = a + 0.5 * del;
			for (sum = 0.0, j = 0; j < it; j++, x += del)
				sum += func(x);
			s = 0.5 * (s + (b - a) * sum / tnm);
			return s;
		}
	}
};
```

And in the calling program, we create an instance of the object **Trapzd** by 

```c++
Trapzd<Functor> a(h, 1.0, 2.0);
cout << a.next() << endl;
```


[^1]: William H. Press, Saul A. Teukolsky, William T. Vetterling, Brian P. Flannery; *Numerical Recipes the Art of Scientific Computing* Cambridge University Press (2007) 3rd, pp 21 and pp 162.

