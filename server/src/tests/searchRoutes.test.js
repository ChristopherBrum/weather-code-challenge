import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/searchService', () => ({
  __esModule: true,
  fetchCityMatches: jest.fn(),
}));

const { fetchCityMatches } = await import('../services/searchService');
const { getAllCitiesByName } = await import('../routes/searchRoutes');

describe('getAllCitiesByName', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      query: {
        name: 'sea',
      },
    };
    mockResponse = {
      send: jest.fn(),
      status: jest.fn(() => mockResponse),
      end: jest.fn(),
    };
  });

  it('should return city matches for valid search text', async () => {
    const mockMatches = [
      { name: 'Seattle', country: 'US' },
      { name: 'Seaside', country: 'US' },
    ];
    fetchCityMatches.mockReturnValue(mockMatches);
    
    await getAllCitiesByName(mockRequest, mockResponse);
    
    expect(fetchCityMatches).toHaveBeenCalledWith('sea');
    expect(mockResponse.send).toHaveBeenCalledWith(mockMatches);
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.end).not.toHaveBeenCalled();
  });

  it('should handle missing name parameter', async () => {
    mockRequest.query.name = undefined;
    
    await getAllCitiesByName(mockRequest, mockResponse);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({ error: "Name query parameter is required" });
  });
});
