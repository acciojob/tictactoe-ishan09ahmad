let inputContainerEl = document.querySelector("#inputContainer");
let player1El = document.querySelector("#player1");
let player2El = document.querySelector("#player2");
let submitButtonEl = document.querySelector("#submit");
let gameContainerEl = document.querySelector("#game-container");
let messageEl = document.querySelector("#message");
let cells = document.querySelectorAll(".cell");
let boardEl = document.querySelector("#board");
let player1Name = "";
let player2Name = "";
let currentPlayerMove = "x";
let currentPlayerName;
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
submitButtonEl.addEventListener("click", () => {
  if (player1El.value !== "" && player2El.value !== "") {
    player1Name = player1El.value.trim();
    player2Name = player2El.value.trim();
    currentPlayerName = player1Name;
    inputContainerEl.classList.add("hide");
    gameContainerEl.classList.remove("hide");
    messageEl.textContent = `${currentPlayerName}, you're up`;
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "") return;
    let row = cell.getAttribute("data-row");
    row = parseInt(row);
    let col = cell.getAttribute("data-col");
    col = parseInt(col);
    board[row][col] = currentPlayerMove;
    cell.textContent = currentPlayerMove;
    cell.classList.add("disabled");
    let winnerFound = checkWinner();
     let checkForDraw = checkDraw();
    if (winnerFound) {
     if(currentPlayerMove==="x")
	 {
		  messageEl.textContent = "Player1 congratulations you won!";
	 }
		else if(currentPlayerMove==="o")
		{
			messageEl.textContent = "Player2 congratulations you won!";
		}
       boardEl.classList.add("disabled");
      return;
    }

   
     else if (checkForDraw) {
     messageEl.textContent = `Draw`;
       boardEl.classList.add("disabled");
      return;
    }
else
{
currentPlayerMove = currentPlayerMove === "x" ? "o" : "x";
    currentPlayerName =
      currentPlayerName === player1Name ? player2Name : player1Name;
    messageEl.textContent = `${currentPlayerName}, you're up`;
}
    
  });
});

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return true;
    }
  }

  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return true;
  }

  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}
