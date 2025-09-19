import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null
  );

  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  // Axios interceptor for auto-refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        refreshToken
      ) {
        originalRequest._retry = true;
        try {
          const res = await axios.post(`${API_URL}/refresh-token`, {
            refreshToken,
          });
          setAccessToken(res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          console.log("Refresh failed", err);
          logOut();
        }
      }
      return Promise.reject(error);
    }
  );

  const signup = async (res) => {
    const { data } = await axios.post(`${API_URL}/signup`, res);
    setAccessToken(data.accessToken);
    setUser(data.user);
    setRefreshToken(data.refreshToken);

    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("accessToken", data.accessToken);
    return data;
  };

  const login = async (data) => {
    console.log("Login payload:", data);
    const res = await axios.post(`${API_URL}/login`, data);
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    setRefreshToken(res.data.refreshToken);

    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  };

  const logOut = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/refresh-token`,
          { refreshToken: localStorage.getItem("refreshToken") },
          { withCredentials: true }
        );
        setAccessToken(res.data.accessToken);
        localStorage.setItem("accessToken", res.data.accessToken);
      } catch (err) {
        console.log("Refresh token expired, please login again");
        setAccessToken(null);
        localStorage.removeItem("accessToken");
      }
    };

    if (!accessToken && refreshToken) {
      refreshAccessToken();
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, signup, login, logOut, axiosInstance }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
