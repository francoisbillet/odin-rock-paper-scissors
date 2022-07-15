const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

const playPossibilities = [ROCK, PAPER, SCISSORS];

const PLAYER = "Player";
const COMPUTER = "Computer";
const TIE = "Tie";

const tie = () => "It's a tie";

const youWin = (playerSelection, computerSelection) =>
  `You Win ! ${playerSelection} beats ${computerSelection}`;

const youLose = (playerSelection, computerSelection) =>
  `You Lose ! ${computerSelection} beats ${playerSelection}`;

// Event listeners and main function

let playerCount = 0;
let computerCount = 0;
const divElement = document.getElementById("results");
const divElementResult = document.querySelector("#finalResult");

const playGame = (event) => {
  divElementResult.innerHTML = "";
  const roundResult = playRound(event.target.textContent, getComputerPlay());
  const winner = getWinner(roundResult);

  switch (winner) {
    case PLAYER:
      playerCount++;
      divElement.innerHTML += `You win this round <br>`;
      break;
    case COMPUTER:
      computerCount++;
      divElement.innerHTML += `You lose this round <br>`;
      break;
    case TIE:
      divElement.innerHTML += `It's a tie for this round <br>`;
      break;
  }
  if (playerCount === 5 || computerCount === 5) {
    divElementResult.innerHTML = reportWinner(playerCount, computerCount);
    divElement.innerHTML = "";
    playerCount = 0;
    computerCount = 0;
  }
};

const buttonElements = document.querySelectorAll("button");
buttonElements.forEach((buttonElement) => {
  buttonElement.addEventListener("click", (event) => playGame(event));
});

// Inputs/Plays-related

const getComputerPlay = () => {
  const randomIndex = Math.floor(Math.random() * playPossibilities.length);
  return playPossibilities[randomIndex];
};

// Round-Related

const playRound = (playerSelection, computerSelection) => {
  switch (playerSelection) {
    case ROCK:
      return playRockRound(playerSelection, computerSelection);
    case PAPER:
      return playPaperRound(playerSelection, computerSelection);
    case SCISSORS:
      return playScissorsRound(playerSelection, computerSelection);
    default:
      throw new Error(`Player's selection ${playerSelection} is unknown`);
  }
};

const playRockRound = (playerSelection, computerSelection) => {
  switch (computerSelection) {
    case ROCK:
      return tie();
    case PAPER:
      return youLose(playerSelection, computerSelection);
    case SCISSORS:
      return youWin(playerSelection, computerSelection);
    default:
      throw new Error(`Computer's selection ${computerSelection} is unknown`);
  }
};

const playPaperRound = (playerSelection, computerSelection) => {
  switch (computerSelection) {
    case ROCK:
      return youWin(playerSelection, computerSelection);
    case PAPER:
      return tie();
    case SCISSORS:
      return youLose(playerSelection, computerSelection);
    default:
      throw new Error(`Computer's selection ${computerSelection} is unknown`);
  }
};

const playScissorsRound = (playerSelection, computerSelection) => {
  switch (computerSelection) {
    case ROCK:
      return youLose(playerSelection, computerSelection);
    case PAPER:
      return youWin(playerSelection, computerSelection);
    case SCISSORS:
      return tie();
    default:
      throw new Error(`Computer's selection ${computerSelection} is unknown`);
  }
};

// Winner-related

const getWinner = (roundResult) => {
  if (roundResult.startsWith("You Win")) {
    return PLAYER;
  } else if (roundResult.startsWith("You Lose")) {
    return COMPUTER;
  } else {
    return TIE;
  }
};

const reportWinner = (playerCount, computerCount) => {
  if (playerCount > computerCount) {
    return `Congratulations, you won ! Final result: ${playerCount} - ${computerCount}`;
  } else if (computerCount > playerCount) {
    return `You lost... Final result: ${computerCount} - ${playerCount}`;
  } else {
    return `It's a tie ! Final result: ${playerCount} - ${computerCount}`;
  }
};
