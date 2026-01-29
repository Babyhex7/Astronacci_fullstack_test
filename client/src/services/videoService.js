import api from "./api";

export const getVideos = async (params = {}) => {
  const response = await api.get("/videos", { params });
  return response.data;
};

export const getVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};
