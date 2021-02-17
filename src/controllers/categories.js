const { Category, Subcategory } = require('../models');
const { validateNotRepeatedModel } = require('./validator');

const REPEATED_ERROR_MESSAGE = 'Ya existe una categoria con el nombre elegido';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Category, fields, REPEATED_ERROR_MESSAGE);

const handleError = (error, res) =>
  error === REPEATED_ERROR_MESSAGE
    ? res.status(400).json({ message: error })
    : res.status(500).json({ message: error.message });

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
    const { name } = req.body;
    await validateNotRepeated({ name });

    const category = await Category.create(req.body);
    return res.status(201).json({ category });
  } catch (error) {
    return handleError(error, res);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await validateNotRepeated({ name, id });

    const category = await Category.update(
      { ...req.body },
      { where: { id: id } }
    );
    if (category) {
      return res.sendStatus(200);
    }
    throw new Error('Category not found');
  } catch (error) {
    return handleError(error, res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Category not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  get,
  getById,
  post,
  put,
  remove,
};
