import { apiRequest } from "./api";

export async function getAllRecipes() {
  return apiRequest("/recipes", "GET");
}

export async function getRecipeByName(name) {
  return apiRequest(`/recipes/search?name=${encodeURIComponent(name)}`, "GET");
}

export async function toggleBookmark(recipeId) {
  return apiRequest(`/recipes/bookmark/${recipeId}`, "PUT", null, true);
}

export async function getBookmarkedRecipes() {
  return apiRequest("/recipes/bookmarked", "GET", null, true);
}

export async function createRecipe(recipe) {
  return apiRequest("/recipes", "POST", recipe, true);
}

export async function editRecipe(recipeId, recipeData) {
  return apiRequest(`/recipes/${recipeId}`, "PUT", recipeData, true);
}

export async function deleteRecipe(recipeId) {
  return apiRequest(`/recipes/${recipeId}`, "DELETE", null, true);
}
