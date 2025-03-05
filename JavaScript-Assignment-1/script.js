document.addEventListener("DOMContentLoaded", () => {
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");
    const player1Saved = document.getElementById("player1-saved");
    const player2Saved = document.getElementById("player2-saved");
    const player1Current = document.getElementById("player1-current");
    const player2Current = document.getElementById("player2-current");
    const rollBtn = document.querySelector("#roll-dice");
    const saveScoreBtns = document.querySelectorAll("#save-score");
    const resetBtn = document.querySelector("#reset-game");
    const dice = document.querySelector(".dice");
    const turnIndicator = document.getElementById("turn-indicator");
    const winnerPopup = document.getElementById("winner-popup");
    const winnerMessage = document.getElementById("winner-message");
    const playAgainBtn = document.getElementById("play-again");
    const playBtn = document.getElementById("play-button");
    const mainMenu = document.querySelector(".main-menu");
    const mainPage = document.querySelector(".main-page");


    function startGame() {
        mainMenu.style.opacity = "0";
        setTimeout(() => {
            mainMenu.style.display = "none";
            mainPage.style.display = "flex";
            document.getElementsByTagName("body")[0].style.height = 0;
            document.getElementsByTagName("body")[0].style.margin = '80px';
            setTimeout(() => {
                mainPage.style.opacity = "1";
            }, 50);
        }, 500);
    }

    function updateTurnIndicator() {
        const playerName = activePlayer === 1 ? player1Name.value : player2Name.value;
        turnIndicator.textContent = `${playerName}'s Turn`;

        document.getElementById("player1").classList.toggle("active", activePlayer === 1);
        document.getElementById("player2").classList.toggle("active", activePlayer === 2);
    }

    player1Name.addEventListener("input", updateTurnIndicator);
    player2Name.addEventListener("input", updateTurnIndicator);

    function disableNameEditing() {
        player1Name.disabled = true;
        player2Name.disabled = true;
    }

    function enableNameEditing() {
        player1Name.disabled = false;
        player2Name.disabled = false;
    }

    function disableButtons() {
        rollBtn.disabled = true;
        saveScoreBtns.forEach(button => button.disabled = true);
        resetBtn.disabled = true;
    }

    function enableButtons() {
        rollBtn.disabled = false;
        saveScoreBtns.forEach(button => button.disabled = false);
        resetBtn.disabled = false;
    }

    // Game Variables
    let currentScore = 0;
    let activePlayer = 1;
    let savedScores = { 1: 0, 2: 0 };
    let gameActive = true;
    let gameStarted = false;

    // Roll Dice Animation
    const randomDice = () => {
        if (!gameActive) return;

        if (!gameStarted) {
            gameStarted = true;
            disableNameEditing();
        }

        disableButtons();

        const random = Math.floor(Math.random() * 10);
        if (random >= 1 && random <= 6) {
            rollDice(random);
        } else {
            randomDice();
        }
    };

    const rollDice = (random) => {
        dice.style.animation = "rolling 4s";

        setTimeout(() => {
            switch (random) {
                case 1:
                    dice.style.transform = "rotateX(0deg) rotateY(0deg)";
                    break;
                case 2:
                    dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
                    break;
                case 3:
                    dice.style.transform = "rotateX(0deg) rotateY(90deg)";
                    break;
                case 4:
                    dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
                    break;
                case 5:
                    dice.style.transform = "rotateX(90deg) rotateY(0deg)";
                    break;
                case 6:
                    dice.style.transform = "rotateX(180deg) rotateY(0deg)";
                    break;
                default:
                    break;
            }

            dice.style.animation = "none";

            // Game Logic - Score Handling
            if (random === 1) {
                currentScore = 0;
                switchTurn();
            } else {
                currentScore += random;
                updateCurrentScore();
            }

            enableButtons();

        }, 4050);
    };

    // Function to Update UI Scores
    function updateCurrentScore() {
        if (activePlayer === 1) {
            player1Current.textContent = currentScore;
            player2Current.textContent = "0";
        } else {
            player2Current.textContent = currentScore;
            player1Current.textContent = "0";
        }
    }

    // Function to Save Score
    function saveScore() {
        if (!gameActive) return;

        savedScores[activePlayer] += currentScore; 
        document.getElementById(`player${activePlayer}-saved`).textContent = savedScores[activePlayer];

        if (savedScores[activePlayer] >= 100) {
            let winnerName = activePlayer === 1 ? player1Name.value : player2Name.value;
            showWinnerPopup(winnerName);
        } else {
            switchTurn(); 
        }
    }

    // Function to Switch Turns
    function switchTurn() {
        updateCurrentScore();
        activePlayer = activePlayer === 1 ? 2 : 1;
        currentScore = 0;
        updateTurnIndicator();
    }

    // Show Winner Popup
    function showWinnerPopup(winnerName) {
        winnerMessage.textContent = `${winnerName} Wins! 🎉`;
        winnerPopup.style.display = "flex";
    }

    // Close Winner Popup & Reset Game
    function resetGame() {
        winnerPopup.style.display = "none";
        gameActive = true;
        gameStarted = false;
        currentScore = 0;
        savedScores = { 1: 0, 2: 0 };
        activePlayer = 1;

        player1Saved.textContent = "0";
        player2Saved.textContent = "0";
        player1Current.textContent = "0";
        player2Current.textContent = "0";

        enableNameEditing();
        resetDice();
        updateTurnIndicator();
    }

    // Reset Dice Rotation
    const resetDice = () => {
        dice.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    // Event Listeners
    rollBtn.addEventListener("click", randomDice);
    saveScoreBtns.forEach(button => button.addEventListener("click", saveScore));
    resetBtn.addEventListener("click", resetGame);
    playAgainBtn.addEventListener("click", resetGame);
    playBtn.addEventListener("click", startGame);

    // Initialize Turn Indicator
    updateTurnIndicator();
});
