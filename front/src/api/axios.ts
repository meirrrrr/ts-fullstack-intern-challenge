import axios from "axios";

export const catsApiInstance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
