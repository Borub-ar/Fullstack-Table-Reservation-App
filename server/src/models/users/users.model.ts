import bcrypt from 'bcrypt';

import User from './users.mongo.js';
import AppError from '../../AppError.js';

import type { CreateUserDto } from '../../types/user.js';
import { registrationSchema } from '../../../../shared/validation/registrationSchema.js';

import { generateVerificationToken } from '../../utils/generateVerificationToken.js';
import { sendVerificationEmailService } from '../../services/email.service.js';

import {
  EMAIL_ALREADY_TAKEN,
  EMAIL_SENT_IF_EXISTS,
  INVALID_DATA,
  USERNAME_ALREADY_TAKEN,
  INVALID_TOKEN,
  TOKEN_EXPIRED,
} from '../../constants/errorCodes.js';

const SALT_ROUNDS = 10;
const VERIFICATION_TOKEN_EXPIRES_IN = 1000 * 60 * 60 * 24;

const createUser = async (userData: CreateUserDto) => {
  try {
    validateRegistrationData(userData);
    await checkIfUserExists(userData);
    await checkIfEmailExists(userData);

    const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const verificationToken = generateVerificationToken();

    const userToCreate = {
      username: userData.username,
      email: userData.email,
      passwordHash,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN),
      userId: crypto.randomUUID(),
    };

    const newUser = new User(userToCreate);
    await newUser.save();

    await sendVerificationEmailService(verificationToken, userData.email);
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
      throw new AppError(EMAIL_SENT_IF_EXISTS.errorCode, EMAIL_SENT_IF_EXISTS.message, 200);
    }

    const verificationToken = generateVerificationToken();

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = new Date(Date.now() + VERIFICATION_TOKEN_EXPIRES_IN);

    await user.save();
    return await sendVerificationEmailService(verificationToken, email);
  } catch (error) {
    console.error('Error sending verification email:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while sending verification email');
  }
};

const verifyEmail = async (token: string) => {
  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      throw new AppError(INVALID_TOKEN.errorCode, INVALID_TOKEN.message, 400);
    }

    if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt < new Date()) {
      throw new AppError(TOKEN_EXPIRED.errorCode, TOKEN_EXPIRED.message, 400);
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiresAt = null;
    await user.save();
  } catch (error) {
    console.error('Error verifying email:', error);
    if (error instanceof AppError) throw error;
    throw new Error('Something went wrong while verifying email');
  }
};

export { createUser, sendVerificationEmail, verifyEmail };
