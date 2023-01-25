require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { SERVER_PORT } = process.env;
const { User } = require("./models/user");
const { Recipe } = require("./models/recipe");
const { Ingredient } = require("./models/ingredient");
const { sequelize } = require("./util/database");

const { register, login } = require("./controllers/authCtrl");
const {getAllUserRecipes, getAllRecipes, addRecipe, getRecipe} = require('./controllers/recipeCtrl')

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Recipe);
Recipe.belongsTo(User);

Recipe.hasMany(Ingredient);
Ingredient.belongsTo(Recipe);

app.post("/api/register", register);
app.post("/api/login", login);

app.get("/api/recipes", getAllRecipes);
app.post('/api/recipes', addRecipe)
app.get('/api/recipes/:id', getRecipe)

app.get('/api/recipes/:userId', getAllUserRecipes)



sequelize
  .sync()
  // do not uncomment unless you want to wipe and reset the db
    // .sync({force:true})
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`Docked at port ${SERVER_PORT}`));
  })
  .catch((err) => console.log(err));
