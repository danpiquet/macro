import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});

  const getRecipeDetail = () => {
    console.log(id)
    axios
      .get(`/api/recipes/${+id}`)
      .then((res) => {
        setRecipeDetail(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipeDetail();
  }, []);
  return (
    <div>
      <h1>recipe detail: {recipeDetail.name}</h1>
    </div>
  );
};

export default RecipeDetails;
