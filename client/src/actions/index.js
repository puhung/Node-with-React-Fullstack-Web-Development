import axios from "axios"; //USE Axios to make Ajax requests
import { FETCH_USER } from "./types";

//1.This Fetch user Action Creater is used to make a request to back-end API and
//      communicate to the auth reducer whether or not the user is currently signed in.
// 2.When the action creators is called, it returns a function.
//      Redux Thunk will see that we return a function and it will automatically called it with dispatch function
//          We then make our request and wait unitl we get a response back from our API
//              At the time we get our response, we will actually dispatch our action
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  //Dispatch an action with type Fetch user and that contains a payload of the user model
  //  and the authReducer will automatically pick it up.
  //    Anything inside of our application that depends on the user model will be automatically updated.
  dispatch({ type: FETCH_USER, payload: res.data });
};
// the refactor of this function is in course 89

//Send the "token" got from Stripe API to backend API
//  To communicate to the back-end API, we are always going to make the request inside a action creator
export const handleToken = (token) => async (dispatch) => {
  // make a post request to the backend server, since we want to send some information along with the request
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};
