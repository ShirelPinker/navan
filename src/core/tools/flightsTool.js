export const flightsTool = {
  type: "function",
  function: {
    name: "getFlights",
    description: "Get scheduled flights between two airports.",
    parameters: {
      type: "object",
      properties: {
        depIata: { 
          type: "string",
          description: "Departure airport IATA code (e.g. TLV)" 
        },
        arrIata: { 
          type: "string",
          description: "Arrival airport IATA code (e.g. OSL)" 
        },
        date: {
          type: "string",
          description: "Optional date in YYYY-MM-DD format",
          nullable: true
        }
      },
      required: ["depIata", "arrIata", "date"],
      additionalProperties: false
    },
    strict: true
  }
};
