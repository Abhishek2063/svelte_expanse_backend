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
    });
    return { count, rows };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createIncome,
  getIncomeListByUserId,
};
