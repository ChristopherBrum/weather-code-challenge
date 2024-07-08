import { useState } from "react";

const CoordinateSearch = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  return (
    <form className="form form-wrapper">
      <div className="form-group coordinates-l">
				<label htmlFor="longitude">Longitude:</label>
				<input
					type="text"
					id="longitude"
					placeholder="Longitude..."
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
				/>
      </div>
			<div className="form-group coordinates-r">
				<label htmlFor="latitude">Latitude:</label>
				<input
					type="text"
					id="latitude"
					placeholder="Latitude..."
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
				/>
      </div>
    </form>
  );
};

export default CoordinateSearch;
