export async function getWeather(city) {
    const location = await geocodeCity(city);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    return {
        city: location.name,
        country: location.country,
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        conditions: data.current_weather.weathercode, // numeric code
        unit: "celsius"
    };
}

async function geocodeCity(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
    )}&count=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${city}" not found`);
    }

    const result = data.results[0];

    return {
        name: result.name,
        country: result.country,
        latitude: result.latitude,
        longitude: result.longitude,
    };
}