import { axiosInstance } from "./axios";

interface RegisterPayload {
  login: string;
  password: string;
}

export async function registerUser(login: string, password: string) {
  try {
    const response = await axiosInstance.post<RegisterPayload>("/user", {
      login,
      password,
    });
    const token = response.headers["x-auth-token"];

    if (!token) {
      throw new Error("Authentication token not found in response headers");
    }
    localStorage.setItem("auth_token", token);

    return response.data;
  } catch (error) {
    throw new Error("Error registering user: " + error);
  }
}
