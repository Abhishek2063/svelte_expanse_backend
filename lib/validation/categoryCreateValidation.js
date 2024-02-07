const validator = require("validator");

const validateCategoryCreateInput = ({ name, type, user_id }) => {
    const errors = [];

    // Validate name
    if (!name || validator.isEmpty(name)) {
        errors.push("Name field is required");
    }

    // Validate type
    if (!type || validator.isEmpty(type)) {
        errors.push("Type field is required");
    }

    // Validate user_id
    if (!user_id || !validator.isNumeric(user_id)) {
        errors.push("User ID must be a numeric value");
    }

    return errors;
};

module.exports = validateCategoryCreateInput;
