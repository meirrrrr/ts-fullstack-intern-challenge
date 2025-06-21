import { registerUser } from "../api/registerUser";

export async function initUserSession(): Promise<string> {
  let token = localStorage.getItem("auth_token");

  if (!token) {
    const randomLogin = "user_" + Date.now();
    await registerUser(randomLogin, "123456");
    token = localStorage.getItem("auth_token");
  }

  if (!token) {
    throw new Error("Token was not set after registration");
  }

  return token;
}
