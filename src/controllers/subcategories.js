const { Subcategory, Product } = require('../models');

const get = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll();
    return res.status(200).json({ subcategories });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findOne({
      where: { id: id },
      include: [{ model: Product }],
    });
    if (subcategory) {
      return res.status(200).json({ subcategory });
    }
    return res
      .status(404)
      .send('Subcategory with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    return res.status(201).json({ subcategory });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.update(
      { ...req.body },
      { where: { id: id } }
    );
    if (subcategory) {
      return res.sendStatus(200);
    }
    throw new Error('Subcategory not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Subcategory.destroy({ where: { id: id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Subcategory not found');
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
