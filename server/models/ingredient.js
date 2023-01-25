const { sequelize } = require("../util/database");
const { DataTypes } = require('sequelize');

module.exports = {
  Ingredient: sequelize.define("ingredient", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    quantity: DataTypes.STRING,
    carbs: DataTypes.INTEGER,
    fat: DataTypes.INTEGER,
    protein: DataTypes.INTEGER,
  }),
};
