import {
  getWeatherByCoords,
  getWeatherByZip,
} from "../routes/weatherRoutes.js";
import {
  fetchWeatherDataByCoords,
  fetchWeatherDataByZip,
} from "../services/weatherService.js";

jest.mock("../services/weatherService.js");

describe("getWeatherByCoords", () => {
  let request, response;

  beforeEach(() => {
    request = {
      query: {},
    };
    response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test("should return weather data for valid coordinates", async () => {
    request.query.lon = "10.00";
    request.query.lat = "20.00";
    const mockWeatherData = { weather: "sunny" };

    fetchWeatherDataByCoords.mockResolvedValue(mockWeatherData);

    await getWeatherByCoords(request, response);

    expect(fetchWeatherDataByCoords).toHaveBeenCalledWith("10.00", "20.00");
    expect(response.send).toHaveBeenCalledWith(mockWeatherData);
  });

  test("should return 500 for missing longitude", async () => {
    request.query.lat = "20.00";

    await getWeatherByCoords(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith("Error fetching weather data");
  });

  test("should return 500 for missing latitude", async () => {
    request.query.lon = "10.00";

    await getWeatherByCoords(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith("Error fetching weather data");
  });

  test("should return 500 for fetch error", async () => {
    request.query.lon = "10.00";
    request.query.lat = "20.00";

    fetchWeatherDataByCoords.mockRejectedValue(new Error("Fetch error"));

    await getWeatherByCoords(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith("Error fetching weather data");
  });
});

describe("getWeatherByZip", () => {
  let request, response;

  beforeEach(() => {
    request = {
      query: {},
    };
    response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  test("should return weather data for valid zip code", async () => {
    request.query.zip = "12345";
    const mockWeatherData = { weather: "sunny" };

    fetchWeatherDataByZip.mockResolvedValue(mockWeatherData);

    await getWeatherByZip(request, response);

    expect(fetchWeatherDataByZip).toHaveBeenCalledWith("12345");
    expect(response.send).toHaveBeenCalledWith(mockWeatherData);
  });

  test("should return 500 for missing zip code", async () => {
    await getWeatherByZip(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith("Error fetching weather data");
  });

  test("should return 500 for fetch error", async () => {
    request.query.zip = "12345";

    fetchWeatherDataByZip.mockRejectedValue(new Error("Fetch error"));

    await getWeatherByZip(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith("Error fetching weather data");
  });
});
