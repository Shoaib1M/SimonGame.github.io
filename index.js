var buttonColours = ["red", "blue", "green", "yellow"];
var gameseq = [];

var userchosencolor = [];

var start = false;
var level = 0;

function startover(){
    level=0;
    start = false;
    gameseq = [];
}

$(document).keypress(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextsequence();
    start = true;
  }
});

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function pressed(name) {
  $("." + name).addClass("pressed");
  setTimeout(function() {
    $("." + name).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gameseq[currentLevel] === userchosencolor[currentLevel]) {
    console.log("success");

    if (userchosencolor.length === gameseq.length) {
      setTimeout(function() {
        nextsequence();
      }, 1000);
    }

  } else {
        $('h1').text("Game Over, Press Any Key To Restart!")
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startover();



    }
}

$(".btn").click(function() {
  var clickedcolor = $(this).attr("id");
  userchosencolor.push(clickedcolor);

  playSound(clickedcolor);
  pressed(clickedcolor);

  checkAnswer(userchosencolor.length - 1);
});

function nextsequence() {
  userchosencolor = []; 

  level++;
  $("#level-title").text("Level " + level);

  var num = Math.floor(Math.random() * 4);
  var randcolor = buttonColours[num];
  gameseq.push(randcolor);

  $("#" + randcolor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randcolor);
  pressed(randcolor);
}
