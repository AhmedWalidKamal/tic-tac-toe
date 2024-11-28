export const initializeGame = () => {
  const getRequiredElement = (id: string): HTMLElement => {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Required element #${id} not found`);
    }
    return element;
  };

  const playerSelect = getRequiredElement("player-symbol") as HTMLSelectElement;
  const gameBoardEl = getRequiredElement("game-board");
  const statusEl = getRequiredElement("game-status");
  const restartBtn = getRequiredElement("restart-game");

  const COMPUTER_MOVE_URL = "/webcm/tic-tac-toe/computer-move";

  const endGameClasses = {
    gameOver: "game-over",
    player: "winner-player",
    computer: "winner-computer",
    draw: "draw",
  };

  let currentPlayer = "";
  let gameBoard: string[] = Array(9).fill("");
  let gameActive = false;

  function toggleBoardInteractivity(disabled: boolean) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell: Element) => {
      (cell as HTMLButtonElement).disabled = disabled;
      (cell as HTMLButtonElement).style.pointerEvents = disabled
        ? "none"
        : "auto";
      (cell as HTMLButtonElement).style.opacity = disabled ? "0.7" : "1";
    });
  }

  function togglePlayerSelectInteractivity(disabled: boolean) {
    playerSelect.disabled = disabled;
    playerSelect.style.opacity = disabled ? "0.7" : "1";
  }

  function handlePlayerSymbolChange(symbol: string) {
    gameActive = symbol !== "";
    currentPlayer = symbol;
    togglePlayerSelectInteractivity(true);
    toggleBoardInteractivity(false);
    statusEl.textContent = `You are playing as ${symbol}. Your turn!`;
  }

  function restartGame() {
    gameBoard = Array(9).fill("");
    gameActive = false;
    currentPlayer = "";
    playerSelect.value = "";

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.removeAttribute("data-symbol");
    });

    // disabled board and enable player select
    toggleBoardInteractivity(true);
    togglePlayerSelectInteractivity(false);

    statusEl.textContent = "Please select X or O to start playing!";
    statusEl.classList.remove(...Object.values(endGameClasses));
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
    // no winner
    return null;
  }

  function checkGameEnded(board: string[]): {
    message: string;
    winner: "player" | "computer" | "draw";
  } | null {
    const winner = checkWinner(board);
    if (winner) {
      const isPlayer = winner === currentPlayer;
      return {
        message: isPlayer ? `You win!` : `Computer wins!`,
        winner: isPlayer ? "player" : "computer",
      };
    }

    if (!board.includes("")) {
      return {
        message: "It's a draw!",
        winner: "draw",
      };
    }

    return null;
  }

  function updateEndGameState(gameState: {
    message: string;
    winner: "player" | "computer" | "draw";
  }) {
    // Update UI
    statusEl.textContent = gameState.message;
    statusEl.classList.add(
      endGameClasses.gameOver,
      endGameClasses[gameState.winner]
    );

    // Update game state
    gameActive = false;
  }

  async function getComputerMove(): Promise<number | undefined> {
    try {
      const response = await fetch(COMPUTER_MOVE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ board: gameBoard }),
      });
      const { move }: { move: number } = await response.json();
      return move;
    } catch (error) {
      console.error("Error getting computer move:", error);
    }
  }

  function handleCellClick(index: number) {
    if (!gameActive || gameBoard[index] || currentPlayer === "") {
      return;
    }

    gameBoard[index] = currentPlayer;
    const cell = document.querySelector(`[data-index="${index}"]`);
    if (cell) {
      cell.textContent = currentPlayer;
      cell.setAttribute("data-symbol", currentPlayer);
    }

    const gameState = checkGameEnded(gameBoard);
    if (gameState) {
      updateEndGameState(gameState);
      return;
    }

    toggleBoardInteractivity(true);
    statusEl.textContent = "Computer is thinking...";

    setTimeout(async () => {
      const moveIndex = await getComputerMove();
      if (!moveIndex) {
        return;
      }
      const computerSymbol = currentPlayer === "X" ? "O" : "X";

      gameBoard[moveIndex] = computerSymbol;
      const computerCell = document.querySelector(
        `[data-index="${moveIndex}"]`
      );
      if (computerCell) {
        computerCell.textContent = computerSymbol;
      }

      const gameState = checkGameEnded(gameBoard);
      if (gameState) {
        updateEndGameState(gameState);
        return;
      } else {
        statusEl.textContent = "Your turn!";
        toggleBoardInteractivity(false);
      }
    }, 500);
  }

  //
  // Event Listeners
  //

  playerSelect.addEventListener("change", (e) => {
    const symbol = (e.target as HTMLSelectElement).value;
    handlePlayerSymbolChange(symbol);
  });

  gameBoardEl.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target && target.classList.contains("cell")) {
      const index = parseInt(target.dataset.index!);
      handleCellClick(index);
    }
  });

  restartBtn.addEventListener("click", restartGame);

  toggleBoardInteractivity(true);
};
