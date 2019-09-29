/*
GAME FUNCTIONS
- Player must guess a number between a min and max
- Player gets a certain amount of fuesses
- Notify player of fuesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/


// Game values
let min = localStorage.getItem("beginTafel"),
    max = localStorage.getItem("eindTafel"),
    tafel = Math.floor(Math.random() * (max - min + 1) + min),
    product = (Math.floor(Math.random() * (10 - 0 + 1) + 0)),
    winningNum = getRandomNum(tafel, product),
    aantalJuist = 0,
    aantalFout = 0,
    gemiddeldeSessie,
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num'),
    eersteDeel = document.getElementById('tafel'),
    maxNum = document.querySelector('.max-num'),
    tweedeDeel = document.getElementById('product'),
    guessBtn = document.getElementById('guess-btn'),
    setTafelsBtn = document.getElementById('keuzeTafelsBtn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message'),
    sessieJuist = document.getElementById("sessieJuist"),
    sessieFouten = document.getElementById('sessieFouten'),
    sessiePercentage = document.getElementById('sessiePercentage'),
    berekeningPercentageJuist = Number(localStorage.getItem("aantalJuist")),
    berekeningPercentageFout = Number(localStorage.getItem("aantalFout"))

// Set scope tafels en localstorage
setTafelsBtn.addEventListener('click', function() {
    let beginTafel = document.getElementById("startTafel").value;
    let eindTafel = document.getElementById("eindTafel").value;
    localStorage.setItem("beginTafel", beginTafel);
    localStorage.setItem("eindTafel", eindTafel);
    window.location.reload();
});



// Assign UI min and max
document.getElementById('startTafel').value = min;
document.getElementById('eindTafel').value = max;
document.getElementById('symbool').textContent = "X";
minNum.textContent = min;
maxNum.textContent = max;
eersteDeel.textContent = tafel;
tweedeDeel.textContent = product;
sessieJuist.textContent = berekeningPercentageJuist;
sessieFouten.textContent = berekeningPercentageFout;

// Percentage bepalen
let Totaal = (berekeningPercentageJuist + berekeningPercentageFout);
gemiddeldeSessie = Math.round((berekeningPercentageJuist / Totaal) * 100);
sessiePercentage.textContent = gemiddeldeSessie;

// Set user choise
setTafelsBtn.addEventListener('click', function() {
    min = document.getElementById('startTafel').value;
    max = document.getElementById('eindTafel').value;
});

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});



// On enter
game.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        let guess = parseInt(guessInput.value);
        // Validate
        if (isNaN(true) || guess < min || guess > max) {
            setMessage(`Brobeer nog een keer`, 'red');
        }
        if (guess === winningNum) {
            // Game over - won
            gameOver(true, `${winningNum} is juist!   DOE ZO VOORT!`);
            document.getElementById('smilySmile').removeAttribute('hidden');
            document.getElementById('smilySad').setAttribute('hidden', true);
            aantalJuist = Number(localStorage.getItem("aantalJuist"));
            console.log(aantalJuist);
            aantalJuist++;
            localStorage.setItem("aantalJuist", aantalJuist);



        } else {
            // wrong number
            guessesLeft -= 1;

            if (guessesLeft === 0) {
                // Game over lost

                gameOver(false, `Het juiste antwoord was ${winningNum} MEER OEFENEN`, 'red')
                document.getElementById('smilyAngry').removeAttribute('hidden');
                document.getElementById('smilySad').setAttribute('hidden', true);
                aantalFout = Number(localStorage.getItem("aantalFout"));
                aantalFout++;
                localStorage.setItem("aantalFout", aantalFout);

            } else {
                // Game continues - answer wrong

                // Change border color
                guessInput.style.borderColor = 'red';

                // Clear Input
                guessInput.value = '';

                // Tell user its the wrong number
                setMessage(`${guess} is niet juist, ${guessesLeft} pogingen te gaan`, 'orange')
                document.getElementById('smilySad').removeAttribute('hidden');
            }
        }
    }
});



// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    // Validate
    if (isNaN(true) || guess < min || guess > max) {
        setMessage(`Brobeer nog een keer`, 'red');
    }
    if (guess === winningNum) {
        // Game over - won
        gameOver(true, `${winningNum} is juist!   DOE ZO VOORT!`);
        document.getElementById('smilySmile').removeAttribute('hidden');
        document.getElementById('smilySad').setAttribute('hidden', true);
        aantalJuist = Number(localStorage.getItem("aantalJuist"));
        console.log(aantalJuist);
        aantalJuist += 1;
        localStorage.setItem("aantalJuist", aantalJuist);


    } else {
        // wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            // Game over lost

            gameOver(false, `Het juiste antwoord was ${winningNum} MEER OEFENEN`, 'red')
            document.getElementById('smilyAngry').removeAttribute('hidden');
            document.getElementById('smilySad').setAttribute('hidden', true);
            aantalFout = Number(localStorage.getItem("aantalFout"));
            aantalFout += 1;
            localStorage.setItem("aantalFout", aantalFout);
            if (e.keyCode === 13) {
                window.location.reload();
            }

        } else {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear Input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is niet juist, ${guessesLeft} pogingen te gaan`, 'orange')
            document.getElementById('smilySad').removeAttribute('hidden');
        }
    }
});
// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;
    // Set text color
    message.style.color = color;
    // Set message
    setMessage(msg);

    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
    // Play again with enter
    game.addEventListener('keypress', function(e) {
        if (e.target.className === 'play-again') {
            if (e.keyCode === 13) {
                window.location.reload();
            }
        }
    });

}

// Get winning number
function getRandomNum(min, max) {
    let vermenigvuldiging = min * max;
    return vermenigvuldiging;
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}