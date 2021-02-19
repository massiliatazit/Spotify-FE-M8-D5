import React, { Component } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "../styles/Register.css";
import { FaSpotify, FaSearch, FaHome, FaBookOpen } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (user) =>
      dispatch({
        type: "LOAD_USER",
        payload: user,
      }),
  };
};

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInfo: {
        username: "",
        password: "",
      },
    };
  }
  updateForm = (e) => {
    let id = e.currentTarget.id;
    let formInfo = this.state.formInfo;
    formInfo[id] = e.currentTarget.value;
    this.setState({ formInfo });
  };
  loginHandler = async (e) => {
    e.preventDefault()
    let response = await fetch("https://spotifybe.herokuapp.com/users/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this.state.formInfo),
      headers: new Headers({
        "Access-Control-Allow-Origin": `https://spotifyfe.herokuapp.com`,
        "content-type": "application/json",
      }),
    });
    if (response.ok) {
      const user = await response.json();
      console.log(user);
      this.props.loadUser(user);
      this.props.history.push("/home");
    } else {
      alert("Error");
    }
  };
  render() {
    return (
      <Container id="register">
        <div id="logo">
          <FaSpotify />
          <p>Spotify</p>
        </div>
        <button id="googleRegister">CONTINUE WITH GOOGLE</button>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <hr style={{ marginLeft: "0px", width: "40%", marginTop: "12px" }} />
          <p style={{ margin: "0px" }}> OR</p>
          <hr style={{ marginRight: "0px", width: "40%", marginTop: "12px" }} />
        </div>

        <div id="blocks">
          <p>Email address or username</p>
          <input
            type="text"
            id="username"
            onChange={this.updateForm}
            placeholder="Email address or username"
          />
        </div>

        <div id="blocks">
          <p>Password</p>
          <input
            type="password"
            id="password"
            onChange={this.updateForm}
            placeholder="Password"
          />
        </div>

        <p className="forgot">Forgot your password?</p>
        <div id="loginSection">
          <div className="checkBox">
            <Form.Check aria-label="option 1" />
            Remember me
          </div>

          <button id="registerButton" onClick={this.loginHandler}>
            LOG IN
          </button>
        </div>
        <hr />
        <p>Doesn't have an account?</p>
        <button id="signup" onClick={() => this.props.history.push("/")}>
          SIGN UP FOR SPOTIFY
        </button>
      </Container>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
