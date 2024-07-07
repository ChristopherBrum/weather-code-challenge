import { useState } from 'react';

const CitySearch = () => {
  const [city, setCity] = useState('');

  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
    </form>
  );
};

export default CitySearch;
