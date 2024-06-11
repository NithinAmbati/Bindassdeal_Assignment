import React, { useState } from "react";
import { useLocalStorage } from "../../services/localStorage";
import { encrypt } from "n-krypta";
import { Navigate } from "react-router-dom";
import "./index.css";
import { isAuthenticated } from "../../middlewares/authentication";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [returnToLogin, setReturnToLogin] = useState(false);
  const { setItem } = useLocalStorage(); // LocalStorage functions are imported from useLocalStorage

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitBtn = async (event) => {
    event.preventDefault();
    const secretKey = "Bindassdeal";
    const encryptedPassword = encrypt(password, secretKey); // Password is encrypted
    setItem(username, encryptedPassword); // Storing the username, password in LocalStorage
    setReturnToLogin(true); // Set returnToLogin to true on successful signup and redirect to login page
  };

  // Redirect to login page if signup is successful or user is already logged in
  if (returnToLogin || isAuthenticated()) {
    return <Navigate to="/login" />;
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
        <button className="btn btn-dark mt-3 mb-3 w-50" type="submit">
          Sign Up
        </button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
