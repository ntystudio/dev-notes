---
title: "Using static Variables And Functions"
subtitle: "The static keyword and its use for variables and functions in Unreal Engine C++"
date: "2024-02-26"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_blueprint_pure_function_specifier.png"
tags: "cpp, code concepts"
---

The `static` keyword provides utility for both variables and functions. 

At a high level, `static` variables are used for shared data or shared state, while `static` member functions are used to provide functionality that is not dependent on the state of a specific class instance.

---

# `static` Variables
`static` variables are associated with a class rather than any individual instance of the class, meaning there is only (and ever) one copy of a static variable shared by all instances of the class.

Regardless of how many objects you create, they will all access the same `static` variable. The `static` variable will only be initialized once.

We use static variables to store class-level data that needs to be shared among all instances of a class, or to maintain state information that is common to all objects of that class.

The `static` variable is declared in the header and must be initialized in the `.cpp` file outside of the class constructor.

```cpp
// mygameutils.h 
class MyGame_API UMyGameUtils : public UBlueprintFunctionLibrary
{ 
	// ...
public: 
	static int StaticVariable; // static variable declaration
};

// mygameutils.cpp
int UMyGameUtils::StaticVal = 10;
```

---

# `static` Functions
`static` functions belong to the class rather than any specific instance of the class. They can be called from anywhere in your application using the class name without needing to create an instance of the class.

Since `static` member functions do not operate on an instance of the class though, this means they can only access static variables or other static member functions -- they can not access instance variables or instance member functions because they do not operate on an object of the class.

```cpp
// utils.h
UFUNCTION(BlueprintCallable, BlueprintPure, DisplayName = "Get Bioroid Player Controller")  
static ABioroidPlayerController* GetBioroidPlayerController(AActor* Actor);
```

---

### Link References
- [CPP Reference - Static Members](https://en.cppreference.com/w/cpp/language/static)

---

### Backlog
N/A