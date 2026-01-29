// Service untuk User API calls
import api from "./api";

// Get profil user
export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

// Get statistik akses konten
export const getStats = async () => {
  const response = await api.get("/users/stats");
  return response.data;
};
