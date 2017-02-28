
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
}


Game.prototype.evaluate = function() {
    $('.options').click(function() {
      alert($(this).attr('data-val'));
    })
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

var game = new Game();
game.start();

