import React, { useState } from "react";
import axios from "axios";
import "../style/AuthForm.css";
import backendUrl from "../utils/baseUrl";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(backendUrl + "/api/users/signup", {
        username,
        password,
      });
      setLoading(false);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="wrapper">
      {loading && <Loader />}
      <div className="auth-form">
        <h2>Sign Up</h2>
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
          <button onClick={handleSubmit}>Sign Up</button>
        </div>
        <br />
        <div className="footer-auth">
          <p>Already have an account </p> <Link to="/login">Login in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
