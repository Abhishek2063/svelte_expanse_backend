const {
  validateExpensesInput,
} = require("../lib/validation/expansesValidation");
const {
  validateExpensesUpdateInput,
} = require("../lib/validation/expensesUpdateValidation");
const expanseService = require("../services/expanseService");
const sendResponse = require("../utils/response");

const createExpenses = async (req, res) => {
  try {
    const { amount, description, category_id, user_id, date } = req.body;
    // Validate input
    const errors = validateExpensesInput({
      amount,
      description,
      category_id,
      user_id,
      date,
    });
    if (errors.length > 0) {
      return sendResponse(res, 400, false, "Validation errors", errors);
    }

    // Create Expenses
    const newExpenses = await expanseService.createExpenses({
      amount,
      description,
      category_id,
      user_id,
      date,
    });

    sendResponse(res, 201, true, "Expenses created successfully", newExpenses);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

const getExpensesListByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await expanseService.getExpensesListByUserId({
      userId,
      offset,
      limit,
    });

    const totalRecords = count;
    const totalPages = Math.ceil(totalRecords / limit);

    sendResponse(res, 200, true, "Expenses list retrieved successfully", {
      page,
      limit,
      total_page: totalPages,
      total_records: totalRecords,
      records: rows,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

const updateExpenses = async (req, res) => {
  try {
    const expensesId = req.params.id;
    const { amount, description, category_id, user_id, date } = req.body;

    // Validate input
    const errors = validateExpensesUpdateInput({
      amount,
      description,
      category_id,
      user_id,
      date,
    });
    if (errors.length > 0) {
      return sendResponse(res, 400, false, "Validation errors", errors);
    }

    // Check if Expenses exists
    const expenses = await expanseService.getExpensesById(expensesId);
    if (!expenses) {
      return sendResponse(res, 404, false, "Expenses not found", null);
    }

    const updateData = {};
    if (amount) {
      updateData.amount = amount;
    }
    if (description) {
      updateData.description = description;
    }
    if (category_id) {
      updateData.category_id = category_id;
    }
    if (user_id) {
      updateData.user_id = user_id;
    }
    if (date) {
      updateData.date = new Date(date);
    }

    await expanseService.updateExpensesData({ updateData, expensesId });

    sendResponse(res, 200, true, "Expenses updated successfully", null);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

const deleteExpensesById = async (req, res) => {
  try {
    const expensesId = req.params.id;

    // Check if Expenses exists
    const expenses = await expanseService.getExpensesById(expensesId);
    if (!expenses) {
      return sendResponse(res, 404, false, "ExpensesId not found", null);
    }

    // Delete ExpensesId
    await expenses.destroy();

    sendResponse(res, 200, true, "Expenses deleted successfully", null);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = {
  createExpenses,
  getExpensesListByUserId,
  updateExpenses,
  deleteExpensesById,
};
