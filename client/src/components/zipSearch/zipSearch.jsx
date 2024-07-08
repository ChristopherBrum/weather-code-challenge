import { useState } from "react";

const ZipCodeSearch = () => {
  const [zipCode, setZipCode] = useState('');

  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          placeholder="Search..."
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
    </form>
  );
};

export default ZipCodeSearch;