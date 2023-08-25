let score = JSON.parse(localStorage.getItem('score')); 

if (score === null) {   
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;      // create a varible to store the id of setInterval function it generate a id each time when it run to save last id we remain it undefined


function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {    // use arrow function
      const playerMove = pickComputerMove();
      playGame(playerMove); 
      document.querySelector('.js-autoPlay-button').innerHTML = 'Stop Play';
    }, 1000);
    isAutoPlaying = true;
 
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoPlay-button').innerHTML = 'Auto Play';
  }
  
}


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
});


document.querySelector('.js-autoPlay-button')
  .addEventListener('click', () => {
    autoPlay();
});

const resetScoreButton = document.querySelector('.js-resetScore-button')

resetScoreButton.addEventListener('click', () => {
  document.querySelector('.js-reset-Score-confirmation').innerHTML = `
      <div>Are you sure you want to reset the score? </div>
      <button class="js-yes-button" onclick="resetScorefunction()">Yes</button> 
      <button class="js-no-button" onclick="notResetScore()">No</button>
    `;
});

function resetScorefunction() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.removeItem('score');  
  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = '';                  // it reset the result

  document.querySelector('.js-moves')
  .innerHTML = '';                    // it reset the move

  notResetScore()
};

function notResetScore() {
  document.querySelector('.js-reset-Score-confirmation').innerHTML = '';
};




// play game by pressing key on keyboard when press r then you choose r and when press p you choose paper and when press s means you choose scissors
document.body.addEventListener('keydown', (event) => {

  console.log(event.key);

  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === ' ') {
    resetScorefunction();
  }
});



function playGame(playerMove) {
  const computerMove = pickComputerMove(); 

  let result = '';   

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }


  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }


  // Need to save score in local storage
  localStorage.setItem('score', JSON.stringify(score))   // it save the score into local storage


  // It update the score
  updateScoreElement(); 

  // update the result
  document.querySelector('.js-result')
  .innerHTML = result;

  // update the move
  document.querySelector('.js-moves')
  .innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

}


function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}



function pickComputerMove () {
  const randomNumber = Math.random();   
  let computerMove = '';

  if ( randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if ( randomNumber >= 1/3 && randomNumber < 2/3 ) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors';
  }  

  return computerMove;    
}