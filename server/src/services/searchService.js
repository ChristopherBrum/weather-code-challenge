import path from "path";
import { fileURLToPath } from 'url';
import { readFileSync } from "fs";

const MAX_CITY_MATCHES = 25;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToCityList = path.resolve(__dirname, "../../data/city-list.json");

export let citiesData;

export const initializeCityData = (customReadFile = readFileSync) => {
  if (!citiesData) {
    try {
      const data = readFileSync(pathToCityList, "utf8");
      citiesData = JSON.parse(data);
    } catch (error) {
      console.error("Error reading city list file:", error);
      citiesData = [];
    }
  }
};

export const resetCitiesData = () => {
  citiesData = null;
};

export const fetchCityMatches = (searchText) => {
  if (!citiesData) {
    initializeCityData();
  }

  if (!searchText || searchText.trim().length === 0) {
    console.error("Search text is empty or invalid");
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
