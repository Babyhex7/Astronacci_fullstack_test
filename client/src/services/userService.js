import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/users/stats");
  return response.data;
};
export const getContentHistory = async (params = {}) => {
  const response = await api.get("/users/content-history", { params });
  return response.data;
};


export const getViewedContentIds = async () => {
  const response = await api.get("/users/viewed-content");
  return response.data;
};
