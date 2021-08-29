//this file is responsible for our redux setup, the data setup.

//import css file
import "materialize-css/dist/css/materialize.min.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//ReactDOM takes 2 arguments. First is the root component instance created by JS tags, the second is a reference to an existing DOM node inside of our HTML
// the second argument is inside the index.html
ReactDOM.render(
  // 1. Still showing the app component, but we've also created a reduc store at the top level of our application
  // and hooked it up to react side of our application by placing the provider tag
  // 2. The provider tag is a react component that knows how to read changes from our Reduc store.
  // Any time the Reduc store gets some new state produced inside of it,
  // the provider will inform everything the APP renders that some new state is available
  // and it will update all ofthose components with the new state.
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
