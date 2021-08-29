import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"; // This react router that works inside of the browser
import Payments from "./Payments";

// Making this a class based component because we can place a helper function in here
// which will be responsible for deciding what to render inside header components
// This allows us to easily code inside of this class based component.
class Header extends Component {
  //switch the content based on the this.state.auth property, which indicates whether the user is logged in or not.
  renderContent() {
    switch (this.props.auth) {
      case null:
        return; //when still deciding whether the user is logged in, we don't want to show anything
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  // The webpage is rendered by react router
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          {/* we want the page that the user goes to when they click on this link to change */}
          {/* depending on whether or not they are currently signed in */}
          {/* If this.props.auth is true or contains an object, then we want to make sure that this is a route "to" the service route */}
          {/* otherwise the user should be redirect to the root route */}
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>

          <ul className="right">
            {/* we need curly braces since we are referencing some JS inside of some JSX(React) */}
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

//auth property of state out of redux store
//which is from the index.js of reducers directory
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
