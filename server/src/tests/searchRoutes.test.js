import { getAllCitiesByName } from '../routes/searchRoutes';
import { fetchCityMatches } from '../services/searchService';

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

  it('should handle empty search text', async () => {
    mockRequest.query.name = ''; 
    const errorMessage = 'Search text is empty or invalid';

    await getAllCitiesByName(mockRequest, mockResponse);

    expect(fetchCityMatches).not.toHaveBeenCalled();
    expect(mockResponse.send).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle errors from fetchCityMatches', async () => {
    const errorMessage = 'Error fetching city names';
    fetchCityMatches.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await getAllCitiesByName(mockRequest, mockResponse);

    expect(fetchCityMatches).toHaveBeenCalledWith('sea');
    expect(mockResponse.send).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(errorMessage);
  });
});
