import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/users/stats");
  return response.data;
};

// Get content history dengan detail konten
export const getContentHistory = async (params = {}) => {
  const response = await api.get("/users/content-history", { params });
  return response.data;
};

// Get IDs konten yang sudah dilihat (untuk marking di list)
export const getViewedContentIds = async () => {
  const response = await api.get("/users/viewed-content");
  return response.data;
};
