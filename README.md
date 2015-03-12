### Homework 9-10

Due Mon. 3/18

####Synopsis

- **Problem 1:** Backbone Memory Game _[50% of total time]_ **Goals:** Convert your Memory game module to a Backbone-style design, using models, collections, and event-handlers.

- **Problem 2:** Backbone Routes _[30%]_ **Goals:** Add Backbone Routes to your Memory app.

- **Problem 3:** LearnYouNode 1-5 _[20%]_ **Goals:** Practice using node for basic file system operations.

---


**1)** Rewrite your Memory game module using Backbone.  In the later stages, you'll also need to modify your GUI slightly, to let Backbone handle the communication between the modules.

For conceptual clarity, this transition is best done in three stages.
Each has been completely written for you; you job is to study the changes and try to accomodate them in your own implementation.

**a)** Rewrite the Game() constructor to use a Backbone Model for each card and a Backbone Collection for the entire game (the state of all cards).
At this stage, the game still calls the GUI's methods `show`, `hideSoon`, and `removeSoon` to update the GUI.

[This complete solution](solution/memory-game-bb1.js) should work with your existing GUI module from past weeks.


**b)** Replace the game's calls to GUI's methods with manually-triggered custom events.  The GUI instance adds an listener to detect the custom events and trigger its own methods `show`, `hideSoon`, and `removeSoon`.

[This game module](solution/memory-game-bb2.js) should work with [this modified GUI](solution/memory-game-bb2.js).

**c)** Skip the manually-triggered events within game, and rely instead of the automatic 'change' events Backbone generates whenever a Model changes.
The GUI instance needs to modify its listener to receive the 'change' events and infer which re-rendering method is needed.

[This game](solution/memory-game-bb3.js) should work with [this GUI](solution/memory-game-bb3.js).


---

**2)**  Modify the overall architecture of your memory game to use two different Backbone Routes.  Each route should start a new game using a particular set of cards.  You may use any of the example cardsets in addition to your own.

A template will be added soon, but see if you can get started without one.

---

**3)** Install the application `learnyounode` and solve exercises 1-5.  If possible, try to solve 6 as well, but expect it to be more difficult.

