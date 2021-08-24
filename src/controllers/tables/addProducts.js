const { Table, Tableproduct, Product } = require('../../models');

const roundDecimals = (price) => {
  const priceString = price.toString();
  return priceString.slice(0, (priceString.indexOf(".")) + 3);
}

const addProducts = async (req, res) => {
  const { id } = req.params;
  const tableId = parseInt(id, 10);

  try {
    const { total } = await Table.findOne({ where: { id } });
    let updatedTotal = parseFloat(total, 10);

    const tableProducts = await Tableproduct.bulkCreate(
      await Promise.all(
        req.body.map(async (tableProduct) => {
          const quantity = tableProduct.quantity;
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
            total: roundDecimals(product.price * quantity),
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

module.exports = addProducts;
