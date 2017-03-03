
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
        $('.answer-options').append(`<p class="options" data-val="${currentAnswerPack[i]}">`+ i + "</p>");
        console.log(currentAnswerPack[i]);
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
        $.getJSON('http://ip-api.com/json', function(json) {
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
    
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + c.lat + '&lon=' + c.long + '&units=imperial&appid=3acc16ffae9e45df92a064e41646355f', function(json) {
        
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
