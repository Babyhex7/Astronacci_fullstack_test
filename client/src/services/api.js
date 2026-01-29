// Axios instance + interceptors untuk API calls - SECURE VERSION
import axios from "axios";

// Base URL dari environment
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Buat axios instance dengan credentials untuk cookie support
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies untuk secure authentication
});

// Request interceptor: tidak perlu tambah token; cookie akan dikirim otomatis
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

// Response interceptor: handle error global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // JANGAN auto-redirect ke login di sini!
    // Biarkan AuthContext yang handle auth state
    return Promise.reject(error);
  },
);

export default api;
