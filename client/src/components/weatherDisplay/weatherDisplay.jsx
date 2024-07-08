import PropTypes from 'prop-types';
import styles from './weatherDisplay.module.css';

function WeatherDisplay({ data }) {
  return (
    <div className={styles.weatherContainer}>
      <div className={styles.currentWeather}>
        <h2>Current Weather in {`${data.name}, ${data.sys.country}`}</h2>
        <ul>
          <li className={styles.weatherItem}>
            <span className={styles.label}>Current Temp:</span>
            <span className={styles.value}>{data.main.temp.toFixed(1)} °F</span>
          </li>
          <li className={styles.weatherItem}>
            <span className={styles.label}>Feels like:</span>
            <span className={styles.value}>{data.main.feels_like.toFixed(1)} °F</span>
          </li>
          <li className={styles.weatherItem}>
            <span className={styles.label}>High:</span>
            <span className={styles.value}>{data.main.temp_max.toFixed(1)} °F</span>
          </li>
          <li className={styles.weatherItem}>
            <span className={styles.label}>Low:</span>
            <span className={styles.value}>{data.main.temp_min.toFixed(1)} °F</span>
          </li>
          <li className={styles.weatherItem}>
            <span className={styles.label}>Cloud cover:</span>
            <span className={styles.value}>{data.weather[0].description}</span>
          </li>
          <li className={styles.weatherItem}>
            <span className={styles.label}>Humidity:</span>
            <span className={styles.value}>{data.main.humidity}%</span>
          </li>
        </ul>
      </div>
      <div className={styles.forecast}>
        <h2>5-Day Forecast</h2>
        {/* Add forecast elements here */}
      </div>
    </div>
  );
}

WeatherDisplay.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};


export default WeatherDisplay;