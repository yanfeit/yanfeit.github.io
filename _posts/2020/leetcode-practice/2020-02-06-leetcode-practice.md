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
2. asfdsf
3. asdfdasf
4. afdsf

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

