import axios from "axios";

// Fail-safe: Check if we are on the live Render domain
const isProduction = window.location.hostname.includes("onrender.com");

const baseURL = isProduction 
  ? "https://shopscale-api.onrender.com/api" 
  : (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api");

console.log("Current Hostname:", window.location.hostname);
console.log("Resolved API Base URL:", baseURL);

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
