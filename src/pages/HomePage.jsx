import { useState } from "react";
import Navbar from "../components/NavBar/NavBarComponent";
import { mockRecipes } from "./mockRecipes";

import RecipeCard from "../components/RecipeCard/RecipeCardComponent";
import SearchBarComponent from "../components/Search/SearchComponent";
import SignIn from "../components/SignIn/SignInComponent";
import SignUp from "../components/SignUp/SignUpComponent";
import "../styles/homePage.css";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    console.log("Sign out pressed.");
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

      <SearchBarComponent />

      <div className="recipes-container">
        {mockRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            name={recipe.name}
            image={recipe.image}
            cookingTime={recipe.cookingTime}
            rating={recipe.rating}
            ingredients={recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}
