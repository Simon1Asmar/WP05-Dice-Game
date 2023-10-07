//Selecting DOM Elements
const diceImages = document.querySelectorAll("form img");
const buttonsForm = document.querySelector("form");
const player1Section = document.querySelector("#player1-section");
const player2Section = document.querySelector("#player2-section");
const currentScoreHeaders = document.querySelectorAll(".current-score-section h2");
const totalScoreHeaders = document.querySelectorAll(".total-score");
const messages = document.querySelectorAll(".message");

let currentPlayerIndex = 0;

let targetScore = 100;

let isGameOver = false;
let winnerIndex = null;
let loserIndex = null;

// Add event listeners to buttons
buttonsForm.addEventListener("click", gameButtonsListener);

function gameButtonsListener(event) {
  event.preventDefault();

  const targetId = event.target.id;

  switch (targetId) {
    case "new-game-btn":
      startNewGame();
      break;
    case "roll-dice-btn":
      rollDice();
      break;
    case "hold-btn":
      hold();
      break;
    default:
      return;
  }
}

const player1 = {
  playerName: "Player 1",
  totalScore: 0,
  currentScore: 0,
  totalNumOfWins: 0,
};
const player2 = {
  playerName: "Player 2",
  totalScore: 0,
  currentScore: 0,
  totalNumOfWins: 0,
};

const players = [player1, player2];

// startNewGame();

function startNewGame() {
  initializeValues();

  currentPlayerIndex = 0;

  player1Section.classList.add("current-player-section");
  player2Section.classList.remove("current-player-section");
}

function initializeValues() {
  player1.totalScore = 0;
  player1.currentScore = 0;
  player2.totalScore = 0;
  player2.currentScore = 0;

  currentPlayerIndex = 0;

  //reset current score headers
  currentScoreHeaders.forEach((header) => {
    header.innerText = "0";
  });

  //reset dice images
  diceImages.forEach((image) => {
    image.src = `./assets/imgs/dice pics/dice-1.png`;
  });

  // reset totalScoreHeaders
  totalScoreHeaders.forEach((header) => {
    header.innerText = "0";
  });

  // resets message text
  messages.forEach(message => {
    message.innerText = "";
  });

  isGameOver = false;
  winnerIndex = null;
  loserIndex = null;
}

function endTurn() {
  if (currentPlayerIndex === 0) {
    currentPlayerIndex = 1;
    player1Section.classList.remove("current-player-section");
    player2Section.classList.add("current-player-section");
  } else {
    currentPlayerIndex = 0;
    player1Section.classList.add("current-player-section");
    player2Section.classList.remove("current-player-section");
  }
}

// saves current score in total score, resets current score and ends turn
function hold() {
  // adds current score to total score
  players[currentPlayerIndex].totalScore += players[currentPlayerIndex].currentScore;
  // resets current score
  players[currentPlayerIndex].currentScore = 0;
  
  updateUI();

  if(players[currentPlayerIndex].totalScore > targetScore){

    winnerIndex = currentPlayerIndex === 0 ? 1 : 0;
    loserIndex = winnerIndex === 0 ? 1 : 0;

    messages[winnerIndex].innerText = "You Win!";
    messages[loserIndex].innerText = "Passed the target score";

    gameOver();

  } else {
    endTurn();
  }
}

// Simulates the dice rolls
function rollDice() {
    // generate a random number between 1 and 6 for each dice
    let dice1 = Math.floor(Math.random() * 6) + 1;
    diceImages[0].src = `./assets/imgs/dice pics/dice-${dice1}.png`;
    console.log("dice1", dice1);
    let dice2 = Math.floor(Math.random() * 6) + 1;
    diceImages[1].src = `./assets/imgs/dice pics/dice-${dice2}.png`;
    console.log("dice2", dice2);

    // check if both values are not equal then add to currentScore
    if (dice1 != dice2) {
      players[currentPlayerIndex].currentScore += dice1 + dice2;
      messages[0].innerText = "";
      messages[1].innerText = "";
      updateUI();
    } else {
      // ROLLED A DOUBLE message
      if(currentPlayerIndex === 0){
        messages[0].innerText = "Rolled a double"
        messages[1].innerText = ""
      } else {
        messages[0].innerText = ""
        messages[1].innerText = "Rolled a double"
      }

      // if they're equal reset current score and end turn
      players[currentPlayerIndex].currentScore = 0;

      updateUI();

      endTurn();
    }  
}

// if player index is 0 it updates player 1's innerText if the index is 1 it updates player 2's innerText
function updateUI() {
  currentScoreHeaders[currentPlayerIndex].innerText = players[currentPlayerIndex].currentScore;
  totalScoreHeaders[currentPlayerIndex].innerText = players[currentPlayerIndex].totalScore;
}

function gameOver(){
  isGameOver = true;
}