var timeLeftEl = document.querySelector('header span');
var timeLeft = 10;
var startBtnEl = document.querySelector('#start');

// starts timer on click
startBtnEl.addEventListener('click', countdown);

// sets timer to start counting down
function countdown() {
    let timer = setInterval(function() {
        timeLeft -= 1;
        timeLeftEl.textContent = `Time left: ${timeLeft}`
        if (!timeLeft) {
            clearInterval(timer);
        }
    }, 1000)
}

