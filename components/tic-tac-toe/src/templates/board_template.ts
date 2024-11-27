export const boardTemplate = `
  <div class="widget-container">
    <div class="widget-content">
      <div class="widget-header">Tic Tac Toe</div>
      <div class="player-select">
        <label>Play as:</label>
        <select id="player-symbol">
          <option value="">Select Symbol</option>
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </div>
      <div class="status" id="game-status">Please select X or O to start playing!</div>
      <div class="game-board" id="game-board">
        ${Array(9)
          .fill("")
          .map(
            (_, i) => `
            <button class="cell" data-index="${i}" disabled></button>
        `
          )
          .join("")}
      </div>
      <button class="restart-btn" id="restart-game">Restart Game</button>
    </div>
  </div>
`;
