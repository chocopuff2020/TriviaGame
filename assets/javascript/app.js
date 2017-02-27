
var questionArray = [
    " Which is the tallest mammal?",
    " Mount Everest is found in which mountain range?",
    " Spinach is high in which mineral?",
    " Prunes are dried what?",
    " The hardest natural substance known is what? "
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
  }
]

var questionContainer = document.querySelector('.question-container');
var answerOption = document.querySelector('.answer-options');

/*============================
=            Game            =
============================*/
function Game() {
  this.question = null;
  this.option = "";
  this.answer = null;

}

Game.prototype.start = function () {
    var that = this;
    var randomNumber = Math.floor(Math.random()*questionArray.length);
    var currentQuestion = questionArray[randomNumber];
        questionContainer.innerHTML = currentQuestion;
    var currentAnswerPack = answerAray[randomNumber];
     for (i in currentAnswerPack) {
        $('.answer-options').append("<p>"+ i + "</p>")
        console.log(i);
     }
}

// Game.prototype.flush = function() {

// }

var game = new Game();
game.start();


/*=====  End of Game  ======*/


/*==========================================
=            Distrubute answers            =
==========================================*/
// function AnswerOptions(options) {
//   this.element = this.renderOption();
// }

// AnswerOptions.prototype.renderOption = function(options) {
//     var p = document.createElement('p');
//     return p;
// }
/*=====  End of Distrubute answers  ======*/
