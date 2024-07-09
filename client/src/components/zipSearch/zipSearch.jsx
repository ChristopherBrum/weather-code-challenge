import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchWeatherDataByZip } from "../../services/api";

const ZipCodeSearch = ({ setWeatherData }) => {
  const [zipCode, setZipCode] = useState("");
  const [validZip, setValidZip] = useState(false);

  useEffect(() => {
    if (zipCode.length === 5 && validZip) {
      updateWeatherDisplay();
    }
    setValidZip(false);
  }, [validZip]);

  const updateWeatherDisplay = async () => {
    try {
      const data = await fetchWeatherDataByZip(zipCode);
      setWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  const handleInput = async (e) => {
    if (invalidChar(e.target.value)) return;

    if (e.target.value.length === 5 && e.target.value !== zipCode) {
      setZipCode(e.target.value);
      setValidZip(true);
    } else if (e.target.value.length > 5) {
      return;
    } else {
      setZipCode(e.target.value);
    }
  };

  const invalidChar = (zip) => {
    const regex = /\D/;
    return regex.test(zip);
  };

  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="zipCode">Zip Code (US only):</label>
        <input
          type="text"
          id="zipCode"
          placeholder="Search..."
          value={zipCode}
          onChange={handleInput}
        />
      </div>
    </form>
  );
};

ZipCodeSearch.propTypes = {
  setWeatherData: PropTypes.func.isRequired,
};

export default ZipCodeSearch;
