export const hotelTool = {
  type: "function",
  function: {
    name: "searchHotels",
    description: "Search for available hotels in a city.",
    parameters: {
      type: "object",
      properties: {
        city: { 
          type: "string",
          description: "The city to search hotels in"
        }
      },
      required: ["city"],
      additionalProperties: false
    },
    strict: true
  }
};

export async function searchHotels(city) {
  // TODO: Replace with actual hotel API call
  return { 
    city,
    hotels: [
      { name: "Grand Hotel", rating: 4.5, pricePerNight: 150 },
      { name: "City Center Inn", rating: 4.0, pricePerNight: 95 }
    ]
  };
}

