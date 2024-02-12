const validator = require("validator");

const validateIncomeInput = ({
  amount,
  description,
  category_id,
  user_id,
  date,
}) => {
  const errors = [];

  // Validate amount
  if (!validator.isDecimal(amount)) {
    errors.push("Amount must be a decimal number");
  }

  // Validate description
  // Validate type
  if (!description || validator.isEmpty(description)) {
    errors.push("Description field is required");
  }





  // Validate date
  if (!validator.isISO8601(date)) {
    errors.push("Date must be in ISO 8601 format (YYYY-MM-DD)");
  }

  return errors;
};

module.exports = {
  validateIncomeInput,
};
