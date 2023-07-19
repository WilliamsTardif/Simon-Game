var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var userCurrentLevel = 0;

$("body").on("keydown", startGame);

function startGame() {
    newSequence();
    $(".btn").click(userAnwser);
}

function newSequence() {
    userCurrentLevel = 0;
    $("h1").text("Level " + level);
    var randomChosenColour = getRandomColourChosen();
    gamePattern.push(randomChosenColour);
    makeAnimation(randomChosenColour);
    makeSound(randomChosenColour);
}

function getRandomColourChosen() {
    var newNumber = Math.floor(Math.random() * 4);
    return buttonColours[newNumber];
}

function makeAnimation(id) {
    $("." + id).addClass("pressed");
    setTimeout(function() {$("." + id).removeClass("pressed");}, 100);
}   

function makeSound(id) {
    console.log(id);
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}

function userAnwser() {
    var userChosenColour = this.id;
    makeAnimation(userChosenColour);
    makeSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer();
}

function checkAnswer() {
    if(userClickedPattern[userCurrentLevel] == gamePattern[userCurrentLevel]) {
        if(userCurrentLevel == level) {
            nextLevel();
        } else {
            userCurrentLevel++;
        }
    } else {
        gameOver();
    }
}

function nextLevel() {
    userClickedPattern = [];
    level++;
    setTimeout(newSequence, 1000);
}

function gameOver() {
    $("body").addClass("game-over");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {$("body").removeClass("game-over");}, 200);
    resetGame();
}

function resetGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    userCurrentLevel = 0;
    setTimeout(newSequence, 1000);
}