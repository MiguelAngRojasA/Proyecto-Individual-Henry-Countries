import {
  ADD_ACTIVITY,
  ADD_LOCATION,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  CLEAR_COUNTRY,
  GET_COUNTRY_BY_NAME,
  UPDATE_COUNTRY_DISPLAY,
  GET_ACTIVITIES,  
} from "./actions/types";

const initialState = {
  location: [],
  countries: [],
  activities: [],
  country: [],
  countryDisplayed: [],
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
          countryDisplayed: [...payload],
        };
      }
      break;
      case GET_ACTIVITIES:
        if (Array.isArray(payload)) {
          return {
            ...state,           
        activities: [...payload],
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
    case ADD_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, payload],
      };
    case GET_COUNTRY_BY_NAME:
      if (Array.isArray(payload)) {
        return {
          ...state,
          countryDisplayed: [...payload],
        };
      }
      break;

    case UPDATE_COUNTRY_DISPLAY:
      return {
        ...state,
        countryDisplayed: [...payload],
      };    

    default:
      return state;
  }
}
