import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
});

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };
  const classes = useStyles();
  const fatCalories = recipe.ingredients.reduce((acc, ing) => {
    return acc + +ing?.fat * 9
  },0)
  const carbCalories = recipe.ingredients.reduce((acc, ing) => {
    return acc + +ing?.carbs * 4
  },0)
  const proteinCalories = recipe.ingredients.reduce((acc, ing) => {
    return acc + +ing?.protein * 4
  },0)
  const totalCalories = +fatCalories + +carbCalories + +proteinCalories
  const carbPercent = ((+carbCalories / +totalCalories) *100).toFixed(0)
  const fatPercent = ((+fatCalories / +totalCalories) *100).toFixed(0)
  const proteinPercent = 100-carbPercent-fatPercent
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {recipe.name}
        </Typography>
        <Typography variant="h6" component="h2">
          {totalCalories} cal
        </Typography>
        <Typography variant="h6" component="h2">
          {carbPercent}C/{fatPercent}F/{proteinPercent}P
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          See More
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;

//without material ui
// import React from "react";
// import { useNavigate } from "react-router-dom";

// import Button from '@mui/material/Button';

// const RecipeCard = ({ recipe }) => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate(`/recipes/${recipe.id}`);
//   };
  // const fatCalories = recipe.ingredients.reduce((acc, ing) => {
  //   return acc + ing.fat * 9
  // },0)
  // const carbCalories = recipe.ingredients.reduce((acc, ing) => {
  //   return acc + ing.carb * 4
  // },0)
  // const proteinCalories = recipe.ingredients.reduce((acc, ing) => {
  //   return acc + ing.protein * 4
  // },0)
  // const totalCalories = +fatCalories + +carbCalories + +proteinCalories
//   console.log(totalCalories)
//   return (
//     <div>
//       <h1>{recipe.name}</h1>
//       <h2>{totalCalories} cal</h2>
//       <Button variant="contained" onClick={() => handleClick()}>See More</Button>
//     </div>
//   );
// };

// export default RecipeCard;