import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;
console.log("🔗 API_URL:", API_URL);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  }, [user]);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // send cookies
  });

  // ------------------ Interceptor ------------------
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        console.log("🔄 Refreshing token...");
        try {
          const res = await axiosInstance.post("/refresh-token");
          console.log("✅ New AccessToken:", res.data.accessToken);
          setAccessToken(res.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error("❌ Refresh failed:", err.message);
          logOut();
        }
      }
      return Promise.reject(error);
    }
  );

  // ------------------ Auth functions ------------------

  const signup = async (formData) => {
    console.log("📩 Signup payload:", formData);
    const { data } = await axiosInstance.post("/signup", formData);
    console.log("✅ Signup response:", data);
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const login = async (formData) => {
    console.log("📩 Login payload:", formData);
    const { data } = await axiosInstance.post("/login", formData);
    console.log("✅ Login response:", data);
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data;
  };

  const logOut = () => {
    console.log("🚪 Logging out...");
    setUser(null);
    setAccessToken(null);
    setLoading(false);
  };

  const fetchCurrentUser = async () => {
    console.log("📡 Fetching current user...");
    setLoading(true);
    try {
      const res = await axiosInstance.get("/get-current-user");
      console.log("✅ Current user fetched:", res.data.user);
      setUser(res.data.user);
    } catch (error) {
      console.error("❌ Failed to fetch user:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setAccessToken(storedToken);
  }, []);

  // ------------------ Effects ------------------

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        signup,
        login,
        logOut,
        axiosInstance,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

