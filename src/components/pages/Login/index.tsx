// CLASSIC LOGIN PAGE WITH FEATHERS AUTHENTICATION

import React, { useState } from "react";
import { AuthData } from "@/auth/AuthWrapper";

import "../commonCss/LoginRegister.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, user } = AuthData();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return !user?.isAuthenticated ? (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="on"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-btn">
            Log in
          </button>
        </div>
      </form>

      <div className="login-register">
        <p>
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  ) : (
    <div className="login">
      <h1>You are already logged in as {user.email}</h1>
    </div>
  );
};

export default Login;
