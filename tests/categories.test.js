const request = require('supertest');
const app = require('../src/app.js');

describe('Categories API', () => {
  describe('Get categories', () => {
    it('should retrieve all categories', async () => {
      const res = await request(app).get('/api/categories').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.categories.length).toBe(2);
      expect(res.body.categories[0].name).toBe('Comida');
      expect(res.body.categories[1].name).toBe('Bebida');
    });

    it('should retrieve a specific category', async () => {
      const res = await request(app).get('/api/categories/1').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.category.name).toBe('Comida');
    });

    it('should send error message if requested id is invalid', async () => {
      const res = await request(app).get('/api/categories/15').send();
      expect(res.statusCode).toEqual(404);
      expect(res.text).toBe('Category with the specified ID does not exists');
    });
  });

  describe('Create a category', () => {
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

  describe('Update a category', () => {
    it('should update a category if new name is valid', async () => {
      const res = await request(app).put('/api/categories/1').send({
        name: 'New name',
      });
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app).get('/api/categories/1').send();
      expect(getResponse.body.category.name).toBe('New name');
    });

    it('should prevent updating a category with empty id', async () => {
      const res = await request(app).put('/api/categories').send({ name: '' });
      expect(res.statusCode).toEqual(404);
    });

    it('should prevent updating a category with empty name', async () => {
      const res = await request(app)
        .put('/api/categories/1')
        .send({ name: '' });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a category with empty body', async () => {
      const res = await request(app).put('/api/categories/1').send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a category with repeated name', async () => {
      const res = await request(app)
        .put('/api/categories/1')
        .send({ name: 'Bebida' });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('Delete category', () => {
    it('should prevent deleting if id is invalid', async () => {
      const res = await request(app).delete('/api/categories/15').send();
      expect(res.statusCode).toEqual(500);
    });

    it('should delete if id is valid', async () => {
      const res = await request(app).delete('/api/categories/1').send();
      expect(res.statusCode).toEqual(204);
    });
  });
});
