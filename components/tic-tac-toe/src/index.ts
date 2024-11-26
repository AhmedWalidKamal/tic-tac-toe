import { ComponentSettings, Manager } from "@managed-components/types";
import { styles } from "./templates/styles";
import { boardTemplate } from "./templates/board_template";
import { initializeGame } from "./templates/script";

export default async function (manager: Manager, _settings: ComponentSettings) {
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
