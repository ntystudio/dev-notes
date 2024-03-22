---
title: "FString vs FName vs FText"
subtitle: "The differences between using FString, FName, and FText."
date: "2024-03-01"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unreal, code concepts, cpp"
---

`FString`, `FName`, and `FText` are different data types for handling text, each with their own strengths.

---

# FString (`string`)
Strings are used for mutable text, particularly when we need to perform actions like appending characters, replacing substrings, splitting text, etc. They're most often used for debugging, and internally Unreal creates string objects for log files and the output log.

**Strings are great if:**
- You need to manipulate text (appending, replacing, splitting, etc)

---

# FText (`text`)
The Text data type is used for user-facing content in the UI.

**Texts are great if:**
- You need to display text in a UI
- You need to localize text for different languages

---

# FName (`name`)
Names are optimal when we're dealing with text comparisons and accessing data via keys because internally, Unreal hashes and stores FNames in a table alongside an index. 

(**fun fact:** [Gameplay Tags](https://docs.unrealengine.com/5.3/en-US/API/Runtime/GameplayTags/FGameplayTag/) themselves are an FName data type, meaning Gameplay Tag Containers are just a collection of FNames).

**Names are great if:**
- You need to do text comparisons

---

### Link References
- [UE Documentation - String Handling in Unreal Engine](https://docs.unrealengine.com/5.3/en-US/string-handling-in-unreal-engine/)
- [UE Documentation - FString](https://docs.unrealengine.com/5.3/en-US/fstring-in-unreal-engine/)
- [UE Documentation - FName](https://docs.unrealengine.com/5.3/en-US/fname-in-unreal-engine/)
- [UE Documentation - FText](https://docs.unrealengine.com/5.3/en-US/ftext-in-unreal-engine/)

---

### Backlog
- [ ] cover text literal macros available in C++ for localization, linked to a separate note on text localization (LOCTEXT, NSLOCTEXT, INVTEXT, etc)
- [ ] cover text conversion safety between different text data types