export const weatherTool = {
  type: "function",
  function: {
    name: "getWeather",
    description: "Get current weather for a city including temperature and conditions.",
    parameters: {
      type: "object",
      properties: {
        city: { 
          type: "string",
          description: "The city name to get weather for"
        }
      },
      required: ["city"],
      additionalProperties: false
    },
    strict: true
  }
};

