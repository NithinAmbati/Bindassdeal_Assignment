import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { encrypt } from "n-krypta";
import "./index.css";
import { useLocalStorage } from "../../services/localStorage";
import { isAuthenticated, login } from "../../middlewares/authentication";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);
  const { getItem } = useLocalStorage(); // Importing localStorage functions from useLocalStorage

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const loginSuccess = () => {
    login();
    setRedirectToHome(true); // Set redirectToHome to true on successful login
  };

  const loginFailure = () => {
    setUsername("");
    setPassword("");
    alert("Incorrect User Details");
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const secretKey = "Bindassdeal";
    const encryptedPassword = encrypt(password, secretKey); // Encrypting password
    const findUser = getItem(username);
    // Verifying valid user or Not
    if (findUser === null || encryptedPassword !== JSON.parse(findUser)) {
      loginFailure();
    } else {
      loginSuccess();
    }
  };

  // Redirect to home page if login is successful
  if (redirectToHome || isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={submitBtn}>
        <input
          type="text"
          id="username"
          value={username}
          placeholder="USERNAME"
          onChange={onChangeUsername}
          className="username"
        />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="PASSWORD"
          onChange={onChangePassword}
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
};

export default Login;
