const API_KEY = process.env.AVIATIONSTACK_KEY;

/**
 * Fetch flights between two airports (IATA codes)
 * Example: getFlights("TLV", "OSL")
 */
export async function getFlights(depIata, arrIata, date = null) {
  let url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${depIata}&arr_iata=${arrIata}`;

  if (date) {
    url += `&flight_date=${date}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    return { flights: [] };
  }

  // Simplify for the LLM
  const flights = data.data.slice(0, 5).map(f => ({
    airline: f.airline?.name,
    flightNumber: f.flight?.iata,
    departureAirport: f.departure?.airport,
    arrivalAirport: f.arrival?.airport,
    departureTime: f.departure?.scheduled,
    arrivalTime: f.arrival?.scheduled,
    status: f.flight_status
  }));

  return {
    depIata,
    arrIata,
    date,
    flights
  };
}
