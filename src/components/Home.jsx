import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeContainer from "./RecipeContainer";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Home = () => {
  const [recipes, setRecipes] = useState([]);
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
    <div style={{background: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)"}}>
      <h1>Recipes</h1>

      <div>
        <RecipeContainer recipes={recipes} />
      </div>
    </div>
  );
};

export default Home;

