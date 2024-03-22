---
title: "Class & Metadata Specifiers"
subtitle: "An overview of Class and Metadata specifiers used to describe how classes should behave in the engine and editor."
date: "2024-02-26"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unreal, cpp, metadata"
---

This page is a running list of Class and Metadata specifiers I've used with frequency.

---

# Class Specifiers
When declaring a class in C++, we can include Class Specifiers to describe how the class should behave in the engine and editor.

The running list of specifiers I've used with some frequency:
- `Abstract` → declares the class as an "abstract base class", preventing the user from adding Actors of this class to Levels (useful for classes which are not meaningful on their own)
- `Blueprintable` → exposes this class as an acceptable base class for creating Blueprints
- `BlueprintType` → exposes this class as a type that can be used for variables in Blueprints
- `DefaultToInstanced` → all instances of this class are considered "instanced" (components) and thereby duplicated upon construction
- `EditInlineNew` → indicates that Objects of this class can be created from the Unreal Editor Property window, as opposed to being referenced from an existing Asset
- `Transient` → objects belonging to this class will never be saved to disk (useful with certain kinds of native classes which are non-persistent by nature, such as players or windows)
- `Within=OuterClassName` → objects of this class cannot exist outside an instance of an `OuterClassName` Object (meaning that creating an Object of this class requires that an instance of `OuterClassName` is provided as its `Outer` Object)

---

# Metadata Specifiers
Metadata Specifiers are similar to Class Specifiers, but also apply to other types such as interfaces, structs, enums, enum values, functions, or properties. The list below covers Metadata Specifiers available for use with Classes.

> Metadata only exists in the editor; do not write game logic that accesses metadata.

The running list of metadata specifiers I've used with some frequency are:
- `BlueprintSpawnableComponent` → the component Class can be spawned by a Blueprint
- `BlueprintThreadSafe` → only valid on Blueprint function libraries. This specifier marks the functions in this class as callable on non-game threads in animation Blueprints.
- `ChildCannotTick` → used for Actor and Component classes. If the native class cannot tick, Blueprint-generated classes based on this Actor or Component can never tick, even if `bCanBlueprintsTickByDefault` is true
- `ChildCanTick` → used for Actor and Component classes. If the native class cannot tick, Blueprint-generated classes based on this Actor or Component can have the `bCanEverTick` flag overridden, even if `bCanBlueprintsTickByDefault` is false
- `DeprecationMessage="Message Text"` → deprecated classes with this metadata will include this text with the standard deprecation warning that Blueprint Scripts generate during compilation
- `DisplayName="Blueprint Node Name"` → the name of this node in a Blueprint Script will be replaced with the value provided here, instead of the code-generated name
- `ShortToolTip="Short tooltip"` → a short tooltip that is used in some contexts where the full tooltip might be overwhelming
- `ToolTip="Hand-written tooltip"` → overrides the automatically generated tooltip from code comments

---

### Reference Links
- [BenUI - Class Specifiers & Class Metadata Specifiers](https://benui.ca/unreal/uclass/)
- [UE Documentation - Class Specifiers](https://docs.unrealengine.com/5.3/en-US/class-specifiers/)

---

### Backlog
- [ ] provide additional notes on edge cases and implementation best practices surrounding both Class Specifiers and Metadata Specifiers
- [ ] continued exploration of Class and Metadata Specifiers I have yet to use