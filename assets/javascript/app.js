
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
var node = document.createElement("h2");
var textnode;

/*============================
=            Game            =
============================*/
var currentQuestion;
var currentAnswerPack;
var randomNumber;
var correctOption;
var thirtyseconds = 30;
var timerId;



function Game() {
  this.question = null;
  this.option = "";
  this.answer = null;

}

Game.prototype.start = function () {
    var that = this;
    randomNumber = Math.floor(Math.random()*questionArray.length);
    this.flush();
    this.timer(thirtyseconds,display);
    this.evaluate();
    this.correctAnswer();

}


Game.prototype.timer = function(duration,display) {
    var timer = duration, minutes, seconds;
    var display = document.querySelector('#display');
    // var id = setInterval();
      function startTimer() {
          $("#display").html("00:" + timer);

          if (--timer < 0) {
              timer = duration;
              game.correctAnswer();
              alert('The correct answer is : ' + correctOption);
              game.reset();
              game.start();
          }
      }

      // setInterval(startTimer,1000);

      timerId = setInterval(startTimer, 1000);


}


Game.prototype.evaluate = function() {
    $('p').click(function() {
      var clickedOption = $(this).attr('data-val');
      console.log(clickedOption);
      if ( clickedOption == "true") {
        alert("You are correct!");
        game.reset();
        game.start();
      } else {
        alert("You're wrong");
      }
      // alert($(this).attr('data-val'));
    })
}




Game.prototype.correctAnswer = function() {
    for(key in currentAnswerPack) {
      if (currentAnswerPack[key] == true) {
        correctOption = key;
        return correctOption;
        // console.log(correctOption);
      }
    }
}

Game.prototype.flush = function() {
    currentQuestion = questionArray[randomNumber];
    // questionContainer.innerHTML = currentQuestion;

    // questionContainer.appendChild(node);
    // document.getElementsByTagName("h2")[0].setAttribute("class", "question anim-typewriter")
    // textnode = document.createTextNode(currentQuestion);
    // node.appendChild(textnode);

    $('.question-container').append(`<p class="question anim-typewriter">` +  currentQuestion + `</p>`);



    currentAnswerPack = answerAray[randomNumber];
    for (i in currentAnswerPack) {
        $('.answer-options').append(`<p class="options" data-val="${currentAnswerPack[i]}">`+ i + "</p>");
        console.log(currentAnswerPack[i]);
     }
}

Game.prototype.reset = function() {
   $('.question-container').empty();
   $('.answer-options').empty();
   clearInterval(timerId);
}

/*=============================
=            TIMER            =
=============================*/
// var correctOption;


// function startTimer(duration, display) {
//     var timer = duration, minutes, seconds;
//     setInterval(function () {
//         $("#display").html("00:" + timer);

//         if (--timer < 0) {
//             timer = duration;
//             game.correctAnswer();
//             alert('The correct answer is : ' + correctOption);
//             game.reset();
//             game.start();
//         }
//     }, 1000);
// }

// window.onload = function () {
//     var thirtyseconds = 10,
//         display = document.querySelector('#display');
//     startTimer(thirtyseconds, display);
// };



/*=====  End of TIMER  ======*/


var game = new Game();
game.start();
