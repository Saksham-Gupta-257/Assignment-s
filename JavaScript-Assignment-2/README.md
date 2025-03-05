# **Quiz Game**  

## **Table of Contents**  
- [Introduction](#introduction)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [How to Run the Project](#how-to-run-the-project)  
- [Game Rules](#game-rules)  
- [File Structure](#file-structure)  
- [API Integration](#api-integration) 
- [Author](#author)  

## **Introduction**  
**Quiz Game** is a web-based interactive trivia game where players answer multiple-choice questions from different categories within a **15-second timer**. The game fetches questions dynamically from an API and tracks the player’s score.  

## **Features**  
✅ **Category Selection** – Choose from multiple quiz categories  
✅ **Difficulty Levels** – Play at Easy, Medium, or Hard difficulty  
✅ **Timer-Based Questions** – 15-second countdown per question  
✅ **Real-Time Score Update** – Earn points for correct answers  
✅ **API Integration** – Fetches random questions from Open Trivia Database  
✅ **End Screen & Restart Option** – View final score and replay  

## **Technologies Used**  
- **HTML** → Structure of the game  
- **CSS** → Styling and layout  
- **JavaScript** → Game logic and API handling  
- **Open Trivia Database API** → Fetching quiz questions  

## **How to Run the Project**  
1. **Clone or download** the repository.
2. **Open `index.html`** in a web browser.  
3. **Select a category & difficulty** and click **Start Quiz**.  
4. **Answer the questions** before the timer runs out.  
5. **View your final score** and choose to **Play Again**.  

## **Game Rules**  
1. Players must **answer each question within 15 seconds**.  
2. If the timer runs out, the correct answer is displayed.  
3. **Correct answers** increase the player’s score by **1 point**.  
4. The game **ends after 20 questions**, displaying the final score.  
5. Players can restart the game from the **end screen**.  

## **File Structure**  
```
/quiz-game
│── index.html      # Main HTML file
│── style.css       # Styling & layout
│── script.js       # Game logic & API calls
│── Background.jpg  # Background image
│── README.md       # Documentation (this file)
```

## **API Integration**  
The game fetches questions from the **Open Trivia Database API** using:  

```plaintext
https://opentdb.com/api.php?amount=20&category=<CATEGORY_ID>&difficulty=<DIFFICULTY>&type=multiple
```

🔹 **Parameters:**  
- `amount=20` → Fetches 20 questions  
- `category=<ID>` → Selected quiz category  
- `difficulty=<easy|medium|hard>` → Sets the difficulty level  

## **Author**  
**Saksham Gupta**  
