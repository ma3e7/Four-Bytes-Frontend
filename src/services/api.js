// src/services/api.js

const BASE_URL = "https://lighthearted-sable-a6c328.netlify.app/api";

/**
 * Helper function za API request.
 * @param {string} path - Endpoint (npr. "/recipes")
 * @param {string} method - HTTP metoda ("GET", "POST", "PUT", "DELETE")
 * @param {object|null} body - Podaci za slanje (ako postoji)
 * @param {boolean} auth - Da li request zahtijeva token
 * @returns {Promise<any>} - Rezultat API-ja
 */
export async function apiRequest(path, method = "GET", body = null, auth = false) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${BASE_URL}${path}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
      throw new Error(errorData.message || "Request failed");
    }

    // Ako nema body-a (npr. 204 No Content), vratiti null
    if (response.status === 204) return null;

    return response.json();
  } catch (err) {
    console.error("API Request Error:", err);
    throw err;
  }
}
