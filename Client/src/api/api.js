import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/v1", // ✅ your backend base
  withCredentials: true, // ✅ VERY important to send cookies
});

// Optional: Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login"; // auto redirect on unauthorized
    }
    return Promise.reject(error);
  }
);

export default api;
