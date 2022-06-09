/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Diet, conn } = require('../../src/db.js');

const agent = session(app);

describe('Recipe routes', () => {
  before((done) => {
    conn
      .authenticate()
      .then(() =>
        Diet.bulkCreate([
          { name: 'gluten free' },
          { name: 'dairy free' },
          { name: 'vegetarian' },
          { name: 'lacto ovo vegetarian' },
          { name: 'pescatarian' },
          { name: 'vegan' },
          { name: 'fodmap friendly' },
          { name: 'paleolithic' },
          { name: 'primal' },
          { name: 'whole 30' },
        ]).then(() => done())
      )
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
        done();
      });
  });

  after((done) => {
    conn
      .sync({ force: true })
      .then(() => done())
      .catch(() => done());
  });

  // beforeEach(async () => await conn.sync({ force: true }));

  describe('POST /types', () => {
    it('The status code should be 404', () => agent.post('/types').expect(404));
  });

  describe('PUT /types', () => {
    it('The status code should be 404', () => agent.put('/types').expect(404));
  });

  describe('DELETE /types', () => {
    it('The status code should be 404', () => agent.delete('/types').expect(404));
  });

  describe('GET /types', () => {
    it('The status code should be 200', () => agent.get('/types').expect(200));

    it('The response body should be an array', async () => {
      const { body } = await agent.get('/types');
      expect(body).to.be.an('array');
    });

    it('The response body should be an array with 10 elements', async () => {
      const { body } = await agent.get('/types');
      expect(body).to.have.lengthOf(10);
    });
  });
});
