import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function SignUpPage() {
  const { user, signup } = useContext(AuthContext);
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup({ email, password });
    } catch (err) {
      alert(err.message);
    }
  };

  if (user) return <p>Redirecting…</p>;

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required />
        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
}
