import bcrypt from 'bcrypt';

import User from './users.mongo.js';
import AppError from '../../AppError.js';

import type { CreateUserDto } from '../../types/user.js';
import { registrationSchema } from '../../../../shared/validation/registrationSchema.js';

import { generateVerificationToken } from '../../utils/generateVerificationToken.js';
import { sendVerificationEmailService } from '../../services/email.service.js';

import {
  EMAIL_ALREADY_TAKEN,
  EMAIL_NOT_FOUND,
  INVALID_DATA,
  USERNAME_ALREADY_TAKEN,
} from '../../constants/errorCodes.js';

const SALT_ROUNDS = 10;
const VERIFICATION_TOKEN_EXPIRES_IN = 1000 * 60 * 60 * 24;

const createUser = async (userData: CreateUserDto) => {
  try {
    validateRegistrationData(userData);
    await checkIfUserExists(userData);
    await checkIfEmailExists(userData);

    const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const verificationTokens = await generateVerificationToken();

    const userToCreate = {
      username: userData.username,
      email: userData.email,
      passwordHash,
      verificationToken: verificationTokens.token,
      verificationTokenExpiresAt: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN),
      userId: crypto.randomUUID(),
    };

    const newUser = new User(userToCreate);
    await newUser.save();

    await sendVerificationEmailService(verificationTokens.hashedToken, userData.email);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while creating user');
  }
};

const validateRegistrationData = (userData: CreateUserDto) => {
  const validationResult = registrationSchema.safeParse(userData);
  if (!validationResult.success) {
    throw new AppError(INVALID_DATA.errorCode, INVALID_DATA.message, 400);
  }
};

const checkIfUserExists = async (userData: CreateUserDto) => {
  const existingUser = await User.findOne({ username: userData.username });
  if (existingUser) {
    throw new AppError(USERNAME_ALREADY_TAKEN.errorCode, USERNAME_ALREADY_TAKEN.message, 400, ['username']);
  }
};

const checkIfEmailExists = async (userData: CreateUserDto) => {
  const existingEmail = await User.findOne({ email: userData.email });
  if (existingEmail) {
    throw new AppError(EMAIL_ALREADY_TAKEN.errorCode, EMAIL_ALREADY_TAKEN.message, 400, ['email']);
  }
};

const sendVerificationEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(EMAIL_NOT_FOUND.errorCode, EMAIL_NOT_FOUND.message, 404);
    }

    const verificationTokens = await generateVerificationToken();

    user.verificationToken = verificationTokens.token;
    user.verificationTokenExpiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN);

    await user.save();
    return await sendVerificationEmailService(verificationTokens.hashedToken, email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while sending verification email');
  }
};

export { createUser, sendVerificationEmail };
