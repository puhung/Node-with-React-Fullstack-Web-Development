// This allows us to simply import the reducers directory
// using redux library to combine the authReducer file with thecombined reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
});
