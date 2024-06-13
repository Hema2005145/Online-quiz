document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Who invented C++?",
            answers: [
                { text: "Dennis Ritchie", correct: false },
                { text: "Ken Thompson", correct: false },
                { text: "Brian Kernighan", correct: false },
                { text: "Bjarne Stroustrup", correct: true },
            ]
        },
        {
            question: "What is C++?",
            answers: [
                { text: "C++ is an object oriented programming language", correct: false },
                { text: "C++ is a procedural programming language", correct: false },
                { text: "C++ supports both procedural and object oriented programming language", correct: true },
                { text: "C++ supports both procedural and object oriented programming language", correct: false },
            ]
        },
        {
            question: " Which of the following is not a type of Constructor in C++?",
            answers: [
                { text: "Default constructor", correct: false },
                { text: "Parameterized constructor", correct: false },
                { text: "Copy constructor", correct: false },
                { text: "Friend constructor", correct: true },
            ]
        },
        {
            question: "Which of the following type is provided by C++ but not C?",
            answers: [
                { text: "double", correct: false },
                { text: "float", correct: false },
                { text: "int", correct: false },
                { text: "bool", correct: true },
            ]
        },
        {
            question: "What is Inheritance in C++?",
            answers: [
                { text: "Deriving new classes from existing classes", correct: true },
                { text: "Overloading of classes", correct: false },
                { text: "Classes with same names", correct: false },
                { text: "Wrapping of data into a single class", correct: false },
            ]
        },
    ];

    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-btn");

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.style.display = "none";
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
        
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    function showScore() {
        resetState();
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";
    }

    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });

    startQuiz();
});

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("incorrect");
}