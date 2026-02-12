import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Cache-Control": "no-cache",
  },
});

/// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // prevent browser caching
  config.headers["Pragma"] = "no-cache";

  return config;
});

export default api;
