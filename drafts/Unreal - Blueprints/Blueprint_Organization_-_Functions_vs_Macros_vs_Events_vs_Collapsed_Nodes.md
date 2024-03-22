---
title: "Blueprint Organization - Functions vs Macros vs Events vs Collapsed Nodes"
subtitle: "Learn about the different options Unreal provides to help you organize your blueprint code with Functions, Macros, Events, and Collapsed Nodes."
date: "2024-02-26"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unreal, blueprint, code structure"
---

As a reminder that code structure with blueprints can quickly get out of hand, visit this site: [Blueprints from Hell](https://blueprintsfromhell.tumblr.com/).

Unreal gives us a few ways to manage complexity in blueprints as our project grows:
- Functions
- Macros
- Events
- Collapsed Nodes

---

# Functions
Functions encapsulate a set of actions or calculations that can be executed from various points within a Blueprint.

### Characteristics:
- Can have return values
- Can contain local variables
- Do not allow latent actions (like delays or timelines)
- Execution is immediate and blocking; the calling script waits until the function completes

> When to use Functions?
> 
> Functions are ideal for calculations or operations that need to return a value and where immediate execution (within a single frame) is required.

---

# Events
Events are triggers that start a chain of execution in a Blueprint. They are asynchronous and can be used to respond to gameplay events, user input, or other triggers.

### Characteristics:
- Cannot have return values
- Allow latent actions, such as delays and timelines
- Can be called from the command line
- Can be replicated, making them suitable for multiplayer games
- Execution is not immediate; events are placed on a task queue

> When to use Events?
> 
> Events are ideal for handling gameplay mechanics that do not require immediate feedback (within a single frame) and can be executed asynchronously.

functions Can be used as events; functions can have return values, events can have async code in them (this really determines whether you'll use an event or function because you can convert a function to an event and an event to a function)

if i'm outside of a blueprint and i want to call a function or event i can do so, but i can't call a macro or collapsed node

we can create multiple graphs

drag a wire to a function or event as an input to automatically generate the pin for it

with a macro, you can't see it externally - they're reusable but only within the one blueprint, however you can create blueprint macro libraries to reuse macros across any instance of the same type -- not even available in a subclass of a blueprint (I THINK) -- also mention blueprint function libraries to encapsulate but share them across different types of blueprints, or have them be callable from wherever - 



---

# Macros
Macros are reusable sets of nodes that can be inserted into Blueprints. They are expanded at compile time, meaning each instance of a macro is replaced by its underlying nodes during compilation.

### Characteristics:
- Can have arbitrary inputs and outputs, including execution wires
- Cannot contain certain elements like custom events due to potential ambiguity

> When to use Macros?
> 
> Macros are useful for code reuse within Blueprints, especially for common patterns or sequences of nodes.

---

# Collapsed Nodes
Collapsed Nodes are a way to visually simplify Blueprints by collapsing a selection of nodes into a single node. This is primarily for organizational purposes and does not affect the execution or reusability of the code.

### Characteristics:
- Can contain any type of node allowed in their context
- Are limited to encapsulation within a single Blueprint; they do not facilitate code reuse across Blueprints
- The contents of a collapsed node are duplicated if the collapsed node is copied and pasted

> When to use Collapsed Nodes?
> 
> Collapsed Nodes are best used for reducing visual clutter in complex Blueprints.

---

# Helpful Plugins for Organization
We repeatedly use these plugins on every project to help with blueprint organization:
- [Blueprint Assist](https://www.unrealengine.com/marketplace/en-US/product/blueprint-assist) (blueprint node auto-formatting)
- [Electronic Nodes](https://www.unrealengine.com/marketplace/en-US/product/electronic-nodes) (improved blueprint wiring between nodes)
- [Flat Nodes](https://www.unrealengine.com/marketplace/en-US/product/flat-nodes) (flattens Unreal's color gradients for more visual clarity)
- [Auto Size Comments](https://www.unrealengine.com/marketplace/en-US/product/auto-size-comments) (automatically resizes comment boxes to fit the nodes inside)

> These plugins will save you literal years of your time since you won't have to deal with reformatting nodes, reformatting wires, or resizing comment boxes ever again.

---

### Link References
- [Michael Noland - Managing Complexity in Blueprints](http://michaelnoland.com/managing-complexity-in-blueprints/)
- [UE Documentation - Collapsing Graphs](https://docs.unrealengine.com/5.3/en-US/collapsing-graphs-in-unreal-engine/)
- [UE Documentation - Creating Functions](https://docs.unrealengine.com/5.3/en-US/creating-functions-in-unreal-engine/)
- [UE Documentation - Making Macros](https://docs.unrealengine.com/5.3/en-US/making-macros-in-unreal-engine/)
- [UE Forums - Function vs Macro : What is better?](https://forums.unrealengine.com/t/function-vs-macro-what-is-better/39824)
- [UE Forums - Macros, Functions and Custom Events (nice commentary from PenguinTD)](https://forums.unrealengine.com/t/macros-functions-and-custom-events/4422/4)

---

### Backlog
- [ ] Expand on the use (in a separate document) of `BlueprintCallable`, `BlueprintNativeEvent`, `BlueprintImplementableEvent`, and `BlueprintPure` function specifiers in C++
- [ ] Write about function and event overrides in child classes
- [ ] Write about pass-by-value and pass-by-reference (in a separate document)
- [ ] Add an accompanying image (or GIF) for each code structure option above

