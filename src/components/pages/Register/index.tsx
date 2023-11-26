// CLASSIC LOGIN PAGE WITH FEATHERS AUTHENTICATION

import React, { useState } from "react";
import { AuthData } from "@/auth/AuthWrapper";
// import { useHistory } from 'react-router-dom';

import "../commonCss/LoginRegister.css";
import feathersClient from "@/configs/feathers";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  const { user } = AuthData();

  const register = async (
    email: string,
    password: string,
    checkPassword: string
  ) => {
    if (password !== checkPassword) {
      toast.error("Passwords don't match", {
        icon: "🔑",
      });
      return;
    }
    const registerData = await feathersClient.service("users").create({
      email,
      password,
    });
    console.log(registerData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, password, checkPassword);
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
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            type="password"
            id="checkPassword"
            name="checkPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-btn">
            Register
          </button>
        </div>
      </form>
      <div className="login-register">
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  ) : (
    <div className="login">
      <h1>You are already logged in as {user.email}</h1>
    </div>
  );
};

export default Register;
