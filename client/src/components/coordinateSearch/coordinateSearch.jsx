import { useState } from "react";
import PropTypes from "prop-types";
import { fetchWeatherDataByCoords } from "../../services/api";

const LocationWeatherSearch = ({ setWeatherData }) => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const handleLongitudeChange = (e) => {
    if (invalidChar(e.target.value)) return;
    setLongitude(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    if (invalidChar(e.target.value)) return;
    setLatitude(e.target.value);
  };

  const invalidChar = (input) => {
    const regex = /[^\d.-]/;
    return regex.test(input);
  };

  const handleFetchWeather = async () => {
    if (!longitude || !latitude) {
      return;
    }

    try {
      const data = await fetchWeatherDataByCoords({ longitude, latitude });
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  return (
    <>
      <form className="form form-wrapper">
        <div className="form-group coordinates-l">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            placeholder="Longitude..."
            value={longitude}
            onChange={handleLongitudeChange}
          />
        </div>
        <div className="form-group coordinates-r">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            placeholder="Latitude..."
            value={latitude}
            onChange={handleLatitudeChange}
          />
        </div>
      </form>
      <div className="coords-submit" onClick={handleFetchWeather}>
        get weather
      </div>
    </>
  );
};

LocationWeatherSearch.propTypes = {
  setWeatherData: PropTypes.func.isRequired,
};

export default LocationWeatherSearch;
