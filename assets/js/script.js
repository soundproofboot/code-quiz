// variables to grab the html elements
var timeLeftEl = document.querySelector('header span');
var mainSection = document.querySelector('main');
let viewHighScores = document.querySelector('a');
let headerEl = document.querySelector('header');

// make heading a flex container 
headerEl.style.display = 'flex';

// load the highscores when user clicks view high scores
viewHighScores.addEventListener('click', function() {
    highScorePage();
});

// variables to control the timer and the order of questions
let qNumber = 0;
var timeLeft = 60;

// List of questions to be asked, set up as an array of objects to access different properties for each question
var listOfQuestions = [{
    // question asked
    text: 'Which of these is not a primitive data type?',
    // choices for answers
    choices: ['string', 'number', 'boolean', 'array'],
    // index of correct answer to give accurate response
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

// function controlling the timer
let countdown = function () {
    // as long as timeLeft is greater than 0
    if (timeLeft > 0) {
        // starts the interval to run each second
        var timer = setInterval(function() {
            // subtracts 1 from the time left
            timeLeft -= 1;
            // sets the element showing the time to the current time left
            timeLeftEl.textContent = `Time left: ${timeLeft}`;
            // conditions for how to break from the interval
            if (timeLeft < 1 || qNumber+1 > listOfQuestions.length || qNumber === 'stop') {
                clearInterval(timer);
            }
        }, 1000);
    }
};

// first page to load
function openingPage() {
    // resets timer if not first time taking quiz
    timeLeft = 60;
    // hack to stop the timer running if user clicks high score during quiz
    qNumber = 'stop';
    // set the time left to show it's ready to go
    timeLeftEl.textContent = `Time left: 60`;
    // create intro to code quiz
    let openingHeading = document.createElement('h1');
    openingHeading.textContent = 'Coding Quiz Challenge';
    openingHeading.style.marginTop = '100px';
    // create p element explaining how the code quiz will work
    let openingP = document.createElement('p');
    openingP.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.';
    // create button to start the quiz
    let startButtonEl = document.createElement('button');
    startButtonEl.textContent = 'START';
    // append these elements to page
    mainSection.appendChild(openingHeading);
    mainSection.appendChild(openingP);
    mainSection.appendChild(startButtonEl);
    // run function to start the quiz when start button is clicked
    startButtonEl.addEventListener('click', gameStart);
};

// function called when game is started
function gameStart() {
    // resets time to 60
    timeLeft = 60;
    // resets the current question to 0, index of first question
    qNumber = 0;
    // sets the timer counting down
    countdown();
    // runs function to display first question, which will loop after a response is given
    displayQuestion(qNumber);
};

// function to show each question
function displayQuestion(num) {
    // removes whatever content was in the main section of the page
    mainSection.innerHTML = '';
    // set the question being asked
    let question = listOfQuestions[qNumber];
    // set that question's text as a heading
    let questionText = document.createElement('h1');
    // puts that text in the heading
    questionText.innerText = question.text;
    // pushes the question down closer to center of page
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
        // create new element for choice
        let choice = document.createElement('li');
        // set text of choice to text of that index
        choice.textContent = options[i];
        // gives some space between options
        choice.style.margin = '5px';
        // adds that choice to bottom of list
        answerList.appendChild(choice);
        // adds click listener to control response
        choice.addEventListener('click', function(e) {
            // if the element clicked is at the correct index
           if (correctAnswer === e.target.textContent) {
            // change style to visualize correct response
                e.target.style.backgroundColor = 'rgb(245, 90, 245)'
                // create element to show response was correct
               let response = document.createElement('h3');
               response.textContent = 'Correct! :)'
               mainSection.appendChild(response);
                // move to index of next question
               qNumber++;
                // timeout function used to allow user to see the response before next question loads, wait half second
               setTimeout(function() {
                // if there is time left on the clock and there are still questions to be asked
                    if (timeLeft > 0 && listOfQuestions[qNumber]) {
                        // clear current question
                        mainSection.innerHTML = '';
                        // display next question
                        displayQuestion(qNumber);
                    } else {
                        // if time has reached 0 after response, go to end of game
                        endGame();
                    }
                }, 500)
                // if question was answered incorrectly
           } else if (correctAnswer !== e.target.textContent) {
                // display red color to show answer was incorrect
                e.target.style.backgroundColor = 'red';
                // create text that says Incorrect
                let response = document.createElement('h3');
                response.textContent = 'Incorrect! :(';
                mainSection.appendChild(response);
                //Move counter to next question 
                qNumber++;
                // Subtract 10 seconds from timer/score
                timeLeft -= 10;
                // use timeout to allow response to be shown before next question loads, wait half a second
                setTimeout(function() {
                    // if there is time left and another question to be asked
                    if (timeLeft > 0 && listOfQuestions[qNumber]) {
                        // clear content from main section
                        mainSection.innerHTML = '';
                        // display next question
                        displayQuestion(qNumber);
                    } else {
                        // otherwise go to end of game
                        endGame();
                    }
                }, 500)
           }
        });
    }
};

// end of game, time is 0 or questions have all been answered
function endGame() {
    // clear last question's content from main section
    mainSection.innerHTML = '';
    // if time has run out
    if (timeLeft < 1) {
        // Show user they've run out of time
        let timeUpEl = document.createElement('h1');
        timeUpEl.textContent = `Sorry, you've run out of time!`
        timeUpEl.style.marginTop = '200px';
        mainSection.appendChild(timeUpEl);

        // Give user button to click to play again
        let playAgain = document.createElement('button');
        playAgain.textContent = 'Home';
        playAgain.addEventListener('click', function() {
        mainSection.innerHTML = '';
        headerEl.style.display = 'flex';
        // Go back to opening page
        openingPage();
    })
    mainSection.appendChild(playAgain);

    }
    // if time is left, player can enter their high score
    else {
        // if by subtraction of 10 seconds the time counter has gone below 0, set back to 0
        timeLeft = Math.max(timeLeft, 0);
        // show time left as 0
        timeLeftEl.textContent = `Time left: ${timeLeft}`;
        // create form to submit initials
        let formEl = document.createElement('form');
        formEl.style.marginTop = '200px';
        mainSection.appendChild(formEl);
        let inputEl = document.createElement('input');
        inputEl.setAttribute('type', 'text');
        inputEl.setAttribute('placeholder', 'Enter your initials');
        let submitEl = document.createElement('input');
        submitEl.setAttribute('value', 'Submit');
        submitEl.setAttribute('type', 'submit');
        // 
        submitEl.addEventListener('click', function(e) {
            // prevent browser from refreshing on submit
            e.preventDefault();
            // save the user's initials and final score as an object
            let score = {
                name: inputEl.value,
                score: timeLeft
            };
            // remove the form from the screen on submit
            formEl.style.display = 'none';
            // save user's score to local storage
            saveScore(score);
            // go to list of high scores
            highScorePage(score);
        })
        // add input elements to form element
        formEl.appendChild(inputEl);
        formEl.appendChild(submitEl);
    }

};

// function to save score to local storage, takes score as an argument
function saveScore(obj) {
    // if no scores are currently saved
    if (!localStorage.scores) {
        // create an empty array to save score in
        let scores = [];
        // push the current score to empty array
        scores.push(obj);
        // stringify that array and set it with key 'scores' in local storage
        localStorage.setItem('scores', JSON.stringify(scores));
    } else {
        // if there are scores currently stored, parse the scores and save them as an array
        let scoresArray = JSON.parse(localStorage.scores);
        // add the new score to the end of that array
        scoresArray.push(obj);
        // stringify that array and resave scores as that array
        localStorage.scores = JSON.stringify(scoresArray);
    }  
};

// go to highscore page, users score object passed as argument
function highScorePage(obj) {
    // remove the header from page
    headerEl.style.display = 'none'
    // clear content of main section
    mainSection.innerHTML = '';

    // create the list of scores saved in local storage
    let scoresContainer = document.createElement('div');
    scoresContainer.style.marginTop = '200px';
    mainSection.appendChild(scoresContainer);

    // if there are currently scores saved
    if (localStorage.length) {
        // load scores by parsing scores from localStorage
        let scores = JSON.parse(localStorage.scores|| 'No scores');
        // loop through scores in array
        for (let i = 0; i < scores.length; i++) {
            // text to display
            let text = `${scores[i].name} - ${scores[i].score}`
            // load that text into a p element
            let item = document.createElement('p');
            item.textContent = text;
            // append to the list of scores
            scoresContainer.appendChild(item);
        }
    }
    else {
        // if no scores stored, display no saved scores
        scoresContainer.textContent = 'No saved scores';
    }
    // create play again button
    let playAgain = document.createElement('button');
    playAgain.textContent = 'Home';
    // set up button to reload opening page on click
    playAgain.addEventListener('click', function() {
        mainSection.innerHTML = '';
        headerEl.style.display = 'flex';
        openingPage();
    })
    mainSection.appendChild(playAgain);

    // if there are currently scores stores
    if (localStorage.length) {
        // create a button to clear scores
        let clearScoresEl = document.createElement('button');
        clearScoresEl.textContent = 'Clear high scores';
        // when button is clicked, scores are removed from the page and also removed from local storage
        clearScoresEl.addEventListener('click', function() {
        scoresContainer.innerHTML = '';
        localStorage.clear();
    });
    mainSection.appendChild(clearScoresEl);
    }
};

// load the content of the intro page
openingPage();

