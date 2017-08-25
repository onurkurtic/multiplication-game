var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

//start/reset button clicked
document.getElementById("startreset").onclick = function() {
  //if we are playing
  if (playing) {
    //reload page
    location.reload();
  } else {
    //if not playing
    playing = true;
    //set score to 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    //show answer boxes
    document.querySelector(".wrapper").style.display = "block";
    //show instructions
    show("instruction");
    //hide welcome message
    document.querySelector(".welcome-message").style.display = "none";
    //show countdown box
    show("timeremaining");
    timeRemaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
    hide("gameover");
    //reduce time by 1 second in loops
    startCountdown();
    //time left?
    //yes--> continue
    //no->gameover
    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";
    //generate a new question and answers
    generateQA();
  }
};

//Start counter
function startCountdown() {
  action = setInterval(function() {
    timeRemaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
    if (timeRemaining == 0) {
      stopCountdown();
      document.getElementById("startreset").innerHTML = "Start Game";
      show("gameover");
      document.getElementById("gotext").innerHTML =
        "<p>Game over!</p> <p>Your Score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
    }
  }, 1000);
}

//Stop counter
function stopCountdown() {
  clearInterval(action);
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

//Generate question and answers
function generateQA() {
  var x = Math.floor(Math.random() * 10 + 1);
  var y = Math.floor(Math.random() * 10 + 1);
  correctAnswer = x * y;
  document.getElementById("questiondisplay").innerHTML = x + " x " + y;
  var correctPosition = Math.floor(Math.random() * 4 + 1);
  //fill random box with correct answer
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;
  //fill other boxes with wrong answers

  var answers = [correctAnswer];

  for (var i = 1; i < 5; i++) {
    if (i != correctPosition) {
      //generate wrong answer
      var wrongAnswer;
      do {
        wrongAnswer =
          Math.floor(Math.random() * 10 + 1) *
          Math.floor(Math.random() * 10 + 1);
      } while (answers.indexOf(wrongAnswer) > -1);
      {
        //fill other boxes with wrong answers
        document.getElementById("box" + i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
      }
    }
  }
}

//Clicking on an answer box

for (var i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function() {
    //check if playing
    if (playing) {
      //check if the answer is correct
      if (this.innerHTML == correctAnswer) {
        //correct answer, increase score
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function() {
          hide("correct");
        }, 1000);
        //Generate new QA
        generateQA();
      } else {
        //wrong answer
        show("wrong");
        hide("correct");
        setTimeout(function() {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
