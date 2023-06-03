import bcrypt from 'bcrypt';
import { User } from "../models/User";

export const createUser = async (email: string, password: string) => {
  let hasUser = await User.findOne({where: { email }});
  if(!hasUser){
    const hash = bcrypt.hashSync(password, 10)
    const newuser = await User.create({
      email,
      password: hash
    });
    return newuser;
  } else {
    return new Error('Email ja existe')
  }
}

export const findByEmail = async (email: string) => {
  return await User.findOne({ where: { email }});
}

export const matchPassword = async (passwordText: string, encrypted: string) => {
  return bcrypt.compareSync(passwordText, encrypted);
}

export const all = async () => {
  return await User.findAll();
}