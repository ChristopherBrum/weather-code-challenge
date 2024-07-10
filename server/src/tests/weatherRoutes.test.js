import { jest } from "@jest/globals";

jest.unstable_mockModule("../services/weatherService.js", () => ({
  __esModule: true,
  fetchWeatherDataByCoords: jest.fn(),
  fetchWeatherDataByZip: jest.fn(),
}));

const { fetchWeatherDataByCoords, fetchWeatherDataByZip } = await import(
  "../services/weatherService.js"
);
const { getWeatherByCoords, getWeatherByZip } = await import(
  "../routes/weatherRoutes.js"
);

describe("getWeatherByCoords", () => {
  let mockRequest;
  let mockResponse;
  let originalConsoleError;

  beforeEach(() => {
    mockRequest = {
      query: {
        lon: "10.0",
        lat: "20.0",
      },
    };

    mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };

    originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it("should return weather data for valid zip code", async () => {
    const mockWeatherData = {
      temp: 25,
      conditions: "clear",
    };
    fetchWeatherDataByCoords.mockResolvedValue(mockWeatherData);

    await getWeatherByCoords(mockRequest, mockResponse);

    expect(fetchWeatherDataByCoords).toHaveBeenCalledWith("10.0", "20.0");
    expect(mockResponse.send).toHaveBeenCalledWith(mockWeatherData);
    expect(mockResponse.status).not.toHaveBeenCalled();
  });

  it("should handle missing longitude", async () => {
    mockRequest.query.lon = undefined;

    await getWeatherByCoords(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(
      "Error fetching weather data"
    );
  });
});

describe("getWeatherByZip", () => {
  let mockRequest;
  let mockResponse;
	let originalConsoleError;

  beforeEach(() => {
    mockRequest = {
      query: {
        zip: "94541",
      },
    };

    mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
    };
  
		originalConsoleError = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

	it('should return weather data for valid zip code', async () => {
    const mockWeatherData = {
      temperature: 28,
      conditions: 'Partly cloudy',
    };
    fetchWeatherDataByZip.mockResolvedValue(mockWeatherData);
    
    await getWeatherByZip(mockRequest, mockResponse);
    
    expect(fetchWeatherDataByZip).toHaveBeenCalledWith('94541');
    expect(mockResponse.send).toHaveBeenCalledWith(mockWeatherData);
  });

  it('should handle missing zip code', async () => {
    mockRequest.query.zip = undefined;
    
    await getWeatherByZip(mockRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith('Error fetching weather data');
  });
});
