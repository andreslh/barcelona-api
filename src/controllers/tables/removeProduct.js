const { Table, Tableproduct, sequelize } = require('../../models');

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

module.exports = removeProduct;
