import React, { useState } from "react";
import "./search.css";

const mockIngredients = ["Sugar", "Salt", "Quince", "Carrot", "Beans", "Garlic"];
const mockRecipes = ["Pasulj", "Slatko od dunja", "Čokoladni kolač", "Pita od jabuka"];

export default function SearchBarComponent({ onSearch }) {
    const [searchMode, setSearchMode] = useState("name");
    const [inputValue, setInputValue] = useState("");
    const [addedIngredients, setAddedIngredients] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    const handleToggle = () => {
        setSearchMode(searchMode === "name" ? "ingredients" : "name");
        setInputValue("");
        setSuggestions([]);
        setAddedIngredients([]);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (searchMode === "name") {
            setSuggestions(
                mockRecipes.filter((r) => r.toLowerCase().includes(value.toLowerCase()))
            );
        } else {
            setSuggestions(
                mockIngredients.filter((ing) =>
                    ing.toLowerCase().includes(value.toLowerCase())
                )
            );
        }
    };

    const handleAdd = (item) => {
        if (item && !addedIngredients.includes(item)) {
            setAddedIngredients([...addedIngredients, item]);
        }
        setInputValue("");
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const items = inputValue.split(/[\s,]+/).filter(Boolean);
            items.forEach(handleAdd);
        }
    };

    const removeIngredient = (item) => {
        setAddedIngredients(addedIngredients.filter((i) => i !== item));
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-wrapper">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        searchMode === "name"
                            ? "Search by recipe name..."
                            : "Search by ingredient..."
                    }
                    className="search-input"
                />
                <button className="toggle-btn" onClick={handleToggle}>
                    {searchMode === "name" ? "Name" : "Ingredients"}
                </button>
            </div>

            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((s, i) => (
                        <div
                            key={i}
                            className="suggestion-item"
                            onClick={() => handleAdd(s)}
                        >
                            {s}
                        </div>
                    ))}
                </div>
            )}

            {addedIngredients.length > 0 && (
                <div className="added-ingredients">
                    {addedIngredients.map((ing, i) => (
                        <span key={i} className="ingredient-chip">
                            {ing}
                            <span className="remove-x" onClick={() => removeIngredient(ing)}>
                                ×
                            </span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
