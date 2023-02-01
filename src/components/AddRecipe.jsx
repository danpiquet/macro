// import axios from "axios";
// import React, { useContext, useState } from "react";
// import { Navigate, NavLink, useNavigate } from "react-router-dom";
// import { Formik } from "formik";
// import AuthContext from "../store/authContext";

// const AddRecipe = () => {
//   //main recipe info states
//   const [name, setname] = useState("");
//   const [serves, setServes] = useState("");
//   const [recipeInstructions, setRecipeInstructions] = useState("");
//   const [allIngredients, setAllIngredients] = useState([]);
//   //individual ingredient info states
//   const [ingredientName, setIngredientName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [carbs, setCarbs] = useState("");
//   const [fat, setFat] = useState("");
//   const [protein, setProtein] = useState("");

//   const navigate = useNavigate();

//   const addIngredients = () => {
//     setAllIngredients([
//       ...allIngredients,
//       { name: ingredientName, quantity, carbs, fat, protein },
//     ]);
//     console.log(allIngredients);
//     setIngredientName("");
//     setQuantity("");
//     setCarbs("");
//     setFat("");
//     setProtein("");
//   };

//   const initialValues = {
//     name: "",
//     serves: "",
//     allIngredients: [],
//     instructions: "",
//   };

//   const authCtx = useContext(AuthContext);
//   const onSubmit = (values) => {
//     values.allIngredients = allIngredients;
//     values.userId = authCtx.userId;
//     console.log(values);
//     values.name = name;
//     values.serves = serves;
//     axios
//       .post("/api/recipes", values)
//       .then((res) => {
//         console.log(res.data);
//         navigate(`/recipes/${res.data.id}`);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleInputChange = (name, index, value) => {
//     const newState = [...allIngredients];
//     newState[index][`${name}`] = value;
//     setAllIngredients(newState);
//   };

//   const handleDelete = (index) => {
//     const newState = [...allIngredients];
//     newState.splice(index, 1);
//     setAllIngredients(newState);
//   };

//   const ingredientsDisplay = allIngredients.map((ing, index) => {
//     return (
//       <div key={index}>
//         <button onClick={() => handleDelete()}>x</button>
//         <input
//           onChange={(e) =>
//             handleInputChange(e.target.name, index, e.target.value)
//           }
//           name="ingredientName"
//           type="text"
//           value={ing.name}
//         />
//         <input
//           onChange={(e) =>
//             handleInputChange(e.target.name, index, e.target.value)
//           }
//           name="quantity"
//           type="text"
//           value={ing.quantity}
//         />
//         <input
//           onChange={(e) =>
//             handleInputChange(e.target.name, index, e.target.value)
//           }
//           name="carbs"
//           type="number"
//           value={ing.carbs}
//         />
//         <input
//           onChange={(e) =>
//             handleInputChange(e.target.name, index, e.target.value)
//           }
//           name="fat"
//           type="number"
//           value={ing.fat}
//         />
//         <input
//           onChange={(e) =>
//             handleInputChange(e.target.name, index, e.target.value)
//           }
//           name="protein"
//           type="number"
//           value={ing.protein}
//         />
//       </div>
//     );
//   });

//   const totalCalories = allIngredients.reduce((acc, ing) => {
//     return acc + ing.carbs * 4 + ing.protein * 4 + ing.fat * 9;
//   }, 0);
//   const carbPercent = allIngredients.reduce((acc, ing) => {
//     return acc + ((ing.carbs * 4) / totalCalories) * 100;
//   }, 0);
//   const fatPercent = allIngredients.reduce((acc, ing) => {
//     return acc + ((ing.fat * 9) / totalCalories) * 100;
//   }, 0);
//   const proteinPercent = allIngredients.reduce((acc, ing) => {
//     return acc + ((ing.protein * 4) / totalCalories) * 100;
//   }, 0);

//   console.log(allIngredients);

//   return (
//     <div>
//       <NavLink to="/home">Back to recipes</NavLink>
//       <h1>{name}</h1>

