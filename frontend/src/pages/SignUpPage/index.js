import React, { Component } from "react";
import { useLocalStorage } from "../../services/localStorage";
import { encrypt } from "n-krypta";
import { Navigate } from "react-router-dom";
import "./index.css";
import { isAuthenticated } from "../../middlewares/authentication";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    returnToLogin: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitBtn = async (event) => {
    event.preventDefault();
    const { setItem } = useLocalStorage(); // LocalStorage functions are imported from useLocalStorage
    const secretKey = "Bindassdeal";
    const { username, password } = this.state;
    const encryptedPassword = encrypt(password, secretKey); //Passwrd is encrypted
    setItem(username, encryptedPassword); // Storing the username, password in LocalsStorage
    this.setState({ returnToLogin: true }); // Set returnToLogin to true on successful signup and redirect to login page
  };

  render() {
    const { username, password } = this.state;

    // Redirect to login page if signup is successful or user is already logged in
    if (this.state.returnToLogin || isAuthenticated()) {
      return <Navigate to="/login" />;
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
