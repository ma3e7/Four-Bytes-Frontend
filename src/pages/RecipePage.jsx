import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/RecipePage.css";
import { mockRecipes } from "./mockRecipes";
import ReviewModal from "../components/Review/ReviewComponent";
import NotesModal from "../components/Notes/NotesModal"


export default function RecipePage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const recipe = mockRecipes.find(r => r.name === decodeURIComponent(name));
  
  if (!recipe) return <p className="loading">Recipe not found.</p>;

  const handleReviewSubmit = (review) => {
    console.log("New review:", review);
    console.log("For recipe:", recipe.name);
    // Here you would typically save the review to your backend or state management
    setIsReviewModalOpen(false)
  };

  const handleNotesSubmit = (note) => {
    console.log("New note:", note);
    console.log("For recipe:", recipe.name);
    setIsReviewModalOpen(false);
  };

  return (
    <div className="recipe-page">
      <img src={recipe.image} alt={recipe.name} className="recipe-page-image" />

      <h1>{recipe.name}</h1>

      <p><strong>Cooking time:</strong> {recipe.cookingTime} min</p>
      <p><strong>Rating:</strong> {recipe.rating}</p>

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{recipe.instructions || "No instructions provided."}</p>

      {/* ----------------------- NEW UI ----------------------- */}

      <h2>Your Personal Notes</h2>
        <div>
          <button
            className="action-btn"
            onClick={() => setIsNotesModalOpen(true)}
          >
            Add Notes
          </button>
        </div>

      <div className="extra-actions">
        <h2>Share Your Review</h2>
        <div>
          <button
            className="action-btn"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Write a Review
          </button>
        </div>
        
        
      </div>

      {/* Add the ReviewModal component */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        recipeName={recipe.name}
      />

        {/* Notes Modal */}
      <NotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
        onSubmit={handleNotesSubmit}
        recipeName={recipe.name}
      />

    </div>
  );
}
