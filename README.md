# Tic-Tac-Toe Game with Cloudflare Workers

A player-vs-computer Tic-Tac-Toe game implemented as a Managed Component widget using Cloudflare Workers for the computer's moves.

## Project Overview

This project consists of two main parts:
1. A Managed Component that renders the Tic-Tac-Toe game widget
2. A Cloudflare Worker that handles the computer's moves

### Key Features

- Player can choose to play as X or O
- Interactive 3x3 game board
- Computer opponent makes random valid moves
- Real-time game status updates
- Win/Draw detection
- Game restart functionality

## Project Structure

```
├── components/
│   └── tic-tac-toe/
│       ├── src/
│       │   ├── templates/
│       │   │   ├── board_template.ts
│       │   │   ├── script.ts
│       │   │   └── styles.ts
│       │   ├── index.ts
│       │   └── index.test.ts
│       ├── package.json
│       ├── manifest.json
│       └── other config files...
│
├── computer-adversary-worker/
│   ├── src/
│   │   └── index.ts
│   ├── test/
│   │   └── index.spec.ts
│   ├── package.json
│   ├── wrangler.toml
│   └── other config files...
│
├── package.json
└── webcm.config.ts
```

### Managed Component Structure (components/tic-tac-toe)
- `src/templates/`: Contains UI templates and game logic
  - `board_template.ts`: HTML template for the game board
  - `script.ts`: Game logic and event handlers
  - `styles.ts`: CSS styles for the widget
- `index.ts`: Main component entry point
- Configuration files for building and testing

### Worker Structure (computer-adversary-worker)
- `src/index.ts`: Worker logic for computer moves
- `test/`: Worker test files
- `wrangler.toml`: Cloudflare Worker configuration
- Configuration files for TypeScript and testing

## Component Interaction

1. **Game Widget → Worker Communication**
   - The game widget makes POST requests to the Worker endpoint when it needs a computer move
   - The Worker receives the current board state and returns a random valid move
   - Communication is handled through the Managed Component's `manager.fetch` API

2. **Widget → Browser Communication**
   - The widget injects HTML, CSS, and JavaScript into the host page
   - Game state is managed client-side through DOM manipulation
   - Event listeners handle player interactions

Reference to the relevant code:


```10:33:components/tic-tac-toe/src/index.ts
  manager.route(
    "/computer-move",
    async (request: Request): Promise<Response> => {
      try {
        const response = await manager.fetch(COMPUTER_WORKER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request.body),
        });

        return response!;
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Failed to get computer move" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }
  );
```


## Setup and Installation

1. **Prerequisites**
   - Node.js >= 18
   - npm

2. **Install Dependencies**
```bash
# Install root dependencies
npm install

# Install Managed Component dependencies
cd components/tic-tac-toe
npm install

# Install Worker dependencies
cd ../../computer-adversary-worker
npm install
```

3. **Development Setup**

For Worker:
```bash
cd computer-adversary-worker
npm run dev
```

For Managed Component:
```bash
# From project root
npm run dev
```

The development server will start at `http://localhost:1337`

## Development Notes

1. **Worker Development**
   - Uses Cloudflare Workers platform
   - Handles CORS for cross-origin requests
   - Returns random valid moves based on current board state

2. **Managed Component Development**
   - Built using the Managed Components framework
   - All assets (HTML, CSS, JS) are self-contained
   - Uses first-party routing through `manager.route`

3. **Testing**
   - Worker tests use Vitest with Cloudflare Workers test environment
   - Component tests can be run with `npm test` in the component directory

## Configuration

### Worker Configuration
The Worker configuration is managed through `wrangler.toml`. Key settings include:
- Compatibility date
- Environment variables
- Worker name and routes

### Managed Component Configuration
Component settings are defined in `manifest.json`, including:
- Required permissions
- Component metadata
- Default settings

## Deployment

1. **Deploy Worker**
```bash
cd computer-adversary-worker
npm run deploy
```

2. **Build and Deploy Component**
```bash
cd components/tic-tac-toe
npm run build
```

## Additional Resources

- [Managed Components Documentation](https://managedcomponents.dev)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## License

This project is licensed under the Apache License - see the LICENSE file for details.
