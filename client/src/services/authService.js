// Service untuk Auth API calls
import api from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Register manual
export const register = async (email, password, full_name) => {
  const response = await api.post("/auth/register", {
    email,
    password,
    full_name,
  });
  return response.data;
};

// Login manual
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Pilih membership
export const selectMembership = async (membershipType) => {
  const response = await api.post("/auth/select-membership", {
    membershipType,
  });
  return response.data;
};

// Get current user
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// URL untuk OAuth (buka di browser)
export const getGoogleAuthUrl = () => `${API_URL}/auth/google`;
export const getFacebookAuthUrl = () => `${API_URL}/auth/facebook`;
