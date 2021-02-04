const request = require('supertest');
const app = require('../src/app.js');

describe('Tables API', () => {
  describe('Get tables', () => {
    it('should retrieve all tables', async () => {
      const res = await request(app).get('/api/tables').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.tables.length).toBe(2);
      expect(res.body.tables[0].name).toBe('Andres');
      expect(res.body.tables[1].name).toBe('Facundo');
    });

    it('should retrieve a specific table', async () => {
      const res = await request(app).get('/api/tables/1').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.table.name).toBe('Andres');
    });

    it('should send error message if requested id is invalid', async () => {
      const res = await request(app).get('/api/tables/15').send();
      expect(res.statusCode).toEqual(404);
      expect(res.text).toBe('Table with the specified ID does not exists');
    });

    it('should retrieve all open tables', async () => {
      const res = await request(app).get('/api/tables/open').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.tables.length).toBe(1);
      expect(res.body.tables[0].name).toBe('Andres');
    });

    it('should retrieve all completed tables', async () => {
      const res = await request(app).get('/api/tables/completed').send();
      expect(res.statusCode).toEqual(200);
      expect(res.body.tables.length).toBe(1);
      expect(res.body.tables[0].name).toBe('Facundo');
    });
  });

  describe('Create a table', () => {
    it('should create a new table if name is valid', async () => {
      const res = await request(app).post('/api/tables').send({
        name: 'Test',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('table');

      const getResponse = await request(app).get('/api/tables').send();
      expect(getResponse.body.tables.length).toBe(3);
      expect(getResponse.body.tables[2].name).toBe('Test');
    });

    it('should prevent creating a new table with empty name', async () => {
      const res = await request(app).post('/api/tables').send({ name: '' });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new table with empty body', async () => {
      const res = await request(app).post('/api/tables').send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent creating a new table with repeated name', async () => {
      const res = await request(app)
        .post('/api/tables')
        .send({ name: 'Andres' });
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('Update a table', () => {
    it('should update a table if new name is valid', async () => {
      const res = await request(app).put('/api/tables/1').send({
        name: 'New name',
      });
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app).get('/api/tables/1').send();
      expect(getResponse.body.table.name).toBe('New name');
    });

    it('should prevent updating a table with empty id', async () => {
      const res = await request(app).put('/api/tables').send({ name: '' });
      expect(res.statusCode).toEqual(404);
    });

    it('should prevent updating a table with empty name', async () => {
      const res = await request(app).put('/api/tables/1').send({ name: '' });
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a table with empty body', async () => {
      const res = await request(app).put('/api/tables/1').send();
      expect(res.statusCode).toEqual(422);
    });

    it('should prevent updating a table with repeated name', async () => {
      const res = await request(app)
        .put('/api/tables/1')
        .send({ name: 'Facundo' });
      expect(res.statusCode).toEqual(500);
    });

    it('should mark a table as completed', async () => {
      const res = await request(app).put('/api/tables/1/complete').send();
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app).get('/api/tables/1').send();
      expect(getResponse.body.table.status).toBe(false);
    });
  });

  describe('Delete table', () => {
    it('should prevent deleting if id is invalid', async () => {
      const res = await request(app).delete('/api/tables/15').send();
      expect(res.statusCode).toEqual(500);
    });

    it('should delete if id is valid', async () => {
      const res = await request(app).delete('/api/tables/1').send();
      expect(res.statusCode).toEqual(204);
    });
  });

  describe('Add products', () => {
    it('should add products to a table', async () => {
      const res = await request(app)
        .post('/api/tables/2/products')
        .send([
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 2,
            quantity: 3,
          },
        ]);
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app).get('/api/tables/2').send();
      expect(getResponse.body.table.total).toBe(1830);
      expect(getResponse.body.table.Tableproducts.length).toBe(3);
    });
  });

  describe('Delete products', () => {
    it('should delete a product from a table', async () => {
      const res = await request(app).delete('/api/tables/2/products/5').send();
      expect(res.statusCode).toEqual(200);

      const getResponse = await request(app).get('/api/tables/2').send();
      expect(getResponse.body.table.total).toBe(930);
      expect(getResponse.body.table.Tableproducts.length).toBe(2);
    });
  });
});
