const { Recipe, Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { ValidationError } = require('sequelize');

describe('Recipe model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  after((done) => {
    conn
      .sync({ force: true })
      .then(() => done())
      .catch(() => done());
  });

  describe('Validators', () => {
    beforeEach((done) => {
      conn
        .sync({ force: true })
        .then(() => done())
        .catch(() => done());
    });

    describe('name and summary', () => {
      it('Should throw an error if name is not passed when try to create a new record', async () => {
        let result;

        try {
          result = await Recipe.create({
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: 1,
            healthScore: 100,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });

      it('Should throw an error if summary is not passed when try to create a new record', async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Test name',
            instructions: 'Test instructions',
            score: 1,
            healthScore: 100,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });

      it('Should throw an error if name and summary are not passed when try to create a new record', async () => {
        let result;

        try {
          result = await Recipe.create({
            instructions: 'Test instructions',
            score: 1,
            healthScore: 100,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });

      it('Should works when are a valid name and summary', async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Milanesa a la napolitana',
            summary: 'Alta milanesa',
            instructions: 'Test instructions',
            score: 1,
            healthScore: 100,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(Recipe);
        }
      });
    });

    describe('score and healthScore', () => {
      it('Should throw and error if score is greater than 100', async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Test name',
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: 101,
            healthScore: 100,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });

      it('Should throw and error if score is lesser than 0', async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Test name',
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: -1,
            healthScore: 100,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });

      it('Should throw and error if healthScore is greater than 100', async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Test name',
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: 100,
            healthScore: 101,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });

      it('Should throw and error if healthScore is lesser than 0', async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Test name',
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: 100,
            healthScore: -1,
          });
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(ValidationError);
        }
      });
    });

    describe('diets', () => {
      it("Should throw an error if the diet doesn't exist", async () => {
        let result;

        try {
          result = await Recipe.create({
            name: 'Test name',
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: 100,
            healthScore: 100,
          });
          await result.setDiets([1]);
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(Error);
        }
      });

      it('Should works if the diet exists', async () => {
        let result;

        try {
          await Diet.create({ name: 'Test diet' });

          result = await Recipe.create({
            name: 'Test name',
            summary: 'Test summary',
            instructions: 'Test instructions',
            score: 100,
            healthScore: 100,
          });

          await result.setDiets([1]);
        } catch (error) {
          result = error;
        } finally {
          expect(result).to.be.an.instanceOf(Recipe);
        }
      });
    });
  });
});
