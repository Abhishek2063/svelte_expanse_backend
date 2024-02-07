const sendResponse = require("../utils/response");
const db = require("../models");
const { Op } = require("sequelize");

const getDashboardData = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { start_date = "", end_date = "" } = req.query;
    const startDate = start_date ? new Date(start_date) : new Date();
    const endDate = end_date
      ? new Date(end_date)
      : new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() - 1));

    // Calculate total income
    const totalIncome = await db.Incomes.sum("amount", {
      where: {
        user_id,
        date: { [Op.between]: [endDate,startDate] },
      },
    });

    // Calculate total expense
    const totalExpense = await db.Expenses.sum("amount", {
      where: {
        user_id,
        date: { [Op.between]: [endDate,startDate] },
      },
    });

    // Calculate balance
    const balance = totalIncome - totalExpense;

    sendResponse(res, 200, true, "Dashboard data retrieved successfully", {
      total_income: totalIncome,
      total_expense: totalExpense,
      balance: balance,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = {
  getDashboardData,
};
