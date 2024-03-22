---
title: "The Invisible Magic of Modern Game Engines"
subtitle: "How modern game engines seamlessly blend a multitude of real-time systems to make games indistinguishable from magic."
date: "2024-02-28"
img: "https://ctrlshiftbuild-chronicles.s3.us-east-2.amazonaws.com/nty_studio_god_of_war_game_frame.jpg"
tags: "game engine"
---

To illustrate the invisible magic of modern game engines, let's do an exercise.

How many real-time systems can you identify at work from this single frame in [God of War](https://www.youtube.com/watch?v=K0u_kAWLJOA)?

![god of war game frame](/images/nty_studio_god_of_war_game_frame.jpg)

To players of this game (or any, for that matter), it's magic. Everything *just works*. 

But the more attentive eye will recognize the breadth and depth of interconnected systems engaged to create this seamless, unified experience.

---

Let's see how many you guessed.
1. `Input (movement):` A character the player can control (Kratos)
2. `Input (actions):` the player pressing a certain combination of buttons to trigger the action of throwing the axe towards the enemy
3. `Companion AI:` A companion (Atreyus) that operates as an individual AI supporting the player, but allows for the player to request actions
4. `Enemy AI:` Non-playable characters (enemies) with their own embedded AI responding to the player and Atreyus
5. `Audio:` the ambient sound of the environment giving texture and volume to the background of the scene, the battle music to signify we're in combat
6. `Sound Effects:` Kratos throwing his axe, the foreground enemy preparing for a power attack, the background enemy taking damage
7. `Animation:` the arm extension of Kratos during the axe throw, the pull of the draw string by Atreyus as he shoots an arrow, the foreground enemy rearing the axe over its head as it prepares for its power attack, the movement of the foreground enemy towards Atreyus
8. `Physics:` the arced path the axe takes when thrown by Kratos, the movement of all characters along the ground while fighting, the staggered response from the background enemy when it takes damage
9. `Interface:` the display of Kratos' health bar and rage bar, his available skills, the number of arrows Atreyus has available to shoot, the remaining health of the background enemy
10. `Materials:` the ice coating of Kratos' axe, the fur and leather armor Kratos is wearing, the texture of the ground, the walls, the puddles of water, the animal bones
11. `Visual Effects:`  the reverberating icy wisp around Kratos' axe, the volumetric debris in the air
12. `Lighting:` the natural sunlight casting across the front-half closest to us, with the back-half shadowed by the enclosure of the environment
13. `Rendering:` everything you see!

And this list contains only a segment of the real-time systems at work in this single frame. 

We haven't even touched the systems that:
- Calculate the combat mechanics managing health, damage, and applying status effects
- Optimize the game's rendering with techniques like culling to only render what is in view
- Handle level loading and unloading
- And much, much more

Modern game engines abstract (or automate) away a lot of the underlying complexity of these systems to allow us (the Creators) to focus on what we do best, create.

---

### Link References
N/A

---

### Backlog
N/A