import api from "./api";

export const getArticles = async (params = {}) => {
  const response = await api.get("/articles", { params });
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await api.get(`/articles/${id}`);
  return response.data;
};
