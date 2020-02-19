---
layout: post
title:  Leetcode Practice
date: 2020-02-06
Author: Yanfei Tang
tags: [data structure and algorithms]
comments: false
toc: true
---

This blog is continously under construction...

<!-- more -->

Here are some personal ideas about how to do *data structure and algorithms* problems: 
1. Do not rush to write codes, but write down thoughts on papers. 先把伪代码写在草稿纸上。

## Greedy

### Jump Game

Given an array of **non-negative integers**, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

**Example 1**:
```
Input:       [2,3,1,1,4]
Output:      true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2**:
```
Input:       [3,2,1,0,4]
Output:      false
Explanation: You will always arrive at index 3 no matter what. Its maximum
             jump length is 0, which makes it impossible to reach the last index.
```

Here are some thoughts about how to solve the problem:
1. It is always good to pay more attentions about the boundaries or **extreme cases**. First, If the array is empty, then the result should be False. Second, if the length of the array is 1, I am already sitting on the last index when the program starts. Therefore, the result is True. Third, if there is no 0 in the array, I can always step into the next element and the result should be True.
2. From the problem's description, game is over if I have zero steps and I am not at the last step. I can loop from the first and update my remaining steps if the current location can provide more steps for me.

Below is my answer which passes the test. 

```python
def canJump(self, nums):
    """
    :type nums: List[int]
    :rtype: bool
    """
    if len(nums) == 0:
        return False
    if len(nums) == 1:
        return True
    if not (0 in nums):
        return True
        
    n = len(nums)
    hold = 0
        
    for i in range(n-1):            
        hold = max(nums[i], hold)
        if hold <= 0:
            return False
        hold -= 1
            
    return True
```

## Dynamic Programming

1. 什么是动态规划？
2. 动态规划和递归的区别
3. 存在性的问题， 有多少解的问题， 最优解问题
4. 解题思路：（a）确定状态（b）转移方程（3）初始化（4）给出答案



## DFS

Given a binary tree, return the sum of values of nodes with even-valued grandparent.  (A grandparent of a node is the parent of its parent, if it exists.)

If there are no nodes with an even-valued grandparent, return 0.

这题可以使用二叉树的引索（index）的性质来解答。我们知道第1层根节点的引索是1，那么第2层的引索是2， 3，那么第3层的引索是4， 5， 6， 7，...， 第n层的引索是$[2^{(n-1)}, 2^n - 1]$，那么只要把引索整除4就可以得到上两层的节点的引索。

```python
def sumEvenGrandparent(root: TreeNode) -> int:
    res = 0
    even = set()
        
    def dfs(node, idx):
        if not node:
            return 
        if node.val % 2 == 0:
            even.add(idx)
        if idx // 4 in even:
            res += node.val 
        dfs(node.left, idx * 2)
        dfs(node.right, idx * 2 + 1)
        
    dfs(root, 1)
        
    return res
```

## BFS
## Matching Parenthesis problem
## Using Hash Tables
## Variables/Pointers manipulation
## Reverse linked list (duplicates , removing duplicates)
## sorting fundamentals (quicksort, mergesort)
## Recursion
## custom data structures (object oriented programming)




