import { fetchWeatherData } from "../services/weatherService.js";

export const getWeatherByCity = async (request, response) => {
  const longitude = request.query.lon;
  const latitude = request.query.lat;

  try {
    if (!longitude) {
      throw new Error("Invalid longitude");
    }
    if (!latitude) {
      throw new Error("Invalid latitude");
    }

    const currentWeather = await fetchWeatherData(longitude, latitude);
    response.send(currentWeather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    response.status(500).send("Error fetching weather data");
  }
};

export const getWeatherByZip = async (request, response) => {
  response.send(`Weather data for zip!`);
};

export const getWeatherByCoordinates = async (request, response) => {
  response.send(`Weather data for coordinates!`);
};
