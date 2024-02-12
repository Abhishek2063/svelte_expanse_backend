// controllers/categoryController.js
const validateCategoryCreateInput = require("../lib/validation/categoryCreateValidation");
const sendResponse = require("../utils/response");
const categoryService = require("../services/categoryService");
const createCategory = async (req, res) => {
  try {
    const { name, type, user_id } = req.body;
console.log(name, type, user_id,"name, type, user_id");
    // Validate user input and check for errors
    const validationErrors = validateCategoryCreateInput({
      name,
      type,
      user_id,
    });

    // If validation errors exist, return a response with the errors
    if (validationErrors.length > 0) {
      return sendResponse(
        res,
        404,
        false,
        "Validation errors",
        validationErrors
      );
    }

    // Create category
    const newCategory = await categoryService.createCategory({
      name,
      type,
      user_id,
    });

    sendResponse(res, 201, true, "Category created successfully", newCategory);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

const getCategoriesListByUserId = async (req, res) => {
  try {
    const { id, type } = req.params;
    // Check if the email exists
    const categoryList = await categoryService.getCategoriesListByUserId({id, type});
    sendResponse(
      res,
      200,
      true,
      "Category details retrieved successfully",
      categoryList
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, false, "Internal server error", null);
  }
};

module.exports = {
  createCategory,
  getCategoriesListByUserId,
};
