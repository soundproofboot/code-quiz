var timeLeftEl = document.querySelector('header span');
var mainSection = document.querySelector('main');
let viewHighScores = document.querySelector('a');
let headerEl = document.querySelector('header');
headerEl.style.display = 'flex';

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
// startBtnEl.addEventListener('click', gameStart);

// sets timer to start counting down

let countdown = function () {
    if (timeLeft > 0) {
        var timer = setInterval(function() {
            timeLeft -= 1;
            timeLeftEl.textContent = `Time left: ${timeLeft}`;
            if (timeLeft < 1 || qNumber+1 > listOfQuestions.length || qNumber === 999) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }
}

function gameStart() {
    timeLeft = 60;
    qNumber = 0;
    countdown();
    displayQuestion(qNumber);
};

function displayQuestion(num) {
    mainSection.innerHTML = '';
    // set the question being asked
    let question = listOfQuestions[qNumber];
    // set that question's text as a heading
    let questionText = document.createElement('h1');
    questionText.innerText = question.text;

    // set the container for the options
    let answerList = document.createElement('ul');
    // append these do the mainSection
    mainSection.appendChild(questionText);
    mainSection.appendChild(answerList);

    // make an array of possible answers
    let options = question.choices;
    // identify which option is correct
    let correctAnswer = options[question.correctIndex];

    // loop through array of options to display them on the screen
    for (let i = 0; i < options.length; i++) {
        let choice = document.createElement('li');
        choice.textContent = options[i];
        choice.style.margin = '5px';
        answerList.appendChild(choice);
        choice.addEventListener('click', function(e) {
           if (correctAnswer === e.target.textContent) {
               let response = document.createElement('h2');
               response.textContent = 'Correct! :)'
               mainSection.appendChild(response);
               qNumber++;
               setTimeout(function() {
                    if (timeLeft > 0 && listOfQuestions[qNumber]) {
                        mainSection.innerHTML = '';
                        displayQuestion(qNumber);
                    } else {
                        endGame();
                    }
                }, 1000)
           } else if (correctAnswer !== e.target.textContent) {
                let response = document.createElement('h2');
                response.textContent = 'Incorrect! :(';
                mainSection.appendChild(response);                
                qNumber++;
                timeLeft -= 10;
                setTimeout(function() {
                    if (timeLeft > 0 && listOfQuestions[qNumber]) {
                        mainSection.innerHTML = '';
                        displayQuestion(qNumber);
                    } else {
                        endGame();
                    }
                }, 1000)
           }
        });
    }
};

function endGame() {
    mainSection.innerHTML = '';
    timeLeft = Math.max(timeLeft, 0);
    timeLeftEl.textContent = `Time left: ${timeLeft}`;
    let formEl = document.createElement('form');
    mainSection.appendChild(formEl);
    let inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('placeholder', 'Enter your initials');
    let submitEl = document.createElement('input');
    

    submitEl.setAttribute('type', 'submit');
    submitEl.addEventListener('click', function(e) {
        e.preventDefault();
        let score = {
            name: inputEl.value,
            score: timeLeft
        };
        formEl.style.display = 'none';
        saveScore(score);
        highScorePage(score);
    })
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);
}

function highScorePage(obj) {
    qNumber = 999;
    headerEl.style.display = 'none'
    mainSection.innerHTML = '';

    let scoresContainer = document.createElement('div');
    mainSection.appendChild(scoresContainer);
    if (localStorage.length) {
        let scores = JSON.parse(localStorage.scores|| 'No scores');
        for (let i = 0; i < scores.length; i++) {
            let text = `${scores[i].name} - ${scores[i].score}`
            let item = document.createElement('p');
            item.textContent = text;
            scoresContainer.appendChild(item);
        }
    }
    else {
        scoresContainer.textContent = 'No saved scores';
    }

    


    let playAgain = document.createElement('button');
    playAgain.textContent = 'Play again';
    playAgain.addEventListener('click', function() {
        mainSection.removeChild(playAgain);
        mainSection.removeChild(scoresContainer);
        headerEl.style.display = 'flex';
        gameStart();
    })
    mainSection.appendChild(playAgain);

    // clear scores button
    let clearScoresEl = document.createElement('button');
    clearScoresEl.textContent = 'Clear high scores';
    clearScoresEl.addEventListener('click', function() {
        scoresContainer.innerHTML = '';
        localStorage.clear();
    });
    mainSection.appendChild(clearScoresEl);
    
}

function saveScore(obj) {
    if (!localStorage.scores) {
        let scores = [];
        scores.push(obj);
        localStorage.setItem('scores', JSON.stringify(scores));
    } else {
        let scoresArray = JSON.parse(localStorage.scores);
        scoresArray.push(obj);
        localStorage.scores = JSON.stringify(scoresArray);
    }
    
}

viewHighScores.addEventListener('click', function() {
    highScorePage();
});

function openingPage() {
    let openingHeading = document.createElement('h1');
    openingHeading.textContent = 'Coding Quiz Challenge';
    let openingP = document.createElement('p');
    openingP.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.';
    let startButtonEl = document.createElement('button');
    startButtonEl.textContent = 'START';
    mainSection.appendChild(openingHeading);
    mainSection.appendChild(openingP);
    mainSection.appendChild(startButtonEl);

    startButtonEl.addEventListener('click', gameStart);
}

openingPage();



// SAVE EXAMPLE FOR REFERENCE - LOCAL STORAGE
// let testUsers = [{
//     name: 'Dave',
//     score: 37
// }, {
//     name: 'Steve',
//     score: 40
// }]
// localStorage.setItem('scores', JSON.stringify(testUsers));
// let retrieved = JSON.parse(localStorage.scores);
// console.log(retrieved);

// if (!localStorage.scores) {
//     console.log('there are no scores');
// }

