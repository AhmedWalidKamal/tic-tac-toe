export const styles = `
  .widget-container {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 300px;
      width: 100%;
  }

  .widget-header {
      font-size: 1.5em;
      margin-bottom: 10px;
  }

  .player-select {
      margin-bottom: 15px;
  }

  .game-board {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5px;
      margin-bottom: 15px;
  }

  .cell {
      aspect-ratio: 1;
      background: #f0f0f0;
      border: none;
      font-size: 24px;
      cursor: pointer;
  }

  .cell:hover {
      background: #e0e0e0;
  }

  .status {
      margin-bottom: 15px;
      font-weight: bold;
  }

  .restart-btn {
      padding: 10px 20px;
      background: #007BFF;
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;
  }

  .restart-btn:hover {
      background: #0056b3;
  }
`;
