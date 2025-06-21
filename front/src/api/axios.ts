import axios from "axios";

const API_KEY =
  "live_LPSKueMvMxePXWmuh2AYbpz2VOtOzQB3yc2BJnt5MJ0LYurRlSApO8z7uHbrnsSw";

export const catsApiInstance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  params: {
    api_key: API_KEY,
  },
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
