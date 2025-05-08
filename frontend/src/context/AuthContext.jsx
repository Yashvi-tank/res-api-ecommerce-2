import React, { createContext, useState, useEffect } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../services/firebaseConfig.js";   // ← note the .js

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Watch Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        // Get the ID token for auth header
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("token", token);

        // Optionally, you can pull additional profile info here
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const signup = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged will fire and do the rest
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await auth.signOut();
    // onAuthStateChanged will clear user
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
