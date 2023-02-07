import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import { Typography, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(recipeDetail.name);
  const [serves, setServes] = useState(recipeDetail.serves);
  const [recipeInstructions, setRecipeInstructions] = useState(
    recipeDetail.instructions
  );
  const [allIngredients, setAllIngredients] = useState(
    recipeDetail?.ingredients
  );

  const authCtx = useContext(AuthContext);
  const getRecipeDetail = () => {
    axios
      .get(`/api/recipes/${+id}`)
      .then((res) => {
        setRecipeDetail(res.data);
        setName(res.data.name);
        setServes(res.data.serves);
        setRecipeInstructions(res.data.instructions);
      })
      .catch((err) => console.log(err));
  };

  const getIngredientDetail = () => {
    axios.get(`/api/ingredients/${id}`).catch((err) => console.log(err));
  };

  const handleSaveEdit = () => {
    const bodyObj = {
      name,
      serves,
      instructions: recipeInstructions,
      allIngredients: recipeDetail.ingredients,
      id,
    };

    axios
      .put("/api/ingredients", bodyObj)
      .then((res) => {
        getRecipeDetail();
        getIngredientDetail();
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipeDetail();
    getIngredientDetail();
  }, []);

  const handleInputChange = (name, index, value) => {
    const newState = [...recipeDetail.ingredients];
    newState[index][`${name}`] = value;
    setAllIngredients(newState);
  };
  const handleDelete = async (index) => {
    await axios.delete(
      `/api/ingredients/${recipeDetail.ingredients[index].id}`
    );
    const newState = [...recipeDetail.ingredients];
    newState.splice(index, 1);
    recipeDetail.ingredients = newState;
    setAllIngredients(newState);
  };
  const ingredientsDisplay = recipeDetail?.ingredients?.map((ing, index) => {
    return (
      <div
        key={index}
        style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
      >
        <IconButton onClick={() => handleDelete(index)}>
          <DeleteIcon />
        </IconButton>

        <TextField
          onChange={(e) => {
            handleInputChange(e.target.name, index, e.target.value);
          }}
          name="name"
          type="text"
          value={ing.name}
          label="Ingredient Name"
          variant="outlined"
          style={{ marginRight: "1rem", flex: 1 }}
        />
        <TextField
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="quantity"
          type="text"
          value={ing.quantity}
          label="Quantity"
          variant="outlined"
          style={{ marginRight: "1rem", width: "10%" }}
        />
        <TextField
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="carbs"
          type="number"
          value={ing.carbs}
          label="Carbs (g)"
          variant="outlined"
          style={{ marginRight: "1rem", width: "10%" }}
        />
        <TextField
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="fat"
          type="number"
          value={ing.fat}
          label="Fat (g)"
          variant="outlined"
          style={{ marginRight: "1rem", width: "10%" }}
        />
        <TextField
          onChange={(e) =>
            handleInputChange(e.target.name, index, e.target.value)
          }
          name="protein"
          type="number"
          value={ing.protein}
          label="Protein (g)"
          variant="outlined"
          style={{ marginRight: "1rem", width: "10%" }}
        />
      </div>
    );
  });

  const ingredients = recipeDetail?.ingredients?.map((ing, index) => {
    return (
      <div
        key={index}
        style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
      >
        <Typography variant="h7">
          {ing.quantity} - {ing.name}
        </Typography>
      </div>
    );
  });

  const fatCals = recipeDetail?.ingredients?.reduce((acc, ing) => {
    return acc + +ing?.fat * 9;
  }, 0);
  const proteinCals = recipeDetail?.ingredients?.reduce((acc, ing) => {
    return acc + +ing?.protein * 4;
  }, 0);
  const carbCals = recipeDetail?.ingredients?.reduce((acc, ing) => {
    return acc + +ing?.carbs * 4;
  }, 0);

  const totalCalories = +fatCals + +proteinCals + +carbCals;
  const carbPercent = ((+carbCals / +totalCalories) * 100).toFixed(0);
  const fatPercent = ((+fatCals / +totalCalories) * 100).toFixed(0);
  const proteinPercent = 100 - carbPercent - fatPercent;

  const totalFatGrams = recipeDetail.ingredients?.reduce((acc, ing) => {
    return acc + +ing?.fat;
  }, 0);
  const totalCarbGrams = recipeDetail.ingredients?.reduce((acc, ing) => {
    return acc + +ing?.carbs;
  }, 0);
  const totalProteinGrams = recipeDetail.ingredients?.reduce((acc, ing) => {
    return acc + +ing?.protein;
  }, 0);
  const fatGrams = (totalFatGrams / serves).toFixed(0);
  const carbGrams = (totalCarbGrams / serves).toFixed(0);
  const proteinGrams = (totalProteinGrams / serves).toFixed(0);

  const updatedFatCals = allIngredients?.reduce((acc, ing) => {
    return acc + +ing?.fat * 9;
  }, 0);
  const updatedProteinCals = allIngredients?.reduce((acc, ing) => {
    return acc + +ing?.protein * 4;
  }, 0);
  const updatedCarbCals = allIngredients?.reduce((acc, ing) => {
    return acc + +ing?.carbs * 4;
  }, 0);

  const updatedTotalCalories =
    updatedFatCals + updatedProteinCals + updatedCarbCals;
  const updatedCarbPercent = (
    (+updatedCarbCals / +updatedTotalCalories) *
    100
  ).toFixed(0);
  const updatedFatPercent = (
    (+updatedFatCals / +updatedTotalCalories) *
    100
  ).toFixed(0);
  const updatedProteinPercent = 100 - updatedCarbPercent - updatedFatPercent;
  return !editing ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "70px",
        width: "60%",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Paper style={{ padding: "5px", marginTop: "80px" }}>
        <Typography variant="h2">{recipeDetail.name}</Typography>
      </Paper>
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Typography variant="h3">
          {(+totalCalories / +recipeDetail.serves).toFixed(0)} cal
        </Typography>
        <Typography variant="h4">
          {carbPercent}C/{fatPercent}F/{proteinPercent}P
        </Typography>
      </Paper>
      <Paper style={{ marginTop: "20px", width: "60%", padding: "10px" }}>
        <Typography variant="h4">Serves: {recipeDetail.serves}</Typography>
        <Typography variant="h6">
          ({carbGrams}g C / {fatGrams}g F / {proteinGrams}g P)
        </Typography>
        <div>{ingredients}</div>
        <Typography style={{ marginTop: "20px", marginBottom: "20px" }}>
          Instructions: {recipeDetail.instructions}
        </Typography>
        <Typography variant="h7">
          Contributor: {recipeDetail?.user?.username}
        </Typography>
      </Paper>

      {+recipeDetail?.user?.id === +authCtx?.userId && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditing(true)}
          style={{ marginTop: "20px" }}
        >
          Edit
        </Button>
      )}
    </div>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ marginTop: "80px" }}>
          <form style={{ width: "60%", margin: "auto" }}>
            <div
              style={{
                padding: "5px",
                display: "flex",
                alignItems: "center",
                width: "60%",
                margin: "auto",
                flexDirection: "column",
              }}
            >
              <Paper style={{ padding: "5px", marginBottom: "20px" }}>
                <Typography variant="h2">{recipeDetail.name}</Typography>
              </Paper>
              {!isNaN(updatedTotalCalories) && (
                <Paper
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Typography variant="h3">
                    {(+updatedTotalCalories / +serves).toFixed(0)} cal
                  </Typography>
                  <Typography variant="h4">
                    {updatedCarbPercent}C/{updatedFatPercent}F/
                    {updatedProteinPercent}P
                  </Typography>
                </Paper>
              )}
            </div>
            <Paper>
              <div>
                <TextField
                  placeholder="recipe name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  fullWidth
                  type="text"
                />
              </div>

              <div>
                <TextField
                  placeholder="serves"
                  value={serves}
                  onChange={(e) => setServes(e.target.value)}
                  name="serves"
                  fullWidth
                  type="number"
                />
              </div>

              <div>
                <TextField
                  placeholder="recipe  instructions"
                  name="instructions"
                  value={recipeInstructions}
                  onChange={(e) => setRecipeInstructions(e.target.value)}
                  fullWidth
                  multiline
                  minRows={10}
                />
              </div>
            </Paper>
          </form>
        </div>

        <div style={{ marginTop: "20px", width: "60%", margin: "auto" }}>
          <Paper>
            <div>{ingredientsDisplay}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={() => handleSaveEdit()}
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  width: "12%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginRight: "5px",
                }}
              >
                Save Recipe
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                style={{
                  width: "12%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "5px",
                }}
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
