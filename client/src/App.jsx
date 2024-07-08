import { useState } from "react";
import "./App.css";
import logo from "/palmetto-logo.png";
import CitySearch from "./components/citySearch/citySearch";
import ZipCodeSearch from "./components/zipSearch/zipSearch";
import CoordinateSearch from "./components/coordinateSearch/coordinateSearch";

const App = () => {
  const [navSelected, setNavSelected] = useState("citySearch");

  const handleNavClick = (e) => {
    setNavSelected(e.target.getAttribute("data-value"));
  };

  let componentToShow;
  if (navSelected === "citySearch") {
    componentToShow = <CitySearch />;
  } else if (navSelected === "zipSearch") {
    componentToShow = <ZipCodeSearch />;
  } else if (navSelected === "coordinateSearch") {
    componentToShow = <CoordinateSearch />;
  }

  return (
    <>
      <div className="title">
        <img src={logo} alt="Palmetto logo" className="logo"></img>
        <h1>Palmetto Weather</h1>
      </div>
      <div className="nav-container">
        <div
          className={`citySearch-nav ${
            navSelected === "citySearch" ? "selected" : ""
          }`}
          data-value="citySearch"
          onClick={handleNavClick}
        >
          search by city
        </div>
        <div
          className={`zipSearch-nav ${
            navSelected === "zipSearch" ? "selected" : ""
          }`}
          data-value="zipSearch"
          onClick={handleNavClick}
        >
          search by zip code
        </div>
        <div
          className={`coordinateSearch-nav ${
            navSelected === "coordinateSearch" ? "selected" : ""
          }`}
          data-value="coordinateSearch"
          onClick={handleNavClick}
        >
          search by coordinates
        </div>
      </div>
      {componentToShow}
    </>
  );
};

export default App;
