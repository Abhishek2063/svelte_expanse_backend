// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

// POST /api/users/create
router.post("/create", userController.createUser);

// POST /api/users/login
router.post("/login", userController.loginUser);

// GET /api/users/:id
router.get("/:id", verifyToken, userController.getUserById);

// POST /api/users/logout/:id
router.post("/logout/:id", verifyToken, userController.logoutUserById);

module.exports = router;
