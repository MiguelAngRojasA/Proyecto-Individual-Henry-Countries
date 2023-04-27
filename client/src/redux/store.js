import { createStore, applyMiddleware} from "redux";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";



const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
//configuration to create an instance of a "store" in Redux, which is a container for the state of the app
//composeWithDevTools enables goggle chrome extension to view status and actions
//thunk help us with Async actions