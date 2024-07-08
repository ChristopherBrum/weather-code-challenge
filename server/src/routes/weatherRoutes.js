import { fetchWeatherDataByCoords, fetchWeatherDataByZip } from "../services/weatherService.js";

export const getWeatherByCoords = async (request, response) => {
  const longitude = request.query.lon;
  const latitude = request.query.lat;

  try {
    if (!longitude) {
      throw new Error("Invalid longitude");
    }
    if (!latitude) {
      throw new Error("Invalid latitude");
    }

    const currentWeather = await fetchWeatherDataByCoords(longitude, latitude);
    response.send(currentWeather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    response.status(500).send("Error fetching weather data");
  }
};

export const getWeatherByZip = async (request, response) => {
  const zipCode = request.query.zip;

  console.log(zipCode);

  try {
    if (!zipCode) {
      throw new Error("Invalid Zip Code");
    }

    const currentWeather = await fetchWeatherDataByZip(zipCode);

    console.log("currentWeather:", currentWeather)
    response.send(currentWeather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    response.status(500).send("Error fetching weather data");
  }
};

