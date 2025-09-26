// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "../api/api";

export const AuthContext = createContext();

// ✅ safe parse function
const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored || stored === "undefined" || stored === "null") return null;
    return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse stored user:", err);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.data);
        console.log(res)
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  };

  // ✅ Signup
  const signup = async (data) => {
    try {
      const res = await axios.post("/auth/signup", data, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Signup failed" };
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    axios.post("/auth/logout").catch(() => {});
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
