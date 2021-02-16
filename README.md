# Barcelona API
Express API

Example of sequelize-cli with a User model:
npx sequelize-cli init

Find config.json in /config and change to:
{
  "development": {
    "database": "wishlist_api_development",
    "dialect": "postgres"
  },
  "test": {
    "database": "wishlist_api_test",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "rejectUnauthorized": false
      }
    }
  }
}

npx sequelize-cli db:create

Define model:
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string

Create migration table:
npx sequelize-cli db:migrate

Create seed file:
npx sequelize-cli seed:generate --name users

Replace the new seed file content for:
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Bruno',
      lastName: 'Doe',
      email: 'bruno@doe.com',
      password: '123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

Run seed file:
npx sequelize-cli db:seed:all