
var questionArray = [
    " Which is the tallest mammal?",
    " Mount Everest is found in which mountain range?",
    " Spinach is high in which mineral?",
    " Prunes are dried what?",
    " The hardest natural substance known is what?",
    " Sauerkraut is made from what finely cut vegetable?",
]

var answerAray = [
  { "cat" : false,
    "dog" : false,
    "giraffe" : true,
    "pig": false
  },
  { "Himalayas": true,
    "Mount Rushmore": false,
    "Alps" : false,
    "Dolomites": false,
  },
  {
    "Iron": true,
    "Calcium": false,
    "Phosphorus": false,
    "Potassium": false
  },
  { "Carrots": false,
    "Plums": true,
    "Peach": false,
    "Appricot": false
  },
  { "Iron": false,
    "Cement": false,
    "Concrete": false,
    "Diamond": true
  },
  {
    "Cabbage": true,
    "Carrot": false,
    "Onion": false,
    "Kale":false,
  }
]

var questionContainer = document.querySelector('.question-container');
var answerOption = document.querySelector('.answer-options');

/*=============================
=            TIMER            =
=============================*/
// var intervalId;
// var stopwatch = {
//   time: 0,

//   reset: function() {
//     stopwatch.time = 0;
//     $("#display").html("00:00");
//   },

//   start: function() {
//     intervalId = setInterval(stopwatch.count, 1000*30);
//   },

//   stop: function() {
//     clearInterval(intervalId);
//   },

//   count: function() {
//     stopwatch.time++;
//     var converted = stopwatch.timeConverter(stopwatch.time);
//     console.log(converted);
//     $("#display").html(converted);
//   },

//   timeConverter: function(t) {
//     var minutes = Math.floor(t / 60);
//     var seconds = t - (minutes * 60);
//     if (seconds < 10) {
//       seconds = "0" + seconds;
//     }
//     if (minutes === 0) {
//       minutes = "00";
//     }
//     else if (minutes < 10) {
//       minutes = "0" + minutes;
//     }
//     return minutes + ":" + seconds;
//   }
// };


var correctOption;


// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         minutes = parseInt(timer / 60, 10);
//         seconds = parseInt(timer % 60, 10);

//         minutes = minutes < 10 ? "0" + minutes : minutes;
//         seconds = seconds < 10 ? "0" + seconds : seconds;

//         display.textContent = minutes + ":" + seconds;

//         if (--timer < 0) {
//             timer = duration;
//             Game.correctAnswer();

//             alert("The correct answer is "+ correctOption);
//         }
//     }, 1000);
// }

// window.onload = function () {
//     var countdownFrom = 30,
//         display = document.querySelector('#display');
//     startTimer(countdownFrom, display);
// };

/*=====  End of TIMER  ======*/




/*============================
=            Game            =
============================*/
var currentQuestion;
var currentAnswerPack;
var randomNumber;


function Game() {
  this.question = null;
  this.option = "";
  this.answer = null;

}

Game.prototype.start = function () {
    var that = this;
    randomNumber = Math.floor(Math.random()*questionArray.length);
    this.flush();
    this.evaluate();
    this.correctAnswer();

}


Game.prototype.evaluate = function() {
    $('.options').click(function() {
      alert($(this).attr('data-val'));
    })
}

Game.prototype.correctAnswer = function() {
    for(key in currentAnswerPack) {
      if (currentAnswerPack[key] == true) {
        correctOption = key;
        console.log(correctOption);
      }
    }
}


Game.prototype.flush = function() {
    currentQuestion = questionArray[randomNumber];
    questionContainer.innerHTML = currentQuestion;
    currentAnswerPack = answerAray[randomNumber];
    for (i in currentAnswerPack) {
        $('.answer-options').append(`<p class="options" data-val="${currentAnswerPack[i]}">`+ i + "</p>");
        console.log(currentAnswerPack[i]);
     }
}

Game.prototype.startTimer = function(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                timer = duration;
                this.correctAnswer();
                alert("The correct answer is "+ correctOption);
            }
        }, 1000);
}

var game = new Game();
game.start();

window.onload = function () {
            var countdownFrom = 30,
            display = document.querySelector('#display');
            Game.startTimer(countdownFrom, display);
};


