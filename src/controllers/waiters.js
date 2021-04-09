const { Waiter, Table } = require('../models');
const { validateNotRepeatedModel, handleError } = require('./validator');

const REPEATED_ERROR_MESSAGE = 'Ya existe un mozo con el nombre elegido';
const WAITER_HAS_TABLES_ERROR =
  'El mozo tiene mesas asignadas (abiertas o cerradas)';
const WAITER_NOT_FOUND = 'Mozo no encontrado';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Waiter, fields, REPEATED_ERROR_MESSAGE);

const get = async (req, res) => {
  try {
    const waiters = await Waiter.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json({ waiters });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getWaitersWithTables = async (req, res) => {
  try {
    const waiters = await Waiter.findAll({
      order: [['id', 'ASC']],
      include: {
        model: Table,
        where: {
          status: true,
        },
      },
    });
    return res.status(200).json({ waiters });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const waiter = await Waiter.findOne({
      where: { id },
      include: [{ model: Table }],
    });
    if (waiter) {
      return res.status(200).json({ waiter });
    }
    return res.status(404).send('Waiter with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    await validateNotRepeated({ name });

    const waiter = await Waiter.create(req.body);
    return res.status(201).json({ waiter });
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await validateNotRepeated({ name, id });

    const waiter = await Waiter.update({ ...req.body }, { where: { id } });
    if (waiter) {
      return res.sendStatus(200);
    }
    throw new Error('Waiter not found');
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const tables = await Table.findOne({
      where: {
        waiterId: id,
      },
    });

    if (tables) {
      throw new Error(WAITER_HAS_TABLES_ERROR);
    }

    const deleted = await Waiter.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error(WAITER_NOT_FOUND);
  } catch (error) {
    return handleError(error, res, { message: error });
  }
};

module.exports = {
  get,
  getWaitersWithTables,
  getById,
  post,
  put,
  remove,
};
