
//DOM Manipulation

//MAIN CODE
let numOfWins = 0;
let numOfTies = 0;
let numOfLosses = 0;

const container = document.querySelector('#container');
const title = document.createElement('div');

const rockButton = document.createElement('button');
const scissorsButton = document.createElement('button');
const paperButton = document.createElement('button');
const resetButton = document.createElement('button');

const outputDiv = document.createElement('div');
const pointsDiv = document.createElement('div');

const playerScore = document.createElement('div');
const tiesScore = document.createElement('div');
const computerScore = document.createElement('div');

const resultOutput = document.createElement('div');

createLayout();

const buttons = document.querySelectorAll('button');

resetButton.addEventListener('click', () => {
  // eslint-disable-next-line no-unused-expressions
  numOfLosses = 0, numOfTies = 0, numOfWins = 0;
  resultOutput.textContent = "";
  playerScore.textContent = "";
  tiesScore.textContent = "";
  computerScore.textContent = "";
});

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
  // and for each one we add a 'click' listener
  button.addEventListener('click', () => {
    if (numOfLosses > 4 || numOfWins > 4) {
      //end - Game Over
      resultOutput.textContent = "GAME OVER! ";
      resultOutput.textContent += (overallWinner(numOfWins, numOfLosses, numOfTies));
      return;
    }
    if (button.textContent !== 'Play Again!') {
      game(button.textContent);
    }
  });
});


//HELPER FUNCTIONS
function isValid(playerSelection) {
  playerSelection = reformatPlayerSelection(playerSelection);

  if (
    playerSelection === "Rock" ||
    playerSelection === "Paper" ||
    playerSelection === "Scissors"
  ) {
    return true;
  }
  return false;
}

function overallWinner(numOfWins, numOfLosses, numOfTies) {
  if (numOfWins > numOfLosses) {
    return `You won! You won ${numOfWins} time(s), tied ${numOfTies} time(s) and lost ${numOfLosses} time(s).`;
  } else if (numOfLosses > numOfWins) {
    return `You lost. You won ${numOfWins} time(s), tied ${numOfTies} time(s) and lost ${numOfLosses} time(s).`;
  } else {
    return `You tied! You won ${numOfWins} time(s), tied ${numOfTies} time(s) and lost ${numOfLosses} time(s).`;
  }
}

function reformatPlayerSelection(playerSelection) {
  playerSelection =
    playerSelection.charAt(0).toUpperCase() +
    playerSelection.slice(1).toLowerCase();
  return playerSelection;
}

//SUGGESTED FUNCTIONS
function computerPlay() {
  let choice = Math.floor(Math.random() * 3);

  switch (choice) {
    case 0:
      return "Rock";
      break;
    case 1:
      return "Paper";
      break;
    case 2:
      return "Scissors";
      break;
    default:
      return "Error with computerPlay() function";
  }
}

