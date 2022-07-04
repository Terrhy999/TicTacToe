type Piece = "X" | "O" | " ";
type Board = Piece[];
const board: Board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
const validInputs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const usedInputs: number[] = [];
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
  const input = prompt(
    `Player ${getPlayerByTurn(
      turnNumber
    )}, input a number from 1 to 9 to put your mark on the board`
  );
  const inputNumber = Number(input);
  if (validInputs.includes(inputNumber) && !usedInputs.includes(inputNumber)) {
    board[inputNumber - 1] = getPlayerByTurn(turnNumber);
    usedInputs.push(inputNumber);
    if (checkForWin(board, turnNumber)) {
      console.log(`Looks like Player ${getPlayerByTurn(turnNumber)} won!`);
      return;
    }
    printBoard(board);
    turnNumber++;
    executeTurn();
  } else {
    console.log("not a valid input, try again");
    executeTurn();
  }
};
executeTurn();
