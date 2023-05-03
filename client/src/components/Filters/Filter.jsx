import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabeticOrder,
  populationOrder,
  continentOrder,
  getCountries,
  activityOrder,
} from "../../redux/actions/actions";

export default function Filter() {
  const { activities } = useSelector((state) => state);
  const dispatch = useDispatch();
  const sortedActivities = activities.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  function handleAlphabeticOrder(e) {
    e.preventDefault();
    const { value } = e.target;
    dispatch(alphabeticOrder(value));
  }

  function handlePopulationOrder(e) {
    e.preventDefault();
    const { value } = e.target;
    dispatch(populationOrder(value));
  }

  function handleContinentOrder(e) {
    e.preventDefault();
    const { value } = e.target;
    const activityValue = document.getElementById("activity-selector").value;
    dispatch(continentOrder(value, activityValue));
  }

  function handleActivitytOrder(e) {
    e.preventDefault();
    const { value } = e.target;
    dispatch(activityOrder(value));
  }

  function resetBtton() {
    dispatch(getCountries());
    document.getElementById("alphabetic-selector").selectedIndex = 0;
    document.getElementById("population-selector").selectedIndex = 0;
    document.getElementById("continent-selector").selectedIndex = 0;
    document.getElementById("activity-selector").selectedIndex = 0;
  }
  return (
    <div>
      <select
        id="alphabetic-selector"
        onChange={handleAlphabeticOrder}
        name="Alphabetic"
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled={true}>
          Select Order
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select
        id="population-selector"
        onChange={handlePopulationOrder}
        name="Population"
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled={true}>
          Select Order
        </option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <select
        id="continent-selector"
        onChange={handleContinentOrder}
        name="Continent"
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled={true}>
          Select Filter
        </option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Oceania">Oceania</option>
      </select>
      <select
        id="activity-selector"
        name="activity"
        onChange={handleActivitytOrder}
        defaultValue=""
      >
        <option value="" disabled>
          Select an activity
        </option>
        {sortedActivities.map((countryId) => (
          <option key={countryId.name} value={countryId.name}>
            {countryId.name}
          </option>
        ))}
      </select>

      <button onClick={resetBtton}>Reset</button>
    </div>
  );
}
