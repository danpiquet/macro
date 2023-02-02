import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthContext from "../store/authContext";
import { Typography, Button } from "@material-ui/core";

const RecipeDetails = () => {
  const getRecipeDetail = () => {
    axios
      .get(`/api/recipes/${+id}`)
      .then((res) => {
        setRecipeDetail(res.data);
      })
      .catch((err) => console.log(err));
  };
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [editing, setEditing] = useState(false)
  const [name, setname] = useState(recipeDetail.name);
  const [serves, setServes] = useState(recipeDetail.serves);
  const [recipeInstructions, setRecipeInstructions] = useState(recipeDetail.instructions);
  const [allIngredients, setAllIngredients] = useState(recipeDetail.ingredients)
  //individual ingredient info states
  // const [ingredientName, setIngredientName] = useState(recipeDetail.ingredients.name);
  const [quantity, setQuantity] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");

  const authCtx = useContext(AuthContext);


  useEffect(() => {
    getRecipeDetail();
  }, []);

  const handleEdit = () => {

  }

  // console.log(recipeInstructions);

  
  return (
      !editing ? ( <div style={{marginTop: "70px"}}>
      <Typography variant="h4">{recipeDetail.name}</Typography>
      <Typography variant="subtitle1">Serves: {recipeDetail.serves}</Typography>
      <Typography>Instructions: {recipeDetail.instructions}</Typography>
      <Typography>Contributor: {recipeDetail?.user?.username}</Typography>

      {+recipeDetail?.user?.id === +authCtx?.userId && 
      <Button variant="contained" color="primary" onClick={() => setEditing(true)}>Edit</Button>}
    </div>) :(
        <form>
          <label htmlFor="">Name: </label>
          <input type="text" value={recipeDetail.name}/>
          <label htmlFor="">Serves: </label>
          <input type="text" value={recipeDetail.serves}/>
          <label htmlFor="">Instructions: </label>
          {/* <textarea type="text" value={recipeDetail.instructions}/> */}
          <br />
          {+recipeDetail?.ingredients?.length > 0 && recipeDetail?.ingredients?.map((ing) => {
            <div>
              <input type="text" value={ing?.name} />
              <input type="text" value={ing?.quantity} />
              <input type="text" value={ing?.carbs} />
              <input type="text" value={ing?.fat} />
              <input type="text" value={ing?.protein} />
            </div>
          }) }

          
        </form>
      ) 
    
  );
};

export default RecipeDetails;



//code for editing
{/* <TextField
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
        </Button> */}