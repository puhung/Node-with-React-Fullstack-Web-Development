import { FETCH_USER } from "../actions/types";

//export reducer function
// records whether or not the user is logged in
export default function foo(state = null, action) {
  console.log(action);
  switch (action.type) {
    // when we hear back from our request
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
    // When the app lication first put up, immediately return null
    //    this means, by default, we have no clue as to whether or not the user is actually logged in.
  }
}
