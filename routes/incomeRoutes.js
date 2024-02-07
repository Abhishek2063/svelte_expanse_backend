// routes/incomeRoutes.js
const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const verifyToken = require("../middlewares/authMiddleware");

// POST /api/incomes/create
router.post("/create", verifyToken, incomeController.createIncome);

// GET /api/incomes/list/:user_id
router.get(
  "/list/:user_id",
  verifyToken,
  incomeController.getIncomeListByUserId
);

// PUT /api/incomes/update/:id
router.put("/update/:id", verifyToken, incomeController.updateIncome);

// DELETE /api/incomes/delete/:id
router.delete("/delete/:id", verifyToken, incomeController.deleteIncomeById);

module.exports = router;
