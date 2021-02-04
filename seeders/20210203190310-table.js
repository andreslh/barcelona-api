module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tables',
      [
        {
          name: 'Andres',
          total: 300,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Facundo',
          total: 510,
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tables', null, {});
  },
};
