const db = require("../models");
const createIncome = async ({
  amount,
  description,
  category_id,
  user_id,
  date,
}) => {
  try {
    const newIncome = await db.Incomes.create({
      amount,
      description,
      category_id,
      user_id,
      date: new Date(date),
    });
    return newIncome;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getIncomeListByUserId = async ({ userId, offset, limit }) => {
  try {
    const { count, rows } = await db.Incomes.findAndCountAll({
      where: { user_id: userId },
      offset,
      limit,
      order: [['date', 'DESC']]
    });
    return { count, rows };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get user by id
const getIncomeById = async (id) => {
  try {
    const income = await db.Incomes.findByPk(id);
    return income;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update user token
const updateIncomeData = async ({ updateData, incomeId }) => {
  try {
    const update_data = await db.Incomes.update(
      updateData ,
      { where: { id: incomeId } }
    );
    return update_data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createIncome,
  getIncomeListByUserId,
  getIncomeById,
  updateIncomeData,
};
