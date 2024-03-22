---
title: "Unreal C++ Tips and Tricks"
subtitle: "A collection of tips and tricks we apply when writing C++ code in Unreal Engine."
date: "2024-03-16"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_cpp_tips_and_tricks.png.png"
tags: "unreal, cpp, code structure"
---

This is a collection of tips and tricks when writing C++ code in Unreal Engine that we've applied to our work over the years.

---

## Prefer to use `UPrimitiveComponent` instead of `UStaticMeshComponent` to support compatibility with skeletal meshes.

```cpp
Actor->FindComponentByClass<UPrimitiveComponent>()
```

---

## Prefer `GetComponentByClass<Class>` over `Cast<Class>(FindComponentByClass(Class))`.

```cpp
// prefer GetComponentByClass<Class>
auto MyComponent = Actor->GetComponentByClass<UMyComponent>(); // shorter

// over Cast<Class>(FindComponentByClass(Class))
auto MyComponent2 = Cast<UMyComponent>(Actor->FindComponentByClass(UMyComponent::StaticClass()); // longer
```

---

## Prefer `Cast<Class>` over `static_cast<Class*>`.

```cpp
// prefer Cast<Class>
auto MyThing = Cast<UMyThing>(PossibleThing); // unrealism, saves a *, only works with UObject types

// over static_cast<Class*> 
auto MyThing2 = static_cast<UMyThing*>(PossibleThing); // c++ ism
```

---

## Prefer using binary operators over explicitly setting each X, Y, and Z (same goes for Transforms).

```cpp
// prefer using binary operators
auto OffsetPosition = Actor->GetRelativeLocation() + FVector(0, 0, 10); 

// over explicitly setting each x, y, z
FVector OffsetPosition2 = FVector(Actor->GetRelativeLocation().X, Actor->GetRelativeLocation().Y, Actor->GetRelativeLocation().Z + 10);

// similarly for transforms
auto OffsetTransform = Component->GetRelativeTransform() + FTransform(FVector(0, 0, 10));
```

---

## Use `FMath::IsNearlyEqual` to prevent redundant calculations.

```cpp
if (FMath::IsNearlyEqual(Progress, OldProgress)) { return; }
```

---

## Prefer `ensure` over `ensureAlways` to prevent output log spam.

```cpp
ensure(IsValid(this)); // prefer this
ensureAlways(IsValid(this)); // over this
```

`ensure` logs the error only the first time the expression is false.

`ensureAlways` logs the error every time the expression is false.

---

## Order Class variables and functions by their access specifier

```cpp
UCLASS()
class USomeClass : public UObject
{  
    GENERATED_BODY()  
    
public:
	// variables
	// functions
protected:
	// variables
	// functions
private:
	// variables
	// functions
```

---

## Use the prefix of `out` when function parameters are passed by reference and the function is expected to write to that value

```cpp
void GetAggregateGameplayTags(FGameplayTagContainer& OutGameplayTags) const;
```

This makes it obvious the value passed in the argument is replaced by the function.

---

## Prefer explicitly named functions instead of overloading.

```cpp
// overloaded function examples
UModelComponent* LoadCharacterModel(int32 CharacterID) const;
UModelComponent* LoadCharacterModel(FName CharacterName) const;

// explicit function examples
UModelComponent* LoadCharacterModelByID(int32 CharacterID) const; 
UModelComponent* LoadCharacterModelByName(FName CharacterName) const;
```

The reason to prefer explicitly named functions over loading has to do with programmer error. 

It can be trivial to inadvertently pass the wrong data type as an argument into an overloaded function, creating bugs the compiler will never catch (because there is no real error, other than the programmer's mistake in the overloaded function they used).

---

## Document additional relevant information in multi-line comments with @warning, @note, @param, and @deprecated

```cpp
/**  
 * @warning - ...
 * @note - ...
 * @deprecated - ...
 * @param InOwningComponent - ... 
**/
UFUNCTION(BlueprintCallable)  
void Init(UInteractiveComponent* InOwningComponent);
```

---

## Prefer `TWeakObjectPtr<>` over `TObjectPtr<>` when you do not own the object.

```cpp
UPROPERTY(BlueprintReadWrite, EditAnywhere, Category="Interaction")
TObjectPtr<UInteractiveTriggerBase> Trigger;

UPROPERTY(BlueprintReadWrite, Category="Interaction")
TWeakObjectPtr<UInteractiveComponent> OwningComponent;
```

---

## Use `GetValid()` for more succinct assignment

```cpp
// before
if (IsValid(InTarget))
{
    Target = InTarget;
}
else
{
    Target = nullptr;
}

// after
Target = GetValid(InTarget);
```

---

## Keep all variable names CamelCased except `bSomeFlag`

```cpp
UPROPERTY(EditAnywhere, BlueprintReadWrite)  
float Cooldown = 0.1f;

UPROPERTY(EditAnywhere, BlueprintReadWrite)  
bool bUseCooldown = true;  
```

---

### Link References
- [Laura's Blog - Unreal C++ Speedrun](https://landelare.github.io/2023/01/07/cpp-speedrun.html)
- [MrRobinOfficial - Getting Started C++](https://github.com/MrRobinOfficial/Guide-UnrealEngine)

---

### Backlog
- [ ] Organize this list into sensible categories as it continues to grow