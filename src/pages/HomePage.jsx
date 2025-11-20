import { useState } from "react";
import Navbar from "../components/NavBar/NavBarComponent";
import RecipeCard from "../components/RecipeCard/RecipeCardComponent";
import SearchBarComponent from "../components/Search/SearchComponent";
import SignIn from "../components/SignIn/SignInComponent"
import SignUp from "../components/SignUp/SignUpComponent"
import "../styles/homePage.css";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);


  const handleSignOut = () => {
    setIsLoggedIn(false);
    console.log("Sign out pressed.")
  };

  const mockRecipes = [
    {
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
  ];

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
