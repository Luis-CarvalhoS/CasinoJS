// To practice, a simple JS project, applying concepts for a cleaner code. Here we simulate a casino game.

// Para praticar, um simples projeto em JS, aplicando conceitos para um código mais limpo. Simulamos aqui um jogo de cassino.

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const depositAmount = prompt('Enter a deposit amount: ');
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log('Invalid deposit amount. Try Again!');
    } else {
      return numberDepositAmount;
    }
  }
  //Dimitri97
};

const getNumberOfLines = () => {
  const lines = prompt('Enter the number of lines to bet on(1-3)');
  const numberOfLines = parseFloat(lines);

  if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
    console.log('Pick between 1-3 lines. Try again.');
  } else {
    return numberOfLines;
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt('Enter the bet per line: ');
    const betNumber = parseFloat(bet);

    if (isNaN(betNumber) || betNumber <= 0 || betNumber > balance / lines) {
      console.log('Invalid bet!');
    } else {
      return betNumber;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelsSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelsSymbols.length);
      const selectedSymbol = reelsSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelsSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = '';
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += ' | ';
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposit();

  while (true) {
    console.log('You have a balance of $' + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    const printRowsResult = printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log('You won $' + winnings.toString());

    if (balance <= 0) {
      console.log('No cash.');
      break;
    }
    const playAgain = prompt('Do you wanna play again (Y/N)? ').toLowerCase();
    if (playAgain != 'y') {
      console.log('Thanks for playing!');
      break;
    }
  }
};

game();
