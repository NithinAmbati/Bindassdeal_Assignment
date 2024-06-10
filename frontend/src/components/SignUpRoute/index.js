import React, { Component } from "react";
import "./index.css";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    email: "",
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitBtn = async (event) => {
    event.preventDefault();
    const { username, password, email } = this.state;
    const userDetails = { username, password, email };
    console.log(userDetails);
    const url = "https://mini-project-nine-rho.vercel.app/register";
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
        alert("Registration Successful");
        this.setState({ username: "", password: "", email: "" });
      } else {
        const errorData = await response.json();
        alert(`Registration Failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  render() {
    const { username, password, email } = this.state;

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
            type="email"
            id="email"
            value={email}
            placeholder="EMAIL"
            onChange={this.onChangeEmail}
            className="email"
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="PASSWORD"
            onChange={this.onChangePassword}
            className="password"
          />
          <button className="btn btn-dark mt-3 mb-3 w-50" type="submit">
            Sign Up
          </button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
