import React, { useState, useContext } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const Login = () => {
    const data = { Username: Username, Password: Password };
    axios.post("https://greenpostapp-7e2958a55f01.herokuapp.com/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          Username: response.data.Username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input
        type="text"
        className="login-input"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="login-button" onClick={Login}>
        Login
      </button>
    </div>
  );
}

export default Login;
