import { ComponentSettings, Manager } from "@managed-components/types";
import { styles } from "./templates/styles";
import { boardTemplate } from "./templates/board_template";
import { initializeGame } from "./templates/script";

export default async function (manager: Manager, _settings: ComponentSettings) {
  // Set up route for computer moves
  manager.route("/api/next-move", async (request) => {
    const { board } = await request.json();

    // Find available moves
    const availableMoves = board.reduce(
      (moves: number[], cell: string, index: number) => {
        if (!cell) moves.push(index);
        return moves;
      },
      []
    );

    // Select random move
    const move =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];

    return new Response(JSON.stringify({ move }), {
      headers: { "Content-Type": "application/json" },
    });
  });

  // Register the widget
  manager.registerWidget(async () => {
    const html = `
      <style>${styles}</style>
      ${boardTemplate}
      <script>
        (${initializeGame.toString()})();
      </script>
    `;
    return html;
  });
}
