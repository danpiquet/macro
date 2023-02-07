import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import { TextField, Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AuthContext from "../store/authContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const AddRecipe = () => {
  //main recipe info states
  const [name, setname] = useState("");
  const [serves, setServes] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  //individual ingredient info states
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [protein, setProtein] = useState("");

  const navigate = useNavigate();

  const addIngredients = () => {
    setAllIngredients([
      ...allIngredients,
      { name: ingredientName, quantity, carbs, fat, protein },
    ]);
    setIngredientName("");
    setQuantity("");
    setCarbs("");
    setFat("");
    setProtein("");
  };

  const initialValues = {
    name: "",
    serves: "",
    allIngredients: [],
    instructions: "",
  };

  const authCtx = useContext(AuthContext);
  const onSubmit = (values) => {
    values.allIngredients = allIngredients;
    values.userId = authCtx.userId;
    values.name = name;
    values.serves = serves;
    axios
      .post("/api/recipes", values)
      .then((res) => {
        navigate(`/recipes/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (name, index, value) => {
    const newState = [...allIngredients];
    newState[index][`${name}`] = value;
    setAllIngredients(newState);
  };

  const handleDelete = (index) => {
    const newState = [...allIngredients];
    newState.splice(index, 1);
    setAllIngredients(newState);
  };

  const ingredientsDisplay = allIngredients.map((ing, index) => {
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

  const totalCalories = allIngredients.reduce((acc, ing) => {
    return acc + ing.carbs * 4 + ing.protein * 4 + ing.fat * 9;
  }, 0);
  const carbPercent = allIngredients.reduce((acc, ing) => {
    return acc + ((ing.carbs * 4) / totalCalories) * 100;
  }, 0);
  const fatPercent = allIngredients.reduce((acc, ing) => {
    return acc + ((ing.fat * 9) / totalCalories) * 100;
  }, 0);
  const proteinPercent = allIngredients.reduce((acc, ing) => {
    return acc + ((ing.protein * 4) / totalCalories) * 100;
  }, 0);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        <div>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button color="primary">Back to recipes</Button>
          </Link>
        </div>

        {name && (
          <div>
            <Paper style={{ padding: "10px" }}>
              <Typography variant="h2" style={{ margin: ".1em 0" }}>
                {name}
              </Typography>
            </Paper>
          </div>
        )}
        {+totalCalories > 0 && (
          <Typography variant="h3" style={{ margin: ".1em 0" }}>
            {allIngredients.length === 0
              ? "0 cal "
              : serves === ""
              ? Math.floor(+totalCalories)
              : Math.floor(+totalCalories / +serves) + " cal"}
            <br />
          </Typography>
        )}
        {totalCalories > 0 && (
          <Typography variant="h5" style={{ margin: ".5em 0" }}>
            {+carbPercent.toFixed(0)}C/{+fatPercent.toFixed(0)}F/
            {allIngredients.length === 0
              ? "0P"
              : 100 - (+carbPercent.toFixed(0) + +fatPercent.toFixed(0)) + "P"}
          </Typography>
        )}
      </div>

      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, handleSubmit }) => {
            return (
              <form
                onSubmit={handleSubmit}
                style={{ width: "60%", margin: "auto" }}
              >
                <Paper style={{ padding: "5px", marginBottom: "20px" }}>
                  <div>
                    <TextField
                      placeholder="recipe name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      name="name"
                      fullWidth
                    />
                  </div>

                  <div>
                    <TextField
                      placeholder="serves"
                      value={serves}
                      onChange={(e) => setServes(e.target.value)}
                      name="serves"
                      fullWidth
                    />
                  </div>

                  <TextField
                    placeholder="recipe  instructions"
                    name="instructions"
                    value={values.instructions}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    minRows={10}
                  />
                  <div>
                    <TextField
                      placeholder="ingredient"
                      value={ingredientName}
                      onChange={(e) => setIngredientName(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      placeholder="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      placeholder="carb grams"
                      value={carbs}
                      onChange={(e) => setCarbs(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      placeholder="fat grams"
                      value={fat}
                      onChange={(e) => setFat(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      placeholder="protein grams"
                      value={protein}
                      onChange={(e) => setProtein(e.target.value)}
                      fullWidth
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="button"
                        onClick={() => addIngredients()}
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        Add to List
                      </Button>
                    </div>
                  </div>
                </Paper>

                <Paper>
                  <div>
                    <Typography
                      variant="h5"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      {ingredientsDisplay.length > 0 && "Current Ingredients"}
                    </Typography>
                    <div>{ingredientsDisplay}</div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {ingredientsDisplay.length > 0 && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        Save Recipe
                      </Button>
                    )}
                  </div>
                </Paper>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddRecipe;
