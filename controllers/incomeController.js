const {
  validateIncomeUpdateInput,
} = require("../lib/validation/incomeUpdateValidation");
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

const getIncomeListByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await incomeService.getIncomeListByUserId({
      userId,
      offset,
      limit,
    });

    const totalRecords = count;
    const totalPages = Math.ceil(totalRecords / limit);

    sendResponse(res, 200, true, "Income list retrieved successfully", {
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

const updateIncome = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const { amount, description, category_id, user_id, date } = req.body;

    // Validate input
    const errors = validateIncomeUpdateInput({
      amount,
      description,
      category_id,
      user_id,
      date,
    });
    if (errors.length > 0) {
      return sendResponse(res, 400, false, "Validation errors", errors);
    }

    // Check if income exists
    const income = await incomeService.getIncomeById(incomeId);
    if (!income) {
      return sendResponse(res, 404, false, "Income not found", null);
    }
  
    const updateData = {}
    if(amount){
      updateData.amount = amount
    }
    if(description){
      updateData.description = description
    }
    if(category_id){
      updateData.category_id = category_id
    }
    if(user_id){
      updateData.user_id = user_id
    }
    if(date){
      updateData.date =  new Date(date)
    }
    
    

     await incomeService.updateIncomeData({updateData,incomeId});

    sendResponse(res, 200, true, "Income updated successfully", null);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = {
  createIncome,
  getIncomeListByUserId,
  updateIncome,
};
