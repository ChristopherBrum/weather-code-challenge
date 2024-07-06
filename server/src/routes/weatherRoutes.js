import { fetchDataByCityName } from "../services/locationService.js";
import { fetchWeatherData } from "../services/weatherService.js";

// const apiKey = process.env.OPEN_WEATHER_API_KEY;

export const getWeatherByCity = async (req, res) => {
  const cityName = req.query.name.trim();

  try {
    if (!cityName) {
      throw new Error("City name is required");
    }

    const cityData = await fetchDataByCityName(cityName);
    const longitude = cityData[0].lon;
    const latitude = cityData[0].lat;
    const currentWeather = await fetchWeatherData(longitude, latitude);
    res.send(currentWeather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Error fetching weather data");
  }
};

export const getWeatherByZip = async (req, res) => {
  res.send(`Weather data for zip!`);
};

export const getWeatherByCoordinates = async (req, res) => {
  res.send(`Weather data for coordinates!`);
};
