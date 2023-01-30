import React from "react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import RecipeCard from "./RecipeCard";

const RecipeContainer = ({ recipes }) => {
  const [search, setSearch] = useState("");

  const searchDisplay = recipes
    .filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(search.toLowerCase()) && recipe
    )
    .map((recipe) => <RecipeCard recipe={recipe} />);
  return (
    <div>
      <span>
        <BiSearchAlt2 />
        <input
          type="text"
          value={search}
          placeholder="search for a recipe"
          onChange={(e) => setSearch(e.target.value)}
        />
      </span>
      <div>{searchDisplay}</div>
    </div>
  );
};

export default RecipeContainer;
