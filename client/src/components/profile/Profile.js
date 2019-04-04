import React, { Component } from "react";
import "./Profile.css";
import Header from "../Header";
import NavBar from "../NavBar";

// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Image from "react-bootstrap/Image";

import ProfileCard from "./ProfileCard";
import CardD from "../CardD";
import CardA from "../CardA";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Footer";
import TagsInput from "react-tagsinput";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import _ from "lodash";
import axios from "axios";

class Profile extends Component {
  state = {
    top4matches: []
  };

  componentDidMount() {
    axios({
      method: "GET",
      url:
        (process.env.REACT_APP_API_URL || "http://localhost:5000") +
        `/match/${this.props.userInSession.role}/4`,
      withCredentials: true
    })
      .then(top =>
        this.setState({
          top4matches: top.data
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    let theUser = this.props.userInSession;

    return (
      <div>
        <Header
          url={this.props.match.url}
          loggedIn={this.props.userInSession}
          setUser={this.props.setUser}
        />
        <NavBar />

        {/* Banner */}
        <div className="profileBanner">
          <img
            src={`https://res.cloudinary.com/dfksfwvex/image/upload/c_thumb,h_400,w_1500,c_scale/v1/${
              theUser.public_id_ti
            }.jpg`}
            alt="public profile"
          />
        </div>

        {/* Profile Box */}
        <div className="profileBoxPosition">
          <ProfileCard {...theUser} />
        </div>

        {/* Profile NavBar */}

        {/* <div className="profileNavBar">
          <Navbar expand="lg">
            <Nav>
              <Nav.Link>Your Showroom</Nav.Link>
              <Nav.Link>Watchlist</Nav.Link>
              <Nav.Link>Projects</Nav.Link>
              <Nav.Link>Reviews</Nav.Link>
            </Nav>
          </Navbar>
        </div> */}

        {/* Profile Matches */}

        <div className="profileMatchesHeadline">
          <h1>Matches by your needs</h1>

          {theUser.role === "designer" ? (
            <Link to="/artisans">
              <button className="profileMatchesButton">SEE ALL</button>
            </Link>
          ) : (
            <Link to="/designers">

              <button className="profileMatchesButton">SEE ALL</button>
            </Link>
          )}
        </div>

        <div>
          <TagsInput
            className="suggestedTags viewTagsOnly"
            id="profession"
            value={_.sampleSize(
              [...theUser.tagsCategory, ...theUser.tagsMaterial],
              15
            )}
          />
        </div>

        {/* theUser */}
        <Container className="homeDesignersContainer" fluid={true}>
          <Row className="homeDesignersRow">
            {theUser.role === "designer"
              ? this.state.top4matches.map((e, idx) => {
                  return (
                    <Col key={idx} className="homeDesignersColumn mx-auto">
                      <CardA
                        key={idx}
                        theUser={e}
                        class="cardHeadlineArtisan"
                      />
                    </Col>
                  );
                })
              : this.state.top4matches.map((e, idx) => {
                  return (
                    <Col key={idx} className="homeDesignersColumn mx-auto">
                      <CardD
                        key={idx}
                        theUser={e}
                        class="cardHeadlineArtisan"
                      />
                    </Col>
                  );
                })}
          </Row>
        </Container>
        <div className="homeDivider" />

        {/* Profile Edits */}
        <Container fluid={true} className="profileEditContainer">
          <Row>
            <Col xs={8}>
              <div>
                <div className="profileEditHeadline">
                  <h1>Your profession</h1>
                  <Link to="/editprofile">
                    <button>
                      <img
                        className="profileEditIcon"
                        src="/images/DmC_penicon.png"
                        alt="pen icon"
                        width="15em"
                      />
                      Edit
                    </button>
                  </Link>
                </div>
                <TagsInput
                  className="suggestedTags viewTagsOnly"
                  id="profession"
                  value={theUser.tagsCategory}
                />
              </div>
              <div className="homeDivider" />
              <div>
                <div className="profileEditHeadline">
                  <h1>Your needs</h1>
                  <Link to="/editprofile">
                    <button>
                      <img
                        className="profileEditIcon"
                        src="/images/DmC_penicon.png"
                        alt="pen icon"
                        width="15em"
                      />
                      Edit
                    </button>
                  </Link>
                </div>
                <TagsInput
                  className="suggestedTags viewTagsOnly"
                  id="needs"
                  value={theUser.tagsMaterial}
                />
              </div>
              <div className="homeDivider" />
              <div>
                <div className="profileEditHeadline">
                  <h1>Destination</h1>
                  <Link to="/editprofile">
                    <button>
                      <img
                        className="profileEditIcon"
                        src="/images/DmC_penicon.png"
                        alt="pen icon"
                        width="15em"
                      />
                      Edit
                    </button>
                  </Link>
                </div>
                <TagsInput
                  className="suggestedTags viewTagsOnly"
                  id="destination"
                  value={theUser.tagsDestination}
                />
              </div>
              <div className="homeDivider" />
              <div>
                <div className="profileEditHeadline">
                  <h1>Production capacity</h1>
                  <Link to="/editprofile">
                    <button>
                      <img
                        className="profileEditIcon"
                        src="/images/DmC_penicon.png"
                        alt="pen icon"
                        width="15em"
                      />
                      Edit
                    </button>
                  </Link>
                </div>
                <p className="profileEditText">{theUser.capacity}</p>
              </div>
              <div className="homeDivider" />
              <div>
                <div className="profileEditHeadline">
                  <h1>Looking for</h1>
                  <Link to="/editprofile">
                    <button>
                      <img
                        className="profileEditIcon"
                        src="/images/DmC_penicon.png"
                        alt="pen icon"
                        width="15em"
                      />
                      Edit
                    </button>
                  </Link>
                </div>
                <p className="profileEditText">{theUser.lookingfor}</p>
              </div>

              {/* GALLERY SECTION  */}

              {/* <div className="homeDivider" />
              <div>
                <div className="profileEditHeadline">
                  <h1>Gallery</h1>
                  <button>
                    <img
                      className="profileEditIcon"
                      src="/images/DmC_penicon.png"
                      alt="pen icon"
                      width="15em"
                    />
                    Edit
                  </button>
                </div>
                {theUser.gallery.map((e, idx) => (
                  <img src={e} alt={idx} />
                ))}
              </div> */}
            </Col>
            <Col />
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Profile);
