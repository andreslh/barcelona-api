const { Category } = require('../models');
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json({
      category,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createCategory,
};
