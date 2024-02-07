// services/userService.js
const validateUserInput = require("../lib/validation/userStoreValidation");
const  db  = require("../models"); // Assuming you have defined your User model
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const {
      first_name = "",
      last_name = "",
      email = "",
      password = "",
    } = userData;
    // Validate user input and check for errors
    const validationErrors = validateUserInput({
      first_name,
      last_name,
      email,
      password,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return {
        success: false,
        status_code: 400,
        message: "Validation errors",
        data: validationErrors,
      };
    }

    // Check if the email already exists in the database
    if (email) {
      const existingUser = await db.User.findOne({
        where: { email },
      });

      // If the email is already taken, return an error response
      if (existingUser) {
        return {
          success: false,
          status_code: 400,
          message: "User different email. It is already exist.",
        };
      }
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    return {
      success: true,
      status_code: 200,
      message: "user created successfully.",
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      status_code: 500,
      message: "internal server error",
      data: error.message,
    };
  }
};

module.exports = {
  createUser,
};
