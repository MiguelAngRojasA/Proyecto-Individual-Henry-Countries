import {   
    ADD_COUNTRIES,    
    ADD_LOCATION,
    GET_COUNTRIES,
    GET_COUNTRY_DETAIL, 
    CLEAR_COUNTRY,   
  } from "./actions/types";

const initialState = {
  location: [],
  countries: [],
  activities: [],
  country:[],
};

export default function rootReducer(state = initialState, { type, payload }) {
                                                     //destructuring of an action
  switch (type) {
    case ADD_LOCATION:
      return {
        ...state,
        location: [...state.location, payload],
      };
      case GET_COUNTRIES:
      if (Array.isArray(payload)) {
        
        return {
          ...state,         
          countries: [...payload],
        };
      } 
      break;
      case GET_COUNTRY_DETAIL:        
        if (Array.isArray(payload)) {
            
          return {
            ...state,         
            country: [...payload],
          };
        } 
        break;
        case CLEAR_COUNTRY:
      return {
        ...state,
        country: [],
      };
      default:
        return state;
  }
}
