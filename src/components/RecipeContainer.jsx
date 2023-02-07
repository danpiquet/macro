import React, { useContext } from "react";
import RecipeCard from "./RecipeCard";
import AuthContext from "../store/authContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
  },
  switch: {
    marginRight: "10px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "20px 0",
  },
  searchInput: {
    border: "1px solid gray",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    width: "50%",
    marginLeft: "10px",
    "&:focus": {
      outline: "none",
    },
  },
  searchIcon: {
    fontSize: "20px",
    marginRight: "10px",
  },
  gridContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
const RecipeContainer = ({ recipes }) => {
  const authCtx = useContext(AuthContext);

  const searchDisplay = recipes
    .filter((recipe) => {
      if (authCtx.userRecipes === true) {
        return (
          recipe.name.toLowerCase().includes(authCtx.search.toLowerCase()) &&
          +recipe.userId === +authCtx.userId
        );
      } else {
        return (
          recipe.name.toLowerCase().includes(authCtx.search.toLowerCase()) &&
          recipe
        );
      }
    })
    .map((recipe) => <RecipeCard recipe={recipe} />);

  const classes = useStyles();

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <div
        style={{ width: "80%", "@media (maxWidth: 599px)": { width: "90%" } }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "20px",
            marginTop: "70px",
            "@media (maxWidth: 599px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {searchDisplay}
        </div>
      </div>
    </div>
  );
};

export default RecipeContainer;
