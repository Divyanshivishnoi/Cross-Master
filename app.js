const boxes = document.querySelectorAll(".box");
const restartButton = document.getElementById("btn1");
const heading = document.getElementById("heading");

let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;

const winning = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]
];

// Check for a winner or draw
function checkWin() {
  const winner = winning.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
  
  if (winner) {
    gameActive = false;
    heading.textContent = `${currentPlayer} Wins!`;
  } else if (!board.includes(null)) {
    gameActive = false;
    heading.textContent = "It's a Draw!";
  }
}

// Handle box click
function handleBoxClick(e) {
  const boxIndex = e.target.id.replace("box", "");
  
  if (board[boxIndex] || !gameActive) return;

  board[boxIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWin();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    heading.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Restart the game
function restartGame() {
  board.fill(null);
  gameActive = true;
  currentPlayer = "X";
  heading.textContent = "Tic Tac Toe";
  boxes.forEach(box => (box.textContent = ""));
}

// Event listeners
boxes.forEach(box => box.addEventListener("click", handleBoxClick));
restartButton.addEventListener("click", restartGame);

