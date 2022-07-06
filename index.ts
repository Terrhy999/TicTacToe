type Piece = "X" | "O" | " ";
type Board = Piece[];
const board: Board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
const validInputs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const freeInputs: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let turnNumber = 1;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function printBoard(b: Board) {
  console.log(`
              ${b[0]} | ${b[1]} | ${b[2]}
             -----------
              ${b[3]} | ${b[4]} | ${b[5]}
             -----------
              ${b[6]} | ${b[7]} | ${b[8]}
  `);
}

const getPlayerByTurn = (turn: number) => {
  return turn % 2 == 0 ? "O" : "X";
};

const checkForWin = (board: Board, turnNumber: number) => {
  const player: Piece = getPlayerByTurn(turnNumber);
  for (let i = 0; i < winConditions.length; i++) {
    let count = 0;
    for (let j = 0; j < winConditions[i].length; j++) {
      if (board[winConditions[i][j]] == player) {
        count++;
      }
      if (count === 3) {
        return true;
      }
    }
  }
  return false;
};

const executeTurn = () => {
  if (getPlayerByTurn(turnNumber) === "O") {
    const randomMove =
      freeInputs[Math.floor(Math.random() * freeInputs.length)];
    board[randomMove - 1] = getPlayerByTurn(turnNumber);
    const index = freeInputs.indexOf(randomMove);
    freeInputs.splice(index, 1);
  }

  if (getPlayerByTurn(turnNumber) === "X") {
    const input = prompt(
      `Player ${getPlayerByTurn(
        turnNumber
      )}, input a number from 1 to 9 to put your mark on the board`
    );
    const inputNumber = Number(input);

    if (validInputs.includes(inputNumber) && freeInputs.includes(inputNumber)) {
      board[inputNumber - 1] = getPlayerByTurn(turnNumber);
      const index = freeInputs.indexOf(inputNumber);
      freeInputs.splice(index, 1);
    } else {
      console.log("not a valid input, try again");
      executeTurn();
    }
  }
  printBoard(board);
  if (checkForWin(board, turnNumber)) {
    console.log(`Player ${getPlayerByTurn(turnNumber)} Won!`);
    return;
  }
  turnNumber++;
  executeTurn();
  // if (validInputs.includes(inputNumber) && freeInputs.includes(inputNumber)) {
  //   board[inputNumber - 1] = getPlayerByTurn(turnNumber);
  //   console.log(freeInputs);
  //   const index = freeInputs.indexOf(inputNumber);
  //   freeInputs.splice(index, 1);
  //   console.log(freeInputs);
  //   if (checkForWin(board, turnNumber)) {
  //     console.log(`Looks like Player ${getPlayerByTurn(turnNumber)} won!`);
  //     return;
  //   }
  //   printBoard(board);
  //   turnNumber++;
  //   executeTurn();
  // } else {

  // }
};
executeTurn();
