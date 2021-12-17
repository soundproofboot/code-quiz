var timeLeftEl = document.querySelector('header span');
var mainSection = document.querySelector('main');
let viewHighScores = document.querySelector('a');
let headerEl = document.querySelector('header');
headerEl.style.display = 'flex';

let qNumber = 0;
var timeLeft = 60;

var listOfQuestions = [{
    text: 'Which of these is not a primitive data type?',
    choices: ['string', 'number', 'boolean', 'array'],
    correctIndex: 3
    }, {
    text: 'True or False: Javascript and Java are the same',
        choices: ['True', 'False'],
        correctIndex: 1
    }, {
        text: 'Which HTML element do you use to link your Javascript file?',
        choices: ['<script>', '<link>', '<javascript>', '<style>'],
        correctIndex: 0
    }, {
        text: 'Which operator is required to check if BOTH parts of an if statement are true?',
        choices: ['>>', '||', '&&', '++'],
        correctIndex: 2
    }, {
        text: 'What is the proper syntax for a function?',
        choices: ['function anyFunction() {}', 'anyFunction{} ()', 'function {}', 'func anyFunction({})'],
        correctIndex: 0
    }, {
        text: 'True or False: For loops can be used to iterate through arrays',
        choices: ['True', 'False'],
        correctIndex: 0
    }
];

let countdown = function () {
    if (timeLeft > 0) {
        var timer = setInterval(function() {
            timeLeft -= 1;
            timeLeftEl.textContent = `Time left: ${timeLeft}`;
            if (timeLeft < 1 || qNumber+1 > listOfQuestions.length || qNumber === 'stop') {
                clearInterval(timer);
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
    questionText.style.marginTop = '100px';

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
                e.target.style.backgroundColor = 'rgb(245, 90, 245)'
               let response = document.createElement('h3');
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
                }, 500)
           } else if (correctAnswer !== e.target.textContent) {
                e.target.style.backgroundColor = 'red';
                let response = document.createElement('h3');
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
                }, 500)
           }
        });
    }
};

function endGame() {
    mainSection.innerHTML = '';
    if (timeLeft < 1) {
        let timeUpEl = document.createElement('h1');
        timeUpEl.textContent = `Sorry, you've run out of time!`
        timeUpEl.style.marginTop = '200px';
        mainSection.appendChild(timeUpEl);

        let playAgain = document.createElement('button');
        playAgain.textContent = 'Home';
        playAgain.addEventListener('click', function() {
        mainSection.innerHTML = '';
        headerEl.style.display = 'flex';
        openingPage();
    })
    mainSection.appendChild(playAgain);

    }
    else {
        timeLeft = Math.max(timeLeft, 0);
        timeLeftEl.textContent = `Time left: ${timeLeft}`;
        let formEl = document.createElement('form');
        formEl.style.marginTop = '200px';
        mainSection.appendChild(formEl);
        let inputEl = document.createElement('input');
        inputEl.setAttribute('type', 'text');
        inputEl.setAttribute('placeholder', 'Enter your initials');
        let submitEl = document.createElement('input');
        submitEl.setAttribute('value', 'Submit');
        
    
        submitEl.setAttribute('type', 'submit');
        submitEl.addEventListener('click', function(e) {
            e.target.style.backgroundColor = 'rgb(245, 90, 245)';
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

}

function highScorePage(obj) {
    headerEl.style.display = 'none'
    mainSection.innerHTML = '';

    let scoresContainer = document.createElement('div');
    scoresContainer.style.marginTop = '200px';
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
    playAgain.textContent = 'Home';
    playAgain.addEventListener('click', function() {
        mainSection.innerHTML = '';
        headerEl.style.display = 'flex';
        openingPage();
    })
    mainSection.appendChild(playAgain);

    // clear scores button
    if (localStorage.length) {
        let clearScoresEl = document.createElement('button');
    clearScoresEl.textContent = 'Clear high scores';
    clearScoresEl.addEventListener('click', function() {
        scoresContainer.innerHTML = '';
        localStorage.clear();
    });
    mainSection.appendChild(clearScoresEl);
    }
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
    timeLeft = 60;
    qNumber = 'stop';
    timeLeftEl.textContent = `Time left: 60`;
    let openingHeading = document.createElement('h1');
    openingHeading.textContent = 'Coding Quiz Challenge';
    openingHeading.style.marginTop = '100px';
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

