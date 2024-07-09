import {
  fetchWeatherDataByCoords,
  fetchWeatherDataByZip,
} from "../services/weatherService";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

const originalConsoleError = console.error;

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("fetchWeatherDataByCoords", () => {
  it("should return weather data for valid coordinates", async () => {
    const mockResponse = { temp: 75 };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await fetchWeatherDataByCoords(-122.4194, 37.7749);

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("should return error message for invalid coordinates", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Invalid coordinates" }),
      { status: 400 }
    );

    const result = await fetchWeatherDataByCoords(0, 0);

    expect(result).toEqual({ palmettoMessage: "Coordinates are invalid" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if fetch fails", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    await expect(fetchWeatherDataByCoords(-122.4194, 37.7749)).rejects.toThrow(
      "Failed to fetch"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("fetchWeatherDataByZip", () => {
  it("should return weather data for valid zip code", async () => {
    const mockResponse = { temp: 75 };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await fetchWeatherDataByZip("94103");

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("should return error message for invalid zip code", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Invalid zip code" }),
      { status: 400 }
    );

    const result = await fetchWeatherDataByZip("00000");

    expect(result).toEqual({ palmettoMessage: "Zip code doesn't exists" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if fetch fails", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to fetch"));

    await expect(fetchWeatherDataByZip("94103")).rejects.toThrow(
      "Failed to fetch"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
