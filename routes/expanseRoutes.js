// routes/incomeRoutes.js
const express = require("express");
const router = express.Router();
const expansesController = require("../controllers/expansesController");
const verifyToken = require("../middlewares/authMiddleware");

// POST /api/expenses/create
router.post("/create", verifyToken, expansesController.createExpenses);

// GET /api/expenses/list/:user_id
router.get(
  "/list/:user_id",
  verifyToken,
  expansesController.getExpensesListByUserId
);

// PUT /api/expenses/update/:id
router.put("/update/:id", verifyToken, expansesController.updateExpenses);

// DELETE /api/expenses/delete/:id
router.delete(
  "/delete/:id",
  verifyToken,
  expansesController.deleteExpensesById
);

module.exports = router;
