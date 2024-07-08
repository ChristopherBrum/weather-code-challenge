import { useState, useEffect } from "react";
import styles from "./citySearch.module.css";

const CitySearch = () => {
  const [prefix, setPrefix] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchCityName = async () => {
    const response = await fetch(
      `http://localhost:3000/api/v1/weather/search?name=${prefix}`
    );
    if (!response) {
      console.log("Failed to fetch city names");
    }
    const cityNamesList = await response.json();
    setSearchResults(cityNamesList);
  };

  const handleDefault = () => {}

  const handleFetchWeather = () => {
    
  }

  useEffect(() => {
    if (prefix.length > 2) {
      searchCityName();
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
                    onClick={handleFetchWeather}
                  />
                );
              })
            : null}
        </div>
      </form>
    </>
  );
};

export default CitySearch;
