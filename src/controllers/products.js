const { Category, Product } = require('../models');
const { validateNotRepeatedModel, handleError } = require('./validator');

const REPEATED_ERROR_MESSAGE =
  'Ya existe un producto con el nombre elegido en esta subcategoría';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Product, fields, REPEATED_ERROR_MESSAGE);

const get = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getList = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ all: true, nested: true, order: [['id', 'ASC']] }],
    });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (product) {
      return res.status(200).json({ product });
    }
    return res
      .status(404)
      .send('Product with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const { name, subcategoryId } = req.body;
    await validateNotRepeated({ name, subcategoryId });

    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subcategoryId } = req.body;
    await validateNotRepeated({ name, subcategoryId, id });

    const product = await Product.update({ ...req.body }, { where: { id } });
    if (product) {
      return res.sendStatus(200);
    }
    throw new Error('Product not found');
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  get,
  getList,
  getById,
  post,
  put,
  remove,
};
