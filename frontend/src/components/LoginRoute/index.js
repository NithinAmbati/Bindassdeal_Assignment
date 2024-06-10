import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    isLoggedIn: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  loginSuccess = () => {
    this.setState({ isLoggedIn: true });
  };

  loginFailure = () => {
    alert("Incorrect User Details");
  };

  submitBtn = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://mini-project-nine-rho.vercel.app/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const { jwtToken } = await response.json();
        Cookie.set("jwt_token", jwtToken, { expires: 1 });
        this.loginSuccess();
      } else {
        this.loginFailure();
      }
    } catch (error) {
      console.error("Error during login:", error);
      this.loginFailure();
    }
  };

  render() {
    const { username, password, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-page">
        <form className="login-container" onSubmit={this.submitBtn}>
          <input
            type="text"
            id="username"
            value={username}
            placeholder="USERNAME"
            onChange={this.onChangeUsername}
            className="username"
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="PASSWORD"
            onChange={this.onChangePassword}
            className="password"
          />
          <button className="btn btn-dark mt-3 mb-3 w-25" type="submit">
            Login
          </button>
          <p>
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
