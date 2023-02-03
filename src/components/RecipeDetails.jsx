import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import { Typography, Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Navigate } from "react-router-dom";

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
    recipeDetail.ingredients
  );
  const [recipes, setRecipes] = useState([]);
  //individual ingredient info states
  // const [ingredientName, setIngredientName] = useState(recipeDetail.ingredients.name);
  const [quantity, setQuantity] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");

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
    axios
      .get(`/api/ingredients/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipeDetail();
    getIngredientDetail();
  }, []);

//   const handleRecipeUpdate = () => {
// axios
// .put(`/api/ingredient`)
//   };

  const handleInputChange = (name, index, value) => {
    console.log(name, index, value);
    const newState = [...recipeDetail.ingredients];
    newState[index][`${name}`] = value;
    setAllIngredients(newState);
  };
  const handleDelete = (index) => {
    const newState = [...allIngredients];
    newState.splice(index, 1);
    setAllIngredients(newState);
  };

  const navigate = useNavigate();

  const ingredientsDisplay = recipeDetail?.ingredients?.map((ing, index) => {
    return (
      <div
        key={index}
        style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}
      >
        <IconButton onClick={() => handleDelete()}>
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
  return !editing ? (
    <div style={{ marginTop: "70px" }}>
      <Typography variant="h4">{recipeDetail.name}</Typography>
      <Typography variant="subtitle1">Serves: {recipeDetail.serves}</Typography>
      <Typography>Instructions: {recipeDetail.instructions}</Typography>
      <Typography>Contributor: {recipeDetail?.user?.username}</Typography>

      {+recipeDetail?.user?.id === +authCtx?.userId && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditing(true)}
        >
          Edit
        </Button>
      )}
    </div>
  ) : (
    <>
      <div style={{ marginTop: "80px" }}>
        <form style={{ width: "60%", margin: "auto" }}>
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
    </>
    // <form>
    //   <label htmlFor="">Name: </label>
    //   <input type="text" value={recipeDetail.name}/>
    //   <label htmlFor="">Serves: </label>
    //   <input type="text" value={recipeDetail.serves}/>
    //   <label htmlFor="">Instructions: </label>
    //   {/* <textarea type="text" value={recipeDetail.instructions}/> */}
    //   <br />
    //   {+recipeDetail?.ingredients?.length > 0 && recipeDetail?.ingredients?.map((ing) => {
    //     <div>
    //       <input type="text" value={ing?.name} />
    //       <input type="text" value={ing?.quantity} />
    //       <input type="text" value={ing?.carbs} />
    //       <input type="text" value={ing?.fat} />
    //       <input type="text" value={ing?.protein} />
    //     </div>
    //   }) }

    // </form>
  );
};

export default RecipeDetails;

//code for editing
{
  /* <TextField
          label="Name"
          value={recipeDetail.name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Serves"
          value={recipeDetail.serves}
          onChange={(e) => setServes(e.target.value)}
        />
        <TextField
          label="Instructions"
          value={recipeDetail.instructions}
          onChange={(e) => setRecipeInstructions(e.target.value)}
        />
        {+recipeDetail?.ingredients?.length > 0 &&
          recipeDetail?.ingredients?.map((ing) => (
            <div>
              <TextField
                label="Ingredient Name"
                value={ing?.name}
                onChange={(e) => setIngredientName(e.target.value)}
              />
              <TextField
                label="Quantity"
                value={ing?.quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                label="Carbs"
                value={ing?.carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
              <TextField
                label="Fat"
                value={ing?.fat}
                onChange={(e) => setFat(e.target.value)}
              />
              <TextField
                label="Protein"
                value={ing?.protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
          ))}
        <Button variant="contained" color="primary">
          Save
        </Button> */
}
