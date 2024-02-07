const { validateIncomeInput } = require("../lib/validation/incomeValidation");
const incomeService = require("../services/incomeService");
const sendResponse = require("../utils/response");
const createIncome = async (req, res) => {
  try {
    const { amount, description, category_id, user_id, date } = req.body;
    // Validate input
    const errors = validateIncomeInput({
      amount,
      description,
      category_id,
      user_id,
      date,
    });
    if (errors.length > 0) {
      return sendResponse(res, 400, false, "Validation errors", errors);
    }

    // Create income
    const newIncome = await incomeService.createIncome({
      amount,
      description,
      category_id,
      user_id,
      date,
    });

    sendResponse(res, 201, true, "Income created successfully", newIncome);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = {
  createIncome,
};
