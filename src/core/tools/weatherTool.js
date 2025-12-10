export const weatherTool = {
    type: "function",
    function: {
        name: "getWeather",
        description: "Get weather for a city. Can get current weather or forecast for a specific date.",
        parameters: {
            type: "object",
            properties: {
                city: {
                    type: "string",
                    description: "The city name to get weather for"
                },
                date: {
                    type: ["string", "null"],
                    description: "Optional date for forecast in YYYY-MM-DD format. If not provided or null, returns current weather."
                }
            },
            required: ["city", "date"],
            additionalProperties: false
        },
        strict: true
    }
};
