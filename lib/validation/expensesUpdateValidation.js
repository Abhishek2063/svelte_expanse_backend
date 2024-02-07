const validator = require("validator");

const validateExpensesUpdateInput = ({
  amount,
  description,
  category_id,
  user_id,
  date,
}) => {
  const errors = [];

  // Validate amount
  if (amount && !validator.isDecimal(amount)) {
    errors.push("Amount must be a decimal number");
  }

  // Validate description
  // Validate type
  if (description && validator.isEmpty(description)) {
    errors.push("Description field is required");
  }

  // Validate categoryId
  if (category_id && !validator.isNumeric(category_id)) {
    errors.push("Category ID must be a numeric value");
  }

  // Validate userId
  if (user_id && !validator.isNumeric(user_id)) {
    errors.push("User ID must be a numeric value");
  }

  // Validate date
  if (date && !validator.isISO8601(date)) {
    errors.push("Date must be in ISO 8601 format (YYYY-MM-DD)");
  }

  return errors;
};

module.exports = {
  validateExpensesUpdateInput,
};
