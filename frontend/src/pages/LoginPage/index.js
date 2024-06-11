import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { encrypt } from "n-krypta";
import "./index.css";
import { useLocalStorage } from "../../services/localStorage";
import { isAuthenticated, login } from "../../middlewares/authentication";

class Login extends Component {
  state = {
    username: "",
    password: "",
    redirectToHome: false, // State to handle redirection
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  loginSuccess = () => {
    login();
    this.setState({ redirectToHome: true }); // Set redirectToHome to true on successful login
  };

  loginFailure = () => {
    this.setState({ username: "", password: "" });
    alert("Incorrect User Details");
  };

  submitBtn = async (event) => {
    event.preventDefault();
    const { getItem } = useLocalStorage(); //importing localStorage functions from useLocalStorage
    const secretKey = "Bindassdeal";
    const { username, password } = this.state;
    const encryptedPassword = encrypt(password, secretKey); //Encrypting password
    const findUser = getItem(username);
    // Verifying valid user or Not
    if (findUser === null || encryptedPassword !== JSON.parse(findUser)) {
      this.loginFailure();
    } else {
      this.loginSuccess();
    }
  };

  render() {
    const { username, password, redirectToHome } = this.state;

    // Redirect to home page if login is successful
    if (redirectToHome || isAuthenticated()) {
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
