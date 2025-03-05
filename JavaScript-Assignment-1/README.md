# Roll The Dice - Two Player Dice Game

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Run the Project](#how-to-run-the-project)
- [Game Rules](#game-rules)
- [File Structure](#file-structure)
- [Credits](#credits)
- [Author](#author)

## Introduction
**Roll The Dice** is a simple two-player web-based dice game implemented using HTML, CSS, and JavaScript. Players take turns rolling a dice, accumulating their scores, and saving them strategically to reach the winning threshold of 100 points.

## Features
- Two-player turn-based gameplay
- Editable player names
- Animated dice roll
- Score tracking (Current Score & Saved Score)
- Win condition: First player to reach 100 points
- Interactive UI with smooth transitions
- Reset and Play Again options

## Technologies Used
- **HTML** for structure
- **CSS** for styling and animations
- **JavaScript** for game logic and interactivity

## How to Run the Project
1. Clone or download the repository.
2. Open `index.html` in a browser.
3. Click the **Play** button to start the game.
4. Players take turns rolling the dice and saving scores.

## Game Rules
1. Players take turns rolling the dice.
2. If a player rolls a `1`, their **current score** resets to `0`, and the turn shifts to the other player.
3. If the roll is between `2` and `6`, the value is added to the **current score**.
4. Players can click **Save Score** to add their **current score** to their **saved score** and pass the turn.
5. The first player to reach a **saved score of 100 or more** wins the game.
6. The winner's name is displayed on the screen.
7. Players can restart the game using the **Reset** or **Play Again** button.

## File Structure
```
/roll-the-dice-game
|── README.md       # Project documentation
│── index.html      # Main HTML file
│── script.js       # JavaScript file for game logic
│── style.css       # Stylesheet for UI & animations
```

## Credits
- Dice animation inspired by **hosseinnabi-ir**.

## Author
**Saksham Gupta**

