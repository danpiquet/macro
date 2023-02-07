const { sequelize } = require("../util/database");
const { DataTypes } = require("sequelize");

module.exports = {
  Recipe: sequelize.define("recipe", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    serves: DataTypes.INTEGER,
  }),
};
