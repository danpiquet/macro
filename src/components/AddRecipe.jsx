import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import AuthContext from "../store/authContext";

const AddRecipe = () => {
  //main recipe info states
  const [name, setname] = useState("");
  const [serves, setServes] = useState("");
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
      { name: ingredientName, quantity, carbs, fat, protein },
    ]);
    console.log(allIngredients);
    setIngredientName("");
    setQuantity("");
    setCarbs("");
    setFat("");
    setProtein("");
  };

  const initialValues = {
    name: "",
    serves: "",
    allIngredients: [],
    instructions: "",
  };

  const authCtx = useContext(AuthContext);
  const onSubmit = (values) => {
    values.allIngredients = allIngredients;
    values.userId = authCtx.userId
    console.log(values);
    values.name = name;
    values.serves = serves;
    axios
      .post("/api/recipes", values)
      .then((res) => {
        console.log(res.data);
        navigate(`/recipes/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (name, index, value) => {
    const newState = [...allIngredients];
    newState[index][`${name}`] = value;
    setAllIngredients(newState);
  };

  const ingredientsDisplay = allIngredients.map((ing, index) => {
    return (
      <div key={index}>
        <input
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="ingredientName"
          type="text"
          value={ing.name}
        />
        <input
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="quantity"
          type="text"
          value={ing.quantity}
        />
        <input
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="carbs"
          type="number"
          value={ing.carbs}
        />
        <input
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="fat"
          type="number"
          value={ing.fat}
        />
        <input
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="protein"
          type="number"
          value={ing.protein}
        />
      </div>
    );
  });

  const totalCalories = allIngredients.reduce((acc, ing) => {
    return acc + ing.carbs * 4 + ing.protein * 4 + ing.fat * 9;
  }, 0);
  const carbPercent = allIngredients.reduce((acc, ing) => {
    return acc + ((ing.carbs * 4) / totalCalories) * 100;
  }, 0);
  const fatPercent = allIngredients.reduce((acc, ing) => {
    return acc + ((ing.fat * 9) / totalCalories) * 100;
  }, 0);
  const proteinPercent = allIngredients.reduce((acc, ing) => {
    return acc + ((ing.protein * 4) / totalCalories) * 100;
  }, 0);

  console.log("carb:", carbPercent);
  console.log("fat:", fatPercent);
  console.log("protein:", proteinPercent);

  return (
    <div>
      <NavLink to="/home">Back to recipes</NavLink>
      <h1>{name}</h1>
      <h2>
        {allIngredients.length === 0
          ? "0"
          : Math.floor(+totalCalories / +serves)}{" "}
        calories at {carbPercent.toFixed(0)}C/{fatPercent.toFixed(0)}F/
        {allIngredients.length === 0
          ? "0"
          : 100 - (+carbPercent.toFixed(0) + +fatPercent.toFixed(0))}
        P
      </h2>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    placeholder="recipe name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    name="name"
                  />
                </div>
                <div>
                  <input
                    placeholder="serves"
                    value={serves}
                    onChange={(e) => setServes(e.target.value)}
                    name="serves"
                  />
                </div>

                <textarea
                  placeholder="recipe  instructions"
                  name="instructions"
                  value={values.instructions}
                  cols="30"
                  rows="10"
                  onChange={handleChange}
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
                  <button type="button" onClick={() => addIngredients()}>
                    +
                  </button>
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
