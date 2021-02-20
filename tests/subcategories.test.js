const request = require('supertest');
const app = require('../src/app.js');
const { getToken, getTokenHeader } = require('./getToken.js');

let token;

describe('Subcategories API', () => {
  beforeEach(async () => {
    token = await getToken();
  });

  describe('Get subcategories', () => {
    it('should retrieve all subcategories', async () => {
      const res = await request(app)
        .get('/api/subcategories')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.subcategories.length).toBe(2);
      expect(res.body.subcategories[0].name).toBe('Pizzas');
      expect(res.body.subcategories[1].name).toBe('Burgers');
    });

    it('should retrieve a specific subcategory', async () => {
      const res = await request(app)
        .get('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.subcategory.name).toBe('Pizzas');
    });

    it('should send error message if requested id is invalid', async () => {
      const res = await request(app)
        .get('/api/subcategories/15')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(404);
      expect(res.text).toBe(
        'Subcategory with the specified ID does not exists'
      );
    });
  });

  describe('Create a subcategory', () => {
    it('should create a new subcategory if body is valid', async () => {
      const res = await request(app)
        .post('/api/subcategories')
        .set(...getTokenHeader(token))
        .send({
          name: 'Test',
          categoryId: 1,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('subcategory');

      const getResponse = await request(app)
        .get('/api/subcategories')
        .set(...getTokenHeader(token))
        .send();
      expect(getResponse.body.subcategories.length).toBe(3);
      expect(getResponse.body.subcategories[2].name).toBe('Test');
    });

    it('should prevent creating a new subcategory with empty name', async () => {
      const res = await request(app)
        .post('/api/subcategories')
        .set(...getTokenHeader(token))
        .send({ name: '', categoryId: 1 });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new subcategory with empty body', async () => {
      const res = await request(app)
        .post('/api/subcategories')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new subcategory with repeated name', async () => {
      const res = await request(app)
        .post('/api/subcategories')
        .set(...getTokenHeader(token))
        .send({ name: 'Pizzas', categoryId: 1 });
      expect(res.statusCode).toEqual(400);
    });

    it('should prevent creating a new subcategory with invalid categoryId', async () => {
      const res = await request(app)
        .post('/api/subcategories')
        .set(...getTokenHeader(token))
        .send({ name: 'New name', categoryId: 'a' });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('Update a subcategory', () => {
    it('should update a subcategory if new name and cateogryId are valid', async () => {
      const res = await request(app)
        .put('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send({
          name: 'New name',
          categoryId: 1,
        });
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app)
        .get('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send();
      expect(getResponse.body.subcategory.name).toBe('New name');
    });

    it('should prevent updating a subcategory with empty id', async () => {
      const res = await request(app)
        .put('/api/subcategories')
        .set(...getTokenHeader(token))
        .send({ name: '', categoryId: 1 });
      expect(res.statusCode).toEqual(404);
    });

    it('should prevent updating a subcategory with empty name', async () => {
      const res = await request(app)
        .put('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send({ name: '', categoryId: 1 });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a subcategory with empty body', async () => {
      const res = await request(app)
        .put('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a subcategory with repeated name', async () => {
      const res = await request(app)
        .put('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send({ name: 'Burgers', categoryId: 1 });
      expect(res.statusCode).toEqual(400);
    });

    it('should prevent updating a subcategory with invalid categoryId', async () => {
      const res = await request(app)
        .put('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send({ name: 'New name', categoryId: 'a' });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('Delete subcategory', () => {
    it('should prevent deleting if id is invalid', async () => {
      const res = await request(app)
        .delete('/api/subcategories/15')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(500);
    });

    it('should delete if id is valid', async () => {
      const res = await request(app)
        .delete('/api/subcategories/1')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(204);
    });
  });
});
