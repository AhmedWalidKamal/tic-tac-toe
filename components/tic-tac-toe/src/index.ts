import { ComponentSettings, Manager } from "@managed-components/types"

const widgetHTML = (location: string, temperature: number) => `
    <style>
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
        .widget-inputs {
            margin-bottom: 15px;
        }
        .widget-inputs input {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .widget-inputs button {
            padding: 10px 20px;
            background: #007BFF;
            border: none;
            color: white;
            border-radius: 4px;
            cursor: pointer;
        }
        .widget-inputs button:hover {
            background: #0056b3;
        }
        .weather-display {
            font-size: 1.2em;
            margin-top: 10px;
        }
    </style>  

    <div class="widget-container">
        <div class="widget-header">Weather Widget</div>
        <div class="weather-display" id="weather-display">
          The temperature in ${location} is ${temperature}°C.
        </div>
    </div>
`

export default async function (manager: Manager, _settings: ComponentSettings) {
  manager.addEventListener("pageview", (event) => {
    console.log("Hello server!")
    event.client.execute("console.log('Hello browser')")
  })

  manager.registerWidget(async () => {
    const location = "Colombia"
    const widget = await manager.useCache("weather-" + location, async () => {
      try {
        const response = await manager.fetch(
          `https://wttr.in/${location}?format=j1`
        )
        const data = await response?.json()
        const [summary] = data.current_condition
        const { temp_C } = summary
        return widgetHTML(location, temp_C)
      } catch (error) {
        console.error("error fetching weather for widget:", error)
      }
    })
    return widget
  })
}
