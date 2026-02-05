import User from './users.mongo.js';

import type { CreateUserDto } from '../../types/user.js';

const createNewUser = async (userData: CreateUserDto) => {
  const newUser = new User(userData);
  return await newUser.save();
};

export { createNewUser };
