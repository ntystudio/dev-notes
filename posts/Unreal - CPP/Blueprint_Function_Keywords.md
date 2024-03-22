---
title: "Blueprint Function Keywords"
subtitle: "An overview of the BlueprintCallable, BlueprintPure, BlueprintNativeEvent, and BlueprintImplementableEvent function specifiers in Unreal Engine."
date: "2024-03-14"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_blueprint_native_event_function_specifier.png"
tags: "unreal, cpp, metadata, blueprint"
---

Unreal provides a list of function specifiers you can use to expose native code to blueprints:
- `BlueprintCallable`
- `BlueprintPure`
- `BlueprintNativeEvent`
- `BlueprintImplementableEvent`

All function specifiers are inserted within the `UFUNCTION(...)` macro above a function declaration.

```cpp
UFUNCTION(BlueprintCallable, Category="Defaults")
TArray<FName> GetMaterialParameterNames() const;
```

Multiple function specifiers can be used for additional behavior, though not all are compatible with one another.

```cpp
// alllowed - a function can both  be callable and pure
UFUNCTION(BlueprintCallable, BlueprintPure, Category="Defaults")
TArray<FName> GetMaterialParameterNames() const;

// error - A function cannot be both a BlueprintNativeEvent and BlueprintImplementableEvent
UFUNCTION(BlueprintCallable, BlueprintNativeEvent, BlueprintImplementableEvent, Category="Defaults")
TArray<FName> GetMaterialParameterNames() const;
```

---

# `BlueprintCallable` specifier
This specifier marks a function as callable from within Blueprint. Use `BLueprintCallable` when you want to allow Blueprints to execute a C++ function.

```cpp
UFUNCTION(BlueprintCallable, ...)
TArray<FName> GetMaterialParameterNames() const;
```

---

# `BlueprintPure` specifier
This specifier indicates that the function does not modify the state of the object (hence the name "Pure") -- it only returns a value based on its inputs.

`BlueprintPure` does not require an execution pin to be called. It is often used for functions where you're retrieving data or performing read-only operations.

```cpp
UFUNCTION(BlueprintCallable, BlueprintPure, ...)
TArray<FName> GetMaterialParameterNames() const;
```

![blueprint pure function specifier node](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_blueprint_pure_function_specifier.png)

---

# `BlueprintNativeEvent` specifier
This specifier allows you to provide a default implementation of a function in C++, which you can then optionally override in Blueprints.

```cpp
// cleanable.h
UFUNCTION(BlueprintCallable, BlueprintNativeEvent)  
bool CanBeCleaned();

// cleanabale.cpp
bool UCleanable::CanBeCleaned_Implementation()  
{  
    const FGameplayTagContainer PlayerTags = ULittleTrekkerGameInstanceState::Get(this)->GetGameplayTags();  
    if (PlayerTags.HasAll(RequiredTagsToClean))  
    {       
	    return true;  
    }
    return false;  
}
```

> Take note of the `_Implementation` suffix at the end of the function name, which is required by Unreal to comply with the `BlueprintNativeEvent` specifier.

![blueprint native event function specifier node](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_blueprint_native_event_function_specifier.png)

---

# `BlueprintImplementableEvent` specifier
This specifier allows you to declare a function and define its signature in C++, but require that it be implemented in Blueprint.

Since Unreal knows the function implementation will be handled in Blueprint, there is no need to generate a function definition in the `.cpp` file.

We use `BlueprintImplementableEvent` in scenarios where the implementation details are expected to vary significantly across different blueprints.

```cpp
// worldwidget.h
UFUNCTION(BlueprintImplementableEvent, BlueprintCallable, Category="WorldWidget")  
void OnActorChange(AActor* Actor);
```

![blueprint implementable event function specifier node](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_blueprint_implementable_event_function_specifier.png)

---

### Reference Links
- [UE Docs - Exposing Gameplay Elements to Blueprints](https://docs.unrealengine.com/4.27/en-US/ProgrammingAndScripting/Blueprints/TechnicalGuide/ExtendingBlueprints/)

---

### Backlog
N/A