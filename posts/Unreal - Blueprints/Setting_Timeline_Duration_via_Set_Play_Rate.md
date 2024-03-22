---
title: "Setting Timeline Duration via Play Rate"
subtitle: "How to normalize the timeline duration and set the length via play rate."
date: "2024-02-28"
tags: "unreal, blueprint, animation"
---

The Timeline editor includes a `Length` field to set the length of the Timeline (which is often used to set the duration of the timeline when used).

However, using the `Length` field to set the duration creates a problem, especially when
- (A) the duration needs to differ between actors using the timeline and
- (B) when the timeline `Length` is not normalized

Below is how we normalize the Timeline length and control its duration via `Set Play Rate`.

---

# Normalizing Timeline Length and Controlling Duration

> The Timeline `Length` should always be set to a value of `1.0` seconds.

We need a separate `Duration` float variable which will be used to control the desired length of time the Timeline should update over.

![unreal engine set play rate node](https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_unreal_engine_blueprints_set_play_rate_of_timeline.png)

To modify how long the Timeline plays for, the Timeline length should be divided by the duration from the variable, and this value should be inserted into the `Set Play Rate` node of the Timeline (which is a component).

For example -> With a timeline length of `1.0`, and a duration of `10`, we get the following:
`1.0 / 10.0 = 0.10`

This sets the playback rate to 1/10th of its default (`1.0`), meaning the timeline will now run for a total of `10` seconds.

Another example -> With a timeline length of `1.0`, and a duration of `50`, we get the following:
`1.0 / 50.0 = 0.02`

This sets the playback rate to 1/50th of its default (`1.0`), meaning the timeline will now run for a total of `50` seconds.

---

### Link References
N/A

---

### Backlog
N/A