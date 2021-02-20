const { sequelize } = require('../models');

const { Table, Tableproduct, Product } = require('../models');
const { validateNotRepeatedModel, handleError } = require('./validator');

const REPEATED_ERROR_MESSAGE =
  'Ya hay una mesa o pedido abierto con el nombre elegido';

const validateNotRepeated = async (fields) =>
  await validateNotRepeatedModel(Table, fields, REPEATED_ERROR_MESSAGE);

const get = async (req, res) => {
  try {
    const tables = await Table.findAll();
    return res.status(200).json({ tables });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findOne({
      where: { id },
      include: [{ model: Tableproduct }],
    });
    if (table) {
      return res.status(200).json({ table });
    }
    return res.status(404).send('Table with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getOpen = async (req, res) => {
  try {
    const tables = await Table.findAll({ where: { status: true } });
    return res.status(200).json({ tables });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCompleted = async (req, res) => {
  try {
    const tables = await Table.findAll({ where: { status: false } });
    return res.status(200).json({ tables });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    await validateNotRepeated({ name, status: true });

    const table = await Table.create(req.body);
    return res.status(201).json({ table });
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await validateNotRepeated({ id, name, status: true });

    const table = await Table.update({ ...req.body }, { where: { id } });
    if (table) {
      return res.sendStatus(200);
    }
    throw new Error('Table not found');
  } catch (error) {
    return handleError(error, res, REPEATED_ERROR_MESSAGE);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Table.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Table not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const complete = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Table.update({ status: false }, { where: { id } });
    if (updated) {
      const updatedTable = await Table.findOne({ where: { id } });
      return res.status(200).json({ table: updatedTable });
    }
    throw new Error('Table not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const addProducts = async (req, res) => {
  const { id } = req.params;
  const tableId = parseInt(id, 10);

  try {
    const { total } = await Table.findOne({ where: { id } });
    let updatedTotal = parseFloat(total, 10);

    const tableProducts = await Tableproduct.bulkCreate(
      await Promise.all(
        req.body.map(async (tableProduct) => {
          const quantity = parseInt(tableProduct.quantity, 10);
          const product = await Product.findOne({
            where: { id: tableProduct.id },
          });
          const productTotal = product.price * quantity;
          updatedTotal += productTotal;

          return {
            productId: tableProduct.id,
            name: product.name,
            quantity,
            tableId,
            price: product.price,
            total: product.price * quantity,
          };
        })
      )
    );

    await Table.update({ total: updatedTotal }, { where: { id } });
    res.send(tableProducts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const removeProduct = async (req, res) => {
  const { id: tableId, productTableId } = req.params;
  const t = await sequelize.transaction();

  try {
    const product = await Tableproduct.findOne({
      where: { id: productTableId },
    });
    const { total } = product;
    await Tableproduct.destroy(
      { where: { id: productTableId } },
      { transaction: t }
    );

    const table = await Table.findOne(
      { where: { id: tableId } },
      { transaction: t }
    );
    await Table.update(
      { total: table.total - total },
      { where: { id: tableId } },
      { transaction: t }
    );

    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
};

module.exports = {
  get,
  getById,
  getOpen,
  getCompleted,
  post,
  put,
  remove,
  complete,
  addProducts,
  removeProduct,
};
