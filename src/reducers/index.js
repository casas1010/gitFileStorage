import { combineReducers } from "redux";
import auth from "./authReducer";
import items from "./itemReducer";



export default combineReducers({
  auth,
  items,
});

