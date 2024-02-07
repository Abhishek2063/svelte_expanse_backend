"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING(50),
      last_name: DataTypes.STRING(50),
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: DataTypes.STRING(1000),
      token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      createdAt: "created_at", // Specify the createdAt field name
      updatedAt: "updated_at", // Specify the updatedAt field name
    }
  );
  return User;
};

