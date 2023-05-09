/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app');
const { CountryData, conn } = require('../../src/db');

describe('Country routes', () => {
  beforeAll(async () => {
    await conn.authenticate();
    await CountryData.sync({ alter: true });    
  }); 

  describe('Country routes', () => {
    it('should respond with status 200 to request /countries/all ', async () => {
      const response = await request(app).get('/countries/all');
      expect(response.status).toBe(200);
    });

    it('should respond with status 200 to request /countries/COL ', async () => {
      const response = await request(app).get('/countries/COL');      
      expect(response.status).toBe(200);
    });

    it('should reply the GET method /countries/continent with status code 404 because rout doesnt exist ', async () => {
      const response = await request(app).get('/countries/continent');
      expect(response.status).toBe(404);
    });

    it('should reply the GET method /pais with status code 404 if the rout doesnt exist', async () => {
      const res = await request(app).get('/pais');
      expect(res.statusCode).toBe(404);
    });

    it('should reply the GET method /queryData with with status 200', async () => {
      const res = await request(app).get('/countries/name?name=col');
      expect(res.statusCode).toBe(200);    
      
    });

    it('should reply the GET method /paramsData with status code 404 if params is not found', async () => {
      const res = await request(app).get('/countries/name?name=70');
      expect(res.statusCode).toBe(404);
    });

  });
});
