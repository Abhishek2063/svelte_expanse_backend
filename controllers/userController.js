// controllers/userController.js
const userService = require("../services/userService");
const sendResponse = require("../utils/response");

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
    console.log(error);
    sendResponse(res, 500, false, "Error creating user", null);
  }
};

module.exports = {
  createUser,
};
