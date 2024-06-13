const questions = [
    {
        question:" Who invented C++?",
        answers: [
        { text:" Dennis Ritchie",correct: false},
        { text:"blue whale",correct: true},
        { text:"elephant",correct: false},
        { text:"giraffe",correct: false},
        ]
    },
    {
        question:"Which is the largest animal in the world",
        answers: [
        { text:"shark",correct: false},
        { text:"blue whale",correct: true},
        { text:"elephant",correct: false},
        { text:"giraffe",correct: false},
        ]
    }

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score=0;

function startQuiz()
{
    currentQuestionIndex=0;
    score=o;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion()
{
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ".  " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendchild(button);
        if( answer.correct)
        {
        button.dataset.correct= answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState()
{
    clearStatusClass(document.body)
    nextButton.style.display = "none";
    while(answerButtons.firstchild)
        {
            answerButtons.removeChild(answerButtons.firstchild);
        }
}
function selectAnswer(e){

    const selectedBtn = e.target;
    
    const isCorrect = selectedBtn.dataset.correct === "true";

    
    if(isCorrect){
    selectedBtn.classList.add("correct");
    
    }else{ 
    selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
         if(button.dataset.correct === "true"){     
    button.classList.add("correct");
    }       
        button.disabled = true;
    });
    nextButton.style.display = "block";
        
        
}
function showScore(){   
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block";
    }

 function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
    showQuestion();
    }else{
     showScore();
    }
}
     
 nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        
       startQuiz();
    }
    });  
        
startQuiz();