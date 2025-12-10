export async function getWeather(city, date) {
    const location = await geocodeCity(city);

    if (date) {
        return getForecast(location, date);
    }
    return getCurrentWeather(location);
}

async function getForecast(location, date) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto&start_date=${date}&end_date=${date}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.daily || data.daily.time.length === 0) {
        throw new Error(`No forecast available for ${date}`);
    }

    return {
        city: location.name,
        country: location.country,
        date: data.daily.time[0],
        temperatureMax: data.daily.temperature_2m_max[0],
        temperatureMin: data.daily.temperature_2m_min[0],
        windspeed: data.daily.windspeed_10m_max[0],
        conditions: data.daily.weathercode[0],
        unit: "celsius"
    };
}

async function getCurrentWeather(location) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    return {
        city: location.name,
        country: location.country,
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        conditions: data.current_weather.weathercode,
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
