//Selecting DOM Elements
const diceImages = document.querySelectorAll("form img");
const buttonsForm = document.querySelector("form#game-buttons");
const player1Section = document.querySelector("#player1-section");
const player2Section = document.querySelector("#player2-section");
const currentScoreHeaders = document.querySelectorAll(".current-score-section h2");
const totalScoreHeaders = document.querySelectorAll(".total-score");
const messages = document.querySelectorAll(".message");
const rollDiceButton = document.querySelector("#roll-dice-btn");
const holdButton = document.querySelector("#hold-btn");
//target score panel
const targetForm = document.querySelector("#target-form-section");
const targetScoreInput = document.querySelector("#target-score");
const firstPanel = document.querySelector("#first-panel");
const instructions = document.querySelector("#instructions");


rollDiceButton.disabled = true;
holdButton.disabled = true;


let currentPlayerIndex = 0;

let targetScore = 100;

let winnerIndex = null;
let loserIndex = null;

targetForm.addEventListener("submit", setTargetScore)

function setTargetScore(event){
  event.preventDefault();

  if(targetScoreInput.value.length > 0){
    targetScore = parseInt(targetScoreInput.value);
    firstPanel.classList.add("collapsed");
  
    instructions.classList.add("collapsed");
  
    startNewGame();
  }

}

// Add event listeners to buttons
buttonsForm.addEventListener("click", gameButtonsListener);

function gameButtonsListener(event) {
  event.preventDefault();

  const targetId = event.target.id;

  switch (targetId) {
    case "new-game-btn":
      firstPanel.classList.remove("collapsed");
      // startNewGame();
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

  firstPanel.classList.add("collapsed");

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

  winnerIndex = null;
  loserIndex = null;

  holdButton.disabled = true;
  rollDiceButton.disabled = false;

  player1Section.classList.remove("current-player-section");
  player1Section.classList.remove("winner-player-section");
  player2Section.classList.remove("current-player-section");
  player2Section.classList.remove("winner-player-section");
}

function endTurn() {
  holdButton.disabled = true;

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
  
  console.log('players[currentPlayerIndex].totalScore', players[currentPlayerIndex].totalScore);
  console.log(targetScore);

  if(players[currentPlayerIndex].totalScore > targetScore){

    winnerIndex = currentPlayerIndex === 0 ? 1 : 0;
    loserIndex = winnerIndex === 0 ? 1 : 0;

    messages[winnerIndex].innerText = "You Win!";
    messages[loserIndex].innerText = "Passed the target score";

    gameOver();

  } else if(players[currentPlayerIndex].totalScore === targetScore){

    console.log("WINNER" +currentPlayerIndex);

    winnerIndex = currentPlayerIndex === 0 ? 0 : 1;
    loserIndex = winnerIndex === 0 ? 1 : 0;

    messages[winnerIndex].innerText = "You Win!";
    messages[loserIndex].innerText = "";

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

    // check if its not a double six then add to currentScore
    // if (dice1 != dice2) {
    if (!(dice1 === 6 && dice2 === 6)) {
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

    holdButton.disabled = false;
}

// if player index is 0 it updates player 1's innerText if the index is 1 it updates player 2's innerText
function updateUI() {
  currentScoreHeaders[currentPlayerIndex].innerText = players[currentPlayerIndex].currentScore;
  totalScoreHeaders[currentPlayerIndex].innerText = players[currentPlayerIndex].totalScore;
}

function gameOver(){
  holdButton.disabled = true;
  rollDiceButton.disabled = true;

  player1Section.classList.remove("current-player-section");
  player2Section.classList.remove("current-player-section");

  if(winnerIndex === 0) {
    player1Section.classList.add("winner-player-section");
  } else {
    player2Section.classList.add("winner-player-section");
  }
}

