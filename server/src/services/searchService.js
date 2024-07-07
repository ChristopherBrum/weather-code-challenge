import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const MAX_CITY_MATCHES = 15;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToCityList = path.resolve(__dirname, "../../data/city-list.json");

let citiesData;

const initializeCityData = () => {
  try {
    const data = fs.readFileSync(pathToCityList, "utf8");
    citiesData = JSON.parse(data);
    console.log("city-list initialized! # of cities: ", citiesData.length);
  } catch (error) {
    console.error("Error reading city list file:", error);
    citiesData = [];
  }
};

initializeCityData();

export const fetchCityMatches = (searchText) => {
  if (!searchText || searchText.length === 0) {
    console.error("City data is not initialized");
    return [];
  }
  const normalizedSearchText = searchText.trim().toLowerCase();

  let matches = citiesData.filter((city) => {
    return city.name.toLowerCase().startsWith(normalizedSearchText);
  });

  if (matches.length > MAX_CITY_MATCHES) {
    matches = matches.slice(0, MAX_CITY_MATCHES);
  }
  return matches;
};
