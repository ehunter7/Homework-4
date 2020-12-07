// varibles that hold html elements
var quizContainer = $("#quiz");
var resultsContainer = $("#results");
var secondsLeft;
var score = 0;
var track = [];
var x; //current question
//Questions
var questions = [
  {
    question: "Which sign does jQuery use as a shortcut for jQuery?",
    answer: {
      a: "The ! sign",
      b: "The $ sign",
      c: "The * sign",
      d: "The % sign",
    },
    correctAnswer: "b",
  },
  {
    question: "Which jQuery method is used to hide selected elements?",
    answer: {
      a: "hidden()",
      b: "hide()",
      c: "visible(false)",
      d: "display(none)",
    },
    correctAnswer: "b",
  },
  {
    question: "Which jQuery method is used to set one or more style properties for selected elements?",
    answer: {
      a: "html()",
      b: "css()",
      c: "style()",
      d: "text()",
    },
    correctAnswer: "b",
  },
  {
    question: "What scripting language is jQuery written in?",
    answer: {
      a: "VBScript",
      b: "C++",
      c: "javaScript",
      d: "C#",
    },
    correctAnswer: "c",
  },
  {
    question: "Which of the following is the correct way to create a div element with a link text “Hello” with jQuery?",
    answer: {
      a: "$(“#idName”).create(“div”).text(“Hello“);",
      b: "$(“#idName”).create(“div”).html(“Hello“);",
      c: "$(“idName”).css(“div”).html(“Hello“);",
      d: "$(“#idName”).append(“Hello“);",
    },
    correctAnswer: "d",
  },
];

//random number generator
function getRand() {
  x = Math.floor(Math.random() * questions.length);
  var copy = false;
  for(var i = 0; i <= track.length + 1; i++)
  {
    if(track.length === 5){
      track = [];
    }
    if(x === track[i]){
      copy = true;
    }
  }
  if(!copy){
    track.push(x);
  }
  else{
    getRand();
  }
  console.log("returning: " + x);
  return (x);
}

//function to display the quiz
function buildQuiz(x) {
  $(".score").text("SCORE: " + score);
  console.log("random value: " + x);
  //code displays question
  //create elements for question
  var questionTitle = $("<h2>").text(questions[x].question);

  var answer1 = $("<button>")
    .addClass("answers")
    .text(questions[x].answer.a)
    .attr("data-letter", "a");
  var answer2 = $("<button>")
    .addClass("answers")
    .text(questions[x].answer.b)
    .attr("data-letter", "b");
  var answer3 = $("<button>")
    .addClass("answers")
    .text(questions[x].answer.c)
    .attr("data-letter", "c");
  var answer4 = $("<button>")
    .addClass("answers")
    .text(questions[x].answer.d)
    .attr("data-letter", "d");

  //display question and answers to screen
  quizContainer.append(questionTitle, answer1, answer2, answer3, answer4);
  console.log("quiz build");
}

function showResults() {
  //When time runs out, show results
  resultsContainer.empty();
  var gameOver = $("<h1>").text("GAME OVER!");
  var instruct = $("<p>").html("Your final score is " + score + "<br>" + "Enter your initials to save your highscore");
  var userInput = $("<input>").text("Your initials go here").addClass("initials");
  var submitHS = $("<button>").addClass("submit").text("Submit highscore");

  quizContainer.append(gameOver,instruct, userInput, submitHS);
}

//function to clear previousQuestion
function clearQuiz() {
  $(quizContainer).empty();
}

//timer function
function setTime() {
  secondsLeft = 61;
  var timerInterval = setInterval(function () {
    secondsLeft--;
    $(".timer").text("TIMER: " + secondsLeft);

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      //end game
      clearQuiz();
      showResults();
    }
  }, 1000);
}

//Start screen
function startScreen() {
  var quizTitle = $("<h1>").text("Coding Quiz Challenge");
  var info = $("<p>").text(
    "Try to Answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score by 1 and time by 10 seconds!"
  );
  var startBtn = $("<button>").addClass("startUp").text("START!")
  quizContainer.append(quizTitle, info, startBtn);
}
startScreen();


//Event Listeners
$(document).on("click",".startUp", function(){
    setTime();
    clearQuiz();
    getRand();
    buildQuiz(x);
})

$(document).on("click", ".answers", function () {
  console.log("button pressed: " + $(this).attr("data-letter"));
  console.log("x value is: " + x);
  console.log("Question Answer: " + questions[x].correctAnswer);
  //when answer button is selected
  var userAnswer = $(this).attr("data-letter");
  //Check if answer is correctf
  if (questions[x].correctAnswer === userAnswer) {
    score++; //if true, add point
    console.log("CORRECT!!");
    resultsContainer.text("CORRECT!!");
  } else {
    //if false, deduct time
    console.log("incorrect!!");
    resultsContainer.text("WRONG!!");
  }

  clearQuiz();
  x = getRand();
  console.log("new x: " + x);
  buildQuiz(x);
});
$(document).on("click", ".submit", function(){
localStorage.setItem("highscore", $(".initials").textContent);
clearQuiz();
setTime();
startScreen();
})
