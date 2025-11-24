import api from "./api";

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const getPostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await api.post("/posts", postData);
  return res.data;
};

export const updatePost = async (id, postData) => {
  const res = await api.put(`/posts/${id}`, postData);
  return res.data;
};

export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};
