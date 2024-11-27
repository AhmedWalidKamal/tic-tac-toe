export const styles = `
  .widget-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: 'Arial', sans-serif;
  }

  .widget-content {
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    padding: 40px;
    margin-top: 50px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    text-align: center;
    max-width: 320px;
    width: 100%;
  }

  .widget-header {
    font-size: 2em;
    margin-bottom: 20px;
    color: #2c3e50;
    font-weight: bold;
  }

  .player-select {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .player-select label {
    font-weight: 600;
    color: #34495e;
  }

  #player-symbol {
    padding: 8px;
    font-size: 1.2em;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    text-align: center;
    text-align-last: center;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E") no-repeat right 0.7em top 50%;
    background-size: 0.65em auto;
    background-position: calc(100% - 10px) center;
    transition: border-color 0.3s ease;
  }

  #player-symbol:hover {
    border-color: #3498db;
  }

  #player-symbol option {
    text-align: center;
  }

  .game-board {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 20px 0;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .cell {
    aspect-ratio: 1;
    background: white;
    border: none;
    font-size: 2em;
    font-weight: bold;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.2s ease;
    color: #2c3e50;
  }

  .cell:not(:disabled):hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .cell:disabled {
    cursor: not-allowed;
  }

  .status {
    margin: 15px 0;
    padding: 10px;
    border-radius: 6px;
    font-weight: 600;
    color: #2c3e50;
    transition: all 0.3s ease;
  }

  .status.game-over {
    font-size: 1.4em;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    animation: popIn 0.5s ease-out;
  }

  .status.winner-player {
    color: #27ae60;
    background: #eafaf1;
    border: 2px solid #27ae60;
  }

  .status.winner-computer {
    color: #c0392b;
    background: #fdedec;
    border: 2px solid #c0392b;
    animation: shake 0.5s ease-in-out;
  }

  .status.draw {
    color: #f39c12;
    background: #fef9e7;
    border: 2px solid #f39c12;
  }

  .restart-btn {
    padding: 12px 24px;
    background: #3498db;
    border: none;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
    transition: all 0.2s ease;
    margin-top: 10px;
  }

  .restart-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .restart-btn:active {
    transform: translateY(0);
  }

  @keyframes popIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  /* Add styles for X and O */
  .cell[data-symbol="X"] {
    color: #e74c3c;
  }

  .cell[data-symbol="O"] {
    color: #3498db;
  }
`;
