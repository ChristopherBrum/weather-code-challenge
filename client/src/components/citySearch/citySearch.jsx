import { useState, useEffect } from "react";
import styles from "./citySearch.module.css";
import WeatherDisplay from "../weatherDisplay/weatherDisplay";

const CitySearch = () => {
  const [prefix, setPrefix] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const url = "http://localhost:3000/api/v1/weather/";

  const searchCityName = async () => {
    const response = await fetch(`${url}search?name=${prefix}`);
    if (!response) {
      console.log("Failed to fetch city names");
    }
    const cityNamesList = await response.json();
    setSearchResults(cityNamesList);
  };

  const handleDefault = () => {};

  const handleFetchWeather = async (city) => {
    const longitude = city.coord.lon;
    const latitude = city.coord.lat;

    const response = await fetch(`${url}city?lon=${longitude}&lat=${latitude}`);

    if (!response) {
      console.log("Failed to fetch city weather");
    }

    const data = await response.json();
    console.log(data);
    setSearchResults([]);
    setWeatherData(data);
  };

  useEffect(() => {
    if (prefix.length > 2) {
      searchCityName();
    } else {
      setSearchResults([]);
    }
  }, [prefix]);

  return (
    <>
      <form className="form">
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="Search..."
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          {searchResults.length > 0
            ? searchResults.map((city) => {
                return (
                  <input
                    key={city.id}
                    type="text"
                    name="search-bar"
                    className={styles.searchSelect}
                    id="search-bar2"
                    value={
                      city.state
                        ? `${city.name}, ${city.state} - ${city.country}`
                        : `${city.name} - ${city.country}`
                    }
                    onChange={handleDefault}
                    onClick={() => handleFetchWeather(city)}
                  />
                );
              })
            : null}
        </div>
      </form>
      {weatherData ? <WeatherDisplay weatherData={weatherData} /> : null}
    </>
  );
};

export default CitySearch;
