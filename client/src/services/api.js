// Axios instance + interceptors untuk API calls
import axios from "axios";

// Base URL dari environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Buat axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: tambah token ke header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika 401, redirect ke login
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