//       <h2>
//         {allIngredients.length === 0
//           ? "0"
//           : serves === ""
//           ? Math.floor(+totalCalories)
//           : Math.floor(+totalCalories / +serves)}{" "}
//         cal at <br />
//         {carbPercent.toFixed(0)}C/{fatPercent.toFixed(0)}F/
//         {allIngredients.length === 0
//           ? "0"
//           : 100 - (+carbPercent.toFixed(0) + +fatPercent.toFixed(0))}
//         P
//       </h2>
//       <div>
//         <Formik initialValues={initialValues} onSubmit={onSubmit}>
//           {({ values, handleChange, handleSubmit }) => {
//             return (
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <input
//                     placeholder="recipe name"
//                     value={name}
//                     onChange={(e) => setname(e.target.value)}
//                     name="name"
//                   />
//                 </div>

//                 <div>
//                   <input
//                     placeholder="serves"
//                     value={serves}
//                     onChange={(e) => setServes(e.target.value)}
//                     name="serves"
//                   />
//                 </div>
//                 <p>{!serves ? "how many does it serve?" : null}</p>

//                 <textarea
//                   placeholder="recipe  instructions"
//                   name="instructions"
//                   value={values.instructions}
//                   cols="30"
//                   rows="10"
//                   onChange={handleChange}
//                 ></textarea>
//                 <div>
//                   <input
//                     placeholder="ingredient"
//                     value={ingredientName}
//                     onChange={(e) => setIngredientName(e.target.value)}
//                   />
//                   <input
//                     placeholder="quantity"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                   <input
//                     placeholder="carb grams"
//                     value={carbs}
//                     onChange={(e) => setCarbs(e.target.value)}
//                   />
//                   <input
//                     placeholder="fat grams"
//                     value={fat}
//                     onChange={(e) => setFat(e.target.value)}
//                   />
//                   <input
//                     placeholder="protein grams"
//                     value={protein}
//                     onChange={(e) => setProtein(e.target.value)}
//                   />
//                   <button type="button" onClick={() => addIngredients()}>
//                     +
//                   </button>
//                 </div>

//                 <div>
//                   <h3>current ingredients</h3>
//                   <div>{ingredientsDisplay}</div>
//                 </div>

//                 <div>
//                   <button type="submit">Save Recipe</button>
//                 </div>
//               </form>
//             );
//           }}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddRecipe;

////////////////////////////////////////////////////////////////////////////////////////////////

import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, NavLink, useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField, Button, IconButton, Alert } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AuthContext from "../store/authContext";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const AddRecipe = () => {
  //main recipe info states
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

  const navigate = useNavigate();

  const addIngredients = () => {
    setAllIngredients([
      ...allIngredients,
      { name: ingredientName, quantity, carbs, fat, protein },
    ]);
    console.log(allIngredients);
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
    console.log(values);
    values.name = name;
    values.serves = serves;
    axios
      .post("/api/recipes", values)
      .then((res) => {
        console.log(res.data);
        navigate(`/recipes/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (name, index, value) => {
    console.log(name, index, value);
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
    console.log(ing);
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
            console.log("hit name");
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

  // console.log(allIngredients);
  // const useStyles = makeStyles((theme) => ({
  //   stickyButton: {
  //     position: "static",
  //     bottom: theme.spacing(2),
  //     right: theme.spacing(2),
  //   },
  // }));
  // const classes = useStyles();
  return (
    <div>
      <div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button color="primary" style={{ marginTop: "65px" }}>
            Back to recipes
          </Button>
        </Link>
        {name && (
          <Typography variant="h2" style={{ margin: ".1em 0" }}>
            Recipe: {name}
          </Typography>
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
                <p>{!serves && "how many does it serve?"}</p>

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
                  <Button
                    type="button"
                    onClick={() => addIngredients()}
                    variant="contained"
                    color="primary"
                  >
                    Add to List
                  </Button>
                </div>

                <div>
                  <h3>current ingredients</h3>
                  <div>{ingredientsDisplay}</div>
                </div>

                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Save Recipe
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddRecipe;
