import api from "./api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const register = async (email, password, full_name) => {
  const response = await api.post("/auth/register", {
    email,
    password,
    full_name,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const selectMembership = async (membershipType) => {
  const response = await api.post("/auth/select-membership", {
    membershipType,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getGoogleAuthUrl = () => `${API_URL}/auth/google`;
export const getFacebookAuthUrl = () => `${API_URL}/auth/facebook`;
export const getGithubAuthUrl = () => `${API_URL}/auth/github`;
