// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const db = require("../models");
const sendResponse = require("../utils/response");
const dotenv = require("dotenv");

dotenv.config();
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return sendResponse(res, 401, false, "No token provided", null);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findOne({ where: { id: decoded.user.id, token } });

    if (!user) {
      return sendResponse(res, 401, false, "Invalid token", null);
    }

    next();
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = verifyToken;
