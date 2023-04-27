import { ADD_COUNTRIES, ADD_LOCATION, GET_COUNTRIES,GET_COUNTRY_DETAIL,CLEAR_COUNTRY } from "./types";
import axios from "axios";

export function addLocation(path) {
    return {
      type: ADD_LOCATION,
      payload: path,
    };
  }

  export function getCountries() {
    return async function (dispatch) {
        try {
          const {data} = await axios.get(
            `http://localhost:3001/countries/all`,
            
          );
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
          const {data} = await axios.get(
            `http://localhost:3001/countries/${id}`,
            
          );
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
      type: CLEAR_COUNTRY
    };
  }