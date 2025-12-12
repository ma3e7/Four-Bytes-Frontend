import { apiRequest } from "./api";

export async function getReviews(recipeId) {
  return apiRequest(`/reviews/${recipeId}`, "GET");
}

export async function createReview(recipeId, review) {
  return apiRequest(`/reviews/${recipeId}`, "POST", review, true);
}

export async function editReview(reviewId, reviewData) {
  return apiRequest(`/reviews/${reviewId}`, "PUT", reviewData, true);
}

export async function deleteReview(reviewId) {
  return apiRequest(`/reviews/${reviewId}`, "DELETE", null, true);
}
