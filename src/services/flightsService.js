const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET;

export async function getFlights(depIata, arrIata, date) {
  try {
    const token = await getAmadeusToken();

    const rawOffers = await searchAmadeusFlights(token, depIata, arrIata, date);

    const flights = normalizeFlights(rawOffers);

    return {
      depIata,
      arrIata,
      date,
      flights
    };

  } catch (err) {
    console.error("❌ Amadeus Flights Error:", err.message);

    return {
      depIata,
      arrIata,
      date,
      flights: [],
      error: err.message
    };
  }
}


async function getAmadeusToken() {
  const tokenUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", API_KEY);
  params.append("client_secret", API_SECRET);

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to authenticate with Amadeus: " + text);
  }

  const data = await res.json();
  return data.access_token;
}

async function searchAmadeusFlights(token, depIata, arrIata, date) {
  const url = "https://test.api.amadeus.com/v2/shopping/flight-offers";

  const body = {
    currencyCode: "USD",
    originDestinations: [
      {
        id: "1",
        originLocationCode: depIata,
        destinationLocationCode: arrIata,
        departureDateTimeRange: { date }
      }
    ],
    travelers: [{ id: "1", travelerType: "ADULT" }],
    sources: ["GDS"]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.errors?.[0]?.detail || "Flight search failed");
  }

  return data.data || [];
}


function normalizeFlights(offers) {
  if (!offers || offers.length === 0) return [];

  return offers.slice(0, 5).map((offer) => {
    const itinerary = offer.itineraries[0];
    const firstSeg = itinerary.segments[0];
    const lastSeg = itinerary.segments[itinerary.segments.length - 1];

    return {
      airline: firstSeg.carrierCode,
      flightNumber: firstSeg.number,
      departureAirport: firstSeg.departure.iataCode,
      arrivalAirport: lastSeg.arrival.iataCode,
      departureTime: firstSeg.departure.at,
      arrivalTime: lastSeg.arrival.at,
      duration: itinerary.duration,
      price: offer.price?.total
    };
  });
}
