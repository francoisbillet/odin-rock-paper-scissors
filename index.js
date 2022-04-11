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

// Inputs/Plays-related

const getComputerPlay = () => {
  const randomIndex = Math.floor(Math.random() * playPossibilities.length);
  return playPossibilities[randomIndex];
};

const getPlayerInput = (roundNumber) => {
  let playerInput;
  do {
    playerInput = prompt(`Round ${roundNumber}: Rock, Paper or Scissors ?`);
    playerInput = sanitizeInput(playerInput);
  } while (!inputIsCorrect(playerInput));
  return playerInput;
};

const sanitizeInput = (playerInput) => {
  return playerInput
    .charAt(0)
    .toUpperCase()
    .concat(playerInput.substring(1).toLowerCase());
};

const inputIsCorrect = (playerInput) => {
  return playPossibilities.includes(playerInput);
};

// Main function

const game = () => {
  let playerCount = 0;
  let computerCount = 0;
  for (let i = 0; i < 5; i++) {
    const playerInput = getPlayerInput(i + 1);
    const roundResult = playRound(playerInput, getComputerPlay());
    const winner = getWinner(roundResult);
    switch (winner) {
      case PLAYER:
        playerCount++;
        console.log(`You win round ${i + 1}`);
        break;
      case COMPUTER:
        computerCount++;
        console.log(`You lose round ${i + 1}`);
        break;
      case TIE:
        console.log(`It's a tie for round ${i + 1}`);
        break;
    }
  }
  console.log(reportWinner(playerCount, computerCount));
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

game();
