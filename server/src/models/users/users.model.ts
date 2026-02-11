import User from './users.mongo.js';

import type { CreateUserDto } from '../../types/user.js';
import AppError from '../../AppError.js';

import { USER_ALREADY_EXISTS } from '../../constants/errorCodes.js';

const createNewUser = async (userData: CreateUserDto) => {
  try {
    const existingUser = await User.findOne({ username: userData.username });
    if (existingUser) {
      throw new AppError(USER_ALREADY_EXISTS, 'This username is already taken', 400, ['username']);
    }

    const existingEmail = await User.findOne({ email: userData.email });
    if (existingEmail) {
      throw new AppError(USER_ALREADY_EXISTS, 'This email is already taken', 400, ['email']);
    }

    const newUser = new User(userData);
    return await newUser.save();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while creating user');
  }
};

export { createNewUser };
