
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
    // minutes and seconds are undefined here
    // also it's unnecessary to assign duration to timer when you can just work directly with duration
    var display = document.querySelector('#display');
    // var id = setInterval();
      function startTimer() {
          $("#display").html("00:" + duration);

          if (--duration < 0) {
              this.correctAnswer();
              // it's a much smoother user experience to display this information in the html and not in an alert box
              alert('The correct answer is : ' + correctOption);
              // it may be a little more work, but you should use a more generic context reference such as `this`
              // the reason being you don't want any of your methods to be dependent upon an outside variable name.
              this.reset();
              this.start();
          }
      }

      // `.bind` will set the context for the function call, which just needs to be `this` for startTimer's case
      timerId = setInterval(startTimer.bind(this), 1000);


}


Game.prototype.evaluate = function() {
    var that = this
    $('p').click(function() {
      var clickedOption = $(this).attr('data-val');
      // you wanna remove all your console.logs before pushing code to production
      // console.log(clickedOption);
      // it's best to always use strict equality checking - otherwsie people who 
      // don't understand the nuances of type coercion checking may introduce pesky bugs 🐛
      if ( clickedOption == "true") {
        alert("You are correct!");
        that.reset();
        that.start();
      } else {
        alert("You're wrong");
      }

    })
}




Game.prototype.correctAnswer = function() {
    for(key in currentAnswerPack) {
      if (currentAnswerPack[key] == true) {
        correctOption = key;
        return correctOption;
        // $(".answer-options").empty();
        // $('.answer-options').append(`<p class="question anim-typewriter"`+ correctOption + "</p>");
        // console.log(correctOption);
      }
    }
}


Game.prototype.flush = function() {
    currentQuestion = questionArray[randomNumber];
    $('.question-container').append(`<p class="question anim-typewriter">` +  currentQuestion + `</p>`);


    currentAnswerPack = answerAray[randomNumber];
    for (i in currentAnswerPack) {
        // May as well just use one long template string instead of a mix of templating and concatenation
        $('.answer-options').append(`<p class="options" data-val="${currentAnswerPack[i]}">${i}</p>`);
        // console.log(currentAnswerPack[i]);
     }
}

Game.prototype.reset = function() {
   $('.question-container').empty();
   $('.answer-options').empty();
   clearInterval(timerId);
}


var game = new Game();
game.start();



/*===============================
=            WEATHER            =
===============================*/
// very cool stuff here!! I would recommend that you wrap your above code in an iife (immediately invoked function expression) as well though!
// One of the most important reasons for that is security - because right now your above code can be tampered with through the console
// by a malicious visitor to your trivia game 😮
(function() {

  var Weather = {
    init: function() {
      this.getLocation();
      this.showTime();
      $('#unit-switch').on('click', this.changeUnit);
      $('#refresh').on('click', this.refresh);
    },

    cache: {
      showFahrenheit: true,
    },

    getLocation: function() {
      var c = Weather.cache;
      
      if ( window.chrome ) {
        $.getJSON('https://ip-api.com/json', function(json) {
          c.lat = json.lat;
          c.long = json.lon;
          Weather.getInformation();
        });
      } else {
        if ( navigator.geolocation ) {
          navigator.geolocation.getCurrentPosition(function(data) {
            c.lat = data.coords.latitude;
            c.long = data.coords.longitude;
            Weather.getInformation();
          });
        }
      }
      
    },

    getInformation: function() {
      var c = Weather.cache;
    
      $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + c.lat + '&lon=' + c.long + '&units=imperial&appid=3acc16ffae9e45df92a064e41646355f', function(json) {
        c.location = json.name;
        c.country = json.sys.country;
        c.fahrenheit = Math.round(json.main.temp);
        c.celcius = Math.round((c.fahrenheit - 32) * 5 / 9);
        c.icon = json.weather[0].id;
        c.coverage = json.weather[0].main;
        c.sunrise = json.sys.sunrise;
        c.sunset = json.sys.sunset;
        
        Weather.showMainInformation();
        Weather.showCurrentCoverage();
      });
    },

    showMainInformation: function() {
      var c = Weather.cache;
      
      // Show Location
      $('#location').html(c.location + ', ' + c.country);
      // Show Temp
      $('#temp').html(c.showFahrenheit === false ? c.celcius : c.fahrenheit);
    },

    showCurrentCoverage: function() {
      var c = Weather.cache;
      var currentTime = new Date().getTime() / 1000;

      // Show Day/Night Icon based on current time
      if ( currentTime > c.sunrise && currentTime < c.sunset ) {
        $('#icon').attr('class', 'wi wi-owm-day-' + c.icon);
      } else {
        $('#icon').attr('class', 'wi wi-owm-night-' + c.icon);
      }
      // Show coverage text
      $('#coverage').html(Weather.cache.coverage);
    },

    showTime: function() {
      var time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();

      // Display a zero before hours/minutes if below 10
      if ( hours < 10 ) {
        $('#time').html(minutes < 10 ? '0' + hours + ':0' + minutes : '0' + hours + ':' + minutes);
      } else {
        $('#time').html(minutes < 10 ? hours + ':0' + minutes : hours + ':' + minutes);
      }
    },

    changeUnit: function() {
      var c = Weather.cache;
      
      // Toggle temp unit type on click
      if ( c.showFahrenheit === false ) {
        $('#temp').html(c.fahrenheit);
        c.showFahrenheit = true;
      } else {
        $('#temp').html(c.celcius);
        c.showFahrenheit = false;
      }
      
      // Toggles the button knob
      $('#unit-toggle').toggleClass('toggle');
      // Creates the fade in effect on the temp text
      $('#temp').toggleClass('toggle');
    },

    refresh: function() {
      Weather.showTime();
      Weather.getLocation();
    }
  };

  Weather.init();

})();
/*=====  End of WEATHER  ======*/
