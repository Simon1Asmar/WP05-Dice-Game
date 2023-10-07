//Selecting DOM Elements
const diceImages = document.querySelectorAll("form img");
const newGameButton = document.querySelector("#new-game-btn");
const rollDiceButton = document.querySelector("#roll-dice-btn");
const holdButton = document.querySelector("#hold-btn");
const buttonsForm = document.querySelector("form");

// Add event listeners to buttons
buttonsForm.addEventListener("click", gameButtonsListener);

function gameButtonsListener(event){
  event.preventDefault();

  const targetId = event.target.id

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
      console.log(targetId);
      break;
  }
}

const player1 = {
  playerName: "Player 1",
  totalScore: 0,
  currentScore: 0,
  totalNumOfWins: 0,
}
const player2 = {
  playerName: "Player 2",
  totalScore: 0,
  currentScore: 0,
  totalNumOfWins: 0,
}

let currentPlayer = null;

startNewGame();

function startNewGame(){
  initializeValues();

  currentPlayer = player1;
  console.log(`Game Started! Current Player: ${currentPlayer.playerName}`);
}

function initializeValues(){
  player1.totalScore = 0;
  player1.currentScore = 0;
  player2.totalScore = 0;
  player2.currentScore = 0;
}

function endTurn(){
  //switch current player
  console.log(currentPlayer.playerName, player1.playerName);
  if(currentPlayer === player1){
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
  console.log(`turn ended! Current Player: ${currentPlayer.playerName}`);
}

// saves current score in total score, resets current score and ends turn
function hold(){
  currentPlayer.totalScore += currentPlayer.currentScore;
  currentPlayer.currentScore = 0;

  endTurn();
}

// Simulates the dice rolls
function rollDice(){
  if(currentPlayer){
    // generate a random number between 1 and 6 for each dice
    let dice1 = Math.floor(Math.random() * 6) + 1;
    diceImages[0].src = `./assets/imgs/dice pics/dice-${dice1}.png`
    console.log('dice1', dice1)
    let dice2 = Math.floor(Math.random() * 6) + 1;
    diceImages[1].src = `./assets/imgs/dice pics/dice-${dice2}.png`
    console.log('dice2', dice2)

    // check if both values are not equal then add to currentScore
    if(dice1 != dice2){
      currentPlayer.currentScore += (dice1 + dice2);
    } else { // if they're equal reset current score and end turn
      console.log("ROLLED A DOUBLE");
      currentPlayer.currentScore = 0;
      //end turn
      endTurn();
    }
    console.log(currentPlayer);
  }
}
