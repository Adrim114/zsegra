$(document).ready(function() {
    const colors = ["green", "red", "yellow", "blue"];
    let gameSequence = [];
    let userSequence = [];
    let level = 0;
    let started = false;
    function startGame() {
        level = 0;
        gameSequence = [];
        userSequence = [];
        started = true;
        $("h1").text("Poziom " + level);
        nextSequences();
    };
    function nextSequences() {
        userSequence = [];
        level += 1;
        $("h1").text("Poziom " + level);
        const randomColor = colors[Math.floor(Math.random() * 4)]; 
        gameSequence.push(randomColor); 
        $("#" + randomColor).fadeOut(100).fadeIn(100);
        playSound(randomColor); 
    }
    function playSound(colors){
        const audio = new Audio(`../dzwiek/${colors}.mp3`);
        $(audio).on("error", function() {
            console.log(`Nie znaleziono pliku dźwiękowego: ${colors}.mp3`);
        });
        audio.play();
    };    
    function animatePress() {
        $(`#${colors}`).addClass("pressed");
        setTimeout(() => {
            $(`#${colors}`).removeClass("pressed");
        }, 100);
    };
    function checkAnswer(currentLevel) {
        if(userSequence[currentLevel] === gameSequence[currentLevel]) {
            if (userSequence.length === gameSequence.length) {
                setTimeout(() => {
                    nextSequences();
                }, 1000);
            }
        } else {
            playSound("game-over");
            $("body").addClass("game-over");
            $("h1").text("Przegrałeś... zacznij od nowa");

            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 100);

            startOver();
        }
    }
    function startOver() {
        started = false;
        $("h1").text("Naciśnij Start, aby rozpocząć grę");
    };
    $(".zse-kwadrat").click(function () {
        if(!started) return; 
        const userChosenColor = $(this).attr("id");
        userSequence.push(userChosenColor); 
        animatePress(userChosenColor); 
        playSound(userChosenColor); 
        checkAnswer(userSequence.length - 1); 
    });
    $(".zse-container").click(function () {
        if(!started) {
            startGame(); 
        }
    })
});
