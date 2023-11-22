// CLASSIC LOGIN PAGE WITH FEATHERS AUTHENTICATION

import React, { useState } from "react";
import { AuthData } from "@/auth/AuthWrapper";
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    login,
    user,
    user: { isAuthenticated },
  } = AuthData();
  //   const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
    // history.push('/');
  };

  return !isAuthenticated ? (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  ) : (
    <div className="login">
      <h1>You are already logged in as {user.email}</h1>
    </div>
  );
};

export default Login;
