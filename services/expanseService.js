const db = require("../models");
const createExpenses = async ({
  amount,
  description,
  category_id,
  user_id,
  date,
}) => {
  try {
    const newExpenses = await db.Expenses.create({
      amount,
      description,
      category_id,
      user_id,
      date: new Date(date),
    });
    return newExpenses;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpensesListByUserId = async ({ userId, offset, limit }) => {
  try {
    const { count, rows } = await db.Expenses.findAndCountAll({
      where: { user_id: userId },
      offset,
      limit,
    });
    return { count, rows };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getExpensesById = async (id) => {
  try {
    const expenses = await db.Expenses.findByPk(id);
    return expenses;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update user token
const updateExpensesData = async ({ updateData, expensesId }) => {
  try {
    const update_data = await db.Expenses.update(updateData, {
      where: { id: expensesId },
    });
    return update_data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createExpenses,
  getExpensesListByUserId,
  getExpensesById,
  updateExpensesData,
};
