import { apiRequest } from "./api";

export async function getNotes(recipeId) {
  return apiRequest(`/notes/${recipeId}`, "GET");
}

export async function createNote(recipeId, note) {
  return apiRequest(`/notes/${recipeId}`, "POST", note, true);
}

export async function editNote(noteId, noteData) {
  return apiRequest(`/notes/${noteId}`, "PUT", noteData, true);
}

export async function deleteNote(noteId) {
  return apiRequest(`/notes/${noteId}`, "DELETE", null, true);
}
