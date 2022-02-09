
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

$(document).keydown(function(){
  if(level === 0) {
    nextSequence();
  }

});

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern.length);
  console.log(userClickedPattern);
  console.log(gamePattern.length);
  console.log(gamePattern);
});

function startOver() {
  level = 0;
  gamePattern = [];
}

function checkAnswer(index) {
  console.log(gamePattern[index]);
  console.log(userClickedPattern[index]);
  if(gamePattern[index] === userClickedPattern[index]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);

}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}
