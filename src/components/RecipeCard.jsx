import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";

import cx from "clsx";

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 40,
    borderRadius: spacing(3),
    transition: "0.3s",
    width: "90%",
    overflow: "initial",
    background: "#ffffff",
    padding: "10px",
  },
  content: {
    paddingTop: 0,
    textAlign: "left",
    overflowX: "hidden",
  },
  headerText: {
    color: "black",
    padding: "5px",
  },
}));

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };
  const classes = useStyles();

  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });

  const fatCalories = recipe.ingredients.reduce((acc, ing) => {
    return acc + +ing?.fat * 9;
  }, 0);
  const carbCalories = recipe.ingredients.reduce((acc, ing) => {
    return acc + +ing?.carbs * 4;
  }, 0);
  const proteinCalories = recipe.ingredients.reduce((acc, ing) => {
    return acc + +ing?.protein * 4;
  }, 0);
  const totalCalories = +fatCalories + +carbCalories + +proteinCalories;
  const carbPercent = ((+carbCalories / +totalCalories) * 100).toFixed(0);
  const fatPercent = ((+fatCalories / +totalCalories) * 100).toFixed(0);
  const proteinPercent = 100 - carbPercent - fatPercent;
  return (
    <Card className={cx(classes.card, cardShadowStyles.root)}>
      <Typography variant="h2" className={classes.headerText}>
        {recipe.name}
      </Typography>

      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          
        }}
      >
        
        <Typography variant="h4" component="h2">
          {(totalCalories / recipe.serves).toFixed(0)} cal
        </Typography>
        <Typography variant="h6" component="h2">
          {carbPercent}C/{fatPercent}F/{proteinPercent}P
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            
          }}
        >
          
            <Button variant="contained" color="primary" onClick={handleClick}>
              See More
            </Button>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
