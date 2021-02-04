const { Category, Product } = require('../models');

const get = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getList = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ all: true, nested: true }],
    });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id: id } });
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
    const product = await Product.create(req.body);
    return res.status(201).json({ product });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.update(
      { ...req.body },
      { where: { id: id } }
    );
    if (product) {
      return res.sendStatus(200);
    }
    throw new Error('Product not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id: id } });
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
