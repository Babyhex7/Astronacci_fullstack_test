import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/users/stats");
  return response.data;
};
