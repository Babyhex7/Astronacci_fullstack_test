// Service untuk Article API calls
import api from "./api";

// Get semua artikel
export const getArticles = async (params = {}) => {
  const response = await api.get("/articles", { params });
  return response.data;
};

// Get artikel by ID
export const getArticleById = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};
