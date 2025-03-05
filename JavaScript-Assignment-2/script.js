document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn'),
        startScreen = document.querySelector('.start-screen'),
        playground = document.querySelector('.playground'),
        endScreen = document.querySelector('#end-screen'),
        question = document.getElementById('question'),
        questionCount = document.getElementById('question-count'),
        questionTimer = document.getElementById('time-left'),
        quizOptions = document.getElementById('quiz-options'),
        nextBtn = document.getElementById('next-btn'),
        load = document.querySelector('.loader'),
        finalScore = document.getElementById('final-score'),
        restartBtn = document.getElementById('restart-btn');

    let arrQuestions = [],
        questionIndex = 0,
        score = 0,
        count = 15,
        countdown;

    nextBtn.style.display = 'none'; 

    // Function to Start the Quiz

    function startQuiz() {
        const category = document.getElementById('category').value,
            difficulty = document.getElementById('difficulty').value;
        
        arrQuestions = [];
        startScreen.style.display = 'none';
        playground.style.display = 'flex';
        score = 0;
        questionIndex = 0;

        let QuizURL = `https://opentdb.com/api.php?amount=20&category=${category}&difficulty=${difficulty}&type=multiple`;
        fetchQuestions(QuizURL);
    }

    // Function to Fetch Questions from API

    function fetchQuestions(QuizURL) {
        fetch(QuizURL)
            .then(response => response.json())
            .then(data => {
                arrQuestions = data.results;
                if (arrQuestions.length > 0) {
                    displayQuestion(arrQuestions[questionIndex]);
                }
            });
    }

    // Function to Display the Current Question

    function displayQuestion(questionData) {
        count = 15;
        question.innerHTML = htmlDecode(questionData.question);
        questionCount.innerHTML = `${questionIndex + 1}`;
        loadAnswers(questionData);
    }

    // Function to Load and Display Answer Options

    function loadAnswers(questionData) {
        quizOptions.innerHTML = "";
        let answers = [...questionData.incorrect_answers, questionData.correct_answer];
        answers = answers.sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            let option = document.createElement('li');
            option.innerHTML = htmlDecode(answer);
            quizOptions.append(option);
            option.addEventListener('click', () => checkAnswer(option, answers, questionData.correct_answer));
        });

        load.style.display = 'none';
        displayTimer();
    }

    // Function to Check Selected Answer

    function checkAnswer(answerOption, answers, correctAnswer) {
        let correctElement = [...quizOptions.childNodes].find(li => li.innerText === htmlDecode(correctAnswer));

        quizOptions.childNodes.forEach(li => li.classList.add('disabled'));

        if (htmlDecode(correctAnswer) === answerOption.innerText) {
            answerOption.classList.add('correct');
            score++;
            displayScore();
        } else {
            answerOption.classList.add('Incorrect');
            if (correctElement) correctElement.classList.add('correct');
        }
        clearInterval(countdown);
        nextBtn.style.display = 'block';
    }

    // Function to Decode HTML Entities in API Response

    function htmlDecode(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // Function to Display Timer for Each Question

    function displayTimer() {
        countdown = setInterval(() => {
            count--;
            questionTimer.innerHTML = count;
            if (count === 0) {
                clearInterval(countdown);
                showAnswer();
                nextBtn.style.display = 'block';
            }
        }, 1000);
    }

    // Function to Update Score Display

    function displayScore() {
        document.getElementById('score-value').innerHTML = score;
    }

    // Function to Show Correct Answer When Time Runs Out

    function showAnswer() {
        let currentQuestion = arrQuestions[questionIndex];
        let correctAnswer = htmlDecode(currentQuestion.correct_answer);
        let correctElement = [...quizOptions.childNodes].find(li => li.innerText === correctAnswer);

        quizOptions.childNodes.forEach(li => li.classList.add('disabled'));

        if (correctElement) {
            correctElement.classList.add('correct');
        }
    }

    // Function to End the Quiz and Show Final Score

    function endQuiz() {
        playground.style.display = 'none';
        endScreen.classList.remove('hidden');
        finalScore.innerText = score;
    }

    //Event Listeners

    startBtn.addEventListener("click", startQuiz);

    nextBtn.addEventListener('click', () => {
        nextBtn.style.display = 'none'; 
        clearInterval(countdown);
        questionTimer.innerHTML = "15";

        if (questionIndex < arrQuestions.length - 1) {
            questionIndex++;
            displayQuestion(arrQuestions[questionIndex]);
        } else {
            endQuiz();
        }

        if (questionIndex === arrQuestions.length - 1) {
            nextBtn.innerText = 'Submit';
        }
    });

    restartBtn.addEventListener("click", () => {
        score = 0;
        questionIndex = 0;
        arrQuestions = [];
        questionTimer.innerHTML = "15";
        startScreen.style.display = '';
        endScreen.classList.add('hidden');
        playground.style.display = 'none';
        nextBtn.style.display = 'none'; 
        load.style.display = '';
        nextBtn.innerText = 'Next';
        questionCount.innerHTML = '1';
        question.innerHTML = '';
        quizOptions.innerHTML = "";
        document.getElementById('score-value').innerHTML = score;
    });

});
