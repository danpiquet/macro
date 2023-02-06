import React from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import { useContainedCardHeaderStyles } from "@mui-treasury/styles/cardHeader/contained";
import { useSoftRiseShadowStyles } from "@mui-treasury/styles/shadow/softRise";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";

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
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
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
    <Card className={classes.root}>
      <CardHeader
        style={{ width: "100%" }}
        className={cardHeaderShadowStyles.root}
        classes={cardHeaderStyles}
        title={recipe.name}
      />
      <CardContent>
        {/* <Typography variant="h2" component="h2">
          {recipe.name}
        </Typography> */}
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