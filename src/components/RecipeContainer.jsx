import React, { useContext } from "react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import RecipeCard from "./RecipeCard";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AuthContext from "../store/authContext";

const RecipeContainer = ({ recipes }) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const authCtx = useContext(AuthContext);
  const searchDisplay = recipes
    .filter((recipe) => {
      if (toggle) {
        return (
          recipe.name.toLowerCase().includes(search.toLowerCase()) &&
          +recipe.userId === +authCtx.userId
        );
      } else {
        return (
          recipe.name.toLowerCase().includes(search.toLowerCase()) && recipe
        );
      }
    })
    .map((recipe) => <RecipeCard recipe={recipe} />);
  return (
    <div>
      <FormControlLabel
        onClick={() => setToggle(!toggle)}
        control={<Switch {...label} checked={toggle} color="warning" />}
        label="My Recipes"
      />
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
