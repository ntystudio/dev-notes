---
title: "Back to Basics: Debugging"
subtitle: "A brief list of highlight quotes from the video: 'Back to Basics: Debugging in Cpp - Greg Law'."
date: "2024-03-24"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/greg-law-back-to-basics-debugging.png"
tags: "videos, cpp, debugging"
---

In this video, programmer Greg Law covers a two part lecture on general debugging advice and then specific debugging advice for C++ devs.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/qgszy9GquRs?si=xF2WhTpmW3TEkV8J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

The quotes below are concerned with the first ~15 minutes of the video which focused on general debugging advice:

### 1:26
> "There's two parts to programming: bugging and debugging. Typing it in and making it work."


### 1:55
> "Everyone knows that debugging is twice as hard as writing a program in the first place. So if you're as clever as you can be when you write it, how will you ever debug it? - Brian Kernighan"


### 2:20
> "Debug-ability is the limiting factor in how good we can make our software. Whatever your metric for good is, how fast it runs, how small it is, how quickly you can reduce. If you can make it twice as buggable, you can make it twice as good. To put it another way, you can't be a great programmer without being great at debugging.""


### 4:28
> "Let's just think about what we mean by debugging. So I write my code, I have a set of expectations, and reality diverges from those expectations at some point. And the job of  debugging is to track that back to the point of that Divergence."

### 5:10
> "So, two things, I think, make bugs hard. I said hard to fix here, really it's hard to find. Once we find them, then usually the fix is quite easy. First, is how long between the bug itself and you noticing - the longer that elapses, the harder it gets and the more state you have to track back through. The second is how repeatable it is."


### 10:00
> "So, the impossible happened, right? Well, except obviously, it's not impossible. The impossible can't happen. So generally, it's an assumption, right? An assumption is something that you don't realize you've made. So we want to unpick and try to find where that assumption is."


### 13:52
> "If you haven't tested it [the code], it doesn't work. And if, by some miracle, it does, and you haven't tested it, while it works today, as the code changes, that code, and the code around it, and the callers, and everything else — it will stop."


---

### Link References
- [Back to Basics: Debugging in Cpp - Greg Law - CppCon 2023](https://www.youtube.com/watch?v=qgszy9GquRs)

---

### Backlog
N/A 