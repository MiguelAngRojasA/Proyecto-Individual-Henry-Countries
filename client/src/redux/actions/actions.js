import {
  ADD_ACTIVITY,
  ADD_LOCATION,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_COUNTRY_BY_NAME, 
  CLEAR_COUNTRY,
  GET_ACTIVITIES,
  UPDATE_COUNTRY_DISPLAY,
  PREV_PAGE, 
  NEXT_PAGE,
  HANDLE_NUMBER,
  FAILURE,
  RESET_PAGE,
  SET_FILTER_STATE_POPU,
  SET_FILTER_STATE_ALPHA,
  SET_FILTER_STATE_ACTI,
  SET_FILTER_STATE_CONTINENT,

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
      const { data } = await axios.get(`/countries/all`);
      return dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.message)
      throw new Error("Data countries not found", error.message);
    }
  };
}

export function getCountryDetail(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`/countries/${id}`);
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: data,
      });
    } catch (error) {
      alert(error.response.data.message)
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
      const { data } = await axios.post(`/activities`, {
        ...activity,
        id: activitiesLength + 1,
      });
      dispatch({
        type: ADD_ACTIVITY,
        payload: data,
      });
     
      alert("the activity was created")

      
      
    } catch (error) {
      alert(error.response.data.message)
      throw new Error("activity not charged", error);
      
    }
  };
}

export function editActivities(activity) {
  return async function () {
    try {     
      const activityid= activity.id     
            const { data } = await axios.put(`/activities/${activityid}`, {
        ...activity,        
      });      
     
      alert("the activity was edited")      
      
    } catch (error) {
      alert(error.response.data.message)
      throw new Error("activity not charged", error);
      
    }
  };
}

export function deleteActivity(id) {
  return async function () {
    try {   
         const { data } = await axios.delete(`/activities/${id}`              
      );      
     
      alert("the activity was eliminated")      
      
    } catch (error) {
      alert(error.response.data.message)
      throw new Error("id not charged", error);
      
    }
  };
}
export function getActivities() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`/activities/all`);
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      alert(error.message)
      throw new Error("Data countries not found", error.message);
      
    }
  };
}

export function getCountryByName(countryName) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`/countries/name?name=${countryName}`);
      return dispatch({
        type: GET_COUNTRY_BY_NAME,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: error.response.data.message,
      });
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
      const compareResult = a.name.localeCompare(b.name, 'en', {sensitivity: 'base'});      
      if (compareResult > 0) {       
        return order === "A-Z" ? 1 : -1;
       
      }
      if (compareResult < 0) {
        return order === "Z-A" ? 1 : -1;
      }
      
      return 0;
    });
    
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: newOrder });
    dispatch({ type: SET_FILTER_STATE_ALPHA, payload: { alphabetic: order } });
  };
};

export const populationOrder = (order) => {
  return (dispatch, getState) => {
    const countries = getState().countryDisplayed;

    const newOrder = countries.sort((a, b) => {
      if (a.population > b.population) {
        return order === "Ascendente" ? 1 : -1;
      }
      if (a.population < b.population) {
        return order === "Descendente" ? 1 : -1; 
      }
      return 0;   
    });
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: newOrder });
    dispatch({ type: SET_FILTER_STATE_POPU, payload: { population: order } });
  };
};

export const continentOrder = (continent) => {
  return (dispatch, getState) => {    
    let filteredCountries = getState().countries;
    let { filters } = getState();
    let {activity}=filters;
    
    if (continent) {
      filteredCountries = filteredCountries.filter(country => country.continent === continent);
    }

    if (activity) {
      filteredCountries = filteredCountries.filter(country => {
        return country.Activities.some(Activity => Activity.name.toLowerCase().includes(activity.toLowerCase()))
      });
    }
    dispatch({ type: SET_FILTER_STATE_CONTINENT, payload: { continent: continent} });
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: filteredCountries });
  };
};

export const activityOrder = (name) => {
  return (dispatch, getState) => {
    const { filters } = getState();
    let {continent}=filters;
    let filteredCountries = [];

    if (name) {
      filteredCountries = getState().countries.filter(country => {
        return country.Activities.some(Activity => Activity.name.toLowerCase().includes(name.toLowerCase()))
      });
    }

    if (continent!=="DEFAULT") {
      filteredCountries = filteredCountries.filter(country => country.continent === continent);
    }
    dispatch({ type: SET_FILTER_STATE_ACTI, payload: { activity: name} });
    dispatch({ type: UPDATE_COUNTRY_DISPLAY, payload: filteredCountries });
  };
};

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}
export function handleNumber(num) {
  return {
    type: HANDLE_NUMBER,
    payload: num,
  };
}

export const resetPage = () => ({
  type: RESET_PAGE,
});

export const applyFilters = (filters) => {
  return (dispatch) => {
    const { alphabetic, population, continent, activity } = filters;

    if (alphabetic !== "DEFAULT") {
      dispatch(alphabeticOrder(alphabetic));    
    }

    if (population !== "DEFAULT") {
      dispatch(populationOrder(population));
    }

    if (continent !== "DEFAULT") {
      dispatch(continentOrder(continent));
    }

    if (activity !== "") {
      dispatch(activityOrder(activity));
    }    
  };
};

export const resetfilters = () => {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_STATE_POPU, payload: { population: "DEFAULT" } });
    dispatch({ type: SET_FILTER_STATE_ALPHA, payload: { alphabetic: "DEFAULT" } });
    dispatch({ type: SET_FILTER_STATE_CONTINENT, payload: { continent: "DEFAULT" } });
    dispatch({ type: SET_FILTER_STATE_ACTI, payload: { activity: "" } });
  }
};