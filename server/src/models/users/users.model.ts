import User from './users.mongo.js';

import type { CreateUserDto } from '../../types/user.js';
import AppError from '../../AppError.js';

import { USER_ALREADY_EXISTS } from '../../constants/errorCodes.js';

const createNewUser = async (userData: CreateUserDto) => {
  try {
    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      throw new AppError(USER_ALREADY_EXISTS, 'User already exists with this email or username', 400);
    }

    throw new Error('Failed to create user');
  }
};

export { createNewUser };
