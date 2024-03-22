---
title: "Const and Const Correctness"
subtitle: "Understanding the const qualifier and the idea behind applying const correctness to code."
date: "2024-03-13"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "code concepts, cpp"
---

`const` is a keyword we can use to make variables "constant", meaning their values can not be changed after initialization. We can also use `const` for pointers, function parameters and member functions.

The use of `const` is as much about properly documenting the intention behind our code as it is enforcing program safety.

---

# Const Correctness
The idea behind `const` correctness is to more clearly express the intent of our code to anyone reading it (compiler included).

Guidelines
- Use `const` with variables that should not be modified after initialization
- Pass function parameters as `const` references if the functions do not need to modify them
- Declare member functions as `const` if they do not modify the object on which they are called

Use `const` as often as possible to inform the reader (and compiler) that the value being passed as a variable, pointer, function parameter, or member function will not be modified or mutated in any way.

---

# `const` Variables

Below we have two values, where one has the `const` qualifier and the other does not.

```cpp
int Foo = 5; // non-const
const int Bar = 22; // const
```

From this declaration alone, we know (as does the compiler) that `Foo` can be modified, but `Bar` is meant to be a read-only value.

If we attempted to reassign the value of `Foo`, the compiler would allow it:

```cpp
Foo = 8; // allowed
```

But if we attempted to reassign the value of `Bar`, the compiler would complain that the value can't be reassigned because it is read-only.

```cpp
Bar = 32; // error, can not mutate a read-only value
```

This practice helps to document to anyone reading the code the programmer's intent behind the use of the variable.

---

# `const` Function Parameters

We can also qualify function parameters as being `const`, telling us (and the compiler) which values are mutable and which are immutable.

The function below takes 3 parameters, with two marked as `const`. 

```cpp
void ModifyValues(string NewValX, const int NewValY, const float NewValZ)
{
	NewValX = "new string value"; // allowed
	NewValY = 10; // error, can not mutate a read-only value
	NewValZ = 3.4f; // error, can not mutate a read-only value
}
```

The function scope does not allow `ValY` or `ValZ` to be mutated because of the `const` qualifier, no matter the values passed in.

This strict enforcement also applies when a non-const value is passed into a `const` qualified function parameter.

```cpp
string ValX = "original string value"; // non-const
int ValY = 5; // non-const
const float ValZ = 1.0f; // const

void ModifyValues(string NewValX, const int NewValY, const float NewValZ)
{
	NewValX = "new string value"; // allowed
	NewValY = 10; // error; can not mutate a read-only value
	NewValZ = 3.4f; // error, can not mutate a read-only value
}
```

In the example above, although `int ValY = 5;` is a non-const variable, the `const` qualifier in the `ModifyValues()` function prevents the value within the function scope from being mutated.

---

# `const` Member Functions
We can also qualify member functions as `const` which guarantees that the function will not mutate the state of the object (`this`) when called.

```cpp
void ModifyValues() {} // non-const member function
void GetValues() const {}  // const member function
```

When a member function is qualified as `const`, this does mean the `const` member function is not allowed to call a non-const member function.

```cpp
void ModifyValues() {} // non-const member function
void TryToGetCurrentValues() const {}

void GetValues() const // const member function
{
	ModifyValues(); // error, const function can not call non-const function
	TryToGetCurrentValues(); // allowed
}
```

---

### Link References
- [Mike Shah - `const` Correctness with Member Functions](https://www.youtube.com/watch?v=wiI-sWxBZ5s)
- [Kotaku - The Exceptional Beauty of Doom 3's Source Code](https://web.archive.org/web/20131211065348/https://kotaku.com/454293019#ftn.id003)

---

### Backlog
- [ ] Cover using `const` with pointers (pointers to `const` and `const` pointers)