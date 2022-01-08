module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tableproducts',
      [
        {
          productId: 2,
          quantity: 1,
          tableId: 1,
          name: 'Anana',
          price: 300,
          total: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 2,
          quantity: 0.5,
          tableId: 2,
          name: 'Anana',
          price: 300,
          total: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: 1,
          quantity: 1,
          tableId: 1,
          name: 'Completa',
          price: 210,
          total: 210,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tableproducts', null, {});
  },
};
