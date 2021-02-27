module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Waiters',
      [
        {
          name: 'Delivery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Para retirar',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Eduardo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Nuevo mozo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Waiters', null, {});
  },
};
