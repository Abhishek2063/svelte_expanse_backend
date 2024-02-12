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


    return errors;
};

module.exports = validateCategoryCreateInput;
