import { api } from "./index";

export const authService = {
  async register(data) {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
  async login(data) {
    const res = await api.post("/auth/login", data);
    // Save token
    localStorage.setItem("token", res.data.token);
    return res.data;
  },
  logout() {
    localStorage.removeItem("token");
  },
  getToken() {
    return localStorage.getItem("token");
  },
};
