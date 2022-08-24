// Page variables
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("highscorePage");
var highscoreInputName = document.getElementById("names");
var highscoreDisplayName = document.getElementById("highscorenames");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscorescore");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz question object
var quizQuestions = [{
    question: "Commonly used data types do NOT include",
    choiceA: "Booleans",
    choiceB: "Strings",
    choiceC: "Alerts",
    choiceD: "Numbers",
    correctAnswer: "a"},
  {
    question: "The condition in an if/then statement is enclosed with",
    choiceA: "Quotes",
    choiceB: "Parantheses",
    choiceC: "Curly Brackets",
    choiceD: "Square Brackets",
    correctAnswer: "b"},
   {
    question: "Arrays in javascript can be used to store",
    choiceA: "Numbers and Strings",
    choiceB: "Other Arrays",
    choiceC: "Booleans",
    choiceD: "All Of The Above",
    correctAnswer: "d"},
    {
    question: "String values must be enclosed within _____ when being assigned to a variable.",
    choiceA: "Commas",
    choiceB: "Quotes",
    choiceC: "Curly Brackets",
    choiceD: "Parantheses",
    correctAnswer: "c"},
    {
    question: "A very useful tool used during development and debugging for printing content to the debugger is",
    choiceA: "For Loops",
    choiceB: "Javascript",
    choiceC: "Terminal/Bash",
    choiceD: "console.log",
    correctAnswer: "a"},  
    {
    question: "What does HTML stand for?",
    choiceA: "Hypersound Markup Language",
    choiceB: "Hyperspeed Markeup Language",
    choiceC: "Hypertext Markup Language",
    choiceD: "Hyperstrength Markup Language",
    correctAnswer: "c"},
    {
    question: "What CSS stand for?",
    choiceA: "Cascading Style Set",
    choiceB: "Cascading Style Sheet",
    choiceC: "Cascading Select Styles",
    choiceD: "Custom Style Sheet",
    correctAnswer: "b"},
        
    
    ];
// Other variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;

//Function to cycle through questions
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

//Start quiz function
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
//End Page function
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    //return showScore();
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

//function to save score
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if (highscoreInputName.value === "") {
        alert("Name cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

//function to clear high score list
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

//function to display high score
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

//function to clear local storage
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

//function to restore original variable values
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

//start quiz button 
startQuizButton.addEventListener("click",startQuiz);
