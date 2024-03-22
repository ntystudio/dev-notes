---
title: "Custom Console Commands"
subtitle: "How to crate and use custom console commands in Unreal Engine."
date: "2024-03-03"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/ctrl-shift-build-home-image.png"
tags: "unreal, cpp, console, debugging"
---

Custom console commands are for development or debugging (non-shipping) builds and used specifically for debugging or testing.

In shipping builds, Unreal strips out all custom commands.

Examples of custom console commands we would write include:
- Setting health
- Setting time of day
- Setting currency

Unreal only allows custom console commands to be defined in a subset of classes, including:
- Game Mode
- Cheat Manager
- Player Controller
- HUD
- Pawn
- Player Input

> The Game Mode is typically where you will define custom console commands.

---

# Defining a custom console command
Our custom console command is defined as a standard `UFUNCTION` with the addition of the `Exec` modifier which tells Unreal this function should be exposed (and executable) via the console.

```cpp
UFUNCTION(Exec)
void SetMaxAndCurrentHealth(float NewMax, float NewCurrent);

void ...GameModeBase::SetMaxAndCurrentHealth(float NewMax, float NewCurrent)
{
	MaxHealth = NewMax;
	CurrentHealth = NewCurrent;
}
```

---

# Using a custom console commSand
When defining the function, any parameters included as part of the function signature will be input via the console using spaces.

`console:` `SetMaxAndCurrentHealth 750 750`

(this sets our max health to 750 and our current health to 750)

---

### Reference Links
N/A

---

### Backlog
N/A