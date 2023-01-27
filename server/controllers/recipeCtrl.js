const { Recipe } = require("../models/recipe");
const { User } = require("../models/user");
const { Ingredient } = require("../models/ingredient");

module.exports = {
  getAllUserRecipes: async (req, res) => {
    try {
      const { userId } = req.params;
      const recipes = await Recipe.findAll({
        where: { userId: +userId },
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
        ],
      });
      return res.status(200).send(recipes);
    } catch (err) {
      console.log("getAllUserRecipes error: ", err);
      return res.sendStatus(400);
    }
    console.log("getAllUserRecipes function");
  },
  addRecipe: async (req, res) => {
    try {
      const { name, instructions, serves, userId, allIngredients } = req.body;
      const newRecipe = await Recipe.create({
        name: name,
        instructions: instructions,
        serves: serves,
        userId: userId,
      });
      const newArr = allIngredients.map((ing) => {
        ing.recipeId = newRecipe.id;
        return ing;
      });
      console.log('newArr',newArr)
      await Ingredient.bulkCreate(newArr);
      const recipeDetails = await Recipe.findOne({
        where: { id: newRecipe.id },
        include: {
          model: Ingredient,
        },
      });
      return res.status(200).send(recipeDetails);
    } catch (err) {
      console.log("addRecipe error: ", err);
      return res.sendStatus(400);
    }
    console.log("addRecipe function");
  },
  getAllRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.findAll({
        include: [{ model: User, required: true, attributes: ["username"] }],
      });
      return res.status(200).send(recipes);
    } catch (err) {
      console.log("getAllRecipes error: ", err);
      return res.sendStatus(400);
    }
    console.log("getAllRecipes function");
  },
  getRecipe: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const recipe = await Recipe.findOne({
        where: { id },
        attributes: ["name", "instructions", "serves", "userId"],
        include: [
          {
            model: User,
            required: true,
            attributes: ["username"],
          },
          {
            model: Ingredient,
            required: true,
            attributes: ["name", "quantity"],
          },
        ],
      });
      return res.status(200).send(recipe);
    } catch (err) {
      console.log("getRecipe error: ", err);
      return res.sendStatus(400);
    }
    console.log("getRecipe function");
  },
};
