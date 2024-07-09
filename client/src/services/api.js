const apiUrl = "http://localhost:3000/api/v1/weather/";

export const searchCityName = async (prefix) => {
  const url = new URL(apiUrl + "search");
  url.searchParams.append("name", prefix);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch city names");
  }
  const cityNamesList = await response.json();
  return cityNamesList;
};

export const fetchWeatherDataByCoords = async (longitude, latitude) => {
  const url = new URL(apiUrl + "coords");
  url.searchParams.append("lon", longitude);
  url.searchParams.append("lat", latitude);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Failed to fetch city weather by coords");
  }
  const data = await response.json();
  return data;
};

export const fetchWeatherDataByZip = async (zipCode) => {
  const url = new URL(apiUrl + "zip");
  url.searchParams.append("zip", zipCode);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch city weather by zip");
  }
  const data = await response.json();
  return data;
};
