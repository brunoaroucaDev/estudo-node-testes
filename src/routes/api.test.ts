import request from 'supertest';
import server from '../app';
import { User } from '../models/User';

describe('Testando as rotas da API', () => {

  let email = 'teste@jest.com';
  let password = '1234'

  beforeAll(async () => {
    await User.sync({ force: true });
  });

  it('deve retornar pong', (done) => {
    request(server)
      .get('/ping')
        .then(response => {
          expect(response.body.pong).toBeTruthy();
          return done();
        });
  });

  it('deve registrar o novo usuario', (done) => {
    request(server)
      .post('/register')
      .send(`email=${email}&password=${password}`)
        .then(response => {
          expect(response.body.error).toBeUndefined();
          expect(response.body).toHaveProperty('id');
          return done();
        });
  });

  it('não deve registrar usuario se existir email', (done) => {
    request(server)
      .post('/register')
      .send(`email=${email}&password=${password}`)
        .then(response => {
          expect(response.body.error).not.toBeUndefined();
          return done();
        });
  });

  it('não deve registrar se não tiver email', (done) => {
    request(server)
      .post('/register')
      .send(`password=${password}`)
        .then(response => {
          expect(response.body.error).not.toBeUndefined();
          return done();
        });
  });
  it('não deve registrar se não tiver email e senha', (done) => {
    request(server)
      .post('/register')
      .send(` `)
        .then(response => {
          expect(response.body.error).not.toBeUndefined();
          return done();
        });
  });
  


});