---
layout: post
title: Statistical Methods from Bill Press
date: 2021-10-24
Author: Yanfei Tang
tags: [math]
comments: true
---

&emsp; This note is about Bill Press's [*Opinionated Lessons in Statistics*](http://wpressutexas.net/coursewiki/index.php?title=Main_Page). Half of my knowledge about statistics is learnt from his and his colleagues' book numerical recipes. The book itself is a big chunk of reference book about computational algorithms (warning, knowledge weighs in pounds).  Bill's course focus is on the statistical methods part of the book. Needless to say, it is a masterpiece of introduction about statistics.  

<!-- more -->

# 1. Probability

&emsp; There exists two schools of interpretation of probability in mapping from axiomatic probability theory to the real world, Bayesian and Frequentist. Both holds viewpoints that *There is this thing called probability. It obeys the laws of an axiomatic system. When identified with the real world, it gives (partical) information about the future.* However, Bayesian goes further, it aslo states that *And, it gives a consistent and complete calculus of inference*. 

&emsp; It is always good to introduce some history about the development of science. R. T. Cox (1946) showed that reasonable assumptions about "degree of belief" uniquely imply the axioms of probability (and Bayes). The Axioms:

1. $P(A) \ge 0$ for an event $A$
2. $P(\Omega) =1$ where $\Omega$ is the set of all possible outcomes
3. if $A \cap B = \emptyset$, then $P(A \cup B) = P(A) + P(B)$



&emsp; With the axioms, we can develop theorem by Venn diagram cheatly as physicists. 

The Laws:

1. Law of Or-ing: $P(A \cup B) = P(A) + P(B) - P(AB)$
2. Law of Exhaustion: If $R_i$ are  exhaustive and mutually exclusive (EME) , then $\sum_i R_i = 1$. 
3. Law of And-ing: $P(AB) = P(A)P(B\|A)=P(B)P(A\|B)$
4. Independence: Events $A$ and $B$ are independent, if $P(A\|B) = P(A)$， so $P(AB) = P(B)P(A\|B) = P(A)P(B)$. 
5. Law of de-Anding: $H_i$ are EME, then $P(B) = \sum_{i} P(B\|H_i)P(H_i)$. 



# 2. Bayes

&emsp; Bayes Theorem:


$$
\begin{array} PP(H_i \| B) &= \frac{P(H_i B)}{P(B)} \\ &= \frac{P(B\| H_i)P(H_i)}{\sum_j P(B\|H_j) P(H_j)} \end{array}
$$


We usually write this as $P(H_i \| B) \propto P(B \| H_i) P(H_i)$, where $P(H_i \| B)$ is called posterior probability, $P(H_i)$ is prior probability and evidence is $P(B \| H_i)$. This gives the question that "What is the probability of an hypothesis, given the data?". 

&emsp;Commutivity/Associativity of Evidence: $P(H_i \| D_1 D_2) \propto P(D_1 D_2 \| H_i) P(H_i)$.



# 3. Monty Hall

&emsp; Example: In the entertainment show, the guest can open one of three doors. There is a car behind one of them. The host Monty Hall opens one of the other doors, always revealing no car (he knows where it is). The guest now gets to switch the door, should he?

&emsp; Reason: $H_i$ is the hypothesis that the car is behind the door $i$.  With loss of generality, assume the guest will open the door 2. With loss of generality, assume Monty opens the door 3. $P(H_i \| O_3)$ is the care is behind the door i given the evidence that Monty opens the door 3. We then compute it according to Bayes theorem, $P(H_i \| O_3) \propto P( O_3 \| H_i) P(H_i)$  . 

$P(H_1 \| O_3) \propto P( O_3 \| H_1) P(H_1) = 1 * 1/3 = 1/3 $ .

$P(H_2 \| O_3) \propto P( O_3 \| H_2) P(H_2) = 1/2 * 1/3 = 1/6 $ .

$P(H_3 \| O_3) \propto P( O_3 \| H_3) P(H_3) = 0 * 1/3 = 0 $ .

Therefore, the chance (posterior probability) that the car is hehind the other door actually doubles. 

 

# 4. Jailer's Tip

&emsp; The Jailer's Tip: 

- Of 3 prisoners (A, B, C), 2 will be released tomorrow. 

- A, who thinks he has a 2/3 chance of being released, asks jailer for name of one of the lucky - but not himself.

- Jailer says, truthfully, 'B'.

- 'Darn,' thinks A, 'now my chances are only 1/2, C or me'. 

$P(S_B \| BC)= x, (0 \le x \le 1)$ , This represents the evidence that B and C will be released that the jailer say 'B'. If $x= 1/2$ means the jailer is indifferent about responding 'B' versus 'C'. 

$P(A \| S_B) = \frac{1}{1+x}$ by Bayes theorem. 

* When a model has unknown, or uninteresting, parameters we "integrate them out" --> "Marginalization"

$P(A \| S_B I) = \int_x P(A \| S_B x I) p(x \| I) dx$





