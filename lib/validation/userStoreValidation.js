const validator = require("validator");

const validateUserInput = ({
  first_name,
  last_name,
  email,
  password,
}) => {
  const errors = [];

  // Validate first_name
  if (!validator.isLength(first_name, { min: 1, max: 50 })) {
    errors.push("First Name Must Be Between 1 and 50 Characters");
  }

  // Validate last_name
  if (last_name && !validator.isLength(last_name, { min: 1, max: 50 })) {
    errors.push("Last Name Must Be Between 1 and 50 Characters");
  }

  // Validate email
  if (
    !validator.isLength(email, { min: 1, max: 255 }) ||
    !validator.isEmail(email)
  ) {
    errors.push("Invalid Email Address");
  }

  // Validate password
  if (!validator.isLength(password, { min: 8, max: 25 })) {
    errors.push("Password Must Be Between 8 and 25 Characters");
  }

  return errors;
};

module.exports = validateUserInput;