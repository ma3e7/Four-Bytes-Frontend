import { useState, useEffect } from "react";
import Navbar from "../components/NavBar/NavBarComponent";
import RecipeCard from "../components/RecipeCard/RecipeCardComponent";
import SearchBarComponent from "../components/Search/SearchComponent";
import SignIn from "../components/SignIn/SignInComponent";
import SignUp from "../components/SignUp/SignUpComponent";
import "../styles/homePage.css";

import { getAllRecipes } from "../services/recipeService";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    console.log("Sign out pressed.");
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getAllRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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

      <SearchBarComponent />

      {loading ? (
        <p className="loading">Loading recipes...</p>
      ) : (
        <div className="recipes-container">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                name={recipe.name}
                image={recipe.image}
                cookingTime={recipe.cookingTime}
                rating={recipe.rating}
                ingredients={recipe.ingredients.map((ing) => ing.name || ing)}
              />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
}
