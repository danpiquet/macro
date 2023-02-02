import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import RecipeCard from "./RecipeCard";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import AuthContext from "../store/authContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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
  // const [searchDisplay, setSearchDisplay] = useState([]);

  const authCtx = useContext(AuthContext);
  console.log("login userRecipe status:", authCtx.userRecipes);
  // useEffect(() => {
  //   console.log('hit useEffect')
    const searchDisplay = recipes
      .filter((recipe) => {
        if (authCtx.userRecipes === true) {
          console.log("truthy");
          return (
            recipe.name.toLowerCase().includes(authCtx.search.toLowerCase()) &&
            +recipe.userId === +authCtx.userId
          );
        } else {
          console.log("falsey");
          return (
            recipe.name.toLowerCase().includes(authCtx.search.toLowerCase()) &&
            recipe
          );
        }
      })
      .map((recipe) => <RecipeCard recipe={recipe} />);
      // setSearchDisplay(searchDisplayResult)
  // }, [authCtx.userRecipes]);

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
            marginTop: "30px",
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

////////////////////////////////////////////////////////////////////////////////////////
// import React, { useContext } from "react";
// import { useState } from "react";
// import { BiSearchAlt2 } from "react-icons/bi";
// import RecipeCard from "./RecipeCard";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import AuthContext from "../store/authContext";

// const RecipeContainer = ({ recipes }) => {
//   const [search, setSearch] = useState("");
//   const [toggle, setToggle] = useState(false);
//   const label = { inputProps: { "aria-label": "Switch demo" } };

//   const authCtx = useContext(AuthContext);
//   const searchDisplay = recipes
//     .filter((recipe) => {
//       if (toggle) {
//         return (
//           recipe.name.toLowerCase().includes(search.toLowerCase()) &&
//           +recipe.userId === +authCtx.userId
//         );
//       } else {
//         return (
//           recipe.name.toLowerCase().includes(search.toLowerCase()) && recipe
//         );
//       }
//     })
//     .map((recipe) => <RecipeCard recipe={recipe} />);

//   return (
//     <div>
//       <FormControlLabel
//         onClick={() => setToggle(!toggle)}
//         control={<Switch {...label} checked={toggle} color="warning" />}
//         label="My Recipes"
//       />
//       <span>
//         <BiSearchAlt2 />
//         <input
//           type="text"
//           value={search}
//           placeholder="search for a recipe"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </span>
//       <div>{searchDisplay}</div>
//     </div>
//   );
// };

// export default RecipeContainer;
