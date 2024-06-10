import React, { useContext, useState } from "react";
import axios from "axios";
import "../style/AuthForm.css";

import backendUrl from "../utils/baseUrl";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import authContext from "../store/auth-context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let response = await axios.post(backendUrl + "/api/users/login", {
        username,
        password,
      });
      if (response.status === 200) {
        ctx.login(response.data.token);
        navigate("/");
      }

      setLoading(false);

      // if(response.data.token){
      //   ctx.login(response.data.token)
      // }
      // Redirect to folders view
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      {loading && <Loader />}
      <div className="auth-form">
        <h2>Login</h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button onClick={handleSubmit}>Login</button>
        </div>
        <br />
        <div className="footer-auth">
          <p>Don't have account </p> <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
