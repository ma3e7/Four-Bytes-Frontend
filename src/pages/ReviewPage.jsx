import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/reviewPage.css";

export default function ReviewForm() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically save the review to your backend
    console.log({
      recipeName: decodeURIComponent(name),
      rating,
      comment,
      date: new Date().toISOString()
    });

    // Navigate back to the recipe page
    navigate(`/recipe/${name}`);
  };

  return (
    <div className="review-form-container">
      <div className="review-form">
        <h1>Review: {decodeURIComponent(name)}</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="rating-section">
            <label>Rating:</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onChange={() => setRating(currentRating)}
                      className="visually-hidden"
                    />
                    <span
                      className={`star ${currentRating <= (hover || rating) ? "filled" : ""}`}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(0)}
                    >
                      ★
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="rating-text">
              {rating > 0 ? `You rated: ${rating} star${rating > 1 ? 's' : ''}` : 'Select your rating'}
            </p>
          </div>

          {/* Comment Section */}
          <div className="comment-section">
            <label htmlFor="comment">Your Review:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this recipe..."
              rows="6"
            />
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(`/recipe/${name}`)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={rating === 0}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}