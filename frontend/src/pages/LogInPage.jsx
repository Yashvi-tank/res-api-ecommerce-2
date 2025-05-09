import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: call your login API here…
    navigate("/"); // on success
  }

  return (
    <div className="login-page">
      <div className="login-left" />
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Log In</h1>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Keep me logged in
            </label>
            <a href="/forgot">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
