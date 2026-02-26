"use client";

import { useState } from "react";
import { AuthContext } from "../contexts";

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const setAuth = (user) => {
    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth");
    }
    setAuthState(user);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
