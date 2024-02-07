const db = require("../models");

const createCategory = async ({ name, type, user_id }) => {
  try {
    const newCategory = await db.Category.create({
      user_id: user_id,
      name: name,
      type: type,
    });
    return {
      success: true,
      status_code: 200,
      message: "Category created successfully.",
      data: newCategory,
    };
  } catch (error) {
    return {
      success: false,
      status_code: 500,
      message: "internal server error",
      data: error.message,
    };
  }
};

module.exports = {
  createCategory,
};
