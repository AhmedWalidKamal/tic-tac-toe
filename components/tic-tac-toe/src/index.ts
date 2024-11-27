import { ComponentSettings, Manager } from "@managed-components/types";
import { styles } from "./templates/styles";
import { boardTemplate } from "./templates/board_template";
import { initializeGame } from "./templates/script";

const COMPUTER_WORKER_URL =
  "https://computer-adversary-worker.ahmed3walid96.workers.dev/";

export default async function (manager: Manager, _settings: ComponentSettings) {
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
