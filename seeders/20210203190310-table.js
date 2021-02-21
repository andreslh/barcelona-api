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
          createdAt: new Date('2021-01-02'),
          updatedAt: new Date('2021-01-02'),
        },
        {
          name: 'Julieta3',
          total: 510,
          status: false,
          waiterId: 3,
          createdAt: new Date('2021-02-02'),
          updatedAt: new Date('2021-02-02'),
        },
        {
          name: 'Julieta4',
          total: 510,
          status: false,
          waiterId: 3,
          createdAt: new Date('2021-03-02'),
          updatedAt: new Date('2021-03-02'),
        },
        {
          name: 'Julieta delivery',
          total: 510,
          status: false,
          waiterId: 1,
          createdAt: new Date('2021-01-05'),
          updatedAt: new Date('2021-01-05'),
        },
        {
          name: 'Julieta p buscar',
          total: 510,
          status: false,
          waiterId: 2,
          createdAt: new Date('2021-02-05'),
          updatedAt: new Date('2021-02-05'),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tables', null, {});
  },
};
