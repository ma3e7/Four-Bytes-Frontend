import { useParams } from "react-router-dom";
import "../styles/RecipePage.css";
import { mockRecipes } from "./mockRecipes"; 

export default function RecipePage() {
  const { name } = useParams();
  const recipe = mockRecipes.find(r => r.name === decodeURIComponent(name));

  if (!recipe) return <p className="loading">Recipe not found.</p>;

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
    </div>
  );
}
