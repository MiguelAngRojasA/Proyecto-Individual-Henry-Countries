const request = require('supertest');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

describe('Activity model', () => {
  beforeAll(async () => {
    await conn.authenticate();
    await Activity.sync({ alert: true });    
  }); 

  describe('Validators', () => {
    describe('name', () => {
      let activityCount = 0;

    beforeAll(async () => {
      activityCount = await Activity.count();
    });

      it('Should throw an error if name is null', async () => {
        const response = await request(app)
          .post('/activities')
          .send({});

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('The require information is missing');
      });

      it('Should work when all information is valid', async () => {
        const response = await request(app)
          .post('/activities')
          .send({ id: activityCount + 1,
          name: "comer",
          description: "A good empanada",
          dificulty: "5",
          duration: "1",
          season: "Spring", 
          countryId : ["COL","ARG","PER"]});
        expect(response.statusCode).toBe(200);
        
      });

      it('Should throw an error if season is different', async () => {
        const response = await request(app)
          .post('/activities')
          .send({ id: activityCount + 11,
          name: "comer",
          description: "A good empanada",
          dificulty: "5",
          duration: "1",
          season: "Otoño", 
          countryId : ["COL","ARG","PER"]});
        expect(response.statusCode).toBe(404);
        
      });

      it('Should throw an error if dificulty is an invalid input ', async () => {
        const response = await request(app)
          .post('/activities')
          .send({ id: activityCount + 22,
          name: "comer",
          description: "A good empanada",
          dificulty: "otoño",
          duration: "1",
          season: "Spring", 
          countryId : ["COL","ARG","PER"]});
        expect(response.statusCode).toBe(404);
        
      });
    });
  });
});