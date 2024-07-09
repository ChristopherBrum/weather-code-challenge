const apiKey = process.env.OPEN_WEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeatherDataByCoords = async (lon, lat) => {
  try {
    const url = new URL(apiUrl);
    url.searchParams.append("lon", lon);
    url.searchParams.append("lat", lat);
    url.searchParams.append("units", "imperial");
    url.searchParams.append("appid", apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      return {
        palmettoMessage: "Coordinates are invalid",
      };
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};

const fetchWeatherDataByZip = async (zipCode) => {
  try {
    const url = new URL(apiUrl);
    url.searchParams.append("zip", zipCode);
    url.searchParams.append("units", "imperial");
    url.searchParams.append("appid", apiKey);
    const response = await fetch(url.toString());

    if (!response.ok) {
      return {
        palmettoMessage: "Zip code doesn't exists",
      };
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};

export { fetchWeatherDataByCoords, fetchWeatherDataByZip };
