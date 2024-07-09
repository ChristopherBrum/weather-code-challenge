import { fetchCityMatches } from "../services/searchService.js";

export const getAllCitiesByName = async (request, response) => {
  const searchText = request.query.name;

  try {
    const matches = fetchCityMatches(searchText);
    response.send(matches);
  } catch (error) {
    console.error("Error fetching city names:", error);
    response.status(500).send("Error fetching city names");
  }
};
