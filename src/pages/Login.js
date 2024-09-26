import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const Login = () => {
    const data = { Username: Username, Password: Password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={Login}>Login</button>
    </div>
  );
}

export default Login;
