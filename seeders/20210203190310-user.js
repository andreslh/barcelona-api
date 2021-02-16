module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'andreslh90@gmail.com',
          password:
            '$2b$10$.v1Khw9cJqEcQ6MTdnPSmuPecoMZcNlG5hjCOmE3O9cplwlY8ZFRG',
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