function computerWins(playerSelection, computerSelection) {
  //0 - computer | 1 - player | 2 - tie
  playerSelection = reformatPlayerSelection(playerSelection);

  if (
    (playerSelection === "Rock" && computerSelection === "Paper") ||
    (playerSelection === "Paper" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Rock")
  ) {
    return 0;
  } else if (
    (computerSelection === "Rock" && playerSelection === "Paper") ||
    (computerSelection === "Paper" && playerSelection === "Scissors") ||
    (computerSelection === "Scissors" && playerSelection === "Rock")
  ) {
    return 1;
  } else {
    return 2;
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = reformatPlayerSelection(playerSelection);

  if (computerWins(playerSelection, computerSelection) === 0) {
    numOfLosses++;
    return `You Lose! ${computerSelection} beats ${playerSelection}.`;
  } else if (computerWins(playerSelection, computerSelection) === 1) {
    numOfWins++;
    return `You Win! ${playerSelection} beats ${computerSelection}.`;
  } else {
    numOfTies++;
    return `You Tie! You both chose ${playerSelection}.`;
  }
}

//MAIN FUNCTION
function game(playerSelection) {
  const computerSelection = computerPlay();
  resultOutput.textContent = (playRound(playerSelection, computerSelection));
  playerScore.textContent = numOfWins;
  tiesScore.textContent = numOfTies;
  computerScore.textContent = numOfLosses;
}


function createLayout() {
  container.style.cssText = 'text-align: center; background-color: #E0DDF4; height: 1500px; width: 100%;'

  createTitles();
  createScoreBoard();
  createButtons();
  createResult();

  container.appendChild(resetButton);
}

function createTitles() {

  const headerTitle = document.createElement('h1');
  const subHeaderTitle = document.createElement('h2');
  const subTitle = document.createElement('h3');

  headerTitle.textContent = 'Rock Paper Scissors';
  subHeaderTitle.textContent = 'CHOOSE YOUR WEAPON';
  subTitle.textContent = 'First to 5 Wins!';

  headerTitle.style.cssText = 'padding-top: 50px; color: rgb(70, 13, 9); font-size: 75px;';
  subHeaderTitle.style.cssText = 'color: #86273C; font-size: 40px;';
  subTitle.style.cssText = 'padding-top: 25px; color: #AF3636; font-size: 30px;';

  title.appendChild(headerTitle);
  title.appendChild(subHeaderTitle);
  title.appendChild(subTitle);

  container.appendChild(title);
}

function createScoreBoard() {

  const playerDiv = document.createElement('div');
  const tiesDiv = document.createElement('div');
  const computerDiv = document.createElement('div');


  const playerTitle = document.createElement('h3');
  playerTitle.textContent = 'Player Score';
  playerScore.style.cssText = 'border: 1px solid white; height: 58px; padding: 20px; font-size: 50px;';

  const tiesTitle = document.createElement('h3');
  tiesTitle.textContent = 'No. of Ties';
  tiesScore.style.cssText = 'border: 1px solid white; height: 58px; padding: 20px; font-size: 50px;';

  const computerTitle = document.createElement('h3');
  computerTitle.textContent = 'Computer Score';
  computerScore.style.cssText = 'border: 1px solid white; height: 58px; padding: 20px; font-size: 50px;';

  playerDiv.appendChild(playerTitle);
  playerDiv.appendChild(playerScore);

  tiesDiv.appendChild(tiesTitle);
  tiesDiv.appendChild(tiesScore);

  computerDiv.appendChild(computerTitle);
  computerDiv.appendChild(computerScore);

  pointsDiv.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); padding: 25px; margin: 100px auto; border: 1px solid maroon; margin-top: 50px; background-color: pink; width: 425px; height: 200px;';

  pointsDiv.appendChild(playerDiv);
  pointsDiv.appendChild(tiesDiv);
  pointsDiv.appendChild(computerDiv);
  container.appendChild(pointsDiv);

}

function createButtons() {
  rockButton.textContent = 'Rock';
  scissorsButton.textContent = 'Scissors';
  paperButton.textContent = 'Paper';
  resetButton.textContent = 'Play Again!';

  rockButton.style.cssText = 'background-color: #D45069; border: 4px solid #5F0B3D; width: 150px; height: 50px; font-size: 30px; font-weight: bold; color: rgb(23,23,27); margin-right: 10px;';
  scissorsButton.style.cssText = 'background-color: #D45069; border: 4px solid #5F0B3D; width: 150px; height: 50px; font-size: 30px; font-weight: bold; color: rgb(23,23,27); margin-right: 10px;'
  paperButton.style.cssText = 'background-color: #D45069; border: 4px solid #5F0B3D; width: 150px; height: 50px; font-size: 30px; font-weight: bold; color: rgb(23,23,27); margin-right: 10px;'

  resetButton.style.cssText = 'background-color: #5F0B3D; color: #D45069; width: 120px; height: 40px; font-size: 20px; ';
  container.appendChild(rockButton);
  container.appendChild(scissorsButton);
  container.appendChild(paperButton);
}

function createResult() {
  const resultTitle = document.createElement('h1');
  resultTitle.textContent = 'Results';
  resultOutput.style.cssText = 'border: 1px solid white; height: 64px; padding: 20px; font-size: 25px;';


  outputDiv.appendChild(resultTitle);
  outputDiv.appendChild(resultOutput);

  outputDiv.style.cssText = 'padding: 25px; margin: 100px auto; border: 1px solid maroon; margin-top: 50px; background-color: pink; width: 425px; height: 200px;';

  container.appendChild(outputDiv);
}
