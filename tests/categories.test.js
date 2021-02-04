const request = require('supertest');
const app = require('../src/index.js');

describe('Categories API', () => {
  describe('Create category', () => {
    it('should create a new category if name is valid', async () => {
      const res = await request(app).post('/api/categories').send({
        name: 'Test',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('category');

      const getResponse = await request(app).get('/api/categories').send();
      expect(getResponse.body.categories.length).toBe(3);
      expect(getResponse.body.categories[2].name).toBe('Test');
    });

    it('should prevent creating a new category with empty name', async () => {
      const res = await request(app).post('/api/categories').send({ name: '' });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new category with empty body', async () => {
      const res = await request(app).post('/api/categories').send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new category with repeated name', async () => {
      const res = await request(app)
        .post('/api/categories')
        .send({ name: 'Comida' });
      expect(res.statusCode).toEqual(500);
    });
  });
});
