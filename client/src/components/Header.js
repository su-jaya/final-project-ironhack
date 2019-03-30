import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import "./Header.css";

class Header extends Component {
  render() {
    let authButtonStatus;
    // console.log(this.props.loggedIn);
    if (this.props.loggedIn) {
      authButtonStatus = "loggedIn";
    } else if (this.props.button === "cancel") {
      authButtonStatus = "cancel";
    } else if (this.props.button === "none") {
      authButtonStatus = "none";
    } else {
      authButtonStatus = "signup";
    }

    return (
      <div className="headerContainer">
        <div className="headerEmptyDiv" />
        <div>
          <Link to="/">
            <img
              src="./images/dmc_logo.png"
              alt="design-meets-craft logo"
              height="140em"
            />
          </Link>
        </div>
        <AuthButtons authButtonStatus={authButtonStatus} />
      </div>
    );
  }
}

export default Header;
