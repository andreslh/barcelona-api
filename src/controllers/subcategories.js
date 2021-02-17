const { Subcategory, Product } = require('../models');
const { validateNotRepeatedModel } = require('./validator');

const REPEATED_ERROR_MESSAGE =
  'Ya existe una subcategoria con el nombre elegido en esta categoría';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Subcategory, fields, REPEATED_ERROR_MESSAGE);

const handleError = (error, res) =>
  error === REPEATED_ERROR_MESSAGE
    ? res.status(400).json({ message: error })
    : res.status(500).json({ message: error.message });

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
    await validateNotRepeated(req.body);

    const subcategory = await Subcategory.create(req.body);
    return res.status(201).json({ subcategory });
  } catch (error) {
    return handleError(error, res);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    await validateNotRepeated({ name, categoryId, id });

    const subcategory = await Subcategory.update(
      { ...req.body },
      { where: { id: id } }
    );
    if (subcategory) {
      return res.sendStatus(200);
    }
    throw new Error('Subcategory not found');
  } catch (error) {
    return handleError(error, res);
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
