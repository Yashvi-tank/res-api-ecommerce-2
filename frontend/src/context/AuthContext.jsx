import React, { createContext, useState, useEffect } from "react";
import api from "../services/api.js";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount: if we have a token, fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/users/profile")
        .then(response => setUser(response.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const signup = async ({ firstName, lastName, email, password, role, imageUrl }) => {
    // Create the user
    await api.post("/users/signup", { firstName, lastName, email, password, role, imageUrl });
    // Then immediately log them in to get a token
    const res = await api.post("/users/login", { email, password });
    const { token, user: loggedInUser } = res.data;
    localStorage.setItem("token", token);
    setUser(loggedInUser);
  };

  const login = async (email, password) => {
    const res = await api.post("/users/login", { email, password });
    const { token, user: loggedInUser } = res.data;
    localStorage.setItem("token", data.token);
    setUser(loggedInUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};