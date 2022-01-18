module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Subcategories',
      [
        {
          name: 'Tapeos',
          categoryId: 1,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sandwiches',
          categoryId: 1,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
        {
          name: 'Postres',
          categoryId: 1,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Cervezas',
          categoryId: 2,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Vinos',
          categoryId: 2,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sin Alcohol',
          categoryId: 2,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Tragos',
          categoryId: 2,
          allowHalf: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Espumantes',
          categoryId: 2,
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
