import { User, UserInstance } from '../models/User';
import * as UserService from './UserService';


describe('Testando user service', () => {

  let email = 'teste@jest.com';
  let password = '1234'

  beforeAll( async () => {
    await User.sync( { force: true } );
  });

  it('deve criar um novo usuario', async () => {
    const newUser = await UserService.createUser(email, password) as UserInstance
    expect(newUser).not.toBeInstanceOf(Error);
    expect(newUser).toHaveProperty('id');
    expect(newUser.email).toBe(email);
  });

  it('não deve permitir a criação de um usuario com email ja existente', async () => {
    const newUser = await UserService.createUser(email, password)
    expect(newUser).toBeInstanceOf(Error)
  });

  it('deve procurar o usuario pelo email', async () => {
    const user = await UserService.findByEmail(email) as UserInstance;
    expect(user.email).toBe(email)
  });

  it('deve da match com a senha do usuario e a do database', async () => {
    const user = await UserService.findByEmail(email) as UserInstance;
    const match = await UserService.matchPassword(password, user.password);
    expect(match).toBeTruthy();
  });

  it('não deve da match com a senha do usuario e a do database', async () => {
    const user = await UserService.findByEmail(email) as UserInstance;
    const match = await UserService.matchPassword('invalid', user.password);
    expect(match).toBeFalsy();
  });

  it('deve mostrar a lista de usuarios', async () => {
    const users = await UserService.all();
    expect(users.length).toBeGreaterThanOrEqual(1);
    for (let i in users) {
      expect(users[i]).toBeInstanceOf(User);
    }
  });



});