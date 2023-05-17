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
  RESET_PAGE, 
  FAILURE,
  SET_FILTER_STATE_ALPHA,
  SET_FILTER_STATE_POPU,
  SET_FILTER_STATE_ACTI,
  SET_FILTER_STATE_CONTINENT,

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
  },
  filters:{
    alphabetic:"DEFAULT",
    population:"DEFAULT",
    continent:"DEFAULT",
    activity:""

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

      case RESET_PAGE:
  return {
    ...state,
    numPage: 1,
  };
      
      case FAILURE:
      
      return {
        ...state,
        error: {
          ...state.error,
          countryNotFound: payload,
        },
      }

      case SET_FILTER_STATE_ALPHA:
      return {
        ...state,
        filters: {
          ...state.filters,
          alphabetic: payload.alphabetic,
        }
      };
      
      case SET_FILTER_STATE_POPU:
        return {
          ...state,
          filters: {
            ...state.filters,
            population: payload.population,
          }
        };

        case SET_FILTER_STATE_CONTINENT:
          return {
            ...state,
            filters: {
              ...state.filters,
              continent: payload.continent,
            }
          };

          case SET_FILTER_STATE_ACTI:
            return {
              ...state,
              filters: {
                ...state.filters,
                activity: payload.activity,
              }
            };

    default:
      return state;
  }
}
