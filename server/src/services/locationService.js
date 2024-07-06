const apiKey = process.env.OPEN_WEATHER_API_KEY;
const apiUrl = "http://api.openweathermap.org/geo/1.0/direct";

const fetchDataByCityName = async (cityName) => {
  try {
    const url = new URL(apiUrl);
    url.searchParams.append("q", cityName);
    url.searchParams.append("limit", "5");
    url.searchParams.append("appid", apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const cityData = await response.json();
    return cityData;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};

export { fetchDataByCityName };
