export const initializeGame = () => {
  const COMPUTER_WORKER_URL =
    "https://computer-adversary-worker.ahmed3walid96.workers.dev/";
  let currentPlayer = "";
  let gameBoard: string[] = Array(9).fill("");
  let gameActive = false;

  const playerSelect = document.getElementById(
    "player-symbol"
  ) as HTMLSelectElement;
  const gameBoardEl = document.getElementById("game-board");
  const statusEl = document.getElementById("game-status");
  const restartBtn = document.getElementById("restart-game");

  function toggleBoardInteractivity(disabled: boolean) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      (cell as HTMLButtonElement).disabled = disabled;
      (cell as HTMLButtonElement).style.pointerEvents = disabled
        ? "none"
        : "auto";
      (cell as HTMLButtonElement).style.opacity = disabled ? "0.7" : "1";
    });
  }

  function handlePlayerSymbolChange(symbol: string) {
    currentPlayer = symbol;
    gameActive = symbol !== "";

    if (symbol === "") {
      toggleBoardInteractivity(true);
      if (statusEl) {
        statusEl.textContent = "Please select X or O to start playing!";
      }
      return;
    }

    gameBoard = Array(9).fill("");
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      (cell as HTMLElement).textContent = "";
    });

    toggleBoardInteractivity(false);
    if (statusEl) {
      statusEl.textContent = `You are playing as ${symbol}. Your turn!`;
    }
  }

  function restartGame() {
    gameBoard = Array(9).fill("");
    gameActive = false;
    currentPlayer = "";
    playerSelect.value = "";

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      (cell as HTMLElement).textContent = "";
    });

    toggleBoardInteractivity(true);

    if (statusEl) {
      statusEl.textContent = "Please select X or O to start playing!";
    }
  }

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

  function checkGameState(board: string[]): {
    gameOver: boolean;
    message: string | null;
  } {
    const winner = checkWinner(board);
    if (winner) {
      return {
        gameOver: true,
        message: `Player ${winner} wins!`,
      };
    }

    if (!board.includes("")) {
      return {
        gameOver: true,
        message: "It's a draw!",
      };
    }

    return {
      gameOver: false,
      message: null,
    };
  }

  async function getComputerMove() {
    try {
      const response = await fetch(COMPUTER_WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: gameBoard }),
      });
      const { move } = await response.json();
      return move;
    } catch (error) {
      console.error("Error getting computer move:", error);
    }
  }

  function handleCellClick(index: number) {
    if (!gameActive || gameBoard[index] || currentPlayer === "") return;

    gameBoard[index] = currentPlayer;
    const cell = document.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.textContent = currentPlayer;
    }

    const gameState = checkGameState(gameBoard);
    if (gameState.gameOver) {
      if (statusEl) {
        statusEl.textContent = gameState.message!;
      }
      gameActive = false;
      return;
    }

    toggleBoardInteractivity(true);
    if (statusEl) {
      statusEl.textContent = "Computer is thinking...";
    }

    setTimeout(async () => {
      const move = await getComputerMove();
      const computerSymbol = currentPlayer === "X" ? "O" : "X";

      gameBoard[move] = computerSymbol;
      const computerCell = document.querySelector(`[data-index="${move}"]`);
      if (computerCell) {
        computerCell.textContent = computerSymbol;
      }

      const finalState = checkGameState(gameBoard);
      if (finalState.gameOver) {
        if (statusEl) {
          statusEl.textContent = finalState.message!;
        }
        gameActive = false;
      } else {
        if (statusEl) {
          statusEl.textContent = "Your turn!";
        }
        toggleBoardInteractivity(false);
      }
    }, 500);
  }

  // Event Listeners
  if (playerSelect) {
    playerSelect.addEventListener("change", (e) => {
      const symbol = (e.target as HTMLSelectElement).value;
      handlePlayerSymbolChange(symbol);
    });
  }

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

  toggleBoardInteractivity(true);
};
