import fs from "fs";
import { fetchCityMatches } from "../services/searchService";

const mockCitiesData = [
  { name: "Seattle" },
	{ name: "Seahaven" },
  { name: "San Francisco" },
  { name: "New York" },
  { name: "Boston" },
  { name: "Portland" },
  { name: "Los Angeles" },
  { name: "Chicago" },
  { name: "Houston" },
  { name: "Miami" },
];

jest.mock("fs");
fs.readFileSync.mockReturnValue(JSON.stringify(mockCitiesData));

describe("fetchCityMatches", () => {
  beforeAll(() => {
    global.citiesData = null;
  });

  it("should return matching cities for valid search text", () => {
    const searchText = "sea";

    const result = fetchCityMatches(searchText);

    expect(result).toHaveLength(2);
    expect(result[0].name).toEqual("Seattle");
  });

  it("should handle empty search text", () => {
    const searchText = "";

    const result = fetchCityMatches(searchText);

    expect(result).toEqual([]);
  });

  it("should handle no matches", () => {
    const searchText = "xyz";

    const result = fetchCityMatches(searchText);

    expect(result).toEqual([]);
  });

  it("should limit matches to MAX_CITY_MATCHES", () => {
    const searchText = "s";

    const result = fetchCityMatches(searchText);

    expect(result).toHaveLength(MAX_CITY_MATCHES);
  });

  it("should handle case sensitivity", () => {
    const searchText = "bOS";

    const result = fetchCityMatches(searchText);

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual("Boston");
  });
});
