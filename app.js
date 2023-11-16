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
    {
        question: "¿Qué es la plusvalía según 'El Capital'?",
        options: ["Ganancia del empresario", "Salario del trabajador", "Valor agregado por el trabajador", "Impuesto estatal"],
        correctAnswer: "Valor agregado por el trabajador"
    },
    {
        question: "¿Cuál es el término utilizado por Marx para describir la clase trabajadora?",
        options: ["Burguesía", "Proletariado", "Intelectuales", "Campesinos"],
        correctAnswer: "Proletariado"
    },
    {
        question: "¿En qué obra Marx desarrolla la teoría de la alienación?",
        options: ["El Manifiesto Comunista", "La Ideología Alemana", "El 18 Brumario de Luis Bonaparte", "El Estado y la Revolución"],
        correctAnswer: "La Ideología Alemana"
    },
    {
        question: "¿Cuál es el concepto marxista relacionado con la concentración de la propiedad en manos de unos pocos?",
        options: ["Plusvalía", "Socialización", "Acumulación de capital", "Lucha de clases"],
        correctAnswer: "Acumulación de capital"
    },
    {
        question: "¿En qué país se desarrolla principalmente la crítica de Marx al modo de producción capitalista?",
        options: ["Inglaterra", "Alemania", "Francia", "Estados Unidos"],
        correctAnswer: "Inglaterra"
    },
    {
        question: "¿Qué concepto marxista se refiere a la situación en la que los productos del trabajo humano toman una forma autónoma y dominan a los propios productores?",
        options: ["Plusvalía", "Reificación", "Fetichismo de la mercancía", "Materialismo dialéctico"],
        correctAnswer: "Fetichismo de la mercancía"
    },
    {
        question: "En 'El Capital', ¿Qué papel desempeña el dinero en el proceso de circulación de mercancías?",
        options: ["Medio de producción", "Unidad de cuenta", "Mercancía", "Medio de cambio"],
        correctAnswer: "Medio de cambio"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let answered = false; // Nueva variable para controlar si se ha respondido la pregunta actual

function showFAQ() {
    const faqContainer = document.getElementById("faq-container");
    faqContainer.classList.remove("hidden");

    // Agregar animación a la aparición del contenedor FAQ
    animateElement('#faq-container', 'animate__fadeIn');
}

function toggleFaqContainer() {
    const faqContainer = document.getElementById("faq-container");

    // Ocultar el contenedor FAQ con animación
    animateElement('#faq-container', 'animate__fadeOut', () => {
        faqContainer.style.display = "none";
        // Mostrar u ocultar el juego según el estado del contenedor FAQ
        const gameContainer = document.getElementById("game-container");
        gameContainer.style.display = (faqContainer.classList.contains("hidden")) ? "block" : "none";
    });
}

function startGameFromFAQ() {
    const faqContainer = document.getElementById("faq-container");

    // Ocultar el contenedor FAQ con animación antes de iniciar el juego
    animateElement('#faq-container', 'animate__fadeOut', () => {
        faqContainer.style.display = "none";
        startGame(); // Iniciar el juego después de cerrar las tarjetas FAQ
    });
}

function startGame() {
    showQuestion();
}

function showQuestion() {
    answered = false; // Reinicia la variable answered al mostrar una nueva pregunta

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

    if (!answered) { // Asegúrate de que el usuario no haya respondido ya
        answered = true; // Marca la pregunta como respondida

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
}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score;
}

function endGame() {
    console.log("End game. Score:", score);
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "none";

    const finalScreen = document.getElementById("final-screen");
    finalScreen.classList.remove("hidden");

    const finalScoreValue = document.getElementById("final-score-value");
    finalScoreValue.textContent = score;
}

function restartGame(event) {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();

    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";

    const finalScreen = document.getElementById("final-screen");
    finalScreen.classList.add("hidden");

    event.stopPropagation();

    event.preventDefault();
}

function redirectToInstagram(instagramLink) {
    window.open(instagramLink, '_blank');
}

function nextQuestion() {
    if (answered || currentQuestionIndex === questions.length - 1) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }
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

function shareOnTwitter() {
    const tweetText = `Acabo de completar el Juego Marxiano - Capital Quiz con un puntaje de ${score} puntos. ¡Demuestra tu conocimiento sobre El Capital de Karl Marx! #MarxQuiz`;
    const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=https://juego-marxiano.netlify.app`;

    window.open(tweetURL, '_blank');
}

function shareOnWhatsApp() {
    const message = `Acabo de completar el Juego Marxiano - Capital Quiz con un puntaje de ${score} puntos. ¡Demuestra tu conocimiento sobre El Capital de Karl Marx! Visita https://juego-marxiano.netlify.app`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
}

animateElement('#question', 'animate__bounce');

window.onload = function () {
    startGame();
};
