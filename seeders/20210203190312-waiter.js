module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Waiters',
      [
        {
          name: 'Para entregar',
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
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Waiters', null, {});
  },
};
