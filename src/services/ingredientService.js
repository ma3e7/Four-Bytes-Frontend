import { apiRequest } from "./api";

export function searchIngredient(name) {
  return apiRequest(`/ingredients?name=${encodeURIComponent(name)}`);
}
