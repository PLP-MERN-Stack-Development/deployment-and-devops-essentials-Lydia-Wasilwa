import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
// getPostsByCategory: async (categoryId) => {
//     const res = await axios.get(`${API_URL}/posts/category/${categoryId}`);
//     return res.data;
//   },
  
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export * from "./auth";
export * from "./posts";
export * from "./categories";
