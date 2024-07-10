import { fetchCityMatches } from "../services/searchService.js";

export const getAllCitiesByName = async (request, response) => {
  const { name } = request.query;

  if (!name) {
    return response
      .status(400)
      .send({ error: "Name query parameter is required" });
  }

  try {
    const matches = await fetchCityMatches(name);
    response.send(matches);
  } catch (error) {
    console.error("Error fetching city names:", error);
    response.status(500).send("Error fetching city names");
  }
};
