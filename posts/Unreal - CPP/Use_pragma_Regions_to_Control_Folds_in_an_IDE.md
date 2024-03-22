---
title: "Use pragma Regions to Control Folds in an IDE"
subtitle: "How to use pragma regions to group blocks of code together that can be expanded or collapsed."
date: "2024-02-24"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_pragma_region_code_folding.png"
tags: "cpp, code structure"
---

Pragma regions let us group a block of code that can be expanded or collapsed.

```cpp
#pragma region TriggerCount  
    // Whether to use a maximum trigger count.  
    UPROPERTY(BlueprintReadWrite, EditAnywhere, Category="Effect|Advanced", meta=(InlineEditConditionToggle))  
    bool bUseTriggerCountMax = false;  
  
    // The maximum number of times the interaction can be triggered.  
    UPROPERTY(BlueprintReadWrite, EditAnywhere, Category="Effect|Advanced", meta=(EditCondition="bUseTriggerCountMax"))  
    int32 TriggerCountMax = 1;  
  
    // The number of times the effect has been triggered.  
    UPROPERTY(BlueprintReadOnly, Category="Effect|Advanced", FieldNotify)  
    int32 TriggerCount = 0;  
#pragma endregion
```

Modern IDEs typically support hovering over a collapsed pragma region to see the region contents.

![unreal engine code folding with pragma regions](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_pragma_region_code_folding.png)

---

### Link References
- [Wikipedia - Directives (Pragmas)](https://en.wikipedia.org/wiki/Directive_(programming))
- [GCC Online Docs - Pragmas](https://gcc.gnu.org/onlinedocs/cpp/Pragmas.html)
- [Mike Stevanovic - #pragma region](https://www.youtube.com/watch?v=cxdwtzBap0Y)

---

### Backlog
N/A