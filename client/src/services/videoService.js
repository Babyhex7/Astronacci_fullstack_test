// Service untuk Video API calls
import api from "./api";

// Get semua video
export const getVideos = async (params = {}) => {
  const response = await api.get("/videos", { params });
  return response.data;
};

// Get video by ID
export const getVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};
