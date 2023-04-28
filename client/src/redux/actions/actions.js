import {
  ADD_ACTIVITY,
  ADD_LOCATION,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_COUNTRY_BY_NAME, 
  CLEAR_COUNTRY,
  GET_ACTIVITIES,
  UPDATE_COUNTRY_DISPLAY,  
} from "./types";
import axios from "axios";

//import style from "../../views/Form/Form.module.css";

export function addLocation(path) {
  return {
    type: ADD_LOCATION,
    payload: path,
  };
}

export function getCountries() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/countries/all`);
      return dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      throw new Error("Data countries not found", error.message);
    }
  };
}

export function getCountryDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: data,
      });
    } catch (error) {
      throw new Error("Data country not found", error.message);
    }
  };
}

export function clearCountry() {
  return {
    type: CLEAR_COUNTRY,
  };
}

export function addActivities(activity) {
  return async function (dispatch, getState) {
    try {
      const state = getState();
      const activitiesLength = state.activities.length;
      const { data } = await axios.post(`http://localhost:3001/activities`, {
        ...activity,
        id: activitiesLength + 1,
      });
      dispatch({
        type: ADD_ACTIVITY,
        payload: data,
      });
     
      alert("the activity was created")

      
      
    } catch (error) {
      alert(error)
      throw new Error("activity not charged", error);
      
    }
  };
}
export function getActivities() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/activities/all`);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      throw new Error("Data countries not found", error.message);
    }
  };
}

export function getCountryByName(countryName) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`http://localhost:3001/countries/name?name=${countryName}`);
      return dispatch({
        type: GET_COUNTRY_BY_NAME,
        payload: data,
      });
    } catch (error) {
      throw new Error("Data country not found", error.message);
    }
  };
}
export function updateCountryDisplay(countriesDisplayed) {
  return {
    type: UPDATE_COUNTRY_DISPLAY,
    payload: countriesDisplayed,

  };
}

export const alphabeticOrder = (order) => {
  return (dispatch, getState) => {
    const countries = getState().countryDisplayed;

    const newOrder = countries.sort((a, b) => {
      if (a.id > b.id) {
        return order === "A-Z" ? 1 : -1;
      }
      if (a.id < b.id) {
        return order === "Z-A" ? 1 : -1;
      }
      return 0;
    });
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: newOrder });
  };
};

export const populationOrder = (order) => {
  return (dispatch, getState) => {
    const countries = getState().countryDisplayed;

    const newOrder = countries.sort((a, b) => {
      if (a.population > b.population) {
        return order === "Descendente" ? 1 : -1;
      }
      if (a.population < b.population) {
        return order === "Ascendente" ? 1 : -1;
      }
      return 0;   
    });
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: newOrder });
  };
};

export const continentOrder = (order) => {
  return (dispatch, getState) => {    
      const countries = getState().countries;
      const filteredCountries = countries.filter((country) => country.continent === order);
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: filteredCountries });
  };
};

export const activityOrder = (name) => {
  return (dispatch, getState) => {
    const countries = getState().countries;
    const filteredCountries = countries.filter(country => {
      return country.Activities.some(Activity => Activity.name.toLowerCase().includes(name.toLowerCase()))
    });
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: filteredCountries });
  };
};