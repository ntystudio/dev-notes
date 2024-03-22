---
title: "Using IsValid() for Object Validity Checks"
subtitle: "Using Unreal's templated pointer (TObjectPtr<>) instead of raw pointers in C++"
date: "2024-02-26"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unreal, cpp, code concepts"
---

Where possible, prefer to use `IsValid()` to check if an object exists.

```cpp
// foobar.h
UPROPERTY(...)
TObjectPtr<UMaterialInstance> FooMaterial;

// foobar.cpp
if (IsValid(FooMaterial)) { ... } // preferred validity check
if (FooMaterial) { ... } // standard validity check
```

While both approaches perceivably accomplish the same objective, there is a small nuance in how the checks are done.

---

# `if(Object)` vs `IsValid(Object)` Differences

When using the `if(Object)` check, Unreal only looks at whether the object being pointed to is not null. No further checks are performed on the object's state.

When using `IsValid(Object)` check, Unreal looks at no only whether the object being pointed to is not null, but further investigates if the object is in a valid state (i.e., the object has not been marked for garbage collection).

---

# Which Check to Use When?

In certain cases where I can be confident I will not have an object returned in an invalid state (ex: `FindComponentByClass<>()`, as it is a utility function provided by Unreal that does the extra validity checks itself before returning the object), I'll opt to use the faster `if(Object)` check.

Otherwise, I default to the `IsValid(Object)` check to err on the side of safety and reliability.

---

### Link References
N/A

---

### Backlog
N/A 