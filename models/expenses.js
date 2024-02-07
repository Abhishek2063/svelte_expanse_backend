"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expenses.init(
    {
      amount: DataTypes.DECIMAL(10, 2),
      description: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Expenses",
      tableName: "expenses",
      createdAt: "created_at", // Specify the createdAt field name
      updatedAt: "updated_at", // Specify the updatedAt field name
    }
  );
  return Expenses;
};
