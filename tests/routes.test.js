const request = require('supertest');
const app = require('../src/index.js');

describe('Categories API', () => {
  it('should create a new category', async () => {
    const res = await request(app).post('/api/categories').send({
      name: 'Test',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('category');
  });
});
