import { useState } from "react";
import Navbar from "../components/NavBar/NavBarComponent";
import RecipeCard from "../components/RecipeCard/RecipeCardComponent";
import SignIn from "../components/SignIn/SignInComponent";
import SignUp from "../components/SignUp/SignUpComponent";
import "../styles/homePage.css";
import "../styles/bookmarkPage.css";

export default function BookmarkPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([
    {
      id: 1,
      name: "Slatko od dunja",
      image: "https://sadnicedunje.rs/wp-content/uploads/2020/10/slatko-od-rendanih-dunja.jpg",
      cookingTime: 70,
      complexity: 3,
      rating: 4.8,
      ingredients: [
        "1 kg quince",
        "1 kg sugar",
        "300 ml water",
        "1/2 lemon",
      ]
    },
    {
      id: 2,
      name: "Pasulj",
      image: "https://fagor.rs/wp-content/uploads/2021/09/corbast-pasulj.jpg.webp",
      cookingTime: 90,
      complexity: 3,
      rating: 4.5,
      ingredients: [
        "300 g beans",
        "1 onion",
        "1 carrot",
        "1 garlic clove",
        "Paprika powder",
        "Bay leaf",
        "Salt",
      ]
    }
  ]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    console.log("Sign out pressed.");
    
  };

  const removeFromBookmarks = (recipeId) => {
    setBookmarkedRecipes(prevRecipes => 
      prevRecipes.filter(recipe => recipe.id !== recipeId)
    );
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
        openSignIn={() => setShowSignIn(true)}
        openSignUp={() => setShowSignUp(true)}
      />

      {showSignIn && <SignIn close={() => setShowSignIn(false)} />}
      {showSignUp && <SignUp close={() => setShowSignUp(false)} />}

      <div className="bookmark-header">
        <h1>My Favorite Recipes</h1>
        <p>{bookmarkedRecipes.length} recipe{bookmarkedRecipes.length !== 1 ? 's' : ''} bookmarked</p>
      </div>

      <div className="recipes-container">
        {bookmarkedRecipes.length > 0 ? (
          bookmarkedRecipes.map((recipe) => (
            <div key={recipe.id} className="bookmark-recipe-wrapper">
              <button 
                className="remove-bookmark-btn"
                onClick={() => removeFromBookmarks(recipe.id)}
                aria-label={`Remove ${recipe.name} from bookmarks`}
              >
                ×
              </button>
              <RecipeCard
                name={recipe.name}
                image={recipe.image}
                cookingTime={recipe.cookingTime}
                rating={recipe.rating}
                ingredients={recipe.ingredients}
              />
            </div>
          ))
        ) : (
          <div className="empty-bookmarks">
            <h2>No bookmarks yet</h2>
            <p>Start saving your favorite recipes to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}