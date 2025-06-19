import { axiosInstance } from "./axios";

export async function registerUser(login: string, password: string) {
  const response = await axiosInstance.post("/user", { login, password });
  const token = response.headers["x-auth-token"];
  console.log("Response headers:", response.headers);
  console.log("Token received:", token);
  localStorage.setItem("auth_token", token);
  return response.data;
}
