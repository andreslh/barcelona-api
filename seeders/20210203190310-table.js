module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tables',
      [
        {
          name: 'Andres',
          total: 510,
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
          createdAt: new Date('2021-01-02T20:00:00.000Z'),
          updatedAt: new Date('2021-01-02T20:00:00.000Z'),
        },
        {
          name: 'Julieta3',
          total: 510,
          status: false,
          waiterId: 3,
          createdAt: new Date('2021-02-02T02:00:00.000Z'),
          updatedAt: new Date('2021-02-02T02:00:00.000Z'),
        },
        {
          name: 'Julieta4',
          total: 510,
          status: false,
          waiterId: 3,
          createdAt: new Date('2021-02-02T20:00:00.000Z'),
          updatedAt: new Date('2021-02-02T20:00:00.000Z'),
        },
        {
          name: 'Julieta5',
          total: 510,
          status: false,
          waiterId: 3,
          createdAt: new Date('2021-02-03T02:00:00.000Z'),
          updatedAt: new Date('2021-02-03T02:00:00.000Z'),
        },
        {
          name: 'Julieta 6',
          total: 510,
          status: false,
          waiterId: 4,
          createdAt: new Date('2021-02-03T17:01:00.000Z'),
          updatedAt: new Date('2021-02-03T17:01:00.000Z'),
        },
        {
          name: 'Julieta',
          total: 510,
          status: false,
          waiterId: 2,
          createdAt: new Date('2021-01-02T20:00:00.000Z'),
          updatedAt: new Date('2021-01-02T20:00:00.000Z'),
        },
        {
          name: 'Julieta3',
          total: 510,
          status: false,
          waiterId: 2,
          createdAt: new Date('2021-02-02T02:00:00.000Z'),
          updatedAt: new Date('2021-02-02T02:00:00.000Z'),
        },
        {
          name: 'Julieta4',
          total: 510,
          status: false,
          waiterId: 1,
          createdAt: new Date('2021-02-02T20:00:00.000Z'),
          updatedAt: new Date('2021-02-02T20:00:00.000Z'),
        },
        {
          name: 'Julieta5',
          total: 510,
          status: false,
          waiterId: 1,
          createdAt: new Date('2021-02-03T02:00:00.000Z'),
          updatedAt: new Date('2021-02-03T02:00:00.000Z'),
        },
        {
          name: 'Julieta 6',
          total: 510,
          status: false,
          waiterId: 1,
          createdAt: new Date('2021-02-03T17:01:00.000Z'),
          updatedAt: new Date('2021-02-03T17:01:00.000Z'),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tables', null, {});
  },
};
