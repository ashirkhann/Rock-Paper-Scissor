let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll('.choice');

let userScoreElement = document.getElementById('user-score');
let compScoreElement = document.getElementById('comp-score');

let msg = document.getElementById('msg');
let msgRemarks = document.getElementById('msg-remarks');
let resetbtn = document.querySelector(".reset");

let imgOne = document.getElementById('one');
let imgTwo = document.getElementById('two');


//generating computer's choice
let genCompChoice = () => {
    const options = ['rock', 'paper', 'scissor'];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}


//chaning the main images
let changeMainImg = (compChoice, userChoice) => {
    const choices = {
        'rock': 'rock.png',
        'paper': 'paper.png',
        'scissor': 'scissor.jpeg'
    };
    imgOne.setAttribute('src', `./images/${choices[userChoice]}` );
    imgTwo.setAttribute('src', `./images/${choices[compChoice]}`);
}


//game draw
let drawGame = () => {
    msg.innerText = 'Game Draw';
}


//show winner
let showWinner = (userWin) => {
    const winText = userWin ? 'You Win!' : 'You Lose!';
    msg.innerText = winText;
    if (userWin) {
        userScore++;
    } else {
        compScore++;
    }
    userScoreElement.innerText = userScore;
    compScoreElement.innerText = compScore;
}


//Starting the game
let startTheGame = async (userChoice) => {
    await new Promise((resolve) => {
        setTimeout(() => {
            let compChoice = genCompChoice();
            changeMainImg(compChoice, userChoice);
            msgRemarks.innerText = `You chose ${userChoice} | Computer chose ${compChoice}`;

            if (userChoice === compChoice) {
                drawGame();
            }
            else {
                let userWin = true;
                if (userChoice === 'rock') {
                    //paper, scissor
                    userWin = compChoice === 'paper' ? false : true;
                } else if (userChoice === 'paper') {
                    //rock, scissor
                    userWin = compChoice === 'scissor' ? false : true;
                } else {
                    //rock, paper
                    userWin = compChoice === 'rock' ? false : true;
                }
                showWinner(userWin);
            }
            resolve();
        }, 1500);
    })
    imgOne.classList.remove('animation');
    imgTwo.classList.remove('animation');
}


//Program is starting from here---
choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        let userChoice = choice.getAttribute('id');
        imgOne.classList.add('animation');
        imgTwo.classList.add('animation');
        msg.innerText = '';
        msgRemarks.innerText = '';
        startTheGame(userChoice);
    })
})


let resetGame = () => {
    userWin = true;
    imgOne.setAttribute('src', './images/rock.png');
    imgTwo.setAttribute('src', './images/rock.png');

    msg.innerText = '';
    msgRemarks.innerText = '';

    userScore = 0;
    compScore = 0;
    userScoreElement.innerText = userScore;
    compScoreElement.innerText = compScore;
}
resetbtn.addEventListener('click', resetGame);
