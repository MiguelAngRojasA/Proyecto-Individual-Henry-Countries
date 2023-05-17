import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  alphabeticOrder,
  populationOrder,
  continentOrder,
  getCountries,
  activityOrder,
  resetfilters,
} from "../../redux/actions/actions";
import style from "./Filter.module.css"

export default function Filter() {
  const { activities } = useSelector((state) => state);
  const { filters } = useSelector((state) => state);
  const { alphabetic, population, continent, activity } = filters;

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
    dispatch(continentOrder(value));
  }

  function handleActivitytOrder(e) {
    e.preventDefault();
    const { value } = e.target;     
    dispatch(activityOrder(value));
  }

  function resetBtton() {
    dispatch(getCountries());
    dispatch (resetfilters());
  }
  return (    
    <div className={style.filterContainer}>
      <label> Filter by name: </label>
      <select
        id="alphabetic-selector"
        onChange={handleAlphabeticOrder}
        name="Alphabetic"
        value={alphabetic}
      >
        <option value="DEFAULT" disabled={true}>
          Select Order
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <label> Filter by population: </label>
      <select
        id="population-selector"
        onChange={handlePopulationOrder}
        name="Population"
        value={population}
      >
        <option value="DEFAULT" disabled={true}>
          Select Order
        </option>
        <option value="Ascendente">Ascendente</option>
        <option value="Descendente">Descendente</option>
      </select>
      <label> Filter by continent: </label>
      <select
        id="continent-selector"
        onChange={handleContinentOrder}
        name="Continent"
        value={continent}
      >
        <option value="DEFAULT" disabled={true}>
          Select continent
        </option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Oceania">Oceania</option>
      </select>
      <label> Filter by activity: </label>
      <select
        id="activity-selector"
        name="activity"
        onChange={handleActivitytOrder}
        value={activity}
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
      <label> Clear all filters: </label>
      <button onClick={resetBtton}>Reset</button>
    </div>
  );
}
