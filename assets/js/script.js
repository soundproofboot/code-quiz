var timeLeft = 60;
var timeLeftEl = document.querySelector('header span');
var startBtnEl = document.querySelector('#start');
var headingEl = document.querySelector('main h1');
var mainSection = document.querySelector('main');


var listOfQuestions = [{
text: 'What is it?',
    choices: ['stuff', 'thing', 'this', 'that'],
    correctIndex: 1
}];

// starts timer on click
startBtnEl.addEventListener('click', gameStart);

// sets timer to start counting down
function countdown() {
    if (timeLeft > 0) {
        let timer = setInterval(function() {
            timeLeft -= 1;
            timeLeftEl.textContent = `Time left: ${timeLeft}`;
            if (timeLeft < 1) {
                clearInterval(timer);
            }
        }, 1000);
    }
}

function gameStart() {
    startBtnEl.style.display = 'none';
    let mainP = document.querySelector('main p');
    mainP.style.display = 'none';
    countdown();
    displayQuestion();

}

function displayQuestion() {
    headingEl.textContent = listOfQuestions[0].text;
    let choicesContainer = document.createElement('ul');
    choicesContainer.classList.add('column');
    mainSection.appendChild(choicesContainer);
    let options = listOfQuestions[0].choices;
    for (let i = 0; i < options.length; i++) {
        let choice = document.createElement('li');
        choice.textContent = options[i];
        choice.style.margin = '5px';
        choicesContainer.appendChild(choice);
    }
}
