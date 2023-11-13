// Acá se almacenan las preguntas, opciones y respuestas
const questions = [
    {
        question: "¿Quién es el autor de 'El Capital'?",
        options: ["Karl Marx", "Friedrich Engels", "Adam Smith", "John Locke"],
        correctAnswer: "Karl Marx"
    },
    {
        question: "¿En qué siglo fue publicado 'El Capital'?",
        options: ["XVIII", "XIX", "XX", "XXI"],
        correctAnswer: "XIX"
    },
    {
        question: "¿Cuál es el tema principal de 'El Capital'?",
        options: ["Teoría del Estado", "Teoría del Valor", "Teoría del Conocimiento", "Teoría del Arte"],
        correctAnswer: "Teoría del Valor"
    },
    // Agrega más preguntas según sea necesario
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

function startGame() {
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.className = "option";
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => chooseOption(optionButton, option));
        optionsContainer.appendChild(optionButton);
    });
}

function chooseOption(optionButton, selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedOption === correctAnswer) {
        score++;
        optionButton.style.backgroundColor = "#2ecc71"; // verde para respuestas correctas
    } else {
        optionButton.style.backgroundColor = "#e74c3c"; // rojo para respuestas incorrectas
    }

    document.querySelectorAll(".option").forEach(button => {
        button.disabled = true;
    });

    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
}

function endGame() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "none";

    const finalScreen = document.getElementById("final-screen");
    finalScreen.classList.remove("hidden");

    const finalScoreValue = document.getElementById("final-score-value");
    finalScoreValue.textContent = score;
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();

    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";

    const finalScreen = document.getElementById("final-screen");
    finalScreen.classList.add("hidden");
}

function redirectToInstagram(instagramLink) {
    window.open(instagramLink, '_blank');
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endGame();
    }
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Tiempo Restante: ${timeLeft} seg`;
}

function showFeedback(isCorrect) {
    const feedbackElement = document.getElementById('feedback');

    if (isCorrect) {
        feedbackElement.innerText = '¡Correcto! ¡Bien hecho!';
        feedbackElement.style.color = '#2ecc71'; // Verde para respuestas correctas
    } else {
        feedbackElement.innerText = 'Respuesta incorrecta. Sigue intentando.';
        feedbackElement.style.color = '#e74c3c'; // Rojo para respuestas incorrectas
    }

    animateElement('#feedback', 'animate__fadeIn');

    setTimeout(() => {
        animateElement('#feedback', 'animate__fadeOut', () => {
            feedbackElement.innerText = '';
        });
    }, 2000);
}

function animateElement(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animate__animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animate__animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback();
    }

    node.addEventListener('animationend', handleAnimationEnd);
}

animateElement('#question', 'animate__bounce');


function startTimer() {
    const timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

window.onload = function () {
    startGame();
    startTimer();
};
