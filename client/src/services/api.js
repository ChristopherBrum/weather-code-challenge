const url = "http://localhost:3000/api/v1/weather/";

export const searchCityName = async (prefix) => {
  const response = await fetch(`${url}search?name=${prefix}`);
  if (!response.ok) {
    throw new Error("Failed to fetch city names");
  }
  const cityNamesList = await response.json();
  return cityNamesList;
};

export const fetchWeatherDataByCoords = async (city) => {
  const longitude = city.coord.lon;
  const latitude = city.coord.lat;

  const response = await fetch(`${url}coords?lon=${longitude}&lat=${latitude}`);
  if (!response.ok) {
    throw new Error("Failed to fetch city weather by coords");
  }
  const data = await response.json();
  return data;
};

export const fetchWeatherDataByZip = async (zipCode) => {
	const response = await fetch(`${url}zip?zip=${zipCode}`);
  if (!response.ok) {
    throw new Error("Failed to fetch city weather by zip");
  }
  const data = await response.json();
  return data;
};
