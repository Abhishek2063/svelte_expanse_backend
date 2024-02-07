// controllers/userController.js
const validateUserLoginInput = require("../lib/validation/userLoginValidation");
const userService = require("../services/userService");
const sendResponse = require("../utils/response");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    if (newUser) {
      sendResponse(
        res,
        newUser.status_code,
        newUser.success,
        newUser.message,
        newUser.data
      );
    }
  } catch (error) {
    sendResponse(res, 500, false, "Error creating user", null);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input and check for errors
    const validationErrors = validateUserLoginInput({
      email,
      password,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(
        res,
        404,
        false,
        "Validation errors",
        validationErrors
      );
    }

    // Check if the email exists
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return sendResponse(res, 404, false, "User not found", null);
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, false, "Invalid password", null);
    }

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Update user with token
    await userService.updateUserToken(user.id, token);

    // Return success response with token
    sendResponse(res, 200, true, "Login successful", { token });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

// controllers/userController.js
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the email exists
    const user = await userService.getUserById(id);
    sendResponse(res, 200, true, "User details retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById
};
