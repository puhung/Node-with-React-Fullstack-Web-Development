// the app.js file is responsible for that initial view layer setup

import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//1. The BrowserRouter can be thought of as the brains of react router, which tell react router how to behave
// and it is the thing that looks at the current URL and then changes the set of components that are visible on the screen at any given time.
//The BrowserRouter can only have one child inside it. e.g. div
// 2. The Route component that is used to set up a rule between a certain route that the user might visit inside of an application
// and a set of components that will be visible on the screen

//  We wuld use the connect helper and actions object to wire them all up to the App component
import { connect } from "react-redux";
//  react-redux makes react works nicely with the redux
//      The connect function gives certain components, in this case 'App', the ability to call action creators
import * as actions from "../actions";
//  Import all the different action creators from our action index.js file
//      '* as actions' means take all the different action creators we've defined and just assign them to the object actions right here.

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

// the path="/" means the root route. 'exact' means the uri must exactly matches the path="/"
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  // The instant this component has been mounted or rendered onto the screen
  //      go in attempt to fetch the current user or figure out whether the current user is actually signed in.
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//  The first arguments is reserved for the map state to props arguments or the map state to function
//      The second argument we pass in all the different action creaters that we want to wire up, then they are assigned to the app component as props
//          So, Now inside the App component, we can call our action creator by referencing this.props.actionCreatorName
export default connect(null, actions)(App);
