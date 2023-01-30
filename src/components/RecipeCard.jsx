import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };
  return (
    <div>
      <h1>{recipe.name}</h1>
      <button onClick={() => handleClick()}>See More</button>
    </div>
  );
};

export default RecipeCard;
