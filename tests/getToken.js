const request = require('supertest');
const app = require('../src/app.js');

const getToken = async () => {
  const authResponse = await request(app).post('/api/users/login').send({
    email: 'andreslh90@gmail.com',
    password: 'mypassword',
  });
  return authResponse.body.accessToken;
};

const getTokenHeader = (token) => ['Authorization', `Bearer ${token}`];

module.exports = {
  getToken,
  getTokenHeader,
};
