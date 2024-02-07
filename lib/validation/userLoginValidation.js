const validator = require("validator");

const validateUserLoginInput = ({ email, password }) => {
  const errors = [];

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

module.exports = validateUserLoginInput;
