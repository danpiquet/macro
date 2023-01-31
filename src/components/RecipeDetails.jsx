import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthContext from "../store/authContext";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetail, setRecipeDetail] = useState({});
  const [editing, setEditing] = useState(false)
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

  const authCtx = useContext(AuthContext);

  const getRecipeDetail = () => {
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

  const handleEdit = () => {

  }

  console.log(recipeDetail);
  
  
  return (
      !editing ? (<div>
        <h1>{recipeDetail.name}</h1>
        <h2>Serves: {recipeDetail.serves}</h2>
        <p>Instructions: {recipeDetail.instructions}</p>
        <p>Contributor: {recipeDetail?.user?.username}</p>
  
        {+recipeDetail?.user?.id === +authCtx?.userId && 
        <button onClick={() => setEditing(true)}>edit</button>}
      </div>) :(
        <form>
          <label htmlFor="">Name: </label>
          <input type="text" value={recipeDetail.name}/>
          <label htmlFor="">Serves: </label>
          <input type="text" value={recipeDetail.serves}/>
          <label htmlFor="">Instructions: </label>
          <textarea type="text" value={recipeDetail.instructions}/>
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
