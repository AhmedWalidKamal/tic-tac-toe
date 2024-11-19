export const initializeGame = () => {
  let currentPlayer = "X";
  let gameBoard = Array(9).fill("");
  let gameActive = true;

  const playerSelect = document.getElementById("player-symbol");
  const gameBoardEl = document.getElementById("game-board");
  const statusEl = document.getElementById("game-status");
  const restartBtn = document.getElementById("restart-game");

  function checkWinner(board: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  async function computerMove() {
    try {
      const response = await fetch("/api/next-move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: gameBoard }),
      });
      const { move } = await response.json();
      handleCellClick(move);
    } catch (error) {
      console.error("Error getting computer move:", error);
    }
  }

  function handleCellClick(index: number) {
    if (!gameActive || gameBoard[index]) return;

    gameBoard[index] = currentPlayer;
    const cell = document.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.textContent = currentPlayer;
    }

    const winner = checkWinner(gameBoard);
    if (winner) {
      if (statusEl) {
        statusEl.textContent = `Player ${winner} wins!`;
      }
      gameActive = false;
      return;
    }

    if (!gameBoard.includes("")) {
      if (statusEl) {
        statusEl.textContent = "It's a draw!";
      }
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (statusEl) {
      statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }

    if (
      playerSelect &&
      currentPlayer !== (playerSelect as HTMLInputElement).value
    ) {
      setTimeout(computerMove, 500);
    }
  }

  function restartGame() {
    gameBoard = Array(9).fill("");
    gameActive = true;
    currentPlayer = "X";
    if (statusEl) {
      statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.textContent = "";
    });
  }

  // Event Listeners
  if (gameBoardEl) {
    gameBoardEl.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains("cell")) {
        const index = parseInt(target.dataset.index!);
        handleCellClick(index);
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", restartGame);
  }

  if (playerSelect) {
    playerSelect.addEventListener("change", restartGame);
  }
};
