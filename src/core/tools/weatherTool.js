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

export async function getWeather(city) {
  // TODO: Replace with actual weather API call
  return { 
    city,
    forecast: "Sunny", 
    temperature: 15,
    unit: "celsius"
  };
}

