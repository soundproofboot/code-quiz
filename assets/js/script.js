var timeLeftEl = document.querySelector('header span');
var startBtnEl = document.querySelector('#start');
var headingEl = document.querySelector('main h1');
var mainSection = document.querySelector('main');
var footerEl = document.querySelector('footer');
let mainP = document.querySelector('main p');
let choicesContainer = document.createElement('ul');

let qNumber = 0;
var timeLeft = 60;

var listOfQuestions = [{
    text: 'What is it?',
    choices: ['stuff', 'thing', 'this', 'that'],
    correctIndex: 1
    }, {
    text: 'Who is it?',
        choices: ['me', 'you', 'them', 'us'],
        correctIndex: 2
    }];

// starts timer on click
startBtnEl.addEventListener('click', gameStart);

// sets timer to start counting down
function countdown() {
    if (timeLeft > 0) {
        let timer = setInterval(function() {
            timeLeft -= 1;
            timeLeftEl.textContent = `Time left: ${timeLeft}`;
            if (timeLeft < 1 || qNumber+1 > listOfQuestions.length) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }
}
    


function gameStart() {
    timeLeft = 60;
    qNumber = 0;
    startBtnEl.style.display = 'none';
    mainP.style.display = 'none';
    countdown();
    displayQuestion(qNumber);
};

function displayQuestion(num) {
    footerEl.textContent = '';
    let question = listOfQuestions[qNumber];
    headingEl.textContent = question.text;
    choicesContainer.classList.add('column');
    mainSection.appendChild(choicesContainer);
    let options = question.choices;
    let correctAnswer = options[question.correctIndex];
    for (let i = 0; i < options.length; i++) {
        let choice = document.createElement('li');
        choice.textContent = options[i];
        choice.style.margin = '5px';
        choicesContainer.appendChild(choice);
        choice.addEventListener('click', function(e) {
           if (correctAnswer === e.target.textContent) {
                footerEl.textContent = 'Correct! :)'
                qNumber++;
                setTimeout(function() {
                    if (timeLeft > 0 && listOfQuestions[qNumber]) {
                        choicesContainer.innerHTML = '';
                        displayQuestion(qNumber);
                    }
                }, 1000)
           } else {
                footerEl.textContent = 'Incorrect :(';
                qNumber++;
                timeLeft -= 10;
                setTimeout(function() {
                    if (timeLeft > 0 && listOfQuestions[qNumber]) {
                        choicesContainer.innerHTML = '';
                        displayQuestion(qNumber);
                    }
                }, 1000)
           }
        });
    }
};

function endGame() {
    console.log('end game');
    footerEl.textContent = '';
    choicesContainer.style.display = 'none';
    timeLeftEl.textContent = `Time left: ${timeLeft}`;
    headingEl.textContent = 'All done!';
    mainP.style.display  = 'block';
    mainP.textContent = 'Your final score is ' + timeLeft;
    let formEl = document.createElement('form');
    footerEl.appendChild(formEl);
    let inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('placeholder', 'Enter your initials');
    
    formEl.appendChild(inputEl);
}