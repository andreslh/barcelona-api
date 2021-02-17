module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tables',
      [
        {
          name: 'Andres',
          total: 300,
          status: true,
          waiterId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Facundo',
          total: 510,
          status: false,
          waiterId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Julieta',
          total: 510,
          status: false,
          waiterId: 3,
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
