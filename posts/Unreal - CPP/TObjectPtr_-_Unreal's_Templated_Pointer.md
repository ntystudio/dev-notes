---
title: "TObjectPtr<> - Unreal's Templated Pointer"
subtitle: "Using Unreal's templated pointer (TObjectPtr<>) instead of raw pointers in C++"
date: "2024-02-24"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unreal, cpp, code concepts"
---

With the release of Unreal 5, Epic began replacing their underlying classes to use templated pointers instead of raw pointers. 

`AActor* FooBar`  is now `TObjectPtr<AActor> FooBar`.

While the use of templated pointers is optional and has no effect in shipping builds, Unreal highly recommends its use for improved performance and compile times in editor builds.

The `TObjectPtr` adds dynamic resolution and access tracking in editor builds while performing identically to raw pointers in shipping builds.

---

# TObjectPtr Notes
As opposed to a raw pointer which requires `nullptr` initialization, the templated `TObjectPtr` ensures the pointer is initialized.

Since `TObjectPtr` is converted into a raw pointer for shipping builds, there is no performance penalty for using it.

While `TObjectPtr` can be used for local variables and function parameters, there is no apparent benefit for doing so compared to a single `*`. 

---

# Source Code Notes
TODOs left behind in source:

```cpp
@TODO: OBJPTR: Investigate TObjectPtr support for UFunction parameters. 

@TODO: OBJPTR: we want to permit lazy background loading in the future
else if (*LoadBehaviorMeta == "LazyBackground")
{ 
	LoadBehavior = EImportLoadBehavior::LazyBackground; 
} 

@TODO: OBJPTR: Need to find other options for solving this issue of placeholder classes during blueprint compile without forcing all imports to resolve always 

@TODO: OBJPTR: We should have a test that ensures that lazy loading of an object with an external package is handled correctly. ... and many more
```

---

### Link References
- [UE Documentation - TObjectPtr](https://docs.unrealengine.com/5.0/en-US/API/Runtime/CoreUObject/UObject/TObjectPtr/)
- [UE Forums - Why should I replace raw pointers with TObjectPtr](https://forums.unrealengine.com/t/why-should-i-replace-raw-pointers-with-tobjectptr/232781)

---

### Backlog
- [ ] Research the use of templated pointers in UFUNCTION
- [ ] Research "dynamic resolution" and "access tracking"