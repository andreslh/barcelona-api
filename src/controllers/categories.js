const { Category, Subcategory } = require('../models');

const get = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id: id },
      include: [{ model: Subcategory }],
    });
    if (category) {
      return res.status(200).json({ category });
    }
    return res
      .status(404)
      .send('Category with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json({ category });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  get,
  getById,
  post,
};
