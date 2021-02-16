const request = require('supertest');
const app = require('../src/app.js');
const { getToken, getTokenHeader } = require('./getToken.js');

let token;

describe('Products API', () => {
  beforeEach(async () => {
    token = await getToken();
  });

  describe('Get products', () => {
    it('should retrieve all products', async () => {
      const res = await request(app)
        .get('/api/products')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.products.length).toBe(3);
      expect(res.body.products[0].name).toBe('IPA');
      expect(res.body.products[1].name).toBe('Anana');
      expect(res.body.products[2].name).toBe('Roquefort');
    });

    it('should retrieve a specific product', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.product.name).toBe('IPA');
    });

    it('should send error message if requested id is invalid', async () => {
      const res = await request(app)
        .get('/api/products/15')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(404);
      expect(res.text).toBe('Product with the specified ID does not exists');
    });

    it('should retrieve the products list organized', async () => {
      const res = await request(app)
        .get('/api/products/list')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.categories.length).toBe(2);
    });
  });

  describe('Create a product', () => {
    it('should create a new product if body is valid', async () => {
      const res = await request(app)
        .post('/api/products')
        .set(...getTokenHeader(token))
        .send({
          name: 'Test',
          price: 500,
          subcategoryId: 1,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('product');

      const getResponse = await request(app)
        .get('/api/products')
        .set(...getTokenHeader(token))
        .send();
      expect(getResponse.body.products.length).toBe(4);
      expect(getResponse.body.products[3].name).toBe('Test');
    });

    it('should prevent creating a new product with empty name', async () => {
      const res = await request(app)
        .post('/api/products')
        .set(...getTokenHeader(token))
        .send({ name: '', subcategoryId: 1, price: 500 });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new product with empty body', async () => {
      const res = await request(app)
        .post('/api/products')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new product with repeated name', async () => {
      const res = await request(app)
        .post('/api/products')
        .set(...getTokenHeader(token))
        .send({ name: 'Anana', subcategoryId: 1, price: 500 });
      expect(res.statusCode).toEqual(500);
    });

    it('should prevent creating a new product with invalid subcategoryId', async () => {
      const res = await request(app)
        .post('/api/products')
        .set(...getTokenHeader(token))
        .send({ name: 'New name', subcategoryId: 'a' });
      expect(res.statusCode).toEqual(500);
    });

    it('should prevent creating a new product with invalid price', async () => {
      const res = await request(app)
        .post('/api/products')
        .set(...getTokenHeader(token))
        .send({ name: 'New name', subcategoryId: 1, price: 'a' });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('Update a product', () => {
    it('should update a product if new name and cateogryId are valid', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set(...getTokenHeader(token))
        .send({
          name: 'New name',
          subcategoryId: 1,
          price: 600,
        });
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app)
        .get('/api/products/1')
        .set(...getTokenHeader(token))
        .send();
      expect(getResponse.body.product.name).toBe('New name');
    });

    it('should prevent updating a product with empty id', async () => {
      const res = await request(app)
        .put('/api/products')
        .set(...getTokenHeader(token))
        .send({ name: '', subcategoryId: 1 });
      expect(res.statusCode).toEqual(404);
    });

    it('should prevent updating a product with empty name', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set(...getTokenHeader(token))
        .send({ name: '', subcategoryId: 1 });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a product with empty body', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a product with repeated name', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set(...getTokenHeader(token))
        .send({ name: 'Anana', subcategoryId: 1 });
      expect(res.statusCode).toEqual(500);
    });

    it('should prevent updating a product with invalid subcategoryId', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set(...getTokenHeader(token))
        .send({ name: 'New name', subcategoryId: 'a' });
      expect(res.statusCode).toEqual(500);
    });

    it('should prevent updating a product with invalid price', async () => {
      const res = await request(app)
        .put('/api/products/1')
        .set(...getTokenHeader(token))
        .send({ price: 'invalid' });
      expect(res.statusCode).toEqual(422);
    });
  });

  describe('Delete product', () => {
    it('should prevent deleting if id is invalid', async () => {
      const res = await request(app)
        .delete('/api/products/15')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(500);
    });

    it('should delete if id is valid', async () => {
      const res = await request(app)
        .delete('/api/products/1')
        .set(...getTokenHeader(token))
        .send();
      expect(res.statusCode).toEqual(204);
    });
  });
});
