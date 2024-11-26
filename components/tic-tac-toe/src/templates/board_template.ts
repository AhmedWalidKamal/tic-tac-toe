export const boardTemplate = `
  <div class="widget-container">
    <div class="widget-content">
      <div class="widget-header">Tic Tac Toe</div>
      <div class="player-select">
        <label>Play as:</label>
        <select id="player-symbol">
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </div>
      <div class="status" id="game-status">Choose your symbol and start playing!</div>
      <div class="game-board" id="game-board">
        ${Array(9)
          .fill("")
          .map(
            (_, i) => `
            <button class="cell" data-index="${i}"></button>
        `
          )
          .join("")}
      </div>
      <button class="restart-btn" id="restart-game">Restart Game</button>
    </div>
  </div>
`;
