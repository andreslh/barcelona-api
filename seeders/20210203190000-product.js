module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Completa',
          subcategoryId: 2,
          price: 210,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Anana',
          subcategoryId: 1,
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Roquefort',
          subcategoryId: 1,
          price: 350.75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
