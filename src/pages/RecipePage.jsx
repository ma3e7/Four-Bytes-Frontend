import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipeByName, toggleBookmark } from "../services/recipeService";
import { getReviews, createReview } from "../services/reviewService";
import { getNotes, createNote } from "../services/noteService";

import ReviewModal from "../components/Review/ReviewComponent";
import NotesModal from "../components/Notes/NotesModal";

import "../styles/RecipePage.css";

export default function RecipePage({ user }) {
  const { name } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [notes, setNotes] = useState([]);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const recipesData = await getRecipeByName(name);
        if (recipesData.length > 0) {
          const currentRecipe = recipesData[0];
          setRecipe(currentRecipe);

          const reviewsData = await getReviews(currentRecipe._id);
          setReviews(reviewsData);

          const notesData = await getNotes(currentRecipe._id);
          setNotes(notesData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  const handleToggleBookmark = async () => {
    if (!recipe || !user) return; // korisnik mora biti logovan
    try {
      const updated = await toggleBookmark(recipe._id);
      setRecipe({ ...recipe, bookmarked: updated.recipe.bookmarked });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReview = async (review) => {
    if (!user) return;
    try {
      const newReview = await createReview(recipe._id, review);
      setReviews([newReview, ...reviews]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (note) => {
    if (!user) return;
    try {
      const newNote = await createNote(recipe._id, note);
      setNotes([newNote, ...notes]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-page-container">
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        {user && (
          <button onClick={handleToggleBookmark}>
            {recipe.bookmarked ? "Unbookmark" : "Bookmark"}
          </button>
        )}
      </div>

      <img src={recipe.image} alt={recipe.name} className="recipe-image" />

      <div className="recipe-details">
        <p><strong>Cooking Time:</strong> {recipe.cookingTime} min</p>
        <p><strong>Complexity:</strong> {recipe.complexity}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing.name || ing}</li>
          ))}
        </ul>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {user ? (
          <button onClick={() => setReviewModalOpen(true)}>Add Review</button>
        ) : (
          <p>Please sign in to add a review.</p>
        )}
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((r) => (
              <li key={r._id}>
                <strong>{r.user.username}</strong>: {r.comment} ({r.rating}⭐)
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="notes-section">
        <h2>Notes</h2>
        {user ? (
          <button onClick={() => setNotesModalOpen(true)}>Add Note</button>
        ) : (
          <p>Please sign in to add a note.</p>
        )}
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          <ul>
            {notes.map((n) => (
              <li key={n._id}>
                <strong>{n.user.username}</strong>: {n.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modals */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleAddReview}
        recipeName={recipe.name}
      />
      <NotesModal
        isOpen={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
        onSubmit={handleAddNote}
        recipeName={recipe.name}
      />
    </div>
  );
}
