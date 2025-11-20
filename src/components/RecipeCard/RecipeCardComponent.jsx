import "./recipeCard.css";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ name, image, cookingTime, rating, ingredients }) {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate(`/recipe/${encodeURIComponent(name)}`);
    };

    return (
        <div
            className="recipe-card"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
        >
            <div className="recipe-image-wrapper">
                <img src={image} alt={name} className="recipe-image" />
                <div className="recipe-title-overlay">
                    <h3>{name}</h3>
                </div>
            </div>

            <div className="recipe-info">
                <p><strong>Cooking time:</strong> {cookingTime} min</p>
                <p>{rating} ⭐</p>

                <div className="ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                        {ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
