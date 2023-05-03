import {
  ADD_ACTIVITY,
  ADD_LOCATION,
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  CLEAR_COUNTRY,
  GET_COUNTRY_BY_NAME,
  UPDATE_COUNTRY_DISPLAY,
  GET_ACTIVITIES,
  PREV_PAGE, 
  NEXT_PAGE,
  HANDLE_NUMBER, 
  FAILURE  
} from "./actions/types";

const initialState = {
  location: [],
  countries: [], 
  activities: [],
  country: [], // used for country detail 
  countryDisplayed: [],
  numPage: 1,
  error: {
    countryNotFound: "",
  }
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
          error: {
            countryNotFound: "",            
          },
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
          error: {
            countryNotFound: "",            
          },
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
          error: {
            countryNotFound: "",            
          },
        };
      }
      break;

    case UPDATE_COUNTRY_DISPLAY:
      
      return {
        ...state,
        countryDisplayed: [...payload],
      }; 
      
      case HANDLE_NUMBER:
      return {
        ...state,
        numPage: payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1,
      };
      
      case FAILURE:
      
      return {
        ...state,
        error: {
          ...state.error,
          countryNotFound: payload,
        },
      }

    default:
      return state;
  }
}
