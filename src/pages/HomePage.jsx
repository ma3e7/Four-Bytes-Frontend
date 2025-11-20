import { useState, useEffect } from "react";
import Navbar from "../components/NavBar/NavBarComponent";
import RecipeCard from "../components/RecipeCard/RecipeCardComponent";
import SearchBarComponent from "../components/Search/SearchComponent";
import SignIn from "../components/SignIn/SignInComponent";
import SignUp from "../components/SignUp/SignUpComponent";
import NotesComponent from "../components/Notes/NotesComponent"; // Add this import
import "../styles/homePage.css";
import Paginator from "../components/Paginator/Paginator";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState("JohnDoe"); // Add current user state
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;
  
  // Mock data - you'll replace this with your actual data
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
    },
    // Add more mock recipes as needed
  ];

  // Calculate pagination values
  const totalPages = Math.ceil(mockRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = mockRecipes.slice(startIndex, startIndex + recipesPerPage);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear current user on sign out
    console.log("Sign out pressed.");
  };

  // You'll want to update this when implementing actual authentication
  const handleSignIn = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [mockRecipes.length]);

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
        openSignIn={() => setShowSignIn(true)}
        openSignUp={() => setShowSignUp(true)}
      />

      {showSignIn && (
        <SignIn 
          close={() => setShowSignIn(false)}
          onSignIn={handleSignIn} // Pass sign in handler
        />
      )}
      {showSignUp && <SignUp close={() => setShowSignUp(false)} />}

      <SearchBarComponent />

      <div className="recipes-container">
        {currentRecipes.map((recipe, index) => (
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

      {/* Paginator Component */}
      {totalPages > 1 && (
        <Paginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Notes Component */}
      <NotesComponent 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </div>
  );
}