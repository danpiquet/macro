import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeContainer from "./RecipeContainer";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);
  const getRecipes = () => {
    axios
      .get("/api/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div>
      <h1>Recipes</h1>

      <div>
        <RecipeContainer recipes={recipes} />
      </div>
    </div>
  );
};

export default Home;
