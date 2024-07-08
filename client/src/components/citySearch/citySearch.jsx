import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./citySearch.module.css";
import {
  searchCityName,
  fetchWeatherDataByCoords,
} from "../../services/api.js";

const CitySearch = ({ setWeatherData }) => {
  const [prefix, setPrefix] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (prefix.length > 2) {
        handleSearchCityName();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [prefix]);

  const handleSearchCityName = async () => {
    try {
      const cityNamesList = await searchCityName(prefix);
      setSearchResults(cityNamesList);
    } catch (error) {
      console.error(error.message);
      setSearchResults([]);
    }
  };

  const handleFetchWeather = async (city) => {
    try {
      const data = await fetchWeatherDataByCoords(city);
      setSearchResults([]);
      setWeatherData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDefault = () => {};

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
    </>
  );
};

CitySearch.propTypes = {
  setWeatherData: PropTypes.func.isRequired,
};

export default CitySearch;
