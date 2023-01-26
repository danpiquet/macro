import axios from "axios";
import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";

const AddRecipe = () => {
  //main recipe info states
  const [recipeName, setRecipeName] = useState("");
  const [servings, setServings] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  //individual ingredient info states
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");

  const navigate = useNavigate();

  const addIngredients = () => {
    setAllIngredients([
      ...allIngredients,
      { ingredientName, quantity, carbs, fat, protein },
    ]);
    console.log(allIngredients);
    setIngredientName("");
    setQuantity("");
    setCarbs("");
    setFat("");
    setProtein("");
  };

  const initialValues = {
    recipeName: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  const onSubmit = (values) => {
    values.ingredients = allIngredients;
    axios
      .post("api/recipes", values)
      .then((res) => {
        console.log(res.data);
        navigate(`api/recipes/${res.data[0][0].id}`);
      })
      .catch((err) => console.log(err));
  };

  const ingredientsDisplay = allIngredients.map((ing, index) => {
    return (
      <div key={index}>
        <input type="text" value={ing} />
      </div>
    );
  });

  return (
    <div>
      <NavLink to="/home">Back to recipes</NavLink>
      <h1>Placeholder recipe name</h1>
      <h2>Placeholder calories/serving and %C/%F/%P</h2>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    placeholder="recipe name"
                    value={values.recipeName}
                    onChange={handleChange}
                    name="recipeName"
                  />
                </div>
                <div>
                  <input
                    placeholder="serves"
                    value={values.serves}
                    onChange={handleChange}
                    name="serves"
                  />
                </div>

                <textarea
                  placeholder="recipe  instructions"
                  name="instructions"
                  value={values.instructions}
                  cols="30"
                  rows="10"
                ></textarea>
                <div>
                  <input
                    placeholder="ingredient"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                  />
                  <input
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <input
                    placeholder="carb grams"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                  />
                  <input
                    placeholder="fat grams"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                  />
                  <input
                    placeholder="protein grams"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  />
                  <button type="button" onClick={() => addIngredients()}>+</button>
                </div>

                <div>
                  <h3>current ingredients</h3>
                  <div>{ingredientsDisplay}</div>
                </div>

                <div>
                  <button type="submit">Save Recipe</button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddRecipe;
