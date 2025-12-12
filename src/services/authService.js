import { apiRequest } from "./api";

export async function signIn(username, password) {
  return apiRequest("/auth/login", "POST", { username, password });
}

export async function signUp(username, password) {
  return apiRequest("/auth/register", "POST", { username, password });
}
