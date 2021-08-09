module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'admin@admin.com',
          password:
            '$2b$10$8aKJ..HiCoOnVP6BvcnrIOD.vg1wl429cDjjtrbFFnkI3RpQqy02O',
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
