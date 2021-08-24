module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Subcategories',
      [
        {
          name: 'Pizzas',
          categoryId: 1,
          allowHalf: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Burgers',
          categoryId: 1,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Subcategories', null, {});
  },
};
