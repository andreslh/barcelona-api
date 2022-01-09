
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const env = process.env.NODE_ENV || 'development';

const config = {};
switch (env) {
  case 'test':
    config.username = process.env.USERNAME_TEST;
    config.password = process.env.PASSWORD_TEST;
    config.database = process.env.DATABASE_TEST;
    config.host = process.env.HOST_TEST;
    config.dialect = process.env.DIALECT_TEST;
    config.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_TEST;
    config.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_TEST;
    break;
  case 'development_online':
    config.username = process.env.USERNAME_DEV_ONLINE;
    config.password = process.env.PASSWORD_DEV_ONLINE;
    config.database = process.env.DATABASE_DEV_ONLINE;
    config.host = process.env.HOST_DEV_ONLINE;
    config.dialect = process.env.DIALECT_DEV_ONLINE;
    config.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_DEV_ONLINE;
    config.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_DEV_ONLINE;
    break;
  case 'production':
    config.username = process.env.USERNAME_PRODUCTION;
    config.password = process.env.PASSWORD_PRODUCTION;
    config.database = process.env.DATABASE_PRODUCTION;
    config.host = process.env.HOST_PRODUCTION;
    config.dialect = process.env.DIALECT_PRODUCTION;
    config.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_PRODUCTION;
    config.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_PRODUCTION;
    break;
  default: // development
    config.username = process.env.USERNAME_DEV;
    config.password = process.env.PASSWORD_DEV;
    config.database = process.env.DATABASE_DEV;
    config.host = process.env.HOST_DEV;
    config.dialect = process.env.DIALECT_DEV;
    config.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_DEV;
    config.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_DEV;
    break;
}

module.exports = config;
